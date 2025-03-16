import { ViewType } from "../../types";

interface FruitTypeFiltersProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FruitTypeFilters({
  selectedTypes,
  setSelectedTypes,
}: FruitTypeFiltersProps) {
  const fruitTypes = ['Paramecia', 'Zoan', 'Logia']

  const toggleType = (fruitType: string) => {
    setSelectedTypes((prev: string[]) => {
      if (prev.includes(fruitType)) {
        return prev.filter(t => t !== fruitType)
      }
      return [...prev, fruitType]
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {fruitTypes.map((fruitType) => (
          <label
            key={fruitType}
            className={`
              relative inline-flex items-center gap-2 px-3 py-1.5 
              rounded-full cursor-pointer select-none
              transition-all duration-300 
              ${selectedTypes.includes(fruitType)
                ? 'bg-red-500/20 text-red-400'
                : 'bg-red-500/5 text-red-400/70 hover:bg-red-500/10 hover:text-red-400/90'
              }
            `}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={selectedTypes.includes(fruitType)}
              onChange={() => toggleType(fruitType)}
            />
            <div className={`
              w-2 h-2 rounded-full transition-all duration-300 bg-red-400
              ${selectedTypes.includes(fruitType)
                ? 'opacity-100'
                : 'opacity-40'
              }
            `} />
            {fruitType}
          </label>
        ))}

        {selectedTypes.length > 0 && (
          <button
            onClick={() => setSelectedTypes([])}
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 opacity-60 hover:opacity-100 underline"
          >
            clear all
          </button>
        )}
      </div>
    </div>
  )
} 