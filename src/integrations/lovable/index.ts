import { supabase } from "../supabase/client";

export const lovable = {
  auth: {
    signInWithOAuth: async () => {
      console.warn("Lovable cloud auth is only available in Lovable preview.");
      return { error: new Error("Lovable cloud auth not available in local environment") };
    },
  },
};
