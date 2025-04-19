import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password");
        }
        startResendTimer();
    }, []);

    const isValidOtp = otp.every((el) => el.trim() !== "");

    // Handle OTP Input Change
    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRef.current[index + 1]?.focus();
        }
    };

    // Handle Backspace to Move Focus
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    // Handle OTP Verification Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: otp.join(""),
                    email: location?.state?.email,
                },
            });

            if (response.data.error) {
                toast.error(response.data.message);
                return;
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setOtp(["", "", "", "", "", ""]);
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email,
                    },
                });
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    // Handle Resend OTP Functionality
    const handleResendOtp = async () => {
        setIsResendDisabled(true);
        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data: { email: location?.state?.email },
            });

            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success("New OTP sent to your email!");
                startResendTimer();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    // Start the countdown timer when Resend OTP is clicked
    const startResendTimer = () => {
        setTimer(30);
        setIsResendDisabled(true);

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(countdown);
                    setIsResendDisabled(false);
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <section className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
                    🔢 Enter the OTP Sent to Your Email
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    We sent a 6-digit code to your registered email. Please enter it below.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRef.current[index] = el)}
                                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none"
                            />
                        ))}
                    </div>
                    <button
                        disabled={!isValidOtp}
                        className={`w-full text-white py-2 rounded-md font-semibold transition-all duration-200 ${
                            isValidOtp ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Verify OTP
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Didn't receive an OTP?{" "}
                    <button
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                        className={`text-green-600 font-medium transition-all ${
                            isResendDisabled ? "cursor-not-allowed opacity-50" : "hover:underline"
                        }`}
                    >
                        {isResendDisabled ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>
                </p>
                <p className="text-center text-gray-600 mt-2">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-green-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default OtpVerification;
