interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  badge?: string;
}

const projects: Project[] = [
  {
    title: "Habit Tracker Ecosystem (Web + Mobile)",
    description:
      "Pełny ekosystem do śledzenia nawyków. Panel analityczny w Next.js oraz aplikacja mobilna z płynnymi gestami, zasilane wspólnym API napisanym w FastAPI.",
    tags: ["Next.js", "React Native", "Expo", "FastAPI", "PostgreSQL"],
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/nturska/habit-tracker",
    badge: "Flagship",
  },
  {
    title: "Headless E-Commerce Store",
    description:
      "Nowoczesny sklep z filtrowaniem po stronie klienta, Server-Side Rendering pod kątem SEO oraz koszykiem zarządzanym przez Zustand.",
    tags: ["React", "Next.js", "Tailwind CSS", "Zustand"],
    liveUrl: "https://twoj-sklep.vercel.app",
    githubUrl: "https://github.com/twoj-login/next-ecommerce",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12 bg-base-200/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Wybrane projekty
          </h2>
          <p className="text-base-content/70">
            Aplikacje demonstrujące pracę z webem, mobilem i backendem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-sm border border-base-200"
            >
              <div className="card-body">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="card-title text-xl">{project.title}</h3>
                  {project.badge && (
                    <span className="badge badge-secondary badge-sm">
                      {project.badge}
                    </span>
                  )}
                </div>
                <p className="text-base-content/80 text-sm mt-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 my-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="badge badge-neutral badge-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="card-actions justify-end mt-auto gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
