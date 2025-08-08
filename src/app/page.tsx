"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { CardSelectionProvider } from "@/components/state/CardSelectionContext";

type Card = {
  id: number;
  title: string;
  description: string[];
  imageUrl: string;
  cta: string;
};

const HERO_IMAGE =
  "https://res.cloudinary.com/total-dealer/image/upload/v1687754017/test/ford-ranger_rd5m4t.jpg";

export default function Home() {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    let mounted = true;
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/cards");
        if (!res.ok) throw new Error("Failed to fetch cards");
        const data = (await res.json()) as Card[];
        if (!mounted) return;
        setCards(data);
      } catch (e: unknown) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    };
    fetchCards();
    return () => {
      mounted = false;
    };
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const heroOverlay = useMemo(
    () => (
      <div className="absolute inset-0 bg-black/40" aria-hidden />
    ),
    []
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="relative isolate">
        <Image
          src={HERO_IMAGE}
          alt="Ford Ranger"
          width={1920}
          height={1080}
          priority
          className="w-full h-[420px] md:h-[520px] lg:h-[560px] object-cover"
        />
        {heroOverlay}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-sm">
            Welcome to G Automotive
          </h1>
          <p className="mt-4 max-w-3xl text-center text-sm md:text-base text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
          <button
            className="mt-6 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-600)] text-white px-6 py-2 font-medium shadow-md"
          >
            Contact Us
          </button>
          <button
            className="absolute right-4 top-4 rounded-full bg-white/90 text-gray-900 px-3 py-1 text-sm font-medium shadow hover:bg-white"
            onClick={toggleTheme}
          >
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {!cards && !error && (
          <div className="text-center text-sm text-[var(--muted)]">Loading cards…</div>
        )}
        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}
        {cards && (
          <CardSelectionProvider
            initialSelectedId={cards[Math.floor(cards.length / 2)].id}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((c) => (
                <Card
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  imageUrl={c.imageUrl}
                  description={c.description}
                  cta={c.cta}
                />
              ))}
            </div>
          </CardSelectionProvider>
        )}
      </main>
    </div>
  );
}
