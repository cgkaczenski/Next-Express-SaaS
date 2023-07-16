"use client";
import { ThemeProvider } from "next-themes";

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider storageKey="theme" defaultTheme="dark" attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;
