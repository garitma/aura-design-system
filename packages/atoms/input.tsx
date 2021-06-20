import React from "react"
import PropTypes from "prop-types"
import Icon from "./icon"

/**
 * Input component
 */

type HelpType = 'warning' | "info" | "danger" | "success"

type Props = {
  isDisabled?: boolean,
  isHelping?: boolean,
  isLabelable?: boolean,
  helpMode?: HelpType,
  helpText?: string,
  leftIcon?: any,
  placeholder?: string,
  className?: string,
  name: string,
}

const Input = ({
  isDisabled,
  isHelping,
  isLabelable,
  helpMode,
  helpText,
  leftIcon,
  placeholder,
  className,
  name,
  ...props
}: Props) => {
  const classConnect = [className]

  if (leftIcon) {
    classConnect.push("typeahead")
  }

  if (isDisabled) {
    classConnect.push("disabled")
  }

  if (isHelping) {
    classConnect.push("help")
    classConnect.push(helpMode)
  }

  if (!isLabelable) {
    classConnect.push("naked")
  }

  return (
    <div className="inputer">
      <div className={`inputer-group`}>
        <div className="halo">
          <input
            name={name}
            aria-label={placeholder}
            placeholder={placeholder}
            disabled={isDisabled}
            className={classConnect.join(" ").trim()}
            {...props}
          />
          {placeholder && isLabelable && (
            <label htmlFor={name}>{placeholder}</label>
          )}
          {leftIcon && (
            <Icon sprite={leftIcon} className="action left disabled" />
          )}
        </div>
        {isHelping && <span className={`${helpMode}-text`}>{helpText}</span>}
      </div>
    </div>
  )
}

Input.defaultProps = {
  helpMode: "warning",
}

export default Input
