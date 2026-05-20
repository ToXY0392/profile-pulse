export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  const head = address.startsWith("0x") ? 2 + chars : chars;
  return `${address.slice(0, head)}…${address.slice(-chars)}`;
}

export function formatCrc(value: string | undefined): string | null {
  if (!value) return null;
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
