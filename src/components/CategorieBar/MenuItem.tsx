import React from "react";

interface MenuItemProps {
 item: string;
 selectedItems: string[];
 onItemClick: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
 const { item, onItemClick, selectedItems } = props;

 const isItemSelected = (id: string): boolean => selectedItems.includes(id);

 const handleClick = (id: string) => () => {
    onItemClick(id);
 };

 return (
  <div className="menu-item">
    <div
      className={`flex justify-center items-center h10 react-horizontal-scrolling-menu--scroll-container-left scrollbar m-2 ${
        isItemSelected(item) ? ' bg-yellow-200 rounded text-black' : 'bg-category'
      }`}
      onClick={handleClick(item)}>
      <p className="md:text-xl sd:text-sm">{item}</p>
    </div>
  </div>
 );
};

export default MenuItem;