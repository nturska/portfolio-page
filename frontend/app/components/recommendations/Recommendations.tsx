"use client";

import { MotionConfig, motion } from "motion/react";
import { RecommendationsCarousel } from "./RecommendationsCarousel";
import { recommendations } from "./recommendationsData";

export const Recommendations = () => {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="recommendations"
        className="py-20 px-4 md:px-12 bg-base-200/40"
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Rekomendacje
            </h2>
            <p className="text-base-content/70">
              Opinie z LinkedIn od osób, z którymi pracowałam.
            </p>
          </div>

          <RecommendationsCarousel items={recommendations} />
        </motion.div>
      </section>
    </MotionConfig>
  );
};
