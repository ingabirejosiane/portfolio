import { useState } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  Check,
  Inbox,
  AlertCircle,
} from 'lucide-react';
import { api } from '../../lib/api.js';
import Modal from './Modal.jsx';

function formatDate(value) {
  if (!value) return '';
  const d = new Date(value);
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function MessagesManager({ messages, onChanged }) {
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);

  const unread = messages.filter((m) => !m.is_read).length;

  const toggleRead = async (message, isRead) => {
    try {
      await api.patch(`/messages/${message.id}`, { is_read: isRead });
      onChanged();
    } catch (err) {
      alert(err.message);
    }
  };

  const openMessage = async (message) => {
    setSelected(message);
    if (!message.is_read) {
      await toggleRead(message, true);
    }
  };

  const remove = async (message) => {
    if (!window.confirm('Delete this message?')) return;
    setBusy(true);
    try {
      await api.del(`/messages/${message.id}`);
      if (selected?.id === message.id) setSelected(null);
      onChanged();
    } catch (err) {
      alert(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">
          {messages.length} total · {unread} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 p-12 text-center">
          <Inbox size={30} className="text-slate-600" />
          <p className="text-sm text-slate-500">
            No messages yet. When someone uses your contact form, it will show
            up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`card flex flex-col gap-3 p-4 sm:flex-row sm:items-center ${
                message.is_read ? '' : 'border-accent/25'
              }`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  message.is_read
                    ? 'bg-white/5 text-slate-500'
                    : 'bg-accent/15 text-accent-soft'
                }`}
              >
                {message.is_read ? <MailOpen size={17} /> : <Mail size={17} />}
              </span>

              <button
                onClick={() => openMessage(message)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`truncate text-sm ${
                      message.is_read
                        ? 'font-medium text-slate-300'
                        : 'font-semibold text-white'
                    }`}
                  >
                    {message.name}
                  </p>
                  <span className="truncate text-xs text-slate-500">
                    {message.email}
                  </span>
                </div>
                <p className="truncate text-sm text-slate-500">
                  {message.subject || message.message}
                </p>
              </button>

              <div className="flex items-center gap-2 sm:ml-auto">
                <span className="mr-1 hidden text-xs text-slate-600 md:inline">
                  {formatDate(message.created_at)}
                </span>
                <button
                  onClick={() => toggleRead(message, !message.is_read)}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-emerald-500/40 hover:text-emerald-300"
                  aria-label={message.is_read ? 'Mark as unread' : 'Mark as read'}
                  title={message.is_read ? 'Mark as unread' : 'Mark as read'}
                >
                  <Check size={15} />
                </button>
                <button
                  onClick={() => remove(message)}
                  disabled={busy}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:border-red-500/40 hover:text-red-300"
                  aria-label="Delete message"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.subject || 'Message'}
        footer={
          <>
            <button
              type="button"
              onClick={() => remove(selected)}
              className="btn-ghost !text-red-300"
            >
              <Trash2 size={15} /> Delete
            </button>
            <a
              href={`mailto:${selected?.email}`}
              className="btn-primary"
            >
              <Mail size={15} /> Reply
            </a>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 p-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{selected.name}</p>
                <a
                  href={`mailto:${selected.email}`}
                  className="truncate text-sm text-accent-soft hover:underline"
                >
                  {selected.email}
                </a>
              </div>
              <span className="shrink-0 text-xs text-slate-500">
                {formatDate(selected.created_at)}
              </span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {selected.message}
            </p>
            {selected.subject && (
              <p className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400">
                <AlertCircle size={12} /> Subject: {selected.subject}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
