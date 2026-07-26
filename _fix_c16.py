# -*- coding: utf-8 -*-
"""Rétrograde 8 écoles de OUI à NON sur le critère C16 (formation des enseignants au DD).
Met à jour : verdict grille, score, et leading de la justification."""
import sys, pathlib, re
sys.stdout.reconfigure(encoding='utf-8')

PATH = pathlib.Path(r'C:\Users\sylva\OneDrive\Bureau\SITES\BENCHMARK IGENSIA\benchmark-rse\data.js')
src = PATH.read_text(encoding='utf-8')

# (nom exact, score_avant, score_nouveau, raison concise pour justif)
TARGETS = [
    ('ÉCOLE POLYTECHNIQUE', 34.0, 33.0,
     "Activité de recherche et chaires partenaires (EDF) citées, pas de programme structuré de formation des enseignants en exercice"),
    ('INSEAD', 31.5, 30.5,
     "Financement de projets de recherche et chaires sustainability, mais pas de dispositif de formation des enseignants en exercice"),
    ('SCIENCES PO PARIS', 29.5, 28.5,
     "Recrutements ciblés d'enseignants-chercheurs et post-docs, mais pas de dispositif de formation des enseignants en exercice"),
    ('AUDENCIA BUSINESS SCHOOL', 30.5, 29.5,
     "Communauté de recherche CARES et 65 % des publications sur les transitions, mais pas de programme de formation des enseignants en exercice"),
    ('BREST BUSINESS SCHOOL', 14.0, 13.0,
     "Production scientifique alignée PRME (35+ contributions), mais pas de dispositif de formation des enseignants au DD"),
    ('GALILEO GLOBAL EDUCATION', 21.5, 20.5,
     "SCICONUM forme aux sciences cognitives et à la pédagogie, hors champ DD/RSE. Pas de programme spécifique formant les enseignants au DD"),
    ('ESSEC BUSINESS SCHOOL', 33.5, 32.5,
     "Guilde Sustainability (60 profs en communauté) et recrutements ciblés, mais pas de formation structurée des enseignants en exercice au DD"),
    ('EMLYON BUSINESS SCHOOL', 35.0, 34.0,
     "SDGs Inside est une méthode développée par les enseignants pour structurer leurs cours, pas un programme formant les enseignants au DD"),
]

def fix_grille(text, school_name, score_old, score_new):
    """Dans le bloc grille de l'école, change C16 de OUI à NON et met à jour le score."""
    # Trouve le bloc commençant à "name": "<school>" jusqu'à la prochaine "name"
    # ou à la fin de l'array grille.
    pattern = re.escape(f'"name": "{school_name}",') + r'(.+?)(?=\s*\{\s*"name":|\s*\]\s*,?\s*"justifications")'
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        return text, False
    block = m.group(0)
    new_block = re.sub(r'("16":\s*)"OUI"', r'\1"NON"', block, count=1)
    # Score : on cherche la valeur exacte ; on accepte "34.0" ou "34"
    score_pattern = r'("score":\s*)' + re.escape(f'{score_old}') + r'\s*'
    score_pattern_alt = r'("score":\s*)' + re.escape(f'{int(score_old)}') + r'\s*' if score_old == int(score_old) else None
    sub = re.subn(score_pattern, lambda mm: mm.group(1) + f'{score_new}', new_block, count=1)
    new_block = sub[0]
    if sub[1] == 0 and score_pattern_alt:
        sub2 = re.subn(score_pattern_alt, lambda mm: mm.group(1) + f'{score_new}', new_block, count=1)
        new_block = sub2[0]
    return text.replace(block, new_block, 1), block != new_block

def fix_justif(text, school_name, raison):
    """Dans le bloc justifications de l'école, change la justif C16 :
    le récap commence par "OUI, ..." → "NON, <raison>. Pratiques citées : <reste>"."""
    # Trouve "name": "<school>" dans la section justifications puis la clé "16"
    pattern = (r'("name":\s*"' + re.escape(school_name) + r'",.+?"16":\s*")' + r'OUI,\s*([^"]*?)' + r'(\\n\\n|\\n•|")')
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        return text, False
    full_match = m.group(0)
    intro_text = m.group(2)
    # Reconstruit : "NON, raison. Pratiques citées : <intro_text>"
    new_intro = f'NON, {raison}. Pratiques citées dans le rapport (research/chaires/communauté) : {intro_text.strip()}'
    # Trim final period si le raison se termine déjà bien
    new_intro = new_intro.replace('..', '.').replace('. .', '.')
    new_match = m.group(1) + new_intro + m.group(3)
    return text.replace(full_match, new_match, 1), True

changes_made = []
for name, score_old, score_new, raison in TARGETS:
    src2, ok_g = fix_grille(src, name, score_old, score_new)
    if not ok_g:
        print(f'AVERTISSEMENT grille : {name} non modifié')
        continue
    src3, ok_j = fix_justif(src2, name, raison)
    if not ok_j:
        print(f'AVERTISSEMENT justif : {name} non modifié dans justifs')
    src = src3
    changes_made.append(name)

PATH.write_text(src, encoding='utf-8')
print(f'\n✓ Modifications appliquées sur {len(changes_made)}/{len(TARGETS)} écoles :')
for nm in changes_made:
    print(f'  • {nm}')
