import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSearchTerm} from '../../utilits/State/searchSlice';
import {selectSelectedCategories} from '../../utilits/State/selectedCategoriesSlice';
import {selectSelectedSubcategories} from '../../utilits/State/selectedSubcategoriesSlice';
import {AppDispatch, RootState} from "../../utilits/State/store";
import ArticleCard from "../Articel/ArticelCard";
import {Article, fetchArticles} from "../../utilits/State/productSlice";
import {fetchSubcategories} from "../../utilits/State/subCategorieSlice.ts";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";
import ArticelInfo from "../Articel/ArticelInfo.tsx";
import {addToCart} from "../../utilits/State/cardSlice.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.article.articles);
    const searchTerm = useSelector(selectSearchTerm);
    const selectedCategories = useSelector(selectSelectedCategories);
    const selectedSubCategories = useSelector(selectSelectedSubcategories);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);


    useEffect(() => {
        dispatch(fetchArticles());
        dispatch(fetchSubcategories());
        dispatch(fetchCategories());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => {
        const matchesSearchTerm = !searchTerm.trim() || product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
        const isInSelectedCategory = !Object.keys(selectedCategories).length || Object.keys(selectedCategories).includes(product.categoryId);
        const isInSelectedSubcategory = !selectedSubCategories.length || selectedSubCategories.includes(product.subcategoryId);
        return matchesSearchTerm && isInSelectedCategory && isInSelectedSubcategory;
    });

    const handleAddToCart = (article: Article, quantity: number) => {
        console.log("Adding to cart", article, quantity);

        const cartItem = {
            ...article,
            quantity: quantity,
            maxQuantity: article.quantity
        };

        dispatch(addToCart(cartItem));
    };
    const handleOnBack = () => {
        setSelectedArticle(null);
    };

    if (selectedArticle) {
        return <ArticelInfo article={selectedArticle} onAddToCart={handleAddToCart} onBack={handleOnBack}/>;
    }

    const handleOnItemClick = (article: Article) => {
        console.log("On Item clicked", article);
        setSelectedArticle(article);
    };


    console.log('Filtered Products:', filteredProducts);

    return (
        <div>
            {filteredProducts.map((product) => (
                <ArticleCard
                    key={product._id} // Assuming each product has a unique _id
                    article={product}
                    onAddToCart={handleAddToCart}
                    onItemClicked={() => handleOnItemClick(product)}
                />
            ))}
        </div>
    );
};

export default Home;


