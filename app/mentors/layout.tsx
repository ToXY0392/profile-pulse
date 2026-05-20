import type { ReactNode } from "react";

import { MentorsShell } from "@/components/mentors/MentorsShell";

export default function MentorsLayout({ children }: { children: ReactNode }) {
  return <MentorsShell>{children}</MentorsShell>;
}
