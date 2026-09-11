import { skills } from "@/content/skills";

const PREVIEW_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "PyTorch",
  "MongoDB",
];

export function SkillsPreview() {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="flex flex-wrap justify-center gap-3">
        {PREVIEW_SKILLS.map((s) => (
          <span key={s} className="rounded-full bg-foreground/5 px-4 py-2 text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
