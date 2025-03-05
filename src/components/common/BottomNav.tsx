import React from 'react';
import { Heart, ShoppingCart, User2 } from "lucide-react";

const BottomNav = () => {
    return (
        <div className="h-14 border-t border-gray-200 fixed bottom-0 w-full bg-white flex justify-around items-center md:hidden shadow-lg">
            <Heart className="text-gray-600 hover:text-red-500 transition cursor-pointer" size={28} />
            <User2 className="text-gray-600 hover:text-blue-500 transition cursor-pointer" size={28} />
            <ShoppingCart className="text-gray-600 hover:text-green-500 transition cursor-pointer" size={28} />
        </div>
    );
};

export default BottomNav;
