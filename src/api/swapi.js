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
 * Fetch ALL species across all pages (SWAPI /species).
 * This ensures we get all 37 species in one go.
 */
export async function fetchAllSpecies() {
    let allSpecies = [];
    let nextUrl = `${BASE_URL}/species/`;

    while (nextUrl) {
        const res = await fetch(nextUrl);
        if (!res.ok) throw new Error("Failed to fetch species list");
        const data = await res.json();
        allSpecies = [...allSpecies, ...data.results];
        nextUrl = data.next;
    }

    return allSpecies;
}

/**
 * For backward compatibility — alias (can still use fetchSpecies or fetchSpeciesList)
 */
export const fetchSpecies = fetchAllSpecies;
export const fetchSpeciesList = fetchAllSpecies;

/* ---------- species name cache/fetcher ---------- */
const speciesNameCache = {};

/**
 * Fetch species name by URL, with in-memory cache.
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
        console.error("Error fetching species name:", err);
        speciesNameCache[url] = "Unknown";
        return "Unknown";
    }
}
