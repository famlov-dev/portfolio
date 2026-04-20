"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";

const ProfileImage = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 place-items-center">
      <Image
        src="/images/dragon-2.avif"
        className={cn(
          "pointer-events-none top-0 z-10 col-span-full row-span-full opacity-100 dark:opacity-100 dark:brightness-0 dark:invert dark:sepia-0 dark:contrast-100",
          "max-xl:w-[425px] max-md:w-[350px]",
        )}
        width={550}
        height={550}
        quality={75}
        alt="Dragon"
      />

      <div
        className={cn(
          "z-10 col-span-full row-span-full aspect-square overflow-hidden rounded-full border-9 border-black dark:border-white",
          "max-xl:w-[300px] max-lg:w-[275px] max-md:w-[225px] xl:w-[368px]",
        )}
      >
        <Image
          src="/images/me.png"
          width={400}
          height={400}
          quality={75}
          className="size-full object-cover object-center"
          alt="Profile"
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-black/0" />
      </div>
    </div>
  );
};

const AboutText = () => {
  const t = useTranslations("About");

  return (
    <div
      className={cn(
        "relative z-10 w-full max-w-[650px] p-1 sm:p-0 xl:px-2",
      )}
    >
      {["description-1", "description-2", "description-3"].map((key) => {
        return (
          <TextAnimate
            key={key}
            className={cn(
              "font-crimson mb-4 text-pretty text-black dark:text-off-w/85 last:mb-0",
              "text-lg leading-7 sm:text-xl lg:text-2xl",
            )}
            by="text"
            animation="slideRight"
            delay={0.2}
            duration={0.6}
            once
          >
            {t(key)}
          </TextAnimate>
        );
      })}
    </div>
  );
};

export const MyInfo = () => {
  const t = useTranslations("About");

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1260px] flex-col items-center justify-center gap-4",
        "md:gap-12 xl:mt-12 xl:flex-row xl:items-center xl:gap-16 2xl:gap-20",
      )}
    >
      <ProfileImage />

      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          "xl:items-start xl:justify-start xl:pl-8",
        )}
      >
        <TextAnimate
          className={cn(
            "text-darkest text-center text-4xl font-extrabold tracking-tight dark:text-off-w",
          )}
          as="h2"
          by="line"
          animation="slideDown"
          delay={0}
          once
        >
          {t("title")}
        </TextAnimate>

        <AboutText />
      </div>
    </div>
  );
};
