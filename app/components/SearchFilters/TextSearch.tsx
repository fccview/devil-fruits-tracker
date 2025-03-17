import { TextSearchProps } from "@/app/types";

export default function TextSearch({
  searchTerm,
  setSearchTerm,
  mediaType,
}: TextSearchProps) {
  return (
    <input
      type="text"
      placeholder={`Search by name, owner, or ${mediaType}...`}
      className="w-full px-6 py-3 bg-white/5 rounded-xl text-gray-100 
               border border-white/10 focus:border-red-500/50 
               focus:outline-none focus:ring-2 focus:ring-red-500/20
               placeholder-gray-500 transition-all duration-300"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
