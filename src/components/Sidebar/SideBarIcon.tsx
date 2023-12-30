import React, { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  text: string;
  content?: string |number;
  onClick?: () => void;
  active?: boolean;
};

const SideBarIcon: React.FC<Props> = ({ icon, content, text = 'tooltip', onClick, active = false }) => (
    <div
        className={`sidebar-icon group ml-5 mr-5 flex flex-col items-center ${active ? 'active-class' : ''}`}
        onClick={onClick}
    >
        {icon}
        <div className="flex flex-col items-center">
            <div className="text-xs">{content}</div>
            <span className="sidebar-tooltip group-hover:scale-100 mt-2 text-sm">{text}</span>
        </div>
    </div>
);

export default SideBarIcon;
