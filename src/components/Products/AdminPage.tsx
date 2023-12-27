import  { useState } from 'react';
import Sidebar, { SidebarItem } from "./HamburgerSideBar";
import { LuUndo2 } from "react-icons/lu"; // Make sure to replace with your actual icon import
import AddNewProduct from "./AddNewProduct.tsx";
import AddNewCategorie from "./AddNewCategorie.tsx";
import AddNewSubCategorie from "./AddNewSubCategorie.tsx"; // Make sure this import is correct

const AdminPage = () => {
    const [content, setContent] = useState('form'); // 'form', 'signin', or 'userprofile'

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
                <SidebarItem icon={<LuUndo2 size="20"/>} text="Add new Product" onClick={showSignIn} alert={false} />
                <SidebarItem icon={<LuUndo2 size="20"/>} text="Add new Categorie" onClick={showUserProfile} alert={false} />
                <SidebarItem icon={<LuUndo2 size="20"/>} text="Add new Subcategorie" onClick={showForm} alert={false} />
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
