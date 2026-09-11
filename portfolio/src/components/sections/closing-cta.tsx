import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="flex flex-col items-center gap-4 px-6 py-32 text-center md:px-12">
      <h2 className="text-3xl font-bold md:text-5xl">Let's connect</h2>
      <p className="max-w-xl text-foreground/70">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>
      <Link href="/contact" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity">
        Get in touch
      </Link>
    </section>
  );
}
