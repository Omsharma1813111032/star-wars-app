import React, { useEffect, useState } from "react";
import { fetchSpeciesName } from "../api/swapi";
import { getSpeciesColor } from "../utils/colorBySpecies";

export default function CharacterCard({ character, onClick }) {
    const initialSpeciesName =
        (character.speciesNames && character.speciesNames[0]) ||
        null;

    const [speciesName, setSpeciesName] = useState(initialSpeciesName || "Unknown");
    const [bgClass, setBgClass] = useState(getSpeciesColor(initialSpeciesName || "Unknown"));

    useEffect(() => {
        let mounted = true;
        async function ensureSpeciesName() {
            if (initialSpeciesName) {
                setSpeciesName(initialSpeciesName);
                setBgClass(getSpeciesColor(initialSpeciesName));
                return;
            }

            if (character.species && character.species.length > 0) {
                try {
                    const name = await fetchSpeciesName(character.species[0]);
                    if (!mounted) return;
                    setSpeciesName(name);
                    setBgClass(getSpeciesColor(name));
                } catch (err) {
                    console.log(err)
                    if (!mounted) return;
                    setSpeciesName("Unknown");
                    setBgClass(getSpeciesColor("Unknown"));
                }
            } else {
                const name = "Human";
                setSpeciesName(name);
                setBgClass(getSpeciesColor(name));
            }
        }

        ensureSpeciesName();
        return () => { mounted = false; };
    }, [character]); 

    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(character.name)}/300/200`;

    return (
        <div
            onClick={() => onClick(character)}
            className={`${bgClass} p-3 rounded-xl hover:opacity-90 cursor-pointer transition-shadow shadow-md`}
        >
            <img
                src={imageUrl}
                alt={character.name}
                className="rounded-md w-full h-40 object-cover mb-3"
            />
            <h2 className="text-lg font-semibold text-white">{character.name}</h2>
            <p className="text-sm text-white/90">{speciesName}</p>
        </div>
    );
}
