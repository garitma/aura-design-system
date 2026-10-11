import { Banner } from "../registry/default/components/ui/Banner";
import { Button } from "../registry/default/components/ui/Button";

export const Default = () => (
  <Banner
    action={
      <Button variant="pill" size="sm">
        Review
      </Button>
    }
    onDismiss={() => undefined}
  >
    A new color scale is ready.
  </Banner>
);

export const Mobile = () => (
  <div className="flex w-full max-w-xs flex-col">
    <Banner
      action={
        <Button variant="pill" size="sm">
          Review
        </Button>
      }
      onDismiss={() => undefined}
    >
      A new color scale is ready.
    </Banner>
    <Banner onDismiss={() => undefined}>A new color scale is ready.</Banner>
  </div>
);

export const DismissStates = () => (
  <div className="flex w-full flex-col gap-1">
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Default</p>
      <Banner
        action={
          <Button variant="pill" size="sm">
            Review
          </Button>
        }
        onDismiss={() => undefined}
      >
        A new color scale is ready.
      </Banner>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Hover</p>
      <Banner
        dismissState="hover"
        action={
          <Button variant="pill" size="sm">
            Review
          </Button>
        }
        onDismiss={() => undefined}
      >
        A new color scale is ready.
      </Banner>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Focus</p>
      <Banner
        dismissState="focus"
        action={
          <Button variant="pill" size="sm">
            Review
          </Button>
        }
        onDismiss={() => undefined}
      >
        A new color scale is ready.
      </Banner>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Action only</p>
      <Banner
        action={
          <Button variant="pill" size="sm">
            Review
          </Button>
        }
      >
        A new color scale is ready.
      </Banner>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Dismiss only</p>
      <Banner onDismiss={() => undefined}>A new color scale is ready.</Banner>
    </div>
    <div className="flex flex-col gap-0.5">
      <p className="m-0 text-sm text-gray-11">Message only</p>
      <Banner>A new color scale is ready.</Banner>
    </div>
  </div>
);

export const Tones = () => (
  <div className="flex w-full flex-col">
    <Banner tone="info" onDismiss={() => undefined}>
      A new color scale is ready.
    </Banner>
    <Banner tone="success" onDismiss={() => undefined}>
      A new color scale is ready.
    </Banner>
    <Banner tone="warning" onDismiss={() => undefined}>
      A new color scale is ready.
    </Banner>
    <Banner tone="danger" onDismiss={() => undefined}>
      A new color scale is ready.
    </Banner>
  </div>
);

export const RichMessage = () => (
  <Banner
    asChild
    action={
      <Button variant="pill" size="sm">
        Review
      </Button>
    }
    onDismiss={() => undefined}
  >
    <div className="flex flex-col gap-0.5">
      <p className="m-0 font-bold">Scale published</p>
      <p className="m-0">A new color scale is ready.</p>
    </div>
  </Banner>
);
