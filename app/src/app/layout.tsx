import "./globals.css";
import "nprogress/nprogress.css";
import DarkModeProvider from "../components/theme-provider";
import { NavigationEvents } from "@/components/navigation-event";
import { Confirmer } from "@/components/confirmer";
import Notifier from "@/components/notifier";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NavigationEvents />
        <DarkModeProvider>
          <main>
            <div>{children}</div>
          </main>
          <Confirmer />
          <Notifier />
        </DarkModeProvider>
      </body>
    </html>
  );
}
