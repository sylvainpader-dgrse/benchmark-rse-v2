# -*- coding: utf-8 -*-
import sys, json5, re
sys.stdout.reconfigure(encoding='utf-8')
raw = open('data.js', encoding='utf-8').read()
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.DOTALL)
data = json5.loads(m.group(1))
justifs = data['justifications']

def short(n): return n.split('\n')[0].replace('★ ', '').strip()
def is_group(n): return bool(re.search(r'\(Groupe\)|\(Groupe,\s*auto', n, re.I))

# Patterns indiquant une fondation propre / fonds de dotation actif
# (et pas une fondation partenaire externe type Mozaïk, France, etc.)
patterns_own = [
    r'Fondation\s+(?!de\s+France|Mozaïk|Mozaik|Cité|Croix|Restos|HES|Hugot|Ciar|Chirac)([A-ZÉÈÊ][A-Za-zéèêàçëï&\'-]+)',
    r'(?:notre|propre|sous l\'égide d\'une)\s+[Ff]ondation',
    r'Fonds\s+de\s+[Dd]otation',
    r'fondation\s+(?:dot[ée]e|cr[ée]e|lanc[ée]e|active|op[ée]rationnelle)',
    r'\bEndowment\b',
]

results = {}
for j in justifs:
    nm = short(j['name'])
    full = '\n'.join(str(v) for v in j.get('justifs',{}).values())
    matches = []
    for p in patterns_own:
        for mm in re.finditer(p, full, re.I):
            ctx = full[max(0, mm.start()-80):mm.end()+120].replace('\n', ' ')
            matches.append((p[:30], ctx.strip()))
    if matches:
        results[nm] = matches[:3]

print(f'Mentions de fondation propre / fonds de dotation : {len(results)} entités\n')
for nm, ms in results.items():
    print(f'--- {nm}')
    for p, ctx in ms[:2]:
        print(f'   • {ctx[:240]}')
    print()
