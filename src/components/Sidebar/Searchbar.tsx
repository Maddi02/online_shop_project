import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdSearch } from "react-icons/md";
import { setSearchTerm } from "../../utilits/State/searchSlice";

const Searchbar = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setSearchTerm(input));
    };

    return (
        <>
            <form className="flex" onSubmit={handleSubmit}>
                <label htmlFor="search" className="sr-only">Search Amazon.de</label>
                <div className="relative flex items-stretch flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdSearch size="20" color="black"/>
                    </div>
                    <input
                        type="search"
                        id="search"
                        value={input} // Controlled component
                        onChange={handleInputChange} // Update local state on change
                        className="block w-full pl-10 pr-20 text-sm border-none rounded-l-lg focus:ring-0 text-gray-600"
                        placeholder="Search your favorite product"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 text-white bg-yellow-600  border-l-2 border-yellow-600 hover:bg-yellow-700 focus:ring-0 focus:border-yellow-700">
                        Search
                    </button>
                </div>
            </form>
        </>
    );
}

export default Searchbar;
