import Link from "next/link";
import type { ReactNode } from "react";

import { Tag } from "@/components/ui/Tag";
import { MentorAvatar } from "@/components/mentors/MentorAvatar";
import type { Mentor } from "@/lib/mentors";

type MentorCardProps = {
  mentor: Mentor;
  href?: string;
  action?: ReactNode;
  variant?: "grid" | "row";
};

export function MentorCard({
  mentor,
  href,
  action,
  variant = "row",
}: MentorCardProps) {
  const content =
    variant === "grid" ? (
      <div className="flex h-full flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md">
        <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} size="lg" />
        <p className="mt-3 font-semibold text-zinc-900">{mentor.name}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {mentor.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <MentorAvatar name={mentor.name} imageUrl={mentor.imageUrl} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-zinc-900">{mentor.name}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {mentor.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        {action}
      </div>
    );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
