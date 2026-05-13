# -*- coding: utf-8 -*-
"""Extraction HD BSB : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\BSB\BSB - #5e Rapport RSE2024_FR - Medium.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('bsb.jpg',         0,   "Couverture 5e Rapport de Responsabilité Sociétale, décembre 2024"),
    ('bsb_inner1.jpg',  4,   "p.5 — Notre stratégie RSE : 3 piliers (Act for Respect, Sustainability, Empowerment) + 6 objectifs alignés sur 6 cibles ODD précises (10.3, 12.8, 16.6, 17.6, 4.7, 4.a)"),
    ('bsb_inner2.jpg',  5,   "p.6 — Un engagement de longue date : timeline 2003-2024 qui retrace 21 ans d'engagement RSE sur 13 jalons"),
    ('bsb_inner3.jpg',  6,   "p.7 — Un engagement affirmé et reconnu : 8 labels et chartes regroupés sur 1 page (DD&RS, Positive Impact Rating, HappyAtSchool, PRME, Charte Diversité, Charte LGBT+, Accord Grenoble, Accord ODD)"),
    ('bsb_inner4.jpg',  20,  "p.21 — Nos futurs projets : 12 projets prioritaires 2024-26 structurés par pilier (Respect, Sustainability, Empowerment) et alignés sur les 6 cibles ODD"),
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

print(f'Extraction HD BSB : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
