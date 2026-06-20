import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * iOS-style drum/wheel time picker.
 *
 * Two synchronised scrollable columns (hours + minutes).
 * - Hours: 10 … 22 (business hours, fully clamped).
 * - Minutes: 00 / 15 / 30 / 45.
 *
 * Each item snaps to the centre of the wheel via CSS scroll-snap. The
 * surrounding band acts as a "lens" that highlights the currently selected
 * value. Inertial swipes work natively because we are just using
 * overflow-y: scroll on a vertical column.
 *
 * Value contract: external value is "HH:MM" (24h, zero-padded). When the
 * picker opens with no value yet, we anchor to 10:00.
 */

const HOURS = Array.from({ length: 13 }, (_, i) => 10 + i); // 10..22
const MINUTES = [0, 15, 30, 45];

const ITEM_HEIGHT = 44; // px — must match CSS height of .tw-item
const VISIBLE_ITEMS = 5; // odd number so the middle slot is the selected one
const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const PAD_ROWS = Math.floor(VISIBLE_ITEMS / 2); // empty rows above/below

const pad2 = (n) => String(n).padStart(2, "0");

const Wheel = ({ items, value, onChange, label, formatter = pad2 }) => {
  const ref = useRef(null);
  const isProgrammatic = useRef(false);
  const settleTimer = useRef(null);
  const wheelLock = useRef(false);
  const touchStartY = useRef(null);

  // Move the wheel by exactly `delta` indices (clamped). Used by the keyboard,
  // touch and mouse-wheel handlers to enforce single-step movement regardless
  // of gesture velocity.
  const stepByDelta = useCallback(
    (delta) => {
      if (!delta) return;
      const node = ref.current;
      if (!node) return;
      const curIdx = items.indexOf(value);
      const next = Math.max(
        0,
        Math.min(items.length - 1, (curIdx < 0 ? 0 : curIdx) + delta)
      );
      if (items[next] === value) return;
      isProgrammatic.current = true;
      node.scrollTo({ top: next * ITEM_HEIGHT, behavior: "smooth" });
      setTimeout(() => {
        isProgrammatic.current = false;
      }, 200);
      onChange(items[next]);
    },
    [items, value, onChange]
  );

  // Scroll programmatically to the active index whenever `value` changes from
  // outside (e.g. parent reset). We guard against the resulting `scroll` event
  // re-firing onChange.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const idx = items.indexOf(value);
    if (idx < 0) return;
    isProgrammatic.current = true;
    node.scrollTo({ top: idx * ITEM_HEIGHT, behavior: "auto" });
    // Release the guard on next frame so user scrolls aren't swallowed.
    requestAnimationFrame(() => {
      isProgrammatic.current = false;
    });
  }, [value, items]);

  const handleScroll = useCallback(() => {
    if (isProgrammatic.current) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const raw = node.scrollTop / ITEM_HEIGHT;
      const idx = Math.max(0, Math.min(items.length - 1, Math.round(raw)));
      const snapped = idx * ITEM_HEIGHT;
      if (Math.abs(node.scrollTop - snapped) > 0.5) {
        isProgrammatic.current = true;
        node.scrollTo({ top: snapped, behavior: "smooth" });
        setTimeout(() => {
          isProgrammatic.current = false;
        }, 120);
      }
      const next = items[idx];
      if (next !== value) onChange(next);
    }, 90);
  }, [items, value, onChange]);

  // Mouse wheel / trackpad: ALWAYS one step per discrete event. We swallow the
  // native scroll so velocity can never skip multiple items.
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      if (wheelLock.current) return;
      const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (!dir) return;
      wheelLock.current = true;
      stepByDelta(dir);
      // Re-arm the lock so a single trackpad inertia stream can't cascade
      // into multi-step jumps. 180ms is long enough to feel intentional and
      // short enough to still feel snappy when the user spins again.
      setTimeout(() => {
        wheelLock.current = false;
      }, 180);
    },
    [stepByDelta]
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // wheel must be a non-passive listener to call preventDefault().
    const onWheel = (e) => handleWheel(e);
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [handleWheel]);

  // Touch: cap each swipe to a single step. We measure delta from touchstart
  // and on touchend pick sign only, ignoring magnitude.
  const onTouchStart = (e) => {
    touchStartY.current = e.touches?.[0]?.clientY ?? null;
  };
  const onTouchEnd = (e) => {
    const start = touchStartY.current;
    touchStartY.current = null;
    if (start == null) return;
    const end = e.changedTouches?.[0]?.clientY;
    if (end == null) return;
    const dy = start - end; // positive = swipe up = next item
    if (Math.abs(dy) < 12) return; // tap, not a swipe
    stepByDelta(dy > 0 ? 1 : -1);
  };

  const onItemClick = (it) => {
    const idx = items.indexOf(it);
    if (idx < 0 || !ref.current) return;
    isProgrammatic.current = true;
    ref.current.scrollTo({ top: idx * ITEM_HEIGHT, behavior: "smooth" });
    setTimeout(() => {
      isProgrammatic.current = false;
    }, 220);
    if (it !== value) onChange(it);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] tracking-[0.32em] uppercase text-[#a17a35] mb-2">
        {label}
      </div>
      <div
        ref={ref}
        onScroll={handleScroll}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="tw-wheel relative w-[90px] overflow-y-scroll no-scrollbar"
        style={{ height: WHEEL_HEIGHT, scrollSnapType: "y mandatory" }}
      >
        {/* top padding rows so first item can centre */}
        {Array.from({ length: PAD_ROWS }).map((_, i) => (
          <div key={`pt-${i}`} className="tw-item tw-empty" style={{ height: ITEM_HEIGHT }} />
        ))}

        {items.map((it) => {
          const selected = it === value;
          return (
            <button
              type="button"
              key={it}
              onClick={() => onItemClick(it)}
              className={`tw-item w-full flex items-center justify-center font-serif tabular-nums transition-all ${
                selected
                  ? "text-[#2b2620] text-[26px] font-medium"
                  : "text-[#a09686] text-[20px] font-light"
              }`}
              style={{
                height: ITEM_HEIGHT,
                scrollSnapAlign: "center",
                fontFamily:
                  "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              }}
            >
              {formatter(it)}
            </button>
          );
        })}

        {/* bottom padding rows */}
        {Array.from({ length: PAD_ROWS }).map((_, i) => (
          <div key={`pb-${i}`} className="tw-item tw-empty" style={{ height: ITEM_HEIGHT }} />
        ))}
      </div>
    </div>
  );
};

export const TimeWheelPicker = ({
  value, // "HH:MM" or "" — controlled
  onChange, // (hhmm: string) => void
  onConfirm, // optional — fires when user taps Confirm
  onCancel, // optional — fires when user closes/escapes
  open = false,
  labels = { hour: "SAT", minute: "MIN", confirm: "Potvrdi", cancel: "Otkaži" },
}) => {
  // Parse incoming value into hour/minute, with safe fallback to 10:00.
  const initial = (() => {
    if (value && /^\d{2}:\d{2}$/.test(value)) {
      const [h, m] = value.split(":").map(Number);
      const hour = HOURS.includes(h) ? h : 10;
      const minute = MINUTES.includes(m) ? m : 0;
      return { hour, minute };
    }
    return { hour: 10, minute: 0 };
  })();

  const [hour, setHour] = useState(initial.hour);
  const [minute, setMinute] = useState(initial.minute);

  // Resync internal state if parent value changes while open.
  useEffect(() => {
    if (!open) return;
    if (value && /^\d{2}:\d{2}$/.test(value)) {
      const [h, m] = value.split(":").map(Number);
      if (HOURS.includes(h)) setHour(h);
      if (MINUTES.includes(m)) setMinute(m);
    } else {
      setHour(10);
      setMinute(0);
    }
  }, [open, value]);

  // Escape closes the picker.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.(`${pad2(hour)}:${pad2(minute)}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hour, minute, onCancel, onConfirm]);

  if (!open) return null;

  const handleHourChange = (h) => {
    setHour(h);
    onChange?.(`${pad2(h)}:${pad2(minute)}`);
  };
  const handleMinuteChange = (m) => {
    setMinute(m);
    onChange?.(`${pad2(hour)}:${pad2(m)}`);
  };

  return (
    <div
      data-testid="time-wheel-picker"
      className="absolute z-50 mt-2 left-0 right-0 sm:left-auto sm:right-auto sm:w-[260px] rounded-2xl border border-[rgba(161,122,53,0.35)] bg-gradient-to-b from-[#fbf3dc] to-[#f8edd4] shadow-[0_24px_60px_rgba(80,55,18,0.22)] p-4"
    >
      {/* Centre selection band (the "lens") */}
      <div className="relative">
        <div
          className="pointer-events-none absolute left-2 right-2 rounded-xl border-y border-[rgba(161,122,53,0.45)] bg-[rgba(161,122,53,0.10)]"
          style={{
            top: `calc(50% - ${ITEM_HEIGHT / 2}px + 14px)`, /* +14 to skip column label height */
            height: ITEM_HEIGHT,
          }}
        />
        <div className="flex items-start justify-center gap-3 relative">
          <Wheel
            items={HOURS}
            value={hour}
            onChange={handleHourChange}
            label={labels.hour}
          />
          <div
            className="font-serif text-[#a17a35] select-none"
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              fontSize: 32,
              lineHeight: `${WHEEL_HEIGHT}px`,
              marginTop: 22,
            }}
          >
            :
          </div>
          <Wheel
            items={MINUTES}
            value={minute}
            onChange={handleMinuteChange}
            label={labels.minute}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          data-testid="time-wheel-cancel"
          onClick={() => onCancel?.()}
          className="flex-1 px-3 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase text-[#a17a35] border border-[rgba(161,122,53,0.35)] hover:bg-[rgba(161,122,53,0.10)] transition-colors"
        >
          {labels.cancel}
        </button>
        <button
          type="button"
          data-testid="time-wheel-confirm"
          onClick={() => onConfirm?.(`${pad2(hour)}:${pad2(minute)}`)}
          className="flex-1 px-3 py-2 rounded-full text-[11px] tracking-[0.22em] uppercase text-white bg-gradient-to-r from-[#c9a45a] via-[#a17a35] to-[#7a5a22] hover:shadow-[0_8px_22px_rgba(161,122,53,0.40)] transition-shadow"
        >
          {labels.confirm}
        </button>
      </div>
    </div>
  );
};
