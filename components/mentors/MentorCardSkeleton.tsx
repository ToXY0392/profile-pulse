export function MentorCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center rounded-xl border border-zinc-200 bg-white p-4">
      <div className="h-20 w-20 rounded-full bg-zinc-200" />
      <div className="mt-3 h-4 w-16 rounded bg-zinc-200" />
      <div className="mt-2 flex gap-1">
        <div className="h-5 w-10 rounded-full bg-zinc-200" />
        <div className="h-5 w-10 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}
