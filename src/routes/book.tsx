import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/site/PageIntro";
import { BranchPicker } from "@/components/site/BranchPicker";
import { supabase } from "@/integrations/supabase/client";
import { BRANCHES, DOCTOR, TREATMENTS, fmtTime, istToday, slotsForDay, type BranchId } from "@/lib/clinic-data";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ service: z.string().optional() }),
  component: Book,
});

const patientSchema = z.object({
  name: z.string().trim().min(2, "Please enter the patient's name").max(100),
  phone: z.string().regex(/^[6-9][0-9]{9}$/, "Enter a valid 10 digit mobile number"),
  age: z.coerce.number().int().min(0).max(120).optional(),
  reason: z.string().max(500).optional(),
});

function dates() {
  const out: string[] = [];
  const base = new Date(istToday() + "T00:00:00");
  for (let i = 0; i < 14; i++) {
    const d = new Date(base); d.setDate(base.getDate() + i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function nowIstHHMM() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

type Result = { booking_code: string; token_number: number; token_id: string };

function Book() {
  const search = Route.useSearch();
  const [branch, setBranch] = useState<BranchId>("medipally");
  const [visit, setVisit] = useState("in_clinic");
  const [service, setService] = useState(search.service ?? "General Consultation");
  const [date, setDate] = useState(istToday());
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", phone: "", age: "", gender: "", reason: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    setTime(null);
    supabase.rpc("booked_slots", { p_branch: branch, p_date: date }).then(({ data }) => {
      setBooked(Object.fromEntries((data ?? []).map((r) => [r.appt_time, r.booked])));
    });
  }, [branch, date]);

  const slots = useMemo(() => {
    const now = nowIstHHMM();
    return slotsForDay().filter((s) => date !== istToday() || s > now);
  }, [date]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = patientSchema.safeParse({ ...form, age: form.age || undefined, reason: form.reason || undefined });
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    if (!time) { toast.error("Please choose a time"); return; }
    setErrors({});
    setBusy(true);
    const { data, error } = await supabase.rpc("book_appointment", {
      p_branch: branch, p_service: service, p_visit_type: visit, p_date: date, p_time: time,
      p_name: parsed.data.name, p_phone: parsed.data.phone, p_age: parsed.data.age ?? (null as unknown as number),
      p_gender: form.gender || (null as unknown as string), p_reason: parsed.data.reason ?? (null as unknown as string),
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setResult(data as unknown as Result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (result) {
    const b = BRANCHES[branch];
    return (
      <section className="container-page max-w-xl py-20 text-center">
        <CheckCircle2 className="mx-auto size-12 text-success" />
        <h1 className="display-lg mt-4">You are booked.</h1>
        <p className="mt-3 text-muted-foreground">{new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}{time ? ` at ${fmtTime(time)}` : ""}, {b.short}</p>
        <div className="tile mt-8 grid grid-cols-2 divide-x p-6">
          <div><p className="text-sm text-muted-foreground">Token</p><p className="text-5xl font-semibold">{result.token_number}</p></div>
          <div className="min-w-0 pl-3"><p className="text-sm text-muted-foreground">Booking ID</p><p className="mt-3 break-all font-mono text-base">{result.booking_code}</p></div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Please save your booking ID. Pay Rs {DOCTOR.fee} at the clinic.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><a href={`/token/${result.token_id}`}>Track live token</a></Button>
          <Button asChild size="lg" variant="outline"><a href={b.maps} target="_blank" rel="noreferrer">Directions</a></Button>
        </div>
      </section>
    );
  }

  const step = "text-sm font-semibold text-muted-foreground";
  return (
    <>
      <PageIntro eyebrow="Book appointment" title="A doctor's visit, booked in a minute.">
        {DOCTOR.name}, {DOCTOR.speciality}. Consultation Rs {DOCTOR.fee}, pay at the clinic.
      </PageIntro>
      <form onSubmit={submit} className="container-page max-w-3xl space-y-10 py-12">
        <div className="space-y-3">
          <p className={step}>1. Branch and visit type</p>
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <BranchPicker value={branch} onChange={setBranch} />
            <select aria-label="Visit type" value={visit} onChange={(e) => setVisit(e.target.value)} className="min-h-12 w-full min-w-0 rounded-lg border bg-background px-4 py-2 text-base">
              <option value="in_clinic">In clinic visit</option>
              <option value="video">Video consultation</option>
              <option value="home_visit">Home visit request</option>
            </select>
            <select aria-label="Treatment" value={service} onChange={(e) => setService(e.target.value)} className="min-h-12 w-full min-w-0 rounded-lg border bg-background px-4 py-2 text-base sm:col-span-2">
              <option>General Consultation</option>
              {TREATMENTS.map((t) => <option key={t.slug}>{t.name}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <p className={step}>2. Date</p>
          <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-3" aria-label="Appointment dates">
            {dates().map((d) => {
              const dt = new Date(d + "T00:00:00");
              return (
                <Button variant="outline" type="button" key={d} aria-pressed={date === d} onClick={() => setDate(d)} className={`flex h-16 min-w-16 shrink-0 flex-col items-center gap-0 rounded-lg border px-3 py-2 ${date === d ? "border-primary bg-primary text-primary-foreground hover:bg-primary-press hover:text-primary-foreground" : "hover:border-primary"}`}>
                  <span className="text-xs">{dt.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                  <span className="text-lg font-semibold">{dt.getDate()}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className={step}>3. Time</p>
          <div className="grid grid-cols-3 gap-2 min-[380px]:grid-cols-4 sm:grid-cols-6">
            {slots.map((s) => {
              const full = (booked[s] ?? 0) >= 3;
              return (
                <Button variant="outline" type="button" key={s} disabled={full} aria-pressed={time === s} onClick={() => setTime(s)} className={`min-w-0 rounded-lg border px-1 py-2 text-xs disabled:opacity-35 sm:text-sm ${time === s ? "border-primary bg-primary text-primary-foreground hover:bg-primary-press hover:text-primary-foreground" : "hover:border-primary"}`}>
                  {fmtTime(s)}
                </Button>
              );
            })}
            {slots.length === 0 && <p className="col-span-full text-muted-foreground">No more slots today. Please choose another date.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <p className={step}>4. Patient details</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />{errors["name"] && <p className="mt-1 text-sm text-destructive">{errors["name"]}</p>}</div>
            <div><Label htmlFor="phone">Mobile number</Label><Input id="phone" inputMode="numeric" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />{errors["phone"] && <p className="mt-1 text-sm text-destructive">{errors["phone"]}</p>}</div>
            <div><Label htmlFor="age">Age</Label><Input id="age" inputMode="numeric" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value.replace(/\D/g, "").slice(0, 3) })} /></div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select id="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="min-h-11 w-full rounded-md border bg-background px-3 text-sm">
                <option value="">Prefer not to say</option><option>Female</option><option>Male</option><option>Other</option>
              </select>
            </div>
            <div className="sm:col-span-2"><Label htmlFor="reason">Reason for visit (optional)</Label><Input id="reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} maxLength={500} /></div>
          </div>
          <p className="text-xs text-muted-foreground">By booking you agree to Avica storing these details to manage your visit, as described in our privacy policy.</p>
        </div>

        <Button type="submit" size="lg" disabled={busy} className="w-full sm:w-auto">{busy ? "Booking…" : time ? `Confirm ${fmtTime(time)}` : "Confirm booking"}</Button>
      </form>
    </>
  );
}
