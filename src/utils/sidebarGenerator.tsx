/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";

export const sidebarGenerator = (items: any[], role: string) => {
  return items.reduce((acc: any[], item: any) => {
    if (!item.children) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
      });
    } else if (item.children) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
        children: sidebarGenerator(item.children, role),
      });
    }

    return acc;
  }, []);
};
