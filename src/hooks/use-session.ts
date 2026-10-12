import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return { user, loading };
}

export function useIsStaff(userId: string | undefined) {
  const [isStaff, setIsStaff] = useState<boolean | null>(null);
  useEffect(() => {
    if (!userId) { setIsStaff(false); return; }
    supabase.rpc("is_staff", { _user_id: userId }).then(({ data }) => setIsStaff(!!data));
  }, [userId]);
  return isStaff;
}
