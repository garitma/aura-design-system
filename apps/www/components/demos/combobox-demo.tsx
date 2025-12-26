import { useState, useId } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxClear,
  ComboboxValue,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
} from "@/components/ui/Combobox";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { CheckIcon, Cross2Icon, ChevronDownIcon } from "@radix-ui/react-icons";

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grape",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cherry",
  "Peach",
  "Pear",
  "Plum",
  "Kiwi",
  "Watermelon",
  "Cantaloupe",
  "Honeydew",
  "Papaya",
  "Guava",
  "Lychee",
  "Pomegranate",
  "Apricot",
  "Grapefruit",
  "Passionfruit",
];

const countries = [
  { value: "us", label: "United States", region: "Americas" },
  { value: "ca", label: "Canada", region: "Americas" },
  { value: "mx", label: "Mexico", region: "Americas" },
  { value: "uk", label: "United Kingdom", region: "Europe" },
  { value: "fr", label: "France", region: "Europe" },
  { value: "de", label: "Germany", region: "Europe" },
  { value: "it", label: "Italy", region: "Europe" },
  { value: "es", label: "Spain", region: "Europe" },
  { value: "jp", label: "Japan", region: "Asia" },
  { value: "cn", label: "China", region: "Asia" },
  { value: "kr", label: "South Korea", region: "Asia" },
  { value: "in", label: "India", region: "Asia" },
  { value: "au", label: "Australia", region: "Oceania" },
  { value: "nz", label: "New Zealand", region: "Oceania" },
];


export const ComboboxDemo = () => {
  const id = useId();
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Choose a fruit</Label>
      <Combobox items={fruits}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="e.g. Apple"
            className="flex-1 outline-none bg-transparent"
          />
          <div className="flex items-center gap-0.5">
            <ComboboxClear
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Clear selection"
            >
              <Cross2Icon className="size-1" />
            </ComboboxClear>
            <ComboboxTrigger
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Open popup"
            >
              <ChevronDownIcon className="size-1" />
            </ComboboxTrigger>
          </div>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoWithClearButton = () => {
  const id = `combobox-clear-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Select a fruit</Label>
      <Combobox items={fruits}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="Search fruits..."
            className="flex-1 outline-none bg-transparent"
          />
          <ComboboxClear
            className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
            aria-label="Clear selection"
          >
            <Cross2Icon className="size-1" />
          </ComboboxClear>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoWithTriggerButton = () => {
  const id = useId();
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Choose a fruit</Label>
      <Combobox items={fruits}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="Select a fruit"
            className="flex-1 outline-none bg-transparent"
          />
          <ComboboxTrigger
            className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
            aria-label="Open popup"
          >
            <ChevronDownIcon className="size-1" />
          </ComboboxTrigger>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoWithChips = () => {
  const id = useId();
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Select multiple fruits</Label>
      <Combobox items={fruits} multiple>
        <ComboboxChips className="min-h-9 flex-wrap gap-1.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxChip>
            <ComboboxValue />
            <ComboboxChipRemove>
              <Cross2Icon className="size-1" />
            </ComboboxChipRemove>
          </ComboboxChip>
          <ComboboxInput
            id={id}
            placeholder="Add fruits..."
            className="min-w-16 flex-1 outline-none bg-transparent"
          />
        </ComboboxChips>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoWithGroups = () => {
  const id = useId();
  const regions = Array.from(new Set(countries.map((c) => c.region)));

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Select a country</Label>
      <Combobox items={countries} getItemValue={(item) => item.value}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="Search countries..."
            className="flex-1 outline-none bg-transparent"
          />
          <div className="flex items-center gap-0.5">
            <ComboboxClear
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Clear selection"
            >
              <Cross2Icon className="size-1" />
            </ComboboxClear>
            <ComboboxTrigger
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Open popup"
            >
              <ChevronDownIcon className="size-1" />
            </ComboboxTrigger>
          </div>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No countries found.</ComboboxEmpty>
              <ComboboxList>
                {regions.map((region) => (
                  <ComboboxGroup key={region}>
                    <ComboboxGroupLabel>{region}</ComboboxGroupLabel>
                    {countries
                      .filter((c) => c.region === region)
                      .map((country) => (
                        <ComboboxItem key={country.value} value={country.value}>
                          <ComboboxItemIndicator>
                            <CheckIcon className="size-1" />
                          </ComboboxItemIndicator>
                          <span>{country.label}</span>
                        </ComboboxItem>
                      ))}
                  </ComboboxGroup>
                ))}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoWithSeparator = () => {
  const id = useId();
  const popularFruits = ["Apple", "Banana", "Orange", "Grape"];
  const otherFruits = fruits.filter((f) => !popularFruits.includes(f));

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Choose a fruit</Label>
      <Combobox items={fruits}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="e.g. Apple"
            className="flex-1 outline-none bg-transparent"
          />
          <div className="flex items-center gap-0.5">
            <ComboboxClear
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Clear selection"
            >
              <Cross2Icon className="size-1" />
            </ComboboxClear>
            <ComboboxTrigger
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Open popup"
            >
              <ChevronDownIcon className="size-1" />
            </ComboboxTrigger>
          </div>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxGroup>
                  <ComboboxGroupLabel>Popular</ComboboxGroupLabel>
                  {popularFruits.map((item) => (
                    <ComboboxItem key={item} value={item}>
                      <ComboboxItemIndicator>
                        <CheckIcon className="size-1" />
                      </ComboboxItemIndicator>
                      <span>{item}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
                <ComboboxSeparator />
                <ComboboxGroup>
                  <ComboboxGroupLabel>Others</ComboboxGroupLabel>
                  {otherFruits.map((item) => (
                    <ComboboxItem key={item} value={item}>
                      <ComboboxItemIndicator>
                        <CheckIcon className="size-1" />
                      </ComboboxItemIndicator>
                      <span>{item}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoControlled = () => {
  const [value, setValue] = useState<string | null>(null);
  const id = useId();

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-0.5">
        <span className="text-sm text-gray-11">Selected:</span>
        <span className="text-sm font-medium">{value || "None"}</span>
      </div>
      <Label htmlFor={id}>Choose a fruit</Label>
      <Combobox items={fruits} value={value} onValueChange={setValue}>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
          <ComboboxInput
            id={id}
            placeholder="e.g. Apple"
            className="flex-1 outline-none bg-transparent"
          />
          <div className="flex items-center gap-0.5">
            <ComboboxClear
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Clear selection"
            >
              <Cross2Icon className="size-1" />
            </ComboboxClear>
            <ComboboxTrigger
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Open popup"
            >
              <ChevronDownIcon className="size-1" />
            </ComboboxTrigger>
          </div>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
      <Button
        variant="link"
        size="sm"
        onClick={() => setValue(null)}
        className="mt-0.5"
      >
        Clear Selection
      </Button>
    </div>
  );
};

export const ComboboxDemoDisabled = () => {
  const id = useId();
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>Choose a fruit (disabled)</Label>
      <Combobox items={fruits} disabled>
        <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 opacity-50 cursor-not-allowed">
          <ComboboxInput
            id={id}
            placeholder="e.g. Apple"
            className="flex-1 outline-none bg-transparent"
            disabled
          />
          <div className="flex items-center gap-0.5">
            <ComboboxClear
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Clear selection"
              disabled
            >
              <Cross2Icon className="size-1" />
            </ComboboxClear>
            <ComboboxTrigger
              className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
              aria-label="Open popup"
              disabled
            >
              <ChevronDownIcon className="size-1" />
            </ComboboxTrigger>
          </div>
        </div>
        <ComboboxPortal>
          <ComboboxPositioner sideOffset={4}>
            <ComboboxPopup className="w-40">
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    <ComboboxItemIndicator>
                      <CheckIcon className="size-1" />
                    </ComboboxItemIndicator>
                    <span>{item}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </Combobox>
    </div>
  );
};

export const ComboboxDemoPositioning = () => {
  const id = useId();

  return (
    <div className="grid grid-cols-2 gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <div key={side} className="space-y-1">
          <Label htmlFor={id} className="capitalize">
            {side}
          </Label>
          <Combobox items={fruits}>
            <div className="flex items-center gap-0.5 border border-gray-6 rounded-sm px-2 py-1.5 focus-within:ring-2 focus-within:ring-gray-8">
              <ComboboxInput
                id={id}
                placeholder="e.g. Apple"
                className="flex-1 outline-none bg-transparent"
              />
              <div className="flex items-center gap-0.5">
                <ComboboxClear
                  className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
                  aria-label="Clear selection"
                >
                  <Cross2Icon className="size-1" />
                </ComboboxClear>
                <ComboboxTrigger
                  className="p-0.5 hover:bg-accent-3 rounded-sm cursor-pointer"
                  aria-label="Open popup"
                >
                  <ChevronDownIcon className="size-1" />
                </ComboboxTrigger>
              </div>
            </div>
            <ComboboxPortal>
              <ComboboxPositioner side={side} sideOffset={4}>
                <ComboboxPopup className="w-40">
                  <ComboboxEmpty>No fruits found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        <ComboboxItemIndicator>
                          <CheckIcon className="size-1" />
                        </ComboboxItemIndicator>
                        <span>{item}</span>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxPopup>
              </ComboboxPositioner>
            </ComboboxPortal>
          </Combobox>
        </div>
      ))}
    </div>
  );
};