import type { ReactNode } from "react";

export default function MentorsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-md bg-white px-5 py-6">
      {children}
    </div>
  );
}
