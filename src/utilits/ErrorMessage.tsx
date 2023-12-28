interface PopupProps {
  message: string;
}

export interface PopupState {
    show: boolean;
    message: string;
}
const Popup = ({ message }: PopupProps) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 border border-gray-400 shadow-lg rounded-md">
      {message}
    </div>
  );
}
export default Popup
