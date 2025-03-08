import { Outlet } from "react-router-dom";
import AdminSidebar from "../common/admin/AdminSidebar";
import AdminTopbar from "../common/admin/AdminTopbar";
import AdminFooter from "../common/admin/AdminFooter";

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            <div className="md:w-64">
                <AdminSidebar/>
            </div>
            <div className="w-full min-w-0 flex flex-col flex-1">
                <header className="h-16">
                    <AdminTopbar/>
                </header>
                <main className="flex-1 p-6 bg-white">
                    <Outlet/>
                </main>
                <footer>
                    <AdminFooter/>
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;