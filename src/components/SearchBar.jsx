export default function SearchBar({ search, setSearch }) {
    return (
        <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
        />
    );
}
