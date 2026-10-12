import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileBar } from "@/components/site/MobileBar";
import { ChatWidget } from "@/components/site/ChatWidget";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display-lg mt-3">This page has moved on.</h1>
      <p className="mt-3 text-muted-foreground">The page you are looking for does not exist.</p>
      <a href="/" className="mt-6 text-primary">Go to the home page</a>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="display-lg">This page did not load</h1>
      <p className="mt-3 text-muted-foreground">Please try again, or call us on 080085 60333.</p>
      <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-full bg-primary px-5 py-2 text-primary-foreground">Try again</button>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.startsWith("/tv");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <>
      {bare ? (
        <Outlet />
      ) : (
        <>
          <SiteHeader />
          <main className="min-h-[60vh]">
            <Outlet />
          </main>
          <SiteFooter />
          <MobileBar onChat={() => setChatOpen(true)} />
          <ChatWidget open={chatOpen} setOpen={setChatOpen} />
        </>
      )}
      <Toaster />
    </>
  );
}
