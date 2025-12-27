import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
} from "@/components/ui/Checkbox";

export const CheckboxDemo = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-1">
      <Checkbox
        id="default"
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked as boolean)}
      />
      <label
        htmlFor="default"
        className="text-sm font-medium leading-none cursor-pointer"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};

export const CheckboxDemoChecked = () => (
  <div className="flex items-center gap-1">
    <Checkbox id="checked" defaultChecked />
    <label
      htmlFor="checked"
      className="text-sm font-medium leading-none cursor-pointer"
    >
      I agree to the privacy policy
    </label>
  </div>
)

export const CheckboxDemoUnchecked = () => (
  <div className="flex items-center gap-1">
    <Checkbox id="unchecked" />
    <label
      htmlFor="unchecked"
      className="text-sm font-medium leading-none cursor-pointer"
    >
      Subscribe to newsletter
    </label>
  </div>
)

export const CheckboxDemoDisabled = () => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-1">
      <Checkbox id="disabled-unchecked" disabled />
      <label
        htmlFor="disabled-unchecked"
        className="text-sm font-medium leading-none text-gray-a8 cursor-not-allowed"
      >
        Disabled unchecked
      </label>
    </div>
    <div className="flex items-center gap-1">
      <Checkbox id="disabled-checked" disabled defaultChecked />
      <label
        htmlFor="disabled-checked"
        className="text-sm font-medium leading-none text-gray-a8 cursor-not-allowed"
      >
        Disabled checked
      </label>
    </div>
  </div>
)

export const CheckboxDemoWithDescription = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-start gap-1">
      <Checkbox
        id="with-description"
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked as boolean)}
      />
      <div className="flex flex-col gap-1">
        <label
          htmlFor="with-description"
          className="text-sm font-medium leading-none cursor-pointer"
        >
          Marketing emails
        </label>
        <p className="text-sm text-gray-a11 m-0">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  );
};

export const CheckboxDemoGroup = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = [
    {
      value: "react",
      label: "React",
      description: "A JavaScript library for building user interfaces",
    },
    {
      value: "typescript",
      label: "TypeScript",
      description: "JavaScript with syntax for types",
    },
    {
      value: "tailwind",
      label: "Tailwind CSS",
      description: "A utility-first CSS framework",
    },
    {
      value: "nextjs",
      label: "Next.js",
      description: "The React Framework for the Web",
    },
  ];

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-semibold">Select your tech stack:</div>
      <CheckboxGroup value={selectedItems} onValueChange={setSelectedItems}>
        {items.map((item) => (
          <CheckboxGroupItem
            key={item.value}
            value={item.value}
            label={item.label}
            description={item.description}
          />
        ))}
      </CheckboxGroup>
      {selectedItems.length > 0 && (
        <div className="mt-2 text-sm text-gray-a11">
          Selected: {selectedItems.length} item
          {selectedItems.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export const CheckboxDemoIndeterminate = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(["sub-1"]);

  const allItems = ["sub-1", "sub-2", "sub-3"];
  const allChecked = allItems.every((item) => selectedItems.includes(item));
  const someChecked = selectedItems.length > 0 && !allChecked;

  const handleParentChange = (checked: boolean) => {
    setSelectedItems(checked ? allItems : []);
  };

  const handleChildChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <Checkbox
          id="parent"
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(checked) => handleParentChange(checked as boolean)}
        />
        <label
          htmlFor="parent"
          className="text-sm font-semibold leading-none cursor-pointer"
        >
          Select all notifications
        </label>
      </div>
      <div className="ml-1.5 flex flex-col gap-1 border-l-2 border-gray-a6 pl-1.5">
        {allItems.map((item, index) => (
          <div key={item} className="flex items-center gap-1">
            <Checkbox
              id={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={(checked) =>
                handleChildChange(item, checked as boolean)
              }
            />
            <label
              htmlFor={item}
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Notification {index + 1}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};