# -*- coding: utf-8 -*-
"""Ajout HD : 2 pages supplémentaires OMNES (schéma piliers + biodiversité)."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

DOCBENCH = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH')
OUT      = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, motif PDF, page_idx 0-based)
TARGETS = [
    ('omnes_inner3.jpg', 'OMNES-RA_RSE',  4),   # printed p.8-9 : schéma 4 piliers + partenaires
    ('omnes_inner4.jpg', 'OMNES-RA_RSE',  12),  # printed p.24-25 : REDONNER SA PLACE AU VIVANT (biodiversité)
]

def find_pdf(pattern):
    p_low = pattern.lower()
    for pdf in DOCBENCH.rglob('*.pdf'):
        if p_low in pdf.name.lower():
            return pdf
    return None

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

print(f'Extraction HD : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
for fname, pat, page_idx in TARGETS:
    pdf = find_pdf(pat)
    if not pdf:
        print(f'  [MISS] {fname} (motif: {pat})')
        continue
    out = OUT / fname
    size, kb = extract_page_hd(pdf, out, page_idx)
    print(f'  {fname:25s}  ← {pdf.name}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB')
