import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectSearchTerm} from '../../utilits/State/searchSlice';
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import ArticleCard from "../Articel/ArticelCard.tsx";
import {fetchArticles} from "../../utilits/State/productSlice.ts";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.article.articles);
    const searchTerm: string = useSelector(selectSearchTerm); // Selector from the search slice

    console.log(searchTerm)
    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const filteredProducts = searchTerm.length === 1
        ? products
        : products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Debugging
    console.log('Products:', products);
    console.log('Search Term:', searchTerm);
    console.log('Filtered Products:', filteredProducts);

    return (
        <div>
            {filteredProducts.map((product) => (
                <ArticleCard key={product._id} article={product}/>
            ))}
        </div>
    );
};

export default Home;
