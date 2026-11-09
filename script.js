/* ============================================================
   Digital  CALCULATOR — JAVASCRIPT (FINAL MEGA VERSION)
   2D/3D Shapes + Scientific Calculator + Voice + Sound + History
   ============================================================ */

// ==================== 1. SHAPES DATABASE ====================
const SHAPES = {
  // 2D SHAPES
  rectangle: {
    type: '2D', name: 'Rectangle', formula: 'Area = L × W | Perimeter = 2 × (L + W)',
    fields: [{ key: 'length', label: 'Length', placeholder: 'e.g. 5' }, { key: 'width', label: 'Width', placeholder: 'e.g. 3' }],
    area: (v) => v.length * v.width, perimeter: (v) => 2 * (v.length + v.width),
    explanation: { title: '▭ Rectangle', howItWorks: '4 sides, opposite equal.', areaExplained: 'L × W', perimeterExplained: '2 × (L + W)', example: { inputs: '5, 3 cm', area: '15 cm²', perimeter: '16 cm' } }
  },
  square: {
    type: '2D', name: 'Square', formula: 'Area = Side² | Perimeter = 4 × Side',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 4' }],
    area: (v) => v.side * v.side, perimeter: (v) => 4 * v.side,
    explanation: { title: '□ Square', howItWorks: '4 equal sides.', areaExplained: 'Side²', perimeterExplained: '4 × Side', example: { inputs: '4 cm', area: '16 cm²', perimeter: '16 cm' } }
  },
  triangle: {
    type: '2D', name: 'Triangle', formula: 'Area = ½ × B × H | Perimeter = A + B + C',
    fields: [{ key: 'base', label: 'Base', placeholder: 'e.g. 6' }, { key: 'height', label: 'Height', placeholder: 'e.g. 4' }, { key: 'sideA', label: 'Side A', placeholder: 'e.g. 5' }, { key: 'sideB', label: 'Side B', placeholder: 'e.g. 5' }, { key: 'sideC', label: 'Side C', placeholder: 'e.g. 6' }],
    area: (v) => 0.5 * v.base * v.height, perimeter: (v) => v.sideA + v.sideB + v.sideC,
    explanation: { title: '△ Triangle', howItWorks: '3 sides, sum 180°.', areaExplained: '½ × B × H', perimeterExplained: 'A + B + C', example: { inputs: '6, 4, 5, 5, 6', area: '12 cm²', perimeter: '16 cm' } }
  },
  circle: {
    type: '2D', name: 'Circle', formula: 'Area = πr² | Circumference = 2πr',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 7' }],
    area: (v) => Math.PI * v.radius * v.radius, perimeter: (v) => 2 * Math.PI * v.radius,
    explanation: { title: '◯ Circle', howItWorks: 'π ≈ 3.14.', areaExplained: 'πr²', perimeterExplained: '2πr', example: { inputs: '7 cm', area: '153.94 cm²', perimeter: '43.98 cm' } }
  },
  parallelogram: {
    type: '2D', name: 'Parallelogram', formula: 'Area = B × H | Perimeter = 2(B + S)',
    fields: [{ key: 'base', label: 'Base', placeholder: 'e.g. 8' }, { key: 'height', label: 'Height', placeholder: 'e.g. 5' }, { key: 'side', label: 'Side', placeholder: 'e.g. 6' }],
    area: (v) => v.base * v.height, perimeter: (v) => 2 * (v.base + v.side),
    explanation: { title: '▱ Parallelogram', howItWorks: 'Opposite sides equal.', areaExplained: 'B × H', perimeterExplained: '2(B + S)', example: { inputs: '8, 5, 6 cm', area: '40 cm²', perimeter: '28 cm' } }
  },
  rhombus: {
    type: '2D', name: 'Rhombus', formula: 'Area = (d1 × d2)/2 | Perimeter = 4 × S',
    fields: [{ key: 'd1', label: 'Diagonal 1', placeholder: 'e.g. 6' }, { key: 'd2', label: 'Diagonal 2', placeholder: 'e.g. 8' }, { key: 'side', label: 'Side', placeholder: 'e.g. 5' }],
    area: (v) => (v.d1 * v.d2) / 2, perimeter: (v) => 4 * v.side,
    explanation: { title: '◇ Rhombus', howItWorks: '4 equal sides.', areaExplained: '(d1 × d2)/2', perimeterExplained: '4 × Side', example: { inputs: '6, 8, 5 cm', area: '24 cm²', perimeter: '20 cm' } }
  },
  trapezoid: {
    type: '2D', name: 'Trapezoid', formula: 'Area = ½(a+b)h | Perimeter = a+b+c+d',
    fields: [{ key: 'a', label: 'Side A', placeholder: 'e.g. 8' }, { key: 'b', label: 'Side B', placeholder: 'e.g. 5' }, { key: 'h', label: 'Height', placeholder: 'e.g. 4' }, { key: 'sideC', label: 'Side C', placeholder: 'e.g. 5' }, { key: 'sideD', label: 'Side D', placeholder: 'e.g. 5' }],
    area: (v) => 0.5 * (v.a + v.b) * v.h, perimeter: (v) => v.a + v.b + v.sideC + v.sideD,
    explanation: { title: '⏢ Trapezoid', howItWorks: '2 parallel sides.', areaExplained: '½(a+b)h', perimeterExplained: 'a+b+c+d', example: { inputs: '8, 5, 4, 5, 5', area: '26 cm²', perimeter: '23 cm' } }
  },
  pentagon: {
    type: '2D', name: 'Pentagon', formula: 'Area = (5/4)s²cot(π/5) | Perimeter = 5s',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 5' }],
    area: (v) => (5 / 4) * v.side * v.side * (1 / Math.tan(Math.PI / 5)), perimeter: (v) => 5 * v.side,
    explanation: { title: '⬠ Pentagon', howItWorks: '5 equal sides.', areaExplained: 'Formula', perimeterExplained: '5 × Side', example: { inputs: '5 cm', area: '43.01 cm²', perimeter: '25 cm' } }
  },
  hexagon: {
    type: '2D', name: 'Hexagon', formula: 'Area = (3√3/2)s² | Perimeter = 6s',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 4' }],
    area: (v) => (3 * Math.sqrt(3) / 2) * v.side * v.side, perimeter: (v) => 6 * v.side,
    explanation: { title: '⬡ Hexagon', howItWorks: '6 equal sides.', areaExplained: '(3√3/2)s²', perimeterExplained: '6 × Side', example: { inputs: '4 cm', area: '41.57 cm²', perimeter: '24 cm' } }
  },
  ellipse: {
    type: '2D', name: 'Ellipse', formula: 'Area = πab | Perimeter ≈ Ramanujan',
    fields: [{ key: 'a', label: 'Semi-major', placeholder: 'e.g. 8' }, { key: 'b', label: 'Semi-minor', placeholder: 'e.g. 5' }],
    area: (v) => Math.PI * v.a * v.b,
    perimeter: (v) => { const a = v.a, b = v.b; return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); },
    explanation: { title: '⬭ Ellipse', howItWorks: 'Stretched circle.', areaExplained: 'πab', perimeterExplained: 'Approx formula', example: { inputs: '8, 5 cm', area: '125.66 cm²', perimeter: '41.39 cm' } }
  },
  // 3D SHAPES
  cube: {
    type: '3D', name: 'Cube', formula: 'Volume = s³ | Surface Area = 6s²',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 4' }],
    area: (v) => v.side * v.side * v.side, perimeter: (v) => 6 * v.side * v.side,
    explanation: { title: '🧊 Cube', howItWorks: '6 square faces.', areaExplained: 's³', perimeterExplained: '6s²', example: { inputs: '4 cm', area: '64 cm³', perimeter: '96 cm²' } }
  },
  cuboid: {
    type: '3D', name: 'Cuboid', formula: 'Volume = lwh | Surface Area = 2(lw+lh+wh)',
    fields: [{ key: 'length', label: 'Length', placeholder: 'e.g. 5' }, { key: 'width', label: 'Width', placeholder: 'e.g. 3' }, { key: 'height', label: 'Height', placeholder: 'e.g. 4' }],
    area: (v) => v.length * v.width * v.height, perimeter: (v) => 2 * (v.length * v.width + v.length * v.height + v.width * v.height),
    explanation: { title: '📦 Cuboid', howItWorks: 'Box shape.', areaExplained: 'lwh', perimeterExplained: '2(lw+lh+wh)', example: { inputs: '5, 3, 4', area: '60 cm³', perimeter: '94 cm²' } }
  },
  sphere: {
    type: '3D', name: 'Sphere', formula: 'Volume = (4/3)πr³ | Surface Area = 4πr²',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 5' }],
    area: (v) => (4 / 3) * Math.PI * v.radius * v.radius * v.radius, perimeter: (v) => 4 * Math.PI * v.radius * v.radius,
    explanation: { title: '🔮 Sphere', howItWorks: 'Round ball.', areaExplained: '(4/3)πr³', perimeterExplained: '4πr²', example: { inputs: '5 cm', area: '523.60 cm³', perimeter: '314.16 cm²' } }
  },
  cylinder: {
    type: '3D', name: 'Cylinder', formula: 'Volume = πr²h | Surface Area = 2πr(r+h)',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 3' }, { key: 'height', label: 'Height', placeholder: 'e.g. 10' }],
    area: (v) => Math.PI * v.radius * v.radius * v.height, perimeter: (v) => 2 * Math.PI * v.radius * (v.radius + v.height),
    explanation: { title: '🥫 Cylinder', howItWorks: 'Round base.', areaExplained: 'πr²h', perimeterExplained: '2πr(r+h)', example: { inputs: '3, 10 cm', area: '282.74 cm³', perimeter: '245.04 cm²' } }
  },
  cone: {
    type: '3D', name: 'Cone', formula: 'Volume = (1/3)πr²h | Surface Area = πr(r+l)',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 3' }, { key: 'height', label: 'Height', placeholder: 'e.g. 4' }, { key: 'slant', label: 'Slant', placeholder: 'e.g. 5' }],
    area: (v) => (1 / 3) * Math.PI * v.radius * v.radius * v.height, perimeter: (v) => Math.PI * v.radius * (v.radius + v.slant),
    explanation: { title: '🍦 Cone', howItWorks: 'Pointed top.', areaExplained: '(1/3)πr²h', perimeterExplained: 'πr(r+l)', example: { inputs: '3, 4, 5', area: '37.70 cm³', perimeter: '75.40 cm²' } }
  },
  pyramid: {
    type: '3D', name: 'Pyramid', formula: 'Volume = (1/3)b²h | Surface Area = b²+2bl',
    fields: [{ key: 'base', label: 'Base', placeholder: 'e.g. 6' }, { key: 'height', label: 'Height', placeholder: 'e.g. 4' }, { key: 'slant', label: 'Slant', placeholder: 'e.g. 5' }],
    area: (v) => (1 / 3) * v.base * v.base * v.height, perimeter: (v) => v.base * v.base + 2 * v.base * v.slant,
    explanation: { title: '🔺 Pyramid', howItWorks: 'Square base.', areaExplained: '(1/3)b²h', perimeterExplained: 'b²+2bl', example: { inputs: '6, 4, 5', area: '48 cm³', perimeter: '96 cm²' } }
  }
};


// ==================== 2. SCIENTIFIC CALCULATOR LOGIC ====================
let sciExpression = "";

function updateSciDisplay() {
  const display = document.getElementById('sciDisplay');
  if (display) display.value = sciExpression;
}

function sciInput(val) {
  sciExpression += val;
  updateSciDisplay();
}

function sciClear() {
  sciExpression = "";
  updateSciDisplay();
}

function sciDelete() {
  sciExpression = sciExpression.slice(0, -1);
  updateSciDisplay();
}

function sciCalculate() {
  try {
    let evalString = sciExpression
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/π/g, 'Math.PI')
      .replace(/\^/g, '**');

    // Safe evaluation
    let result = Function('"use strict";return (' + evalString + ')')();
    
    if (isNaN(result) || !isFinite(result)) {
      sciExpression = "Error";
    } else {
      sciExpression = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
    }
    updateSciDisplay();
  } catch (error) {
    sciExpression = "Error";
    updateSciDisplay();
  }
}


// ==================== 3. DOM ELEMENTS ====================
const inputFieldsDiv = document.getElementById('inputFields');
const formulaHintEl = document.getElementById('formulaHint');
const resultAreaEl = document.getElementById('resultArea');
const resultPerimeterEl = document.getElementById('resultPerimeter');
const label1El = document.getElementById('label1');
const label2El = document.getElementById('label2');
const errorBox = document.getElementById('errorBox');
const errorTextEl = document.getElementById('errorText');
const shapeBtns = document.querySelectorAll('.shape-btn');

let currentShape = 'rectangle';
let explanationVisible = false;
let soundEnabled = true;
let audioCtx = null;


// ==================== 4. HELPERS ====================
function hideError() { errorBox.classList.add('hidden'); }
function showError(msg) { errorTextEl.textContent = msg; errorBox.classList.remove('hidden'); }
function resetResults() { resultAreaEl.textContent = '—'; resultPerimeterEl.textContent = '—'; hideError(); }
function formatNumber(num) { return Number.isInteger(num) ? num.toString() : num.toFixed(4).replace(/\.?0+$/, ''); }
function getCurrentUnit() { const s = document.getElementById('unitSelect'); return s ? s.value : 'cm'; }
function getUnitSuffix(type) { const u = getCurrentUnit(); return type === 'area' ? u + '²' : type === 'volume' ? u + '³' : u; }

// Sound & Voice
function playClick() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

function speakResult(text) {
  if (!soundEnabled) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    setTimeout(() => { window.speechSynthesis.speak(utterance); }, 300);
  }
}


// ==================== 5. RENDER & VALIDATE ====================
function renderInputs(shapeKey) {
  const shape = SHAPES[shapeKey];
  if (!shape) return;
  formulaHintEl.textContent = shape.formula;
  const unit = getCurrentUnit();
  let html = '';
  shape.fields.forEach(field => {
    html += `
      <div class="input-group">
        <label for="input-${field.key}">${field.label}</label>
        <div class="input-with-unit">
          <input type="number" step="any" min="0.0001" id="input-${field.key}" data-key="${field.key}" placeholder="${field.placeholder}" inputmode="decimal">
          <span class="input-unit-label">${unit}</span>
        </div>
      </div>`;
  });
  inputFieldsDiv.innerHTML = html;
}

function readAndValidateInputs() {
  const shape = SHAPES[currentShape];
  const values = {};
  let hasError = false;
  let errorMsgs = [];

  const allInputs = inputFieldsDiv.querySelectorAll('input');
  allInputs.forEach(inp => inp.classList.remove('error-input'));

  shape.fields.forEach(field => {
    const input = document.getElementById(`input-${field.key}`);
    if (!input) return;
    const raw = input.value.trim();
    const num = parseFloat(raw);
    if (raw === '' || isNaN(num) || num <= 0) {
      input.classList.add('error-input');
      errorMsgs.push(`"${field.label}" must be positive.`);
      hasError = true;
    } else {
      values[field.key] = num;
    }
  });

  if (!hasError && currentShape === 'triangle') {
    const a = values.sideA, b = values.sideB, c = values.sideC;
    if (a + b <= c || a + c <= b || b + c <= a) { errorMsgs.push('Invalid triangle sides.'); hasError = true; }
  }

  if (hasError) { showError(errorMsgs.join(' ')); return null; }
  hideError();
  return values;
}


// ==================== 6. CALCULATIONS ====================
function calculateArea() {
  const values = readAndValidateInputs();
  if (!values) return;
  const shape = SHAPES[currentShape];
  const is3D = shape.type === '3D';
  try {
    const result = shape.area(values);
    const suffix = is3D ? getUnitSuffix('volume') : getUnitSuffix('area');
    const text = formatNumber(result) + ' ' + suffix;
    resultAreaEl.textContent = text;
    saveToHistory(is3D ? 'Volume' : 'Area', text);
    
    let speakText = is3D ? "The volume is " : "The area is ";
    speakText += formatNumber(result) + " " + (is3D ? "cubic" : "square") + " " + getCurrentUnit();
    speakResult(speakText);
  } catch (e) { showError('Calculation error.'); }
}

function calculatePerimeter() {
  const values = readAndValidateInputs();
  if (!values) return;
  const shape = SHAPES[currentShape];
  const is3D = shape.type === '3D';
  try {
    const result = shape.perimeter(values);
    const suffix = is3D ? getUnitSuffix('area') : getUnitSuffix('perimeter');
    const text = formatNumber(result) + ' ' + suffix;
    resultPerimeterEl.textContent = text;
    saveToHistory(is3D ? 'Surface Area' : 'Perimeter', text);
    
    let speakText = is3D ? "The surface area is " : "The perimeter is ";
    speakText += formatNumber(result) + " " + (is3D ? "square" : "") + " " + getCurrentUnit();
    speakResult(speakText);
  } catch (e) { showError('Calculation error.'); }
}

function clearAll() {
  const allInputs = inputFieldsDiv.querySelectorAll('input');
  allInputs.forEach(inp => { inp.value = ''; inp.classList.remove('error-input'); });
  resetResults();
}

function switchShape(shapeKey) {
  if (!SHAPES[shapeKey]) return;
  currentShape = shapeKey;
  const shape = SHAPES[shapeKey];
  const is3D = shape.type === '3D';

  shapeBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.shape === shapeKey));

  if (is3D) {
    label1El.textContent = 'Volume';
    label2El.textContent = 'Surface Area';
    document.getElementById('btnArea').textContent = '📦 Calculate Volume';
    document.getElementById('btnPerimeter').textContent = '📐 Calculate Surface Area';
  } else {
    label1El.textContent = 'Area';
    label2El.textContent = 'Perimeter';
    document.getElementById('btnArea').textContent = '📐 Calculate Area';
    document.getElementById('btnPerimeter').textContent = '📏 Calculate Perimeter';
  }

  renderInputs(shapeKey);
  resetResults();
  if (explanationVisible) renderExplanation();
}


// ==================== 7. UI FEATURES ====================
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  const toggleIcon = toggleBtn.querySelector('.toggle-icon');
  const toggleText = toggleBtn.querySelector('.toggle-text');
  
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleIcon.textContent = '☀️'; toggleText.textContent = 'Light Mode';
  }
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    toggleIcon.textContent = isDark ? '☀️' : '🌙';
    toggleText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

const HISTORY_KEY = 'calcHistory';
function getHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (e) { return []; } }
function saveToHistory(type, result) {
  const shape = SHAPES[currentShape];
  const inputValues = {};
  shape.fields.forEach(f => { const inp = document.getElementById(`input-${f.key}`); if (inp) inputValues[f.label] = inp.value; });
  const entry = { shape: shape.name, type, inputs: inputValues, result, time: new Date().toLocaleTimeString() };
  const history = getHistory(); history.unshift(entry); if (history.length > 20) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); renderHistory();
}
function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
  const history = getHistory();
  if (history.length === 0) { list.innerHTML = '<p class="history-empty">No calculations yet.</p>'; return; }
  let html = '';
  history.forEach(item => {
    const inputsText = Object.entries(item.inputs).map(([l, v]) => `${l}: ${v}`).join(', ');
    html += `<div class="history-item"><span class="history-shape-badge">${item.shape}</span><div class="history-details"><span class="history-inputs">${inputsText}</span><span class="history-results">${item.type}: <strong>${item.result}</strong></span></div><span class="history-time">🕐 ${item.time}</span></div>`;
  });
  list.innerHTML = html;
}
function setupHistory() {
  const clearBtn = document.getElementById('btnClearHistory');
  if (clearBtn) clearBtn.addEventListener('click', () => { if (confirm('Clear history?')) { localStorage.removeItem(HISTORY_KEY); renderHistory(); } });
  renderHistory();
}

function setupUnitSelector() {
  const unitSelect = document.getElementById('unitSelect');
  if (unitSelect) unitSelect.addEventListener('change', () => { renderInputs(currentShape); resetResults(); });
}

function setupExplanation() {
  const toggleBtn = document.getElementById('explanationToggle');
  const content = document.getElementById('explanationContent');
  if (!toggleBtn || !content) return;
  toggleBtn.addEventListener('click', () => {
    explanationVisible = !explanationVisible;
    content.classList.toggle('hidden', !explanationVisible);
    toggleBtn.textContent = explanationVisible ? '📖 Hide Formula Explanation' : '📖 Show Formula Explanation';
    if (explanationVisible) renderExplanation();
  });
}
function renderExplanation() {
  const titleEl = document.getElementById('explanationTitle');
  const bodyEl = document.getElementById('explanationBody');
  if (!titleEl || !bodyEl) return;
  const shape = SHAPES[currentShape];
  if (!shape || !shape.explanation) { bodyEl.innerHTML = '<p>Explanation not available.</p>'; return; }
  const exp = shape.explanation;
  titleEl.textContent = exp.title;
  bodyEl.innerHTML = `
    <p><strong>How it works:</strong> ${exp.howItWorks}</p>
    <p><strong>Formula:</strong></p>
    <div class="explanation-formula-box">${exp.areaExplained}</div>
    <div class="explanation-formula-box">${exp.perimeterExplained}</div>
    <div class="explanation-example">
      <strong>📝 Example:</strong>
      <p><strong>Inputs:</strong> ${exp.example.inputs}</p>
      <p><strong>${exp.example.area}</strong></p>
      <p><strong>${exp.example.perimeter}</strong></p>
    </div>`;
}

function setupPrintAndCopy() {
  const printBtn = document.getElementById('btnPrint');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  const copyText = (text) => {
    if (text && text !== '—') {
      navigator.clipboard.writeText(text).then(() => alert('📋 Result Copied: ' + text)).catch(() => alert('Copy failed.'));
    } else { alert('⚠️ Please calculate a result first!'); }
  };
  const copyAreaBtn = document.getElementById('copyAreaBtn');
  const copyPerimBtn = document.getElementById('copyPerimeterBtn');
  if (copyAreaBtn) copyAreaBtn.addEventListener('click', () => copyText(document.getElementById('resultArea').textContent));
  if (copyPerimBtn) copyPerimBtn.addEventListener('click', () => copyText(document.getElementById('resultPerimeter').textContent));

  const soundBtn = document.getElementById('soundToggle');
  const soundIcon = document.getElementById('soundIcon');
  const soundText = document.getElementById('soundText');
  
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      soundText.textContent = soundEnabled ? 'Sound On' : 'Sound Off';
      if (soundEnabled) playClick(); 
      else window.speechSynthesis.cancel(); 
    });
  }

  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => { setTimeout(playClick, 50); });
  });
}


// ==================== 8. MAIN INIT ====================
function init() {
  // Normal Shape Buttons
  shapeBtns.forEach(btn => btn.addEventListener('click', () => switchShape(btn.dataset.shape)));
  document.getElementById('btnArea').addEventListener('click', calculateArea);
  document.getElementById('btnPerimeter').addEventListener('click', calculatePerimeter);
  document.getElementById('btnClear').addEventListener('click', clearAll);

  // Scientific Calculator Open/Close Logic
  const sciModeBtn = document.getElementById('sciModeBtn');
  const closeSciBtn = document.getElementById('closeSciBtn');
  const sciPanel = document.getElementById('scientificPanel');
  const mainGroups = document.querySelectorAll('.shape-group');
  const topBar = document.querySelector('.top-bar');
  const unitSel = document.querySelector('.unit-selector');
  
  if (sciModeBtn) {
    sciModeBtn.addEventListener('click', () => {
      sciPanel.classList.remove('hidden');
      document.querySelector('main.calculator').classList.add('hidden');
      mainGroups.forEach(g => g.classList.add('hidden'));
      if(topBar) topBar.classList.add('hidden');
      if(unitSel) unitSel.classList.add('hidden');
    });
  }
  
  if (closeSciBtn) {
    closeSciBtn.addEventListener('click', () => {
      sciPanel.classList.add('hidden');
      document.querySelector('main.calculator').classList.remove('hidden');
      mainGroups.forEach(g => g.classList.remove('hidden'));
      if(topBar) topBar.classList.remove('hidden');
      if(unitSel) unitSel.classList.remove('hidden');
    });
  }

  // Setup Features
  setupThemeToggle();
  setupHistory();
  setupUnitSelector();
  setupExplanation();
  setupPrintAndCopy();
  
  switchShape('rectangle');
}

init();

init();

// ==================== INSTALL APP LOGIC (PWA) ====================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Browser ko rok lein ke wo khud se popup na dikhaye
  e.preventDefault();
  deferredPrompt = e;
  
  // Hamara banaya hua "Install App" button dikhayein
  const installBtn = document.getElementById('installAppBtn');
  if (installBtn) {
    installBtn.classList.remove('hidden');
  }
});

// Jab user "Install App" wale button par click kare
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installAppBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      
      // Install ka popup dikhayein
      deferredPrompt.prompt();
      
      // User ka jawab check karein
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Prompt ek baar use hone ke baad reset kar dein
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });
  }
});

// ==================== PWA SERVICE WORKER ====================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}// ==================== GOOGLE TRANSLATE LANGUAGE CHANGE ====================
function changeLanguage(langCode) {
  // Agar English select ki hai, toh original state par wapas aayein
  if (langCode === 'en') {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
    return;
  }

  // Google Translate ki hidden dropdown ko dhoondein aur language change karein
  const selectField = document.querySelector('.goog-te-combo');
  if (selectField) {
    selectField.value = langCode;
    selectField.dispatchEvent(new Event('change'));
  } else {
    // Agar dropdown load nahi hua, to cookie set karke reload karein
    document.cookie = "googtrans=/en/" + langCode + "; path=/";
    location.reload();
  }
}