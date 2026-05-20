"use client";

import { useWallet } from "@/components/wallet/WalletProvider";

export function HostBanner() {
  const { isMiniappHost } = useWallet();

  if (isMiniappHost) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-900">
      Ouvrez cette mini-app depuis{" "}
      <a
        className="font-medium underline"
        href="https://circles.gnosis.io/playground"
        target="_blank"
        rel="noreferrer"
      >
        Circles Playground
      </a>{" "}
      ou Gnosis App pour recevoir une adresse wallet injectée par l&apos;hôte.
    </div>
  );
}
