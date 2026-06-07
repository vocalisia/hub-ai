// src/data/news.ts — auto-managed by vault369 news publisher. Do not edit by hand.
// Articles are pre-rendered to HTML at generation time (no markdown dep needed).

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;        // ISO date
  excerpt: string;
  html: string;        // pre-rendered, sanitized article body
  cover?: string;      // optional cover image URL
}

export const newsArticles: NewsArticle[] = [];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getLatestNews(limit = 50): NewsArticle[] {
  return [...newsArticles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
