import { SharedBasic } from "@aura-design/shate-types/global";
export interface CheckboxProps extends SharedBasic {
    label?: string;
    containerClassName?: string;
    id?: string;
    setValue?: (value: boolean) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const Checkbox: ({ label, containerClassName, id, setValue, onChange, ...props }: CheckboxProps) => JSX.Element;
export default Checkbox;
//# sourceMappingURL=checkbox.d.ts.map