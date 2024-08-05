"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Separator = ({ isVertical, color = "accents-3", className, stroke = 1, heightAspectRation = 2, }) => {
    const classConnect = [className, color];
    if (isVertical) {
        classConnect.push("vfluid ml13 mr13");
    }
    else {
        classConnect.push("fluid mt13 mb13");
    }
    return ((0, jsx_runtime_1.jsx)("hr", { className: classConnect.join(" "), style: isVertical
            ? { width: stroke, minHeight: heightAspectRation * 13 }
            : { height: stroke } }));
};
exports.default = Separator;
