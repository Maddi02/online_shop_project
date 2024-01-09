import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import React, {useEffect, useState} from "react";
import {fetchSubcategories} from "../../utilits/State/subCategorieSlice.ts";
import Popup, {PopupState} from "../../utilits/ErrorMessage.tsx";
import axiosInstance from "../../api/axios.ts";

const AddNewCategorie = () => {
        const [categorieName, setCategorieName] = useState('');
        const [selectedSubcategorie, setSelectedSubcategory] = useState<string[]>([]);
         const [popup, setPopup] = useState<PopupState>({show: false, message: ''});
        const dispatch = useDispatch<AppDispatch>();
        const subcategories = useSelector((state: RootState) => state.subcategories.subcategories);

        useEffect(() => {
            dispatch(fetchSubcategories());
        }, [dispatch]);



        const handleSubCategrieSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedSubcategory(prevSelected => {
                if (prevSelected.includes(value)) {
                    return prevSelected.filter(item => item !== value);
                } else {
                    return [...prevSelected, value];
                }
            });
        };

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await axiosInstance.post('/shop/category', {
                name: categorieName,
                subcategoryIds: selectedSubcategorie
            }, {
                withCredentials: true
            })
                .then(() => {
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
                            src="src/assets/madiizne.png"
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
                                id="categorieName"
                                type="text"
                                placeholder="Categorie name"
                                value={categorieName}
                                onChange={(e) => setCategorieName(e.target.value)}
                            />
                        </div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorieName">
                            Select your Subcategie
                        </label>

                        <select multiple className="form-select bg-gray-200 mb-2" value={selectedSubcategorie}
                                onChange={handleSubCategrieSelectChange}>
                            {subcategories.map(category => (
                                <option key={category.id} value={category._id} >
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
;

export default AddNewCategorie