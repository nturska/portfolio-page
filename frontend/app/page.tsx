import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Timeline } from "@/components/timeline/Timeline";
import { Recommendations } from "@/components/recommendations/Recommendations";
import { Certificates } from "@/components/certificates/Certificates";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { LanguageToggle } from "./components/ui/LanguageToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <LanguageToggle />
      <Navbar />
      <Hero />
      <Timeline />
      <Recommendations />
      <Certificates />
      <Projects />
      <Contact />
    </main>
  );
}
