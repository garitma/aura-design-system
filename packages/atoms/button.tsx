import React from "react"
import { Target, SharedBasic, ButtonType } from "../utils/types"

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps extends SharedBasic {
  isDisabled?: boolean
  isFluid?: boolean
  isWaiting?: boolean
  onClick?: () => void
  waitingText?: string
  mode?: ButtonType
  label?: string
  href?: string
  target?: Target
}

const Button = ({
  isDisabled,
  isFluid,
  isWaiting,
  waitingText,
  mode,
  label,
  className,
  href,
  children,
  ...props
}: ButtonProps) => {
  const AuraButton = href || mode === "menu" ? `a` : "button"
  const classConnect = [className, `button-${mode}`]

  if (isFluid) {
    classConnect.push("fluid")
  }
  if (isDisabled || isWaiting) {
    classConnect.push("disabled")
  }

  return (
    <AuraButton
      className={classConnect.join(" ").trim()}
      disabled={isDisabled || isWaiting}
      href={href}
      {...props}
    >
      <span className={`container`}>
        {isWaiting ? waitingText : label}
        {children}
      </span>
    </AuraButton>
  )
}

Button.defaultProps = {
  isDisabled: false,
  isFluid: false,
  isWaiting: false,
  waitingText: "...",
  mode: "fill",
}

export default Button
