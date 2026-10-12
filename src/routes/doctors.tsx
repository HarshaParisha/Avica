import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import drSanjayImg from "@/assets/dr-sanjay.png";
import { BRANCHES, DOCTOR, REVIEWS } from "@/lib/clinic-data";

export const Route = createFileRoute("/doctors")({
  component: Doctors,
});

function Doctors() {
  return (
    <>
      <PageIntro eyebrow="Doctors" title="Meet the doctor who knows you by name." />
      <section className="container-page py-10 sm:py-16">
        <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <img src={drSanjayImg} alt={DOCTOR.name} className="aspect-square w-full max-w-sm rounded-2xl object-cover" />
          <div className="min-w-0">
            <h2 className="text-3xl">{DOCTOR.name}</h2>
            <p className="mt-1 text-muted-foreground">{DOCTOR.qualification} · {DOCTOR.speciality} · {DOCTOR.reg}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Experience", `${DOCTOR.experience} overall`],
                ["Consultation fee", `Rs ${DOCTOR.fee}`],
                ["Timings", DOCTOR.timings],
                ["Languages", DOCTOR.languages.join(", ")],
                ["Branches", `${BRANCHES.medipally.short}, ${BRANCHES.ghatkesar.short}`],
              ].map(([k, v]) => (
                <div key={k}><dt className="text-sm text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Button asChild size="lg"><Link to="/book">Book Appointment</Link></Button>
              <Button asChild size="lg" variant="outline"><a href={`tel:${BRANCHES.medipally.tel}`}>Contact clinic</a></Button>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.text} className="tile p-6">
              <blockquote className="text-lg">"{r.text}"</blockquote>
              <figcaption className="mt-3 text-sm text-muted-foreground">{r.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
