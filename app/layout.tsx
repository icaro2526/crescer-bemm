import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import OnboardingGate from "@/components/OnboardingGate";
import Providers from "@/components/Providers";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Child Development Guidance",
  description: "A guidance app for ages 3 to 5.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <OnboardingGate>
            <AppShell>{children}</AppShell>
          </OnboardingGate>
        </Providers>
      </body>
    </html>
  );
}
