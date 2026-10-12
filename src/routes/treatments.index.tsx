import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { PageIntro } from "@/components/site/PageIntro";
import { SPECIALITIES, TREATMENTS } from "@/lib/clinic-data";

export const Route = createFileRoute("/treatments/")({
  validateSearch: z.object({ c: z.string().optional() }),
  component: Treatments,
});

function Treatments() {
  const { c } = Route.useSearch();
  const [q, setQ] = useState("");
  const list = TREATMENTS.filter((t) => (!c || t.category === c) && (t.name + t.helps.join(" ")).toLowerCase().includes(q.toLowerCase()));
  const chip = "rounded-full border px-4 py-1.5 text-sm transition-colors";
  return (
    <>
      <PageIntro eyebrow="Treatments" title="Everything we treat, explained simply." />
      <section className="container-page py-12">
        <label htmlFor="treatment-search" className="flex max-w-md items-center gap-2 rounded-full border px-4 py-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input id="treatment-search" aria-label="Search treatments" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a treatment or symptom" className="min-w-0 flex-1 bg-transparent outline-none" />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/treatments" search={{}} className={`${chip} ${!c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>All ({TREATMENTS.length})</Link>
          {SPECIALITIES.map((s) => (
            <Link key={s} to="/treatments" search={{ c: s }} className={`${chip} ${c === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{s}</Link>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <Link key={t.slug} to="/treatments/$slug" params={{ slug: t.slug }} className="tile flex flex-col p-5 transition-colors hover:border-primary">
              <span className="text-xs text-muted-foreground">{t.category}</span>
              <span className="mt-1 font-medium">{t.name}</span>
              <span className="mt-2 text-sm text-muted-foreground">{t.summary}</span>
            </Link>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No matches. Try another word, or ask the Avica Assistant.</p>}
        </div>
      </section>
    </>
  );
}
