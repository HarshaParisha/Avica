import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { BRANCH_LIST, CLINIC_HOURS, DOCTOR } from "@/lib/clinic-data";
import { HeartPulse, ShieldCheck, Clock, Users, Award, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About Avica" title="Where Life Continues — Ethical, accessible healthcare in Hyderabad">
        Avica Polyclinic & Diagnostics was founded to provide patient-centered, honest medical care, 24/7 medicine availability, and reliable diagnostic laboratory testing in Medipally and Ghatkesar.
      </PageIntro>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">Our Mission</span>
            <h2 className="display-md mt-2">Healthcare built on trust and clinical integrity</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At Avica, we believe that primary healthcare should be straightforward, affordable, and compassionate. Led by <strong>{DOCTOR.name}</strong>, our medical teams focus on accurate diagnosis rather than unnecessary tests and overprescription.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Whether you are walking in for an early morning fever checkup at 5:30 AM, needing life-saving emergency medicine at 2:00 AM from our 24-hour pharmacy, or getting certified pathology testing, Avica is open and prepared to assist you.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="tile p-4">
                <span className="text-3xl font-bold text-primary">₹200</span>
                <p className="mt-1 text-sm text-muted-foreground">Affordable general physician consultation</p>
              </div>
              <div className="tile p-4">
                <span className="text-3xl font-bold text-primary">24/7</span>
                <p className="mt-1 text-sm text-muted-foreground">Pharmacy & medical stores in both branches</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="tile p-6">
              <HeartPulse className="size-8 text-primary" />
              <h3 className="mt-3 font-semibold text-lg">Compassionate Care</h3>
              <p className="mt-2 text-sm text-muted-foreground">We take the time to listen, explain diagnoses clearly, and tailor realistic treatment plans.</p>
            </div>
            <div className="tile p-6">
              <ShieldCheck className="size-8 text-success" />
              <h3 className="mt-3 font-semibold text-lg">Ethical Practice</h3>
              <p className="mt-2 text-sm text-muted-foreground">No hidden charges or unnecessary procedures. Transparent flat ₹200 OPD fee.</p>
            </div>
            <div className="tile p-6">
              <Clock className="size-8 text-primary" />
              <h3 className="mt-3 font-semibold text-lg">Extended OPD Hours</h3>
              <p className="mt-2 text-sm text-muted-foreground">Clinic consultations from early morning 5:30 AM to late night 11:55 PM.</p>
            </div>
            <div className="tile p-6">
              <Award className="size-8 text-warning" />
              <h3 className="mt-3 font-semibold text-lg">Quality Diagnostics</h3>
              <p className="mt-2 text-sm text-muted-foreground">Automated blood tests, in-clinic digital X-ray, and ECG with same-day reports.</p>
            </div>
          </div>
        </div>

        {/* Our Branches */}
        <div className="mt-16 border-t pt-12">
          <p className="eyebrow">Our Network</p>
          <h2 className="display-md mt-2">Two Locations Serving You</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {BRANCH_LIST.map((b) => (
              <div key={b.id} className="tile p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{b.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.address}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">Phone: {b.phone}</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button asChild size="sm">
                    <Link to="/locations">View Location & Map</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href={`tel:${b.tel}`}>Call Now</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
