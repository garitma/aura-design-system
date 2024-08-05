"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = __importDefault(require("./button"));
const Tabs = ({ children, data, className, classNameWrapper, classNameNav, classNameContainer, }) => {
    const [activeTab, setActiveTab] = (0, react_1.useState)(0);
    // Ensure children is an array
    const childArray = Array.isArray(children) ? children : [children];
    // Creating an array of CSS classes to be applied to the tabs element container
    const classNameConnect = [className, "nav-list", "start"];
    return ((0, jsx_runtime_1.jsxs)("div", { className: classNameWrapper, children: [(0, jsx_runtime_1.jsx)("nav", { className: classNameNav, children: (0, jsx_runtime_1.jsx)("ul", { className: classNameConnect.join(" ").trim(), children: data.map((item, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(button_1.default, { mode: "link", className: index === activeTab ? "active" : "", onClick: () => setActiveTab(index), ...item }) }, index))) }) }), (0, jsx_runtime_1.jsx)("div", { className: classNameContainer, children: childArray[activeTab] })] }));
};
exports.default = Tabs;
