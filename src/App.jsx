import React, { Suspense, lazy, useEffect, useState } from "react";
import logo from "./assets/logo.svg";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans">
      <header className="text-center p-6 text-4xl font-extrabold flex flex-row items-center justify-center text-[#ffe81f] drop-shadow-[0_0_10px_#ffe81f]">
        <img src={logo} alt="logo" width={150} height={150} />
      </header>

      <main className="px-4 md:px-8">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-[#ffe81f]">
              <div className="w-16 h-16 border-4 border-[#ffe81f] border-t-transparent rounded-full animate-spin mb-4"></div>
              Loading Galaxy Data...
            </div>
          }
        >
          {isLoggedIn ? (
            <Home />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
        </Suspense>
      </main>
    </div>
  );
}
