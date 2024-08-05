"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Section = ({ children, className, subClassName, space = "pad", container = "smush", passDiv, ...props }) => {
    const SectionTag = passDiv ? `div` : "section";
    const classConnect = [className, space];
    const subClassConnect = [subClassName, container];
    return ((0, jsx_runtime_1.jsx)(SectionTag, { className: classConnect.join(" ").trim(), ...props, children: (0, jsx_runtime_1.jsx)("div", { className: subClassConnect.join(" ").trim(), children: children }) }));
};
exports.default = Section;
