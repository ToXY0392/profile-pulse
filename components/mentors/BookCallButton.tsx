"use client";

import { Button } from "@/components/ui/Button";
import { useBookCall } from "@/hooks/use-book-call";
import { BOOKING_AMOUNT_CRC, type Mentor, type TimeSlot } from "@/lib/mentors";
import { shortenAddress } from "@/lib/utils";

export function BookCallButton({
  mentor,
  selectedSlot,
}: {
  mentor: Mentor;
  selectedSlot: TimeSlot | null;
}) {
  const { book, status, canBook } = useBookCall(mentor, selectedSlot);

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        onClick={book}
        disabled={!canBook || status.kind === "pending"}
      >
        {status.kind === "pending"
          ? "En attente de l'hôte…"
          : `PAY ${BOOKING_AMOUNT_CRC} CRC to book`}
      </Button>
      {!selectedSlot && (
        <p className="text-center text-xs text-zinc-500">
          Sélectionnez un créneau pour réserver.
        </p>
      )}
      {status.kind === "success" && (
        <p className="text-center text-xs text-emerald-700">
          Réservé — tx {shortenAddress(status.txHash, 6)}
        </p>
      )}
      {status.kind === "error" && (
        <p className="text-center text-xs text-red-600">{status.error}</p>
      )}
    </div>
  );
}
