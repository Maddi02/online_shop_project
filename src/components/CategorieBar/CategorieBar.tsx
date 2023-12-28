import React, {useEffect, useState} from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import MenuItem from "./MenuItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";

const CategorieBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleItemClick = (id: string) => {
    setSelected((currentSelected) => {
        console.log('Current Selected:', currentSelected); // Debugging

        // Check if currentSelected is defined and is an array
        if (!Array.isArray(currentSelected)) {
            console.error('currentSelected is not an array:', currentSelected);
            return [];
        }

        if (currentSelected.includes(id)) {
            return currentSelected.filter((el) => el !== id);
        } else {
            return [...currentSelected, id];
        }
    });
};

    return (
        <div>
            <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {categories.map((category) => (
                        <MenuItem
                            key={category.name}
                            item={category.name} // Use 'name' property here
                            onItemClick={() => handleItemClick(category.name)}
                         selectedItems={selected}/>
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
};

export default CategorieBar;
