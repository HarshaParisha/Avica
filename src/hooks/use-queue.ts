import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { istToday } from "@/lib/clinic-data";

export type Token = Tables<"tokens">;

export function useQueue(branch: string) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("tokens").select("*").eq("branch", branch).eq("token_date", istToday()).order("token_number");
    setTokens(data ?? []);
  }, [branch]);

  useEffect(() => {
    load();
    const ch = supabase
      .channel(`queue-${branch}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "tokens", filter: `branch=eq.${branch}` }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [branch, load]);

  const active = tokens.filter((t) => t.status === "called" || t.status === "in_consultation");
  const serving = active.length ? Math.max(...active.map((t) => t.token_number)) : null;
  const waiting = tokens.filter((t) => t.status === "waiting").sort((a, b) => Number(b.priority) - Number(a.priority) || a.token_number - b.token_number);
  return { tokens, serving, waiting, reload: load };
}
