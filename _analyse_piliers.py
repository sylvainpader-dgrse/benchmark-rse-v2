# -*- coding: utf-8 -*-
import sys, json5, re
sys.stdout.reconfigure(encoding='utf-8')

raw = open('data.js', encoding='utf-8').read()
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.DOTALL)
data = json5.loads(m.group(1))
crits = {c['col']: c for c in data['criteria']}
grille = data['grille']
justifs = data['justifications']

def is_ig(n): return 'IGENSIA' in n.upper()
def is_group(n): return bool(re.search(r'\(Groupe\)|\(Groupe,\s*auto', n, re.I))
def short(n): return n.split('\n')[0].replace('★ ', '').strip()

# index justifs by name
just_by_name = {j['name']: j for j in justifs}

others = [g for g in grille if not is_ig(g['name'])]
ig = next(g for g in grille if is_ig(g['name']))
N = len(others)

CAT_NAMES = {1: 'GOUVERNANCE RESPONSABLE', 2: 'ENGAGER NOS PARTIES PRENANTES',
             3: 'REDUIRE NOTRE IMPACT ENVIRONNEMENTAL', 4: 'QUALITE DE VIE & EGALITE DES CHANCES',
             5: 'UTILITE POUR LA SOCIETE & TERRITOIRES'}

print(f'Total entités hors IGENSIA : {N}\n')

for cat in [3, 1, 2, 4, 5]:
    cols = sorted([col for col, c in crits.items() if str(c['category']) == str(cat)])
    print('=' * 70)
    print(f'PILIER {cat} : {CAT_NAMES[cat]}')
    print('=' * 70)
    for col in cols:
        c = crits[col]
        oui = [g for g in others if g['verdicts'].get(str(col)) == 'OUI']
        par = [g for g in others if g['verdicts'].get(str(col)) == 'PARTIEL']
        non = [g for g in others if g['verdicts'].get(str(col)) == 'NON']
        igv = ig['verdicts'].get(str(col), '?')
        po = round(len(oui) * 100 / N)
        pp = round(len(par) * 100 / N)
        pn = round(len(non) * 100 / N)
        print(f'\nC{col} — {c["name"]}')
        print(f'   IGENSIA = {igv}')
        print(f'   OUI {len(oui)} ({po}%) | PARTIEL {len(par)} ({pp}%) | NON {len(non)} ({pn}%)')
        oui_groups = [short(g["name"]) for g in oui if is_group(g["name"])]
        oui_ecoles = [short(g["name"]) for g in oui if not is_group(g["name"])]
        if oui_groups:
            print(f'   OUI groupes : {", ".join(oui_groups)}')
        if oui_ecoles:
            print(f'   OUI écoles  : {", ".join(oui_ecoles[:18])}' + (' …' if len(oui_ecoles) > 18 else ''))
    print()
