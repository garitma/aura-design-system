"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// Defining the Alert component using a function component syntax
const Alert = ({ message, state, isPushBottom, isPushTop, className, }) => {
    // Determining if the alert is active based on the presence of the message in props
    const isActive = state?.info?.message || message;
    // Creating an array of CSS classes to be applied to the alert element
    const classConnect = [className, "mod", "aura"];
    // Adding color classes to classConnect based on the isError flag in state
    if (state?.info?.isError) {
        classConnect.push("danger-text danger");
    }
    else {
        classConnect.push("info-text info");
    }
    // Rendering the Alert component
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isPushTop && state?.info?.message && (0, jsx_runtime_1.jsx)("div", { className: "aura" }), isActive && ((0, jsx_runtime_1.jsx)("div", { className: "centertxt", children: (0, jsx_runtime_1.jsx)("div", { className: classConnect.join(" ").trim(), children: (0, jsx_runtime_1.jsx)("span", { children: message || state?.info?.message }) }) })), isPushBottom && isActive && (0, jsx_runtime_1.jsx)("div", { className: "aura" })] }));
};
// Exporting the Alert component as the default export
exports.default = Alert;
