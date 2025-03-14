export default function TypeSelector({ type, setType, number }) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      {['chapter', 'episode'].map((option) => (
        <button
          key={option}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${type === option
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          onClick={() => setType(option)}
        >
          {option === 'chapter' ? 'Manga Chapters' : 'Anime Episodes'}
        </button>
      ))}
    </div>
  )
} 