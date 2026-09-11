import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import { mirtAdaptiveTesting } from "@/content/case-studies/mirt-adaptive-testing";
import { portfolioWebsite } from "@/content/case-studies/portfolio-website";

const caseStudies = {
  "mirt-adaptive-testing": mirtAdaptiveTesting,
  "portfolio-website": portfolioWebsite,
} as const;

export function generateStaticParams() {
  return projects.filter((p) => p.hasCaseStudy).map((p) => ({ slug: p.slug! }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies[params.slug as keyof typeof caseStudies];
  if (!study) return notFound();

  const flagshipSlugs = projects.filter((p) => p.hasCaseStudy).map((p) => p.slug!);
  const currentIndex = flagshipSlugs.indexOf(study.slug);
  const nextSlug = flagshipSlugs[(currentIndex + 1) % flagshipSlugs.length];
  const nextProject = projects.find((p) => p.slug === nextSlug);

  return (
    <main className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold md:text-6xl">{study.title}</h1>
        <p className="mt-4 text-lg text-foreground/70">{study.summary}</p>

        <p className="mt-8 text-sm text-foreground/60">
          <span className="font-medium text-foreground">Stack:</span> {study.stack.join(", ")}
        </p>
        <div className="mt-2 flex gap-4 text-sm">
          {study.links.github && (
            <a href={study.links.github} className="underline hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {study.links.demo && (
            <a href={study.links.demo} className="underline hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
              Live demo
            </a>
          )}
        </div>

        {study.sections.map((s) => (
          <section key={s.heading} className="mt-16">
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            <p className="mt-3 text-foreground/80 leading-relaxed">{s.body}</p>
          </section>
        ))}

        {nextProject && nextSlug !== study.slug && (
          <div className="mt-24 border-t border-foreground/10 pt-8">
            <Link href={`/projects/${nextSlug}`} className="group flex items-center justify-between">
              <span className="text-sm text-foreground/50">Next project</span>
              <span className="text-xl font-semibold group-hover:translate-x-1 transition-transform">
                {nextProject.title} →
              </span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
