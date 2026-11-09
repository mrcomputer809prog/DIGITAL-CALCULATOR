/* ============================================================
   GEOMETRIC SHAPES CALCULATOR — JAVASCRIPT (v5 FINAL)
   2D + 3D Shapes, All Features
   ============================================================ */

// ========== 1. SHAPES DATABASE ==========
const SHAPES = {
  // ==================== 2D SHAPES ====================
  rectangle: {
    type: '2D',
    name: 'Rectangle',
    formula: 'Area = Length × Width  |  Perimeter = 2 × (Length + Width)',
    fields: [
      { key: 'length', label: 'Length', placeholder: 'e.g. 5' },
      { key: 'width',  label: 'Width',  placeholder: 'e.g. 3' }
    ],
    area: (v) => v.length * v.width,
    perimeter: (v) => 2 * (v.length + v.width),
    explanation: {
      title: '▭ Rectangle',
      howItWorks: 'A rectangle has 4 sides where opposite sides are equal.',
      areaExplained: 'Area = Length × Width.',
      perimeterExplained: 'Perimeter = 2 × (Length + Width).',
      example: {
        inputs: 'Length = 5 cm, Width = 3 cm',
        area: 'Area = 5 × 3 = 15 cm²',
        perimeter: 'Perimeter = 2 × (5 + 3) = 16 cm'
      }
    }
  },

  square: {
    type: '2D',
    name: 'Square',
    formula: 'Area = Side²  |  Perimeter = 4 × Side',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 4' }],
    area: (v) => v.side * v.side,
    perimeter: (v) => 4 * v.side,
    explanation: {
      title: '□ Square',
      howItWorks: 'A square has 4 equal sides.',
      areaExplained: 'Area = Side × Side.',
      perimeterExplained: 'Perimeter = 4 × Side.',
      example: {
        inputs: 'Side = 4 cm',
        area: 'Area = 4 × 4 = 16 cm²',
        perimeter: 'Perimeter = 4 × 4 = 16 cm'
      }
    }
  },

  triangle: {
    type: '2D',
    name: 'Triangle',
    formula: 'Area = ½ × Base × Height  |  Perimeter = A + B + C',
    fields: [
      { key: 'base',   label: 'Base',   placeholder: 'e.g. 6' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 4' },
      { key: 'sideA',  label: 'Side A', placeholder: 'e.g. 5' },
      { key: 'sideB',  label: 'Side B', placeholder: 'e.g. 5' },
      { key: 'sideC',  label: 'Side C', placeholder: 'e.g. 6' }
    ],
    area: (v) => 0.5 * v.base * v.height,
    perimeter: (v) => v.sideA + v.sideB + v.sideC,
    explanation: {
      title: '△ Triangle',
      howItWorks: 'A triangle has 3 sides. Sum of angles = 180°.',
      areaExplained: 'Area = ½ × Base × Height.',
      perimeterExplained: 'Perimeter = A + B + C.',
      example: {
        inputs: 'Base = 6 cm, Height = 4 cm, Sides = 5, 5, 6 cm',
        area: 'Area = ½ × 6 × 4 = 12 cm²',
        perimeter: 'Perimeter = 5 + 5 + 6 = 16 cm'
      }
    }
  },

  circle: {
    type: '2D',
    name: 'Circle',
    formula: 'Area = π × r²  |  Circumference = 2 × π × r',
    fields: [{ key: 'radius', label: 'Radius', placeholder: 'e.g. 7' }],
    area: (v) => Math.PI * v.radius * v.radius,
    perimeter: (v) => 2 * Math.PI * v.radius,
    explanation: {
      title: '◯ Circle',
      howItWorks: 'π (pi) ≈ 3.14159.',
      areaExplained: 'Area = π × r².',
      perimeterExplained: 'Circumference = 2 × π × r.',
      example: {
        inputs: 'Radius = 7 cm',
        area: 'Area ≈ 153.94 cm²',
        perimeter: 'Circumference ≈ 43.98 cm'
      }
    }
  },

  parallelogram: {
    type: '2D',
    name: 'Parallelogram',
    formula: 'Area = Base × Height  |  Perimeter = 2 × (Base + Side)',
    fields: [
      { key: 'base',   label: 'Base',   placeholder: 'e.g. 8' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 5' },
      { key: 'side',   label: 'Side',   placeholder: 'e.g. 6' }
    ],
    area: (v) => v.base * v.height,
    perimeter: (v) => 2 * (v.base + v.side),
    explanation: {
      title: '▱ Parallelogram',
      howItWorks: 'Opposite sides are parallel and equal.',
      areaExplained: 'Area = Base × Height.',
      perimeterExplained: 'Perimeter = 2 × (Base + Side).',
      example: {
        inputs: 'Base = 8 cm, Height = 5 cm, Side = 6 cm',
        area: 'Area = 40 cm²',
        perimeter: 'Perimeter = 28 cm'
      }
    }
  },

  rhombus: {
    type: '2D',
    name: 'Rhombus',
    formula: 'Area = (d1 × d2) / 2  |  Perimeter = 4 × Side',
    fields: [
      { key: 'd1',   label: 'Diagonal 1', placeholder: 'e.g. 6' },
      { key: 'd2',   label: 'Diagonal 2', placeholder: 'e.g. 8' },
      { key: 'side', label: 'Side',       placeholder: 'e.g. 5' }
    ],
    area: (v) => (v.d1 * v.d2) / 2,
    perimeter: (v) => 4 * v.side,
    explanation: {
      title: '◇ Rhombus',
      howItWorks: '4 equal sides, diagonals bisect at 90°.',
      areaExplained: 'Area = (d1 × d2) / 2.',
      perimeterExplained: 'Perimeter = 4 × Side.',
      example: {
        inputs: 'd1 = 6 cm, d2 = 8 cm, Side = 5 cm',
        area: 'Area = 24 cm²',
        perimeter: 'Perimeter = 20 cm'
      }
    }
  },

  trapezoid: {
    type: '2D',
    name: 'Trapezoid',
    formula: 'Area = ½ × (a + b) × h  |  Perimeter = a + b + c + d',
    fields: [
      { key: 'a',     label: 'Parallel Side A', placeholder: 'e.g. 8' },
      { key: 'b',     label: 'Parallel Side B', placeholder: 'e.g. 5' },
      { key: 'h',     label: 'Height',          placeholder: 'e.g. 4' },
      { key: 'sideC', label: 'Side C',          placeholder: 'e.g. 5' },
      { key: 'sideD', label: 'Side D',          placeholder: 'e.g. 5' }
    ],
    area: (v) => 0.5 * (v.a + v.b) * v.h,
    perimeter: (v) => v.a + v.b + v.sideC + v.sideD,
    explanation: {
      title: '⏢ Trapezoid',
      howItWorks: '2 parallel sides (a, b), 2 non-parallel.',
      areaExplained: 'Area = ½ × (a + b) × h.',
      perimeterExplained: 'Perimeter = a + b + c + d.',
      example: {
        inputs: 'a=8, b=5, h=4, c=5, d=5 cm',
        area: 'Area = 26 cm²',
        perimeter: 'Perimeter = 23 cm'
      }
    }
  },

  pentagon: {
    type: '2D',
    name: 'Regular Pentagon',
    formula: 'Area = (5/4) × s² × (1/tan(π/5))  |  Perimeter = 5 × s',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 5' }],
    area: (v) => (5 / 4) * v.side * v.side * (1 / Math.tan(Math.PI / 5)),
    perimeter: (v) => 5 * v.side,
    explanation: {
      title: '⬠ Regular Pentagon',
      howItWorks: '5 equal sides, each interior angle 108°.',
      areaExplained: 'Area = (5/4) × s² × (1/tan(π/5)).',
      perimeterExplained: 'Perimeter = 5 × Side.',
      example: {
        inputs: 'Side = 5 cm',
        area: 'Area ≈ 43.01 cm²',
        perimeter: 'Perimeter = 25 cm'
      }
    }
  },

  hexagon: {
    type: '2D',
    name: 'Regular Hexagon',
    formula: 'Area = (3√3 / 2) × s²  |  Perimeter = 6 × s',
    fields: [{ key: 'side', label: 'Side', placeholder: 'e.g. 4' }],
    area: (v) => (3 * Math.sqrt(3) / 2) * v.side * v.side,
    perimeter: (v) => 6 * v.side,
    explanation: {
      title: '⬡ Regular Hexagon',
      howItWorks: '6 equal sides, 6 equilateral triangles.',
      areaExplained: 'Area = (3√3/2) × s².',
      perimeterExplained: 'Perimeter = 6 × Side.',
      example: {
        inputs: 'Side = 4 cm',
        area: 'Area ≈ 41.57 cm²',
        perimeter: 'Perimeter = 24 cm'
      }
    }
  },

  ellipse: {
    type: '2D',
    name: 'Ellipse',
    formula: 'Area = π × a × b  |  Perimeter ≈ π × [3(a+b) − √((3a+b)(a+3b))]',
    fields: [
      { key: 'a', label: 'Semi-major (a)', placeholder: 'e.g. 8' },
      { key: 'b', label: 'Semi-minor (b)', placeholder: 'e.g. 5' }
    ],
    area: (v) => Math.PI * v.a * v.b,
    perimeter: (v) => {
      const a = v.a, b = v.b;
      return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
    },
    explanation: {
      title: '⬭ Ellipse',
      howItWorks: 'Stretched circle with two axes.',
      areaExplained: 'Area = π × a × b.',
      perimeterExplained: 'Ramanujan approximation.',
      example: {
        inputs: 'a = 8 cm, b = 5 cm',
        area: 'Area ≈ 125.66 cm²',
        perimeter: 'Perimeter ≈ 41.39 cm'
      }
    }
  },

  // ==================== 3D SHAPES ====================
  cube: {
    type: '3D',
    name: 'Cube',
    formula: 'Volume = s³  |  Surface Area = 6s²',
    fields: [
      { key: 'side', label: 'Side', placeholder: 'e.g. 4' }
    ],
    area: (v) => v.side * v.side * v.side,
    perimeter: (v) => 6 * v.side * v.side,
    explanation: {
      title: '🧊 Cube',
      howItWorks: '6 equal square faces.',
      areaExplained: 'Volume = Side³.',
      perimeterExplained: 'Surface Area = 6 × Side².',
      example: {
        inputs: 'Side = 4 cm',
        area: 'Volume = 64 cm³',
        perimeter: 'Surface Area = 96 cm²'
      }
    }
  },

  cuboid: {
    type: '3D',
    name: 'Cuboid',
    formula: 'Volume = l × w × h  |  Surface Area = 2(lw + lh + wh)',
    fields: [
      { key: 'length', label: 'Length', placeholder: 'e.g. 5' },
      { key: 'width',  label: 'Width',  placeholder: 'e.g. 3' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 4' }
    ],
    area: (v) => v.length * v.width * v.height,
    perimeter: (v) => 2 * (v.length * v.width + v.length * v.height + v.width * v.height),
    explanation: {
      title: '📦 Cuboid',
      howItWorks: 'Box shape with 6 rectangular faces.',
      areaExplained: 'Volume = Length × Width × Height.',
      perimeterExplained: 'Surface Area = 2(lw + lh + wh).',
      example: {
        inputs: '5, 3, 4 cm',
        area: 'Volume = 60 cm³',
        perimeter: 'Surface Area = 94 cm²'
      }
    }
  },

  sphere: {
    type: '3D',
    name: 'Sphere',
    formula: 'Volume = (4/3)πr³  |  Surface Area = 4πr²',
    fields: [
      { key: 'radius', label: 'Radius', placeholder: 'e.g. 5' }
    ],
    area: (v) => (4 / 3) * Math.PI * v.radius * v.radius * v.radius,
    perimeter: (v) => 4 * Math.PI * v.radius * v.radius,
    explanation: {
      title: '🔮 Sphere',
      howItWorks: 'Perfectly round 3D ball.',
      areaExplained: 'Volume = (4/3) × π × r³.',
      perimeterExplained: 'Surface Area = 4 × π × r².',
      example: {
        inputs: 'Radius = 5 cm',
        area: 'Volume ≈ 523.60 cm³',
        perimeter: 'Surface Area ≈ 314.16 cm²'
      }
    }
  },

  cylinder: {
    type: '3D',
    name: 'Cylinder',
    formula: 'Volume = πr²h  |  Surface Area = 2πr(r + h)',
    fields: [
      { key: 'radius', label: 'Radius', placeholder: 'e.g. 3' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 10' }
    ],
    area: (v) => Math.PI * v.radius * v.radius * v.height,
    perimeter: (v) => 2 * Math.PI * v.radius * (v.radius + v.height),
    explanation: {
      title: '🥫 Cylinder',
      howItWorks: '2 circular bases and curved surface.',
      areaExplained: 'Volume = π × r² × h.',
      perimeterExplained: 'Surface Area = 2πr(r + h).',
      example: {
        inputs: 'Radius = 3, Height = 10 cm',
        area: 'Volume ≈ 282.74 cm³',
        perimeter: 'Surface Area ≈ 245.04 cm²'
      }
    }
  },

  cone: {
    type: '3D',
    name: 'Cone',
    formula: 'Volume = (1/3)πr²h  |  Surface Area = πr(r + l)',
    fields: [
      { key: 'radius', label: 'Radius', placeholder: 'e.g. 3' },
      { key: 'height', label: 'Height', placeholder: 'e.g. 4' },
      { key: 'slant',  label: 'Slant Height', placeholder: 'e.g. 5' }
    ],
    area: (v) => (1 / 3) * Math.PI * v.radius * v.radius * v.height,
    perimeter: (v) => Math.PI * v.radius * (v.radius + v.slant),
    explanation: {
      title: '🍦 Cone',
      howItWorks: 'Circular base and pointed top.',
      areaExplained: 'Volume = (1/3) × π × r² × h.',
      perimeterExplained: 'Surface Area = πr(r + l).',
      example: {
        inputs: 'r=3, h=4, l=5 cm',
        area: 'Volume ≈ 37.70 cm³',
        perimeter: 'Surface Area ≈ 75.40 cm²'
      }
    }
  },

  pyramid: {
    type: '3D',
    name: 'Square Pyramid',
    formula: 'Volume = (1/3)b²h  |  Surface Area = b² + 2bl',
    fields: [
      { key: 'base',   label: 'Base Side', placeholder: 'e.g. 6' },
      { key: 'height', label: 'Height',    placeholder: 'e.g. 4' },
      { key: 'slant',  label: 'Slant Height', placeholder: 'e.g. 5' }
    ],
    area: (v) => (1 / 3) * v.base * v.base * v.height,
    perimeter: (v) => v.base * v.base + 2 * v.base * v.slant,
    explanation: {
      title: '🔺 Square Pyramid',
      howItWorks: 'Square base + 4 triangular faces.',
      areaExplained: 'Volume = (1/3) × b² × h.',
      perimeterExplained: 'Surface Area = b² + 2bl.',
      example: {
        inputs: 'Base=6, Height=4, Slant=5 cm',
        area: 'Volume = 48 cm³',
        perimeter: 'Surface Area = 96 cm²'
      }
    }
  }
};


// ========== 2. DOM ELEMENTS ==========
const inputFieldsDiv    = document.getElementById('inputFields');
const formulaHintEl     = document.getElementById('formulaHint');
const resultAreaEl      = document.getElementById('resultArea');
const resultPerimeterEl = document.getElementById('resultPerimeter');
const label1El          = document.getElementById('label1');
const label2El          = document.getElementById('label2');
const errorBox          = document.getElementById('errorBox');
const errorTextEl       = document.getElementById('errorText');
const shapeBtns         = document.querySelectorAll('.shape-btn');

let currentShape = 'rectangle';
let explanationVisible = false;


// ========== 3. HELPERS ==========
function hideError() { errorBox.classList.add('hidden'); }
function showError(msg) { errorTextEl.textContent = msg; errorBox.classList.remove('hidden'); }
function resetResults() {
  resultAreaEl.textContent = '—';
  resultPerimeterEl.textContent = '—';
  hideError();
}

function formatNumber(num) {
  if (Number.isInteger(num)) return num.toString();
  return num.toFixed(4).replace(/\.?0+$/, '');
}

function getCurrentUnit() {
  const select = document.getElementById('unitSelect');
  return select ? select.value : 'cm';
}

function getUnitSuffix(type) {
  const unit = getCurrentUnit();
  if (type === 'area') return unit + '²';
  if (type === 'volume') return unit + '³';
  return unit;
}


// ========== 4. RENDER INPUTS ==========
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
          <input type="number" step="any" min="0.0001"
                 id="input-${field.key}" data-key="${field.key}"
                 placeholder="${field.placeholder}"
                 inputmode="decimal">
          <span class="input-unit-label">${unit}</span>
        </div>
      </div>`;
  });
  inputFieldsDiv.innerHTML = html;
}


// ========== 5. VALIDATE ==========
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
      errorMsgs.push(`"${field.label}" must be a positive number.`);
      hasError = true;
    } else {
      values[field.key] = num;
    }
  });

  if (!hasError && currentShape === 'triangle') {
    const a = values.sideA, b = values.sideB, c = values.sideC;
    if (a + b <= c || a + c <= b || b + c <= a) {
      errorMsgs.push('Triangle sides are not valid.');
      hasError = true;
    }
  }

  if (hasError) { showError(errorMsgs.join(' ')); return null; }
  hideError();
  return values;
}


// ========== 6. CALCULATE ==========
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
  } catch (e) {
    showError('Calculation error.');
  }
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
  } catch (e) {
    showError('Calculation error.');
  }
}

function clearAll() {
  const allInputs = inputFieldsDiv.querySelectorAll('input');
  allInputs.forEach(inp => { inp.value = ''; inp.classList.remove('error-input'); });
  resetResults();
}


// ========== 7. SWITCH SHAPE ==========
function switchShape(shapeKey) {
  if (!SHAPES[shapeKey]) return;

  currentShape = shapeKey;
  const shape = SHAPES[shapeKey];
  const is3D = shape.type === '3D';

  shapeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.shape === shapeKey);
  });

  // Labels + buttons update
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

  if (explanationVisible) {
    renderExplanation();
  }
}


// ========== 8. THEME TOGGLE ==========
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  const toggleIcon = toggleBtn.querySelector('.toggle-icon');
  const toggleText = toggleBtn.querySelector('.toggle-text');
  if (!toggleIcon || !toggleText) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleIcon.textContent = '☀️';
    toggleText.textContent = 'Light Mode';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    if (isDark) {
      toggleIcon.textContent = '☀️';
      toggleText.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleIcon.textContent = '🌙';
      toggleText.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
}


// ========== 9. HISTORY ==========
const HISTORY_KEY = 'calcHistory';
const MAX_HISTORY = 20;

function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
}

function saveHistory(history) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); }
  catch (e) { console.warn('Could not save history'); }
}

function saveToHistory(type, result) {
  const shape = SHAPES[currentShape];
  const inputValues = {};
  shape.fields.forEach(field => {
    const inp = document.getElementById(`input-${field.key}`);
    if (inp) inputValues[field.label] = inp.value;
  });

  const entry = {
    shape: shape.name,
    type: type,
    inputs: inputValues,
    result: result,
    time: new Date().toLocaleTimeString()
  };

  const history = getHistory();
  history.unshift(entry);
  if (history.length > MAX_HISTORY) history.pop();
  saveHistory(history);
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
  const history = getHistory();

  if (history.length === 0) {
    list.innerHTML = '<p class="history-empty" id="historyEmpty">No calculations yet. Try one above!</p>';
    return;
  }

  let html = '';
  history.forEach(item => {
    const inputsText = Object.entries(item.inputs)
      .map(([label, value]) => `${label}: ${value}`).join(', ');
    html += `
      <div class="history-item">
        <span class="history-shape-badge">${item.shape}</span>
        <div class="history-details">
          <span class="history-inputs">${inputsText}</span>
          <span class="history-results">${item.type}: <strong>${item.result}</strong></span>
        </div>
        <span class="history-time">🕐 ${item.time}</span>
      </div>`;
  });
  list.innerHTML = html;
}

function clearHistory() {
  if (!confirm('Clear all history?')) return;
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function setupHistory() {
  const clearBtn = document.getElementById('btnClearHistory');
  if (clearBtn) clearBtn.addEventListener('click', clearHistory);
  renderHistory();
}


// ========== 10. UNIT SELECTOR ==========
function setupUnitSelector() {
  const unitSelect = document.getElementById('unitSelect');
  if (!unitSelect) return;
  unitSelect.addEventListener('change', () => {
    renderInputs(currentShape);
    resetResults();
  });
}


// ========== 11. EXPLANATION ==========
function setupExplanation() {
  const toggleBtn = document.getElementById('explanationToggle');
  const content = document.getElementById('explanationContent');
  if (!toggleBtn || !content) return;

  toggleBtn.addEventListener('click', () => {
    explanationVisible = !explanationVisible;
    content.classList.toggle('hidden', !explanationVisible);
    if (explanationVisible) {
      toggleBtn.textContent = '📖 Hide Formula Explanation';
      renderExplanation();
    } else {
      toggleBtn.textContent = '📖 Show Formula Explanation';
    }
  });
}

function renderExplanation() {
  const titleEl = document.getElementById('explanationTitle');
  const bodyEl = document.getElementById('explanationBody');
  if (!titleEl || !bodyEl) return;

  const shape = SHAPES[currentShape];
  if (!shape || !shape.explanation) {
    bodyEl.innerHTML = '<p>Explanation not available.</p>';
    return;
  }

  const exp = shape.explanation;
  titleEl.textContent = exp.title;

  bodyEl.innerHTML = `
    <p><strong>How it works:</strong> ${exp.howItWorks}</p>
    <p><strong>Area/Volume Explained:</strong></p>
    <div class="explanation-formula-box">${exp.areaExplained}</div>
    <p><strong>Perimeter/Surface Area Explained:</strong></p>
    <div class="explanation-formula-box">${exp.perimeterExplained}</div>
    <div class="explanation-example">
      <strong>📝 Example Calculation:</strong>
      <p><strong>Inputs:</strong> ${exp.example.inputs}</p>
      <p><strong>${exp.example.area}</strong></p>
      <p><strong>${exp.example.perimeter}</strong></p>
    </div>
  `;
}


// ========== 12. EVENTS ==========
function initEvents() {
  shapeBtns.forEach(btn => {
    btn.addEventListener('click', () => switchShape(btn.dataset.shape));
  });
  document.getElementById('btnArea').addEventListener('click', calculateArea);
  document.getElementById('btnPerimeter').addEventListener('click', calculatePerimeter);
  document.getElementById('btnClear').addEventListener('click', clearAll);
}


// ========== 14. PRINT FUNCTION ==========
function setupPrint() {
  const printBtn = document.getElementById('btnPrint');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// ========== 15. START PROGRAM ==========
function init() {
  initEvents();
  setupThemeToggle();
  setupHistory();
  setupUnitSelector();
  setupExplanation();
  setupPrint(); 
  switchShape('rectangle');
}

init();