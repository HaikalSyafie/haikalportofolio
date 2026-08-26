import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const focusAreas = [
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Time-Series Forecasting",
  "Data Visualization",
];

export default function About() {
  return (
    <section id="about" className="section-padding scroll-mt-20">
      <div className="section-container">

        {/* Section Heading */}
        <Reveal>
          <SectionHeading
            kicker="Background"
            title="About Me"
            align="left"
            tight
          />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[26rem_1fr] lg:gap-16">

          {/* Photo Column */}
          <Reveal>
            <div
              className="
                relative
                mx-auto
                mt-2
                aspect-square
                w-full
                max-w-md
                overflow-hidden
                rounded-full
                transition-transform
                duration-500
                hover:scale-[1.02]
                lg:mx-auto
              "
            >
              <Image
                src="/profil.jpeg"
                alt="Haikal Syafie"
                fill
                priority
                className="object-cover object-[center_30%]"
                sizes="(max-width: 1024px) 90vw, 26rem"
              />
            </div>
          </Reveal>

          {/* Text Column */}
          <div className="max-w-[680px]">

            <Reveal delay={80}>
              <div
                className="
                  max-w-[680px]
                  space-y-5
                  text-[15px]
                  leading-7
                  text-foreground-muted
                  sm:text-base
                "
              >
                <p className="indent-8 text-justify">
                  I&apos;m a data scientist with a strong interest in turning
                  complex data into meaningful insights and practical solutions.
                  I enjoy working across the entire data science workflow, from
                  understanding problems and exploring data to building,
                  evaluating, and improving machine learning models. My interests
                  span machine learning, statistical modeling, time-series
                  forecasting, deep learning, and data visualization.
                </p>

                <p className="indent-8 text-justify">
                  I particularly enjoy working on problems where careful analysis
                  and modeling can transform raw data into something useful for
                  decision-making. I believe good data science is not only about
                  achieving strong model performance, but also about understanding
                  the data, choosing the right methodology, communicating results
                  clearly, and building solutions that make sense in the real world.
                </p>
              </div>
            </Reveal>

            {/* Areas of Expertise */}
            <Reveal delay={180}>
              <div className="mt-9 border-t border-border pt-6">

                <span
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-subtle
                  "
                >
                  Areas of Expertise
                </span>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {focusAreas.map((area, i) => (
                    <span
                      key={area}
                      className="
                        tag-reveal
                        rounded-md
                        border
                        border-border
                        px-3.5
                        py-1.5
                        text-sm
                        text-foreground-muted
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-accent/50
                        hover:bg-accent/[0.04]
                        hover:text-accent-soft
                      "
                      style={{
                        transitionDelay: `${220 + i * 60}ms`,
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}