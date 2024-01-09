import {Order} from "../../utilits/State/orderSlice.ts";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {Article, fetchArticles} from "../../utilits/State/productSlice.ts";
import ReviewComponent from "./ReviewComponent.tsx";

interface OrderDetailsProps {
    order: Order;
    unsetOrder: () => void
}

const OrderDetails: React.FC<OrderDetailsProps> = (currentOrder) => {
    const dispatch = useDispatch<AppDispatch>();
    const articles = useSelector((state: RootState) => state.article.articles);
    const [filteredProducts, setFilteredProducts] = useState<Article[]>([])
    const [endProducts, setEndProducts] = useState<Article[]>([])
    const [total, setTotal] = useState(0);
    const [showCommentField, setCommentField] = useState(false)


    useEffect(() => {
        const sum = filteredProducts.reduce((acc, article) => acc + article.price * (article.quantity || 1), 0);
        setTotal(sum);
    }, [filteredProducts]);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const newFilteredProducts = useMemo(() => {
        return currentOrder.order.articles.filter(article =>
            currentOrder.order.articles.some(articleId => article._id === articleId._id)
        );
    }, [currentOrder.order.articles]);

    const endProduct = useMemo(() => {
        return articles.filter(article =>
            newFilteredProducts.some((purchase) => purchase.articleId === article._id)
        );
    }, [articles, newFilteredProducts]);

    useEffect(() => {
        setFilteredProducts(newFilteredProducts)
        console.log(newFilteredProducts)
        setEndProducts(endProduct)
        console.log(endProduct)
    }, [endProduct, newFilteredProducts]);

    const handleCommentField = (state: boolean) => {
        setCommentField(state)
    }

    console.log(endProduct)

    console.log(filteredProducts, "Filtered")
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">Order Details</h1>
            <div>
                <h2 className="text-xl font-semibold">{`Order #${currentOrder.order.orderNr}`}</h2>
                <p className="text-gray-500">{new Date(currentOrder.order.orderDate).toLocaleDateString()}</p>
                <ul>
                    {endProducts.map((article) => (
                        <li key={article._id} className="flex flex-wrap md:flex-nowrap items-center mb-4">
                            <div className="flex items-center mb-4 md:mb-4 md:mr-4">
                                <img src={article.href} alt={article.name}
                                     className="w-12 h-12 mr-4"/>
                                <div>
                                    <p><strong>Name:</strong> {article.name}</p>
                                    <p>
                                        <strong>Quantity:</strong> {filteredProducts.find(item => item.articleId === article._id)?.quantity}
                                    </p>
                                    <p><strong>Price:</strong> {article.price}$</p>
                                    {!showCommentField && (
                                        <button className="text-blue-800" onClick={() => handleCommentField(true)}>Write
                                            a review</button>
                                    )}
                                </div>

                            </div>
                            {showCommentField && (
                                <ReviewComponent handelReviewfield={handleCommentField} article={article}/>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-xl font-semibold mt-4">
                <p>Total Sum: {total.toFixed(2)}$</p>
            </div>
            <button
                onClick={currentOrder.unsetOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all duration-300"
            >
                Go Back to Orders
            </button>
        </div>
    );

}

export default OrderDetails