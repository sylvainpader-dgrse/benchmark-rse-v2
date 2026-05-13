# -*- coding: utf-8 -*-
"""Extraction HD EMLYON : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EMLYON BUSINESS SCHOOL\2025_Rapport_d_engagement-VF.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('emlyon.jpg',         0,  "Couverture Rapport d'engagement 2024 (Société à Mission)"),
    ('emlyon_inner1.jpg',  6,  "p.7 — Plan stratégique Résonances 2028 + 5 qualités makers + objectifs Formation/Recherche/Fonctionnement"),
    ('emlyon_inner2.jpg',  7,  "p.8 — Tableau Progression des engagements : 4 colonnes (objectif statutaire / Résonances / Réalisations / Niveau de maturité)"),
    ('emlyon_inner3.jpg',  10, "p.11 — Gouvernance : Comité de Mission 9 personnes dont 6 externes + Organisme Tiers Indépendant accrédité COFRAC"),
    ('emlyon_inner4.jpg',  17, "p.18 — Focus rentrée 2024 ODD 11 villes durables : 3300 étudiants, 150 maraudes, 300 cleanwalks, exposition art"),
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

print(f'Extraction HD EMLYON : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
