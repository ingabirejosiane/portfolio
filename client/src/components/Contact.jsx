import { useState } from 'react';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { api } from '../lib/api.js';

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact({ profile }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await api.post('/messages', form);
      setStatus('success');
      setForm(initial);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">
              <MessageSquare size={14} /> Contact
            </span>
            <h2 className="section-title">
              Let&apos;s build something <span className="text-gradient">great</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Have a project in mind or just want to say hi? Drop me a message
              and I&apos;ll get back to you as soon as possible.
            </p>

            <div className="mt-8 space-y-3">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-accent/30 hover:bg-white/5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-soft">
                    <Mail size={17} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-500">
                      Email
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {profile.email}
                    </span>
                  </span>
                </a>
              )}
              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-accent/30 hover:bg-white/5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-soft">
                    <Phone size={17} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-500">
                      Phone
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {profile.phone}
                    </span>
                  </span>
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-soft">
                    <MapPin size={17} />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-500">
                      Location
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {profile.location}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={onSubmit} className="card p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="input"
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="input"
                  placeholder="jane@example.com"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="input"
                placeholder="Project inquiry"
              />
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                className="input resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            {status === 'success' && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                <CheckCircle2 size={17} /> Thanks! Your message was sent.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                <AlertCircle size={17} /> {error || 'Something went wrong.'}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary mt-6 w-full"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
              {status !== 'loading' && <Send size={16} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
