import React, { useState } from "react";
import { Modal } from "../Ui/Modal";
import { useAuth } from "../../Context/AuthContext";
import { Upload, Pencil, Check } from "lucide-react";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobileNumber: user?.mobileNumber || "",
    age: user?.age || "",
    avatar: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    // Here you would call an API, then update the context
    updateProfile(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center">
      <div className="p-6 flex flex-col gap-6 min-w-[400px]">
        <h2 className="text-2xl font-bold text-center">Profile</h2>

        {/* Header with Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatar || "/default-avatar.png"}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              alt="profile"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {user?.username || "Username"}
            </h3>
            <p className="text-green-500 text-xs">Profile is Complete</p>
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
                className="w-full border p-3 rounded-xl bg-gray-50 outline-none"
                placeholder="Full Name"
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
                disabled
                className="w-full border p-3 rounded-xl bg-gray-100 text-gray-500 outline-none"
              />
              <Check
                size={16}
                className="absolute right-4 top-4 text-gray-400"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">
                Mobile Number
              </label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none"
                placeholder="+995"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-600">Age</label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl outline-none bg-white"
              >
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
            <Upload className="text-gray-400" size={32} />
            <p className="text-sm text-gray-500">
              Drag and drop or{" "}
              <span className="text-blue-600 underline">Upload file</span>
            </p>
            <p className="text-xs text-gray-400">JPG, PNG or WebP</p>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-[#534FFF] text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Update Profile
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
