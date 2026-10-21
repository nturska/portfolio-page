"use client";

import { useLocale } from "@/lib/hooks/useLocale";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-base-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("contact.title")}
        </h2>
        <p className="text-base-content/70 mb-8">{t("contact.subtitle")}</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="mailto:nataliaturska2@gmail.com"
            className="btn btn-primary w-full sm:w-auto"
          >
            {t("contact.email")}
          </a>
          <a
            href="https://www.linkedin.com/in/natalia-turska-102559184/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full sm:w-auto"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/nturska"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline w-full sm:w-auto"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
