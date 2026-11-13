import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { ChatWidget } from "./ChatWidget";

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
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-pink/25 selection:text-foreground">
      <ScrollToHash />
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
