"""
Injecte les 30 articles Capital/Business → hub-ai/content/blog/
FR + traductions EN / DE / IT
"""
import os, re, yaml, time, anthropic
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent.parent / "cocon-semantique-project" / ".env")

SRC_DIR  = Path(__file__).parent.parent.parent / "cocon-semantique-project" / "content-generator" / "output" / "ai-due-30-articles"
BLOG_DIR = Path(__file__).parent.parent / "content" / "blog"
BLOG_DIR.mkdir(parents=True, exist_ok=True)
for lang in ["en", "de", "it"]:
    (BLOG_DIR / lang).mkdir(exist_ok=True)

AI = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

CLUSTER_CATS = {
    "agents-ia-automatisation": "Agents IA & Automatisation",
    "seo-ia-visibilite":        "SEO IA & Visibilité",
    "confiance-eeat":           "Confiance & E-E-A-T",
    "tech-innovation":          "Tech & Innovation",
}

SITES = {
    "vocalis.pro":       "https://vocalis.pro",
    "vocalis.blog":      "https://vocalis.blog",
    "tesla-mag.ch":      "https://tesla-mag.ch",
    "master-seller.fr":  "https://master-seller.fr",
    "iapmesuisse.ch":    "https://iapmesuisse.ch",
    "seo-true.com":      "https://seo-true.com",
    "trustly-ai.com":    "https://trustly-ai.com",
    "trust-vault.com":   "https://trust-vault.com",
    "ai-due.com":        "https://ai-due.com",
    "agents-ia.pro":     "https://agents-ia.pro",
    "agentic-whatsup.com":"https://agentic-whatsup.com",
    "lead-gene.com":     "https://lead-gene.com",
    "vocalis-ai.org":    "https://vocalis-ai.org",
    "woman-cute.com":    "https://woman-cute.com",
}

def parse_fm(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if m:
        return yaml.safe_load(m.group(1)), text[m.end():]
    return {}, text

def estimate_read(text):
    return max(3, len(text.split()) // 200)

def guess_cluster(meta, fname):
    c = meta.get("cluster","")
    if c: return c
    f = fname.lower()
    if any(k in f for k in ["agent","whatsapp","vocal","lead","automatisa"]): return "agents-ia-automatisation"
    if any(k in f for k in ["seo","voice","recherche","suisse","pme","geo"]): return "seo-ia-visibilite"
    if any(k in f for k in ["confiance","eeat","trust","certif","reputation","securite"]): return "confiance-eeat"
    if any(k in f for k in ["tesla","tech","innovation","tendance"]): return "tech-innovation"
    return "agents-ia-automatisation"

def enrich_body(body, liens):
    """Injecte les liens vers les sites du réseau dans le corps de l'article."""
    # Remplace les mentions de domaines par des vrais liens
    for domain, url in SITES.items():
        short = domain.replace(".com","").replace(".pro","").replace(".ch","").replace(".fr","").replace(".org","").replace(".blog","")
        # Seulement si pas déjà dans un lien markdown
        pattern = rf"(?<!\[)(?<!\()(?<!href=\")(?<!href=')(https?://)?" + re.escape(domain) + r"(?!\))"
        body = re.sub(pattern, f"[{domain}]({url})", body, flags=re.IGNORECASE)
    return body

def translate(text, lang, context="article"):
    lang_names = {"en":"English","de":"German","it":"Italian"}
    lng = lang_names.get(lang, lang)

    if context == "title":
        prompt = f"Translate this title to {lng}. Return ONLY the translated title, no quotes, no explanation:\n{text}"
        max_tok = 100
    elif context == "excerpt":
        prompt = f"Translate this excerpt to {lng}. Return ONLY the translated text, no explanation:\n{text}"
        max_tok = 300
    else:
        # Full article translation
        prompt = f"""Translate this entire MDX article to {lng}.
Rules:
- Keep ALL markdown formatting, headings, links, code blocks exactly
- Translate ALL text content including H1, H2, H3
- Keep frontmatter field NAMES in English, translate VALUES (title, excerpt, meta_description only)
- Keep URLs unchanged
- Professional magazine style (Capital/Business Insider tone)
- Return ONLY the translated MDX, no explanation

Article:
{text}"""
        max_tok = 8000

    msg = AI.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=max_tok,
        messages=[{"role":"user","content":prompt}]
    )
    return msg.content[0].text.strip()

def build_mdx(meta, body, fname, lang="fr"):
    cluster  = guess_cluster(meta, fname)
    category = CLUSTER_CATS.get(cluster, "Intelligence Artificielle")
    title    = meta.get("title", fname)
    slug     = meta.get("slug","").strip("/") or re.sub(r"^article-\d+-","", fname.replace(".md",""))
    excerpt  = meta.get("meta_description", meta.get("excerpt", ""))[:200]
    kw       = meta.get("focus_keyword","")
    liens    = meta.get("liens_externes", [])
    read_t   = estimate_read(body)

    # Tags = liens externes + focus keyword words
    tags = list(dict.fromkeys([kw] + [d.replace(".com","").replace(".pro","") for d in liens if d]))[:6]

    fm = {
        "title":         title,
        "slug":          slug,
        "date":          "2026-04-11",
        "author":        "AI-DUE Editorial",
        "category":      category,
        "tags":          tags,
        "geo":           {"city":"Paris","region":"Ile-de-France","country":"FR","lat":48.8566,"lng":2.3522,"continent":"Europe"},
        "coverImage":    f"/images/{slug}.jpg",
        "readTime":      read_t,
        "excerpt":       excerpt,
        "focus_keyword": kw,
        "schema":        {"type":"Article","datePublished":"2026-04-11","keywords": ", ".join(tags)},
        "internal_links": liens,
    }

    fm_str = yaml.dump(fm, allow_unicode=True, default_flow_style=False, sort_keys=False)
    enriched = enrich_body(body, liens)

    # Footer maillage réseau
    footer = "\n\n---\n\n## 🔗 Notre réseau de sites IA\n\n"
    for d, u in SITES.items():
        footer += f"- [{d}]({u})\n"

    return f"---\n{fm_str}---\n\n{enriched}{footer}"


def main():
    articles = sorted(SRC_DIR.glob("article-*.md"))
    print(f"📚 {len(articles)} articles à traiter\n")

    for i, fp in enumerate(articles, 1):
        raw  = fp.read_text(encoding="utf-8")
        meta, body = parse_fm(raw)
        slug = (meta.get("slug","").strip("/") or
                re.sub(r"^article-\d+-","", fp.stem))
        out_name = slug + ".mdx"
        print(f"[{i:02d}/{len(articles)}] {out_name}")

        # ── FR (original) ───────────────────────────────────────────
        fr_mdx = build_mdx(meta, body, fp.name, lang="fr")
        out_fr = BLOG_DIR / out_name
        out_fr.write_text(fr_mdx, encoding="utf-8")
        print(f"  ✅ FR → {out_fr.name}")

        # ── Traductions EN / DE / IT ─────────────────────────────────
        for lang in ["en", "de", "it"]:
            out_path = BLOG_DIR / lang / out_name
            if out_path.exists():
                print(f"  ⏭ {lang.upper()} déjà traduit")
                continue
            try:
                translated = translate(fr_mdx, lang, context="full")
                out_path.write_text(translated, encoding="utf-8")
                print(f"  ✅ {lang.upper()} → {lang}/{out_name}")
                time.sleep(0.5)
            except Exception as e:
                print(f"  ⚠ {lang.upper()} erreur: {e}")

        print()

    print("=" * 60)
    print(f"✅ {len(articles)} articles injectés dans hub-ai/content/blog/")
    print("🚀 Lance: cd hub-ai && vercel --prod")


if __name__ == "__main__":
    main()
