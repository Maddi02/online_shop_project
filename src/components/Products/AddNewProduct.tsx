import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import React, {useEffect, useState} from "react";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";
import axiosInstance from "../../api/axios.ts";
import Popup, {PopupState} from "../../utilits/ErrorMessage.tsx";

const AddNewProduct = () => {

    const dispatch = useDispatch<AppDispatch>();
    const categorie = useSelector((state: RootState) => state.categories.categories);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [selectedCategorie, setSelectedCategory] = useState<string>();
    const [href, setHref] = useState('');
    const [quantity, setQuantity] = useState<number>();
    const [rating, setRating] = useState<number>();
    const [shortDescription, setShortDescription] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [popup, setPopup] = useState<PopupState>({show: false, message: ''});

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCategory(value)
    };
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    }

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number(e.target.value);
        if (!isNaN(newQuantity)) {
            setRating(newQuantity);
        }
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         await axiosInstance.post('/shop/article', {
                name: productName,
                price: productPrice,
                categoryId: selectedCategorie,
                href: href,
                quantity: quantity,
                rating: rating,
                shortdescription: shortDescription,
                description: description
            }, {
                withCredentials: true
            })
                .then(response => {
                    console.log('Category created:', response.data);
                    setPopup({show: true, message: 'Creation Successful'});
                })
                .catch(error => {
                    setPopup({show: true, message: error.message});
                    console.error('Error creating category:', error);
                });
    }
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
                            Categorie
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorieName">
                                Categorie Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="productName"
                                type="text"
                                placeholder="Product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                                Product Price
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="productPrice"
                                type="text"
                                placeholder="Product price"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorieName">
                            Select your Categorie
                        </label>

                        <select className="form-select bg-gray-200 mb-2" value={selectedCategorie}
                                onChange={handleSelectChange}>
                            {categorie.map(category => (
                                <option key={category.id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="href">
                                Link to Picture
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="href"
                                type="text"
                                placeholder="Link to Picture"
                                value={href}
                                onChange={(e) => setHref(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity"
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(e)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                                Rating
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="rating"
                                type="number"
                                placeholder="Rating"
                                value={rating}
                                onChange={(e) => handleRatingChange(e)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortdescription">
                                Short Description
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="shortdescription"
                                type="text"
                                placeholder="Short Description"
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
}
export default AddNewProduct