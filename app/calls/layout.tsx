import type { ReactNode } from "react";

import { MentorsShell } from "@/components/mentors/MentorsShell";

export default function CallsLayout({ children }: { children: ReactNode }) {
  return <MentorsShell>{children}</MentorsShell>;
}
