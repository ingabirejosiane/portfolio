import { Github, Linkedin, Twitter, Globe, ArrowUp } from 'lucide-react';

const nav = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  const links = [
    { href: profile?.github, icon: Github, label: 'GitHub' },
    { href: profile?.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: profile?.twitter, icon: Twitter, label: 'Twitter' },
    { href: profile?.website, icon: Globe, label: 'Website' },
  ].filter((l) => l.href);

  return (
    <footer className="border-t border-white/5 bg-ink-950/60">
      <div className="container-page py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="font-display text-xl font-bold text-white"
            >
              {profile?.name?.split(' ')[0] || 'Portfolio'}
              <span className="text-accent-soft">.</span>
            </a>
            <p className="mt-2 max-w-xs text-sm text-slate-500">
              {profile?.title || 'Full Stack Developer'} — building thoughtful
              digital experiences.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent/50 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-600 sm:flex-row">
          <p>
            © {year} {profile?.name || 'Portfolio'}. All rights reserved.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 transition hover:text-slate-300"
          >
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
