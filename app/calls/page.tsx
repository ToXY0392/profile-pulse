"use client";

import Link from "next/link";
import { useMemo } from "react";

import { MentorCard } from "@/components/mentors/MentorCard";
import { TrustMentorButton } from "@/components/mentors/TrustMentorButton";
import { useWallet } from "@/components/wallet/WalletProvider";
import { getBookings } from "@/lib/bookings-storage";
import { getMentorBySlug } from "@/lib/mentors";

export default function CallsPage() {
  const { address } = useWallet();
  const bookings = useMemo(() => getBookings(address), [address]);

  return (
    <>
      <h1 className="mb-6 text-xl font-bold text-zinc-900">Your last calls</h1>
      {!address && (
        <p className="text-sm text-zinc-500">
          Connectez votre wallet dans l&apos;hôte Circles pour voir vos appels.
        </p>
      )}
      {address && bookings.length === 0 && (
        <p className="text-sm text-zinc-500">
          Aucun appel réservé. Réservez un créneau depuis{" "}
          <Link href="/mentors" className="text-violet-600 underline">
            Mentors
          </Link>
          .
        </p>
      )}
      <ul className="flex flex-col gap-3">
        {bookings.map((booking) => {
          const mentor = getMentorBySlug(booking.mentorSlug);
          if (!mentor) return null;
          return (
            <li key={booking.id}>
              <MentorCard
                mentor={{
                  ...mentor,
                  name: booking.mentorName,
                  tags: booking.tags,
                }}
                action={<TrustMentorButton mentor={mentor} />}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
