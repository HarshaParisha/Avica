import { Link } from "@tanstack/react-router";

export function Monogram({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
      <path d="M20 4 36 32H4Z" />
      <path d="M20 36 4 8h32Z" opacity="0.55" />
      <path d="M20 13v14" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2 text-primary" aria-label="Avica Polyclinic and Diagnostics, home">
      <Monogram className="size-7 shrink-0" />
      <span className="flex min-w-0 flex-col gap-1 leading-none">
        <span className="text-[17px] font-semibold text-foreground">AVICA</span>
        <span className="text-[9px] text-muted-foreground sm:text-[10px]">POLYCLINIC AND DIAGNOSTICS</span>
      </span>
    </Link>
  );
}
