interface PayPalPopUpProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const PayPalPopUp: React.FC<PayPalPopUpProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                {children}
                <div className="text-right mt-4">
                    <button
                        onClick={onClose}
                        className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PayPalPopUp;
