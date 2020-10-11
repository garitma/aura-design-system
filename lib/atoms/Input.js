"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Icon component
 */
var Input = function Input(_ref) {
  var placeholder = _ref.placeholder,
      className = _ref.className,
      dialog = _ref.dialog,
      dialogColor = _ref.dialogColor,
      label = _ref.label,
      icon = _ref.icon,
      name = _ref.name,
      props = _objectWithoutProperties(_ref, ["placeholder", "className", "dialog", "dialogColor", "label", "icon", "name"]);

  var inputAllClassName = "".concat(className || "", " ").concat(icon ? "typeahead" : "", " ").concat(dialog ? dialogColor : "");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "inputer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "inputer-group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "halo"
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    name: name,
    "aria-label": placeholder,
    placeholder: placeholder,
    className: inputAllClassName
  }, props)), placeholder && label && /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: name
  }, placeholder), dialog && /*#__PURE__*/_react.default.createElement("span", {
    className: "disable"
  }, dialog), icon && /*#__PURE__*/_react.default.createElement(_.Icon, {
    sprite: icon,
    className: "action left disable"
  }))));
};

Input.propTypes = {
  placeholder: _propTypes.default.string,
  label: _propTypes.default.bool,
  dialog: _propTypes.default.string,
  dialogColor: _propTypes.default.oneOf(["blue", "green", "yellow", "orange", "pink"]),
  icon: _propTypes.default.oneOf(["bag", "bag-add", "box", "close", "facebook", "giphy", "heart", "heart-fill", "heart-fill-black", "instagram", "key", "link", "location", "mail", "menu", "pay", "search", "store", "twitter", "user", "youtube"])
};
Input.defaultProps = {
  label: true,
  dialogColor: "yellow"
};
var _default = Input;
exports.default = _default;