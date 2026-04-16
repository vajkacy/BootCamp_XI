import { Star } from "lucide-react";

const ProgressCard = ({ title, lecturer, rating, image, progress }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Small Square Image */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 rounded-lg object-cover shrink-0"
      />

      <div className="grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-[10px] text-gray-400 font-medium">
              Lecturer {lecturer}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
              <Star size={10} fill="currentColor" /> {rating}
            </div>
          </div>
          <h3 className="text-sm font-bold text-[#1E1B4B] leading-tight mt-1">
            {title}
          </h3>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] text-gray-500 font-semibold">
              {progress}% Complete
            </span>
            <button className="border border-[#6366F1] text-[#6366F1] text-[12px] font-bold px-5 py-1 rounded-lg hover:bg-indigo-50 transition-colors">
              View
            </button>
          </div>
          {/* Progress Bar Background */}
          <div className="w-full bg-indigo-100 h-2 rounded-full overflow-hidden">
            {/* Actual Progress Fill */}
            <div
              className="bg-[#6366F1] h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
