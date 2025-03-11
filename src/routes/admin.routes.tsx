/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  ShoppingCart,
  Package,
  UserCheck,
  Settings,
  BarChart,

  CreditCard,
  Truck,
  Percent,
  PieChart,
  Users,
  Archive,
  Tag,
  Gift,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  DollarSign,
} from "lucide-react";
import Category from "../pages/admin/category/Category";
import Products from "../pages/admin/products/Products";
export type IAdminPath = {
  name: string;
  icon: any;
  path: string;
  element: any;
  children?: IAdminPath[];
};

export const adminPaths: IAdminPath[] = [
  {
    name: "Dashboard",
    icon: User,
    path: "dashboard",
    element: "DASHBOARD",
  },

  {
    name: "Orders",
    icon: ShoppingCart,
    path: "orders",
    element: "ORDERS",
  },
  {
    name: "Products",
    icon: Package,
    path: "products",
    element: <Products/>,
  
  },
  {
    name: "Customers",
    icon: UserCheck,
    path: "customers",
    element: "CUSTOMERS",
  },
  {
    name: "Category",
    icon: UserCheck,
    path: "category",
    element: <Category/>,
  },
  {
    name: "Settings",
    icon: Settings,
    path: "settings",
    element: "SETTINGS",
    children: [
      {
        name: "Payment Methods",
        icon: CreditCard,
        path: "payment-methods",
        element: "PAYMENT_METHODS",
      },
      {
        name: "Shipping Methods",
        icon: Truck,
        path: "shipping-methods",
        element: "SHIPPING_METHODS",
      },
      {
        name: "Tax Settings",
        icon: Percent,
        path: "tax-settings",
        element: "TAX_SETTINGS",
      },
    ],
  },
  {
    name: "Reports",
    icon: BarChart,
    path: "reports",
    element: "REPORTS",
    children: [
      {
        name: "Sales Report",
        icon: PieChart,
        path: "sales-report",
        element: "SALES_REPORT",
      },
      {
        name: "Customer Report",
        icon: Users,
        path: "customer-report",
        element: "CUSTOMER_REPORT",
      },
      {
        name: "Inventory Report",
        icon: Archive,
        path: "inventory-report",
        element: "INVENTORY_REPORT",
      },
    ],
  },
  {
    name: "Coupons & Discounts",
    icon: Tag,
    path: "coupons-discounts",
    element: "COUPONS_DISCOUNTS",
    children: [
      {
        name: "Active Coupons",
        icon: Gift,
        path: "active-coupons",
        element: "ACTIVE_COUPONS",
      },
      {
        name: "Discount Rules",
        icon: DollarSign,
        path: "discount-rules",
        element: "DISCOUNT_RULES",
      },
    ],
  },

  {
    name: "Support",
    icon: HelpCircle,
    path: "support",
    element: "SUPPORT",
    children: [
      {
        name: "Ticket System",
        icon: MessageCircle,
        path: "ticket-system",
        element: "TICKET_SYSTEM",
      },
      {
        name: "Live Chat",
        icon: MessageSquare,
        path: "live-chat",
        element: "LIVE_CHAT",
      },
    ],
  },
];
