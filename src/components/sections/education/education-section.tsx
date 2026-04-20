import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function EducationSection() {
  const t = useTranslations("Education");

  return (
    <section
      id="education-section"
      className={cn(
        "relative flex min-h-[70dvh] flex-col items-center justify-center gap-8 bg-gradient-to-b from-[#f0e9df] via-[#efe8df] to-[#efe8df] px-6 py-22 dark:from-[#161210] dark:via-[#17130f] dark:to-[#18130f]",
        "sm:px-10 lg:px-14",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-black/16 dark:bg-off-w/18" />
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#eee6dc] via-[#eee6dc]/85 to-transparent dark:from-[#17120f] dark:via-[#17120f]/85" />
        <Image
          src="/images/torii.webp"
          alt="Decorative torii background"
          width={900}
          height={900}
          quality={60}
          className="absolute -left-32 bottom-0 w-[360px] opacity-6 saturate-75 dark:opacity-12 dark:saturate-100 md:w-[520px]"
        />
        <Image
          src="/images/ink-paint.webp"
          alt="Decorative ink background"
          width={800}
          height={800}
          quality={60}
          className="absolute top-8 right-0 w-[280px] opacity-7 mix-blend-multiply [mask-image:linear-gradient(to_left,transparent,black_22%,black)] dark:opacity-7 dark:mix-blend-multiply dark:brightness-88 md:-right-10 md:w-[460px]"
        />
        <div className="absolute inset-x-0 top-0 h-18 bg-gradient-to-b from-[#f0e9df] to-transparent dark:from-[#161210]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#efe8df] via-[#efe8df]/92 to-transparent dark:from-[#18130f] dark:via-[#18130f]/92" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/16 dark:bg-off-w/18" />
      </div>

      <div className="relative z-10 w-full max-w-[1150px]">
        <h2 className="text-darkest text-center text-4xl font-extrabold tracking-tight dark:text-off-w md:text-6xl">
          {t("title")}
        </h2>
        <p className="text-darkest/70 mx-auto mt-5 max-w-[800px] text-center text-base dark:text-off-w/70 md:text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div className="relative z-10 mt-1 grid w-full max-w-[1000px] grid-cols-1 gap-6 md:grid-cols-2">
        <article className="border-black/10 bg-white/80 rounded-2xl border p-6 shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-off-w/15 dark:bg-[#0f121a]">
          <p className="text-acc-yellow-2 text-xs font-semibold tracking-wide uppercase">
            {t("degree.master")}
          </p>
          <h3 className="text-darkest mt-2 text-xl font-extrabold tracking-tight dark:text-off-w">
            {t("school")}
          </h3>
          <p className="text-darkest/80 mt-1 dark:text-off-w/80">{t("program.master")}</p>
          <p className="text-darkest/60 mt-2 text-sm dark:text-off-w/60">{t("period.master")}</p>
        </article>

        <article className="border-black/10 bg-white/80 rounded-2xl border p-6 shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-off-w/15 dark:bg-[#0f121a]">
          <p className="text-acc-yellow-2 text-xs font-semibold tracking-wide uppercase">
            {t("degree.bachelor")}
          </p>
          <h3 className="text-darkest mt-2 text-xl font-extrabold tracking-tight dark:text-off-w">
            {t("school")}
          </h3>
          <p className="text-darkest/80 mt-1 dark:text-off-w/80">{t("program.bachelor")}</p>
          <p className="text-darkest/60 mt-2 text-sm dark:text-off-w/60">{t("period.bachelor")}</p>
        </article>
      </div>

      <div className="relative z-10 mt-1 w-full max-w-[1000px]">
        <article className="border-black/10 bg-white/80 rounded-2xl border p-6 shadow-[0_12px_30px_rgba(0,0,0,0.09)] dark:border-off-w/15 dark:bg-[#0f121a]">
          <h3 className="text-darkest text-2xl font-bold tracking-tight dark:text-off-w">{t("focus.title")}</h3>
          <p className="text-darkest/75 mt-3 leading-7 dark:text-off-w/75">{t("focus.description")}</p>
        </article>
      </div>
    </section>
  );
}
