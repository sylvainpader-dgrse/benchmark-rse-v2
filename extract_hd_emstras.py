# -*- coding: utf-8 -*-
"""Extraction HD EM Strasbourg : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EM STRASBOURG BUSINESS SCHOOL\rapport_rso_em_strasbourg_business_school_2023_fr.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (cle image, page_idx 0-based, description)
TARGETS = [
    ('emstras.jpg',         0,   "Couverture Rapport RSO 2023 (9eme edition, PRME)"),
    ('emstras_inner1.jpg',  4,   "p.5 : Politique RSO en 4 axes (Formation, Fonctionnement, Recherche, Impact societal) + ancrage ODD"),
    ('emstras_inner2.jpg',  5,   "p.6 : Tableau ODD/cibles relies aux objectifs RSO par axe et theme"),
    ('emstras_inner3.jpg',  9,   "p.10 : Gouvernance RSO (Comite RSO + Conseil d'Ecole + Comite Executif) avec schema reporting"),
    ('emstras_inner4.jpg',  15,  "p.16 : Bilan carbone Universite de Strasbourg 2021 : 91 567 tCO2e (premier bilan global)"),
    ('emstras_inner5.jpg',  30,  "p.31 : Appropriation des ODD : graphique de contribution recherche aux 13 ODD couverts"),
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

print(f'Extraction HD EM Strasbourg : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
