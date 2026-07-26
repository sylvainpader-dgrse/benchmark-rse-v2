# -*- coding: utf-8 -*-
import sys, json5, re
sys.stdout.reconfigure(encoding='utf-8')
raw = open('data.js', encoding='utf-8').read()
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.DOTALL)
data = json5.loads(m.group(1))

URL_RE = re.compile(r'https?://[^\s,;<>"\)\]\}|\\]+', re.I)

def short(n): return n.split('\n')[0].replace('★ ', '').strip()

# Indexer focus par nom
focus_by_name = {f['name']: f for f in data['focus']}

# Pour chaque école dans focus, ramasser TOUS les liens cités
for f in data['focus']:
    nm = short(f['name'])
    all_urls = set()
    # 1) Tous les champs focus
    for k, v in f.get('data', {}).items():
        for u in URL_RE.findall(str(v)):
            all_urls.add(u.rstrip('.,;:'))
    # 2) Sources du bloc justifications correspondant
    j = next((j for j in data['justifications'] if j['name'] == f['name']), None)
    if j:
        srcs = str(j.get('sources', ''))
        for u in URL_RE.findall(srcs):
            all_urls.add(u.rstrip('.,;:'))
        # Sources inline dans les justifs
        for k, v in j.get('justifs', {}).items():
            for u in URL_RE.findall(str(v)):
                all_urls.add(u.rstrip('.,;:'))
    if not all_urls:
        continue
    # Rapport principal (col 5) à part
    main = focus_by_name[f['name']].get('data', {}).get('5', '').strip()
    main_url = next(iter(URL_RE.findall(main)), '').rstrip('.,;:') if main else ''
    all_urls.discard(main_url)
    print(f'### {nm}')
    for u in sorted(all_urls):
        print(f'  - {u}')
    print()
