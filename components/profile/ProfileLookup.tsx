"use client";

import { useEffect, useState } from "react";

import { useWallet } from "@/components/wallet/WalletProvider";
import { formatCrc, shortenAddress } from "@/lib/utils";

type AvatarType =
  | "CrcV1_Signup"
  | "CrcV1_OrganizationSignup"
  | "CrcV2_RegisterHuman"
  | "CrcV2_RegisterGroup"
  | "CrcV2_RegisterOrganization";

type RichProfile = {
  name?: string;
  description?: string;
  imageUrl?: string;
  previewImageUrl?: string;
  location?: string;
};

type ProfileResult = {
  avatarType?: AvatarType;
  version?: number;
  cidV0?: string;
  v2Balance?: string;
  v1Balance?: string;
  trustsCount?: number;
  trustedByCount?: number;
  profile: RichProfile;
};

type LookupResult =
  | { kind: "found"; address: string; nonce: number; data: ProfileResult }
  | { kind: "not-registered"; address: string; nonce: number }
  | { kind: "error"; address: string; nonce: number; error: string };

const TYPE_LABEL: Record<AvatarType, string> = {
  CrcV1_Signup: "Humain (v1)",
  CrcV1_OrganizationSignup: "Organisation (v1)",
  CrcV2_RegisterHuman: "Humain",
  CrcV2_RegisterGroup: "Groupe",
  CrcV2_RegisterOrganization: "Organisation",
};

export function ProfileLookup() {
  const { address, isConnected } = useWallet();
  const [result, setResult] = useState<LookupResult | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!address) return;
    let cancelled = false;

    (async () => {
      try {
        const { Sdk } = await import("@aboutcircles/sdk");
        const sdk = new Sdk();
        const view = await sdk.rpc.profile.getProfileView(address as `0x${string}`);

        if (!view.avatarInfo) {
          if (cancelled) return;
          setResult({ kind: "not-registered", address, nonce });
          return;
        }

        let ipfs: RichProfile = {};
        if (view.avatarInfo.cidV0) {
          try {
            const full = await sdk.rpc.profile.getProfileByCid(view.avatarInfo.cidV0);
            if (full) ipfs = full as RichProfile;
          } catch {
            // CID may not resolve; fall through with view data only.
          }
        }

        if (cancelled) return;
        setResult({
          kind: "found",
          address,
          nonce,
          data: {
            avatarType: view.avatarInfo.type as AvatarType,
            version: view.avatarInfo.version,
            cidV0: view.avatarInfo.cidV0 || undefined,
            v2Balance: view.v2Balance,
            v1Balance: view.v1Balance,
            trustsCount: view.trustStats?.trustsCount,
            trustedByCount: view.trustStats?.trustedByCount,
            profile: {
              name: ipfs.name ?? view.profile?.name,
              description: ipfs.description,
              imageUrl: ipfs.imageUrl,
              previewImageUrl: ipfs.previewImageUrl,
              location: ipfs.location,
            },
          },
        });
      } catch (err) {
        if (cancelled) return;
        setResult({
          kind: "error",
          address,
          nonce,
          error: err instanceof Error ? err.message : "Erreur inconnue",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [address, nonce]);

  if (!isConnected || !address) {
    return (
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Profil Circles</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Connectez-vous dans l&apos;hôte Circles pour consulter votre avatar.
        </p>
      </section>
    );
  }

  const fresh =
    result && result.address === address && result.nonce === nonce ? result : null;
  const isLoading = !fresh;

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Profil Circles</h2>
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          disabled={isLoading}
          className="rounded-lg border border-zinc-300 px-3 py-1 text-xs font-medium disabled:opacity-50"
        >
          {isLoading ? "Chargement…" : "Actualiser"}
        </button>
      </div>
      <p className="mb-4 text-sm text-zinc-600">
        Données via{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs">
          sdk.rpc.profile.getProfileView
        </code>
        .
      </p>

      {isLoading && <ProfileSkeleton />}

      {fresh?.kind === "not-registered" && (
        <p className="text-sm text-zinc-600">
          Cette adresse n&apos;est pas un avatar Circles enregistré. Inscrivez-vous
          sur{" "}
          <a
            className="underline"
            href="https://app.metri.xyz"
            target="_blank"
            rel="noreferrer"
          >
            app.metri.xyz
          </a>
          .
        </p>
      )}

      {fresh?.kind === "error" && (
        <p className="text-sm text-red-600">{fresh.error}</p>
      )}

      {fresh?.kind === "found" && (
        <ProfileView data={fresh.data} address={address} />
      )}
    </section>
  );
}

function ProfileView({
  data,
  address,
}: {
  data: ProfileResult;
  address: string;
}) {
  const imageUrl = data.profile.previewImageUrl ?? data.profile.imageUrl;
  const name = data.profile.name ?? "Avatar sans nom";
  const initials = name.slice(0, 2).toUpperCase();
  const v2 = formatCrc(data.v2Balance);
  const v1 = formatCrc(data.v1Balance);

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="flex shrink-0 items-center justify-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="size-24 rounded-full border border-zinc-200 object-cover"
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-2xl font-semibold text-zinc-500">
            {initials}
          </div>
        )}
      </div>
      <div className="flex-1 space-y-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            {data.avatarType && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs">
                {TYPE_LABEL[data.avatarType]}
              </span>
            )}
            {data.version != null && (
              <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-xs">
                v{data.version}
              </span>
            )}
          </div>
          <p className="font-mono text-xs text-zinc-500">
            {shortenAddress(address)} · {address}
          </p>
        </div>
        {data.profile.description && (
          <p className="whitespace-pre-wrap text-sm text-zinc-600">
            {data.profile.description}
          </p>
        )}
        <dl className="grid grid-cols-[140px_1fr] gap-y-1 text-xs">
          {v2 != null && (
            <>
              <dt className="text-zinc-500">Solde CRC</dt>
              <dd className="font-mono">{v2}</dd>
            </>
          )}
          {v1 != null && (
            <>
              <dt className="text-zinc-500">CRC (v1)</dt>
              <dd className="font-mono">{v1}</dd>
            </>
          )}
          {(data.trustsCount != null || data.trustedByCount != null) && (
            <>
              <dt className="text-zinc-500">Trust</dt>
              <dd>
                trust {data.trustsCount ?? 0} · trusted by{" "}
                {data.trustedByCount ?? 0}
              </dd>
            </>
          )}
          {data.profile.location && (
            <>
              <dt className="text-zinc-500">Localisation</dt>
              <dd>{data.profile.location}</dd>
            </>
          )}
        </dl>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <div className="size-24 animate-pulse rounded-full bg-zinc-200" />
      <div className="flex-1 space-y-3">
        <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-72 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 max-w-md animate-pulse rounded bg-zinc-200" />
      </div>
    </div>
  );
}
