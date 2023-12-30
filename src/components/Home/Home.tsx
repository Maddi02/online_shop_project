import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSearchTerm} from '../../utilits/State/searchSlice';
import {selectSelectedCategories} from '../../utilits/State/selectedCategoriesSlice';
import {selectSelectedSubcategories} from '../../utilits/State/selectedSubcategoriesSlice';
import {AppDispatch, RootState} from "../../utilits/State/store";
import ArticleCard from "../Articel/ArticelCard";
import {Article, fetchArticles} from "../../utilits/State/productSlice";
import {fetchSubcategories} from "../../utilits/State/subCategorieSlice.ts";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.article.articles); // Assuming articles is the correct field
    const searchTerm = useSelector(selectSearchTerm);
    const selectedCategories = useSelector(selectSelectedCategories); // Assuming this is an array of selected category IDs
    const selectedSubCategories = useSelector(selectSelectedSubcategories);

    useEffect(() => {
        dispatch(fetchArticles());
        dispatch(fetchSubcategories());
        dispatch(fetchCategories());
    }, [dispatch]);

    // This should be a .filter, not .map, to create a filtered list of products
    const filteredProducts = products.filter((product) => {
        const matchesSearchTerm = !searchTerm.trim() || product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
        const isInSelectedCategory = !Object.keys(selectedCategories).length || Object.keys(selectedCategories).includes(product.categoryId);
        const isInSelectedSubcategory = !selectedSubCategories.length || selectedSubCategories.includes(product.subcategoryId);

        // The product must match the search term, category, and subcategory to be included
        return matchesSearchTerm && isInSelectedCategory && isInSelectedSubcategory;
    });

    const handleAddToCart = (article: Article) => {
        console.log("Adding to cart", article);
    };

    console.log('Filtered Products:', filteredProducts);

    return (
        <div>
            {filteredProducts.map((product) => (
                <ArticleCard article={product} onAddToCart={handleAddToCart}/>
            ))}
        </div>
    );
};

export default Home;


