/** Decap list с одним полем `line` → string[] для React */

export function denormalizeLineList(raw: unknown, fallback: string[]): string[] {
  if (raw === undefined || raw === null) return fallback;
  if (!Array.isArray(raw)) return fallback;
  if (raw.length === 0) return [];
  const first = raw[0];
  if (typeof first === "object" && first !== null && "line" in first) {
    return (raw as { line: string }[]).map((x) => String(x.line ?? ""));
  }
  return raw as string[];
}
