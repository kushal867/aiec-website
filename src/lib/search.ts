import {
  destinations,
  universitySeed,
  testPrepData,
  articles,
  faqs,
} from "../data/content";

export type SearchResult = {
  group: string;
  label: string;
  sub?: string;
  href: string;
};

export function runSearch(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  destinations.forEach((d) => {
    if (d.name.toLowerCase().includes(q)) {
      results.push({
        group: "Countries",
        label: d.name,
        sub: `${d.universities} partner universities`,
        href: `/destinations/${d.code}`,
      });
    }
  });

  universitySeed.forEach((u) => {
    const haystack = `${u.name} ${u.field} ${u.level} ${u.country}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Universities",
        label: u.name,
        sub: `${u.field} · ${u.level}`,
        href: "/universities",
      });
    }
  });

  Object.values(testPrepData).forEach((t) => {
    const haystack = `${t.name} ${t.fullName} ${t.what}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Test Preparation",
        label: t.name,
        sub: t.fullName,
        href: `/test-prep/${t.slug}`,
      });
    }
  });

  articles.forEach((a) => {
    const haystack = `${a.title} ${a.excerpt} ${a.category}`.toLowerCase();
    if (haystack.includes(q)) {
      results.push({
        group: "Articles",
        label: a.title,
        sub: a.category,
        href: `/learning-hub/${a.id}`,
      });
    }
  });

  faqs.forEach((f) => {
    if (f.q.toLowerCase().includes(q)) {
      results.push({
        group: "FAQ",
        label: f.q,
        href: "/faq",
      });
    }
  });

  return results.slice(0, 24);
}
