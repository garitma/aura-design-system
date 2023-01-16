import {Fragment} from "react";

import {SharedBasic} from "../types/global";
import Button from "./button"
import { CloseIcon } from "../icons/CloseIcon";

export interface ModalProps extends SharedBasic {
  isVisible?: boolean,
  isValid?: boolean,
  isCTA?: boolean,
  onClose: () => void,
  onAccept?: (event?: any) => void,
  onDecline?: () => void,
  acceptText?: string,
  declineText?: string,
  title?: string,
  description?: string,
}


const Modal = ({
  isVisible,
  isValid = true,
  isCTA = true,
  onClose,
  onAccept,
  onDecline,
  acceptText,
  declineText,
  title,
  description,
  children,
}: ModalProps ) => {
  return isVisible ? (
    <div className="hold top left right bottom">
      <div className="overley accents-3 disabled" onClick={onClose} />
      <div className="valign vfluid pad smash">
        <div className="mod anchor z10">
          <Button className="pin right top" mode="link" onClick={onClose}>
            <CloseIcon />
          </Button>
          <div className="mod-detail">
            {title && <p className="mod-title">{title}</p>}
            {description && <p>{description}</p>}
            {children}
            {isCTA && (
              <div className="mod-cta">
                <div className="aura" />
                <div className="aureole two reverse">
                  <Button
                    target="_blank"
                    onClick={onAccept}
                    className="one"
                    isDisabled={!isValid}
                  >
                    {acceptText}
                  </Button>
                  <Button
                    mode="pill"
                    onClick={onDecline || onClose}
                    className="two"
                  >
                    {declineText}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Fragment></Fragment>
  )
}

export default Modal
