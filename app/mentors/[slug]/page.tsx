"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";

import { BookCallButton } from "@/components/mentors/BookCallButton";
import { MentorAvatar } from "@/components/mentors/MentorAvatar";
import { MentorHeader } from "@/components/mentors/MentorHeader";
import { SlotGrid } from "@/components/mentors/SlotGrid";
import { Tag } from "@/components/ui/Tag";
import { getMentorBySlug, type TimeSlot } from "@/lib/mentors";

export default function MentorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const mentor = getMentorBySlug(slug);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  if (!mentor) notFound();

  return (
    <>
      <MentorHeader showBack />
      <article className="rounded-xl border border-zinc-200 bg-white p-5">
        <div className="mb-4 flex flex-col items-center text-center">
          <MentorAvatar name={mentor.name} />
          <h1 className="mt-3 text-xl font-semibold text-zinc-900">
            {mentor.name}
          </h1>
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {mentor.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <p className="mt-3 text-sm text-zinc-600">{mentor.bio}</p>
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
