import React, { useState } from "react";
import useCharacters from "../hooks/useCharacters";
import CharacterList from "../components/CharacterList";
import Pagination from "../components/Pagination";
import CharacterModal from "../components/CharacterModal";

export default function CharactersPage() {
    const { characters, loading, error, nextPage, prevPage } = useCharacters();
    const [selected, setSelected] = useState(null);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-400">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <CharacterList characters={characters} onSelect={setSelected} />
            <Pagination nextPage={nextPage} prevPage={prevPage} />
            {selected && <CharacterModal character={selected} onClose={() => setSelected(null)} />}
        </div>
    );
}
