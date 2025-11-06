const speciesColorMap = {
    "Human": "bg-blue-600",
    "Droid": "bg-gray-500",
    "Wookiee": "bg-amber-700",
    "Rodian": "bg-green-700",
    "Hutt": "bg-yellow-700",
    "Yoda's species": "bg-lime-600",
    "Trandoshan": "bg-emerald-700",
    "Mon Calamari": "bg-sky-700",
    "Ewok": "bg-orange-600",
    "Sullustan": "bg-stone-600",
    "Neimodian": "bg-teal-600",
    "Gungan": "bg-cyan-700",
    "Toydarian": "bg-blue-400",
    "Dug": "bg-red-600",
    "Twi'lek": "bg-pink-600",
    "Aleena": "bg-purple-600",
    "Vulptereen": "bg-indigo-600",
    "Xexto": "bg-violet-700",
    "Toong": "bg-fuchsia-700",
    "Cerean": "bg-rose-600",
    "Nautolan": "bg-green-500",
    "Zabrak": "bg-red-700",
    "Tholothian": "bg-blue-700",
    "Iktotchi": "bg-indigo-700",
    "Quermian": "bg-slate-700",
    "Kel Dor": "bg-orange-700",
    "Chagrian": "bg-cyan-600",
    "Geonosian": "bg-amber-800",
    "Mirialan": "bg-emerald-600",
    "Clawdite": "bg-lime-700",
    "Besalisk": "bg-stone-700",
    "Kaminoan": "bg-sky-500",
    "Skakoan": "bg-slate-500",
    "Muun": "bg-gray-600",
    "Togruta": "bg-red-500",
    "Kaleesh": "bg-yellow-600",
    "Pau'an": "bg-neutral-700",
};

const defaultColor = "bg-zinc-600";

export function getSpeciesColor(speciesName = "Human") {
    const normalized = speciesName?.trim();
    return speciesColorMap[normalized] || defaultColor;
}
