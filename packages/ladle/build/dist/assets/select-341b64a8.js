import { j as n, a as e } from "./index-84d4bf48.js";
import { C as p } from "./MenuIcon-7236a2ad.js";
import "./CloseIcon-013c2dde.js";
const L = ({
  isDisabled: i,
  isHelping: o,
  isLabelable: v,
  helpMode: t = "warning",
  helpText: r,
  placeholder: a,
  className: c,
  classNameContainer: l,
  name: N,
  children: d,
  ...m
}) => {
  const {
      touch: b,
      setTouch: f,
      setValue: j,
      reset: C,
      dialog: x,
      value: w,
      ...u
    } = m,
    s = [c],
    h = [l, "inputer"];
  return (
    i && s.push("disabled"),
    o && (s.push("help"), s.push(t)),
    n("div", {
      className: h.join(" ").trim(),
      children: [
        e("div", {
          className: "inputer-group",
          children: n("div", {
            className: "halo",
            children: [
              n("select", {
                className: s.join(" ").trim(),
                "aria-label": a,
                disabled: i,
                ...u,
                children: [a && e("option", { value: "", children: a }), d],
              }),
              e("div", {
                className: "dropdown disable notevent",
                children: e(p, {
                  className: "icon",
                  role: "presentation",
                  focusable: "false",
                }),
              }),
            ],
          }),
        }),
        o && e("div", { className: `${t}-text aura`, children: r }),
      ],
    })
  );
};
export { L as S };
