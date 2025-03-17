import { useState } from "react";
import { DevilFruit, ViewType } from "../../types";
import { getSpoilerSafeValue } from "../../utils/globalFunctions";

interface Props {
  fruit: DevilFruit;
  number: string;
  type: ViewType;
}

export default function Description({ fruit, number, type }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const description = getSpoilerSafeValue(fruit, "description", number, type);
  const words = description.split(" ");
  const shouldTruncate = words.length > 20;
  const truncatedText = shouldTruncate
    ? words.slice(0, 20).join(" ") + "..."
    : description;

  return (
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
    </div>
  );
}
