export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-auto mb-4">
        <img src="/gomugomu.png" alt="Devil Fruit Logo" className="w-full h-full" />
      </div>
      <p className="text-yellow-400 text-xl font-bold animate-pulse">
        Loading Devil Fruits...
      </p>
    </div>
  )
} 