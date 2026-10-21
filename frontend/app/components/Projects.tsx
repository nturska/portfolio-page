"use client";

import { useLocale } from "@/lib/hooks/useLocale";
import { localized, type LocalizedText } from "@/lib/i18n";

interface Project {
  title: LocalizedText;
  description: LocalizedText;
  tags: string[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: {
      pl: "Ekosystem Śledzenia Nawyków",
      en: "Habit tracking ecosystem",
    },
    description: {
      pl: "Aplikacja do śledzenia nawyków i panel analityczny w Next.js, zasilany API napisanym w FastAPI.",
      en: "Habit-tracking app and analytics dashboard in Next.js, powered by a FastAPI backend.",
    },
    tags: ["Next.js", "FastAPI", "PostgreSQL"],
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/nturska/portfolio-page",
    featured: true,
  },
  {
    title: {
      pl: "PDF Q&A - Pytania o Treść PDF-a",
      en: "PDF Q&A - Ask questions about a PDF",
    },
    description: {
      pl: "Aplikacja wykorzystująca LLM do pytania o treść PDF-a.",
      en: "App that uses an LLM to answer questions about PDF content.",
    },
    tags: ["React", "Python", "FastAPI", "LangChain"],
    githubUrl: "https://github.com/nturska/AI-Powered-Document-Q-A-App",
  },
];

export default function Projects() {
  const { locale, t } = useLocale();

  return (
    <section id="projects" className="py-20 px-4 md:px-12 bg-base-100/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("projects.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-sm border border-base-300 shadow-base-200"
            >
              <div className="card-body">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="card-title text-xl">
                    {localized(project.title, locale)}
                  </h3>
                  {project.featured && (
                    <span className="badge badge-accent badge-sm">
                      {t("projects.featured")}
                    </span>
                  )}
                </div>
                <p className="text-base-content/80 text-sm mt-2 leading-relaxed">
                  {localized(project.description, locale)}
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
                      {t("projects.demo")}
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
