export default function SkeletonCard() {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 p-4 border rounded-lg h-full bg-white animate-pulse"
        >
          <div className="w-full aspect-[3/2] bg-gray-200 rounded-lg" />

          <div className="h-4 bg-gray-200 rounded w-[90%] mt-2" />
          <div className="h-4 bg-gray-200 rounded w-[70%]" />

          <div className="mt-auto pt-2 flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-[40%]" />
            <div className="h-3 bg-gray-200 rounded w-[20%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
