import { Routes, Route } from "react-router"; // Make sure to import these
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import MainSection from "./Components/Home/MainSection";
import CourseDetails from "./Components/Details/CourseDetails";
import BrowseCourses from "./Components/Browse/BrowseCourses";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<MainSection />} />

          {/* Details Page */}
          <Route path="/courses/:id" element={<CourseDetails />} />

          {/* Browse Page (Fixed Typo!) */}
          <Route path="/browse" element={<BrowseCourses />} />

          {/* 404 page here later */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
