import {Order} from "../../utilits/State/orderSlice.ts";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {Article, fetchArticles} from "../../utilits/State/productSlice.ts";

interface OrderDetailsProps {
    order: Order;
    unsetOrder: () => void
}

const OrderDetails: React.FC<OrderDetailsProps> = (currentOrder) => {
    const dispatch = useDispatch<AppDispatch>();
    const articles = useSelector((state: RootState) => state.article.articles);
    const [filteredProducts, setFilteredProducts] = useState<Article[]>([])
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calculate the total sum
        const sum = filteredProducts.reduce((acc, article) => acc + article.price * (article.quantity || 1), 0);
        setTotal(sum);
    }, [filteredProducts]);
// Assuming currentOrder.order.articles is the array of article objects/IDs you want to fetch
    useEffect(() => {
        dispatch(fetchArticles());
        // This useEffect is meant to run only once when the component mounts
    }, [dispatch]);

    useEffect(() => {
        console.log("Current Order Articles:", currentOrder.order.articles);
        console.log("All Articles:", articles);
        console.log("All Articles:",  currentOrder.order._id);
        console.log("All Articles:",  currentOrder.order.articles);
const newFilteredProducts = currentOrder.order.articles.filter(article => {
    const isArticleInOrder = currentOrder.order.articles.some(articleId => {
        console.log(`Comparing article ID: ${article._id} with order article ID: ${articleId._id}`);
        return article._id === articleId._id;
    });

    console.log(`Article with ID: ${article._id} is in the order: ${isArticleInOrder}`);
    return isArticleInOrder;
});

        console.log("Filtered Products:", newFilteredProducts);
        setFilteredProducts(newFilteredProducts);
    }, [articles, currentOrder.order.articles]);


    console.log(filteredProducts, "Filtered")
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">Order Details</h1>
            <div>
                <h2 className="text-xl font-semibold">{`Order #${currentOrder.order.orderNr}`}</h2>
                <p className="text-gray-500">{new Date(currentOrder.order.orderDate).toLocaleDateString()}</p>
                <ul>
                    {filteredProducts.map((article) => (
                        <li key={article._id} className="flex items-center mb-4">
                            <img src={article.href} alt={article.name}
                                 style={{width: '50px', height: '50px', marginRight: '10px'}}/>
                            <div>
                                <p><strong>Name:</strong> {article.name}</p>
                                <p><strong>Quantity:</strong> {article.quantity}</p>
                                <p><strong>Price:</strong> {article.price}$</p>
                            </div>
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