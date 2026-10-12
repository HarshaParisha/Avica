import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ticket, Users, Clock, CheckCircle2, AlertCircle, RefreshCw, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { useQueue } from "@/hooks/use-queue";
import { BRANCHES, DOCTOR, AVG_CONSULT_MIN } from "@/lib/clinic-data";

export const Route = createFileRoute("/token")({
  component: LiveTokenPage,
});

function LiveTokenPage() {
  const [selectedBranch, setSelectedBranch] = useState<"medipally" | "ghatkesar">("medipally");
  const [myTokenInput, setMyTokenInput] = useState("");
  const [searchedToken, setSearchedToken] = useState<number | null>(null);

  const { serving, waiting, reload } = useQueue(selectedBranch);

  const currentServing = serving ?? 1;
  const waitingCount = waiting.length;
  const estimatedTotalWait = waitingCount * AVG_CONSULT_MIN;

  const handleSearchToken = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(myTokenInput, 10);
    if (!isNaN(num) && num > 0) {
      setSearchedToken(num);
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Real-Time OPD Tracker"
        title="Live Token Queue & Wait Time Monitor"
      >
        Track the live consultation line from home or the waiting lobby. See who is currently being examined by Dr. Sanjay Kompally, how many patients are ahead of you, and plan your arrival.
      </PageIntro>

      {/* Branch Selector and Live Status */}
      <section className="container-page py-10 lg:py-14">
        {/* Branch Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div className="flex gap-2">
            <button
              onClick={() => { setSelectedBranch("medipally"); setSearchedToken(null); }}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                selectedBranch === "medipally"
                  ? "bg-primary text-primary-foreground shadow"
                  : "border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Medipally Branch
            </button>
            <button
              onClick={() => { setSelectedBranch("ghatkesar"); setSearchedToken(null); }}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                selectedBranch === "ghatkesar"
                  ? "bg-primary text-primary-foreground shadow"
                  : "border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              Ghatkesar Branch
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-success"></span>
              </span>
              Live Sync Active
            </span>
            <Button variant="ghost" size="sm" onClick={() => reload()} title="Refresh live status">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>

        {/* Live Token Dashboard Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Now Serving Card */}
          <div className="tile relative overflow-hidden border-primary/30 bg-primary/5 p-8 text-center md:text-left">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Currently in Consultation
            </span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Now Serving Token</p>
            <p className="mt-1 text-6xl font-bold tracking-tight text-primary tabular-nums">
              #{currentServing}
            </p>
            <p className="mt-4 text-sm text-foreground flex items-center justify-center md:justify-start gap-1.5 font-medium">
              <ShieldCheck className="size-4 text-primary" /> {DOCTOR.name} ({DOCTOR.qualification})
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Consultation room active</p>
          </div>

          {/* Waiting Count Card */}
          <div className="tile p-8 text-center md:text-left">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground mx-auto md:mx-0">
              <Users className="size-5" />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Patients in Queue</p>
            <p className="mt-1 text-5xl font-bold tracking-tight text-foreground tabular-nums">
              {waitingCount}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {waitingCount === 0 ? "No wait time right now. Walk-ins can be seen immediately." : `${waitingCount} patients awaiting consultation.`}
            </p>
          </div>

          {/* Estimated Wait Card */}
          <div className="tile p-8 text-center md:text-left">
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground mx-auto md:mx-0">
              <Clock className="size-5" />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Estimated Queue Wait</p>
            <p className="mt-1 text-5xl font-bold tracking-tight text-foreground tabular-nums">
              ~{estimatedTotalWait} <span className="text-xl font-normal text-muted-foreground">mins</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Average consultation: ~{AVG_CONSULT_MIN} mins per patient.
            </p>
          </div>
        </div>

        {/* Check My Token Tool */}
        <div className="mt-10 tile p-6 sm:p-8 bg-card">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Ticket className="size-5 text-primary" /> Check Your Token Status
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter the token number from your booking confirmation to see how many people are ahead of you.
            </p>

            <form onSubmit={handleSearchToken} className="mt-4 flex gap-2">
              <input
                type="number"
                min="1"
                value={myTokenInput}
                onChange={(e) => setMyTokenInput(e.target.value)}
                placeholder="Enter Token Number (e.g. 5)"
                className="w-48 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
              <Button type="submit">Check Status</Button>
            </form>

            {searchedToken !== null && (
              <div className="mt-6 rounded-xl border bg-muted/40 p-5">
                {searchedToken === currentServing ? (
                  <div className="flex items-start gap-3 text-success">
                    <CheckCircle2 className="size-6 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">It's Your Turn! (Token #{searchedToken})</p>
                      <p className="text-sm text-muted-foreground">Please proceed to Dr. Sanjay Kompally's consultation chamber.</p>
                    </div>
                  </div>
                ) : searchedToken < currentServing ? (
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <AlertCircle className="size-6 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">Token #{searchedToken} Already Called</p>
                      <p className="text-sm">This token number has already completed consultation. If you missed your call, please check with the reception desk.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground text-lg">Token #{searchedToken} Status</p>
                      <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">In Waiting List</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Patients Ahead</p>
                        <p className="text-xl font-bold text-foreground">{searchedToken - currentServing}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Estimated Call Time</p>
                        <p className="text-xl font-bold text-foreground">~{(searchedToken - currentServing) * AVG_CONSULT_MIN} mins</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      We suggest arriving at the clinic when there are 2 patients ahead of you.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* How It Works & CTA */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="eyebrow">Zero Waiting Room Hassle</span>
            <h2 className="display-md mt-2">How Avica Live Tokens Work</h2>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">1</span>
                <div>
                  <h4 className="font-semibold">Book Online or Walk-In</h4>
                  <p className="text-sm text-muted-foreground">Reserve your appointment online for ₹200 or take a token at the clinic front desk.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">2</span>
                <div>
                  <h4 className="font-semibold">Instant Token Allocated</h4>
                  <p className="text-sm text-muted-foreground">You receive your sequential token number immediately with doctor timings.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">3</span>
                <div>
                  <h4 className="font-semibold">Track Live Anywhere</h4>
                  <p className="text-sm text-muted-foreground">Check this screen from home, office, or coffee shop and arrive just in time for your turn.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="tile p-8 bg-muted/30 text-center">
            <h3 className="text-xl font-semibold">Need to see the doctor today?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Consult Dr. Sanjay Kompally (MBBS) at {BRANCHES[selectedBranch].name}.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/book">
                  Book Appointment & Get Token <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${BRANCHES[selectedBranch].tel}`}>Call Clinic Reception</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
