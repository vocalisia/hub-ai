export type NormalizeBlogHrefOpts = {
  blogPathPrefix?: string;
  sameOriginHosts?: string[];
};

function hostKey(host: string): string {
  return host.replace(/^www\./i, "").toLowerCase();
}

export function normalizeBlogMarkdownHref(
  raw: string,
  locale: string,
  opts?: NormalizeBlogHrefOpts
): string {
  const blogBase = (opts?.blogPathPrefix ?? `/${locale}/blog`).replace(/\/$/, "");
  const hosts = new Set((opts?.sameOriginHosts ?? []).map(hostKey));

  const h = raw.trim();
  if (!h) return "#";
  if (/^mailto:/i.test(h) || /^tel:/i.test(h) || h.startsWith("#")) return h;

  if (/^https?:\/\//i.test(h)) {
    try {
      const u = new URL(h);
      if (hosts.has(hostKey(u.hostname))) {
        return u.pathname + u.search + u.hash || "/";
      }
      return h;
    } catch {
      return h;
    }
  }

  if (h.startsWith("//")) return h;
  if (h.startsWith("/")) return h;
  if (/^[a-z]{2}\/blog\//i.test(h)) return `/${h}`;
  if (/^blog\//i.test(h)) return `${blogBase}/${h.slice(5)}`;
  if (!h.includes("/")) return `${blogBase}/${h}`;
  return `/${h.replace(/^\/+/, "")}`;
}
