/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "antd";
import {
  Search,
  Heart,
  ShoppingCart,
  MenuIcon,
  GitCompare,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Account from "../ui/Account";
import { useCompare } from "../../hooks/CompareContext";
import { useGetSinglewishlistDataQuery } from "../../redux/api/wishlistApi/WishlistApi";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Top = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  showCart,
  setWishlistOpen,
  setCompareOpen,
}: any) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { compareList } = useCompare();
  const { data: wishlistData } = useGetSinglewishlistDataQuery({});
  const { data: userCartData } = useGetSinglecartDataQuery(null);

  return (
    <div className="h-16 border-b border-gray-200  flex items-center justify-between px-4 md:px-10 bg-white shadow-sm">
      <button
        type="button"
        className="md:hidden z-50 p-2  mr-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Left: Logo */}
      <NavLink to={"/"}>
        <div className="text-2xl font-bold hover:cursor-pointer text-gray-800">
          {/* 🛍️ MyShop */}
          <img src="/brand-logo.png" width="120px" height="10px" alt="" />
        </div>
      </NavLink>
      {/* Middle: Search Bar */}
      <div className="flex-1 mx-4  md:flex">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
        </div>
      </div>

      {/* Right: Wishlist, Login, Cart (Hidden in Mobile) */}
      <div className="hidden md:flex gap-6 items-center">
        <Badge color="blue" count={compareList?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <GitCompare
              className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
              size={24}
              onClick={() => setCompareOpen(true)}
            />
          </div>
        </Badge>
        <Badge color="blue" count={wishlistData?.data?.products?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <Heart
              onClick={() => setWishlistOpen(true)}
              className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </div>
        </Badge>

        <Badge color="blue" count={userCartData?.data?.products?.length}>
          <div className="p-2 rounded-full bg-gray-200">
            <ShoppingCart
              className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
              size={24}
              onClick={showCart}
            />
          </div>
        </Badge>
        {user && user !== null &&(<Account />)}
      </div>
    </div>
  );
};

export default Top;
