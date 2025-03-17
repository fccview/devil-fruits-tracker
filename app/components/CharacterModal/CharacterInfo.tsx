import Image from "next/image";
import { Character } from "../../types";
import HistoryTooltip from "./HistoryTooltip";

interface Props {
  character: Character;
  devilFruitImage: string;
}

export default function CharacterInfo({ character, devilFruitImage }: Props) {
  const parseAge = (age: string) => {
    const ages = age.split(";").map((a) => {
      const match = a.match(/(\d+)\s*\((.*?)\)/);
      return match
        ? { value: match[1], label: match[2].trim() }
        : { value: a.trim() };
    });

    return {
      current: ages[0].value,
      history: ages.slice(1).reverse(),
    };
  };

  const ageInfo = character.age
    ? parseAge(character.age)
    : { current: "Unknown", history: [] };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-gray-300">
      <div className="space-y-2">
        <p>
          <span className="text-red-400">Origin:</span>{" "}
          {character.origin || "Unknown"}
        </p>
        <HistoryTooltip
          prefix="Age:"
          currentValue={ageInfo.current}
          items={ageInfo.history}
          title="Age History"
          description="Character's age throughout the series"
          position="left"
        />
        <p>
          <span className="text-red-400">Birthday:</span>{" "}
          {character.birthday || "Unknown"}
        </p>
      </div>
      <div className="space-y-2">
        <p>
          <span className="text-red-400">Blood Type:</span>{" "}
          {character.bloodType || "Unknown"}
        </p>
        <div className="md:flex items-center gap-2">
          <span className="text-red-400">Devil Fruit:</span>
          {character.devilFruitName !== "N/A" && (
            <Image
              src={devilFruitImage}
              alt={character.devilFruitName}
              className="w-6 h-auto hidden md:block"
              width={100}
              height={100}
              onError={(e) =>
                ((e.target as HTMLImageElement).style.display = "none")
              }
            />
          )}
          <span className="pl-2 md:pl-0">
            {character.devilFruitName || "None"}
          </span>
        </div>
        <p>
          <span className="text-red-400">Debut:</span>{" "}
          {character.debut || "Unknown"}
        </p>
      </div>
    </div>
  );
}
