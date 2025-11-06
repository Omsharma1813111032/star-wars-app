import React from "react";
import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((char, i) => (
        <CharacterCard key={i} character={char} onClick={() => onSelect(char)} />
      ))}
    </div>
  );
}
