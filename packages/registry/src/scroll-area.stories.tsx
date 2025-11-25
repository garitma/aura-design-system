import * as React from "react"
import { ScrollArea } from "../registry/default/components/ui/ScrollArea"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const Default = () => (
    <ScrollArea className="h-[70dvh] w-48 rounded-md border border-gray-6">
        <div className="p-2">
            <h4 className="mb-2 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
                <React.Fragment key={tag}>
                    <div className="text-sm">{tag}</div>
                    <div className="my-1 h-px bg-gray-6" />
                </React.Fragment>
            ))}
        </div>
    </ScrollArea>
)
