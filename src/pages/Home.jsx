import { useEffect, useState } from "react";
import { fetchAllSpecies, fetchPeople } from "../api/swapi";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import CharacterSkeleton from "../components/CharacterSkeleton";

export default function Home() {
    const [characters, setCharacters] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const handleCharacterClick = async (character) => {
        try {
            let homeworldDetails = null;

            if (character.homeworld) {
                const res = await fetch(character.homeworld);
                if (res.ok) {
                    homeworldDetails = await res.json();
                }
            }

            setSelectedCharacter({
                ...character,
                homeworldDetails,
            });
        } catch (error) {
            console.error("Error fetching homeworld details:", error);
            setSelectedCharacter({
                ...character,
                homeworldDetails: null,
            });
        }
    };
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError("");
            try {
                const peopleData = await fetchPeople(page, debouncedSearch);
                let allSpecies = speciesList;

                if (speciesList.length === 0) {
                    allSpecies = await fetchAllSpecies();
                }

                const speciesMap = {};
                allSpecies.forEach((sp) => (speciesMap[sp.url] = sp.name));

                const mappedPeople = peopleData.results.map((person) => ({
                    ...person,
                    speciesNames: person.species.map((url) => speciesMap[url] || "Unknown"),
                }));

                setCharacters(mappedPeople);
                setSpeciesList(allSpecies);
                setCount(peopleData.count);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [page, debouncedSearch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    const filtered =
        selectedSpecies && selectedSpecies !== ""
            ? characters.filter((c) => c.speciesNames.includes(selectedSpecies))
            : characters;

    if (loading)
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <CharacterSkeleton key={i} />
                ))}
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-400 mt-20 text-lg">{error}</div>
        );

    // if (!filtered.length)
    //     return (
    //         <div className="text-center text-gray-400 mt-20">
    //             No characters found matching your search.
    //         </div>
    //     );

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-end gap-4">
                <SearchBar search={search} setSearch={setSearch} />
            </div>

            {
                !filtered.length ?
                    <div className="text-center text-gray-400 mt-20">
                        No characters found matching your search.
                    </div>
                    :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filtered.map((char) => (
                                <CharacterCard
                                    key={char.name}
                                    character={char}
                                    onClick={() => handleCharacterClick(char)}
                                />
                            ))}
                        </div>

                        <Pagination count={count} currentPage={page} setPage={setPage} />
                    </>
            }

            {selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </div>
    );
}
