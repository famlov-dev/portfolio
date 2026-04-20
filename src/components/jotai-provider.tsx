"use client";

import { Provider } from "jotai";
import { ThemeProvider } from "next-themes";

export default function JotaiProvider({
  children: children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <Provider>{children}</Provider>
    </ThemeProvider>
  );
}
