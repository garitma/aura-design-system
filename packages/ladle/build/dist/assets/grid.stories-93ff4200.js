import { j as e, a } from "./index-84d4bf48.js";
import { G as s } from "./grid-61ba842e.js";
const c = () =>
    e(s, {
      col: "one",
      children: [
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
      ],
    }),
  i = () =>
    e(s, {
      col: "two",
      children: [
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
      ],
    }),
  m = () =>
    e(s, {
      col: "three",
      children: [
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
      ],
    }),
  p = () =>
    e(s, {
      col: "four",
      children: [
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
      ],
    }),
  u = () =>
    e(s, {
      col: "four",
      isFixed: !0,
      children: [
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
        a("div", { className: "pad blue" }),
      ],
    }),
  n = () =>
    e(s, {
      col: "two",
      className: "reverse",
      children: [
        a("div", { className: "pad green one", children: "1" }),
        a("div", { className: "pad blue two", children: "2" }),
      ],
    }),
  v = () =>
    e(s, {
      col: "twelve",
      children: [
        a("div", { className: "pad green span-6", children: "span-6" }),
        a("div", { className: "pad yellow span-3", children: "span-3" }),
        a("div", { className: "pad orange span-2", children: "span-2" }),
        a("div", { className: "pad blue span-1", children: "span-1" }),
      ],
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export {
  u as withColumnsFixed,
  n as withColumnsReverse,
  p as withFourColumns,
  c as withOneColumns,
  v as withSpan,
  m as withThreeColumns,
  i as withTwoColumns,
};
