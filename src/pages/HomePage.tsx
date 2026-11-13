import { Seo } from "../components/Seo";
import { Hero, CredentialMarquee } from "../components/home/Hero";
import { Work } from "../components/home/Work";
import { Process } from "../components/home/Process";
import { Experience } from "../components/home/Experience";
import { About, Contact } from "../components/home/AboutContact";

export function HomePage() {
  return (
    <div>
      <Seo
        title="Tife Olusina · Product Manager"
        description="Tife Olusina is a product manager and First Class Computer Science graduate who turns user problems into products that ship. Unifeed, BeLearn, and generative AI at Deloitte."
        ogDescription="Product manager who turns user problems into products that ship. Five products from problem to launch."
      />
      <Hero />
      <CredentialMarquee />
      <Work />
      <Process />
      <Experience />
      <About />
      <Contact />
    </div>
  );
}
