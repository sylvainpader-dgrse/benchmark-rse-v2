# -*- coding: utf-8 -*-
"""Extraction HD Excelia : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EXCELIA\EXCELIA RAPPORT RSE 2024 WEB_HD (1).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('excelia.jpg',         0,   'Couverture Rapport TES 2022-2024 (Osez regarder le futur avec audace)'),
    ('excelia_inner1.jpg',  10,  "p.11 — Schéma 5 axes + historique 2013-2023"),
    ('excelia_inner2.jpg',  15,  "p.16 — Résultats et classements externes (ChangeNOW, PIR, Times Higher Ed)"),
    ('excelia_inner3.jpg',  20,  "p.21 — Missions Humacité (2005) + Climacité (2020), 1 355 missions/an"),
    ('excelia_inner4.jpg',  38,  "p.39 — Faits marquants par axe : chiffres + actions réalisées + actions à venir"),
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

print(f'Extraction HD Excelia : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
