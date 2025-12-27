import { useState } from "react";

// Define the possible field types for the form.
type FieldType = "text" | "textarea" | "select" | "checkbox";

// Interface to define the structure of the initial values object.
// It maps field names (string) to their respective field types.
interface useFormDynamicProps {
  [key: string]: FieldType;
}

// Object to resolve the initial value based on the field type.
const initialValueResolver = {
  text: "",
  textarea: "",
  select: "",
  checkbox: false,
};

/**
 * Custom hook to manage the state of input fields in a form.
 * @param initialValues - An object where keys are field names and values are field types.
 * @returns An object containing the current values, errors, touch states, and functions to manage them.
 */
const useInputValueFields = (initialValues: useFormDynamicProps = {}) => {
  // Resolve initial values based on the provided types.
  const resolvedInitialValues = Object.entries(initialValues).reduce(
    (acc, [key, type]) => {
      acc[key] = initialValueResolver[type];
      return acc;
    },
    {} as Record<string, string | boolean>
  );

  // State to hold the current values of the form fields.
  const [value, setValue] = useState<Record<string, string | boolean>>(
    resolvedInitialValues
  );
  // State to hold any errors related to the form fields.
  const [error, setError] = useState<string | null>(null);
  // State to track if a field has been touched (focused and blurred).
  const [touch, setTouch] = useState<Record<string, boolean>>({});

  return {
    types: initialValues, // The types of the fields.
    value, // The current values of the fields.
    error, // Any errors associated with the fields.
    touch, // The touch state of the fields.
    setTouch, // Function to update the touch state.
    setValue, // Function to update the field values.
    setError, // Function to update the error state.
  };
};

// Type definition for the props of a single field.
export type FieldProps = {
  name: string; // The name of the field.
  type: FieldType; // The type of the field.
  value: string | boolean; // The current value of the field.
  setValue: (value: string | boolean) => void; // Function to set the value of the field.
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void; // Function to handle changes in the field.
  onCheckedChange: React.ChangeEventHandler<HTMLInputElement> &
    ((checked: boolean) => void); // Function to handle changes in checkbox fields.
  touch: boolean; // Whether the field has been touched.
  setTouch: (value: boolean) => void; // Function to set the touch state of the field.
  reset: () => void; // Function to reset the field to its default value.
};

/**
 * Custom hook to manage a dynamic form with multiple fields.
 * @param initialValues - An object defining the initial field types.
 * @returns An object containing form state, field management functions, and form-level actions.
 */
export const useFormDynamic = (
  initialValues: useFormDynamicProps,
  formGeneralRef?: React.RefObject<HTMLFormElement | null>
) => {
  // State to track the status of a fetch operation (e.g., submitting the form).
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  // Use the useInputValueFields hook to manage the fields.
  const fields = useInputValueFields(initialValues);

  /**
   * Updates a specific field's value and touch state.
   * @param name - The name of the field to update.
   * @param updates - An object containing the new value and/or touch state.
   */
  const updateField = (
    name: string,
    updates: { value?: string | boolean; touch?: boolean }
  ) => {
    // Update the field's value.
    fields.setValue((prev) => {
      const newValues = { ...prev, [name]: updates.value };
      return newValues;
    });

    // Update the field's touch state.
    fields.setTouch((prev) => ({ ...prev, [name]: updates.touch }));
  };

  /**
   * Returns the props for a specific field.
   * @param name - The name of the field.
   * @returns An object containing the field's props.
   */
  const field = (name: string): FieldProps => {
    const fieldType = fields.types[name];
    const defaultValue = initialValueResolver[fieldType];

    // Handles changes in the field's value.
    const handleChange = (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = event.target.value;

      updateField(name, {
        value,
        touch: true,
      });
    };

    // Handles changes in checkbox fields.
    const handleOnCheckedChange = (event: boolean): void => {
      updateField(name, {
        value: event,
        touch: true,
      });
    };

    // Sets the field's value in the DOM and updates the state.
    const setFormFieldValue = (
      value: string | boolean,
      formRef = formGeneralRef
    ): void => {
      if (formRef) {

        const input = formRef?.current?.querySelector(`[name="${name}"]`) as
          | HTMLInputElement
          | HTMLTextAreaElement
          | HTMLSelectElement
          | null;

        if (input) {
          if (input instanceof HTMLInputElement && input.type === "checkbox") {
            (input as HTMLInputElement).checked = value as boolean;
          } else {
            input.value = String(value);
          }
        }
      }
      updateField(name, {
        value: value,
      });
    };

    return {
      name,
      type: fields.types[name],
      value: fields.value[name] ?? defaultValue,
      setValue: setFormFieldValue,
      onChange: handleChange,
      onCheckedChange:
        handleOnCheckedChange as React.ChangeEventHandler<HTMLInputElement> &
          ((checked: boolean) => void),
      touch: fields.touch[name] ?? false,
      setTouch: (value: boolean) => updateField(name, { touch: value }),
      reset: () =>
        updateField(name, {
          value: defaultValue,
          touch: false,
        }),
    };
  };

  /**
   * Returns an object containing the props for all fields.
   * @returns An object where keys are field names and values are their props.
   */
  const getFields = () => {
    return Object.keys(fields.value).reduce(
      (acc, key) => {
        acc[key] = field(key);
        return acc;
      },
      {} as Record<string, ReturnType<typeof field>>
    );
  };

  /**
   * Resets the form to its initial state.
   * @param formRef - A ref to the form element.
   * @param initialValues - The initial values for the form fields.
   */
  const resetForm = (
    formRef: React.RefObject<HTMLFormElement>,
    initialValues?: Record<string, string | boolean>
  ): void => {
    const fields = getFields();

    for (const field in fields) {
      fields[field].reset();
      fields[field].setFormFieldValue(
        formRef,
        initialValues?.[field] ?? initialValueResolver[fields[field].type]
      );
    }
  };

  /**
   * Touches all fields in the form.
   */
  const touchForm = () => {
    const fields = getFields();
    for (const field in fields) {
      updateField(field, { value: fields[field].value, touch: true });
    }
  };

  /**
   * Returns an object containing the current values of all fields.
   * @returns An object where keys are field names and values are their current values.
   */
  const getValues = () => {
    return Object.keys(fields.value).reduce(
      (acc, key) => {
        acc[key] = fields.value[key];
        return acc;
      },
      {} as Record<string, string | boolean>
    );
  };

  return {
    ...fields, // Spread the fields object to include its properties.
    resetForm, // Function to reset the form.
    touchForm, // Function to touch all fields.
    field, // Function to get the props for a specific field.
    getFields, // Function to get the props for all fields.
    getValues, // Function to get the current values of all fields.
    fetchStatus, // The current fetch status.
    setFetchStatus, // Function to set the fetch status.
  };
};
