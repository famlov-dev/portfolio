import { cn } from "@/lib/utils";

import Image from "next/image";

const inkPaintBaseClasses = cn(
  "pointer-events-none absolute mix-blend-multiply grayscale saturate-75 dark:mix-blend-normal dark:saturate-100",
);

export const BackgroundInkPaint = () => {
  return (
    <>
      <Image
        src="/images/ink-paint.webp"
        alt="Ink Paint"
        width={800}
        height={800}
        className={cn(
          inkPaintBaseClasses,
          "w-[800px] opacity-12 dark:opacity-8",
          "-bottom-32 -left-[26rem]",
          "max-2xl:w-[800px] max-sm:-left-[0rem]",
        )}
      />

      <Image
        src="/images/ink-paint-2.webp"
        alt="Ink Paint 2"
        width={1100}
        height={1100}
        className={cn(
          inkPaintBaseClasses,
          "w-[1100px] opacity-35 dark:opacity-20",
          "-right-[32rem] bottom-0",
          "hidden max-2xl:-right-96 max-xl:-bottom-8 max-sm:[top:clamp(40px,15vh,160px)] max-sm:right-0 md:block",
        )}
      />
    </>
  );
};
