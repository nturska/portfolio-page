"use client";

import Link from "next/link";
import { useLocale } from "@/lib/hooks/useLocale";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero min-h-[70vh] bg-base-100">
      <div className="hero-content text-center py-16">
        <div className="max-w-2xl">
          <div className="badge badge-outline badge-primary mb-4 p-3 font-medium">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            {t("hero.titleBefore")}{" "}
            <span className="text-primary">{t("hero.titleAccent")}</span>
          </h1>
          <p className="py-6 text-base-content/80 text-lg leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#projects" className="btn btn-primary">
              {t("hero.seeProjects")}
            </Link>
            <Link href="#contact" className="btn btn-outline border-base-300">
              {t("hero.contact")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
