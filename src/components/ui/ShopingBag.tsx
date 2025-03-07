import { ShoppingCart } from "lucide-react";

const ShopingBag = () => {
  return (
    <div className="fixed right-4 z-[2000] top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-lg shadow-lg p-2 w-24 flex flex-col items-center">
      <div className="bg-white p-2 rounded-full shadow-md mb-2 hover:rotate-6 transition-transform duration-200">
        <ShoppingCart size={28} className="text-blue-600" />
      </div>
      <span className="text-sm">0 items</span>
      <div className="text-lg font-bold flex items-center gap-0.5">
        <span>৳</span>
        <span>0</span>
      </div>
    </div>
  );
};

export default ShopingBag;
