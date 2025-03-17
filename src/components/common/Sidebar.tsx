/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetCategoryForSidebarQuery } from "../../redux/api/categoryApi/CategoryApi";
import { CategoryFormater } from "./CategoryFormater";
import { NavItem } from "./NavItem";
import { SubNavItem } from "./SubNavItem";

const Sidebar = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  onCategoryClick,
}: any) => {
  // Fetch categories
  const { data } = useGetCategoryForSidebarQuery({
    isDelete: false,
  });


  // Handle category click
  const handleCategoryClick = (id: string) => {
    if (onCategoryClick) {
      onCategoryClick(id); // Pass the category ID to the parent component
    }
  };

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
          {/* Sidebar Menu */}
          <div className="flex-1 overflow-y-auto md:mt-16 py-4 px-4 space-y-1">
            {CategoryFormater(data?.data?.result)?.map((category: any) => (
              <div key={category.id} className="space-y-1">
                {category.subcategories.length > 0 ? (
                  <SubNavItem
                    name={category.name}
                    items={category.subcategories}
                    id={category.id} // Pass category ID
                    onClick={handleCategoryClick} // Pass click handler
                  />
                ) : (
                  <NavItem id={category.id} onClick={handleCategoryClick}>
                    {category.name}
                  </NavItem>
                )}
              </div>
            ))}
          </div>
          {/* ... (rest of the code) */}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
