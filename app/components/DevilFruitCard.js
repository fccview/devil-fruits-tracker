export default function DevilFruitCard({ fruit, number, type }) {

    const filterSpoilers = (number, text) => {
        const threshold = type === 'chapter' ? 1044 : 1071; 
        if (number > threshold) {
            return text;
        }

        let finalText = text.replace('Gomu Gomu no Mi Hito Hito no Mi Moderu Nika', 'Gomu Gomu no Mi');
        finalText = finalText.replace(`The Gomu Gomu no Mi is a Paramecia-type Devil Fruit that grants the user's body the properties of rubber, effectively making them a Rubber Human (ゴム人間, Gomu Ningen?). Originally, the fruit was called Hito Hito no Mi, Model: Nika and classified as a Mythical Zoan-type fruit that allows one to transform into the legendary "Sun God" Nika (and gain his rubbery attributes), before being renamed and reclassified by the World Government to hide the truth. In the present, only Imu, the Five Elders, and Vegapunk are aware of the fruit's true nature, and its existence was never known to be recorded anywhere.`, `The Gomu Gomu no Mi is a Paramecia-type Devil Fruit that grants the user's body the properties of rubber, effectively making them a Rubber Human (ゴム人間, Gomu Ningen?).`);
        finalText = finalText.replace(`Paramecia Mythical Zoan`, `Paramecia`);

        return finalText;
    }

    const formatDebut = (usageDebut) => {
        const chapter = parseInt(usageDebut.replace('Chapter ', ''), 10);
        const estimatedEpisode = Math.floor(chapter * 0.8);
        return `Chapter ${chapter}; Episode ${estimatedEpisode}`;
    }

    return (
      <div className="group">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden 
                      border border-white/10 shadow-xl transition-all duration-500 
                      hover:border-red-500/30 hover:shadow-red-500/10">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={fruit.avatarSrc} 
              alt={fruit.englishName} 
              className="w-full h-full object-cover transition-transform duration-500 
                       group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t 
                          from-[#1a1a2e] via-[#1a1a2e]/20 to-transparent" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 
                         bg-clip-text text-transparent mb-4">
              {filterSpoilers(number, fruit.englishName)}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Type:</span> {filterSpoilers(number, fruit.type)}
              </p>
              <p className="text-gray-300">
                <span className="text-red-400 font-medium">Owner:</span> {fruit.currentOwner}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {filterSpoilers(number, fruit.description)}
              </p>
              <p className="mt-4 text-sm border-t border-white/10 pt-4 text-gray-500">
                <span className="text-red-400">Debut:</span> {formatDebut(fruit.usageDebut)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  