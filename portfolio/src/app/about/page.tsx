import { Timeline } from "@/components/sections/timeline";
import { SkillsBreakdown } from "@/components/sections/skills-breakdown";
import { Certifications } from "@/components/sections/certifications";
import { Interests } from "@/components/sections/interests";

export default function AboutPage() {
  return (
    <main className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold md:text-6xl">About Me</h1>

        <div className="mt-12 space-y-6 text-lg text-foreground/80">
          <p>
            Hi, I'm Jinendra Shah, a full-stack developer and machine learning enthusiast based in Navi Mumbai, India.
            I'm passionate about building web applications that are not only functional but also beautiful,
            accessible, and performant.
          </p>

          <p>
            My journey into development started with curiosity about how websites work, and it quickly
            evolved into a deep passion for creating digital experiences. I specialize in modern web
            technologies like React, Next.js, and TypeScript, while also exploring the fascinating world
            of machine learning and artificial intelligence.
          </p>

          <p>
            I believe in writing clean, maintainable code and following best practices. Whether it's
            building a complex web application, implementing machine learning models, or optimizing
            performance, I approach each project with attention to detail and a commitment to quality.
          </p>

          <p>
            Currently, I'm pursuing my BTech in Computer Science & Engineering from SVKM's Dwarkadas J. Sanghvi College of Engineering, Mumbai
            while actively seeking internship opportunities where
            I can contribute to meaningful projects and continue learning from experienced developers.
          </p>
        </div>

        <Timeline />
        <SkillsBreakdown />
        <Certifications />
        <Interests />
      </div>
    </main>
  );
}
