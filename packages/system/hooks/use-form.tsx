import { useState, useEffect } from "react";

export type InitialInputValueProps =
  | string
  | boolean
  | number
  | Array<string>
  | Array<number>
  | Array<{}>
  | readonly string[]
  | undefined;

export type StatusProps = {
  isLoading: boolean;
  isSubmited: boolean;
  info: { isError: boolean; message?: React.ReactNode | null };
};

export type FormDataProps = Record<
  string,
  {
    value: InitialInputValueProps;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
    touch: boolean;
    reset: () => void;
    dialog: React.Dispatch<React.SetStateAction<string | null>>;
    setTouch: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<InitialInputValueProps>>;
    helpText: string | null;
    isHelping: boolean;
  }
>;

export type InputValueProps = {
  value?: any;
  onChange?: any
  error?: any
  touch?: any;
  reset?: any
  dialog?: any;
  setTouch?: any;
  setValue?: any;
  helpText?: any;
  isHelping?: any;
};

export type SelectValueProps = {
  value?: InitialInputValueProps;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string | null;
  touch?: boolean;
  reset?: () => void;
  dialog?: React.Dispatch<React.SetStateAction<string | null>>;
  setTouch?: React.Dispatch<React.SetStateAction<boolean>>;
  setValue?: React.Dispatch<React.SetStateAction<InitialInputValueProps>>;
  helpText?: string | null;
  isHelping?: boolean;
};

export const useInputValue = (
  initialValue: InitialInputValueProps
): InputValueProps => {
  const [value, setValue] = useState<InitialInputValueProps>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touch, setTouch] = useState<boolean>(false);

  const onChange = (e: { target: { value: string } }) => {
    setValue(e.target.value);
    !touch && setTouch(true);
  };

  const reset = () => setValue(initialValue);
  const dialog = setError;

  return {
    value,
    onChange,
    error,
    touch,
    reset,
    dialog,
    setTouch,
    setValue,
    helpText: error,
    isHelping: Boolean(error && touch),
  };
};

export const useForm = (
  initialValues: Record<string, InitialInputValueProps>
): FormDataProps => {
  const formData: Record<string, any> = {};

  for (const key in initialValues) {
    formData[key] = useInputValue(initialValues[key]);
  }

  return { ...formData };
};

export const useFormValues = (formData: Record<string, InputValueProps>) => {
  let formValues = {};

  for (const value in formData) {
    formValues = {
      ...formValues,
      [value]: formData[value].value,
    };
  }

  return formValues;
};

export const useFormIsValid = (
  data: Record<string, any>,
  schema: (data: Record<string, any>) => boolean,
  debounceTime: number = 50 // Default debounce time (300ms)
) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Create a timeout to debounce validation
    const handler = setTimeout(() => {
      setIsValid(schema(data)); // Run the validation
    }, debounceTime);

    // Cleanup timeout if the effect runs again before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [data, schema]); // Re-run effect when data or schema changes

  return isValid;
};

export const isInvalidSchema = (schema: { [key: string]: boolean }) =>
  Object.values(schema).some((item) => item === false);

export const useStatus = () => {
  const [status, setStatus] = useState<StatusProps>({
    isLoading: false,
    isSubmited: false,
    info: { isError: false, message: null },
  });

  const setIsLoading = (event: any) =>
    setStatus((prevStatus) => ({ ...prevStatus, isLoading: event }));

  const setSubmited = (event: any) =>
    setStatus((prevStatus) => ({ ...prevStatus, isSubmited: event }));

  const setIsError = (event: any) =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      info: {
        ...prevStatus.info,
        isError: event,
      },
    }));

  const setMessage = (message: React.ReactNode) =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      info: {
        ...prevStatus.info,
        message: message,
      },
    }));

  const resetStatus = () => {
    setStatus({
      isLoading: false,
      isSubmited: false,
      info: { isError: false, message: null },
    });
  };

  return {
    state: status,
    message: status.info.message,
    setStatus,
    setMessage,
    setIsLoading,
    setSubmited,
    setIsError,
    resetStatus,
  };
};

export const useInputValueFields = (initialValues = {}) => {
  const [value, setValue] =
    useState<Record<string, InitialInputValueProps>>(initialValues);
  const [error, setError] = useState<Record<string, string | null>>({});
  const [touch, setTouch] = useState<Record<string, boolean>>({});
  const [helpMode, setHelpMode] = useState<Record<string, string | null>>({});

  return {
    value,
    error,
    touch,
    setTouch,
    setValue,
    setError,
    helpMode,
    setHelpMode,
  };
};

type useFormDynamicProps = Record<string, InitialInputValueProps>;

export const useFormDynamic = (
  initialValues?: useFormDynamicProps,
  validateSchema?: any
) => {
  const fields = useInputValueFields(initialValues);

  type FieldName = keyof typeof fields.value;

  const setFieldValue = (name: FieldName, value: any) => {
    fields.setValue((prev) => {
      const newValues = { ...prev, [name]: value };
      if (validateSchema) {
        const fields = getFields();

        for (const key in fields) {
          fields[key].value = newValues[key];
        }

        validateSchema(fields); // Pass the newValues to validateValues
      }
      return newValues;
    });
    !fields.touch[name] &&
      fields.setTouch((prev) => ({ ...prev, [name]: true }));
  };

  const dialog = (name: FieldName, message: string | null) => {
    fields.setError((prev) => ({ ...prev, [name]: message }));
  };

  const field = (name: FieldName) => {
    const error = fields.error[name] ?? null;
    const touch = fields.touch[name];

    return {
      value: fields.value[name] ?? "",
      setValue: (value: any) => setFieldValue(name, value),
      onChange: (event: any) => {
        const { value } = event.target;
        setFieldValue(name, value);
        fields.setTouch((prev) => ({ ...prev, [name]: true }));
      },
      error,
      helpText: error,
      isHelping: Boolean(error && touch),
      helpMode: fields.helpMode[name] ?? "warning",
      setHelpMode: (value: any) =>
        fields.setHelpMode((prev) => ({ ...prev, [name]: value })),
      dialog: (error: string | null) => dialog(name, error),
      touch,
      setTouch: (value: boolean) =>
        fields.setTouch((prev) => ({ ...prev, [name]: value })),
      reset: () => {
        setFieldValue(name, "");
        fields.setTouch((prev) => ({ ...prev, [name]: false }));
      },
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

  const isValid =
    Object.keys(fields.error).length > 0 &&
    Object.keys(fields.error).every((key) => !fields.error[key]);

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

  const validateValues = () => {
    const fields = getFields();
    touchForm();
    validateSchema && validateSchema(fields);
  };

  return {
    ...fields,
    resetForm,
    touchForm,
    isValid,
    validateValues,
    field,
    getFields,
    setFieldValue,
    dialog,
  };
};
