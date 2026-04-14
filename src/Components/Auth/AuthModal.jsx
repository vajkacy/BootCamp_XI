import React, { useState } from "react";
import { Modal } from "../Ui/Modal";
import useAuthActions from "../../Hooks/useAuthActions";

const AuthModal = ({ isOpen, initialMode, onClose }) => {
  const { handleLogin, handleRegister, loading, error } = useAuthActions();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: "",
    fullName: "",
    mobileNumber: "",
    age: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, avatar: e.target.files[0] });
  };

  const onLogInSubmit = () => {
    console.log("login...", userData);
    handleLogin({ email: userData.email, password: userData.password }, () =>
      onClose(),
    );
  };

  const onRegisterSubmit = () => {
    handleRegister(userData, () => {
      setStep(1); // Reset steps for next time
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="center">
      {/* 1. Use a ternary to check initialMode */}
      {initialMode === "login" ? (
        <div className="flex flex-col gap-4 p-4">
          <h2 className="text-xl font-bold text-center text-[#1E1B4B]">
            Welcome Back
          </h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
          />
          <button
            className="bg-[#534FFF] text-white p-3 rounded-xl font-bold hover:bg-indigo-700"
            onClick={onLogInSubmit}
          >
            Login
          </button>
        </div>
      ) : (
        /* 2. SIGNUP STEPS */
        <div className="p-4">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1E1B4B]">
                Create Account
              </h2>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
              />
              <button
                onClick={() => setStep(2)}
                className="bg-[#534FFF] text-white p-3 rounded-xl font-bold"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1E1B4B]">
                Secure Your Account
              </h2>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
              />
              <input
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
              />
              <button
                onClick={() => setStep(3)}
                className="bg-[#534FFF] text-white p-3 rounded-xl font-bold"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-xl font-bold text-[#1E1B4B]">Last Step!</h2>
              <input
                name="username"
                placeholder="Choose a Username"
                onChange={handleChange}
                className="border p-3 rounded-xl outline-none focus:border-[#534FFF]"
              />
              <div className="flex flex-col gap-2 items-center">
                <label className="text-sm text-gray-500">Profile Picture</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-sm"
                />
              </div>
              <button
                onClick={onRegisterSubmit}
                className="bg-[#534FFF] text-white p-3 rounded-xl font-bold"
              >
                Register Now
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
