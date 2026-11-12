import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { api } from '../../lib/api.js';
import Modal from './Modal.jsx';

const empty = { name: '', category: 'Frontend', level: 80 };
const categories = ['Frontend', 'Backend', 'DevOps', 'Tools', 'General'];

export default function SkillsManager({ skills, onChanged }) {
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

  const openEdit = (skill) => {
    setForm({
      name: skill.name,
      category: skill.category || 'General',
      level: skill.level,
    });
    setEditingId(skill.id);
    setError('');
    setOpen(true);
  };

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { ...form, level: Number(form.level) };
      if (editingId) {
        await api.put(`/skills/${editingId}`, payload);
      } else {
        await api.post('/skills', payload);
      }
      setOpen(false);
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (skill) => {
    if (!window.confirm(`Delete "${skill.name}"?`)) return;
    try {
      await api.del(`/skills/${skill.id}`);
      onChanged();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Skills</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add the technologies you work with and rate your proficiency.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary">
          <Plus size={16} /> Add skill
        </button>
      </div>

      {skills.length === 0 ? (
        <div className="card p-10 text-center text-sm text-slate-500">
          No skills yet. Click “Add skill” to get started.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.id} className="card p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{skill.name}</p>
                  <p className="text-xs text-slate-500">{skill.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-accent-soft">
                    {skill.level}%
                  </span>
                  <button
                    onClick={() => openEdit(skill)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-accent/40 hover:text-white"
                    aria-label="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => remove(skill)}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-red-500/40 hover:text-red-300"
                    aria-label="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                  style={{ width: `${Math.min(100, skill.level || 0)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? 'Edit skill' : 'New skill'}
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
              form="skill-form"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </button>
          </>
        }
      >
        <form id="skill-form" onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label" htmlFor="name">
              Skill name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              className="input"
              placeholder="React"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={onChange}
                className="input"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="level">
                Level ({form.level}%)
              </label>
              <input
                id="level"
                name="level"
                type="range"
                min="0"
                max="100"
                value={form.level}
                onChange={onChange}
                className="mt-3 w-full accent-accent"
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
