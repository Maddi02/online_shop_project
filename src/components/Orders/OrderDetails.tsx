import {Order} from "../../utilits/State/orderSlice.ts";
import React from "react";

interface OrderDetailsProps {
    order : Order;
    unsetOrder: () => void
}

const OrderDetails: React.FC<OrderDetailsProps> = (currentOrder) => {
    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4 text-center">
                Order Details
            </h1>
            <div>
                <h2 className="text-xl font-semibold">{`Order #${currentOrder.order.orderNr}`}</h2>
                <p className="text-gray-500">
                    {new Date(currentOrder.order.orderDate).toLocaleDateString()}
                </p>
                {/* You can display other order details here */}
            </div>
            <button
                onClick={currentOrder.unsetOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all duration-300"
            >
                Go Back to Orders
            </button>
        </div>
    )
}

export default OrderDetails