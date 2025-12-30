import { JSX } from "react"
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable"
import { cn } from "@/utils/class-names"

type Props = {
  placeholder: string
  className?: string
  placeholderClassName?: string
}

export function ContentEditable({
  placeholder,
  className,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <LexicalContentEditable
      className={
        cn(className, `ContentEditable__root block min-h-full overflow-auto px-2 py-2 focus:outline-none relative`)
      }
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={
            placeholderClassName ??
            `text-muted-foreground pointer-events-none absolute top-0 left-0 overflow-hidden px-2 py-3 text-ellipsis select-none text-gray-8`
          }
        >
          {placeholder}
        </div>
      }
    />
  )
}
