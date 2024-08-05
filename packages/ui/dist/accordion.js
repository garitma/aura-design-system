"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// Importing the ChevronDownIcon component from "radix icons" and some types from "share types global"
const react_icons_1 = require("@radix-ui/react-icons");
// Defining the Accordion component using a function component syntax
const Accordion = ({ title, children, headerSize = "h6", // Default value for headerSize prop is "h6"
className, }) => {
    // Creating an array of CSS classes to be applied to the summary element
    const classNameConnect = [
        className,
        "aura",
        "anchor",
        "lefttxt",
        "b0",
        "fluid",
        "pointer",
        headerSize,
    ];
    // Rendering the Accordion component
    return ((0, jsx_runtime_1.jsxs)("details", { children: [(0, jsx_runtime_1.jsxs)("summary", { className: classNameConnect.join(" ").trim(), children: [title, (0, jsx_runtime_1.jsx)("div", { className: "dropdown disable notevent", children: (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { className: "icon", role: "presentation", focusable: "false" }) })] }), children] }));
};
// Exporting the Accordion component as the default export
exports.default = Accordion;
