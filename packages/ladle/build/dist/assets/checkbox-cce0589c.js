import { r as h, a as s, j as m } from "./index-84d4bf48.js";
import { I as d } from "./input-ffabb90e.js";
const C = ({ label: n, containerClassName: t, id: e, setValue: a, ...o }) => {
  const c = e || h.useId(),
    r = [t],
    i = a ? () => a((l) => !l) : () => {};
  return s("div", {
    className: r.join(),
    children: m("div", {
      className: "inputer nav-list checkbox mt13 lalign",
      children: [
        s(d, {
          className: "default",
          type: "checkbox",
          id: c,
          onChange: i,
          ...o,
        }),
        n && s("label", { className: "inputer", htmlFor: c, children: n }),
      ],
    }),
  });
};
export { C };
