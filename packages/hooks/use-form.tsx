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

export type FormDataProps = { [key: string]: InputValueProps };

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

interface DynamicInputProps {
  [key: string]: InitialInputValueProps;
}

export const useForm = (initialValues: DynamicInputProps) => {
  const data: { [key: string]: any } = {};

  for (const key in initialValues) {
    data[key] = useInputValue(initialValues[key]);
  }

  return data;
};

export const useFormValues = (formData: {
  [key: string]: { value: InitialInputValueProps };
}) => {
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

export const isInvalidSchema = (schema: { [key: string]: boolean }) =>
  Object.values(schema).some((item) => item === false);
