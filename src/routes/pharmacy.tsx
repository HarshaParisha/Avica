import { createFileRoute } from "@tanstack/react-router";
import { Pill, Clock, Percent, ShieldCheck, Truck, Phone, MessageSquare, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { BRANCHES, WHATSAPP } from "@/lib/clinic-data";

export const Route = createFileRoute("/pharmacy")({
  component: PharmacyPage,
});

function PharmacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="24/7 Medical Store & Pharmacy"
        title="Genuine medicines around the clock, with 20% savings."
      >
        Avica Pharmacy operates 24 hours a day in Medipally and Ghatkesar. We stock genuine branded and generic formulations, pediatric essentials, cold-chain insulins, and surgical care items.
      </PageIntro>

      {/* Special Offer Alert Banner */}
      <section className="bg-primary/10 border-y py-4">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              %
            </span>
            <div>
              <p className="font-semibold text-foreground">Special Medicine Discount</p>
              <p className="text-sm text-muted-foreground">Enjoy <strong>20% OFF</strong> on standard medicines for bills above ₹400.</p>
            </div>
          </div>
          <Button asChild size="sm">
            <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20want%20to%20order%20medicines%20with%20the%2020%25%20discount`} target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Pharmacy Highlights */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="tile p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-success/10 text-success">
              <Clock className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Open 24/7</h3>
            <p className="mt-2 text-sm text-muted-foreground">Late night or early morning emergencies, our pharmacy counters remain staffed around the clock.</p>
          </div>

          <div className="tile p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">100% Genuine Medicines</h3>
            <p className="mt-2 text-sm text-muted-foreground">Sourced directly from certified pharmaceutical distributors with strict batch traceability.</p>
          </div>

          <div className="tile p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Truck className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Doorstep Delivery</h3>
            <p className="mt-2 text-sm text-muted-foreground">Convenient medicine delivery across Medipally, Boduppal, Peerzadiguda, and Ghatkesar.</p>
          </div>

          <div className="tile p-6">
            <div className="flex size-12 items-center justify-center rounded-xl bg-warning/15 text-warning">
              <Percent className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">20% Bill Discount</h3>
            <p className="mt-2 text-sm text-muted-foreground">Significant savings on regular prescriptions and chronic care medicines on purchases above ₹400.</p>
          </div>
        </div>
      </section>

      {/* Categories & Availability */}
      <section className="border-t bg-muted/20 py-12 lg:py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Inventory & Range</p>
            <h2 className="display-md mt-1">Everything Your Family Needs</h2>
            <p className="mt-2 text-muted-foreground">A complete inventory of therapeutics and patient care essentials maintained at recommended temperatures.</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="tile p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Pill className="size-5 text-primary" /> Chronic Care Refills
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Reliable continuous supply of essential daily medicines:</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Diabetes & Insulin storage", "Hypertension & Cardiac meds", "Thyroid management", "Asthma inhalers & rotacaps", "Cholesterol & lipid control"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tile p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="size-5 text-primary" /> Acute & General Care
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Immediate relief for seasonal and everyday health issues:</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Fever, cold & flu relief", "Antibiotics (with valid Rx)", "Digestive & antacid syrups", "Pediatric formulations & drops", "Pain & anti-inflammatory"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tile p-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ShieldCheck className="size-5 text-primary" /> Surgicals & Diagnostics
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Home health monitoring and wound dressing supplies:</p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Digital BP monitors & glucometers", "Pulse oximeters & thermometers", "Sterile gauze, bandages & dressings", "Nebulizer kits & vaporizers", "Adult diapers & hygiene items"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Prescription Order Banner */}
      <section className="container-page py-12 lg:py-16">
        <div className="tile p-8 lg:p-12 bg-gradient-to-br from-primary/5 via-background to-accent/20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Quick & Easy</span>
              <h2 className="display-md mt-2">Send Prescription on WhatsApp</h2>
              <p className="mt-3 text-muted-foreground">
                Skip the queue. Snap a photo of your doctor's prescription and message it to our pharmacy team. We'll pack your order, apply the 20% discount on qualifying bills, and notify you when ready or dispatch it to your address.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">1</div>
                  <span>Click WhatsApp button and send your prescription photo</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">2</div>
                  <span>Pharmacist verifies availability, dosage, and calculates final total</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">3</div>
                  <span>Pick up at counter or receive contactless doorstep delivery</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={`${WHATSAPP}?text=Hi%20Avica%20Pharmacy%2C%20here%20is%20my%20prescription%20for%20order`} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="mr-2 size-4" /> WhatsApp Prescription
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${BRANCHES.medipally.tel}`}>
                    <Phone className="mr-2 size-4" /> Call Medipally Store
                  </a>
                </Button>
              </div>
            </div>

            {/* Branch Store Cards */}
            <div className="space-y-4">
              <div className="tile p-5 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{BRANCHES.medipally.name}</h4>
                  <span className="rounded bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">24/7 Open</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{BRANCHES.medipally.address}</p>
                <div className="mt-3 flex items-center justify-between">
                  <a href={`tel:${BRANCHES.medipally.tel}`} className="text-sm font-medium text-primary hover:underline">
                    {BRANCHES.medipally.phone}
                  </a>
                  <a href={BRANCHES.medipally.maps} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="tile p-5 border-l-4 border-l-primary">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{BRANCHES.ghatkesar.name}</h4>
                  <span className="rounded bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">24/7 Open</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{BRANCHES.ghatkesar.address}</p>
                <div className="mt-3 flex items-center justify-between">
                  <a href={`tel:${BRANCHES.ghatkesar.tel}`} className="text-sm font-medium text-primary hover:underline">
                    {BRANCHES.ghatkesar.phone}
                  </a>
                  <a href={BRANCHES.ghatkesar.maps} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-foreground">
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
