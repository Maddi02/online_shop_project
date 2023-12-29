import React, {useEffect} from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import MenuItem from "./MenuItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";
import {toggleCategory} from '../../utilits/State/selectedCategoriesSlice.ts'; // Import the toggleCategory action

const CategorieBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.selectedCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleItemClick = (id: string) => {
        console.log(id)
        dispatch(toggleCategory(id)); // Assuming this correctly updates the selectedCategories in the Redux store
        console.log("After dispatch, selectedCategories:", selectedCategories);
    };

    console.log("Selected Categories:", selectedCategories); // Debugging line

    return (
        <div>
            <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {categories.map((category) => (
                        <MenuItem
                            key={category._id}
                            item={category.name}
                            onItemClick={() => handleItemClick(category._id)}
                            selected={selectedCategories.includes(category._id)}
                        />
                    ))}
                </ScrollMenu>
            </div>
        </div>
    );
};

export default CategorieBar;
