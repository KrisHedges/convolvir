import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Suspense } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import AuthButton from "@/components/auth-button";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ConvolvIR.com",
  description: "A free library of impulse responses for convolution",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <nav>
              <ThemeSwitcher />
              <Link href="/">
                <h1>CONVOLV<span>IR</span></h1>
              </Link>
              <div className="auth-button-container">
                <Suspense>
                  <AuthButton />
                </Suspense>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
