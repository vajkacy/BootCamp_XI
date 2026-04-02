import { useState } from "react";
import Navbar from "./Components/Layout/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-600 p-10">
        Tailwind is working!
      </h1>
    </div>
  );
}

export default App;
