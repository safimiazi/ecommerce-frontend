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
  HelpCircle,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import Category from "../pages/admin/productManagement/category/Category";
import Products from "../pages/admin/productManagement/products/Products";
import AttributeOption from "../pages/admin/productManagement/attributeOption/AttributeOption";
import Attribute from "../pages/admin/productManagement/attribute/Attribute";
import Brand from "../pages/admin/productManagement/brand/Brand";
import Unit from "../pages/admin/productManagement/unit/Unit";
import Coupon from "../pages/admin/CouponsAndDiscount/coupon/Coupon";
import Order from "../pages/admin/orderManagement/order/Order";
import Customer from "../pages/admin/userManagement/Customer";
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
    name: "Product Management",
    icon: Package,
    path: "product-management",
    element: <Products/>,
    children: [
      {
        name: "Brand",
        icon: UserCheck,
        path: "brand",
        element: <Brand/>,
      },
      {
        name: "Category",
        icon: UserCheck,
        path: "category",
        element: <Category/>,
      },
      {
        name: "Unit",
        icon: UserCheck,
        path: "unit",
        element: <Unit/>,
      },
      {
        name: "Product",
        icon: MessageCircle,
        path: "product",
        element: <Products/>

      },
      {
        name: "Attribute Option",
        icon: MessageCircle,
        path: "attribute-option",
        element: <AttributeOption/>,
      },
      {
        name: "Attribute",
        icon: MessageCircle,
        path: "attribute",
        element: <Attribute/>,
      },
      {
        name: "Live Chat",
        icon: MessageSquare,
        path: "live-chat",
        element: "LIVE_CHAT",
      },
    ],
  },
  {
    name: "Order Management",
    icon: Package,
    path: "order-management",
    element: <Products/>,
    children: [
  
      {
        name: "Order",
        icon: UserCheck,
        path: "order",
        element: <Order/>,
      },
    ],
  },

  {
    name: "Customers",
    icon: UserCheck,
    path: "customers",
    element: <Customer/>,
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
        name: "Coupon",
        icon: UserCheck,
        path: "coupon",
        element: <Coupon/>,
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
