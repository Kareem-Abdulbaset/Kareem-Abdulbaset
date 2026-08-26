/**
 * مولّد بروفايل GitHub
 * =====================
 *   node build-readme.mjs
 *
 * بيولّد:
 *   assets/hero.svg    - بانر متحرك (تدرّج + كرات عائمة + كتابة متحركة)
 *   assets/wave.svg    - موجة ختامية متحركة
 *   README.md          - الملف نفسه من الإعدادات اللي تحت
 *
 * كل حاجة في CONFIG — عدّل واعمل run تاني.
 */

import fs from "node:fs";
import path from "node:path";

// ═══════════════════════════════════════════════════ الإعدادات
const CONFIG = {
  user: "Kareem-Abdulbaset",
  name: "Kareem Abdulbaset",
  roles: ["Front-End Developer", "React & Next.js Engineer", "TypeScript Enthusiast"],
  tagline: "I turn ideas into fast, accessible web applications.",
  location: "Egypt",
  linkedin: "https://www.linkedin.com/in/kareem-abdulbaset-763294352/",

  about: [
    "Building **production-ready web applications** with modern React and Next.js.",
    "I care about **clean architecture**, **performance budgets**, and interfaces that feel effortless.",
    "Currently deepening my work with **Server Components**, **streaming SSR**, and **type-safe APIs**.",
  ],

  // أيقونات من skillicons.dev - مجمّعة بالقسم
  stack: {
    "Core": ["ts", "js", "html", "css"],
    "Frameworks": ["react", "nextjs", "vite"],
    "Styling": ["tailwind", "bootstrap", "sass"],
    "Tooling": ["git", "github", "docker", "npm", "vscode"],
  },

  projects: [
    { repo: "Professional-Portfolio", title: "Professional Portfolio",
      stack: "Next.js 16 · React 19 · MDX",
      desc: "Next.js 16 + React 19 · Partial Prerendering, Turbopack, Server Actions, MDX blog" },
    { repo: "AUTH-Mart-2B-Stylish-Website-Next.js-", title: "AUTH Mart",
      stack: "Next.js · SSR/SSG · Tailwind",
      desc: "E-commerce · SSR & SSG, dynamic routing, Tailwind CSS interface" },
    { repo: "Tech-Information-Sharing-Platform", title: "Tech Sharing Platform",
      stack: "React 19 · Vite 7",
      desc: "Social web app · React 19 + Vite 7, responsive component architecture" },
    { repo: "Weather-Forecast-Application", title: "Weather Forecast",
      stack: "JavaScript · REST API · Bootstrap",
      desc: "3-day forecast for any city · JavaScript, REST API, Bootstrap" },
  ],

  theme: {
    bg: "0D1117", title: "58A6FF", text: "C9D1D9", icon: "58A6FF",
    card: "tokyonight", graph: "react-dark",
  },
};

// ═══════════════════════════════════════════════════ توليد الـ SVG
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** بانر متحرك: تدرّج + كرات عائمة + شبكة + كتابة بتظهر حرف حرف */
function heroSvg({ name, roles, tagline }) {
  const W = 1000, H = 250;

  // كل دور بياخد نوبة: يظهر، يستنى، يختفي
  const per = 3.6, total = (roles.length * per).toFixed(1);
  // مهم: SMIL بتفرض إن أول keyTime = 0 وآخر واحد = 1 بالظبط.
  // لو آخر واحد أقل من 1، المتصفح بيرمي الأنيميشن كله والعنصر بيفضل على قيمته الأصلية.
  const typing = roles.map((role, i) => {
    const a = i * per / total;                  // بداية نوبة الدور ده
    const b = a + 0.02;                         // خلص ظهور
    const d = (i + 1) * per / total - 0.01;     // خلص اختفاء
    const c = d - 0.04;                         // آخر لحظة ثبات
    const keys = [0, a, b, c, d, 1]
      .map((n) => Math.min(1, Math.max(0, n)).toFixed(3)).join(";");

    return `
    <g opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0;0" dur="${total}s"
        keyTimes="${keys}" repeatCount="indefinite" />
      <text x="500" y="152" text-anchor="middle" font-family="'Segoe UI',Ubuntu,sans-serif"
            font-size="23" font-weight="600" fill="#7DD3FC" clip-path="url(#typeClip${i})">${esc(role)}</text>
    </g>
    <clipPath id="typeClip${i}">
      <rect x="0" y="130" height="32" width="0">
        <animate attributeName="width" values="0;0;1000;1000" dur="${total}s"
          keyTimes="0;${a.toFixed(3)};${(a + 0.09).toFixed(3)};1"
          repeatCount="indefinite" />
      </rect>
    </clipPath>`;
  }).join("");

  // كرات ضوء عائمة
  const orbs = [
    { cx: 130, cy: 60, r: 90, c: "#3B82F6", dur: 11, dx: 40, dy: 25 },
    { cx: 870, cy: 190, r: 105, c: "#8B5CF6", dur: 14, dx: -45, dy: -30 },
    { cx: 640, cy: 40, r: 70, c: "#06B6D4", dur: 9, dx: -30, dy: 35 },
  ].map((o) => `
    <circle cx="${o.cx}" cy="${o.cy}" r="${o.r}" fill="${o.c}" opacity="0.20" filter="url(#soft)">
      <animateTransform attributeName="transform" type="translate"
        values="0 0; ${o.dx} ${o.dy}; 0 0" dur="${o.dur}s" repeatCount="indefinite" />
    </circle>`).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(name)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080B14"/>
      <stop offset="55%" stop-color="#0F1631"/>
      <stop offset="100%" stop-color="#160F35"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#06B6D4"/>
      <animate attributeName="x1" values="0;1;0" dur="8s" repeatCount="indefinite"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="45"/></filter>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0 L0 0 0 34" fill="none" stroke="#5B7BB5" stroke-width="0.5" opacity="0.18"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  ${orbs}

  <text x="500" y="98" text-anchor="middle" font-family="'Segoe UI',Ubuntu,sans-serif"
        font-size="52" font-weight="800" fill="#F0F6FC" filter="url(#glow)">${esc(name)}</text>

  ${typing}

  <text x="500" y="192" text-anchor="middle" font-family="'Segoe UI',Ubuntu,sans-serif"
        font-size="14.5" fill="#8B98B0">${esc(tagline)}</text>

  <rect x="0" y="${H - 4}" width="${W}" height="4" fill="url(#accent)"/>
</svg>`;
}


/** بانر 3D بمنظور محسوب - الشاشة رباعي في الفراغ، وكل حاجة جواها بتتحسب عليه */
function hero3dSvg(c, stats) {
  const topLang = Object.entries(stats.langs).sort((a, b) => b[1] - a[1])[0];
  const totalBytes = Object.values(stats.langs).reduce((a, b) => a + b, 0) || 1;
  const METRICS = [
    [String(stats.repos), "PROJECTS"],
    [String(stats.commits ?? "—"), "COMMITS"],
    [Math.round((topLang[1] / totalBytes) * 100) + "%", topLang[0].toUpperCase()],
  ];
  const P = (x, y) => ({ x, y });
  const lerp = (a, b, t) => P(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);

/** نقطة جوه الرباعي: u = يمين/شمال، v = فوق/تحت (0..1) */
  const at = (q, u, v) => lerp(lerp(q[0], q[1], u), lerp(q[3], q[2], u), v);
  const poly = (pts) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

// ── الشاشة في المنظور: الحافة القريبة (شمال) أطول من البعيدة (يمين)
  const SCREEN = [P(505, 96), P(936, 132), P(936, 248), P(505, 300)];

// سطور كود بتتبع ميلان الشاشة
  const CODE = [
  [0.06, 0.34, "#7DD3FC"], [0.42, 0.22, "#C4B5FD"],
  [0.06, 0.20, "#F0ABFC"], [0.30, 0.40, "#93C5FD"],
  [0.10, 0.44, "#86EFAC"], [0.10, 0.26, "#7DD3FC"],
  [0.06, 0.30, "#FDE68A"], [0.34, 0.28, "#93C5FD"],
];

  const lines = CODE.map(([u0, len, color], i) => {
  const v = 0.30 + i * 0.082;
  const a = at(SCREEN, u0, v), b = at(SCREEN, u0 + len, v);
  const w = (1.9 - u0 * 0.5).toFixed(2);
  return `    <line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
      stroke="${color}" stroke-width="${w}" stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="0;0.95" dur="0.4s" begin="${(0.5 + i * 0.09).toFixed(2)}s" fill="freeze"/>
    </line>`;
}).join("\n");

// نقط الويندو (الدواير التلاتة)
  const dots = ["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => {
  const p = at(SCREEN, 0.035 + i * 0.032, 0.11);
  return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.2" fill="${c}"/>`;
}).join("");

// سُمك الكارت (الوش الجانبي) — بيدي إحساس الجسم المصمت
  const D = 13;
  const side = poly([SCREEN[3], SCREEN[0], P(SCREEN[0].x - D, SCREEN[0].y + D), P(SCREEN[3].x - D, SCREEN[3].y + D)]);
  const bottom = poly([SCREEN[3], SCREEN[2], P(SCREEN[2].x - D, SCREEN[2].y + D), P(SCREEN[3].x - D, SCREEN[3].y + D)]);

// كروت عايمة ورا الشاشة (عمق + parallax)
  const ghost = (x, y, w, h, op, dur, dy) => `
  <g opacity="${op}">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 ${dy};0 0" dur="${dur}s" repeatCount="indefinite"/>
    <polygon points="${poly([P(x, y), P(x + w, y + 14), P(x + w, y + 14 + h), P(x, y + h)])}"
             fill="#1B2embed" />
  </g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 380" width="1000" height="380" role="img" aria-label="Kareem Abdulbaset — Front-End Engineer">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#05070F"/><stop offset="50%" stop-color="#0B1026"/><stop offset="100%" stop-color="#150C2E"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1B2440" stop-opacity="0.97"/>
      <stop offset="100%" stop-color="#0E1428" stop-opacity="0.97"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2A3A63"/><stop offset="100%" stop-color="#141B33"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="cta" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <filter id="blur40"><feGaussianBlur stdDeviation="40"/></filter>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="26" stdDeviation="22" flood-color="#000" flood-opacity="0.55"/>
    </filter>
    <clipPath id="screenClip"><polygon points="${poly(SCREEN)}"/></clipPath>
  </defs>

  <rect width="1000" height="380" fill="url(#sky)"/>

  <!-- هالات ضوء بتتنفّس -->
  <circle cx="760" cy="150" r="150" fill="#4F46E5" opacity="0.28" filter="url(#blur40)">
    <animate attributeName="opacity" values="0.28;0.44;0.28" dur="7s" repeatCount="indefinite"/>
  </circle>
  <circle cx="180" cy="300" r="130" fill="#0EA5E9" opacity="0.20" filter="url(#blur40)">
    <animate attributeName="opacity" values="0.20;0.34;0.20" dur="9s" repeatCount="indefinite"/>
  </circle>

  <!-- ══ النص التسويقي ══ -->
  <g>
    <rect x="52" y="74" width="152" height="26" rx="13" fill="#0EA5E9" opacity="0.13" stroke="#0EA5E9" stroke-opacity="0.45"/>
    <circle cx="70" cy="87" r="4" fill="#22C55E">
      <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <text x="82" y="91" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="11.5" font-weight="600" fill="#7DD3FC">AVAILABLE FOR WORK</text>

    <text x="52" y="140" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="38" font-weight="800" fill="#F8FAFC">${esc(c.name)}</text>
    <text x="52" y="175" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="19" font-weight="600" fill="#8B5CF6">${esc(c.roles[0])}</text>

    <text x="52" y="212" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="13.5" fill="#94A3B8">I build interfaces that load fast, scale</text>
    <text x="52" y="232" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="13.5" fill="#94A3B8">cleanly, and feel effortless to use.</text>

    <!-- مقاييس -->
    <g transform="translate(52,262)">
      ${METRICS.map(([n, l], i) => `
      <g transform="translate(${i * 108},0)">
        <text x="0" y="16" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="21" font-weight="800" fill="#F8FAFC">${n}</text>
        <text x="0" y="32" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="9.5" font-weight="600" fill="#64748B" letter-spacing="1">${l}</text>
      </g>`).join("")}
    </g>

    <!-- زرار CTA -->
    <g>
      <rect x="52" y="316" width="132" height="34" rx="17" fill="url(#cta)"/>
      <text x="118" y="338" text-anchor="middle" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="12.5" font-weight="700" fill="#fff">View My Work</text>
      <rect x="196" y="316" width="112" height="34" rx="17" fill="none" stroke="#334166" stroke-width="1.4"/>
      <text x="252" y="338" text-anchor="middle" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="12.5" font-weight="600" fill="#94A3B8">Contact</text>
    </g>
  </g>

  <!-- ══ الشاشة في المنظور ══ -->
  <g filter="url(#shadow)">
    <animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur="6s" repeatCount="indefinite"/>

    <polygon points="${side}" fill="url(#edge)"/>
    <polygon points="${bottom}" fill="#0C1225"/>
    <polygon points="${poly(SCREEN)}" fill="url(#glass)" stroke="#38466E" stroke-width="1.2"/>

    <g clip-path="url(#screenClip)">
      <line x1="${at(SCREEN,0,0.2).x.toFixed(1)}" y1="${at(SCREEN,0,0.2).y.toFixed(1)}"
            x2="${at(SCREEN,1,0.2).x.toFixed(1)}" y2="${at(SCREEN,1,0.2).y.toFixed(1)}" stroke="#2B3559" stroke-width="1.2"/>
${lines}
      <!-- لمعة بتعدّي على الشاشة -->
      <rect x="440" y="60" width="150" height="260" fill="url(#shine)" transform="skewX(-14)">
        <animate attributeName="x" values="420;980;420" dur="6.5s" repeatCount="indefinite"/>
      </rect>
    </g>

    ${dots}
  </g>
</svg>`;
  return svg;
}

// ═══════════════════════════════════════════════════ بيانات حيّة من GitHub
/**
 * بنسحب الأرقام من GitHub API ونرسم الكروت بنفسنا.
 * السبب: خدمات الكروت الجاهزة (github-readme-stats وغيرها) بترجّع 503/402
 * على طول لأنها بتتعدّى حصتها - يعني صور مكسورة على البروفايل.
 */
async function fetchStats(user, token) {
  const H = { "User-Agent": "profile-generator", Accept: "application/vnd.github+json" };
  if (token) H.Authorization = "Bearer " + token;
  const get = async (u, extra = {}) =>
    (await fetch(u, { headers: { ...H, ...extra } })).json();

  const me = await get(`https://api.github.com/users/${user}`);
  const repos = await get(`https://api.github.com/users/${user}/repos?per_page=100`);
  if (!Array.isArray(repos)) throw new Error("مقدرناش نجيب الريبوهات");

  const langs = {};
  for (const r of repos) {
    const l = await get(r.languages_url);
    for (const [k, v] of Object.entries(l || {})) langs[k] = (langs[k] || 0) + v;
  }

  let commits = null;
  try {
    const s = await get(`https://api.github.com/search/commits?q=author:${user}&per_page=1`,
      { Accept: "application/vnd.github.cloak-preview+json" });
    commits = s.total_count ?? null;
  } catch {}

  return {
    repos: me.public_repos ?? repos.length,
    followers: me.followers ?? 0,
    stars: repos.reduce((a, r) => a + (r.stargazers_count || 0), 0),
    forks: repos.reduce((a, r) => a + (r.forks_count || 0), 0),
    commits,
    langs,
  };
}

const LANG_COLOR = {
  TypeScript: "#3178C6", JavaScript: "#F1E05A", CSS: "#563D7C", HTML: "#E34C26",
  MDX: "#FCB32C", Dockerfile: "#384D54", Python: "#3572A5", Java: "#B07219",
  SCSS: "#C6538C", Shell: "#89E051",
};

/** كارت الإحصائيات - بنرسمه بنفسنا فمش بيقع أبداً */
function statsSvg(s) {
  const W = 480, H = 195;
  const items = [
    ["Repositories", s.repos],
    ["Total Commits", s.commits ?? "—"],
    ["Stars Earned", s.stars],
    ["Followers", s.followers],
  ];

  const cells = items.map(([label, val], i) => {
    const x = 34 + (i % 2) * 224, y = 76 + Math.floor(i / 2) * 54;
    return `
    <g opacity="0">
      <animate attributeName="opacity" values="0;1" dur="0.5s" begin="${0.15 + i * 0.12}s" fill="freeze"/>
      <circle cx="${x}" cy="${y - 5}" r="3.5" fill="#58A6FF"/>
      <text x="${x + 14}" y="${y}" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="13" fill="#8B98B0">${label}</text>
      <text x="${x + 200}" y="${y}" text-anchor="end" font-family="'Segoe UI',Ubuntu,sans-serif"
            font-size="17" font-weight="700" fill="#F0F6FC">${val}</text>
    </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="GitHub stats">
  <defs>
    <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#131A2E"/>
    </linearGradient>
    <linearGradient id="sac" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="10" fill="url(#sbg)" stroke="#243049"/>
  <rect x="0" y="0" width="${W}" height="3" rx="1.5" fill="url(#sac)"/>
  <text x="34" y="46" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="17" font-weight="700" fill="#58A6FF">GitHub Stats</text>
  ${cells}
</svg>`;
}

/** كارت اللغات - شريط متحرك + مفتاح */
function langsSvg(langs) {
  const W = 480, H = 195;
  const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
  const top = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([name, v]) => ({ name, pct: (v / total) * 100, color: LANG_COLOR[name] || "#6E7A8A" }));

  let x = 34;
  const barW = W - 68;
  const bar = top.map((l, i) => {
    const w = (l.pct / 100) * barW;
    const seg = `<rect x="${x.toFixed(1)}" y="66" width="0" height="11" fill="${l.color}">
      <animate attributeName="width" from="0" to="${w.toFixed(1)}" dur="0.9s" begin="${(i * 0.12).toFixed(2)}s" fill="freeze"/>
    </rect>`;
    x += w;
    return seg;
  }).join("");

  const legend = top.map((l, i) => {
    const lx = 34 + (i % 2) * 224, ly = 108 + Math.floor(i / 2) * 26;
    return `
    <g opacity="0">
      <animate attributeName="opacity" values="0;1" dur="0.4s" begin="${(0.5 + i * 0.1).toFixed(2)}s" fill="freeze"/>
      <circle cx="${lx + 4}" cy="${ly - 4}" r="5" fill="${l.color}"/>
      <text x="${lx + 16}" y="${ly}" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="12.5" fill="#C9D1D9">${esc(l.name)}</text>
      <text x="${lx + 200}" y="${ly}" text-anchor="end" font-family="'Segoe UI',Ubuntu,sans-serif"
            font-size="12.5" font-weight="600" fill="#8B98B0">${l.pct.toFixed(1)}%</text>
    </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Most used languages">
  <defs>
    <linearGradient id="lbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#131A2E"/>
    </linearGradient>
    <linearGradient id="lac" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <clipPath id="barClip"><rect x="34" y="66" width="${barW}" height="11" rx="5.5"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" rx="10" fill="url(#lbg)" stroke="#243049"/>
  <rect x="0" y="0" width="${W}" height="3" rx="1.5" fill="url(#lac)"/>
  <text x="34" y="46" font-family="'Segoe UI',Ubuntu,sans-serif" font-size="17" font-weight="700" fill="#06B6D4">Most Used Languages</text>
  <g clip-path="url(#barClip)"><rect x="34" y="66" width="${barW}" height="11" fill="#1C2333"/>${bar}</g>
  ${legend}
</svg>`;
}

/** موجة ختامية متحركة */
function waveSvg() {
  const W = 1000, H = 110;
  const wave = (fill, op, dur, y) => `
    <path fill="${fill}" opacity="${op}"
      d="M0 ${y} C 150 ${y - 26}, 350 ${y + 26}, 500 ${y} S 850 ${y - 26}, 1000 ${y} V ${H} H0 Z">
      <animate attributeName="d" dur="${dur}s" repeatCount="indefinite"
        values="M0 ${y} C 150 ${y - 26}, 350 ${y + 26}, 500 ${y} S 850 ${y - 26}, 1000 ${y} V ${H} H0 Z;
                M0 ${y} C 150 ${y + 26}, 350 ${y - 26}, 500 ${y} S 850 ${y + 26}, 1000 ${y} V ${H} H0 Z;
                M0 ${y} C 150 ${y - 26}, 350 ${y + 26}, 500 ${y} S 850 ${y - 26}, 1000 ${y} V ${H} H0 Z"/>
    </path>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="footer">
  <defs>
    <linearGradient id="w1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <linearGradient id="w2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
  ${wave("url(#w2)", "0.35", 9, 52)}
  ${wave("url(#w1)", "0.85", 7, 66)}
</svg>`;
}

// ═══════════════════════════════════════════════════ توليد الـ README
function buildReadme(c) {
  const { user, theme: t } = c;
  const raw = `https://raw.githubusercontent.com/${user}/${user}/main/assets`;
  const q = `hide_border=true&bg_color=${t.bg}&title_color=${t.title}&text_color=${t.text}&icon_color=${t.icon}`;

  const stack = Object.entries(c.stack).map(([label, icons]) => `
<tr>
  <td align="right" width="120"><b>${label}</b></td>
  <td><img src="https://skillicons.dev/icons?i=${icons.join(",")}&theme=dark" alt="${label}"></td>
</tr>`).join("");

  const projects = c.projects.map((p) => `
<tr>
  <td width="34%" valign="top">
    <a href="https://github.com/${user}/${p.repo}"><b>${p.title}</b></a><br>
    <sub><code>${p.stack}</code></sub>
  </td>
  <td valign="top"><sub>${p.desc}</sub></td>
</tr>`).join("");

  return `<a id="top"></a>

<p align="center">
  <img src="${raw}/hero.svg" alt="${c.name}" width="100%">
</p>

<p align="center">
  <a href="https://github.com/${user}?tab=followers"><img src="https://img.shields.io/github/followers/${user}?style=for-the-badge&logo=github&logoColor=white&color=1F6FEB&labelColor=0D1117" alt="Followers"></a>
  <img src="https://komarev.com/ghpvc/?username=${user}&style=for-the-badge&color=8B5CF6&labelColor=0D1117&label=PROFILE+VIEWS" alt="Profile views">
  <a href="${c.linkedin}"><img src="https://img.shields.io/badge/LINKEDIN-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0D1117" alt="LinkedIn"></a>
</p>

<p align="center">
  <a href="#about">About</a> &nbsp;·&nbsp;
  <a href="#stack">Tech Stack</a> &nbsp;·&nbsp;
  <a href="#stats">Stats</a> &nbsp;·&nbsp;
  <a href="#projects">Projects</a> &nbsp;·&nbsp;
  <a href="#connect">Connect</a>
</p>

---

<a id="about"></a>

## 🧭 About

${c.about.map((l) => `> ${l}`).join("\n>\n")}

<br>

\`\`\`ts
const kareem = {
  location : "${c.location}",
  focus    : ["React", "Next.js", "TypeScript"],
  building : "fast, accessible, well-typed interfaces",
  learning : ["Server Components", "Streaming SSR", "Edge runtime"],
} as const;
\`\`\`

---

<a id="stack"></a>

## ⚡ Tech Stack

<table>${stack}
</table>

---

<a id="stats"></a>

## 📊 GitHub Stats

<p align="center">
  <img src="${raw}/stats.svg" alt="GitHub stats" width="47%">
  &nbsp;
  <img src="${raw}/langs.svg" alt="Most used languages" width="47%">
</p>

<p align="center"><sub>Generated from the GitHub API and refreshed daily by a workflow — no third-party services, nothing to break.</sub></p>

---

<a id="projects"></a>

## 🚀 Featured Projects

<table>${projects}
</table>

<p align="center"><i>More in my <a href="https://github.com/${user}?tab=repositories">repositories</a>.</i></p>

---

<a id="connect"></a>

## 🤝 Connect

<p align="center">
  <a href="${c.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://github.com/${user}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"></a>
</p>

<p align="center">
  <img src="${raw}/wave.svg" alt="" width="100%">
</p>

<p align="center"><sub>Always learning. Always building. 🚀 &nbsp;·&nbsp; <a href="#top">Back to top</a></sub></p>
`;
}

// ═══════════════════════════════════════════════════ التشغيل
const out = path.resolve(".");
fs.mkdirSync(path.join(out, "assets"), { recursive: true });

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "";
console.log("  · بنسحب الإحصائيات من GitHub...");
const stats = await fetchStats(CONFIG.user, token);
console.log(`    ${stats.repos} ريبو · ${stats.commits} كوميت · ${Object.keys(stats.langs).length} لغة`);

const files = {
  "assets/hero.svg": hero3dSvg(CONFIG, stats),
  "assets/wave.svg": waveSvg(),
  "assets/stats.svg": statsSvg(stats),
  "assets/langs.svg": langsSvg(stats.langs),
  "README.md": buildReadme(CONFIG),
};

for (const [f, body] of Object.entries(files)) {
  fs.writeFileSync(path.join(out, f), body);
  console.log(`  ✓ ${f.padEnd(18)} ${String(Buffer.byteLength(body)).padStart(6)} بايت`);
}
console.log("\nتم التوليد.");
