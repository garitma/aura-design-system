import Button, { ButtonProps } from "./button";
import Grid from "./grid";
import { SharedBasic } from "../types/global";
import { CloseIcon } from "../icons/CloseIcon";

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
  classNameModDetail?: string
}

const Modal = ({
  isVisible,
  onClose,
  firstButton,
  secondButton,
  title,
  description,
  children,
  classNameDialog,
  classNameOverley,
  classNameMod,
  classNameModDetail
}: ModalProps): JSX.Element => {
  const isTwoButtons = firstButton && secondButton;

  const classNameDialogConnect: string[] = [
    classNameDialog!,
    "hold",
    "top",
    "left",
    "b0",
    "right",
    "bottom",
    "p0",
    "z10"
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
    "vfluid",
    "smash",
    "mod"
  ];

  const classNameModDetailConnect: string[] = [
    classNameModDetail!,
    "mod-detail"
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
      <dialog className={classNameDialogConnect.join(" ").trim()} open={isVisible}>
        <div className={classNameModConnect.join(" ").trim()}>
          <div className="anchor">
            <Button className="pin right top" mode="link" onClick={onClose}>
              <CloseIcon />
            </Button>
            <div className={classNameModDetailConnect.join(" ").trim()}>
              {title && <h2 className="h6 mb13">{title}</h2>}
              {description && <p>{description}</p>}
              {children}
              <hr className="upan-pad" />
              <Grid col={isTwoButtons ? "two" : "one"}>
                {firstButton && (
                  <Button
                    mode={isTwoButtons ? "pill" : "fill"}
                    {...firstButton}
                  />
                )}
                {secondButton && <Button {...secondButton} />}
              </Grid>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
