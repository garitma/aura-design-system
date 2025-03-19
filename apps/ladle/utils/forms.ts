import { useState, useRef } from "react";

type FieldType = "text" | "textarea" | "select" | "checkbox";

interface useFormDynamicProps {
  [key: string]: FieldType;
}
const initialValueResolver = {
  text: "",
  textarea: "",
  select: "",
  checkbox: false,
};

const useInputValueFields = (initialValues: useFormDynamicProps = {}) => {
  const resolvedInitialValues = Object.entries(initialValues).reduce(
    (acc, [key, type]) => {
      acc[key] = initialValueResolver[type];
      return acc;
    },
    {} as Record<string, any>
  );

  const [value, setValue] = useState(resolvedInitialValues);
  const [error, setError] = useState<string>(null);
  const [touch, setTouch] = useState<Record<string, boolean>>({});

  return {
    types: initialValues,
    value,
    error,
    touch,
    setTouch,
    setValue,
    setError,
  };
};

export type FieldProps = {
  name: string;
  type: FieldType;
  value: string | boolean;
  setValue: (value: string | boolean) => void;
  setFormFieldValue: (
    formRef: React.RefObject<HTMLFormElement>,
    value: string | boolean
  ) => void;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCheckedChange: React.ChangeEventHandler<HTMLInputElement> &
    ((checked: boolean) => void);
  touch: boolean;
  setTouch: (value: boolean) => void;
  reset: () => void;
};

export const useFormDynamic = (initialValues: useFormDynamicProps) => {
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const fields = useInputValueFields(initialValues);

  const updateField = (
    name: string,
    updates: Partial<Record<keyof typeof fields, any>>
  ) => {
    fields.setValue((prev) => {
      const newValues = { ...prev, [name]: updates.value };
      return newValues;
    });

    fields.setTouch((prev) => ({ ...prev, [name]: updates.touch }));
  };

  const field = (name: string): FieldProps => {
    const fieldType = fields.value[name];
    const defaultValue = initialValueResolver[fieldType];

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

    const handleOnCheckedChange = (event: boolean): any => {
      updateField(name, {
        value: event,
        touch: true,
      });
    };

    const setFormFieldValue = (formRef, value) => {
      const input = formRef?.current?.querySelector(`[name="${name}"]`);
      if (input) {
        input.value = value;
      }
      updateField(name, {
        value: value,
      });
    };

    return {
      name,
      type: fields.types[name],
      value: fields.value[name] ?? defaultValue,
      setValue: (value: string | boolean) =>
        updateField(name, { value, touch: true }),
      setFormFieldValue,
      onChange: handleChange,
      onCheckedChange:
        handleOnCheckedChange as React.ChangeEventHandler<HTMLInputElement> &
          ((checked: boolean) => void),
      touch: fields.touch[name],
      setTouch: (value: boolean) => updateField(name, { touch: value }),
      reset: () =>
        updateField(name, {
          value: defaultValue,
          touch: false,
        }),
    };
  };

  const getFields = () => {
    return Object.keys(fields.value).reduce(
      (acc, key) => {
        acc[key] = field(key);
        return acc;
      },
      {} as Record<string, ReturnType<typeof field>>
    );
  };

  const resetForm = (formRef, initialValues) => {
    const fields = getFields();

    for (const field in fields) {
      fields[field].reset();
      fields[field].setFormFieldValue(
        formRef,
        initialValues?.[field] ?? initialValueResolver[fields[field].type]
      );
    }
  };

  const touchForm = () => {
    const fields = getFields();
    for (const field in fields) {
      updateField(field, { value: fields[field].value, touch: true });
   
    }
  };

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
    ...fields,
    resetForm,
    touchForm,
    field,
    getFields,
    getValues,
    fetchStatus,
    setFetchStatus,
  };
};
