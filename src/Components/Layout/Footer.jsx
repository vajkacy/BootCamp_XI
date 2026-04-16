import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { Rocket } from "lucide-react"; // Or any icon for the 'Bootcamp' logo

const Footer = () => {
  return (
    <footer className="bg-[#F9F9FB] pt-16 pb-8 px-4 md:px-20 border-t border-gray-200 text-[#4B5563]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#6366F1] p-2 rounded-lg text-white">
                <Rocket size={20} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-[#130E67]">
                Bootcamp
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#130E67] font-medium mb-6">
              Your learning journey starts here!
              <br />
              Browse courses to get started.
            </p>
            <div className="flex gap-4 text-[#736BEA]">
              <FaFacebookF className="cursor-pointer hover:text-indigo-800" />
              <FaTwitter className="cursor-pointer hover:text-indigo-800" />
              <FaInstagram className="cursor-pointer hover:text-indigo-800" />
              <FaLinkedinIn className="cursor-pointer hover:text-indigo-800" />
              <FaYoutube className="cursor-pointer hover:text-indigo-800" />
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-bold text-[#1E1B#130E67] mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li className="hover:underline cursor-pointer">
                Enrolled Courses
              </li>
              <li className="hover:underline cursor-pointer">Browse Courses</li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-bold text-[#130E67] mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-[#666666]">
              <li className="hover:underline cursor-pointer">My Profile</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-[#130E67] mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-[#666666]">
              <li className="flex items-center gap-2">
                <HiOutlineMail className="text-lg" /> contact@company.com
              </li>
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="text-lg" /> (+995) 555 111 222
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-lg" /> Aghmashenebeli
                St.115
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-row md:row justify-between pt-8 border-t border-gray-200 text-xs text-[#666666]">
          <p>Copyright © 2026 Redberry International</p>
          <div className="flex gap-1 mt-4 md:mt-0">
            <span>All Rights Reserved</span>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
