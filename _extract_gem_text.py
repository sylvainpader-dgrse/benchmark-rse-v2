# -*- coding: utf-8 -*-
import sys, fitz
sys.stdout.reconfigure(encoding='utf-8')
pdf = r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\Grenoble Ecole de Management\GEM_Rapport_societe_mission_5512ffaf87.pdf'
doc = fitz.open(pdf)
with open(r'C:\Users\sylva\OneDrive\Bureau\SITES\BENCHMARK IGENSIA\benchmark-rse\_gem_text.txt', 'w', encoding='utf-8') as out:
    out.write(f'Pages : {len(doc)}\n')
    for i, page in enumerate(doc):
        out.write(f'\n=== PAGE {i+1} ===\n')
        out.write(page.get_text())
# Print dimensions of page 1 and a middle page
p0 = doc[0]
p_mid = doc[len(doc)//2]
print(f'Pages : {len(doc)}')
print(f'Page 1 size : {p0.rect.width} x {p0.rect.height}')
print(f'Page {len(doc)//2+1} size : {p_mid.rect.width} x {p_mid.rect.height}')
doc.close()
