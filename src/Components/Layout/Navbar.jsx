import { Sparkles } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-12 h-24 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* w-15/h-15 is 60px - great size for 1080p */}
          <div className="w-15 h-15 bg-[#534FFF] rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
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
        </Link>

        {/* RIGHT: Navigation & Auth */}
        <div className="flex items-center gap-10">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-gray-600 hover:text-[#534FFF] transition-colors font-medium"
          >
            <Sparkles size={20} />
            <span>Browse Courses</span>
          </Link>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 text-sm font-bold text-[#534FFF] border-2 border-[#534FFF] rounded-xl hover:bg-indigo-50 transition-all">
              Log In
            </button>
            <button className="px-8 py-3 text-sm font-bold text-white bg-[#534FFF] rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
