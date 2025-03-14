export default function NumberInput({ type, number, setNumber, setSearchTerm, isLoading }) {
  return (
    <div className="flex gap-3">
      <input
        type="number"
        placeholder={`Enter ${type} number...`}
        className="w-full px-6 py-3 bg-white/5 rounded-xl text-gray-100 
                 border border-white/10 focus:border-red-500/50 
                 focus:outline-none focus:ring-2 focus:ring-red-500/20
                 placeholder-gray-500 transition-all duration-300"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value)
          setSearchTerm('') // Reset search when changing number
        }}
        disabled={isLoading}
      />
    </div>
  )
} 