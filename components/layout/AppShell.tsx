import type { ReactNode } from "react";

import { HostBanner } from "@/components/layout/HostBanner";
import { WalletStatus } from "@/components/wallet/WalletStatus";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Circles mini-app
            </p>
            <h1 className="text-lg font-semibold">Profile Pulse</h1>
          </div>
          <WalletStatus />
        </div>
      </header>
      <HostBanner />
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
