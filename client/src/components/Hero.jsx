import {
  ArrowRight,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Sparkles,
  Code2,
  Rocket,
} from 'lucide-react';

function SocialLink({ href, label, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function Hero({ profile }) {
  const name = profile?.name || 'INGABIRE JOSIANE';
  const title = profile?.title || 'Full Stack Developer';
  const bio =
    profile?.bio ||
    'I build clean, performant web applications from front to back.';
  const firstName = name.split(' ')[0];

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <Sparkles size={14} /> Available for new projects
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{firstName}</span>
            <br />
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            {profile?.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-accent-soft" />
                {profile.location}
              </span>
            )}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={15} className="text-accent-soft" />
                {profile.email}
              </a>
            )}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View My Work <ArrowRight size={17} />
            </a>
            <a href="#contact" className="btn-ghost">
              Get In Touch
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <SocialLink href={profile?.github} label="GitHub">
              <Github size={17} />
            </SocialLink>
            <SocialLink href={profile?.linkedin} label="LinkedIn">
              <Linkedin size={17} />
            </SocialLink>
            <SocialLink href={profile?.twitter} label="Twitter">
              <Twitter size={17} />
            </SocialLink>
            <SocialLink href={profile?.website} label="Website">
              <Globe size={17} />
            </SocialLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up animate-delay-2">
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-accent/30 via-accent-pink/20 to-accent-cyan/30 blur-3xl"
          />

          <div className="relative rounded-[2rem] border border-white/10 bg-ink-900/80 p-2 shadow-card backdrop-blur">
            <div className="overflow-hidden rounded-[1.6rem] bg-ink-950/90 ring-1 ring-white/5">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-xs text-slate-500">
                  developer.js
                </span>
                <span className="ml-auto rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                  JavaScript
                </span>
              </div>

              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-slate-300">
                <code>
                  <span className="text-slate-500">
                    {'// developer & designer'}
                  </span>
                  {'\n'}
                  <span className="text-fuchsia-400">const</span>{' '}
                  <span className="text-sky-300">josiane</span> = {'{'}
                  {'\n'}
                  {'  '}
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300">'{name}'</span>,{'\n'}
                  {'  '}
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-emerald-300">'{title}'</span>,{'\n'}
                  {'  '}
                  <span className="text-slate-400">stack:</span> [
                  <span className="text-emerald-300">'React'</span>,{' '}
                  <span className="text-emerald-300">'Node'</span>,{' '}
                  <span className="text-emerald-300">'MySQL'</span>],{'\n'}
                  {'  '}
                  <span className="text-slate-400">design:</span>{' '}
                  <span className="text-amber-300">true</span>,{'\n'}
                  {'  '}
                  <span className="text-slate-400">coffee:</span>{' '}
                  <span className="text-amber-300">Infinity</span>,{'\n'}
                  {'}'};{'\n'}
                </code>
              </pre>

              <div className="flex items-center justify-between border-t border-white/5 px-4 py-2.5 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  available for work
                </span>
                <span className="font-mono">UTF-8</span>
              </div>
            </div>
          </div>

          <div className="absolute -left-5 top-16 animate-float rounded-2xl border border-white/10 bg-ink-850/90 p-3 shadow-card backdrop-blur">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-accent-soft">
                <Code2 size={16} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  Experience
                </p>
                <p className="font-display text-sm font-bold text-white">
                  5+ years
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-12 animate-float rounded-2xl border border-white/10 bg-ink-850/90 p-3 shadow-card backdrop-blur [animation-delay:1.5s]">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-cyan/15 text-accent-cyan">
                <Rocket size={16} />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-500">
                  Projects shipped
                </p>
                <p className="font-display text-sm font-bold text-white">30+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
