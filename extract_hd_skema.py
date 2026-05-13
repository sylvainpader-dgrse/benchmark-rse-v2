# -*- coding: utf-8 -*-
"""Extraction HD SKEMA : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path("C:/Users/sylva/OneDrive/Bureau/DOCBENCH/SKEMA/Rapport d’activités - SKEMA Transitions 2024-2025 _ SKEMA Business School (1).pdf")
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('skema.jpg',         0,  "Couverture Rapport d'activités SKEMA Transitions 2024-2025"),
    ('skema_inner1.jpg',  4,  "p.5 — Chiffres clés : 11 000 étudiants, 130 nationalités, 63 000 alumni, 10 implantations dans 7 pays, +500 profs, +200 projets incubés"),
    ('skema_inner2.jpg',  5,  "p.6 — Dates clés : timeline 2009-2025 avec 13 jalons d'engagement (Plan Vert, PRME, Global Compact, ISO 14001, ISO 26000, DD&RS, Bilan Carbone, UNVEIL)"),
    ('skema_inner3.jpg',  11, "p.12 — Plan 3D : 3 axes (Diversité, Décarbonation, Digital & Data for Good) avec 4 sous-objectifs chacun"),
    ('skema_inner4.jpg',  14, "p.15 — Objectifs transversaux du Plan 3D : 3 cibles datées avec % d'avancement chiffré (100 %, 84 %, 82 %) + réalisations"),
    ('skema_inner5.jpg',  20, "p.21 — Décarbonation : 2 cibles avec % d'avancement (40 %, 60 %) + encadré « Nos publications récentes sur le thème de la Décarbonation »"),
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

print(f'Extraction HD SKEMA : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
