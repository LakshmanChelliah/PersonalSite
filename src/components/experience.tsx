import { experience } from "@/data/content";
export function ExperienceTimeline() {
  return (
    <section className="experience section-pad" id="experience">
      <div className="section-top">
        <span className="eyebrow">01 / Experience</span>
        <span className="muted mono">From the hardware up.</span>
      </div>
      <div className="section-heading">
        <h2>
          A foundation in systems.
          <br />
          <span className="muted">A curiosity for everything.</span>
        </h2>
        <p>
          I follow the problem, learn what it needs, and build my way through
          it. These are the teams that shaped how I work.
        </p>
      </div>
      <div className="timeline">
        {experience.map((e, i) => (
          <details
            className="timeline-row"
            key={`${e.company}-${e.start}`}
            open={i === 0}
          >
            <summary>
              <span className="timeline-date">
                {e.start} — {e.end}
              </span>
              <span className="timeline-title">
                <strong>{e.company}</strong>
                <span>
                  {e.role}
                  {e.team ? ` · ${e.team}` : ""}
                </span>
              </span>
              <span className="area-tag">{e.area}</span>
              <span className="expand-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="timeline-detail">
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="tags">
                {e.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
      <a className="text-link" href="/resume">
        Read the full résumé <span>↗</span>
      </a>
    </section>
  );
}
