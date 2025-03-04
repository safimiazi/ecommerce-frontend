import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import TopNav from "../common/TopNav";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full min-w-0 flex  flex-col flex-1 ">
        <header className="h-16 border-b border-gray-200 ">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
