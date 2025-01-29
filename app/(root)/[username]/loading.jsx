import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="container my-5 flex flex-col items-start space-y-5">
        {/* Profile Header */}
        <div className="flex flex-col gap-5">
          {/* Profile Image Skeleton */}
          <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-full" />

          {/* User Name Skeleton */}
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>

        {/* Bio Skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Social Handles Skeleton */}
        <div className="flex space-x-3">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>

      {/* Skeletons for Event Cards */}
      <div className="container space-y-4">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col overflow-hidden rounded-lg">
            <Skeleton className="h-5 w-32 rounded" /> {/* Event title */}
            <Skeleton className="mt-2 h-4 w-24 rounded" /> {/* Date */}
            <Skeleton className="mt-4 h-20 w-full rounded" />{" "}
            {/* Description */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
