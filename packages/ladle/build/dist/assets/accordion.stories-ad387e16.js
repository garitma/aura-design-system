import { j as a, a as e } from "./index-84d4bf48.js";
import { C as s } from "./MenuIcon-7236a2ad.js";
import "./CloseIcon-013c2dde.js";
const o = ({
    title: r,
    children: d,
    headerSize: i = "h6",
    color: t,
    className: c,
  }) => {
    const n = [c, "aura", "anchor", "lefttxt", "b0", "fluid", "pointer", i];
    return (
      t && n.push(t),
      a("details", {
        children: [
          a("summary", {
            className: n.join(" ").trim(),
            children: [
              r,
              e("div", {
                className: "dropdown disable notevent",
                children: e(s, {
                  className: "icon",
                  role: "presentation",
                  focusable: "false",
                }),
              }),
            ],
          }),
          d,
        ],
      })
    );
  },
  p = () =>
    e(o, {
      title: "Accordion title",
      children: e("p", {
        children:
          "Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.",
      }),
    }),
  u = () =>
    e(o, {
      title: "Accordion title",
      headerSize: "h3",
      children: e("p", {
        children:
          "Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.",
      }),
    }),
  b = () =>
    e(o, {
      title: "Accordion title",
      color: "teal-green",
      children: e("p", {
        children:
          " Cada abrazo de oso contiene: 1 dosis de amor por cada 2 brazos.",
      }),
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { b as WithColor, p as WithContent, u as WithHeaderSize };
