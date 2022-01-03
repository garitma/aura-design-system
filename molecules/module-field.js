import { useState } from "react";
import Button from "../atoms/button";
import Grid from "../layout/grid";
import Modal from "./Modal";

const ModuleField = ({
  children,
  title,
  desc,
  notice,
  color = "teal-green",
  modalChildren,
  modalTitle,
  modalOnAccept,
  modalDescription,
  modalOnAcceptText,
  modalOnDeclineText,
  onFirsSubmit,
  onAcceptText,
  onCancel,
  isOneColumn,
  isHiddenCancel,
  isModalable,
  isTwoSteps,
  isValid,
  isModalValid,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOnPress = async (event) => {
    event.preventDefault();
    if (isModalable) {
      if (isTwoSteps) {
        const check = await onFirsSubmit();
        if (check) {
          setIsOpen(!isOpen);
        }

        return;
      }
      setIsOpen(!isOpen);
      return;
    }
  };

  const handleOnSubmit = (event) => {
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
                    onClick={(event) => isModalable && handleOnPress(event)}
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
          onAccept={(event) => handleOnSubmit(event)}
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
