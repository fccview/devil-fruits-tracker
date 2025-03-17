"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fetchCharacter } from "../../actions/databaseActions/fetchCharacter";
import { Character } from "../../types";
import LoadingSpinner from "../LoadingSpinner";
import CharacterHeader from "./CharacterHeader";
import CharacterBounties from "./CharacterBounties";
import CharacterInfo from "./CharacterInfo";
import CharacterAffiliations from "./CharacterAffiliations";
import CharacterDescription from "./CharacterDescription";

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
  devilFruitImage: string;
}

export default function CharacterModal({
  isOpen,
  onClose,
  characterName,
  devilFruitImage,
}: CharacterModalProps) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && characterName) {
      setLoading(true);
      fetchCharacter(characterName)
        .then((data) => setCharacter(data))
        .finally(() => setLoading(false));
    }
  }, [isOpen, characterName]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-[9999] md:flex md:items-center md:justify-center overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed w-full h-[80vh] md:h-[90vh] md:overflow-y-auto bottom-0 md:relative md:max-w-2xl md:m-4 bg-[#1a1a2e] border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out translate-y-0"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : character ? (
          <div className="h-full md:h-auto overflow-y-auto">
            <CharacterHeader character={character} />
            <div className="p-6 pt-20">
              <div className="flex justify-between items-start">
                <CharacterBounties character={character} />
              </div>
              <CharacterInfo
                character={character}
                devilFruitImage={devilFruitImage}
              />
              <CharacterAffiliations character={character} />
              <CharacterDescription character={character} />
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-400">
            No character information found
          </div>
        )}

        <div className="sticky bottom-0 p-4 border-t border-white/10 flex justify-end bg-[#1a1a2e]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
