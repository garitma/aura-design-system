import React from "react"
import PropTypes from "prop-types"

/**
 * Wrap
 */

const Section = ({
  children,
  className,
  subClassName,
  color,
  space,
  container,
  passDiv,
  ...props
}) => {
  const SectionTag = passDiv ? `div` : "section"
  const classConnect = [className, space]
  const subClassConnect = [subClassName, container]

  if (color) {
    classConnect.push(color)
  }

  return (
    <SectionTag className={classConnect.join(" ").trim()} {...props}>
      <div className={subClassConnect.join(" ").trim()}>{children}</div>
    </SectionTag>
  )
}
Section.propTypes = {
  subClassName: PropTypes.string,
  space: PropTypes.oneOf(["p0", "pad", "inside-pad", "aura", "wall-pad"]),
  container: PropTypes.oneOf([
    "smish",
    "smosh",
    "smash",
    "smaush",
    "smush",
    "smuesh",
    "smesh",
  ]),
}

Section.defaultProps = {
  space: "pad",
  container: "smush",
}

export default Section
