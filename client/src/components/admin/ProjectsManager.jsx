import { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  ExternalLink,
  Github,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../lib/api.js';
import Modal from './Modal.jsx';

const empty = {
  title: '',
  description: '',
  image_url: '',
  tech_stack: '',
  live_url: '',
  repo_url: '',
  featured: false,
  sort_order: 0,
};

export default function ProjectsManager({ projects, onChanged }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const openCreate = () => {
    setForm(empty);
    setEditingId(null);
    setError('');
    setOpen(true);
  };

  const openEdit = (project) => {
    setForm({
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || '',
      tech_stack: project.tech_stack || '',
      live_url: project.live_url || '',
      repo_url: project.repo_url || '',
      featured: !!project.featured,
      sort_order: project.sort_order || 0,
    });
    setEditingId(project.id);
    setError('');
    setOpen(true);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, form);
      } else {
        await api.post('/projects', form);
      }
      setOpen(false);
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (project) => {
    if (!window.confirm(`Delete "${project.title}"?`)) return;
    try {
      await api.del(`/projects/${project.id}`);
      onChanged();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the projects shown on your portfolio.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="card p-10 text-center text-sm text-slate-500">
          No projects yet. Click “Add project” to create your first one.
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <div className="h-20 w-full shrink-0 overflow-hidden rounded-xl bg-ink-800 sm:w-28">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-slate-600">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-display font-semibold text-white">
                    {project.title}
                  </h3>
                  {!!project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                      <Star size={10} /> Featured
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-accent-soft"
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-accent-soft"
                    >
                      <Github size={12} /> Repo
                    </a>
                  )}
                  <span className="text-slate-600">#{project.sort_order}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={() => openEdit(project)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent/40 hover:text-white"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => remove(project)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-red-500/40 hover:text-red-300"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? 'Edit project' : 'New project'}
        footer={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="project-form"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form id="project-form" onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={onChange}
              rows={3}
              className="input resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="tech_stack">
                Tech stack (comma separated)
              </label>
              <input
                id="tech_stack"
                name="tech_stack"
                value={form.tech_stack}
                onChange={onChange}
                className="input"
                placeholder="React,Node.js,MySQL"
              />
            </div>
            <div>
              <label className="label" htmlFor="image_url">
                Image URL
              </label>
              <input
                id="image_url"
                name="image_url"
                value={form.image_url}
                onChange={onChange}
                className="input"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="label" htmlFor="live_url">
                Live demo URL
              </label>
              <input
                id="live_url"
                name="live_url"
                value={form.live_url}
                onChange={onChange}
                className="input"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="label" htmlFor="repo_url">
                Repository URL
              </label>
              <input
                id="repo_url"
                name="repo_url"
                value={form.repo_url}
                onChange={onChange}
                className="input"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={onChange}
                className="h-4 w-4 rounded border-white/20 bg-ink-850 accent-accent"
              />
              Featured project
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-300" htmlFor="sort_order">
                Sort order
              </label>
              <input
                id="sort_order"
                name="sort_order"
                type="number"
                value={form.sort_order}
                onChange={onChange}
                className="input !w-24"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
