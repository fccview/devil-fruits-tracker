import { DevilFruit, ViewType } from "../types";

export const getSpoilerSafeValue = (
    fruit: DevilFruit,
    field: keyof DevilFruit,
    number: string,
    type: ViewType
): string => {
    if (!fruit?.spoilers?.length) return fruit[field] as string;

    const applicableSpoiler = fruit.spoilers
        .sort((a, b) => b.threshold[type] - a.threshold[type])
        .find(spoiler => Number(number) < spoiler.threshold[type]);

    if (applicableSpoiler) {
        if (field === 'currentOwner' && applicableSpoiler.previousValues.whatOwner === 'previousOwner') {
            return fruit.previousOwner || '';
        }
        return applicableSpoiler.previousValues[field] || fruit[field] as string;
    }

    return fruit[field] as string;
}