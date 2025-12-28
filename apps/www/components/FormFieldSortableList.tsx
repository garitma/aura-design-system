import * as React from "react";
import { ErrorObject } from "ajv";
import { Form as FormRadix } from "radix-ui";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import type { UniqueIdentifier } from "@dnd-kit/core";

import { FieldProps } from "@/hooks/use-dynamic-form";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/components/ui/Sortable";
import { cn } from "@/utils/class-names";

interface FormFieldSortableListProps<T = string>
  extends Partial<FormRadix.FormFieldProps> {
  label: React.ReactNode;
  labelProps?: FormRadix.FormLabelProps;
  controlProps?: FormRadix.FormControlProps;
  field?: FieldProps;
  errors?: ErrorObject<string, Record<string, any>, unknown>[];
  /**
   * Render function for each item. Receives the item value and returns ReactNode.
   * @example renderItem={(item) => <span>{item}</span>}
   */
  renderItem?: (item: T, index: number) => React.ReactNode;
  /**
   * Callback to get unique identifier for each item. Required when using array of objects.
   * @example getItemValue={(item) => item.id}
   */
  getItemValue?: (item: T) => UniqueIdentifier;
  /**
   * Orientation of the sortable list
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal" | "mixed";
  /**
   * Whether to show drag overlay
   * @default true
   */
  showOverlay?: boolean;
  /**
   * Whether to show drag handle
   * @default true
   */
  showHandle?: boolean;
  /**
   * Custom className for items
   */
  itemClassName?: string;
  /**
   * Custom className for the sortable content container
   */
  contentClassName?: string;
}

export const FormFieldSortableList = React.forwardRef<
  HTMLDivElement,
  FormFieldSortableListProps
>(
  (
    {
      label,
      labelProps,
      controlProps,
      field,
      errors,
      renderItem,
      getItemValue,
      orientation = "vertical",
      showOverlay = true,
      showHandle = true,
      itemClassName,
      contentClassName,
      className,
      ...props
    },
    forwardedRef
  ) => {
    const hasError = field?.touch && errors && errors.length > 0;
    const name = props.name || field?.name || "";

    // Ensure field value is an array
    const fieldValue = React.useMemo(() => {
      if (!field?.value) return [];
      return Array.isArray(field.value) ? field.value : [];
    }, [field?.value]);

    const handleValueChange = React.useCallback(
      (value: any[]) => {
        if (field?.setValue) {
          // Sortable lists use arrays, but field.setValue expects string | boolean
          // We'll cast it since sortable lists specifically need array values
          field.setValue(value as any);
        }
      },
      [field]
    );

    const defaultRenderItem = React.useCallback(
      (item: any, index: number) => {
        if (renderItem) {
          return renderItem(item, index);
        }
        return <span className="text-gray-12 flex-1">{String(item)}</span>;
      },
      [renderItem]
    );

    return (
      <FormRadix.Field
        {...props}
        ref={forwardedRef}
        name={name}
        serverInvalid={hasError}
        className={className}
      >
        {label && (
          <div className="mb-1">
            <FormRadix.Label {...labelProps}>{label}</FormRadix.Label>
          </div>
        )}
        <FormRadix.Control {...controlProps} asChild>
          <Sortable
            value={fieldValue}
            onValueChange={handleValueChange}
            orientation={orientation}
            getItemValue={getItemValue}
          >
            <SortableContent
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-row gap-1"
                  : "flex flex-col gap-1",
                contentClassName
              )}
            >
              {fieldValue.map((item, index) => {
                const itemValue = getItemValue
                  ? getItemValue(item)
                  : (item as UniqueIdentifier);

                return (
                  <SortableItem
                    key={itemValue}
                    value={itemValue}
                    asHandle={!showHandle}
                    className={cn(
                      "bg-gray-2 border border-gray-6 rounded-md flex items-center gap-1 p-1",
                      itemClassName
                    )}
                  >
                    {showHandle && (
                      <SortableItemHandle className="cursor-grab active:cursor-grabbing p-0.5 text-gray-11 hover:text-gray-12">
                        <DragHandleDots2Icon className="icon" />
                      </SortableItemHandle>
                    )}
                    {defaultRenderItem(item, index)}
                  </SortableItem>
                );
              })}
            </SortableContent>
            {showOverlay && (
              <SortableOverlay>
                {({ value }) => {
                  const draggedItem = fieldValue.find(
                    (item) =>
                      (getItemValue ? getItemValue(item) : item) === value
                  );

                  return (
                    <div className="bg-gray-2 border border-gray-7 rounded-md flex items-center gap-1 p-1 text-gray-12 shadow-lg">
                      {showHandle && (
                        <div className="p-0.5 text-gray-11">
                          <DragHandleDots2Icon className="icon" />
                        </div>
                      )}
                      <span className="flex-1">
                        {draggedItem
                          ? defaultRenderItem(draggedItem, -1)
                          : String(value)}
                      </span>
                    </div>
                  );
                }}
              </SortableOverlay>
            )}
          </Sortable>
        </FormRadix.Control>
        {hasError &&
          errors?.map((error, index) => (
            <FormRadix.Message className="text-warning-contrast" key={index}>
              {error.message}
            </FormRadix.Message>
          ))}
      </FormRadix.Field>
    );
  }
);

FormFieldSortableList.displayName = "FormFieldSortableList";
