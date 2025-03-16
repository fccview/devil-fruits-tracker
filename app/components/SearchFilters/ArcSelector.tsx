import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Arc, arcs } from "@/app/data/arcs";
import { ViewType } from "@/app/types";

interface ArcSelectorProps {
  selectedArc: Arc | null;
  setSelectedArc: (arc: Arc | null) => void;
  type: ViewType;
  setNumber: (number: string) => void;
}

export default function ArcSelector({
  selectedArc,
  setSelectedArc,
  type,
  setNumber,
}: ArcSelectorProps) {
  const [query, setQuery] = useState("");

  // Flatten arcs and subarcs into a single array for searching
  const allArcs = arcs.flatMap((arc) => [
    { ...arc, displayName: arc.name, parentArc: null },
    ...(arc.subArcs?.map((subArc) => ({
      ...subArc,
      displayName: `${subArc.name}`,
      parentArc: arc,
    })) || []),
  ]);

  const filteredArcs =
    query === ""
      ? allArcs
      : allArcs.filter(
        (arc) =>
          arc.displayName.toLowerCase().includes(query.toLowerCase()) ||
          arc.parentArc?.saga.toLowerCase().includes(query.toLowerCase())
      );

  const handleArcSelect = (
    selectedItem: (Arc & { parentArc?: Arc | null; displayName: string }) | null
  ) => {
    if (!selectedItem) {
      setSelectedArc(null);
      return;
    }

    const mainArc = selectedItem.parentArc || selectedItem;
    setSelectedArc(mainArc);

    const numberToSet =
      type === "chapter"
        ? selectedItem.endChapter.toString()
        : selectedItem.endEpisode.toString();
    setNumber(numberToSet);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-gray-300 text-sm">Quick select by story arc:</div>
      <Combobox value={selectedArc} onChange={handleArcSelect}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white/5 border border-white/10 text-left">
            <Combobox.Input
              className="w-full border-none py-2 pl-4 pr-10 bg-transparent text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              displayValue={(arc: Arc | null) => arc?.name || ""}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search or select an arc"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 z-30">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-900/95 border border-white/10 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[50]">
              {filteredArcs.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-400">
                  Nothing found.
                </div>
              ) : (
                filteredArcs.map((arc) => (
                  <Combobox.Option
                    key={
                      arc.parentArc
                        ? `${arc.parentArc.name}-${arc.name}`
                        : arc.name
                    }
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? "bg-red-500/20 text-red-200" : "text-gray-300"
                      } ${arc.parentArc ? "pl-8" : ""}`
                    }
                    value={arc}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-semibold text-red-400" : ""
                            }`}
                        >
                          {arc.parentArc && "↳ "}
                          {arc.displayName}
                          {arc.isFiller ? " (Filler)" : ""} (
                          {type === "chapter"
                            ? `Ch. ${arc.endChapter}`
                            : `Ep. ${arc.endEpisode}`}
                          )
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
