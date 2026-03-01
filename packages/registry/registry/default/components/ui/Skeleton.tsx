import { cn } from "@/utils/class-names"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-a6 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
