export default function CharacterModal({ character, onClose }) {
    if (!character) return null;

    const formatDate = (isoDate) => {
        const d = new Date(isoDate);
        return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-[#121212] text-white w-full md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto rounded-2xl border border-[#ffe81f40] shadow-[0_0_20px_#ffe81f40] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-[#ffe81f] text-3xl transition-transform"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-bold text-[#ffe81f] mb-4 border-b border-[#ffe81f40] pb-2">
                    {character.name}
                </h2>

                <div className="space-y-2 text-gray-300">
                    <p><span className="font-semibold text-[#ffe81f]">Height:</span> {(character.height / 100).toFixed(2)} m</p>
                    <p><span className="font-semibold text-[#ffe81f]">Mass:</span> {character.mass} kg</p>
                    <p><span className="font-semibold text-[#ffe81f]">Birth Year:</span> {character.birth_year}</p>
                    <p><span className="font-semibold text-[#ffe81f]">Films:</span> {character.films?.length || 0}</p>
                    <p><span className="font-semibold text-[#ffe81f]">Date Added:</span> {formatDate(character.created)}</p>

                    {character.homeworldDetails && (
                        <div className="mt-4 pt-3 border-t border-[#ffe81f30]">
                            <h3 className="font-semibold text-lg mb-1 text-[#ffe81f]">Homeworld Details</h3>
                            <div className="space-y-1">
                                <p><span className="font-medium text-[#ffe81f]">Name:</span> {character.homeworldDetails.name}</p>
                                <p><span className="font-medium text-[#ffe81f]">Terrain:</span> {character.homeworldDetails.terrain}</p>
                                <p><span className="font-medium text-[#ffe81f]">Climate:</span> {character.homeworldDetails.climate}</p>
                                <p><span className="font-medium text-[#ffe81f]">Population:</span> {character.homeworldDetails.population}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
