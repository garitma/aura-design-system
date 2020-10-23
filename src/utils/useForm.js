import { useState, useEffect } from "react";
import { useInputValue } from "hooks/useInputValue";

export const useForm = initialValues => {
  let data = {};

  for (const value in initialValues) {
    data = {
      ...data,
      [value]: useInputValue(initialValues[value])
    };
  }

  return data;
};

export const useFormReset = data => {
  for (const value in data) {
    data[value].reset(), data[value].touched(false);
  }
};

export const useFormIsValid = (data, schema) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(schema(data));
  }, [data]);

  return isValid;
};
