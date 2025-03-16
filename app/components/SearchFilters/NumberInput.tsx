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
  setSelectedArc,
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
    return arcs.find((arc) => {
      const arcEnd = type === "chapter" ? arc.endChapter : arc.endEpisode;
      const nextArc = arcs[arcs.indexOf(arc) + 1];
      const nextArcStart = nextArc
        ? type === "chapter"
          ? nextArc.endChapter
          : nextArc.endEpisode
        : Infinity;

      return (
        value <= arcEnd &&
        (arc === arcs[0] ||
          value >
            (type === "chapter"
              ? arcs[arcs.indexOf(arc) - 1].endChapter
              : arcs[arcs.indexOf(arc) - 1].endEpisode))
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(inputValue)) {
      return;
    }

    // Handle empty input
    if (inputValue === "") {
      setNumber("");
      setSelectedArc(null);
      setSearchTerm("");
      return;
    }

    let value = parseInt(inputValue, 10);

    // Enforce max chapter limit
    if (type === "chapter" && value > LATEST_CHAPTER) {
      value = LATEST_CHAPTER;
    }

    setNumber(value.toString());
    setSearchTerm(""); // Reset search when changing number

    // Find and set matching arc
    const matchingArc = findMatchingArc(value);
    setSelectedArc(matchingArc || null);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-400 mb-1 font-medium tracking-wide">
        Enter {type === "chapter" ? "chapter" : "episode"} number
      </div>

      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          placeholder={`${type === "chapter" ? "Ch." : "Ep."}`}
          className="w-40 text-6xl font-bold text-center bg-transparent 
                   text-gray-100 border-b-2 border-white/20
                   focus:border-red-500 focus:outline-none
                   transition-all duration-300 hover:border-white/40
                   py-2 px-1"
          value={number}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      {type === "chapter" && (
        <div className="mt-1 text-xs tracking-wider uppercase">
          <span className="text-gray-500">Latest </span>
          <span className="text-red-400 font-medium">{LATEST_CHAPTER}</span>
        </div>
      )}
    </div>
  );
}
