import { IconType } from "@icons-pack/react-simple-icons";
import { HTMLMotionProps } from "motion/react";
import { JSX, SVGProps } from "react";

export type Socials<T extends string> = {
  [K in T]: {
    href: string;
    icon: IconType | ((props: SVGProps<SVGSVGElement>) => JSX.Element);
    text: string;
  };
};

export type ExperienceType = {
  title: string;
  company?: string;
  role?: string;
  period?: string;
  location?: string;
  description: { en: string; ja: string };
  body: { en: string[]; ja: string[] };
  repoLink: string;
  repoImage: string;
  languages: {
    src: IconType;
    alt: string;
  }[];
  status: string;
};

export type CustomMotion<T extends "div" | "span" | "p" | "button"> = Omit<
  HTMLMotionProps<T>,
  "ref" | "className"
>;
