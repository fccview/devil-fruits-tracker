const SPOILER_THRESHOLDS = {
    MERA_MERA_SABO: [744, 678], // Flame-Flame Fruit: Ace to Sabo
    CLEAR_CLEAR_SHIRYU: [925, 917], // Clear-Clear Fruit: Absalom to Shiryu
    TREMOR_TREMOR_TEACH: [577, 486], // Tremor-Tremor Fruit: Whitebeard to Blackbeard
    SOUL_SOUL_LINLIN: [866, 837], // Soul-Soul Fruit: Carmel to Charlotte Linlin
    BARRIER_BARRIER_BARTOLOMEO: [720, 652], // Barrier-Barrier Fruit: Kurozumi Semimaru to Bartolomeo
    CLONE_CLONE_BENTHAM: [944, 918], // Clone-Clone Fruit: Kurozumi Higurashi to Bentham
    BRUSH_BRUSH_KANJURO: [920, 892], // Brush-Brush Fruit: Kurozumi Kanjuro (previous owner unknown)
    CALM_CALM_ROSINANTE: [767, 702], // Calm-Calm Fruit: Donquixote Rosinante (previous owner unknown)
    TIME_TIME_TOKI: [964, 893], // Time-Time Fruit: Kozuki Toki (previous owner unknown)
    BRUSH_BRUSH_KANJURO: [920, 892], // Brush-Brush Fruit: Kurozumi Kanjuro (previous owner unknown)
    HEBI_HEBI_OROCHI: [929, 919], // Hebi Hebi no Mi, Model: Yamata no Orochi: Kurozumi Orochi (previous owner unknown)
    LUFFY_AWAKENING: [1044, 1071]
};

const OWNERSHIP_CHANGES = {
    'Flame-Flame Fruit': SPOILER_THRESHOLDS.MERA_MERA_SABO,
    'Clear-Clear Fruit': SPOILER_THRESHOLDS.CLEAR_CLEAR_SHIRYU,
    'Tremor-Tremor Fruit': SPOILER_THRESHOLDS.TREMOR_TREMOR_TEACH,
    'Soul-Soul Fruit': SPOILER_THRESHOLDS.SOUL_SOUL_LINLIN,
    'Barrier-Barrier Fruit': SPOILER_THRESHOLDS.BARRIER_BARRIER_BARTOLOMEO,
    'Clone-Clone Fruit': SPOILER_THRESHOLDS.CLONE_CLONE_BENTHAM,
    'Brush-Brush Fruit': SPOILER_THRESHOLDS.BRUSH_BRUSH_KANJURO,
    'Calm-Calm Fruit': SPOILER_THRESHOLDS.CALM_CALM_ROSINANTE,
    'Time-Time Fruit': SPOILER_THRESHOLDS.TIME_TIME_TOKI,
    'Hebi Hebi no Mi, Model: Yamata no Orochi': SPOILER_THRESHOLDS.HEBI_HEBI_OROCHI,
};

const FRUIT_SPOILER_MAPPINGS = {
    'Gomu Gomu no Mi Hito Hito no Mi Moderu Nika': {
        thresholds: SPOILER_THRESHOLDS.LUFFY_AWAKENING,
        replacements: [
            {
                from: /The Gomu Gomu no Mi is a Paramecia-type Devil Fruit.*?never known to be recorded anywhere\./s,
                to: 'The Gomu Gomu no Mi is a Paramecia-type Devil Fruit that grants the user\'s body the properties of rubber, effectively making them a Rubber Human (ゴム人間, Gomu Ningen?).'
            },
            {
                from: 'Gomu Gomu no Mi Hito Hito no Mi Moderu Nika',
                to: 'Gomu Gomu no Mi'
            },
            {
                from: 'Paramecia Mythical Zoan',
                to: 'Paramecia'
            }
        ]
    },
    'Flame-Flame Fruit': {
        thresholds: SPOILER_THRESHOLDS.MERA_MERA_SABO,
        replacements: [
            {
                from: / It was previously eaten by Portgas D. Ace, and currently by Sabo./g,
                to: ''
            }
        ]
    },
    'Clear-Clear Fruit': {
        thresholds: SPOILER_THRESHOLDS.CLEAR_CLEAR_SHIRYU,
        replacements: [
            {
                from: /It was initially eaten by Absalom, and after his death it was transferred to Shiryu./g,
                to: 'Eaten by Absalom, Sanji would have loved a piece of this.'
            }
        ]
    },
    'Tremor-Tremor Fruit': {
        thresholds: SPOILER_THRESHOLDS.TREMOR_TREMOR_TEACH,
        replacements: [
            {
                from: / It was eaten by Edward Newgate, but upon his death, its power was stolen by Marshall D. Teach./g,
                to: ''
            }
        ]
    },
    'Soul-Soul Fruit': {
        thresholds: SPOILER_THRESHOLDS.SOUL_SOUL_LINLIN,
        replacements: [
            {
                from: /, and currently by Charlotte Linlin/g,
                to: ''
            }
        ]
    },
    'Barrier-Barrier Fruit': {
        thresholds: SPOILER_THRESHOLDS.BARRIER_BARRIER_BARTOLOMEO,
        replacements: [
            {
                from: /, and currently by Bartolomeo/g,
                to: ''
            }
        ]
    },
    'Clone-Clone Fruit': {
        thresholds: SPOILER_THRESHOLDS.CLONE_CLONE_BENTHAM,
        replacements: [
            {
                from: /, and currently by Bentham/g,
                to: ''
            }
        ]
    },
    'Brush-Brush Fruit': {
        thresholds: SPOILER_THRESHOLDS.BRUSH_BRUSH_KANJURO,
        replacements: [
            {
                from: /, and currently by Kurozumi Kanjuro/g,
                to: ''
            }
        ]
    },
    'Calm-Calm Fruit': {
        thresholds: SPOILER_THRESHOLDS.CALM_CALM_ROSINANTE,
        replacements: [
            {
                from: /, and currently by Donquixote Rosinante/g,
                to: ''
            }
        ]
    },
    'Time-Time Fruit': {
        thresholds: SPOILER_THRESHOLDS.TIME_TIME_TOKI,
        replacements: [
            {
                from: /, and currently by Kozuki Toki/g,
                to: ''
            }
        ]
    },
    'Hebi Hebi no Mi, Model: Yamata no Orochi': {
        thresholds: SPOILER_THRESHOLDS.HEBI_HEBI_OROCHI,
        replacements: [
            {
                from: /, and currently by Kurozumi Orochi/g,
                to: ''
            }
        ]
    },
};

export function filterSpoilers(fruitName, number, text, type = 'chapter', field = null) {
    if (field === 'owner') {
        if (!text || typeof text !== 'object') return '';
        
        const ownerChange = OWNERSHIP_CHANGES[fruitName];
        if (!ownerChange) return text.currentOwner || '';

        const [mangaThreshold, animeThreshold] = ownerChange;
        const threshold = type === 'chapter' ? mangaThreshold : animeThreshold;
        
        return number > threshold ? (text.currentOwner || '') : (text.previousOwner || '');
    }

    // Regular text filtering (keeping your original logic)
    const fruitConfig = FRUIT_SPOILER_MAPPINGS[fruitName];
    if (!fruitConfig) return text;

    const [mangaThreshold, animeThreshold] = fruitConfig.thresholds;
    const threshold = type === 'chapter' ? mangaThreshold : animeThreshold;

    if (number > threshold) {
        return text;
    }

    let finalText = text;
    fruitConfig.replacements.forEach(({ from, to }) => {
        finalText = finalText?.replace(from, to);
    });

    return finalText;
} 