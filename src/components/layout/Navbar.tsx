"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TbBrain } from "react-icons/tb";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const hero = document.getElementById("hero");

    const onScroll = () => {
      const heroBottom = hero ? hero.offsetHeight : window.innerHeight;
      setScrolledPastHero(window.scrollY > heroBottom - 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const NAV_OFFSET = 160;

    const updateActiveSection = () => {
      const scrollPos = window.scrollY;
      const atBottom =
        window.innerHeight + scrollPos >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0];
      for (const section of sections) {
        if (section.offsetTop - NAV_OFFSET <= scrollPos) {
          current = section;
        }
      }
      setActiveId(current.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolledPastHero
          ? "bg-background/90 border-b border-white/[0.10] backdrop-blur-[12px]"
          : "bg-transparent"
        }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className={`flex items-center hover:opacity-80 transition-all duration-300 ${scrolledPastHero
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
            }`}
        >
          <TbBrain className="h-7 w-7 text-accent" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9">

          {navLinks.map((link) => {
            const isActive = activeId === link.id;

            return (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className={`
                  nav-link
                  relative
                  text-base
                  font-medium
                  transition-colors
                  duration-200
                  py-2
                  ${isActive
                    ? "text-foreground active"
                    : "text-foreground-muted hover:text-foreground"
                  }
                `}
              >
                {link.label}

                {/* Animated underline */}
                <span
                  className={`
                    absolute
                    left-0
                    -bottom-0.5
                    h-[2px]
                    bg-accent
                    rounded-full
                    transition-all
                    duration-300
                    origin-center
                    ${isActive
                      ? "w-full scale-x-100 opacity-100"
                      : "w-full scale-x-0 opacity-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </a>
            );
          })}

          {/* Download CV */}
          <a
            href="https://drive.google.com/file/d/1R7sNZI7fmUP7AWSJ3rxBqeFkXO98xAf2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-base
              font-medium
              px-5
              py-2.5
              rounded-md
              border
              border-accent
              text-accent-soft
              hover:bg-accent
              hover:text-accent-foreground
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all
              duration-200
            "
          >
            Download CV
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />

          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
              }`}
          />

          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
          }`}
      >
        <div className="section-container pb-5 pt-2 flex flex-col gap-2 bg-background/95 border-b border-border backdrop-blur-md">

          {navLinks.map((link) => {
            const isActive = activeId === link.id;

            return (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="block py-2"
              >
                <span
                  className={`
                    relative
                    inline-block
                    text-base
                    font-medium
                    transition-colors
                    duration-200
                    ${isActive
                      ? "text-foreground"
                      : "text-foreground-muted hover:text-foreground"
                    }
                  `}
                >
                  {link.label}

                  {/* Mobile active underline */}
                  <span
                    className={`
                      absolute
                      left-0
                      -bottom-1
                      h-[2px]
                      bg-accent
                      rounded-full
                      transition-all
                      duration-300
                      ${isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                      }
                    `}
                  />
                </span>
              </a>
            );
          })}

          {/* Mobile Download CV */}
          <a
            href="https://drive.google.com/file/d/1R7sNZI7fmUP7AWSJ3rxBqeFkXO98xAf2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="
              mt-2
              text-base
              font-medium
              px-5
              py-2.5
              rounded-md
              border
              border-accent
              text-accent-soft
              text-center
              hover:bg-accent
              hover:text-accent-foreground
              transition-all
              duration-200
            "
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}