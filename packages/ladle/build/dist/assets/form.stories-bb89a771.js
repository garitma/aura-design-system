import { r as g, a as s, j as f } from "./index-84d4bf48.js";
import { I as l } from "./input-ffabb90e.js";
import { S as E } from "./select-341b64a8.js";
import { B as L } from "./button-1ecdeecd.js";
import { A as I } from "./alert-c594dbf1.js";
import { G as k } from "./grid-61ba842e.js";
import { C as x } from "./checkbox-cce0589c.js";
import "./MenuIcon-7236a2ad.js";
import "./CloseIcon-013c2dde.js";
const A = (e) => {
    const [t, a] = g.useState(e),
      [o, r] = g.useState(null),
      [c, m] = g.useState(!1);
    return {
      value: t,
      onChange: (N) => {
        a(N.target.value), !c && m(!0);
      },
      error: o,
      touch: c,
      reset: () => a(e),
      dialog: r,
      setTouch: m,
      setValue: a,
      helpText: o,
      isHelping: !!(o && c),
    };
  },
  v = (e) => {
    const t = {};
    for (const r in e) t[r] = A(e[r]);
    return {
      ...t,
      resetForm: () => {
        for (const r in t) t[r].reset();
      },
      touched: () => {
        for (const r in t) t[r].setTouch(!0);
      },
    };
  },
  T = (e, t) => {
    const [a, o] = g.useState(!1);
    return (
      g.useEffect(() => {
        o(t(e));
      }, [e, t]),
      a
    );
  },
  w = () => {
    const [e, t] = g.useState({
        isLoading: !1,
        isSubmited: !1,
        info: { isError: !1, message: null },
      }),
      a = (n) => t((i) => ({ ...i, isLoading: n })),
      o = (n) => t((i) => ({ ...i, isSubmited: n })),
      r = (n) => t((i) => ({ ...i, info: { ...i.info, isError: n } })),
      c = (n) => t((i) => ({ ...i, info: { ...i.info, message: n } })),
      m = () => {
        t({
          isLoading: !1,
          isSubmited: !1,
          info: { isError: !1, message: null },
        });
      };
    return {
      state: e,
      message: e.info.message,
      setStatus: t,
      setMessage: c,
      setIsLoading: a,
      setSubmited: o,
      setIsError: r,
      resetStatus: m,
    };
  },
  D = (e) => Object.values(e).some((t) => t === !1),
  z = () => {
    const e = v({
        firstName: "",
        lastName: "",
        email: "",
        options: "",
        accept: !1,
      }),
      { firstName: t, lastName: a, email: o, options: r, accept: c } = e;
    return s("div", {
      children: f("form", {
        children: [
          s(l, { placeholder: "Name", ...t }),
          s(l, { placeholder: "Last name", ...a }),
          s(l, { placeholder: "Email", ...o }),
          f(E, {
            ...r,
            children: [
              s("option", { children: "Foo" }),
              s("option", { children: "Foo2" }),
            ],
          }),
          s(x, { label: "Accept terms and conditions.", ...c }),
        ],
      }),
    });
  },
  B = () => {
    const e = v({ firstName: "", lastName: "", email: "" }),
      { firstName: t, lastName: a, email: o } = e;
    return s("div", {
      children: s("form", {
        children: f(k, {
          col: "two",
          children: [
            s(l, { placeholder: "Name", ...t }),
            s(l, { placeholder: "Last name", ...a }),
            s(l, { placeholder: "Email", ...o, classNameContainer: "span-2" }),
          ],
        }),
      }),
    });
  },
  G = () => {
    const e = w(),
      t = v({ firstName: "", lastName: "", email: "" }),
      { firstName: a, lastName: o, email: r } = t,
      c = async (n) => {
        n.preventDefault(), e.resetStatus(), e.setIsLoading(!0);
        const b = await new Promise((N, u) => {
          setTimeout(() => {
            const p = Math.random() < 0.5;
            N({ ok: p });
          }, 600);
        });
        m(b);
      },
      m = (n) => {
        if ((e.setIsLoading(!1), e.setSubmited(!0), !n.ok)) {
          e.setIsError(!0), e.setMessage("An unexpected error has occurred.");
          return;
        }
        e.setMessage("Everything has gone well.");
      };
    return f("div", {
      children: [
        f("form", {
          onSubmit: c,
          children: [
            s(l, { placeholder: "Name", ...a }),
            s(l, { placeholder: "Last name", ...o }),
            s(l, { placeholder: "Email", ...r }),
            s("div", {
              className: "inputer",
              children: s(L, {
                label: "Submit",
                isLoadingText: "Loading...",
                isLoading: e.state.isLoading,
              }),
            }),
          ],
        }),
        s(I, { state: e.state, isPushTop: !0 }),
      ],
    });
  },
  Z = () => {
    const e = w(),
      t = v({ firstName: "", lastName: "", email: "", options: "" }),
      { firstName: a, lastName: o, email: r, options: c } = t,
      m = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      i = T(t, ({ firstName: u, lastName: p, email: h, options: S }) => {
        let d = {};
        return (
          u.value
            ? ((d.firstName = !0), u.dialog(null))
            : (u.dialog("Name is required."), (d.firstName = !1)),
          p.value
            ? ((d.lastName = !0), p.dialog(null))
            : (p.dialog("Name is required."), (d.lastName = !1)),
          S.value
            ? ((d.options = !0), S.dialog(null))
            : (S.dialog("Options is required."), (d.options = !1)),
          h.value
            ? m.test(h.value)
              ? ((d.email = !0), h.dialog(null))
              : (h.dialog("Email is not valid."), (d.email = !1))
            : (h.dialog("Email is required."), (d.email = !1)),
          !D(d)
        );
      }),
      b = async (u) => {
        u.preventDefault(), e.resetStatus(), e.setIsLoading(!0);
        const h = await new Promise((S, d) => {
          setTimeout(() => {
            const F = Math.random() < 0.5;
            S({ ok: F });
          }, 600);
        });
        N(h);
      },
      N = (u) => {
        if ((e.setIsLoading(!1), e.setSubmited(!0), !u.ok)) {
          e.setIsError(!0), e.setMessage("An unexpected error has occurred.");
          return;
        }
        e.setMessage("Everything has gone well.");
      };
    return f("div", {
      children: [
        f("form", {
          onSubmit: b,
          children: [
            s(l, { placeholder: "Name", ...a }),
            s(l, { placeholder: "Last name", ...o }),
            s(l, { placeholder: "Email", ...r }),
            f(E, {
              placeholder: "Select an option",
              ...c,
              children: [
                s("option", { children: "Foo" }),
                s("option", { children: "Foo2" }),
              ],
            }),
            s("div", {
              className: "inputer",
              children: s(L, {
                label: "Submit",
                isLoadingText: "Loading...",
                isLoading: e.state.isLoading,
                isDisabled: !i,
              }),
            }),
          ],
        }),
        s(I, { state: e.state, isPushTop: !0 }),
      ],
    });
  };
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { B as WithGrid, z as WithHook, G as WithStatus, Z as WithValidator };
