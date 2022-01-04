import { useState } from "react";

import { SharedBasic, AuraColors } from "../types/global";
import Button from "../atoms/button";
import Grid from "../layout/grid";
import Modal from "./Modal";

export interface ModuleFieldProps extends SharedBasic {
  title?: string,
  desc?: string,
  notice?: string,
  color?: AuraColors,
  modalChildren?: any,
  modalTitle?: string,
  modalOnAccept?: (event: React.SyntheticEvent) => void,
  modalDescription?: string,
  modalOnAcceptText?: string,
  modalOnDeclineText?: string,
  onFirsSubmit?: () => void,
  onAcceptText?: string,
  onCancel?: () => void,
  isOneColumn?: boolean,
  isHiddenCancel?: boolean,
  isModalable?: boolean,
  isTwoSteps?: boolean,
  isValid?: boolean,
  isModalValid?: boolean,
}

const ModuleField = ({
  children,
  title,
  desc,
  notice,
  color = "teal-green",
  modalChildren,
  modalTitle,
  modalOnAccept = () => {},
  modalDescription,
  modalOnAcceptText,
  modalOnDeclineText,
  onFirsSubmit = () => {},
  onAcceptText,
  onCancel,
  isOneColumn,
  isHiddenCancel,
  isModalable,
  isTwoSteps,
  isValid,
  isModalValid,
}: ModuleFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnPress = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (isModalable) {
      if (isTwoSteps) {
        const check: any = await onFirsSubmit();
        if (check) {
          setIsOpen(!isOpen);
        }

        return;
      }
      setIsOpen(!isOpen);
      return;
    }
  };

  const handleOnSubmit = (event: React.SyntheticEvent) => {
    setIsOpen(!isOpen);
    modalOnAccept(event);
  };

  return (
    <>
      <div className="mod">
        <div className="mod-detail">
          <h4 className="mod-title mb0">{title}</h4>
          <p>{desc}</p>
          <Grid col={isOneColumn ? "one" : "two"}>{children}</Grid>
        </div>
        <div className={`mod-action ${color}`}>
          <div className="aureole two">
            <div className="valign">
              <p>{notice}</p>
            </div>
            <div className="halo">
              <div className="layer">
                <div className="aura">
                  {!isHiddenCancel && (
                    <Button mode="link" type="reset" onClick={onCancel}>
                      Cancelar
                    </Button>
                  )}
                  <span className="aura" />
                  <Button
                    mode="fill"
                    isDisabled={!isValid}
                    onClick={(event: React.SyntheticEvent) => isModalable && handleOnPress(event)}
                  >
                    {onAcceptText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalable && (
        <Modal
          isVisible={isOpen}
          title={modalTitle}
          acceptText={modalOnAcceptText}
          declineText={modalOnDeclineText}
          description={modalDescription}
          onAccept={(event: React.SyntheticEvent) => handleOnSubmit(event)}
          onDecline={() => setIsOpen(!isOpen)}
          onClose={() => setIsOpen(!isOpen)}
          isValid={isModalValid}
        >
          {modalChildren}
        </Modal>
      )}
    </>
  );
};

export default ModuleField;
