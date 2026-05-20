import Link from "next/link";
import type { ReactNode } from "react";

import { HostBanner } from "@/components/layout/HostBanner";
import { WalletStatus } from "@/components/wallet/WalletStatus";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Circles mini-app
            </p>
            <h1 className="text-lg font-semibold">Profile Pulse</h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-600 hover:text-zinc-900">
              Dashboard
            </Link>
            <Link href="/mentors" className="text-zinc-600 hover:text-zinc-900">
              Mentors
            </Link>
            <Link href="/calls" className="text-zinc-600 hover:text-zinc-900">
              Mes appels
            </Link>
            <WalletStatus />
          </nav>
        </div>
      </header>
      <HostBanner />
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
