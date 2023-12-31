import {useEffect, useState} from "react";
import {fetchOrders, Order} from "../../utilits/State/orderSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import OrderDetails from "./OrderDetails.tsx";

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orderItems = useSelector((state: RootState) => state.order);
    const user = useSelector((state: RootState) => state.auth.user);
    const [userOrder, setUserOrder] = useState<Order[]>([]);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const navigate = useNavigate()

    const handleHomeNavigation = () => {
        navigate("/home")
    }
    
    const unsetCurrentOrder = () => {
        setCurrentOrder(undefined)
    }

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch, user]);

    useEffect(() => {
        const filteredItem = orderItems.orders.filter(
            (order) => order.userId === user?._id
        );
        setUserOrder(filteredItem);
    }, [orderItems, user]);

    return <div className="bg-gray-100 min-h-screen py-6">
        <button
            onClick={handleHomeNavigation}
            className="text-white font-bold py-2 px-4 rounded">
            <BsArrowLeft className="text-black">Back</BsArrowLeft>
        </button>
        {currentOrder ? <OrderDetails order={currentOrder} unsetOrder={unsetCurrentOrder}></OrderDetails>: <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">Your Orders</h1>
            {userOrder.length === 0 ? (
                <p className="text-gray-500 text-center">No orders found.</p>
            ) : (
                <ul>
                    {userOrder.map((order) => (
                        <li
                            key={order._id}
                            className="border p-4 mb-4 rounded-lg hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{`Order #${order.orderNr}`}</h2>
                                    <p className="text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">{order.articles.length} Items</span>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
                                        onClick={() => setCurrentOrder(order)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        }
            </div>
}

export default Orders;
