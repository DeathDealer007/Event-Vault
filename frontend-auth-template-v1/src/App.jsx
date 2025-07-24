import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "./contexts/appContext";
import { BounceLoader } from "react-spinners";

import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreateEvent } from "./pages/CreateEvent";
import { RegisterParticipant } from "./pages/RegisterParticipant";

import { Navbar } from "./components/navbar";
import Loader from "./components/loader"; // ✅ your route transition loader

// 👇 Extracted AppRoutes to use inside BrowserRouter
const AppRoutes = () => {
    const { user } = useAppContext();
    const { isAuthenticated } = user;
    const location = useLocation();
    const [routeLoading, setRouteLoading] = useState(false);

    // ✅ Trigger loader on route change
    useEffect(() => {
        setRouteLoading(true);
        const timer = setTimeout(() => setRouteLoading(false), 400); // 400ms delay
        return () => clearTimeout(timer);
    }, [location]);

    return (
        <>
            {routeLoading && <Loader />} {/* Show loader on route transition */}
            <Navbar />
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create-event" element={<CreateEvent />} />
                        <Route path="/register-participant" element={<RegisterParticipant />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </>
                )}
            </Routes>
        </>
    );
};

const App = () => {
    const { appLoading } = useAppContext();

    if (appLoading) {
        return (
            <div className="min-h-[100vh] flex flex-col items-center justify-center gap-10 content-center">
                <BounceLoader size="175" color="#2020ff" />
                <div className="border-1 border-lime-800 p-8 rounded-lg text-center">
                    <p>Please note:</p>
                    <p>Backend is hosted on a free server.</p>
                    <p>It may take up to 2 minutes to warm up (for the first time)!</p>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
