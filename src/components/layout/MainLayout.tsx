import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNav from "../common/TopNav";
import Top from "../common/Top";
import BottomNav from "../common/BottomNav";
import { useState } from "react";
import CartDrawer from "../ui/CartDrawer";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const showCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };
  return (
    <>
      <div>
        {/* top */}
        <div className=" md:block border-b md:z-50  sticky top-0 border-gray-200">
          <Top
            showCart={showCart}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
        <div className="flex h-screen">
          <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          <div className="w-full min-w-0 flex  flex-col flex-1 ">
            <header className="h-16 ">
              <TopNav />
            </header>
            <main className="flex-1 overflow-auto p-6 bg-white">
              <Outlet />
            </main>
          </div>
        </div>
        <div className="border-t border-gray-200 sticky bottom-0 w-full bg-white md:hidden">
          <BottomNav showCart={showCart} />
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
};

export default MainLayout;
