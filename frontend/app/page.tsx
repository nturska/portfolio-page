import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Timeline } from "@/components/timeline/Timeline";
import { Certificates } from "@/components/certificates/Certificates";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <Hero />
      <Timeline />
      <Certificates />
      <Projects />
      <Contact />
    </main>
  );
}
