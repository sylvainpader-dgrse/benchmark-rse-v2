# Méthode d'enrichissement des justifications RSE

> **Fichier de référence** pour reprendre le travail d'enrichissement après compaction du contexte conversationnel. Lire ce fichier **en début de toute nouvelle session** dédiée à l'enrichissement.

---

## 1. Contexte du projet

- **Site** : benchmark RSE IGENSIA Education déployé sur GitHub Pages (remote `v2`)
- **URL prod** : https://sylvainpader-dgrse.github.io/benchmark-rse-v2/
- **Repo data** : `data.js` (JSON store) ; `app.js` (logique) ; `index.html` (structure) ; `style.css` (styles)
- **Périmètre** : 43 entrées (37 écoles + 6 groupes) × 36 critères (5 axes)
- **Cible** : IGENSIA Education (auto-évaluation, idx 0)

### Les 6 groupes éducatifs identifiés
1. IGENSIA EDUCATION (cible — auto-éval, idx 0)
2. OMNES EDUCATION (idx 7)
3. AD EDUCATION (idx 24)
4. GALILEO GLOBAL EDUCATION (idx 34)
5. IONIS EDUCATION GROUP (idx 41)
6. CESI (idx 42)

### Les 5 axes du benchmark
1. **Gouvernance Responsable** (C1-C7)
2. **Engager nos Parties Prenantes** (C8-C11, C14-C17)
3. **Réduire notre Impact Environnemental** (C18-C24, C27-C29)
4. **Qualité de Vie & Égalité des Chances** (C12, C13, C25, C26, C30)
5. **Utilité Société & Territoires** (C31-C36)

---

## 2. Règles strictes (À NE JAMAIS VIOLER)

### ✅ Ce qui est autorisé
- Reporter ce que dit la source (rapport PDF, page web officielle)
- Citer entre guillemets les formulations du rapport
- Référencer la **page précise** : `Source : Rapport ESG 2023-24, p. 17`
- Distinguer ce qui est documenté de ce qui ne l'est pas (« non documenté », « le rapport ne précise pas »)

### ❌ Ce qui est INTERDIT
- **Comparer à une autre école/groupe** dans une justif (le radar compare, pas la justif)
- Superlatifs éditoriaux (« exemplaire », « le plus abouti », « pionnier », « remarquable »)
- Extrapoler depuis une absence de mention
- **Inventer** un programme, une date, un chiffre, un nom, un statut juridique
- **Mélanger entre écoles d'un même groupe** (ex. attribuer à IGENSIA ce qui est à IONIS)
- Compléter avec des « sources web » non vérifiées
- Modifier les verdicts OUI/PARTIEL/NON arbitrairement (sauf si **le périmètre strict** du critère le justifie — voir §6)

---

## 3. Format des justifications (à respecter scrupuleusement)

```
VERDICT — résumé en 1 phrase de la situation.

• Bullet 1 explicatif (phrase complète, pas télégraphique).
• Bullet 2 (chiffre/date/nom de programme + courte explication).
• Bullet N (ce que dit la source).
Source : [Source précise avec page]

Apprenants :
• Action concrète pour les apprenants (phrase complète).
• Autre action.
Source : [Source précise]

Collaborateurs :
• Action concrète pour les collaborateurs (phrase complète).
• Autre action.
Source : [Source précise]
```

### Règles de format
- **Verdict** : OUI / PARTIEL / NON en majuscules au début, suivi d'un tiret cadratin `—` (PAS un tiret simple `-`)
- **Bullets** : commencent par `•` (puce), pas `-` ni `*`
- **Phrases compréhensibles** : chaque bullet est une vraie phrase explicative, pas un télégramme
- **Sections Apprenants / Collaborateurs** : OBLIGATOIRES dans chaque justif. Pas de « Non applicable » — toujours trouver de quoi remplir les deux côtés (au minimum : « Bénéficient indirectement de... » ou « Concernés par... »)
- **Sources** : page précise quand possible (`p. 17`, `p. 21 et p. 32`)

### Affichage automatique
L'app.js détecte les mots-clés et applique :
- `Apprenants :` → fond rose `#FDE8F0`, texte rouge bordeaux `#C2185B`
- `Collaborateurs :` → fond bleu (variante)

---

## 4. Workflow école par école

Pour chaque école/groupe à enrichir :

### Étape 1 — Préparation
- Localiser le PDF source dans `C:\Users\sylva\OneDrive\Bureau\DOCBENCH\<NomÉcole>\`
- Extraire le texte avec PyPDF2 vers `<ecole>_full.txt`
- Identifier les passages clés (page par page)

### Étape 2 — Diagnostic
- Lire les 36 justifs actuelles de l'école dans `data.js`
- Identifier 5-10 critères où l'enrichissement apporte vraiment quelque chose
- Croiser avec ce que dit le rapport (page par page)

### Étape 3 — Présentation à l'utilisateur
- Présenter sous forme de bullets explicatifs (pas télégraphique)
- Pour chaque critère : contexte (pourquoi on enrichit) + ce que le rapport ajoute (avec page)
- **Attendre validation** avant toute modification de `data.js`

### Étape 4 — Vérification du périmètre
- Pour chaque verdict, vérifier qu'il respecte le périmètre strict du critère (voir §6)
- Proposer un changement de verdict UNIQUEMENT si le périmètre le justifie
- **Demander confirmation explicite** sur tout changement de verdict

### Étape 5 — Injection
- Créer un script Python `enrich_<ecole>_v2.py` qui :
  - Met à jour les justifs sélectionnées
  - Met à jour les verdicts modifiés (le cas échéant)
  - Recalcule le score si verdict modifié (`OUI=1.0, PARTIEL=0.5, NON=0`)
- Exécuter le script
- Vérifier la cohérence verdict/justif

### Étape 6 — Excel
- Mettre à jour `BENCHMARK RSE.xlsx` (Grille R<ligne> avec verdict + score + tier)
- Couleurs : OUI vert (`C8E6C9`) / PARTIEL jaune (`FFF9C4`) / NON rouge (`FFCDD2`)
- Tier : Avancé `2E7D32` / Confirmé `8BC34A` / En progression `FFC107` / Insuffisant `F44336`

### Étape 7 — Push
- `git add data.js` (et autres si modifiés)
- Commit avec message structuré (cf. exemples dans `git log`)
- `git push v2 main`

---

## 5. Erreurs passées documentées (À NE JAMAIS REPRODUIRE)

### 🔴 Erreur 1 — IGENSIA "Société à Mission"
- **Faux** : IGENSIA n'est PAS une Société à Mission
- **Vrai** : IGENSIA est une **fédération d'associations loi 1901**
- Le statut Société à Mission (loi PACTE 2019) est réservé aux sociétés commerciales
- Confusion possible avec IONIS qui a 4 écoles d'ingénieurs Société à Mission (EPITA, ESME, IPSA, Sup'Biotech)

### 🔴 Erreur 2 — Comparaisons dans les justifications
- **Interdiction** : « (vs OMNES Plan QVCT 236 actions...) », « Comparaison favorable : »
- Le radar compare. La justification décrit ce que l'école fait, point.
- Tout pattern « vs X » dans une justif = à supprimer

### 🔴 Erreur 3 — Mélange entre écoles d'un même groupe
- IONIS = 29 écoles dont 4 ingénieurs SàM (EPITA, ESME, IPSA, Sup'Biotech)
- AD Education = 19 écoles dont EMLV/ESILV (Pôle Léonard de Vinci) ont DD&RS
- Galileo = 64 écoles dont ESG Act (100% DD), emlyon (SDGs Inside)
- **Toujours préciser le périmètre** : « au niveau Groupe X » vs « au niveau école Y »

### 🔴 Erreur 4 — Sections "Non applicable" dans Apprenants/Collaborateurs
- **Toujours** trouver du contenu pour les deux sections
- Exemple : pour un critère collaborateurs, mettre dans Apprenants « bénéficient indirectement de... »
- Pas de raccourci télégraphique

---

## 6. Périmètre strict de quelques critères clés

### C4 — Label ou certification RSE externe
- **Comptent** : DD&RS (CIRSES), LUCIE 26000 (ISO 26000), EcoVadis, ISO 14001, B Corp
- **Ne comptent pas** : accréditations académiques (AACSB, EQUIS, AMBA), engagements (PRME, Pacte Mondial, CEC), certifications de compensation carbone (SQC-QualityCert, VCS)
- **Niveau** : au niveau du Groupe, pas au niveau d'une école interne

### C28 — Campus certifié ou éco-labellisé
- **Comptent** : HQE, BREEAM, LEED, Bâtiment Biosourcé, label E+C-, BBC, DGNB
- **Périmètre** : « au moins un campus » — mais évaluer la **pertinence à l'échelle Groupe** (3 sur 70 = trop peu pour valider OUI au niveau Groupe = reste PARTIEL)

### C8 — Socle DD obligatoire (≥ 15h/an)
- **OUI** = socle DD obligatoire ≥ 15h/an déployé pour TOUS les apprenants
- **PARTIEL** = modules DD présents mais < 15h ou non obligatoires ou non généralisés

### C18 — Bilan Carbone (scopes 1+2)
- **OUI** = BC réalisé, résultats publiés
- **PARTIEL** = BC en cours ou résultats non publiés

### C19 — Scope 3 inclus
- **OUI** = Scope 3 détaillé avec principaux postes identifiés
- **PARTIEL** = Scope 3 partiellement couvert ou non détaillé

### Pour les autres critères
Voir `data.js` → `criteria` → `seuils.oui / partiel / non` pour le périmètre exact.

---

## 7. État d'avancement (au 26 avril 2026)

### ✅ Travaux terminés et pushés sur v2
- **Ajout CESI** (6e groupe) en idx 42 : grille + focus + score 29.5/36 (Confirmé)
- **Fix 3 liens RSE** : KEDGE, TBS, AD Education
- **AD Education enrichi** (commit `272dee1`, 26 avril) :
  - 9 justifs (C2, C4, C9, C11, C16, C21, C26, C28, C33)
  - Verdict C4 : PARTIEL → NON
  - Score : 20.5 → 20.0 (tier En progression conservé)
  - Excel mis à jour (Grille R37)
- **Audencia Business School enrichi** (26 avril) :
  - 21 justifs enrichies (C2, C3, C5, C6, C9, C12, C15, C16, C17, C18, C20, C21, C22, C23, C24, C26, C27, C29, C32, C33, C34)
  - Verdicts modifiés : C22 PARTIEL → OUI (Charte INR + adhésion + plan sobriété 2022) ; C24 PARTIEL → OUI (partenariat WWF + groupe biodiversité + charte éco-événements)
  - Score : 29.5 → **30.5** (Confirmé → **Avancé**)
  - Corrections : "CAR" → "CARES" (acronyme correct du collectif), suppression extrapolation budget C5
  - Sources : Rapport DD&RS 2026 (16p) + rse.audencia.com + sources web vérifiées
  - Excel mis à jour (Grille R19)

### 📋 Travail antérieur reverté (commit `d62751c`)
- Enrichissements en lot des 8 écoles (CESI, OMNES, AD, Galileo, IONIS, IGENSIA, EMLYON, ESSEC)
- **Raison du revert** : erreurs d'interprétation graves (IGENSIA décrit comme Société à Mission, comparaisons inter-écoles dans les justifs)
- AD a été refait proprement après revert avec la nouvelle méthode

### 🔜 À faire (par ordre de priorité)
1. **IGENSIA** (cible — re-faire proprement après l'erreur Société à Mission)
2. **OMNES** (groupe le plus avancé)
3. **CESI** (groupe le plus récent)
4. **Galileo, IONIS** (autres groupes)
5. **Top écoles Avancé** (EMLYON, ESSEC, ÉCOLE POLY, HEC, KEDGE, ESCP, EDHEC, ESSCA, GEM, SCIENCES PO, SKEMA, TBS, AUDENCIA ✅)
6. **Écoles Confirmé** (BSB, INSEAD, IESEG, NEOMA, EFREI, EM NORMANDIE, RENNES SB, IMT-BS, CLERMONT, DAUPHINE)
7. **Reste** (En progression / Insuffisant)

### 💡 Méthode validée et améliorée (post-Audencia)
- **Croisement systématique PDF + sites web** : pour chaque "PARTIEL faible" du rapport, vérifier sur le site école (rse.<école>.com, fondation, chaires) avant de conclure NON. Audencia a démontré que 4 critères "PARTIEL" cachaient des dispositifs solides documentés sur le site (C22 numérique INR, C24 biodiversité WWF, C27 économie circulaire, C32 achats responsables).
- **Préconisation explicite avec scénarios** : présenter "conservateur / médian / maximaliste" avec impact score, pour que l'utilisateur tranche en conscience.

---

## 8. Sources disponibles (DOCBENCH)

Inventaire des PDFs disponibles localement dans `C:\Users\sylva\OneDrive\Bureau\DOCBENCH\` :

| École/Groupe | Documents principaux |
|---|---|
| IGENSIA | IGENSIA_EDUCATION_RAPPORT_RSE_BROCH_48P.pdf |
| OMNES | OMNES-RA_RSE-EXE-A4-V6-Planche-BD.pdf (24p) + CSR-REPORT-2023.pdf (48p) + Charte Ethique + Plan-Egalite-FH |
| AD Education | ADE24.11_Rapport-ESG.pdf (34p) — DÉJÀ FAIT |
| Galileo | GGE_Rapport Impact_2024-2025_FR (122p) + GGE_Impact_Report_2023-2024 |
| CESI | Bilan-RSE-2023-CESI.pdf (57p) + Schema-directeur-DD-RS-CESI-2024-2028 (49p) + Adaptations handicap (5p) |
| HEC | Sustainability Report 2024 + Transition Report 2022 |
| ESSEC | 2025_ESSEC_RAPPORT_DDRS_ENG.pdf (13p) |
| EMLYON | 2025_Rapport_d_engagement-VF.pdf (40p) + DPEF + 2023 EN |
| KEDGE | kedge-rapportdd-20-21 + 6 guides thématiques |
| ESCP | ESCP_RAPPORT-2023_UK + Carbon Footprint 2024 + Fondation 2023 |
| ESCDES | politique-dachat-responsable-2025 + 2021-2023_PRME_V3 |
| ESSCA | essca_rapport-activite-2024-2025 + strategie-ddrs + GEP |
| EDHEC | rapport-ddrs-2023-edhec + Plan_Strategique_Generations_2050 |
| GEM | GEM_Rapport_societe_mission + 2 chaires |
| Sciences Po | 7 chartes/guides (intégrité, déontologie, IA, etc.) |
| SKEMA | catalogue exch + Guide étudiant + Rapport Transitions 2024-25 |
| TBS | TBS-Education-Rapport-Societe-A-Mission-2024-2025 |
| INSEAD | Sustainability-Report-2023 + 7 autres docs |
| Excelia | EXCELIA RAPPORT RSE 2024 + Plan strat 25-30 + Schéma Directeur RSDD 2025 |
| Audencia | RAPPORT_RSE_2026.pdf |
| BSB | 5e Rapport RSE 2024 + 3 docs égalité |
| EFREI | EFREI-rapport-RSE-2026 + 2 chartes (éthique, laïcité) |
| EM Strasbourg | rapport_rso_em_strasbourg_2023 |
| EM Normandie | bilan-carbone-2021-22 + RapportFondationEMN2023 |
| Polytechnique | Plan Climat + RA 2024 + VSS + Index F/H + Plaquette Égalité |
| Dauphine PSL | 4-pages Formations + Schema-Directeur DD/RSE + RA 2025 |
| IESEG | RapportImpact-IESEG-2024-25 + GEP + Flyer Discrimination |
| NEOMA | NEOMA-Rapport-d-engagement-TSE-2025 |
| Rennes SB | Resultats-bilan-carbone + Schema_directeur_RSB_V2 |
| Clermont SB | CHARTE-RSE + 2025-rapport-activite |
| Montpellier BS | Bilan Carbone + CP Bilan RSE + Fondation + Politique DD |
| ICN | ICN-Impact_WEB_FR + BC 2023 + 2 guides handicap + Etat-des-lieux 2022 |
| TSM | IAE Toulouse SIP 2025 |
| IAE Lyon | iaelyon PRME SIP 2025 |
| IMT | Rapport ODD GLOBAL 2023 + Charte Respect-Égalité + Guide Handicap + Politique DDRS 2023-27 |
| BREST BS | Brest BS PRME 2021 |
| PSB | PSB_RAPPORT_RSE_2023-2024 |

### Pas dans DOCBENCH (à compléter par WebFetch si besoin)
- IPAG, ISC PARIS, EDC PARIS, ESCE Business School (groupe), Sup de Pub etc.

---

## 9. Outils et commandes utiles

### Lire un PDF avec PyPDF2
```python
from PyPDF2 import PdfReader
import pathlib
r = PdfReader(r'C:\Users\sylva\OneDrive\Bureau\DOCBENCH\<École>\<fichier>.pdf')
out = []
for i, p in enumerate(r.pages):
    out.append(f'\n----- PAGE {i+1} -----\n')
    out.append((p.extract_text() or '').strip())
pathlib.Path('<ecole>_full.txt').write_text('\n'.join(out), encoding='utf-8')
```

### Lire les justifs actuelles d'une école
```python
import json, pathlib, re
raw = pathlib.Path('data.js').read_text(encoding='utf-8')
m = re.match(r"^(\s*const\s+BENCHMARK_DATA\s*=\s*)(.+?)(;\s*)$", raw, re.DOTALL)
data = json.loads(m.group(2))
idx = next(i for i, j in enumerate(data['justifications']) if 'NOM ÉCOLE' in j['name'].upper())
for k in sorted(data['justifications'][idx]['justifs'].keys(), key=int):
    print(f"--- C{k} ({data['grille'][idx]['verdicts'][k]}) ---")
    print(data['justifications'][idx]['justifs'][k])
```

### Excel : ligne d'une école
```python
from openpyxl import load_workbook
wb = load_workbook(r'C:\Users\sylva\OneDrive\Bureau\Mémoire\BENCHMARK RSE.xlsx')
ws = wb['Grille']
for r in range(1, ws.max_row+1):
    name = ws.cell(row=r, column=1).value
    if name and 'NOM' in str(name).upper():
        print(f'Ligne R{r}: {name}')
```

### Git workflow
```bash
git checkout 372f38f -- data.js   # Revert data.js à un commit donné
git log --oneline -10              # Voir l'historique
git push v2 main                   # Push vers la prod
```

### Remotes git du projet
- `origin` : IGENSIA-EDUCATION-BENCHMARK (V1 historique)
- `new` : benchmark-rse-igensia (V1 bis)
- `v2` : benchmark-rse-v2 (PROD ACTIVE)

---

## 10. Commits importants à connaître

| Commit | Date | Description |
|---|---|---|
| `b211020` | avr 2026 | Dernier commit "stable" pré-enrichissement (Xerfi correction) |
| `8d2795f` | avr 2026 | Ajout CESI (6e groupe, score 29.5) |
| `3435a50` | avr 2026 | Fix 3 liens RSE cassés (KEDGE, TBS, AD) |
| `372f38f` | avr 2026 | CESI ajouté au Focus Rapports RSE |
| `d62751c` | avr 2026 | **REVERT** des enrichissements en lot (8 écoles) — point de retour propre |
| `272dee1` | avr 2026 | AD Education enrichi proprement (méthode validée) |

---

## 11. Comment reprendre dans une nouvelle session

1. **Première chose à faire** : `Read METHODE_ENRICHISSEMENT.md` (ce fichier)
2. **Vérifier l'état actuel** : `git log --oneline -5` pour voir où on en est
3. **Lire la dernière conversation utilisateur** s'il y en a une dans le `/compact`
4. **Demander quelle école on enrichit** (l'utilisateur précisera + fournira le PDF)
5. **Appliquer la méthode** (workflow §4) en respectant les règles strictes (§2)

---

## 12. Phrases pour interagir avec l'utilisateur

### Présenter une proposition d'enrichissement
> Je propose d'enrichir N critères pour [École]. Voici pour chacun :
> - **Le contexte** (pourquoi enrichir)
> - **Ce que le rapport ajoute** (avec page source)
>
> Tu valides ?

### Avant tout changement de verdict
> Le verdict actuel est X. D'après le périmètre strict du critère, ce devrait être Y. Tu valides le changement ?

### Avant injection
> Je vais injecter dans `data.js` + mettre à jour Excel + push. Tu confirmes ?

---

**Fin du document de référence. Garder ce fichier à jour à chaque école traitée.**
