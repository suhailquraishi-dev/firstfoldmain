import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { CtaArrow, PremiumButton } from "@/app/components/UIPrimitives";

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
    description: `${project.status}: ${project.summary}`,
    openGraph: {
      title: `${project.title} | FirstFold Studio`,
      description: `${project.status}: ${project.summary}`,
      images: [{ url: project.image, width: 1536, height: 1024, alt: `${project.title} concept website direction` }],
    },
    twitter: {
      title: `${project.title} | FirstFold Studio`,
      description: `${project.status}: ${project.summary}`,
      images: [project.image],
    },
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
    <main className={`case-page concept-case-page ${project.accent}`}>
      <section className="case-hero">
        <div>
          <p>{project.status} / {project.type}</p>
          <h1>{project.title}</h1>
          <span>{project.summary}</span>
        </div>
        <div className="case-hero__image">
          <Image src={project.image} alt={`${project.title} concept website direction`} width={1536} height={1024} unoptimized />
        </div>
      </section>

      <aside className="concept-disclaimer">
        <strong>About this study</strong>
        <p>This is an exploratory FirstFold concept, not a commissioned client project. It demonstrates design thinking without claiming commercial results.</p>
      </aside>

      <section className="case-body concept-case-body">
        {[
          ["Brief", project.brief],
          ["Audience", project.audience],
          ["Story direction", project.storyDirection],
          ["Visual system", project.visualSystem],
          ["Responsive decisions", project.responsiveDecisions],
          ["What it demonstrates", project.demonstrates],
        ].map(([label, copy]) => <article key={label}><h2>{label}</h2><p>{copy}</p></article>)}
      </section>

      <a className="next-project" href={`/work/${nextProject.slug}`}>
        <span>Next direction: {nextProject.title}</span>
        <CtaArrow />
      </a>
      <PremiumButton href="/contact">Build your direction</PremiumButton>
    </main>
  );
}
