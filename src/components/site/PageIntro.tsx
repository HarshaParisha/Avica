import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-parchment">
      <div className="container-page py-10 sm:py-14 lg:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-lg mt-3 max-w-3xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}


