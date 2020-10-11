"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Primary UI component for user interaction
 */
var Button = function Button(_ref) {
  var label = _ref.label,
      type = _ref.type,
      mode = _ref.mode,
      fluid = _ref.fluid,
      props = _objectWithoutProperties(_ref, ["label", "type", "mode", "fluid"]);

  var size = fluid ? "fluid" : "";

  if (type === "link") {
    return /*#__PURE__*/_react.default.createElement("a", _extends({
      className: "button-".concat(mode, " ").concat(size)
    }, props), /*#__PURE__*/_react.default.createElement("span", {
      className: "container"
    }, label));
  }

  return /*#__PURE__*/_react.default.createElement("button", _extends({
    type: type,
    className: "button-".concat(mode, " ").concat(size)
  }, props), /*#__PURE__*/_react.default.createElement("span", {
    className: "container"
  }, label));
};

Button.propTypes = {
  type: _propTypes.default.oneOf(["button", "reset", "submit", "menu", "link"]),
  mode: _propTypes.default.oneOf(["fill", "pill", "link"]),
  label: _propTypes.default.string.isRequired,
  fluid: _propTypes.default.bool
};
Button.defaultProps = {
  type: "button",
  label: "Button",
  mode: "fill",
  fluid: false
};
var _default = Button;
exports.default = _default;