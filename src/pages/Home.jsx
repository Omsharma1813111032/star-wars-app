import { useEffect, useState } from "react";
import { fetchPeople, fetchSpecies } from "../api/swapi";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
    const [characters, setCharacters] = useState([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [selectedSpecies, setSelectedSpecies] = useState("");
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // console.log(selectedCharacter)

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
            const peopleData = await fetchPeople(page, debouncedSearch);
            const speciesData =
                speciesList.length === 0 ? await fetchSpecies() : { results: speciesList };

            const speciesMap = {};
            speciesData.results.forEach((sp) => (speciesMap[sp.url] = sp.name));

            const mappedPeople = peopleData.results.map((person) => ({
                ...person,
                speciesNames: person.species.map((url) => speciesMap[url] || "Unknown"),
            }));

            setCharacters(mappedPeople);
            setSpeciesList(speciesData.results);
            setCount(peopleData.count);
        }
        loadData();
    }, [page, debouncedSearch]);

    const filtered =
        selectedSpecies && selectedSpecies !== ""
            ? characters.filter((c) => c.speciesNames.includes(selectedSpecies))
            : characters;

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                <SearchBar search={search} setSearch={setSearch} />
                {/* <FilterDropdown
                    speciesList={speciesList}
                    selected={selectedSpecies}
                    setSelected={setSelectedSpecies}
                /> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((char) => (
                    <CharacterCard
                        key={char.name}
                        character={char}
                        onClick={() => handleCharacterClick(char)}
                    />
                ))}
            </div>

            <Pagination count={count} currentPage={page} setPage={setPage} />

            {selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </div>
    );
}
