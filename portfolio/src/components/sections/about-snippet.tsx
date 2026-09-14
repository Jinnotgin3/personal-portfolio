import Link from "next/link";

export function AboutSnippet() {
  return (
    <section className="px-6 py-24 md:px-12">
      <p className="mx-auto max-w-2xl text-lg text-foreground/80">
        I'm a full-stack developer and machine learning enthusiast currently pursuing my BTech in Computer Science & Engineering (Data Science) from SVKM’s Dwarkadas J. Sanghvi College of Engineering, Mumbai.
        I specialize in building modern web applications with React and Next.js while exploring the intersection
        of web development and artificial intelligence. My work focuses on creating accessible,
        performant and user-friendly experiences.
      </p>
      <Link href="/about" className="mt-4 inline-block underline hover:text-accent transition-colors">
        Read more →
      </Link>
    </section>
  );
}
