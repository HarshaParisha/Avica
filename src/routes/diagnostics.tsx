import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, FlaskConical, Home, Clock, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { LAB_TESTS, PACKAGES, BRANCHES, WHATSAPP } from "@/lib/clinic-data";

export const Route = createFileRoute("/diagnostics")({
  component: DiagnosticsPage,
});

function DiagnosticsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "home" | "fasting" | "imaging">("all");

  const filteredTests = useMemo(() => {
    return LAB_TESTS.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.about.toLowerCase().includes(search.toLowerCase()) ||
        t.sample.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (filter === "home") return t.home;
      if (filter === "fasting") return t.fasting;
      if (filter === "imaging") return t.sample === "In clinic" || t.sample === "Partner centre";
      return true;
    });
  }, [search, filter]);

  return (
    <>
      <PageIntro
        eyebrow="Diagnostics & Pathology Lab"
        title="Accurate lab tests, swift results, home sample collection."
      >
        Avica Diagnostic Center operates automated pathology and digital diagnostic facilities in Medipally and Ghatkesar. Walk in for tests or request home blood sample collection.
      </PageIntro>

      {/* Highlights Bar */}
      <section className="border-b bg-muted/40 py-6">
        <div className="container-page grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Turnaround Time</p>
              <p className="font-semibold">Same-Day Reports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Home className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Doorstep Service</p>
              <p className="font-semibold">Home Sample Pickup</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Accuracy</p>
              <p className="font-semibold">Certified Diagnostics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FlaskConical className="size-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Equipment</p>
              <p className="font-semibold">Digital X-Ray & ECG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Checkup Packages */}
      <section className="container-page py-12 lg:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Preventive Healthcare</p>
            <h2 className="display-md mt-1">Health Checkup Packages</h2>
            <p className="mt-2 text-muted-foreground">Comprehensive panels designed for routine prevention, disease monitoring, and fever care.</p>
          </div>
          <Button asChild variant="outline">
            <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20want%20to%20inquire%20about%20Health%20Checkup%20Packages`} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 size-4" /> Inquire via WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div key={pkg.name} className="tile flex flex-col justify-between p-6 transition-all hover:border-primary/40 hover:shadow-md">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  Popular Panel
                </span>
                <h3 className="mt-3 text-xl font-semibold">{pkg.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">Includes {pkg.tests.length} essential tests:</p>
                <ul className="mt-4 space-y-2">
                  {pkg.tests.map((test) => (
                    <li key={test} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="size-4 shrink-0 text-success" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 border-t pt-4">
                <Button asChild className="w-full" size="sm">
                  <a
                    href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(pkg.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book This Package
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Individual Tests Catalog */}
      <section className="border-t bg-muted/20 py-12 lg:py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Diagnostic Directory</p>
            <h2 className="display-md mt-1">Search & Book Lab Tests</h2>
            <p className="mt-2 text-muted-foreground">Find individual routine and specialized tests with sample collection instructions and report turnaround times.</p>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tests (e.g. Hemoglobin, Creatinine, ECG, Urine)..."
                className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All Tests" },
                { id: "home", label: "Home Collection" },
                { id: "fasting", label: "Fasting Required" },
                { id: "imaging", label: "Imaging & ECG" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id as typeof filter)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    filter === btn.id
                      ? "bg-primary text-primary-foreground"
                      : "border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tests Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
              <div key={test.slug} className="tile flex flex-col justify-between p-5 transition-all hover:border-primary/30">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground">{test.name}</h3>
                    <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {test.sample}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{test.about}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-3.5" /> {test.tat}
                    </span>
                    {test.home && (
                      <span className="flex items-center gap-1 rounded bg-success/10 px-1.5 py-0.5 font-medium text-success">
                        <Home className="size-3" /> Home Pickup
                      </span>
                    )}
                    {test.fasting && (
                      <span className="rounded bg-warning/15 px-1.5 py-0.5 font-medium text-warning">
                        Fasting Required
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 border-t pt-3">
                  <a
                    href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(test.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-medium text-primary hover:underline"
                  >
                    <span>Book test / Inquire</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="tile mt-8 p-10 text-center">
              <FlaskConical className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-3 font-semibold">No tests match your search</p>
              <p className="mt-1 text-sm text-muted-foreground">Call our diagnostic desk at {BRANCHES.medipally.phone} for any unlisted investigations.</p>
              <Button asChild className="mt-4" size="sm" variant="outline">
                <button onClick={() => { setSearch(""); setFilter("all"); }}>Reset search</button>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Home Collection Process Banner */}
      <section className="container-page py-12 lg:py-16">
        <div className="tile relative overflow-hidden bg-primary/5 p-8 lg:p-12">
          <div className="max-w-2xl">
            <span className="eyebrow">Safe & Convenient</span>
            <h2 className="display-md mt-2">Book Home Blood Sample Collection</h2>
            <p className="mt-3 text-muted-foreground">
              Need tests done from the comfort of your home in Medipally, Boduppal, Peerzadiguda, Ghatkesar, or nearby areas? Our trained phlebotomists follow strict sterile protocols.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-background/90 p-4">
                <span className="text-xl font-bold text-primary">01</span>
                <p className="mt-1 font-medium">Request Pickup</p>
                <p className="text-xs text-muted-foreground">Call or WhatsApp with your required tests or doctor prescription.</p>
              </div>
              <div className="rounded-xl border bg-background/90 p-4">
                <span className="text-xl font-bold text-primary">02</span>
                <p className="mt-1 font-medium">Sterile Sample Drawn</p>
                <p className="text-xs text-muted-foreground">Technician arrives at your selected time with sealed vacutainers.</p>
              </div>
              <div className="rounded-xl border bg-background/90 p-4">
                <span className="text-xl font-bold text-primary">03</span>
                <p className="mt-1 font-medium">Digital Reports</p>
                <p className="text-xs text-muted-foreground">Accurate results delivered straight to WhatsApp and email.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`${WHATSAPP}?text=Hi%20Avica%2C%20I%20want%20to%20schedule%20a%20home%20sample%20collection`} target="_blank" rel="noopener noreferrer">
                  Schedule Home Collection
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${BRANCHES.medipally.tel}`}>
                  <Phone className="mr-2 size-4" /> Call {BRANCHES.medipally.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
