import { useState, useRef, useEffect } from "react";
import { ArrowUp, X, Phone } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Monogram } from "./Logo";
import { BRANCHES, WHATSAPP } from "@/lib/clinic-data";

const QUICK = ["Book an appointment", "Clinic timings", "Check my token", "Lab test for fever", "Medicine discount"];

type Message = { id: string; role: "user" | "assistant"; text: string };

const FAQ_RESPONSES: Record<string, string> = {
  "book an appointment": "You can book an appointment by visiting the **Book Appointment** page. Select your branch, preferred date and time, and fill in your details. Consultation fee is Rs 200, payable at the clinic.\n\n[Book now →](/book)",
  "clinic timings": "**Clinic hours:** Mon to Sun, 5:30 AM to 1:00 PM and 2:00 PM to 11:55 PM.\n\n**Pharmacy and emergency support:** 24 hours, every day.\n\nBoth Medipally and Ghatkesar branches follow the same timings.",
  "check my token": "You can check your live token status on the **Live Token** page. It shows who is being served now and how many people are ahead of you.\n\n[Check live token →](/token)",
  "lab test for fever": "For fever, we recommend the **Basic Fever Panel** which includes CBC, CRP, Malaria, and Dengue screening. Same-day reports available.\n\nHome sample collection is available for most blood tests.\n\n[Book a lab test →](/diagnostics)",
  "medicine discount": "Yes! We offer **20% off on standard medicines** for bills above Rs 400 at our pharmacy. The pharmacy is open 24 hours at both branches.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key) || key.includes(lower)) return value;
  }
  if (lower.includes("doctor") || lower.includes("dr")) {
    return "**Dr. Sanjay Kompally** (MBBS, Reg. No. 18190) is our General Physician with 7+ years of experience. He speaks English, Telugu, and Hindi.\n\nConsultation fee: Rs 200\n\n[View profile →](/doctors) · [Book appointment →](/book)";
  }
  if (lower.includes("location") || lower.includes("address") || lower.includes("where")) {
    return "We have two branches:\n\n**Medipally:** Shop No 1-105, Medipalli Kaman, opposite Saibaba Temple, Hyderabad 500098. Call 080085 60333.\n\n**Ghatkesar:** Ghatkesar, Hyderabad, Telangana. Call 083400 02340.\n\nBoth branches are open 24 hours.";
  }
  if (lower.includes("treatment") || lower.includes("specialit")) {
    return "We treat a wide range of conditions including General Medicine, Headache & Vertigo, Orthopedics, Dermatology, Cosmetology, Pediatrics, Physiotherapy, and more.\n\n[View all treatments →](/treatments)";
  }
  return "I'm the Avica Assistant. I can help you with:\n\n- Booking appointments\n- Clinic timings and locations\n- Lab test information\n- Medicine discounts\n- Doctor information\n\nFor anything else, please call us at **080085 60333** or visit the clinic.";
}

export function ChatWidget({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (messages.length) endRef.current?.scrollIntoView({ block: "end" }); }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: text.trim() };
    const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", text: getResponse(text) };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {!open && (
        <Dialog.Trigger asChild><Button className="shadow-float fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-medium lg:flex" aria-label="Open Avica Assistant">
          <Monogram className="size-5" /> Ask Avica
        </Button></Dialog.Trigger>
      )}
      {open && (
        <Dialog.Portal>
        <Dialog.Overlay className="dialog-scrim fixed inset-0 z-50" />
        <Dialog.Content aria-describedby={undefined} onOpenAutoFocus={(event) => { if (window.matchMedia("(max-width: 639px)").matches) event.preventDefault(); }} className="chat-panel shadow-float fixed inset-x-0 top-0 z-50 flex min-w-0 flex-col bg-background sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:rounded-[18px] sm:border">
          <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b px-4 py-3">
            <div className="flex min-w-0 items-center gap-2 text-primary">
              <Monogram className="size-6" />
              <div className="leading-tight">
                <Dialog.Title className="text-sm font-semibold text-foreground">Avica Assistant</Dialog.Title>
                <p className="text-xs text-muted-foreground">English, Telugu, Hindi</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button asChild variant="ghost" size="icon"><a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Talk to reception" title="Talk to reception"><Phone /></a></Button>
              <Dialog.Close asChild><Button variant="ghost" size="icon" aria-label="Close assistant"><X /></Button></Dialog.Close>
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 text-[15px]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p>Namaste. I can help you book a visit, get a token, check your place in the queue, find a lab test or answer questions about Avica.</p>
                <p className="text-xs text-muted-foreground">I give general information only, not a diagnosis. In an emergency, call {BRANCHES.medipally.phone} right away.</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK.map((q) => (
                     <Button key={q} variant="outline" onClick={() => send(q)} className="rounded-full px-3 text-sm">{q}</Button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                <div className={m.role === "user" ? "max-w-[85%] break-words rounded-2xl bg-primary px-4 py-2 text-primary-foreground" : "min-w-0 space-y-2 break-words [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold"}>
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex shrink-0 items-end gap-2 border-t p-3">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Type your question"
              className="max-h-32 min-w-0 flex-1 resize-none rounded-2xl border bg-background px-4 py-2.5 text-base outline-none focus:border-primary"
              aria-label="Message"
            />
            <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send"><ArrowUp /></Button>
          </form>
        </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
