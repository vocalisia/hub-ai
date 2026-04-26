"""
Traduit le BODY de tous les articles EN/DE/IT
- Lit le fichier FR (racine content/blog/)
- Pour chaque fichier EN/DE/IT avec body encore en FR, remplace le body par la traduction
- Garde le frontmatter et le footer réseau déjà traduits
- Utilise deep-translator (Google Translate, sans clé API)
"""
import re
import time
import warnings
from pathlib import Path

warnings.filterwarnings("ignore")

from deep_translator import GoogleTranslator

BLOG = Path("C:/Users/cohen.000/hub-ai/content/blog")

LANG_MAP = {
    "en": "english",
    "de": "german",
    "it": "italian",
}

# Réseau footer déjà traduit — on le préserve tel quel
FOOTER_MARKERS = {
    "en": "## Our AI Network",
    "de": "## Unser KI-Netzwerk",
    "it": "## La Nostra Rete",
}
# Fallback si on ne trouve pas le marker spécifique
FOOTER_FALLBACK = "## Notre Réseau IA"


def split_frontmatter(text: str):
    """Retourne (frontmatter_raw, body_text)"""
    m = re.match(r"^(---\s*\n.*?\n---\s*\n)(.*)", text, re.DOTALL)
    if m:
        return m.group(1), m.group(2)
    return "", text


def split_body_footer(text: str, lang: str):
    """Sépare body principal du footer réseau déjà traduit."""
    marker = FOOTER_MARKERS.get(lang, "")
    if marker and marker in text:
        idx = text.index(marker)
        # Remonter jusqu'au --- avant le marker
        before = text[:idx]
        footer_block = text[idx:]
        # chercher le --- qui précède
        sep_idx = before.rfind("\n---\n")
        if sep_idx != -1:
            body = before[: sep_idx]
            footer = "\n---\n" + footer_block
        else:
            body = before
            footer = "\n---\n" + footer_block
        return body.rstrip(), footer
    # Fallback FR footer
    if FOOTER_FALLBACK in text:
        idx = text.index(FOOTER_FALLBACK)
        before = text[:idx]
        footer_block = text[idx:]
        sep_idx = before.rfind("\n---\n")
        if sep_idx != -1:
            body = before[:sep_idx]
            footer = "\n---\n" + footer_block
        else:
            body = before
            footer = "\n---\n" + footer_block
        return body.rstrip(), footer
    return text.rstrip(), ""


def is_french(text: str) -> bool:
    """Détecte si le texte est principalement en français."""
    fr_markers = [
        "## Qu'est-ce",
        "## Comment",
        "## Pourquoi",
        "## Les ",
        "Conclusion\n\nLes ",
        "est un système logiciel",
        "ce que sont",
        "les entreprises",
        "### Définition",
        "### Étape",
        "vous découvrirez",
        "d'un agent",
    ]
    count = sum(1 for m in fr_markers if m in text)
    return count >= 2


def translate_chunk(text: str, source: str, target: str, max_len: int = 4500) -> str:
    """Traduit un texte en le découpant si nécessaire."""
    if not text.strip():
        return text

    translator = GoogleTranslator(source=source, target=target)

    if len(text) <= max_len:
        try:
            time.sleep(0.3)
            return translator.translate(text)
        except Exception as e:
            print(f"    ⚠ translate error: {e}")
            return text

    # Découper sur les lignes vides (paragraphes)
    paragraphs = re.split(r"\n\n+", text)
    translated_parts = []
    current_chunk = ""

    for para in paragraphs:
        if len(current_chunk) + len(para) + 2 < max_len:
            current_chunk += ("\n\n" if current_chunk else "") + para
        else:
            if current_chunk:
                try:
                    time.sleep(0.3)
                    translated_parts.append(translator.translate(current_chunk))
                except Exception as e:
                    print(f"    ⚠ chunk error: {e}")
                    translated_parts.append(current_chunk)
            current_chunk = para

    if current_chunk:
        try:
            time.sleep(0.3)
            translated_parts.append(translator.translate(current_chunk))
        except Exception as e:
            print(f"    ⚠ final chunk error: {e}")
            translated_parts.append(current_chunk)

    return "\n\n".join(translated_parts)


def translate_markdown_body(fr_body: str, target_lang: str) -> str:
    """
    Traduit le body markdown FR → target_lang.
    Préserve les blocs de code, URLs, et marqueurs markdown.
    """
    target_code = target_lang  # 'en', 'de', 'it'

    # Protéger les URLs et liens markdown
    # Remplacer les liens [text](url) par placeholders
    links = []
    def protect_link(m):
        links.append(m.group(0))
        return f"LNKPH{len(links)-1}END"

    protected = re.sub(r'\[([^\]]*)\]\([^\)]*\)', protect_link, fr_body)

    # Protéger les blocs de code
    codes = []
    def protect_code(m):
        codes.append(m.group(0))
        return f"CODEPH{len(codes)-1}END"

    protected = re.sub(r'```[\s\S]*?```', protect_code, protected)
    protected = re.sub(r'`[^`]+`', protect_code, protected)

    # Traduire
    translated = translate_chunk(protected, source="fr", target=target_code)

    # Restaurer les codes
    for i, code in enumerate(codes):
        translated = translated.replace(f"CODEPH{i}END", code)
        # Google peut modifier la casse ou ajouter espaces
        translated = translated.replace(f"CODEPH {i} END", code)
        translated = translated.replace(f"codeph{i}end", code)

    # Restaurer les liens
    for i, link in enumerate(links):
        translated = translated.replace(f"LNKPH{i}END", link)
        translated = translated.replace(f"LNKPH {i} END", link)
        translated = translated.replace(f"lnkph{i}end", link)

    return translated


def process_file(fr_path: Path, locale_dir: Path, lang: str):
    """Traduit un fichier FR vers la locale cible."""
    filename = fr_path.name
    target_path = locale_dir / filename

    if not target_path.exists():
        print(f"  ⚠ {lang}: no target file for {filename}")
        return False

    target_text = target_path.read_text(encoding="utf-8")
    fm, body_all = split_frontmatter(target_text)
    body, footer = split_body_footer(body_all, lang)

    if not is_french(body):
        print(f"  ✓ {lang}: already translated")
        return False  # Already translated

    print(f"  → translating {lang}...", end=" ", flush=True)

    try:
        translated_body = translate_markdown_body(body, lang)
        new_content = fm + translated_body + "\n" + footer + "\n"
        target_path.write_text(new_content, encoding="utf-8")
        print("done")
        return True
    except Exception as e:
        print(f"ERROR: {e}")
        return False


def main():
    fr_files = sorted(BLOG.glob("*.mdx"))
    print(f"Found {len(fr_files)} FR articles\n")

    translated = 0
    skipped = 0
    errors = 0

    for fr_path in fr_files:
        print(f"\n[{fr_files.index(fr_path)+1}/{len(fr_files)}] {fr_path.name}")
        for lang in ["en", "de", "it"]:
            locale_dir = BLOG / lang
            result = process_file(fr_path, locale_dir, lang)
            if result:
                translated += 1
            else:
                skipped += 1

    print(f"\n{'='*60}")
    print(f"✅ Translated: {translated} files")
    print(f"⏩ Skipped (already done): {skipped} files")
    print(f"❌ Errors: {errors}")


if __name__ == "__main__":
    main()
