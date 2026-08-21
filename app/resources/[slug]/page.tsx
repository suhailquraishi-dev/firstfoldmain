import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResourceGuide, resourceGuides } from "@/lib/content";
import { Check } from "lucide-react";
import { PremiumButton, TextCta } from "@/app/components/UIPrimitives";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resourceGuides.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceGuide(slug);

  if (!resource) return { title: "Resources | FirstFold Studio" };

  return {
    title: `${resource.title} | FirstFold Studio`,
    description: resource.summary,
  };
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceGuide(slug);

  if (!resource) notFound();

  const related = resourceGuides.filter((item) => item.slug !== resource.slug);

  return (
    <main className="resource-detail-page">
      <header className="resource-detail-hero">
        <div>
          <Link href="/resources">Resources</Link>
          <span>{resource.label} / {resource.readingTime}</span>
        </div>
        <h1>{resource.title}</h1>
        <p>{resource.summary}</p>
      </header>

      <div className="resource-detail-layout">
        <aside>
          <span>In this guide</span>
          <ol>{resource.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>{String(index + 1).padStart(2, "0")} {section.heading}</a></li>)}</ol>
        </aside>
        <article className="resource-detail-content">
          <p className="resource-detail-intro">{resource.introduction}</p>
          {resource.sections.map((section, index) => (
            <section id={`section-${index + 1}`} key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
              {section.items ? <ul>{section.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul> : null}
            </section>
          ))}
          <div className="resource-detail-cta">
            <div><span>Apply the guide</span><h2>Bring the raw material. We will shape the website around it.</h2></div>
            <PremiumButton href="/contact">Book a Call</PremiumButton>
          </div>
        </article>
      </div>

      <section className="resource-related" aria-labelledby="related-guides-title">
        <h2 id="related-guides-title">Related guides</h2>
        <div>{related.map((item) => <article key={item.slug}><span>{item.label}</span><h3>{item.title}</h3><p>{item.summary}</p><TextCta href={`/resources/${item.slug}`}>Read next</TextCta></article>)}</div>
      </section>
    </main>
  );
}
