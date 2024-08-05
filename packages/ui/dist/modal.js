"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const button_1 = __importDefault(require("./button"));
const grid_1 = __importDefault(require("./grid"));
const Modal = ({ isVisible, onClose, firstButton, secondButton, title, description, children, classNameDialog, classNameOverley, classNameMod, classNameModDetail, }) => {
    const isTwoButtons = firstButton && secondButton;
    const classNameDialogConnect = [
        classNameDialog,
        "hold",
        "top",
        "left",
        "b0",
        "right",
        "bottom",
        "p0",
        "z10",
    ];
    const classNameOverleyConnect = [
        classNameOverley,
        "overley",
        "black",
        "disabled",
    ];
    const classNameModConnect = [
        classNameMod,
        "valign",
        "smash",
        "mod",
    ];
    const classNameModDetailConnect = [
        classNameModDetail,
        "mod-detail",
    ];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isVisible && ((0, jsx_runtime_1.jsx)("div", { className: classNameOverleyConnect.join(" ").trim(), "data-aria-hidden": "true", "aria-hidden": "true" })), (0, jsx_runtime_1.jsx)("dialog", { className: classNameDialogConnect.join(" ").trim(), open: isVisible, children: (0, jsx_runtime_1.jsx)("div", { className: classNameModConnect.join(" ").trim(), children: (0, jsx_runtime_1.jsxs)("div", { className: "anchor", children: [(0, jsx_runtime_1.jsx)(button_1.default, { className: "pin right top", mode: "link", onClick: onClose, children: (0, jsx_runtime_1.jsx)(react_icons_1.Cross1Icon, {}) }), (0, jsx_runtime_1.jsxs)("div", { className: classNameModDetailConnect.join(" ").trim(), children: [title && (0, jsx_runtime_1.jsx)("h2", { className: "h6 mb13", children: title }), description && (0, jsx_runtime_1.jsx)("p", { children: description }), children, (0, jsx_runtime_1.jsx)("hr", { className: "upan-pad" }), (0, jsx_runtime_1.jsxs)(grid_1.default, { col: isTwoButtons ? "two" : "one", children: [firstButton && ((0, jsx_runtime_1.jsx)(button_1.default, { mode: isTwoButtons ? "pill" : "fill", ...firstButton })), secondButton && (0, jsx_runtime_1.jsx)(button_1.default, { ...secondButton })] })] })] }) }) })] }));
};
exports.default = Modal;
