"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { MentorsProvider } from "@/components/mentors/MentorsProvider";

export function MentorsShell({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MentorsProvider>
        <div className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-md bg-white px-5 py-6">
          {children}
        </div>
      </MentorsProvider>
    </QueryClientProvider>
  );
}
