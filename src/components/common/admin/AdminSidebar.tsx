/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { sidebarGenerator } from "../../../utils/sidebarGenerator";
import { adminPaths } from "../../../routes/admin.routes";
import { NavLink } from "react-router-dom";

export type IAdminPath = {
  key: string;
  icon: string;
  label: any;
  children?: IAdminPath[];
};

export const NavItem = ({ icon: Icon, role, path, children }: any) => {
  return (
    <NavLink to={`/${role}/${path}`}>
      <div className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]  justify-start gap-1">
        <span>
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        </span>
        <span>{children}</span>
      </div>
    </NavLink>
  );
};

export const SubNavItem = ({ items, label, icon: Icon }: any) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  function toggleSubMenu(menu: string) {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  }

  const isOpen = openSubMenu === label;

  return (
    <div>
      <button
        onClick={() => toggleSubMenu(label)}
        className="flex items-center w-full px-3 cursor-pointer py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        <span className="flex-1 text-left text-base">{label}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="ml-6 space-y-1">
          {items.map((item: any, inx: number) => (
            <div key={inx}>
              {item.children ? (
                <SubNavItem
                  icon={item.icon}
                  path={item.path}
                  role={item.role}
                  label={item.label}
                  items={item.children}
                />
              ) : (
                <NavItem icon={item.icon} path={item.path} role={item.role}>
                  {item.label}
                </NavItem>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface AdminSidebarProps {
  setIsMobileMenuOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  return (
    <>
      <nav
        className={`
                  fixed inset-y-0 left-0 md:z-20 z-[72] bg-white transform transition-transform duration-200 ease-in-out
                  lg:translate-x-0 w-64 border-r border-gray-200 
                  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
              `}
      >
        <div className="h-full flex flex-col">
          <div className="p-3 flex justify-center border-b border-gray-200">
            <img src="/brand-logo.png" width="100px" alt="" />
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {sidebarGenerator(adminPaths, "admin").map((item, index) => (
              <div key={index} className="space-y-1">
                {item.children ? (
                  <SubNavItem
                    icon={item.icon}
                    label={item.label}
                    items={item.children}
                  />
                ) : (
                  <NavItem icon={item.icon} path={item.path} role={item.role}>
                    {item.label}
                  </NavItem>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center px-3 py-2 cursor-pointer text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]  justify-start gap-1">
              <LogOut />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
