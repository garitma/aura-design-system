"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const input_1 = __importDefault(require("./input"));
const Checkbox = ({ label, containerClassName, id, setValue, onChange, ...props }) => {
    const idConnect = id ? id : (0, react_1.useId)();
    const classConnect = [containerClassName];
    const handleOnChangeCheck = (event) => {
        // Call the provided onChange function with the event
        onChange?.(event);
        // Call the provided setValue function with the checked value
        setValue?.(event.target.checked);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: classConnect.join(), children: (0, jsx_runtime_1.jsxs)("div", { className: "inputer nav-list checkbox mt13 lalign", children: [(0, jsx_runtime_1.jsx)(input_1.default, { className: "default", type: "checkbox", id: idConnect, onChange: handleOnChangeCheck, ...props }), label && ((0, jsx_runtime_1.jsx)("label", { className: "inputer", htmlFor: idConnect, children: label }))] }) }));
};
exports.default = Checkbox;
