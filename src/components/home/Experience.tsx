import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const experience = [
  {
    role: "Machine Learning Cohort",
    company: "Bangkit Academy",
    period: "Jul 2024 — Jan 2025",
    description:
      "Participated as a Machine Learning Cohort in Bangkit Academy, an intensive technology program focused on developing practical skills in Machine Learning and Artificial Intelligence. Gained hands-on experience in Python, data preprocessing, exploratory data analysis, machine learning algorithms, deep learning, and model evaluation.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding scroll-mt-20">
      <div className="section-container max-w-3xl mr-auto ml-0">
        <Reveal>
          <SectionHeading
            kicker="Career"
            title="Experience"
            description="Roles and organizations where I've applied data science in practice."
            align="left"
          />
        </Reveal>

        <div className="space-y-10">
          {experience.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative pl-7 border-l border-border">
                <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono text-subtle whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <div className="mt-0.5 text-sm font-medium text-accent">
                  {item.company}
                </div>
                <p className="mt-3 max-w-xl text-sm text-foreground-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
