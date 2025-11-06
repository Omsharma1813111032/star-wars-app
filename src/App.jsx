import React from "react";
import Home from "./pages/Home";
import logo from "./assets/logo.svg"

export default function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans">
      <header className="text-center p-6 text-4xl font-extrabold flex flex-row items-center justify-center text-[#ffe81f] drop-shadow-[0_0_10px_#ffe81f]">

        <img src={logo} alt="logo" width={150} height={150} />

      </header>
      <main className="px-4 md:px-8">
        <Home />
      </main>
    </div>
  );
}
