export default function BookCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow">
      <div className="mb-3 flex justify-between">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="ml-2 h-4 w-12 rounded bg-gray-200" />
      </div>
      <div className="mb-6 h-3 w-1/2 rounded bg-gray-200" />
      <div className="ml-auto h-4 w-1/4 rounded bg-gray-200" />
    </div>
  );
}
