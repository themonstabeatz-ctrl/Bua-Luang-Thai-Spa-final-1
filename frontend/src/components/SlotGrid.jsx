import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const OPEN_MIN = 10 * 60;
const LAST_SLOT_MIN = 21 * 60 + 45;
const CLOSE_MIN = 22 * 60;
const STEP_MIN = 15;

const toHHMM = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// Client-side slot list for the "no date chosen yet" state so the visitor can
// tap a time first and pick the date afterwards (order is entirely up to them).
const defaultSlots = (duration) => {
  const dur = duration || 60;
  const out = [];
  for (let s = OPEN_MIN; s <= LAST_SLOT_MIN; s += STEP_MIN) {
    if (s + dur <= CLOSE_MIN) out.push({ time: toHHMM(s), available: true, reason: null });
  }
  return out;
};

/**
 * Availability grid. Slots are generated every 15 minutes from 10:00.
 * • Past slots for the chosen date are hidden.
 * • Future slots already booked (treatment + 30-min buffer) stay VISIBLE but
 *   are shown struck-through and disabled.
 * • Free slots are clickable.
 * The grid also renders before a date is picked, so time can be chosen first.
 */
export const SlotGrid = ({ date, duration, value, onChange, copy, refreshKey = 0 }) => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setLoaded(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    axios
      .get(`${API}/availability`, { params: { date, duration: duration || 60 } })
      .then((r) => {
        if (!cancelled) {
          setSlots(r.data?.slots || []);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSlots([]);
          setLoaded(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date, duration, refreshKey]);

  const source = date ? slots : defaultSlots(duration);
  // Hide past & closing slots; keep free + booked (booked rendered disabled).
  const displaySlots = source.filter((s) => s.reason == null || s.reason === "booked");

  // Drop a chosen time only once we have real availability that rejects it.
  useEffect(() => {
    if (!value || !date || !loaded) return;
    const ok = slots.some((s) => s.time === value && s.available);
    if (!ok) onChange("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, loaded, date]);

  return (
    <div data-testid="slot-grid" className="pt-1">
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <span className="text-[11px] tracking-[0.3em] uppercase text-[#a17a35]">
          {copy.slotsLabel}
        </span>
        {loading && (
          <span className="inline-flex items-center gap-2 text-[11px] text-[#7a6e5e]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            {copy.slotsLoading}
          </span>
        )}
      </div>

      {date && !loading && loaded && displaySlots.length === 0 && (
        <p data-testid="slot-grid-empty" className="text-sm text-[#8a5a2a] italic">
          {copy.slotsEmpty}
        </p>
      )}

      {displaySlots.length > 0 && (
        <div
          data-testid="slot-grid-scroll"
          className="buaa-slot-scroll max-h-[212px] overflow-y-auto pr-1 scroll-smooth"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {displaySlots.map((s) => {
              const booked = s.reason === "booked";
              const selected = s.time === value && !booked;
              return (
                <button
                  key={s.time}
                  type="button"
                  data-testid={`slot-${s.time}`}
                  data-available={booked ? "false" : "true"}
                  data-booked={booked ? "true" : "false"}
                  disabled={booked}
                  aria-disabled={booked}
                  onClick={() => !booked && onChange(s.time)}
                  title={s.time}
                  className={[
                    "relative py-2.5 rounded-xl text-sm tabular-nums tracking-wider transition-all duration-300 border",
                    booked
                      ? "line-through bg-[rgba(161,122,53,0.06)] text-[#b8ab96] border-[rgba(161,122,53,0.18)] cursor-not-allowed opacity-70"
                      : selected
                      ? "bg-gradient-to-r from-[#c9a45a] via-[#a17a35] to-[#7a5a22] text-white border-transparent shadow-[0_8px_22px_rgba(161,122,53,0.40)] scale-[1.03]"
                      : "bg-white/80 text-[#3a312a] border-[rgba(161,122,53,0.35)] hover:border-[#a17a35] hover:bg-[rgba(161,122,53,0.10)] hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  {s.time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
