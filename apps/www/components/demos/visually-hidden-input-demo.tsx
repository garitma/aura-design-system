import * as React from "react"
import { Button } from "@/components/ui/Button"
import { VisuallyHiddenInput } from "@/components/ui/VisuallyHiddenInput"

export const VisuallyHiddenInputDemo = () => {
  const [control, setControl] = React.useState<HTMLButtonElement | null>(null)
  const [checked, setChecked] = React.useState(false)

  return (
    <form className="flex flex-col items-start gap-1">
      <Button
        ref={setControl}
        type="button"
        variant="pill"
        aria-pressed={checked}
        onClick={() => setChecked((value) => !value)}
      >
        {checked ? "Notifications enabled" : "Enable notifications"}
      </Button>
      <VisuallyHiddenInput
        control={control}
        type="checkbox"
        name="notifications"
        checked={checked}
      />
      <output className="text-sm text-gray-11">
        Hidden form value: {checked ? "on" : "off"}
      </output>
    </form>
  )
}