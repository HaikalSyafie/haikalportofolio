import type { IconType } from "react-icons";
import {
  SiPython,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiGithub,
  SiGit,
  SiNumpy,
} from "react-icons/si";
import { TbDatabase, TbFileExcel, TbEye } from "react-icons/tb";

export interface TechIconEntry {
  icon?: IconType;
  mono?: string;
}

/**
 * Canonical technology list for the homepage Skills grid — every entry has
 * an explicit display label plus its icon/monogram.
 */
export const techStack: { label: string; icon?: IconType; mono?: string }[] = [
  { label: "Python", icon: SiPython },
  { label: "C++", icon: SiCplusplus },
  { label: "SQL", icon: TbDatabase },
  { label: "MS Excel", icon: TbFileExcel },
  { label: "TensorFlow", icon: SiTensorflow },
  { label: "PyTorch", icon: SiPytorch },
  { label: "FastAPI", icon: SiFastapi },
  { label: "GitHub", icon: SiGithub },
  { label: "Git", icon: SiGit },
  { label: "NumPy", icon: SiNumpy },
  { label: "Power BI", mono: "PBI" },
  { label: "Computer Vision", icon: TbEye },
  { label: "YOLO", mono: "YOLO" },
];

const techIconByKey: Record<string, TechIconEntry> = Object.fromEntries(
  techStack.map((t) => [t.label.toLowerCase(), { icon: t.icon, mono: t.mono }])
);

/**
 * Look up the icon/monogram for an arbitrary technology name (e.g. from a
 * project's free-text techStack array). Falls back to a monogram built from
 * the name's initials so any tech — known or not — renders consistently.
 */
export function getTechIcon(name: string): TechIconEntry {
  const known = techIconByKey[name.trim().toLowerCase()];
  if (known) return known;

  const mono =
    name
      .replace(/[^a-zA-Z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 4)
      .toUpperCase() || "?";

  return { mono };
}
