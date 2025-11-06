import React from "react";
import CharactersPage from "./pages/CharactersPage";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="text-center p-6 text-3xl font-bold">Star Wars Characters</header>
      <Home />
    </div>
  );
}
