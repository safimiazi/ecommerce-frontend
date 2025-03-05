/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search, Heart, ShoppingCart, User2, MenuIcon } from "lucide-react";

const Top = ({ setIsMobileMenuOpen, isMobileMenuOpen }: any) => {
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
      <div className="text-2xl font-bold text-gray-800">🛍️ MyShop</div>

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
        <Heart
          className="text-gray-600 hover:text-red-500 transition cursor-pointer"
          size={24}
        />
        <User2
          className="text-gray-600 hover:text-blue-500 transition cursor-pointer"
          size={24}
        />
        <ShoppingCart
          className="text-gray-600 hover:text-green-500 transition cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
};

export default Top;
