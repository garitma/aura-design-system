"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Grid = ({ children, className, col, isFixed, ...props }) => {
    const classConnect = ["aureole", className];
    if (col) {
        classConnect.push(col);
    }
    if (isFixed) {
        classConnect.push("fixed");
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: classConnect.join(" ").trim(), ...props, children: children }));
};
exports.default = Grid;
