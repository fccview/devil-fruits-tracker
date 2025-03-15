import { returnLatestChapter } from "@/app/actions/databaseActions/fetchFruit";
import { useEffect, useState } from "react";

export default function NumberInput({ type, number, setNumber, setSearchTerm, isLoading }) {
  const [LATEST_CHAPTER, setLATEST_CHAPTER] = useState(0);

  useEffect(() => {
    const fetchLatestChapter = async () => {
      const latestChapter = await returnLatestChapter();
      setLATEST_CHAPTER(latestChapter);
    };

    fetchLatestChapter();
  }, []);

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (type === 'chapter' && value > LATEST_CHAPTER) {
      value = LATEST_CHAPTER;
    }
    setNumber(value);
    setSearchTerm(''); // Reset search when changing number
  };

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
        onChange={handleChange}
        max={type === 'chapter' ? LATEST_CHAPTER : undefined}
        disabled={isLoading}
      />
      {type === 'chapter' && (
        <div className="text-xs text-gray-400 mt-1">
          Latest available chapter: {LATEST_CHAPTER}
        </div>
      )}
    </div>
  )
} 