import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNav from "../common/TopNav";

const MainLayout = () => {
  return (
  <div>
    {/* top */}
    <div className="h-10 md:block hidden border-b border-gray-200">

    </div>
      <div className="flex h-[1000px]">
      <Sidebar />
      <div className="w-full min-w-0 flex  flex-col flex-1 ">
        <header className="h-16 border-b border-gray-200 ">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white">
         <Outlet/>
        </main>
      </div>
    </div>
    <div className="h-10 border-t border-gray-200 sticky bottom-0 w-full bg-white md:hidden">
</div>

  </div>
  );
};

export default MainLayout;
