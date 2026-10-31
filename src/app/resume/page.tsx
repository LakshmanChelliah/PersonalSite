import type { Metadata } from "next";
import { Download, ArrowUpRight } from "lucide-react";
import {
  person,
  experience,
  education,
  projects,
  skills,
  additionalProjects,
} from "@/data/content";
export const metadata: Metadata = {
  title: "Résumé",
  alternates: { canonical: "/resume" },
  description:
    "Professional résumé of Lakshman Chelliah: software development, embedded systems, AI, and web products.",
};
export default function Resume() {
  return (
    <main id="main" className="resume-page">
      <div className="resume-actions">
        <a href="/">← Back to the experience</a>
        <a className="button" href="/Lakshman-Chelliah-Resume.pdf" download>
          <Download size={16} /> Download PDF
        </a>
      </div>
      <article className="resume-document">
        <header className="resume-header">
          <span className="eyebrow">Résumé / Software · Systems · AI</span>
          <h1>{person.name}</h1>
          <p>
            Software Engineering Developer · Embedded systems, web products & AI
          </p>
          <div className="resume-contact">
            <span>{person.location}</span>
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <a href={person.linkedin}>LinkedIn</a>
            <a href={person.domain}>lakshmanchelliah.ca</a>
          </div>
        </header>
        <section className="resume-summary">
          <h2>Profile</h2>
          <p>
            Software engineering graduate with production experience across
            vehicle electronics, photonic networking, secure government
            platforms, and test automation. Builds embedded and real-time
            systems alongside web products and multiplayer games. Uses research,
            practical tooling, and LLM-assisted workflows to learn unfamiliar
            technologies, implement solutions, and verify results.
          </p>
        </section>
        <section className="resume-experience">
          <h2>Experience</h2>
          {experience.map((e) => (
            <article className="resume-job" key={`${e.company}-${e.start}`}>
              <div className="resume-job-heading">
                <div>
                  <h3>{e.role}</h3>
                  <strong>
                    {e.company}
                    {e.team ? ` · ${e.team}` : ""}
                  </strong>
                </div>
                <span>
                  {e.start} – {e.end}
                </span>
              </div>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <div className="resume-page-two">
          <header className="print-continuation">
            Lakshman Chelliah{" "}
            <span>Selected projects, education & technical skills</span>
          </header>
          <section className="resume-projects">
            <h2>Selected Projects</h2>
            {projects.map((p) => (
              <article key={p.slug} className="resume-project">
                <h3>
                  <a href={`/projects/${p.slug}`}>{p.name}</a>
                  <span>{p.period || p.tags.slice(0, 3).join(" · ")}</span>
                </h3>
                <p>
                  {p.slug === "essta"
                    ? "Built a responsive community website with heritage visualization, configurable content, and a membership application workflow."
                    : p.slug === "conqr"
                      ? "Built a multiplayer strategy game with authoritative PartyKit rooms, a pure rules engine, seeded randomness, reconnection, and private player state."
                      : p.slug === "beyweb"
                        ? "Built a 3D browser arena game with shared physics simulation, authoritative WebSockets, client prediction/reconciliation, and persistent customization/progression."
                        : p.slug === "gdravolleyball"
                          ? "Built a season board for an eight-team volleyball league, with a team-focused schedule, standings, calendar subscriptions, and coordinator score entry that updates the public board."
                          : p.slug === "qnx"
                            ? "University team project integrating QNX IPC, drive-source arbitration, sensor processes, emergency stop, and a command watchdog on a Raspberry Pi RC vehicle."
                          : "Built an Electron/React media-review tool with previews, exact duplicate identification, Recycle Bin integration, and undo."}
                </p>
              </article>
            ))}
            {additionalProjects.map((p) => (
              <article className="resume-project" key={p.name}>
                <h3>
                  {p.name}
                  <span>{p.period}</span>
                </h3>
                <p>{p.text}</p>
              </article>
            ))}
          </section>
          <section className="resume-education">
            <h2>Education</h2>
            <h3>{education.school}</h3>
            <p>
              {education.degree}
              <span className="resume-period">{education.period}</span>
            </p>
          </section>
          <section className="resume-skills">
            <h2>Technical Skills</h2>
            {skills.map((s) => (
              <p key={s.name}>
                <strong>{s.name}:</strong> {s.skills.join(", ")}
              </p>
            ))}
          </section>
        </div>
      </article>
      <a className="text-link resume-return" href="/#work">
        See the projects in action
        <ArrowUpRight size={16} />
      </a>
    </main>
  );
}
