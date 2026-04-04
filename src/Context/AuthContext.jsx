import { createContext, useState, useContext, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Use boolean false, not string "false"
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    FullName: "",
    Email: "",
    MobileNumber: "",
    Age: null, // Use actual null
  });

  // This will now correctly return false if Age is null or FullName is ""
  const isProfileComplete = useMemo(() => {
    return !!(user.FullName && user.Email && user.MobileNumber && user.Age);
  }, [user]);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ FullName: "", Email: "", MobileNumber: "", Age: null });
  };

  const updateProfile = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isProfileComplete,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
