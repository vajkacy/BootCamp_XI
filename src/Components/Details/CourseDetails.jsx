import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, Star, Code } from "lucide-react";
import { getCoursesById } from "../../Api/courseService";
import EnrollmentSection from "./EnrollmentSection";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getCoursesById(id);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center animate-pulse text-gray-400">
        Loading Course Details...
      </div>
    );
  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  return (
    <div className="bg-[#F9F9FB] min-h-screen pb-20">
      {/* Breadcrumbs */}
      <nav className="px-6 md:px-20 py-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/browse" className="hover:text-indigo-600 transition-colors">
          Browse
        </Link>
        <span className="mx-2">/</span>
        <span className="text-indigo-600 font-medium ml-1">Development</span>
      </nav>

      <div className="bg-[#F9F9FB] min-h-screen pb-20 font-sans">
        {/* ... Breadcrumbs ... */}

        <div className="max-w-360 mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: 8 Units wide */}
          <div className="lg:col-span-8">
            {/* Course Image - needs rounded-3xl and a specific height */}
            <div className="rounded-4xl overflow-hidden mb-6 shadow-sm border border-gray-100">
              <img src={course.image} className="w-full h-125 object-cover" />
            </div>

            {/* Metadata row with smaller, grayer text */}
            <div className="flex gap-6 mb-8 text-gray-400 text-sm border-b border-gray-100 pb-8">
              <div className="flex items-center gap-1">
                <Calendar size={16} /> {course.durationWeeks} Weeks
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} /> 128 Hours
              </div>
              <div className="flex items-center gap-1 ml-auto text-orange-400">
                <Star size={16} fill="currentColor" /> {course.avgRating}
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Code size={16} /> Development
              </div>
            </div>

            {/* Instructor Tag - matches the image's small white pill style */}
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 w-fit flex items-center gap-3 mb-10">
              <img
                src={course.instructor?.avatar}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                {course.instructor?.name}
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-tight">
              Course Description
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              {course.description}
            </p>
          </div>

          {/* RIGHT COLUMN: 4 Units wide */}
          <div className="lg:col-span-4">
            <EnrollmentSection course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
