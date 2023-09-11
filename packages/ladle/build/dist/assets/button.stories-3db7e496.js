import { a as t } from "./index-84d4bf48.js";
import { B as o } from "./button-1ecdeecd.js";
const e = () => t(o, { label: "Button fill" }),
  i = () => t(o, { mode: "pill", label: "Button Pill" }),
  u = () => t(o, { mode: "link", label: "Button Pill" }),
  d = () => t(o, { isFluid: !0, label: "Button Fluid" }),
  a = () => t(o, { label: "Disabled", isDisabled: !0 }),
  s = () =>
    t(o, { isLoading: !0, isLoadingText: "Loading...", label: "Button Fluid" });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export {
  a as ButtonDisabled,
  e as ButtonFill,
  d as ButtonFluid,
  u as ButtonLink,
  i as ButtonPill,
  s as ButtonWaiting,
};
