import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { BRANCHES } from "@/lib/clinic-data";
import { Phone, AlertTriangle, HeartPulse, Clock, MapPin, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  component: EmergencyPage,
});

function EmergencyPage() {
  return (
    <>
      <PageIntro eyebrow="24/7 Urgent Care" title="Emergency & Critical Support">
        For urgent medical assistance, critical prescription medicines, or direct guidance, contact our immediate care support lines.
      </PageIntro>

      <section className="container-page py-12 lg:py-16">
        {/* Red Alert Banner */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-destructive text-destructive-foreground">
              <AlertTriangle className="size-8" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-destructive">Severe or Life-Threatening Emergency?</h2>
              <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
                If the patient is unconscious, experiencing acute severe chest pain, breathing difficulty, severe trauma, or signs of stroke, dial <strong>108</strong> (National Ambulance Service) immediately or proceed to the nearest emergency hospital casualty department.
              </p>
            </div>
          </div>
        </div>

        {/* 24/7 Clinic Emergency Contacts */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="tile p-6 sm:p-8 border-l-4 border-l-primary flex flex-col justify-between">
            <div>
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Medipally Branch
              </span>
              <h3 className="mt-3 text-2xl font-bold text-foreground">Avica Polyclinic Medipally</h3>
              <p className="mt-2 text-sm text-muted-foreground">{BRANCHES.medipally.address}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-success font-medium">
                <Clock className="size-4" /> 24-Hour Pharmacy & First Aid Desk
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button asChild size="lg" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-base">
                <a href={`tel:${BRANCHES.medipally.tel}`}>
                  <Phone className="mr-2 size-5" /> Call {BRANCHES.medipally.phone}
                </a>
              </Button>
            </div>
          </div>

          <div className="tile p-6 sm:p-8 border-l-4 border-l-primary flex flex-col justify-between">
            <div>
              <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Ghatkesar Branch
              </span>
              <h3 className="mt-3 text-2xl font-bold text-foreground">Avica Polyclinic Ghatkesar</h3>
              <p className="mt-2 text-sm text-muted-foreground">{BRANCHES.ghatkesar.address}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-success font-medium">
                <Clock className="size-4" /> 24-Hour Pharmacy & Medical Supplies
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button asChild size="lg" className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold text-base">
                <a href={`tel:${BRANCHES.ghatkesar.tel}`}>
                  <Phone className="mr-2 size-5" /> Call {BRANCHES.ghatkesar.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* First Aid & Urgent Care Guidance */}
        <div className="mt-14 tile p-8 bg-muted/20">
          <h3 className="text-xl font-bold">When to Visit Avica Urgent Care vs Hospital Casualty</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <HeartPulse className="size-5 text-primary" /> Walk-In Care at Avica
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                <li>High fever, chills, dengue or viral symptom checks</li>
                <li>Sudden severe stomach pain, vomiting, or diarrhea</li>
                <li>Minor cuts, lacerations, burns, and wound dressing</li>
                <li>Asthma flare-ups needing immediate nebulization</li>
                <li>Blood pressure spikes, dizziness, and vertigo</li>
                <li>Emergency prescription refills at 24/7 pharmacy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-destructive flex items-center gap-2">
                <ShieldAlert className="size-5 text-destructive" /> Dial 108 / Hospital Casualty
              </h4>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc list-inside">
                <li>Crushing chest pain radiating to arm or jaw</li>
                <li>Sudden loss of speech, facial droop, or arm weakness (Stroke)</li>
                <li>Severe head injury or loss of consciousness</li>
                <li>Uncontrollable bleeding or major fractures</li>
                <li>Severe allergic anaphylaxis with swelling of throat</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
