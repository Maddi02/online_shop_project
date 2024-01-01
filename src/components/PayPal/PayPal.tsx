import React from 'react';
import {
    PayPalButtons,
    usePayPalScriptReducer,
    PayPalButtonsComponentProps
} from "@paypal/react-paypal-js";

interface PayPalProps {
    totalPrice: number;
    onPaymentSuccess: () => void;
}

const PayPal: React.FC<PayPalProps> = ({ totalPrice , onPaymentSuccess}) => {
    const createOrder: PayPalButtonsComponentProps['createOrder'] = (_data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice.toString()
                    }
                }
            ]
        });
    };

    const onApprove: PayPalButtonsComponentProps['onApprove'] = () => {
        console.log("Finished successfully");
       onPaymentSuccess()
        return Promise.resolve();
    };

    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <div className="flex flex-col items-center justify-center">
            {isPending && <div className="spinner" />}
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    );
};

export default PayPal;
