import CourseCard from "../Ui/CourseCard";
import { useAuth } from "../../Context/AuthContext";
import ContinueLearning from "./ContinueLearning";

const MainSection = () => {
  const { isLoggedIn } = useAuth();

  const courses = [
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.9,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.8,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.8,
      price: 299,
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section className="bg-[#F9F9FB] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        {/* 1. Hero Section */}
        <div className="w-full h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mb-16 relative overflow-hidden flex items-center p-12 text-white">
          <div className="max-w-lg z-10">
            <h2 className="text-4xl font-bold mb-4">
              Start learning something new today
            </h2>
            <p className="mb-6 text-indigo-100">
              Explore a wide range of expert-led courses and find the skills you
              need.
            </p>
            <button className="bg-[#6366F1] px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              Browse Courses
            </button>
          </div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
        </div>

        {/* 2. TOP Rendering: If Logged In */}
        {isLoggedIn && (
          <div className="mb-16">
            <ContinueLearning />
          </div>
        )}

        {/* 3. Main Course Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1E1B4B]">
            Start Learning Today
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Choose from our most popular courses and begin your journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>

        {/* 4. BOTTOM Rendering: If Logged Out */}
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
