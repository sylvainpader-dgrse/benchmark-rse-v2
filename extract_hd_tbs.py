# -*- coding: utf-8 -*-
"""Extraction HD TBS Education : couverture + 5 pages interieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\TBS\TBS-Education-Rapport-Societe-A-Mission-2024-2025 (1).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (cle image, page_idx 0-based, description)
TARGETS = [
    ('tbs.jpg',         0,   "Couverture Rapport de Societe a Mission 24-25 (janvier 2026)"),
    ('tbs_inner1.jpg',  2,   "p.3 : Comite de Mission TBS Education : 8 membres avec photos, fonctions et rattachements (DG, Doyenne, externe ONG/entreprises/academique)"),
    ('tbs_inner2.jpg',  7,   "p.8 : Raison d'etre + 4 objectifs statutaires (OS#1 Recherche / OS#2 Formation / OS#3 Diversite / OS#4 Empreinte) en visuel central"),
    ('tbs_inner3.jpg',  9,   "p.10 : Tableau d'engagement type avec 4 colonnes (Indicateurs N-1 / Realisations N / Projets N+1 / Objectif 2026 chiffre)"),
    ('tbs_inner4.jpg',  10,  "p.11 : Zoom sur le Centre d'excellence RSE-DD avec 5 axes thematiques + cartographie ODD (10/9/11/12/13/16/4/3/5/8)"),
    ('tbs_inner5.jpg',  27,  "p.28 : Zoom ACT Sup' : trajectoire climat TBS via dispositif ADEME/CDP en plusieurs etapes (maturite, risques, trajectoire Accord de Paris, plan d'actions)"),
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

print(f'Extraction HD TBS Education : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
