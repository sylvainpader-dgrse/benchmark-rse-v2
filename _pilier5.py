# -*- coding: utf-8 -*-
import sys, json5, re
sys.stdout.reconfigure(encoding='utf-8')
raw = open('data.js', encoding='utf-8').read()
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.DOTALL)
data = json5.loads(m.group(1))
justifs = data['justifications']
grille = {g['name']: g for g in data['grille']}
def is_ig(n): return 'IGENSIA' in n.upper()
def short(n): return n.split('\n')[0].replace('★ ', '').strip()

CRITS = {31: 'Parcours RSE diplômant', 32: 'Charte achats responsables',
         33: 'Citoyenneté / projets solidaires', 34: 'Mécénat local',
         35: 'Vie associative', 36: 'Achat inclusif et local'}

mode = sys.argv[1] if len(sys.argv) > 1 else 'igensia'

if mode == 'igensia':
    jig = next(j for j in justifs if is_ig(j['name']))
    for col, nom in CRITS.items():
        v = grille[jig['name']]['verdicts'].get(str(col), '?')
        txt = jig['justifs'].get(str(col), '')
        txt = re.sub(r'\n?Source\s*:[^\n]*', '', txt).strip()
        print(f'### C{col} {nom} — IGENSIA [{v}]')
        print(txt[:600])
        print()
else:
    col = mode
    nom = CRITS.get(int(col), '?')
    print(f'===== C{col} : {nom} (toutes écoles, full) =====\n')
    for j in justifs:
        if is_ig(j['name']):
            continue
        v = grille.get(j['name'], {}).get('verdicts', {}).get(str(col), '?')
        if v == 'NON':
            continue
        txt = j['justifs'].get(str(col), '')
        txt = re.sub(r'\n?Source\s*:[^\n]*', '', txt).strip()
        if len(txt) < 5:
            continue
        print(f'--- {short(j["name"])} [{v}]')
        print(txt[:850])
        print()
