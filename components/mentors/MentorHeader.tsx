"use client";

import Link from "next/link";

import { LoginButton } from "@/components/mentors/LoginButton";

export function MentorHeader({ showBack = false }: { showBack?: boolean }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      {showBack ? (
        <Link
          href="/mentors"
          className="rounded-lg bg-zinc-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-600"
        >
          back
        </Link>
      ) : (
        <span />
      )}
      <LoginButton />
    </header>
  );
}
