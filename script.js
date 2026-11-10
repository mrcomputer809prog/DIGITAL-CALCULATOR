/* ============================================================
   DIGITAL CALCULATOR - FINAL PERFECT SCRIPT (PART 1)
   ============================================================ */

// ==================== 1. SHAPES DATABASE ====================
const SHAPES = {
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
  },
  hemisphere: {
    type: '3D', name: 'Hemisphere', formula: 'Volume = (2/3)πr³ | Surface Area = 3πr²',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 5' }],
    area: (v) => (2 / 3) * Math.PI * v.radius * v.radius * v.radius, perimeter: (v) => 3 * Math.PI * v.radius * v.radius,
    explanation: { title: '🌗 Hemisphere', howItWorks: 'Half sphere.', areaExplained: '(2/3)πr³', perimeterExplained: '3πr²', example: { inputs: '5 cm', area: '261.80 cm³', perimeter: '235.62 cm²' } }
  },
  torus: {
    type: '3D', name: 'Torus', formula: 'Volume = 2π²Rr² | Surface Area = 4π²Rr',
    fields: [{ key: 'R', label: 'Major Radius (R)', placeholder: 'e.g. 10' }, { key: 'r', label: 'Minor Radius (r)', placeholder: 'e.g. 2' }],
    area: (v) => 2 * Math.PI * Math.PI * v.R * v.r * v.r, perimeter: (v) => 4 * Math.PI * Math.PI * v.R * v.r,
    explanation: { title: '🍩 Torus', howItWorks: 'Donut shape.', areaExplained: '2π²Rr²', perimeterExplained: '4π²Rr', example: { inputs: 'R=10, r=2', area: '789.56 cm³', perimeter: '789.56 cm²' } }
  }
};

// ==================== 2. UNIT CONVERTER DATABASE ====================
const CONVERSION_DATA = {
  length: {
    units: { m: 'Meter (m)', km: 'Kilometer (km)', cm: 'Centimeter (cm)', mm: 'Millimeter (mm)', in: 'Inch (in)', ft: 'Foot (ft)', mi: 'Mile (mi)' },
    rates: { m: 1, km: 1000, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048, mi: 1609.34 }
  },
  weight: {
    units: { kg: 'Kilogram (kg)', g: 'Gram (g)', mg: 'Milligram (mg)', lb: 'Pound (lb)', oz: 'Ounce (oz)' },
    rates: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 }
  },
  temp: {
    units: { C: 'Celsius (°C)', F: 'Fahrenheit (°F)', K: 'Kelvin (K)' }
  },
  data: {
    units: { B: 'Bytes (B)', KB: 'Kilobytes (KB)', MB: 'Megabytes (MB)', GB: 'Gigabytes (GB)', TB: 'Terabytes (TB)' },
    rates: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
  },
  time: {
    units: { sec: 'Seconds', min: 'Minutes', hr: 'Hours', day: 'Days' },
    rates: { sec: 1, min: 60, hr: 3600, day: 86400 }
  }
};// ==================== 3. GLOBAL VARIABLES & DOM ====================
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
let sciExpression = "";
let deferredPrompt;
let exchangeRates = {};

// ==================== 4. HELPER FUNCTIONS ====================
function hideError() { errorBox.classList.add('hidden'); }
function showError(msg) { errorTextEl.textContent = msg; errorBox.classList.remove('hidden'); }
function resetResults() { resultAreaEl.textContent = '—'; resultPerimeterEl.textContent = '—'; hideError(); }
function formatNumber(num) { return Number.isInteger(num) ? num.toString() : num.toFixed(4).replace(/\.?0+$/, ''); }
function getCurrentUnit() { const s = document.getElementById('unitSelect'); return s ? s.value : 'cm'; }
function getUnitSuffix(type) { const u = getCurrentUnit(); return type === 'area' ? u + '²' : type === 'volume' ? u + '³' : u; }

function playClick() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

function speakResult(text) {
  if (!soundEnabled) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; utterance.rate = 0.9; utterance.pitch = 1.2; utterance.volume = 1.0;
    setTimeout(() => { window.speechSynthesis.speak(utterance); }, 400);
  }
}

// ==================== 5. SHAPES LOGIC ====================
function renderInputs(shapeKey) {
  const shape = SHAPES[shapeKey];
  if (!shape) return;
  formulaHintEl.textContent = shape.formula;
  const unit = getCurrentUnit();
  let html = '';
  shape.fields.forEach(field => {
    html += `<div class="input-group"><label for="input-${field.key}">${field.label}</label><div class="input-with-unit"><input type="number" step="any" min="0.0001" id="input-${field.key}" data-key="${field.key}" placeholder="${field.placeholder}" inputmode="decimal"><span class="input-unit-label">${unit}</span></div></div>`;
  });
  inputFieldsDiv.innerHTML = html;
}

function readAndValidateInputs() {
  const shape = SHAPES[currentShape]; const values = {}; let hasError = false; let errorMsgs = [];
  const allInputs = inputFieldsDiv.querySelectorAll('input'); allInputs.forEach(inp => inp.classList.remove('error-input'));
  shape.fields.forEach(field => {
    const input = document.getElementById(`input-${field.key}`); if (!input) return;
    const raw = input.value.trim(); const num = parseFloat(raw);
    if (raw === '' || isNaN(num) || num <= 0) { input.classList.add('error-input'); errorMsgs.push(`"${field.label}" must be positive.`); hasError = true; } 
    else { values[field.key] = num; }
  });
  if (!hasError && currentShape === 'triangle') {
    const a = values.sideA, b = values.sideB, c = values.sideC;
    if (a + b <= c || a + c <= b || b + c <= a) { errorMsgs.push('Invalid triangle sides.'); hasError = true; }
  }
  if (hasError) { showError(errorMsgs.join(' ')); return null; }
  hideError(); return values;
}

function calculateArea() {
  const values = readAndValidateInputs(); if (!values) return;
  const shape = SHAPES[currentShape]; const is3D = shape.type === '3D';
  try {
    const result = shape.area(values);
    const suffix = is3D ? getUnitSuffix('volume') : getUnitSuffix('area');
    const text = formatNumber(result) + ' ' + suffix;
    resultAreaEl.textContent = text;
    saveToHistory(is3D ? 'Volume' : 'Area', text);
    let speakText = is3D ? "The volume is " : "The area is ";
    speakResult(speakText + formatNumber(result) + " " + (is3D ? "cubic" : "square") + " " + getCurrentUnit());
  } catch (e) { showError('Calculation error.'); }
}

function calculatePerimeter() {
  const values = readAndValidateInputs(); if (!values) return;
  const shape = SHAPES[currentShape]; const is3D = shape.type === '3D';
  try {
    const result = shape.perimeter(values);
    const suffix = is3D ? getUnitSuffix('area') : getUnitSuffix('perimeter');
    const text = formatNumber(result) + ' ' + suffix;
    resultPerimeterEl.textContent = text;
    saveToHistory(is3D ? 'Surface Area' : 'Perimeter', text);
    let speakText = is3D ? "The surface area is " : "The perimeter is ";
    speakResult(speakText + formatNumber(result) + " " + (is3D ? "square" : "") + " " + getCurrentUnit());
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
    label1El.textContent = 'Volume'; label2El.textContent = 'Surface Area';
    document.getElementById('btnArea').textContent = '📦 Calculate Volume';
    document.getElementById('btnPerimeter').textContent = '📐 Calculate Surface Area';
  } else {
    label1El.textContent = 'Area'; label2El.textContent = 'Perimeter';
    document.getElementById('btnArea').textContent = '📐 Calculate Area';
    document.getElementById('btnPerimeter').textContent = '📏 Calculate Perimeter';
  }
  renderInputs(shapeKey);
  resetResults();
  if (explanationVisible) renderExplanation();
}

// ==================== 6. SCIENTIFIC CALCULATOR ====================
function updateSciDisplay() { const d = document.getElementById('sciDisplay'); if (d) d.value = sciExpression; }
function sciInput(val) { sciExpression += val; updateSciDisplay(); }
function sciClear() { sciExpression = ""; updateSciDisplay(); }
function sciDelete() { sciExpression = sciExpression.slice(0, -1); updateSciDisplay(); }
function sciCalculate() {
  try {
    function factorial(n) { if (n === 0 || n === 1) return 1; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
    let evalString = sciExpression
      .replace(/sin⁻¹\(/g, 'Math.asin(').replace(/asin\(/g, 'Math.asin(')
      .replace(/cos⁻¹\(/g, 'Math.acos(').replace(/acos\(/g, 'Math.acos(')
      .replace(/tan⁻¹\(/g, 'Math.atan(').replace(/atan\(/g, 'Math.atan(')
      .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(').replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(').replace(/√\(/g, 'Math.sqrt(')
      .replace(/π/g, 'Math.PI').replace(/\^/g, '**');
    evalString = evalString.replace(/(\d+)!/g, 'factorial($1)');
    let result = Function('"use strict";return (' + evalString + ', factorial)')(factorial);
    sciExpression = (isNaN(result) || !isFinite(result)) ? "Error" : (Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, ''));
    updateSciDisplay();
  } catch (error) { sciExpression = "Error"; updateSciDisplay(); }
}// ==================== 7. UNIT CONVERTER LOGIC ====================
function updateConverterUnits() {
  const category = document.getElementById('convCategory').value;
  const fromSelect = document.getElementById('convFrom'); const toSelect = document.getElementById('convTo');
  fromSelect.innerHTML = ''; toSelect.innerHTML = '';
  const units = CONVERSION_DATA[category].units;
  for (let key in units) { fromSelect.innerHTML += `<option value="${key}">${units[key]}</option>`; toSelect.innerHTML += `<option value="${key}">${units[key]}</option>`; }
  if (category === 'length') toSelect.value = 'km'; if (category === 'weight') toSelect.value = 'g'; if (category === 'temp') toSelect.value = 'F';
  if (category === 'data') toSelect.value = 'MB'; if (category === 'time') toSelect.value = 'hr';
  convertUnit();
}
function convertUnit() {
  const category = document.getElementById('convCategory').value;
  const inputVal = parseFloat(document.getElementById('convInput').value);
  const fromUnit = document.getElementById('convFrom').value; const toUnit = document.getElementById('convTo').value;
  const outputField = document.getElementById('convOutput');
  if (isNaN(inputVal)) { outputField.value = ''; return; }
  let result = 0;
  if (category === 'temp') {
    let celsius; if (fromUnit === 'C') celsius = inputVal; else if (fromUnit === 'F') celsius = (inputVal - 32) * 5/9; else if (fromUnit === 'K') celsius = inputVal - 273.15;
    if (toUnit === 'C') result = celsius; else if (toUnit === 'F') result = (celsius * 9/5) + 32; else if (toUnit === 'K') result = celsius + 273.15;
  } else {
    const rates = CONVERSION_DATA[category].rates; const baseValue = inputVal * rates[fromUnit]; result = baseValue / rates[toUnit];
  }
  outputField.value = Number(result.toFixed(5)).toString();
}

// ==================== 8. RATIO LOGIC ====================
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function calculateRatio() {
  const inputText = document.getElementById('ratioInputs').value.trim();
  const resultField = document.getElementById('ratioResult');
  if (!inputText) { resultField.textContent = "⚠️ Enter numbers"; return; }
  const nums = inputText.split(/[\s,]+/).map(Number);
  if (nums.some(isNaN) || nums.length < 2) { resultField.textContent = "⚠️ Enter at least 2 valid numbers"; return; }
  if (nums.includes(0)) { resultField.textContent = "⚠️ Numbers cannot be zero"; return; }
  let currentGcd = nums[0];
  for (let i = 1; i < nums.length; i++) { currentGcd = gcd(currentGcd, nums[i]); }
  resultField.textContent = nums.map(n => n / currentGcd).join(' : ');
}

// ==================== 9. PERCENTAGE LOGIC ====================
function calculatePercentage() {
  const obtained = parseFloat(document.getElementById('percObtained').value);
  const total = parseFloat(document.getElementById('percTotal').value);
  const resultField = document.getElementById('percentageResult');
  if (isNaN(obtained) || isNaN(total) || total === 0) { resultField.textContent = "⚠️ Enter valid numbers"; resultField.style.color = "#ff4b2b"; return; }
  resultField.textContent = Number(((obtained / total) * 100).toFixed(2)) + "%";
  resultField.style.color = "var(--text-accent)";
}// ==================== 10. LOGARITHM LOGIC ====================
function calculateLog() {
  const type = document.getElementById('logType').value;
  const num = parseFloat(document.getElementById('logNumber').value);
  const resultField = document.getElementById('logResult');
  if (isNaN(num) || num <= 0) { resultField.textContent = "⚠️ Enter positive number"; return; }
  let result = 0;
  if (type === 'log10') result = Math.log10(num);
  else if (type === 'ln') result = Math.log(num);
  else if (type === 'log2') result = Math.log2(num);
  else if (type === 'custom') {
    const base = parseFloat(document.getElementById('logBase').value);
    if (isNaN(base) || base <= 0 || base === 1) { resultField.textContent = "⚠️ Invalid Base"; return; }
    result = Math.log(num) / Math.log(base);
  }
  resultField.textContent = Number(result.toFixed(4));
}

// ==================== 11. CURRENCY LOGIC ====================
async function fetchExchangeRates() {
  const rateInfo = document.getElementById('currencyRateInfo');
  if(rateInfo) { rateInfo.textContent = "Fetching live rates..."; rateInfo.style.color = "var(--text-secondary)"; }
  try {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
    const data = await response.json();
    if (data && data.usd) {
      exchangeRates = data.usd;
      if(rateInfo) rateInfo.textContent = "Live rates loaded successfully!";
      convertCurrency(); 
    }
  } catch (error) {
    if(rateInfo) { rateInfo.textContent = "⚠️ Failed to load rates. Check internet."; rateInfo.style.color = "#ff4b2b"; }
  }
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById('currAmount').value);
  const fromCurr = document.getElementById('currFrom').value.toLowerCase(); 
  const toCurr = document.getElementById('currTo').value.toLowerCase();     
  const resultField = document.getElementById('currencyResult');
  if (isNaN(amount) || amount <= 0) { resultField.textContent = "—"; return; }
  if (!exchangeRates[fromCurr] || !exchangeRates[toCurr]) { resultField.textContent = "⏳ Loading rates..."; return; }
  const amountInUSD = amount / exchangeRates[fromCurr];
  const convertedAmount = amountInUSD * exchangeRates[toCurr];
  resultField.textContent = `${fromCurr.toUpperCase()} ${amount} = ${toCurr.toUpperCase()} ${Number(convertedAmount.toFixed(2))}`;
}// ==================== 12. UI FEATURES ====================
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle'); if (!toggleBtn) return;
  const toggleIcon = toggleBtn.querySelector('.toggle-icon'); const toggleText = toggleBtn.querySelector('.toggle-text');
  if (localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark-mode'); toggleIcon.textContent = '☀️'; toggleText.textContent = 'Light Mode'; }
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode'); toggleIcon.textContent = isDark ? '☀️' : '🌙'; toggleText.textContent = isDark ? 'Light Mode' : 'Dark Mode'; localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

const HISTORY_KEY = 'calcHistory';
function getHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (e) { return []; } }
function saveToHistory(type, result) {
  const shape = SHAPES[currentShape]; const inputValues = {};
  shape.fields.forEach(f => { const inp = document.getElementById(`input-${f.key}`); if (inp) inputValues[f.label] = inp.value; });
  const entry = { shape: shape.name, type, inputs: inputValues, result, time: new Date().toLocaleTimeString() };
  const history = getHistory(); history.unshift(entry); if (history.length > 20) history.pop(); localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); renderHistory();
}
function renderHistory() {
  const list = document.getElementById('historyList'); if (!list) return;
  const history = getHistory(); if (history.length === 0) { list.innerHTML = '<p class="history-empty">No calculations yet.</p>'; return; }
  let html = '';
  history.forEach(item => { const inputsText = Object.entries(item.inputs).map(([l, v]) => `${l}: ${v}`).join(', '); html += `<div class="history-item"><span class="history-shape-badge">${item.shape}</span><div class="history-details"><span class="history-inputs">${inputsText}</span><span class="history-results">${item.type}: <strong>${item.result}</strong></span></div><span class="history-time">🕐 ${item.time}</span></div>`; });
  list.innerHTML = html;
}
function setupHistory() { const clearBtn = document.getElementById('btnClearHistory'); if (clearBtn) clearBtn.addEventListener('click', () => { if (confirm('Clear history?')) { localStorage.removeItem(HISTORY_KEY); renderHistory(); } }); renderHistory(); }

function setupUnitSelector() { const unitSelect = document.getElementById('unitSelect'); if (unitSelect) unitSelect.addEventListener('change', () => { renderInputs(currentShape); resetResults(); }); }

function setupExplanation() {
  const toggleBtn = document.getElementById('explanationToggle'); const content = document.getElementById('explanationContent'); if (!toggleBtn || !content) return;
  toggleBtn.addEventListener('click', () => { explanationVisible = !explanationVisible; content.classList.toggle('hidden', !explanationVisible); toggleBtn.textContent = explanationVisible ? '📖 Hide Formula Explanation' : '📖 Show Formula Explanation'; if (explanationVisible) renderExplanation(); });
}
function renderExplanation() {
  const titleEl = document.getElementById('explanationTitle'); const bodyEl = document.getElementById('explanationBody'); if (!titleEl || !bodyEl) return;
  const shape = SHAPES[currentShape]; if (!shape || !shape.explanation) { bodyEl.innerHTML = '<p>Explanation not available.</p>'; return; }
  const exp = shape.explanation; titleEl.textContent = exp.title;
  bodyEl.innerHTML = `<p><strong>How it works:</strong> ${exp.howItWorks}</p><p><strong>Formula:</strong></p><div class="explanation-formula-box">${exp.areaExplained}</div><div class="explanation-formula-box">${exp.perimeterExplained}</div><div class="explanation-example"><strong>📝 Example:</strong><p><strong>Inputs:</strong> ${exp.example.inputs}</p><p><strong>${exp.example.area}</strong></p><p><strong>${exp.example.perimeter}</strong></p></div>`;
}

function setupPrintAndCopy() {
  const printBtn = document.getElementById('btnPrint'); if (printBtn) printBtn.addEventListener('click', () => window.print());
  const copyText = (text) => { if (text && text !== '—') { navigator.clipboard.writeText(text).then(() => alert('📋 Copied: ' + text)).catch(() => alert('Copy failed.')); } else { alert('⚠️ Calculate first!'); } };
  const copyAreaBtn = document.getElementById('copyAreaBtn'); const copyPerimBtn = document.getElementById('copyPerimeterBtn');
  if (copyAreaBtn) copyAreaBtn.addEventListener('click', () => copyText(document.getElementById('resultArea').textContent));
  if (copyPerimBtn) copyPerimBtn.addEventListener('click', () => copyText(document.getElementById('resultPerimeter').textContent));
  const soundBtn = document.getElementById('soundToggle'); const soundIcon = document.getElementById('soundIcon'); const soundText = document.getElementById('soundText');
  if (soundBtn) { soundBtn.addEventListener('click', () => { soundEnabled = !soundEnabled; soundIcon.textContent = soundEnabled ? '🔊' : '🔇'; soundText.textContent = soundEnabled ? 'Sound On' : 'Sound Off'; if (soundEnabled) playClick(); else window.speechSynthesis.cancel(); }); }
  document.querySelectorAll('button').forEach(btn => { btn.addEventListener('click', () => { setTimeout(playClick, 50); }); });
}

async function changeLanguage(targetLang) {
  if (targetLang === 'en') { location.reload(); return; }
  const elementsToTranslate = document.querySelectorAll('h1, h2, h3, p, button, label, span, .shape-btn, .result-label, .result-value');
  const langSelect = document.getElementById('languageSelect'); if(!langSelect) return;
  const originalText = langSelect.options[langSelect.selectedIndex].text; langSelect.options[langSelect.selectedIndex].text = "Translating...";
  try {
    for (let el of elementsToTranslate) {
      if (el.innerText && el.innerText.trim() !== '' && !el.innerText.includes('—')) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(el.innerText)}&langpair=en|${targetLang}`;
        const response = await fetch(url); const data = await response.json();
        if (data.responseData && data.responseData.translatedText) { el.innerText = data.responseData.translatedText; }
      }
    }
  } catch (error) { console.log("Translation error:", error); } finally { langSelect.options[langSelect.selectedIndex].text = originalText; }
}

function closeAllPanels() {
  const panels = ['scientificPanel','unitConverterPanel','ratioCalculatorPanel','percentageCalculatorPanel','logCalculatorPanel','currencyCalculatorPanel'];
  panels.forEach(id => { const el = document.getElementById(id); if (el) el.classList.add('hidden'); });
  const normalCalc = document.querySelector('main.calculator'); const mainGroups = document.querySelectorAll('.shape-group');
  const topBar = document.querySelector('.top-bar'); const unitSel = document.querySelector('.unit-selector');
  if (normalCalc) normalCalc.classList.remove('hidden'); mainGroups.forEach(g => g.classList.remove('hidden'));
  if (topBar) topBar.classList.remove('hidden'); if (unitSel) unitSel.classList.remove('hidden');
}

// ==================== 13. PANEL CONTROLS ====================
function setupUnitConverter() { const btn = document.getElementById('unitConvBtn'); const close = document.getElementById('closeConvBtn'); const panel = document.getElementById('unitConverterPanel'); if(btn) btn.addEventListener('click', () => { closeAllPanels(); panel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g=>g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); updateConverterUnits(); }); if(close) close.addEventListener('click', closeAllPanels); }
function setupRatioCalculator() { const btn = document.getElementById('ratioCalcBtn'); const close = document.getElementById('closeRatioBtn'); const panel = document.getElementById('ratioCalculatorPanel'); if(btn) btn.addEventListener('click', () => { closeAllPanels(); panel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g=>g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); document.getElementById('ratioInputs').value=''; document.getElementById('ratioResult').textContent='—'; }); if(close) close.addEventListener('click', closeAllPanels); }
function setupPercentageCalculator() { const btn = document.getElementById('percentageCalcBtn'); const close = document.getElementById('closePercentageBtn'); const panel = document.getElementById('percentageCalculatorPanel'); if(btn) btn.addEventListener('click', () => { closeAllPanels(); panel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g=>g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); document.getElementById('percObtained').value=''; document.getElementById('percTotal').value=''; document.getElementById('percentageResult').textContent='—'; }); if(close) close.addEventListener('click', closeAllPanels); }
function setupLogCalculator() { const btn = document.getElementById('logCalcBtn'); const close = document.getElementById('closeLogBtn'); const panel = document.getElementById('logCalculatorPanel'); const type = document.getElementById('logType'); const customBase = document.getElementById('customBaseDiv'); if(type) type.addEventListener('change', () => { customBase.style.display = type.value === 'custom' ? 'block' : 'none'; }); if(btn) btn.addEventListener('click', () => { closeAllPanels(); panel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g=>g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); document.getElementById('logNumber').value=''; document.getElementById('logBase').value=''; document.getElementById('logResult').textContent='—'; }); if(close) close.addEventListener('click', closeAllPanels); }
function setupCurrencyCalculator() { const btn = document.getElementById('currencyCalcBtn'); const mobileBtn = document.getElementById('mobileCurrencyBtn'); const close = document.getElementById('closeCurrencyBtn'); const panel = document.getElementById('currencyCalculatorPanel'); const open = () => { closeAllPanels(); panel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g=>g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); fetchExchangeRates(); }; if(btn) btn.addEventListener('click', open); if(mobileBtn) mobileBtn.addEventListener('click', open); if(close) close.addEventListener('click', closeAllPanels); }

// ==================== 14. MOBILE MENU ====================
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn'); const menu = document.getElementById('moreToolsMenu');
  if (btn && menu) {
    btn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('show-menu'); });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target) && e.target !== btn) menu.classList.remove('show-menu'); });
    menu.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => menu.classList.remove('show-menu')));
  }
}

// ==================== 15. MAIN INIT ====================
function init() {
  shapeBtns.forEach(btn => btn.addEventListener('click', () => switchShape(btn.dataset.shape)));
  document.getElementById('btnArea').addEventListener('click', calculateArea);
  document.getElementById('btnPerimeter').addEventListener('click', calculatePerimeter);
  document.getElementById('btnClear').addEventListener('click', clearAll);

  const sciModeBtn = document.getElementById('sciModeBtn'); const closeSciBtn = document.getElementById('closeSciBtn');
  const sciPanel = document.getElementById('scientificPanel');
  if (sciModeBtn) { sciModeBtn.addEventListener('click', () => { closeAllPanels(); sciPanel.classList.remove('hidden'); document.querySelector('main.calculator').classList.add('hidden'); document.querySelectorAll('.shape-group').forEach(g => g.classList.add('hidden')); document.querySelector('.top-bar').classList.add('hidden'); document.querySelector('.unit-selector').classList.add('hidden'); }); }
  if (closeSciBtn) { closeSciBtn.addEventListener('click', closeAllPanels); }

  setupThemeToggle(); setupHistory(); setupUnitSelector(); setupExplanation(); setupPrintAndCopy();
  setupUnitConverter(); setupRatioCalculator(); setupPercentageCalculator(); setupLogCalculator(); setupCurrencyCalculator();
  setupMobileMenu();
  
  closeAllPanels();
  switchShape('rectangle');
}

init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js'); });
}