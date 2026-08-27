import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      id={`project-card-${project.id}`}
      className="card card-hover group flex flex-col overflow-hidden h-full"
    >
      {/* Thumbnail */}
      <div className="p-3 border-b border-border">
        <div className="relative aspect-[2/1] overflow-hidden rounded-md">
          {project.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface">
              <div className="flex flex-col items-center gap-2 text-subtle">
                <svg
                  className="w-7 h-7 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                  />
                </svg>
                <span className="text-[11px] font-mono opacity-70">
                  Project Thumbnail
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Title + category + description */}
      <div className="px-4 pt-3.5 flex-1 flex flex-col gap-1.5">
        <span className="text-[11px] font-medium uppercase tracking-wide text-accent line-clamp-1">
          {project.category}
        </span>
        <h3 className="text-base font-semibold text-foreground leading-snug line-clamp-1">
          {project.title}
        </h3>
        <p className="text-[13px] text-foreground-muted leading-relaxed line-clamp-2">
          {project.subtitle}
        </p>
      </div>

      {/* Tech stack pills */}
      <div className="px-4 pt-3 flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="px-2 py-0.5 text-[11px] rounded-md bg-surface-light text-muted border border-border"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="px-2 py-0.5 text-[11px] rounded-md text-subtle">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-3 mx-4 py-3 border-t border-border flex items-center justify-between text-[13px] font-medium text-foreground group-hover:gap-2.5 transition-all duration-200">
        View Project
        <svg
          className="w-3.5 h-3.5 text-accent transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
