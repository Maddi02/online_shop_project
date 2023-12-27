import  { useState } from 'react';
import Sidebar, { SidebarItem } from "./HamburgerSideBar";
import AddNewProduct from "./AddNewProduct.tsx";
import AddNewCategorie from "./AddNewCategorie.tsx";
import AddNewSubCategorie from "./AddNewSubCategorie.tsx";
import { FaProductHunt } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { FaStream } from "react-icons/fa";
const AdminPage = () => {
    const [content, setContent] = useState('form');

    const showSignIn = () => {
        setContent('newproduct');
    };

    const showUserProfile = () => {
        setContent('newcategorie');
    };

    const showForm = () => {
        setContent('newsubcategorie');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar>
                <SidebarItem icon={<FaProductHunt size="20"/>} text="Add new Product" onClick={showSignIn} alert={false} />
                <SidebarItem icon={<FaServer size="20"/>} text="Add new Categorie" onClick={showUserProfile} alert={false} />
                <SidebarItem icon={<FaStream size="20"/>} text="Add new Subcategorie" onClick={showForm} alert={false} />
            </Sidebar>

            <div className="flex-grow ">
                {content === 'newproduct' && <AddNewProduct />}
                {content === 'newcategorie' && <AddNewCategorie />}
                {content === 'newsubcategorie' &&<AddNewSubCategorie/>}
            </div>
        </div>
    );
};

export default AdminPage;
