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

export const updateProfile = async (formData) => {
  const response = await API.put("/profile", formData, {
    headers: {
      // Axios will automatically set the correct boundary for multipart data
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const logOut = async () => {
  // Added the leading slash for consistency
  const response = await API.post("/logout");
  return response.data;
};
