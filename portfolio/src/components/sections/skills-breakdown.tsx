import { skills } from "@/content/skills";

export function SkillsBreakdown() {
  return (
    <section className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">{category}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((item) => (
              <li key={item} className="rounded-full bg-foreground/5 px-3 py-1 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
