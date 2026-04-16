import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  getWeeklySchedules,
  getTimeSlots,
  getSessionTypes,
  enrollInCourse,
} from "../../Api/courseService";
import { useAuth } from "../../Context/AuthContext";

const EnrollmentSection = ({ course }) => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Data from API
  const [schedules, setSchedules] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [sessionTypes, setSessionTypes] = useState([]);

  // Selections
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  // Enrollment
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [hasConflict, setHasConflict] = useState(false);

  const isProfileComplete = user?.profileComplete;
  // Step 1
  useEffect(() => {
    if (course?.id) {
      getWeeklySchedules(course.id)
        .then((res) => {
          // Sometimes APIs wrap arrays in multiple "data" objects
          const actualArray = res?.data?.data || res?.data || res;

          setSchedules(actualArray);
        })
        .catch((err) => {
          console.error("FAILED TO FETCH SCHEDULES:", err);
        });
    }
  }, [course?.id]);

  //STEP 2
  useEffect(() => {
    if (selectedSchedule) {
      setLoading(true);

      // Reset the steps below this one
      setSelectedTime(null);
      setSelectedType(null);
      setTimeSlots([]);

      getTimeSlots(course.id, selectedSchedule.id)
        .then((res) => {
          const actualSlots = res?.data?.data || res?.data || res;
          setTimeSlots(actualSlots);

          // This automatically opens Step 2!
          setActiveStep(2);
          setLoading(false);
        })
        .catch((err) => {
          console.error("FAILED TO FETCH TIME SLOTS:", err);
          setLoading(false);
        });
    }
  }, [selectedSchedule, course.id]);

  // Step 3
  useEffect(() => {
    if (selectedTime && selectedSchedule) {
      setLoading(true);
      setSelectedType(null);
      getSessionTypes(course.id, selectedSchedule.id, selectedTime.id).then(
        (res) => {
          const actualTypes = res?.data || res;
          setSessionTypes(actualTypes);
          setActiveStep(3);
          setLoading(false);
        },
      );
    }
  }, [selectedTime, course.id, selectedSchedule]);

  const handleEnrollment = async (forceEnroll = false) => {
    if (!selectedType || !isProfileComplete) return;

    setIsEnrolling(true);
    setError(null);

    try {
      const payload = {
        courseId: course.id,
        courseScheduleId: selectedType.courseScheduleId || selectedType.id,
        force: forceEnroll,
      };

      await enrollInCourse(payload);

      setIsSuccess(true);
      setHasConflict(false);
    } catch (err) {
      if (err.response?.status === 409) {
        const backendMessage = err.response?.data?.message;

        // Check if the 409 is because the class is full
        if (backendMessage === "No seats available for this schedule.") {
          setError(
            "This class is fully booked! Please select a different schedule.",
          );
          setHasConflict(false); // Keep it false so the "Force" button DOES NOT appear
        } else {
          // Otherwise, it's a personal schedule conflict, so show the Force button
          setHasConflict(true);
          setError(
            backendMessage
              ? `Backend says: ${backendMessage}`
              : "Schedule conflict detected! Do you want to enroll anyway?",
          );
        }
      } else {
        setError(
          err.response?.data?.message || "Failed to enroll. Please try again.",
        );
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-50">
        {/* STEP 1 */}
        <div className="mb-6">
          {/* FIX 1: Removed the black border from this button */}
          <button
            onClick={() => setActiveStep(activeStep === 1 ? 0 : 1)}
            className="flex items-center justify-between w-full mb-4 group outline-none"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${activeStep === 1 ? "border-[#1E1B4B] text-[#1E1B4B]" : "border-gray-200 text-gray-400"}`}
              >
                1
              </span>
              <span
                className={`font-bold ${activeStep === 1 ? "text-[#1E1B4B]" : "text-gray-400"}`}
              >
                Weekly Schedule
              </span>
            </div>
            {activeStep === 1 ? (
              <ChevronUp className="text-[#1E1B4B]" size={20} />
            ) : (
              <ChevronDown className="text-gray-300" size={20} />
            )}
          </button>

          {activeStep === 1 && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2">
              {Array.isArray(schedules) &&
                schedules.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSchedule(s)}
                    /* FIX 2: Matched Figma button colors (Dark text when selected, gray when not) */
                    className={`py-4 px-2 rounded-2xl border text-[13px] font-bold transition-all ${
                      selectedSchedule?.id === s.id
                        ? "border-gray-300 text-[#1E1B4B] bg-white shadow-sm"
                        : "border-gray-100 text-gray-300 bg-gray-50/30 hover:border-gray-200"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* STEP 2 */}
        <div className={`mb-6 ${!selectedSchedule && "opacity-40"}`}>
          <button
            disabled={!selectedSchedule}
            onClick={() => setActiveStep(activeStep === 2 ? 0 : 2)}
            className="flex items-center justify-between w-full mb-4 outline-none"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${selectedSchedule ? "border-[#1E1B4B] text-[#1E1B4B]" : "border-gray-200 text-gray-400"}`}
              >
                2
              </span>
              <span
                className={`font-bold ${selectedSchedule ? "text-[#1E1B4B]" : "text-gray-400"}`}
              >
                Time Slot
              </span>
            </div>
            <ChevronDown
              size={20}
              className={selectedSchedule ? "text-[#1E1B4B]" : "text-gray-300"}
            />
          </button>
          {activeStep === 2 && (
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2">
              {timeSlots.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTime(t)}
                  className={`px-4 py-3 rounded-2xl border text-[13px] font-bold transition-all ${
                    selectedTime?.id === t.id
                      ? "border-gray-300 text-[#1E1B4B] bg-white shadow-sm"
                      : "border-gray-100 text-gray-300 bg-gray-50/30 hover:border-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STEP 3 */}
        <div className={`mb-8 ${!selectedTime && "opacity-40"}`}>
          <button
            disabled={!selectedTime}
            onClick={() => setActiveStep(activeStep === 3 ? 0 : 3)}
            className="flex items-center justify-between w-full mb-4 outline-none"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${selectedTime ? "border-[#1E1B4B] text-[#1E1B4B]" : "border-gray-200 text-gray-400"}`}
              >
                3
              </span>
              <span
                className={`font-bold ${selectedTime ? "text-[#1E1B4B]" : "text-gray-400"}`}
              >
                Session Type
              </span>
            </div>
            <ChevronDown
              size={20}
              className={selectedTime ? "text-[#1E1B4B]" : "text-gray-300"}
            />
          </button>
          {activeStep === 3 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              {sessionTypes.map((st) => {
                const isSoldOut = st.availableSeats === 0; // 1. Check if it's full!

                return (
                  <button
                    key={st.id}
                    disabled={isSoldOut} // 2. Disable the button if it's full
                    onClick={() => setSelectedType(st)}
                    className={`w-full p-4 rounded-2xl border text-left text-[13px] font-bold transition-all ${
                      isSoldOut
                        ? "border-red-100 bg-red-50/50 text-gray-400 cursor-not-allowed opacity-60" // Red styling for sold out
                        : selectedType?.id === st.id
                          ? "border-gray-300 text-[#1E1B4B] bg-white shadow-sm"
                          : "border-gray-100 text-gray-300 bg-gray-50/30 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="capitalize">{st.name}</span>
                        {/* 3. Show them how many seats are left! */}
                        <span
                          className={`text-[10px] mt-0.5 ${isSoldOut ? "text-red-400" : "text-green-500"}`}
                        >
                          {isSoldOut
                            ? "Sold Out"
                            : `${st.availableSeats} seats left`}
                        </span>
                      </div>
                      <span className={isSoldOut ? "text-gray-300" : ""}>
                        {st.priceModifier > 0
                          ? `+ ${st.priceModifier}₾`
                          : "Free"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* PRICE SUMMARY CARD */}
        <div className="bg-[#F9FAFF] rounded-3xl p-8 mt-10 border border-indigo-50/50">
          <div className="flex justify-between items-center mb-8">
            <span className="text-gray-400 font-bold text-lg">Total Price</span>
            {/* FIX 3: Cleaned up the price font weight */}
            <span className="text-4xl font-bold text-[#1E1B4B] tracking-tight">
              {(Number(course?.basePrice) || 0) +
                (Number(selectedType?.priceModifier) || 0)}
              $
            </span>
          </div>

          <div className="space-y-4 mb-10 border-b border-gray-100 pb-6">
            <div className="flex justify-between text-gray-400 font-medium text-sm">
              <span>Base Price</span>
              <span>+ 0$</span>
            </div>
            <div className="flex justify-between text-gray-400 font-medium text-sm">
              <span>Session Type</span>
              <span>+ {selectedType?.priceModifier || 0}₾</span>
            </div>
          </div>

          {/* Error / Conflict Message Area */}
          {error && (
            <div
              className={`mb-4 text-xs font-bold p-3 rounded-xl ${hasConflict ? "bg-orange-50 text-orange-600 border border-orange-200" : "bg-red-50 text-red-500"}`}
            >
              {error}
            </div>
          )}

          {/* The Smart Enroll Button */}
          <button
            // If there is a conflict, clicking again will run handleEnrollment(true) to force it
            onClick={() => handleEnrollment(hasConflict)}
            disabled={
              !selectedType || !isProfileComplete || isEnrolling || isSuccess
            }
            className={`w-full py-5 rounded-2xl font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2 ${
              isSuccess
                ? "bg-green-50 text-green-600 border border-green-200" // Success
                : hasConflict
                  ? "bg-orange-500 text-white hover:bg-orange-600" // Conflict / Force state
                  : selectedType && isProfileComplete
                    ? "bg-[#EAE8FF] text-[#534FFF] hover:bg-[#D9D6FF]" // Ready to enroll
                    : "bg-[#F3F4F6] text-gray-400 cursor-not-allowed" // Disabled
            }`}
          >
            {isEnrolling ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : isSuccess ? (
              "Successfully Enrolled! 🎉"
            ) : hasConflict ? (
              "Force Enroll Anyway"
            ) : (
              "Enroll Now"
            )}
          </button>
        </div>
      </div>

      {/* FIX 4: ALERT BOX - Matched exact Figma styling */}
      {!user ? (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-[#1E1B4B] text-sm leading-tight">
                Authentication Required
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 max-w-50 leading-relaxed">
                You need sign in to your profile before enrolling in this
                course.
              </p>
            </div>
          </div>
          <Link
            to="/login"
            className="bg-[#F0F0FF] border border-[#D9D9FF] text-[#534FFF] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#EAEAFF] transition-colors"
          >
            Sign In <ArrowRight size={14} />
          </Link>
        </div>
      ) : !isProfileComplete ? (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 mt-0.5" size={18} />
            <div>
              <h4 className="font-bold text-[#1E1B4B] text-sm leading-tight">
                Complete Your Profile
              </h4>
              <p className="text-[11px] text-gray-400 mt-1 max-w-50 leading-relaxed">
                You need to fill in your profile details before enrolling in
                this course.
              </p>
            </div>
          </div>
          <Link
            to="/profile"
            className="bg-[#F0F0FF] border border-[#D9D9FF] text-[#534FFF] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#EAEAFF] transition-colors"
          >
            Complete <ArrowRight size={14} />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default EnrollmentSection;
