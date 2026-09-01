import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectById, getAdjacentProjects } from "@/data/projects";
import type { CaseStudyTable } from "@/data/projects";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TechIcon from "@/components/ui/TechIcon";
import WorkflowDiagram from "@/components/projects/WorkflowDiagram";
import StarSchemaDiagram from "@/components/projects/StarSchemaDiagram";
import { getTechIcon } from "@/lib/techIcons";

const ACCENT = "#7c8cf5";

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

// Dynamic metadata
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectById(params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Portfolio`,
    description: project.subtitle,
  };
}

// Image placeholder component — renders the real chart when `src` is set, otherwise a placeholder box
function ImagePlaceholder({ src, label, caption }: { src?: string; label: string; caption: string }) {
  return (
    <div className="my-6">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} className="w-full rounded-lg border border-border" />
      ) : (
        <div className="aspect-video rounded-lg image-placeholder">
          <svg
            className="w-12 h-12 opacity-30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          <span className="text-xs font-mono opacity-60">{label}</span>
        </div>
      )}
      <p className="text-xs text-subtle mt-2 italic">{caption}</p>
    </div>
  );
}

// Data table for the "pipeline" case-study layout — column 0 is the row header,
// remaining columns are right-aligned figures; an optional row can be highlighted.
function CaseStudyTableView({ table }: { table: CaseStudyTable }) {
  return (
    <div className="my-6">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-subtle">
              {table.columns.map((c, i) => (
                <th
                  key={c}
                  className={`px-4 py-3 font-medium whitespace-nowrap ${i === 0 ? "" : "text-right"}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => {
              const highlight = table.highlightRowIndex === ri;
              return (
                <tr
                  key={ri}
                  className="border-b border-border last:border-0"
                  style={highlight ? { background: "rgba(124,140,245,0.08)" } : undefined}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-4 py-3 whitespace-nowrap ${
                        ci === 0 ? "font-medium text-foreground" : "text-muted text-right"
                      }`}
                      style={ci === 0 && highlight ? { color: ACCENT } : undefined}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {table.caption && <p className="text-xs text-subtle mt-2 italic">{table.caption}</p>}
    </div>
  );
}

// A single labeled sub-step within the Approach / Methodology section
function MethodStep({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: ACCENT }}>
        {label}
      </h3>
      <div className="text-foreground-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(project.id);

  // Map images to section keys for inline placement
  const imageMap: Record<string, (typeof project.images)[0]> = {};
  const sectionImageKeys = ["eda", "evaluation", "results", "predictions"];
  project.images.forEach((img, i) => {
    if (i < sectionImageKeys.length) {
      imageMap[sectionImageKeys[i]] = img;
    }
  });

  const [primaryMetric, ...otherMetrics] = project.keyMetrics;

  return (
    <div className="pb-16 sm:pb-20">
      {/* ============================================================ */}
      {/* 1. PROJECT HERO */}
      {/* ============================================================ */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="section-container max-w-5xl">
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Projects
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color: ACCENT }}>
              {project.category}
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.techStack.map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="px-3 py-1 text-xs rounded-md bg-surface-light text-foreground-muted border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={140} className="section-container max-w-5xl mt-10">
          {project.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto max-h-[28rem] mx-auto rounded-lg border border-border bg-white object-contain"
            />
          ) : (
            <div className="aspect-video rounded-lg image-placeholder overflow-hidden">
              <svg
                className="w-16 h-16 opacity-20"
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
              <span className="text-sm font-mono opacity-40">Project Cover Image</span>
            </div>
          )}
        </Reveal>
      </section>

      <div className="section-container max-w-5xl">
        {/* ============================================================ */}
        {/* 2. OVERVIEW */}
        {/* ============================================================ */}
        <Reveal as="div" className="py-8 border-t border-border">
          <SectionHeading kicker="Overview" title="Project Overview" align="left" tight />
          <p className="text-foreground-muted leading-relaxed">{project.overview}</p>
        </Reveal>

        {project.layout === "pipeline" ? (
          <>
            {/* ============================================================ */}
            {/* PIPELINE — ROLE */}
            {/* ============================================================ */}
            {project.role && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Role" title="My Role" align="left" tight />
                <p className="text-foreground-muted leading-relaxed">{project.role}</p>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* PIPELINE — PROBLEM */}
            {/* ============================================================ */}
            {project.problem && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Problem" title="The Challenge" align="left" tight />
                <p className="text-foreground-muted leading-relaxed">{project.problem}</p>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* PIPELINE — KEY NUMBERS */}
            {/* ============================================================ */}
            {primaryMetric && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="At a Glance" title="Key Numbers" align="left" tight />
                <div
                  className="mb-6 rounded-lg border px-5 py-4"
                  style={{ borderColor: "rgba(124,140,245,0.35)", background: "rgba(124,140,245,0.08)" }}
                >
                  <div className="text-3xl sm:text-4xl font-semibold" style={{ color: ACCENT }}>
                    {primaryMetric.value}
                  </div>
                  <div className="text-sm text-foreground font-medium mt-1">{primaryMetric.label}</div>
                  {primaryMetric.description && (
                    <div className="text-xs text-subtle mt-0.5">{primaryMetric.description}</div>
                  )}
                </div>
                {otherMetrics.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {otherMetrics.map((metric, i) => (
                      <div key={`${metric.label}-${i}`} className="min-w-0">
                        <div className="text-xl font-semibold text-foreground break-words">{metric.value}</div>
                        <div className="text-xs text-muted mt-1 font-medium">{metric.label}</div>
                        {metric.description && (
                          <div className="text-xs text-subtle mt-0.5">{metric.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* PIPELINE — STAGE STRIP */}
            {/* ============================================================ */}
            {project.pipelineStages && project.pipelineStages.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Approach" title="The Pipeline" align="left" tight />
                <div
                  className={`grid gap-3 ${
                    project.pipelineStages.length === 4
                      ? "sm:grid-cols-2 lg:grid-cols-4"
                      : "sm:grid-cols-3"
                  }`}
                >
                  {project.pipelineStages.map((stage, i) => (
                    <div key={i} className="rounded-lg border border-border bg-surface p-4">
                      <div className="text-xs font-mono font-semibold" style={{ color: ACCENT }}>
                        {stage.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-foreground">{stage.title}</div>
                      <div className="mt-1.5 text-xs text-muted leading-relaxed">{stage.detail}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* PIPELINE — CASE STUDY SECTIONS */}
            {/* ============================================================ */}
            {project.caseStudySections?.map((sec, i) => (
              <Reveal as="div" key={i} className="py-8 border-t border-border">
                <SectionHeading kicker={sec.kicker} title={sec.title} align="left" tight />
                {sec.body && <p className="text-foreground-muted leading-relaxed">{sec.body}</p>}
                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {sec.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-foreground-muted leading-relaxed">
                        <span className="text-subtle">→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.table && <CaseStudyTableView table={sec.table} />}
                {sec.image && (
                  <ImagePlaceholder src={sec.image.src} label={sec.image.alt} caption={sec.image.caption} />
                )}
              </Reveal>
            ))}

            {/* ============================================================ */}
            {/* PIPELINE — KEY FINDINGS */}
            {/* ============================================================ */}
            {project.insights && project.insights.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Insights" title="Key Findings" align="left" tight />
                <ul className="space-y-4">
                  {project.insights.map((insight, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-semibold mt-0.5"
                        style={{ borderColor: "rgba(124,140,245,0.5)", color: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-foreground-muted leading-relaxed">{insight}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* PIPELINE — LIMITATIONS & NEXT STEPS */}
            {/* ============================================================ */}
            {project.limitations && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Honest Assessment" title="Limitations & Next Steps" align="left" tight />
                <p className="text-foreground-muted leading-relaxed">{project.limitations}</p>
                {project.nextSteps && project.nextSteps.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {project.nextSteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground-muted leading-relaxed">
                        <span className="text-subtle">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            )}
          </>
        ) : project.layout === "docs" ? (
          <>
            {/* ============================================================ */}
            {/* DOCS — ARCHITECTURE */}
            {/* ============================================================ */}
            {project.architectureLayers && project.architectureLayers.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Architecture" title="Medallion Layers" align="left" tight />
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-subtle">
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Layer</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Purpose</th>
                        <th className="px-4 py-3 font-medium">What Happens</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.architectureLayers.map((row) => (
                        <tr key={row.layer} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap align-top">
                            {row.layer}
                          </td>
                          <td className="px-4 py-3 text-foreground-muted whitespace-nowrap align-top">
                            {row.purpose}
                          </td>
                          <td className="px-4 py-3 text-muted align-top">{row.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* DOCS — DATA SOURCES */}
            {/* ============================================================ */}
            {project.dataSources && project.dataSources.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Data" title="Data Sources" align="left" tight />
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-subtle">
                        <th className="px-4 py-3 font-medium whitespace-nowrap">System</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">File</th>
                        <th className="px-4 py-3 font-medium">Description</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Rows</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.dataSources.map((row, i) => (
                        <tr key={`${row.file}-${i}`} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">{row.system}</td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap font-mono text-xs">{row.file}</td>
                          <td className="px-4 py-3 text-foreground-muted">{row.description}</td>
                          <td className="px-4 py-3 text-muted whitespace-nowrap">{row.rows}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* DOCS — STAR SCHEMA */}
            {/* ============================================================ */}
            {project.starSchema && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Modeling" title="Gold Layer — Star Schema" align="left" tight />
                <p className="text-foreground-muted leading-relaxed">{project.starSchema}</p>
                <div className="mt-6">
                  <StarSchemaDiagram />
                </div>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* DOCS — ANALYTICS & EDA */}
            {/* ============================================================ */}
            {project.analysisScripts && project.analysisScripts.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Analytics" title="Analytics & EDA" align="left" tight />
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-subtle">
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Script</th>
                        <th className="px-4 py-3 font-medium">Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.analysisScripts.map((row) => (
                        <tr key={row.script} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap font-mono text-xs align-top">
                            {row.script}
                          </td>
                          <td className="px-4 py-3 text-foreground-muted align-top">{row.focus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* DOCS — GETTING STARTED */}
            {/* ============================================================ */}
            {project.gettingStarted && project.gettingStarted.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Setup" title="Getting Started" align="left" tight />
                <ol className="space-y-3">
                  {project.gettingStarted.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground-muted leading-relaxed">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-semibold"
                        style={{ borderColor: "rgba(124,140,245,0.5)", color: ACCENT }}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            {/* ============================================================ */}
            {/* DOCS — KEY CONCEPTS DEMONSTRATED */}
            {/* ============================================================ */}
            {project.keyConcepts && project.keyConcepts.length > 0 && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Concepts" title="Key Concepts Demonstrated" align="left" tight />
                <ul className="space-y-2.5">
                  {project.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground-muted leading-relaxed">
                      <span className="text-subtle">→</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </>
        ) : (
          <>
            {/* ============================================================ */}
            {/* 3. PROBLEM */}
            {/* ============================================================ */}
            <Reveal as="div" className="py-8 border-t border-border">
              <SectionHeading kicker="Problem" title="The Challenge" align="left" tight />
              <p className="text-foreground-muted leading-relaxed">{project.problem}</p>
            </Reveal>

            {/* ============================================================ */}
            {/* 4. APPROACH / METHODOLOGY */}
            {/* ============================================================ */}
            <Reveal as="div" className="py-8 border-t border-border">
              <SectionHeading kicker="Methodology" title="Approach" align="left" tight />

              <WorkflowDiagram />

              <div className="mt-8 space-y-7">
                <MethodStep label="Data Source">
                  <p>{project.dataset?.description}</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="border border-border rounded-md p-3">
                      <div className="text-xs text-subtle">Name</div>
                      <div className="text-sm text-foreground font-medium">{project.dataset?.name}</div>
                    </div>
                    <div className="border border-border rounded-md p-3">
                      <div className="text-xs text-subtle">Source</div>
                      <div className="text-sm text-foreground font-medium">{project.dataset?.source}</div>
                    </div>
                    <div className="border border-border rounded-md p-3">
                      <div className="text-xs text-subtle">Size</div>
                      <div className="text-sm text-foreground font-medium">{project.dataset?.size}</div>
                    </div>
                  </div>
                </MethodStep>

                <MethodStep label="Preprocessing">
                  <p>{project.dataPreprocessing}</p>
                </MethodStep>

                <MethodStep label="Exploratory Data Analysis">
                  <p>{project.eda}</p>
                  {imageMap.eda && (
                    <ImagePlaceholder src={imageMap.eda.src} label={imageMap.eda.alt} caption={imageMap.eda.caption} />
                  )}
                </MethodStep>

                <MethodStep label="Feature Engineering">
                  <p>{project.featureEngineering}</p>
                </MethodStep>

                <MethodStep label="Modeling">
                  <p>{project.modeling}</p>
                </MethodStep>

                <MethodStep label="Evaluation Methodology">
                  <p>{project.evaluation}</p>
                  {imageMap.evaluation && (
                    <ImagePlaceholder src={imageMap.evaluation.src} label={imageMap.evaluation.alt} caption={imageMap.evaluation.caption} />
                  )}
                </MethodStep>
              </div>
            </Reveal>

            {/* ============================================================ */}
            {/* 5. RESULTS */}
            {/* ============================================================ */}
            <Reveal as="div" className="py-8 border-t border-border">
              <SectionHeading kicker="Results" title="Results" align="left" tight />

              {/* Headline result */}
              {primaryMetric && (
                <div
                  className="mb-6 rounded-lg border px-5 py-4"
                  style={{ borderColor: "rgba(124,140,245,0.35)", background: "rgba(124,140,245,0.08)" }}
                >
                  <div className="text-3xl sm:text-4xl font-semibold" style={{ color: ACCENT }}>
                    {primaryMetric.value}
                  </div>
                  <div className="text-sm text-foreground font-medium mt-1">
                    {primaryMetric.label}
                  </div>
                  {primaryMetric.description && (
                    <div className="text-xs text-subtle mt-0.5">{primaryMetric.description}</div>
                  )}
                </div>
              )}

              {otherMetrics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {otherMetrics.map((metric, i) => (
                    <div key={`${metric.label}-${i}`} className="min-w-0">
                      <div className="text-xl font-semibold text-foreground break-words">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted mt-1 font-medium">{metric.label}</div>
                      {metric.description && (
                        <div className="text-xs text-subtle mt-0.5">{metric.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <p className="text-foreground-muted leading-relaxed">{project.results}</p>
              {imageMap.results && (
                <ImagePlaceholder src={imageMap.results.src} label={imageMap.results.alt} caption={imageMap.results.caption} />
              )}

              {project.classMetrics && project.classMetrics.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Per-Class Metrics
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-subtle">
                          <th className="px-4 py-3 font-medium whitespace-nowrap">Class</th>
                          <th className="px-4 py-3 font-medium whitespace-nowrap">Precision</th>
                          <th className="px-4 py-3 font-medium whitespace-nowrap">Recall</th>
                          <th className="px-4 py-3 font-medium whitespace-nowrap">F1</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.classMetrics.map((row) => (
                          <tr key={row.label} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">
                              {row.label}
                            </td>
                            <td className="px-4 py-3 text-muted whitespace-nowrap">{row.precision}</td>
                            <td className="px-4 py-3 text-muted whitespace-nowrap">{row.recall}</td>
                            <td className="px-4 py-3 text-muted whitespace-nowrap">{row.f1}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {imageMap.predictions && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Example Prediction
                  </h3>
                  <ImagePlaceholder
                    src={imageMap.predictions.src}
                    label={imageMap.predictions.alt}
                    caption={imageMap.predictions.caption}
                  />
                </div>
              )}

              {project.modelComparison && project.modelComparison.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {project.modelComparisonTitle ?? "Model Comparison"}
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-subtle">
                          <th className="px-4 py-3 font-medium whitespace-nowrap">
                            {project.modelComparisonTitle ? "Rule" : "Model"}
                          </th>
                          {project.modelComparison[0].metrics.map((m) => (
                            <th key={m.label} className="px-4 py-3 font-medium whitespace-nowrap">
                              {m.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {project.modelComparison.map((row) => (
                          <tr key={row.model} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 text-foreground font-medium whitespace-nowrap">
                              {row.model}
                            </td>
                            {row.metrics.map((m) => (
                              <td key={m.label} className="px-4 py-3 text-muted whitespace-nowrap">
                                {m.value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Reveal>

            {/* ============================================================ */}
            {/* 6. KEY INSIGHTS */}
            {/* ============================================================ */}
            <Reveal as="div" className="py-8 border-t border-border">
              <SectionHeading kicker="Insights" title="Key Insights" align="left" tight />
              <ul className="space-y-4">
                {project.insights?.map((insight, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-mono font-semibold mt-0.5"
                      style={{ borderColor: "rgba(124,140,245,0.5)", color: ACCENT }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground-muted leading-relaxed">{insight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* ============================================================ */}
            {/* 6b. LIMITATIONS & NEXT STEPS */}
            {/* ============================================================ */}
            {project.limitations && (
              <Reveal as="div" className="py-8 border-t border-border">
                <SectionHeading kicker="Honest Assessment" title="Limitations & Next Steps" align="left" tight />
                <p className="text-foreground-muted leading-relaxed">{project.limitations}</p>
                {project.nextSteps && project.nextSteps.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {project.nextSteps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground-muted leading-relaxed">
                        <span className="text-subtle">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* 7. TECH STACK */}
        {/* ============================================================ */}
        <Reveal as="div" className="py-8 border-t border-border">
          <SectionHeading kicker="Stack" title="Tech Stack" align="left" tight />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
            {project.techStack.map((tech) => {
              const { icon, mono } = getTechIcon(tech);
              return <TechIcon key={tech} label={tech} icon={icon} mono={mono} />;
            })}
          </div>
        </Reveal>

        {/* ============================================================ */}
        {/* 8. PROJECT LINKS */}
        {/* ============================================================ */}
        <Reveal as="div" className="py-8 border-t border-border">
          <h2 className="text-xl font-semibold text-foreground mb-5">Project Links</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground text-sm font-medium hover:border-border-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub Repository
            </a>

            <a
              href={project.datasetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-muted text-sm font-medium hover:text-foreground hover:border-border-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              Dataset Source
            </a>
          </div>
        </Reveal>
      </div>

      {/* ============================================================ */}
      {/* 9. NAVIGATION — Back to Projects / Previous / Next */}
      {/* ============================================================ */}
      <div className="section-container max-w-5xl mt-2">
        <Reveal as="div" className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="group flex-1 rounded-lg border border-border px-4 py-3.5 hover:border-border-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-xs text-subtle uppercase tracking-wide">← Previous</span>
                <span className="block mt-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {prev.title}
                </span>
              </Link>
            )}

            <Link
              href="/#projects"
              className="shrink-0 flex items-center justify-center rounded-lg border border-border px-5 py-3.5 text-sm font-medium text-muted hover:text-foreground hover:border-border-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              All Projects
            </Link>

            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="group flex-1 rounded-lg border border-border px-4 py-3.5 text-right hover:border-border-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-xs text-subtle uppercase tracking-wide">Next →</span>
                <span className="block mt-1 text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
