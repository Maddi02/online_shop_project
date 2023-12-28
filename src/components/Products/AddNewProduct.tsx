import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {useEffect} from "react";
import {fetchCategories} from "../../utilits/State/categorieSlice.ts";

const AddNewProduct = () => {

    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.categories.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    console.log(categories)

    return (
        <div className="h-screen flex  bg-gray-100 sm:px-6 lg:px-8">
            <div className="w-screen h-screen py-12 ">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="src/assets/madiizne.png" // Replace with your logo url
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                        Add a new Product
                    </h2>
                </div>
            </div>
        </div>
    )
}
export default AddNewProduct