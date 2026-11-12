import { useMemo } from 'react';
import { Sparkles, Code, Server, Wrench, Layers } from 'lucide-react';

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  DevOps: Layers,
  Tools: Wrench,
  General: Sparkles,
};

export default function Skills({ skills }) {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const skill of skills) {
      const key = skill.category || 'General';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(skill);
    }
    return Array.from(map.entries());
  }, [skills]);

  return (
    <section id="skills" className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <Sparkles size={14} /> Skills &amp; tools
          </span>
          <h2 className="section-title">
            The stack I <span className="text-gradient">work with</span>
          </h2>
          <p className="mt-4 text-slate-400">
            A toolkit refined over years of building products end to end — from
            pixel-perfect interfaces to scalable APIs and databases.
          </p>
        </div>

        {grouped.length === 0 ? (
          <p className="mt-10 text-slate-500">No skills added yet.</p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {grouped.map(([category, items]) => {
              const Icon = categoryIcons[category] || Sparkles;
              return (
                <div key={category} className="card p-6 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-cyan/10 text-accent-soft">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {category}
                    </h3>
                    <span className="ml-auto text-xs text-slate-500">
                      {items.length} skills
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {items.map((skill) => (
                      <li key={skill.id}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-200">
                            {skill.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan transition-all duration-700"
                            style={{ width: `${Math.min(100, skill.level || 0)}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
