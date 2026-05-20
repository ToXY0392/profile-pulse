export function MentorAvatar({ name }: { name: string }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-sm font-semibold text-zinc-500"
      aria-hidden
    >
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
}
