"use client";

import { useState } from "react";

import { useWallet } from "@/components/wallet/WalletProvider";

type Status =
  | { kind: "idle" }
  | { kind: "signing" }
  | { kind: "signed"; signature: string; verified: boolean; message: string }
  | { kind: "error"; error: string };

function buildSignInMessage(address: string): string {
  const nonce = Math.random().toString(36).slice(2, 10);
  const issuedAt = new Date().toISOString();
  return [
    "Sign in to Profile Pulse.",
    "",
    `Address: ${address}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
  ].join("\n");
}

export function SignInDemo() {
  const { address, isConnected } = useWallet();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSignIn() {
    if (!address) return;
    setStatus({ kind: "signing" });
    try {
      const { signMessage } = await import("@aboutcircles/miniapp-sdk");
      const message = buildSignInMessage(address);
      const { signature, verified } = await signMessage(message);
      setStatus({ kind: "signed", signature, verified, message });
    } catch (err) {
      setStatus({
        kind: "error",
        error: err instanceof Error ? err.message : "Erreur inconnue",
      });
    }
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">Connexion</h2>
      <p className="mb-4 text-sm text-zinc-600">
        Demandez à l&apos;hôte de signer un message via{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">
          signMessage
        </code>
        .
      </p>
      <button
        type="button"
        onClick={handleSignIn}
        disabled={!isConnected || status.kind === "signing"}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status.kind === "signing"
          ? "En attente de l'hôte…"
          : "Se connecter avec Circles"}
      </button>
      {!isConnected && (
        <p className="mt-3 text-sm text-zinc-500">
          Connectez-vous dans l&apos;hôte Circles pour activer ce bouton.
        </p>
      )}
      {status.kind === "signed" && (
        <div className="mt-4 space-y-2 text-sm">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
              status.verified
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status.verified ? "vérifié" : "non vérifié"}
          </span>
          <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs">
            {status.message}
          </pre>
          <p className="break-all font-mono text-xs text-zinc-500">
            {status.signature}
          </p>
        </div>
      )}
      {status.kind === "error" && (
        <p className="mt-3 text-sm text-red-600">{status.error}</p>
      )}
    </section>
  );
}
