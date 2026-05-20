export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-white">
      {label}
    </span>
  );
}
