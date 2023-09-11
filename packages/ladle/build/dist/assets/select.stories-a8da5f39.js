import { j as e, a as o } from "./index-84d4bf48.js";
import { S as t } from "./select-341b64a8.js";
import "./MenuIcon-7236a2ad.js";
import "./CloseIcon-013c2dde.js";
const d = () =>
    e(t, {
      "aria-label": "Naked select",
      children: [
        o("option", { value: "Option 1", children: "Option 1" }),
        o("option", { value: "Option 2", children: "Option 2" }),
        o("option", { value: "Option 3", children: "Option 3" }),
      ],
    }),
  a = () =>
    e(t, {
      placeholder: "Placeholder",
      children: [
        o("option", { value: "Option 1", children: "Option 1" }),
        o("option", { value: "Option 2", children: "Option 2" }),
        o("option", { value: "Option 3", children: "Option 3" }),
      ],
    }),
  r = () =>
    e(t, {
      placeholder: "Placeholder",
      isHelping: !0,
      helpText: "⚠️ Oooops, something happened text",
      children: [
        o("option", { value: "Option 1", children: "Option 1" }),
        o("option", { value: "Option 2", children: "Option 2" }),
        o("option", { value: "Option 3", children: "Option 3" }),
      ],
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { d as Naked, r as WithDialog, a as WithPlaceholder };
