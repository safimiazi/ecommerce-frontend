import { Monitor, Shirt } from "lucide-react";
import { ReactNode } from "react";
type ISubCategories = {
  name: string;
};

type ICategoriesItems = {
  name: string;
  icon: ReactNode;
  subcategories?: ISubCategories[];
};

export const CategoriesSidebarItems: ICategoriesItems[] = [
  {
    name: "Electronics",
    icon: <Monitor />,
    subcategories: [
      {
        name: "Mobile Phones",
      },
      {
        name: "Laptops",
      },
      {
        name: "Accessories",
      },
    ],
  },
  {
    name: "Fashion",
    icon: <Shirt />,
    subcategories: [
      {
        name: "Men's Clothing",
      },
      {
        name: "Women's Clothing",
      },
      {
        name: "Footwear",
      },
    ],
  },
];
