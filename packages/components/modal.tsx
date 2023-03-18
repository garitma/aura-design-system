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
}

const Modal = ({
  isVisible,
  onClose,
  firstButton,
  secondButton,
  title,
  description,
  children,
}: ModalProps): JSX.Element => {
  const isTwoButtons = firstButton && secondButton;

  return (
    <>
      {isVisible && (
        <div
          className="overley black disabled"
          data-aria-hidden="true"
          aria-hidden="true"
        />
      )}
      <dialog className="hold top left right bottom p0 z10 b0" open={isVisible}>
        <div className="valign vfluid smash mod">
          <div className="anchor">
            <Button className="pin right top" mode="link" onClick={onClose}>
              <CloseIcon />
            </Button>
            <div className="mod-detail">
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
