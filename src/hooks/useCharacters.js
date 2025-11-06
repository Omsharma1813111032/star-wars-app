import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/api";

export default function useCharacters() {
    const [characters, setCharacters] = useState([]);
    const [url, setUrl] = useState("https://swapi.dev/api/people/?page=1");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchCharacters(url)
            .then((data) => {
                setCharacters(data.results);
                setNext(data.next);
                setPrev(data.previous);
                setError("");
            })
            .catch(() => setError("Failed to load characters."))
            .finally(() => setLoading(false));
    }, [url]);

    return {
        characters,
        loading,
        error,
        nextPage: next ? () => setUrl(next) : null,
        prevPage: prev ? () => setUrl(prev) : null,
    };
}
