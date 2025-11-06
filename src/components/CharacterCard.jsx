// src/components/CharacterCard.jsx
import React, { useEffect, useState } from "react";
import { fetchSpeciesName } from "../api/swapi";
import { getSpeciesColor } from "../utils/colorBySpecies";

export default function CharacterCard({ character, onClick }) {
    // Prefer pre-mapped species names (if Home mapped them into character.speciesNames)
    const initialSpeciesName =
        (character.speciesNames && character.speciesNames[0]) || null;

    const [speciesName, setSpeciesName] = useState(initialSpeciesName || "Unknown");
    const [borderClass, setBorderClass] = useState(getSpeciesColor(initialSpeciesName || "Unknown"));

    useEffect(() => {
        let mounted = true;
        async function ensureSpeciesName() {
            // If already have species name mapped, use it
            if (initialSpeciesName) {
                setSpeciesName(initialSpeciesName);
                setBorderClass(getSpeciesColor(initialSpeciesName));
                return;
            }

            // else try fetching from species URL (character.species[0])
            if (character.species && character.species.length > 0) {
                try {
                    const name = await fetchSpeciesName(character.species[0]);
                    if (!mounted) return;
                    setSpeciesName(name);
                    setBorderClass(getSpeciesColor(name));
                } catch (err) {
                    console.error("species fetch error:", err);
                    if (!mounted) return;
                    setSpeciesName("Unknown");
                    setBorderClass(getSpeciesColor("Unknown"));
                }
            } else {
                // no species url → assume Human (as SWAPI often uses empty)
                const name = "Human";
                setSpeciesName(name);
                setBorderClass(getSpeciesColor(name));
            }
        }

        ensureSpeciesName();
        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [character]); // re-run if character changes

    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(character.name)}/300/200`;

    return (
        <div
            onClick={() => onClick(character)}
            className={`relative rounded-2xl p-4 cursor-pointer transform transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_#ffe81f80] border-l-4 ${borderClass} bg-[#1a1a1a] hover:bg-[#1f1f1f]`}
        >
            <img
                src={imageUrl}
                alt={character.name}
                className="rounded-lg w-full h-48 object-cover mb-3 border border-[#ffffff10]"
            />
            <h2 className="text-lg font-semibold text-[#ffe81f] drop-shadow-[0_0_6px_#000]">
                {character.name}
            </h2>
            <p className="text-sm text-gray-300">{speciesName}</p>
        </div>
    );
}
