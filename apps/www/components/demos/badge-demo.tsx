import { Badge } from "@/components/ui/Badge"

export function BadgeDemo() {
    return <Badge>Badge</Badge>
}

export function BadgeDemoVariants() {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    )
}

export function BadgeDemoStatus() {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="danger">Danger</Badge>
            <Badge status="info">Info</Badge>
        </div>
    )
}
