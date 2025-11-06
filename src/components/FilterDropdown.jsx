export default function FilterDropdown({ speciesList, selected, setSelected }) {
    return (
        <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="bg-[#1a1a1a] border border-[#ffe81f40] text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ffe81f] transition"
        >
            <option className="text-black" value="">All Species</option>
            {speciesList.map((sp) => (
                <option className="text-black" key={sp.name} value={sp.name}>
                    {sp.name}
                </option>
            ))}
        </select>
    );
}
