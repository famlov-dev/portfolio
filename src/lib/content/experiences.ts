import type { ExperienceType } from "@/lib/types";

import experiences from "@/lib/content/experiences.json";
import { TECH_LANGUAGES, TechCode } from "@/lib/constants/langs";

const STATUS_ORDER: Record<string, number> = {
  Current: 0,
  Complete: 1,
  "On-hold": 2,
  Abandoned: 3,
};

export const EXPERIENCES: ExperienceType[] = experiences
  .map((experience) => ({
    ...experience,
    languages: experience.languages.map(
      (lang) => TECH_LANGUAGES[lang as TechCode],
    ),
  }))
  .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
