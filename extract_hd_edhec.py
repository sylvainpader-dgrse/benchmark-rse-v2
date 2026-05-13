# -*- coding: utf-8 -*-
"""Extraction HD EDHEC : couverture + 4 pages intérieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EDHEC BUSINESS SCHOOL\rapport-ddrs-2023-edhec.pdf')
OUT = pathlib.Path('presentation/images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (clé image, page_idx 0-based, description)
TARGETS = [
    ('edhec.jpg',         0,  "Couverture Rapport DDRS 2023 EDHEC"),
    ('edhec_inner1.jpg',  2,  "p.4 — Carte d'identité : 13 chiffres clés + labels d'engagement externes (PRME, Accord de Grenoble, PIR)"),
    ('edhec_inner2.jpg',  4,  "p.8 — Page « Témoignages » : 6 voix variées (étudiante asso, responsable RSE, alumni entrepreneur, prof, asso WinFin, alumni Lemon Tri, alumni Oney RH)"),
    ('edhec_inner3.jpg',  13, "p.26 — Campus : « Nos prestataires engagés dans la transition » (API Restauration, 1001 Feuilles, ATF Gaia, Lemon Tri, Beesk) + Green IT"),
    ('edhec_inner4.jpg',  14, "p.28 — Bilan carbone 2022 visuel : camembert répartition par scope (Scope 3 = 83 %) + barres horizontales par poste (Déplacements = 64,3 %)"),
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

print(f'Extraction HD EDHEC : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc}')
