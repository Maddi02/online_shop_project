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
        const isAlreadySelected = currentSelected.includes(id);
        const newSelected = isAlreadySelected
            ? currentSelected.filter((el) => el !== id)
            : [...currentSelected, id];
        console.log("New selected state:", newSelected);
        return newSelected;
    });
};

    return (
        <div>
            <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {categories.map((category) => (
                        <MenuItem
                            key={category.name}
                            item={category.name}
                            onItemClick={() => handleItemClick(category.name)}
                            selectedItems={selected}/>
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
};

export default CategorieBar;
