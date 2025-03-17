import { DevilFruit, ViewType } from "../../types";
import { getSpoilerSafeValue } from "../../utils/globalFunctions";

interface Props {
  fruit: DevilFruit;
  number: string;
  type: ViewType;
  ownerType: "currentOwner" | "previousOwner" | "seraphim";
  onOwnerClick: (
    ownerType: "currentOwner" | "previousOwner" | "seraphim"
  ) => void;
}

export default function OwnerButton({
  fruit,
  number,
  type,
  ownerType,
  onOwnerClick,
}: Props) {
  const isPreviousOwnerValid = (owner: string) => {
    return owner !== "Unknown" && owner !== "N/A";
  };

  const owner = getSpoilerSafeValue(fruit, ownerType, number, type);
  if (
    ownerType === "previousOwner" &&
    (!isPreviousOwnerValid(owner) || Number(number) < 703)
  ) {
    return null;
  }

  if (ownerType === "seraphim" && (!owner || !isPreviousOwnerValid(owner))) {
    return null;
  }

  const ownerLabels = {
    currentOwner: "Owner:",
    previousOwner: "Previous Owner:",
    seraphim: "Seraphim:",
  };

  return (
    <div className="text-gray-300">
      <span className="text-red-400 font-medium">{ownerLabels[ownerType]}</span>
      <button
        onClick={() => onOwnerClick(ownerType)}
        className="ml-2 text-yellow-400 underline cursor-pointer transition-colors"
      >
        {owner}
      </button>
      <span className="text-xs ml-2">(Potential Spoilers)</span>
    </div>
  );
}
