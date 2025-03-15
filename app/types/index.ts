export interface DevilFruit {
    avatarSrc: string;
    currentOwner: string;
    description: string;
    englishName: string;
    japaneseName: string;
    previousOwner?: string;
    romanizedName?: string;
    type: "Paramecia" | "Zoan" | "Logia";
    usageDebut: string;
    id: string;
    spoilers?: SpoilerInfo[];
}

export interface SpoilerInfo {
    threshold: {
        chapter: number;
        episode: number;
    };
    previousValues: {
        englishName?: string;
        japaneseName?: string;
        type?: "Paramecia" | "Zoan" | "Logia";
        description?: string;
        avatarSrc?: string;
        whatOwner?: 'previousOwner' | 'currentOwner';
    };
}

export interface Character {
    affiliations?: string;
    age?: string;
    avatarSrc: string;
    birthday?: string;
    bloodType?: string;
    bounty?: string;
    debut?: string;
    description: string;
    devilFruitName?: string;
    englishName: string;
    japaneseName: string;
    origin?: string;
    _id?: string;
}

export type ViewType = 'chapter' | 'episode';

export interface ServerCache {
    chapter: { [key: number]: DevilFruit[] };
    episode: { [key: number]: DevilFruit[] };
}

export interface SearchFiltersProps {
    type: ViewType
    setType: (type: ViewType) => void
    number: string
    setNumber: (number: string) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedFruitTypes: string[]
    setSelectedFruitTypes: (types: string[]) => void
    fruits: DevilFruit[]
    isLoading: boolean
}

export interface TextSearchProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
} 