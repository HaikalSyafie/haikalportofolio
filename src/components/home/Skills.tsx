import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";
import { techStack } from "@/lib/techIcons";

export default function Skills() {
  return (
    <section id="skills" className="section-padding scroll-mt-20">
      <div className="section-container">
        <Reveal>
          <SectionHeading
            kicker="Expertise"
            title="Technical Skills"
            description="Tools and technologies I use to build data-driven solutions."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
            {techStack.map((tech) => (
              <TechIcon key={tech.label} label={tech.label} icon={tech.icon} mono={tech.mono} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
