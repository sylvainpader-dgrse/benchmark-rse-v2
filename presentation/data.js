/* ==============================
   Présentation Benchmark Rapports RSE — données analyses
   21 rapports (hors IGENSIA, qui est l'objet à améliorer)
   ============================== */

const PRESENTATION_DATA = {
  meta: {
    nb_rapports: 21,
    methodo: "Analyse de la Forme (mise en page, hiérarchie visuelle, rythme, équilibre texte/visuels) et du Fond (KPIs, structure, messages, indicateurs, éléments différenciants) de chaque rapport publié."
  },
  rapports: [
    {
      key: 'omnes', rank: 1, score: 4.00, forme: 3.75, fond: 4.25,
      name: 'OMNES Education', titre: 'Rapport RSE 2024-2025', pages: '44 p.',
      leg_cov: "Couverture sobre, photo apprenants + accroche Time to Act",
      leg_i1:  "Page sommaire : 4 grands axes avec icônes + photos d'illustration",
      leg_i2:  "Tableau d'évolution du budget RSE (310k€) depuis 2020",
      forme_plus: [
        "Mise en page A4 paysage en double-page : lecture continue, fil narratif fort",
        "Iconographie cohérente et reconnaissable (« Time to Act »)",
        "Rythme visuel équilibré : photo / texte / KPI / témoignage",
      ],
      forme_moins: [
        "Format paysage moins pratique à lire sur écran qu'A4 portrait",
        "Quelques pages très denses en texte (axes 3 et 4)",
      ],
      fond_plus: [
        "Budget RSE publié 310k€ avec son évolution depuis 2020 (acte de transparence rare)",
        "Bilan carbone scopes 1+2+3 sur 17 720 tCO2e (506 kgCO2e/étudiant)",
        "Mention explicite des objectifs non atteints (rare et crédibilisant)",
        "Distinction apprenants/collaborateurs explicite tout au long du document",
      ],
      fond_moins: [
        "Peu de témoignages incarnés (apprenants, collaborateurs, partenaires)",
        "Plan d'action 2025-2030 présenté de façon textuelle, mériterait un schéma",
      ],
      idees: [
        { titre: "Publier notre budget RSE avec son évolution sur 4-5 ans",
          pourquoi: "C'est le signal de transparence le plus fort dans un rapport RSE école.",
          comment: "1 tableau simple : budget total + ETP + % budget global, comparé année par année sur la dernière période." },
        { titre: "Lister les objectifs non atteints",
          pourquoi: "Distingue un rapport d'engagement d'un document de communication.",
          comment: "À la fin de chaque axe, une mention « ce que nous n'avons pas atteint en 2024 » + 1-2 phrases d'explication." },
      ],
    },
    {
      key: 'essec', rank: 2, score: 4.00, forme: 4.00, fond: 4.00,
      name: 'ESSEC', titre: 'Rapport DD&RS 2025', pages: '22 p.',
      leg_cov: "Couverture sobre, photo apprenants + titre épuré",
      leg_i1:  "Schéma directeur DD&RS 2024 : 1 page avec les 5 axes et leurs priorités",
      leg_i2:  "Page « Réalisé / Nouveau / En cours » sur 1 axe particulier",
      forme_plus: [
        "Densité éditoriale rare : 22 pages très denses sans être indigestes",
        "Schéma directeur visible et lisible dès l'entrée du rapport",
        "Hiérarchie typographique claire (titres / sous-titres / corps)",
      ],
      forme_moins: [
        "Photos peu nombreuses, ton un peu froid",
        "Peu de témoignages incarnés",
      ],
      fond_plus: [
        "37 ETP dédiés à la RSE annoncés clairement",
        "130 heures de cours sur la transition (volume horaire élevé documenté)",
        "Bilan carbone complet + matrice de matérialité",
        "Plan stratégique RSE articulé sur 5 axes avec priorités explicites",
      ],
      fond_moins: [
        "Ton trop maîtrisé : peu d'autocritique, peu de signal sur les difficultés",
        "Mentionne peu les apprenants comme parties prenantes actives",
      ],
      idees: [
        { titre: "Faire un schéma directeur visible dès l'entrée du rapport",
          pourquoi: "Permet au lecteur de comprendre où on va avant d'entrer dans le détail.",
          comment: "1 page en début de rapport avec les 5 axes IGENSIA + 2-3 priorités par axe, sur une trajectoire 2024-2028." },
        { titre: "Annoncer clairement les moyens RSE consacrés (ETP, budget)",
          pourquoi: "Quantifie l'engagement réel au-delà du discours.",
          comment: "1 paragraphe « Moyens RSE 2024 » avec : nb d'ETP dédiés, budget annuel, organigramme simplifié de l'équipe DD." },
      ],
    },
    {
      key: 'galileo', rank: 3, score: 3.88, forme: 4.25, fond: 3.50,
      name: 'Galileo Global Education', titre: "Rapport d'Impact 2024-2025", pages: '122 p.',
      leg_cov: "Couverture moderne, photo aérienne + accroche « Forward Impact »",
      leg_i1:  "Page matrice de matérialité (double matérialité visuelle)",
      leg_i2:  "Mosaïque d'écoles : présentation visuelle des 56 marques du Groupe",
      forme_plus: [
        "Identité graphique très soignée, niveau corporate international",
        "Mosaïques visuelles efficaces pour présenter les 56 écoles du Groupe",
        "Matrice de matérialité bien posée graphiquement",
      ],
      forme_moins: [
        "122 pages : volume écrasant, le lecteur décroche",
        "KPIs noyés dans la masse, pas de page de synthèse en début",
        "Frontière floue entre « actions réalisées » et « actions prévues »",
      ],
      fond_plus: [
        "Couverture internationale (110 000 étudiants, 18 pays) avec exemples par marque",
        "Matrice de matérialité comme outil d'analyse stratégique",
      ],
      fond_moins: [
        "Bilan carbone limité aux campus, scope 3 absent",
        "Manque de hiérarchie : tout semble équivalent",
      ],
      idees: [
        { titre: "Construire une matrice 2×2 « priorité × impact » des enjeux RSE",
          pourquoi: "Permet au lecteur de comprendre pourquoi on agit sur tel sujet plutôt qu'un autre.",
          comment: "1 page en début de rapport, 8-10 enjeux placés sur 2 axes (importance pour nos parties prenantes × impact RSE)." },
        { titre: "Ne pas dépasser 50 pages",
          pourquoi: "Au-delà, le rapport devient illisible et la lecture s'arrête à la moitié.",
          comment: "1 page de synthèse par axe + renvois vers annexes web pour le détail. Privilégier des KPIs visuels aux paragraphes longs." },
      ],
    },
    {
      key: 'excelia', rank: 4, score: 3.88, forme: 3.75, fond: 4.00,
      name: 'Excelia BS', titre: 'Rapport TES 2024', pages: '44 p.',
      leg_cov: "Couverture engageante, mise en avant de l'IRSI (Institut RSE)",
      leg_i1:  "Page chiffres-clés : 28 projets, 13 903h DD, etc.",
      leg_i2:  "Tableau d'avancement par axe avec mention des objectifs non atteints",
      forme_plus: [
        "Distinction apprenants/collaborateurs présente dans la structure des sections",
        "Tableaux d'avancement par axe : visualisation claire de l'état d'avancement",
        "Mise en avant des chiffres-clés en début de rapport",
      ],
      forme_moins: [
        "Format dense, peu de respirations visuelles entre les chiffres",
        "Quelques pages trop chargées en chiffres",
      ],
      fond_plus: [
        "Historique long (IRSI depuis 2010) qui crédibilise la démarche",
        "KPIs nombreux et précis : 28 projets transversaux, 13 903h DD",
        "Mention des objectifs non atteints (signal de maturité)",
      ],
      fond_moins: [
        "Format dense rend la lecture rapide difficile",
      ],
      idees: [
        { titre: "Multiplier les KPIs chiffrés (volume horaire, nb projets, % couverture)",
          pourquoi: "Un rapport sans KPIs reste déclaratif.",
          comment: "Pour chaque axe, 3-4 indicateurs simples (nb d'apprenants concernés, h de formation, % de couverture des programmes, nb de partenariats, montant financé)." },
        { titre: "Mettre en avant l'historique d'engagement (« X années »)",
          pourquoi: "Crédibilise la démarche et la distingue d'une mode passagère.",
          comment: "Timeline en début de rapport « Notre engagement RSE depuis YYYY » avec 5-6 jalons (création direction RSE, premier rapport, premiers labels, etc.)." },
      ],
    },
    {
      key: 'audencia', rank: 5, score: 3.75, forme: 4.00, fond: 3.50,
      name: 'Audencia BS', titre: 'Rapport DD&RS 2026', pages: '16 p.',
      leg_cov: "Couverture compacte, accroche « Pionnière Label DD&RS depuis 2016 »",
      leg_i1:  "Sommaire compact 4 axes + 5 priorités stratégiques",
      leg_i2:  "Tableau comparatif 2024/2025 : 15 KPIs avec évolution chiffrée (page 15)",
      forme_plus: [
        "Format compact (16 pages) sans sacrifier la profondeur : densité éditoriale exemplaire",
        "Le tableau comparatif p.15 (15 KPIs en 1 page) est la vraie réussite éditoriale",
        "Mise en page bien rythmée, hiérarchie typographique soignée",
      ],
      forme_moins: [
        "Format court limite la profondeur d'analyse par axe",
        "Pas de témoignages",
      ],
      fond_plus: [
        "Pionnière 1ère BS Label DD&RS (2016) : argument d'autorité",
        "PRME Champions (2014), Global Compact (2004) : 20 ans d'historique",
        "Tableau d'évolution chiffrée d'une année sur l'autre",
        "Signaux honnêtes : budget transition en baisse (11→8%), CO2/étudiant en hausse",
      ],
      fond_moins: [
        "Format court oblige à des choix",
      ],
      idees: [
        { titre: "Tableau comparatif annuel des 12-15 KPIs",
          pourquoi: "C'est l'élément qui transforme un état des lieux en trajectoire. Le lecteur voit la progression.",
          comment: "À la fin du rapport, 1 page avec 12-15 indicateurs en lignes, colonnes N-1 et N, et flèche évolution. À reprendre dans le rapport de l'année suivante." },
      ],
    },
    {
      key: 'efrei', rank: 6, score: 3.75, forme: 3.75, fond: 3.75,
      name: 'EFREI', titre: 'Rapport de Progrès DD&RS 2026', pages: '23 p.',
      leg_cov: "Couverture sobre avec accroche « Notre Progrès »",
      leg_i1:  "Page « bloc de compétences RSE validé par examen »",
      leg_i2:  "Projets originaux : Mastère Green IT + Harmony + Falcon",
      forme_plus: [
        "Format compact (23 p.), bien rythmé",
        "Originalités des projets bien mises en avant (chacun avec un visuel)",
        "Charte associations DD bien mise en avant",
      ],
      forme_moins: [
        "Manque de photos d'apprenants ou collaborateurs",
      ],
      fond_plus: [
        "Intégration complète DD/RS dans tous les programmes depuis 2024",
        "Bloc de compétences RSE validé par examen (rare et fort)",
        "Charte associations DD obligatoire avec audit carbone",
        "Originalités : Mastère Green IT, projet santé April, Harmony (reconditionnement PC), Falcon (drones EHPAD)",
      ],
      fond_moins: [
        "Fresque du Climat non mentionnée (déploiement à compléter)",
        "Bilan carbone détaillé non publié dans ce rapport",
      ],
      idees: [
        { titre: "Imposer une charte DD obligatoire aux associations étudiantes",
          pourquoi: "Crée un effet d'entraînement et matérialise l'engagement étudiant au-delà des cours.",
          comment: "Signature à la création de l'asso + audit carbone annuel léger des événements organisés (gobelets, déplacements, papier). 1 page dédiée dans le rapport." },
        { titre: "Évaluer la compétence RSE de nos apprenants",
          pourquoi: "Transforme la RSE de contenu pédagogique en compétence professionnelle vérifiée.",
          comment: "Module évalué (3-5 ECTS) sur les fondamentaux RSE + cas pratique noté. Publier le taux de réussite et le score moyen dans le rapport." },
      ],
    },
    {
      key: 'ieseg', rank: 7, score: 3.75, forme: 3.00, fond: 4.00,
      name: 'IESEG School of Management', titre: "Rapport d'Impact 2024-2025", pages: '47 p.',
      leg_cov: "Couverture format paysage moderne",
      leg_i1:  "Tableau « 81% des cours du PGE intègrent la durabilité »",
      leg_i2:  "Page « 61 cours entièrement dédiés à la durabilité » avec liste",
      forme_plus: [
        "Structure en 4 piliers claire",
        "Bilan carbone publié directement dans le rapport (pas en annexe)",
      ],
      forme_moins: [
        "Structure en 4 piliers un peu classique, peu d'originalité éditoriale",
        "Format paysage qui rend la mise en page moins flexible",
      ],
      fond_plus: [
        "Intégration pédagogique très forte : 81% des cours du PGE intègrent la durabilité",
        "61 cours entièrement dédiés à la durabilité (liste accessible)",
        "Distinction apprenants/collaborateurs claire",
      ],
      fond_moins: [
        "Manque d'autocritique sur les axes moins avancés",
      ],
      idees: [
        { titre: "Quantifier le % de cours intégrant un module DD/RSE",
          pourquoi: "La pédagogie est notre cœur de métier — c'est le KPI le plus naturel pour IGENSIA.",
          comment: "Audit des syllabi de nos 11 écoles, classification simple « Module DD/RSE oui/non ». Publier le % avec objectif à 3 ans." },
        { titre: "Publier la liste des cours/modules spécifiquement dédiés à la RSE/DD",
          pourquoi: "Matérialise notre engagement pédagogique.",
          comment: "1 page (ou annexe web) avec la liste des cours, par école, par niveau. Mise à jour annuelle." },
      ],
    },
    {
      key: 'emlyon', rank: 8, score: 3.38, forme: 3.50, fond: 3.25,
      name: 'EMLYON BS', titre: "Rapport d'engagement 2024", pages: '38 p.',
      leg_cov: "Couverture engageante, accroche « Société à Mission »",
      leg_i1:  "Page « SDGs Inside » : tableau de couverture des cours par ODD",
      leg_i2:  "Témoignages d'apprenants en double-page",
      forme_plus: [
        "Mise en page dynamique, beaucoup de photos pleine page",
        "Page « SDGs Inside » : un schéma fort qui synthétise la couverture des cours",
        "Témoignages d'apprenants en double-page : incarnation forte",
      ],
      forme_moins: [
        "Ton très promotionnel, peu de recul critique",
        "Mise en page parfois chargée (3-4 informations différentes par page)",
      ],
      fond_plus: [
        "Référentiel SDGs Inside : 100% des cours analysés sous l'angle ODD",
        "Bilan carbone affichant -30%",
        "Statut Société à Mission utilisé comme fil rouge",
      ],
      fond_moins: [
        "Politique sociale collaborateurs peu développée",
        "Limites et difficultés peu présentes",
      ],
      idees: [
        { titre: "Analyser nos cours sous l'angle ODD (« SDG Mapping »)",
          pourquoi: "Objective notre contribution pédagogique à la RSE et la rend lisible pour des parties prenantes externes.",
          comment: "Tableau « ODD × cours du tronc commun » sur 1 page, lisible d'un coup d'œil. Indiquer par exemple les ODD couverts par chaque école." },
        { titre: "Intégrer 4-6 témoignages courts d'apprenants",
          pourquoi: "Humanise le rapport et donne des « preuves de vie ».",
          comment: "Photos qualitatives + verbatim de 3-4 lignes + mention du programme/promo. Idéalement répartis dans tout le rapport, pas concentrés sur une page." },
      ],
    },
    {
      key: 'edhec', rank: 9, score: 3.25, forme: 2.75, fond: 3.75,
      name: 'EDHEC BS', titre: 'Rapport DDRS 2023', pages: '36 p.',
      leg_cov: "Couverture artistique, illustration sur fond bleu marine",
      leg_i1:  "Campagne anti-VSS : visuel fort + chiffres-clés",
      leg_i2:  "Matrice de matérialité (Capgemini Invent)",
      forme_plus: [
        "Illustrations très travaillées tout au long du rapport (qualité graphique haute)",
        "Campagne anti-VSS particulièrement réussie visuellement",
        "Rythme : 1 enjeu = 1 double-page (illustration gauche + texte droite)",
      ],
      forme_moins: [
        "Couleurs très sombres (bleu marine dominant) qui peuvent fatiguer la lecture",
        "Texte parfois trop dense par bloc",
      ],
      fond_plus: [
        "Matrice de matérialité réalisée avec Capgemini Invent (audit méthodologique)",
        "Bilan carbone complet, 100% étudiants sensibilisés",
      ],
      fond_moins: [
        "Environnement campus moins détaillé que les autres axes",
        "Pas d'audit externe du bilan carbone",
      ],
      idees: [
        { titre: "Soigner le traitement graphique des sujets sensibles (VSS, handicap, diversité)",
          pourquoi: "Un visuel fort traduit la considération qu'on porte au sujet — un texte bâclé sur ces sujets décrédibilise.",
          comment: "Commander à un graphiste 2-3 illustrations originales pour les axes sensibles. Investir au moins autant en design qu'en rédaction." },
        { titre: "Rythme « 1 enjeu = 1 double-page »",
          pourquoi: "Crée un fil narratif clair, le lecteur sait toujours où il en est dans le rapport.",
          comment: "Structurer 5 axes × N enjeux = N×2 pages. Chaque double-page commence par une illustration ou photo qualitative à gauche, texte structuré à droite." },
      ],
    },
    {
      key: 'skema', rank: 10, score: 3.12, forme: 3.25, fond: 3.00,
      name: 'SKEMA BS', titre: 'Rapport Transitions 2024-2025', pages: '24 p.',
      leg_cov: "Couverture moderne, accroche « Transitions Act »",
      leg_i1:  "Page Fresque du Climat : 1 300 participants chiffré",
      leg_i2:  "Page labels (DD&RS, ISO 14001, Charte INR)",
      forme_plus: [
        "Identité graphique moderne, lecture confortable",
        "Mise en avant des labels (DD&RS, ISO 14001, INR) en début de rapport",
      ],
      forme_moins: [
        "Mélange entre actions « réalisé » et « prévu » pas toujours clair",
        "24 pages mais peu de détails par axe",
      ],
      fond_plus: [
        "Trio de labels (DD&RS + ISO 14001 + Charte INR) : signal externe puissant",
        "Fresque du Climat à 1 300 participants : preuve de déploiement",
      ],
      fond_moins: [
        "Détail léger pour une école labellisée DD&RS (déçoit l'attente)",
      ],
      idees: [
        { titre: "Combiner plusieurs labels externes en signature de bas de page",
          pourquoi: "Un seul label peut paraître anecdotique, plusieurs ensemble crédibilisent.",
          comment: "Bandeau « Nos engagements externes : LUCIE 26000 + ... » présent dès la page 2 et rappelé en fin de rapport." },
      ],
    },
    {
      key: 'bsb', rank: 11, score: 3.12, forme: 3.50, fond: 2.75,
      name: 'Burgundy School of Business', titre: 'Rapport RSE 2024 (5e édition)', pages: '24 p.',
      leg_cov: "Couverture sobre, mention « 5e Rapport RSE »",
      leg_i1:  "Structure 3 piliers : Act for Respect / Sustainability / Empowerment",
      leg_i2:  "Programme (Re)Connect réfugiés : témoignage + photo",
      forme_plus: [
        "Structure en 3 piliers (au lieu de 5 axes) : plus mémorable",
        "Photos de programmes spécifiques avec témoignages",
        "Nom de la structure « Act for Respect / Sustainability / Empowerment » mémorisable",
      ],
      forme_moins: [
        "Format A4 sobre, manque un peu de souffle visuel",
      ],
      fond_plus: [
        "20 ans d'engagement RSE (depuis 2005) : argument d'autorité",
        "Module Impact pionnier (1ère grande école française)",
        "Programme (Re)Connect pour les réfugiés (lauréat à plusieurs reprises)",
        "Label DD&RS obtenu juin 2024",
      ],
      fond_moins: [
        "Pas de bilan carbone dans ce rapport (projet 2024-26)",
        "Budget RSE non publié",
      ],
      idees: [
        { titre: "Structurer en 3 piliers nommés (verbe d'action)",
          pourquoi: "3 piliers verbaux sont plus mémorables que 5 axes neutres du référentiel.",
          comment: "Trouver 3 verbes-piliers pour IGENSIA (ex : « Former / Inclure / Réduire »). Articuler les 5 axes du référentiel LUCIE en dessous, mais communiquer sur les 3 piliers." },
        { titre: "Mettre en avant 1 ou 2 programmes signature avec témoignages",
          pourquoi: "Humanise et différencie. Les programmes phares sont plus mémorables que les KPIs.",
          comment: "Choisir 2 programmes IGENSIA emblématiques (ex. séminaire HOPEN, accompagnement handicap) et leur consacrer 1 double-page chacun avec témoignages + photos." },
      ],
    },
    {
      key: 'hec', rank: 12, score: 2.88, forme: 2.25, fond: 3.50,
      name: 'HEC Paris', titre: 'Sustainability Report 2024', pages: '52 p.',
      leg_cov: "Couverture sobre, photo campus + titre épuré",
      leg_i1:  "Page « Audited Carbon Footprint » : signature AFNOR Certification",
      leg_i2:  "Page recherche : 20% des publications portent sur la durabilité",
      forme_plus: [
        "Format propre, lecture confortable, hiérarchie typographique soignée",
        "Mise en avant visuelle de l'audit AFNOR du bilan carbone",
      ],
      forme_moins: [
        "Très institutionnel, peu de mise en récit",
        "Peu de témoignages, peu de photos d'actions de terrain",
        "Données opérationnelles sur le quotidien des campus peu présentes",
      ],
      fond_plus: [
        "Bilan carbone audité par AFNOR Certification (rare et fort)",
        "20% de la recherche porte sur la durabilité (chiffre fort)",
      ],
      fond_moins: [
        "Couverture des 5 axes correcte sans aller au bout sur chacun",
        "Engagement étudiant peu détaillé",
      ],
      idees: [
        { titre: "Faire auditer notre bilan carbone par un tiers",
          pourquoi: "C'est le signal de fiabilité le plus puissant. Pour 25 498 tCO2e, ça crédibilise tout le rapport.",
          comment: "Choisir un prestataire (AFNOR / EY / Bureau Veritas), coût ~10-15k€, à prévoir en année N-1. Mentionner l'audit en page de chiffres-clés." },
      ],
    },
    {
      key: 'kedge', rank: 13, score: 2.88, forme: 2.50, fond: 3.25,
      name: 'KEDGE BS', titre: 'Rapport DD 2020-2021', pages: '16 p.',
      leg_cov: "Couverture compacte avec rappel des engagements",
      leg_i1:  "Page engagements : 5 axes (Pioneering / Champion / etc.)",
      leg_i2:  "Page KPIs : 150k€ budget, 70 volontaires",
      forme_plus: [
        "Format compact, lecture rapide",
        "Identité visuelle KEDGE bleue/violet cohérente",
      ],
      forme_moins: [
        "Rapport ancien (2020-2021), aspect visuellement daté",
        "Densité d'information faible par page",
      ],
      fond_plus: [
        "KPIs présents (150k€ budget, 70 volontaires)",
      ],
      fond_moins: [
        "Rapport ancien : ne reflète plus les actions récentes",
        "Bilan carbone scope 3 mentionné sans détail",
        "5 ans sans publication : signal négatif",
      ],
      idees: [
        { titre: "Ne pas attendre 4-5 ans entre 2 rapports",
          pourquoi: "Un rapport ancien finit par décrédibiliser l'engagement, même si la démarche existe.",
          comment: "Rythme annuel minimum. Version « light » possible (16 pages) en année creuse avec uniquement l'actualisation des KPIs." },
      ],
    },
    {
      key: 'ad', rank: 14, score: 2.75, forme: 2.50, fond: 3.00,
      name: 'AD Education', titre: 'Rapport ESG 2024', pages: '34 p.',
      leg_cov: "Couverture corporate, codes financiers (gris/bleu)",
      leg_i1:  "Tableau d'indicateurs ESG : KPIs alignés sur normes investisseurs",
      leg_i2:  "Page « engagements » avec icônes ODD",
      forme_plus: [
        "Format A4 sobre, lisibilité sans fioritures",
        "Tableaux d'indicateurs propres, faciles à lire",
      ],
      forme_moins: [
        "Codes très financiers (gris/bleu) qui n'engagent pas le lecteur étudiant/collaborateur",
        "Pas de photos, pas de témoignages, pas de mise en récit",
      ],
      fond_plus: [
        "Indicateurs ESG normés (utile pour partenaires investisseurs)",
      ],
      fond_moins: [
        "Bilan carbone limité aux activités hors France (2 000 tCO2e seulement) : périmètre douteux",
        "Certification « Neutre Carbone » limitée aux scopes 1+2 (méthodologie discutable)",
        "Axes gouvernance et recherche à peine traités",
        "Pas de distinction apprenants/collaborateurs",
      ],
      idees: [
        { titre: "Contre-exemple : éviter le format ESG investisseurs pour un rapport école",
          pourquoi: "Un rapport RSE école s'adresse d'abord à ses apprenants, collaborateurs, alumni, candidats — pas à des analystes financiers.",
          comment: "Privilégier un ton incarné, des photos, des témoignages. Si on a besoin de données ESG, les mettre en annexe technique séparée." },
      ],
    },
    {
      key: 'neoma', rank: 15, score: 2.75, forme: 2.50, fond: 3.00,
      name: 'NEOMA BS', titre: "Rapport d'Engagement TSE 2025", pages: '44 p.',
      leg_cov: "Couverture engageante avec photo apprenants",
      leg_i1:  "Index F/H : 88/100 + 52% étudiantes (chiffres mis en avant)",
      leg_i2:  "Page dispositif VSS : adresse angela@neoma-bs.fr en gros",
      forme_plus: [
        "Adresse VSS « angela@neoma-bs.fr » mise en avant graphiquement (1 page entière)",
        "Photos apprenants en double-page",
      ],
      forme_moins: [
        "Ton très promotionnel",
        "Mise en perspective des difficultés absente",
      ],
      fond_plus: [
        "Index égalité F/H 88, 52% étudiantes",
        "Adresse dédiée pour les signalements VSS : dispositif visible et accessible",
        "Bilan carbone scopes 1-3",
      ],
      fond_moins: [
        "Recherche peu détaillée",
        "Limites et difficultés peu présentes",
      ],
      idees: [
        { titre: "Mettre en place une adresse mail dédiée VSS",
          pourquoi: "Signal de réactivité et de simplicité — le dispositif devient concret pour les apprenants.",
          comment: "Créer une adresse type « stop-vss@igensia.fr » ou similaire, l'afficher sur le site et dans tous les supports apprenants/collaborateurs, communiquer dessus dans le rapport." },
        { titre: "Page dédiée « égalité F/H » avec objectifs chiffrés à 3 ans",
          pourquoi: "Un index qui recule (84→75) doit être suivi d'un plan d'action visible pour reconstruire la confiance.",
          comment: "1 page « Notre plan F/H 2025-2027 » avec 3 indicateurs (recrutement, mobilité interne, écarts de salaire) et objectifs annuels." },
      ],
    },
    {
      key: 'gem', rank: 16, score: 2.62, forme: 1.75, fond: 3.50,
      name: 'Grenoble EM', titre: "Communication sur l'Engagement 2025", pages: '38 p.',
      leg_cov: "Couverture statut Société à Mission, photo campus",
      leg_i1:  "Trajectoire SBTi validée : graphique de réduction GES",
      leg_i2:  "Comité de Mission indépendant : composition + rôle",
      forme_plus: [
        "Graphique de trajectoire SBTi très efficace visuellement",
        "Format sobre mais bien structuré",
      ],
      forme_moins: [
        "Plus institutionnel que graphique",
        "Peu de témoignages incarnés",
      ],
      fond_plus: [
        "Bilan carbone 10 314 tCO2e (-14% vs 2019) avec trajectoire SBTi validée",
        "Comité de Mission indépendant : signal de gouvernance fort",
        "Statut Société à Mission (1ère grande école française, 2021)",
      ],
      fond_moins: [
        "Engagement éditorial qui n'engage pas le lecteur",
      ],
      idees: [
        { titre: "Visualiser la trajectoire de réduction GES sous forme de graphique",
          pourquoi: "Un graphique de trajectoire vaut mille mots. Le lecteur voit où on va.",
          comment: "Courbe avec point de départ (2024 : 25 498 tCO2e), jalons annuels et objectif 2030. Même sans SBTi validée, une trajectoire visuelle a déjà un impact." },
        { titre: "Faire valider notre engagement par un tiers externe reconnu",
          pourquoi: "Crédibilise la démarche au-delà de l'autoproclamation.",
          comment: "Peut-être pas un comité de mission complet (lourd), mais une lettre d'évaluation annuelle par un tiers reconnu (CIRSES, audit externe sur les actions clés)." },
      ],
    },
    {
      key: 'tbs', rank: 17, score: 2.62, forme: 1.75, fond: 3.50,
      name: 'TBS Education', titre: 'Rapport de Société à Mission 2024-2025', pages: '30 p.',
      leg_cov: "Couverture format paysage 16:9 (peu courant)",
      leg_i1:  "Page recherche : 42 publications RSE dans des revues 3-4 étoiles",
      leg_i2:  "Présentation des 4 objectifs statutaires avec indicateurs",
      forme_plus: [
        "Format paysage 16:9 original (lisible à l'écran)",
        "Page de recherche très claire (publications quantifiées)",
      ],
      forme_moins: [
        "Format paysage moins pratique à imprimer",
        "Ton institutionnel, peu de mise en récit",
        "Peu de photos qualitatives",
      ],
      fond_plus: [
        "61% des publications portent sur la RSE, dont 42 dans des revues 3-4 étoiles",
        "4 objectifs statutaires (Société à Mission) suivis avec indicateurs",
        "Comité de Mission documenté",
      ],
      fond_moins: [
        "Environnement campus peu couvert (axes équipements, déchets, biodiversité absents)",
      ],
      idees: [
        { titre: "Valoriser les travaux RSE de nos formateurs (publications, conférences, projets de recherche)",
          pourquoi: "Prouve que notre engagement va au-delà du déclaratif.",
          comment: "Page « Notre matière grise au service de la RSE » avec liste des publications, conférences, projets de recherche en lien (par formateur, par école)." },
      ],
    },
    {
      key: 'insead', rank: 18, score: 2.50, forme: 1.75, fond: 3.25,
      name: 'INSEAD', titre: 'Sustainability Report 2023', pages: '67 p.',
      leg_cov: "Couverture institutionnelle, photo campus + titre",
      leg_i1:  "Page académique : présentation des 35 cas pédagogiques RSE",
      leg_i2:  "Bilan carbone détaillé par campus (graphiques)",
      forme_plus: [
        "Bilan carbone détaillé par campus : transparence sur la dispersion géographique",
        "Section recherche très structurée",
      ],
      forme_moins: [
        "Très papier de recherche : texte dense, peu de visuels, pas de témoignages",
        "67 pages : volume excessif pour un public général",
        "Hiérarchie typographique faible (peu de respirations)",
      ],
      fond_plus: [
        "35 cas pédagogiques + 56 articles RSE : production académique remarquable",
        "Bilan carbone détaillé par campus (Fontainebleau, Singapour, San Francisco)",
      ],
      fond_moins: [
        "Actions concrètes sur les campus peu présentes",
        "Volet social et engagement étudiant en retrait",
        "Ton institutionnel, peu incarné",
      ],
      idees: [
        { titre: "Valoriser la production académique de nos formateurs en lien avec la RSE",
          pourquoi: "Prouve que notre engagement RSE n'est pas que de la communication.",
          comment: "Page « La recherche RSE chez nous » avec liste des publications, interventions, projets de recherche en lien." },
      ],
    },
    {
      key: 'emstras', rank: 19, score: 2.50, forme: 1.50, fond: 3.50,
      name: 'EM Strasbourg BS', titre: 'Rapport RSO 2023 (9e édition)', pages: '38 p.',
      leg_cov: "Couverture austère, mention « 9e Rapport RSO »",
      leg_i1:  "Budget RSO 92k€ : tableau d'évolution sur 4 ans",
      leg_i2:  "DU Leadership Méditation Neurosciences avec Matthieu Ricard (photo)",
      forme_plus: [
        "Tableau d'indicateurs suivis sur 4 années comparatives : trajectoire visible",
        "Mention « 9e Rapport » qui crédibilise l'historique",
      ],
      forme_moins: [
        "Format austère, peu de mise en récit",
        "Peu de photos qualitatives",
      ],
      fond_plus: [
        "Budget RSO publié (92k€) avec son évolution sur 4 ans",
        "Label Diversité AFNOR depuis 2012",
        "CforCSR plateforme e-learning obligatoire pour la diplomation",
        "Originalités : Entomovoria FNEGE, B3V cercles de parole, DU avec Matthieu Ricard",
      ],
      fond_moins: [
        "Bilan carbone propre date de 2010 (trop ancien)",
        "1 seul ETP RSO en baisse",
        "Pas d'objectif GES chiffré",
      ],
      idees: [
        { titre: "Publier le budget RSE avec son évolution sur 4-5 ans",
          pourquoi: "Indicateur de maturité le plus parlant pour des lecteurs externes (candidats, partenaires).",
          comment: "Tableau simple : budget total / ETP dédiés / part du budget global. Sur 4 ans glissants, mise à jour annuelle." },
        { titre: "Suivre 10-12 indicateurs RSE sur plusieurs années (vue trajectoire)",
          pourquoi: "Un rapport sans historique sur 3-4 ans reste un état des lieux, pas une démarche.",
          comment: "Choisir 10-12 KPIs stables et les republier chaque année (même si évolution faible). Construire un tableau d'évolution pluriannuel." },
      ],
    },
    {
      key: 'psb', rank: 20, score: 2.25, forme: 1.75, fond: 2.75,
      name: 'PSB Paris School of Business', titre: 'Sustainable Development Progress Report 2023-2024', pages: '19 p.',
      leg_cov: "Couverture en anglais, sobre",
      leg_i1:  "Page Sulitest : 50%+ des étudiants français qui passent le test",
      leg_i2:  "Page « Label STAR » (interne PSB)",
      forme_plus: [
        "Format compact (19 p.)",
      ],
      forme_moins: [
        "Rapport en anglais uniquement (ferme une partie du public francophone)",
        "Mise en page peu engageante, tableau ODD générique",
        "Pas de photos qualitatives",
      ],
      fond_plus: [
        "Sulitest massif : 50%+ des étudiants français qui passent ce test",
        "Fresque du Climat 100% B3+M2 depuis 3 ans (continuité)",
        "Projets humanitaires long-cours : Nosy Komba (10 ans), Guria en Inde",
      ],
      fond_moins: [
        "Bilan carbone non publié",
        "Budget RSE non publié",
        "RSE portée par une professeure (pas un poste de direction)",
        "Tableau ODD générique sans personnalisation",
      ],
      idees: [
        { titre: "Adopter le Sulitest comme indicateur de littératie DD étudiante",
          pourquoi: "Test externe normé, comparable d'une école à l'autre. Donne un score objectif.",
          comment: "Intégrer le Sulitest en L2 (passage obligatoire) et publier le score moyen + taux de réussite dans le rapport." },
      ],
    },
    {
      key: 'cesi', rank: 21, score: 2.50, forme: 0.75, fond: 4.25,
      name: 'CESI', titre: 'Bilan RSE 2023', pages: '57 p.',
      leg_cov: "Couverture sobre, mention « 4 axes / 18 enjeux »",
      leg_i1:  "BEGES 2023 ventilé : 2,1 tCO2e/occupant + plan -20%/3 ans",
      leg_i2:  "Promotion sociale : 75% étudiants non-cadres + 626 étudiants handicap",
      forme_plus: [
        "Structure très lisible : 4 axes / 18 enjeux / plans 1/3/5 ans",
        "BEGES granulaire (2,1 tCO2e par occupant) bien visualisé",
      ],
      forme_moins: [
        "57 pages très textuelles, peu de visuels (manque de respirations)",
        "Aucun témoignage",
        "Format austère qui n'engage pas la lecture",
        "Pas de codification claire entre « réalisé » et « annoncé »",
      ],
      fond_plus: [
        "Périmètre considérable (25 campus, 25 000 étudiants)",
        "BEGES exemplaire : 2,1 tCO2e/occupant + plan transition -20%/3 ans",
        "Promotion sociale forte : 75% étudiants non-cadres, Index F/H 98/100",
        "626 étudiants en situation de handicap accompagnés par 43 référents",
      ],
      fond_moins: [
        "Beaucoup d'actions encore annoncées plutôt que déployées (charte achats, charte numérique, alimentation, DD&RS)",
        "Forme/Fond très déséquilibrés : contenu solide noyé dans une présentation austère",
      ],
      idees: [
        { titre: "Publier le BEGES en tCO2e par occupant (apprenant + collaborateur)",
          pourquoi: "Permet la comparaison entre établissements de tailles différentes. CESI : 2,1 tCO2e/occupant.",
          comment: "1 ratio en infographie de tête de page environnement. Pour IGENSIA : 25 498 / nb total d'occupants. Et l'utiliser comme indicateur de pilotage." },
        { titre: "Contre-exemple à retenir : un contenu solide ne suffit pas, la forme est décisive",
          pourquoi: "CESI a 4.25/5 en Fond mais 0.75/5 en Forme — note finale 2.50. Si on produit un excellent contenu sans soin éditorial, on perd la moitié de l'impact.",
          comment: "Investir autant en rédaction que en design. Prévoir un budget graphisme/illustrations dès le début du projet." },
      ],
    },
  ],
  synthese: [
    { num: '01', titre: "Publier le budget RSE consolidé avec son évolution",
      desc: "Source : OMNES (310k€ depuis 2020), EM Strasbourg (92k€ sur 4 ans). Un chiffre absolu vaut mieux qu'un nombre d'ETP." },
    { num: '02', titre: "Construire un tableau comparatif annuel des 12-15 KPIs",
      desc: "Source : Audencia (15 indicateurs comparés 2024/2025 en 1 page). Transforme un état des lieux en trajectoire." },
    { num: '03', titre: "Faire auditer notre bilan carbone par un tiers",
      desc: "Source : HEC (audit AFNOR), GEM (trajectoire SBTi). Crédibilise notre chiffre 25 498 tCO2e. Coût ~10-15k€ à prévoir." },
    { num: '04', titre: "Imposer une charte DD aux associations + évaluer la compétence RSE des apprenants",
      desc: "Source : EFREI (charte avec audit carbone des événements + bloc compétences validé par examen). Engage la communauté étudiante." },
    { num: '05', titre: "Intégrer 4-6 témoignages incarnés (apprenants, collaborateurs, partenaires)",
      desc: "Source : HEC, EMLYON, BSB. Humanise le rapport et matérialise nos engagements par des « preuves de vie »." },
  ],
};
