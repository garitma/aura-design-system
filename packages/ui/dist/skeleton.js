"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Skeleton = ({ heightAspectRation = 1, widthAspectRation = 1, className, isCircle, isFluid, ...props }) => {
    const classConnect = [className, "skeleton"];
    if (isCircle) {
        classConnect.push("circle");
    }
    if (isFluid) {
        classConnect.push("fluid");
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: classConnect.join(" "), style: { height: heightAspectRation * 13, width: widthAspectRation * 13 }, ...props }));
};
exports.default = Skeleton;
