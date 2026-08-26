import type { IconType } from "react-icons";

interface TechIconProps {
  label: string;
  icon?: IconType;
  mono?: string;
}

export default function TechIcon({ label, icon: Icon, mono }: TechIconProps) {
  return (
    <div
      title={label}
      className="tech-tile group flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-surface px-2 py-3 sm:py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border-hover hover:bg-surface-light"
    >
      <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center text-muted transition-colors duration-200 group-hover:text-accent">
        {Icon ? (
          <Icon className="h-full w-full" aria-hidden="true" />
        ) : (
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-tight">
            {mono}
          </span>
        )}
      </span>
      <span className="text-[10px] sm:text-[11px] text-subtle text-center leading-tight truncate max-w-full">
        {label}
      </span>
    </div>
  );
}
