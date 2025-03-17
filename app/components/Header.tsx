export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/5 z-[9998]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <h1 className="text-3xl font-bold font-pirate">
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
            Devil Fruits
          </span>
        </h1>
      </div>
    </header>
  );
}
