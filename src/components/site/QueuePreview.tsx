import { useQueue } from "@/hooks/use-queue";

export function QueuePreview() {
  const { serving, waiting } = useQueue("medipally");
  return (
    <a href="/token" className="tile shadow-float block p-4">
      <p className="text-xs text-muted-foreground">Medipally, live queue</p>
      <div className="mt-1 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Now serving</p>
          <p className="text-3xl font-semibold tabular-nums">{serving ?? "–"}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Waiting</p>
          <p className="text-xl font-medium tabular-nums">{waiting.length}</p>
        </div>
      </div>
    </a>
  );
}
