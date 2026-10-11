import { StatusDot } from "@/components/ui/StatusDot";

export const StatusDotDemo = () => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <StatusDot state="queued" />
      <StatusDot state="building" />
      <StatusDot state="error" />
      <StatusDot state="ready" />
      <StatusDot state="canceled" />
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <StatusDot state="queued" label />
      <StatusDot state="building" label />
      <StatusDot state="error" label />
      <StatusDot state="ready" label />
      <StatusDot state="canceled" label />
    </div>
  </div>
)

export const StatusDotDemoWithRing = () => (
  <div className="flex items-center gap-2 rounded-md bg-gray-12 p-2">
    <StatusDot state="ready" ring />
    <StatusDot state="building" ring />
    <StatusDot state="error" ring />
    <StatusDot state="queued" ring />
    <StatusDot state="canceled" ring />
  </div>
)

export const StatusDotDemoCustomLabel = () => (
  <StatusDot state="building" label="Deploying" />
)
