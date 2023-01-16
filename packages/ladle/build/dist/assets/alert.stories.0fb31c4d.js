import { j as g, F as h, a as r } from "./index.c4aa511a.js";
const l = ({
    message: i,
    state: n,
    isPushBottom: m,
    isPushTop: f,
    className: u,
  }) => {
    var s, d, c, a;
    const o =
        ((s = n == null ? void 0 : n.info) == null ? void 0 : s.message) || i,
      e = [u, "mod", "aura"];
    return (
      console.log(n),
      (d = n == null ? void 0 : n.info) != null && d.isError
        ? e.push("danger-text danger")
        : e.push("info-text info"),
      g(h, {
        children: [
          f &&
            ((c = n == null ? void 0 : n.info) == null ? void 0 : c.message) &&
            r("div", { className: "aura" }),
          o &&
            r("div", {
              className: "centertxt",
              children: r("div", {
                className: e.join(" ").trim(),
                children: r("span", {
                  children:
                    i ||
                    ((a = n == null ? void 0 : n.info) == null
                      ? void 0
                      : a.message),
                }),
              }),
            }),
          m && o && r("div", { className: "aura" }),
        ],
      })
    );
  },
  p = () =>
    r(l, {
      state: { info: { message: "This is a warning alert", isError: !1 } },
    }),
  x = () =>
    r(l, {
      state: { info: { message: "This is a danger alert", isError: !0 } },
    });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { x as dangerAlert, p as warningAlert };
