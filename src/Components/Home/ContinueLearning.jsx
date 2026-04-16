import React, { useEffect } from "react";
import { Link } from "react-router"; // or react-router-dom depending on your version
import { BookOpen, PlayCircle, Clock } from "lucide-react";
import { getEnrollments } from "../../Api/courseService";
import useFetchCourses from "../../Hooks/useFetchCourses";

const ContinueLearning = () => {
  // We reuse your awesome hook! It will fetch the user's enrolled courses.
  const {
    data: enrollments,
    loading,
    error,
    refetch,
  } = useFetchCourses(getEnrollments);

  // Optional: Refetch when the component mounts just to be 100% sure we have fresh data
  useEffect(() => {
    if (refetch) refetch();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#534FFF]"></div>
        <p className="text-gray-400 font-bold mt-4 animate-pulse">
          Loading your courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-red-50 border border-red-100 rounded-3xl p-6 text-center">
        <p className="text-red-500 font-bold">{error}</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-white text-red-500 rounded-xl font-bold shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#1E1B4B]">
            Continue Learning
          </h2>
          <p className="text-gray-400 mt-2">
            Pick up right where you left off.
          </p>
        </div>
      </div>

      {enrollments?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((item) => {
            // Using the exact data structure we found in your Sidebar
            const course = item.course;
            const progress = item.progress || 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Course Image */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={course?.image || "/placeholder.jpg"}
                    alt={course?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay play button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle
                      size={48}
                      className="text-white drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#534FFF] bg-[#F0F0FF] px-2.5 py-1 rounded-md">
                      {course?.category?.name || "Course"}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-orange-400">
                      ★ {course?.rating || "5.0"}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#1E1B4B] text-lg leading-tight mb-2 line-clamp-2">
                    {course?.title}
                  </h3>

                  <p className="text-xs text-gray-400 mb-6 flex-1">
                    Instructor:{" "}
                    <span className="text-gray-700 font-medium">
                      {course?.instructor?.name || "Expert"}
                    </span>
                  </p>

                  {/* Progress Bar Area */}
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex justify-between text-[11px] mb-2 font-bold text-gray-500">
                      <span>{progress}% Completed</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Last active today
                      </span>
                    </div>
                    <div className="w-full bg-indigo-50 h-2.5 rounded-full overflow-hidden mb-4">
                      <div
                        className="bg-[#534FFF] h-full rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/course/${course?.id}/learn`} // Change this route to match your actual "learning" page
                      className="w-full py-3.5 bg-[#F9FAFF] text-[#534FFF] border border-[#EAE8FF] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#534FFF] hover:text-white transition-colors"
                    >
                      <PlayCircle size={18} />
                      {progress === 0 ? "Start Course" : "Continue"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full bg-white rounded-4xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <BookOpen size={32} className="text-[#534FFF]" />
          </div>
          <h3 className="text-xl font-bold text-[#1E1B4B] mb-2">
            No active courses
          </h3>
          <p className="text-gray-400 max-w-sm mb-8">
            You haven't enrolled in any courses yet. Browse our catalog to start
            your learning journey!
          </p>
          <Link
            to="/courses" // Change this to your course catalog route
            className="px-8 py-4 bg-[#534FFF] text-white rounded-2xl font-bold hover:bg-[#433BFF] transition-colors shadow-md shadow-indigo-500/20"
          >
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContinueLearning;
