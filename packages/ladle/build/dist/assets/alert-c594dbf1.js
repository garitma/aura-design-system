import { j as h, F as u, a as i } from "./index-84d4bf48.js";
const g = ({
  message: o,
  state: n,
  isPushBottom: f,
  isPushTop: a,
  className: e,
}) => {
  var d, l, m, s;
  const c =
      ((d = n == null ? void 0 : n.info) == null ? void 0 : d.message) || o,
    r = [e, "mod", "aura"];
  return (
    (l = n == null ? void 0 : n.info) != null && l.isError
      ? r.push("danger-text danger")
      : r.push("info-text info"),
    h(u, {
      children: [
        a &&
          ((m = n == null ? void 0 : n.info) == null ? void 0 : m.message) &&
          i("div", { className: "aura" }),
        c &&
          i("div", {
            className: "centertxt",
            children: i("div", {
              className: r.join(" ").trim(),
              children: i("span", {
                children:
                  o ||
                  ((s = n == null ? void 0 : n.info) == null
                    ? void 0
                    : s.message),
              }),
            }),
          }),
        f && c && i("div", { className: "aura" }),
      ],
    })
  );
};
export { g as A };
