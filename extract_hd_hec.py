# -*- coding: utf-8 -*-
"""Extraction HD HEC : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\HEC\Sustainability Report 2024_HEC Paris-.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('hec.jpg',         0,   "Couverture Sustainability Report 2024 (très sobre, texte seul)"),
    ('hec_inner1.jpg',  3,   "p.4 : Executive Summary structuré en 6 axes (Knowledge, Education, Community, Environmental, Social, Governance) avec bullets de réalisations 2024"),
    ('hec_inner2.jpg',  5,   "p.6 : Sustainability Strategy : Sustainable Change Model en 6 axes (Knowledge, Education, Community, Environmental, Social, Governance) avec leurs sous-thèmes"),
    ('hec_inner3.jpg',  6,   "p.7 : Sustainability Governance : schéma multi-niveaux qui sépare Académique (S&O Institute) et Opérationnel (Sustainability Office)"),
    ('hec_inner4.jpg',  18,  "p.19 : Parcours Engagement : frise visuelle des 4 modules avec durées chiffrées (3 jours Chamonix + 30 h service + 3 semaines stage + thèse 3 mois)"),
    ('hec_inner5.jpg',  36,  "p.37 : Carbon Policy : chiffrage de l'impact carbone évité par action (278 tCO2 viande rouge, 5,9 tCO2 IT, -40 % conso énergie d'ici 2030)"),
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

print(f'Extraction HD HEC : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
