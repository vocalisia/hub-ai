"""
Génère toutes les images coverImage manquantes (1200x630 JPG)
Chaque image a une couleur unique selon le slug/catégorie
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import hashlib

PUBLIC = Path("C:/Users/cohen.000/hub-ai/public")
NEEDED_FILE = Path("C:/Users/cohen.000/hub-ai/scripts/cover_images_needed.txt")

# Palettes par catégorie (couleur principale, couleur accent)
PALETTES = {
    "agent": ((20, 5, 50), (120, 40, 255)),
    "vocal": ((5, 20, 50), (30, 100, 255)),
    "whatsapp": ((5, 40, 20), (20, 180, 80)),
    "seo": ((40, 10, 5), (220, 80, 30)),
    "lead": ((40, 30, 5), (200, 150, 20)),
    "ia": ((10, 10, 40), (80, 60, 220)),
    "trust": ((5, 35, 35), (20, 160, 160)),
    "ecommerce": ((35, 5, 35), (180, 30, 180)),
    "tesla": ((5, 30, 5), (30, 200, 80)),
    "architecture": ((20, 20, 40), (100, 100, 220)),
    "default": ((3, 0, 20), (88, 28, 235)),
}

def get_palette(slug: str):
    slug_lower = slug.lower()
    for key, palette in PALETTES.items():
        if key in slug_lower:
            return palette
    # Hash-based color for variety
    h = int(hashlib.md5(slug.encode()).hexdigest()[:6], 16)
    r = (h >> 16) & 0xFF
    g = (h >> 8) & 0xFF
    b = h & 0xFF
    bg = (max(3, r // 8), max(3, g // 8), max(3, b // 8))
    accent = (min(255, r // 2 + 50), min(255, g // 2 + 50), min(255, b // 2 + 50))
    return bg, accent

def make_cover(img_path: str):
    dest = PUBLIC / img_path.lstrip("/")
    dest.parent.mkdir(parents=True, exist_ok=True)

    if dest.exists():
        return False  # skip existing

    slug = dest.stem
    bg_color, accent = get_palette(slug)

    img = Image.new("RGB", (1200, 630), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Gradient effect
    for i in range(400):
        alpha = int(60 * (1 - i / 400))
        c = tuple(min(255, bg_color[j] + accent[j] * alpha // 255) for j in range(3))
        draw.rectangle([800 - i, 0, 801 - i, 630], fill=c)

    # Border
    draw.rectangle([0, 0, 1199, 629], outline=accent, width=2)

    # Category label from slug
    category = slug.replace("-", " ").replace("_", " ").title()[:40]

    try:
        font_xl = ImageFont.truetype("C:/Windows/Fonts/Arialbd.ttf", 72)
        font_lg = ImageFont.truetype("C:/Windows/Fonts/Arial.ttf", 32)
        font_sm = ImageFont.truetype("C:/Windows/Fonts/Arial.ttf", 22)
    except Exception:
        font_xl = ImageFont.load_default()
        font_lg = font_xl
        font_sm = font_xl

    # AI-DUE brand
    draw.text((60, 60), "AI-DUE", fill=tuple(min(255, c + 80) for c in accent), font=font_xl)

    # Article label
    draw.text((60, 170), category[:50], fill=(220, 220, 220), font=font_lg)

    # Subtitle line
    draw.text((60, 230), "Intelligence Artificielle · Business · Innovation", fill=(100, 100, 130), font=font_sm)

    # Bottom bar
    draw.rectangle([0, 575, 1200, 630], fill=tuple(max(0, c - 5) for c in bg_color))
    draw.text((60, 590), "ai-due.com", fill=(100, 100, 130), font=font_sm)

    # Decorative circle
    draw.ellipse([1050, 100, 1160, 210], fill=tuple(c // 3 for c in accent))
    draw.ellipse([1080, 130, 1130, 180], fill=accent)

    img.save(str(dest), "JPEG", quality=85)
    return True


def main():
    paths = NEEDED_FILE.read_text(encoding="utf-8").strip().split("\n")
    created = 0
    skipped = 0
    for p in paths:
        if p.strip():
            result = make_cover(p.strip())
            if result:
                print(f"  OK {p}")
                created += 1
            else:
                skipped += 1
    print(f"\nCreated: {created}, Skipped (existing): {skipped}")

if __name__ == "__main__":
    main()
