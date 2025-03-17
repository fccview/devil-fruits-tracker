import { Character } from "../../types";

interface Props {
  character: Character;
}

export default function CharacterDescription({ character }: Props) {
  return (
    <div className="border-t border-white/10 pt-4 mt-4">
      <h3 className="text-red-400 font-medium mb-2">Description</h3>
      <p className="text-gray-300 text-sm leading-relaxed pb-15 md:pb-0">
        {character.description}
      </p>
    </div>
  );
}
