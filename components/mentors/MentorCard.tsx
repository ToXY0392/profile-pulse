import Link from "next/link";
import type { ReactNode } from "react";

import { Tag } from "@/components/ui/Tag";
import { MentorAvatar } from "@/components/mentors/MentorAvatar";
import type { Mentor } from "@/lib/mentors";

type MentorCardProps = {
  mentor: Mentor;
  href?: string;
  action?: ReactNode;
};

export function MentorCard({ mentor, href, action }: MentorCardProps) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4">
      <MentorAvatar name={mentor.name} />
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
      <Link href={href} className="block transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}
