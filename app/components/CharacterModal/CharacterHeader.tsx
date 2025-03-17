import Image from "next/image";
import { Character } from "../../types";

interface Props {
  character: Character;
}

export default function CharacterHeader({ character }: Props) {
  return (
    <div className="relative">
      <div className="h-48 overflow-hidden">
        <Image
          src={character.avatarSrc}
          alt={character.englishName}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent" />
      </div>

      <div className="absolute -bottom-16 left-6">
        <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-[#1a1a2e] shadow-xl">
          <Image
            src={character.avatarSrc}
            alt={character.englishName}
            className="w-full h-full object-cover object-top"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
