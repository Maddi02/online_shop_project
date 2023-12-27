import {useNavigate} from "react-router-dom";
import FormInput, {useFormInput} from "./FormInput.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../utilits/State/store.ts";
import {registerUser} from "../../utilits/State/authSlice.js";
import Popup from "../../utilits/ErrorMessage.tsx";
import React, {useState} from "react";


interface PopupState {
    show: boolean;
    message: string;
}


const Register = () => {
        const [popup, setPopup] = useState<PopupState>({show: false, message: ''});
        const dispatch = useDispatch<AppDispatch>()
        const authState = useSelector((state: RootState) => state.auth);
        const navigate = useNavigate();
        const email = useFormInput('');
        const password = useFormInput('');
        const firstName = useFormInput('');
        const lastName = useFormInput('');
        const street = useFormInput('');
        const postcode = useFormInput('');
        const city = useFormInput('');
        const country = useFormInput('');
        const phone = useFormInput('');


        const handleHomeNavigation = () => {
            navigate('/home');
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(registerUser({
                email: email.value,
                password: password.value,
                firstname: firstName.value,
                lastname: lastName.value,
                street: street.value,
                postcode: postcode.value,
                city: city.value,
                country: country.value,
                phone: phone.value,
                role: 'USER'
            }))

        };

        React.useEffect(() => {
            if (authState.error) {
                setPopup({show: true, message: 'Registration failed: ' + authState.error});
            } else if (authState.user) {
                setPopup({show: true, message: 'Registration successful! \n Redirecting to Home Page'});
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
                            Register
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <FormInput id="firstName" type="text" placeholder="First-Name" {...firstName} />
                            </div>
                            <div>
                                <FormInput id="lastName" type="text" placeholder="Last-Name" {...lastName} />
                            </div>
                            <div>
                                <FormInput id="street" type="text" placeholder="Street" {...street} />
                            </div>
                            <div>
                                <FormInput id="postcode" type="number" placeholder="Postcode" {...postcode} />
                            </div>
                            <div>
                                <FormInput id="city" type="text" placeholder="City" {...city} />
                            </div>
                            <div>
                                <FormInput id="country" type="text" placeholder="Country" {...country} />
                            </div>
                            <div>
                                <FormInput id="phone" type="tel" placeholder="Phone" {...phone} />
                            </div>
                            <div>
                                <FormInput id="email" type="email" placeholder="Email" {...email} />
                            </div>
                            <div>
                                <FormInput id="password" type="password" placeholder="Password" {...password} />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                Register
                            </button>
                        </div>

                        <div>
                            {popup.show && <Popup message={popup.message}/>}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;

export default Register;
