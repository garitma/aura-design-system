import { InfoCircledIcon } from "@radix-ui/react-icons";

export const importString = `import { InfoCircledIcon } from "@radix-ui/react-icons";`;

const Component = () => {
  return (
    <div className="flex gap-1 p-1 rounded-1 border bg-info text-info-contrast border-info-contrast">
      <div>
        <InfoCircledIcon className="icon" data-display-name="InfoCircledIcon" />
      </div>
      <div>
        <div>
          This is an informational message providing helpful details about a
          feature or process. Please review this information carefully.
        </div>
      </div>
    </div>
  );
};

export default Component;
