export function slugify(name: string, id: string | number): string {
  return `${name.toLowerCase().replaceAll(/[\s,-]+/g, "-")}-${id}`;
}

export function extractIdFromSlug(slug: string): string | null {
  if (!slug) return null;
  const parts = slug.split("-");
  return parts.pop() || null;
}
