import React, { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  text: string;
  onClick?: () => void;
  active?: boolean;
};

const SideBarIcon: React.FC<Props> = ({ icon, text = 'tooltip', onClick, active = false }) => (
  <div
    className={`sidebar-icon group ml-5 mr-5 flex items-center ${active ? 'active-class' : ''}`}
    onClick={onClick}
  >
    {icon}
    <div className="flex flex-col">
      <span className="sidebar-tooltip group-hover:scale-100 mt-2">{text}</span>
    </div>
  </div>
);

export default SideBarIcon;
