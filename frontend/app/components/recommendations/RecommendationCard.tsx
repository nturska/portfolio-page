"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/lib/hooks/useLocale";
import type { Recommendation } from "./types";

type RecommendationCardProps = {
  recommendation: Recommendation;
  displayedQuote: string;
  isTyping: boolean;
};

const initialsFromName = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const RecommendationCard = ({
  recommendation,
  displayedQuote,
  isTyping,
}: RecommendationCardProps) => {
  const { t } = useLocale();
  const [photoFailed, setPhotoFailed] = useState(false);
  const showPhoto = Boolean(recommendation.photoUrl) && !photoFailed;

  return (
    <article className="relative overflow-hidden rounded-box border border-base-300 bg-base-100 p-6 shadow-sm md:p-10">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-4 font-serif text-[9rem] leading-none text-primary/15 select-none md:text-[12rem]"
      >
        “
      </span>

      <a
        href={recommendation.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("recommendations.linkedInProfile", {
          name: recommendation.name,
        })}
        className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4 text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
          aria-hidden="true"
        >
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
        </svg>
      </a>

      <div className="relative z-10 flex flex-col gap-8">
        <blockquote className="min-h-32 text-lg leading-relaxed md:min-h-36 md:text-xl">
          <p>
            {displayedQuote}
            {isTyping && (
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block w-0.5 animate-pulse bg-primary align-[-0.1em]"
              >
                &nbsp;
              </span>
            )}
          </p>
        </blockquote>

        <footer className="flex items-center gap-4">
          {showPhoto ? (
            <Image
              src={recommendation.photoUrl ?? ""}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-base-300"
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-sm font-bold tracking-wide text-primary ring-2 ring-base-300"
            >
              {initialsFromName(recommendation.name)}
            </div>
          )}
          <div>
            <p className="font-bold">{recommendation.name}</p>
            <p className="text-sm text-base-content/70">
              {recommendation.role} @ {recommendation.company}
            </p>
          </div>
        </footer>
      </div>
    </article>
  );
};
