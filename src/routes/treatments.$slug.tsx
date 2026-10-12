import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { DOCTOR, TREATMENTS } from "@/lib/clinic-data";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = TREATMENTS.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return t;
  },
  component: TreatmentPage,
});

function TreatmentPage() {
  const t = Route.useLoaderData();
  const related = TREATMENTS.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, 3);
  return (
    <>
      <PageIntro eyebrow={t.category} title={t.name}>{t.summary}</PageIntro>
      <section className="container-page grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10 lg:py-14">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl">Who this helps</h2>
            <ul className="mt-3 flex flex-wrap gap-2">{t.helps.map((h) => <li key={h} className="rounded-full bg-muted px-3 py-1 text-sm">{h}</li>)}</ul>
          </div>
          <div>
            <h2 className="text-2xl">What to expect</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
              <li>Book online or walk in and receive a token number.</li>
              <li>A consultation with {DOCTOR.name} to understand your symptoms and history.</li>
              <li>Tests only if they are needed, done at our in-house lab.</li>
              <li>A clear treatment plan and follow up advice.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl">Price</h2>
            <p className="mt-2 text-muted-foreground">Consultation Rs {DOCTOR.fee}. Procedure and test charges are confirmed at the clinic.</p>
          </div>
          <p className="text-sm text-muted-foreground">This page is general information and not medical advice. Please consult a doctor for diagnosis.</p>
        </div>
        <aside className="tile h-fit space-y-4 p-6">
          <p className="font-medium">Ready to feel better?</p>
          <Button asChild className="w-full whitespace-normal text-center" size="lg"><Link to="/book" search={{ service: t.name }}>Book for {t.name}</Link></Button>
          {related.length > 0 && (
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground">Related</p>
              {related.map((r) => <Link key={r.slug} to="/treatments/$slug" params={{ slug: r.slug }} className="mt-2 block text-primary">{r.name}</Link>)}
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
