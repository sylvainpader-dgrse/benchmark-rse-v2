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
      leg_cov: "Couverture A4 paysage « Time to Act » : identité graphique forte (rose + mots-clés disposés en pavé)",
      leg_i1:  "Sommaire structuré en 4 piliers : Time to Act / Accomplish / Be Consistent / Take Care + Indicateurs",
      leg_i2:  "Tableau d'indicateurs sur 5 ans (5.1 Time to Act) avec Budget RSE : 1 458€ (20-21) → 310 000€ (24-25)",
      forme_plus: [
        "Format A4 paysage en double-page : rythme cinématographique, texte à gauche / visuel à droite, le lecteur avance sans rupture",
        "Architecture mémorisable en 4 piliers (Time to Act / Accomplish / Be Consistent / Take Care) + socle Gouvernance",
        "Encadrés « ZOOM SUR » qui aèrent et signalent les focus emblématiques (campus Marseille bas carbone, risques climatiques des campus)",
        "Édito en interview croisée : question d'Édouard Vaury (Directeur campus Rennes) → réponse de Marc-Henri Desportes (CEO). Plus vivant qu'un mot du DG classique",
        "Liste nominative des 19 référents handicap : effort d'incarnation rare",
      ],
      forme_moins: [
        "Format paysage moins confortable que portrait sur écran, surtout mobile",
        "Schéma des 4 piliers + partenaires (p.8-9) très dense : beaucoup de logos en petit, lecture difficile",
        "Plan d'action carbone 2025-2030 (11 actions) éparpillé dans le texte au lieu d'un schéma de synthèse",
      ],
      fond_plus: [
        "Budget RSE publié en valeur absolue avec sa trajectoire sur 5 ans : 1 458€ → 41 738€ → 134 000€ → 145 000€ → 310 000€",
        "Tableau d'indicateurs sur 5 ans en fin de rapport (par axe) : transforme l'état des lieux en récit d'évolution",
        "Bilan carbone scopes 1+2+3 = 17 720 tCO2e (506 kg/étudiant), avec explication transparente de la hausse (élargissement du périmètre à de nouveaux campus)",
        "Anticipation CSRD volontaire (1 an d'avance) + matrice de double matérialité réalisée",
        "Gouvernance quantifiée : 9 comités RSE actifs, 77 réunions sur l'année, 34 collaborateurs + 50 étudiants engagés dans l'Impact Team",
      ],
      fond_moins: [
        "Peu de témoignages d'apprenants directs : la voix dominante reste celle des directeurs et collaborateurs",
        "Plan d'action 2025-2030 dilué dans le narratif, pas de récap visuel en page de synthèse",
      ],
      idees: [
        { titre: "Publier notre budget RSE en valeur absolue avec son évolution",
          pourquoi: "OMNES publie sa trajectoire de 1 458€ à 310 000€ sur 5 ans : c'est l'évolution qui rend le chiffre crédible, pas le montant. C'est l'acte de transparence le plus fort qu'on voit dans le benchmark.",
          comment: "1 tableau simple en fin de rapport : Budget RSE / ETP DD-RSE / % du budget total, comparé année par année. On démarre cette année avec N et N-1, puis on enrichit la série chaque année." },
        { titre: "Construire un tableau d'indicateurs sur 5 ans en fin de rapport",
          pourquoi: "C'est l'élément qui transforme un état des lieux en récit de trajectoire. Le lecteur ne voit plus une photo mais une dynamique.",
          comment: "1 page par axe (Apprenants / Collaborateurs / Campus / Partenaires), colonnes = années 20-21 → 24-25, lignes = 6-8 indicateurs clés. À reprendre tel quel chaque année." },
        { titre: "Expliciter les variations défavorables et ce qu'on n'a pas atteint",
          pourquoi: "OMNES écrit en note de bas de tableau : « Hausse liée à l'intégration de nouveaux campus dans le périmètre du bilan ». C'est cette honnêteté qui distingue un rapport d'engagement d'un document de communication.",
          comment: "À la fin de chaque axe, une mention courte : « Ce qu'on n'a pas atteint en 2024-2025 » + cause + correctif prévu. Quand un indicateur évolue à la hausse, expliquer la cause (périmètre, choix volontaire, etc.)." },
      ],
    },
  ],
  synthese: [],
};
