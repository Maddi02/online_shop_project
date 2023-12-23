import React, { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  text: string;
};

const SideBarIcon: React.FC<Props> = ({ icon, text = 'tooltip'}) => (
  <div className='sidebar-icon group ml-5 mr-5 flex items-center'>
    {icon}
    <div className="flex flex-col">
      <span className="sidebar-tooltip group-hover:scale-100 mt-2">{text}</span>
    </div>
  </div>
);



export default SideBarIcon;
