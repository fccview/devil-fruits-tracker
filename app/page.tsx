"use client";
import { useState, useEffect, useCallback } from "react";
import DevilFruitList from "./components/DevilFruitList";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchFilters from "./components/SearchFilters/SearchFilters";
import BuyMeACoffee from "./components/BuyMeACoffee";
import { fetchDevilFruits } from "./actions/databaseActions/fetchFruit";
import { DevilFruit, ViewType } from "./types";
import { getSpoilerSafeValue } from "./utils/globalFunctions";
import { Arc } from "./data/arcs";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [number, setNumber] = useState<string>("");
  const [type, setType] = useState<ViewType>("chapter");
  const [fruits, setFruits] = useState<DevilFruit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFruitTypes, setSelectedFruitTypes] = useState<string[]>([]);
  const [selectedArc, setSelectedArc] = useState<Arc | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFetch = useCallback(
    async (value: string) => {
      if (!value) {
        setFruits([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchDevilFruits(Number(value), type);
        setFruits(data);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [type]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFetch(number);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [number, handleFetch]);

  useEffect(() => {
    setHasSearched(!!number);
  }, [number]);

  const filterFruits = useCallback(
    (fruits: DevilFruit[]) => {
      return fruits.filter((fruit: DevilFruit) => {
        if (selectedArc) {
          const match = fruit.usageDebut.match(/Chapter (\d+)/);
          if (match) {
            const fruitChapter = parseInt(match[1], 10);
            if (fruitChapter > selectedArc.endChapter) {
              return false;
            }
          }
        }

        if (
          selectedFruitTypes.length > 0 &&
          !selectedFruitTypes.includes(
            getSpoilerSafeValue(fruit, "type", number, type)
          )
        ) {
          return false;
        }

        const searchTerms = searchTerm.toLowerCase().split(" ");

        return searchTerms.every((term) => {
          const isNumber = /^\d+$/.test(term);

          if (isNumber) {
            const debutMatch = getSpoilerSafeValue(
              fruit,
              "usageDebut",
              number,
              type
            ).match(
              new RegExp(
                `${type.charAt(0).toUpperCase() + type.slice(1)} (\\d+)`
              )
            );

            return debutMatch && debutMatch[1] === term;
          } else {
            const searchString = `${getSpoilerSafeValue(
              fruit,
              "englishName",
              number,
              type
            )} 
            ${getSpoilerSafeValue(fruit, "type", number, type)} 
            ${getSpoilerSafeValue(fruit, "usageDebut", number, type)} 
            ${getSpoilerSafeValue(
              fruit,
              "currentOwner",
              number,
              type
            )}`.toLowerCase();

            return searchString.includes(term);
          }
        });
      });
    },
    [searchTerm, type, number, selectedArc, selectedFruitTypes]
  );

  const filteredFruits = filterFruits(fruits);

  return (
    <main className="min-h-screen pt-16 flex flex-col">
      <Header />

      <div
        className={`
        relative transition-all duration-700
        ${hasSearched ? "pt-8" : "pt-[25vh]"}
      `}
      >
        <div className="w-full max-w-2xl px-4 mx-auto">
          <SearchFilters
            type={type}
            setType={setType}
            number={number}
            setNumber={setNumber}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedFruitTypes={selectedFruitTypes}
            setSelectedFruitTypes={setSelectedFruitTypes}
            fruits={fruits}
            isLoading={isLoading}
            selectedArc={selectedArc}
            setSelectedArc={setSelectedArc}
          />
        </div>
      </div>

      <div
        className={`
        flex-1 transition-all duration-700 
        ${
          hasSearched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }
      `}
      >
        <div className="container mx-auto px-4 py-2 lg:py-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredFruits.length > 0 ? (
            <DevilFruitList
              fruits={filteredFruits}
              number={number}
              type={type}
            />
          ) : fruits.length > 0 ? (
            <p className="text-center text-gray-400 text-xl">
              No devil fruits found matching your search
            </p>
          ) : number ? (
            <p className="text-center text-gray-400 text-xl">
              No devil fruits found for this {type} number.
            </p>
          ) : null}
        </div>
      </div>

      <BuyMeACoffee />
      <Footer />
    </main>
  );
}
