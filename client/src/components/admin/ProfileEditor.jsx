import { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle, User } from 'lucide-react';
import { api } from '../../lib/api.js';

const fields = [
  { key: 'name', label: 'Full name', placeholder: 'INGABIRE JOSIANE' },
  { key: 'title', label: 'Job title', placeholder: 'Full Stack Developer' },
  { key: 'email', label: 'Email', placeholder: 'josiane@example.com' },
  { key: 'phone', label: 'Phone', placeholder: '+1 555 123 4567' },
  { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
  { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
  {
    key: 'linkedin',
    label: 'LinkedIn URL',
    placeholder: 'https://linkedin.com/in/...',
  },
  { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://twitter.com/...' },
  { key: 'website', label: 'Website URL', placeholder: 'https://...' },
  { key: 'resume_url', label: 'Resume URL', placeholder: '/resume.pdf' },
];

export default function ProfileEditor({ profile, onSaved }) {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    setError('');
    try {
      await api.put('/profile', form);
      setStatus('saved');
      onSaved();
      setTimeout(() => setStatus('idle'), 2500);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Update your public profile and social links.
        </p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className={f.key === 'name' ? 'sm:col-span-1' : ''}>
              <label className="label" htmlFor={f.key}>
                {f.label}
              </label>
              <input
                id={f.key}
                name={f.key}
                value={form[f.key] || ''}
                onChange={onChange}
                className="input"
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-5">
          <label className="label" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio || ''}
            onChange={onChange}
            rows={5}
            className="input resize-none"
            placeholder="Tell visitors about yourself..."
          />
        </div>

        {status === 'saved' && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            <CheckCircle2 size={17} /> Profile saved successfully.
          </div>
        )}
        {status === 'error' && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle size={17} /> {error}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="btn-primary"
          >
            <Save size={16} />
            {status === 'saving' ? 'Saving...' : 'Save changes'}
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <User size={13} /> Publicly visible
          </span>
        </div>
      </form>
    </div>
  );
}
