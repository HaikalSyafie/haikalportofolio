import { getFeaturedProjects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="section-padding scroll-mt-20">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            kicker="Portfolio"
            title="Featured Projects"
            description="End-to-end data science projects showcasing problem-solving, technical depth, and real-world impact."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
