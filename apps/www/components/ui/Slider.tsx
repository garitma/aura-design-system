"use client"
/**
 * @description An input where the user selects a value from within a given range.
 */
import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/utils/class-names"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
    <SliderPrimitive.Root
        ref={ref}
        className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
        )}
        {...props}
    >
        <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-gray-3">
            <SliderPrimitive.Range className="absolute h-full bg-gray-12" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block size-1.5 rounded-full border border-gray-12 bg-gray-1 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
