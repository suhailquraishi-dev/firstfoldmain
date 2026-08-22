import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { absoluteUrl, createPageMetadata, serializeJsonLd, SITE_URL } from "@/lib/seo";
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

  return createPageMetadata({
    title: `${project.title}: ${project.type} Website Concept`,
    description: `${project.status}: ${project.summary}`,
    path: `/work/${project.slug}`,
    type: "article",
    image: project.image,
    imageAlt: `${project.title} concept website direction`,
    imageWidth: 1536,
    imageHeight: 1024,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getProject(project.next) ?? projects[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${absoluteUrl(`/work/${project.slug}`)}#concept-study`,
        name: `${project.title}: ${project.type} Website Concept`,
        description: project.summary,
        url: absoluteUrl(`/work/${project.slug}`),
        image: absoluteUrl(project.image),
        creator: { "@id": `${SITE_URL}/#organization` },
        audience: project.audience,
        genre: "Website concept study",
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Concept Work", item: absoluteUrl("/work") },
          { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/work/${project.slug}`) },
        ],
      },
    ],
  };

  return (
    <main className={`case-page concept-case-page ${project.accent}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
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
