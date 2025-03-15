import { Arc } from '../data/arcs';

export interface DevilFruit {
    avatarSrc: string;
    currentOwner: string;
    description: string;
    englishName: string;
    japaneseName: string;
    seraphim: string;
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
        whatOwner?: "previousOwner" | "currentOwner";
        previousOwner?: string;
        currentOwner?: string;
        seraphim?: string;
    };
}

export interface Character {
    id?: string;
    englishName: string;
    japaneseName: string;
    origin?: string;
    age?: string;
    birthday?: string;
    bloodType?: string;
    devilFruitName?: string;
    debut?: string;
    affiliations?: string;
    description: string;
    bounty?: string;
    avatarSrc?: string;
}

export type ViewType = "chapter" | "episode";

export interface ServerCache {
    chapter: { [key: number]: DevilFruit[] };
    episode: { [key: number]: DevilFruit[] };
}

export interface SearchFiltersProps {
    type: ViewType;
    setType: (type: ViewType) => void;
    number: string;
    setNumber: (number: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedFruitTypes: string[];
    setSelectedFruitTypes: (types: string[]) => void;
    fruits: DevilFruit[];
    isLoading: boolean;
    selectedArc: Arc | null;
    setSelectedArc: (arc: Arc | null) => void;
}

export interface TextSearchProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
