import React from 'react';
import { useForm } from "react-hook-form";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider';
import { motion } from 'framer-motion'; // For animations

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const { fetchAddress } = useGlobalContext();

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    mobile: data.mobile
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                reset();
                fetchAddress();
                if (close) close();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white p-6 w-full max-w-lg rounded-lg shadow-lg relative"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Add Address</h2>
                    <button onClick={close} className="text-gray-500 hover:text-red-500 transition">
                        <IoClose size={25} />
                    </button>
                </div>

                {/* Form */}
                <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Address Line */}
                    <div>
                        <label htmlFor="addressline" className="font-medium text-gray-600">Address Line:</label>
                        <input
                            type="text"
                            id="addressline"
                            className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                            {...register("addressline", { required: "Address is required" })}
                        />
                        {errors.addressline && <p className="text-red-500 text-sm">{errors.addressline.message}</p>}
                    </div>

                    {/* City & State (Side by Side) */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="city" className="font-medium text-gray-600">City:</label>
                            <input
                                type="text"
                                id="city"
                                className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                                {...register("city", { required: "City is required" })}
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="state" className="font-medium text-gray-600">State:</label>
                            <input
                                type="text"
                                id="state"
                                className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                                {...register("state", { required: "State is required" })}
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </div>
                    </div>

                    {/* Pincode & Country (Side by Side) */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="pincode" className="font-medium text-gray-600">Pincode:</label>
                            <input
                                type="text"
                                id="pincode"
                                className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                                {...register("pincode", { 
                                    required: "Pincode is required", 
                                    pattern: { value: /^[0-9]{6}$/, message: "Invalid Pincode" } 
                                })}
                            />
                            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="country" className="font-medium text-gray-600">Country:</label>
                            <input
                                type="text"
                                id="country"
                                className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                                {...register("country", { required: "Country is required" })}
                            />
                            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                        </div>
                    </div>

                    {/* Mobile No */}
                    <div>
                        <label htmlFor="mobile" className="font-medium text-gray-600">Mobile No.:</label>
                        <input
                            type="text"
                            id="mobile"
                            className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-400"
                            {...register("mobile", { 
                                required: "Mobile number is required", 
                                pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number" } 
                            })}
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full py-2 rounded font-semibold transition flex items-center justify-center gap-2 
                            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : "Submit"}
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default AddAddress;
