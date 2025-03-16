import { ViewType } from "@/app/types";

interface TypeSelectorProps {
  type: ViewType;
  setType: (type: ViewType) => void;
  number: string;
}

export default function TypeSelector({
  type,
  setType,
  number,
}: TypeSelectorProps) {
  return (
    <div className="flex items-center justify-center gap-6 mb-4">
      <button
        onClick={() => setType("chapter")}
        className={`text-base font-semibold transition-colors duration-300 ${
          type === "chapter"
            ? "text-red-500"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Manga
      </button>

      <button
        onClick={() => setType(type === "chapter" ? "episode" : "chapter")}
        className="relative inline-flex h-6 w-14 items-center rounded-full bg-white/10"
      >
        <span className="sr-only">Switch between manga and anime</span>
        <span
          className={`${
            type === "chapter" ? "translate-x-1" : "translate-x-9"
          } inline-block h-4 w-4 transform rounded-full bg-red-500 transition duration-300`}
        />
      </button>

      <button
        onClick={() => setType("episode")}
        className={`text-base font-semibold transition-colors duration-300 ${
          type === "episode"
            ? "text-red-500"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Anime
      </button>
    </div>
  );
}
