import { j as a, F as d, a as e, r as w } from "./index-84d4bf48.js";
import { B as l } from "./button-1ecdeecd.js";
import { G as y } from "./grid-61ba842e.js";
import { C as g } from "./CloseIcon-013c2dde.js";
const j = ({
    isVisible: n,
    onClose: o,
    firstButton: t,
    secondButton: s,
    title: i,
    description: c,
    children: m,
    classNameDialog: u,
    classNameOverley: h,
    classNameMod: p,
    classNameModDetail: f,
  }) => {
    const r = t && s,
      C = [u, "hold", "top", "left", "b0", "right", "bottom", "p0", "z10"],
      N = [h, "overley", "black", "disabled"],
      b = [p, "valign", "smash", "mod"],
      v = [f, "mod-detail"];
    return a(d, {
      children: [
        n &&
          e("div", {
            className: N.join(" ").trim(),
            "data-aria-hidden": "true",
            "aria-hidden": "true",
          }),
        e("dialog", {
          className: C.join(" ").trim(),
          open: n,
          children: e("div", {
            className: b.join(" ").trim(),
            children: a("div", {
              className: "anchor",
              children: [
                e(l, {
                  className: "pin right top",
                  mode: "link",
                  onClick: o,
                  children: e(g, {}),
                }),
                a("div", {
                  className: v.join(" ").trim(),
                  children: [
                    i && e("h2", { className: "h6 mb13", children: i }),
                    c && e("p", { children: c }),
                    m,
                    e("hr", { className: "upan-pad" }),
                    a(y, {
                      col: r ? "two" : "one",
                      children: [
                        t && e(l, { mode: r ? "pill" : "fill", ...t }),
                        s && e(l, { ...s }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  },
  E = () => {
    const [n, o] = w.useState(!1);
    return a(d, {
      children: [
        e(l, { onClick: () => o(!0), label: "Delete Account" }),
        e(j, {
          isVisible: n,
          title: "Are you absolutely sure?",
          firstButton: { label: "Cancel", onClick: () => o(!1) },
          secondButton: { label: "Yes, delete account", onClick: () => o(!1) },
          onClose: () => o(!1),
          children:
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
        }),
      ],
    });
  };
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { E as DefaultConfig };
