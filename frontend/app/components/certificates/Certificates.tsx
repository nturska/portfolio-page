"use client";

import { MotionConfig, motion } from "motion/react";
import { CertificatesCarousel } from "./CertificatesCarousel";
import { certificates } from "./certificatesData";

export const Certificates = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="certificates"
        className="py-20 px-4 md:px-12 bg-base-200/50 overflow-hidden"
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certyfikaty</h2>
            <p className="text-base-content/70">
              Przeciągnij karty myszką lub palcem, albo użyj strzałek na
              klawiaturze.
            </p>
          </div>

          <CertificatesCarousel items={certificates} />
        </motion.div>
      </section>
    </MotionConfig>
  );
};
