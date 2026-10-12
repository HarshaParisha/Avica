import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Ticket, FlaskConical, Phone, Clock, ShieldCheck, Pill, Stethoscope, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-clinic.jpg";
import labImg from "@/assets/lab.jpg";
import drSanjayImg from "@/assets/dr-sanjay.png";
import { BRANCHES, BRANCH_LIST, DOCTOR, FAQS, REVIEWS, SPECIALITIES, SYMPTOMS, TREATMENTS } from "@/lib/clinic-data";
import { QueuePreview } from "@/components/site/QueuePreview";

export const Route = createFileRoute("/")({
  component: Home,
});

const QUICK = [
  { to: "/book", icon: CalendarCheck, title: "Book Appointment", body: "Pick a time, get a token" },
  { to: "/token", icon: Ticket, title: "Get a Token", body: "Join today's queue" },
  { to: "/diagnostics", icon: FlaskConical, title: "Book Lab Test", body: "Home collection available" },
] as const;

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-8 pb-12 pt-8 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:py-20">
          <div className="rise-in min-w-0">
            <p className="eyebrow">Open 24 hours in Medipally and Ghatkesar</p>
            <h1 className="display-xl mt-4">Where life<br />continues.</h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Honest, unhurried care from a doctor you can trust, with an in-house lab and pharmacy under one roof.
            </p>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap lg:mt-8">
              <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/book">Book Appointment</Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto"><a href={`tel:${BRANCHES.medipally.tel}`}><Phone />Call {BRANCHES.medipally.phone}</a></Button>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground lg:mt-8">
              <Star className="size-4 shrink-0 fill-warning text-warning" /> 4.9 on Google from 15 patient reviews
            </div>
          </div>
          <div className="relative min-w-0 pb-8">
            <img src={heroImg} alt="Calm consultation room at Avica Polyclinic" width={1920} height={1088} className="shadow-float aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[4/3] lg:rounded-[28px]" />
            <div className="absolute bottom-0 left-4 right-4 sm:left-auto sm:right-6 sm:w-72">
              <QueuePreview />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-3 pt-6 pb-16 sm:grid-cols-3">
        {QUICK.map((q) => (
          <a key={q.to} href={q.to} className="tile group flex min-w-0 items-center gap-3 p-4 transition-colors hover:border-primary lg:gap-4 lg:p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"><q.icon className="size-5" /></span>
            <span className="min-w-0">
              <span className="block font-medium">{q.title}</span>
              <span className="text-sm text-muted-foreground">{q.body}</span>
            </span>
          </a>
        ))}
      </section>

      <section className="bg-parchment py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <p className="eyebrow">Specialities</p>
          <h2 className="display-lg mt-3 max-w-xl">Care for the whole family, in one place.</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {SPECIALITIES.map((s) => (
              <Link key={s} to="/treatments" search={{ c: s }} className="tile min-w-0 break-words p-4 text-[15px] font-medium transition-colors hover:border-primary lg:p-5">{s}</Link>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted-foreground">How are you feeling today?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SYMPTOMS.map((s) => {
              const tr = TREATMENTS.find((t) => t.name.toLowerCase().includes(s.toLowerCase()) || t.helps.some((h) => h.toLowerCase().includes(s.toLowerCase())));
              return tr ? (
                <Link key={s} to="/treatments/$slug" params={{ slug: tr.slug }} className="rounded-full border bg-background px-4 py-2 text-sm hover:border-primary">{s}</Link>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-ink-foreground sm:py-16 lg:py-20">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <img src={drSanjayImg} alt="Dr. Sanjay Kompally" className="aspect-square w-full max-w-sm rounded-[28px] object-cover" loading="lazy" />
          <div>
            <p className="eyebrow">Your doctor</p>
            <h2 className="display-lg mt-3">{DOCTOR.name}</h2>
            <p className="mt-3 opacity-75">{DOCTOR.qualification}, {DOCTOR.reg}. {DOCTOR.speciality} with {DOCTOR.experience} of experience. Speaks {DOCTOR.languages.join(", ")}.</p>
            {REVIEWS[0] && <><blockquote className="mt-8 border-l-2 border-primary pl-4 text-xl">"{REVIEWS[0].text}"</blockquote>
            <p className="mt-2 text-sm opacity-60">{REVIEWS[0].who}</p></>}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button asChild size="lg"><Link to="/book">Book for Rs {DOCTOR.fee}</Link></Button>
              <Link to="/doctors" className="text-sm opacity-80 hover:opacity-100">View profile</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-page grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Diagnostics</p>
            <h2 className="display-lg mt-3">Tests done right here, reports the same day.</h2>
            <p className="mt-4 text-muted-foreground">Blood tests, digital X-Ray, ECG and 3T MRI access. Book online and choose home sample collection for most blood tests.</p>
            <Button asChild size="lg" className="mt-8"><a href="/diagnostics">See all tests</a></Button>
          </div>
          <img src={labImg} alt="Avica diagnostic laboratory" width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
        </div>
      </section>

      <section className="bg-parchment py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <h2 className="display-lg max-w-xl">Why families choose Avica.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { icon: Clock, t: "Open around the clock", b: "Clinic, pharmacy and emergency support, every day." },
              { icon: ShieldCheck, t: "Ethical practice", b: "Only the tests and medicines you actually need." },
              { icon: Stethoscope, t: "Rs 200 consultation", b: "Clear, fair pricing with no surprises." },
              { icon: Pill, t: "20% off medicines", b: "On standard medicines for bills above Rs 400." },
            ].map((f) => (
              <div key={f.t} className="tile p-6">
                <f.icon className="size-6 text-primary" />
                <p className="mt-4 font-medium">{f.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-page">
          <h2 className="display-lg">Two branches. Always open.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {BRANCH_LIST.map((b) => (
              <div key={b.id} className="tile p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <p className="min-w-0 text-xl font-semibold">{b.short}</p>
                  <span className="flex shrink-0 items-center gap-1 text-sm"><Star className="size-4 fill-warning text-warning" />{b.rating} ({b.reviews})</span>
                </div>
                <p className="mt-2 text-muted-foreground">{b.address}</p>
                <p className="mt-2 text-sm text-success">Open 24 hours</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild size="sm"><a href={`tel:${b.tel}`}><Phone /> {b.phone}</a></Button>
                  <Button asChild size="sm" variant="outline"><a href={b.maps} target="_blank" rel="noreferrer"><MapPin /> Directions</a></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-parchment py-12 sm:py-16 lg:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="display-lg">Questions, answered.</h2>
          <div className="mt-8 divide-y border-y">
            {FAQS.slice(0, 5).map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <a href="/faq" className="mt-6 inline-block text-primary">All questions</a>
        </div>
      </section>
    </>
  );
}
