/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Eye,
  GitCompare,
} from "lucide-react";
import truncateText from "../../utils/truncateText";
import { Tooltip, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef, useState } from "react";
import ProductQuickView from "./ProductQuickView";

const ProductCard = ({ product }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const discountPrice = product?.productOfferPrice
    ? product?.productSellingPrice - product?.productOfferPrice
    : null;

  return (
    <div>
      <div className="border hover:shadow transition-shadow duration-300 group flex flex-col border-gray-200 rounded-xl p-4 h-full bg-white relative">
        <div className=" duration-300 group flex flex-col rounded-xl h-full bg-white relative">
          {/* Discount Badge */}
          {discountPrice && (
            <span className="absolute z-50 top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {Math.floor(
                (product?.productOfferPrice / product?.productSellingPrice) *
                  100
              )}
              % OFF
            </span>
          )}

          {/* Image Section with Hover Effects */}
          <div className="relative w-full h-40 rounded-2xl flex items-center justify-center mb-2 overflow-hidden group">
            <Swiper
              modules={[Navigation, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={10}
              slidesPerView={1}
              loop
            >
              {/* If feature image exists, show it first */}
              {product?.productFeatureImage ? (
                <SwiperSlide>
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={product.productFeatureImage}
                      alt="Feature Image"
                      className="w-full h-full object-cover"
                      preview={false}
                    />
                  </div>
                </SwiperSlide>
              ) : null}

              {/* Loop through and display product images */}
              {product?.productImages?.map((img: string, index: number) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      preview={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Compare & Quick View Icons */}
          <div className="absolute z-50 bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 flex gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Tooltip title="Quick View">
              <div
                onClick={() => setModalOpen(true)}
                className="p-2 rounded-full bg-blue-500 cursor-pointer"
              >
                <Eye className="text-white" size={15} />
              </div>
            </Tooltip>
            <Tooltip title="Compare">
              <div className="p-2 rounded-full bg-blue-500 cursor-pointer">
                <GitCompare className="text-white" size={15} />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mb-2 w-full relative flex justify-center items-center gap-5">
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className="z-50 cursor-pointer transition"
          >
            <ArrowLeft className="text-gray-500" />
          </div>
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className="z-50 cursor-pointer transition"
          >
            <ArrowRight className="text-gray-500" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow">
          {/* Product Name & Brand */}
          <h3 className="text-lg font-semibold">
            {truncateText(product?.productName, 20)}
          </h3>
          <p className="text-sm text-gray-600">
            {truncateText(product?.productDescription, 50)}
          </p>

          {/* Brand with Logo */}
          <div className="flex items-center gap-2 mt-2">
            {product?.productBrand?.image && (
              <img
                src={product.productBrand.image}
                alt="Brand"
                className="w-6 h-6 rounded-full"
              />
            )}
            <p className="text-sm text-gray-500">
              {product?.productBrand?.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
             Category:  {product?.productCategory?.name}
            </p>
          </div>

          {/* Price Section */}
          <div className="mt-2 flex items-center gap-2">
            {discountPrice ? (
              <>
                <p className="text-lg font-bold text-blue-500">
                  ${discountPrice}
                </p>
                <p className="text-sm line-through text-gray-500">
                  ${product?.productSellingPrice}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold">
                ${product?.productSellingPrice}
              </p>
            )}
          </div>

          {/* Color Options */}
          <div className="flex gap-2 mt-2">
            {product?.variantcolor?.map((color: any, index: number) => (
              <span
                key={index}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color?.colorCode }}
              ></span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex justify-between items-center pt-4">
            <Tooltip title="Wishlist">
              <Heart
                className="text-blue-500 transition duration-300 cursor-pointer"
                size={24}
              />
            </Tooltip>
            <p className="text-blue-500 cursor-pointer underline">
              View Details
            </p>
            <Tooltip title="Add to Cart">
              <ShoppingCart
                className="text-blue-500 transition duration-300 cursor-pointer"
                size={24}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      
      <ProductQuickView isOpen={modalOpen} onClose={() => setModalOpen(false)} product={product} />
    </div>
  );
};

export default ProductCard;
