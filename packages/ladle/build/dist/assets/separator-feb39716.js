import { a as h } from "./index-84d4bf48.js";
const o = ({
  isVertical: t,
  color: a = "accents-3",
  className: m,
  stroke: e = 1,
  heightAspectRation: n = 2,
}) => {
  const s = [m, a];
  return (
    t ? s.push("vfluid ml13 mr13") : s.push("fluid mt13 mb13"),
    h("hr", {
      className: s.join(" "),
      style: t ? { width: e, minHeight: n * 13 } : { height: e },
    })
  );
};
export { o as S };
