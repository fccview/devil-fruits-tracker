/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import CharacterModal from "./CharacterModal";
import InfoPopup from "./InfoPopup";
import { DevilFruit, ViewType } from "../types";
import { getSpoilerSafeValue } from "../utils/globalFunctions";

interface Props {
  fruit: DevilFruit;
  number: string;
  type: ViewType;
}

interface ChapterInfo {
  id: number;
  title: string;
  description: string;
  tome?: {
    tome_japan_date_publish: string;
  };
}

interface EpisodeInfo {
  id: number;
  title: string;
  description: string;
  release_date: string;
}

const getChapterInfo = (chapterNumber: string): ChapterInfo | null => {
  try {
    const chapters = require("../../scripts/data/chapters.json");
    return (
      chapters.find(
        (chapter: ChapterInfo) => chapter.id === parseInt(chapterNumber)
      ) || null
    );
  } catch (error) {
    return null;
  }
};

const getEpisodeInfo = (episodeNumber: string): EpisodeInfo | null => {
  try {
    const episodes = require("../../scripts/data/episodes.json");
    return (
      episodes.find(
        (episode: EpisodeInfo) => episode.id === parseInt(episodeNumber)
      ) || null
    );
  } catch (error) {
    return null;
  }
};

export default function DevilFruitCard({ fruit, number, type }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedOwnerType, setSelectedOwnerType] = useState<
    "currentOwner" | "previousOwner" | "seraphim"
  >("currentOwner");
  const [hoveredNumber, setHoveredNumber] = useState<string | null>(null);

  const isPreviousOwnerValid = (owner: string) => {
    return owner !== "Unknown" && owner !== "N/A";
  };

  const renderOwnerButton = (
    ownerType: "currentOwner" | "previousOwner" | "seraphim"
  ) => {
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
        <span className="text-red-400 font-medium">
          {ownerLabels[ownerType]}
        </span>
        <button
          onClick={() => {
            setSelectedOwnerType(ownerType);
            setIsModalOpen(true);
          }}
          className="ml-2 text-yellow-400 underline cursor-pointer transition-colors"
        >
          {owner}
        </button>
        <span className="text-xs ml-2">(Potential Spoilers)</span>
      </div>
    );
  };

  const description = getSpoilerSafeValue(fruit, "description", number, type);
  const words = description.split(" ");
  const shouldTruncate = words.length > 20;
  const truncatedText = shouldTruncate
    ? words.slice(0, 20).join(" ") + "..."
    : description;

  const renderDebut = () => {
    const debut = getSpoilerSafeValue(fruit, "usageDebut", number, type);
    const chapterMatch = debut.match(/Chapter (\d+)/);
    const episodeMatch = debut.match(/Episode (\d+)/);

    const chapterInfo = chapterMatch ? getChapterInfo(chapterMatch[1]) : null;
    const episodeInfo = episodeMatch ? getEpisodeInfo(episodeMatch[1]) : null;

    return (
      <div className="relative inline-block">
        {chapterMatch && (
          <>
            <span
              className="cursor-help underline decoration-dotted"
              onMouseEnter={() =>
                setHoveredNumber(`chapter-${chapterMatch[1]}`)
              }
              onMouseLeave={() => setHoveredNumber(null)}
            >
              Chapter {chapterMatch[1]}
            </span>
            {chapterInfo && (
              <InfoPopup
                title={chapterInfo.title}
                description={chapterInfo.description}
                releaseDate={chapterInfo.tome?.tome_japan_date_publish}
                isVisible={hoveredNumber === `chapter-${chapterMatch[1]}`}
              />
            )}
          </>
        )}
        {chapterMatch && episodeMatch && "; "}
        {episodeMatch && (
          <>
            <span
              className="cursor-help underline decoration-dotted"
              onMouseEnter={() =>
                setHoveredNumber(`episode-${episodeMatch[1]}`)
              }
              onMouseLeave={() => setHoveredNumber(null)}
            >
              Episode {episodeMatch[1]}
            </span>
            {episodeInfo && (
              <InfoPopup
                title={episodeInfo.title}
                description={episodeInfo.description}
                releaseDate={episodeInfo.release_date}
                isVisible={hoveredNumber === `episode-${episodeMatch[1]}`}
              />
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="group">
      <div
        className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl 
                      transition-all duration-500 hover:border-red-500/30 hover:shadow-red-500/10"
      >
        <div className="relative md:h-56 h-auto overflow-hidden">
          <img
            src={getSpoilerSafeValue(fruit, "avatarSrc", number, type)}
            alt={fruit.englishName}
            className="w-full h-full object-cover md:block hidden transition-transform duration-500  group-hover:scale-110"
          />
          <div className="md:hidden flex gap-4 p-4">
            <div className="relative w-32 h-32 flex-shrink-0">
              <img
                src={getSpoilerSafeValue(fruit, "avatarSrc", number, type)}
                alt={fruit.englishName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                {getSpoilerSafeValue(fruit, "englishName", number, type)}
              </h3>
              <div className="mb-2">
                <span className="text-xs text-gray-500">
                  {getSpoilerSafeValue(fruit, "japaneseName", number, type)}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-300">
                  <span className="text-red-400 font-medium">Type:</span>{" "}
                  {getSpoilerSafeValue(fruit, "type", number, type)}
                </p>
                {renderOwnerButton("currentOwner")}
                {renderOwnerButton("previousOwner")}
                {renderOwnerButton("seraphim")}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-4 pt-0 md:p-6">
          <div className="md:block hidden">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
              {getSpoilerSafeValue(fruit, "englishName", number, type)}
            </h3>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {getSpoilerSafeValue(fruit, "japaneseName", number, type)}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Type:</span>{" "}
                {getSpoilerSafeValue(fruit, "type", number, type)}
              </p>
              {renderOwnerButton("currentOwner")}
              {renderOwnerButton("previousOwner")}
              {renderOwnerButton("seraphim")}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-400 text-sm leading-relaxed hidden md:block">
              {description}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed md:hidden">
              {isExpanded ? description : truncatedText}
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-yellow-400 text-sm hover:text-yellow-300"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </p>
            <p className="mt-4 text-sm border-t border-white/10 pt-4 text-gray-500">
              <span className="text-red-400">Debut:</span> {renderDebut()}
            </p>
          </div>
        </div>
      </div>

      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        characterName={
          selectedOwnerType === "currentOwner"
            ? fruit.currentOwner
            : selectedOwnerType === "previousOwner"
            ? fruit.previousOwner
            : fruit.seraphim
        }
        devilFruitImage={fruit.avatarSrc}
      />
    </div>
  );
}
