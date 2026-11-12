import { FolderGit2, ExternalLink, Github, Star } from 'lucide-react';

function techList(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <FolderGit2 size={14} /> Portfolio
            </span>
            <h2 className="section-title">
              Selected <span className="text-gradient">projects</span>
            </h2>
            <p className="mt-4 text-slate-400">
              A selection of things I&apos;ve designed and built. Each project
              taught me something new about shipping great software.
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="card mt-12 p-10 text-center text-slate-500">
            No projects added yet.
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const techs = techList(project.tech_stack);
              return (
                <article
                  key={project.id}
                  className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-accent/30 animate-fade-up"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink-800 to-ink-850 font-display text-3xl font-bold text-white/10">
                        {project.title?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    {!!project.featured && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
                        <Star size={11} /> Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    {techs.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {techs.slice(0, 5).map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-sm">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-accent-soft transition hover:text-white"
                        >
                          <ExternalLink size={14} /> Live demo
                        </a>
                      )}
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-slate-400 transition hover:text-white"
                        >
                          <Github size={14} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
