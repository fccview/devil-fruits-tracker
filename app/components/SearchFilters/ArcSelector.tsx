import { Arc, arcs } from '@/app/data/arcs';
import { ViewType } from '@/app/types';

interface ArcSelectorProps {
    selectedArc: Arc | null;
    setSelectedArc: (arc: Arc | null) => void;
    type: ViewType;
    setNumber: (number: string) => void;
}

export default function ArcSelector({ selectedArc, setSelectedArc, type, setNumber }: ArcSelectorProps) {
    const handleArcChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [mainArcName, subArcName] = e.target.value.split('|');
        const mainArc = arcs.find(a => a.name === mainArcName);

        if (!mainArc) {
            setSelectedArc(null);
            return;
        }

        if (subArcName) {
            const subArc = mainArc.subArcs?.find(sa => sa.name === subArcName);
            if (subArc) {
                setNumber(type === 'chapter' ? subArc.endChapter.toString() : subArc.endEpisode.toString());
            }
        } else {
            setNumber(type === 'chapter' ? mainArc.endChapter.toString() : mainArc.endEpisode.toString());
        }

        setSelectedArc(mainArc);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="text-gray-300 text-sm">Quick select by story arc:</div>
            <select
                value={selectedArc ? `${selectedArc.name}` : ''}
                onChange={handleArcChange}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-300 border border-white/10 
                 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
                <option value="">Select an arc</option>
                {arcs.map((arc) => (
                    <optgroup key={arc.name} label={`${arc.saga} - ${arc.name}`}>
                        <option value={arc.name}>
                            {arc.name} ({type === 'chapter' ? `Ch. ${arc.endChapter}` : `Ep. ${arc.endEpisode}`})
                        </option>
                        {arc.subArcs?.map((subArc) => (
                            <option
                                key={subArc.name}
                                value={`${arc.name}|${subArc.name}`}
                                className={subArc.isFiller ? 'text-gray-500' : ''}
                            >
                                ↳ {subArc.name} {subArc.isFiller ? '(Filler)' : ''} (
                                {type === 'chapter'
                                    ? `Ch. ${subArc.endChapter}`
                                    : `Ep. ${subArc.endEpisode}`})
                            </option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>
    );
} 