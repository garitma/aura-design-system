import { j as a, a as e } from "./index-84d4bf48.js";
const n = () =>
    a("body", {
      className: "page-pancake",
      children: [
        e("header", {
          className: "pad blue",
          children: e("span", { children: "header" }),
        }),
        e("main", {
          className: "pad teal-green",
          children: e("span", { children: "main" }),
        }),
        e("footer", {
          className: "pad orange",
          children: e("span", { children: "footer" }),
        }),
      ],
    }),
  r = () =>
    a("body", {
      className: "page-dashboard",
      children: [
        e("div", {
          className: "pad blue",
          children: e("span", { children: "logo" }),
        }),
        e("header", { className: "pad yellow", children: "header" }),
        e("aside", {
          className: "pad teal-green",
          children: e("span", { children: "aside" }),
        }),
        e("main", {
          className: "pad orange",
          children: e("span", { children: "main" }),
        }),
      ],
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { r as Dashboard, n as Pancake };
