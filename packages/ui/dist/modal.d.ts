import { SharedBasic } from "@aura-design/shate-types/global";
import { ButtonProps } from "./button";
export interface ModalProps extends SharedBasic {
    isVisible?: boolean;
    isValid?: boolean;
    onClose: () => void;
    firstButton?: ButtonProps;
    secondButton?: ButtonProps;
    title?: string;
    description?: string;
    classNameDialog?: string;
    classNameOverley?: string;
    classNameMod?: string;
    classNameModDetail?: string;
}
declare const Modal: ({ isVisible, onClose, firstButton, secondButton, title, description, children, classNameDialog, classNameOverley, classNameMod, classNameModDetail, }: ModalProps) => JSX.Element;
export default Modal;
//# sourceMappingURL=modal.d.ts.map