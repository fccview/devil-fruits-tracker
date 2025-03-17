import { DevilFruit, ViewType } from "../../types";
import { getSpoilerSafeValue } from "../../utils/globalFunctions";
import OwnerButton from "./OwnerButton";

interface Props {
  fruit: DevilFruit;
  number: string;
  type: ViewType;
  onOwnerClick: (
    ownerType: "currentOwner" | "previousOwner" | "seraphim"
  ) => void;
}

export default function CardHeader({
  fruit,
  number,
  type,
  onOwnerClick,
}: Props) {
  const englishName = getSpoilerSafeValue(fruit, "englishName", number, type);
  const japaneseName = getSpoilerSafeValue(fruit, "japaneseName", number, type);
  const finalType = getSpoilerSafeValue(fruit, "type", number, type);

  return (
    <div className="md:block hidden">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
        {englishName}
      </h3>
      <div className="mb-4">
        <span className="text-sm text-gray-500">{japaneseName}</span>
      </div>
      <div className="space-y-3">
        <p className="text-gray-300">
          <span className="text-red-400 font-medium">Type:</span> {finalType}
        </p>
        <OwnerButton
          fruit={fruit}
          number={number}
          type={type}
          ownerType="currentOwner"
          onOwnerClick={onOwnerClick}
        />
        <OwnerButton
          fruit={fruit}
          number={number}
          type={type}
          ownerType="previousOwner"
          onOwnerClick={onOwnerClick}
        />
        <OwnerButton
          fruit={fruit}
          number={number}
          type={type}
          ownerType="seraphim"
          onOwnerClick={onOwnerClick}
        />
      </div>
    </div>
  );
}
