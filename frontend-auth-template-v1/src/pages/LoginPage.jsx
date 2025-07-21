import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (!email || !password) {
                ErrorToast("Email & password are required!");
                return;
            }

            const dataObj = { email, password };
            const result = await axiosInstance.post("/auth/login", dataObj);

            if (result.status === 200) {
                SuccessToast(result.data.message);
                window.open("/", "_self");
            } else {
                ErrorToast(result.data.message);
            }
        } catch (err) {
            ErrorToast(`Cannot login: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full animate-float opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-400 rounded-full animate-float opacity-20" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300 rounded-full animate-float opacity-30" style={{animationDelay: '2s'}}></div>
            
            <div className="card p-8 w-full max-w-md animate-fade-in-up relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                        <span className="text-2xl text-white">🎯</span>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 mt-2">Sign in to your EventVault account</p>
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

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-2" htmlFor="user-password">
                            Password
                        </label>
                        <input
                            id="user-password"
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        className="btn-primary w-full"
                        onClick={handleRegister}
                    >
                        Sign In
                    </button>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 underline hover:no-underline transition-all duration-300">
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LoginPage };
