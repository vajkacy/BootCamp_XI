import API from "./axiosInstance";

export const login = async (credentials) => {
  const response = await API.post("/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  // We send the 'formData' object directly here
  const response = await API.post("/register", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/me");
  return response.data;
};

// Accept 'profileData' so we can send Name, Age, and MobileNumber
export const updateProfile = async (profileData) => {
  const response = await API.put("/profile", profileData);
  return response.data;
};

export const logOut = async () => {
  // Added the leading slash for consistency
  const response = await API.post("/logout");
  return response.data;
};
