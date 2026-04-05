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
  renderGrille();
  renderJustifications();
  renderRadar();
  renderFocus();
}

// --- Helpers ---
function scoreClass(score) {
  if (score >= 27) return 'score-elite';
  if (score >= 24) return 'score-avance';
  if (score >= 20) return 'score-correct';
  if (score >= 15) return 'score-retard';
  return 'score-insuffisant';
}

function getCatName(letter) {
  const names = {
    'A': 'Gouvernance',
    'B': 'Social',
    'C': 'Formation',
    'D': 'Environnement',
    'E': 'Campus',
    'F': 'Transparence'
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

  // Build category header row
  let catRow = '<tr><th class="school-col cat-header">ÉCOLE / GROUPE</th>';
  const catRanges = [
    { name: 'A — GOUVERNANCE', cols: [1,2,3,4,5] },
    { name: 'B — SOCIAL', cols: [6,7,8,9,10] },
    { name: 'C — FORMATION', cols: [11,12,13,14,15] },
    { name: 'D — ENVIRONNEMENT', cols: [16,17,18,19,20,21] },
    { name: 'E — CAMPUS', cols: [22,23,24,25] },
    { name: 'F — TRANSPARENCE', cols: [26,27,28,29] },
  ];
  catRanges.forEach(c => {
    catRow += `<th class="cat-header" colspan="${c.cols.length}">${c.name}</th>`;
  });
  catRow += '<th class="cat-header score-col">SCORE</th></tr>';

  // Build criteria header row
  let critRow = '<tr><th class="school-col">École / Groupe</th>';
  D.criteria.forEach((c, i) => {
    if (i < 29) {
      critRow += `<th title="${c.name}">${c.name}</th>`;
    }
  });
  critRow += '<th class="score-col">/29</th></tr>';

  document.getElementById('grilleHead').innerHTML = catRow + critRow;

  // Build body
  let body = '';
  filtered.forEach(s => {
    const ig = isIgensia(s.name);
    body += `<tr class="${ig ? 'igensia-row' : ''}">`;
    body += `<td class="school-cell ${ig ? 'igensia' : ''}">${s.name.replace(/\n/g, ' ')}</td>`;
    for (let j = 1; j <= 29; j++) {
      const v = s.verdicts[j] || '';
      body += `<td>${badgeHTML(v)}</td>`;
    }
    body += `<td class="score-cell ${scoreClass(s.score)}">${s.score}</td>`;
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

  const filtered = sorted.filter(s => matchesSearch(s.name));
  const container = document.getElementById('justifList');
  container.innerHTML = '';

  filtered.forEach((s, idx) => {
    const score = scoreMap[s.name] || 0;
    const card = document.createElement('div');
    card.className = 'justif-card';

    let critHTML = '';
    D.criteria.forEach((c, i) => {
      if (i >= 29) return;
      const justif = s.justifs[String(i + 1)] || '';
      if (!justif) return;
      const verdict = justif.split(' ')[0].replace('—', '').replace('\u2014', '').trim();
      critHTML += `
        <div class="justif-criterion">
          <div class="crit-header">
            ${badgeHTML(verdict)}
            <span class="crit-cat">${getCatName(c.category)}</span>
            <span class="crit-name">${c.name}</span>
          </div>
          <div class="justif-text">${formatJustif(justif)}</div>
        </div>`;
    });

    card.innerHTML = `
      <div class="justif-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="school-name">${s.name.replace(/\n/g, ' ')}</span>
        <span class="score-tag ${scoreClass(score)}">${score}/29</span>
        <span class="arrow">&#9662;</span>
      </div>
      <div class="justif-body">${critHTML}</div>`;
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
  // Bold OUI/NON/PARTIEL at start (handle both — and &mdash;)
  text = text.replace(/^(OUI|NON|PARTIEL)\s*[\u2014\u2013—-]\s*/, '<strong>$1</strong> \u2014 ');
  // Bold "Focus apprenants :" (case insensitive, with or without newline before)
  text = text.replace(/\n*(Focus apprenants?\s*:)/gi, '\n\n<strong>$1</strong>');
  // Separate Source lines with spacing
  text = text.replace(/\n*(Source\s*:[^\n]*)/gi, '\n\n<span class="justif-source">$1</span>');
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
  { id: 'A', name: 'Gouvernance', cols: [1,2,3,4,5], max: 5 },
  { id: 'B', name: 'Social', cols: [6,7,8,9,10], max: 5 },
  { id: 'C', name: 'Formation', cols: [11,12,13,14,15], max: 5 },
  { id: 'D', name: 'Environnement', cols: [16,17,18,19,20,21], max: 6 },
  { id: 'E', name: 'Campus', cols: [22,23,24,25], max: 4 },
  { id: 'F', name: 'Transparence', cols: [26,27,28,29], max: 4 },
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

function getAvgAxeScores() {
  const sums = AXES.map(() => 0);
  let count = 0;
  D.grille.forEach(s => {
    if (isIgensia(s.name)) return;
    AXES.forEach((axe, i) => { sums[i] += getAxeScore(s, axe); });
    count++;
  });
  return sums.map(s => s / count);
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
      html += `<span class="radar-chip" style="background:${color}">${name.replace(/\n/g,' ').substring(0,25)} <span class="chip-remove" data-idx="${i}">&times;</span></span>`;
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

  const datasets = [];

  // IGENSIA always first
  if (igensiaData) {
    datasets.push({
      label: 'IGENSIA Education',
      data: AXES.map(a => getAxeScore(igensiaData, a)),
      backgroundColor: RADAR_COLORS[0].bg,
      borderColor: RADAR_COLORS[0].border,
      borderWidth: 3,
      pointRadius: 5,
    });
  }

  // Average
  datasets.push({
    label: 'Moyenne (hors IGENSIA)',
    data: avgScores,
    backgroundColor: 'rgba(150,150,150,0.1)',
    borderColor: '#999',
    borderWidth: 2,
    borderDash: [5, 5],
    pointRadius: 3,
  });

  // Selected schools
  radarSchools.forEach((name, i) => {
    const school = D.grille.find(s => s.name === name);
    if (!school) return;
    const colorIdx = (i + 2) % RADAR_COLORS.length;
    datasets.push({
      label: name.replace(/\n/g, ' ').substring(0, 30),
      data: AXES.map(a => getAxeScore(school, a)),
      backgroundColor: RADAR_COLORS[colorIdx].bg,
      borderColor: RADAR_COLORS[colorIdx].border,
      borderWidth: 2,
      pointRadius: 4,
    });
  });

  if (radarChart) radarChart.destroy();
  radarChart = new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets },
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
          labels: { font: { family: 'Archivo', size: 12 }, padding: 20 },
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.r.toFixed(0)}%`,
          },
        },
      },
    },
  });

  // Build 2050analytics radar
  render2050Radar();

  // Build comparison table
  const tableEl = document.getElementById('radarTable');
  if (tableEl) {
    let allSchools = [];
    if (igensiaData) allSchools.push(igensiaData);
    radarSchools.forEach(name => {
      const s = D.grille.find(x => x.name === name);
      if (s) allSchools.push(s);
    });

    let html = '<table><thead><tr><th>Axe</th><th>Max</th>';
    allSchools.forEach(s => {
      const short = s.name.replace(/\n/g, ' ').substring(0, 20);
      html += `<th>${short}</th>`;
    });
    html += '<th>Moyenne</th></tr></thead><tbody>';

    AXES.forEach((axe, ai) => {
      html += `<tr>`;
      html += `<td>${axe.id} — ${axe.name}</td><td>${axe.max}</td>`;
      allSchools.forEach(s => {
        const raw = axe.cols.reduce((sum, col) => {
          const v = s.verdicts[String(col)] || '';
          return sum + (v === 'OUI' ? 1 : v === 'PARTIEL' ? 0.5 : 0);
        }, 0);
        html += `<td>${raw}/${axe.max}</td>`;
      });
      html += `<td>${(avgScores[ai] * axe.max / 100).toFixed(1)}/${axe.max}</td>`;
      html += '</tr>';
    });

    html += '<tr style="font-weight:900; border-top:2px solid var(--primary)"><td>TOTAL</td><td>29</td>';
    allSchools.forEach(s => { html += `<td>${s.score}/29</td>`; });
    const avgTotal = D.grille.filter(s => !isIgensia(s.name)).reduce((sum, s) => sum + s.score, 0) / D.grille.filter(s => !isIgensia(s.name)).length;
    html += `<td>${avgTotal.toFixed(1)}/29</td></tr>`;
    html += '</tbody></table>';
    tableEl.innerHTML = html;
  }
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

  // Add selected schools that have 2050 data
  const schoolsToShow = radarSchools.filter(name => D.analytics2050[name]);

  // Always try to show OMNES (top 2050) and HEC as defaults if nothing selected
  const defaults2050 = ['OMNES EDUCATION', 'HEC PARIS', 'ESSEC BUSINESS SCHOOL'];
  const shown2050 = schoolsToShow.length > 0 ? schoolsToShow : defaults2050.filter(n => D.analytics2050[n]);

  shown2050.forEach((name, i) => {
    const d = D.analytics2050[name];
    if (!d) return;
    const colorIdx = (i + 2) % RADAR_COLORS.length;
    datasets.push({
      label: name.replace(/\n/g, ' ').substring(0, 25),
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
