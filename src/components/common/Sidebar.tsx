/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetCategoryDataQuery } from "../../redux/api/categoryApi/CategoryApi";
import { CategoryFormater } from "./CategoryFormater";
import { NavItem } from "./NavItem";
import { SubNavItem } from "./SubNavItem";

// import { ChevronDown, ChevronRight, HelpCircle, Monitor, Settings } from "lucide-react";
// import { CategoriesSidebarItems } from "../../utils/CategoriesSidebarItem";

// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { useState } from "react";
// import { useGetCategoryDataQuery } from "../../redux/api/categoryApi/CategoryApi";

// export const NavItem = ({
//   icon: Icon,
//   children,
// }: {
//   icon: any;
//   children: React.ReactNode;
// }) => {
//   return (
//     <div className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]">
//       <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
//       <div className="text-base">{children}</div>
//     </div>
//   );
// };

// export const SubNavItem = ({ items, name, icon: Icon }: any) => {
//   const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

//   function toggleSubMenu(menu: string) {
//     setOpenSubMenu((prev) => (prev === menu ? null : menu));
//   }

//   const isOpen = openSubMenu === name;
//   return (
//     <div>
//       <button
//         onClick={() => toggleSubMenu(name)}
//         className="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
//       >
//         <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
//         <span className="flex-1 text-left text-base">{name}</span>
//         {isOpen ? (
//           <ChevronDown className="h-4 w-4" />
//         ) : (
//           <ChevronRight className="h-4 w-4" />
//         )}
//       </button>
//       {isOpen && (
//         <div className="ml-6 space-y-1">
//           {items.map((item: any, inx: number) => (
//             <div key={inx}>
//               {item?.subcategories ? (
//                 <SubNavItem
//                   items={item.subcategories}
//                   name={item.name}
//                   icon={item.icon}
//                 />
//               ) : (
//                 <NavItem icon={item.icon}>{item.name}</NavItem>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Sidebar = ({ setIsMobileMenuOpen, isMobileMenuOpen }: any) => {
//   // Fetch categories
//   const { data } = useGetCategoryDataQuery({
//     isDelete: false,
//   });


//   const categoryFormater = (data: any) => {
//     const categories = data?.filter((item: any) => item.type === "parent")?.map((category: any) => {
//         return {
//           name: category.name,
//           icon: "h",
//           subcategories: category.categories?.filter((item: any) => item.type === "category")?.map((subcategory: any) => {
//             return {
//               name: subcategory.name,
//               icon: "h",
//               subcategories: subcategory.subcategories?.map((subsubcategory: any) => {
//                 return {
//                   name: subsubcategory.name,
//                   icon: "h",
//                 };
//               }),
             
//             };
//           })
        
//         }
//     } )

//     return categories
//   }


//   const categoryItems = categoryFormater(data?.data?.result);
//  console.log(JSON.stringify(categoryItems));
//   return (
//     <>
//       <nav
//         className={`
//                   fixed inset-y-0 left-0 md:z-20 z-[72]  bg-white transform transition-transform duration-200 ease-in-out
//                   lg:translate-x-0  w-64 border-r border-gray-200 
//                   ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//               `}
//       >
//         <div className="h-full flex flex-col">
//           {/* Sidebar Menu */}
//           <div className="flex-1 overflow-y-auto md:mt-16 py-4 px-4 space-y-1">
//             {categoryItems?.map((category : any) => (
//               <div className="space-y-1">
//                 {category.subcategories.length > 0 ? (
//                   <SubNavItem
//                     icon={category.icon}
//                     name={category.name}
//                     items={category.subcategories}
//                   />
//                 ) : (
//                   <NavItem icon={category.icon}>{category.name}</NavItem>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className=" p-4 border-t border-gray-200">
//             <div className="space-y-1">
//               <div className="flex items-center space-x-2">
//                 <HelpCircle size="16" className="text-gray-500" />
//                 <span>Help</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Settings size="16" className="text-gray-500" />
//                 <span>Settings</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <ChevronRight size="16" className="text-gray-500" />
//                 <span>Log out</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-10 z-[60] lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;


const Sidebar = ({ setIsMobileMenuOpen, isMobileMenuOpen, onCategoryClick }: any) => {
  // Fetch categories
  const { data } = useGetCategoryDataQuery({
    isDelete: false,
  });

 

  const categoryItems = CategoryFormater(data?.data?.result);

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
            {categoryItems?.map((category: any) => (
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
