import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (isOtpSent) {
            try {
                if (!email || !password || !otp) {
                    ErrorToast("Email, password & otp are required!");
                    return;
                }

                const dataObj = {
                    email,
                    password,
                    otp,
                };

                const result = await axiosInstance.post("/auth/signup", dataObj);

                if (result.status === 201) {
                    SuccessToast(result.data.message);
                    navigate("/login");
                } else {
                    ErrorToast(result.data.message);
                }
            } catch (err) {
                ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
            }
        } else {
            ErrorToast(`Cannot signup before sending otp`);
        }
    };

    const handleSendOtp = async () => {
        try {
            const resp = await axiosInstance.post("/auth/send-otp", {
                email,
            });
            if (resp.data.isSuccess) {
                SuccessToast(resp.data.message);
                setIsOtpSent(true);
            } else {
                SuccessToast(resp.data.message);
            }
        } catch (err) {
            console.log(err);
            ErrorToast(`Cannot send otp: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-purple-400 rounded-full animate-float opacity-20"></div>
            <div className="absolute bottom-20 left-20 w-28 h-28 bg-pink-400 rounded-full animate-float opacity-20" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-300 rounded-full animate-float opacity-30" style={{animationDelay: '3s'}}></div>
            
            <div className="card p-8 w-full max-w-md animate-fade-in-up relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                        <span className="text-2xl text-white">🚀</span>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Join EventVault
                    </h1>
                    <p className="text-gray-600 mt-2">Create your account to get started</p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2" htmlFor="user-email">
                            Email Address
                        </label>
                        <input
                            id="user-email"
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    {isOtpSent && (
                        <>
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium mb-2" htmlFor="user-otp">
                                    OTP Code
                                </label>
                                <input
                                    id="user-otp"
                                    type="text"
                                    name="otp"
                                    required
                                    className="input-field"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-medium mb-2" htmlFor="user-password">
                                    Password
                                </label>
                                <input
                                    id="user-password"
                                    type="password"
                                    name="password"
                                    required
                                    className="input-field"
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="flex flex-col gap-4">
                        {isOtpSent ? (
                            <button
                                className="btn-primary w-full"
                                onClick={handleRegister}
                            >
                                Create Account
                            </button>
                        ) : (
                            <button
                                onClick={handleSendOtp}
                                className="btn-primary w-full"
                            >
                                Send OTP
                            </button>
                        )}
                        
                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700 underline hover:no-underline transition-all duration-300">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SignupPage };
