interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Tighter bottom margin for sections where the heading should read as
   *  introducing the content directly below it, rather than separating it
   *  (e.g. an intro/bio section vs. a section preceding a grid of cards). */
  tight?: boolean;
}

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  tight = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`${tight ? "mb-6 sm:mb-8" : "mb-10 sm:mb-12"} ${
        isCenter ? "text-center" : "text-left"
      }`}
    >
      <span className="kicker">{kicker}</span>
      <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-foreground-muted leading-relaxed ${
            isCenter ? "max-w-xl mx-auto" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
