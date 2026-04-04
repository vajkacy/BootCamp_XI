import { useState } from "react";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import MainSection from "./Components/Home/MainSection";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* middle sectione */}
      <main className="grow">
        <MainSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
