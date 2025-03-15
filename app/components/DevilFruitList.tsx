import { DevilFruit } from '../types';
import { ViewType } from '../types';
import DevilFruitCard from './DevilFruitCard'

interface DevilFruitListProps {
  fruits: DevilFruit[];
  number: string;
  type: ViewType;
}

export default function DevilFruitList({
  fruits,
  number,
  type
}: DevilFruitListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fruits.map(fruit => (
        <DevilFruitCard
          key={fruit.englishName}
          fruit={fruit}
          number={number}
          type={type}
        />
      ))}
    </div>
  )
}
