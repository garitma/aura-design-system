/**
 * @description Displays a badge or a component that looks like a badge.
 */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/class-names"

/**
 * Danger fill shared by `variant="destructive"` and `status="danger"`.
 * `destructive` is the variant alias of the danger status. Prefer `status`
 * for semantic state and `variant` for chrome (default, secondary, outline).
 */
const badgeDanger =
    "border-transparent bg-danger text-danger-contrast hover:bg-danger/80"

const badgeVariants = cva(
    // 13px scale: px-1 is 13px (replaces px-2.5 / 32.5px). py-0.5 is 6.5px
    // and gap-0.5 is the icon gap. With .xs (12/16) and a 1px border the
    // badge is 16 + 13 + 2 = 31px tall.
    "inline-flex items-center gap-0.5 rounded-full border px-1 py-0.5 xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-a8 motion-reduce:transition-none",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-gray-12 text-gray-1 hover:bg-gray-12/80",
                secondary:
                    "border-transparent bg-gray-3 text-gray-12 hover:bg-gray-3/80",
                destructive: badgeDanger,
                outline: "border-gray-12 text-gray-12",
            },
            status: {
                default: "",
                success: "border-transparent bg-success text-success-contrast hover:bg-success/80",
                warning: "border-transparent bg-warning text-warning-contrast hover:bg-warning/80",
                danger: badgeDanger,
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
    VariantProps<typeof badgeVariants> {
    asChild?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, status, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "div"
        return (
            <Comp
                className={cn(badgeVariants({ variant, status }), className)}
                ref={ref}
                {...props}
            />
        )
    }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
