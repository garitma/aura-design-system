import { a as t } from "./index-84d4bf48.js";
const c = ({ children: r, className: a, col: i, isFixed: e, ...o }) => {
  const s = ["aureole", a];
  return (
    i && s.push(i),
    e && s.push("fixed"),
    t("div", { className: s.join(" ").trim(), ...o, children: r })
  );
};
export { c as G };
