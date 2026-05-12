# -*- coding: utf-8 -*-
"""Ré-extraction HD des images IGENSIA + OMNES pour l'onglet Présentation.

- DPI 300 (au lieu de 180) → texte net, schémas lisibles
- Largeur max 2000px (au lieu de 1600) → meilleur rendu dans le lightbox
- Qualité JPG 92 (au lieu de 82) → moins d'artefacts de compression
"""
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

# (clé, sous-dossier, motif PDF, [pages_intérieures])
RAPPORTS = [
    # igensia : timeline p.9 (idx 8) + ODD/LUCIE p.11 (idx 10)
    ('igensia', 'IGENSIA', 'IGENSIA_EDUCATION_RAPPORT_RSE_BROCH_48P', [8, 10]),
    # omnes : sommaire 4 piliers PDF p.2 (idx 1) + tableau indicateurs 5 ans PDF p.21 (idx 20)
    ('omnes',   'OMNES',   'OMNES-RA_RSE',                            [1, 20]),
]

def find_pdf(folder, pattern):
    folder_path = DOCBENCH / folder
    if not folder_path.exists():
        for d in DOCBENCH.iterdir():
            if d.is_dir() and d.name.upper() == folder.upper():
                folder_path = d
                break
    if not folder_path.exists():
        return None
    p_low = pattern.lower()
    for pdf in folder_path.rglob('*.pdf'):
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
    # Pix → PIL Image
    img_bytes = pix.tobytes('png')
    im = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    # Resize si trop large
    w, h = im.size
    if w > MAX_W:
        ratio = MAX_W / w
        im = im.resize((MAX_W, int(h * ratio)), Image.LANCZOS)
    im.save(str(out_jpg), 'JPEG', quality=JPG_QUAL, optimize=True, progressive=True)
    doc.close()
    return im.size, out_jpg.stat().st_size // 1024

print(f'Ré-extraction HD : DPI={DPI}, max-width={MAX_W}px, JPG q={JPG_QUAL}\n')
for key, folder, pat, inner_pages in RAPPORTS:
    pdf = find_pdf(folder, pat)
    if not pdf:
        print(f'  [MISS] {key} (motif: {pat})')
        continue
    print(f'  {key} ← {pdf.name}')
    targets = [
        (f'{key}.jpg',         0),
        (f'{key}_inner1.jpg',  inner_pages[0]),
        (f'{key}_inner2.jpg',  inner_pages[1]),
    ]
    for fname, page_idx in targets:
        out = OUT / fname
        size, kb = extract_page_hd(pdf, out, page_idx)
        print(f'    {fname:25s}  p.{page_idx+1:<3}  {size[0]}x{size[1]}  {kb} KB')
    print()
