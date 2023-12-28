import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {useEffect} from "react";
import {Article, fetchArticles} from "../../utilits/State/productSlice.ts";
import ArticelCard from "../Articel/ArticelCard.tsx";


const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products: Article[] = useSelector((state: RootState) => state.article.articles);

    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch]);

    console.log(products)
    return (
        <div>
            {products.map((product) => (
                <ArticelCard article={product}></ArticelCard>
            ))}
        </div>
    );
};

export default Home;
