# -*- coding: utf-8 -*-
"""Extraction HD CESI : couverture + 5 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\Downloads\Bilan-RSE-2023-CESI (2).pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (cle image, page_idx 0-based, description)
TARGETS = [
    ('cesi.jpg',         0,   "Couverture Rapport RSE 2023 CESI (Mai 2024)"),
    ('cesi_inner1.jpg',  3,   "p.4 : Pictogrammes des 17 ODD ONU + liste chartes / labels (CTI, CGE Plan Vert / DD-RS, Comite 21, Charte Diversite, UNAI, Bienvenue en France niv.2, OFIS)"),
    ('cesi_inner2.jpg',  25,  "p.26 : Graphique evolution nombre d'etudiants en situation de handicap accompagnes (205 en 2020-2021 a 524 en 2023-2024, soit x2,5 en 4 ans)"),
    ('cesi_inner3.jpg',  36,  "p.37 : Schema 3 volets programme « Mon Trajet Vert » (Structuration / Experimentation / Deploiement), 8 M€ sur 4 ans, lab CESI LINEACT"),
    ('cesi_inner4.jpg',  38,  "p.39 : Schema Directeur Immobilier, Energetique et Developpement Durable 2023-2030 avec 4 cibles (consommations, services, capacite, ecosysteme)"),
    ('cesi_inner5.jpg',  41,  "p.42 : Tableau classement campus par emissions GES (A excellent a D pollution) + jauge de A a G, 2/3 du parc en A ou B"),
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

print(f'Extraction HD CESI : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
