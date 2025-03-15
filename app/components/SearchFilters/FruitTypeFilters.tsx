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
    <>
      <div className="text-gray-300 text-sm">Filter by:</div>
      <div className="flex flex-wrap gap-3">
        {fruitTypes.map((fruitType) => (
          <button
            key={fruitType}
            onClick={() => toggleType(fruitType)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
                    ${selectedTypes.includes(fruitType)
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
          >
            {fruitType}
          </button>
        ))}
      </div>
    </>
  )
} 