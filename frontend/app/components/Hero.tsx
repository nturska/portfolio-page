import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero min-h-[70vh] bg-base-100">
      <div className="hero-content text-center py-16">
        <div className="max-w-2xl">
          <div className="badge badge-outline badge-primary mb-4 p-3 font-medium">
            Frontend Developer
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Buduję aplikacje webowe w{" "}
            <span className="text-primary">React.js i Next.js</span>
          </h1>
          <p className="py-6 text-base-content/80 text-lg leading-relaxed">
            Specjalizuję się w ekosystemie Reacta. Tworzę spójne, wydajne
            interfejsy.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#projects" className="btn btn-primary">
              Zobacz projekty
            </Link>
            <Link href="#contact" className="btn btn-ghost border-base-300">
              Skontaktuj się
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
