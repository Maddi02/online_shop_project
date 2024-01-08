import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../utilits/State/store';
import {clearCart, createOrder, removeFromCart, updateQuantity} from '../../utilits/State/cardSlice.ts';
import {BsArrowLeft} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import PayPal from "../PayPal/PayPal.tsx";
import {useState} from "react";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import PayPalPopUp from "../PayPal/PayPalPopUp.tsx";


const ShoppingCart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.card.items);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate()
    const [showPayPal, setShowPayPal] = useState<boolean>(false)
    console.log(cartItems)
    const handleHomeNavigation = () => {
        navigate("/home")
    }


    const handelCheckout = () => {
        if (user) {
            dispatch(createOrder(user)).then(() => {
                dispatch(clearCart())
            }).then(handleHomeNavigation)
        }
    };

    const showPopUp = () => {
        if (user) {
            setShowPayPal(true)
        } else {
            navigate("/login");
        }
    }

    const handleClosePayPal = () => {
        setShowPayPal(false);
    };

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        dispatch(updateQuantity({_id: itemId, quantity: newQuantity}));
    };

    const handleRemoveItem = (itemId: string) => {
        dispatch(removeFromCart(itemId));
    };

    const paypalOptions = {
        clientId: "AdRrJh9y0GuNWXX40TJall6_YKoozcvF1z5Ic3WMGwFoxvqMUlfbbbbGCkvK8nOSz4recs_WlwFFQ3xT",
        components: "buttons",
        currency: "EUR"
    };


    const totalSum = Array.isArray(cartItems)
        ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">

            <PayPalPopUp show={showPayPal} onClose={handleClosePayPal}>
                <div>Select your preferred Payment Methode </div>
                <PayPalScriptProvider options={paypalOptions}>
                    <PayPal totalPrice={totalSum} onPaymentSuccess={handelCheckout}/>
                </PayPalScriptProvider>
            </PayPalPopUp>
            <button
                onClick={handleHomeNavigation}
                className="text-white font-bold py-2 px-4 rounded">
                <BsArrowLeft className="text-black">Back</BsArrowLeft>
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (

                <ul>
                    {Array.isArray(cartItems) && cartItems.map((item) => (
                        <li key={item._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                            <div className="flex items-center">
                                <img src={item.href} alt={item.name} className="h-20 w-20 object-cover rounded mr-4"/>
                                <div>
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-gray-500">€{item.price.toFixed(2)}</p>
                                    <p className="text-gray-500">Available Quantity {item.maxQuantity}</p>
                                    <div className="flex items-center">
                                        <label htmlFor={`quantity-${item._id}`}
                                               className="text-sm text-gray-600 mr-2">Qty:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${item._id}`}
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                            onKeyDown={(e) => e.preventDefault()}    // prevent typing
                                            className="w-20 border border-gray-300 rounded p-1 text-center"
                                            min="1"
                                            max={item.maxQuantity}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                            Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {cartItems.length > 0 && (
                <div className="mt-6">
                    <div className="text-lg font-bold text-right mb-4">Total: €{totalSum.toFixed(2)}</div>
                    <div className="text-right">
                        <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
                                onClick={showPopUp}>Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
