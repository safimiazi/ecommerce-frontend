/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import MaxWidth from "../../../wrapper/MaxWidth";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef } from "react";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import LeftNavigationButton from "../../ui/LeftNavigationButton";
import SectionPadding from "../../../wrapper/SectionPadding";
import ProductCard from "../../ui/ProductCart";
import { useGetFilterProductsQuery } from "../../../redux/api/productApi/ProductApi";


export default function OfferProductsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: bestSellingProducts } = useGetFilterProductsQuery({
    pageIndex: 1,
    pageSize: 8,
    isDelete: false,
    isOffer: true,
  });
  return (
    <SectionPadding>
      <MaxWidth>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Offer Products
          </h2>
          <p className="text-blue-500 hover:underline transition-colors duration-500 cursor-pointer">
            All Products
          </p>
        </div>
        <div className="relative">
          <LeftNavigationButton swiperRef={swiperRef} />
          <RightNavigartionButton swiperRef={swiperRef} />

          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            spaceBetween={20}
            autoHeight={false}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 4},
            }}
            loop
            className="w-full h-full"
          >
            {bestSellingProducts?.data?.result?.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductCard key={index} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidth>
    </SectionPadding>
  );
}
