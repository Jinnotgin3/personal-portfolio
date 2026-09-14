"use client";

import { certifications } from "@/content/certifications";
import { ExternalLink, Award } from "lucide-react";

export function Certifications() {
  return (
    <section className="mt-24">
      <div className="flex items-center gap-3">
        <Award className="h-6 w-6 text-cyan-400" />
        <h2
          className="text-2xl font-bold text-balance md:text-3xl"
        >
          Certifications & Credentials
        </h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <a
            key={cert.title}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(0,0,242,0.12)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 font-mono text-[11px] font-medium text-cyan-400">
                  {cert.issuer}
                </span>
                <ExternalLink className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-cyan-400" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-cyan-300 transition-colors">
                {cert.title}
              </h3>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-poppins text-foreground/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5 text-xs font-poppins text-cyan-400/90 group-hover:underline">
              <span>Verify Credential</span>
              <span>↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
