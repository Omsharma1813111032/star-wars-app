import React from "react";

export default function CharacterModal({ character, onClose }) {
    if (!character) return null;

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
                >
                    ×
                </button>

                <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
                    {character.name}
                </h2>

                <div className="space-y-2 text-gray-700">
                    <p>
                        <span className="font-semibold">Height:</span>{" "}
                        {(character.height / 100).toFixed(2)} m
                    </p>
                    <p>
                        <span className="font-semibold">Mass:</span> {character.mass} kg
                    </p>
                    <p>
                        <span className="font-semibold">Birth Year:</span>{" "}
                        {character.birth_year}
                    </p>
                    <p>
                        <span className="font-semibold">Number of Films:</span>{" "}
                        {character.films?.length || 0}
                    </p>
                    <p>
                        <span className="font-semibold">Date Added:</span>{" "}
                        {formatDate(character.created)}
                    </p>

                    {character.homeworldDetails && (
                        <div className="mt-4 border-t pt-3">
                            <h3 className="font-semibold text-lg mb-1 text-gray-800">
                                Homeworld Details
                            </h3>
                            <div className="space-y-1 text-gray-700">
                                <p>
                                    <span className="font-medium">Name:</span>{" "}
                                    {character.homeworldDetails.name}
                                </p>
                                <p>
                                    <span className="font-medium">Terrain:</span>{" "}
                                    {character.homeworldDetails.terrain}
                                </p>
                                <p>
                                    <span className="font-medium">Climate:</span>{" "}
                                    {character.homeworldDetails.climate}
                                </p>
                                <p>
                                    <span className="font-medium">Population:</span>{" "}
                                    {character.homeworldDetails.population}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
