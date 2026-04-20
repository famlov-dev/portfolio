"use client";

import { isExperienceOpenAtom } from "@/lib/store/experience";
import { useAtomValue } from "jotai";
import { cn } from "@/lib/utils";

import Image from "next/image";

const URL_FLOWERS = "/images/higan-flowers.avif";
const flowerBaseClasses = cn("absolute transition-all duration-500 saturate-75 dark:saturate-100");

const leftFlower1Classes = cn(
  flowerBaseClasses,
  "bottom-0 left-28 aspect-square h-[1000px] w-[700px] opacity-28 pointer-events-none dark:opacity-50",
  "group-hover:opacity-15",
);

const leftFlower2Classes = cn(
  flowerBaseClasses,
  "-bottom-12 -left-40 h-[700px] w-[400px] -rotate-45 opacity-18 pointer-events-none dark:opacity-30",
);

const leftFlower3Classes = cn(
  flowerBaseClasses,
  "-bottom-20 left-[24rem] h-[600px] w-[500px] opacity-18 pointer-events-none dark:opacity-30",
);

const rightFlower1Classes = cn(
  flowerBaseClasses,
  "right-28 bottom-0 h-[1100px] w-[700px] scale-x-[-1] opacity-28 pointer-events-none dark:opacity-50",
  "max-xl:hidden",
);

const rightFlower2Classes = cn(
  flowerBaseClasses,
  "-right-40 -bottom-12 h-[700px] w-[400px] rotate-45 opacity-18 pointer-events-none dark:opacity-30",
  "max-xl:hidden",
);

const rightFlower3Classes = cn(
  flowerBaseClasses,
  "right-[24rem] -bottom-20 h-[600px] w-[500px] scale-x-[-1] opacity-20 pointer-events-none dark:opacity-35",
  "max-2xl:hidden",
);

export const ExperienceBackground = () => {
  const isOpen = useAtomValue(isExperienceOpenAtom);

  return (
    <div>
      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(leftFlower1Classes, isOpen && "opacity-12 dark:opacity-15")}
        quality={50}
        height={1000}
        width={700}
        loading="lazy"
        decoding="async"
      />
      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(leftFlower2Classes, isOpen && "opacity-14 dark:opacity-30")}
        quality={50}
        height={700}
        width={400}
        loading="lazy"
        decoding="async"
      />
      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(leftFlower3Classes, isOpen && "opacity-16 dark:opacity-35")}
        quality={50}
        height={600}
        width={500}
        loading="lazy"
        decoding="async"
      />

      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(rightFlower1Classes, isOpen && "opacity-14 dark:opacity-20")}
        quality={50}
        height={1100}
        width={700}
        loading="lazy"
        decoding="async"
      />
      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(rightFlower2Classes, isOpen && "opacity-18 dark:opacity-40")}
        quality={50}
        height={700}
        width={400}
        loading="lazy"
        decoding="async"
      />
      <Image
        src={URL_FLOWERS}
        alt="Decorative floral background"
        className={cn(rightFlower3Classes, isOpen && "opacity-18 dark:opacity-40")}
        quality={50}
        height={600}
        width={500}
        loading="lazy"
        decoding="async"
      />

      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-white/70 via-white/58 to-[#f4ede4]/70 dark:from-black/45 dark:via-black/30 dark:to-black/15" />
    </div>
  );
};
