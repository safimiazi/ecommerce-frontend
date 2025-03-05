import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNav from "../common/TopNav";
import Top from "../common/Top";
import BottomNav from "../common/BottomNav";
import { useState } from "react";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* top */}
      <div className=" md:block border-b md:z-50 sticky top-0 border-gray-200">
        <Top  isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
      </div>
      <div className="flex h-[1000px]">
        <Sidebar  isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
        <div className="w-full min-w-0 flex  flex-col flex-1 ">
          <header className="h-16 border-b border-gray-200 ">
            <TopNav />
          </header>
          <main className="flex-1 overflow-auto p-6 bg-white">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="border-t border-gray-200 sticky bottom-0 w-full bg-white md:hidden">
        <BottomNav/>
      </div>
    </div>
  );
};

export default MainLayout;
