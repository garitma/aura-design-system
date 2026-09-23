import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export function LabelDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-0.5">
      <Label htmlFor="label-preview-email">Email address</Label>
      <Input
        id="label-preview-email"
        type="email"
        placeholder="name@example.com"
      />
    </div>
  )
}