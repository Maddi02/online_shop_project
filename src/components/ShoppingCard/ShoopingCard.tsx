import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../utilits/State/store';
import {removeFromCart, updateQuantity} from '../../utilits/State/cardSlice.ts'; // Import the action for updating quantity

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.card.items);

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        dispatch(updateQuantity({_id: itemId, quantity: newQuantity}));
    };

    const handleRemoveItem = (itemId: string) => {
        dispatch(removeFromCart(itemId));
    };

    const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item._id} className="flex items-center justify-between border-b border-gray-200 py-4">
                            <div className="flex items-center">
                                <img src={item.href} alt={item.name} className="h-20 w-20 object-cover rounded mr-4"/>
                                <div>
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-gray-500">€{item.price.toFixed(2)}</p>
                                    <div className="flex items-center">
                                        <label htmlFor={`quantity-${item._id}`}
                                               className="text-sm text-gray-600 mr-2">Qty:</label>
                                        <input
                                            type="number"
                                            id={`quantity-${item._id}`}
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                            className="w-20 border border-gray-300 rounded p-1 text-center"
                                            min="1"
                                            max={item.quantity}
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
                        <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
