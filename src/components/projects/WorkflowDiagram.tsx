const steps = ["Data", "Preprocessing", "Feature Engineering", "Modeling", "Evaluation"];

function StepNode({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/50 text-xs font-mono font-semibold text-accent">
        {index}
      </span>
      <span className="text-xs sm:text-sm font-medium text-foreground max-w-[6rem] sm:max-w-[7rem]">
        {label}
      </span>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4 shrink-0 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg className="w-4 h-4 shrink-0 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/** Visual Data → Preprocessing → Feature Engineering → Modeling → Evaluation flow. */
export default function WorkflowDiagram() {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      {/* Tablet / desktop — horizontal flow */}
      <div className="hidden sm:flex items-start justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-start flex-1 last:flex-none">
            <StepNode index={i + 1} label={step} />
            {i < steps.length - 1 && (
              <div className="flex flex-1 items-center justify-center pt-4">
                <ArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile — vertical flow */}
      <div className="flex sm:hidden flex-col items-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <StepNode index={i + 1} label={step} />
            {i < steps.length - 1 && <ArrowDown />}
          </div>
        ))}
      </div>
    </div>
  );
}
