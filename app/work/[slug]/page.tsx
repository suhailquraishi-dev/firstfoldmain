import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { CtaArrow, FoldGlyph, PremiumButton } from "@/app/components/UIPrimitives";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Work | FirstFold Studio" };
  }

  return {
    title: `${project.title} | FirstFold Studio`,
    description: project.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getProject(project.next) ?? projects[0];

  return (
    <main className={`case-page ${project.accent}`}>
      <section className="case-hero">
        <div>
          <p>
            <FoldGlyph small />
            {project.type}
          </p>
          <h1>{project.title}</h1>
          <span>{project.summary}</span>
        </div>
        <div className="case-hero__image" aria-hidden="true">
          <div className="case-browser">
            <div className="case-browser__bar">
              <i />
              <i />
              <i />
            </div>
            <div className="case-browser__stage">
              <span>{project.type}</span>
              <strong>{project.title}</strong>
              <p>{project.summary}</p>
            </div>
          </div>
          <div className="case-metric">
            <strong>{project.stat}</strong>
            <span>{project.statLabel}</span>
          </div>
        </div>
      </section>

      <section className="case-body">
        <article>
          <span>Problem</span>
          <p>{project.problem}</p>
        </article>
        <article>
          <span>Approach</span>
          <p>{project.approach}</p>
        </article>
        <article>
          <span>Outcome</span>
          <p>{project.outcome}</p>
        </article>
      </section>

      <section className="before-after">
        <div>
          <span>Before</span>
          <p>Scattered message, slow proof, unclear next action.</p>
        </div>
        <div>
          <span>After</span>
          <p>One promise, visible signal, and a reusable launch system.</p>
        </div>
      </section>

      <a className="next-project" href={`/work/${nextProject.slug}`}>
        <span>Next project: {nextProject.title}</span>
        <CtaArrow />
      </a>
      <PremiumButton href="/contact">Book a similar sprint</PremiumButton>
    </main>
  );
}
