import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {logoutUser} from "../../utilits/State/authSlice.ts";
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const logout= () => {
        console.log("Wanna lock out ")
        dispatch(logoutUser())
        if (authState.loading) {
            return <div>Loading...</div>;
        }
        if (authState.error) {
            return <div>Error: {authState.error}</div>;
        }
        
        if(authState.status == "succeeded"){
           navigate('/home');
        }
    }


    return (
        <div className="flex-row">
            Usr Profile {authState.user?.firstname}
            <button onClick={logout}>Logout</button>
        </div>

    )
}

export default UserProfile