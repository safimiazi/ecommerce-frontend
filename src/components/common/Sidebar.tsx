import { MenuIcon } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <MenuIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                  fixed inset-y-0 left-0 z-[72] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                  lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
                  ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
              `}
      >
        <div className="bg-black w-4 h-4 md:hidden absolute top-4 right-4 rounded-lg flex items-center justify-center">
          <button
            type="button"
            className="h-4 w-4 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
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
