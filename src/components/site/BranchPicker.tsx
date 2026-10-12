import { BRANCH_LIST, type BranchId } from "@/lib/clinic-data";
import { Button } from "@/components/ui/button";

export function BranchPicker({ value, onChange }: { value: BranchId; onChange: (b: BranchId) => void }) {
  return (
    <div className="grid w-full grid-cols-2 rounded-full bg-muted p-1 sm:w-auto" role="group" aria-label="Branch">
      {BRANCH_LIST.map((b) => (
        <Button
          variant="ghost"
          key={b.id}
          type="button"
          aria-pressed={value === b.id}
          onClick={() => onChange(b.id)}
          className={`min-w-0 rounded-full px-4 text-sm transition-colors ${value === b.id ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}
        >
          {b.short}
        </Button>
      ))}
    </div>
  );
}
