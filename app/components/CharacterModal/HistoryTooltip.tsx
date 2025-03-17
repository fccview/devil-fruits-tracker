import { useState, useRef, useEffect } from "react";

interface HistoryItem {
  value: string;
  label?: string;
}

interface Props {
  items: HistoryItem[];
  currentValue: string;
  title: string;
  description: string;
  formatValue?: (value: string) => string;
  prefix?: string;
  position?: "left" | "right";
}

export default function HistoryTooltip({
  items,
  currentValue,
  title,
  description,
  formatValue = (v) => v,
  prefix,
  position = "right",
}: Props) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {prefix && <span className="text-red-400">{prefix}</span>}
      <div className="flex items-center gap-2 text-sm">
        <span>{formatValue(currentValue)}</span>
        {items.length > 0 && (
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500/30 transition-colors"
            >
              History
            </button>
            {showTooltip && (
              <div
                ref={tooltipRef}
                className={`absolute ${
                  position === "right" ? "right-full mr-2" : "left-0 ml-2"
                } mt-2 w-56 bg-[#1a1a2e]/95 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl z-50`}
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <h3 className="text-sm font-medium text-white">{title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
                <div className="py-2 max-h-[200px] overflow-y-auto">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2.5 hover:bg-white/5 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded-md bg-white/5 text-gray-400 group-hover:bg-white/10 transition-colors">
                          {item.label || `#${items.length - index}`}
                        </span>
                      </div>
                      <span className="text-gray-300 font-medium">
                        {formatValue(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
