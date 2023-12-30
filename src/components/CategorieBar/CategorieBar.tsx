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

type Category = {
    _id: string;
    subcategoryIds: string[];
};
const CategorieBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const selectedCategories = useSelector((state: RootState) => state.selectedCategories.selectedCategories);
    const subcategories = useSelector((state: RootState) => state.subcategories.subcategories);
    let subcategoryItems: SubcategoryItem[] = []; // Explicitly annotate the type
    const selectedSubcategories = useSelector((state: RootState) => state.selectedSubcategories);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchSubcategories());
    }, [dispatch]);

    Object.keys(selectedCategories).forEach((categoryId: string) => {
        subcategoryItems = subcategoryItems.concat(
            subcategories
                .filter((subcategory) => subcategory._id !== undefined && selectedCategories[categoryId].includes(subcategory._id))
                .map((subcategory) => ({
                    itemId: subcategory._id || '',
                    label: subcategory.name,
                }))
        );
    });

    const handleSubcategoryItemClick = (subcategory: SubcategoryItem) => {
        dispatch(toggleSubcategory(subcategory.itemId));
    };


    const handleItemClick = (category: Category) => {
        dispatch(toggleCategory({categoryId: category._id, subcategoryIds: category.subcategoryIds}));
    };

    console.log('Selected Categories:', selectedCategories);

    return (
        <div>
            <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                <ScrollMenu>
                    {categories.map((category) => (
                        <MenuItem
                            key={category._id}
                            item={category.name}
                            onItemClick={() => handleItemClick(category)}
                            selected={!!selectedCategories[category._id]}
                        />
                    ))}
                </ScrollMenu>
            </div>
            <div>
                <div className="flex-col scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-screen">
                    <ScrollMenu>
                        {subcategoryItems.map((subcategory) => (
                            <MenuItem
                                key={subcategory.itemId}
                                item={subcategory.label}
                                onItemClick={() => handleSubcategoryItemClick(subcategory)}
                                selected={selectedSubcategories.includes(subcategory.itemId)}
                            />
                        ))}
                    </ScrollMenu>
                </div>
            </div>
        </div>
    );
};

export default CategorieBar;
