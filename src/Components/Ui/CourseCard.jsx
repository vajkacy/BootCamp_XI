import { Star } from "lucide-react";

const CourseCard = ({ title, lecturer, rating, price, image }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Course Image */}
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">Lecturer: {lecturer}</span>
          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
            <Star size={12} fill="currentColor" /> {rating}
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#1E1B4B] mb-2 leading-snug">
          {title}
        </h3>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          Master modern React patterns, hooks, and TypeScript integration for
          building scalable web applications.
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="text-lg font-bold text-gray-900">
            <span className="text-xs font-medium text-gray-400 align-top mr-1">
              Starting from
            </span>
            ${price}
          </div>
          <button className="bg-[#6366F1] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
