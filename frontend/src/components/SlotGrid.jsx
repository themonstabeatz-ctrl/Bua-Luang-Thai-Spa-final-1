import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Availability grid. Fetches `/api/availability` for the picked date and the
 * duration of the selected treatment, then renders every 10:00–21:00 slot.
 * Busy / past / too-late slots are rendered disabled.
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

  // Only slots that can fit the full treatment + 30-min buffer are shown.
  const freeSlots = slots.filter((s) => s.available);

  // Drop a previously chosen time the moment it stops being bookable.
  useEffect(() => {
    if (!value || !loaded) return;
    if (!freeSlots.some((s) => s.time === value)) onChange("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, loaded]);

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

      {!date && (
        <p data-testid="slot-grid-pick-date" className="text-sm text-[#7a6e5e] italic">
          {copy.slotsPickDate}
        </p>
      )}

      {date && !loading && loaded && freeSlots.length === 0 && (
        <p data-testid="slot-grid-empty" className="text-sm text-[#8a5a2a] italic">
          {copy.slotsEmpty}
        </p>
      )}

      {date && freeSlots.length > 0 && (
        <div
          data-testid="slot-grid-scroll"
          className="buaa-slot-scroll max-h-[212px] overflow-y-auto pr-1 scroll-smooth"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {freeSlots.map((s) => {
              const selected = s.time === value;
              return (
                <button
                  key={s.time}
                  type="button"
                  data-testid={`slot-${s.time}`}
                  data-available="true"
                  onClick={() => onChange(s.time)}
                  title={s.time}
                  className={[
                    "relative py-2.5 rounded-xl text-sm tabular-nums tracking-wider transition-all duration-300 border",
                    selected
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
