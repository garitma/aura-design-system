import { Badge } from "../registry/default/components/ui/Badge"

export function Default() {
    return <Badge>Badge</Badge>
}

export const Secondary = () => <Badge variant="secondary">Secondary</Badge>

export const Destructive = () => <Badge variant="destructive">Destructive</Badge>

export const Outline = () => <Badge variant="pill" >Outline</Badge>

export const Status = () => (
    <div className="flex gap-2">
        <Badge status="success">Success</Badge>
        <Badge status="warning">Warning</Badge>
        <Badge status="danger">Danger</Badge>
        <Badge status="info">Info</Badge>
    </div>
)
