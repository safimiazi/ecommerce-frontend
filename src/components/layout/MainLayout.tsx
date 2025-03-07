import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNav from "../common/TopNav";
import Top from "../common/Top";
import BottomNav from "../common/BottomNav";
import { useState } from "react";
import CartDrawer from "../ui/CartDrawer";
import Footer from "../common/Footer";
import WishlistDrawer from "../ui/WishlistDrawer";
import CompareDrawer from "../ui/CompareDrawer";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

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
        <div className=" md:block border-b z-10 md:z-[1000] sticky top-0 border-gray-200">
          <Top
            showCart={showCart}
            setWishlistOpen={setWishlistOpen}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
        <div className="flex h-screen">
          <div className="md:w-64">
            <Sidebar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          </div>
          <div className="w-full min-w-0 flex  flex-col flex-1 ">
            <header className="h-16 ">
              <TopNav />
            </header>
            <main className="flex-1  p-6 bg-white">
              <Outlet />

            </main>
            {/* footer */}
            <Footer/>

          </div>
        </div>
        {/* bottom */}
        <div className=" sticky shadow-2xl z-50 bottom-0 w-full bg-white md:hidden">
          <BottomNav showCart={showCart} setWishlistOpen={setWishlistOpen} setCompareOpen={setCompareOpen}/>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={closeCart} />
      <WishlistDrawer open={wishlistOpen} onClose={setWishlistOpen} />
      <CompareDrawer open={compareOpen} onClose={setCompareOpen} />
    </>
  );
};

export default MainLayout;
