import React, {useState} from 'react';
// Assuming you have Axios installed for HTTP requests
import axiosInstance from "../../api/axios.ts";
import Popup, {PopupState} from "../../utilits/ErrorMessage.tsx";


const AddNewSubCategory = () => {
    const [subCategoryName, setSubCategoryName] = useState('');
    const [popup, setPopup] = useState<PopupState>({show: false, message: ''});
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(event);
            const response = await axiosInstance.post('/shop/subcategory', {
                name: subCategoryName
            }, {
                withCredentials: true
            });
            setPopup({show: true, message: 'Creation Successful'});
            console.log(response.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setPopup({show: true, message: error.message});
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };


    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 px-6 pl-9">
            <div className="w-full max-w-md px-3">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="src/assets/madiizne.png" // Replace with your logo url
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                        Subcategory
                    </h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategoryName">
                            Subcategory Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="subcategoryName"
                            type="text"
                            placeholder="Subcategory name"
                            value={subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Subcategory
                        </button>
                    </div>
                </form>
                {popup.show && <Popup message={popup.message}/>}
            </div>
        </div>
    );
};

export default AddNewSubCategory;
