import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-base-content">
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
    </main>
  );
}
