"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// ForwardRef allows the component to receive a ref from its parent component
// The generic parameters are the component's expected props and ref type
const Button = (0, react_1.forwardRef)(({ isDisabled = false, isFluid = false, isLoading = false, isLoadingText = "...", mode = "fill", label, className, href, children, as: AuraButton = href || mode === "menu" ? `a` : "button", ...props }, ref) => {
    // An array to hold the class names for the button
    const classConnect = [className, `button-${mode}`];
    // Add a "fluid" class to make the button expand to the width of its container
    if (isFluid) {
        classConnect.push("fluid");
    }
    // Add a "disabled" class if the button is disabled or loading
    if (isDisabled || isLoading) {
        classConnect.push("disabled");
    }
    return (
    // Render an anchor tag if there is an href prop, or if the mode is "menu"
    // Otherwise, render a button element
    (0, jsx_runtime_1.jsx)(AuraButton, { className: classConnect.join(" ").trim(), disabled: isDisabled || isLoading, href: href, ref: ref, ...props, children: (0, jsx_runtime_1.jsxs)("span", { className: `aura-container`, children: [isLoading ? isLoadingText : label, children] }) }));
});
exports.default = Button;
