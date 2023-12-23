import React, { ReactElement } from 'react';

type Props = {
  icon: ReactElement;
  text: string
};

const SideBarIcon: React.FC<Props> = ({ icon, text='tooltip' }) => (
  <div className='sidebar-icon group ml-5 mr-5 flex flex-col items-center'>
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100 mt-2">
        <div>
                  {text}
        </div>
    </span>
  </div>
);


export default SideBarIcon;
