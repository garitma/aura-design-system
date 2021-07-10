import { useState, useEffect } from "react";

export const useInputValue = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);

  const onChange = (e: { target: { value: any; }; }) => {
    setValue(e.target.value), setTouch(true);
  };
  const reset = () => setValue("");
  const dialog = setError;

  const input = {
    value,
    onChange,
    helpText: error,
    isHelping: error && touch ? true : false,
  };

  return {
    value,
    onChange,
    error,
    touch,
    reset,
    dialog,
    setTouch,
    setValue,
    input,
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

export const useFormValues = (formData: { [x: string]: { value: any; }; }) => {
  let formValues = {};

  for (const value in formData) {
    formValues = {
      ...formValues,
      [value]: formData[value].value,
    };
  }

  return formValues;
};



export const useFormIsValid = (data: any, schema: any) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(schema(data));
  }, [data]);

  return isValid;
};

export const useStatus = () => {
  const [status, setStatus] = useState({
    isWaiting: false,
    isSubmited: false,
    info: { isError: false, msg: null },
  });

  const isWaiting = (event: any) =>
    setStatus((prevStatus) => ({ ...prevStatus, isWaiting: event }));

  const toggleIsWaiting = () =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      isWaiting: !status.isWaiting,
    }));

  const isSubmited = (event: any) =>
    setStatus((prevStatus) => ({ ...prevStatus, isSubmited: event }));

  const toggleIsSubmited = () =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      isSubmited: !status.isSubmited,
    }));

  const isError = (event: any) =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      info: {
        error: event,
        ...prevStatus.info,
      },
    }));

  const toggleIsError = () =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      info: {
        error: !prevStatus.info.isError,
        ...prevStatus.info,
      },
    }));

  const setMessage = (message: any) =>
    setStatus((prevStatus) => ({
      ...prevStatus,
      info: {
        message: message,
        ...prevStatus.info,
      },
    }));

  const message = status.info.msg;

  return {
    state: status,
    setStatus,
    message,
    setMessage,
    isWaiting,
    isSubmited,
    isError,
    toggleIsWaiting,
    toggleIsSubmited,
    toggleIsError,
  };
};
