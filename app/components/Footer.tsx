export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 border-t border-white/5 bg-[#1a1a2e]/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-center gap-4 text-xs text-gray-400">
        <a
          href="https://zzyzzyy.deviantart.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
        >
          Background by zzyzzyy
        </a>
        <span className="text-gray-600">|</span>
        <a
          href="https://fccview.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-400 transition-colors"
        >
          Made by fccview
        </a>
      </div>
    </footer>
  );
}
