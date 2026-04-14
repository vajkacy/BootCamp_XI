import React from "react";
import { X, MapPin, Clock, Calendar, BookOpen } from "lucide-react";
import { getEnrollments } from "../../Api/courseService";
import useFetchCourses from "../../Hooks/useFetchCourses";

const EnrolledSidebar = ({ isOpen, onClose }) => {
  // 1. Call the hook specifically for 'enrollments'
  const {
    data: enrollments,
    loading,
    error,
    refetch,
  } = useFetchCourses(getEnrollments);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-[70] transition-transform duration-300 transform ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto p-6`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1E1B4B]">
              Enrolled Courses
            </h2>
            <p className="text-sm text-gray-500">
              Total Enrollments {enrollments?.length || 0}
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
          {loading ? (
            /* SHOW LOADING SPINNER OR SKELETON */
            <div className="flex justify-center p-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#534FFF]"></div>
            </div>
          ) : error ? (
            /* SHOW ERROR MESSAGE */
            <p className="text-red-500 text-center bg-red-50 p-4 rounded-xl">
              {error}
            </p>
          ) : enrollments.length > 0 ? (
            /* RENDER REAL DATA */
            enrollments.map((item) => (
              <div
                key={item.id}
                className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 mb-4">
                  {/* Notice we use item.course because enrollments wrap the course info */}
                  <img
                    src={item.course?.image || "/placeholder.jpg"}
                    className="w-24 h-24 rounded-xl object-cover"
                    alt="course"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-gray-400">
                        Instructor{" "}
                        <span className="text-gray-700 font-medium">
                          {item.course?.instructor?.name || "Expert"}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-400">
                        ★ {item.course?.rating || "5.0"}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#1E1B4B] text-sm mt-1">
                      {item.course?.title}
                    </h3>
                  </div>
                </div>

                {/* The Progress Bar logic */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] mb-1 font-bold">
                      <span>{item.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-indigo-50 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#534FFF] h-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-[#534FFF] text-[#534FFF] text-xs font-bold rounded-lg hover:bg-indigo-50">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="text-center py-10">
              <BookOpen size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500">
                You haven't enrolled in any courses yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrolledSidebar;
