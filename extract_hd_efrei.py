# -*- coding: utf-8 -*-
"""Extraction HD EFREI : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EFREI\EFREI-rapport-RSE-2026-17122025.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('efrei.jpg',         0,   "Couverture Rapport de Progrès 2026"),
    ('efrei_inner1.jpg',  7,   "p.8 — Chiffres clés (70% PP / 100% processus / 10 journées DD)"),
    ('efrei_inner2.jpg',  10,  "p.11 — Journée Efrei for Good Xperience 2025 (3 400 étudiants, 43 ateliers, 36 entreprises)"),
    ('efrei_inner3.jpg',  13,  "p.14 — Engagement #2 : Méthodologie d'intégration des 17 ODD dans les enseignements"),
    ('efrei_inner4.jpg',  17,  "p.18 — Engagement #3 : tableau « Nos enjeux / Indicateurs » + associations"),
    ('efrei_inner5.jpg',  20,  "p.21 — Startups étudiantes incubées (FALC'ON, ETHEIA, AGRIWIZE, HOLLY)"),
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

print(f'Extraction HD EFREI : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
