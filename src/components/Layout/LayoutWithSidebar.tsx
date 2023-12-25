import SideBar from "../Sidebar/SideBar.tsx";
import React, { ReactNode } from "react";

type LayoutWithSidebarProps = {
  children: ReactNode;
};

const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <SideBar/>
      <div>
        {children}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
