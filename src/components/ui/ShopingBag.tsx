import { ShoppingCart } from "lucide-react";

const ShopingBag = () => (
  <div className="fixed z-[700] right-4 top-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-lg shadow-lg p-2 w-20 flex flex-col items-center">
    <div className="bg-white p-1.5 rounded-full shadow-md hover:rotate-6 transition-transform">
      <ShoppingCart size={24} className="text-blue-600" />
    </div>
    <span className="text-xs">0 items</span>
    <div className="text-base font-bold flex items-center gap-0.5">
      <span>৳</span> <span>0</span>
    </div>
  </div>
);

export default ShopingBag;
