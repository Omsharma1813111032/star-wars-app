import { useState } from "react";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "StarWars" && password === "Wars@123") {
            localStorage.setItem("isLoggedIn", "true");
            onLogin();
        } 
        else {
            setError("Invalid credentials.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1a1a1a] p-12 rounded-xl border border-[#ffe81f40] shadow-[0_0_20px_#ffe81f40] w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#ffe81f] mb-4">
                    Login to the Star Wars
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 rounded bg-[#0b0b0b] border border-[#ffe81f40] text-white focus:ring-2 focus:ring-[#ffe81f]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded bg-[#0b0b0b] border border-[#ffe81f40] text-white focus:ring-2 focus:ring-[#ffe81f]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-[#ffe81f] text-black font-semibold rounded p-2 hover:bg-[#fff159]"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
