# -*- coding: utf-8 -*-
"""Extraction HD AD Education : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\AD education\ADE24.11_Rapport-ESG.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('ad.jpg',         0,   "Couverture sobre « 2023-2024 RAPPORT » (sans mention ESG)"),
    ('ad_inner1.jpg',  6,   "p.7 : Engagements ESG d'AD Education structurés en 3 piliers (Environnement, Social, Gouvernance) avec 4-5 engagements concrets chacun"),
    ('ad_inner2.jpg',  7,   "p.8 : Jalons 2023-2024 : 7 chiffres clés visuels sur les avancées RSE de l'année"),
    ('ad_inner3.jpg',  8,   "p.9 : Faits marquants 2023-2024 en timeline mensuelle (7 dates clés de l'année avec action associée)"),
    ('ad_inner4.jpg',  18,  "p.19 : Com For Climate : 2 400 étudiants ESP en 240 agences pendant 2 semaines pour répondre à des briefs d'annonceurs engagés (Greenpeace, Samsung, Orange, Fermes d'avenir)"),
    ('ad_inner5.jpg',  26,  "p.27 : Création de la Fondation AD Education + interview Q&A (3 questions à Dominique Beccaria, directrice générale)"),
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

print(f'Extraction HD AD Education : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
