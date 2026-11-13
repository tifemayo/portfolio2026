import { Link } from "react-router-dom";
import { CV_URL, EMAIL, LINKEDIN } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm">
        <div className="text-muted-foreground">
          © 2026 Tife Olusina · Product Manager · London
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
          <Link to="/work/unifeed" className="hover:text-accent transition-colors">Unifeed</Link>
          <Link to="/work/belearn" className="hover:text-accent transition-colors">BeLearn</Link>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent transition-colors">Email</a>
          <a href={LINKEDIN} target="_blank" rel="noopener" className="hover:text-accent transition-colors">LinkedIn</a>
          <a href={CV_URL} download className="hover:text-accent transition-colors">Download CV</a>
        </div>
      </div>
    </footer>
  );
}
