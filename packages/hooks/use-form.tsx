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
  info: { isError: boolean; message?: string | null };
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
  value?: InitialInputValueProps;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  touch?: boolean;
  reset?: () => void;
  dialog?: React.Dispatch<React.SetStateAction<string | null>>;
  setTouch?: React.Dispatch<React.SetStateAction<boolean>>;
  setValue?: React.Dispatch<React.SetStateAction<InitialInputValueProps>>;
  helpText?: string | null;
  isHelping?: boolean;
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
  data: { [key: string]: any },
  schema: (data: { [key: string]: any }) => boolean
) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(schema(data));
  }, [data, schema]);

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

  const setMessage = (message: string) =>
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

export const useInputValueFields = () => {
  const [value, setValue] = useState<{ [key: string]: InitialInputValueProps }>(
    {}
  );
  const [error, setError] = useState<{ [key: string]: string | null }>({});
  const [touch, setTouch] = useState<{ [key: string]: boolean }>({});

  return {
    value,
    error,
    touch,
    setTouch,
    setValue,
    setError,
  };
};

export const useActions = (
  formData: any
): { resetForm: () => void; touched: () => void; getValues: () => void } => {
  const resetForm = () => {
    for (const field in formData) {
      formData[field]?.reset();
    }
  };

  const touched = () => {
    for (const field in formData) {
      formData[field]?.setTouch(true);
    }
  };

  const getValues = () => {
    let formValues = {};

    for (const value in formData) {
      formValues = {
        ...formValues,
        [value]: formData[value].value,
      };
    }
    return formValues;
  };

  return { resetForm, touched, getValues };
};

export const useFormDynamic = () => {
  const fields = useInputValueFields();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    fields.setValue((prev) => ({ ...prev, [name]: value }));
    fields.setTouch((prev) => ({ ...prev, [name]: true }));
  };

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    fields.setValue((prev) => ({ ...prev, [name]: value }));
    fields.setTouch((prev) => ({ ...prev, [name]: true }));
  };

  const dialog = (name: string, message: string | null) => {
    fields.setError((prev) => ({ ...prev, [name]: message }));
  };

  return { ...fields, onChange, onChangeSelect, dialog };
};
