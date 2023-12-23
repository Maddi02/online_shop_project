import React, {useEffect, useState} from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import MenuItem from "./MenuItem.tsx";

interface Item {
    id: string;
}

const getItems = (): Item[] =>
    Array(24).fill(0).map((_, ind) => ({id: `hi-${ind}`}));
const CategorieBar: React.FC = () => {
    const [items] = useState<Item[]>(getItems());
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const handleItemClick = (id: string) => {
        setSelected((currentSelected) => {
            if (currentSelected.includes(id)) {
                return currentSelected.filter((el) => el !== id);
            } else {
                return [...currentSelected, id];
            }
        });
    };


    return (
        <div>
            <div className="flex-col  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {items.map(({id}) => (
                        <MenuItem key={id} item={id} selectedItems={selected}
                                  onItemClick={handleItemClick}></MenuItem>
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
};


export default CategorieBar;