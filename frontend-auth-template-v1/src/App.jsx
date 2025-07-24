import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAppContext } from "./contexts/appContext";
import { BounceLoader } from "react-spinners";

import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreateEvent } from "./pages/CreateEvent";
import { RegisterParticipant } from "./pages/RegisterParticipant";
import AdminPanelPage from "./pages/AdminPanelPage";

import { Navbar } from "./components/navbar";
import Loader from "./components/loader";

const AppRoutes = () => {
  const { user } = useAppContext();
  const { isAuthenticated = false, role = "user" } = user || {};
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location]);

  // ✅ Debug log
  console.log("User:", user);

  return (
    <>
      {routeLoading && <Loader />}
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

            {/* ✅ Admin route */}
            <Route
              path="/admin"
              element={
                role === "admin" ? (
                  <AdminPanelPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

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
        <BounceLoader size={175} color="#2020ff" />
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
