"use client";
import { useState } from "react";
import { DevilFruitCardProps, OwnerType } from "./types";
import CardImage from "./CardImage";
import CardHeader from "./CardHeader";
import Description from "./Description";
import DebutInfo from "./DebutInfo";
import CharacterModal from "../CharacterModal/index";

export default function DevilFruitCard({
  fruit,
  number,
  type,
}: DevilFruitCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOwnerType, setSelectedOwnerType] =
    useState<OwnerType>("currentOwner");

  const ownerClickHandler = (ownerType: OwnerType) => {
    setSelectedOwnerType(ownerType);
    setIsModalOpen(true);
  };

  return (
    <div className="group">
      <div
        className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl 
                    transition-all duration-500 hover:border-red-500/30 hover:shadow-red-500/10"
      >
        <CardImage
          fruit={fruit}
          number={number}
          type={type}
          onOwnerClick={ownerClickHandler}
        />

        <div className="p-4 pt-0 md:p-6">
          <CardHeader
            fruit={fruit}
            number={number}
            type={type}
            onOwnerClick={ownerClickHandler}
          />

          <div className="mt-4">
            <Description fruit={fruit} number={number} type={type} />
            <DebutInfo fruit={fruit} number={number} type={type} />
          </div>
        </div>
      </div>

      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        characterName={fruit[selectedOwnerType]}
        devilFruitImage={fruit.avatarSrc}
      />
    </div>
  );
}
