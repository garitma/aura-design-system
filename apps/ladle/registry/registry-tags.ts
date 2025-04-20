// Before adding a new tag, ensure it doesn't already exist in the array.
export const registryTags = [
  //ui
  "button",
  //hooks
  "use-dynamic-form",
] as const;

export type RegistryTag = (typeof registryTags)[number];
