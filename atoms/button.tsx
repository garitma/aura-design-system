import * as React from "react"
import { Target, SharedBasic, ButtonType } from "../types/global"

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

const Button = React.forwardRef(({
  isDisabled = false,
  isFluid = false,
  isWaiting = false,
  waitingText = "...",
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
        {isWaiting ? waitingText : label}
        {children}
      </span>
    </AuraButton>
  )
})


export default Button
