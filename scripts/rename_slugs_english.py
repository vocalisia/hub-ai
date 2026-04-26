"""
Renomme tous les slugs FR → EN (neutre toutes langues)
Touche : content/blog/*.mdx + en/ de/ it/ + frontmatter slug + vercel.json redirects
"""
import re, yaml, json
from pathlib import Path

BLOG = Path("C:/Users/cohen.000/hub-ai/content/blog")
VERCEL = Path("C:/Users/cohen.000/hub-ai/vercel.json")

# ── Mapping FR slug → EN slug ─────────────────────────────────────────────────
SLUG_MAP = {
    # Cluster 1 — Agents IA
    "guide-agents-ia-autonomes-2025":              "autonomous-ai-agents-complete-guide-2026",
    "agent-whatsapp-ia-communication-client":       "whatsapp-ai-agent-customer-communication",
    "agent-vocal-ia-automatisation-appels":         "vocal-ai-agent-call-automation",
    "generation-leads-ia-methodes-2025":            "ai-lead-generation-methods-2026",
    "agents-ia-vs-chatbots-comparaison":            "ai-agents-vs-chatbots-comparison-2026",
    "ia-agentique-revolution-business":             "agentic-ai-business-revolution",
    "automatisation-prospection-commerciale-ia":    "ai-sales-prospecting-automation",
    "cas-usage-agents-ia-entreprise":               "ai-agents-business-use-cases",
    # Cluster 2 — SEO IA
    "seo-ia-2025-guide-complet":                   "ai-seo-2026-complete-guide",
    "geo-vs-seo-strategie-2025":                   "geo-vs-seo-strategy-2026",
    "recherche-vocale-optimisation-voice-search":   "voice-search-optimization-guide-2026",
    "marketing-digital-ia-pme-outils":              "ai-digital-marketing-sme-tools",
    "ia-transforme-referencement-naturel-2025":     "ai-transforms-seo-natural-referencing-2026",
    "seo-ia-pme-suisses-strategie-locale":          "ai-seo-swiss-sme-local-strategy",
    "contenu-vocal-ia-blog-audio-seo":              "ai-vocal-content-audio-blog-seo",
    # Cluster 3 — Confiance
    "eeat-google-2025-ia-autorite":                "eeat-google-2026-ai-authority",
    "vendre-en-ligne-2025-strategies-ia":           "sell-online-2026-ai-strategies",
    "securite-marketplace-ia-protection":           "marketplace-security-ai-protection",
    "confiance-client-ia-conversion-ecommerce":     "customer-trust-ai-ecommerce-conversion",
    "dropshipping-ia-2025-methode-complete":        "ai-dropshipping-2026-complete-method",
    "reputation-digitale-ia-ecommerçants":          "digital-reputation-ai-ecommerce-sellers",
    "certifications-ia-booster-conversions-ecommerce": "ai-certifications-boost-ecommerce-conversions",
    # Cluster 4 — Tech
    "tesla-ia-2025-innovation-technologique":       "tesla-ai-2026-tech-innovation",
    "innovations-tech-ia-business-digital-2025":    "tech-ai-innovations-digital-business-2026",
    "tendances-ia-2025-entrepreneurs":              "ai-trends-2026-entrepreneurs",
    "entrepreneurs-adoptent-ia-competitivite-2025": "entrepreneurs-adopt-ai-competitiveness-2026",
    # Hub cross
    "intelligence-artificielle-business-guide-complet": "artificial-intelligence-business-complete-guide",
    "reseau-sites-ia-ressources-digital":           "ai-sites-network-digital-resources",
    "11-outils-ia-indispensables-entreprises-2025": "11-essential-ai-tools-businesses-2026",
    "transformer-entreprise-ia-2025-guide":         "transform-business-ai-2026-guide",
}

def parse_fm(text):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if m:
        return yaml.safe_load(m.group(1)), text[m.end():]
    return {}, text

def update_fm_slug(text, new_slug):
    """Met à jour le slug dans le frontmatter."""
    m = re.match(r"^(---\s*\n)(.*?)(\n---\s*\n)", text, re.DOTALL)
    if not m:
        return text
    fm = yaml.safe_load(m.group(2))
    fm["slug"] = new_slug
    new_fm = yaml.dump(fm, allow_unicode=True, default_flow_style=False, sort_keys=False)
    return f"---\n{new_fm}---\n{text[m.end():]}"

def update_internal_links(text, slug_map):
    """Remplace les anciens slugs FR par les nouveaux slugs EN dans le contenu."""
    for old, new in slug_map.items():
        text = text.replace(f"/{old}/", f"/{new}/")
        text = text.replace(f"/{old})", f"/{new})")
        text = text.replace(f'"{old}"', f'"{new}"')
    return text

def main():
    langs = ["", "en", "de", "it"]   # "" = racine FR
    renamed = 0
    errors = []

    for old_slug, new_slug in SLUG_MAP.items():
        print(f"\n{old_slug}")
        print(f"  → {new_slug}")

        for lang in langs:
            base = BLOG / lang if lang else BLOG
            old_path = base / f"{old_slug}.mdx"
            new_path = base / f"{new_slug}.mdx"

            if not old_path.exists():
                print(f"  ⚠ {lang or 'fr'} — fichier introuvable: {old_path.name}")
                continue

            try:
                content = old_path.read_text(encoding="utf-8")
                # Mise à jour slug frontmatter
                content = update_fm_slug(content, new_slug)
                # Mise à jour liens internes
                content = update_internal_links(content, SLUG_MAP)
                # Écriture nouveau fichier
                new_path.write_text(content, encoding="utf-8")
                # Suppression ancien fichier
                old_path.unlink()
                print(f"  ✅ {lang or 'fr'} → {new_slug}.mdx")
                renamed += 1
            except Exception as e:
                print(f"  ❌ {lang or 'fr'} erreur: {e}")
                errors.append(str(e))

    # ── Mise à jour vercel.json (redirects) ──────────────────────────────────
    print("\n── Mise à jour vercel.json ──")
    vj = json.loads(VERCEL.read_text(encoding="utf-8"))

    # Ajouter redirects FR slugs → EN slugs pour les anciennes URLs
    existing_sources = {r["source"] for r in vj.get("redirects", [])}
    new_redirects = []

    for old_slug, new_slug in SLUG_MAP.items():
        # Redirect ancienne URL courte → nouveau slug
        for src in [f"/{old_slug}", f"/fr/blog/{old_slug}", f"/en/blog/{old_slug}",
                    f"/de/blog/{old_slug}", f"/it/blog/{old_slug}"]:
            if src not in existing_sources:
                new_redirects.append({
                    "source": src,
                    "destination": f"/fr/blog/{new_slug}",
                    "permanent": True
                })

    # Mettre à jour les redirects satellites existants
    updated_redirects = []
    for r in vj.get("redirects", []):
        src = r["source"].lstrip("/")
        if src in SLUG_MAP:
            # Mise à jour destination si elle pointait vers un slug FR
            new_r = dict(r)
            new_r["source"] = f"/{SLUG_MAP[src]}"
            updated_redirects.append(new_r)
            # Garder l'ancien aussi (301)
            updated_redirects.append({
                "source": r["source"],
                "destination": f"/{SLUG_MAP[src]}",
                "permanent": True
            })
        else:
            updated_redirects.append(r)

    vj["redirects"] = updated_redirects + new_redirects
    VERCEL.write_text(json.dumps(vj, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  ✅ vercel.json mis à jour ({len(new_redirects)} nouveaux redirects 301)")

    print(f"\n{'='*60}")
    print(f"✅ {renamed} fichiers renommés")
    if errors:
        print(f"❌ {len(errors)} erreurs: {errors[:3]}")

if __name__ == "__main__":
    main()
