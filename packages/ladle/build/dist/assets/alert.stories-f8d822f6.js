import { a as e } from "./index-84d4bf48.js";
import { A as t } from "./alert-c594dbf1.js";
const s = () =>
    e(t, { state: { info: { message: "This is a info alert", isError: !1 } } }),
  n = () =>
    e(t, {
      state: { info: { message: "This is a danger alert", isError: !0 } },
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { n as dangerAlert, s as infoAlert };
