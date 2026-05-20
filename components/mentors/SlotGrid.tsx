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
            aria-pressed={selected}
            aria-label={slot.label}
            className={`flex min-h-[4rem] flex-col items-center justify-center rounded-lg border px-1 py-2 text-center text-[10px] leading-tight font-medium whitespace-pre-line transition-colors ${
              selected
                ? "border-violet-600 bg-violet-50 text-violet-800 ring-1 ring-violet-600"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-violet-300 hover:bg-violet-50/50"
            }`}
          >
            {slot.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
