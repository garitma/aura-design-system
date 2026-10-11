import { Button } from "../registry/default/components/ui/Button";
import { Input } from "../registry/default/components/ui/Input";

export function Default() {
  return (
    <Input
      aria-label="Email address"
      type="email"
      placeholder="name@example.com"
    />
  );
}

export function Sizes() {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <Input
          className="w-auto"
          size="sm"
          aria-label="Small"
          placeholder="Small"
        />
        <Button size="sm">Small</Button>
      </div>
      <div className="flex items-center gap-2">
        <Input className="w-auto" aria-label="Default" placeholder="Default" />
        <Button size="md">Medium</Button>
      </div>
      <div className="flex items-center gap-2">
        <Input
          className="w-auto"
          size="lg"
          aria-label="Large"
          placeholder="Large"
        />
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
