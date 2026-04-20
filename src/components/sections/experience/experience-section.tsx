"use client";

import { currentExperienceAtom, isExperienceOpenAtom } from "@/lib/store/experience";
import { useAtomValue } from "jotai";
import { cn } from "@/lib/utils";

import { ExperienceBackground } from "@/components/sections/experience/experience-background";
import { ExperienceView } from "@/components/sections/experience/experience-view";
import { ExperienceList } from "@/components/sections/experience/experience-list";

export default function ExperienceSection() {
  const currentExperience = useAtomValue(currentExperienceAtom);
  const isExperienceOpen = useAtomValue(isExperienceOpenAtom);

  return (
    <section
      id="experience-section"
      className={cn(
        "relative flex flex-col items-center justify-center overflow-clip bg-[#f4ede4] dark:bg-red-950/65",
        "max-lg:scroll-mt-[var(--navbar-height)]",
      )}
    >
      <div
        className={cn(
          "z-10 flex min-h-dvh max-w-[1500px] items-center justify-center px-8 py-16",
          "sm:px-12 sm:py-24 xl:py-36",
        )}
      >
        {isExperienceOpen ? <ExperienceView {...currentExperience!} /> : <ExperienceList />}
      </div>

      <ExperienceBackground />
    </section>
  );
}
