import { createContext, useState, useContext, useMemo, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. LAZY INITIALIZATION: Check localStorage FIRST before setting defaults.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true"; // Converts string back to boolean
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { FullName: "", Email: "", MobileNumber: "", Age: null };
  });

  // 2. AUTO-SAVE: Whenever isLoggedIn changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // 3. AUTO-SAVE: Whenever user changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // The rest of your code stays exactly the same!
  const isProfileComplete = useMemo(() => {
    return !!(user.FullName && user.Email && user.MobileNumber && user.Age);
  }, [user]);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    setIsLoggedIn(false);
    setUser({ FullName: "", Email: "", MobileNumber: "", Age: null });
    // Note: The useEffects above will automatically clear localStorage for you
    // because they are watching these state changes!
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
