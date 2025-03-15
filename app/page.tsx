'use client'
import { useState, useEffect, useCallback } from 'react'
import DevilFruitList from './components/DevilFruitList'
import LoadingSpinner from './components/LoadingSpinner'
import SearchFilters from './components/SearchFilters/SearchFilters'
import BuyMeACoffee from './components/BuyMeACoffee'
import { fetchDevilFruits } from './actions/databaseActions/fetchFruit'
import { DevilFruit, ViewType } from './types'
import { getSpoilerSafeValue } from './utils/globalFunctions'

export default function Home() {
  const [number, setNumber] = useState<string>('')
  const [type, setType] = useState<ViewType>('chapter')
  const [fruits, setFruits] = useState<DevilFruit[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedFruitTypes, setSelectedFruitTypes] = useState<string[]>([])

  const handleFetch = useCallback(async (value: string) => {
    if (!value) {
      setFruits([])
      return
    }

    setIsLoading(true)
    try {
      const data = await fetchDevilFruits(Number(value), type)
      setFruits(data)
    } catch (error) {
      console.error('Error fetching fruits:', error)
    } finally {
      setIsLoading(false)
    }
  }, [type])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFetch(number)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [number, handleFetch])

  const filterFruits = useCallback((fruits: DevilFruit[]) => {
    return fruits.filter((fruit: DevilFruit) => {
      const searchString = `${getSpoilerSafeValue(fruit, 'englishName', number, type)
        } ${getSpoilerSafeValue(fruit, 'type', number, type)
        } ${getSpoilerSafeValue(fruit, 'usageDebut', number, type)
        } ${getSpoilerSafeValue(fruit, 'currentOwner', number, type)
        }`.toLowerCase()

      const searchMatch = searchTerm.toLowerCase().split(' ').every(term =>
        searchString.includes(term)
      )
      if (!searchMatch) return false

      if (selectedFruitTypes.length > 0) {
        let fruitType = getSpoilerSafeValue(fruit, 'type', number, type)
        if (!selectedFruitTypes.some(type => fruitType.includes(type))) {
          return false
        }
      }

      return true
    })
  }, [searchTerm, selectedFruitTypes, type, number])

  const filteredFruits = filterFruits(fruits)

  return (
    <main className="min-h-screen bg-[#1a1a2e]">
      <div className="fixed inset-0 bg-[url('/one-piece-bg.png')] bg-cover bg-fixed bg-center opacity-20" />

      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 
                         bg-clip-text text-transparent drop-shadow-lg mb-6 
                         font-pirate tracking-wider animate-float">
              Devil Fruits
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Devil fruit listed by chapter/episode. <br />
              <span className="text-xs">Background artwork by <a href="https://zzyzzyy.deviantart.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">zzyzzyy</a></span>
            </p>
          </div>

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
          />

          {/* {console.log(filteredFruits.map(fruit => ({
            englishName: fruit.englishName,
            currentOwner: fruit.currentOwner,
            previousOwner: fruit.previousOwner
          })))} */}

          {/* Results */}
          <div className="container mx-auto lg:px-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : filteredFruits.length > 0 ? (
              <DevilFruitList fruits={filteredFruits} number={number} type={type} />
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
      </div>

      <BuyMeACoffee />
    </main>
  )
}
