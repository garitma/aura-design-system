import { r as m, a as d, j } from "./index-84d4bf48.js";
const b = m.forwardRef(
  (
    {
      isDisabled: t = !1,
      isFluid: r = !1,
      isLoading: s = !1,
      isLoadingText: l = "...",
      mode: e = "fill",
      label: c,
      className: o,
      href: n,
      children: f,
      as: u = n || e === "menu" ? "a" : "button",
      ...i
    },
    p
  ) => {
    const a = [o, `button-${e}`];
    return (
      r && a.push("fluid"),
      (t || s) && a.push("disabled"),
      d(u, {
        className: a.join(" ").trim(),
        disabled: t || s,
        href: n,
        ref: p,
        ...i,
        children: j("span", {
          className: "container",
          children: [s ? l : c, f],
        }),
      })
    );
  }
);
export { b as B };
