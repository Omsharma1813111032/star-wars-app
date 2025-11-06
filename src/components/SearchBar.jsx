import { FaSearch } from "react-icons/fa";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="relative w-full">
            <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
            />
            <input
                type="text"
                placeholder="Search characters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#ffe81f40] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffe81f] outline-none"
            />
        </div>
    );
}
