import React from "react";
import PropTypes from "prop-types";

/**
 * Icon component
 */

const Icon = ({ sprite, className, ...props }) => {

  const classConnect = ["glyphsSprite", sprite, className]

  return (
    <div className={classConnect.join(' ')} {...props}></div>
  );
};

Icon.propTypes = {
  sprite: PropTypes.oneOf([
    "arrowDown",
    "arrowLeft",
    "arrowRight",
    "arrowUp",
    "bag",
    "bag-add",
    "box",
    "close",
    "download",
    "facebook",
    "giphy",
    "heart",
    "heart-fill",
    "heart-fill-black",
    "instagram",
    "key",
    "link",
    "location",
    "mail",
    "menu",
    "pay",
    "play",
    "search",
    "store",
    "twitter",
    "user",
    "youtube"
  ])
};

export default Icon;
