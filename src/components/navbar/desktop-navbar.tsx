import type { RefObject } from "react";
import type { NavbarStyles } from "@/lib/hooks/use-navbar-styles";
import type { NavbarLinks } from "@/lib/constants/navbar";

import { cn } from "@/lib/utils";
import { NAV_UNDERLINE_MOTION } from "./navbar";
import { useTranslations } from "next-intl";

import { AnimatePresence } from "motion/react";
import { m } from "@/components/motion-wrapper";

type UnderlineAnimationProps = {
  x: number;
  scaleX: number;
  opacity: number;
};

interface DesktopNavbarProps {
  linkRefs: RefObject<Record<string, HTMLElement | null>>;
  underlineRef: RefObject<HTMLSpanElement | null>;
  navbarLinksRef: RefObject<HTMLUListElement | null>;
  underlineMotionProps: UnderlineAnimationProps;
  currentStyles: NavbarStyles;
  activeSection: string;
  hoveredLink: string | null;
  links: NavbarLinks;
  setHoveredLink: (linkId: string | null) => void;
  handleSectionTravel: (linkId: string) => void;
}

export const DesktopNavbar = ({
  links,
  linkRefs,
  underlineRef,
  navbarLinksRef,
  underlineMotionProps,
  currentStyles,
  activeSection,
  hoveredLink,
  setHoveredLink,
  handleSectionTravel,
}: DesktopNavbarProps) => {
  const t = useTranslations("Navbar");

  return (
    <ul
      className="relative flex flex-1 items-center justify-center gap-x-5 max-md:hidden"
      ref={navbarLinksRef}
      role="desktop-navigation"
    >
      {links.map((link) => (
        <li
          key={link.id}
          ref={(el) => {
            if (el && linkRefs.current[link.id] !== el) {
              linkRefs.current[link.id] = el;
            }
          }}
          className={cn(
            "relative cursor-pointer px-2 py-1 text-[0.7rem] font-semibold tracking-[0.08em] uppercase",
            currentStyles.link,
          )}
          onClick={() => handleSectionTravel(link.id)}
          onMouseEnter={() => setHoveredLink(link.id)}
          onMouseLeave={() => setHoveredLink(null)}
          role="navigation-link"
        >
          {t(link.name)}
        </li>
      ))}

      {/* Animated underline */}
      <AnimatePresence mode="sync">
        {(activeSection && activeSection !== "hero-section") || hoveredLink ? (
          <m.span
            ref={underlineRef}
            initial={{
              x: underlineMotionProps.x,
              scaleX: underlineMotionProps.scaleX,
              opacity: underlineMotionProps.opacity,
            }}
            animate={{
              x: underlineMotionProps.x,
              scaleX: underlineMotionProps.scaleX,
              opacity: underlineMotionProps.opacity,
            }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={NAV_UNDERLINE_MOTION}
            className={cn(
              "absolute -bottom-1 left-0 h-px w-[1px] rounded-full",
              currentStyles.underline,
            )}
            style={{ originX: 0 }}
            aria-hidden="true"
          />
        ) : null}
      </AnimatePresence>
    </ul>
  );
};
