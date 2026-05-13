# -*- coding: utf-8 -*-
"""Extraction HD INSEAD : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\INSEAD\Sustainability-Report-2023_spread.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('insead.jpg',         0,   "Couverture Sustainability Report Academic Years 2021-2022 & 2022-2023"),
    ('insead_inner1.jpg',  3,   "p.4-5 : Foreword by Dean Francisco Veloso (GRI 2-22, UN PRME PRINCIPLE 1)"),
    ('insead_inner2.jpg',  5,   "p.8-9 : The Business School for the World, 4 campus, 159 faculty, 67 600 alumni"),
    ('insead_inner3.jpg',  7,   "p.12-13 : Our approach to Sustainability, 4 piliers Knowledge / Learning / Engagement / Walk the Talk + frise historique 1968-2018"),
    ('insead_inner4.jpg',  24,  "p.48-49 : Bilan carbone GHG Protocol + ISO + Bilan Carbone, Scope 1/2/3 (79.8% Scope 3), engagement -67% Scope 1-2 d'ici 2035"),
    ('insead_inner5.jpg',  26,  "p.52-53 : EcoVadis Silver Medal 68/100 (2023) + indicateurs financiers + endowment 372.2M€"),
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

print(f'Extraction HD INSEAD : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
