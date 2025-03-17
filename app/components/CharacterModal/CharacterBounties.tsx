import { Character } from "../../types";
import HistoryTooltip from "./HistoryTooltip";

interface Props {
  character: Character;
}

export default function CharacterBounties({ character }: Props) {
  const bounties = character.bounty.split(" ");
  const formatBounty = (bounty: string) => {
    return new Intl.NumberFormat("en-US").format(
      parseInt(bounty.replace(/[^\d]/g, ""))
    );
  };

  return (
    <div className="md:flex justify-between items-start w-full">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
        {character.englishName}
        <p className="text-gray-400 text-sm">{character.japaneseName}</p>
      </h2>
      {character.bounty && character.bounty !== "N/A" && (
        <div className="flex flex-col items-end w-full md:w-auto text-center md:text-left mt-2 md:mt-0">
          <div className="px-3 py-1.5 rounded-full text-sm bg-red-500/20 text-red-400 font-bold">
            <HistoryTooltip
              currentValue={bounties[0]}
              items={bounties.slice(1).map((b) => ({ value: b }))}
              title="Bounty History"
              description="Previous bounties in chronological order"
              formatValue={formatBounty}
              prefix="₿"
            />
          </div>
        </div>
      )}
    </div>
  );
}
