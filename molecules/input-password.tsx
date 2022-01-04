import { useState } from "react";
import Input, { InputProps } from "../atoms/input";

const InputPassword = ({ ...props }: InputProps) => {
  const [isView, setIsView] = useState(false);

  return (
    <Input
      leftIcon="key"
      rightIcon={isView ? "viewOff" : "view"}
      type={isView ? "text" : "password"}
      autoComplete="password"
      onClickRightIcon={() => setIsView(!isView)}
      {...props}
    />
  );
};

export default InputPassword;
