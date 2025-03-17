import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-auto mb-4">
        <Image
          src="/gomugomu.png"
          alt="Devil Fruit Logo"
          className="w-full h-full"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
