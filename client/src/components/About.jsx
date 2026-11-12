import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Download,
  Briefcase,
  Code2,
  Coffee,
} from 'lucide-react';

function DetailItem({ icon: Icon, label, value, href }) {
  if (!value) return null;
  const content = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-soft">
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-wide text-slate-500">
          {label}
        </span>
        <span className="block truncate text-sm font-medium text-slate-200">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-white/5"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-center gap-3 p-2">{content}</div>;
}

const stats = [
  { icon: Briefcase, value: '5+', label: 'Years experience' },
  { icon: Code2, value: '30+', label: 'Projects delivered' },
  { icon: Coffee, value: '∞', label: 'Cups of coffee' },
];

export default function About({ profile }) {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">
              <User size={14} /> About me
            </span>
            <h2 className="section-title">
              Turning ideas into <span className="text-gradient">real products</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-400">
              {profile?.bio ||
                'I am a developer who cares deeply about clean architecture, thoughtful design and great user experience.'}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="card p-4 text-center">
                  <Icon className="mx-auto mb-2 text-accent-soft" size={20} />
                  <p className="font-display text-2xl font-bold text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-8"
              >
                <Download size={16} /> Download Resume
              </a>
            )}
          </div>

          <div className="card p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-white">
              Quick details
            </h3>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <DetailItem
                icon={User}
                label="Name"
                value={profile?.name || 'INGABIRE JOSIANE'}
              />
              <DetailItem
                icon={Mail}
                label="Email"
                value={profile?.email}
                href={profile?.email ? `mailto:${profile.email}` : undefined}
              />
              <DetailItem
                icon={Phone}
                label="Phone"
                value={profile?.phone}
                href={profile?.phone ? `tel:${profile.phone}` : undefined}
              />
              <DetailItem
                icon={MapPin}
                label="Location"
                value={profile?.location}
              />
              <DetailItem
                icon={Globe}
                label="Website"
                value={profile?.website}
                href={profile?.website}
              />
              <DetailItem
                icon={Briefcase}
                label="Availability"
                value="Open to freelance"
              />
            </div>

            <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                “Great software is built where engineering meets empathy. I
                focus on writing maintainable code that solves real problems for
                real people.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
