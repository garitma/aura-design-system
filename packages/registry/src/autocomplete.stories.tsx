"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/Autocomplete";

const items = [
  { label: "Apricot", value: "apricot" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Peach", value: "peach" },
  { label: "Pear", value: "pear" },
];

export const Sizes = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Autocomplete items={items}>
        <AutocompleteInput
          aria-label="Small search"
          placeholder="Small"
          size="sm"
        />
      </Autocomplete>
      <Autocomplete items={items}>
        <AutocompleteInput aria-label="Default search" placeholder="Default" />
      </Autocomplete>
      <Autocomplete items={items}>
        <AutocompleteInput
          aria-label="Large search"
          placeholder="Large"
          size="lg"
        />
      </Autocomplete>
    </div>
  );
};

export const Default = () => {
  return (
    <Autocomplete items={items}>
      <AutocompleteInput
        aria-label="Search items"
        placeholder="Search items…"
      />
      <AutocompletePopup>
        <AutocompleteEmpty>No items found.</AutocompleteEmpty>
        <AutocompleteList>
          {(item) => (
            <AutocompleteItem key={item.value} value={item}>
              {item.label}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}
