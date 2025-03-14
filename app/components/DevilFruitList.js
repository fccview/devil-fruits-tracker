import DevilFruitCard from './DevilFruitCard'

export default function DevilFruitList({ fruits, number, type }) {
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
