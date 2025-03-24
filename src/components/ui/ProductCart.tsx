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
import { Tooltip, Image, InputNumber } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useEffect, useRef, useState } from "react";
import ProductQuickView from "./ProductQuickView";
import { useCompare } from "../../hooks/CompareContext";
import {
  useGetSinglewishlistDataQuery,
  useWishlistPostMutation,
} from "../../redux/api/wishlistApi/WishlistApi";
import Swal from "sweetalert2";

const ProductCard = ({
  product,
  productCart,
  addToCart,
  updateQuantity,
  removeFromCart,
}: any) => {
  const [wishlistPost] = useWishlistPostMutation();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({
    id: "60b8d6d5f4b88a001f07b82e",
  });
  const swiperRef = useRef<SwiperType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isInWishlist, setIsWishListed] = useState(false);
  const { addToCompare } = useCompare();
  const discountPrice = product?.productOfferPrice
    ? product?.productSellingPrice - product?.productOfferPrice
    : null;

  // Find if product is in cart and get its quantity
  const cartItem = productCart.find(
    (item: any) => item.product === product._id
  );
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);

  const handleAddToCart = () => {
    if (cartItem) {
      updateQuantity(product._id, quantity);
    } else {
      addToCart(product);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product._id, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product._id, newQuantity);
    } else {
      removeFromCart(product._id);
    }
  };

  useEffect(() => {
    if (wishlistData?.data?.products) {
      setIsWishListed(
        wishlistData.data.products.some((p) => p._id === product._id)
      );
    }
  }, [wishlistData, product._id]);

  const handleAddToWishlist = async () => {
    try {
      const res = await wishlistPost({
        user: "60b8d6d5f4b88a001f07b82e",
        product: product._id,
      }).unwrap();
      Swal.fire("Good job!", `${res.message}`, "success");
    } catch (error) {
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
      console.error("Failed to add to wishlist", error);
    }
  };

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
              <div
                onClick={() => addToCompare(product)}
                className="p-2 rounded-full bg-blue-500 cursor-pointer"
              >
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
              Category: {product?.productCategory?.name}
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
          {/* Quantity Selector */}
          <div className="mt-2 flex items-center gap-2">
            <InputNumber
              min={1}
              defaultValue={1}
              // onChange={(value) => setQuantity(value || 1)}
            />
          </div>
          {/* Action Buttons */}
          <div className="mt-auto flex justify-between items-center pt-4">
            <Tooltip
              title={`${
                isInWishlist ? "Already Wishlisted" : "Add to Wishlist"
              } `}
            >
              <button disabled={isInWishlist} className="cursor-pointer">
                <Heart
                  onClick={handleAddToWishlist}
                  className={`text-blue-500  transition duration-300 cursor-pointer  ${
                    isInWishlist ? "fill-current" : ""
                  }`}
                  size={24}
                />
              </button>
            </Tooltip>
            <p className="text-blue-500 cursor-pointer underline">
              View Details
            </p>
            <div>
              {cartItem ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrement}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <div>{quantity}</div>
                  <button
                    onClick={handleIncrement}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              ) : (
                <Tooltip title="Add to Cart">
                  <div onClick={handleAddToCart}>
                    <ShoppingCart
                      className="text-blue-500 transition duration-300 cursor-pointer"
                      size={24}
                    />
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductQuickView
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductCard;
