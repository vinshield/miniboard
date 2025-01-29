import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Loading = () => {
  return (
    <>
      <div className="container flex flex-col items-start space-y-5">
        {/* Profile Header */}
        <div className="flex flex-col gap-5">
          {/* Profile Image Skeleton */}
          <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-full" />

          {/* User Name Skeleton */}
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>

        {/* Bio Skeleton */}
        <Skeleton className="h-16 w-4/5 rounded-lg" />

        {/* Social Handles Skeleton */}
        <div className="flex space-x-3">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </div>

      <Tabs defaultValue="events">
        <div className="container">
          <TabsList className="my-5 grid grid-cols-2">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="events">
          {/* Skeletons for Event Cards */}

          <div className="mt container space-y-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex gap-10 overflow-hidden rounded-lg border border-primary/10 p-4"
              >
                <div className="flex-1">
                  <Skeleton className="h-6 w-full rounded-lg" />{" "}
                  {/* Event title */}
                  <Skeleton className="mt-2 h-6 w-32 rounded-lg" /> {/* Date */}
                </div>
                <div>
                  <Skeleton className="h-36 w-24 rounded-lg" />{" "}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="blogs">
          {/* Skeletons for Event Cards */}

          <div className="container mt-12 space-y-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex gap-10 overflow-hidden rounded-lg border border-primary/10 p-4"
              >
                <div className="flex-1">
                  <Skeleton className="h-6 w-full rounded-lg" />{" "}
                  {/* Event title */}
                  <Skeleton className="mt-2 h-6 w-32 rounded-lg" /> {/* Date */}
                </div>
                <div>
                  <Skeleton className="h-36 w-24 rounded-lg" />{" "}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Loading;
