import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Card({ title, description, children, className = "" }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-soft",
        "backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {title ? <h3 className="text-lg font-semibold text-white">{title}</h3> : null}
      {description ? (
        <p className="mt-2 text-sm text-slate-300">{description}</p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
