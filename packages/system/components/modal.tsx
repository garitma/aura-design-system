import { SharedBasic } from "../types/global";
import { Cross1Icon } from "@radix-ui/react-icons";

import Button, { ButtonProps } from "./button";

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

const Modal = ({
  isVisible,
  onClose,
  children,
  classNameDialog,
  classNameOverley,
  classNameMod,
  classNameModDetail,
}: ModalProps): JSX.Element => {
  const classNameDialogConnect: string[] = [
    classNameDialog!,
    "hold",
    "top",
    "left",
    "b0",
    "right",
    "bottom",
    "p0",
    "z10",
  ];

  const classNameOverleyConnect: string[] = [
    classNameOverley!,
    "overley",
    "black",
    "disabled",
  ];

  const classNameModConnect: string[] = [
    classNameMod!,
    "valign",
    "smash",
    "mod",
  ];

  const classNameModDetailConnect: string[] = [
    classNameModDetail!,
    "mod-detail",
  ];

  return (
    <>
      {isVisible && (
        <div
          className={classNameOverleyConnect.join(" ").trim()}
          data-aria-hidden="true"
          aria-hidden="true"
        />
      )}
      <dialog
        className={classNameDialogConnect.join(" ").trim()}
        open={isVisible}
      >
        <div className={classNameModConnect.join(" ").trim()}>
          <div className="anchor">
            <Button className="pin right top" mode="link" onClick={onClose}>
              <Cross1Icon />
            </Button>
            <div className={classNameModDetailConnect.join(" ").trim()}>
              {children}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
