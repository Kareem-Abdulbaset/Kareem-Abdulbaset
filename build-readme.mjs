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
  email: "kareemabdulbaset.dev@gmail.com",

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
  <a href="mailto:${c.email}"><img src="https://img.shields.io/badge/GMAIL-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>

<p align="center"><sub><a href="mailto:${c.email}">${c.email}</a></sub></p>

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
  "assets/hero.svg": heroSvg(CONFIG),
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
