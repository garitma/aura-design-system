import { a as e, j as o, F as a } from "./index-84d4bf48.js";
import { I as t } from "./input-ffabb90e.js";
const c = () => e(t, { placeholder: "Placeholder" }),
  i = () => e(t, { placeholder: "Placeholder and label", isLabelable: !0 }),
  d = () =>
    e(t, {
      placeholder: "Placeholder",
      isHelping: !0,
      helpText: "⚠️ Oooops, something happened text",
    }),
  s = () =>
    o(a, {
      children: [
        e(t, { type: "date" }),
        e(t, { type: "datetime-local" }),
        e(t, { type: "time" }),
        e(t, { type: "week" }),
        e(t, { type: "month" }),
      ],
    }),
  p = () => e(t, { type: "color", className: "p0", value: "#e8ebfe" }),
  r = () => e(t, { type: "range" }),
  h = () => e(t, { type: "file", className: "pt0" });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export {
  s as WithDate,
  d as WithDialog,
  h as WithFile,
  i as WithLabel,
  p as WithPicker,
  c as WithPlaceholder,
  r as WithRage,
};
