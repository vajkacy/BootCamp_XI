import { useState } from "react";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* middle sectione */}
      <main className="grow">
        <h1 className="text-3xl font-bold text-blue-600 p-10">
          Tailwind is working!
        </h1>
      </main>

      <Footer />
    </div>
  );
}

export default App;
