export interface Arc {
    name: string;
    endChapter: number;
    endEpisode: number;
    saga?: string;
    subArcs?: {
        name: string;
        endChapter: number;
        endEpisode: number;
        isFiller?: boolean;
    }[];
}

export const arcs: Arc[] = [
    {
        name: 'East Blue',
        saga: 'East Blue',
        endChapter: 100,
        endEpisode: 53,
        subArcs: [
            { name: 'Romance Dawn', endChapter: 7, endEpisode: 3 },
            { name: 'Orange Town', endChapter: 21, endEpisode: 8 },
            { name: 'Syrup Village', endChapter: 41, endEpisode: 18 },
            { name: 'Baratie', endChapter: 68, endEpisode: 30 },
            { name: 'Arlong Park', endChapter: 95, endEpisode: 44 },
            { name: 'Loguetown', endChapter: 100, endEpisode: 53 },
            { name: 'Warship Island', endChapter: 100, endEpisode: 61, isFiller: true },
        ]
    },
    {
        name: 'Alabasta/Arabasta',
        saga: 'Alabasta/Arabasta',
        endChapter: 217,
        endEpisode: 130,
        subArcs: [
            { name: 'Reverse Mountain', endChapter: 105, endEpisode: 63 },
            { name: 'Whisky Peak', endChapter: 114, endEpisode: 67 },
            { name: 'Little Garden', endChapter: 129, endEpisode: 77 },
            { name: 'Drum Island', endChapter: 154, endEpisode: 91 },
            { name: 'Alabasta', endChapter: 217, endEpisode: 130 },
            { name: 'Post-Alabasta', endChapter: 217, endEpisode: 135, isFiller: true },
        ]
    },
    {
        name: 'Sky Island',
        saga: 'Sky Island',
        endChapter: 302,
        endEpisode: 206,
        subArcs: [
            { name: 'Jaya', endChapter: 236, endEpisode: 152 },
            { name: 'Skypiea', endChapter: 302, endEpisode: 195 },
            { name: 'G-8', endChapter: 302, endEpisode: 206, isFiller: true },
        ]
    },
    {
        name: 'Water 7',
        saga: 'Water 7',
        endChapter: 441,
        endEpisode: 325,
        subArcs: [
            { name: 'Long Ring Long Land', endChapter: 321, endEpisode: 219 },
            { name: 'Water 7', endChapter: 374, endEpisode: 263 },
            { name: 'Enies Lobby', endChapter: 430, endEpisode: 312 },
            { name: 'Post-Enies Lobby', endChapter: 441, endEpisode: 325 },
        ]
    },
    {
        name: 'Thriller Bark',
        saga: 'Thriller Bark',
        endChapter: 489,
        endEpisode: 381,
        subArcs: [
            { name: 'Thriller Bark', endChapter: 489, endEpisode: 381 },
        ]
    },
    {
        name: 'Summit War',
        saga: 'Summit War',
        endChapter: 597,
        endEpisode: 516,
        subArcs: [
            { name: 'Sabaody Archipelago', endChapter: 513, endEpisode: 405 },
            { name: 'Amazon Lily', endChapter: 524, endEpisode: 417 },
            { name: 'Impel Down', endChapter: 549, endEpisode: 452 },
            { name: 'Marineford', endChapter: 580, endEpisode: 489 },
            { name: 'Post-War', endChapter: 597, endEpisode: 516 },
        ]
    },
    {
        name: 'Fish-Man Island',
        saga: 'Fish-Man Island',
        endChapter: 653,
        endEpisode: 574,
        subArcs: [
            { name: 'Return to Sabaody', endChapter: 602, endEpisode: 522 },
            { name: 'Fish-Man Island', endChapter: 653, endEpisode: 574 },
        ]
    },
    {
        name: 'Dressrosa',
        saga: 'Dressrosa',
        endChapter: 801,
        endEpisode: 746,
        subArcs: [
            { name: 'Punk Hazard', endChapter: 699, endEpisode: 625 },
            { name: 'Dressrosa', endChapter: 801, endEpisode: 746 },
        ]
    },
    {
        name: 'Whole Cake Island',
        saga: 'Whole Cake Island',
        endChapter: 902,
        endEpisode: 877,
        subArcs: [
            { name: 'Zou', endChapter: 824, endEpisode: 779 },
            { name: 'Whole Cake Island', endChapter: 902, endEpisode: 877 },
        ]
    },
    {
        name: 'Wano',
        saga: 'Wano',
        endChapter: 1057,
        endEpisode: 1085,
        subArcs: [
            { name: 'Levely', endChapter: 908, endEpisode: 889 },
            { name: 'Wano Country', endChapter: 1057, endEpisode: 1085 },
        ]
    },
    {
        name: 'Final',
        saga: 'Final',
        endChapter: 1125,
        endEpisode: 1200,
        subArcs: [
            { name: 'Egghead', endChapter: 1125, endEpisode: 1200 },
            { name: 'Elbaf', endChapter: 1142, endEpisode: 1200 },
        ]
    },
]; 