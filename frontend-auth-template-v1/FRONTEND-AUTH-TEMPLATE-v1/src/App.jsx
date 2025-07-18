import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useAppContext } from "./contexts/appContext";
import { BounceLoader } from "react-spinners";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreateEvent } from "./pages/CreateEvent";
import { RegisterParticipant } from "./pages/RegisterParticipant";
import { Navbar } from "./components/navbar";

const App = () => {
    const { appLoading, user } = useAppContext();
    const { isAuthenticated } = user;

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
            <div className="min-h-screen">
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
            </div>
        </BrowserRouter>
    );
};

export default App;
