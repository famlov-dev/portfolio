"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import projectsShowcase from "@/lib/content/projects-showcase.json";

import Image from "next/image";
import { TextAnimate } from "@/components/ui/text-animate";
import { m } from "@/components/motion-wrapper";

type Locale = "en" | "ja";
type ProjectCategory = "all" | "ai" | "web" | "automation";
type ProjectEntry = (typeof projectsShowcase)[number] & {
  caseStudy?: {
    problem: Record<Locale, string>;
    solution: Record<Locale, string>;
    impact: Record<Locale, string>;
  };
};
const DEFAULT_VISIBLE_COUNT = 3;

export default function ProjectsSection() {
  const t = useTranslations("Projects");
  const locale = useLocale() as Locale;
  const labels =
    locale === "ja"
      ? { problem: "課題", solution: "解決策", impact: "成果" }
      : { problem: "Problem", solution: "Solution", impact: "Impact" };
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);

  const filteredProjects = useMemo<ProjectEntry[]>(() => {
    if (activeCategory === "all") return projectsShowcase;
    return projectsShowcase.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const canShowMore = visibleCount < filteredProjects.length;

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);
    setVisibleCount(DEFAULT_VISIBLE_COUNT);
  };

  return (
    <section
      id="projects-section"
      className={cn(
        "relative flex flex-col items-center justify-center overflow-clip bg-gradient-to-b from-[#efe8df] via-[#ede5db] to-[#ece3d9] px-6 py-22 dark:from-[#18130f] dark:via-[#17120f] dark:to-[#14100d]",
        "max-lg:scroll-mt-[var(--navbar-height)]",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-black/16 dark:bg-off-w/18" />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#ece4da] via-[#ece4da]/85 to-transparent dark:from-[#17120f] dark:via-[#17120f]/85" />
        <Image
          src="/images/higan-flowers.avif"
          alt="Decorative higan flowers"
          width={1400}
          height={900}
          quality={55}
          className="absolute -bottom-24 -left-20 w-[720px] opacity-6 saturate-75 dark:opacity-12 dark:saturate-100"
        />
        <Image
          src="/images/pagoda.avif"
          alt="Decorative pagoda"
          width={1200}
          height={800}
          quality={55}
          className="absolute -top-20 right-0 w-[500px] opacity-7 saturate-75 dark:opacity-12 dark:saturate-100"
        />
        <div className="absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[#efe8df] to-transparent dark:from-[#18130f]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#ece3d9] via-[#ece3d9]/92 to-transparent dark:from-[#14100d] dark:via-[#14100d]/92" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/16 dark:bg-off-w/18" />
      </div>

      <div className="relative z-10 w-full max-w-[1250px]">
        <div className="mb-10">
          <TextAnimate className="text-acc-red-dark text-5xl font-extrabold tracking-tight md:text-7xl" once>
            {t("title")}
          </TextAnimate>
          <TextAnimate
            className="text-darkest/78 pt-4 text-lg font-light text-balance dark:text-acc-yellow-3"
            once
            by="line"
            as="h2"
          >
            {t("description")}
          </TextAnimate>
        </div>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {(["all", "ai", "web", "automation"] as const).map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-200",
                  isActive
                    ? "border-acc-red bg-acc-red text-off-w shadow-[0_6px_14px_rgba(160,44,44,0.32)]"
                    : "border-black/15 text-darkest/80 bg-white/72 hover:border-black/30 hover:bg-white dark:border-off-w/20 dark:text-off-w/85 dark:bg-off-w/8 dark:hover:border-off-w/35 dark:hover:bg-off-w/12",
                )}
              >
                {t(`filters.${category}`)}
              </button>
            );
          })}
        </div>

        <ul className="space-y-8">
          {visibleProjects.map((project, index) => (
            <m.li
              key={`${project.title.en}-${index}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.32, delay: index * 0.06 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-black/10 bg-white/78 shadow-[0_12px_30px_rgba(0,0,0,0.09)] backdrop-blur-[2px] dark:border-off-w/15 dark:bg-black/50",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,0,0.16)]",
              )}
            >
              <div
                className={cn(
                  "grid grid-cols-1 gap-0",
                  "lg:grid-cols-[minmax(0,1fr)_minmax(340px,44%)]",
                )}
              >
                <article
                  className={cn(
                    "relative z-10 p-5 lg:p-7",
                    "lg:pr-9",
                  )}
                >
                  <p className="text-acc-red/80 text-xs font-semibold tracking-[0.09em] uppercase">
                    {index === 0 ? t("labels.featured") : t("labels.project")}
                  </p>

                  <h3 className="text-darkest dark:text-off-w mt-2 text-2xl font-bold tracking-tight lg:text-[2rem] lg:leading-[1.18]">
                    {project.title[locale]}
                  </h3>

                  {project.caseStudy ? (
                    <div className="border-black/10 bg-black/3 dark:border-off-w/12 dark:bg-off-w/6 mt-4 space-y-2 rounded-lg border p-4">
                      <p className="text-darkest/86 dark:text-off-w/85 text-sm leading-7">
                        <span className="text-acc-red font-semibold uppercase">{labels.problem}:</span>{" "}
                        {project.caseStudy.problem[locale]}
                      </p>
                      <p className="text-darkest/86 dark:text-off-w/85 text-sm leading-7">
                        <span className="text-acc-red font-semibold uppercase">{labels.solution}:</span>{" "}
                        {project.caseStudy.solution[locale]}
                      </p>
                      <p className="text-darkest/86 dark:text-off-w/85 text-sm leading-7">
                        <span className="text-acc-red font-semibold uppercase">{labels.impact}:</span>{" "}
                        {project.caseStudy.impact[locale]}
                      </p>
                    </div>
                  ) : (
                    <div className="border-black/10 bg-black/3 dark:border-off-w/12 dark:bg-off-w/6 mt-4 rounded-lg border p-4">
                      <p className="text-darkest/82 dark:text-off-w/80 text-sm leading-7">
                        {project.description[locale]}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={`${project.title.en}-${tech}`}
                        className="border-black/12 text-darkest/85 bg-black/4 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide uppercase dark:border-off-w/25 dark:bg-off-w/8 dark:text-off-w/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                <div className="relative min-h-[240px] lg:min-h-[100%]">
                  <Image
                    src={project.image}
                    alt={project.title[locale]}
                    fill
                    sizes="(max-width: 1023px) 100vw, 44vw"
                    className="object-cover"
                    quality={60}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent lg:bg-gradient-to-l" />
                </div>
              </div>
            </m.li>
          ))}
        </ul>

        {filteredProjects.length > DEFAULT_VISIBLE_COUNT ? (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() =>
                canShowMore
                  ? setVisibleCount((prev) => prev + DEFAULT_VISIBLE_COUNT)
                  : setVisibleCount(DEFAULT_VISIBLE_COUNT)
              }
              className="border-black/15 text-darkest/85 hover:border-black/35 hover:text-darkest dark:border-off-w/40 dark:bg-[#f3e5d7] dark:text-[#2a1f17] dark:hover:border-off-w/60 dark:hover:bg-[#fff1de] dark:hover:text-[#1d140f] rounded-full border bg-white/80 px-5 py-2 text-sm font-semibold tracking-wide uppercase shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              {canShowMore ? t("actions.loadMore") : t("actions.showLess")}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
