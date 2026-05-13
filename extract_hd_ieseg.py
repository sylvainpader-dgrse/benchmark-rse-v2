# -*- coding: utf-8 -*-
"""Extraction HD IESEG : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\IESEG\RapportImpact-IESEG-2024-25-FR.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
# Layout : cover landscape + 4 inner = pres-images-l avec 5 figures (1 row cover + 2 rows 2x2 inner)
TARGETS = [
    ('ieseg.jpg',         0,   "Couverture Rapport d'Impact 2024-2025"),
    ('ieseg_inner1.jpg',  3,   "p.4 — Chiffres clés 2024-2025 (1,332 tCO2/utilisateur, 81% cours, 1900 étudiants Changemakers Odyssey, 61 cours PGE)"),
    ('ieseg_inner2.jpg',  6,   "p.7 — Treemap 4 piliers / 32 thèmes des feuilles de route RSE services administratifs (visualisation Transition 2026)"),
    ('ieseg_inner3.jpg',  13,  "p.14 — Changemakers Odyssey : résultats chiffrés (24 000 mégots, 76 #SafeBar, 665 BC étudiants, 730 Too Good To Go)"),
    ('ieseg_inner4.jpg',  23,  "p.24 — Tableau indicateurs-clés Pilier 2 : comparaison 2018-2019 / 2023-2024 / 2024-2025"),
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

print(f'Extraction HD IESEG : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
