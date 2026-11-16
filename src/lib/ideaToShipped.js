// Idea to Shipped: the looping hero animation.
// Ported as-is from Tife's standalone idea-to-shipped.html; only the playback wrapper changed
// so React can start and stop it. Colours come from CSS variables on `.idea-story` (styles.css).
// `speed` multiplies the pace: the story is authored on an 18 second clock.

export function mountIdeaToShipped(svg, speed = 1) {
  const NS = 'http://www.w3.org/2000/svg';
  const T = 18;                       // loop length in seconds
  const INK = 'var(--ink)', PAPER = 'var(--paper)', ACC = 'var(--accent)', CARD = 'var(--card)', SKIN = 'var(--skin)', HAIR = 'var(--hair)',
        TOP = 'var(--top)', TR = 'var(--trouser)', TR2 = 'var(--trouser-far)', SHOE = 'var(--shoe)', SHADOW = 'var(--shadow)';
  const flat = c => ({ fill: c, stroke: c, 'stroke-width': SW, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  const soft = Object.assign({}, { fill: 'none', stroke: 'var(--line)', 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
  const SW = 7;                       // main line weight

  /* ---------- helpers ---------- */
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    (parent || svg).appendChild(e);
    return e;
  }
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const E = {
    lin: x => x,
    io: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    out: x => 1 - Math.pow(1 - x, 3),
    back: x => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
    softBack: x => { const c1 = 1.1, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
    inBack: x => { const c1 = 1.70158, c3 = c1 + 1; return c3 * x * x * x - c1 * x * x; }
  };
  const wave = (t, cycles, phase = 0) => Math.sin(2 * Math.PI * (cycles * t / T) + phase); // loops cleanly
  const V = (x, y) => ({ x, y });
  const add = (a, b) => V(a.x + b.x, a.y + b.y);
  const sub = (a, b) => V(a.x - b.x, a.y - b.y);
  const mul = (a, s) => V(a.x * s, a.y * s);
  const len = a => Math.hypot(a.x, a.y);
  const norm = a => { const l = len(a) || 1; return V(a.x / l, a.y / l); };
  const f = n => n.toFixed(1);
  const pt = p => f(p.x) + ' ' + f(p.y);

  /* ---------- poses (explicit joints, converted to limb params) ---------- */
  function basis(P, N) { const up = norm(sub(N, P)); return { up, down: mul(up, -1), r: V(-up.y, up.x) }; }
  function limb(root, mid, end) {
    const d = norm(sub(end, root)), perp = V(-d.y, d.x), m = sub(mid, root);
    return { L1: len(m), L2: len(sub(end, mid)), s: (m.x * perp.x + m.y * perp.y) >= 0 ? 1 : -1 };
  }
  function solve(root, end, L1, L2, s) {
    const dv = sub(end, root), d0 = len(dv) || 0.001;
    const d = clamp(d0, Math.abs(L1 - L2) + 0.01, L1 + L2 - 0.01);
    const a = (L1 * L1 - L2 * L2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
    const dir = V(dv.x / d0, dv.y / d0), perp = V(-dir.y, dir.x);
    return add(add(root, mul(dir, a)), mul(perp, h * s));
  }
  function mk(p) {
    const b = basis(V(...p.P), V(...p.N)), N = V(...p.N), P = V(...p.P);
    const sL = add(add(N, mul(b.down, 14)), mul(b.r, p.shL)), sR = add(add(N, mul(b.down, 14)), mul(b.r, p.shR));
    const hL = add(P, mul(b.r, -p.hs)), hR = add(P, mul(b.r, p.hs));
    const aL = limb(sL, V(...p.eL), V(...p.hL)), aR = limb(sR, V(...p.eR), V(...p.hR));
    const lL = limb(hL, V(...p.kL), V(...p.fL)), lR = limb(hR, V(...p.kR), V(...p.fR));
    return {
      Px: p.P[0], Py: p.P[1], Nx: p.N[0], Ny: p.N[1], Hx: p.H[0], Hy: p.H[1], tilt: p.tilt,
      shL: p.shL, shR: p.shR, hs: p.hs,
      hLx: p.hL[0], hLy: p.hL[1], aL1: aL.L1, aL2: aL.L2, aLs: aL.s,
      hRx: p.hR[0], hRy: p.hR[1], aR1: aR.L1, aR2: aR.L2, aRs: aR.s,
      fLx: p.fL[0], fLy: p.fL[1], lL1: lL.L1, lL2: lL.L2, lLs: lL.s,
      fRx: p.fR[0], fRy: p.fR[1], lR1: lR.L1, lR2: lR.L2, lRs: lR.s,
      shoeL: p.shoeL || 0, shoeR: p.shoeR || 0
    };
  }
  const POSE = {
    think: mk({ P: [380, 522], N: [382, 348], H: [392, 294], tilt: -5, shL: -34, shR: 34, hs: 22,
      eL: [300, 436], hL: [352, 506], eR: [446, 438], hR: [426, 338],
      kL: [352, 650], fL: [346, 776], kR: [412, 650], fR: [420, 776] }),
    aha: mk({ P: [380, 516], N: [384, 342], H: [398, 286], tilt: -13, shL: -34, shR: 34, hs: 22,
      eL: [300, 430], hL: [352, 500], eR: [480, 398], hR: [522, 316],
      kL: [352, 648], fL: [346, 776], kR: [412, 648], fR: [420, 776] }),
    hold: mk({ P: [384, 522], N: [392, 350], H: [404, 297], tilt: 2, shL: -22, shR: 26, hs: 22,
      eL: [420, 448], hL: [512, 446], eR: [454, 436], hR: [522, 414],
      kL: [354, 650], fL: [346, 776], kR: [414, 650], fR: [422, 776] }),
    windup: mk({ P: [370, 530], N: [362, 358], H: [368, 304], tilt: -5, shL: -20, shR: 24, hs: 22,
      eL: [392, 456], hL: [476, 446], eR: [424, 446], hR: [484, 414],
      kL: [344, 656], fL: [336, 776], kR: [408, 654], fR: [424, 776] }),
    push: mk({ P: [440, 548], N: [506, 388], H: [534, 342], tilt: 9, shL: -6, shR: 10, hs: 14,
      eL: [580, 422], hL: [664, 414], eR: [590, 398], hR: [668, 390],
      kL: [348, 668], fL: [262, 770], kR: [528, 664], fR: [540, 776], shoeL: 24 }),
    proud: mk({ P: [384, 520], N: [386, 344], H: [398, 288], tilt: -9, shL: -34, shR: 34, hs: 24,
      eL: [296, 434], hL: [350, 506], eR: [472, 436], hR: [418, 506],
      kL: [350, 650], fL: [338, 776], kR: [416, 650], fR: [428, 776] })
  };
  const KEYS = [
    [0, 'think', 'lin'], [2.3, 'think', 'lin'], [2.8, 'aha', 'back'], [3.5, 'aha', 'lin'],
    [4.2, 'hold', 'io'], [4.5, 'hold', 'lin'], [5.0, 'windup', 'io'], [5.38, 'push', 'softBack'],
    [6.3, 'push', 'lin'], [7.0, 'proud', 'softBack'],            // steps back to watch it move
    [8.6, 'proud', 'lin'], [9.0, 'think', 'io'], [9.45, 'think', 'lin'],   // a test fails: hmm
    [9.9, 'proud', 'softBack'], [16.2, 'proud', 'lin'], [17.2, 'think', 'io'], [T, 'think', 'lin']
  ];
  function poseAt(t) {
    t = ((t % T) + T) % T;
    let i = 0; while (i < KEYS.length - 2 && t >= KEYS[i + 1][0]) i++;
    const a = KEYS[i], b = KEYS[i + 1], x = E[b[2]](seg(t, a[0], b[0]));
    const A = POSE[a[1]], B = POSE[b[1]], o = {};
    for (const k in A) o[k] = lerp(A[k], B[k], x);
    return o;
  }
  function joints(t) {
    const p = poseAt(t);
    const hop = -22 * Math.sin(Math.PI * seg(t, 2.38, 2.86)) - 16 * Math.sin(Math.PI * seg(t, 10.2, 10.66));
    const breath = 2.5 * wave(t, 7);
    const P = V(p.Px, p.Py), N = V(p.Nx, p.Ny + breath), H = V(lerp(p.Nx, p.Hx, .9), lerp(p.Ny, p.Hy, .9) + breath * 1.3);
    const b = basis(P, N);
    const sL = add(add(N, mul(b.down, 14)), mul(b.r, p.shL)), sR = add(add(N, mul(b.down, 14)), mul(b.r, p.shR));
    const hipL = add(P, mul(b.r, -p.hs)), hipR = add(P, mul(b.r, p.hs));
    const tap = 3 * wave(t, 16) * (t < 3 ? 1 - seg(t, 2.2, 2.4) : seg(t, 17.2, 17.4));
    const hL = V(p.hLx, p.hLy + breath * .5), hR = V(p.hRx, p.hRy + breath + tap);
    const fL = V(p.fLx, p.fLy), fR = V(p.fRx, p.fRy);
    return {
      p, b, P, N, H, sL, sR, hipL, hipR, hL, hR, fL, fR, hop,
      eL: solve(sL, hL, p.aL1, p.aL2, p.aLs), eR: solve(sR, hR, p.aR1, p.aR2, p.aRs),
      kL: solve(hipL, fL, p.lL1, p.lL2, p.lLs), kR: solve(hipR, fR, p.lR1, p.lR2, p.lRs)
    };
  }

  /* ---------- scene graph ---------- */
  const line = { fill: 'none', stroke: INK, 'stroke-width': SW, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  const solid = { fill: PAPER, stroke: INK, 'stroke-width': SW, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };

  const shadow = el('ellipse', { cy: 792, ry: 11, fill: SHADOW });
  const gProps = el('g', {});
  const gChar = el('g', {});
  const gFront = el('g', {});

  // character parts
  const shoeAttr = { rx: 27, ry: 11, fill: SHOE, stroke: 'var(--shoe-edge)', 'stroke-width': 3 };
  const shoeL = el('ellipse', shoeAttr, gChar), shoeR = el('ellipse', shoeAttr, gChar);
  const legL = el('path', flat(TR2), gChar), legR = el('path', flat(TR), gChar);
  const neckO = el('path', Object.assign({}, line, { stroke: SKIN, 'stroke-width': 20 }), gChar);
  const neckI = el('path', Object.assign({}, line, { stroke: SKIN, 'stroke-width': 12 }), gChar);
  const torso = el('path', flat(TOP), gChar);
  const gHead = el('g', {}, gChar);
  const gBun = el('g', {}, gHead);
  { const px = -44.6, py = 33.8, pr = 23;        // low afro puff: a soft scalloped cloud
    el('circle', { cx: px, cy: py, r: pr, fill: HAIR }, gBun);
    [0, 51, 103, 154, 206, 257, 309].forEach(deg => { const a = deg * Math.PI / 180;
      el('circle', { cx: f(px + Math.cos(a) * pr * .72), cy: f(py + Math.sin(a) * pr * .72), r: pr * .5, fill: HAIR }, gBun); }); }
  el('circle', Object.assign({ r: 40 }, flat(SKIN), { 'stroke-width': 2 }), gHead);
  el('path', { d: 'M-38.5 21.5 Q-52.3 -46.2 0 -44.6 Q36.9 -43.1 41.5 -15.4 Q15.4 -29.2 -7.7 -16.9 Q-23.1 -6.2 -26.2 23.1 Z', fill: HAIR, stroke: HAIR, 'stroke-width': 2, 'stroke-linejoin': 'round' }, gHead);
  el('circle', { cx: -12.3, cy: 10.8, r: 6.8, fill: 'var(--skin-far)' }, gHead);     // ear
  el('circle', { cx: -12.3, cy: 24.6, r: 4.6, fill: 'var(--gold)' }, gHead);         // earring
  const eye = el('ellipse', { cx: 18, cy: 0, rx: 3.6, ry: 3.6, fill: HAIR }, gHead);
  const mouth = el('path', Object.assign({}, line, { stroke: HAIR, 'stroke-width': 4 }), gHead);
  function arm() {
    return {
      o: el('path', Object.assign({}, line, { stroke: SKIN, 'stroke-width': 23 }), gChar),
      i: el('path', Object.assign({}, line, { stroke: SKIN, 'stroke-width': 16 }), gChar),
      cuff: el('path', Object.assign({}, line, { stroke: TOP, 'stroke-width': 29 }), gChar)
    };
  }
  const armL = arm(), armR = arm();

  // props
  function group(parent) { return el('g', {}, parent || gProps); }
  const conns = [0, 1, 2, 3, 4, 5, 6].map(() => el('line', Object.assign({}, soft, { 'stroke-width': 5.5, 'stroke-dasharray': '11 15' }), gProps));
  function card(icon) {
    const g = group();
    el('rect', { x: -52, y: -52, width: 104, height: 104, rx: 24, fill: CARD }, g);
    if (icon) icon(g);
    return g;
  }
  const iconCode = g => el('path', Object.assign({ d: 'M-14 -17 L-31 0 L-14 17 M14 -17 L31 0 L14 17 M6 -23 L-6 23' }, line, { 'stroke-width': 6.5 }), g);
  const iconImage = g => {
    el('path', { d: 'M-31 25 L-10 -5 L3 11 L13 1 L31 25 Z', fill: INK, stroke: INK, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
    el('circle', { cx: 17, cy: -21, r: 7, fill: INK }, g);
  };
  const iconChart = g => [[-27, 4, 22], [-7, -9, 35], [13, -24, 50]].forEach(b =>
    el('rect', { x: b[0], y: b[1], width: 14, height: b[2], rx: 4, fill: INK }, g));
  const iconUsers = g => {
    el('circle', { cx: 0, cy: -15, r: 12, fill: INK }, g);
    el('path', { d: 'M-24 27 C-24 4 24 4 24 27 Z', fill: INK, stroke: INK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, g);
  };
  const iconPlan = g => [-18, 0, 18].forEach(y => {
    el('circle', { cx: -23, cy: y, r: 5, fill: TOP }, g);
    el('path', Object.assign({ d: 'M-9 ' + y + ' H26' }, line, { 'stroke-width': 6.5 }), g);
  });
  let testX, testOK;
  const iconTest = g => {
    testX = el('g', {}, g); testOK = el('g', {}, g);
    el('path', Object.assign({ d: 'M-16 -16 L16 16 M16 -16 L-16 16' }, line, { 'stroke-width': 8.5 }), testX);
    el('circle', { r: 27, fill: TOP }, testOK);
    el('path', { d: 'M-12 1 L-3 10 L13 -9', fill: 'none', stroke: PAPER, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, testOK);
  };
  const card0 = card(), cUsers = card(iconUsers), cPlan = card(iconPlan), cDesign = card(iconImage), cBuild = card(iconCode), cTest = card(iconTest);

  // shipped window
  const win = group();
  el('rect', { x: -152, y: -108, width: 304, height: 216, rx: 26, fill: CARD }, win);
  el('path', Object.assign({ d: 'M-152 -64 H152' }, line, { 'stroke-width': 4, 'stroke-linecap': 'butt', opacity: .35 }), win);
  [-122, -101, -80].forEach(x => el('circle', { cx: x, cy: -86, r: 6, fill: TOP }, win));
  const cMeasure = card(iconChart);
  const badge = el('g', {}, win);
  el('circle', { r: 31, fill: TOP }, badge);
  const check = el('path', { d: 'M-14 1 L-4 12 L15 -11', fill: 'none', stroke: PAPER, 'stroke-width': 7.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 1' }, badge);
  const GLYPH = {
    S: ['M25 8 C20 0 4 0 4 12 C4 23 26 20 26 32 C26 45 8 45 3 36', 36],
    H: ['M5 2 V42 M27 2 V42 M5 22 H27', 39],
    I: ['M9 2 V42', 22],
    P: ['M5 42 V2 H15 C31 2 31 25 15 25 H5', 36],
    E: ['M25 2 H5 V42 H25 M5 22 H21', 35],
    D: ['M5 2 V42 H11 C33 42 33 2 11 2 H5', 39],
    '!': ['M7 2 V27 M7 41 v.01', 14]
  };
  const letters = []; {
    const word = 'SHIPPED!', sc = 0.9; let w = 0;
    for (const ch of word) w += GLYPH[ch][1];
    let x = -w * sc / 2;
    for (const ch of word) {
      const g = el('g', {}, win), gw = GLYPH[ch][1];
      el('path', Object.assign({ d: GLYPH[ch][0], transform: 'translate(' + (-gw / 2) + ' -22)' }, line, { 'stroke-width': 6.5 }), g);
      letters.push({ g, x: x + gw * sc / 2, y: 62, sc });
      x += gw * sc;
    }
  }
  const burst = [-158, -128, -96, -64].map(a => ({ a: a * Math.PI / 180, e: el('line', Object.assign({}, soft, { 'stroke-width': 6 }), gProps) }));
  const STAR = 'M0 -18 Q2.5 -2.5 18 0 Q2.5 2.5 0 18 Q-2.5 2.5 -18 0 Q-2.5 -2.5 0 -18 Z';
  const stars = [[1400, -720, .95], [1915, -700, 1.3], [1925, -300, .9], [1560, -215, .75]].map((s, i) =>
    ({ x: s[0], y: s[1], s: s[2], i, e: el('path', { d: STAR, fill: 'var(--spark)' }, gProps) }));

  // question mark, bulb, rays, whoosh
  const qm = group(gFront);
  el('path', Object.assign({ d: 'M-17 -20 C-17 -43 18 -43 18 -20 C18 -4 0 -5 0 13' }, line, { 'stroke-width': 9 }), qm);
  el('circle', { cx: 0, cy: 34, r: 6.5, fill: INK }, qm);
  const rays = [-205, -165, -125, -90, -55, -15, 25].map(a => ({ a: a * Math.PI / 180, e: el('line', Object.assign({}, soft, { 'stroke-width': 6 }), gFront) }));
  const bulb = group(gFront);
  el('path', Object.assign({ d: 'M0 -36 C-21 -36 -31 -21 -31 -7 C-31 5 -23 11 -17 20 L-15 26 H15 L17 20 C23 11 31 5 31 -7 C31 -21 21 -36 0 -36 Z' }, flat(ACC), { 'stroke-width': 3 }), bulb);
  el('path', Object.assign({ d: 'M-8 -6 L-4 6 L0 -3 L4 6 L8 -6' }, line, { 'stroke-width': 3.5 }), bulb);
  el('path', Object.assign({ d: 'M-11 36 H11 M-6 45 H6' }, line, { 'stroke-width': 6 }), bulb);
  const whoosh = ['M398 418 q-20 10 -28 30', 'M376 474 q-16 8 -22 24', 'M236 690 q-18 8 -26 26'].map(d =>
    el('path', Object.assign({ d, pathLength: 1, 'stroke-dasharray': '1 1' }, soft, { 'stroke-width': 5.5 }), gFront));

  /* ---------- fixed layout for the chain ---------- */
  const pushJ = (() => { const p = POSE.push; return V((p.hLx + p.hRx) / 2, (p.hLy + p.hRy) / 2); })();
  const CARD_OFF = V(60, -4);
  // idea -> users -> plan -> design -> build -> test -> SHIPPED -> measure
  const C = [add(pushJ, CARD_OFF), V(848, 282), V(976, 154), V(1104, 26), V(1232, -102), V(1360, -230), V(1660, -495), V(1770, -215)];   // a steep climb to the big finish
  const ROT = [-7, 8, -6, 7, -8, 6, -4, 7];
  const BASE = [1.05, 1.18, 1.18, 1.18, 1.18, 1.18, 1.6, 1.18];
  const POP = [null, 5.78, 6.4, 7.02, 7.64, 8.26, 9.9, 11.2];             // when each station pops
  const OUT = [16.7, 16.6, 16.5, 16.4, 16.3, 16.2, 16.08, 16.0];          // when each leaves
  const END = 16.0;                                                        // exit begins
  const trims = [[70, 78], [78, 78], [78, 78], [78, 78], [78, 78], [78, 322], [195, 78]];

  function setT(g, x, y, rot, sx, sy) {
    g.setAttribute('transform', 'translate(' + f(x) + ' ' + f(y) + ') rotate(' + f(rot || 0) + ') scale(' + (sx == null ? 1 : sx).toFixed(3) + ' ' + (sy == null ? (sx == null ? 1 : sx) : sy).toFixed(3) + ')');
  }
  const show = (e, on) => e.setAttribute('visibility', on ? 'visible' : 'hidden');

  function legPath(h, k, ft, wh, wf) {
    const d1 = norm(sub(k, h)), d2 = norm(sub(ft, k)), n1 = V(-d1.y, d1.x), n2 = V(-d2.y, d2.x), nk = norm(add(n1, n2));
    const ctl = (a, m, b) => V(2 * m.x - (a.x + b.x) / 2, 2 * m.y - (a.y + b.y) / 2);
    const a1 = add(h, mul(n1, wh)), m1 = add(k, mul(nk, (wh + wf) / 2 - 3)), b1 = add(ft, mul(n2, wf));
    const a2 = add(h, mul(n1, -wh)), m2 = add(k, mul(nk, -((wh + wf) / 2 - 3))), b2 = add(ft, mul(n2, -wf));
    return 'M' + pt(a1) + ' Q' + pt(ctl(a1, m1, b1)) + ' ' + pt(b1) + ' L' + pt(b2) + ' Q' + pt(ctl(b2, m2, a2)) + ' ' + pt(a2) + ' Z';
  }
  function drawArm(A, s, e, h) {
    const d = 'M' + pt(s) + ' L' + pt(e) + ' L' + pt(h);
    A.o.setAttribute('d', d); A.i.setAttribute('d', d);
    A.cuff.setAttribute('d', 'M' + pt(s) + ' L' + pt(add(s, mul(sub(e, s), .42))));
  }

  /* ---------- render one moment ---------- */
  function render(t) {
    t = ((t % T) + T) % T;
    const J = joints(t), p = J.p, b = J.b;

    // character
    shadow.setAttribute('cx', f((J.fL.x + J.fR.x) / 2 + 22)); shadow.setAttribute('rx', f((J.fR.x - J.fL.x) / 2 + 78 + J.hop * .8));
    gChar.setAttribute('transform', 'translate(0 ' + f(J.hop) + ')');
    legL.setAttribute('d', legPath(J.hipL, J.kL, J.fL, 27, 43));
    legR.setAttribute('d', legPath(J.hipR, J.kR, J.fR, 27, 43));
    shoeL.setAttribute('transform', 'translate(' + f(J.fL.x + 16) + ' ' + f(J.fL.y + 6) + ') rotate(' + f(p.shoeL) + ')');
    shoeR.setAttribute('transform', 'translate(' + f(J.fR.x + 16) + ' ' + f(J.fR.y + 6) + ') rotate(' + f(p.shoeR) + ')');
    const nd = 'M' + pt(J.N) + ' L' + pt(J.H); neckO.setAttribute('d', nd); neckI.setAttribute('d', nd);
    const tw = (s, off) => add(add(J.N, mul(b.down, off)), mul(b.r, s));
    const A = tw(p.shL - 9, 9), B = tw(p.shR + 9, 9), nl = tw(-14, 3), nr = tw(14, 3), nc = tw(0, 24);
    const hem = 10, Cc = add(add(J.P, mul(b.down, hem)), mul(b.r, p.hs + 29)), D = add(add(J.P, mul(b.down, hem)), mul(b.r, -(p.hs + 29)));
    torso.setAttribute('d', 'M' + pt(A) + ' L' + pt(nl) + ' Q' + pt(nc) + ' ' + pt(nr) + ' L' + pt(B) + ' L' + pt(Cc) + ' L' + pt(D) + ' Z');
    drawArm(armL, J.sL, J.eL, J.hL); drawArm(armR, J.sR, J.eR, J.hR);
    gHead.setAttribute('transform', 'translate(' + pt(J.H) + ') rotate(' + f(p.tilt) + ') scale(1.16)');
    const lag = joints(t - 0.09), lv = V((lag.H.x - J.H.x) * .7, (lag.H.y + lag.hop - J.H.y - J.hop) * .7);
    gBun.setAttribute('transform', 'translate(' + f(clamp(lv.x, -14, 14)) + ' ' + f(clamp(lv.y, -14, 14)) + ')');
    const blink = [1.3, 6.6, 12.1, 14.4].some(c => Math.abs(t - c) < 0.07);
    eye.setAttribute('ry', blink ? 0.8 : 3.6);
    const smile = Math.max(seg(t, 2.4, 2.7) * (1 - seg(t, 8.7, 8.9)), seg(t, 9.5, 9.8) * (1 - seg(t, 16.6, 17.1)));
    mouth.setAttribute('d', 'M13 ' + f(16) + ' Q21 ' + f(16 + 7 * smile) + ' 28 ' + f(15 - 1.5 * smile));

    // question mark
    const qIn = t < 3 ? 1 - E.io(seg(t, 2.28, 2.44)) : t < 12 ? E.back(seg(t, 8.85, 9.15)) * (1 - E.io(seg(t, 9.4, 9.55))) : E.back(seg(t, 17.25, 17.7));
    show(qm, qIn > 0.01);
    setT(qm, 478 + 3 * wave(t, 4), 226 + 7 * wave(t, 6), 8 * wave(t, 4, 1), qIn);

    // card 0 follows the hands, then stays put
    const follow = add(V((J.hL.x + J.hR.x) / 2, (J.hL.y + J.hR.y) / 2 + J.hop), CARD_OFF);
    const free = E.io(seg(t, 5.38, 5.75));
    const nudge = 18 * Math.sin(Math.PI * seg(t, 5.38, 5.9));
    const floatY = i => 6 * wave(t, 6, i * 1.3), floatR = i => 1.6 * wave(t, 6, i * 1.3 + 1);
    const c0 = t < 5.38 ? follow : V(lerp(follow.x, C[0].x, free) + nudge, lerp(follow.y, C[0].y, free) + floatY(0) * free);
    const c0in = E.back(seg(t, 3.75, 4.2)), c0out = 1 - E.inBack(seg(t, OUT[0], OUT[0] + .34));
    const c0s = (t < 13 ? c0in : c0out) * BASE[0];
    show(card0, c0s > 0.01 && t > 3.7);
    setT(card0, c0.x, c0.y, ROT[0] + floatR(0) * free + 5 * (1 - c0in), c0s);

    // bulb
    const bIn = E.back(seg(t, 2.4, 2.82)), travel = E.io(seg(t, 3.5, 4.2));
    const bp = V(lerp(548 + 3 * wave(t, 4), c0.x, travel), lerp(220 + 5 * wave(t, 6), c0.y + 2, travel));
    const bs = (t < 13 ? bIn : c0out) * lerp(1.15, 0.7, travel);
    show(bulb, t > 2.4 && bs > 0.01);
    setT(bulb, bp.x, bp.y, lerp(8, ROT[0], travel) + floatR(0) * free, bs);
    const rp = E.out(seg(t, 2.5, 2.95)), rfade = 1 - seg(t, 3.45, 3.75), pulse = 1 + .12 * wave(t, 20);
    rays.forEach((r, i) => {
      const r0 = lerp(34, 60, rp) * pulse, r1 = r0 + 20 * rp;
      r.e.setAttribute('x1', f(bp.x + Math.cos(r.a) * r0)); r.e.setAttribute('y1', f(bp.y - 6 + Math.sin(r.a) * r0));
      r.e.setAttribute('x2', f(bp.x + Math.cos(r.a) * r1)); r.e.setAttribute('y2', f(bp.y - 6 + Math.sin(r.a) * r1));
      r.e.setAttribute('opacity', (rp * rfade).toFixed(2)); show(r.e, t > 2.5 && t < 3.75);
    });

    // whoosh marks on the push
    whoosh.forEach((w, i) => {
      const a = seg(t, 5.3 + i * .05, 5.55 + i * .05), o = 1 - seg(t, 5.75, 6.15);
      w.setAttribute('stroke-dashoffset', (1 - E.out(a)).toFixed(3)); w.setAttribute('opacity', o.toFixed(2));
      show(w, a > 0 && o > 0);
    });

    // stations
    const cards = [card0, cUsers, cPlan, cDesign, cBuild, cTest, win, cMeasure];
    const shake = seg(t, 8.72, 8.8) * (1 - seg(t, 9.25, 9.35)) * 9 * Math.sin((t - 8.72) * 2 * Math.PI * 5.5);
    for (let i = 1; i < cards.length; i++) {
      const s = t < 13 ? E.back(seg(t, POP[i], POP[i] + .5)) : 1 - E.inBack(seg(t, OUT[i], OUT[i] + .34));
      const settle = t < 13 ? 1 - E.out(seg(t, POP[i], POP[i] + .7)) : 0;
      const extra = i === 5 ? shake : 0, hopY = i === 5 ? -14 * Math.sin(Math.PI * seg(t, 9.4, 9.75)) : 0;
      show(cards[i], s > 0.01 && t >= POP[i]);
      setT(cards[i], C[i].x, C[i].y + floatY(i) - 26 * settle + hopY, ROT[i] + floatR(i) - 16 * settle + extra, s * BASE[i]);
    }
    // the test fails first, then passes
    const pass = t > 9.38 && t < 17;
    show(testX, !pass); show(testOK, pass);
    setT(testX, 0, 0, 0, t < 9 ? 1 : 1 - E.io(seg(t, 9.28, 9.38)));
    setT(testOK, 0, 0, 0, E.back(seg(t, 9.38, 9.72)));
    // connectors
    conns.forEach((ln, i) => {
      const a = C[i], bb = C[i + 1], d = norm(sub(bb, a)), L = len(sub(bb, a));
      const s0 = add(a, mul(d, trims[i][0])), s1 = add(a, mul(d, L - trims[i][1]));
      const start = POP[i + 1] - .3, pr = E.io(seg(t, start, start + .34)), o = 1 - seg(t, END, END + .35);
      ln.setAttribute('x1', f(s0.x)); ln.setAttribute('y1', f(s0.y));
      ln.setAttribute('x2', f(lerp(s0.x, s1.x, pr))); ln.setAttribute('y2', f(lerp(s0.y, s1.y, pr)));
      ln.setAttribute('opacity', o.toFixed(2)); show(ln, pr > 0.02 && o > 0 && t > start);
    });

    // shipped details
    const wy = C[6].y + floatY(6);
    setT(badge, 0, -18, 0, t < 13 ? E.back(seg(t, 10.07, 10.47)) : 1);
    check.setAttribute('stroke-dashoffset', (1 - E.out(seg(t, 10.32, 10.67))).toFixed(3));
    letters.forEach((l, i) => {
      const s = t < 13 ? E.back(seg(t, 10.42 + i * .055, 10.74 + i * .055)) : 1;
      setT(l.g, l.x, l.y - 10 * (1 - s), 0, l.sc * s);
    });
    const bIn2 = E.back(seg(t, 10.07, 10.52)), bOut = 1 - seg(t, END, END + .25), bp2 = 1 + .1 * wave(t, 18);
    burst.forEach(bu => {
      const c = Math.cos(bu.a), s = Math.sin(bu.a), R0 = 1.0 + .16 * bIn2, len0 = 26 * bIn2 * bp2;
      const x0 = C[6].x + c * 316 * R0, y0 = wy + s * 237 * R0;
      bu.e.setAttribute('x1', f(x0)); bu.e.setAttribute('y1', f(y0));
      bu.e.setAttribute('x2', f(x0 + c * len0)); bu.e.setAttribute('y2', f(y0 + s * len0));
      bu.e.setAttribute('opacity', bOut.toFixed(2)); show(bu.e, t > 10.07 && bOut > 0 && bIn2 > 0.02);
    });
    stars.forEach(st => {
      const a = t < 13 ? E.back(seg(t, 10.4 + st.i * .16, 10.85 + st.i * .16)) : 1 - E.inBack(seg(t, END + st.i * .05, END + .3 + st.i * .05));
      const tw2 = .82 + .22 * wave(t, 9, st.i * 1.9);
      show(st.e, a > 0.01 && t > 10.4); setT(st.e, st.x, st.y, 12 * wave(t, 5, st.i), st.s * a * tw2);
    });
  }

  /* ---------- playback ---------- */
  let time = 0, last = null, frozen = false, visible = true, raf = 0, io = null;
  function tick(now) {
    if (last != null && !frozen && visible) time += Math.min(0.05, (now - last) / 1000) * speed;
    last = now;
    if (visible) render(time);
    raf = requestAnimationFrame(tick);
  }
  svg.seek = t => { frozen = true; time = t; render(t); };   // handy for checking a single moment
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    render(13);                                     // calm still: the shipped moment
  } else {
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(es => { visible = es[0].isIntersecting; });
      io.observe(svg);
    }
    raf = requestAnimationFrame(tick);
  }
  return () => {
    cancelAnimationFrame(raf);
    if (io) io.disconnect();
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  };
}
