import React, {useEffect} from 'react';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import MenuItem from './MenuItem.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../utilits/State/store.ts';
import {fetchCategories} from '../../utilits/State/categorieSlice.ts';
import {toggleCategory} from '../../utilits/State/selectedCategoriesSlice.ts';
import {fetchSubcategories} from '../../utilits/State/subCategorieSlice.ts';
import {toggleSubcategory} from "../../utilits/State/selectedSubcategoriesSlice.ts";

interface SubcategoryItem {
    itemId: string;
    label: string;
}

const CategorieBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.selectedCategories);
    const subcategories = useSelector((state: RootState) => state.subcategories.subcategories);
    let subcategoryItems: SubcategoryItem[] = []; // Explicitly annotate the type
    const selectedSubcategories = useSelector((state: RootState) => state.selectedSubcategories); // Add this line

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubcategories());
    }, [dispatch]);

    Object.keys(selectedCategories).forEach((categoryId: string) => {
        subcategoryItems = subcategoryItems.concat(
            subcategories
                .filter((subcategory) => selectedCategories[categoryId].includes(subcategory._id))
                .map((subcategory) => ({
                    itemId: subcategory._id || '', // Use an empty string as a fallback if subcategory._id is undefined
                    label: subcategory.name, // The text to display for the subcategory
                }))
        );
    });

    const handleSubcategoryItemClick = (subcategory: SubcategoryItem) => {
        dispatch(toggleSubcategory(subcategory.itemId)); // Dispatch the toggleSubcategory action
    };


    const handleItemClick = (category: any) => { // Explicitly annotate the type as any for now
        dispatch(toggleCategory({categoryId: category._id, subcategoryIds: category.subcategoryIds}));
    };

    console.log('Selected Categories:', selectedCategories); // Debugging line

    return (
        <div>
            <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {categories.map((category) => (
                        <MenuItem
                            key={category._id}
                            item={category.name}
                            onItemClick={() => handleItemClick(category)}
                            selected={!!selectedCategories[category._id]} // Check if category ID exists in the selectedCategories object
                        />
                    ))}
                </ScrollMenu>
            </div>
            <div>
                {/* Add a second menu bar for subcategories */}
                <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                    <ScrollMenu>
                        {subcategoryItems.map((subcategory) => (
                            <MenuItem
                                key={subcategory.itemId}
                                item={subcategory.label}
                                onItemClick={() => handleSubcategoryItemClick(subcategory)} // Use the new click handler
                                selected={selectedSubcategories.includes(subcategory.itemId)} // Check if subcategory ID exists in selectedSubcategories
                            />
                        ))}
                    </ScrollMenu>
                </div>
            </div>
        </div>
    );
};

export default CategorieBar;
