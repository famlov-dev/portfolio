import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { TECH_LANGUAGES } from "@/lib/constants/langs";
import Image from "next/image";

const SKILL_GROUPS = [
  { key: "llm", icon: TECH_LANGUAGES.python.src, tier: "expert" },
  { key: "ml", icon: TECH_LANGUAGES.python.src, tier: "advanced" },
  { key: "backend", icon: TECH_LANGUAGES.node.src, tier: "expert" },
  { key: "frontend", icon: TECH_LANGUAGES.react.src, tier: "advanced" },
  { key: "infra", icon: TECH_LANGUAGES.git.src, tier: "advanced" },
  { key: "database", icon: TECH_LANGUAGES.postgresql.src, tier: "advanced" },
  { key: "vector", icon: TECH_LANGUAGES.tanstack.src, tier: "advanced" },
  { key: "workflow", icon: TECH_LANGUAGES.git.src, tier: "expert" },
] as const;

const IMPACT_KEYS = ["impact-1", "impact-2", "impact-3", "impact-4"] as const;
const LEVELS = ["working", "advanced", "expert"] as const;

const TIER_SCORE = {
  working: 1,
  advanced: 2,
  expert: 3,
} as const;

export default function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section
      id="skills-section"
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center gap-10 bg-gradient-to-b from-[#f4efe7] via-[#f2ece3] to-[#f0e9df] px-6 py-22 dark:from-[#12100f] dark:via-[#141210] dark:to-[#161210]",
        "sm:px-10 lg:px-14",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/dragon.avif"
          alt="Decorative dragon background"
          width={900}
          height={900}
          quality={60}
          className="absolute -top-24 -left-28 w-[380px] opacity-7 saturate-75 dark:opacity-18 dark:brightness-115 dark:contrast-105 dark:saturate-115 md:w-[520px]"
        />
        <Image
          src="/images/fish.webp"
          alt="Decorative fish background"
          width={1100}
          height={700}
          quality={60}
          className="absolute right-0 bottom-8 w-[420px] opacity-4 saturate-75 dark:opacity-13 dark:brightness-112 dark:contrast-105 dark:saturate-110 md:w-[620px]"
        />
        <div className="absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[#f4efe7] to-transparent dark:from-[#12100f]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f0e9df] via-[#f0e9df]/92 to-transparent dark:from-[#161210] dark:via-[#161210]/92" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/16 dark:bg-off-w/18" />
      </div>

      <div className="relative z-10 w-full max-w-[1150px]">
        <h2 className="text-darkest text-center text-4xl font-extrabold tracking-tight dark:text-off-w md:text-6xl">
          {t("title")}
        </h2>
        <p className="text-darkest/70 mx-auto mt-5 max-w-[800px] text-center text-base dark:text-off-w/70 md:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {IMPACT_KEYS.map((key) => (
            <span
              key={key}
              className="border-black/15 text-darkest/85 bg-black/5 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide dark:border-off-w/20 dark:text-off-w/90 dark:bg-off-w/5"
            >
              {t(key)}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-1 grid w-full max-w-[1150px] grid-cols-1 gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <article className="border-black/10 bg-white/70 rounded-2xl border p-4 shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-off-w/15 dark:bg-[#111318] md:p-5 lg:col-span-2 xl:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-darkest text-base font-bold tracking-tight dark:text-off-w md:text-lg">{t("matrix.title")}</h3>
            <div className="text-darkest/70 flex items-center gap-3 text-xs dark:text-off-w/70">
              {LEVELS.map((level) => (
                <span key={level} className="inline-flex items-center gap-1">
                  <span className="bg-acc-yellow-2 inline-block size-2 rounded-full" />
                  {t(`tiers.${level}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 md:space-y-3">
            {SKILL_GROUPS.map((skill) => (
              <div
                key={`${skill.key}-matrix`}
                className="border-black/10 grid grid-cols-[1fr_auto] items-center gap-3 border-b pb-3 dark:border-off-w/10 last:border-b-0"
              >
                <p className="text-darkest/90 text-[0.82rem] font-medium dark:text-off-w/90 md:text-sm">
                  {t(`items.${skill.key}.title`)}
                </p>
                <div className="flex items-center gap-2">
                  {LEVELS.map((level) => {
                    const isActive = TIER_SCORE[level] <= TIER_SCORE[skill.tier];
                    return (
                      <span
                        key={`${skill.key}-${level}`}
                        className={cn(
                          "inline-block size-2.5 rounded-full border",
                          isActive
                            ? "border-acc-yellow-2 bg-acc-yellow-2"
                            : "border-black/25 bg-transparent dark:border-off-w/25",
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </article>

        {SKILL_GROUPS.map((skill) => {
          const Icon = skill.icon;
          return (
            <article
              key={skill.key}
              className="border-black/10 bg-white/70 rounded-2xl border p-4 shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-off-w/15 dark:bg-[#111318] md:p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
                <div className="flex items-center gap-3">
                  <Icon className="text-darkest size-6 dark:text-off-w/95 md:size-7" />
                  <h3 className="text-darkest text-base font-bold tracking-tight dark:text-off-w md:text-lg">
                    {t(`items.${skill.key}.title`)}
                  </h3>
                </div>
                <span className="text-acc-yellow-2 text-xs font-semibold md:text-sm">
                  {t(`tiers.${skill.tier}`)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 md:gap-2">
                {(t.raw(`items.${skill.key}.stack`) as string[]).map((item) => (
                  <span
                    key={item}
                    className="border-black/15 text-darkest/90 bg-black/5 rounded-full border px-2 py-1 text-[0.68rem] font-medium dark:border-off-w/20 dark:text-off-w/90 dark:bg-off-w/5"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-darkest/75 mt-3 min-h-14 text-[0.82rem] leading-6 dark:text-off-w/75 md:text-sm">
                {t(`items.${skill.key}.description`)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
