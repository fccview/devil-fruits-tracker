export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/5 z-[9998]">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <h1 className="text-4xl font-bold font-pirate">
                    <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 
                                   bg-clip-text text-transparent animate-gradient-x">
                        Devil Fruits
                    </span>
                </h1>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <a
                        href="https://zzyzzyy.deviantart.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-400 transition-colors"
                    >
                        Art by zzyzzyy
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
            </div>
        </header>
    )
} 