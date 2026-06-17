import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

export function SiteNav() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToWork(e: React.MouseEvent) {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#work");
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-xs tracking-tight uppercase font-bold hover:text-accent transition-colors"
        >
          Boluwatife (Tife) <span className="text-muted-foreground">/ Portfolio 2026</span>
        </Link>
        <div className="flex gap-6 md:gap-8 font-mono text-[11px] uppercase tracking-wider">
          <a
            href="/#work"
            onClick={goToWork}
            className="hover:text-accent transition-colors text-foreground"
          >
            Projects
          </a>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-accent transition-colors ${isActive ? "text-accent" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-accent transition-colors ${isActive ? "text-accent" : ""}`
            }
          >
            Contact
          </NavLink>
          <a
            href="/Tife_Boluwatife_CV.pdf"
            target="_blank"
            rel="noopener"
            className="hidden md:inline-block hover:text-accent transition-colors"
          >
            CV ↗
          </a>
        </div>
      </div>
    </nav>
  );
}