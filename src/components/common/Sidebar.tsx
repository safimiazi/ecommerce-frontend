/* eslint-disable @typescript-eslint/no-explicit-any */


const Sidebar = ({setIsMobileMenuOpen, isMobileMenuOpen} : any) => {
  return (
    <>
    
      <nav
        className={`
                  fixed inset-y-0 left-0 md:z-20 z-[72] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                  lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
              `}
      >
       
        <div className="h-full flex flex-col"></div>
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
