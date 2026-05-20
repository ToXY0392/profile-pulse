"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";

import { BookCallButton } from "@/components/mentors/BookCallButton";
import { MentorAvatar } from "@/components/mentors/MentorAvatar";
import { MentorHeader } from "@/components/mentors/MentorHeader";
import { MentorStats } from "@/components/mentors/MentorStats";
import { SlotGrid } from "@/components/mentors/SlotGrid";
import { Tag } from "@/components/ui/Tag";
import { useMentors } from "@/hooks/use-mentors";
import type { TimeSlot } from "@/lib/mentors";

export default function MentorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getBySlug, loading } = useMentors();
  const mentor = getBySlug(slug);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  if (!loading && !mentor) notFound();

  if (!mentor) {
    return (
      <>
        <MentorHeader showBack />
        <div className="animate-pulse space-y-4 rounded-xl border border-zinc-200 p-6">
          <div className="mx-auto h-20 w-20 rounded-full bg-zinc-200" />
          <div className="mx-auto h-6 w-32 rounded bg-zinc-200" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-16 rounded-lg bg-zinc-100" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MentorHeader showBack />
      <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col items-center text-center">
          <MentorAvatar
            name={mentor.name}
            imageUrl={mentor.imageUrl}
            size="lg"
          />
          <h1 className="mt-3 text-xl font-semibold text-zinc-900">
            {mentor.name}
          </h1>
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {mentor.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            {mentor.bio}
          </p>
          <MentorStats mentor={mentor} />
        </div>

        <p className="mb-3 text-sm font-medium text-zinc-900">
          Select your slot for a Call with {mentor.name}
        </p>
        <SlotGrid
          slots={mentor.slots}
          selectedId={selectedSlot?.id ?? null}
          onSelect={setSelectedSlot}
        />

        <div className="mt-6">
          <BookCallButton mentor={mentor} selectedSlot={selectedSlot} />
        </div>
      </article>
    </>
  );
}
