/* ==============================
   Benchmark RSE — IGENSIA Education
   ============================== */

const D = BENCHMARK_DATA;
let currentTab = 'grille';
let searchTerm = '';
let selectedFocusSchool = null;
let justifFilterCrit = '';     // numéro de critère (string) ou '' pour tous
let justifFilterVerdict = '';  // 'OUI' / 'PARTIEL' / 'NON' / '' pour tous

// --- LocalStorage ---
function loadSaved() {
  try { return JSON.parse(localStorage.getItem('benchmarkRSE_notes') || '{}'); } catch { return {}; }
}
function saveToDisk(data) {
  localStorage.setItem('benchmarkRSE_notes', JSON.stringify(data));
}
function getSavedNotes(schoolName) {
  const all = loadSaved();
  return all[schoolName] || { blanche: { forme: '', fond: '' }, sylvain: { forme: '', fond: '' }, comment: '' };
}
function setSavedNotes(schoolName, notes) {
  const all = loadSaved();
  all[schoolName] = notes;
  saveToDisk(all);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  // Merge saved notes into focus data
  D.focus.forEach(f => {
    const saved = getSavedNotes(f.name);
    if (saved.blanche && saved.blanche.forme !== '') f.notes.blanche.forme = saved.blanche.forme;
    if (saved.blanche && saved.blanche.fond !== '') f.notes.blanche.fond = saved.blanche.fond;
    if (saved.sylvain && saved.sylvain.forme !== '') f.notes.sylvain.forme = saved.sylvain.forme;
    if (saved.sylvain && saved.sylvain.fond !== '') f.notes.sylvain.fond = saved.sylvain.fond;
    // Commentaire : toujours servi depuis data.js (source de vérité), pas écrasé par localStorage
  });

  setupTabs();
  setupSearch();
  setupJustifFilter();
  renderAll();
});

function setupJustifFilter() {
  const select = document.getElementById('justifCritSelect');
  if (!select) return;
  // Peuple le sélecteur avec tous les critères
  D.criteria.forEach(c => {
    const opt = document.createElement('option');
    opt.value = String(c.col);
    opt.textContent = `C${c.col} — ${c.name}`;
    select.appendChild(opt);
  });
  select.addEventListener('change', e => {
    justifFilterCrit = e.target.value;
    // Affiche/masque les boutons verdict selon mode
    const vfilter = document.getElementById('justifVerdictFilter');
    if (vfilter) vfilter.style.display = justifFilterCrit ? '' : 'none';
    if (!justifFilterCrit) justifFilterVerdict = '';
    renderJustifications();
  });
  document.querySelectorAll('.verdict-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.verdict-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      justifFilterVerdict = btn.dataset.verdict;
      renderJustifications();
    });
  });
}

function setupTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      document.getElementById('tab-' + currentTab).classList.add('active');
      // Show stats banner only on grille/justifications/radar
      const banner = document.getElementById('statsBanner');
      if (banner) banner.style.display = ['grille','justifications','radar'].includes(currentTab) ? '' : 'none';
    });
  });
}

function setupSearch() {
  document.getElementById('searchInput').addEventListener('input', e => {
    searchTerm = e.target.value.toLowerCase().trim();
    renderAll();
  });
}

function renderAll() {
  renderStats();
  renderGrille();
  renderJustifications();
  renderRadar();
  renderFocus();
  renderPresentation();
}

// ===== TAB PRESENTATION : synthèse benchmark rapports RSE =====
function renderPresentation() {
  const root = document.getElementById('presentationRoot');
  if (!root || typeof PRESENTATION_DATA === 'undefined') return;
  const data = PRESENTATION_DATA;

  let html = `
    <div class="pres-hero">
      <h1>Benchmark Rapports RSE</h1>
      <p class="pres-hero-sub">Analyse de ${data.meta.nb_rapports} rapports concurrents — Forme + Fond + idées concrètes à transposer chez IGENSIA</p>
      <p class="pres-hero-method">${escapeHTML(data.meta.methodo)}</p>
    </div>

    ${renderIgensiaReference()}

    <div class="pres-jump">
      <strong>Aller à :</strong>
      <a href="#pres-igensia-ref" class="pres-jump-link pres-jump-ref">★ Notre rapport</a>
      ${data.rapports.map(r => `<a href="#pres-${r.key}" class="pres-jump-link">#${r.rank} ${escapeHTML(r.name)}</a>`).join('')}
      <a href="#pres-synthese" class="pres-jump-link pres-jump-synthese">★ Synthèse</a>
    </div>
  `;

  data.rapports.forEach(r => {
    html += renderRapportCard(r);
  });

  // Synthèse finale
  html += `
    <section id="pres-synthese" class="pres-synthese">
      <h2>Cinq idées prioritaires pour notre prochain rapport</h2>
      <div class="pres-synthese-grid">
        ${data.synthese.map(s => `
          <div class="pres-synthese-card">
            <div class="pres-synthese-num">${s.num}</div>
            <h3>${escapeHTML(s.titre)}</h3>
            <p>${escapeHTML(s.desc)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  root.innerHTML = html;

  // Click image -> lightbox
  root.querySelectorAll('.pres-img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });
}

function renderIgensiaReference() {
  return `
    <section id="pres-igensia-ref" class="pres-reference">
      <header class="pres-ref-head">
        <div class="pres-ref-label">★ Notre point de départ</div>
        <h2>Rapport RSE Groupe IGENSIA Education 2024-2025</h2>
        <p class="pres-ref-sub">48 pages — 1<sup>er</sup> rapport RSE publié par le Groupe</p>
      </header>

      <div class="pres-images">
        <figure class="pres-fig">
          <img class="pres-img" src="presentation/images/igensia.jpg" alt="Couverture du rapport" loading="lazy">
          <figcaption>◆ Couverture (p.1) — identité visuelle violet + rose, 4 campus mis en avant</figcaption>
        </figure>
        <figure class="pres-fig">
          <img class="pres-img" src="presentation/images/igensia_inner1.jpg" alt="Timeline 2023-2025" loading="lazy">
          <figcaption>◆ Timeline « Ce que nous avons accompli » (p.9) — codification 4 couleurs (Formation collabs / Formation apprenants / Label LUCIE / Gouvernance)</figcaption>
        </figure>
        <figure class="pres-fig">
          <img class="pres-img" src="presentation/images/igensia_inner2.jpg" alt="ODD et labellisation LUCIE 26000" loading="lazy">
          <figcaption>◆ Démarche guidée par les 17 ODD + Labellisation LUCIE 26000 (p.11)</figcaption>
        </figure>
      </div>

      <div class="pres-analysis">
        <div class="pres-block pres-forme">
          <h3>Ce qui marche</h3>
          <h4 class="pres-pos">✓ Forme</h4>
          <ul>
            <li>Codification « C'EST RÉALISÉ / C'EST LANCÉ / C'EST PRÉVU » : structurante, rare dans le benchmark</li>
            <li>Photos qualitatives en pleine page, schémas et illustrations soignés <em>— à maintenir et consolider</em></li>
            <li>8 témoignages incarnés (étudiant, collaborateurs, directeurs, partenaires) <em>— à maintenir et consolider</em></li>
            <li>Structure mémorisable : 4 grandes parties Apprenants / Collaborateurs / Campus / Partenaires</li>
          </ul>
          <h4 class="pres-pos" style="margin-top:14px;">✓ Fond</h4>
          <ul>
            <li>Bilan Carbone détaillé</li>
            <li>Mots DG + Directrice DD : double signature gouvernance</li>
            <li>Gouvernance RSE structurée : 3 niveaux + 17 pilotes nommés</li>
            <li>Label LUCIE 26000 + ancrage ODD : tiers externes crédibilisants</li>
            <li>Section « C'EST PRÉVU » avec objectifs datés (rentrée 2027 : 90% apprenants 1A/2A/3A formés)</li>
          </ul>
        </div>

        <div class="pres-block pres-fond">
          <h3>Ce qu'on peut améliorer</h3>
          <h4 class="pres-neg">✗ Forme</h4>
          <ul>
            <li><strong>Label LUCIE 26000 pas suffisamment visible sur la page de garde</strong> — argument d'autorité fort à exposer dès la couverture</li>
            <li><strong>Pas de schéma directeur RSE 5 axes visible en début de rapport</strong> — le lecteur doit avoir une vue d'ensemble avant d'entrer dans le détail</li>
          </ul>
          <h4 class="pres-neg" style="margin-top:14px;">✗ Fond</h4>
          <ul>
            <li><strong>Pas de budget RSE publié</strong> en chiffre absolu</li>
            <li><strong>Pas de tableau récapitulatif</strong> d'indicateurs N / N-1 (vue trajectoire)</li>
            <li><strong>ODD pas explicitement connectés à nos actions</strong> — mentionnés en cadre général (p.11) mais pas mis en lien direct avec chacune des actions du rapport</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}

function renderRapportCard(r) {
  const imgDir = 'presentation/images';
  const imgs = [
    { src: `${imgDir}/${r.key}.jpg`, leg: r.leg_cov },
    { src: `${imgDir}/${r.key}_inner1.jpg`, leg: r.leg_i1 },
    { src: `${imgDir}/${r.key}_inner2.jpg`, leg: r.leg_i2 },
  ];
  return `
    <section id="pres-${r.key}" class="pres-rapport">
      <header class="pres-rapport-head">
        <div class="pres-rank">#${r.rank}</div>
        <div class="pres-titre">
          <h2>${escapeHTML(r.name)}</h2>
          <p class="pres-sub">${escapeHTML(r.titre)} • ${escapeHTML(r.pages)} • Forme ${r.forme.toFixed(2)} • Fond ${r.fond.toFixed(2)} • Note ${r.score.toFixed(2)}/5</p>
        </div>
      </header>

      <div class="pres-images">
        ${imgs.map((im, i) => `
          <figure class="pres-fig">
            <img class="pres-img" src="${im.src}" alt="${escapeHTML(im.leg)}" loading="lazy">
            <figcaption>◆ ${escapeHTML(im.leg)}</figcaption>
          </figure>
        `).join('')}
      </div>

      <div class="pres-analysis">
        <div class="pres-block pres-forme">
          <h3>Forme</h3>
          <h4 class="pres-pos">✓ Points forts</h4>
          <ul>${r.forme_plus.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>
          <h4 class="pres-neg">✗ Points faibles</h4>
          <ul>${r.forme_moins.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>
        </div>

        <div class="pres-block pres-fond">
          <h3>Fond</h3>
          <h4 class="pres-pos">✓ Points forts</h4>
          <ul>${r.fond_plus.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>
          <h4 class="pres-neg">✗ Points faibles</h4>
          <ul>${r.fond_moins.map(x => `<li>${escapeHTML(x)}</li>`).join('')}</ul>
        </div>

        <div class="pres-block pres-idees">
          <h3>★ Idées pour IGENSIA</h3>
          ${r.idees.map(i => `
            <div class="pres-idee">
              <h4>▸ ${escapeHTML(i.titre)}</h4>
              <p><strong>Pourquoi :</strong> ${escapeHTML(i.pourquoi)}</p>
              <p><strong>Comment :</strong> ${escapeHTML(i.comment)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function openLightbox(src, alt) {
  const lb = document.getElementById('imgLightbox');
  const img = document.getElementById('imgLightboxImg');
  if (!lb || !img) return;
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
}

function extractLabels(school, idx) {
  const justif = D.justifications[idx];
  if (!justif) return { labels: [], pacte: false, sam: false };
  const labelText = justif.justifs['4'] || '';
  const allText = Object.values(justif.justifs).join(' ');
  const labels = [];
  // Only show specific labels if grille=OUI
  if (school.verdicts['4'] === 'OUI') {
    if (/lucie/i.test(labelText)) labels.push('LUCIE');
    if (/label\s+dd.?rs|dd&rs.*obtenu|dd&rs.*renouvel|obtenu.*dd&rs|label.*ddrs/i.test(labelText)) labels.push('DD&RS');
    if (/ecovadis/i.test(labelText)) labels.push('EcoVadis');
    if (/iso.?14001/i.test(labelText)) labels.push('ISO 14001');
  }
  // Pacte Mondial / Global Compact — PRME implique le Pacte Mondial
  const pacte = /pacte mondial|global compact|prme|principles.*responsible/i.test(labelText);
  // Societe a Mission (search all justifs)
  const sam = /soci.t..{0,3}mission/i.test(allText) && /statut|depuis|obtenu|devenu/i.test(allText);
  return { labels, pacte, sam };
}

function renderStats() {
  const total = D.grille.length;
  let labelled = 0, pacte = 0, sam = 0;
  let ddrs = 0, lucie = 0, ecovadis = 0, otherLabel = 0;
  D.grille.forEach((s, i) => {
    if (s.verdicts['4'] === 'OUI') {
      labelled++;
      const info = extractLabels(s, i);
      if (info.labels.includes('DD&RS')) ddrs++;
      if (info.labels.includes('LUCIE')) lucie++;
      else if (info.labels.includes('EcoVadis')) ecovadis++;
      else otherLabel++;
    }
    const info = extractLabels(s, i);
    if (info.pacte) pacte++;
    if (info.sam) sam++;
  });
  const rapportAnalyses = D.focus.length;

  // Score moyen par axe (écoles remplies seulement)
  const axesDef = [
    { name: 'Gouvernance', cols: [1,2,3,4,5,6,7], color: '#260D66' },
    { name: 'Parties prenantes', cols: [8,9,10,11,14,15,16,17], color: '#E60F7D' },
    { name: 'Environnement', cols: [18,19,20,21,22,23,24,27,28,29], color: '#00B050' },
    { name: 'Qualité de vie', cols: [12,13,25,26,30], color: '#00B0F0' },
    { name: 'Utilité sociétale', cols: [31,32,33,34,35,36], color: '#C49476' },
  ];
  const filledSchools = D.grille.filter(s => s.score > 0);
  const axeAvgs = axesDef.map(ax => {
    let totalPts = 0, totalMax = 0;
    filledSchools.forEach(s => {
      ax.cols.forEach(c => {
        const v = s.verdicts[String(c)] || '';
        if (v === 'OUI') totalPts += 1;
        else if (v === 'PARTIEL') totalPts += 0.5;
        totalMax += 1;
      });
    });
    return { name: ax.name, color: ax.color, pct: totalMax > 0 ? Math.round(totalPts * 100 / totalMax) : 0 };
  });
  const el = document.getElementById('statsBanner');
  if (!el) return;

  el.innerHTML = `
    <div class="stat-card">
      <div class="stat-num">${total}</div>
      <div class="stat-label">${total - 6} écoles et 6 groupes analysés</div>
    </div>
    <div class="stat-card stat-card-labels">
      <div class="stat-num">${labelled}<span class="stat-num-small">/${total}</span></div>
      <div class="stat-label">Labellisées RSE</div>
      <div class="stat-bar"><div class="stat-bar-fill" style="width:${labelled*100/total}%"></div></div>
      <div class="stat-pills-row">
        <span class="stat-pill pill-ddrs">DD&RS <strong>${ddrs}</strong></span>
        <span class="stat-pill pill-lucie">LUCIE <strong>${lucie}</strong></span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${rapportAnalyses}<span class="stat-num-small">/${total}</span></div>
      <div class="stat-label">Rapports RSE analysés</div>
      <div class="stat-bar"><div class="stat-bar-fill" style="width:${rapportAnalyses*100/total}%"></div></div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${pacte}<span class="stat-num-small">/${total}</span></div>
      <div class="stat-label">Pacte Mondial / PRME</div>
      <div class="stat-bar"><div class="stat-bar-fill" style="width:${pacte*100/total}%"></div></div>
    </div>
    <div class="stat-card">
      <div class="stat-num">${sam}<span class="stat-num-small">/${total}</span></div>
      <div class="stat-label">Société à Mission</div>
      <div class="stat-bar"><div class="stat-bar-fill" style="width:${sam*100/total}%"></div></div>
    </div>
  `;
}

// --- Helpers ---
function scoreClass(score) {
  if (score >= 33) return 'score-avance';
  if (score >= 27) return 'score-confirme';
  if (score >= 21) return 'score-correct';
  return 'score-insuffisant';
}

function getCatName(letter) {
  const names = {
    '1': 'Gouvernance Responsable',
    '2': 'Parties Prenantes',
    '3': 'Impact Environnemental',
    '4': 'Qualit\u00e9 de Vie & \u00c9galit\u00e9',
    '5': 'Utilit\u00e9 Soci\u00e9tale'
  };
  return names[letter] || letter;
}

function badgeHTML(v) {
  const val = v.toUpperCase();
  if (val === 'OUI') return '<span class="badge oui">OUI</span>';
  if (val === 'PARTIEL') return '<span class="badge partiel">PARTIEL</span>';
  if (val === 'NON') return '<span class="badge non">NON</span>';
  return v;
}

function isIgensia(name) {
  return name.toUpperCase().includes('IGENSIA');
}

// Distingue les 6 groupes consolidés des écoles : (Groupe) ou (Groupe — auto-éval.)
// Pas (Groupe Galileo), (Groupe OMNES), (Groupe Planeta) qui sont des écoles rattachées
function isConsolidatedGroup(name) {
  return /\(Groupe\)|\(Groupe\s+—/.test(name);
}

function matchesSearch(name) {
  if (!searchTerm) return true;
  return name.toLowerCase().includes(searchTerm);
}

function calcFinalNote(notes) {
  const vals = [];
  const parse = v => { const n = parseFloat(v); return (!isNaN(n) && n >= 0 && n <= 5) ? n : null; };
  const bf = parse(notes.blanche?.forme);
  const bb = parse(notes.blanche?.fond);
  const sf = parse(notes.sylvain?.forme);
  const sb = parse(notes.sylvain?.fond);
  if (bf !== null) vals.push(bf);
  if (bb !== null) vals.push(bb);
  if (sf !== null) vals.push(sf);
  if (sb !== null) vals.push(sb);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

// =============================
// TAB 1: GRILLE
// =============================
function renderGrille() {
  const igensia = D.grille.filter(s => isIgensia(s.name));
  const others = [...D.grille].filter(s => !isIgensia(s.name)).sort((a, b) => b.score - a.score);
  const sorted = [...igensia, ...others];
  const filtered = sorted.filter(s => matchesSearch(s.name));

  // Compute ranks (others only, IGENSIA = ★)
  let rank = 0;
  const rankMap = {};
  others.forEach(s => { rank++; rankMap[s.name] = rank; });

  // Build category header row — SCORE en 1ère colonne, puis ÉCOLE, puis critères
  let catRow = '<tr><th class="cat-header score-col score-col-left" rowspan="2">SCORE</th>';
  catRow += '<th class="school-col cat-header" rowspan="2" style="background:#E60F7D;">ÉCOLE / GROUPE</th>';
  const catRanges = [
    { name: 'GOUVERNANCE RESPONSABLE', cols: [1,2,3,4,5,6,7], color: '#260D66' },
    { name: 'ENGAGER NOS PARTIES PRENANTES', cols: [8,9,10,11,14,15,16,17], color: '#E60F7D' },
    { name: 'R\u00c9DUIRE NOTRE IMPACT ENVIRONNEMENTAL', cols: [18,19,20,21,22,23,24,27,28,29], color: '#00B050' },
    { name: 'QUALIT\u00c9 DE VIE & \u00c9GALIT\u00c9 DES CHANCES', cols: [12,13,25,26,30], color: '#00B0F0' },
    { name: 'UTILIT\u00c9 POUR LA SOCI\u00c9T\u00c9 & TERRITOIRES', cols: [31,32,33,34,35,36], color: '#C49476' },
  ];
  catRanges.forEach(c => {
    catRow += `<th class="cat-header" colspan="${c.cols.length}" style="background:${c.color}">${c.name}</th>`;
  });
  catRow += '</tr>';

  // Build column order from catRanges
  const colOrder = catRanges.flatMap(c => c.cols);

  // Build color map: col -> lighter version of axis color
  const colColorMap = {};
  const lighterColors = {
    '#260D66': '#3D1A8F',
    '#E60F7D': '#F04090',
    '#00B050': '#00CC5C',
    '#00B0F0': '#33C0F5',
    '#C49476': '#D4A88E',
  };
  catRanges.forEach(c => {
    c.cols.forEach(col => { colColorMap[col] = lighterColors[c.color] || c.color; });
  });

  // Build criteria header row
  let critRow = '<tr>';
  colOrder.forEach(col => {
    const c = D.criteria[col - 1];
    const bg = colColorMap[col] || 'var(--primary)';
    if (c) {
      const tip = c.definition ? `${c.name}\n\n${c.definition}\n\nOUI : ${c.seuils?.oui || ''}\nPARTIEL : ${c.seuils?.partiel || ''}\nNON : ${c.seuils?.non || ''}` : c.name;
      critRow += `<th title="${tip}" style="background:${bg}">${c.name}</th>`;
    }
  });
  critRow += '</tr>';

  document.getElementById('grilleHead').innerHTML = catRow + critRow;

  // Fix sticky tops dynamically after render
  requestAnimationFrame(() => {
    const thead = document.querySelector('#grilleTable thead');
    if (thead) {
      const row1 = thead.querySelector('tr:first-child');
      const row1H = row1 ? row1.offsetHeight : 35;
      const row2H = thead.querySelector('tr:nth-child(2)') ? thead.querySelector('tr:nth-child(2)').offsetHeight : 35;
      thead.querySelectorAll('tr:nth-child(2) th').forEach(th => { th.style.top = row1H + 'px'; });
      document.querySelectorAll('tr.igensia-row td').forEach(td => { td.style.top = (row1H + row2H) + 'px'; });
    }
  });

  // Build body
  let body = '';
  filtered.forEach(s => {
    const ig = isIgensia(s.name);
    body += `<tr class="${ig ? 'igensia-row' : ''}">`;
    const grilleIdx = D.grille.indexOf(s);
    const labelInfo = extractLabels(s, grilleIdx);
    let pills = '';
    labelInfo.labels.forEach(l => {
      const cls = l === 'DD&RS' ? 'pill-ddrs' : l === 'LUCIE' ? 'pill-lucie' : l === 'EcoVadis' ? 'pill-ecovadis' : l.includes('ISO') ? 'pill-iso' : l === 'Label RSE' ? 'pill-ddrs' : 'pill-bcorp';
      pills += `<span class="label-pill ${cls}">${l}</span>`;
    });
    if (labelInfo.sam) pills += `<span class="label-pill pill-sam">Soci\u00e9t\u00e9 \u00e0 Mission</span>`;
    if (labelInfo.pacte) pills += `<span class="label-pill pill-pacte">Pacte Mondial</span>`;
    const rankLabel = ig ? '\u2605' : (rankMap[s.name] ? '#' + rankMap[s.name] : '');
    body += `<td class="score-cell score-cell-left ${scoreClass(s.score)}"><div class="score-num">${s.score}</div><div class="score-rank">${rankLabel}</div></td>`;
    body += `<td class="school-cell ${ig ? 'igensia' : ''}">${s.name.replace(/\n/g, ' ')}${pills ? '<div class="school-labels">' + pills + '</div>' : ''}</td>`;
    colOrder.forEach(j => {
      const v = s.verdicts[j] || '';
      body += `<td>${badgeHTML(v)}</td>`;
    });
    body += '</tr>';
  });
  document.getElementById('grilleBody').innerHTML = body;
}

// =============================
// TAB 2: JUSTIFICATIONS
// =============================
function renderJustifications() {
  const scoreMap = {};
  D.grille.forEach(g => { scoreMap[g.name] = g.score; });
  const igensiaJ = D.justifications.filter(s => isIgensia(s.name));
  const othersJ = [...D.justifications].filter(s => !isIgensia(s.name))
    .sort((a, b) => (scoreMap[b.name] || 0) - (scoreMap[a.name] || 0));
  const sorted = [...igensiaJ, ...othersJ];

  // Build rank map
  const rankMapJ = {};
  let rankJ = 0;
  othersJ.forEach(s => { rankJ++; rankMapJ[s.name] = rankJ; });

  const filtered = sorted.filter(s => matchesSearch(s.name));
  const container = document.getElementById('justifList');
  container.innerHTML = '';

  // ===== MODE FILTR\u00c9 : un seul crit\u00e8re affich\u00e9 pour toutes les \u00e9coles =====
  if (justifFilterCrit) {
    const crit = D.criteria.find(c => String(c.col) === String(justifFilterCrit));
    if (!crit) return;

    // R\u00e9cup\u00e8re verdict + justif par \u00e9cole pour ce crit\u00e8re
    const rows = filtered.map(s => {
      const grilleEntry = D.grille.find(g => g.name === s.name);
      const verdict = (grilleEntry && grilleEntry.verdicts && grilleEntry.verdicts[String(crit.col)]) ? grilleEntry.verdicts[String(crit.col)].toUpperCase() : '';
      const justif = s.justifs[String(crit.col)] || '';
      const score = scoreMap[s.name] || 0;
      const ig = isIgensia(s.name);
      const rankLabel = ig ? '\u2605' : (rankMapJ[s.name] ? '#' + rankMapJ[s.name] : '');
      return { name: s.name, verdict: verdict, justif: justif, score: score, ig: ig, rankLabel: rankLabel };
    }).filter(r => {
      if (!justifFilterVerdict) return true;
      return r.verdict === justifFilterVerdict;
    });

    // Compteurs par verdict, s\u00e9par\u00e9s \u00e9coles / groupes consolid\u00e9s
    const counts = {
      OUI: { ecoles: 0, groupes: 0 },
      PARTIEL: { ecoles: 0, groupes: 0 },
      NON: { ecoles: 0, groupes: 0 },
    };
    filtered.forEach(s => {
      const ge = D.grille.find(g => g.name === s.name);
      const v = (ge && ge.verdicts && ge.verdicts[String(crit.col)]) ? ge.verdicts[String(crit.col)].toUpperCase() : '';
      if (counts[v]) {
        if (isConsolidatedGroup(s.name)) counts[v].groupes++;
        else counts[v].ecoles++;
      }
    });
    const fmtCount = c => `<strong>${c.ecoles + c.groupes}</strong> <small>(${c.ecoles} \u00e9cole${c.ecoles > 1 ? 's' : ''} + ${c.groupes} groupe${c.groupes > 1 ? 's' : ''})</small>`;

    // En-t\u00eate crit\u00e8re
    const header = document.createElement('div');
    header.className = 'justif-filter-header';
    const seuilsHTML = crit.seuils ? `<div class="filter-header-seuils">
        <div><span class="badge oui">OUI</span> ${escapeHTML(crit.seuils.oui || '')}</div>
        <div><span class="badge partiel">PARTIEL</span> ${escapeHTML(crit.seuils.partiel || '')}</div>
        <div><span class="badge non">NON</span> ${escapeHTML(crit.seuils.non || '')}</div>
      </div>` : '';
    header.innerHTML = `
      <div class="filter-header-top">
        <span class="filter-header-num">C${crit.col}</span>
        <span class="filter-header-name">${escapeHTML(crit.name)}</span>
      </div>
      ${crit.definition ? '<div class="filter-header-def">' + escapeHTML(crit.definition) + '</div>' : ''}
      ${seuilsHTML}
      <div class="filter-header-counts">
        <span class="count-pill count-oui">OUI : ${fmtCount(counts.OUI)}</span>
        <span class="count-pill count-partiel">PARTIEL : ${fmtCount(counts.PARTIEL)}</span>
        <span class="count-pill count-non">NON : ${fmtCount(counts.NON)}</span>
      </div>
    `;
    container.appendChild(header);

    // Affiche par groupe verdict (OUI puis PARTIEL puis NON)
    const groupOrder = ['OUI', 'PARTIEL', 'NON'];
    groupOrder.forEach(g => {
      const groupRows = rows.filter(r => r.verdict === g);
      if (groupRows.length === 0) return;
      const nbEcoles = groupRows.filter(r => !isConsolidatedGroup(r.name)).length;
      const nbGroupes = groupRows.filter(r => isConsolidatedGroup(r.name)).length;
      const detail = nbEcoles + ' \u00e9cole' + (nbEcoles > 1 ? 's' : '') + ' + ' + nbGroupes + ' groupe' + (nbGroupes > 1 ? 's' : '');
      const groupDiv = document.createElement('div');
      groupDiv.className = 'justif-filter-group-block group-' + g.toLowerCase();
      groupDiv.innerHTML = '<div class="group-block-title">' + badgeHTML(g) + ' <span class="group-count">' + groupRows.length + ' entr\u00e9es <em>(' + detail + ')</em></span></div>';
      groupRows.forEach(r => {
        const item = document.createElement('div');
        item.className = 'justif-filter-item' + (r.ig ? ' is-igensia' : '');
        item.innerHTML = `
          <div class="filter-item-head">
            <span class="filter-item-rank">${r.rankLabel}</span>
            <span class="filter-item-name">${r.name.replace(/\n/g, ' ')}</span>
            <span class="filter-item-score score-tag ${scoreClass(r.score)}">${r.score}/36</span>
          </div>
          <div class="filter-item-body">${r.justif ? formatJustif(r.justif) : '<em>Justification non disponible.</em>'}</div>
        `;
        groupDiv.appendChild(item);
      });
      container.appendChild(groupDiv);
    });

    if (rows.length === 0) {
      container.insertAdjacentHTML('beforeend', '<div class="placeholder-msg">Aucune \u00e9cole ne correspond aux filtres actuels.</div>');
    }
    return;
  }

  // ===== MODE NORMAL : carte par \u00e9cole =====
  filtered.forEach((s, idx) => {
    const score = scoreMap[s.name] || 0;
    const ig = isIgensia(s.name);
    const rankLabel = ig ? '\u2605' : (rankMapJ[s.name] ? '#' + rankMapJ[s.name] : '');
    const card = document.createElement('div');
    card.className = 'justif-card';

    let critHTML = '';
    D.criteria.forEach((c, i) => {
      const justif = s.justifs[String(c.col)] || '';
      if (!justif) return;
      const verdict = justif.split(' ')[0].replace('—', '').replace('\u2014', '').trim();
      critHTML += `
        <div class="justif-criterion">
          <div class="crit-header">
            ${badgeHTML(verdict)}
            <span class="crit-cat">${getCatName(c.category)}</span>
            <span class="crit-name">${c.name}</span>
          </div>
          ${c.definition ? `<div class="crit-definition">${escapeHTML(c.definition)}</div>` : ''}
          <div class="justif-text">${formatJustif(justif)}</div>
        </div>`;
    });

    card.innerHTML = `
      <div class="justif-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="school-name">${s.name.replace(/\n/g, ' ')}</span>
        <span class="score-tag ${scoreClass(score)}">${score}/36<br><small style="opacity:0.8">${rankLabel}</small></span>
        <span class="arrow">&#9662;</span>
      </div>
      <div class="justif-body">
        ${critHTML}
        ${s.sources ? `<div class="sources-box"><div class="sources-title">Sources consultées</div><div class="sources-list">${s.sources.split('\n').filter(l => l.trim()).map(l => {
          const trimmed = l.trim();
          if (trimmed.startsWith('http')) return '<a href="' + trimmed + '" target="_blank" rel="noopener">' + trimmed.replace(/^https?:\/\//, '').substring(0, 60) + (trimmed.length > 70 ? '...' : '') + '</a>';
          return '<span>' + trimmed + '</span>';
        }).join('')}</div></div>` : ''}
      </div>`;
    container.appendChild(card);
  });
}

function escapeHTML(str) {
  const urlRegex = /(https?:\/\/[^\s<>,;)\]]+)/g;
  let escaped = str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  escaped = escaped.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  return escaped;
}

function formatComment(str) {
  if (!str) return '<em class="comment-empty">Pas de commentaire pour ce rapport.</em>';
  let text = escapeHTML(str);
  // Sauts de ligne -> paragraphes
  text = text.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>');
  return '<p>' + text + '</p>';
}

function formatJustif(str) {
  let text = escapeHTML(str);
  // Markdown gras : **texte** -> <strong>texte</strong>
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Bold verdict
  text = text.replace(/^(OUI|NON|PARTIEL)\s*[\u2014\u2013\u2212—-]\s*/, '<strong>$1</strong> \u2014 ');
  // Remove "Général :" header (content follows directly after verdict)
  text = text.replace(/\n*G\u00e9n\u00e9ral\s*:\n*/gi, '\n');
  // Bold section headers: Apprenants, Collaborateurs
  text = text.replace(/\n*(Apprenants?\s*:)/gi, '\n\n<strong class="justif-section section-apprenants">$1</strong>');
  text = text.replace(/\n*(Collaborateurs?\s*:)/gi, '\n\n<strong class="justif-section section-collabs">$1</strong>');
  // Also support old format
  text = text.replace(/\n*(Focus apprenants?\s*:)/gi, '\n\n<strong class="justif-section section-apprenants">$1</strong>');
  // Source lines in italic grey
  text = text.replace(/\n*(Source\s*:[^\n]*)/gi, '\n<span class="justif-source">$1</span>');
  return text;
}

// =============================
// TAB 3: FOCUS RAPPORTS RSE
// =============================
function renderFocus() {
  renderFocusRanking();
  if (selectedFocusSchool) {
    renderFocusDetail(selectedFocusSchool);
  } else if (D.focus.length > 0) {
    const ranked = getRankedFocus();
    if (ranked.length > 0) renderFocusDetail(ranked[0].name);
  }
}

function getRankedFocus() {
  const list = D.focus
    .filter(f => matchesSearch(f.name))
    .map(f => {
      const final = calcFinalNote(f.notes);
      return { ...f, finalNote: final };
    })
    .sort((a, b) => {
      if (a.finalNote === null && b.finalNote === null) return 0;
      if (a.finalNote === null) return 1;
      if (b.finalNote === null) return -1;
      return b.finalNote - a.finalNote;
    });
  return list;
}

function renderFocusRanking() {
  const ranked = getRankedFocus();
  const container = document.getElementById('focusRanking');
  container.innerHTML = '';

  ranked.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'ranking-card' + (selectedFocusSchool === f.name ? ' active' : '');
    card.onclick = () => { selectedFocusSchool = f.name; renderFocus(); };

    const bf = parseFloat(f.notes.blanche?.forme) || '';
    const bb = parseFloat(f.notes.blanche?.fond) || '';
    const sf = parseFloat(f.notes.sylvain?.forme) || '';
    const sb = parseFloat(f.notes.sylvain?.fond) || '';
    const final = f.finalNote;

    card.innerHTML = `
      <div class="rank-num ${i < 3 ? 'top3' : ''}">${i + 1}</div>
      <div class="rank-info">
        <div class="rank-name">${f.name.replace(/\n/g, ' ')}</div>
        <div class="rank-score-bar">
          <span class="rank-score-item">B: ${bf || '-'}/${bb || '-'}</span>
          <span class="rank-score-item">S: ${sf || '-'}/${sb || '-'}</span>
        </div>
      </div>
      <div class="rank-final">${final !== null ? final.toFixed(1) : '-'}<small>/5</small></div>`;
    container.appendChild(card);
  });

  if (ranked.length === 0) {
    container.innerHTML = '<div class="placeholder-msg">Aucune école ne correspond au filtre.</div>';
  }
}

function renderFocusDetail(schoolName) {
  selectedFocusSchool = schoolName;
  const f = D.focus.find(x => x.name === schoolName);
  if (!f) return;

  const container = document.getElementById('focusDetail');
  const saved = getSavedNotes(f.name);

  // Merge current notes
  const notes = {
    blanche: {
      forme: f.notes.blanche?.forme ?? saved.blanche?.forme ?? '',
      fond: f.notes.blanche?.fond ?? saved.blanche?.fond ?? ''
    },
    sylvain: {
      forme: f.notes.sylvain?.forme ?? saved.sylvain?.forme ?? '',
      fond: f.notes.sylvain?.fond ?? saved.sylvain?.fond ?? ''
    }
  };
  const comment = f.comment || saved.comment || '';
  const final = calcFinalNote(notes);

  // Build info items from focus data
  const infoHeaders = D.focusHeaders.filter(h => h.col > 0 && h.col < 25);
  let infoHTML = '';
  infoHeaders.forEach(h => {
    const val = f.data[String(h.col)] || '';
    if (!val) return;
    let displayVal = escapeHTML(val);
    infoHTML += `
      <div class="info-item">
        <div class="info-label">${h.name}</div>
        <div class="info-value">${displayVal}</div>
      </div>`;
  });

  container.innerHTML = `
    <div class="focus-detail-card">
      <h3>${f.name.replace(/\n/g, ' ')}</h3>

      <div class="note-finale-box">
        <div class="big-score">${final !== null ? final.toFixed(1) : '—'}<small>/5</small></div>
        <div>Note finale (moyenne Forme + Fond)</div>
      </div>

      <div class="notes-grid">
        <div class="note-block">
          <h4>Note Blanche</h4>
          <div class="note-row">
            <label>Forme</label>
            <input type="number" min="0" max="5" step="0.5" class="note-input"
              value="${notes.blanche.forme}" data-school="${f.name}" data-who="blanche" data-type="forme">
            <span>/5</span>
          </div>
          <div class="note-row">
            <label>Fond</label>
            <input type="number" min="0" max="5" step="0.5" class="note-input"
              value="${notes.blanche.fond}" data-school="${f.name}" data-who="blanche" data-type="fond">
            <span>/5</span>
          </div>
          <div class="note-avg">Moy: ${calcAvg(notes.blanche.forme, notes.blanche.fond)}</div>
        </div>
        <div class="note-block">
          <h4>Note Sylvain</h4>
          <div class="note-row">
            <label>Forme</label>
            <input type="number" min="0" max="5" step="0.5" class="note-input"
              value="${notes.sylvain.forme}" data-school="${f.name}" data-who="sylvain" data-type="forme">
            <span>/5</span>
          </div>
          <div class="note-row">
            <label>Fond</label>
            <input type="number" min="0" max="5" step="0.5" class="note-input"
              value="${notes.sylvain.fond}" data-school="${f.name}" data-who="sylvain" data-type="fond">
            <span>/5</span>
          </div>
          <div class="note-avg">Moy: ${calcAvg(notes.sylvain.forme, notes.sylvain.fond)}</div>
        </div>
      </div>

      <div class="comment-section">
        <label>Commentaire</label>
        <div class="comment-preview">${formatComment(comment)}</div>
      </div>
    </div>

    <div class="focus-detail-card">
      <h3>Informations du rapport</h3>
      <div class="focus-info-grid">${infoHTML}</div>
    </div>`;

  // Attach event listeners
  container.querySelectorAll('.note-input').forEach(input => {
    input.addEventListener('change', handleNoteChange);
  });

  // Highlight ranking
  document.querySelectorAll('.ranking-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.ranking-card').forEach(c => {
    if (c.querySelector('.rank-name')?.textContent.trim() === schoolName.replace(/\n/g, ' ').trim()) {
      c.classList.add('active');
    }
  });
}

function calcAvg(a, b) {
  const na = parseFloat(a);
  const nb = parseFloat(b);
  if (isNaN(na) && isNaN(nb)) return '—';
  if (isNaN(na)) return nb.toFixed(1);
  if (isNaN(nb)) return na.toFixed(1);
  return ((na + nb) / 2).toFixed(1);
}

function handleNoteChange(e) {
  const school = e.target.dataset.school;
  const who = e.target.dataset.who;
  const type = e.target.dataset.type;
  let val = parseFloat(e.target.value);
  if (isNaN(val) || val < 0) val = '';
  if (val > 5) val = 5;
  e.target.value = val;

  // Update data
  const f = D.focus.find(x => x.name === school);
  if (f) {
    f.notes[who][type] = val;
    // Save
    const saved = getSavedNotes(school);
    saved[who] = saved[who] || {};
    saved[who][type] = val;
    setSavedNotes(school, saved);
  }
  renderFocus();
}


// =============================
// TAB 4: RADAR PAR AXE
// =============================
const AXES = [
  { id: '1', name: 'Gouvernance', cols: [1,2,3,4,5,6,7], max: 7 },
  { id: '2', name: 'Parties Prenantes', cols: [8,9,10,11,14,15,16,17], max: 8 },
  { id: '3', name: 'Environnement', cols: [18,19,20,21,22,23,24,27,28,29], max: 10 },
  { id: '4', name: 'Qualit\u00e9 de Vie', cols: [12,13,25,26,30], max: 5 },
  { id: '5', name: 'Soci\u00e9t\u00e9 & Territoires', cols: [31,32,33,34,35,36], max: 6 },
];

const RADAR_COLORS = [
  { bg: 'rgba(74,25,66,0.2)', border: '#4A1942' },
  { bg: 'rgba(212,20,90,0.15)', border: '#D4145A' },
  { bg: 'rgba(76,175,80,0.15)', border: '#4CAF50' },
  { bg: 'rgba(255,152,0,0.15)', border: '#FF9800' },
  { bg: 'rgba(33,150,243,0.15)', border: '#2196F3' },
  { bg: 'rgba(156,39,176,0.15)', border: '#9C27B0' },
  { bg: 'rgba(0,150,136,0.15)', border: '#009688' },
  { bg: 'rgba(255,87,34,0.15)', border: '#FF5722' },
];

let radarSchools = [];
let radarChart = null;

function getAxeScore(school, axe) {
  let score = 0;
  for (const col of axe.cols) {
    const v = school.verdicts[String(col)] || '';
    if (v === 'OUI') score += 1;
    else if (v === 'PARTIEL') score += 0.5;
  }
  return (score / axe.max) * 100;
}

function getBestAxeScores() {
  const bests = AXES.map(() => ({ score: 0, name: '' }));
  D.grille.forEach(s => {
    if (s.score === 0) return;
    AXES.forEach((axe, i) => {
      const sc = getAxeScore(s, axe);
      if (sc > bests[i].score) { bests[i].score = sc; bests[i].name = s.name.replace(/\n/g,' '); }
    });
  });
  return bests;
}

function getAvgAxeScores() {
  const sums = AXES.map(() => 0);
  let count = 0;
  D.grille.forEach(s => {
    if (isIgensia(s.name) || s.score === 0) return;
    AXES.forEach((axe, i) => { sums[i] += getAxeScore(s, axe); });
    count++;
  });
  return sums.map(s => count > 0 ? s / count : 0);
}

function renderRadar() {
  // Populate select
  const select = document.getElementById('radarSelect');
  if (select && select.options.length <= 1) {
    const sorted = [...D.grille].filter(s => !isIgensia(s.name)).sort((a, b) => b.score - a.score);
    sorted.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name.replace(/\n/g, ' ');
      select.appendChild(opt);
    });
    document.getElementById('radarAddBtn').addEventListener('click', () => {
      const val = select.value;
      if (val && !radarSchools.includes(val)) {
        radarSchools.push(val);
        renderRadar();
      }
      select.value = '';
    });
    document.getElementById('radarResetBtn').addEventListener('click', () => {
      radarSchools = [];
      renderRadar();
    });
  }

  // Render chips
  const chipsEl = document.getElementById('radarChips');
  if (chipsEl) {
    let html = '<span class="radar-chip igensia-chip">IGENSIA</span>';
    html += '<span class="radar-chip" style="background:#999">Moyenne</span>';
    radarSchools.forEach((name, i) => {
      const color = RADAR_COLORS[(i + 2) % RADAR_COLORS.length].border;
      const shortName = name.split('\n')[0].replace('★ ','');
      html += `<span class="radar-chip" style="background:${color}">${shortName} <span class="chip-remove" data-idx="${i}">&times;</span></span>`;
    });
    chipsEl.innerHTML = html;
    chipsEl.querySelectorAll('.chip-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        radarSchools.splice(parseInt(e.target.dataset.idx), 1);
        renderRadar();
      });
    });
  }

  // Build chart
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;

  const labels = AXES.map(a => a.name);
  const igensiaData = D.grille.find(s => isIgensia(s.name));
  const avgScores = getAvgAxeScores();
  const bestScores = getBestAxeScores();

  const datasets = [];

  // IGENSIA main line
  if (igensiaData) {
    const igScores = AXES.map(a => getAxeScore(igensiaData, a));
    datasets.push({
      label: 'IGENSIA Education',
      data: igScores,
      backgroundColor: RADAR_COLORS[0].bg,
      borderColor: RADAR_COLORS[0].border,
      borderWidth: 3,
      pointRadius: 5,
    });
  }

  // Average
  datasets.push({
    label: 'Moyenne benchmark',
    data: avgScores,
    backgroundColor: 'rgba(150,150,150,0.1)',
    borderColor: '#999',
    borderWidth: 2,
    borderDash: [5, 5],
    pointRadius: 3,
  });

  // Best in class
  datasets.push({
    label: 'Meilleur par axe',
    data: bestScores.map(b => b.score),
    backgroundColor: 'rgba(76,175,80,0.05)',
    borderColor: '#4CAF50',
    borderWidth: 1.5,
    borderDash: [2, 4],
    pointRadius: 2,
    pointStyle: 'triangle',
  });

  // Selected schools
  radarSchools.forEach((name, i) => {
    const school = D.grille.find(s => s.name === name);
    if (!school) return;
    const colorIdx = (i + 2) % RADAR_COLORS.length;
    datasets.push({
      label: name.split('\n')[0].replace('★ ',''),
      data: AXES.map(a => getAxeScore(school, a)),
      backgroundColor: RADAR_COLORS[colorIdx].bg,
      borderColor: RADAR_COLORS[colorIdx].border,
      borderWidth: 2,
      pointRadius: 4,
    });
  });

  // Plugin: colored concentric zones (green/yellow/red)
  const zonePlugin = {
    id: 'radarZones',
    beforeDraw(chart) {
      const { ctx } = chart;
      const r = chart.scales.r;
      const cx = r.xCenter, cy = r.yCenter;
      const zones = [
        { from: 0, to: 30, color: 'rgba(229,57,53,0.06)' },    // rouge: insuffisant
        { from: 30, to: 55, color: 'rgba(255,193,7,0.06)' },    // jaune: en progression
        { from: 55, to: 100, color: 'rgba(76,175,80,0.06)' },   // vert: avancé
      ];
      zones.forEach(z => {
        const r1 = r.getDistanceFromCenterForValue(z.from);
        const r2 = r.getDistanceFromCenterForValue(z.to);
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r2, 0, 2 * Math.PI);
        ctx.arc(cx, cy, r1, 0, 2 * Math.PI, true);
        ctx.fillStyle = z.color;
        ctx.fill();
        ctx.restore();
      });
    }
  };

  if (radarChart) radarChart.destroy();
  radarChart = new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets },
    plugins: [zonePlugin],
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            callback: v => v + '%',
            font: { family: 'Archivo', size: 11 },
          },
          pointLabels: {
            font: { family: 'Archivo', size: 13, weight: '700' },
            color: function(ctx) {
              const axeColors = ['#4A1942', '#E60F7D', '#00B050', '#00B0F0', '#C49476'];
              return axeColors[ctx.index % axeColors.length];
            },
          },
          grid: { color: 'rgba(0,0,0,0.08)' },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: 'Archivo', size: 12 },
            padding: 20,
            filter: item => !item.text.startsWith('_'),
            usePointStyle: true,
            pointStyle: 'line',
          },
        },
        tooltip: {
          filter: item => !item.dataset.label.startsWith('_'),
          callbacks: {
            label: ctx => {
              if (ctx.dataset.label.startsWith('_')) return null;
              return `${ctx.dataset.label}: ${ctx.parsed.r.toFixed(0)}%`;
            },
          },
        },
        filler: { propagate: true },
      },
    },
  });

  // Build 2050analytics radar
  render2050Radar();
  renderRadarComparison(igensiaData);

}

// =============================
// RADAR COMPARISON PANEL
// =============================
function getJustifParts(justif) {
  if (!justif) return { summary: '', bullets: [], focus: [] };
  const clean = justif.replace(/^(OUI|NON|PARTIEL)\s*[\u2014—-]\s*/i, '');

  // Split on Focus apprenants
  const parts = clean.split(/Focus apprenants?\s*:/i);
  const mainPart = parts[0] || '';
  const focusPart = parts[1] || '';

  // Remove Source lines
  const mainClean = mainPart.split(/\nSource\s*:/i)[0];

  // Extract summary: first sentence(s) before bullet points
  const lines = mainClean.split('\n').filter(l => l.trim() && !l.trim().startsWith('\u2022'));
  const firstLine = lines.join(' ').trim();

  // Extract bullet points
  const bullets = [];
  const bulletMatches = mainClean.match(/\u2022\s*[^\n]+/g) || [];
  bulletMatches.forEach(b => {
    const text = b.replace(/^\u2022\s*/, '').trim();
    if (text.length > 10) bullets.push(text);
  });

  // Extract focus apprenants bullets
  const focus = [];
  const focusClean = focusPart.split(/\nSource\s*:/i)[0];
  const focusBullets = focusClean.match(/\u2022\s*[^\n]+/g) || [];
  focusBullets.forEach(b => {
    const text = b.replace(/^\u2022\s*/, '').trim();
    if (text.length > 10) focus.push(text);
  });

  return { summary: firstLine, bullets, focus };
}

function findUniquePractices(otherParts, igParts) {
  // Find bullet points from other school that are NOT in IGENSIA's justification
  const igAll = (igParts.summary + ' ' + igParts.bullets.join(' ')).toLowerCase();
  const unique = [];

  // Check each bullet from the other school
  otherParts.bullets.forEach(bullet => {
    // Extract key terms (3+ char words)
    const terms = bullet.toLowerCase().match(/[a-zàâéèêëïîôùûüç]{4,}/g) || [];
    // Count how many key terms are also in IGENSIA's text
    const overlap = terms.filter(t => igAll.includes(t)).length;
    const overlapRatio = terms.length > 0 ? overlap / terms.length : 0;
    // Keep if less than 50% overlap (= truly different practice)
    if (overlapRatio < 0.5 && bullet.length > 15) {
      unique.push(bullet);
    }
  });

  return unique;
}

function renderRadarComparison(igensiaData) {
  const el = document.getElementById('radarComparison');
  if (!el) return;

  if (radarSchools.length === 0) {
    el.innerHTML = '<div class="comparison-hint">Ajoutez des écoles via le sélecteur ci-dessus pour comparer concrètement ce qu\'elles font par rapport à IGENSIA.</div>';
    return;
  }

  const otherSchools = radarSchools.map(name => {
    const grille = D.grille.find(s => s.name === name);
    const justif = D.justifications.find(s => s.name === name);
    return grille && justif ? { grille, justif } : null;
  }).filter(Boolean);

  const igJustif = D.justifications.find(s => isIgensia(s.name));
  if (!igensiaData || !igJustif || otherSchools.length === 0) return;

  let html = '<h3>Comparaison détaillée par axe — ce que font concrètement les autres</h3>';

  AXES.forEach(axe => {
    const igScore = axe.cols.reduce((sum, col) => {
      const v = igensiaData.verdicts[String(col)] || '';
      return sum + (v === 'OUI' ? 1 : v === 'PARTIEL' ? 0.5 : 0);
    }, 0);

    html += `<div class="comparison-axe">`;
    html += `<div class="comparison-axe-header">
      <span>${axe.id} — ${axe.name}</span>
      <span class="axe-scores">IGENSIA : ${igScore}/${axe.max}</span>
    </div>`;

    axe.cols.forEach(col => {
      const igV = igensiaData.verdicts[String(col)] || '';
      const critName = D.criteria[col - 1]?.name || '';
      const igJustifText = igJustif.justifs[String(col)] || '';
      const igParts = getJustifParts(igJustifText);
      const dotCls = igV === 'OUI' ? 'dot-oui' : igV === 'PARTIEL' ? 'dot-partiel' : 'dot-non';

      // IGENSIA side: summary + focus apprenants
      let igHtml = `<div class="crit-summary">${escapeHTML(igParts.summary)}</div>`;
      if (igParts.focus.length > 0) {
        igHtml += `<div class="crit-focus"><strong>Apprenants :</strong> ${escapeHTML(igParts.focus[0])}</div>`;
      }

      // Others side: only unique/different practices
      let othersHtml = '';
      let hasContent = false;
      otherSchools.forEach(({grille: s, justif: j}) => {
        const v = s.verdicts[String(col)] || '';
        if (v === 'NON') return;
        const shortName = s.name.split('\n')[0].replace('★ ','');
        const otherParts = getJustifParts(j.justifs[String(col)] || '');
        const isBetter = (igV === 'NON' && v !== 'NON') || (igV === 'PARTIEL' && v === 'OUI');

        // Get unique practices (not already done by IGENSIA)
        const unique = findUniquePractices(otherParts, igParts);

        // Also check focus apprenants for unique student practices
        const igFocusAll = igParts.focus.join(' ').toLowerCase();
        const uniqueFocus = otherParts.focus.filter(f => {
          const terms = f.toLowerCase().match(/[a-zàâéèêëïîôùûüç]{4,}/g) || [];
          const overlap = terms.filter(t => igFocusAll.includes(t)).length;
          return terms.length > 0 && (overlap / terms.length) < 0.5;
        });

        if (unique.length > 0 || uniqueFocus.length > 0) {
          hasContent = true;
          const cls = isBetter ? 'is-better' : '';
          othersHtml += `<div class="crit-other-item ${cls}">
            <span class="crit-dot ${v === 'OUI' ? 'dot-oui' : 'dot-partiel'}"></span>
            <span><strong>${shortName}</strong> (${v})`;
          unique.forEach(u => {
            othersHtml += `<br>• ${escapeHTML(u)}`;
          });
          uniqueFocus.forEach(f => {
            othersHtml += `<br><em>🎓 ${escapeHTML(f)}</em>`;
          });
          othersHtml += `</span></div>`;
        }
      });

      // Only show this criterion if there's something to compare
      if (hasContent || igV !== 'OUI') {
        html += `<div class="comparison-criterion">
          <div class="comparison-columns">
            <div class="comparison-col col-igensia">
              <div class="crit-line">
                <span class="crit-dot ${dotCls}"></span>
                <span class="crit-label"><strong>${critName}</strong> (${igV})</span>
              </div>
              ${igHtml}
            </div>
            <div class="comparison-col col-others">
              ${othersHtml || '<div class="comparison-empty">Pas de pratique différenciante identifiée</div>'}
            </div>
          </div>
        </div>`;
      }
    });

    html += `</div>`;
  });

  el.innerHTML = html;
}

// =============================
// 2050ANALYTICS RADAR
// =============================
const AXES_2050 = ['Gouvernance', 'Social', 'Carbone', 'Biodiversité', 'Éco. circulaire', 'Investissements'];
const KEYS_2050 = ['gov', 'social', 'carbon', 'biodiv', 'circular', 'invest'];
let radarChart2050 = null;

function render2050Radar() {
  const canvas = document.getElementById('radarChart2050');
  if (!canvas || !D.analytics2050) return;

  const datasets = [];

  // IGENSIA always first in 2050 radar
  const igensiaKey2050 = Object.keys(D.analytics2050).find(k => k.toUpperCase().includes('IGENSIA'));
  if (igensiaKey2050 && D.analytics2050[igensiaKey2050]) {
    const d = D.analytics2050[igensiaKey2050];
    datasets.push({
      label: 'IGENSIA Education',
      data: KEYS_2050.map(k => d[k]),
      backgroundColor: RADAR_COLORS[0].bg,
      borderColor: RADAR_COLORS[0].border,
      borderWidth: 3,
      pointRadius: 5,
    });
  }

  // Add selected schools that have 2050 data
  const schoolsToShow = radarSchools.filter(name => D.analytics2050[name] && !name.toUpperCase().includes('IGENSIA'));

  schoolsToShow.forEach((name, i) => {
    const d = D.analytics2050[name];
    if (!d) return;
    const colorIdx = (i + 2) % RADAR_COLORS.length;
    datasets.push({
      label: name.split('\n')[0].replace('★ ',''),
      data: KEYS_2050.map(k => d[k]),
      backgroundColor: RADAR_COLORS[colorIdx].bg,
      borderColor: RADAR_COLORS[colorIdx].border,
      borderWidth: 2,
      pointRadius: 4,
    });
  });

  // Average of all 2050 schools
  const avg2050 = KEYS_2050.map(k => {
    const vals = Object.values(D.analytics2050).map(d => d[k]).filter(v => v != null);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });
  datasets.unshift({
    label: 'Moyenne 2050analytics',
    data: avg2050,
    backgroundColor: 'rgba(150,150,150,0.1)',
    borderColor: '#999',
    borderWidth: 2,
    borderDash: [5, 5],
    pointRadius: 3,
  });

  if (radarChart2050) radarChart2050.destroy();
  radarChart2050 = new Chart(canvas, {
    type: 'radar',
    data: { labels: AXES_2050, datasets },
    options: {
      responsive: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            callback: v => v,
            font: { family: 'Archivo', size: 11 },
          },
          pointLabels: {
            font: { family: 'Archivo', size: 13, weight: '700' },
            color: '#2D2D2D',
          },
          grid: { color: 'rgba(0,0,0,0.08)' },
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { family: 'Archivo', size: 11 }, padding: 15 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ctx.dataset.label + ': ' + ctx.parsed.r + '/100',
          },
        },
      },
    },
  });
}
