import { Hero } from "@/components/hero/hero";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { AboutSnippet } from "@/components/sections/about-snippet";
import { SkillsPreview } from "@/components/sections/skills-preview";
import { ClosingCta } from "@/components/sections/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-6 py-24 md:px-12">
        <h2 className="mb-12 text-3xl font-bold">Featured Work</h2>
        <ProjectsCarousel />
      </section>
      <AboutSnippet />
      <SkillsPreview />
      <ClosingCta />
    </>
  );
}
