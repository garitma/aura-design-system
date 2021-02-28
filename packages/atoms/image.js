import React from "react"
import PropTypes from "prop-types"
import useProgressiveSource from "../utils/useProgressiveSource"

const Image = ({
  className,
  subClassName,
  src,
  mode,
  placeholder,
  ...props
}) => {
  const loadedImage = useProgressiveSource(src)
  const lazyImage = loadedImage || placeholder
  const classConnect = [className]
  const subClassNameConnect = []

  if (subClassName) {
    subClassNameConnect.push(subClassName)
  }

  if (!loadedImage) {
    subClassNameConnect.push("fluid")
  }

  if (mode) {
    classConnect.push(mode)
  }

  return (
    <div className={classConnect.join(" ").trim()}>
      <img
        src={lazyImage}
        {...props}
        className={subClassNameConnect.join(" ").trim()}
      />
    </div>
  )
}

Image.propTypes = {
  mode: PropTypes.oneOf(["block-img", "mod-media"]),
  src: PropTypes.string,
  placeholder: PropTypes.string,
}

Image.defaultProps = {
  mode: "block-img",
}

export default Image
