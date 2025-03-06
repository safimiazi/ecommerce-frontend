/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, ShoppingCart, User2 } from "lucide-react";

const BottomNav = ({showCart}: any) => {
    return (
        <div className="py-4 md:z-[1000] border-t border-gray-200 fixed bottom-0 w-full bg-white flex justify-around items-center md:hidden shadow-lg">
            <div className="p-2 rounded-full hover:bg-gray-200">
          <Heart
            className="text-gray-600 hover:text-blue-500 transition duration-300 cursor-pointer"
            size={24}
          />
        </div>
        <div className="p-2 rounded-full hover:bg-gray-200">
          <User2
            className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
            size={24}
          />
        </div>
        <div className="p-2 rounded-full hover:bg-gray-200">
          <ShoppingCart
            className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
            size={24}
            onClick={showCart}
          />
          </div>
        </div>
    );
};

export default BottomNav;
