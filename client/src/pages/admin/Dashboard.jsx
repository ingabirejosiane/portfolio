import { useCallback, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Sparkles,
  MessagesSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Terminal,
} from 'lucide-react';
import { api, clearToken } from '../../lib/api.js';
import Overview from '../../components/admin/Overview.jsx';
import ProfileEditor from '../../components/admin/ProfileEditor.jsx';
import ProjectsManager from '../../components/admin/ProjectsManager.jsx';
import SkillsManager from '../../components/admin/SkillsManager.jsx';
import MessagesManager from '../../components/admin/MessagesManager.jsx';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'messages', label: 'Messages', icon: MessagesSquare },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);

  const loadAll = useCallback(async () => {
    try {
      const [p, pr, sk, ms] = await Promise.all([
        api.get('/profile'),
        api.get('/projects'),
        api.get('/skills'),
        api.get('/messages'),
      ]);
      setProfile(p);
      setProjects(pr);
      setSkills(sk);
      setMessages(ms);
      setError('');
    } catch (err) {
      setError(err.message);
      if (/token|authentication/i.test(err.message)) {
        clearToken();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const logout = () => {
    clearToken();
    navigate('/admin/login');
  };

  const unread = messages.filter((m) => !m.is_read).length;

  const SidebarContent = (
    <>
      <Link to="/" className="flex items-center gap-2.5 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan text-white shadow-glow">
          <Terminal size={18} />
        </span>
        <span className="font-display text-lg font-semibold text-white">
          Dashboard
        </span>
      </Link>

      <nav className="mt-8 flex-1 space-y-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setTab(id);
              setMenuOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              tab === id
                ? 'bg-accent/15 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={17} />
            {label}
            {id === 'messages' && unread > 0 && (
              <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                {unread}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/5 pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={17} /> View site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut size={17} /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-ink-900/60 p-4 lg:flex">
        {SidebarContent}
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-ink-950/80 px-5 py-4 backdrop-blur-xl lg:hidden">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan text-white">
              <Terminal size={16} />
            </span>
            Dashboard
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-white/10 bg-ink-900 p-4">
              {SidebarContent}
            </aside>
          </div>
        )}

        <main className="container-page max-w-5xl py-8">
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-3 text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
              Loading dashboard...
            </div>
          ) : (
            <>
              {tab === 'overview' && (
                <Overview
                  profile={profile}
                  projects={projects}
                  skills={skills}
                  messages={messages}
                  onNavigate={setTab}
                />
              )}
              {tab === 'profile' && (
                <ProfileEditor profile={profile} onSaved={loadAll} />
              )}
              {tab === 'projects' && (
                <ProjectsManager
                  projects={projects}
                  onChanged={loadAll}
                />
              )}
              {tab === 'skills' && (
                <SkillsManager skills={skills} onChanged={loadAll} />
              )}
              {tab === 'messages' && (
                <MessagesManager
                  messages={messages}
                  onChanged={loadAll}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
