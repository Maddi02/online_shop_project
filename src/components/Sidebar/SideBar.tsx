import SideBarIcon from "./SideBarIcon.tsx";
import {LuShoppingCart} from "react-icons/lu";
import {LuUndo2} from "react-icons/lu";
import {BsFillPersonFill} from "react-icons/bs";
import {MdLocationOn} from "react-icons/md";
import Searchbar from "./Searchbar.tsx";
import CategorieBar from "../CategorieBar/CategorieBar.tsx";
import LocationComponent from "../Directory/LocationComponent.tsx";
import {useNavigate} from "react-router-dom";

const SideBar = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleOrdersClick = () => {
        navigate('/orders');
    };

    const handelHomeClick = () => {
        navigate('/home')
    };

    const handleShoppingCartClick = () => {
        navigate('/cart');
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 w-screen m-0 flex flex-col  md:justify-start  bg-sidebar text-white shadow-lg">
                <div className="w-full flex flex-col md:flex-row justify-start items-center">
                    <div className="flex items-center" onClick={handelHomeClick}>
                        <span className="font-bold text-xl ml-4 mr-2">Maddizone</span>
                        <img className="rounded-full w-12 h-12" src="src/assets/madiizne.png" alt="Maddizone Logo"/>
                    </div>

                    <div className="flex-grow mb-2 md:mb-0 md:ml-4">
                        <Searchbar></Searchbar>
                    </div>
                    <div className="flex flex-row justify-around w-full md:w-auto">

                        <SideBarIcon icon={<BsFillPersonFill size="20"/>} text={"Login"} onClick={handleLoginClick}/>
                        <SideBarIcon icon={<LuUndo2 size="20"/>} text={"Orders"} onClick={handleOrdersClick}/>
                        <SideBarIcon icon={<LuShoppingCart size="20"/>} text={"Shopping Card"}
                                     onClick={handleShoppingCartClick}/>
                    </div>
                </div>
                <div className="bg-category w-full">
                    <CategorieBar></CategorieBar>
                </div>
                <div className="flex items-center">
                    <SideBarIcon icon={<MdLocationOn size="20"/>} text="Delivery Address"/>
                    <LocationComponent/>
                </div>

            </div>


        </>

    )
}

export default SideBar