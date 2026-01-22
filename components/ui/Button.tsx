import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white text-slate-900 hover:bg-slate-200",
  ghost: "border border-white/20 text-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  className = "",
  variant = "primary",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const styles = [baseStyles, variants[variant], className].join(" ");

  if (href) {
    return (
      <Link className={styles} href={href} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
