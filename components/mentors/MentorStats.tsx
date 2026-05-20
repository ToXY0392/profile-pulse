import type { Mentor } from "@/lib/mentors";

export function MentorStats({ mentor }: { mentor: Mentor }) {
  if (
    mentor.trustedByCount == null &&
    mentor.trustsCount == null &&
    !mentor.circlesAddress
  ) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
      {mentor.trustedByCount != null && (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5">
          Trusted by {mentor.trustedByCount}
        </span>
      )}
      {mentor.trustsCount != null && (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5">
          Trust {mentor.trustsCount}
        </span>
      )}
    </div>
  );
}
