import * as React from "react"
import { Target, SharedBasic, ButtonMode, ButtonType } from "../../types/global";

/**
 * Primary UI component for user interaction
 */

export interface ButtonProps extends SharedBasic {
  isDisabled?: boolean
  isFluid?: boolean
  isWaiting?: boolean
  onClick?: (event?: any) => void
  isWaitingText?: string
  mode?: ButtonMode
  label?: string
  href?: string
  target?: Target
  type?: ButtonType
}

const Button = React.forwardRef(({
  isDisabled = false,
  isFluid = false,
  isWaiting = false,
  isWaitingText = "...",
  mode = "fill",
  label,
  className,
  href,
  children,
  ...props
}: ButtonProps, ref: any) => {
  const AuraButton = href || mode === "menu" ? `a` : "button"
  const classConnect: string[] = [className!, `button-${mode}`]

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
      ref={ref}
      {...props}
    >
      <span className={`container`}>
        {isWaiting ? isWaitingText : label}
        {children}
      </span>
    </AuraButton>
  )
})


export default Button
