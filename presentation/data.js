/* ==============================
   Présentation Benchmark Rapports RSE — données analyses
   Pour l'instant : IGENSIA (référence, rendue séparément) + OMNES.
   Les autres rapports seront ajoutés un par un après lecture approfondie.
   ============================== */

const PRESENTATION_DATA = {
  meta: {
    nb_rapports: 1,
    methodo: ""
  },
  rapports: [
    {
      key: 'omnes', rank: 1, score: 4.00, forme: 3.75, fond: 4.25,
      name: 'OMNES Education', titre: 'Rapport de Responsabilité Sociétale 2024-2025', pages: '44 p.',
      leg_cov: "Couverture du rapport OMNES Education 2024-2025",
      leg_i1:  "Sommaire structuré en 4 piliers Time to Act / Accomplish / Be Consistent / Take Care",
      leg_i2:  "Tableau d'indicateurs sur 5 ans en fin de rapport",
      leg_i3:  "Schéma des 4 piliers + cartographie des partenaires par axe (p.8-9)",
      leg_i4:  "Partie biodiversité « Redonner sa place au vivant » : enjeux, engagements, diagnostics campus (p.24-25)",
      forme_plus: [
        "Format en double page agréable visuellement",
        "Architecture mémorisable en 4 piliers (Time to Act / Accomplish / Be Consistent / Take Care) + socle Gouvernance, avec une page de synthèse opérationnelle par pilier",
        "Couverture originale : graphique typographique qui porte un message (mots-clés en pavé — BIODIVERSITÉ, ADAPTATION, INCLUSION, écosystèmes), pas une simple photo",
        "Encadrés « ZOOM SUR » qui signalent les focus emblématiques (campus Marseille bas carbone, risques climatiques)",
        "Édito en interview croisée : Édouard Vaury (Directeur campus Rennes) → Marc-Henri Desportes (CEO). Plus vivant qu'un mot du DG",
        "Code couleur par pilier qui guide la navigation",
      ],
      forme_moins: [
        "Format paysage moins confortable que portrait sur écran, surtout mobile",
        "Schéma des 4 piliers + partenaires (p.8-9) trop dense, beaucoup de logos en petit — mais l'idée de cartographier les parties prenantes est à reprendre",
        "Plan d'action carbone 2025-2030 (11 actions) éparpillé dans le texte, pas de schéma de synthèse",
      ],
      fond_plus: [
        "Budget RSE publié en valeur absolue avec sa trajectoire sur 5 ans",
        "Tableau d'indicateurs sur 5 ans en fin de rapport (par axe) : transforme l'état des lieux en trajectoire",
        "Sur chaque page-synthèse de pilier : engagements concrets + KPI cibles (« 100 % », « 80 % ») + comités responsables identifiés",
        "Bilan carbone scopes 1+2+3, avec explication transparente de la hausse",
        "Anticipation CSRD volontaire (1 an d'avance) + matrice de double matérialité réalisée",
        "Gouvernance quantifiée : 9 comités RSE, 77 réunions sur l'année, 34 collaborateurs + 50 étudiants dans l'Impact Team",
        "Biodiversité substantielle : 1er acteur de l'enseignement supérieur adhérent au Programme Entreprises Engagées pour la Nature, approche régénérative posée comme pilier",
      ],
      fond_moins: [
        "Peu de témoignages d'apprenants directs — la voix dominante reste celle des directeurs et collaborateurs",
      ],
      idees: [
        { titre: "Publier notre budget RSE en valeur absolue avec son évolution",
          pourquoi: "C'est le signal de transparence le plus fort qu'on voit dans le benchmark. L'évolution rend le chiffre crédible, pas le montant en lui-même.",
          comment: "1 tableau simple en fin de rapport : Budget RSE / ETP DD-RSE / % du budget total, comparé année par année. On démarre cette année avec N et N-1, puis on enrichit la série chaque année." },
        { titre: "Construire un tableau d'indicateurs en fin de rapport",
          pourquoi: "Transforme un état des lieux en récit de trajectoire. Le lecteur ne voit plus une photo mais une dynamique.",
          comment: "1 page par axe (Apprenants / Collaborateurs / Campus / Partenaires), colonnes = années, lignes = 6-8 indicateurs clés. À reprendre tel quel chaque année." },
        { titre: "Expliciter les variations défavorables et ce qu'on n'a pas atteint",
          pourquoi: "OMNES écrit en note de bas de tableau : « Hausse liée à l'intégration de nouveaux campus dans le périmètre du bilan ». Cette honnêteté distingue un rapport d'engagement d'un document de communication.",
          comment: "À la fin de chaque axe, une mention courte : « Ce qu'on n'a pas atteint en 2024-2025 » + cause + correctif prévu. Quand un indicateur évolue à la hausse, expliquer pourquoi (périmètre, choix volontaire, etc.)." },
        { titre: "Renforcer notre partie biodiversité (vraie lacune chez nous)",
          pourquoi: "OMNES en a fait un pilier à part entière avec des partenariats lisibles (OFB, LPO, AFB) et une approche régénérative. Chez nous, c'est quasi absent du rapport actuel.",
          comment: "Ajouter une section biodiversité dans l'axe Campus (ou en transversal) : audit de proximité écologique de nos campus, partenariats LPO/OFB, actions concrètes (fauchage tardif, ruches, refuges LPO), formation des apprenants via la Fresque de la Biodiversité." },
        { titre: "Encadrés « ZOOM SUR » pour 2-3 case studies emblématiques par axe",
          pourquoi: "Format différent de notre codification C'EST RÉALISÉ / LANCÉ / PRÉVU : ici on met un projecteur narratif sur quelques actions phares qui incarnent un axe. Les deux formats peuvent cohabiter.",
          comment: "Identifier 2-3 actions emblématiques par axe et leur dédier un encadré demi-page : visuel + 2-3 chiffres clés + 1 témoignage incarné. Ex chez nous : Campus des Groues éco-construit, dispositif For Me, ateliers 2tonnes." },
        { titre: "Reprendre notre structure LUCIE en schéma synthétique de début de rapport",
          pourquoi: "OMNES a transformé sa stratégie en page opérationnelle (p.8-9) : par pilier on a engagements concrets + KPI cibles + comités responsables + partenaires associés. Chez nous, on a la labellisation LUCIE 26000 et des engagements, mais on ne les a pas repris sous cette forme synthétique dans le rapport.",
          comment: "1 page (ou double-page) en début de rapport : structure LUCIE par pilier, chacun avec son encadré contenant — les engagements LUCIE qu'on a pris + nos cibles chiffrées + les comités/pilotes responsables + les partenaires associés (LPO, GMF, Missions Locales, ANLCI, etc.). Inspiration directe du schéma OMNES p.8-9, à adapter à notre identité." },
        { titre: "Faire de notre couverture un graphique porteur de message (pas juste une photo)",
          pourquoi: "OMNES affiche en couverture un pavé typographique avec ses mots-clés stratégiques (BIODIVERSITÉ, ADAPTATION, INCLUSION, écosystèmes) — la couverture seule annonce déjà le projet RSE. Notre couverture actuelle (4 campus) est jolie mais ne porte pas de message sur notre démarche.",
          comment: "Repenser la couverture du prochain rapport en intégrant un graphique typographique ou symbolique qui résume notre démarche RSE en 4-5 mots-clés (ex. APPRENANTS, COLLABORATEURS, CAMPUS, PARTENAIRES, ou LUCIE / ODD / RÉGÉNÉRATIF / ANCRAGE). À cadrer avec notre studio graphique." },
      ],
    },
  ],
  synthese: [],
};
