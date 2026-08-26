import Reveal from "@/components/ui/Reveal";
import TypingRole from "@/components/ui/TypingRole";
import HeroChartBackground from "@/components/home/HeroChartBackground";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-20 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <HeroChartBackground />

      {/* Main Content */}
      <div className="section-container relative z-10 w-full">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

          {/* Availability Badge */}
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2 backdrop-blur-sm">
              {/* Animated Status Dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>

              <span className="text-xs font-medium text-accent-soft sm:text-sm">
                Available for opportunities
              </span>
            </div>
          </Reveal>

          {/* Greeting */}
          <Reveal delay={70}>
            <p className="text-base font-light text-foreground-muted sm:text-lg">
              Hello, I&apos;m
            </p>
          </Reveal>

          {/* Name */}
          <Reveal delay={140}>
            <h1
              className="
                mt-3
                text-[clamp(2.5rem,7vw,5rem)]
                font-semibold
                leading-[1.05]
                tracking-tight
                text-foreground
              "
            >
              Muhammad Haikal
            </h1>
          </Reveal>

          {/* Typing Role */}
          <Reveal delay={210}>
            <div
              className="
                mt-4
                min-h-[2rem]
                text-xl
                font-medium
                text-accent
                sm:min-h-[2.75rem]
                sm:text-3xl
              "
            >
              <TypingRole />
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={280}>
            <p
              className="
                mt-6
                max-w-[620px]
                text-base
                leading-relaxed
                text-foreground-muted
                sm:text-lg
              "
            >
              I build data-driven solutions through machine learning,
              statistical modeling, and analytics.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={350}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">

              {/* View Projects */}
              <a
                href="#projects"
                className="
                  rounded-md
                  bg-accent
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-accent-foreground
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-accent-hover
                  active:translate-y-0
                "
              >
                View Projects
              </a>

              {/* Contact Me */}
              <a
                href="#contact"
                className="
                  rounded-md
                  border
                  border-white/15
                  bg-white/[0.03]
                  px-6
                  py-3
                  text-sm
                  font-medium
                  text-foreground-muted
                  backdrop-blur-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-accent
                  hover:bg-accent/[0.06]
                  hover:text-foreground
                  active:translate-y-0
                "
              >
                Contact Me
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-7 left-0 right-0 z-10">
        <div className="section-container flex justify-center">
          <a
            href="#about"
            aria-label="Scroll to About Me"
            className="
              group
              flex
              flex-col
              items-center
              gap-2
              text-muted
              transition-colors
              duration-200
              hover:text-foreground
            "
          >
            {/* Scroll Label */}
            <span className="text-sm font-medium uppercase tracking-[0.22em]">
              Scroll
            </span>

            {/* Animated Arrow */}
            <span className="flex h-8 w-7 items-start justify-center overflow-hidden">
              <svg
                className="h-7 w-7 animate-scroll-down"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}