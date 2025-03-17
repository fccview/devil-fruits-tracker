/* eslint-disable @next/next/no-img-element */
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

export default function CardImage({
  fruit,
  number,
  type,
  onOwnerClick,
}: Props) {
  const avatarSrc = getSpoilerSafeValue(fruit, "avatarSrc", number, type);
  const englishName = getSpoilerSafeValue(fruit, "englishName", number, type);
  const japaneseName = getSpoilerSafeValue(fruit, "japaneseName", number, type);
  const finalType = getSpoilerSafeValue(fruit, "type", number, type);

  return (
    <div className="relative md:h-56 h-auto overflow-hidden">
      <img
        src={avatarSrc}
        alt={englishName}
        className="w-full h-full object-cover md:block hidden transition-transform duration-500 group-hover:scale-110"
      />
      <div className="md:hidden flex gap-4 p-4">
        <div className="relative w-32 h-32 flex-shrink-0">
          <img
            src={avatarSrc}
            alt={englishName}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
            {englishName}
          </h3>
          <div className="mb-2">
            <span className="text-xs text-gray-500">{japaneseName}</span>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-gray-300">
              <span className="text-red-400 font-medium">Type:</span>{" "}
              {finalType}
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
      </div>
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/20 to-transparent" />
    </div>
  );
}
