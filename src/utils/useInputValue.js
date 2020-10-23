import { useState } from "react";

export const useInputValue = initialValue => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [touch, setTouch] = useState(false);

  const onChange = e => {
    setValue(e.target.value), setTouch(true);
  };
  const reset = () => setValue("");
  const dialog = setError;

  return { input: { value, onChange }, error, touch, reset, dialog, setTouch };
};
