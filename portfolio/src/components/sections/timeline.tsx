const MILESTONES = [
  { year: "2024", title: "Started Bachelor's in Computer Science" },
  { year: "2024", title: "Built first full-stack web application" },
  { year: "2025", title: "Won college hackathon with ML project" },
  { year: "2025", title: "Contributed to open-source projects" },
  { year: "2026", title: "Developed MIRT Adaptive Testing System" },
  { year: "2026", title: "Looking for internship opportunities" },
];

export function Timeline() {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-semibold">Journey</h2>
      <ol className="mt-6 space-y-6 border-l border-foreground/10 pl-6">
        {MILESTONES.map((m) => (
          <li key={m.title}>
            <p className="text-sm text-foreground/50">{m.year}</p>
            <p className="font-medium">{m.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
