"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { CertificateCard } from "./CertificateCard";
import type { Certificate } from "./types";

type CertificatesCarouselProps = {
  items: Certificate[];
};

export const CertificatesCarousel = ({ items }: CertificatesCarouselProps) => {
  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Keyboard, A11y]}
      effect="coverflow"
      grabCursor
      centeredSlides
      slideToClickedSlide
      slidesPerView="auto"
      initialSlide={Math.floor(items.length / 2)}
      keyboard={{ enabled: true }}
      pagination={{ clickable: true }}
      a11y={{
        prevSlideMessage: "Poprzedni certyfikat",
        nextSlideMessage: "Następny certyfikat",
        paginationBulletMessage: "Przejdź do certyfikatu {{index}}",
      }}
      coverflowEffect={{
        rotate: 30,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false,
      }}
      className="pb-12!"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id} className="w-64! md:w-72!">
          <CertificateCard
            title={item.title}
            issuer={item.issuer}
            year={item.year}
            pdfUrl={item.pdfUrl}
            accent={item.accent}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
