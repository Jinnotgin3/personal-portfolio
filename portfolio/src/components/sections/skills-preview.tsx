import { TechIcon } from "@/components/ui/tech-icon";

const PREVIEW_SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "PyTorch",
  "AWS",
  "Supabase",
  "MongoDB",
];

export function SkillsPreview() {
  return (
    <section className="px-6 py-16 md:px-12">
      <div className="flex flex-wrap justify-center gap-3">
        {PREVIEW_SKILLS.map((s) => (
          <span
            key={s}
            className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur-sm transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white hover:scale-105"
          >
            <TechIcon name={s} className="h-4 w-4 flex-shrink-0" />
            <span>{s}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
