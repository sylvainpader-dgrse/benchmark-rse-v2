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

# Critère ciblé en argument
col = sys.argv[1] if len(sys.argv) > 1 else '27'
only_oui = '--oui' in sys.argv

print(f'=== Justifications critère C{col} ===\n')
for j in justifs:
    nm = j['name']
    if is_ig(nm):
        tag = '[IGENSIA]'
    else:
        tag = ''
    g = grille.get(nm)
    verdict = g['verdicts'].get(str(col), '?') if g else '?'
    if only_oui and verdict != 'OUI':
        continue
    txt = j.get('justifs', {}).get(str(col), '')
    if not txt:
        continue
    # Nettoyer : enlever les lignes Source
    txt = re.sub(r'\n?Source\s*:[^\n]*', '', txt)
    txt = txt.strip()
    if len(txt) < 5:
        continue
    print(f'--- {short(nm)} [{verdict}] {tag}')
    print(txt[:700])
    print()
