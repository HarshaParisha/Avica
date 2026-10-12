import { BRANCH_LIST, CLINIC_HOURS } from "@/lib/clinic-data";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="footer-safe border-t bg-parchment pt-12 text-sm text-muted-foreground lg:pt-14">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p>Where Life Continues.</p>
          <p className="font-telugu">అవిక పాలి క్లినిక్ & డయాగ్నోస్టిక్స్</p>
        </div>
        {BRANCH_LIST.map((b) => (
          <div key={b.id} className="space-y-2">
            <p className="font-medium text-foreground">{b.short}</p>
            <p>{b.address}</p>
            <a href={`tel:${b.tel}`} className="block text-primary">{b.phone}</a>
            <p className="text-success">Open 24 hours</p>
          </div>
        ))}
        <div className="grid grid-cols-2 content-start gap-x-4">
          {[
            ["/about", "About"], ["/doctors", "Doctors"], ["/treatments", "Treatments"], ["/diagnostics", "Lab Tests"],
            ["/pharmacy", "Pharmacy"], ["/faq", "FAQ"], ["/contact", "Contact"], ["/emergency", "Emergency"],
            ["/privacy", "Privacy"], ["/terms", "Terms"], ["/staff", "Staff login"],
          ].map(([to, l]) => (
            <a key={to} href={to} className="flex min-h-11 items-center hover:text-foreground">{l}</a>
          ))}
        </div>
      </div>
      <div className="container-page mt-10 border-t pt-6 text-xs">
        <p>Clinic hours: {CLINIC_HOURS}. Pharmacy and emergency support 24 hours.</p>
        <p className="mt-2">Information on this site is for general guidance and is not a substitute for a consultation with a doctor. © {new Date().getFullYear()} Avica Polyclinic and Diagnostics.</p>
      </div>
    </footer>
  );
}
