import React from "react";
import CourseCard from "../Ui/CourseCard";
import { useAuth } from "../../Context/AuthContext";
import ContinueLearning from "./ContinueLearning";
import useFetchCourses from "../../Hooks/useFetchCourses";
import { getFeaturedCourses } from "../../Api/courseService";
import MainHero from "./MainHero";

const MainSection = () => {
  const { isLoggedIn } = useAuth();
  const { data: featuredCourses, loading } =
    useFetchCourses(getFeaturedCourses);

  return (
    <section className="bg-[#F9F9FB] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        {/* 1. Hero Banner */}

        <MainHero />

        {/* 2. Continue Learning (TOP - Logged In) */}
        {isLoggedIn && (
          <div className="mb-16">
            <ContinueLearning />
          </div>
        )}

        {/* 3. Main Course Grid */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#1E1B4B] mb-2">
            Start Learning Today
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Choose from our most popular courses and begin your journey
          </p>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#534FFF]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredCourses?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* 4. Continue Learning (BOTTOM - Logged Out) */}
        {!isLoggedIn && (
          <div className="mt-16 border-t border-gray-100 pt-12">
            <ContinueLearning />
          </div>
        )}
      </div>
    </section>
  );
};

export default MainSection;
