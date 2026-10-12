import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import drSanjayImg from "@/assets/dr-sanjay.png";
import { BRANCHES, DOCTOR, REVIEWS, SPECIALITIES, WHATSAPP } from "@/lib/clinic-data";
import { Star, ShieldCheck, Clock, Award, Languages, Phone, CalendarCheck, CheckCircle2, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/doctors")({
  component: Doctors,
});

function Doctors() {
  return (
    <>
      <PageIntro eyebrow="Our Doctors & Specialists" title="Meet the doctors dedicated to your family's care" />

      {/* Main Doctor Profile */}
      <section className="container-page py-10 lg:py-16">
        <div className="tile p-6 sm:p-10 border-primary/20 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 items-start">
            <div className="relative">
              <img
                src={drSanjayImg}
                alt={DOCTOR.name}
                className="aspect-square w-full rounded-2xl object-cover shadow-md"
              />
              <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-warning/15 py-1.5 px-3 text-xs font-semibold text-foreground">
                <Star className="size-4 fill-warning text-warning" />
                <span>4.9 Rating (Google Reviews)</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Lead Physician & Consultant
                  </span>
                  <h2 className="mt-2 text-3xl font-bold text-foreground">{DOCTOR.name}</h2>
                  <p className="mt-1 text-muted-foreground font-medium">
                    {DOCTOR.qualification} · {DOCTOR.speciality} · {DOCTOR.reg}
                  </p>
                </div>

                <div className="rounded-xl border bg-primary/5 px-4 py-2 text-right">
                  <p className="text-xs text-muted-foreground">Consultation Fee</p>
                  <p className="text-2xl font-bold text-primary">₹{DOCTOR.fee}</p>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">
                Dr. Sanjay Kompally is a highly trusted general physician with over {DOCTOR.experience} of dedicated clinical practice in Hyderabad. Renowned for ethical healthcare, thorough diagnostics, and patient-first care, he manages acute illnesses, chronic conditions like diabetes and hypertension, and coordinates specialist care across disciplines.
              </p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2 rounded-xl bg-muted/30 p-5">
                {[
                  ["Clinical Experience", `${DOCTOR.experience} comprehensive medical care`, Award],
                  ["Consultation Timings", DOCTOR.timings, Clock],
                  ["Languages Spoken", DOCTOR.languages.join(", "), Languages],
                  ["Consulting Branches", `${BRANCHES.medipally.short} & ${BRANCHES.ghatkesar.short}`, ShieldCheck],
                ].map(([k, v, Icon]) => (
                  <div key={k as string} className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {/* @ts-ignore */}
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">{k as string}</dt>
                      <dd className="text-sm font-semibold text-foreground">{v as string}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/book">
                    <CalendarCheck className="mr-2 size-4" /> Book Appointment (₹{DOCTOR.fee})
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20want%20to%20consult%20Dr.%20Sanjay%20Kompally`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 size-4" /> Consult via WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href={`tel:${BRANCHES.medipally.tel}`}>
                    <Phone className="mr-2 size-4" /> Call Clinic ({BRANCHES.medipally.phone})
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Speciality Departments */}
        <div className="mt-14">
          <p className="eyebrow">Multi-Specialty Care</p>
          <h3 className="display-md mt-1">Available Medical Specialties</h3>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            In addition to everyday General Medicine, Avica offers specialized consultations and dedicated treatment protocols.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALITIES.map((spec) => (
              <div key={spec} className="tile p-5 transition hover:border-primary/40">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <h4 className="font-semibold text-foreground">{spec}</h4>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Expert diagnosis, lifestyle counselling, and tailored clinical interventions.
                </p>
                <Link to="/treatments" className="mt-3 inline-block text-xs font-medium text-primary hover:underline">
                  View treatments in {spec} →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Reviews Section */}
        <div className="mt-14">
          <p className="eyebrow">Patient Testimonials</p>
          <h3 className="display-md mt-1">What our patients say</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.text} className="tile p-6 border-l-4 border-l-primary">
                <blockquote className="text-lg italic text-foreground">"{r.text}"</blockquote>
                <figcaption className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{r.who}</span>
                  <div className="flex text-warning">
                    {"★".repeat(5)}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
