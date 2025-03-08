/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronDown, ChevronRight, HelpCircle, Settings } from "lucide-react";
import { useState } from "react";
import { sidebarGenerator } from "../../../utils/sidebarGenerator";
import { adminPaths } from "../../../routes/admin.routes";

export type IAdminPath = {
  name: string;
  icon: string;
  path: string;
  element: any;
  children?: IAdminPath[];
};



interface NavItemProps {
  icon: any;
  children: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, children }) => {
  return (
    <div className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      <div className="text-base">{children}</div>
    </div>
  );
};

interface SubNavItemProps {
  items: IAdminPath[];
  name: string;
  icon: any;
}

export const SubNavItem: React.FC<SubNavItemProps> = ({ items, name, icon: Icon }) => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  function toggleSubMenu(menu: string) {
    setOpenSubMenu((prev) => (prev === menu ? null : menu));
  }

  const isOpen = openSubMenu === name;


  console.log(sidebarGenerator(adminPaths))
  return (
    <div>
      <button
        onClick={() => toggleSubMenu(name)}
        className="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        <span className="flex-1 text-left text-base">{name}</span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="ml-6 space-y-1">
          {items.map((item, inx) => (
            <div key={inx}>
              {item?.children ? (
                <SubNavItem items={item.children} name={item.name} icon={item.icon} />
              ) : (
                <NavItem icon={item.icon}>{item.name}</NavItem>
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

const AdminSidebar: React.FC<AdminSidebarProps> = ({ setIsMobileMenuOpen, isMobileMenuOpen }) => {
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
          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {sidebarGenerator(adminPaths).map((item, index) => (
              <div key={index} className="space-y-1">
                {item.children ? (
                //   <SubNavItem icon={item.icon} name={item.name} items={item.children} />
                ""
                ) : (
                  <NavItem icon={item.icon}>{item.label}</NavItem>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <HelpCircle size="16" className="text-gray-500" />
                <span>Help</span>
              </div>
              <div className="flex items-center space-x-2">
                <Settings size="16" className="text-gray-500" />
                <span>Settings</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronRight size="16" className="text-gray-500" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-10 z-[60] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};

export default AdminSidebar;