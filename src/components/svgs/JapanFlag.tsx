import type { SVGProps } from "react";

export function JapanFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label="Japan flag" {...props}>
      <rect x="1.5" y="3.5" width="21" height="17" rx="1.5" fill="#FFFFFF" />
      <rect
        x="1.5"
        y="3.5"
        width="21"
        height="17"
        rx="1.5"
        stroke="#D1D5DB"
        strokeWidth="1"
      />
      <circle cx="12" cy="12" r="4.2" fill="#BC002D" />
    </svg>
  );
}
