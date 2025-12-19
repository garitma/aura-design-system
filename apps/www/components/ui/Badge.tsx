/**
 * @description Displays a badge or a component that looks like a badge.
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/class-names"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-gray-12 text-gray-1 hover:bg-gray-12/80",
                secondary:
                    "border-transparent bg-gray-3 text-gray-12 hover:bg-gray-3/80",
                destructive:
                    "border-transparent bg-danger text-danger-contrast hover:bg-danger/80",
                outline: "text-gray-12",
            },
            status: {
                default: "",
                success: "border-transparent bg-success text-success-contrast hover:bg-success/80",
                warning: "border-transparent bg-warning text-warning-contrast hover:bg-warning/80",
                danger: "border-transparent bg-danger text-danger-contrast hover:bg-danger/80",
                info: "border-transparent bg-info text-info-contrast hover:bg-info/80",
            }
        },
        defaultVariants: {
            variant: "default",
            status: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, status, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant, status }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
