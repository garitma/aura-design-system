import { a as e, j as t, F as o } from "./index-84d4bf48.js";
const i = ({
    heightAspectRation: c = 1,
    widthAspectRation: s = 1,
    className: n,
    isCircle: d,
    isFluid: l,
    ...h
  }) => {
    const a = [n, "skeleton"];
    return (
      d && a.push("circle"),
      l && a.push("fluid"),
      e("div", {
        className: a.join(" "),
        style: { height: c * 13, width: s * 13 },
        ...h,
      })
    );
  },
  m = () => e(i, { widthAspectRation: 5, heightAspectRation: 5 }),
  u = () => e(i, { widthAspectRation: 5, heightAspectRation: 5, isCircle: !0 }),
  p = () => e(i, { widthAspectRation: 5, heightAspectRation: 5, isFluid: !0 }),
  A = () =>
    t(o, {
      children: [
        e("header", {
          className: "aura",
          children: e("nav", {
            children: t("ul", {
              className: "nav-list",
              children: [
                e("li", {
                  children: e(i, {
                    heightAspectRation: 4.5,
                    widthAspectRation: 4.5,
                    isCircle: !0,
                  }),
                }),
                e("li", {}),
                e("li", {
                  children: e(i, {
                    heightAspectRation: 3,
                    widthAspectRation: 10,
                  }),
                }),
              ],
            }),
          }),
        }),
        e("aside", {
          className: "white",
          children: e("div", {
            className: "mt13",
            children: [0, 1, 2].map((c, s) =>
              e(
                "div",
                {
                  className: "mb13",
                  children: e(i, {
                    heightAspectRation: 5,
                    widthAspectRation: 5,
                    isFluid: !0,
                  }),
                },
                s
              )
            ),
          }),
        }),
        e("div", {
          className: "pad snow",
          children: t("div", {
            children: [
              e("div", {
                className: "smush",
                children: t("div", {
                  className: "aureole one",
                  children: [
                    e(i, { heightAspectRation: 3, className: "fluid" }),
                    e(i, { heightAspectRation: 1, className: "fluid" }),
                    e(i, { heightAspectRation: 40, className: "fluid" }),
                  ],
                }),
              }),
              e("div", {}),
            ],
          }),
        }),
      ],
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { m as Basic, u as Circle, A as Example, p as Fluid };
