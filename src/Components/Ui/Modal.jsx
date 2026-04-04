import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, variant, children }) => {
  if (!isOpen) return null;

  return (
    // 1. BACKDROP: Covers the whole screen
    <div className="fixed inset-0 z-[100] flex bg-black/40 backdrop-blur-sm">
      {/* 2. CLICK-AWAY: Invisible layer to catch clicks outside */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 3. WRAPPER: Handles positioning (center or side) */}
      <div
        className={`relative flex w-full h-full p-4 pointer-events-none ${
          variant === "side"
            ? "justify-end items-stretch p-0"
            : "justify-center items-center"
        }`}
      >
        {/* 4. THE WHITE BOX: This must WRAP the children */}
        <div
          className={`bg-white shadow-2xl relative z-10 transition-all pointer-events-auto flex flex-col ${
            variant === "side"
              ? "h-full w-[500px] rounded-l-3xl"
              : "max-w-md w-full rounded-[32px] p-10"
          }`}
        >
          {/* Close Button inside the box */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-20"
          >
            <X size={24} />
          </button>

          {/* THE CONTENT: Now it is safely inside the white background */}
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
