import { Skeleton } from "@/components/ui/Skeleton";

export const SkeletonDemo = () => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};