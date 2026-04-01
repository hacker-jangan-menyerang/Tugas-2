import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter, Montserrat, Open_Sans, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getTheme } from "@/lib/theme";
import { fontToCssVariable } from "@/lib/theme-shared";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "하자메 | Hacker Jangan Menyerang",
  description: "Security course group - protecting through knowledge, not attacking",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚔</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

// fetches theme info from db, while fetching, show loading screen animation.

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const selectedTheme = await getTheme();
  const selectedFontVar = fontToCssVariable(selectedTheme.font);

  const documentStyle = {
    "--primary": selectedTheme.primary,
    "--accent": selectedTheme.accent,
    "--foreground": selectedTheme.foreground,
    "--background": selectedTheme.background,
    "--font-heading": `${selectedFontVar}, sans-serif`,
    "--font-body": `${selectedFontVar}, sans-serif`,
  } as CSSProperties;

  return (
    <html lang="en" style={documentStyle}>
      <body
        className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} ${openSans.variable} antialiased`}
        style={documentStyle}
      >
        <Navbar />
        {children}
        <Footer
          themeAuthor={selectedTheme.authorName}
          themeAuthorAvatarUrl={selectedTheme.authorAvatarUrl}
          themeUpdatedAt={selectedTheme.updatedAt}
        />

      </body>
    </html>
  );
}
