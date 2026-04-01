"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const members = [
  {
    id: 1,
    name: "Galih Nur Rizqy",
    npm: "2406343224",
    image: "https://cosmic.csui.dev/_next/image?url=%2Fimages%2Fgalih-nur-rizqy.jpg&w=3840&q=75",
  },
  {
    id: 2,
    name: "Kevin Cornellius Widjaja",
    npm: "2406428781",
    image: "https://cosmic.csui.dev/_next/image?url=%2Fimages%2Fkevin-cornellius-widjaja.jpg&w=3840&q=75",
  },
  {
    id: 3,
    name: "Vincent Valentino Oei",
    npm: "2406353225",
    image: "https://cosmic.csui.dev/_next/image?url=%2Fimages%2Fvincent-valentino-oei.jpg&w=3840&q=75",
  },
  {
    id: 4,
    name: "Benedictus Lucky Win Ziraluo",
    npm: "2406355174",
    image: "https://cosmic.csui.dev/_next/image?url=%2Fimages%2Fbenedictus-lucky-win-ziraluo.jpg&w=3840&q=75",
  },
  {
    id: 5,
    name: "Roberto Eugenio Sugiarto",
    npm: "2406355640",
    image: "https://cosmic.csui.dev/_next/image?url=%2Fimages%2Froberto-eugenio-sugiarto.jpg&w=3840&q=75",
  },
];

export default function HomePage() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const denied = url.searchParams.get("denied");

    if (denied === "1") {
      toast.error("Access denied. Admin only area.", {
        style: {
          border: "1px solid #9f1239",
          padding: "16px",
          color: "#9f1239",
          background: "#fff1f2",
        },
        iconTheme: {
          primary: "#be123c",
          secondary: "#ffe4e6",
        },
      });

      url.searchParams.delete("denied");
      const nextUrl = `${url.pathname}${url.search}${url.hash}`;
      window.history.replaceState({}, "", nextUrl);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[28vw] leading-none font-black tracking-tighter text-primary"
          style={{ opacity: 0.025, fontFamily: "Outfit, sans-serif" }}
        >
          하자메
        </span>
      </div>

      <section className="relative z-10 pt-20 pb-16 px-6">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-in-up mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-accent" />
                PKPL-D
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 fade-in-up fade-in-up-delay-1 text-primary">
              Hacker Jangan<br />
              <span className="text-accent">Menyerang</span>
            </h1>

            <div className="flex items-center justify-center gap-4 fade-in-up fade-in-up-delay-4">
              <Link href="/admin">
                <button className="text-sm py-3 px-6 rounded-lg text-white shadow-lg transition-all bg-accent hover:opacity-90">
                  Customize Theme
                </button>
              </Link>
              <a href="#team">
                <button className="text-sm py-3 px-6 rounded-lg border border-primary text-primary transition-all hover:bg-muted">
                  Meet the Team
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative z-10 py-20 px-6">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-accent">
              The Guardians
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
              Meet the Team
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {members.map((member) => (
              <div
                key={member.id}
                className="group w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)] rounded-2xl border p-6 text-center transition-all hover:-translate-y-1 bg-card border-border"
              >
                <div className="relative mb-4">
                  <div
                    className="w-24 h-24 mx-auto rounded-2xl overflow-hidden transition-all"
                    style={{
                      boxShadow: `0 0 0 4px color-mix(in srgb, var(--primary) 5%, transparent)`,
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-base font-semibold mb-1 text-card-foreground">
                  {member.name}
                </h3>
                <p className="text-xs mb-3 text-card-foreground" style={{ opacity: 0.5 }}>
                  NPM: {member.npm}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
