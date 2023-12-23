import SideBarIcon from "./SideBarIcon.tsx";
import {LuShoppingCart} from "react-icons/lu";
import {LuUndo2} from "react-icons/lu";
import {BsFillPersonFill} from "react-icons/bs";
import {MdLocationOn} from "react-icons/md";
import Searchbar from "./Searchbar.tsx";
import CategorieBar from "../CategorieBar/CategorieBar.tsx";

const SideBar = () => {
    return (
        <>
            <div
                className="fixed top-0 left-0 w-screen m-0 flex flex-col  md:justify-start  bg-sidebar text-white shadow-lg">
                <div className="w-full flex flex-col md:flex-row justify-start items-center">
                    <span className="font-bold text-xl ml-4 mb-2 md:mb-0">Maddizone</span>
                    <div className="flex-grow mb-2 md:mb-0 md:ml-4">
                        <Searchbar></Searchbar>
                    </div>
                    <div className="flex flex-row justify-around w-full md:w-auto">
                        <SideBarIcon icon={<MdLocationOn size="20"/>} text={"Delivery Address"}/>
                        <SideBarIcon icon={<BsFillPersonFill size="20"/>} text={"Login"}/>
                        <SideBarIcon icon={<LuUndo2 size="20"/>} text={"Orders"}/>
                        <SideBarIcon icon={<LuShoppingCart size="20"/>} text={"Shopping Card"}/>
                    </div>
                </div>
                <div className="bg-category w-full">
                    <CategorieBar></CategorieBar>
                </div>
            </div>


        </>

    )
}

export default SideBar