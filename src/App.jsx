import React, { Suspense, lazy, useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { setupAutoRefresh } from "./utils/auth";
import SearchBar from "./components/SearchBar"; // ✅ import SearchBar here
import { IoLogOut } from "react-icons/io5";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload(); // or redirect to login page
  };


  // console.log("search", search)
  useEffect(() => {
    if (isLoggedIn) setupAutoRefresh();
  }, [isLoggedIn]);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans">

      <header className={isLoggedIn ? "flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-10 relative" : "flex flex-col md:flex-row items-center justify-center px-6 py-4 md:px-10 relative"}>
        {
          isLoggedIn &&
          <div className="w-[150px] md:w-[200px]" />
        }

        <div className="flex justify-center">
          <img
            src={logo}
            alt="Star Wars"
            className="w-[130px] md:w-40 drop-shadow-[0_0_15px_#ffe81f]"
          />
        </div>

        {/* Right (Search Bar) */}
        {
          isLoggedIn &&
          <>
            <div className=" flex gap-4 mt-4 md:mt-0 md:w-[300px]">
              <SearchBar search={search} setSearch={setSearch} />
              <button
                onClick={handleLogout}
                title="logout"
                className="border border-[#ffe81f40] rounded-lg text-[#ffe81f] px-4 py-2"
              >
                <IoLogOut />
              </button>
            </div>
          </>
        }

      </header>

      {/* --- Main --- */}
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
            <Home search={search} />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )}
        </Suspense>
      </main>
    </div>
  );
}
