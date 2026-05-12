# Mémo — Onglet Présentation (benchmark rapports RSE)

> **À lire en début de toute nouvelle session** dédiée à l'enrichissement de l'onglet Présentation.
> Document compagnon de `METHODE_ENRICHISSEMENT.md` (qui couvre la grille des 36 critères et les écoles).

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
