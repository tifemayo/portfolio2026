import { Link } from "react-router-dom";
import { CV_URL } from "../lib/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "How I work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl 2xl:max-w-[88rem] mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-baseline gap-1">
          Tife Olusina<span className="text-pink text-2xl leading-none">.</span>
        </Link>
        <div className="flex items-center gap-5 md:gap-7 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`hover:text-accent transition-colors ${l.label === "Work" || l.label === "Contact" ? "hidden sm:inline" : "hidden md:inline"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CV_URL}
            download
            className="btn btn-primary !py-2 !px-4 !text-sm"
          >
            CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
