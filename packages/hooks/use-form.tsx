import { useState, useEffect } from "react";

export const useInputValue = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [touch, setTouch] = useState(false);

  const onChange = (e: { target: { value: any } }) => {
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

export const useForm = (initialValues: any) => {
  let data = {};

  for (const value in initialValues) {
    data = {
      ...data,
      [value]: useInputValue(initialValues[value]),
    };
  }

  return data;
};

export const useFormValues = (formData: { [x: string]: { value: any } }) => {
  let formValues = {};

  for (const value in formData) {
    formValues = {
      ...formValues,
      [value]: formData[value].value,
    };
  }

  return formValues;
};

export const useFormIsValid = (data: object, schema: any) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(schema(data));
  }, [data]);

  return isValid;
};

export const useStatus = () => {
  const [status, setStatus] = useState({
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
