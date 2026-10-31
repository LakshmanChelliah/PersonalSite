import { readFileSync, writeFileSync } from "node:fs";

const path = new URL("../src/app/globals.css", import.meta.url);
let css = readFileSync(path, "utf8");
const splitAt = css.indexOf("@media print");
if (splitAt < 0) throw new Error("no print block");
let screen = css.slice(0, splitAt);
let print = css.slice(splitAt);

function bump(n) {
  n = Number(n);
  if (n <= 9) return 13;
  if (n === 10) return 14;
  if (n === 11) return 15;
  if (n === 12) return 16;
  return n;
}

screen = screen.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (m, size) => {
  const n = bump(size);
  return n === Number(size) ? m : `font-size: ${n}px`;
});

screen = screen.replace(
  /font:\s*(\d+(?:\.\d+)?)px(?:\/[\d.]+)?\s+var\(--font-(mono|body|display)\)/g,
  (m, size, family) => {
    const original = Number(size);
    const n = bump(original);
    const fam = family === "body" ? "sans" : family;
    if (n === original) return `font: ${original}px var(--font-${fam})`;
    return `font: 500 ${n}px/1.45 var(--font-${fam})`;
  },
);

screen = screen.replaceAll("var(--font-body)", "var(--font-sans)");

const tracking = [
  ["letter-spacing: -0.077em", "letter-spacing: -0.032em"],
  ["letter-spacing: -0.075em", "letter-spacing: -0.03em"],
  ["letter-spacing: -0.065em", "letter-spacing: -0.03em"],
  ["letter-spacing: -0.06em", "letter-spacing: -0.028em"],
  ["letter-spacing: -2.4px", "letter-spacing: -0.03em"],
  ["letter-spacing: -1.7px", "letter-spacing: -0.03em"],
  ["letter-spacing: -1.5px", "letter-spacing: -0.03em"],
  ["letter-spacing: -1.4px", "letter-spacing: -0.025em"],
  ["letter-spacing: -4px", "letter-spacing: -0.04em"],
  ["letter-spacing: -0.6px", "letter-spacing: -0.015em"],
  ["letter-spacing: -0.5px", "letter-spacing: -0.011em"],
  ["letter-spacing: -0.3px", "letter-spacing: -0.01em"],
  ["letter-spacing: -1px", "letter-spacing: -0.02em"],
];
for (const [from, to] of tracking) screen = screen.replaceAll(from, to);

const colors = [
  ["#15191f80", "color-mix(in oklch, var(--ink) 50%, transparent)"],
  ["#15191fde", "color-mix(in oklch, var(--ink) 87%, transparent)"],
  ["#15191f08", "color-mix(in oklch, var(--ink) 3%, transparent)"],
  ["#15191f", "var(--ink)"],
  ["#f4f2ed", "var(--pearl)"],
  ["#4568f0", "var(--signal)"],
  ["#3455d8", "var(--signal-deep)"],
  ["#3455c9", "var(--signal)"],
  ["#9ab0ff", "var(--signal-on-dark)"],
  ["rgba(244, 242, 237, 0.94)", "color-mix(in oklch, var(--pearl) 92%, transparent)"],
  ["#ebeae5", "var(--pearl-deep)"],
  ["#e7e7e1", "var(--pearl-deep)"],
  ["#dfe4f1", "var(--pearl-deep)"],
  ["#e6e9f1", "var(--pearl-deep)"],
  ["#cccfc7", "var(--line)"],
  ["#c7c9c2", "var(--line)"],
  ["#c5cbed", "var(--line)"],
  ["#67708c", "var(--muted)"],
  ["#bcbeba", "color-mix(in oklch, var(--ink) 28%, var(--line))"],
  ["#e5e4e0", "var(--pearl-deep)"],
  ["#babdc5", "color-mix(in oklch, var(--pearl) 70%, var(--ink))"],
  ["#44474b", "color-mix(in oklch, var(--pearl) 22%, var(--ink))"],
  ["#b6bbc5", "color-mix(in oklch, var(--pearl) 68%, var(--ink))"],
  ["#383c43", "color-mix(in oklch, var(--pearl) 16%, var(--ink))"],
  ["#e0e0df", "var(--pearl-deep)"],
  ["#515c71", "var(--muted)"],
  ["#909cb8", "color-mix(in oklch, var(--ink) 28%, var(--line))"],
  ["#f4f4f8", "var(--pearl)"],
  ["#bdc5d9", "var(--line)"],
  ["#5e6981", "var(--muted)"],
  ["#d5d9e3", "var(--line)"],
  ["#667088", "var(--muted)"],
  ["#4c515c", "var(--muted)"],
  ["#515763", "var(--muted)"],
  ["#343a43", "var(--ink)"],
  ["#d7d9dd", "var(--line)"],
  ["#e1e1dc", "var(--line)"],
];
for (const [from, to] of colors) {
  const count = screen.split(from).length - 1;
  if (count) console.log(count, from);
  screen = screen.replaceAll(from, to);
}

print = print.replaceAll("#2b478c", "#8c2a1c");
print = print.replaceAll("#171c23", "#1e2430");

const floor = `
.hero-intro p {
  font-size: clamp(22px, 2.2vw, 28px);
  font-weight: 450;
  line-height: 1.45;
  letter-spacing: -0.015em;
}
.hero-intro em,
.contact h2 em {
  font-family: var(--font-display-italic), Georgia, serif;
  font-style: italic;
  font-weight: 500;
}
.section-heading h2 {
  font-size: clamp(36px, 4vw, 60px);
  line-height: 1.08;
}
.section-heading p,
.work-intro-bottom p,
.project-heading p,
.timeline-detail,
.support-card > p,
.education-block p,
.process-layout > div > p,
.process-case li p,
.case-columns p,
.skills-grid p,
.current-role > span:last-child,
.resume-header > p,
.resume-summary p,
.resume-job ul,
.resume-project p,
.resume-education p,
.resume-skills p,
.membership-demo > p,
.conqr-explainer > p,
.bey-architecture p,
.qnx-demo > p {
  font-size: 17px;
  line-height: 1.65;
}
.timeline-title strong,
.current-role strong {
  font-size: 18px;
  font-weight: 550;
  line-height: 1.35;
}
.skills-grid h3,
.footer,
.contact-bottom > div > a {
  font-size: 15px;
}
.fan-note,
.sample-notice,
.process-footnote {
  font-size: 14px;
  line-height: 1.5;
}
.text-link:hover,
.project-links a:hover,
.desktop-nav a:hover {
  color: var(--signal);
}
.contact .email-link:hover,
.contact .contact-bottom > div > a:hover {
  color: var(--signal-on-dark);
}
@media (max-width: 700px) {
  .hero-intro p {
    font-size: 22px;
  }
  .section-heading h2 {
    font-size: 36px;
  }
  .section-heading p,
  .work-intro-bottom p,
  .project-heading p,
  .timeline-detail,
  .timeline-title > span,
  .current-role > span:last-child,
  .support-card > p,
  .process-layout > div > p,
  .skills-grid p,
  .education-block p,
  .case-outcome p,
  .case-columns p,
  .case-columns li,
  .resume-header > p,
  .resume-summary p,
  .resume-job ul {
    font-size: 16px;
    line-height: 1.6;
  }
  .timeline-title strong,
  .current-role strong,
  .skills-grid h3 {
    font-size: 17px;
  }
  .email-link {
    font-size: 18px;
  }
  .hero-kicker .eyebrow,
  .hero-footer > .mono,
  .section-top > .mono,
  .work-intro-bottom > .mono,
  .project-kind,
  .case-back .mono,
  .eyebrow,
  .mono {
    font-size: 13px;
    letter-spacing: 0.06em;
  }
}
`;

const marker = "@page {";
if (!screen.includes(marker)) throw new Error("no @page");
screen = screen.replace(marker, `${floor}\n${marker}`);
writeFileSync(path, screen + print);
console.log("updated globals.css");
