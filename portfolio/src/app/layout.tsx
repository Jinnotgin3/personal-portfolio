import type { Metadata } from "next";
import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StarBurstBackground } from "@/components/hero/star-burst-bg";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jinendra Shah | Full-Stack Developer & ML Enthusiast",
  description:
    "Portfolio of Jinendra Shah - Full-Stack Developer specializing in modern web technologies and machine learning. Open to internships and collaborations.",
  keywords: [
    "Jinendra Shah",
    "Full-Stack Developer",
    "Machine Learning",
    "Web Development",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Jinendra Shah" }],
  openGraph: {
    title: "Jinendra Shah | Full-Stack Developer & ML Enthusiast",
    description:
      "Portfolio of Jinendra Shah - Full-Stack Developer specializing in modern web technologies and machine learning.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      {/* Typography: General Sans (Body/UI) + Fraunces (Wordmark Serif) + JetBrains Mono */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Disable React DevTools Hook */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined" && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
                window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
              }
            `,
          }}
        />
      </head>
      <body>
        {/* Global persistent starburst background — fixed behind all pages */}
        <StarBurstBackground />
        <LenisProvider>
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
