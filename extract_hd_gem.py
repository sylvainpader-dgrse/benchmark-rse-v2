# -*- coding: utf-8 -*-
"""Extraction HD GEM : couverture + 5 pages interieures distinctives."""
import sys, pathlib
sys.stdout.reconfigure(encoding='utf-8')
import fitz
from PIL import Image
import io

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\Grenoble Ecole de Management\GEM_Rapport_societe_mission_5512ffaf87.pdf')
OUT = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\SITES\BENCHMARK IGENSIA\benchmark-rse\presentation\images')
OUT.mkdir(parents=True, exist_ok=True)

DPI       = 300
MAX_W     = 2000
JPG_QUAL  = 92

# (cle image, page_idx 0-based, description)
TARGETS = [
    ('gem.jpg',         0,   "Couverture Rapport de Societe a Mission 2025"),
    ('gem_inner1.jpg',  10,  "p.11 : Presentation GEM avec L'ADN de Grenoble en 3 axes (Innovation/Tech, Engagement societal premiere ecole Societe a Mission, Geopolitique) + 6 chiffres cles"),
    ('gem_inner2.jpg',  11,  "p.12-13 : Frise historique de l'engagement RSE de GEM (2006-2024, plus de 15 jalons : Charte RSE, Comite RSE, Global Compact, Label DD&RS, Societe a Mission)"),
    ('gem_inner3.jpg',  13,  "p.14 : Modele de mission : raison d'etre, 4 niveaux d'activite (Programmes, Contributions intellectuelles, Comportement institutionnel, Ecosystemes), 7 ODD"),
    ('gem_inner4.jpg',  17,  "p.18 : Indicateurs OS1 (100 % des competences DD&RSE integrees, 65 % des syllabi avec contribution RSE x2 vs 31 % en 2023-2024) + encadre Voyage Pedagogique 60/20/20"),
    ('gem_inner5.jpg',  37,  "p.38 : Plan strategique EAGLE 2030 (Journey/Sciences/Transitions), trois axes (Voyage Pedagogique, recherche-industrie, chaires) + accroche DG"),
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

print(f'Extraction HD GEM : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
print(f'Source : {PDF.name}\n')
for fname, page_idx, desc in TARGETS:
    out = OUT / fname
    size, kb = extract_page_hd(PDF, out, page_idx)
    print(f'  {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB  {desc[:80]}')
