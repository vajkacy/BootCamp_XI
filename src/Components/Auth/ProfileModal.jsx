import React, { useState, useRef } from "react";
import { Modal } from "../Ui/Modal";
import { useAuth } from "../../Context/AuthContext";
import { Upload, Pencil, Check, AlertCircle } from "lucide-react";
// Import your API function here
import { updateProfile as updateProfileApi } from "../../Api/authService";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth(); // updateProfile here updates global state
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.full_name || user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobile_number || user?.mobileNumber || "",
    age: user?.age || "",
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleUpdate = async () => {
    setError(null);
    const cleanPhone = formData.mobileNumber.replace(/\s/g, "");

    // Validation matching your Swagger docs
    if (!cleanPhone.startsWith("5") || cleanPhone.length !== 9) {
      setError("Mobile number must be 9 digits and start with 5.");
      return;
    }
    if (!formData.fullName || !formData.age) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Build the FormData object with exact Swagger keys
      const data = new FormData();
      data.append("full_name", formData.fullName);
      data.append("mobile_number", cleanPhone);
      data.append("age", parseInt(formData.age));

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      } else {
        // Some APIs require an empty string if no new file is sent
        // data.append("avatar", "");
      }

      // 2. Send to backend
      const response = await updateProfileApi(data);
      console.log(response);
      // 3. Update React Context and close
      const updatedUser = response.data.data || response.data;
      updateProfile(updatedUser);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center">
      <div className="p-6 flex flex-col gap-6 min-w-100">
        <h2 className="text-2xl font-bold text-center text-[#1E1B4B]">
          Profile
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Header with Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              // Show preview of new avatar if selected, else old avatar, else default
              src={
                formData.avatar
                  ? URL.createObjectURL(formData.avatar)
                  : user?.avatar || "/default-avatar.png"
              }
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              alt="profile"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#1E1B4B]">
              {user?.username || formData.fullName || "User"}
            </h3>
            <p className="text-green-500 text-xs font-medium">Profile Setup</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <div className="relative">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 outline-none focus:border-[#534FFF] transition-colors"
                placeholder="John Doe"
              />
              <Pencil
                size={16}
                className="absolute right-4 top-4 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <div className="relative">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 outline-none focus:border-[#534FFF] transition-colors" /* <-- 3. Removed the gray "locked" colors */
                placeholder="your@email.com"
              />

              <Pencil
                size={16}
                className="absolute right-4 top-4 text-gray-400"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-2 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Mobile Number
              </label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#534FFF] transition-colors"
                placeholder="555123456"
              />
            </div>

            {/* Changed from select to number input for easier age entry */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#534FFF] transition-colors bg-white"
                placeholder="25"
              />
            </div>
          </div>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-indigo-50 hover:border-[#534FFF] transition-colors"
          >
            {/* Hidden actual file input */}
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .webp"
            />
            <Upload className="text-gray-400" size={32} />
            <p className="text-sm text-gray-500">
              {formData.avatar ? (
                <span className="font-medium text-[#534FFF]">
                  {formData.avatar.name}
                </span>
              ) : (
                <>
                  Drag and drop or{" "}
                  <span className="text-[#534FFF] underline">Upload file</span>
                </>
              )}
            </p>
            <p className="text-xs text-gray-400">JPG, PNG or WebP</p>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-[#534FFF] hover:bg-[#423ED8] active:scale-95"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
