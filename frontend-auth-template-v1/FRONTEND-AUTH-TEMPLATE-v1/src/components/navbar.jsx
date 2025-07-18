import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const { isAuthenticated, email = "" } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Extract first character of email (uppercase)
  const avatarLetter = email ? email[0].toUpperCase() : "";

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img 
            src="/logo.jpg" 
            alt="EventVault Logo" 
            className="h-10 w-auto mr-3 rounded-lg shadow-sm"
          />
          <span className="text-2xl font-bold text-gray-800">
            EventVault
          </span>
        </div>

        {/* Login/Logout and Avatar on the right */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Link to="/login" className="btn-primary">
              Login
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>

              {/* Circular avatar with email initial */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300">
                {avatarLetter}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
