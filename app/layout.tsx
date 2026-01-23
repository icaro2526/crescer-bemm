import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

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
        <div className="flex min-h-screen flex-col bg-white text-zinc-900">
          <Header />
          <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-6 pb-24">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
