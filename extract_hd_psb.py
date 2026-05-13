# -*- coding: utf-8 -*-
"""Extraction HD PSB : couverture + 5 pages interieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\PSB\PSB_RAPPORT_RSE_2023-2024.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (cle image, page_idx 0-based, description)
TARGETS = [
    ('psb.jpg',         0,   "Couverture Sustainable development progress report 2022-2023"),
    ('psb_inner1.jpg',  4,   "p.8-9 : Vision et valeurs (Pluralism, Responsibility, Singularity, Inclusiveness, Agility) + engagement PRME (Principles for Responsible Management Education) 6 principes"),
    ('psb_inner2.jpg',  5,   "p.10-11 : CSR Policy au coeur de l'ecole, demarche en 4 niveaux + CSR Committee (3 missions, 5 categories de membres)"),
    ('psb_inner3.jpg',  8,   "p.16-17 : Label STAR (Sustainability Track for Advanced Responsibility) - 4 piliers (Academic, Associative, International, Professional) + prix 1 000 EUR"),
    ('psb_inner4.jpg',  12,  "p.24-25 : Tableau de synthese des actions PSB rattachees aux 17 ODD ONU avec metriques chiffrees"),
    ('psb_inner5.jpg',  15,  "p.30-31 : Focus projet Erasmus+ BE YOU - 3 ateliers (Ecological Renaissance, 2 Tonnes, Social Entrepreneurship)"),
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

print(f'Extraction HD PSB : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
