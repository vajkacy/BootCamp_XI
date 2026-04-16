import React, { useState, useEffect } from "react";
import { Link } from "react-router"; // or "react-router-dom"
import { getCourses } from "../../Api/courseService";
import CourseCard from "../Ui/CourseCard";
import {
  Code,
  PenTool,
  Briefcase,
  Database,
  Megaphone,
  ChevronDown,
  Star,
  PlayCircle,
} from "lucide-react";

// --- FILTER DATA (Now using Integer IDs for the API!) ---
const FILTER_CATEGORIES = [
  { id: 1, label: "Development", icon: Code },
  { id: 2, label: "Design", icon: PenTool },
  { id: 3, label: "Business", icon: Briefcase },
  { id: 4, label: "Data Science", icon: Database },
  { id: 5, label: "Marketing", icon: Megaphone },
];

const FILTER_TOPICS = [
  { id: 1, label: "React" },
  { id: 2, label: "TypeScript" },
  { id: 3, label: "Python" },
  { id: 4, label: "UX/UI" },
  { id: 5, label: "Figma" },
  { id: 6, label: "JavaScript" },
  { id: 7, label: "Node.js" },
  { id: 8, label: "Machine Learning" },
  { id: 9, label: "Seo" },
  { id: 10, label: "Analytics" },
];

const FILTER_INSTRUCTORS = [
  { id: 1, name: "Marilyn Mango", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Ryan Dorwart", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Roger Calzoni", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Zain Philips", avatar: "https://i.pravatar.cc/150?u=4" },
];

const BrowseCourses = () => {
  // --- STATE MANAGEMENT ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [sortBy, setSortBy] = useState("Newest First");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- API DATA STATE ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- THE MAGIC USE-EFFECT ---
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getCourses({
          categories: selectedCategories,
          topics: selectedTopics,
          instructors: selectedInstructors,
          sort: sortBy === "Newest First" ? "newest" : sortBy,
          page: currentPage,
        });

        // Double check how your backend wraps the array (e.g., res.data vs res.data.data)
        const actualCourses = response?.data?.data || response?.data || [];

        setCourses(actualCourses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [
    selectedCategories,
    selectedTopics,
    selectedInstructors,
    sortBy,
    currentPage,
  ]);

  // --- HANDLERS ---
  const toggleFilter = (state, setState, value) => {
    setCurrentPage(1); // Reset to page 1 on new filter
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTopics([]);
    setSelectedInstructors([]);
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedTopics.length +
    selectedInstructors.length;

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-8 font-sans text-[#1E1B4B]">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-[#534FFF]">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#534FFF] font-medium">Browse</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ================= SIDEBAR (FILTERS) ================= */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Filters</h1>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-400 hover:text-[#534FFF]"
              >
                Clear All Filters ✕
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      toggleFilter(
                        selectedCategories,
                        setSelectedCategories,
                        cat.id,
                      )
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[13px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#F0F0FF] border-[#534FFF] text-[#534FFF]"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Icon
                      size={14}
                      className={isActive ? "text-[#534FFF]" : "text-gray-400"}
                    />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topics */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {FILTER_TOPICS.map((topic) => {
                // 1. Check if the topic.id is active
                const isActive = selectedTopics.includes(topic.id);
                return (
                  <button
                    key={topic.id} // 2. Use topic.id as the key
                    onClick={() =>
                      toggleFilter(selectedTopics, setSelectedTopics, topic.id)
                    } // 3. Pass topic.id to the filter
                    className={`px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#534FFF] border-[#534FFF] text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {topic.label}{" "}
                    {/* 4. Render topic.label, not the whole object! */}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructors */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4 text-gray-700">
              Instructor
            </h3>
            <div className="flex flex-col gap-2">
              {FILTER_INSTRUCTORS.map((inst) => {
                const isActive = selectedInstructors.includes(inst.id);
                return (
                  <button
                    key={inst.id}
                    onClick={() =>
                      toggleFilter(
                        selectedInstructors,
                        setSelectedInstructors,
                        inst.id,
                      )
                    }
                    className={`flex items-center gap-3 p-2 rounded-xl border transition-colors ${
                      isActive
                        ? "bg-[#F0F0FF] border-[#534FFF]"
                        : "bg-white border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span
                      className={`text-[13px] font-medium ${isActive ? "text-[#534FFF]" : "text-gray-600"}`}
                    >
                      {inst.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-gray-400 border-t pt-4">
            {activeFilterCount} Filters Active
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1">
          {/* Top Bar (Count & Sort) */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500 font-medium">
              Showing 9 out of 90
            </p>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:border-gray-300"
              >
                <span className="text-gray-400">Sort By:</span>
                <span className="text-[#534FFF]">{sortBy}</span>
                <ChevronDown size={16} className="text-gray-400 ml-2" />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-10">
                  {[
                    "Newest First",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Most Popular",
                    "Title: A-Z",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F0F0FF] transition-colors ${
                        sortBy === option
                          ? "bg-[#F0F0FF] text-[#534FFF] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Grid of Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#534FFF]"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-400 font-medium">
                No courses found matching your filters.
              </div>
            ) : (
              // Look how incredibly clean this is now! 👇
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50">
              ←
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#534FFF] text-white font-bold">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#1E1B4B] bg-white hover:bg-gray-50 font-bold">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#1E1B4B] bg-white hover:bg-gray-50 font-bold">
              3
            </button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#1E1B4B] bg-white hover:bg-gray-50 font-bold">
              10
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50">
              →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BrowseCourses;
