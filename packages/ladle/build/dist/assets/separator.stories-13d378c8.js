import { a as e, j as i } from "./index-84d4bf48.js";
import { S as t } from "./section-f3002482.js";
import { S as o } from "./separator-feb39716.js";
const l = () => e(t, { children: e(o, {}) }),
  a = () =>
    e(t, {
      container: "smish",
      children: i("ul", {
        className: "nav-list",
        children: [
          e("li", { children: "Blog" }),
          e("li", { children: e(o, { isVertical: !0 }) }),
          e("li", { children: "Docs" }),
        ],
      }),
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { l as Horizontal, a as Vertical };
