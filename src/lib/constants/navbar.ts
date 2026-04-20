import { cn } from "@/lib/utils";

// Shared transition for all navbar interactive elements
const NAVBAR_TRANSITION = "transition-colors duration-150 ease-in-out";

// Links
export const LINK_DARK = cn(
  "text-black before:text-black border-black hover:border-black/50 hover:text-black/50 hover:before:text-black/50",
  NAVBAR_TRANSITION,
);

export const LINK_LIGHT = cn(
  "text-black before:text-black border-black/60 hover:border-black/45 hover:text-black/65 hover:before:text-black/65 dark:text-off-w dark:before:text-off-w dark:border-off-w dark:hover:border-off-w/60 dark:hover:text-off-w/60 dark:hover:before:text-off-w/60",
  NAVBAR_TRANSITION,
);

// Icons
export const ICON_DARK = cn("text-black hover:text-black/50", NAVBAR_TRANSITION);

export const ICON_LIGHT = cn(
  "text-black hover:text-black/55 dark:text-off-w dark:hover:text-off-w/60",
  NAVBAR_TRANSITION,
);

// Mobile Navbar backgrounds
export const MOBILE_NAVBAR_DARK = "bg-black";
export const MOBILE_NAVBAR_LIGHT = "bg-off-w";

// Navigation link definitions
export const NAV_LINKS = [
  { name: "about", id: "about-section" },
  { name: "experience", id: "experience-section" },
  { name: "skills", id: "skills-section" },
  { name: "education", id: "education-section" },
  { name: "projects", id: "projects-section" },
  { name: "contact", id: "contact-section" },
] as const;

export type NavbarLinks = typeof NAV_LINKS;
