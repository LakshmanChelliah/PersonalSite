import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/content";
import { ProjectIntro } from "@/components/project-shell";
import {
  EsstaDemo,
  ConqrDemo,
  BeyDemo,
  VolleyballDemo,
  QnxDemo,
  FileTriageDemo,
} from "@/components/demos";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return {
    title: p?.name || "Project",
    description: p?.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="case-page">
      <div className="case-back">
        <Link href="/#work">← All selected work</Link>
        <span className="mono">A build story / {project.number}</span>
      </div>
      <ProjectIntro project={project} detail>
        {slug === "essta" ? (
          <EsstaDemo />
        ) : slug === "conqr" ? (
          <ConqrDemo />
        ) : slug === "beyweb" ? (
          <BeyDemo />
        ) : slug === "gdravolleyball" ? (
          <VolleyballDemo />
        ) : slug === "qnx" ? (
          <QnxDemo />
        ) : (
          <FileTriageDemo />
        )}
      </ProjectIntro>
      <article className="case-story section-pad">
        <div className="case-lead">
          <span className="eyebrow">The story</span>
          <p>{project.story}</p>
        </div>
        <div className="case-columns">
          <section>
            <span className="eyebrow">01 / The challenge</span>
            <h2>What I had to learn.</h2>
            <p>{project.challenge}</p>
          </section>
          <section>
            <span className="eyebrow">02 / The decisions</span>
            <h2>How the pieces fit.</h2>
            <ol>
              {project.decisions.map((d, i) => (
                <li key={d}>
                  <span>0{i + 1}</span>
                  {d}
                </li>
              ))}
            </ol>
          </section>
        </div>
        <section className="case-outcome">
          <span className="eyebrow">03 / The result</span>
          <h2>Something that works.</h2>
          <p>{project.outcome}</p>
          {project.url && (
            <a
              className="button"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Explore {project.name} ↗
            </a>
          )}
        </section>
        {slug === "beyweb" && (
          <p className="fan-note">
            Independent fan project. Beyblade and related names and marks belong
            to their respective rights holders. No affiliation or endorsement.
          </p>
        )}
        <Link className="next-project" href={`/projects/${next.slug}`}>
          <span className="eyebrow">Up next</span>
          <strong>{next.name} ↗</strong>
        </Link>
      </article>
    </main>
  );
}
