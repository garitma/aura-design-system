import React from "react";
import PropTypes from "prop-types";

/**
 * Icon component
 */

const Icon = ({ sprite, ...props }) => {
  return <div className={`glyphsSprite ${sprite}`} {...props}></div>;
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
    "logo",
    "logo-aura",
    "logo-aura-l",
    "logo-elg",
    "logo-firma",
    "logo-g",
    "logo-gmtc",
    "mail",
    "menu",
    "pay",
    "play",
    "search",
    "store",
    "twitter",
    "user",
    "youtube",
  ]),
};

export default Icon;
