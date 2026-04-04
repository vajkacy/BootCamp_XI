import ProgressCard from "../Ui/ProgressCard";
import { useAuth } from "../../Context/AuthContext";
import { Lock } from "lucide-react";

const ContinueLearning = () => {
  const { isLoggedIn, isProfileComplete, login } = useAuth();

  const enrolledCourses = [
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.9,
      progress: 65,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150",
    },
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.9,
      progress: 65,
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=150",
    },
    {
      title: "Advanced React & TypeScript Development",
      lecturer: "Marilyn Mango",
      rating: 4.9,
      progress: 65,
      image:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=150",
    },
  ];

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#1E1B4B]">
            Continue Learning
          </h2>
          <p className="text-gray-500 text-sm">Pick up where you left</p>
        </div>
        <button className="text-[#6366F1] text-sm font-bold underline">
          See All
        </button>
      </div>

      <div className="relative">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${!isLoggedIn || !isProfileComplete ? "blur-md pointer-events-none select-none" : ""}`}
        >
          {enrolledCourses.map((course, i) => (
            <ProgressCard key={i} {...course} />
          ))}
        </div>

        {/* Lock Overlay for Auth/Profile logic */}
        {(!isLoggedIn || !isProfileComplete) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-2xl shadow-xl text-center border border-gray-100">
              <Lock className="mx-auto text-indigo-600 mb-2" size={20} />
              <p className="text-sm font-bold text-[#1E1B4B] mb-4">
                {!isLoggedIn
                  ? "Sign in to track progress"
                  : "Complete profile to continue"}
              </p>
              <button
                onClick={!isLoggedIn ? login : null}
                className="bg-[#6366F1] text-white px-8 py-2 rounded-lg font-bold text-sm"
              >
                {!isLoggedIn ? "Log In" : "Update Profile"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContinueLearning;
