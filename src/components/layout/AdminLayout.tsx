import { Outlet } from "react-router-dom";
import AdminSidebar from "../common/admin/AdminSidebar";
import AdminTopbar from "../common/admin/AdminTopbar";
import AdminFooter from "../common/admin/AdminFooter";
import { useState } from "react";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="md:w-64">
        <AdminSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
      <div className="w-full min-w-0 flex flex-col flex-1">
        <header className=" md:block border-b z-10 md:z-[1000] sticky top-0 border-gray-200">
          <AdminTopbar
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </header>
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
        <footer>
          <AdminFooter />
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
