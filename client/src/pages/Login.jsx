import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const isValid = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({ ...SummaryApi.login, data });
            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }
            
            toast.success(response.data.message);
            localStorage.setItem('accesstoken', response.data.data.accesstoken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);

            const userDetails = await fetchUserDetails();
            dispatch(setUserDetails(userDetails.data));

            setData({ email: "", password: "" });
            navigate("/");
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
                <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>Login</h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
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
                        <Link to='/forgot-password' className='text-sm text-green-600 hover:underline mt-1 block text-right'>Forgot password?</Link>
                    </div>
                    <button
                        disabled={!isValid}
                        className={`w-full text-white py-2 rounded-md font-semibold transition-all duration-200 ${isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        Login
                    </button>
                </form>
                <p className='text-center text-gray-600 mt-4'>
                    Don't have an account? <Link to='/register' className='text-green-600 hover:underline font-medium'>Register</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;