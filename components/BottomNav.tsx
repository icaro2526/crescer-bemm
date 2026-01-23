"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Development", href: "/development" },
  { label: "Symptoms", href: "/symptoms" },
  { label: "Autism Guidance", href: "/autism-guidance" },
  { label: "Sleep", href: "/sleep" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Behavior", href: "/behavior" },
  { label: "Screen Time", href: "/screen-time" },
  { label: "Child Profile", href: "/child-profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 bg-white"
    >
      <div className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto px-4 py-2 text-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex-shrink-0 rounded-full px-3 py-2 transition ${
                isActive
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
