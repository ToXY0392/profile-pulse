"use client";

import { useWallet } from "@/components/wallet/WalletProvider";
import { shortenAddress } from "@/lib/utils";

export function ConnectionCard() {
  const { address, isConnected, isMiniappHost } = useWallet();

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-lg font-semibold">Wallet</h2>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isConnected
              ? "bg-emerald-100 text-emerald-800"
              : "bg-zinc-100 text-zinc-600"
          }`}
        >
          {isConnected ? "connecté" : "déconnecté"}
        </span>
      </div>
      <p className="mb-4 text-sm text-zinc-600">
        L&apos;hôte Circles injecte le wallet via{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">
          onWalletChange
        </code>
        .
      </p>
      <dl className="grid grid-cols-[120px_1fr] gap-y-2 text-sm">
        <dt className="text-zinc-500">Adresse</dt>
        <dd className="break-all font-mono">{address ?? "—"}</dd>
        <dt className="text-zinc-500">Court</dt>
        <dd className="font-mono">
          {address ? shortenAddress(address) : "—"}
        </dd>
        <dt className="text-zinc-500">Environnement</dt>
        <dd>{isMiniappHost ? "hôte Circles" : "standalone (dev)"}</dd>
      </dl>
      {!isConnected && (
        <p className="mt-4 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
          {isMiniappHost
            ? "En attente de l'adresse wallet depuis l'hôte…"
            : "Ouvrez cette mini-app dans l'hôte Circles pour recevoir une adresse."}
        </p>
      )}
    </section>
  );
}
