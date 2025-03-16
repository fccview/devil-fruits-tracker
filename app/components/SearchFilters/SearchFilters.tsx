import { useState } from "react";
import TypeSelector from "./TypeSelector";
import NumberInput from "./NumberInput";
import TextSearch from "./TextSearch";
import FruitTypeFilters from "./FruitTypeFilters";
import { SearchFiltersProps } from "@/app/types";
import ArcSelector from "./ArcSelector";

export default function SearchFilters({
  type,
  setType,
  number,
  setNumber,
  searchTerm,
  setSearchTerm,
  selectedFruitTypes,
  setSelectedFruitTypes,
  fruits,
  isLoading,
  selectedArc,
  setSelectedArc,
}: SearchFiltersProps) {
  return (
    <div
      className="max-w-2xl mx-auto mb-16 bg-white/5 backdrop-blur-lg p-8 rounded-2xl 
                    border border-white/10 shadow-2xl relative z-50"
    >
      <div className="flex flex-col gap-4">
        <TypeSelector type={type} setType={setType} number={number} />

        <NumberInput
          type={type}
          number={number}
          setNumber={setNumber}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          setSelectedArc={setSelectedArc}
        />

        <ArcSelector
          selectedArc={selectedArc}
          setSelectedArc={setSelectedArc}
          type={type}
          setNumber={setNumber}
        />

        {fruits.length > 0 && (
          <>
            <TextSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <FruitTypeFilters
              selectedTypes={selectedFruitTypes}
              setSelectedTypes={setSelectedFruitTypes}
            />
          </>
        )}
      </div>
    </div>
  );
}
