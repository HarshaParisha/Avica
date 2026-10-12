import { Menu, X, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useSession } from "@/hooks/use-session";

const NAV = [
  { to: "/doctors", label: "Doctors" },
  { to: "/treatments", label: "Treatments" },
  { to: "/diagnostics", label: "Lab Tests" },
  { to: "/pharmacy", label: "Pharmacy" },
  { to: "/token", label: "Live Token" },
  { to: "/locations", label: "Locations" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useSession();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="frosted sticky top-0 z-40 border-b">
      <div className="container-page grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
        <Logo />
        <nav className="hidden min-w-0 items-center gap-4 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="flex min-h-11 items-center whitespace-nowrap text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-primary [&.active]:font-semibold"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to={user ? "/portal" : "/auth"}
            className="hidden rounded-full p-2 text-muted-foreground hover:text-foreground sm:block"
            aria-label={user ? "My account" : "Sign in"}
          >
            <UserRound className="size-5" />
          </Link>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Book Appointment</Link>
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-navigation" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="container-page flex max-h-[calc(100dvh-9rem)] flex-col gap-1 overflow-y-auto overscroll-contain pb-4 lg:hidden" aria-label="Mobile">
          {[
            ...NAV,
            { to: "/about", label: "About" },
            { to: "/faq", label: "FAQ" },
            { to: "/emergency", label: "Emergency" },
            { to: user ? "/portal" : "/auth", label: user ? "My account" : "Sign in" },
          ].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-lg hover:bg-muted"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
