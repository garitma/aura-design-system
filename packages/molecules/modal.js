import Button from "aura-design/button"

const Modal = ({
  isVisible,
  onClose,
  onAccept,
  onDecline,
  acceptText,
  declineText,
  title,
  description,
  children,
}) => {
  return isVisible ? (
    <div className="hold top left right bottom">
      <div className="overley accents-3 disabled" onClick={onClose} />
      <div className="valign vfluid pad smash">
        <div className="mod anchor z-10">
          <Button className="pin right top" onClick={onClose}>
            <div className="icon close" />
          </Button>
          <div className="mod-detail">
            {title && <p className="mod-title">{title}</p>}
            {description && <p>{description}</p>}
            {children}
            <div className="mod-cta">
              <div className="aura" />
              <div className="aureole two">
                <Button target="_blank" onClick={onAccept}>
                  {acceptText}
                </Button>

                <Button mode="pill" onClick={onDecline}>
                  {declineText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default Modal
