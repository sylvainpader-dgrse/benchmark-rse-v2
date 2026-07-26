# -*- coding: utf-8 -*-
"""Lecture intégrale Galileo PDF en UTF-8."""
import sys, pathlib, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import fitz

# On retrouve le PDF par glob pour éviter les soucis d'encodage du nom
folder = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\Galileo')
pdfs = list(folder.glob('*Rapport*FR*.pdf'))
if not pdfs:
    pdfs = list(folder.glob('*FR*.pdf'))
PDF = pdfs[0]
print(f'PDF : {PDF.name}')

doc = fitz.open(str(PDF))
print(f'Pages PDF : {len(doc)}\n')
for i, page in enumerate(doc):
    text = page.get_text()
    print(f'=== PAGE {i+1} ===')
    print(text[:1500])
    print()
doc.close()
