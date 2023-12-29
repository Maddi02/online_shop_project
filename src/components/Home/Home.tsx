import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm } from '../../utilits/State/searchSlice';
import { selectSelectedCategories } from '../../utilits/State/selectedCategoriesSlice';
import { AppDispatch, RootState } from "../../utilits/State/store";
import ArticleCard from "../Articel/ArticelCard";
import { fetchArticles } from "../../utilits/State/productSlice";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.article.articles);
    const searchTerm: string = useSelector(selectSearchTerm);
    const categories: string[] = useSelector(selectSelectedCategories);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    useEffect(() => {
        console.log('Selected Categories:', categories);
    }, [categories]);

    const filteredProducts = products.filter((product) => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
        const isInSelectedCategory = categories.length === 0 || categories.includes(product.categoryId);
        return matchesSearchTerm && isInSelectedCategory;
    });


    // Debugging
    console.log('Products:', products);
    console.log('Search Term:', searchTerm);
    console.log('Filtered Products:', filteredProducts);

    return (
        <div>
            {filteredProducts.map((product) => (
                <ArticleCard key={product._id} article={product} />
            ))}
        </div>
    );
};

export default Home;
