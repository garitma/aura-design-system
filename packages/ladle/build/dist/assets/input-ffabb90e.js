import { a as n, j as o } from "./index-84d4bf48.js";
const I = ({
  isDisabled: i,
  isHelping: r,
  isLabelable: e,
  helpMode: u = "warning",
  helpText: l,
  placeholder: t,
  className: d,
  classNameContainer: p,
  name: c,
  ...h
}) => {
  const {
      touch: N,
      setTouch: x,
      setValue: g,
      reset: C,
      dialog: b,
      value: m,
      ...f
    } = h,
    s = [d],
    j = [p, "inputer"],
    v = (a) => {
      if (typeof a == "string" || typeof a == "number") return a;
    };
  return (
    i && s.push("disabled"),
    r && (s.push("help"), s.push(u)),
    e || s.push("naked"),
    n("div", {
      className: j.join(" ").trim(),
      children: o("div", {
        className: "inputer-group",
        children: [
          o("div", {
            className: "halo",
            children: [
              n("input", {
                name: c,
                "aria-label": t,
                placeholder: t,
                disabled: i,
                className: s.join(" ").trim(),
                value: v(m),
                ...f,
              }),
              t && e && n("label", { htmlFor: c, children: t }),
            ],
          }),
          r && n("div", { className: `${u}-text aura`, children: l }),
        ],
      }),
    })
  );
};
export { I };
