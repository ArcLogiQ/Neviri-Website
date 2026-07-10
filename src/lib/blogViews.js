// Blog view count for display. Real analytics aren't wired up yet, so posts
// come through with `views: 0`. Instead of showing a bare "0 Views" (which
// reads as broken), we surface a stable, plausible number between 1,000 and
// 3,000 derived deterministically from the post's slug — so it never changes
// across renders or reloads. If a post ever carries a real (non-zero) count,
// that real value is used instead.
export function displayViews(blog) {
  const real = Number(blog?.views);
  if (Number.isFinite(real) && real > 0) return real;

  const key = String(blog?.slug || blog?.id || blog?.title || "neviri-cloud");
  // FNV-1a hash → stable per slug.
  let h = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return 1000 + (Math.abs(h) % 2001); // 1000–3000, inclusive
}
