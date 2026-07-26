# -*- coding: utf-8 -*-
"""Extraction v3 : 3 pages par rapport (couverture + 2 pages intérieures) en HQ."""
import sys, pathlib, json
sys.stdout.reconfigure(encoding='utf-8')
import fitz

DOCBENCH = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH')
OUT = pathlib.Path('_covers')
OUT.mkdir(exist_ok=True)

# (clé, sous-dossier, motif, [page_idx_intérieures])
RAPPORTS = [
    ('igensia',   'IGENSIA',                          'IGENSIA_EDUCATION_RAPPORT_RSE_BROCH_48P', [4, 24]),
    ('omnes',     'OMNES',                            'OMNES-RA_RSE',                            [4, 30]),
    ('galileo',   'Galileo',                          'GGE_Rapport Impact_2024-2025_FR',         [6, 40]),
    ('ad',        'AD education',                     'ADE24.11_Rapport-ESG',                    [4, 15]),
    ('essec',     'ESSEC',                            '2025_ESSEC_RAPPORT_DDRS_ENG',             [3, 10]),
    ('emlyon',    'EMLYON BUSINESS SCHOOL',           '2025_Rapport_d_engagement-VF',            [5, 20]),
    ('edhec',     'EDHEC BUSINESS SCHOOL',            'rapport-ddrs-2023-edhec',                 [4, 20]),
    ('insead',    'INSEAD',                           'Sustainability-Report-2023',              [3, 30]),
    ('hec',       'HEC',                              'Sustainability Report 2024',              [4, 25]),
    ('excelia',   'EXCELIA',                          'EXCELIA RAPPORT RSE 2024',                [3, 20]),
    ('audencia',  'Audencia',                         'RAPPORT_RSE_2026',                        [5, 14]),
    ('kedge',     'KEDGE',                            'kedge-rapportdd-20-21',                   [5, 12]),
    ('skema',     'SKEMA',                            'Rapport d’activités - SKEMA Transitions', [4, 14]),
    ('gem',       'Grenoble Ecole de Management',     'GEM_Rapport_societe_mission',             [4, 20]),
    ('tbs',       'TBS',                              'TBS-Education-Rapport-Societe-A-Mission', [4, 18]),
    ('ieseg',     'IESEG',                            'RapportImpact-IESEG-2024-25',             [5, 20]),
    ('neoma',     'NEOMA',                            'NEOMA-Rapport-d-engagement-TSE-2025',     [5, 25]),
    ('bsb',       'BSB',                              '5e Rapport RSE2024',                      [4, 14]),
    ('efrei',     'EFREI',                            'EFREI-rapport-RSE-2026',                  [4, 13]),
    ('emstras',   'EM STRASBOURG BUSINESS SCHOOL',    'rapport_rso_em_strasbourg',               [5, 22]),
    ('psb',       'PSB',                              'PSB_RAPPORT_RSE_2023-2024',               [4, 10]),
    ('cesi',      'CESI',                             'Bilan-RSE-2023-CESI',                     [5, 28]),
]

def find_pdf(folder, pattern):
    folder_path = DOCBENCH / folder
    if not folder_path.exists():
        for d in DOCBENCH.iterdir():
            if d.is_dir() and d.name.upper() == folder.upper():
                folder_path = d; break
    if not folder_path.exists(): return None
    p_low = pattern.lower()
    for pdf in folder_path.rglob('*.pdf'):
        if p_low in pdf.name.lower():
            return pdf
    return None

def extract_page(pdf_path, out_path, page_idx, dpi=180):
    try:
        doc = fitz.open(str(pdf_path))
        if page_idx >= len(doc): page_idx = max(0, len(doc) - 1)
        p = doc[page_idx]
        mat = fitz.Matrix(dpi/72, dpi/72)
        pix = p.get_pixmap(matrix=mat)
        pix.save(str(out_path))
        w, h = p.rect.width, p.rect.height
        orientation = 'landscape' if w > h else 'portrait'
        doc.close()
        return orientation
    except Exception as e:
        print(f'  [ERR] {pdf_path.name} (p={page_idx}): {e}')
        return None

print('Extraction v3 : 3 pages par rapport (DPI 180)...')
metadata = {}
for key, folder, pat, inner_pages in RAPPORTS:
    pdf = find_pdf(folder, pat)
    if not pdf:
        for d in DOCBENCH.rglob('*.pdf'):
            if pat.lower() in d.name.lower():
                pdf = d; break
    if not pdf:
        print(f'  [MISS] {key}')
        continue
    cover_path = OUT / f'{key}.png'
    inner1_path = OUT / f'{key}_inner1.png'
    inner2_path = OUT / f'{key}_inner2.png'
    o1 = extract_page(pdf, cover_path, 0)
    o2 = extract_page(pdf, inner1_path, inner_pages[0])
    o3 = extract_page(pdf, inner2_path, inner_pages[1])
    metadata[key] = {'orientation': o1, 'pdf': pdf.name, 'pages': [0, inner_pages[0], inner_pages[1]]}
    print(f'  [OK]   {key:10s} {o1:>9s}  cov={cover_path.stat().st_size//1024}ko  i1={inner1_path.stat().st_size//1024}ko  i2={inner2_path.stat().st_size//1024}ko')

pathlib.Path('_covers/_meta.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')
print(f'\n{len(metadata)} rapports illustrés.')
