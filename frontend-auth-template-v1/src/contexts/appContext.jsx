/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState({ isAuthenticated: false, role: "user" });

  const getUserDetails = async () => {
    try {
      setAppLoading(true);
      const resp = await axiosInstance.get("/users");

      if (resp.data?.isSuccess && resp.data.data?.user) {
        const fetchedUser = resp.data.data.user;
        const userEmail = fetchedUser.email;

        const isAdmin = userEmail === "ankit19kumar2004@gmail.com";
        const role = isAdmin ? "admin" : "user";

        setUser({
          isAuthenticated: true,
          ...fetchedUser,
          role,
        });

        console.log("✅ Authenticated user:", {
          ...fetchedUser,
          role,
        });
      } else {
        console.warn("⚠️ User not authenticated.");
      }
    } catch (err) {
      if (err.response?.status !== 401) {
        ErrorToast("Error in user validation", err.message);
      } else {
        console.warn("🔒 Unauthorized access.");
      }
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <AppContext.Provider value={{ appLoading, user }}>
      {children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  return useContext(AppContext);
}

export { AppContextProvider, useAppContext };
