// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CaptionSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function PosterSkeleton() {
  return (
    <div
      className={`flex-center skeleton absolute h-full w-full bg-slate-300/80 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-loader-circle animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p className="rounded-md text-sm font-medium">
          Getting event details...
        </p>
      </div>
    </div>
  );
}

export function AddToCalendarSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-32 w-80 animate-pulse rounded-lg bg-gray-300"></div>
      <div className="mt-20 h-9 w-52 animate-pulse rounded-lg bg-gray-300"></div>
    </div>
  );
}
