# -*- coding: utf-8 -*-
"""Extraction HD NEOMA : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\NEOMA\NEOMA-Rapport-d-engagement-TSE-2025 (3).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('neoma.jpg',         0,   "Couverture Rapport d'engagement 2025 (Transition Sociale et Environnementale)"),
    ('neoma_inner1.jpg',  7,   "p.8 : Plan stratégique 2023-2027 « Engage for the Future » avec 9 objectifs stratégiques répartis sur 3 piliers (3+3+3)"),
    ('neoma_inner2.jpg',  10,  "p.11 : Piliers TSE posés dès 2018 + 8 engagements externes signés (PRME, Charte Diversité, Handicap, STOPE, Accord climat Rouen, Grenoble, Shift Project)"),
    ('neoma_inner3.jpg',  12,  "p.13 : Engagement Alumni : NEOMA Alumni Engaged (manifeste + répertoire) + portrait d'Amélie Kanagasabai (palmarès Les Echos 35 leaders positifs <35 ans)"),
    ('neoma_inner4.jpg',  16,  "p.17 : Dispositif NEOMACT en 6 briques (Academy avec AXA Climate, Profile, Project, Community, Days, Awards) - 10 000 étudiants certifiés en 2 ans"),
    ('neoma_inner5.jpg',  31,  "p.32 : NEOMACT Awards : 3 catégories de prix étudiants (Engaged for Society / Diversity / Planet) + Change Makers Awards MSc"),
]

def extract_page_hd(pdf_path, out_jpg, page_idx):
    doc = fitz.open(str(pdf_path))
    if page_idx >= len(doc):
        page_idx = max(0, len(doc) - 1)
    p = doc[page_idx]
    mat = fitz.Matrix(DPI/72, DPI/72)
    pix = p.get_pixmap(matrix=mat, alpha=False)
    img_bytes = pix.tobytes('png')
    im = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    w, h = im.size
    if w > MAX_W:
        ratio = MAX_W / w
        im = im.resize((MAX_W, int(h * ratio)), Image.LANCZOS)
    im.save(str(out_jpg), 'JPEG', quality=JPG_QUAL, optimize=True, progressive=True)
    doc.close()
    return im.size, out_jpg.stat().st_size // 1024

print(f'Extraction HD NEOMA : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
