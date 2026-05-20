import { SendTransactionDemo } from "@/components/actions/SendTransactionDemo";
import { ProfileLookup } from "@/components/profile/ProfileLookup";
import { ConnectionCard } from "@/components/wallet/ConnectionCard";
import { SignInDemo } from "@/components/wallet/SignInDemo";

export default function Home() {
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
