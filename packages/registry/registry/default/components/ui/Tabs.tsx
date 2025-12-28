"use client"

import * as React from "react"
import  {Tabs as TabsPrimitive} from "radix-ui"

import { cn } from "@/utils/class-names"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "border-b border-gray-a6 text-gray-11 inline-flex h-3 w-fit items-center justify-center",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "text-gray-10 data-[state=active]:text-gray-11 hover:text-gray-11 hover:bg-gray-a2 cursor-pointer inline-flex h-[calc(100%+1px)] flex-1 items-center justify-center gap-0.5 px-1 py-1 whitespace-nowrap data-[state=active]:border-b-gray-a6 data-[state=active]:border-b-2 border-b-transparent",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }