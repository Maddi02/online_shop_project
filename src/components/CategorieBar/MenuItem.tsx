import React from "react";

interface MenuItemProps {
 item: string;
 onItemClick: (id: string) => void;
 selected: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onItemClick, selected }) => {
    const handleClick = () => {
        onItemClick(item);
    };

    return (
        <div className="menu-item">
            <div
                className={`flex justify-center items-center h10 react-horizontal-scrolling-menu--scroll-container-left scrollbar m-2 ${
                    selected ? 'bg-yellow-200 rounded text-black' : 'bg-category'
                }`}
                onClick={handleClick}>
                <p className="md:text-xl sd:text-sm">{item}</p>
            </div>
        </div>
    );
};

export default MenuItem;