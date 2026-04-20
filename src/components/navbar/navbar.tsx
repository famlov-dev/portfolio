"use client";

import type { CustomMotion } from "@/lib/types";

import useNavbarState from "@/lib/hooks/use-navbar-state";
import useOnClickOutside from "@/lib/hooks/use-on-click-outside";
import useNavbarStyles, { type NavbarStyles } from "@/lib/hooks/use-navbar-styles";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/constants/navbar";
import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import LanguageSwitcher from "@/components/language-switcher";
import ThemeToggle from "@/components/theme-toggle";
import { MobileNavbar } from "./mobile-navbar";
import { DesktopNavbar } from "./desktop-navbar";
import { useOnScroll } from "@/lib/hooks/use-on-scroll";

export const MOBILE_NAV_MOTION: CustomMotion<"div"> = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 5 },
  exit: { opacity: 0, y: 0 },
  transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.3 },
} as const;

export const NAV_BUTTON_ANIMATION: CustomMotion<"button"> = {
  whileHover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
  whileTap: { scale: 0.98 },
} as const;

export const NAV_UNDERLINE_MOTION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
  mass: 0.5,
} as const;

export default function Navbar() {
  const {
    isScrolled,
    isOverlapping,
    activeSection,
    hoveredLink,
    navbarRef,
    underlineRef,
    navbarLinksRef,
    linkRefs,
    underlineMotionProps,
    setHoveredLink,
    setActiveSection,
    startSmoothScroll,
    endSmoothScroll,
  } = useNavbarState();

  const [showNavbar, setShowNavbar] = useState(true);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const handleNavbarVisibility = useCallback((isScrollingUp: boolean) => {
    setShowNavbar(isScrollingUp);
  }, []);
  useOnScroll(handleNavbarVisibility);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isScrolled) {
      setShowNavbar(true);
    }
  }, [isScrolled]);

  const isLightTheme = isMounted && resolvedTheme === "light";

  const currentStyles: NavbarStyles = useNavbarStyles(
    hoveredLink!,
    activeSection,
    isOverlapping,
    isLightTheme,
  );

  useOnClickOutside(dropdownRef, [setIsMobileOpen], isMobileOpen);

  const handleSectionTravel = useCallback(
    (linkId: string) => {
      const section = document.querySelector(`#${linkId}`);
      if (!section) return console.warn(`Section with ID "${linkId}" not found`);

      setActiveSection(linkId);
      startSmoothScroll();
      section.scrollIntoView({ behavior: "smooth" });

      const onScrollEnd = () => {
        endSmoothScroll();
        window.removeEventListener("scrollend", onScrollEnd);
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", onScrollEnd, { once: true });
      } else {
        setTimeout(onScrollEnd, 1100);
      }

      setIsMobileOpen(false);
    },
    [setActiveSection, startSmoothScroll, endSmoothScroll],
  );

  return (
    <nav
      ref={navbarRef}
      id="navbar"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between py-3.5 pr-10 pl-16 transition-all duration-200",
        "border-b max-lg:pr-4 max-lg:pl-6",
        isScrolled
          ? "border-black/15 bg-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-off-w/20 dark:bg-black/35 dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          : "border-none max-lg:bg-none",
        isLightTheme ? "border-black/20" : "border-off-w/20",
        showNavbar ? "translate-y-0" : "-translate-y-24",
      )}
    >
      {/* Logo */}
      <div className="flex flex-1 max-md:flex-none">
        <button
          onClick={() => handleSectionTravel("hero-section")}
          aria-label="Go to home section"
          className={cn(
            "relative inline-flex h-6 cursor-pointer items-center gap-2 whitespace-nowrap text-sm font-extrabold leading-none tracking-[0.08em] uppercase transition-colors duration-150",
            currentStyles.link,
          )}
        >
          <span className="font-jp inline-flex items-center self-center text-base leading-none">匠</span>
          <span aria-hidden="true" className="inline-flex items-center self-center leading-none text-current/60">
            |
          </span>
          <span className="inline-flex items-center self-center leading-none">Nakamura</span>
        </button>
      </div>

      {/* Desktop Nav */}
      <DesktopNavbar
        links={NAV_LINKS}
        navbarLinksRef={navbarLinksRef}
        linkRefs={linkRefs}
        underlineRef={underlineRef}
        underlineMotionProps={underlineMotionProps}
        currentStyles={currentStyles}
        activeSection={activeSection}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        handleSectionTravel={handleSectionTravel}
      />

      {/* Right Side Controls */}
      <div className="flex flex-1 items-center justify-start gap-x-4.5 max-md:flex-none md:justify-end">
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <ThemeToggle className={currentStyles.icon} />
          </TooltipTrigger>
          <TooltipContent className="text-off-w text-xs font-medium tracking-tight">
            Theme
          </TooltipContent>
        </Tooltip>

        <LanguageSwitcher currentStyles={currentStyles} />

        <div className="flex items-center gap-4 md:gap-6">
          <MobileNavbar
            isOpen={isMobileOpen}
            toggle={() => setIsMobileOpen((prev) => !prev)}
            links={NAV_LINKS}
            handleSectionTravel={handleSectionTravel}
            currentStyles={currentStyles}
            dropdownRef={dropdownRef}
          />
        </div>
      </div>
    </nav>
  );
}
