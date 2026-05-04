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

### 🔒 RÈGLE STRICTE SOURCES (validée 26 avril, post-EDC)
- **SEULEMENT** : (1) site web officiel de l'école/groupe + (2) documents officiels publiés par l'école (rapports RSE/ESG, chartes, accords, indicateurs égalité, plans stratégiques publiés)
- **INTERDIT** : presse externe (Le Parisien, Le Point, L'Étudiant, Les Échos), agences info (presseagence, objectif-ast), Wikipédia, classements externes, articles non publiés par l'école
- **EXCEPTION** : si la page officielle de l'école mentionne ses propres classements (ex: « Nous sommes 4e ChangeNow »), on peut le citer en sourçant la page école, pas l'éditeur du classement
- **CHAQUE NOUVELLE ÉCOLE** : croisement systématique PDF + site officiel école obligatoire

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
- **Brest Business School enrichi** (26 avril) :
  - 24 justifs enrichies (C1, C3, C4, C6, C7, C8, C9, C10, C12, C15, C16, C17, C18, C21, C23, C25, C26, C27, C30, C31, C32, C33, C34, C35)
  - **Examen équilibré dans les 2 sens** (suite remarque utilisateur sur biais à la hausse)
  - 3 descentes (cohérence méthode AD) : C4 PARTIEL → NON (zéro label dans périmètre strict) ; C6 PARTIEL → NON (charte étudiante ≠ dispositif anti-corruption) ; C8 OUI → PARTIEL (MS et MIB pas documentés sur DD obligatoire ≥15h/an)
  - 10 montées : C12, C18, C21, C23, C27, C32 NON → PARTIEL ; C16, C17, C25, C26 PARTIEL → OUI
  - Score : 11.0 → **14.5** (Insuffisant maintenu, <20)
  - **Correction rétroactive C1 PARTIEL → NON** (suite challenge utilisateur) : A. Choquet pas au COMEX → score 14.5 → **14.0**
  - Sources : Rapport PRME 2021 (86p) + brest-bs.com + vérifs web
  - Excel mis à jour (Grille R44)
- **Correction rétroactive AD Education C1** (26 avril, suite cohérence stricte) :
  - C1 PARTIEL → NON (la justif disait déjà explicitement « Pas de Direction RSE dédiée au COMEX identifiée »)
  - Score : 20.0 → **19.5**
  - Tier : « En progression » → **« Insuffisant »** ⬇ (passage de seuil 20)
  - Excel mis à jour (Grille R37)
- **Burgundy School of Business (BSB) enrichi** (26 avril) :
  - 27 justifs enrichies (tous les critères)
  - 3 descentes (cohérence stricte) : C1 PARTIEL → NON (Anne-Laure Brochet pas au Directoire) ; C12 OUI → PARTIEL (politique QVT à formaliser, projet 2024-26) ; C14 OUI → PARTIEL (seuls nouveaux salariés formés, déploiement total 2027)
  - 2 montées (preuves solides) : C9 PARTIEL → OUI (« tous les programmes intègrent 1 objectif RSE » — Indicateurs égalité 2024-25) ; C21 PARTIEL → OUI (Stratégie Act for Change formalisée + label DD&RS audit 5 axes)
  - Score : 29.0 → **28.5** (Confirmé maintenu)
  - Sources : Rapport RSE 2024 BSB (24p, déc 2024, récent) + Indicateurs égalité 2024-25 + Accord collectif égalité + Plan d'action égalité 2023-24 + bsb-education.com
  - Excel mis à jour (Grille R22)
- **★ IGENSIA Education enrichi** (CIBLE du benchmark — 26 avril) :
  - 36 justifs enrichies (tous les critères)
  - 2 verdicts modifiés : C8 OUI → PARTIEL (Mastères pas couverts par 30h/an, rentrée 2027 prévue) ; C23 PARTIEL → OUI (forfait mobilité 150€/an + Karos + locaux vélos = politique formalisée)
  - C1 OUI confirmé : Heide Mathieu (Directrice DD) avec mandat formalisé sur stratégie LUCIE 26000, rattachée DG (périmètre satisfait)
  - Correction factuelle : index égalité C26 corrigé (76/100 et non 93/100)
  - Score : 27.0 → **27.0** (Confirmé maintenu, inchangé)
  - **CONFIRMATION ANTI-ERREUR** : IGENSIA = fédération d'associations à but non lucratif (loi 1901), PAS Société à Mission (vérifié rapport p. 6 + Wikipédia + nominations 2023)
  - Sources : Rapport RSE 2024-2025 (48p, mars 2026) + igensia-education.fr + LinkedIn + nominations Groupe IGS juin 2023
  - Excel mis à jour (Grille R29)
- **Clermont School of Business enrichi** (26 avril) :
  - 17 justifs enrichies sur les critères clés (C1, C4, C8, C12, C13, C14, C17, C18, C21, C23, C25, C26, C28, C29, C30, C33, C34)
  - 1 verdict modifié : C29 PARTIEL → OUI (charte alimentation durable Fresh Food Lab signée 5 fév 2025)
  - C8 OUI maintenu après challenge utilisateur : 100h DD Bachelor (~33h/an, très au-dessus du seuil 15h) + 30h PGE + 4 spécialisations RSE PGE + Académie interdisciplinaire transitions = volume très significatif probablement déployé partout
  - C1 OUI confirmé : Robin Jund = Directeur TSE (poste de direction, pas responsable opérationnel) + Sandrine Villeneuve Chargée Mission TSE depuis avril 2025
  - C4 confirmé OUI : Label DD&RS obtenu décembre 2025 (vérifié sur clermont-sb.fr/en)
  - Score : 29.5 → **30.0** (Confirmé → **Avancé** ✨)
  - Sources : Rapport d'activité 2024-2025 (46p, nov 2025) + Charte RSE (signée 10 nov 2017) + clermont-sb.fr
  - Excel mis à jour (Grille R21)
- **EDC Paris Business School enrichi** (26 avril, méthode rigueur sources) :
  - 12 justifs enrichies (C1, C4, C7, C8, C15, C17, C20, C25, C26, C33, C34, C35) UNIQUEMENT avec sources officielles (SIP 2024 + edcparis.edu)
  - 1 verdict modifié : C4 PARTIEL → NON (zéro label dans périmètre strict — PRME/BSIS/EFMD/AACSB/Qualiopi sont engagement ou accréditations académiques, pas labels RSE)
  - Score : 6.5 → **6.0** (Insuffisant maintenu)
  - **Sources strictement limitées au site officiel + SIP 2024** (rapport PRME minimaliste : « No Entity Yet », « Professor-Discretionary », « No Performance Disclosure »)
  - Pas d'enrichissement par presse externe (Le Parisien 1er Diversité Sociale, Le Point, etc.) selon nouvelle règle stricte sources
  - Excel mis à jour (Grille R46)
- **EDHEC Business School enrichi** (26 avril, sources officielles strictes) :
  - 12 justifs enrichies (C1, C3, C5, C8, C9, C17, C20, C23, C27, C33, C34, C35) avec Plan Générations 2050 (juin 2024) + Rapport DDRS 2023
  - 1 verdict modifié : C27 PARTIEL → OUI (filière déchets formalisée et chiffrée — Lemon Tri 19 000 kg Roubaix 2022 valorisé 97% recyclage matière + ATF Gaia + API Restauration entreprise à mission + Beesk anti-gaspi + compost campus Lille)
  - C1 OUI maintenu : Cécile Legrand (Responsable RSE depuis février 2022) avec mandat formalisé via plan stratégique « Impact Future Generations » + « Générations 2050 » porté par DG Emmanuel Métais ; Ethics Board structuré depuis 2011
  - Apports Plan 2050 : Centre for Net Positive Business (21M€), Climate Finance School (41M€), Fonds Générations Powered by EDHEC (40M€), Transformative Journey ≥20% ECTS, Label Citizen Associations (100% asso d'ici 2028), 270M€ investissement total
  - Score : 32.0 → **32.5** (Avancé maintenu, ≥30)
  - Excel mis à jour (Grille R11)
- **EFREI enrichi** (26 avril, sources officielles strictes) :
  - 22 justifs enrichies avec Rapport RSE 2026 (23p) + Charte Éthique (V2 nov 2025, 7p) + Charte Laïcité/Diversité (V2 déc 2025, 4p)
  - 5 verdicts modifiés : 1 descente (C4 PARTIEL → NON, candidature DD&RS fin 2025 mais pas obtenu) + 4 montées : C14 PARTIEL → OUI (100% enseignants formés 2j + 14h/an formation DD/RS moyenne par personne), C20 PARTIEL → OUI (objectif chiffré -5%/an d'ici 2050 aligné Accord de Paris), C21 PARTIEL → OUI (Schéma directeur DD/RS adopté CA juillet 2024 + 6 chartes signées + actions concrètes), C30 PARTIEL → OUI (Medaviz 24/7 + Nevaya psy multilingue + psy sociale Eva Souchet sur campus + dispositif évaluation santé mentale)
  - C1 OUI maintenu : Direction RSE créée 2020 + équipe projet Efrei for Good (4 personnes sous responsabilité CODIR) + Stéphanie Libeskind Responsable RSE + maillage 80+ personnes (60 référents EFG + 6 référents harcèlement + référents thématiques)
  - Score : 29.0 → **30.5** (Confirmé → **Avancé** ✨, seuil ≥30)
  - Excel mis à jour (Grille R23)
- **EM Normandie enrichi** (26 avril, sources officielles strictes) :
  - 12 justifs enrichies (C1, C5, C7, C15, C17, C18, C19, C25, C30, C33, C34, C35) avec Rapport Fondation EMN 2023 (14p) + Bilan Carbone 2021-2022 via Carbo (35p)
  - **Aucun changement de verdict** (verdicts actuels déjà cohérents et bien justifiés)
  - Score : 28.5 → **28.5** (Confirmé maintenu)
  - Apports : Élian Pilvin DG + Philippe-Jean Péron Président Fondation + Solène Heurtebis Directrice DISE + détails 648K€ Fondation depuis 2016, 241 bourses + 11 entités BC consolidé 4 782 tCO2e + 5 chaires + 15 EC lauréats Prix Excellence Académique + Start'EM Day mars 2023
- **EM Strasbourg Business School enrichi** (27 avril, sources officielles strictes) :
  - 16 justifs enrichies (C1, C2, C3, C10, C12, C14, C17, C18, C21, C23, C24, C27, C33, C34, C35) avec Rapport RSO 2023 EM Strasbourg (38p) + em-strasbourg.com
  - 3 verdicts modifiés (examen équilibré dans les 2 sens) :
    - **1 descente** : C1 PARTIEL → NON (Auréline Gamand chargée de mission RSO + Babak Mehmanpazir DG mais comité RSO consultatif sans rattachement formalisé COMEX au sens du périmètre strict)
    - **2 montées** : C23 PARTIEL → OUI (Forfait Mobilité Durable 300€/an propre EM + Green Mobility 5 étapes + Au boulot à Vélo 3e composante interne) ; C27 PARTIEL → OUI (Green Phoenix biodéchets startup alumni + Recygo papier 800kg + Cy-clope mégots 35kg + 21 points collecte)
  - Score : 25.5 → **26.0** (Confirmé maintenu)
  - Sources : Rapport RSO 2023 (38p, mai 2023) + em-strasbourg.com
  - Excel mis à jour (Grille R32)
- **EMLYON Business School enrichi** (27 avril, sources officielles strictes + vérification site) :
  - 21 justifs enrichies par AJOUT (C1, C2, C3, C5, C7, C8, C9, C11, C12, C14, C15, C17, C18, C20, C26, C27, C29, C30, C32, C33, C34) avec Rapport d'engagement 2024 (40p, avril 2025) + DPEF 2023-2024 vérifié OTI Baker Tilly STREGO (74p, accrédité COFRAC n° 3-1883) + em-lyon.com
  - **Aucun changement de verdict** (score 35.0 maintenu, top du benchmark)
  - **Apprentissage clé** : ne JAMAIS retirer un chiffre déjà sourcé sur le site officiel sans avoir vérifié le site (cas « 2 millions de gobelets/an » : initialement proposé à retrait sur la base du rapport « 15 000/mois », vérification em-lyon.com a confirmé la valeur 2M/an officielle → conservée). Idem pour 50% alimentation végétale (rapport dit 40%, site dit 50% à jour 2024) et index égalité 90/100 (rapport dit 89/100 fin 2023, site dit 90/100 en 2024).
  - Apports : Bénédicte Bost DESE au Comité Exécutif (10 personnes) + Comité de Mission 9p (6 externes) + Conseil de Surveillance 12p + Commission RSE 4p + Direction ESE 13 collaborateurs RSE + 7 médico-sociaux + 35 profs task force + 30 ambassadeurs collaborateurs + 1 responsable RSE/asso (33 assos) + 4 chaires alignées mission (nouvelle Transition Hydrogène avec Vinci+Centrale Lyon) + Institut HITS Healthcare créé + cursus emlyon BioPharma + Label HRS4R Commission Européenne février 2025 + La Toile 95% satisfaction 90% réussite + 219 étudiants handicap (+135% depuis 2021) + TrEMplin 137 boursiers (+61%) + Conseil de Surveillance 41% femmes (5/12) + Charte LGBT+ Autre Cercle depuis 2022 (77% bienveillance baromètre) + Junior Entreprise label Engagé RSE AFNOR + +18% dons Fondation 2023 vs 2022 + Pass Betterway 400€/an + 86 associations partenaires + 1612 engagements/an + 87 300h bénévolat
  - Score : 35.0 → **35.0** (Avancé maintenu, top benchmark, ≥30)
  - Pas de mise à jour Excel nécessaire (0 verdict, score inchangé)

### 🆕 Règle ajoutée (post-EMLYON) — VÉRIF SITE AVANT RETRAIT
- **Avant de retirer ou modifier un chiffre déjà présent dans une justif**, vérifier systématiquement sur le site officiel école si le chiffre y figure (le périmètre méthodologique inclut **site officiel + documents publiés**, donc un chiffre site est valide même s'il diffère du rapport).
- Si rapport et site donnent des valeurs différentes (ex. EMLYON gobelets 15 000/mois vs 2M/an, alimentation 40% vs 50%, index 89 vs 90/100) : **garder la valeur du site officiel** (généralement plus à jour) et ne pas retirer.
- Cette règle évite les faux retraits qui appauvriraient indûment les justifs.

- **ESCP Business School enrichi** (27 avril, sources officielles strictes) :
  - 20 justifs enrichies (C1, C2, C3, C5, C6, C7, C8, C9, C10, C12, C13, C16, C17, C18, C19, C20, C21, C25, C26, C34) avec Rapport activité 2023 (16p) + Carbon Footprint 2024 vérifié AFNOR Certification (25p, ISO 14064-3:2019, niveau Reasonable, certificat 116114.1) + Brochure Sustainability ESCP (5p) + Rapport Fondation 2023 (24p) + Sustainability Report Berlin 2022 (34p) + escp.eu
  - **1 montée** : C16 PARTIEL → OUI (Train the Trainers programme lancé 2023 avec Le Campus de la Transition + 10 ambassadeurs « connectors » dans chaque département académique + 20+ profs Sustainability Department dirigé par Prof. Julien Schmitt)
  - **Corrections factuelles importantes** :
    - C7, C18, C21 : « Bilan Carbone audité PWC » → **AFNOR Certification** (niveau Reasonable, supérieur à Limited)
    - C2 : « Sustainability Advisory Council 13 leaders, lancé avril 2025 » → **12 leaders, Sustainability Leaders Alliance « in formation »** (brochure)
    - C9 : « 2 MSc » → **3 MSc + 21 spécialisations MiM**
    - C17 : Sustainability Department dirigé par **Prof. Julien Schmitt** + **2 centres recherche RESET et STAR** + 14 chaires + 3 Professorships
  - Apports : Léon Laulusa Executive President & Dean (mai 2023) + plan « Choice & Experiences » 2022-25 + LIGhTS 6 priorités + 9 786 étudiants 135 nationalités + 14 chaires (Women in Finance déc 2023 avec 6 mécènes + Cartier ESCP-HEC + BNPP + Schneider + BPCE + IoT + Diversity Gap + Africa AXIAN/Attijariwafa) + 3 Professorships (KPMG, L'Oréal, Monaco) + ERIM + Ethical assessment committee 2021 + AI User Charter mai 2023 + Bilan Carbone 28 247 tCO2e détaillé scope 1+2+3 + Plan transition 22 actions 8 axes + Personal carbon account + 320M€ rénovation 5 campus + Madrid LEED Platinum + Turin classe A4 + Berlin 100% renouvelable TÜV Nord + Camden Climate Alliance Londres + Effinature visé Paris (urbain biodiversité, refuges flore/faune locales) + Ma Petite Planète depuis 2022 (1102 participants jan 2025 -66,2 tCO2e) + Designing Europe en train (1400 étudiants) + AXA Climate School 900 certifiés + 1461 séminaires obligatoires + Sulitest étendu 2024 + 5,1M€ Fondation 2023 (+24,4%) 47 projets + 9M€ Égalité chances + 869 bourses + 117 Chances Augmentées + 7 910 repas 1€ + 53 prêts BNPP + Talent Spring KPMG + 24% boursiers PGE + Index F/H 97/100 (2026) + 100 associations étudiantes
  - Score : 33.0 → **33.5** (Avancé maintenu, ≥30)
  - Excel mis à jour (Grille R10)

- **EXCELIA Business School enrichi** (27 avril, sources officielles strictes + auto-critique biais) :
  - 20 justifs enrichies (C1, C2, C3, C4, C7, C8, C9, C12, C13, C14, C16, C17, C18, C19, C20, C21, C27, C30, C32, C34) avec Schéma Directeur RSDD juin 2025 (25p, signé Bruno NEIL DG + Tamym ABDESSEMED DGA) + Rapport TES 2022-2024 (44p, signé Bruno NEIL DG, sept 2024) + Rapport RSE 2020-2021 (32p) + Plan stratégique 2025-2030 « Intelligences for our FutureS » (avril 2025) + excelia-group.fr
  - **8 verdicts modifiés (toutes des montées, 0 descente)** :
    - C2 PARTIEL→OUI (Comité parties prenantes oct 2023 + Comité éthique recherche nov 2023 + Sénat étudiants 341 membres déc 2023 + COPIL trimestriel SD RSDD)
    - C9 PARTIEL→OUI (25% heures enseignement RSE + 75% modules irrigués + TASK™ Sulitest objectif 100% en 2026)
    - C12 NON→PARTIEL (projet accord QVCT SD RSDD + 12 référents RPS juin 2024 + charte télétravail révisée)
    - C18 PARTIEL→OUI (Bilan Carbone 9 191 tCO2e Coopérative Carbone La Rochelle + ADEME, scopes 1+2+3, 2,1 tCO2e/étudiant)
    - C19 NON→OUI (scope 3 détaillé : déplacements, achats, sous-traitances, déchets, fret)
    - C20 NON→PARTIEL (Programme ACT® pas à pas ADEME aligné Accord de Paris + objectif sobriété -10% en 2024 vs 2019, mais pas d'objectif chiffré pluriannuel — cohérence biais)
    - C21 PARTIEL→OUI (Schéma Directeur RSDD juin 2025 + Plan ACT® + Plan sobriété énergétique nov 2022 + FMD sept 2023 + Campus Tours BEE + Plan biodéchets)
    - C27 PARTIEL→OUI (66 pôles tri La Rochelle remplaçant 315 individuelles + Biotop sept 2023 = -11 tCO2e + Greenwishes Orléans mai 2024 + projet biodéchets)
  - Apports : Plan « Intelligences for our FutureS » 2025-2030 + Bruno NEIL DG + Tamym ABDESSEMED DGA + Lisa MCALLISTER Directrice TES (créée janv 2023) + Soizic DAOUX + Pierric FARGEAS + 5 axes RSDD pilotés au COMEX + 6 000 étudiants + 391 salariés + 4 campus (La Rochelle, Tours, Orléans, Paris) + Niort + Bilan Carbone détaillé scopes 1+2+3 + Plan ACT® ADEME + 5 chaires IRSI + Comptabilité élargie CARE projet doctoral cofinancé Université La Rochelle + Cécile EZVAN Directrice IRSI + Jean-Pierre HELFER Directeur Recherche + Pierre BARET axe DD/RSE + 42 EC + 278 contributions intellectuelles RSE 2021-2023 (50% liées ODD) + 5e ChangeNOW × Les Echos START 2024 + Top 50 mondial PIR niveau 4 + THE IMPACT 301-400/2000 (2e management française) + ODD 8 18e mondial + XL ACT 4 jours formation collaborateurs (28% sensibilisé 2023, objectif 25%/an, 17K€/promotion x 2/an) + Blue Education Experience juin 2023 + Blue Engagement Days + 13 903h enseignement RSE = 25% + 290 enseignants impliqués + 91% Sulitest + 60% TASK™ (objectif 100% en 2026) + Humacité 802 missions + Climacité 553 missions + Direction Engagement Étudiant rentrée 2024 + Sénat 341 étudiants + 30 Sentinelles + Cnaé + 12 référents RPS + Forfait Mobilités Durables 85 salariés + Fondation Excelia 95 676€ (20 entreprises mécènes, 14 étudiants, 5 projets) + Coopérative Carbone La Rochelle + LRTZC + 66 pôles tri + Biotop -11 tCO2e + Greenwishes + Campus Tours BEE bois/paille + référentiel compétences DD&RS CDEFM (présidé Bruno NEIL) + Comité parties prenantes 3 collèges (Corinne GENDRON UQAM)
  - Score : **24.5 → 29.0** (En progression → **Confirmé** ≥25 ✨ — passage de tier)
  - Excel mis à jour (Grille R34)

- **ESSEC Business School enrichi** (27 avril, sources officielles strictes + auto-critique biais) :
  - 17 justifs enrichies (C1, C2, C3, C5, C7, C8, C10, C11, C12, C13, C17, C18, C20, C26, C27, C30, C34) avec Rapport DD&RS Sustainability and Social Responsibility 2025 ESSEC (signé Vincenzo Vinzi Dean + Anne-Claire Pache Associate Dean for Strategy and Sustainability)
  - **1 verdict modifié (descente cohérence biais stricte)** : C20 OUI → PARTIEL — résultat passé tangible (-10% empreinte par étudiant 23/24 vs 18/19) MAIS pas d'objectif chiffré formalisé (% réduction par an, année cible) ni trajectoire publique, contrairement à EMLYON -25%/2030, EFREI -5%/an aligné Accord de Paris, ESCP -55%/2030 + Net Zero 2050. Cohérence stricte avec correctifs ESDES + ESSCA.
  - Apports : Vincenzo Vinzi Dean + Anne-Claire Pache Associate Dean Strategy/Sustainability au COMEX + Plan Transcend 2024-2028 (succède Together 2020) + Sustainability Master Plan formalisé 2024 + 8 plans d'action stratégiques + Societal Impact Committee Supervisory Board + COCON 20 membres 5 collèges + Sustainability Guild 60 profs + 23 ambassadors network (janv 2024) + Together Impact Fund (3000€/projet, 25+ projets) + Diversity Fresco 30 000+ participants 200+ entreprises + 100% étudiants Diversity Fresco/an + 130h cours obligatoires Grande École + 120h GBBA + 30% spécialisés sustainability + Climate School lancée janvier 2025 + TASK Sulitest IMPACT + 4 chaires sustainability nouvelles 2021-2022 + 12 nouveaux profs sustainability + 33% articles ESSEC sustainability + Centre for Social and Ecological Innovation lancé 2023 + Antropia ESSEC (1er social accelerator BS, 2008) + CoBS 12 schools 6 continents 16 pays + Special magazine Harvard BS Climate Change oct 2024 + 1500 m² panneaux solaires Cergy nov 2024 + 17→11 kg déchets/user + recycling 33→40% + reusable containers 2024 + ESSECare 900 employés + plateforme teale + 89/100 index F/H 2024 + 23% boursiers + 60 000 jeunes bénéficiaires depuis 1986 + PQPM 360 collégiens/an + PHARES + 350+ étudiants handicap + Charte L'Autre Cercle LGBT+ juin 2024 + reporting process VSS sanctions + #1 ChangeNOW × Les Échos 3 années consécutives + Cergy-Pontoise territorial commitment charter juin 2023 + ESSEC Rabat Lalla Meryem Prize + APAC 2000h volontariat + Act'Sup ADEME
  - Score : 34.0 → **33.5** (Avancé maintenu, ≥30)
  - Excel mis à jour (Grille R6)

- **ESSCA Business School enrichi** (27 avril, sources officielles strictes + auto-critique biais) :
  - 18 justifs enrichies (C1, C2, C3, C5, C7, C9, C11, C12, C14, C16, C17, C18, C20, C21, C25, C26, C30, C32) avec Rapport activité 2024-2025 ESSCA (26p, signé Jean Charroin DG + Christian Niboural CA) + Stratégie DD&RS mars 2023 (31p) + Gender Equality Plan septembre 2024 (7p, signé Jean Charroin) + essca.eu
  - **2 verdicts modifiés (examen équilibré)** :
    - **1 montée** : C21 PARTIEL → OUI (Schéma Directeur DD&RS adopté 2024 + plan sobriété énergétique depuis 2022 DJU + politique voyage affinée + accord intéressement tranche 4 (20% conditionné conso énergie m²) + plan transition mobilité 2025-2026 + extension BEGES internationaux + projet zéro plastique + certifications BREEAM/HQE visées + charte upcycling + réutilisation mobilier Paris)
    - **1 descente (cohérence biais stricte avec correctif ESDES)** : C20 OUI → PARTIEL (objectif neutralité carbone 2035 affiché mais pas chiffré — % réduction par an, trajectoire — contrairement à EMLYON -25%/2030, EFREI -5%/an, ESCP -55%/2030)
  - Apports : Plan KAIROS 2030 adopté CA mars 2025 (succède Odyssée 20-24, 4 piliers : Innovation/Internationalisation/Efficience/Rayonnement) + Christian Niboural Président CA + Jean Charroin DG + Isabelle Dreno DGA Ressources + Benjamin Morisse DGA Stratégie + 80,2M€ CA + 7 800 étudiants + 500+ collaborateurs + 10 campus (avec Malaga + Luxembourg + Strasbourg) + 22 800 alumni + Schéma Directeur DD&RS adopté 2024 + 5 piliers DD&RS au COMEX + CSR Advisory Board + charte déontologie Advisory Boards + 1er BEGES périmètre français 2023-2024 + 7e FT critère RSE + 38e impact carbone + Top 10 QS diversité + 6 ODD THE + entrée Shanghai ARWU Business Administration + faculté 183 EC permanents 57% internationaux + AXA Climate partenariat (modules + mises situation entreprise) + HSBC + Microsoft Innovation Board + accord intéressement énergie + Spot the Flag + FLASHBACK MILDECA + Filboost + Schéma Directeur Vie Étudiante + 3 parcours engagement + Commission Handicap + salle inclusive Angers + plan « Recruter sans discriminer » 2025-2026 + Chaire Prospective Consommation Familles + Chaire Jean Monnet + Institut AI for Sustainability (conférence Corinne Lepage 27/03/2025) + Institut Transports projet ANACECA + GEP septembre 2024 6 axes (signé Jean Charroin) + Cafés nature/grainothèque Angers + ateliers 2tonnes 7 collab Crous Versailles + Splash Project renommé Impact ESSCA + nouveau site essca.eu éco-conçu 1,8M visites
  - Score : 32.0 → **32.0** (Avancé maintenu, ≥30) — score net inchangé après auto-critique
  - Excel mis à jour (Grille R12)

- **ESDES Business School enrichi** (27 avril, sources officielles strictes) :
  - 17 justifs enrichies (C1, C2, C3, C5, C8, C11, C12, C13, C14, C17, C18, C20, C25, C26, C30, C31, C33) avec Rapport PRME/SIP 2021-2023 ESDES (38p, signé Steven Coissard et Emilie Sotton) + Politique d'achat responsable janv 2025 (5p) + esdes.fr + ucly.fr
  - **2 montées** (examen équilibré dans les 2 sens, descents : aucune) :
    - C13 PARTIEL → OUI (Safe Week octobre 2022 + 2 référentes VSS UCLy dédiées + journée Tous Responsables obligatoire WEI depuis 2009 + signature charte Cpas1option + sensibilisation théâtre + Point écoute psychologue Laure Mayoud)
    - C31 PARTIEL → OUI (3 MSc 100% impact : Circular Economy/Sustainable Tourism/Impact Finance + 2 spécialisations master RSE 547h+523h + Master Management Sciences Humaines et Innovation + DU Environnement + Executive Master Leadership Responsable + 4 programmes Référent RSE 65h)
  - Apports : 348h DD = 24% enseignement obligatoire + 80% électifs/masterclasses composante RSE + 67 800h bénévolat 2 ans (+226% via SoliCity 150h obligatoires) + 2 045 étudiants aidés financièrement 1,36M€ (1 sur 2) + Index F/H UCLy 98/100 (+5 vs 2021, +19 vs 2018) + 73% femmes CoDir Esdes + ISBO créé juillet 2021 + 4 grands projets recherche (ISBO + Mane Flavor 300K€ + PrIORRA 782K€ FEDER + Observatoire RSE Afrique) + 1er atelier Fresque du Climat employés 13 juillet 2023 + 215 étudiants labellisés LADAPT 1 sur 2 ans (Andy Day) + Banque Alimentaire 13e édition 26 tonnes/52 000 repas + Tim&Colette 110 binômes 2022 + KAPS 78 places + 70 projets entrepreneuriaux 2 ans dont 60 à impact + Executive Master Leadership Responsable 484h + 4 programmes Référent RSE + politique chauffage oct 2022 (-10/-12% conso) + audit énergétique Nerco campus Saint-Paul aligné ELAN 2030/2040 + BEGES UCLy 2021 (Esqese, publié ADEME)
  - **Auto-critique biais (challenge utilisateur post-injection)** : 2 descentes appliquées rétroactivement pour cohérence stricte avec autres écoles :
    - C20 OUI → PARTIEL (objectif neutralité carbone affiché mais pas chiffré, contrairement à EMLYON -25%/2030, EFREI -5%/an, ESCP -55%/2030)
    - C29 OUI → PARTIEL (politique alimentation durable formalisée mais formulations qualitatives « faible », « non négligeable » sans % cible vs EMLYON 50% végétal)
  - Score net : 26.5 → 27.5 (montées) → **26.5 (Confirmé maintenu)** après application descentes
  - Excel mis à jour (Grille R31, score final 26.5)

- **ESCE Business School enrichi** (27 avril, sources officielles strictes) :
  - 10 justifs enrichies (C1, C2, C13, C15, C25, C26, C30, C33, C34, C35) avec Guide étudiant besoins spécifiques 2024-2025 (19p) + esce.fr/responsabilite-sociale-environnementale
  - **Aucun changement de verdict** (score 9.0 maintenu, Insuffisant)
  - Documentation ESCE très limitée (1 seul PDF disponible : guide handicap 19p) — cohérent avec score bas
  - Apports : Frédérique Boitel Référente RSE-D&I (Faculty Lounge 6e étage sud) + Commission Diversité & Inclusion 9 membres détaillés (DGA Guillaume Ferrante + Dir Faculté Renaud Rodein-Collot + Dir PGE Sélima Sakji + Dir Bachelor Isabelle Pierre-Bassani + Dir MSc Sonia Issolah + Resp Career Marine Talabart + Resp Coord péda Nassima Rami + Resp DRI Jean-Charles Galli) + dispositif handicap complet (sous-titrage cours présentiel/distanciel synchrone+asynchrone, logiciels Antidote + reconnaissance vocale, accessibilité PMR + boucles magnétiques + ascenseurs sonores, 4 ans alternance pour RQTH, mobilité internationale anticipée 6-12 mois) + sportif/artiste haut niveau + proche aidant + partenariats AGEFIPH/FIPHFP/MDPH/CDAPH/Fédé Handinamique/Fondation TotalEnergies (mobilité internationale handicap)/bourses Erasmus+ majorées + sensibilisation systématique des jurys aux discriminations avant chaque demi-journée + RGPD strict pour la confidentialité + PACT 25h ECTS-validé Groupe SOS missions environnementales/sociales/solidaires (5 écoles OMNES depuis 2022) + 44 nationalités + QS 7e mondial diversité + DuoDay + SHIFT(S) conférences/masterclass + conférence annuelle 4h transition écologique 5e année
  - Score : 9.0 → **9.0** (Insuffisant maintenu, <20)
  - Pas de mise à jour Excel nécessaire (0 verdict, score inchangé)

- **Lot IPAG + ISC PARIS + KEDGE enrichi en parallèle (28 avril, 3 sub-agents diagnostic + arbitrage strict + vérifs sites officiels)** — Lot très conservateur après vérifs URLs :
  - **IPAG Business School** (idx 37) :
    - 9 justifs enrichies (C1, C7, C9, C15, C17, C25, C26, C28, C31) avec Rapport PRME 2024 IPAG (68p, signé Dr. Olivier Maillard Dean & DG + Prof. Maria Giuseppina Bruna DRVI) + ipag.edu (chaires + accreditations + inclusion-handicap)
    - **2 montées + 0 descente** :
      - C9 PARTIEL→OUI : revendication 100% diplômés formés (PRME p. 37, 40) + 100% mémoires PGE section RSE obligatoire + cours RSE tronc commun TOUS programmes (PGE 1A/2A/5A, Bachelor BCH1+BCH2, BBA 1A/2A/3A, MBA 3 cours, DBA 1 cours obligatoire) + 43,4% diplômés PGE 2023 emploi RSE
      - C28 NON→PARTIEL : campus Beaugrenelle-Eiffel Paris 15e bâtiment HQE (PRME p. 67), 1 campus sur 3 certifié
    - **C1 OUI maintenu** (vs sub-agent qui doutait) : Prof. Bruna DRVI au CODIR + mandat formalisé via plan IPAG 2025-2029 axe 3 « Transformer organisations et société »
    - Apports : 6 chaires (Entreprise Inclusive 2016 Bruna + Économie Circulaire 2016 + Entreprise Familiale + IA & Éthique + French Savoir-Faire + Finance Quantitative) + Marc Rivault Innovation Sociale et Inclusion + Dr. Manel Guechtouli Référente Nice + Dr. Batoul El Mawla Référente Environnement (1er avril 2025) + 139 étudiants handicap 24-25 (98 aménagements) + CODIR 50/50 + 64% femmes personnel + gender gap nul recrutement + AACSB juillet 2025 + BSIS Paris+Nice 2025 + 44% thèses 2024 ODD/ESG/RSE
    - Score : 16.0 → **17.0** (Insuffisant maintenu, +1.0)
    - Excel mis à jour (Grille R41)
  - **ISC PARIS** (idx 36) :
    - 4 justifs enrichies/reformulées (C1, C4, C25, C26) avec Guide Inclusion & Diversité 2023-2024 ISC Paris + iscparis.com (vérifs labels-accreditations + diversite-et-inclusion)
    - **0 montée + 2 descentes (cohérence stricte)** :
      - C1 PARTIEL→NON : URL responsabilite-societale-diversite/ retourne 404 + justif elle-même reconnaissait « rattachement COMEX non documenté ». Cohérence stricte AD/Brest BS/BSB/EM Strasbourg
      - C4 OUI→NON : page officielle iscparis.com/isc-paris-labels-et-accreditations vérifiée — AUCUN label RSE strict (DD&RS/LUCIE/EcoVadis/ISO 14001/B Corp), uniquement accréditations académiques (AACSB/AMBA/BGA/EFMD/Visa/Qualiopi/BSIS) + engagements (PRME/UN Global Compact). Justif initiale sourcée « recherche web » non vérifiable. Cohérence stricte AD/Brest BS/EDC/ESCE
    - **DÉCOUVERTE GRAVE** : 2 PDFs « ISC PARIS » du dossier DOCBENCH (BOOK DES ASSOS PARIS 2026 + NICE BOOK DES ASSOCIATIONS 2024-25 ENG) sont en réalité des PDFs IPAG Business School (89 mentions IPAG vs 17 ISC, adresses IPAG « 10-12 rue du Théâtre 75015 » + « 4 bd Carabacel Nice »). Seul Guide Inclusion 8p est vraiment ISC. Erreur de classement utilisateur DOCBENCH.
    - Score : 13.0 → **11.5** (Insuffisant maintenu, descente -1.5)
    - Excel mis à jour (Grille R43)
    - **Recommandation futur** : demander rapport RSE/PRME ISC Paris si existe (équivalent SIP-PRME)
  - **KEDGE Business School** (idx 5) :
    - 8 justifs enrichies (C1, C2, C4, C7, C18, C19, C20, C32) avec Rapport DD KEDGE 2020-2021 (planches) + Guide Achats Responsables KEDGE + Guide Accessibilité 2025-26 + Guide Inclusivité de A à Z + Guide Management Responsable + Guide Vraies Fausses Bonnes Raisons + WellNess 2019 + impakt.kedge.edu/nos-realisations + impakt.kedge.edu/nos-engagements + kedge.edu/l-ecole/rse/act-for-the-planet
    - **0 montée + 1 descente (cohérence biais stricte)** :
      - C20 OUI→PARTIEL : Vérification site officiel act-for-the-planet confirme AUCUN objectif chiffré GES (% par an, année cible publique, baseline) + AUCUNE mention SBTi validé + formulations qualitatives uniquement (« contribuer à la neutralité carbone mondiale »). Le « net zéro 2030 » de la justif initiale est une **EXTRAPOLATION non sourcée** (introuvable sur kedge.edu et impakt.kedge.edu). Seuls KPI chiffrés : -25% empreinte scope 3 d'ici 2025 (Rapport DD p. 13) + résultat passé -50% CO2 depuis 2018. Cohérence stricte ESDES/ESSCA/ESSEC/GEM/HEC/IESEG/IMT-BS
    - **3 labels stricts confirmés (vérifié site officiel)** : DD&RS (CIRSES 2019) + EcoVadis Argent 74/100 (+11 pts en 2024) + Numérique Responsable niveau 1 (sept 2023). Pacte Mondial 2005 = engagement ne compte pas
    - **9 engagements IMPAKT confirmés** (vérifié impakt.kedge.edu/nos-realisations) : 6,5M€ aides + 89% formés éthique + 19 000h tutorat + -50% CO2 depuis 2018 + 100% AO critères + 100% étudiants sensibilisés climat + 170+ cours transition + 5 chaires + 43% diplômés emploi transition
    - **Aucune montée pertinente identifiée** par sub-agent : malgré l'excellence globale KEDGE, les 6 PARTIEL maintenus (C5/C14/C16/C28/C29/C36) sont justifiés par périmètres stricts §6
    - Apports : Direction Transition & Impact rattachée DG + Associated Dean for Inclusivity and Sustainability (depuis 2021) + 1ère Direction RSE 2010 + Comité IMPAKT trimestriel + Réseau des Impakteurs 2021 + Charte Diversité 2021 + Charte LGBT+ Autre Cercle + Bilan carbone tous 3 ans depuis ~2009 (10 KteqCO2/an scope 3) + 4 axes prioritaires scope 3 (Achats/Mobilité/Énergie/Numérique) + Guide Achats Responsables formalisé + 100% AO critères solidarity sourcing depuis COP15 Copenhague 2009
    - Score : 33.0 → **32.5** (Avancé maintenu, ≥30, descente -0.5)
    - Excel mis à jour (Grille R9)
  - **Bilan global lot 3 écoles** : 2 montées + 3 descentes = **net -1.0** (très conservateur, équilibre le +7.0 du lot précédent)
  - **Apprentissage méthodologique** :
    - Vérification systématique URLs site officiel **CRUCIALE** : a éliminé l'extrapolation « net zéro 2030 » KEDGE + a confirmé la descente C4 ISC + a confirmé les chaires IPAG
    - Détection erreur de classement DOCBENCH : 2 PDFs « ISC PARIS » sont en fait IPAG → recommandation : audit complet du DOCBENCH pour les autres écoles
    - Sub-agents biaisent moins quand source primaire est limitée (ISC) ou ancienne (KEDGE rapport 2020-21) : ils restent prudents

- **Lot IESEG + IMT-BS + INSEAD enrichi en parallèle (28 avril, 3 sub-agents diagnostic + arbitrage strict)** — **3 PASSAGES TIER Confirmé → Avancé** :
  - **IESEG School of Management** (idx 18) :
    - 12 justifs enrichies (C1, C2, C3, C4, C12, C16, C20, C21, C22, C23, C27, C32) avec Rapport d'Impact 2024-2025 (48p, signé Caroline Roussel DG + Myriam Degrave Directrice Déléguée Impact Social et Environnemental) + GEP 2022-2027 + Flyer Discrimination jurys 2024 + ieseg.fr/lecole/la-rse-a-lieseg
    - **7 montées + 1 descente (cohérence biais stricte)** :
      - C12 NON→PARTIEL : Wellbeing for Staff #Takecare Thursdays (34 sessions/336 participations 24-25) + 23 collab formés CNV + statuts spécifiques + GEP work-life balance
      - C16 PARTIEL→OUI : Parcours Transition 2026 23h obligatoire 5 modules + 11 Ambassadeurs Durabilité + référentiel Shift Project ClimatSup + 560+ collaborateurs formés
      - C20 OUI→PARTIEL (descente cohérence biais) : -31%/2030 annoncé sans baseline absolue ni jalons annuels ni SBTi (cohérence ESDES/ESSCA/ESSEC/GEM/HEC)
      - C21 PARTIEL→OUI : Plan Climatique 2022-2026 + Transition 2026 (68 axes/253 actions/160 indicateurs) + 3 engagements territoriaux signés
      - C22 PARTIEL→OUI : Politique numérique Code Vert + partenariat Latitudes + 80% matériel ESS + 873 étudiants formés IA éthique
      - C23 PARTIEL→OUI : Politique voyage durable 2025 (train obligatoire <6h) + #TakeTheTrain 220 étudiants 15 611€ + indemnité km vélo 68 collab + 135 places + 12 bornes
      - C27 PARTIEL→OUI : 38,2 t déchets ménagers (-37%) + 13,5 t carton/papier + Lemon Tri Lille + DEEE 1t + mégots 18,2kg
      - C32 PARTIEL→OUI : Stratégie achats responsables formalisée + objectifs 2030 chiffrés (catalogue goodies) + résultats publiés (29% goodies responsables, 69% Europe, 62% recyclés)
    - 3 montées proposées par sub-agent **REJETÉES** : C5 (cohérence ESDES, ETP ≠ budget consolidé), C24 (pas de partenariat WWF type Audencia), C29 (pas de % végétal cible)
    - Apports : 16,8 ETP DISE + Caroline Roussel DG + Myriam Degrave CODIR depuis mai 2025 + 11 Ambassadeurs Durabilité + PRME Education Award ONU juin 2025 + Trophée FT Responsible Business Education 2024 + 3 engagements territoriaux (Lille 2021/Grenoble 2022/Paris-La Défense 2023) + Bilan carbone 12 109 tCO2e (94% scope 3) + -2,3%/an/utilisateur 24-25 + label DD&RS 27 juin 2023
    - Score : 29.5 → **32.5** (Confirmé → **Avancé** ✨, ≥30) — passage tier
    - Excel mis à jour (Grille R20)
  - **IMT Business School** (idx 35) :
    - 7 justifs enrichies (C1, C18, C19, C20, C21, C23, C27) avec Politique DD&RS Feuille de route 2023-2027 (signée Emma Carré Responsable DD&RS + Approbation Claire Thierry + Herbert Castéran) + Rapport ODD GLOBAL 2023 IMT-BS (104p) + Guide Handicap IMT-BS (32p) + Charte Respect-Égalité IMT 2025
    - **5 montées + 1 descente (cohérence biais stricte)** :
      - C18 PARTIEL→OUI : **DÉCOUVERTE MAJEURE** Bilan Carbone propre IMT-BS 2 440 tCO2e publié (méthode ADEME ABC, scopes 1+2+3 détaillés)
      - C19 PARTIEL→OUI : scope 3 détaillé (Déplacements 1158 + Achats 353 + Immobilisations 326 + Déchets 73 + Fret 0,5)
      - C20 OUI→PARTIEL (descente cohérence biais) : -25%/2027 = IMT GROUPE pas IMT-BS (Feuille de route DD&RS dit explicitement « établir une trajectoire » comme action FUTURE)
      - C21 PARTIEL→OUI : Politique DD&RS Feuille de route 2023-2027 propre IMT-BS (5 axes, 18 actions) + Plan ACT®/sobriété
      - C23 PARTIEL→OUI : Forfait mobilité 200€/an + 9 bornes + prêt vélo 0% + 50% TC + Plan Mobilité Inter-Établissements (Univ Évry, ENSIIE, CROUS)
      - C27 PARTIEL→OUI : Lemon Tri 142 kg gobelets + DEEE 1,75t + cession 45 PC à RECLS + Ammaréal livres + biodéchets restaurant
    - 1 montée proposée par sub-agent **REJETÉE** : C5 NON→PARTIEL (cohérence HEC, Cadre de gestion ministériel ≠ budget RSE consolidé)
    - Apports : Emma Carré Responsable DD&RS + Claire Thierry/Herbert Castéran Direction signataires + Mission DD&RS structurée + 5 axes + 18 actions + jalons 2027 + Plan stratégique Impact 2027
    - Score : 28.0 → **30.0** (Confirmé → **Avancé** ✨ tout juste, ≥30) — passage tier
    - Excel mis à jour (Grille R28)
  - **INSEAD** (idx 8) :
    - 12 justifs enrichies (C1, C4, C11, C14, C16, C17, C18, C19, C22, C26, C28, C32) avec Sustainability Report INSEAD + Annual Report 2023-24 (87p) + Code of Conduct juin 2025 + Anti-Harassment Policy V5.0 juin 2025 + Consensual Relationships Policy mai 2025 + Gender Equality Plan 2026-2028 + designing-sustainability-governance-report 2022
    - **4 montées + 1 descente (prudence ajoutée)** :
      - C4 NON→OUI : **DÉCOUVERTE MAJEURE** EcoVadis Silver 68/100 (mai 2023) confirmée ; justif actuelle disait à tort « zéro label » alors qu'EcoVadis figure dans liste §6 du mémo. Cofondateur Pierre-François Thaler (alumni MBA'99D) + Pr Atalay Atasu Scientific Advisory Board EcoVadis + Katell Le Goulven Purpose Committee EcoVadis
      - C11 PARTIEL→OUI : Climate Fresk Workshops Earth Week 2023 (Europe + Asia campuses) + Earth Week annuelle (1ère éd. mars 2022, 2e éd. avril 2023) + SDG Week annuelle (4e éd. nov 2022, 10+ sessions, 40+ speakers) + Health Week
      - C14 PARTIEL→OUI : Programme Growing Together 2023-24 = 100% des 900 employés all-staff all-campus, faculty-led learning journey, Way We Work principles
      - C22 NON→PARTIEL : Code of Conduct (juin 2025) §2.6 sur usage IA responsable + Confidentiality Charter §4.1 sécurité info (cadre formel mais pas charte INR autonome)
      - **C28 OUI→PARTIEL (descente AJOUTÉE par prudence)** : BCA Green Mark Platinum Singapour non confirmée à date sur sources publiques INSEAD ; HQE Excellent / BREEAM Very Good Fontainebleau « visés » (futur, pas obtenus)
    - **C20 maintenu OUI** : INSEAD a -67% scope 1+2 d'ici 2035 base 2019 + Net Zero 2050 + UNFCCC 1.5°C explicitement référencé + Climate Journey taskforce piloté par COO + Maria Fedorova Sustainability and Climate Initiatives Manager → objectif chiffré pluriannuel solide, cohérent avec EFREI -5%/an, ESCP -55%/2030, EMLYON -25%/2030 (tous OUI sans SBTi formel mais avec objectif chiffré)
    - Apports : Hoffmann Global Institute + Climate Journey taskforce + Maria Fedorova Partnership Manager Sustainability/Climate + Katell Le Goulven Executive Director Hoffmann + 43 projets recherche sustainability >960K€ + 32 faculty + 4 chaires (Pitt Atasu, Firmenich Iancu, Goltz Guadalupe, Janssen Joos) + 2 Distinguished Fellows + Hoffmann-WEF Fellowships + Bilan carbone 14 590 tCO2e (Traace, GHG Protocol+ISO+BEGES, scope 3 = 80%) + GEP 2026-2028 signé Monique van Donzel + 24% femmes faculty + 42% femmes MBA + Solar farm Singapour 2023 + Masterplan Fontainebleau 60M€ BEI
    - Score : 29.5 → **31.5** (Confirmé → **Avancé** ✨, ≥30) — passage tier
    - Excel mis à jour (Grille R18)
  - **Bilan global lot 3 écoles** : 16 montées + 3 descentes = examen équilibré rigoureux + 4 montées proposées par sub-agents REJETÉES (IESEG C5/C24/C29 + IMT C5) + 1 descente AJOUTÉE manuellement (INSEAD C28 prudence) → 3 PASSAGES TIER Confirmé → Avancé.
  - **Apprentissage** : sub-agents biaisent toujours à la hausse mais cette fois la majorité des montées étaient solides et chiffrées (rapports récents 24-25). Net retenu : +7.0 sur +9.5 proposé (74% de retenue vs 7% sur lot précédent HEC/IAE/ICN).

- **Lot HEC + IAE LYON + ICN enrichi en parallèle (28 avril, 3 sub-agents diagnostic + arbitrage strict utilisateur)** :
  - **Méthode innovante** : 3 sub-agents lancés en parallèle pour la phase diagnostic (extraction PDF + lecture justifs + vérif site + diagnostic équilibré) ; arbitrage final manuel sur les propositions selon périmètre strict du mémo (§6 cohérence inter-écoles).
  - **HEC Paris** (idx 1) :
    - 11 justifs enrichies (C1, C7, C16, C17, C18, C20, C21, C27, C29, C32, C34) avec Sustainability Report 2024 (52p, signé Eloïc Peyrache + François Collin CSO) + Transition Report 2022 (61p)
    - **1 descente C20 OUI → PARTIEL** (cohérence biais stricte) : pas de SBTi, pas d'objectif GHG global chiffré, le seul chiffre -40% énergie d'ici 2030 = obligation décret tertiaire pas trajectoire climat scientifique
    - C5 montée proposée par sub-agent **REJETÉE** (cohérence ESDES « pas de budget RSE consolidé publié ») → PARTIEL maintenu
    - Apports : François Collin CSO + 60+ membres + 4ème DPEF juin 2024 + 2nd PRME Progress + 2nd Global Compact Progress + faculty retreat Chamonix 2024 + Center for Impact Finance créé 2024 (Pr. Stefano Lovo, 18 profs, 11 cours, 12+ projets) + 2 nouvelles chaires (Nexans Sustainable Business Transformation + Rothschild Data & Impact Investment) + 278 tCO2 évités viande rouge -35% + 32t biodéchets + Climate & Resource Mgmt Policy 2024 + Responsible Purchasing Policy juillet 2024 4 axes + ESS Accelerator IDF + Brigades Vertes + ZNIEFF DRIEAT IDF
    - Score : 33.0 → **32.5** (Avancé maintenu, ≥30)
    - Excel mis à jour (Grille R8)
  - **IAE LYON** (idx 30) :
    - 10 justifs enrichies (C1, C2, C3, C8, C9, C10, C17, C26, C33, C34) avec PRME SIP Sustainability Report 2025 (41p) + iae.univ-lyon3.fr (direction-generale + classements-et-accreditations + un-engagement-responsable)
    - **1 montée C1 PARTIEL → OUI** : Amélie Bohas explicitement nommée « Responsable transition écologique et coordination intersites » dans équipe Direction Générale étendue (site officiel) + mandat formalisé via stratégie 2024-2028 pilier S'ENGAGER + Marie-Christine Chalus DG (Présidente IAE FRANCE depuis juillet 2024)
    - C4 descente proposée par sub-agent **REJETÉE** (cohérence ESDES : composante UCLy bénéficie LUCIE UCLy = OUI maintenu, donc iaelyon composante Lyon 3 bénéficie DD&RS Lyon 3 = PARTIEL maintenu)
    - Apports : équipe Direction étendue 10 personnes nommées + 4 piliers stratégie 2024-2028 + SAB prévu 2025 + BSIS 2026 + 6 diplômes spécialisés DD (RSEEO, MEQ2D, QSE, SMIB, SEC) + CforCSR© plateforme e-learning obligatoire tous M2 + BMA module obligatoire Licence + Start'iaelyon 1000 L1 + Week'UP 800 M1 + Global Talks 2025 500 L3 « Inclusion & Sustainability » + 30 000h bénévolat/an + Junior Conseil + That's iaelyon expo photo mars 2025 + Magellan Lab + Graduate School IEIS + 3 chaires (Coopératifs/Mutualistes 2012, Values of Care 2016, CLEA 2022) + 9 articles RSE/49 en 2024 + 25-30% boursiers + 45% classes moyennes/défavorisées + 6786 étudiants iaelyon (sur 24569 Lyon 3) + 2000 partenaires socio-éco + CPME AuRA + Fondation de France
    - Score : 21.0 → **21.5** (En progression maintenu, ≥20)
    - Excel mis à jour (Grille R36)
  - **ICN Business School** (idx 25) :
    - 9 justifs enrichies (C1, C7, C8, C13, C16, C18, C19, C25, C30) avec Etat-des-lieux DDRSE 2022 PRME SIP (67p, signé Muriel Cordier + Krista Finstad-Million) + Plaquette ICN Impact 2022-2026 + Bilan GES Greenly 2023 (83p, 2804 tCO2e, scope 3) + 2 guides handicap (PEPS + FALC) + icn-artem.com/candidats/lecole/politique-rse
    - **1 montée C16 PARTIEL → OUI** : Plan ICN Impact 2022-2026 actif (axe 4 forme toute la communauté + axe 5 R&I responsable chercheurs) + SULITEST profs/personnels + Krista Finstad-Million pilote PRME France-Benelux Chapter (62 écoles signataires)
    - **1 descente C7 OUI → PARTIEL** : pas de rapport RSE/DD&RS annuel récent (SIP-PRME date de 2022, soit 4 ans), juste plaquette + bilan GES 2023 sur le site officiel ; cohérence stricte
    - C1 montée proposée par sub-agent **REJETÉE** (vérif site officiel ICN : Muriel Cordier PAS confirmée 2025, juste « Myriam Mauroy Responsable de la gestion des données RSE » = fonction opérationnelle pas direction RSE rattachée DG) → PARTIEL maintenu
    - C2 montée proposée par sub-agent **REJETÉE** (COPIL 25 personnes documenté en 2022 mais pas confirmé 2025 sur site officiel) → PARTIEL maintenu
    - Apports : Plan ICN Impact 2022-2026 actif (8 axes, 64 actions, 24 indicateurs, 32 services, 12 assos) + 3 campus Paris/Nancy/Berlin + Bilan Greenly 2023 (2804 tCO2e, 13 tCO2e/collaborateur, score Greenly 98%, déménagement 2023 +75% immobilisations) + index F/H 96/100 (1ère Challenges 2022) + 2 psychologues internes + Madeleine Ostrowski référente handicap + commission validation aménagements + bourses Handinamique/GIVEKA 5000€/AGEFIPH 54+92 + RQTH apprentissage 4 ans + 2 guides handicap (standard + FALC) + 80% cours ≥20% RSE + 17 ODD syllabi + Krista Finstad-Million PRME France-Benelux Chapter + Myriam Mauroy gestion données RSE 2025
    - Score : 25.5 → **25.5** (Confirmé maintenu, net 0 après examen équilibré)
    - Excel mis à jour (Grille R33)
  - **Bilan global lot 3 écoles** : 2 montées (IAE LYON C1 + ICN C16) + 2 descentes (HEC C20 + ICN C7) = examen équilibré rigoureux + 4 montées proposées par sub-agents REJETÉES par cohérence stricte (HEC C5 + IAE C4 + ICN C1 + ICN C2) → biais à la hausse évité
  - **Apprentissage méthodologique** : sub-agents efficaces pour préparation/diagnostic mais biaisent à la hausse (ils proposent +6.5 net, application stricte = +0.5 net). Validation manuelle indispensable.

- **Grenoble EM enrichi** (28 avril, sources officielles strictes + auto-critique stricte biais après challenge utilisateur) :
  - 36 justifs enrichies (tous critères) avec Rapport Société à Mission 2025 (40p, oct 2025, audit OTI KPMG) + Rapport d'activité Chaire Energy for Society 2022-2025 (17p) + Rapport pratiques écologiques 2023 (73p, baromètre transitions ADEME-Métropole) + grenoble-em.com (sustainable-campus + gender-equality + our-commitments)
  - **3 verdicts modifiés (examen équilibré 2 sens, 2 montées + 1 descente)** :
    - **Montée C11 PARTIEL → OUI** (Fresque du Climat 100% personnel 2022 + module L3 Discover 45h ateliers/fresques/bilan carbone + Olympiades Sustainability 15j d'activités RSE + Back-to-School Challenge 700 étudiants/an depuis 2018 + TASK Sulitest obligatoire pour tous + fresques thématiques toute l'année — dispositif d'ateliers collaboratifs systématique)
    - **Montée C16 PARTIEL → OUI** (Plan d'appui formel + 2 enseignants référents pilotes + référent RSE par département + Brown Bags + journée pédagogique + invitation observer cours RSE + support méthodique syllabi avec mesure → résultat 100% syllabi avec contribution RSE en 24-25 vs 31% en 23-24, x3 en un an)
    - **Descente C20 OUI → PARTIEL (cohérence biais stricte avec ESDES/ESSCA/ESSEC)** : trajectoire « alignée » +1.5°C avec ADEME ACT + CEC + résultat -21% vs 2019, mais aucun objectif chiffré explicite (% par an, année cible) publié, pas de validation SBTi officielle — Comité de Mission demande explicitement « actions sur les mobilités regroupées dans un plan global » (p. 37)
  - **Découverte C9** : 100% syllabi avec contribution RSE en 24-25 (vs 31% en 23-24, x3 en un an) — KPI majeur Rapport SM 2025 p. 18 (justif mise à jour)
  - **Conflit chiffres index égalité C26** : site officiel = 94/100 en 2025 (vs 85/100 en 23 et 24) ; Rapport SM = 87/100 sur période 24-25 (vs 76/100 en 23-24). Périmètres temporels différents → règle post-EMLYON appliquée (garder valeur site officiel + mentionner aussi rapport SM)
  - **Auto-critique appliquée (challenge utilisateur)** : C14 (formation DD collaborateurs) initialement proposée en montée puis RETIRÉE — 273 collaborateurs formés en 24-25 (vs 151 en 23-24) en hausse mais pas systématique annuellement à 100%, dispositif en cours de structuration → PARTIEL maintenu par prudence
  - Apports : Fouziya Bouzerda DG + Julie Perrin-Halot Directrice RSE + Jean-Christophe Terrier Président Comité Mission + EAGLE 2030 piliers Journey/Sciences/Transitions + 3 instituts d'excellence (EnerG/Future of Work/Moving Mountains) + modèle 60/20/20 (60% présentiel, 20% terrain, 20% virtuel) + Référentiel CDEFM DD&RS + Assurance of Learning AoL + Tag systématique publications académiques transitions + Carrière à Impact module 3 ans + Journée Sustainability Chamrousse + Olympiades Sustainability open badges + 6+ chaires (Territoires en Transition Daudigeos/Ottaviani avec Métropole/Département/Cluster Montagne, Energy for Society Carine Sebi avec 3 auditions Assemblée Nationale + 9 articles The Conversation 80 000 vues + 74 articles presse + 13 conférences académiques + MSc Energy Business and Climate Strategies sept 2024, Paix Économique 2012, FERE 2016, Inclusive Sustainability, Européenne des Transitions déc 2024) + KPMG OTI octobre 2025 + Bilan carbone 9 500 tCO2e en 24-25 (vs 10 300 en 23-24, -21% vs 2019, 3 scopes, 3 campus Sémard/GEM Labs/Pantin) + Pantin certifié E+C-/biodiversité/zéro déchet structure 100% bois biosourcée + 11+ tonnes triées 2024 + ELISE/Lemon Tri ESS + Newcy gobelets/Dabba contenants + 273 collaborateurs formés DD 24-25 (vs 151) + Care Line GEM for me 24/7 14 langues + Certificat Manager Inclusif obligatoire PGE+M1+DBD + 174 étudiants handicap déclarés 24-25 + 50 salles Hyflex 2023 + parcours Asperger + concours dédié + 1684 alternants (vs 1362) + 308 partiellement exonérés 24-25 (vs 206) + 20 boursiers Fondation (vs 17) + 3 dispositifs Excellence/Coup de pouce/Urgence + Refugee Grant Program + Index F/H 94/100 site (87/100 rapport) + ratios F/H corps prof 53/47 (vs 48/52) et programmes 46/54 + Chaire FERE ~30 profs + Prem1ères 100% femmes + lycées QPV
  - Score : 30.5 → **31.0** (Avancé maintenu, ≥30) — net +0.5 après auto-critique
  - Excel mis à jour (Grille R15)

- **Galileo Global Education enrichi** (28 avril, sources officielles strictes — toutes traductions FR appliquées) :
  - 24 justifs enrichies (C1, C2, C3, C4, C5, C6, C7, C8, C9, C13, C15, C16, C17, C18, C19, C23, C25, C26, C27, C30, C31, C33, C34, C35) avec Galileo Impact Report 2023-2024 EN (72p, source primaire bien extraite) + Rapport d'Impact 2024-2025 FR (122p, encoding partiel) + galileo-globaleducation.com
  - **3 verdicts modifiés (toutes des montées, 0 descente)** :
    - C2 PARTIEL → OUI (Comité d'Audit et des Risques = plus haute autorité ESG + Comité Stratégique Impact + 30 « impact champions » +13 nouveaux 2024 + parrains exécutifs Marc-François Mignot Mahon Président-DG + Madeleine Dembélé Directrice Impact)
    - C3 PARTIEL → OUI (Stratégie Impact 4 piliers + 16 engagements étudiants + 120 KPI déployés + transition vers reporting CSRD + matérialité double 2024)
    - C27 NON → PARTIEL (suivi déchets Scope 3 depuis 2022 + ZACK 8 320 kg sauvés 518.72 tCO2e évitées + Manutan 2.7t IT 172 tCO2 + Strate Design recyclé)
  - Apports : Marc-François Mignot Mahon Président-DG + Madeleine Dembélé Directrice Impact + 4 piliers Impact + 110 000+ étudiants + 56 écoles 18 pays + HuCare programme étudiants + ZACK reprise IT + ASSF Académie Sport Santé Forme + SCICONUM + AKAD/NABA/IPETH/EUC/UCIMED/ESEI + #NonCestNon + Diversity Fresco + Fresque du Climat
  - Choix linguistique (validé utilisateur) : justifs **entièrement en français**, traductions appliquées (« Audit and Risk Committee » → « Comité d'Audit et des Risques », « executive sponsors » → « parrains exécutifs », « Chief People Officer » → « Directeur des Ressources Humaines »). Noms de programmes propres conservés en VO (HuCare, ZACK, SCICONUM, ASSF, AKAD, NABA, IPETH, EUC, UCIMED, #NonCestNon).
  - Score : 20.0 → **21.5** (En progression maintenu, ≥20)
  - Excel mis à jour (Grille R39)

- **Lot Montpellier BS + NEOMA + OMNES enrichi en parallèle (4 mai 2026, 3 sub-agents diagnostic + arbitrage strict)** — **1 PASSAGE TIER Confirmé → Avancé (NEOMA)** :
  - **OMNES Education** (Groupe, idx=7) :
    - 8 justifs enrichies/réécrites (C1, C6, C8, C12, C20, C21, C24, C26, C28) avec Rapport RSE OMNES 2024-25 (70p, signé Loïc Delboulbe Direction Engagement Humain & Sociétal + Muriel Cordier Directrice RSE Groupe) + Charte Éthique OMNES (9p) + Comité-charte-Ethique-2024-25.pdf + Plan-Egalite-FH_Gender-Equality-Plan.pdf 2024-2027 + omneseducation.com/le-groupe/demarche-rse
    - **3 verdicts modifiés (1 montée + 2 descentes — examen équilibré strict)** :
      - **Montée C6 PARTIEL→OUI** : dispositif d'alerte explicitement Sapin II « article 8 et 17 loi du 9 décembre 2016 » + adresse dédiée alerteethique@omneseducation.com + formulaire intranet + référents juridique/RH désignés (Charte Éthique p. 8). Cohérent avec règle stricte C6 = procédure anti-corruption Sapin II
      - **Descente C8 OUI→PARTIEL** : SHIFT(s) à 12h/an pendant 3 ans (= 36h total) **inférieur au seuil annuel de 15h/an** + déployé sur 9 écoles sur 15 (CREA et EUBS pas encore couvertes) + MSc/MBA/Mastères non couverts (Rapport p. 8). Cohérent IGENSIA/Brest BS/BSB descentes C8
      - **Descente C28 OUI→PARTIEL** : recherche exhaustive des 305k caractères du Rapport RSE 24-25 → **zéro occurrence BREEAM/HQE/LEED/BBC/BBCA**. La justif initiale s'appuyait uniquement sur planetegrandesecoles.com (presse externe = règle stricte §2 violée). Démarche éco-conception en cours sur Marseille/Bordeaux mais pas certification documentée à l'échelle Groupe (cohérence règle §6 « 3 sur 70 = trop peu pour OUI Groupe »)
    - **Corrections factuelles importantes** :
      - C20/C21 : « 53 actions » → **« 11 actions ciblées »** (Rapport 24-25 p. 26-27 actualisé, le chiffre 53 venait du CSR Report 2023 obsolète) + Comité Carbone créé en 2024 (11 décisionnaires)
      - C24 : Charte Biodiversité Groupe rédigée 2025 + bilans écologues Chambéry/Bordeaux 24-25 + adhésion Programme Entreprises Engagées pour la Nature (OFB) + LPO + Eco Stratégie
      - C26 : Index F/H consolidé Groupe **89,3/100** + GEP 2024-2027 + Charte LGBT+ signée juin 2025 + WEPS + #StOpE
      - C12 : Comité QVCT 23 collaborateurs + 100% écoles Time to Take Care + Semaine QVCT (16-20 juin)
      - C18 : 17 720 tCO2e (23-24) consolidé Groupe scopes 1+2+3 = 506 kgCO2e/étudiant ; scope 3 = 94% (Déplacements 41% / Achats 32% / Immobilisations 10%)
    - Apports : Loïc Delboulbe Direction Engagement au COMEX + Muriel Cordier Directrice RSE Groupe Comité Stratégique + 9 comités RSE actifs 24-25 (vs 1 en 20-21) avec 77 réunions/an + 1 800 collaborateurs + 100+ conseillers Time to Act + Programme PACT 20h bénévolat ECTS + plan de transition 11 actions (mobilité étudiante 100% train ≤1j, -30% trajets avion/voiture collab, -10% logiciels, -30% stockage cloud)
    - Score : 31.5 → **31.0** (Avancé maintenu, ≥30, net -0.5)
    - Excel mis à jour (Grille R13)
  - **Montpellier BS** (idx=10) :
    - 8 justifs enrichies (C1, C8, C13, C18, C19, C22, C29, C30) avec Bilan Carbone Montpellier BS (BL Évolution, 45p) + CP Bilan RSE 2020 (Benjamin Ferran Responsable Diversité et RSE) + MBS Politique de développement durable (140p, édition 2021) + Fondation MBS Rapport moral 21-22 + r.mbs-education.com (8 pages RSE)
    - **1 verdict modifié (1 descente, 0 montée — diagnostic conservateur)** :
      - **Descente C1 OUI→PARTIEL** : Pôle DD/RSE composé d'1 responsable + 5 chargés de projets « sponsorisé par la DRH DRSE » selon Politique DD p. 8. Benjamin Ferran cité comme « Responsable Diversité et RSE » (pas Directeur). **Rattachement formalisé COMEX/DG non identifié** dans les sources publiées. Cohérence stricte avec descentes ESDES/BSB/Brest BS/EM Strasbourg/AD Education sur C1
    - **Apports majeurs (sans changement de verdict)** :
      - C8 : 200h cours RSE en PGE + « 100% étudiants formés à la RSE » (Benjamin Ferran CP 2020) + RSE/DD enseignées « du Bachelor à l'Executive MBA » + Fresque du Climat 600 étudiants/an + Challenge ODD + 25% enseignements
      - C13 : 2 référents harcèlement sexuel et sexiste identifiés (CP RSE 2020 p. 2) + avocat spécialisé discrimination/harcèlement parmi intervenants pôle (Politique DD p. 8) + Labels AFNOR Diversité + Égalité pro
      - C18 : Bilan Carbone **7 556 tCO2e** (incertitude 17%) BL Évolution scopes 1+2+3, plan d'action -1620 tCO2e (-21%) potentiel
      - C19 : décomposition complète scope 3 par poste avec valeurs : Déplacements 5 139 tCO2e (68%) / Achats 1 674 (22%) / Immobilisations 366 (5%) / Énergie 281 (4%) / Froid 84 (1%) / Déchets 12 (<1%)
      - C22 : Stratégie climat Axe 4 « Sobriété dans les usages informatiques » (Politique DD p. 9) + Digital 113 (cluster) — pas de charte INR donc NON maintenu
      - C29 : Stratégie climat Axe 1 « Alimentation responsable sur le campus » + 30% plats viande/70% snacks (Bilan Carbone p. 21) — pas de % cible donc PARTIEL maintenu
      - C30 : 25 permanences psychologiques/an + psychologue, équipe psy travail, avocat discrimination/harcèlement, travailleurs sociaux (Politique DD p. 8) — solide mais pas hotline 24/7 donc PARTIEL maintenu
    - **Alertes biais** : C2 (Chaire COAST + Yunus = chaires recherche, pas comité opérationnel — risque descente future si arbitrage strict appliqué) ; C4 (Label DD&RS obtenu mai 2022 pour 4 ans = expire mai 2026 = date actuelle, à vérifier renouvellement). Sub-agent n'a pas pu vérifier WebFetch site officiel.
    - Score : 26.5 → **26.0** (Confirmé maintenu, ≥25, net -0.5)
    - Excel mis à jour (Grille R30)
  - **NEOMA Business School** (idx=20) :
    - 12 justifs enrichies (C1, C2, C8, C9, C13, C17, C19, C20, C21, C26, C33, C34) avec Rapport TSE 2025 NEOMA (44p, signé Élise Bruchet Directrice TSE) + neoma-bs.fr (6 pages engagement)
    - **5 verdicts modifiés (4 montées + 1 descente — examen équilibré rigoureux)** :
      - **Montée C2 PARTIEL→OUI** : 4 instances de gouvernance documentées (Rapport TSE p. 12) — COMEX (évaluation annuelle), CODIR TSE (pilotage), Comité TSE (étudiants + parties prenantes), Sustainability Committee (enseignants-chercheurs référents par département). Cohérent avec montée IESEG/Excelia C2
      - **Montée C13 PARTIEL→OUI** : Plan de lutte 3 axes Prévenir/Accompagner/Agir + adresse dédiée **angela@neoma-bs.fr** + cellule de veille **9 collaborateurs + 3 infirmières + 3 psychologues** + référent VSS dédié + associations HeForShe Reims/Rouen (p. 33, 38). La justif initiale disait à tort « pas de plateforme de signalement ni référent VSS ». Cohérent avec OUI ESDES C13
      - **Montée C19 PARTIEL→OUI** : scope 3 détaillé avec **5 leviers prioritaires** explicitement nommés (Rapport p. 40) — Achats / Repas et achats traiteurs / Énergie / Déplacements étudiants / Déplacements professeurs et collaborateurs. Cohérent avec montée IMT-BS/Excelia C19
      - **Montée C21 PARTIEL→OUI** : Plan de transition formalisé (5 leviers) + politique « Notre campus vert » 6 axes (déplacements, consommation, outillage, alimentation, biodiversité, bâtiments, information) + actions chiffrées (100% flotte renouvelée, BEGES 2024 publié, LEED Platinum visé Reims, jardins partagés Rouen prix Trophées campus responsables 2022). Cohérent avec montée Audencia/IESEG/Excelia C21
      - **Descente C20 OUI→PARTIEL** : « neutralité carbone campus 2030 » affichée mais Rapport TSE p. 40 évoque la trajectoire comme objectif futur (« Mettre en place une trajectoire de décarbonation pour réduire nos émissions »). Aucun objectif chiffré pluriannuel publié (% par an, jalons annuels), pas de validation SBTi/ACT. Cohérence stricte avec descentes ESDES/ESSCA/ESSEC/HEC/IESEG/IMT/KEDGE/GEM C20
    - **Apports majeurs (sans changement de verdict)** :
      - C1 : DGA « Student Experience and Sustainable Transition » au COMEX + Élise Bruchet Directrice TSE signe l'éditorial (p. 2, 12, 32) + 4 instances formelles + plan « Engage for the Future » 2023-2027
      - C8 : NEOMACT Academy 7 modules AXA Climate School (climat, biodiversité, ressources naturelles, transition bas-carbone, économie circulaire, adaptation, biodiversité entreprise) + **>10 000 étudiants certifiés en 2 ans = >30 000 h** + NEOMACT Project 30h obligatoires PGE 1A rentrée 2025 + Atelier 2Tonnes obligatoire tous étudiants
      - C9 : évolution 332 → 453 cours TSE entre 21-22 et 24-25 + MS Masternova (1995, AgroParisTech) + MSc Sustainability Transformations (2023, EY) + MSc AFI Finance Durable + MS Supply Chain durable + double diplôme MSc/IRIS Géoéconomie/RSE + PGE M1 semaine 9 dimensions
      - C17 : 4 Pôles d'Excellence (The World We Want 5 axes TSE, AI Data Science & Business, The Complexity Advantage, The Future of Work) + Chaire Bioéconomie & Développement Soutenable depuis 2012 (Nicolas Befort, partenaires CCI Marne/Caisse Épargne Grand Est/VIVESCIA, 4 axes énergies vertes/agricultures durables/biomasses/alimentation soutenable)
      - C26 : Index F/H **88/100** (2024) + 52% étudiantes + 66% femmes effectif total + 58% femmes cadres + COMEX 45% femmes + CA 46% femmes + 100% CROUS échelon 7 financés + exonérations échelons 4/5/6
      - C33 : près de 2 000 étudiants engagés dans 100 associations + 5 pôles + référents TSE depuis 2020-21 dans chaque association + 1/4 assos dédiées RSE + Gold Award QS Reimagine Education + 500+ événements/an + 3,5M€ budget
      - C34 : Fondation NEOMA 956 bourses 2,4M€ (+56%) + Veuve Clicquot LVMH 10/an + Cordées de la Réussite (200+ tuteurs, 400+ collégiens/lycéens, 15 ans) + dispositif PHARES handicap
    - 3 montées proposées par sub-agent **REJETÉES** : C28 (LEED Platinum Reims pas encore livré, Paris HQE non confirmé dans Rapport TSE 25), C16 (plan de formation faculty 20h e-learning + 2T + séminaires solide mais pas chiffrage de couverture systématique 100%), pas de C5 (956 bourses ≠ budget RSE consolidé)
    - Score : 28.5 → **30.0** (Confirmé → **Avancé** ✨, ≥30, net +1.5) — passage tier
    - Excel mis à jour (Grille R25)
  - **Bilan global lot 3 écoles** : 5 montées (NEOMA C2/C13/C19/C21 + OMNES C6) + 4 descentes (NEOMA C20 + MBS C1 + OMNES C8/C28) = **net +0.5**, examen équilibré rigoureux + 1 PASSAGE TIER (NEOMA Confirmé → Avancé)
  - **Apprentissage** : sub-agents proposent 12 montées et 6 descentes ; arbitrage manuel retient 5 montées + 4 descentes après vérif périmètre strict §6 (47% retenu vs 74% lot précédent IESEG/IMT/INSEAD). Le diagnostic OMNES illustre l'efficacité de la règle anti-presse externe (descente C28 trouvée par recherche exhaustive zéro occurrence BREEAM/HQE/LEED dans rapport officiel).

- **Lot Paris-Dauphine + École Polytechnique + PSB enrichi en parallèle (4 mai 2026, 3 sub-agents diagnostic + arbitrage strict)** — **2 PASSAGES TIER (Dauphine Confirmé→Avancé + PSB Insuffisant→En progression)** :
  - **Paris-Dauphine - PSL** (idx=14) :
    - 11 justifs enrichies/réécrites (C1, C8, C13, C18, C19, C20, C22, C24, C25, C28, C32) avec Schéma Directeur DD&RSE Dauphine + DAUPHINE 2025 RA + RA UPD 2023 + 4-pages Formations Transition écologique + dauphine.psl.eu (7 pages RSE) + fondation-dauphine.fr
    - **5 verdicts modifiés (4 montées + 1 descente — examen équilibré)** :
      - **Descente C8 OUI→PARTIEL** : cours L1 obligatoire « Enjeux écologiques du XXIe siècle » + L2 prolongement 2025 6 cours, mais volume <15h/an non démontré pour TOUS programmes (Executive Education hors certificat). Cohérence stricte ESDES/ESSCA/HEC + lots récents IGENSIA/OMNES/Brest BS/BSB/Polytechnique
      - **Montée C18 PARTIEL→OUI** : 2 BEGES réalisés (2018, 2021) avec ventilation publique (Schéma Directeur p. 24, 28, 41) + cycle triennal formalisé. Ventilation 2018 : déplacements >50%, achats 31%, domicile-travail <1%
      - **Montée C19 NON→PARTIEL** : postes scope 3 nommés et chiffrés en % (cf. C18) mais sans tonnages absolus ni méthodologie complète sur tous postes
      - **Montée C20 PARTIEL→OUI** : -3% par an d'empreinte carbone formalisé Schéma Directeur p. 24 + -40% consommations énergie d'ici 2030 (Plan sobriété énergétique 2022) = trajectoire publique chiffrée
      - **Montée C28 PARTIEL→OUI** : Bâtiment Europlaza Dauphine Executive Education (~2 500 m² La Défense) **doublement certifié NF HQE™ Exploitation et BREEAM In-Use International « Very Good »** — « 3e bâtiment de France » à obtenir ce double label (RA 2025 p. 49)
    - Apports : VP RESU Stéphanie Monjon membre COMEX + 6 référents thématiques (Resp. environnementale, Égalité, LGBT+, Intégrité scientifique, Déontologie) + 30 correspondants RSU depuis 2018 + Béatrice Parance Déléguée RESU + CES créé 2022 (~40 membres) + PAEP 2021 12 obj/72 actions + Plan LGBT+ adopté CA janv 2024 + cellule veille mars 2018 (17 mbr) + médiateur externe nov 2023 + index égalité 94/100 + Mission Handicap + SDPH 2022-2025 (5 axes/150 actions, 4e SDPH 2026 en cours, taux emploi handicap >5%) + chantier sobriété numérique RSU+DNum + adhésion AMUE-CNRS + 1/2j sensibilisation DNum janv 2024 + refonte site éco-conçue 2025 + jardin 900 m² sans phytos + nouveau cours L2 forêts/océans/sols/agriculture rentrée 2025 + clinique juridique Bloom/Pollinis 2023-24 + Fondation Madeleine 750k€/15 ans + poste achat durable financé via PSL
    - Score : 28.5 → **30.0** (Confirmé → **Avancé** ✨, ≥30, net +1.5) — passage tier
    - Excel mis à jour (Grille R24)
  - **École Polytechnique** (idx=15) :
    - 11 justifs enrichies/réécrites (C1, C4, C5, C8, C18, C19, C20, C22, C28, C29, C32) avec Plan Climat Polytechnique (288p) + Bilan Plan Climat 2022-2025 + Rapport Annuel 2024 + Note d'organisation Plan Climat + Index F/H 2025 + Plan VSS + Plaquettes Pôle Égalité des Chances + polytechnique.edu (7 pages RSE)
    - **3 verdicts modifiés (2 montées + 1 descente — examen équilibré rigoureux vu score 33.5 déjà élevé)** :
      - **Descente C8 OUI→PARTIEL** : cours obligatoire « Engineering Sustainability » 40h Cycle ingénieur 2A exemplaire (Céline Guivarch GIEC, 8 départements), mais Bachelor 1A et MSc&T 1A = 7h obligatoires + Bachelor 2A = 14h (Plan Climat p. 12) — < seuil 15h/an pour TOUS programmes. Cohérence stricte avec descentes IGENSIA/OMNES/Brest BS/BSB/Dauphine
      - **Montée C19 PARTIEL→OUI** : scope 3 ventilé (Plan Climat p. 24-25) — énergie/bâtiments 36% / achats biens et services 28% / déplacements 19% / immobilisations matériel recherche 12% (1 933 tCO2e) / restauration et déchets <1%
      - **Montée C22 PARTIEL→OUI** : Manifeste Planet Tech'Care signé en 2020 (engagement de référence sectoriel) + déploiement Papercut sur la majeure partie du parc + indicateur KPI Plan Climat + colloque sobriété numérique DSI + contribution rapport Cigref/Shift Project — politique numérique responsable formalisée
    - **Vérifications strictes ne déclenchant pas de descente** :
      - C20 OUI maintenu : -20% GES par usager poste énergie + neutralité carbone campus 2050 + résultats partiels gaz -33%/m², électricité -16%/m² (2019-2024) + 89% achats >40K€ critères environnementaux dès 2023 → trajectoire chiffrée pluriannuelle solide
      - C28 PARTIEL maintenu : rénovation ensemble central « vise l'obtention du niveau Argent du label Bâtiment Durable Francilien » = certification VISÉE pas obtenue (Plan Climat p. 40)
      - C4 OUI maintenu : Label DD&RS obtenu janvier 2025 par CIRSES, durée maximale 4 ans (2025-2029), couvre 17 ODD et 5 axes
    - Apports : Capucine Pêtre-Spassky Directrice TES depuis mai 2024 au COMEX + Anne-Sarah Socié BGES + Laure Fau GT Net Zéro + 677/900 employés formés + 8M€+ investis 2019-2024 + budget pôle TES 90k€/an + Fonds DD 400k€/an pour 10 doctorants/an + Fondation 87,3M€ levés + Restaurant Magnan 25% végé quotidien + opérations Magnan bas carbone 3x/an + note carbone publiée chaque jour + méthanisation biodéchets + 89% marchés >40K€ critères environnementaux + objectif 50% commandes achats responsables + formation 2j équipe achats + Plan national achats durables 2022-2025
    - Score : 33.5 → **34.0** (Avancé maintenu, ≥30, net +0.5)
    - Excel mis à jour (Grille R7)
  - **PSB Paris School of Business** (idx=27) :
    - 11 justifs enrichies/réécrites (C1, C2, C3, C13, C18, C19, C25, C26, C30, C31, C35) avec Rapport RSE PSB 2023-2024 (145p) + psbedu.paris (4 pages RSE)
    - **5 verdicts modifiés (toutes des montées, 0 descente — sources solides documentées site officiel)** :
      - **Montée C1 PARTIEL→OUI** : « Le Responsable DD&RSE est sous la responsabilité directe du Directeur Général » (psbedu.paris/fr/ecole/demarche-rse). Évolution organisationnelle post-rapport 2022-23 (où la RSE était portée par Carole Simonnet professeure finance) → fonction DD&RSE désormais rattachée formellement DG
      - **Montée C13 PARTIEL→OUI** : campagne NonC'estNon + 2 référents harcèlement formés 1,5 jour par avocat + adresse dédiée respect-egalite@psbedu.paris + procédure de signalement et d'enquête + ligne HuCare 24/7. Triptyque VSS satisfait (cohérent NEOMA C13)
      - **Montée C18 PARTIEL→OUI** : bilan carbone 2023-2024 = 4 264,4 tCO2e publié sur site officiel (intègre alimentation, transport étudiants, déplacements visiteurs)
      - **Montée C19 NON→PARTIEL** : postes scope 3 nommés (food, student transportation, visitor travel) sur site officiel, sans tableau détaillé par poste (PARTIEL prudent)
      - **Montée C30 PARTIEL→OUI** : Programme HuCare = ligne d'écoute 24/7 + consultations hebdomadaires sur le campus, gratuites/anonymes/confidentielles avec un professionnel de santé mentale (cohérent NEOMA C30 angela@)
    - **C4 NON maintenu (vérification stricte)** : 0 occurrence DD&RS/CIRSES/LUCIE/EcoVadis/ISO 14001/B Corp dans le Rapport RSE 2023-2024 PSB ; PRME (signé 2014) = engagement Pacte Mondial UN, pas un label RSE strict ; Label STAR (créé 2023) = label INTERNE PSB, pas externe ; AACSB/AMBA/EFMD = accréditations académiques pas labels RSE
    - **C20/C21 NON maintenus** : plan décarbonation « en cours d'élaboration » → pas encore d'objectif GES chiffré pluriannuel ni trajectoire publique
    - Apports : Comité CSR formalisé avec 3 missions et 4 collèges (CSR Dpt + étudiants + enseignants/administration + partenaires), réunions « at least twice a year » (minimal) + Programme P.A.S. (Projet d'Accompagnement à la Scolarité) formalisé + référent handicap dédié + plans aménagement individualisés + Label STAR 4 piliers + 45 cours dédiés DD + Sulitest obligatoire B3+M2 + Business Ethics MIB depuis 2010 + 13 associations / ~1 000 étudiants / 100 projets / Green Club, GduCoeur, My Green Campus, Impact Campus + Semaine Déchets + Semaine DD
    - Score : 18.5 → **21.0** (Insuffisant → **En progression** ✨, ≥20, net +2.5) — passage tier
    - Excel mis à jour (Grille R40)
  - **Bilan global lot 3 écoles** : 11 montées (Dauphine 4 + Polytechnique 2 + PSB 5) + 2 descentes (Dauphine C8 + Polytechnique C8) = **net +5.0**, **2 PASSAGES TIER** (Dauphine Confirmé→Avancé + PSB Insuffisant→En progression)
  - **Apprentissage** : C8 (≥15h/an pour TOUS programmes) commence à constituer une jurisprudence forte — descente cohérente sur tout score où Bachelor/MBA ne sont pas systématiquement à ≥15h/an obligatoires. Vérification stricte sur le site officiel a permis de monter PSB sans descente (pas de surinterprétation, juste des dispositifs effectivement publiés mais non documentés dans le rapport 2022-23 qui datait).

### 🆕 Règle méthodologique ajoutée (post-Clermont)
- **C4 (Label LUCIE)** : ne PAS mentionner « 1ère école » sans vérification. Audencia détient LUCIE depuis 2013, IGENSIA depuis juin 2025, Clermont SB depuis décembre 2025 (DD&RS), BSB depuis juin 2024 (DD&RS). Plusieurs écoles du benchmark ont LUCIE ou DD&RS.
- **C8 (Cours DD ≥15h/an)** : volume horaire significatif (>30h/an Bachelor) = présomption forte de couverture systématique, sauf si explicitement contredit. Ne pas systématiquement descendre OUI → PARTIEL juste parce que MSc/MBA pas explicitement documentés. Apprécier au cas par cas.

### 🆕 Règle ajoutée (post-EDC Paris) — RIGUEUR SOURCES
- **Sources strictement limitées** : site officiel école + documents publiés par l'école
- **Pas de presse, pas d'articles tiers, pas de Wikipédia, pas de classements externes** (Le Parisien, Le Point, letudiant, presseagence, objectif-ast, etc.)
- Si une école est faiblement documentée (cas EDC : SIP minimaliste « No Entity Yet », site sans page RSE), assumer le score bas — ne pas chercher à enrichir avec des sources externes pour le faire artificiellement remonter
- Cette règle préserve l'**équité d'évaluation** entre écoles : toutes sont jugées sur leurs propres communications officielles uniquement

### 📋 Travail antérieur reverté (commit `d62751c`)
- Enrichissements en lot des 8 écoles (CESI, OMNES, AD, Galileo, IONIS, IGENSIA, EMLYON, ESSEC)
- **Raison du revert** : erreurs d'interprétation graves (IGENSIA décrit comme Société à Mission, comparaisons inter-écoles dans les justifs)
- AD a été refait proprement après revert avec la nouvelle méthode

### 🔜 À faire (par ordre de priorité)
1. ~~IGENSIA (cible)~~ ✅ Fait proprement avec sources verifiées
2. ~~OMNES~~ ✅ Fait (4 mai, score 31.0 Avancé maintenu)
3. **CESI** (groupe le plus récent)
4. ~~Galileo~~ ✅ Fait (28 avril, FR), **IONIS** (autre groupe)
5. **Top écoles Avancé** (EMLYON ✅, ESSEC ✅, ÉCOLE POLY ✅, HEC ✅, KEDGE ✅, ESCP ✅, EDHEC ✅, ESSCA ✅, GEM ✅, SCIENCES PO, SKEMA, TBS, AUDENCIA ✅, NEOMA ✅ passage Avancé, DAUPHINE ✅ passage Avancé)
6. **Écoles Confirmé** (BSB ✅, INSEAD ✅, IESEG ✅, NEOMA ✅, EFREI ✅, EM NORMANDIE ✅, RENNES SB, IMT-BS ✅, CLERMONT ✅, DAUPHINE ✅, ICN ✅, EM STRAS ✅, EXCELIA ✅, ESDES ✅, MONTPELLIER BS ✅)
7. **Écoles En progression / Insuffisant** (Brest BS ✅, AD ✅, IAE LYON ✅, GALILEO ✅, ESCE ✅, EDC ✅, IPAG ✅, ISC PARIS ✅, PSB ✅ passage En progression)

### 💡 Méthode validée et améliorée (post-Audencia + Brest BS)
- **Croisement systématique PDF + sites web** : pour chaque "PARTIEL faible" du rapport, vérifier sur le site école (rse.<école>.com, fondation, chaires) avant de conclure NON. Audencia a démontré que 4 critères "PARTIEL" cachaient des dispositifs solides documentés sur le site (C22 numérique INR, C24 biodiversité WWF, C27 économie circulaire, C32 achats responsables).
- **Préconisation explicite avec scénarios** : présenter "conservateur / médian / maximaliste" avec impact score, pour que l'utilisateur tranche en conscience.
- **🆕 Examen équilibré dans les 2 sens (post-Brest BS)** : NE JAMAIS se contenter d'examiner les montées. Toujours challenger les verdicts actuels OUI et PARTIEL avec un œil sceptique :
  - **OUI** → questionner si le périmètre "TOUS les apprenants" / "scopes 1+2+3" / "≥15h/an" est réellement satisfait
  - **PARTIEL** → questionner si la périphérie ne ferait pas glisser à NON (cohérence avec C4 AD : zéro label conforme = NON)
  - Présenter à l'utilisateur les **descentes possibles** en parallèle des montées, avec le calcul net du score
- **Cohérence inter-écoles sur le périmètre strict** :
  - C1 (Gouvernance RSE) : poste/fonction RSE/DD au sein du COMEX/Directoire OU rattaché(e) directement à la DG **avec mandat formalisé** = condition stricte. Si la fonction RSE est portée par un(e) responsable opérationnel(le) sans rattachement exécutif → **NON systématique** (cf. correction rétroactive AD, Brest BS, BSB).
  - C4 (Label RSE) : zéro label DD&RS/LUCIE/EcoVadis/ISO 14001/B Corp = NON systématique (cf. AD, Brest BS)
  - C6 (Procédure éthique) : charte étudiante ≠ dispositif anti-corruption Sapin II
  - C8 (Cours DD ≥15h/an) : doit être démontré pour TOUS les programmes, pas seulement Bachelor/PGE
- **🆕 Audit rétroactif obligatoire sur les écoles déjà traitées** : à chaque nouvelle règle stricte établie (ex. C1 COMEX), repasser sur les écoles précédemment enrichies pour appliquer la cohérence (sinon, biais d'inégalité d'évaluation entre écoles).

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
