# -*- coding: utf-8 -*-
"""Extraction HD Audencia : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\Audencia\RAPPORT_RSE_2026 (1).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('audencia.jpg',         0,   "Couverture Rapport DD&RS 2026"),
    ('audencia_inner1.jpg',  2,   "p.3 — Lettre d'engagement DG (Sébastien Tran) Global Compact / PRME"),
    ('audencia_inner2.jpg',  3,   "p.4 — Stratégie & gouvernance : schéma directeur DD&RS 2030 + matrice de double matérialité (23 IRO)"),
    ('audencia_inner3.jpg',  4,   "p.5 — Réalisations 2025 + Projection 2026 + Chiffres clés Stratégie & gouvernance"),
    ('audencia_inner4.jpg',  14,  "p.15 — Tableau récap consolidé : 15 KPIs sur 5 axes, comparaison 2024 vs 2025"),
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

print(f'Extraction HD Audencia : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
