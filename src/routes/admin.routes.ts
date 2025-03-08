/* eslint-disable @typescript-eslint/no-explicit-any */

export type IAdminPath = {
  name: string;
  icon: string;
  path: string;
  element: any;
  children?: IAdminPath[];
};

export const adminPaths: IAdminPath[] = [
  {
    name: "Dashboard",
    icon: "DashboardIcon",
    path: "dashboard",
    element: "DASHBOARD",
    children: [
      {
        name: "orders",
        icon: "ordersIcon",
        path: "orders",
        element: "home",
      },
      {
        name: "products",
        icon: "productsIcon",
        path: "products",
        element: "PRODUCTS",
      },
      {
        name: "customers",
        icon: "customersIcon",
        path: "customers",
        element: "CUSTOMERS",
      },
      {
        name: "settings",
        icon: "settingsIcon",
        path: "settings",
        element: "SETTINGS",
      },
      {
        name: "reports",
        icon: "reportsIcon",
        path: "reports",
        element: "REPORTS",
      },
    ],
  },
  {
    name: "home",
    icon: "homeIcon",
    path: "home",
    element: "HOME",
  },
  {
    name: "about",
    icon: "aboutIcon",
    path: "about",
    element: "ABOUT",
  },
];


