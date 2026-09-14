import { skills } from "@/content/skills";
import { TechIcon } from "@/components/ui/tech-icon";

export function SkillsBreakdown() {
  return (
    <section className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground/50">
            {category}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-foreground/85 transition-all duration-200 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white hover:scale-105"
              >
                <TechIcon name={item} className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
