import { useState, useEffect } from "react";

type InitialInputValueProps =
  | string
  | boolean
  | number
  | Array<string>
  | Array<number>
  | Array<{}>;

export const useInputValue = (initialValue: InitialInputValueProps) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touch, setTouch] = useState<boolean>(false);

  const onChange = (e: { target: { value: InitialInputValueProps } }) => {
    setValue(e.target.value), setTouch(true);
  };
  const reset = () => setValue("");
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
    isHelping: error && touch,
  };
};

interface DynamicInputProps {
  [key: string]: InitialInputValueProps;
}

export const useForm = (initialValues: DynamicInputProps) => {
  let data = {};

  for (const value in initialValues) {
    data = {
      ...data,
      [value]: useInputValue(initialValues[value]),
    };
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
  data: object,
  schema: (data: object) => boolean
) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(schema(data));
  }, [data]);

  return isValid;
};

type StatusProps = {
  isLoading: boolean;
  isSubmited: boolean;
  info: { isError: boolean; message?: string | null };
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

  const setMessage = (message: any) =>
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

export const isInvalidSchema = (schema: any) =>
  Object.values(schema).some((item) => item === false);
