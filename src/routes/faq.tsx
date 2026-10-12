import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { FAQS, BRANCHES, WHATSAPP } from "@/lib/clinic-data";
import { ChevronDown, HelpCircle, MessageSquare, Phone } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <>
      <PageIntro eyebrow="Help & Support" title="Frequently Asked Questions">
        Have questions about clinic timings, doctor appointments, token queue tracking, medicine discounts, or lab reports? Find clear answers below.
      </PageIntro>

      <section className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={faq.q} className="tile overflow-hidden transition">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`size-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="border-t bg-muted/20 px-5 py-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 tile p-8 text-center max-w-2xl mx-auto bg-primary/5">
          <HelpCircle className="mx-auto size-10 text-primary" />
          <h3 className="mt-3 text-xl font-bold">Still have a question?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our clinic desk is always available to assist with inquiries, reports, and directions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20have%20a%20question`} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 size-4" /> Ask on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${BRANCHES.medipally.tel}`}>
                <Phone className="mr-2 size-4" /> Call {BRANCHES.medipally.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
