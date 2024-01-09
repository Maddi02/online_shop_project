import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {User, logoutUser} from "../../utilits/State/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {useMemo} from "react";

const UserProfile = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const user: User | null = useMemo(() => authState.user, [authState.user]);

    const logout = async () => {
        await dispatch(logoutUser())
        if (authState.loading) {
            return <div>Loading...</div>;
        }
        if (authState.error) {
            return <div>Error: {authState.error}</div>;
        }
        if (authState.status === "succeeded") {
            navigate('/home');
        }
    }

    const handelAdminPage = () => {
        navigate('/adminPage');
    }

    const handleHomeNavigation = () => {
        navigate('/home');
    };

    return (
        <div className="flex flex-col items-center pt-20 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg border shadow-lg p-12">
                <div onClick={handleHomeNavigation}>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="src/assets/madiizne.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-xl font-extrabold text-gray-900">
                        User Profile
                    </h2>
                </div>
                <div className="mt-4 ">
                    <p className="font-bold text-sm">Full Name: <span
                        className="font-normal text-sm">{user ? user.firstname : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">Last Name: <span
                        className="font-normal text-sm">{user ? user.lastname : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">City: <span
                        className="font-normal text-sm">{user ? user.city : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">Email: <span
                        className="font-normal text-sm">{user ? user.email : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">Country: <span
                        className="font-normal text-sm">{user ? user.country : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">Street: <span
                        className="font-normal text-sm">{user ? user.street : "Loading..."}</span></p>
                    <p className="font-bold text-sm mt-2">Postcode: <span
                        className="font-normal text-sm">{user ? user.postcode : "Loading..."}</span></p>
                    <button onClick={logout}
                            className="mt-5 w-full text-white p-2 rounded text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Logout
                    </button>
                    {user?.email === "martin.hummel02@icloud.com" &&
                        <button onClick={handelAdminPage}
                                className="mt-5 w-full text-white p-2 rounded text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Add new Product
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile;