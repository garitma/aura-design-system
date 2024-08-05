"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Icon = ({ displayName = "Icon", viewBox, children, focusable = false, className, }) => {
    const classConnect = [className, "icon"];
    const fallbackIcon = {
        path: ((0, jsx_runtime_1.jsxs)("g", { stroke: "currentColor", children: [(0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "m12.32,24.34L0,19.95V4.64L12.32,0l11.87,4.65v15.3l-11.87,4.4ZM.88,19.32l11.43,4.08,11-4.08V5.25L12.32.95.88,5.25v14.07Z" }), (0, jsx_runtime_1.jsx)("polygon", { fill: "currentColor", points: "12.54 24.2 11.66 24.19 11.77 10.17 .28 5.68 .6 4.86 12.66 9.57 12.54 24.2" }), (0, jsx_runtime_1.jsx)("rect", { fill: "currentColor", x: "11.77", y: "7.02", width: "12.43", height: ".88", transform: "translate(-1.49 7.21) rotate(-21.79)" })] })),
        viewBox: "0 0 24 24",
    };
    const _path = (children ?? fallbackIcon.path);
    return ((0, jsx_runtime_1.jsxs)("svg", { className: classConnect.join(" ").trim(), focusable: focusable, viewBox: viewBox ?? fallbackIcon.viewBox, children: [displayName && (0, jsx_runtime_1.jsx)("title", { children: displayName }), _path] }));
};
exports.default = Icon;
