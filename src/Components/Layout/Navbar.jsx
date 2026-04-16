import { useState } from "react"; // Added this
import { Sparkles, BookOpen, User } from "lucide-react";
import { Link } from "react-router";
import { Modal } from "../Ui/Modal";
import AuthModal from "../Auth/AuthModal"; // Ensure path is correct
import { useAuth } from "../../Context/AuthContext";
import ProfileModal from "../Auth/ProfileModal";
import EnrolledSidebar from "./EnrolledSidebar";

export default function Navbar() {
  const { isLoggedIn, logOut, user } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F5F5F5] border-b border-gray-100 shadow-sm">
      <div className="max-w-360 mx-auto px-12 h-24 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-[#534FFF] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6282 21.5001L11.1667 16.8848M15.6282 21.5001C17.7056 20.6828 19.6984 19.652 21.5769 18.4232M15.6282 21.5001V29.1923C15.6282 29.1923 20.1344 28.3462 21.5769 26.1155C23.1831 23.6232 21.5769 18.4232 21.5769 18.4232M11.1667 16.8848C11.9581 14.7609 12.9546 12.725 14.141 10.808C15.8739 7.94182 18.2867 5.58194 21.1501 3.9528C24.0135 2.32365 27.2322 1.47941 30.5 1.50038C30.5 5.68494 29.34 13.0387 21.5769 18.4232M11.1667 16.8848L3.73077 16.8848C3.73077 16.8848 4.54872 12.2233 6.70513 10.731C9.11436 9.06952 14.141 10.731 14.141 10.731M4.47436 23.8078C2.24359 25.7462 1.5 31.5 1.5 31.5C1.5 31.5 7.06205 30.7308 8.9359 28.4231C9.9918 27.1308 9.97692 25.1462 8.80205 23.9463C8.22399 23.3755 7.46254 23.0457 6.66382 23.0201C5.86511 22.9946 5.08541 23.2751 4.47436 23.8078Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#1E1B4B]">Bootcamp</span>
        </Link>

        {/* RIGHT: Navigation & Auth */}
        <div className="flex items-center gap-10">
          <Link
            to="/browse"
            className="flex items-center gap-2 text-gray-600 hover:text-[#534FFF] transition-colors font-medium"
          >
            <Sparkles size={20} />
            <span>Browse Courses</span>
          </Link>

          {isLoggedIn ? (
            /* --- LOGGED IN STATE --- */
            <div className="flex items-center gap-8">
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-[#534FFF] transition-colors font-medium"
                onClick={() => setIsSideBarOpen(true)}
              >
                <BookOpen size={20} />
                <span>Enrolled Courses</span>
              </button>

              <div
                className="relative cursor-pointer"
                onClick={() => setIsProfileModalOpen(true)}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-12 h-12 rounded-full border-2 border-gray-100 object-cover"
                    alt="profile"
                  />
                ) : (
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User size={24} className="text-[#534FFF]" />
                  </div>
                )}
                {/* Online indicator dot */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-orange-400 border-2 border-white rounded-full"></div>
              </div>
            </div>
          ) : (
            /* --- LOGGED OUT STATE --- */
            <div className="flex items-center gap-4">
              <button
                className="px-8 py-3 text-sm font-bold text-[#534FFF] border-2 border-[#534FFF] rounded-xl hover:bg-indigo-50 transition-all"
                onClick={openLogin}
              >
                Log In
              </button>
              <button
                className="px-8 py-3 text-sm font-bold text-white bg-[#534FFF] rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all"
                onClick={openSignup}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <EnrolledSidebar
        isOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
    </nav>
  );
}
