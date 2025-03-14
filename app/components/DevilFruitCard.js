'use client'
import { useState } from 'react'
import CharacterModal from './CharacterModal'
import { filterSpoilers } from '../utils/spoilerFilter'

export default function DevilFruitCard({ fruit, number, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
      <>
        <div className="group">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden 
                        border border-white/10 shadow-xl transition-all duration-500 
                        hover:border-red-500/30 hover:shadow-red-500/10">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={fruit.avatarSrc} 
                alt={fruit.englishName} 
                className="w-full h-full object-cover transition-transform duration-500 
                         group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t 
                            from-[#1a1a2e] via-[#1a1a2e]/20 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 
                           bg-clip-text text-transparent">
                {filterSpoilers(fruit.englishName, number, fruit.englishName, type)}
              </h3>
              <div className="flex flex-col space-y-0.5 mb-4">
                <span className="text-sm text-gray-500">
                  {filterSpoilers(fruit.englishName, number, fruit.japaneseName, type)}
                </span>
                <span className="text-xs text-gray-600 italic">
                  {filterSpoilers(fruit.englishName, number, fruit.romanizedName, type)}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="text-red-400 font-medium">Type:</span> {filterSpoilers(fruit.englishName, number, fruit.type, type)}
                </p>
                <div className="text-gray-300">
                  <span className="text-red-400 font-medium">Owner:</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="ml-2 text-yellow-400 underline cursor-pointer transition-colors"
                  >
                    {filterSpoilers(fruit.englishName, number, 
                      { currentOwner: fruit.currentOwner, previousOwner: fruit.previousOwner }, 
                      type, 
                      'owner')}
                  </button>
                  <span className="text-xs ml-2">(Potential Spoilers)</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {filterSpoilers(fruit.englishName, number, fruit.description, type)}
                </p>
                <p className="mt-4 text-sm border-t border-white/10 pt-4 text-gray-500">
                  <span className="text-red-400">Debut:</span> {fruit.usageDebut}
                </p>
              </div>
            </div>
          </div>
        </div>

        <CharacterModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          characterName={filterSpoilers(fruit.englishName, number, 
            { currentOwner: fruit.currentOwner, previousOwner: fruit.previousOwner }, 
            type, 
            'owner')}
          devilFruitImage={fruit.avatarSrc}
        />
      </>
    );
  }
  