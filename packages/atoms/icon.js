import React from "react"
import PropTypes from "prop-types"

/**
 * Icon component
 */

const Icon = ({ sprite, className, ...props }) => {
  const classConnect = ["icon", sprite, className]

  return <div className={classConnect.join(" ").trim()} {...props}></div>
}

export const iconList = [
  "search",
  "arrowDown",
  "arrowRight",
  "arrowLeft",
  "arrowUp",
  "mail",
  "user",
  "bag",
  "bagAdd",
  "gift",
  "link",
  "close",
  "menu",
  "box",
  "heart",
  "heartFill",
  "heartFillBlack",
  "shop",
  "pay",
  "location",
  "key",
  "arrowAltLeft",
  "arrowAltRigth",
  "check",
  "circle",
  "poweroff",
  "secure",
  "openLink",
  "view",
  "viewOff",
  "copy",
  "delete",
  "edit",
  "bell",
  "github",
  "youtube",
  "instagram",
  "twitter",
  "facebook",
  "giphly",
  "stock",
]

Icon.propTypes = {
  sprite: PropTypes.oneOf(),
}

export default Icon
