# -*- coding: utf-8 -*-
"""Extraction HD KEDGE : couverture + 4 doubles-pages distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\KEDGE\kedge-rapportdd-20-21-web-planches (4).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
# Layout : 5 images (cover portrait + 4 landscape inner) pour une grille pres-images--5 propre
# (cover span 2 rows + 4 landscape inner en 2x2). La timeline portrait p.16-17 a été retirée
# car elle créait un déséquilibre visuel avec les autres landscape inner.
TARGETS = [
    ('kedge.jpg',         0,  "Couverture Rapport DD 2020-2021 « Cultivons l'esprit d'éthique »"),
    ('kedge_inner1.jpg',  1,  "p.2-3 : Édito DG + 6 engagements externes expliqués (Global Compact, HESI, Label DD&RS, PIR, PRME, Sulitest) + chiffres clés + sommaire"),
    ('kedge_inner2.jpg',  3,  "p.6-7 : Enseignement & formation : Faits marquants 2020-2021 + encadré « KPI Objectif 2025 » + Principe 3 PRME (Méthode)"),
    ('kedge_inner3.jpg',  4,  "p.8-9 : Recherche : 4 chaires DD alignées mission (Vin & Société, Candriam, Société Générale handicap, Sephora) + 4 faits marquants (InViCy, VitiREV, Mon Jardin, La Fumainerie)"),
    ('kedge_inner4.jpg',  7,  "p.14-15 : Indicateurs clés : 14 KPIs structurés par 5 axes (Stratégie, Politique sociale, Enseignement, Gestion environnementale, Recherche) avec flèches d'évolution vs 2019"),
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

print(f'Extraction HD KEDGE : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
