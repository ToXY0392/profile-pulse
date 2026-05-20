import type { Metadata } from "next";

import { VercelInsights } from "@/components/analytics/VercelInsights";
import { AppShell } from "@/components/layout/AppShell";
import { WalletProvider } from "@/components/wallet/WalletProvider";

export const metadata: Metadata = {
  title: "Profile Pulse — Circles mini-app",
  description:
    "Tableau de bord Circles : profil, trust, solde CRC, connexion et transactions embedded.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <WalletProvider>
          <AppShell>{children}</AppShell>
          <VercelInsights />
        </WalletProvider>
      </body>
    </html>
  );
}
