import { MentorCard } from "@/components/mentors/MentorCard";
import type { Mentor } from "@/lib/mentors";

export function MentorGrid({ mentors }: { mentors: Mentor[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mentors.map((mentor) => (
        <MentorCard
          key={mentor.slug}
          mentor={mentor}
          href={`/mentors/${mentor.slug}`}
        />
      ))}
    </div>
  );
}
