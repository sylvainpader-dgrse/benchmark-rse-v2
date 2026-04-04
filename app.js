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
    body += `<tr>`;
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
            <span class="crit-cat">${c.category}</span>
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
  // Bold OUI/NON/PARTIEL at start
  text = text.replace(/^(OUI|NON|PARTIEL)(\s*\u2014|\s*—)/, '<strong>$1</strong>$2');
  // Bold "Focus apprenants :"
  text = text.replace(/(Focus apprenants\s*:)/g, '\n<strong>$1</strong>');
  // Separate Source line with extra spacing
  text = text.replace(/\n(Source\s*:)/g, '\n\n<span class="justif-source">$1</span>');
  text = text.replace(/\n(Sources?\s*:)/gi, '\n\n<span class="justif-source">$1</span>');
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
