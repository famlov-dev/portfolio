import { cn } from "@/lib/utils";
import { MyInfo } from "@/components/sections/about/my-info";
import { BackgroundInkPaint } from "@/components/sections/about/background-ink-paint";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className={cn(
        "bg-off-w relative flex min-h-dvh scroll-mt-[var(--navbar-height)] flex-col items-center justify-center gap-y-8 overflow-clip px-6 pt-16 pb-18",
        "dark:bg-[#16110d]",
        "md:scroll-mt-0 xl:gap-y-16 xl:p-0",
      )}
    >
      <MyInfo />
      <BackgroundInkPaint />
    </section>
  );
}
