export default function FilterDropdown({ speciesList, selected, setSelected }) {
    return (
        <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 ml-2"
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
