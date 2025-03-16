import { useState, useRef } from "react";

type FieldType = "text" | "textarea" | "select" | "checkbox";

interface FormFields {
  [key: string]: FieldType;
}
const initialValueResolver = {
  text: "",
  textarea: "",
  select: "",
  checkbox: false,
};

const useInputValueFields = (initialValues: FormFields = {}) => {
  const resolvedInitialValues = Object.entries(initialValues).reduce(
    (acc, [key, type]) => {
      acc[key] = initialValueResolver[type];
      return acc;
    },
    {} as Record<string, any>
  );

  const [value, setValue] = useState(resolvedInitialValues);
  const [error, setError] = useState<Record<string, string>>({});
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

export const useFormDynamic = (initialValues: FormFields) => {
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
    fields.setError((prev) => ({ ...prev, [name]: updates.error }));
  };

  const field = (name: string) => {
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

    const handleOnCheckedChange = (event: boolean) => {
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
      value: fields.value[name] ?? defaultValue,
      setValue: (value: string | boolean) =>
        updateField(name, { value, touch: true }),
      setFormFieldValue,
      onChange: handleChange,
      onCheckedChange: handleOnCheckedChange,
      touch: fields.touch[name],
      setTouch: (value: boolean) => updateField(name, { touch: value }),
      reset: () =>
        updateField(name, {
          value: defaultValue,
          touch: false,
          error: null,
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

  const resetForm = () => {
    const fields = getFields();
    for (const field in fields) {
      fields[field].reset();
      fields[field].setTouch(false);
    }
  };

  const touchForm = () => {
    const fields = getFields();
    for (const field in fields) {
      fields[field].setTouch(true);
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
  };
};
