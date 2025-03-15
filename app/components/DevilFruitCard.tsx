/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import CharacterModal from './CharacterModal'
import { DevilFruit, ViewType } from '../types'
import { getSpoilerSafeValue } from '../utils/globalFunctions';

interface Props {
    fruit: DevilFruit;
    number: string;
    type: ViewType;
}

export default function DevilFruitCard({ fruit, number, type }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <>
            <div className="group">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden 
                        border border-white/10 shadow-xl transition-all duration-500 
                        hover:border-red-500/30 hover:shadow-red-500/10">
                    <div className="relative h-56 overflow-hidden">
                        <img
                            src={getSpoilerSafeValue(fruit, 'avatarSrc', number, type)}
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
                            {getSpoilerSafeValue(fruit, 'englishName', number, type)}
                        </h3>
                        <div className="flex flex-col space-y-0.5 mb-4">
                            <span className="text-sm text-gray-500">
                                {getSpoilerSafeValue(fruit, 'japaneseName', number, type)}
                            </span>
                        </div>
                        <div className="space-y-3">
                            <p className="text-gray-300">
                                <span className="text-red-400 font-medium">Type:</span> {getSpoilerSafeValue(fruit, 'type', number, type)}
                            </p>
                            <div className="text-gray-300">
                                <span className="text-red-400 font-medium">Owner:</span>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="ml-2 text-yellow-400 underline cursor-pointer transition-colors"
                                >
                                    {getSpoilerSafeValue(fruit, 'currentOwner', number, type)}
                                </button>
                                <span className="text-xs ml-2">(Potential Spoilers)</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {getSpoilerSafeValue(fruit, 'description', number, type)}
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
                characterName={getSpoilerSafeValue(fruit, 'currentOwner', number, type)}
                devilFruitImage={fruit.avatarSrc}
            />
        </>
    );
}
