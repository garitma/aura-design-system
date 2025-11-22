import { Button } from "../registry/default/components/ui/Button";

export const Default = () => <Button>Default Button</Button>;

export const Fill = () => <Button variant="fill">Fill Button</Button>;

export const Pill = () => <Button variant="pill">Pill Button</Button>;

export const Link = () => <Button variant="link">Link Button</Button>;

export const Menu = () => <Button variant="menu">Menu Button</Button>;

export const Sizes = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button size="xs">Extra Small</Button>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>
  </div>
);

export const Variants = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button variant="default">Default</Button>
    <Button variant="fill">Fill</Button>
    <Button variant="pill">Pill</Button>
    <Button variant="link">Link</Button>
    <Button variant="menu">Menu</Button>
  </div>
);

export const Disabled = () => <Button isDisabled>Disabled Button</Button>;

export const Loading = () => <Button isLoading>Loading Button...</Button>;

export const States = () => (
  <div className="flex flex-col gap-4 items-start">
    <Button>Normal</Button>
    <Button isDisabled>Disabled</Button>
    <Button isLoading>Loading</Button>
  </div>
);
