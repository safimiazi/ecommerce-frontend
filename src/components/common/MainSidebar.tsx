/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "./Sidebar";

export const MainSidebar = ({isMobileMenuOpen, setIsMobileMenuOpen} :   any) => {
  
    // Handle category click
    const handleCategoryClick = (id: string) => {
      console.log("Selected Category ID:", id);
      // Fetch or filter products based on the category ID
    };
  
    return (
      <div>
        <Sidebar
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          onCategoryClick={handleCategoryClick} // Pass the handler
        />
        {/* ... (rest of the parent component) */}
      </div>
    );
  };

 