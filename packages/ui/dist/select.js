"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const Select = ({ isDisabled, isHelping, isLabelable, helpMode = "warning", helpText, placeholder, className, classNameContainer, name, children, ...props }) => {
    const { touch, setTouch, setValue, reset, dialog, value, ...inputProps } = props;
    const classConnect = [className];
    const classContainerConnect = [classNameContainer, "inputer"];
    if (isDisabled) {
        classConnect.push("disabled");
    }
    if (isHelping) {
        classConnect.push("help");
        classConnect.push(helpMode);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: classContainerConnect.join(" ").trim(), children: [(0, jsx_runtime_1.jsx)("div", { className: "inputer-group", children: (0, jsx_runtime_1.jsxs)("div", { className: "halo", children: [(0, jsx_runtime_1.jsxs)("select", { className: classConnect.join(" ").trim(), "aria-label": placeholder, disabled: isDisabled, value: value?.toLocaleString(), ...inputProps, children: [placeholder && (0, jsx_runtime_1.jsx)("option", { value: "", children: placeholder }), children] }), (0, jsx_runtime_1.jsx)("div", { className: "dropdown disable notevent", children: (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { className: "icon", role: "presentation", focusable: "false" }) })] }) }), isHelping && (0, jsx_runtime_1.jsx)("div", { className: `${helpMode}-text aura`, children: helpText })] }));
};
exports.default = Select;
