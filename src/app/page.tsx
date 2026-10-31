import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Download,
  MapPin,
} from "lucide-react";
import { MotionShell } from "@/components/motion-shell";
import { ExperienceTimeline } from "@/components/experience";
import { ProjectIntro } from "@/components/project-shell";
import {
  EsstaDemo,
  ConqrDemo,
  BeyDemo,
  VolleyballDemo,
  QnxDemo,
  FileTriageDemo,
} from "@/components/demos";
import { ProcessLab } from "@/components/process-lab";
import { education, person, projects, skills } from "@/data/content";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <MotionShell>
      <main id="main">
        <section className="hero section-pad">
          <div className="hero-kicker">
            <span className="eyebrow">
              <span className="blue-dot" /> Software, systems & things that move
            </span>
            <span className="mono">
              <MapPin size={12} /> Ottawa, Canada
            </span>
          </div>
          <div className="hero-main">
            <div className="hero-name">
              <h1>
                <span className="hero-line">
                  <span className="hero-word">Lakshman</span>
                </span>
                <span className="hero-line">
                  <span className="hero-word">
                    Chelliah<span className="name-dot">.</span>
                  </span>
                </span>
              </h1>
            </div>
            <div className="hero-art" aria-hidden="true">
              <svg viewBox="0 0 400 400" className="orbit-drawing">
                <defs>
                  <linearGradient id="orbit-gradient">
                    <stop stopColor="var(--ink)" />
                    <stop offset="1" stopColor="var(--signal)" />
                  </linearGradient>
                </defs>
                {[-55, -25, 5, 35, 65].map((r) => (
                  <ellipse
                    key={r}
                    cx="200"
                    cy="200"
                    rx="161"
                    ry="60"
                    transform={`rotate(${r} 200 200)`}
                    fill="none"
                    stroke="url(#orbit-gradient)"
                    strokeWidth="1.25"
                  />
                ))}
                <circle
                  cx="200"
                  cy="200"
                  r="116"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth=".6"
                />
                <circle cx="200" cy="200" r="6" fill="var(--signal)" />
                <circle cx="339" cy="121" r="8" fill="var(--signal)" />
              </svg>
              <span className="orbit-label label-a">HARDWARE ↗</span>
              <span className="orbit-label label-b">SOFTWARE ↙</span>
              <span className="orbit-note">
                ALWAYS
                <br />
                EXPLORING.
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="current-role">
              <span className="eyebrow">Currently</span>
              <strong>Software Engineering Developer</strong>
              <span>
                Smart Displays · General Dynamics Mission Systems–Canada
              </span>
            </div>
            <div className="hero-intro">
              <p>
                Embedded systems background.
                <br />
                Building across <em>web, games, and AI.</em>
              </p>
              <div className="hero-actions">
                <a className="button" href="#work">
                  Explore work
                  <ArrowDownRight size={17} />
                </a>
                <a className="button button-outline" href="/resume">
                  View résumé
                  <ArrowUpRight size={17} />
                </a>
                <a className="contact-inline" href="#contact">
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="hero-footer">
            <span className="mono">RESEARCH. ADAPT. BUILD. VERIFY.</span>
            <a href="#experience" className="scroll-hint">
              Keep exploring
              <ArrowDown size={14} />
            </a>
          </div>
        </section>
        <ExperienceTimeline />
        <div id="work" className="work-intro section-pad">
          <span className="eyebrow">02 / Selected work</span>
          <h2>
            Learning by
            <br />
            <span>making it real.</span>
          </h2>
          <div className="work-intro-bottom">
            <p>
              New technologies. Real constraints. Working products.
              <br />
              Four chapters in learning beyond the familiar.
            </p>
            <span className="mono">SCROLL TO ENTER THE SHOWCASE ↓</span>
          </div>
        </div>
        <ProjectIntro project={projects[0]}>
          <EsstaDemo />
        </ProjectIntro>
        <ProjectIntro project={projects[1]}>
          <ConqrDemo />
        </ProjectIntro>
        <ProjectIntro project={projects[2]}>
          <BeyDemo />
          <p className="fan-note">
            Independent fan project. Beyblade and related marks belong to their
            respective owners. No affiliation or endorsement.
          </p>
        </ProjectIntro>
        <ProjectIntro project={projects[3]}>
          <VolleyballDemo />
        </ProjectIntro>
        <section className="supporting section-pad">
          <div className="section-top">
            <span className="eyebrow">03 / More ways to solve a problem</span>
            <span className="mono">Hardware to desktop.</span>
          </div>
          <div className="support-grid">
            <article className="support-card qnx-card">
              <span className="eyebrow">
                05 / Embedded · University team project
              </span>
              <h2>QNX RC Vehicle</h2>
              <p>
                Message passing. Physical inputs. A stop condition that takes
                priority.
              </p>
              <QnxDemo />
              <a className="text-link" href="/projects/qnx">
                Explore the system
                <ArrowUpRight size={15} />
              </a>
            </article>
            <article className="support-card triage-card">
              <span className="eyebrow">06 / Desktop · Toolmaking</span>
              <h2>FileTriage</h2>
              <p>
                A little more control over a lot of files. Review, keep,
                recycle, undo.
              </p>
              <FileTriageDemo />
              <a className="text-link" href="/projects/filetriage">
                Explore the workflow
                <ArrowUpRight size={15} />
              </a>
            </article>
          </div>
        </section>
        <ProcessLab />
        <section className="education section-pad" id="education">
          <div className="section-top">
            <span className="eyebrow">05 / Foundation & toolkit</span>
            <span className="mono">Always a student.</span>
          </div>
          <div className="education-block">
            <div>
              <h2>
                {education.school}
                <span>Software Engineering</span>
              </h2>
              <p>Bachelor of Engineering · Co-op</p>
            </div>
            <span className="mono">{education.period}</span>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <div key={group.name}>
                <h3>{group.name}</h3>
                <p>{group.skills.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="contact section-pad" id="contact">
          <div className="section-top">
            <span className="eyebrow">06 / What’s next?</span>
            <span className="mono">A conversation is a good start.</span>
          </div>
          <h2>
            Have a problem
            <br />
            worth <em>solving?</em>
            <ArrowUpRight className="contact-arrow" />
          </h2>
          <div className="contact-bottom">
            <a href={`mailto:${person.email}`} className="email-link">
              {person.email}
              <ArrowUpRight size={21} />
            </a>
            <div>
              <a href={person.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight size={15} />
              </a>
              <a href="/resume">
                Résumé
                <ArrowUpRight size={15} />
              </a>
              <a href="/Lakshman-Chelliah-Resume.pdf" download>
                Download PDF
                <Download size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </MotionShell>
  );
}
