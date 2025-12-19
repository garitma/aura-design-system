import { Button } from "@/components/ui/Button";

export const ButtonDemo = () => <Button>Default Button</Button>;

export const ButtonDemoFill = () => <Button variant="fill">Fill Button</Button>;

export const ButtonDemoPill = () => <Button variant="pill">Pill Button</Button>;

export const ButtonDemoLink = () => <Button variant="link">Link Button</Button>;

export const ButtonDemoMenu = () => <Button variant="menu">Menu Button</Button>;

export const ButtonDemoSizes = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>
);

export const ButtonDemoVariants = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button variant="default">Default</Button>
    <Button variant="fill">Fill</Button>
    <Button variant="pill">Pill</Button>
    <Button variant="link">Link</Button>
    <Button variant="menu">Menu</Button>
  </div>
);

export const ButtonDemoDisabled = () => <Button isDisabled>Disabled Button</Button>;

export const ButtonDemoLoading = () => <Button isLoading>Loading Button...</Button>;

export const ButtonDemoStates = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button>Normal</Button>
    <Button isDisabled>Disabled</Button>
    <Button isLoading>Loading</Button>
  </div>
);

export const ButtonDemoModeProp = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button mode="default">Default (mode)</Button>
    <Button mode="fill">Fill (mode)</Button>
    <Button mode="pill">Pill (mode)</Button>
    <Button mode="link">Link (mode)</Button>
    <Button mode="menu">Menu (mode)</Button>
  </div>
);