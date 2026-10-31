import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/data/content";
export function ProjectIntro({
  project,
  children,
  detail = false,
}: {
  project: Project;
  children: React.ReactNode;
  detail?: boolean;
}) {
  return (
    <section
      id={project.slug}
      className={`project-chapter ${project.slug} ${detail ? "detail-chapter" : ""}`}
    >
      <div className="section-top">
        <span className="eyebrow">
          {project.number} / {project.name}
        </span>
        <span className="mono project-kind">{project.eyebrow}</span>
      </div>
      <div className="project-heading" data-reveal>
        <h2>
          {project.headline.split("\n").map((line, i) => (
            <span key={line} className={i === 1 ? "soft" : ""}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <div>
          <p>{project.summary}</p>
          <div className="tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="project-links">
            {project.url && (
              <a href={project.url} target="_blank" rel="noreferrer">
                Visit {project.name}
                <ArrowUpRight size={16} />
              </a>
            )}
            {!detail && (
              <Link href={`/projects/${project.slug}`}>
                The build story
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
