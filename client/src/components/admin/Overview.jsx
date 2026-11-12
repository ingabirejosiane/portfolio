import {
  FolderGit2,
  Sparkles,
  MessagesSquare,
  Star,
  ArrowRight,
  User,
} from 'lucide-react';

export default function Overview({
  profile,
  projects,
  skills,
  messages,
  onNavigate,
}) {
  const unread = messages.filter((m) => !m.is_read);
  const featured = projects.filter((p) => p.featured);

  const stats = [
    {
      icon: FolderGit2,
      label: 'Projects',
      value: projects.length,
      tone: 'from-accent/20 to-accent/5 text-accent-soft',
      tab: 'projects',
    },
    {
      icon: Sparkles,
      label: 'Skills',
      value: skills.length,
      tone: 'from-accent-cyan/20 to-accent-cyan/5 text-accent-cyan',
      tab: 'skills',
    },
    {
      icon: MessagesSquare,
      label: 'Unread messages',
      value: unread.length,
      tone: 'from-emerald-500/20 to-emerald-500/5 text-emerald-300',
      tab: 'messages',
    },
    {
      icon: Star,
      label: 'Featured projects',
      value: featured.length,
      tone: 'from-amber-500/20 to-amber-500/5 text-amber-300',
      tab: 'projects',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Welcome back, {profile?.name?.split(' ')[0] || 'Admin'} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s a quick overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, label, value, tone, tab }) => (
          <button
            key={label}
            onClick={() => onNavigate(tab)}
            className="card group p-5 text-left transition hover:-translate-y-0.5 hover:border-accent/30"
          >
            <span
              className={`mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${tone}`}
            >
              <Icon size={20} />
            </span>
            <p className="font-display text-3xl font-bold text-white">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{label}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-semibold text-white">
              Recent messages
            </h2>
            <button
              onClick={() => onNavigate('messages')}
              className="inline-flex items-center gap-1 text-xs font-medium text-accent-soft hover:text-white"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>

          {messages.length === 0 ? (
            <p className="py-6 text-sm text-slate-500">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {messages.slice(0, 4).map((m) => (
                <li key={m.id} className="flex items-start gap-3 py-3">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      m.is_read ? 'bg-slate-600' : 'bg-accent'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-200">
                      {m.name}
                      <span className="ml-2 text-xs font-normal text-slate-500">
                        {m.email}
                      </span>
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {m.subject || m.message}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-display font-semibold text-white">
            Profile
          </h2>
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-ink-800 text-xl font-bold text-white/30">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={24} />
              )}
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold text-white">
                {profile?.name || 'Your name'}
              </p>
              <p className="truncate text-sm text-accent-soft">
                {profile?.title}
              </p>
              <p className="truncate text-xs text-slate-500">
                {profile?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="btn-ghost mt-5 w-full"
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
}
