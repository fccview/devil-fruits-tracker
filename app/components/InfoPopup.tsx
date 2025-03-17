interface InfoPopupProps {
  title: string;
  description: string;
  isVisible: boolean;
  releaseDate: string;
}

export default function InfoPopup({
  title,
  description,
  isVisible,
  releaseDate,
}: InfoPopupProps) {
  if (!isVisible) return null;

  return (
    <div
      className="absolute z-50 bottom-full mb-2 w-64 bg-gray-900/95 backdrop-blur-sm 
                    rounded-lg p-3 shadow-xl border border-white/10 text-sm"
    >
      <h4 className="font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent mb-1">
        {title}
      </h4>
      <span className="text-gray-300 text-xs leading-relaxed block pb-2 border-b border-white/10">
        {description.length > 200
          ? description.slice(0, 200) + "..."
          : description}
      </span>
      <span className="text-gray-300 text-xs leading-relaxed block mt-2">
        <span className="text-red-400">Release: </span>
        {new Date(releaseDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </div>
  );
}
