# -*- coding: utf-8 -*-
import sys, json5, re
sys.stdout.reconfigure(encoding='utf-8')
raw = open('data.js', encoding='utf-8').read()
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.DOTALL)
data = json5.loads(m.group(1))

def short(n): return n.split('\n')[0].replace('★ ', '').strip()
field = sys.argv[1] if len(sys.argv) > 1 else '18'  # 18=KPI, 17=Engagements
labels = {h['col']: h['name'] for h in data['focusHeaders']}
print(f"=== Champ {field} : {labels.get(int(field),'?')} ===\n")
for f in data['focus']:
    v = str(f.get('data', {}).get(field, '')).strip()
    if not v or len(v) < 5:
        continue
    print(f'--- {short(f["name"])}')
    print(v[:1100])
    print()
