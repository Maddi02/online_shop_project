import {useNavigate} from "react-router-dom";
import FormInput, {useFormInput} from "./FormInput.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import React, {useState} from "react";
import {loginUser} from "../../utilits/State/authSlice.ts";
import Popup from "../../utilits/ErrorMessage.tsx";

interface PopupState {
    show: boolean;
    message: string;
}

const SignIn = () => {
    const email = useFormInput('');
    const password = useFormInput('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const authState = useSelector((state: RootState) => state.auth);
    const [popup, setPopup] = useState<PopupState>({show: false, message: ''});

    const handleHomeNavigation = () => {
        navigate('/home');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({
            email: email.value,
            password: password.value
        }));
        console.log(authState.user);
    };

    React.useEffect(() => {
        if (authState.error) {
            setPopup({show: true, message: 'Wrong username or password!'});
        } else if (authState.user) {
            handleHomeNavigation()
        }

        // Hide popup after a delay
        const timer = setTimeout(() => setPopup({show: false, message: ''}), 3000);

        return () => clearTimeout(timer);
    }, [authState]);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div onClick={handleHomeNavigation}>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="src/assets/madiizne.png" // Replace with your logo url
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <FormInput id="email-address" type="email" placeholder="Email" {...email} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Email
                            </label>
                            <FormInput id="password" type="password" placeholder="Password" {...password} />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <div className="mt-2">
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create your Madiizne account
                        </a>
                    </div>
                </div>
            </div>
            <div>
                {popup.show && <Popup message={popup.message}/>}
            </div>
        </div>
    );
};

export default SignIn;
