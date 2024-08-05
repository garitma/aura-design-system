import { useId } from "react";
import { SharedBasic } from "@aura-design/shate-types/global";
import Input from "./input";

export interface CheckboxProps extends SharedBasic {
  label?: string;
  containerClassName?: string;
  id?: string;
  setValue?: (value: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  label,
  containerClassName,
  id,
  setValue,
  onChange,
  ...props
}: CheckboxProps): JSX.Element => {
  const idConnect = id ? id : useId();
  const classConnect: string[] = [containerClassName!];
  
  const handleOnChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call the provided onChange function with the event
    onChange?.(event);

    // Call the provided setValue function with the checked value
    setValue?.(event.target.checked);
  };

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
