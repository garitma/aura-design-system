import { BookmarkIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  AlertStatus,
} from "../registry/default/components/ui/Alert";

export const Default = () => {
  return (
    <Alert>
      <AlertIcon>
        <BookmarkIcon className="icon" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>
          This is a default alert message to demonstrate the Alert component.
        </AlertDescription>
      </AlertContent>
    </Alert>
  );
};

export const AlertDemo = () => {
  return (
    <Alert>
      <AlertIcon>
        <BookmarkIcon className="icon" />
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
