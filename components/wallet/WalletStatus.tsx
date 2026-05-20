"use client";

import { useWallet } from "@/components/wallet/WalletProvider";
import { shortenAddress } from "@/lib/utils";

export function WalletStatus() {
  const { address, isConnected } = useWallet();

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs ${
        isConnected
          ? "bg-emerald-100 text-emerald-800"
          : "bg-zinc-200 text-zinc-600"
      }`}
    >
      <span
        className={`size-2 rounded-full ${
          isConnected ? "bg-emerald-500" : "bg-zinc-400"
        }`}
        aria-hidden
      />
      {address ? shortenAddress(address) : "Non connecté"}
    </span>
  );
}
