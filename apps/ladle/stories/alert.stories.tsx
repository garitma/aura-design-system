import { CodeIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@/components/ui/Alert";
import AlertStatus from "@/components/AlertStatus";

export const AlertDemo = () => {
  return (
    <Alert>
      <AlertIcon>
        <CodeIcon className="icon" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Dummy Title</AlertTitle>
        <AlertDescription>
          This is a dummy description to demonstrate the Alert component.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
};

export const AlertStatusDemo = () => {
  return (
    <AlertStatus
      title="Dummy Title"
      description="This is a dummy description to demonstrate the Alert component."
      status="info"
    />
  );
};

export const AlertStatusStatusesDemo = () => {
  return (
    <div className="space-y-0.5">
      <AlertStatus
        title="Dummy Title"
        description="This is a dummy description to demonstrate the Alert component."
        status="info"
      />
        <AlertStatus
        title="Dummy Title"
        description="This is a dummy description to demonstrate the Alert component."
        status="success"
      />
        <AlertStatus
        title="Dummy Title"
        description="This is a dummy description to demonstrate the Alert component."
        status="danger"
      />
        <AlertStatus
        title="Dummy Title"
        description="This is a dummy description to demonstrate the Alert component."
        status="warning"
      />
    </div>
  );
};
