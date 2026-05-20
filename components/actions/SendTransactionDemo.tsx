"use client";

import { useState } from "react";

import { useWallet } from "@/components/wallet/WalletProvider";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success"; hashes: string[] }
  | { kind: "error"; error: string };

export function SendTransactionDemo() {
  const { address, isConnected } = useWallet();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSend() {
    if (!address) return;
    setStatus({ kind: "pending" });
    try {
      const { sendTransactions } = await import("@aboutcircles/miniapp-sdk");
      const hashes = await sendTransactions([
        { to: address as `0x${string}`, value: "0" },
      ]);
      setStatus({ kind: "success", hashes });
    } catch (err) {
      setStatus({
        kind: "error",
        error: err instanceof Error ? err.message : "Erreur inconnue",
      });
    }
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">Transaction test</h2>
      <p className="mb-4 text-sm text-zinc-600">
        Envoie une transaction 0-value vers votre propre adresse via{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">
          sendTransactions
        </code>
        . L&apos;hôte signe via le Safe de l&apos;utilisateur.
      </p>
      <button
        type="button"
        onClick={handleSend}
        disabled={!isConnected || status.kind === "pending"}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status.kind === "pending"
          ? "En attente de signature…"
          : "Envoyer transaction test"}
      </button>
      {status.kind === "success" && (
        <div className="mt-4 text-sm">
          <p className="font-medium text-emerald-700">Transaction soumise</p>
          {status.hashes.map((hash) => (
            <p key={hash} className="mt-1 break-all font-mono text-xs text-zinc-600">
              {hash}
            </p>
          ))}
        </div>
      )}
      {status.kind === "error" && (
        <p className="mt-3 text-sm text-red-600">{status.error}</p>
      )}
    </section>
  );
}
