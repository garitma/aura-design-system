"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Input = ({ isDisabled, isHelping, isLabelable, helpMode = "warning", helpText, placeholder, className, classNameContainer, name, ...props }) => {
    // Extracting specific props from `props` object using destructuring
    const { touch, setTouch, setValue, reset, dialog, value, ...inputProps } = props;
    // CSS class names for the input element and container
    const classConnect = [className];
    const classContainerConnect = [classNameContainer, "inputer"];
    // Function to validate and normalize the value
    const validateValue = (value) => {
        if (typeof value === "string" || typeof value === "number") {
            return value;
        }
        return;
    };
    if (isDisabled) {
        classConnect.push("disabled");
    }
    if (isHelping) {
        classConnect.push("help");
        classConnect.push(helpMode);
    }
    if (!isLabelable) {
        classConnect.push("naked");
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: classContainerConnect.join(" ").trim(), children: (0, jsx_runtime_1.jsxs)("div", { className: `inputer-group`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "halo", children: [(0, jsx_runtime_1.jsx)("input", { name: name, "aria-label": placeholder, placeholder: placeholder, disabled: isDisabled, className: classConnect.join(" ").trim(), value: validateValue(value), ...inputProps }), placeholder && isLabelable && ((0, jsx_runtime_1.jsx)("label", { htmlFor: name, children: placeholder }))] }), isHelping && (0, jsx_runtime_1.jsx)("div", { className: `${helpMode}-text aura`, children: helpText })] }) }));
};
exports.default = Input;
