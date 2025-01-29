import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="pb-24">
        <div className="container flex items-center justify-center">
          <Skeleton className="my-12 h-10 w-32" />
        </div>
        <div className="container">
          <div className="flex-center borderfill-primary relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-xl">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
