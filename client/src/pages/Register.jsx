import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = "";
        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
                strength = "Strong";
            } else if (/[A-Z]/.test(password) || /\d/.test(password) || /[@$!%*?&]/.test(password)) {
                strength = "Medium";
            } else {
                strength = "Weak";
            }
        } else {
            strength = "Weak";
        }
        setPasswordStrength(strength);
    };

    const isValid = Object.values(data).every((el) => el) && agreedToTerms && passwordStrength !== "Weak";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordStrength === "Weak") {
            setPasswordError("Password is too weak! Use at least 8 characters with an uppercase letter, a number, and a symbol.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be the same");
            return;
        }

        if (!agreedToTerms) {
            toast.error("You must agree to the Terms & Conditions.");
            return;
        }

        try {
            const response = await Axios({ ...SummaryApi.register, data });
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }

            toast.success(response.data.message);
            setData({ name: "", email: "", password: "", confirmPassword: "" });
            navigate("/login");
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
                <h2 className='text-2xl font-semibold text-gray-800 text-center mb-3'>
                    🚀 Join Binkeyit – Get Anything Delivered in 10 Minutes!
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Groceries, snacks, essentials—delivered at **Binkeyit speed**! Sign up now and experience instant convenience.
                </p>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name' className='block text-gray-700 font-medium'>Name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={data.name}
                            onChange={handleChange}
                            className='w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none'
                            placeholder='Enter your name'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            className='w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none'
                            placeholder='Enter your email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='block text-gray-700 font-medium'>Password:</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                className='w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none'
                                placeholder='Enter your password'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-3 top-3 text-gray-500 hover:text-gray-700'
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                        {/* Password Strength Meter */}
                        {data.password && (
                            <p className={`mt-1 text-sm font-medium ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                                Strength: {passwordStrength}
                            </p>
                        )}
                        {/* Show password error */}
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <div>
                        <label htmlFor='confirmPassword' className='block text-gray-700 font-medium'>Confirm Password:</label>
                        <div className='relative'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                className='w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none'
                                placeholder='Confirm your password'
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute right-3 top-3 text-gray-500 hover:text-gray-700'
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="terms" className="text-gray-600 text-sm">
                            I agree to the <Link to="/terms" className="text-green-600 hover:underline">Terms & Conditions</Link>
                        </label>
                    </div>

                    <button
                        disabled={!isValid}
                        className={`w-full text-white py-2 rounded-md font-semibold transition-all duration-200 ${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Register
                    </button>
                </form>
                <p className='text-center text-gray-600 mt-4'>
                    Already have an account? <Link to='/login' className='text-green-600 hover:underline font-medium'>Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
