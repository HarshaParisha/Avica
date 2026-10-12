import { CalendarCheck, Ticket, Phone, MessageCircle } from "lucide-react";
import { BRANCHES } from "@/lib/clinic-data";
import { Button } from "@/components/ui/button";

export function MobileBar({ onChat }: { onChat: () => void }) {
  const item = "flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 py-2 text-xs text-muted-foreground";
  return (
    <nav className="frosted mobile-safe-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t lg:hidden" aria-label="Quick actions">
      <a href="/book" className={item}><CalendarCheck className="size-5 text-primary" />Book</a>
      <a href="/token" className={item}><Ticket className="size-5 text-primary" />Token</a>
      <a href={`tel:${BRANCHES.medipally.tel}`} className={item}><Phone className="size-5 text-primary" />Call</a>
      <Button variant="ghost" onClick={onChat} className={`${item} rounded-none px-0 [&_svg]:size-5`}><MessageCircle className="text-primary" />Chat</Button>
    </nav>
  );
}
