// src/api/swapi.js
const BASE_URL = "https://swapi.dev/api";

/**
 * Fetch people (SWAPI /people) with page and optional search.
 */
export async function fetchPeople(page = 1, search = "") {
    const url = `${BASE_URL}/people/?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch characters");
    return await res.json();
}

/**
 * Fetch first page of species (for dropdown). If you want all species, implement pagination here.
 */
export async function fetchSpeciesList() {
    const res = await fetch(`${BASE_URL}/species/`);
    if (!res.ok) throw new Error("Failed to fetch species list");
    return await res.json();
}

/**
 * Backwards-compatible alias: fetchSpecies -> fetchSpeciesList
 */
export const fetchSpecies = fetchSpeciesList;

/* ---------- species name cache/fetcher ---------- */
const speciesNameCache = {};

/**
 * Fetch species name by URL, with simple in-memory cache.
 * @param {string} url species URL from SWAPI
 * @returns {Promise<string>} species name
 */
export async function fetchSpeciesName(url) {
    if (!url) return "Unknown";
    if (speciesNameCache[url]) return speciesNameCache[url];

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("species fetch failed");
        const data = await res.json();
        speciesNameCache[url] = data.name || "Unknown";
        return speciesNameCache[url];
    } catch (err) {
        console.log(err)
        speciesNameCache[url] = "Unknown";
        return "Unknown";
    }
}
