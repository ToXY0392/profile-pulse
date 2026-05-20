"use client";

import type { TimeSlot } from "@/lib/mentors";

export function SlotGrid({
  slots,
  selectedId,
  onSelect,
}: {
  slots: TimeSlot[];
  selectedId: string | null;
  onSelect: (slot: TimeSlot) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const selected = selectedId === slot.id;
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelect(slot)}
            title={slot.label}
            className={`aspect-square rounded-lg border text-xs font-medium transition-colors ${
              selected
                ? "border-violet-600 bg-violet-50 text-violet-800"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            <span className="sr-only">{slot.label}</span>
          </button>
        );
      })}
    </div>
  );
}
