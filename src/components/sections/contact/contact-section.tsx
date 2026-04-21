"use client";

import type { CustomMotion } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

import { TextAnimate } from "@/components/ui/text-animate";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { m } from "@/components/motion-wrapper";

const BACKGROUND_MOTION: CustomMotion<"div"> = {
  transition: { duration: 2.5, delay: 1, ease: "easeInOut" },
  viewport: { once: true, amount: 0.65 },
};

const toriiBaseClasses = cn("pointer-events-none absolute bottom-0");

export default function ContactSection() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isJapaneseLocale = locale === "ja";

  return (
    <section
      id="contact-section"
      className={cn(
        "relative flex min-h-[calc(100dvh-var(--navbar-height))] items-center overflow-clip bg-gradient-to-t from-[#fff8ef] to-[#f4ecdf] dark:from-transparent dark:to-black",
        "max-lg:scroll-mt-[var(--navbar-height)]",
      )}
    >
      {/* Samurai Background */}
      {/* <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        {...BACKGROUND_MOTION}
        className="absolute bottom-0 hidden lg:block"
      >
        <Image
          src="/images/samurai.avif"
          alt="Samurai Background"
          className="mx-auto opacity-15"
          width={1000}
          height={1000}
          quality={75}
          loading="lazy"
          decoding="async"
        />
      </m.div> */}

      {/* Torii Backgrounds */}
      <m.div
        initial={{ opacity: 0.3 }}
        whileInView={{ opacity: 0.1 }}
        {...BACKGROUND_MOTION}
        className="absolute inset-0 hidden 2xl:block"
      >
        <Image
          src="/images/torii.webp"
          alt="Torii Background"
          className={cn(toriiBaseClasses, "max-w-none -right-[300px]")}
          width={900}
          height={900}
          quality={75}
          style={{ width: "auto", height: "auto" }}
          loading="eager"
          decoding="async"
        />

        <Image
          src="/images/torii.webp"
          alt="Torii Background (Mirrored)"
          className={cn(toriiBaseClasses, "max-w-none -left-[300px] -scale-x-[1]")}
          width={900}
          height={900}
          quality={75}
          style={{ width: "auto", height: "auto" }}
          loading="eager"
          decoding="async"
        />
      </m.div>

      <div
        className={cn(
          "relative z-10 mx-auto grid w-full max-w-[1300px] grid-cols-1 items-start gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[minmax(0,1fr)_425px] lg:gap-12 lg:px-12 lg:py-24",
        )}
      >
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "p-1 sm:p-0",
            isJapaneseLocale ? "max-w-[48ch]" : "max-w-[58ch]",
          )}
        >
          {isJapaneseLocale ? (
            <h1
              className={cn(
                "text-darkest font-extrabold tracking-tight dark:text-off-w",
                "text-4xl text-left sm:text-6xl",
                "lg:text-[3.35rem] xl:text-[4rem] leading-[1.16] xl:leading-[1.14]",
              )}
            >
              {t("journey")
                .split("\n")
                .map((line, index) => (
                  <span key={`journey-line-${index}`} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
            </h1>
          ) : (
            <TextAnimate
              as="h1"
              className={cn(
                "text-darkest font-extrabold tracking-tight dark:text-off-w",
                "text-4xl text-left sm:text-6xl text-balance lg:text-[clamp(3rem,4.5vw,5.2rem)]",
              )}
              animation="slideRight"
              once
            >
              {t("journey")}
            </TextAnimate>
          )}

          <TextAnimate
            as="h2"
            by="line"
            className={cn(
              "text-acc-yellow-2 mt-4 text-left text-balance",
              "text-2xl sm:text-4xl lg:text-[clamp(2rem,3vw,3.1rem)]",
            )}
            delay={0.2}
            animation="slideRight"
            once
          >
            {t("yet")}
          </TextAnimate>
        </m.div>

        <div className="flex w-full flex-col items-center justify-center lg:w-[425px] lg:flex-shrink-0">
          <ContactForm />

          <m.div
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.75,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            viewport={{ once: true, amount: 0.65 }}
            className="relative flex w-full items-center justify-center"
          >
            <div className="h-px w-full translate-y-0.5 bg-black/20 dark:bg-acc-yellow-2" />

            <p className="text-darkest/80 dark:text-acc-yellow-3 flex-auto shrink-0 bg-transparent px-6 py-4 text-center text-sm font-bold text-pretty sm:text-base">
              {t("follow-me")}
            </p>

            <div className="h-px w-full translate-y-0.5 bg-black/20 dark:bg-acc-yellow-2" />
          </m.div>

          {/* Social Links */}
          <m.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 1,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            viewport={{ once: true, amount: 0.65 }}
            className="relative z-20 flex w-full gap-4 p-3"
          >
            {Object.entries(SOCIAL_LINKS).map(([key, social]) => (
              <Link
                key={key}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "border-off-w/50 hover:border-acc-yellow-3 bg-off-w hover:bg-acc-yellow-2 group flex flex-1 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded border transition-all duration-200",
                )}
              >
                <m.span className="flex w-full items-center justify-center gap-x-2 p-2">
                  <social.icon
                    className={cn(
                      "size-5 shrink-0 text-black transition-all duration-200 sm:size-5",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-extrabold text-black transition-all duration-200",
                    )}
                  >
                    {social.text}
                  </span>
                </m.span>
              </Link>
            ))}

          </m.div>
        </div>
      </div>
    </section>
  );
}
