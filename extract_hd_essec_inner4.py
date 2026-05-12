# -*- coding: utf-8 -*-
"""Extraction HD : 4e page intérieure ESSEC (Testimonials externes p.22-23)."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\ESSEC\2025_ESSEC_RAPPORT_DDRS_ENG.pdf')
OUT = pathlib.Path('presentation/images')

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

doc = fitz.open(str(PDF))
page_idx = 11  # p.22-23 : Testimonials externes (Quevarec Cergy-Pontoise + prof)
p = doc[page_idx]
mat = fitz.Matrix(DPI/72, DPI/72)
pix = p.get_pixmap(matrix=mat, alpha=False)
img_bytes = pix.tobytes('png')
im = Image.open(io.BytesIO(img_bytes)).convert('RGB')
w, h = im.size
if w > MAX_W:
    ratio = MAX_W / w
    im = im.resize((MAX_W, int(h * ratio)), Image.LANCZOS)
out = OUT / 'essec_inner4.jpg'
im.save(str(out), 'JPEG', quality=JPG_QUAL, optimize=True, progressive=True)
print(f'essec_inner4.jpg  p.{page_idx+1}  {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024} KB')
doc.close()
