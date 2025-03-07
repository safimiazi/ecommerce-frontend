import { Dropdown, MenuProps } from "antd";
import { User, User2 } from "lucide-react";
import React from "react";

const Account = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      icon: <User />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    {
      key: "3",
      label: "Billing",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="p-2 rounded-full bg-gray-200">
          <User2
            className="text-gray-600 hover:text-blue-500 transition  duration-300 cursor-pointer"
            size={24}
          />
        </div>
      </a>
    </Dropdown>
  );
};

export default Account;
