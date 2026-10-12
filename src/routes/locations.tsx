import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Star, Navigation, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { BRANCH_LIST, CLINIC_HOURS, WHATSAPP } from "@/lib/clinic-data";

export const Route = createFileRoute("/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Clinics & Centers"
        title="Find an Avica clinic near you in Hyderabad"
      >
        We are conveniently situated across eastern Hyderabad in Medipally and Ghatkesar, providing accessible healthcare, 24-hour pharmacy services, and diagnostic testing.
      </PageIntro>

      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {BRANCH_LIST.map((branch) => (
            <div key={branch.id} className="tile flex flex-col justify-between overflow-hidden p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-lg">
              <div>
                {/* Header & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {branch.short} Center
                  </span>
                  <div className="flex items-center gap-1 rounded-md bg-warning/15 px-2 py-0.5 text-xs font-semibold text-foreground">
                    <Star className="size-3.5 fill-warning text-warning" />
                    <span>{branch.rating}</span>
                    <span className="text-muted-foreground font-normal">({branch.reviews} reviews)</span>
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-foreground">{branch.name}</h2>

                {/* Info List */}
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="size-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Phone & Appointments</p>
                      <a href={`tel:${branch.tel}`} className="font-semibold text-primary hover:underline">
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Operational Hours</p>
                      <p className="text-muted-foreground">Doctor OPD: {CLINIC_HOURS}</p>
                      <p className="text-success font-semibold">Pharmacy: Open 24 Hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Available Services</p>
                      <p className="text-muted-foreground">General OPD · 24/7 Pharmacy · Diagnostics Lab · Digital X-Ray · ECG · Home Collection</p>
                    </div>
                  </div>
                </div>

                {/* Embedded Map */}
                <div className="mt-6 aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                  <iframe
                    title={`${branch.name} Map`}
                    src={branch.embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2 border-t pt-6">
                <Button asChild size="sm">
                  <Link to="/book">Book Doctor</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={branch.maps} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-1.5 size-3.5" /> Directions
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`tel:${branch.tel}`}>
                    <Phone className="mr-1.5 size-3.5" /> Call Clinic
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighborhood and Accessibility Note */}
      <section className="border-t bg-muted/20 py-12 lg:py-16">
        <div className="container-page max-w-4xl text-center">
          <p className="eyebrow">Neighborhood Coverage</p>
          <h2 className="display-md mt-2">Serving Eastern Hyderabad Communities</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Avica Polyclinic & Diagnostics is situated to serve families and residents across Medipally, Boduppal, Peerzadiguda, Chengicherla, Uppal, Narapally, Ghatkesar, and Singapore Township (Sanskruti Township). Both centers offer easy parking, accessible waiting areas, and 24-hour medicine counters.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/book">Book an Appointment Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20have%20a%20query%20about%20clinic%20directions`} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 size-4" /> WhatsApp Inquiries
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
