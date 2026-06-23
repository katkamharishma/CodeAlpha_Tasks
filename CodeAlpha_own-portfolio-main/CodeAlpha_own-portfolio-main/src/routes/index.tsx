import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Brain,
  Code2,
  Cpu,
  Database,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Rocket,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import portrait from "@/assets/harishma-portrait.jpg";
import projectMissing from "@/assets/project-missing-person.jpg";
import projectTravel from "@/assets/project-travelling.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harishma — AI & ML Engineer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Harishma — B.Tech CSE (AI & ML) at Sridevi Women's Engineering College. AI projects, skills, experience and contact.",
      },
      { property: "og:title", content: "Harishma — AI & ML Engineer Portfolio" },
      {
        property: "og:description",
        content:
          "AI & ML student building intelligent, human-centered software. Explore projects, skills and get in touch.",
      },
    ],
  }),
  component: PortfolioPage,
});

/* ---------- Helpers ---------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("animate-reveal");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((n) => {
      n.style.opacity = "0";
      io.observe(n);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

/* ---------- Page ---------- */

function PortfolioPage() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Toaster theme="dark" position="top-right" richColors />

      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-brand-purple/30 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-brand-blue/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-brand-violet/20 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
      </div>

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="group flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Harishma</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
            >
              Let's talk <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          <button
            aria-label="Menu"
            className="md:hidden rounded-lg border border-white/10 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 bg-background/90 backdrop-blur-xl">
            <div className="flex flex-col px-6 py-4">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section id="home" className="relative pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-brand-violet shadow-[0_0_12px_currentColor]" />
            Available for internships & collaborations
          </div>

          <h1
            data-reveal
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Crafting <span className="text-gradient">intelligent</span>
            <br /> experiences with AI.
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: "200ms" }}
          >
            I'm <span className="font-medium text-foreground">Harishma</span> — a B.Tech Computer
            Science (AI & ML) student at Sridevi Women's Engineering College, building thoughtful,
            human-centered software powered by machine learning.
          </p>

          <div
            data-reveal
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.04]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> Contact Me
            </a>
          </div>

          <dl
            data-reveal
            className="mt-14 grid max-w-lg grid-cols-3 gap-6"
            style={{ animationDelay: "400ms" }}
          >
            {[
              { k: "AI/ML", v: "Focus" },
              { k: "2+", v: "Projects" },
              { k: "B.Tech", v: "CSE (AI&ML)" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl p-4">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5" data-reveal style={{ animationDelay: "200ms" }}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-40 blur-2xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3 animate-float">
              <img
                src={portrait}
                alt="Harishma portrait"
                width={896}
                height={1152}
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-4 py-3">
                <p className="text-xs text-muted-foreground">Currently exploring</p>
                <p className="text-sm font-medium">Deep Learning · Computer Vision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p data-reveal className="text-xs font-medium uppercase tracking-[0.2em] text-brand-violet">
        {kicker}
      </p>
      <h2 data-reveal className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl" style={{ animationDelay: "100ms" }}>
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="mt-4 text-muted-foreground" style={{ animationDelay: "200ms" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="About"
          title={<>Passionate about <span className="text-gradient">building with AI</span>.</>}
          subtitle="I love turning ideas into intelligent products — from data exploration to elegant interfaces."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Brain,
              title: "AI & Machine Learning",
              text: "Designing models that learn from data — vision, NLP, and predictive systems that solve real problems.",
            },
            {
              icon: Code2,
              title: "Software Development",
              text: "Writing clean, scalable code across Python and the modern web stack with a focus on craft.",
            },
            {
              icon: Rocket,
              title: "Career Goals",
              text: "Aspiring AI engineer aiming to build human-centered products at the intersection of research and engineering.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              data-reveal
              style={{ animationDelay: `${i * 120}ms` }}
              className="glass group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: "Python", icon: Code2, level: 92 },
    { name: "Data Structures & Algorithms", icon: Cpu, level: 85 },
    { name: "Machine Learning", icon: Brain, level: 80 },
    { name: "JavaScript", icon: Code2, level: 78 },
    { name: "HTML", icon: Globe, level: 90 },
    { name: "CSS", icon: Globe, level: 88 },
    { name: "Problem Solving", icon: Sparkles, level: 90 },
    { name: "SQL & Data", icon: Database, level: 70 },
  ];
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="Toolkit"
          title={<>Skills & <span className="text-gradient">tools I love</span></>}
          subtitle="A growing toolkit shaped by curiosity and constant practice."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <div
              key={s.name}
              data-reveal
              style={{ animationDelay: `${i * 60}ms` }}
              className="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <s.icon className="h-5 w-5 text-brand-violet" />
                </span>
                <p className="font-medium">{s.name}</p>
              </div>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-[width] duration-700"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Missing Person Identification System",
      tag: "Artificial Intelligence",
      desc: "An AI-based facial recognition system that helps identify and reunite missing persons by matching uploaded images against a secure database in real time.",
      stack: ["Python", "OpenCV", "Deep Learning", "Flask"],
      img: projectMissing,
    },
    {
      title: "Travelling With Purpose",
      tag: "Social Impact",
      desc: "A platform that connects travellers with meaningful causes — turning every trip into an opportunity to give back to local communities.",
      stack: ["JavaScript", "HTML", "CSS", "UX"],
      img: projectTravel,
    },
  ];
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="Projects"
          title={<>Selected <span className="text-gradient">work</span></>}
          subtitle="A glimpse into things I've designed, engineered and shipped."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              style={{ animationDelay: `${i * 120}ms` }}
              className="glass group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={832}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-background/40 px-3 py-1 text-xs font-medium backdrop-blur">
                  {p.tag}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      icon: Users,
      title: "College Volunteer",
      meta: "Sridevi Women's Engineering College",
      text: "Volunteered in technical and cultural events — coordinating with teams, mentoring juniors and helping run flagship activities.",
    },
    {
      icon: Sparkles,
      title: "Leadership & Teamwork",
      meta: "Student Initiatives",
      text: "Led small project teams, organized study circles and collaborated across disciplines to deliver outcomes on time.",
    },
    {
      icon: Brain,
      title: "AI/ML Learning Track",
      meta: "Continuous learning",
      text: "Actively exploring deep learning, computer vision and applied ML through coursework, papers and personal projects.",
    },
  ];
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="Experience"
          title={<>Beyond the <span className="text-gradient">classroom</span></>}
          subtitle="Activities, leadership and the experiences shaping my journey."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:block" />
          <ol className="space-y-6">
            {items.map((it, i) => (
              <li
                key={it.title}
                data-reveal
                style={{ animationDelay: `${i * 120}ms` }}
                className="glass relative rounded-2xl p-6 md:ml-14"
              >
                <span className="absolute -left-[3.25rem] top-6 hidden h-8 w-8 place-items-center rounded-full bg-gradient-primary shadow-glow md:grid">
                  <it.icon className="h-4 w-4 text-white" />
                </span>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 md:hidden">
                    <it.icon className="h-5 w-5 text-brand-violet" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{it.title}</h3>
                    <p className="text-xs uppercase tracking-wider text-brand-violet">{it.meta}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div
          data-reveal
          className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-16"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-20" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-violet">Resume</p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Want the <span className="text-gradient">full story?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Download my resume for a complete look at my education, projects and skills.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Resume coming soon", {
                description: "Reach out via the contact form and I'll send it directly.",
              });
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.04]"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    if (!name) return;
    toast.success("Message sent", { description: `Thanks ${name}, I'll get back to you soon.` });
    e.currentTarget.reset();
  }

  const links = [
    { icon: Mail, label: "harishma@example.com", href: "mailto:harishma@example.com" },
    { icon: Linkedin, label: "linkedin.com/in/harishma", href: "https://linkedin.com" },
    { icon: Github, label: "github.com/harishma", href: "https://github.com" },
    { icon: MapPin, label: "Hyderabad, India", href: "#" },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          kicker="Contact"
          title={<>Let's <span className="text-gradient">build something</span></>}
          subtitle="Have a project, opportunity or just want to say hello? My inbox is open."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div data-reveal className="glass rounded-3xl p-8 lg:col-span-2">
            <h3 className="font-display text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              I'm always open to internships, collaborations and conversations about AI.
            </p>
            <ul className="mt-6 space-y-3">
              {links.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm transition-colors hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <span className="text-muted-foreground group-hover:text-foreground">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form
            data-reveal
            onSubmit={onSubmit}
            className="glass space-y-5 rounded-3xl p-8 lg:col-span-3"
            style={{ animationDelay: "120ms" }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field name="name" label="Your name" placeholder="Jane Doe" required />
              <Field name="email" type="email" label="Email" placeholder="jane@example.com" required />
            </div>
            <Field name="subject" label="Subject" placeholder="Let's collaborate" />
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your idea..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand-violet focus:bg-white/[0.08] focus:ring-2 focus:ring-brand-violet/30"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02] md:w-auto"
            >
              Send Message
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-brand-violet focus:bg-white/[0.08] focus:ring-2 focus:ring-brand-violet/30"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <p className="font-display text-sm font-medium">
            Harishma · © {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Designed & built with care · B.Tech CSE (AI & ML)
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Mail, href: "mailto:harishma@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
