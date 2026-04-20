import {
  LINK_DARK,
  LINK_LIGHT,
  ICON_DARK,
  ICON_LIGHT,
  MOBILE_NAVBAR_DARK,
  MOBILE_NAVBAR_LIGHT,
} from "@/lib/constants/navbar";

export type NavbarStyles = ReturnType<typeof useNavbarStyles>;

export default function useNavbarStyles(
  hoveredLink: string,
  activeSection: string,
  _isOverlapping: boolean,
  isLightTheme: boolean,
) {
  const isHovered = hoveredLink === activeSection;

  // Keep navbar contrast stable by active theme rather than section overlap.
  const link = isLightTheme ? LINK_DARK : LINK_LIGHT;
  const icon = isLightTheme ? ICON_DARK : ICON_LIGHT;
  const mobileNavbar = isLightTheme ? MOBILE_NAVBAR_LIGHT : MOBILE_NAVBAR_DARK;
  const mobileLink = isLightTheme ? LINK_DARK : LINK_LIGHT;

  const underline = isLightTheme
    ? isHovered
      ? "bg-black/50"
      : "bg-black"
    : isHovered
      ? "bg-off-w/60"
      : "bg-off-w";

  return { link, icon, mobileNavbar, mobileLink, underline };
}
