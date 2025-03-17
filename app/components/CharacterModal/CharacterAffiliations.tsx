import { Character } from "../../types";

interface Props {
  character: Character;
}

export default function CharacterAffiliations({ character }: Props) {
  if (!character.affiliations || character.affiliations === "N/A") return null;

  const parseAffiliations = (affiliationsStr: string) => {
    // First split by semicolon
    const rawAffiliations = affiliationsStr.split(";");
    const affiliations = [];

    for (let i = 0; i < rawAffiliations.length; i++) {
      let current = rawAffiliations[i].trim();

      // Check if the next item is a status that belongs to this affiliation
      if (
        i + 1 < rawAffiliations.length &&
        rawAffiliations[i + 1].trim().startsWith("(")
      ) {
        current += rawAffiliations[i + 1];
        i++; // Skip the next item since we've incorporated it
      }

      // Now parse the combined string
      const statusMatch = current.match(/\((.*?)\)/g) || [];
      const statuses = statusMatch.map((s) => s.replace(/[()]/g, "").trim());

      let displayText = current
        .replace(/\s*\([^)]*\)/g, "") // Remove all parenthetical content
        .replace(/^\s*\?\s*/, "") // Remove leading question marks
        .trim();

      let status = null;
      if (statuses.includes("former")) {
        status = "Former";
      } else if (statuses.includes("temporary")) {
        status = "Temporary";
      } else if (statuses.includes("disbanded")) {
        status = "Disbanded";
      } else if (statuses.includes("undercover")) {
        status = "Undercover";
      } else if (statuses.includes("Unknown status")) {
        status = "Unknown Status";
      }

      affiliations.push({
        text: displayText,
        status: status,
      });
    }

    return affiliations;
  };

  const getAffiliationStyle = (status: string | null) => {
    const baseStyles =
      "px-3 py-0.5 rounded-full text-sm inline-flex items-center transition-colors";

    switch (status) {
      case "Former":
      case "Temporary":
      case "Disbanded":
      case "Unknown Status":
        return `${baseStyles} bg-white/5 text-gray-400 hover:bg-white/10`;
      case "Undercover":
        return `${baseStyles} bg-purple-500/20 text-purple-400 hover:bg-purple-500/30`;
      default:
        return `${baseStyles} bg-red-500/20 text-red-400 hover:bg-red-500/30`;
    }
  };

  return (
    <div className="border-t border-white/10 pt-4 mt-6">
      <h3 className="text-red-400 font-medium mb-3">Affiliations</h3>
      <div className="flex flex-wrap gap-2">
        {parseAffiliations(character.affiliations).map((affiliation, index) => (
          <div key={index} className={getAffiliationStyle(affiliation.status)}>
            {affiliation.text}
            {affiliation.status && (
              <span className="ml-2 px-1.5 py-0.5 bg-white/5 rounded-full text-[10px] font-medium uppercase">
                {affiliation.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
