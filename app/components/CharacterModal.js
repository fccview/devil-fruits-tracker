'use client'
import { useEffect, useState } from 'react'
import { fetchCharacter } from '../actions/fetchCharacter'

export default function CharacterModal({ isOpen, onClose, characterName, devilFruitImage }) {
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllBounties, setShowAllBounties] = useState(false)

  useEffect(() => {
    if (isOpen && characterName) {
      setLoading(true)
      fetchCharacter(characterName)
        .then(data => setCharacter(data))
        .finally(() => setLoading(false))
    }
  }, [isOpen, characterName])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto" 
      onClick={handleBackdropClick}
    >
      <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12">
              <img src="/gomugomu.png" alt="Loading..." className="w-full h-full" />
            </div>
          </div>
        ) : character ? (
          <>
            {/* Header with both banner and avatar */}
            <div className="relative">
              <div className="h-48 overflow-hidden">
                <img 
                  src={character.avatarSrc} 
                  alt={character.englishName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent" />
              </div>
              
              {/* Avatar overlay */}
              <div className="absolute -bottom-16 left-6">
                <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-[#1a1a2e] shadow-xl">
                  <img 
                    src={character.avatarSrc} 
                    alt={character.englishName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 pt-20">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                    {character.englishName}
                  </h2>
                  <p className="text-gray-400 text-sm">{character.japaneseName}</p>
                </div>
                {character.bounty && (
                  <div className="flex flex-col items-end">
                    {character.bounty.split(' ').map((bounty, index, array) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                          ${index === 0 
                            ? 'bg-red-500/20 text-red-400 font-bold' 
                            : index === 1 
                              ? 'bg-white/5 text-gray-400 mt-2' 
                              : 'text-gray-500 text-xs'
                          }
                        `}
                      >
                        <span className="font-mono">₿</span>
                        {new Intl.NumberFormat('en-US').format(parseInt(bounty.replace(/[^\d]/g, '')))}
                        {index === 0 && array.length > 1 && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                            Current
                          </span>
                        )}
                        {index === 1 && array.length > 2 && (
                          <button 
                            onClick={() => setShowAllBounties(prev => !prev)}
                            className="text-xs px-2 py-0.5 bg-white/5 text-gray-400 rounded-full hover:bg-white/10 transition-colors"
                          >
                            Show more
                          </button>
                        )}
                      </div>
                    )).slice(0, showAllBounties ? undefined : 2)}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <p><span className="text-red-400">Origin:</span> {character.origin || 'Unknown'}</p>
                  <p><span className="text-red-400">Age:</span> {character.age || 'Unknown'}</p>
                  <p><span className="text-red-400">Birthday:</span> {character.birthday || 'Unknown'}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-red-400">Blood Type:</span> {character.bloodType || 'Unknown'}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400">Devil Fruit:</span>
                    {character.devilFruitName !== 'N/A' && (
                      <img 
                        src={devilFruitImage}
                        alt={character.devilFruitName}
                        className="w-6 h-auto"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <span>{character.devilFruitName || 'None'}</span>
                  </div>
                  <p><span className="text-red-400">Debut:</span> {character.debut || 'Unknown'}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6">
                <h3 className="text-red-400 font-medium mb-2">Affiliations</h3>
                <p className="text-gray-300 text-sm">{character.affiliations || 'None'}</p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="text-red-400 font-medium mb-2">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{character.description}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-gray-400">
            No character information found
          </div>
        )}
        
        <div className="p-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 