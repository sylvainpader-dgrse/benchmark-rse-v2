# -*- coding: utf-8 -*-
"""Lecture intégrale Excelia PDF en UTF-8."""
import sys, pathlib, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import fitz

PDF = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\EXCELIA\EXCELIA RAPPORT RSE 2024 WEB_HD (1).pdf')
print(f'PDF : {PDF.name}')

doc = fitz.open(str(PDF))
print(f'Pages PDF : {len(doc)}\n')
for i, page in enumerate(doc):
    text = page.get_text()
    print(f'=== PAGE {i+1} ===')
    print(text[:1500])
    print()
doc.close()
