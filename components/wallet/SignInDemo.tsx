"use client";

import { Button } from "@/components/ui/Button";
import { useWallet } from "@/components/wallet/WalletProvider";
import { useSignIn } from "@/hooks/use-sign-in";
import { shortenAddress } from "@/lib/utils";

export function SignInDemo() {
  const { address } = useWallet();
  const {
    signedIn,
    signing,
    error,
    signIn,
    signOut,
    canSignIn,
    isConnected,
    isMiniappHost,
  } = useSignIn();

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold">Connexion</h2>

      {signedIn ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
              Connecté
            </span>
            {address && (
              <span className="font-mono text-sm text-zinc-600">
                {shortenAddress(address, 6)}
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-600">
            Vous pouvez réserver un appel mentor ou utiliser les actions CRC sur
            la page Mentors.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="text-sm font-medium text-zinc-500 underline hover:text-zinc-800"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-600">
            Validez votre identité dans l&apos;hôte Gnosis App ou Circles
            Playground pour débloquer la réservation et les paiements CRC.
          </p>
          <Button
            onClick={() => signIn("Profile Pulse")}
            disabled={!canSignIn || signing}
            title={
              !isMiniappHost
                ? "Ouvrez dans l'hôte Circles"
                : !isConnected
                  ? "Connectez le wallet dans l'hôte"
                  : undefined
            }
          >
            {signing ? "En attente de l'hôte…" : "Se connecter avec Circles"}
          </Button>
        </>
      )}

      {!signedIn && !isMiniappHost && (
        <p className="mt-3 text-sm text-amber-800">
          Ouvrez la mini-app depuis{" "}
          <a
            className="font-medium underline"
            href="https://circles.gnosis.io/playground"
            target="_blank"
            rel="noreferrer"
          >
            Circles Playground
          </a>{" "}
          pour activer la connexion.
        </p>
      )}
      {!signedIn && isMiniappHost && !isConnected && (
        <p className="mt-3 text-sm text-zinc-500">
          Connectez votre wallet dans l&apos;hôte Circles pour continuer.
        </p>
      )}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </section>
  );
}
