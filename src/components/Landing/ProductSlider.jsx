import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import LandingProductCard from "./LandingProductCard";

export default function ProductSlider({ products }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView={1.2}
      breakpoints={{
        480: { slidesPerView: 1.5 },
        640: { slidesPerView: 2.2 },
        768: { slidesPerView: 2.8 },
        1024: { slidesPerView: 3.5 },
        1280: { slidesPerView: 4 },
      }}
      style={{ paddingBottom: "20px" }}
    >
      {products.map((p) => (
        <SwiperSlide key={p.product_id}>
          <LandingProductCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
