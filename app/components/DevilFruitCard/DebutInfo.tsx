import { useState } from "react";
import InfoPopup from "../InfoPopup";
import { DevilFruit, ViewType } from "../../types";
import { getSpoilerSafeValue } from "../../utils/globalFunctions";

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
    const chapters = require("../../../scripts/data/chapters.json");
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
    const episodes = require("../../../scripts/data/episodes.json");
    return (
      episodes.find(
        (episode: EpisodeInfo) => episode.id === parseInt(episodeNumber)
      ) || null
    );
  } catch (error) {
    return null;
  }
};

export default function DebutInfo({ fruit, number, type }: Props) {
  const [hoveredNumber, setHoveredNumber] = useState<string | null>(null);

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
    <div className="mt-4 text-sm border-t border-white/10 pt-4 text-gray-500">
      <span className="text-red-400">Debut:</span> {renderDebut()}
    </div>
  );
}
