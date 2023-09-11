import { e, y as lt, j as Q, a as A } from "./index-84d4bf48.js";
import { B as dt } from "./button-1ecdeecd.js";
function ct(a, { insertAt: r } = {}) {
  if (!a || typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0],
    l = document.createElement("style");
  (l.type = "text/css"),
    r === "top" && t.firstChild
      ? t.insertBefore(l, t.firstChild)
      : t.appendChild(l),
    l.styleSheet
      ? (l.styleSheet.cssText = a)
      : l.appendChild(document.createTextNode(a));
}
ct(`html[dir=ltr],[data-sonner-toaster][dir=ltr]{--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}html[dir=rtl],[data-sonner-toaster][dir=rtl]{--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}[data-sonner-toaster][data-x-position=right]{right:max(var(--offset),env(safe-area-inset-right))}[data-sonner-toaster][data-x-position=left]{left:max(var(--offset),env(safe-area-inset-left))}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translate(-50%)}[data-sonner-toaster][data-y-position=top]{top:max(var(--offset),env(safe-area-inset-top))}[data-sonner-toaster][data-y-position=bottom]{bottom:max(var(--offset),env(safe-area-inset-bottom))}[data-sonner-toast]{--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;will-change:transform,opacity,height;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast][data-y-position=top]{top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}[data-sonner-toast] [data-description]{font-weight:400;line-height:1.4;color:inherit}[data-sonner-toast] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast] [data-icon]>*{flex-shrink:0}[data-sonner-toast] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;transition:opacity .4s,box-shadow .2s}[data-sonner-toast] [data-button]:focus-visible{box-shadow:0 0 0 2px #0006}[data-sonner-toast] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast] [data-cancel]{color:var(--color);background:var(--border-color)}[data-sonner-toast] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;opacity:0;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast]:hover [data-close-button]{opacity:1}[data-sonner-toast]:focus [data-close-button]{opacity:1}[data-sonner-toast]:focus-within [data-close-button]{opacity:1}[data-sonner-toast]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]:before{content:"";position:absolute;left:0;right:0;height:100%}[data-sonner-toast][data-y-position=top][data-swiping=true]:before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]:before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]:before{content:"";position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast]:after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y: translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y: translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]:before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - 32px)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true] [data-sonner-toast][data-type=success],[data-rich-colors=true] [data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true] [data-sonner-toast][data-type=error],[data-rich-colors=true] [data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}
`);
var ut = (a) => {
    switch (a) {
      case "success":
        return ft;
      case "error":
        return ht;
      default:
        return null;
    }
  },
  mt = Array(12).fill(0),
  pt = ({ visible: a }) =>
    e.createElement(
      "div",
      { className: "sonner-loading-wrapper", "data-visible": a },
      e.createElement(
        "div",
        { className: "sonner-spinner" },
        mt.map((r, t) =>
          e.createElement("div", {
            className: "sonner-loading-bar",
            key: `spinner-bar-${t}`,
          })
        )
      )
    ),
  ft = e.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    e.createElement("path", {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
      clipRule: "evenodd",
    })
  ),
  ht = e.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      height: "20",
      width: "20",
    },
    e.createElement("path", {
      fillRule: "evenodd",
      d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
      clipRule: "evenodd",
    })
  ),
  Z = 0,
  gt = class {
    constructor() {
      (this.subscribe = (a) => (
        this.subscribers.push(a),
        () => {
          let r = this.subscribers.indexOf(a);
          this.subscribers.splice(r, 1);
        }
      )),
        (this.publish = (a) => {
          this.subscribers.forEach((r) => r(a));
        }),
        (this.addToast = (a) => {
          this.publish(a), (this.toasts = [...this.toasts, a]);
        }),
        (this.create = (a) => {
          var r;
          let { message: t, ...l } = a,
            s =
              typeof (a == null ? void 0 : a.id) == "number" ||
              ((r = a.id) == null ? void 0 : r.length) > 0
                ? a.id
                : Z++;
          return (
            this.toasts.find((p) => p.id === s)
              ? (this.toasts = this.toasts.map((p) =>
                  p.id === s
                    ? (this.publish({ ...p, ...a, id: s, title: t }),
                      { ...p, ...a, id: s, title: t })
                    : p
                ))
              : this.addToast({ title: t, ...l, id: s }),
            s
          );
        }),
        (this.dismiss = (a) => (
          a ||
            this.toasts.forEach((r) => {
              this.subscribers.forEach((t) => t({ id: r.id, dismiss: !0 }));
            }),
          this.subscribers.forEach((r) => r({ id: a, dismiss: !0 })),
          a
        )),
        (this.message = (a, r) => this.create({ ...r, message: a })),
        (this.error = (a, r) =>
          this.create({ ...r, message: a, type: "error" })),
        (this.success = (a, r) =>
          this.create({ ...r, type: "success", message: a })),
        (this.loading = (a, r) =>
          this.create({ ...r, type: "loading", message: a })),
        (this.promise = (a, r) => {
          let t = this.create({
            ...r,
            promise: a,
            type: "loading",
            message: r.loading,
          });
          return (
            (a instanceof Promise ? a : a())
              .then((l) => {
                let s =
                  typeof r.success == "function" ? r.success(l) : r.success;
                this.create({ id: t, type: "success", message: s });
              })
              .catch((l) => {
                let s = typeof r.error == "function" ? r.error(l) : r.error;
                this.create({ id: t, type: "error", message: s });
              })
              .finally(r.finally),
            t
          );
        }),
        (this.custom = (a, r) => {
          let t = (r == null ? void 0 : r.id) || Z++;
          this.publish({ jsx: a(t), id: t, ...r });
        }),
        (this.subscribers = []),
        (this.toasts = []);
    }
  },
  b = new gt(),
  bt = (a, r) => {
    let t = (r == null ? void 0 : r.id) || Z++;
    return b.addToast({ title: a, ...r, id: t }), t;
  },
  vt = bt,
  yt = Object.assign(vt, {
    success: b.success,
    error: b.error,
    custom: b.custom,
    message: b.message,
    promise: b.promise,
    dismiss: b.dismiss,
    loading: b.loading,
  }),
  xt = 3,
  wt = "32px",
  Et = 4e3,
  kt = 356,
  nt = 14,
  Ct = 20,
  Nt = 200,
  Tt = (a) => {
    let {
        invert: r,
        toast: t,
        interacting: l,
        setHeights: s,
        visibleToasts: p,
        heights: z,
        index: v,
        toasts: R,
        expanded: f,
        removeToast: D,
        closeButton: F,
        style: H,
        className: V = "",
        descriptionClassName: y = "",
        duration: j,
        position: k,
        expandByDefault: C,
      } = a,
      [N, X] = e.useState(!1),
      [$, x] = e.useState(!1),
      [L, B] = e.useState(!1),
      [U, K] = e.useState(!1),
      [_, I] = e.useState(0),
      [w, O] = e.useState(0),
      m = e.useRef(null),
      T = v === 0,
      W = v + 1 <= p,
      n = t.type,
      d = t.className || "",
      c = t.descriptionClassName || "",
      h = e.useMemo(
        () => z.findIndex((o) => o.toastId === t.id) || 0,
        [z, t.id]
      ),
      P = e.useMemo(() => t.duration || j || Et, [t.duration, j]),
      G = e.useRef(0),
      M = e.useRef(0),
      J = e.useRef(P),
      tt = e.useRef(0),
      Y = e.useRef(null),
      [et, st] = k.split("-"),
      at = e.useMemo(
        () => z.reduce((o, i, u) => (u >= h ? o : o + i.height), 0),
        [z, h]
      ),
      it = t.invert || r,
      q = n === "loading";
    (M.current = e.useMemo(() => h * nt + at, [h, at])),
      e.useEffect(() => {
        X(!0);
      }, []),
      e.useLayoutEffect(() => {
        if (!N) return;
        let o = m.current,
          i = o.style.height;
        o.style.height = "auto";
        let u = o.getBoundingClientRect().height;
        (o.style.height = i),
          O(u),
          s((g) =>
            g.find((S) => S.toastId === t.id)
              ? g.map((S) => (S.toastId === t.id ? { ...S, height: u } : S))
              : [{ toastId: t.id, height: u }, ...g]
          );
      }, [N, t.title, t.description, s, t.id]);
    let E = e.useCallback(() => {
      x(!0),
        I(M.current),
        s((o) => o.filter((i) => i.toastId !== t.id)),
        setTimeout(() => {
          D(t);
        }, Nt);
    }, [t, D, s, M]);
    return (
      e.useEffect(() => {
        if ((t.promise && n === "loading") || t.duration === 1 / 0) return;
        let o;
        return (
          f || l
            ? (() => {
                if (tt.current < G.current) {
                  let i = new Date().getTime() - G.current;
                  J.current = J.current - i;
                }
                tt.current = new Date().getTime();
              })()
            : ((G.current = new Date().getTime()),
              (o = setTimeout(() => {
                var i;
                (i = t.onAutoClose) == null || i.call(t, t), E();
              }, J.current))),
          () => clearTimeout(o)
        );
      }, [f, l, C, t, P, E, t.promise, n]),
      e.useEffect(() => {
        let o = m.current;
        if (o) {
          let i = o.getBoundingClientRect().height;
          return (
            O(i),
            s((u) => [{ toastId: t.id, height: i }, ...u]),
            () => s((u) => u.filter((g) => g.toastId !== t.id))
          );
        }
      }, [s, t.id]),
      e.useEffect(() => {
        t.delete && E();
      }, [E, t.delete]),
      e.createElement(
        "li",
        {
          "aria-live": t.important ? "assertive" : "polite",
          "aria-atomic": "true",
          role: "status",
          tabIndex: 0,
          ref: m,
          className: V + " " + d,
          "data-sonner-toast": "",
          "data-styled": !t.jsx,
          "data-mounted": N,
          "data-promise": !!t.promise,
          "data-removed": $,
          "data-visible": W,
          "data-y-position": et,
          "data-x-position": st,
          "data-index": v,
          "data-front": T,
          "data-swiping": L,
          "data-type": n,
          "data-invert": it,
          "data-swipe-out": U,
          "data-expanded": !!(f || (C && N)),
          style: {
            "--index": v,
            "--toasts-before": v,
            "--z-index": R.length - v,
            "--offset": `${$ ? _ : M.current}px`,
            "--initial-height": C ? "auto" : `${w}px`,
            ...H,
            ...t.style,
          },
          onPointerDown: (o) => {
            q ||
              (I(M.current),
              o.target.setPointerCapture(o.pointerId),
              o.target.tagName !== "BUTTON" &&
                (B(!0), (Y.current = { x: o.clientX, y: o.clientY })));
          },
          onPointerUp: () => {
            var o, i, u;
            if (U) return;
            Y.current = null;
            let g = Number(
              ((o = m.current) == null
                ? void 0
                : o.style
                    .getPropertyValue("--swipe-amount")
                    .replace("px", "")) || 0
            );
            if (Math.abs(g) >= Ct) {
              I(M.current),
                (i = t.onDismiss) == null || i.call(t, t),
                E(),
                K(!0);
              return;
            }
            (u = m.current) == null ||
              u.style.setProperty("--swipe-amount", "0px"),
              B(!1);
          },
          onPointerMove: (o) => {
            var i;
            if (!Y.current) return;
            let u = o.clientY - Y.current.y,
              g = o.clientX - Y.current.x,
              S = (et === "top" ? Math.min : Math.max)(0, u),
              rt = o.pointerType === "touch" ? 10 : 2;
            Math.abs(S) > rt
              ? (i = m.current) == null ||
                i.style.setProperty("--swipe-amount", `${u}px`)
              : Math.abs(g) > rt && (Y.current = null);
          },
        },
        F && !t.jsx
          ? e.createElement(
              "button",
              {
                "aria-label": "Close toast",
                "data-disabled": q,
                "data-close-button": !0,
                onClick: q
                  ? void 0
                  : () => {
                      var o;
                      E(), (o = t.onDismiss) == null || o.call(t, t);
                    },
              },
              e.createElement(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "12",
                  height: "12",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
                e.createElement("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18",
                }),
                e.createElement("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18",
                })
              )
            )
          : null,
        t.jsx || e.isValidElement(t.title)
          ? t.jsx || t.title
          : e.createElement(
              e.Fragment,
              null,
              n || t.icon || t.promise
                ? e.createElement(
                    "div",
                    { "data-icon": "" },
                    t.promise || t.type === "loading"
                      ? e.createElement(pt, { visible: n === "loading" })
                      : null,
                    t.icon || ut(n)
                  )
                : null,
              e.createElement(
                "div",
                { "data-content": "" },
                e.createElement("div", { "data-title": "" }, t.title),
                t.description
                  ? e.createElement(
                      "div",
                      { "data-description": "", className: y + c },
                      t.description
                    )
                  : null
              ),
              t.cancel
                ? e.createElement(
                    "button",
                    {
                      "data-button": !0,
                      "data-cancel": !0,
                      onClick: () => {
                        var o;
                        E(),
                          (o = t.cancel) != null &&
                            o.onClick &&
                            t.cancel.onClick();
                      },
                    },
                    t.cancel.label
                  )
                : null,
              t.action
                ? e.createElement(
                    "button",
                    {
                      "data-button": "",
                      onClick: (o) => {
                        var i;
                        (i = t.action) == null || i.onClick(o),
                          !o.defaultPrevented && E();
                      },
                    },
                    t.action.label
                  )
                : null
            )
      )
    );
  };
function ot() {
  if (typeof window > "u") return "ltr";
  let a = document.documentElement.getAttribute("dir");
  return a === "auto" || !a
    ? window.getComputedStyle(document.documentElement).direction
    : a;
}
var St = (a) => {
  var r;
  let {
      invert: t,
      position: l = "bottom-right",
      hotkey: s = ["altKey", "KeyT"],
      expand: p,
      closeButton: z,
      className: v,
      offset: R,
      theme: f = "light",
      richColors: D,
      duration: F,
      style: H,
      visibleToasts: V = xt,
      toastOptions: y,
      dir: j = ot(),
    } = a,
    [k, C] = e.useState([]),
    [N, X] = e.useState([]),
    [$, x] = e.useState(!1),
    [L, B] = e.useState(!1),
    [U, K] = e.useState(
      f !== "system"
        ? f
        : typeof window < "u" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    ),
    [_, I] = l.split("-"),
    w = e.useRef(null),
    O = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
    m = e.useRef(null),
    T = e.useRef(!1),
    W = e.useCallback((n) => C((d) => d.filter(({ id: c }) => c !== n.id)), []);
  return (
    e.useEffect(
      () =>
        b.subscribe((n) => {
          if (n.dismiss) {
            C((d) => d.map((c) => (c.id === n.id ? { ...c, delete: !0 } : c)));
            return;
          }
          setTimeout(() => {
            lt.flushSync(() => {
              C((d) => {
                let c = d.findIndex((h) => h.id === n.id);
                return c !== -1
                  ? [...d.slice(0, c), { ...d[c], ...n }, ...d.slice(c + 1)]
                  : [n, ...d];
              });
            });
          });
        }),
      []
    ),
    e.useEffect(() => {
      if (f !== "system") {
        K(f);
        return;
      }
      typeof window < "u" &&
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", ({ matches: n }) => {
            K(n ? "dark" : "light");
          });
    }, [f]),
    e.useEffect(() => {
      k.length <= 1 && x(!1);
    }, [k]),
    e.useEffect(() => {
      let n = (d) => {
        var c, h;
        s.every((P) => d[P] || d.code === P) &&
          (x(!0), (c = w.current) == null || c.focus()),
          d.code === "Escape" &&
            (document.activeElement === w.current ||
              ((h = w.current) != null &&
                h.contains(document.activeElement))) &&
            x(!1);
      };
      return (
        document.addEventListener("keydown", n),
        () => document.removeEventListener("keydown", n)
      );
    }, [s]),
    e.useEffect(() => {
      if (w.current)
        return () => {
          m.current &&
            (m.current.focus({ preventScroll: !0 }),
            (m.current = null),
            (T.current = !1));
        };
    }, [w.current]),
    k.length
      ? e.createElement(
          "section",
          { "aria-label": `Notifications ${O}`, tabIndex: -1 },
          e.createElement(
            "ol",
            {
              dir: j === "auto" ? ot() : j,
              tabIndex: -1,
              ref: w,
              className: v,
              "data-sonner-toaster": !0,
              "data-theme": U,
              "data-rich-colors": D,
              "data-y-position": _,
              "data-x-position": I,
              style: {
                "--front-toast-height": `${
                  (r = N[0]) == null ? void 0 : r.height
                }px`,
                "--offset": typeof R == "number" ? `${R}px` : R || wt,
                "--width": `${kt}px`,
                "--gap": `${nt}px`,
                ...H,
              },
              onBlur: (n) => {
                T.current &&
                  !n.currentTarget.contains(n.relatedTarget) &&
                  ((T.current = !1),
                  m.current &&
                    (m.current.focus({ preventScroll: !0 }),
                    (m.current = null)));
              },
              onFocus: (n) => {
                T.current || ((T.current = !0), (m.current = n.relatedTarget));
              },
              onMouseEnter: () => x(!0),
              onMouseMove: () => x(!0),
              onMouseLeave: () => {
                L || x(!1);
              },
              onPointerDown: () => {
                B(!0);
              },
              onPointerUp: () => B(!1),
            },
            k.map((n, d) =>
              e.createElement(Tt, {
                key: n.id,
                index: d,
                toast: n,
                duration: F,
                className: y == null ? void 0 : y.className,
                descriptionClassName:
                  y == null ? void 0 : y.descriptionClassName,
                invert: t,
                visibleToasts: V,
                closeButton: z,
                interacting: L,
                position: l,
                style: y == null ? void 0 : y.style,
                removeToast: W,
                toasts: k,
                heights: N,
                setHeights: X,
                expandByDefault: p,
                expanded: $,
              })
            )
          )
        )
      : null
  );
};
const Yt = () =>
  Q("div", {
    children: [
      Q("p", {
        children: [
          Q("span", {
            className: "info info-text wall-pad",
            children: [
              "External library ",
              A("span", {
                className: "font-bold",
                children: "$ pnpm i sonner",
              }),
            ],
          }),
          " An opinionated toast component for React.",
          A("a", {
            href: "https://sonner.emilkowal.ski/",
            className: "underline",
            target: "_blank",
            children: "All documentaiton",
          }),
          " ",
          "made by",
          " ",
          A("a", {
            href: "https://emilkowal.ski/",
            className: "underline",
            target: "_blank",
            children: "Emil Kowalski",
          }),
        ],
      }),
      A(St, { position: "top-center" }),
      A(dt, {
        onClick: () => yt.success("My first toast"),
        children: "Give me a toast",
      }),
    ],
  });
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { Yt as Sonner };
