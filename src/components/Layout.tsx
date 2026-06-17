import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

const queryClient = new QueryClient();

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a tick for the route's content to mount
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

export function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent/20 selection:text-foreground">
        <ScrollToHash />
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
