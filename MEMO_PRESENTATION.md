# Mémo — Onglet Présentation (benchmark rapports RSE)

> **À lire en début de toute nouvelle session** dédiée à l'enrichissement de l'onglet Présentation.
> Document compagnon de `METHODE_ENRICHISSEMENT.md` (qui couvre la grille des 36 critères et les écoles).

---

## 0. Notre référence : le rapport IGENSIA 2024-2025 (48 p.)

> Tout le benchmark sert à identifier des pistes pour améliorer **ce** rapport.
> Lecture intégrale réalisée pour bien connaître le point de départ.

### Structure
| Section | Pages |
|---|---|
| Couverture + sommaire | 1-3 |
| Mots : DG + Directrice DD | 4-5 |
| Présentation Groupe (chiffres clés + cœur de métier) | 6-7 |
| Notre parcours RSE (vision + timeline + BC + ODD + LUCIE) | 8-11 |
| Stratégie + Gouvernance RSE (3 niveaux, 17 pilotes) | 12-13 |
| Engagements auprès des **apprenants** | 14-27 (14 p.) |
| Engagements auprès des **collaborateurs** | 28-34 (7 p.) |
| Engagements sur nos **campus** | 35-40 (6 p.) |
| Entreprises et partenaires **solidaires** | 41-44 (4 p.) |
| Conclusion + 4e couv | 46-48 |

### Forces (à conserver)
**Forme**
- **Codification « C'EST RÉALISÉ / C'EST LANCÉ / C'EST PRÉVU »** : structurante, rare dans le benchmark
- Photos qualitatives en pleine page + schémas et illustrations soignés *(à maintenir et consolider)*
- 8 témoignages incarnés (étudiant, collaborateurs, directeurs, partenaires) *(à maintenir et consolider)*
- Structure mémorisable : 4 grandes parties (Apprenants / Collaborateurs / Campus / Partenaires)

**Fond**
- Bilan Carbone détaillé
- Mots DG + Directrice DD : double signature gouvernance
- Gouvernance RSE structurée : 3 niveaux + 17 pilotes nommés
- Label LUCIE 26000 + ancrage ODD : tiers externes crédibilisants
- Section « C'EST PRÉVU » avec objectifs datés (rentrée 2027, 2026)

### Faiblesses (à travailler dans le prochain rapport)
**Forme**
- Label LUCIE 26000 pas suffisamment visible sur la page de garde (argument d'autorité fort à exposer dès la couverture)
- Pas de schéma directeur RSE 5 axes visible en début de rapport (vue d'ensemble manquante)

**Fond**
- Pas de budget RSE publié en chiffre absolu
- Pas de tableau récapitulatif d'indicateurs N / N-1 (vue trajectoire)
- ODD pas explicitement connectés à nos actions (mentionnés en cadre général p.11 mais pas mis en lien avec chacune des actions)

### Sujets à NE PAS commenter
- **Index égalité F/H** — donnée RH interne, hors-sujet pour un benchmark Forme/Fond
- **Trajectoire de réduction GES** — IGENSIA en a une
- **Pages 45/47 vides** — c'est un bug d'impression, pas un défaut de conception
- **Pages monotextuelles** — c'est très commun dans les rapports, peu différenciant
- **Dispositif VSS** — pas à commenter dans le benchmark
- **Audit externe du bilan carbone** — pas à commenter

### Chiffres clés présents dans le rapport (référence)
- 19 000 personnes formées/an
- 9 secteurs métiers
- BC 2022-2023 : 25 498 tCO2e (Restauration 8 007 / Déplacements 6 080 / Achats 4 147 / Numérique 2 619 / Locaux 2 499 / Équipements 968)
- 90%+ apprenants 1A formés en 2024 aux enjeux DD-RSE (objectif 90% des 1A/2A/3A d'ici fin 2027)
- 190 demandes For Me (jan-juin 2025), répartition : 49% social/familial, 22% santé, 20% mental, 9% admin
- 142 managers formés QVCT
- Index égalité 2024 : 75/100 (vs 84/100 en 2023, -9 pts)
- 1 atelier minimum / trimestre apprenants
- 8 ateliers 2 Tonnes en 2025
- Digital Clean Up Week : 1,83 tCO2e évitée
- Campus des Groues (Nanterre, janvier 2025) : éco-construit, label Bâtiment Biosourcé
- Plan Écowatt depuis 2022 : -10% conso (décret tertiaire)
- Partenariat Karos covoiturage depuis 2023

---

## 1. Contexte

Un onglet **« Présentation »** a été créé sur le site benchmark-rse-v2 (pushé sur v2 le 12 mai 2026, commit `596b67e`). Il contient une **analyse rapport par rapport** des 21 rapports RSE concurrents (IGENSIA exclu — c'est notre objet à améliorer).

**URL prod** : https://sylvainpader-dgrse.github.io/benchmark-rse-v2/ → onglet « Présentation »

### Fichiers concernés

| Fichier | Rôle |
|---|---|
| `presentation/data.js` | Données analyses des 21 rapports (constante `PRESENTATION_DATA`) |
| `presentation/images/<key>.jpg` | Couverture du rapport (max 1600px largeur, JPG q82) |
| `presentation/images/<key>_inner1.jpg` | Page intérieure 1 |
| `presentation/images/<key>_inner2.jpg` | Page intérieure 2 |
| `app.js` | `renderPresentation()` + `renderRapportCard()` + lightbox |
| `style.css` | Section `.pres-*` à partir de la ligne ~480 |
| `index.html` | Bouton onglet + section `#tab-presentation` + lightbox |
| `extract_covers_v3.py` | Script de ré-extraction des pages PDF (DPI 180) |
| `build_pptx_v3.py` | Script de génération du pptx (legacy, conservé) |

### Pptx legacy

`Benchmark_RSE_IGENSIA_Focus_rapports_v3b.pptx` (97 Mo, 48 slides) sauvegardé dans `C:/Users/sylva/Downloads/`. C'est une **version pptx parallèle** au site, plus utilisée comme support de référence que comme livrable actif.

---

## 2. État au 12 mai 2026

### ✅ Travail fait
- 21 rapports listés avec couverture + 2 pages intérieures (zoomables au clic)
- Analyses Forme/Fond/Idées rédigées au premier jet sur l'ensemble des 21
- Synthèse finale « 5 idées prioritaires »
- Charte IGENSIA appliquée (violet `#4A1942`, rose accent `#E60F7D`)
- Lightbox image (clic = zoom plein écran)
- Menu d'accès rapide en haut
- Lazy-loading des images

### 🔜 À faire : reprendre rapport par rapport

**Demande utilisateur (12 mai 2026)** : les analyses actuelles sont trop générales, basées sur les commentaires data.js du Focus Rapports RSE. Il faut **reprendre chaque rapport en lisant attentivement le PDF** pour produire des observations spécifiques.

**Méthode validée (option B)** :
1. Commencer par 3 rapports (OMNES, ESSEC, Galileo) pour fixer la qualité attendue
2. Présenter le résultat → l'utilisateur valide la méthode
3. Enchaîner les 18 autres avec le même standard

**Pour chaque rapport** :
1. Lire le PDF dans `C:\Users\sylva\OneDrive\Bureau\DOCBENCH\<école>\`
2. Identifier **2 pages emblématiques** (pas par défaut p. 5 / p. 30 — vraiment les plus intéressantes pour ce rapport)
3. Re-extraire ces pages avec `extract_covers_v3.py` (modifier la liste `RAPPORTS` pour préciser les bonnes pages)
4. Mettre à jour l'analyse dans `presentation/data.js` :
   - `leg_cov`, `leg_i1`, `leg_i2` : descriptions précises des pages choisies
   - `forme_plus` / `forme_moins` : 3-5 points concrets observés (mise en page, hiérarchie typo, rythme, équilibre texte/visuels, iconographie, choix graphiques)
   - `fond_plus` / `fond_moins` : 3-5 points concrets sur le contenu (KPIs, structure, messages, indicateurs, différenciants, storytelling)
   - `idees` : 1-3 idées actionnables, chacune avec `titre`, `pourquoi`, `comment`
5. Re-optimiser les images si modifiées (PIL convertit PNG → JPG)
6. Commit + push

### ⚠ Règles strictes

- **Ne pas recommander** la structure « C'est réalisé / lancé / en cours » d'ESSEC ou Audencia → c'est **déjà le format IGENSIA**, inutile de le suggérer
- **Pas de CSRD / audit lourd / obligations réglementaires investisseurs** → IGENSIA est un groupe privé d'enseignement supérieur, pas une corporation. Adapter le ton et les recommandations à notre échelle.
- Concentrer sur : storytelling, KPIs adaptés école, équilibre texte/visuels, témoignages incarnés, hiérarchie visuelle, mise en récit pédagogique
- Recommandations **opérationnelles** : « Pourquoi » + « Comment » concrets (pas des généralités)
- IGENSIA exclu des 21 analyses (objet à améliorer, pas à comparer à soi-même)

### 🎯 Rigueur analytique — comparaison systématique IGENSIA ↔ rapport analysé

**Demandé explicitement par l'utilisateur (rev. 12 mai 2026, ESSEC) :**

La règle s'applique aux **3 sections** de la fiche : `forme_plus`, `fond_plus` ET `idees`. Si IGENSIA fait déjà la même chose, le sujet ne doit apparaître nulle part comme une force distinctive de l'école analysée.

**Process pour chaque bullet d'analyse :**

1. **Lister ce que fait l'école analysée** sur le sujet (élément précis du rapport, page si possible)
2. **Comparer avec la fiche IGENSIA section 0 du mémo** (forces forme + forces fond)
3. **Identifier le DELTA réel** :
   - Si IGENSIA fait déjà ça (même approximativement) → **drop l'item** (pas seulement dans idees, aussi dans forme_plus / fond_plus si c'est ce qui en faisait une force distinctive)
   - Si IGENSIA fait quelque chose de proche mais différent → questionner si la différence est significative
   - Si IGENSIA ne le fait pas du tout → **garde l'item**
4. **Pour les idées : formuler le delta explicitement** dans le champ `pourquoi` :
   - « Chez nous : X. Chez [école] : Y. » (formulation du contraste explicite)
   - Pas de « C'est une bonne pratique » sans nommer le manque chez IGENSIA
5. **Vérifier la non-duplication intra-fiche** : un sujet (ex. témoignages) ne doit pas apparaître à la fois en `forme_plus` et `fond_plus`. Garder l'angle le plus pertinent et drop l'autre.

**Anti-patterns à éviter** :
- Idées génériques sur des sujets où IGENSIA est solide (timeline, témoignages incarnés, gouvernance structurée, schémas et illustrations soignés, codification réalisé/lancé/prévu, photos qualitatives, hiérarchie typo)
- Lister une force en forme_plus / fond_plus alors qu'IGENSIA fait la même chose (donne l'impression que l'école est en avance sur ce point alors qu'on est à parité)
- Contradictions internes (ex. forme_plus « 22 p. denses sans être indigestes » + forme_moins « texte trop dense » — choisir un angle)
- Items duplicés entre forme et fond sur le même sujet

**Quantité d'idées** : viser 2-5 idées par rapport, sur la base de **vrais deltas**. Mieux vaut 2 idées pertinentes que 7 idées dont 5 doublonnent. Pour les rapports où IGENSIA est déjà fort (cas ESSEC #2), il est normal d'avoir peu d'items en forme_plus / fond_plus — c'est un signal de qualité, pas une lacune d'analyse.

**Cas types observés** :
- OMNES (#1) : beaucoup de vrais deltas (budget RSE, tableau 5 ans, ratés, biodiversité, ZOOM SUR, structure LUCIE schéma, couverture-graphique)
- ESSEC (#2) : 4 idées vraies après audit (Chiffres clés en encadré par chapitre, indicateurs en variation, page Témoignages dédiée + alumni, réseau profs ambassadeurs). 2 forme_plus, 8 fond_plus — beaucoup d'éléments dropés car équivalents à ce qu'on a déjà (frise, schéma gouvernance, codification RÉALISÉ/LANCÉ/PRÉVU, témoignages variés, hiérarchie typo, densité éditoriale)

**Discipline langue : tout en français.** Les noms propres de programmes restent (Antropia ESSEC, Time to Act, etc.) mais les termes descriptifs analytiques sont systématiquement traduits (KEY FIGURES → Chiffres clés, Testimonies → Témoignages, commitments → engagements, action plans → plans d'action, business school → école de commerce, sustainability → RSE/durabilité, etc.)

---

## 3. Ordre du classement (par note finale Forme+Fond)

| Rang | École | Forme | Fond | Note |
|---|---|---|---|---|
| #1 | OMNES Education | 3.75 | 4.25 | 4.00 |
| #2 | ESSEC | 4.00 | 4.00 | 4.00 |
| #3 | Galileo Global Education | 4.25 | 3.50 | 3.88 |
| #4 | Excelia BS | 3.75 | 4.00 | 3.88 |
| #5 | Audencia BS | 4.00 | 3.50 | 3.75 |
| #6 | EFREI | 3.75 | 3.75 | 3.75 |
| #7 | IESEG | 3.00 | 4.00 | 3.50 |
| #8 | EMLYON BS | 3.50 | 3.25 | 3.38 |
| #9 | EDHEC BS | 2.75 | 3.75 | 3.25 |
| #10 | SKEMA BS | 3.25 | 3.00 | 3.12 |
| #11 | Burgundy SB | 3.00 | 3.25 | 3.12 |
| #12 | HEC Paris | 2.25 | 3.50 | 2.88 |
| #13 | KEDGE BS | 2.50 | 3.25 | 2.88 |
| #14 | AD Education | 2.50 | 3.00 | 2.75 |
| #15 | NEOMA BS | 2.50 | 3.00 | 2.75 |
| #16 | Grenoble EM | 1.75 | 3.50 | 2.62 |
| #17 | TBS Education | 1.75 | 3.50 | 2.62 |
| #18 | INSEAD | 1.75 | 3.25 | 2.50 |
| #19 | EM Strasbourg BS | 1.50 | 3.50 | 2.50 |
| #20 | PSB Paris SB | 1.75 | 2.75 | 2.25 |
| #21 | CESI | 0.75 | 4.25 | 2.50 |

*IGENSIA hors classement (objet à améliorer) — Score Focus 3.50/5 — rang #7/22 si inclus.*

---

## 4. Structure de `presentation/data.js`

```js
PRESENTATION_DATA = {
  meta: { nb_rapports: 21, methodo: "..." },
  rapports: [
    {
      key: 'omnes',           // identifiant court, lié au nom des images
      rank: 1,                // rang dans le classement
      score: 4.00,            // note finale (moyenne 4 notes)
      forme: 3.75,            // moyenne (Blanche + Sylvain) Forme
      fond: 4.25,             // moyenne (Blanche + Sylvain) Fond
      name: 'OMNES Education',
      titre: 'Rapport RSE 2024-2025',
      pages: '44 p.',
      leg_cov: "...",         // légende couverture
      leg_i1:  "...",         // légende page intérieure 1
      leg_i2:  "...",         // légende page intérieure 2
      forme_plus:  [...],     // points forts forme (3-5)
      forme_moins: [...],     // points faibles forme (2-4)
      fond_plus:   [...],     // points forts fond (3-5)
      fond_moins:  [...],     // points faibles fond (2-4)
      idees: [                // 1-3 idées pour IGENSIA
        { titre: "...", pourquoi: "...", comment: "..." },
      ],
    },
    // ... 20 autres rapports
  ],
  synthese: [                 // 5 idées prioritaires (synthèse globale)
    { num: "01", titre: "...", desc: "..." },
  ],
};
```

---

## 5. Commande utile : re-extraire les pages PDF

```python
# Modifier la liste RAPPORTS dans extract_covers_v3.py
# (key, sous-dossier DOCBENCH, motif fichier, [page_intérieure_1, page_intérieure_2])
RAPPORTS = [
    ('omnes', 'OMNES', 'OMNES-RA_RSE', [12, 28]),  # ← ajuster les n° de pages
    # ...
]

# Puis exécuter :
python extract_covers_v3.py

# Pour optimiser en JPG :
python -c "
from PIL import Image
import pathlib
for png in pathlib.Path('_covers').glob('*.png'):
    with Image.open(png) as im:
        im = im.convert('RGB')
        w, h = im.size
        if w > 1600:
            im = im.resize((1600, int(h*1600/w)), Image.LANCZOS)
        out = pathlib.Path('presentation/images') / (png.stem + '.jpg')
        im.save(out, 'JPEG', quality=82, optimize=True)
"
```

---

## 6. Pour reprendre dans une nouvelle session

1. **Lire ce mémo** (MEMO_PRESENTATION.md) en début de session
2. **Vérifier l'état git** : `git log --oneline -5`
3. **Confirmer le rapport à traiter** (par défaut : OMNES, puis ESSEC, puis Galileo si méthode validée)
4. **Lire le PDF du rapport** dans `DOCBENCH/<école>/`
5. **Choisir 2 pages intérieures** pertinentes
6. **Mettre à jour** `presentation/data.js` avec les analyses
7. **Re-extraire** si besoin les images via `extract_covers_v3.py`
8. **Tester localement** en ouvrant `index.html` (ou via le site v2 après push)
9. **Commit + push v2** : message « OMNES : analyse approfondie rapport par rapport »

---

## 7. Phrases utiles

### Pour valider la méthode après OMNES
> Voici l'analyse OMNES rédigée à partir d'une lecture complète du rapport. Tu valides ce niveau de profondeur avant qu'on enchaîne avec ESSEC et Galileo ?

### Pour confirmer avant injection
> Je vais mettre à jour `presentation/data.js` avec l'analyse OMNES + nouvelles pages intérieures. Tu confirmes ?

---

**Fin du mémo. À garder à jour à chaque rapport retravaillé.**
