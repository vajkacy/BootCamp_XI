import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";

const CourseCard = ({ course }) => {
  const { title, image, rating, instructor, price, id, description } = course;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col h-full">
      {/* 1. Large Course Image */}
      <div className="relative mb-6">
        <img
          src={image || "/placeholder-code.jpg"}
          className="w-full aspect-video rounded-2xl object-cover"
          alt={title}
        />
      </div>

      {/* 2. Lecturer & Rating Row */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[13px] text-gray-400">
          Lecturer{" "}
          <span className="text-gray-600 font-medium">
            {instructor?.name || "Marilyn Mango"}
          </span>
        </span>
        <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
          <Star size={16} fill="currentColor" />
          {rating || "4.9"}
        </div>
      </div>

      {/* 3. Title */}
      <h3 className="text-2xl font-bold text-[#1E1B4B] mb-4 leading-tight">
        {title}
      </h3>

      {/* 4. Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-8 grow line-clamp-3">
        {description ||
          "Master modern React patterns, hooks, and TypeScript integration for building scalable web applications."}
      </p>

      {/* 5. Footer: Price & Details Button */}
      <div className="flex items-center justify-between mt-auto pt-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Starting from
          </span>
          <span className="text-3xl font-bold text-[#1E1B4B]">
            ${price || "299"}
          </span>
        </div>

        <Link
          to={`/courses/${id}`}
          className="bg-[#534FFF] text-white px-10 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all text-lg shadow-lg shadow-indigo-100"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
