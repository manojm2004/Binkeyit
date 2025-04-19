import React, { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((prev) => ({ ...prev, email: location?.state?.email }))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))

        if (name === "newPassword") {
            checkPasswordStrength(value)
        }
    }

    const checkPasswordStrength = (password) => {
        let strength = ""
        if (password.length >= 8) {
            if (/[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
                strength = "Strong"
            } else if (/[A-Z]/.test(password) || /\d/.test(password) || /[@$!%*?&]/.test(password)) {
                strength = "Medium"
            } else {
                strength = "Weak"
            }
        } else {
            strength = "Weak"
        }
        setPasswordStrength(strength)
    }

    const isValid = Object.values(data).every(el => el) && passwordStrength !== "Weak"

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordStrength === "Weak") {
            setPasswordError("Password is too weak! Use at least 8 characters with an uppercase letter, a number, and a symbol.")
            return
        }

        if (data.newPassword !== data.confirmPassword) {
            toast.error("New password and confirm password must be the same.")
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
                return
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({ email: "", newPassword: "", confirmPassword: "" })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
            <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
                <h2 className='text-2xl font-semibold text-center text-gray-800 mb-4'>Reset Your Password</h2>
                <p className="text-gray-600 text-center mb-6">Enter a strong new password to secure your account.</p>

                <form className='grid gap-5' onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div className='relative'>
                        <label className='block font-medium text-gray-700'>New Password</label>
                        <div className='relative mt-1'>
                            <input
                                type={showPassword ? "text" : "password"}
                                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                name='newPassword'
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder='Enter new password'
                            />
                            <div
                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>

                        {/* Password Strength Indicator */}
                        {data.newPassword && (
                            <p className={`mt-2 text-sm font-medium ${
                                passwordStrength === "Weak" ? "text-red-500" :
                                passwordStrength === "Medium" ? "text-yellow-500" :
                                "text-green-500"
                            }`}>
                                Strength: {passwordStrength}
                            </p>
                        )}
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className='relative'>
                        <label className='block font-medium text-gray-700'>Confirm Password</label>
                        <div className='relative mt-1'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm new password'
                            />
                            <div
                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!isValid}
                        className={`w-full p-3 font-semibold text-white rounded-lg transition ${
                            isValid ? "bg-green-700 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Change Password
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account? 
                    <Link to={"/login"} className='text-green-700 hover:text-green-800 font-semibold ml-1'>Login</Link>
                </p>
            </div>
        </section>
    )
}

export default ResetPassword
