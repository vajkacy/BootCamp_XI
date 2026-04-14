import { X, MapPin, Clock, Calendar } from "lucide-react";

const EnrolledSidebar = ({ isOpen, onClose, enrollments = [] }) => {
  return (
    <>
      {/* Dark Overlay/Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-[70] transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto p-6`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B]">
              Enrolled Courses
            </h2>
            <p className="text-sm text-gray-500">
              Total Enrollments {enrollments.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Example Course Card */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 mb-4">
                <img
                  src="/path-to-your-image.jpg"
                  className="w-24 h-24 rounded-xl object-cover"
                  alt="course"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-400">
                      Instructor{" "}
                      <span className="text-gray-700 font-medium">
                        Sarah Johnson
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-400">
                      ★ 4.9
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1E1B4B] text-sm mt-1">
                    Advanced React & TypeScript Development
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={12} /> Monday-Wednesday
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} /> 6:00 PM - 8:00 PM
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} /> In Person
                </div>
                <div className="flex items-center gap-1 text-blue-600 truncate underline">
                  Tbilisi, Chavchavadze St.30
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] mb-1 font-bold">
                    <span>65% Complete</span>
                  </div>
                  <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#534FFF] h-full w-[65%]"></div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-[#534FFF] text-[#534FFF] text-xs font-bold rounded-lg hover:bg-indigo-50">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnrolledSidebar;
