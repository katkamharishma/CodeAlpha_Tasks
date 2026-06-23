import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ChevronLeft, ChevronRight, Images, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — A Premium Image Gallery" },
      { name: "description", content: "Curated photography across nature, travel, city, animals and architecture. A premium gallery experience with lightbox, search and filters." },
      { property: "og:title", content: "Lumen — A Premium Image Gallery" },
      { property: "og:description", content: "Curated photography across nature, travel, city, animals and architecture." },
    ],
  }),
  component: Gallery,
});

type Category = "Nature" | "Travel" | "City" | "Animals" | "Architecture";
type Photo = { id: string; title: string; category: Category; url: string; w: number; h: number };

const PHOTOS: Photo[] = [
  { id: "1", title: "Alpine Reverie", category: "Nature", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80", w: 1200, h: 1600 },
  { id: "2", title: "Neon Crossing", category: "City", url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80", w: 1200, h: 1500 },
  { id: "3", title: "Pacific Drift", category: "Travel", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", w: 1200, h: 800 },
  { id: "4", title: "Curious Fox", category: "Animals", url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80", w: 1200, h: 900 },
  { id: "5", title: "Glass Tower", category: "Architecture", url: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80", w: 1200, h: 1500 },
  { id: "6", title: "Misty Pines", category: "Nature", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80", w: 1200, h: 800 },
  { id: "7", title: "Tokyo Nights", category: "City", url: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=1200&q=80", w: 1200, h: 1500 },
  { id: "8", title: "Sahara Lines", category: "Travel", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&q=80", w: 1200, h: 1600 },
  { id: "9", title: "Lion's Gaze", category: "Animals", url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&q=80", w: 1200, h: 1200 },
  { id: "10", title: "Brutalist Sky", category: "Architecture", url: "https://images.unsplash.com/photo-1511818966892-d8d671a4a6e2?w=1200&q=80", w: 1200, h: 1500 },
  { id: "11", title: "Glacial Calm", category: "Nature", url: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1200&q=80", w: 1200, h: 900 },
  { id: "12", title: "Santorini Blue", category: "Travel", url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80", w: 1200, h: 1500 },
  { id: "13", title: "Owl at Dusk", category: "Animals", url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=80", w: 1200, h: 1000 },
  { id: "14", title: "Manhattan Pulse", category: "City", url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80", w: 1200, h: 900 },
  { id: "15", title: "Arched Light", category: "Architecture", url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80", w: 1200, h: 1500 },
  { id: "16", title: "Desert Bloom", category: "Nature", url: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1200&q=80", w: 1200, h: 1500 },
  { id: "17", title: "Venice Reflections", category: "Travel", url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80", w: 1200, h: 900 },
  { id: "18", title: "Wild Mustang", category: "Animals", url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80", w: 1200, h: 1200 },
];

const FILTERS = ["All", "Nature", "Travel", "City", "Animals", "Architecture"] as const;
type Filter = (typeof FILTERS)[number];

function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const photos = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHOTOS.filter(p => filter === "All" || p.category === filter)
      .filter(p => !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [filter, query]);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => setOpenIndex(i => (i === null ? i : (i + 1) % photos.length)), [photos.length]);
  const prev = useCallback(() => setOpenIndex(i => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 glass-strong border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary shadow-glow">
              <Images className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="gradient-text">Lumen</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#gallery" className="transition-colors hover:text-foreground">Gallery</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <a href="#gallery" className="rounded-full gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-105">
            Explore
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 text-center md:pt-28 md:pb-24">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            A curated visual journal
          </div>
          <h1 className="animate-fade-up mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl" style={{ animationDelay: "60ms" }}>
            <span className="gradient-text">Light, framed</span>
            <br />
            <span className="text-foreground/90">in moments.</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "120ms" }}>
            A premium gallery of photography across nature, cities, travel, animals and architecture — each frame composed with intent.
          </p>

          <div className="animate-fade-up mx-auto mt-10 flex max-w-md items-center gap-3 rounded-full glass px-5 py-3 shadow-elevated" style={{ animationDelay: "180ms" }}>
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              aria-label="Search photographs"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title or category…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search" className="text-muted-foreground transition-colors hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {FILTERS.map(f => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 " +
                    (active
                      ? "gradient-primary text-primary-foreground shadow-glow scale-105"
                      : "glass text-muted-foreground hover:text-foreground hover:scale-105")
                  }
                >
                  {f}
                </button>
              );
            })}
          </div>

          {!booted ? (
            <SkeletonGrid />
          ) : photos.length === 0 ? (
            <div className="rounded-2xl glass py-20 text-center">
              <p className="text-lg font-medium">No photographs found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a different category or search term.</p>
            </div>
          ) : (
            <Masonry photos={photos} onOpen={setOpenIndex} />
          )}
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-8 rounded-3xl glass p-8 shadow-elevated md:grid-cols-3 md:p-12">
            {[
              { k: "180+", v: "Curated frames" },
              { k: "12", v: "Photographers" },
              { k: "5", v: "Continents covered" },
            ].map(s => (
              <div key={s.v} className="text-center md:text-left">
                <div className="font-display text-4xl font-semibold gradient-text md:text-5xl">{s.k}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="grid h-7 w-7 place-items-center rounded-md gradient-primary">
              <Images className="h-3.5 w-3.5 text-primary-foreground" />
            </span>
            <span>© {new Date().getFullYear()} Lumen Gallery. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Instagram</a>
          </div>
        </div>
      </footer>

      {openIndex !== null && photos[openIndex] && (
        <Lightbox
          photo={photos[openIndex]}
          index={openIndex}
          total={photos.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  );
}

function Masonry({ photos, onOpen }: { photos: Photo[]; onOpen: (i: number) => void }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
      {photos.map((p, i) => (
        <PhotoCard key={p.id} photo={p} onClick={() => onOpen(i)} />
      ))}
    </div>
  );
}

function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const ratio = photo.h / photo.w;
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      onClick={onClick}
      aria-label={`Open ${photo.title}`}
      className="group relative block w-full overflow-hidden rounded-2xl glass shadow-elevated transition-all duration-500 hover:shadow-glow break-inside-avoid"
    >
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: `${ratio * 100}%` }}>
        {!loaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={
            "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 " +
            (loaded ? "opacity-100" : "opacity-0")
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="text-xs font-medium uppercase tracking-widest text-primary">{photo.category}</div>
          <div className="mt-1 font-display text-lg font-semibold text-foreground">{photo.title}</div>
        </div>
      </div>
    </button>
  );
}

function SkeletonGrid() {
  const heights = [320, 240, 380, 280, 340, 220, 360, 300];
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
      {heights.map((h, i) => (
        <div key={i} className="break-inside-avoid overflow-hidden rounded-2xl">
          <div className="skeleton w-full" style={{ height: h }} />
        </div>
      ))}
    </div>
  );
}

function Lightbox({
  photo, index, total, onClose, onNext, onPrev,
}: { photo: Photo; index: number; total: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-xl animate-fade-up"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground transition-transform hover:scale-110"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong text-foreground transition-transform hover:scale-110 md:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass-strong text-foreground transition-transform hover:scale-110 md:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <figure
        className="relative max-h-[88vh] max-w-6xl overflow-hidden rounded-2xl shadow-elevated"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={photo.url.replace("w=1200", "w=1920")}
          alt={photo.title}
          className="max-h-[88vh] w-auto object-contain"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-6">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-primary">{photo.category}</div>
            <div className="mt-1 font-display text-2xl font-semibold">{photo.title}</div>
          </div>
          <div className="rounded-full glass px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {index + 1} / {total}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
