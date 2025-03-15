import { returnLatestChapter } from "@/app/actions/databaseActions/fetchFruit";
import { ViewType } from "@/app/types";
import { useEffect, useState } from "react";
import { Arc, arcs } from "@/app/data/arcs";

interface NumberInputProps {
  type: ViewType;
  number: string;
  setNumber: (value: string) => void;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
  setSelectedArc: (arc: Arc | null) => void;
}

export default function NumberInput({
  type,
  number,
  setNumber,
  setSearchTerm,
  isLoading,
  setSelectedArc
}: NumberInputProps) {
  const [LATEST_CHAPTER, setLATEST_CHAPTER] = useState<number>(0);

  useEffect(() => {
    const fetchLatestChapter = async () => {
      const latestChapter = await returnLatestChapter();
      setLATEST_CHAPTER(Number(latestChapter));
    };

    fetchLatestChapter();
  }, []);

  const findMatchingArc = (value: number) => {
    return arcs.find(arc => {
      const arcEnd = type === 'chapter' ? arc.endChapter : arc.endEpisode;
      const nextArc = arcs[arcs.indexOf(arc) + 1];
      const nextArcStart = nextArc
        ? (type === 'chapter' ? nextArc.endChapter : nextArc.endEpisode)
        : Infinity;

      return value <= arcEnd && (arc === arcs[0] || value > (type === 'chapter'
        ? arcs[arcs.indexOf(arc) - 1].endChapter
        : arcs[arcs.indexOf(arc) - 1].endEpisode));
    });
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (type === 'chapter' && value > LATEST_CHAPTER) {
      value = LATEST_CHAPTER;
    }
    setNumber(value.toString());
    setSearchTerm(''); // Reset search when changing number

    // Find and set matching arc
    const matchingArc = findMatchingArc(value);
    setSelectedArc(matchingArc || null);
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
  );
} 