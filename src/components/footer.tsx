import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/constants/socials";

import { LoveIcon } from "@/components/svgs/LoveIcon";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const dragonImageClasses = cn(
  "absolute -top-12 opacity-40 grayscale dark:opacity-22 dark:brightness-75",
  "w-[360px] h-[160px]",
);

const socialLinkClasses = cn("transition-colors duration-150 hover:text-off-w");

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer
      className={cn(
        "border-black/10 relative flex min-h-20 w-full items-center overflow-hidden border-t bg-gradient-to-t from-[#e9dfd3] to-[#f7f1e7] py-4 dark:border-off-w/18 dark:from-[#120f0d] dark:to-[#1a1511]",
        "px-6 sm:px-8 xl:px-16",
      )}
    >
      {/* Right Dragon */}
      <Image
        src="/images/dragon.avif"
        alt="Dragon"
        width={360}
        height={160}
        quality={75}
        className={cn(
          dragonImageClasses,
          "right-0 -rotate-12",
          "max-lg:-right-24 max-sm:-right-32 sm:translate-y-4",
        )}
      />

      {/* Left Dragon */}
      <Image
        src="/images/dragon.avif"
        alt="Dragon"
        width={360}
        height={160}
        quality={75}
        className={cn(
          dragonImageClasses,
          "left-0 translate-y-4 -scale-x-100 rotate-[10deg]",
          "max-lg:-left-24 max-sm:hidden",
        )}
      />

      {/* Built With Section */}
      <div className={cn("text-darkest/80 z-10 flex flex-1 items-center dark:text-off-w/85", "max-md:hidden")}>
        <p className="text-xs">{t("made-with")}</p>
        <LoveIcon className="text-darkest mx-1 size-5 dark:text-off-w" />
      </div>

      {/* Copyright Section */}
      <div
        className={cn(
          "z-10 flex flex-1 flex-col items-center gap-y-0.5",
          "max-md:items-start",
        )}
      >
        <p className="text-darkest text-xs font-bold tracking-tight dark:text-off-w">
          © {new Date().getFullYear()} • Nakamura Kazuya
        </p>
        <p className="text-darkest/50 max-xs:text-[0.5rem] text-[0.65rem] dark:text-off-w/50">
          {t("copyright")}
        </p>
      </div>

      {/* Social Links Section */}
      <div className="text-darkest/70 z-10 flex flex-1 items-center justify-end gap-x-2 text-xs dark:text-off-w/75 sm:gap-x-3">
        {Object.entries(SOCIAL_LINKS)
          .flatMap(([key, social], index) => [
            <Link
              key={key}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={socialLinkClasses}
            >
              <social.icon className="size-6" />
            </Link>,

            index < Object.entries(SOCIAL_LINKS).length - 1 && (
              <p key={`separator-${index}`}>●</p>
            ),
          ])
          .filter(Boolean)}
      </div>
    </footer>
  );
};
