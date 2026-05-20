"use client";

import dynamic from "next/dynamic";

import { ConnectionCard } from "@/components/wallet/ConnectionCard";
import { SignInDemo } from "@/components/wallet/SignInDemo";

const ProfileLookup = dynamic(
  () =>
    import("@/components/profile/ProfileLookup").then((m) => ({
      default: m.ProfileLookup,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 animate-pulse rounded-xl border border-zinc-200 bg-zinc-50" />
    ),
  },
);

const SendTransactionDemo = dynamic(
  () =>
    import("@/components/actions/SendTransactionDemo").then((m) => ({
      default: m.SendTransactionDemo,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-28 animate-pulse rounded-xl border border-zinc-200 bg-zinc-50" />
    ),
  },
);

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Profile Pulse — consultez votre identité Circles, signez un message et
          testez une transaction, le tout dans l&apos;hôte Gnosis App.
        </p>
      </div>

      <ConnectionCard />
      <ProfileLookup />
      <SignInDemo />
      <SendTransactionDemo />
    </div>
  );
}
