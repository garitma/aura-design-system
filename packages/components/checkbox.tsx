import { useId } from "react";
import { SharedBasic } from "../types/global";
import Input from "./input";

export interface CheckboxProps extends SharedBasic {
  label?: string;
  containerClassName?: string;
  id?: string;
  setValue?: (event?: any) => void;
}

const Checkbox = ({
  label,
  containerClassName,
  id,
  setValue,
  ...props
}: CheckboxProps) => {
  const idConnect = id ? id : useId();
  const classConnect: string[] = [containerClassName!];
  const handleOnChangeCheck = setValue
    ? () => setValue((currentValue: boolean) => !currentValue)
    : () => {};

  return (
    <div className={classConnect.join()}>
      <div className="inputer nav-list checkbox mt13 lalign">
        <Input
          className="default"
          type="checkbox"
          id={idConnect}
          onChange={handleOnChangeCheck}
          {...props}
        />
        {label && (
          <label className="inputer" htmlFor={idConnect}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
