import { j as a, a as o, r as h } from "./index-84d4bf48.js";
const p = ({
  displayName: t = "Icon",
  viewBox: n,
  children: l,
  focusable: r = !1,
  className: c,
}) => {
  const e = [c, "icon"],
    s = {
      path: a("g", {
        stroke: "currentColor",
        children: [
          o("path", {
            fill: "currentColor",
            d: "m12.32,24.34L0,19.95V4.64L12.32,0l11.87,4.65v15.3l-11.87,4.4ZM.88,19.32l11.43,4.08,11-4.08V5.25L12.32.95.88,5.25v14.07Z",
          }),
          o("polygon", {
            fill: "currentColor",
            points:
              "12.54 24.2 11.66 24.19 11.77 10.17 .28 5.68 .6 4.86 12.66 9.57 12.54 24.2",
          }),
          o("rect", {
            fill: "currentColor",
            x: "11.77",
            y: "7.02",
            width: "12.43",
            height: ".88",
            transform: "translate(-1.49 7.21) rotate(-21.79)",
          }),
        ],
      }),
      viewBox: "0 0 24 24",
    },
    i = l ?? s.path;
  return a("svg", {
    className: e.join(" ").trim(),
    focusable: r,
    viewBox: n ?? s.viewBox,
    children: [t && o("title", { children: t }), i],
  });
};
function C(t) {
  const { viewBox: n = "0 0 24 24", displayName: l } = t,
    r = h.Children.toArray(t.path);
  return ({ ...e }) =>
    o(p, {
      viewBox: n,
      ...e,
      displayName: l,
      children: r.length ? r : o("path", { fill: "currentColor" }),
    });
}
const m = C({
  displayName: "Close",
  path: o("polygon", {
    fill: "currentColor",
    points:
      "12.16 11.46 22.92 22.22 22.22 22.92 11.46 12.16 .7 22.92 0 22.22 10.76 11.46 0 .7 .7 0 11.46 10.76 22.22 0 22.92 .7 12.16 11.46",
  }),
});
export { m as C, C as c };
