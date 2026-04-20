import { atom } from "jotai";
import { ExperienceType } from "@/lib/types";

export const currentExperienceAtom = atom<ExperienceType | null>(null);
export const isExperienceOpenAtom = atom(false);
