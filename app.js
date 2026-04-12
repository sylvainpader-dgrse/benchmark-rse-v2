/* ==============================
   Benchmark RSE — IGENSIA Education
   ============================== */

const D = BENCHMARK_DATA;
let currentTab = 'grille';
let searchTerm = '';
let selectedFocusSchool = null;

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
    if (saved.comment) f.comment = saved.comment;
  });

  setupTabs();
  setupSearch();
  renderAll();
});

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
      <div class="stat-label">${total - 5} écoles et 5 groupes analysés</div>
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
  if (score >= 30) return 'score-avance';
  if (score >= 25) return 'score-confirme';
  if (score >= 20) return 'score-correct';
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

  // Build category header row — school fusionné en rowspan=2, plus de colonne # séparée
  let catRow = '<tr><th class="school-col cat-header" rowspan="2" style="background:#E60F7D;">ÉCOLE / GROUPE</th>';
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
  catRow += '<th class="cat-header score-col" rowspan="2">SCORE</th></tr>';

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
    body += `<td class="school-cell ${ig ? 'igensia' : ''}">${s.name.replace(/\n/g, ' ')}${pills ? '<div class="school-labels">' + pills + '</div>' : ''}</td>`;
    colOrder.forEach(j => {
      const v = s.verdicts[j] || '';
      body += `<td>${badgeHTML(v)}</td>`;
    });
    const rankLabel = ig ? '\u2605' : (rankMap[s.name] ? '#' + rankMap[s.name] : '');
    body += `<td class="score-cell ${scoreClass(s.score)}"><div class="score-num">${s.score}</div><div class="score-rank">${rankLabel}</div></td>`;
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

function formatJustif(str) {
  let text = escapeHTML(str);
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
        <textarea class="comment-textarea" data-school="${f.name}"
          placeholder="Ajouter un commentaire sur ce rapport RSE...">${escapeHTML(comment)}</textarea>
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
  container.querySelector('.comment-textarea')?.addEventListener('input', handleCommentChange);

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

function handleCommentChange(e) {
  const school = e.target.dataset.school;
  const val = e.target.value;
  const f = D.focus.find(x => x.name === school);
  if (f) f.comment = val;
  const saved = getSavedNotes(school);
  saved.comment = val;
  setSavedNotes(school, saved);
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
            color: '#2D2D2D',
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

  // Build comparison table
  const tableEl = document.getElementById('radarTable');
  if (tableEl) {
    const filledOthers = D.grille.filter(s => !isIgensia(s.name) && s.score > 0);
    const avgTotalScore = filledOthers.reduce((sum, s) => sum + s.score, 0) / (filledOthers.length || 1);

    const axeColors = ['#260D66', '#E60F7D', '#00B050', '#00B0F0', '#C49476'];
    let html = '<table><thead><tr><th>Axe</th><th style="min-width:80px;">\u2605 IGENSIA</th><th>Moyenne</th></tr></thead><tbody>';

    AXES.forEach((axe, ai) => {
      const igRaw = igensiaData ? axe.cols.reduce((sum, col) => {
        const v = igensiaData.verdicts[String(col)] || '';
        return sum + (v === 'OUI' ? 1 : v === 'PARTIEL' ? 0.5 : 0);
      }, 0) : 0;
      const avgRaw = (avgScores[ai] * axe.max / 100).toFixed(1);
      html += `<tr>`;
      html += `<td style="border-left:4px solid ${axeColors[ai]};padding-left:10px;">${axe.name}</td>`;
      html += `<td>${igRaw}/${axe.max}</td>`;
      html += `<td>${avgRaw}/${axe.max}</td>`;
      html += '</tr>';
    });

    const igTotal = igensiaData ? igensiaData.score : 0;
    html += `<tr style="font-weight:900; border-top:2px solid var(--primary)">`;
    html += `<td style="border-left:4px solid var(--primary);padding-left:10px;">TOTAL</td>`;
    html += `<td>${igTotal}/36</td>`;
    html += `<td>${avgTotalScore.toFixed(1)}/36</td>`;
    html += `<td></td></tr>`;
    html += '</tbody></table>';
    tableEl.innerHTML = html;
  }
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
