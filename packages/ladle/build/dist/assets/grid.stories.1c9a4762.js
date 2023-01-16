import { a, j as e } from "./index.c4aa511a.js";
const s = ({ children: c, className: i, col: l, isFixed: u, ...m }) => {
    const d = ["aureole", i];
    return (
      l && d.push(l),
      u && d.push("fixed"),
      a("div", { className: d.join(" "), ...m, children: c })
    );
  },
  v = () =>
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
  o = () =>
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
  N = () =>
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
  b = () =>
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
  n = () =>
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
  t = () =>
    e(s, {
      col: "two",
      className: "reverse",
      children: [
        a("div", { className: "pad green one", children: "1" }),
        a("div", { className: "pad blue two", children: "2" }),
      ],
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export {
  n as withColumnsFixed,
  t as withColumnsReverse,
  b as withFourColumns,
  v as withOneColumns,
  N as withThreeColumns,
  o as withTwoColumns,
};
