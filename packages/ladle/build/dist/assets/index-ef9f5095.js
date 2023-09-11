import { r as a, $ as Oe, _ as L, b as me, y as xe } from "./index-84d4bf48.js";
function j(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e == null || e(o), n === !1 || !o.defaultPrevented))
      return t == null ? void 0 : t(o);
  };
}
function Ae(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function he(...e) {
  return (t) => e.forEach((n) => Ae(n, t));
}
function ee(...e) {
  return a.useCallback(he(...e), e);
}
function Bt(e, t = []) {
  let n = [];
  function r(i, s) {
    const c = a.createContext(s),
      f = n.length;
    n = [...n, s];
    function d(l) {
      const { scope: p, children: m, ...y } = l,
        u = (p == null ? void 0 : p[e][f]) || c,
        h = a.useMemo(() => y, Object.values(y));
      return a.createElement(u.Provider, { value: h }, m);
    }
    function v(l, p) {
      const m = (p == null ? void 0 : p[e][f]) || c,
        y = a.useContext(m);
      if (y) return y;
      if (s !== void 0) return s;
      throw new Error(`\`${l}\` must be used within \`${i}\``);
    }
    return (d.displayName = i + "Provider"), [d, v];
  }
  const o = () => {
    const i = n.map((s) => a.createContext(s));
    return function (c) {
      const f = (c == null ? void 0 : c[e]) || i;
      return a.useMemo(() => ({ [`__scope${e}`]: { ...c, [e]: f } }), [c, f]);
    };
  };
  return (o.scopeName = e), [r, Re(o, ...t)];
}
function Re(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const s = r.reduce((c, { useScope: f, scopeName: d }) => {
        const l = f(i)[`__scope${d}`];
        return { ...c, ...l };
      }, {});
      return a.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
const Z =
    globalThis != null && globalThis.document ? a.useLayoutEffect : () => {},
  Le = Oe["useId".toString()] || (() => {});
let De = 0;
function Wt(e) {
  const [t, n] = a.useState(Le());
  return (
    Z(() => {
      e || n((r) => r ?? String(De++));
    }, [e]),
    e || (t ? `radix-${t}` : "")
  );
}
function O(e) {
  const t = a.useRef(e);
  return (
    a.useEffect(() => {
      t.current = e;
    }),
    a.useMemo(
      () =>
        (...n) => {
          var r;
          return (r = t.current) === null || r === void 0
            ? void 0
            : r.call(t, ...n);
        },
      []
    )
  );
}
function Ut({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  const [r, o] = ke({ defaultProp: t, onChange: n }),
    i = e !== void 0,
    s = i ? e : r,
    c = O(n),
    f = a.useCallback(
      (d) => {
        if (i) {
          const l = typeof d == "function" ? d(e) : d;
          l !== e && c(l);
        } else o(d);
      },
      [i, e, o, c]
    );
  return [s, f];
}
function ke({ defaultProp: e, onChange: t }) {
  const n = a.useState(e),
    [r] = n,
    o = a.useRef(r),
    i = O(t);
  return (
    a.useEffect(() => {
      o.current !== r && (i(r), (o.current = r));
    }, [r, o, i]),
    n
  );
}
const pe = a.forwardRef((e, t) => {
  const { children: n, ...r } = e,
    o = a.Children.toArray(n),
    i = o.find(Fe);
  if (i) {
    const s = i.props.children,
      c = o.map((f) =>
        f === i
          ? a.Children.count(s) > 1
            ? a.Children.only(null)
            : a.isValidElement(s)
            ? s.props.children
            : null
          : f
      );
    return a.createElement(
      q,
      L({}, r, { ref: t }),
      a.isValidElement(s) ? a.cloneElement(s, void 0, c) : null
    );
  }
  return a.createElement(q, L({}, r, { ref: t }), n);
});
pe.displayName = "Slot";
const q = a.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  return a.isValidElement(n)
    ? a.cloneElement(n, { ...Me(r, n.props), ref: t ? he(t, n.ref) : n.ref })
    : a.Children.count(n) > 1
    ? a.Children.only(null)
    : null;
});
q.displayName = "SlotClone";
const Ie = ({ children: e }) => a.createElement(a.Fragment, null, e);
function Fe(e) {
  return a.isValidElement(e) && e.type === Ie;
}
function Me(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...c) => {
            i(...c), o(...c);
          })
        : o && (n[r] = o)
      : r === "style"
      ? (n[r] = { ...o, ...i })
      : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
const _e = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul",
  ],
  te = _e.reduce((e, t) => {
    const n = a.forwardRef((r, o) => {
      const { asChild: i, ...s } = r,
        c = i ? pe : t;
      return (
        a.useEffect(() => {
          window[Symbol.for("radix-ui")] = !0;
        }, []),
        a.createElement(c, L({}, s, { ref: o }))
      );
    });
    return (n.displayName = `Primitive.${t}`), { ...e, [t]: n };
  }, {});
function Be(e, t) {
  e && me.flushSync(() => e.dispatchEvent(t));
}
function We(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = O(e);
  a.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", r),
      () => t.removeEventListener("keydown", r)
    );
  }, [n, t]);
}
const Q = "dismissableLayer.update",
  Ue = "dismissableLayer.pointerDownOutside",
  Ke = "dismissableLayer.focusOutside";
let re;
const je = a.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Kt = a.forwardRef((e, t) => {
    var n;
    const {
        disableOutsidePointerEvents: r = !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: s,
        onInteractOutside: c,
        onDismiss: f,
        ...d
      } = e,
      v = a.useContext(je),
      [l, p] = a.useState(null),
      m =
        (n = l == null ? void 0 : l.ownerDocument) !== null && n !== void 0
          ? n
          : globalThis == null
          ? void 0
          : globalThis.document,
      [, y] = a.useState({}),
      u = ee(t, (E) => p(E)),
      h = Array.from(v.layers),
      [b] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1),
      C = h.indexOf(b),
      $ = l ? h.indexOf(l) : -1,
      g = v.layersWithOutsidePointerEventsDisabled.size > 0,
      S = $ >= C,
      D = Ve((E) => {
        const N = E.target,
          ne = [...v.branches].some((K) => K.contains(N));
        !S ||
          ne ||
          (i == null || i(E),
          c == null || c(E),
          E.defaultPrevented || f == null || f());
      }, m),
      P = He((E) => {
        const N = E.target;
        [...v.branches].some((K) => K.contains(N)) ||
          (s == null || s(E),
          c == null || c(E),
          E.defaultPrevented || f == null || f());
      }, m);
    return (
      We((E) => {
        $ === v.layers.size - 1 &&
          (o == null || o(E),
          !E.defaultPrevented && f && (E.preventDefault(), f()));
      }, m),
      a.useEffect(() => {
        if (l)
          return (
            r &&
              (v.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((re = m.body.style.pointerEvents),
                (m.body.style.pointerEvents = "none")),
              v.layersWithOutsidePointerEventsDisabled.add(l)),
            v.layers.add(l),
            oe(),
            () => {
              r &&
                v.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (m.body.style.pointerEvents = re);
            }
          );
      }, [l, m, r, v]),
      a.useEffect(
        () => () => {
          l &&
            (v.layers.delete(l),
            v.layersWithOutsidePointerEventsDisabled.delete(l),
            oe());
        },
        [l, v]
      ),
      a.useEffect(() => {
        const E = () => y({});
        return (
          document.addEventListener(Q, E),
          () => document.removeEventListener(Q, E)
        );
      }, []),
      a.createElement(
        te.div,
        L({}, d, {
          ref: u,
          style: {
            pointerEvents: g ? (S ? "auto" : "none") : void 0,
            ...e.style,
          },
          onFocusCapture: j(e.onFocusCapture, P.onFocusCapture),
          onBlurCapture: j(e.onBlurCapture, P.onBlurCapture),
          onPointerDownCapture: j(
            e.onPointerDownCapture,
            D.onPointerDownCapture
          ),
        })
      )
    );
  });
function Ve(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = O(e),
    r = a.useRef(!1),
    o = a.useRef(() => {});
  return (
    a.useEffect(() => {
      const i = (c) => {
          if (c.target && !r.current) {
            let d = function () {
              be(Ue, n, f, { discrete: !0 });
            };
            const f = { originalEvent: c };
            c.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = d),
                t.addEventListener("click", o.current, { once: !0 }))
              : d();
          }
          r.current = !1;
        },
        s = window.setTimeout(() => {
          t.addEventListener("pointerdown", i);
        }, 0);
      return () => {
        window.clearTimeout(s),
          t.removeEventListener("pointerdown", i),
          t.removeEventListener("click", o.current);
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function He(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = O(e),
    r = a.useRef(!1);
  return (
    a.useEffect(() => {
      const o = (i) => {
        i.target &&
          !r.current &&
          be(Ke, n, { originalEvent: i }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", o),
        () => t.removeEventListener("focusin", o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function oe() {
  const e = new CustomEvent(Q);
  document.dispatchEvent(e);
}
function be(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }),
    r ? Be(o, i) : o.dispatchEvent(i);
}
const V = "focusScope.autoFocusOnMount",
  H = "focusScope.autoFocusOnUnmount",
  ae = { bubbles: !1, cancelable: !0 },
  jt = a.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        ...s
      } = e,
      [c, f] = a.useState(null),
      d = O(o),
      v = O(i),
      l = a.useRef(null),
      p = ee(t, (u) => f(u)),
      m = a.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    a.useEffect(() => {
      if (r) {
        let u = function ($) {
            if (m.paused || !c) return;
            const g = $.target;
            c.contains(g) ? (l.current = g) : T(l.current, { select: !0 });
          },
          h = function ($) {
            if (m.paused || !c) return;
            const g = $.relatedTarget;
            g !== null && (c.contains(g) || T(l.current, { select: !0 }));
          },
          b = function ($) {
            const g = document.activeElement;
            for (const S of $)
              S.removedNodes.length > 0 &&
                ((c != null && c.contains(g)) || T(c));
          };
        document.addEventListener("focusin", u),
          document.addEventListener("focusout", h);
        const C = new MutationObserver(b);
        return (
          c && C.observe(c, { childList: !0, subtree: !0 }),
          () => {
            document.removeEventListener("focusin", u),
              document.removeEventListener("focusout", h),
              C.disconnect();
          }
        );
      }
    }, [r, c, m.paused]),
      a.useEffect(() => {
        if (c) {
          ie.add(m);
          const u = document.activeElement;
          if (!c.contains(u)) {
            const b = new CustomEvent(V, ae);
            c.addEventListener(V, d),
              c.dispatchEvent(b),
              b.defaultPrevented ||
                (Xe(qe($e(c)), { select: !0 }),
                document.activeElement === u && T(c));
          }
          return () => {
            c.removeEventListener(V, d),
              setTimeout(() => {
                const b = new CustomEvent(H, ae);
                c.addEventListener(H, v),
                  c.dispatchEvent(b),
                  b.defaultPrevented || T(u ?? document.body, { select: !0 }),
                  c.removeEventListener(H, v),
                  ie.remove(m);
              }, 0);
          };
        }
      }, [c, d, v, m]);
    const y = a.useCallback(
      (u) => {
        if ((!n && !r) || m.paused) return;
        const h = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey,
          b = document.activeElement;
        if (h && b) {
          const C = u.currentTarget,
            [$, g] = Ye(C);
          $ && g
            ? !u.shiftKey && b === g
              ? (u.preventDefault(), n && T($, { select: !0 }))
              : u.shiftKey &&
                b === $ &&
                (u.preventDefault(), n && T(g, { select: !0 }))
            : b === C && u.preventDefault();
        }
      },
      [n, r, m.paused]
    );
    return a.createElement(
      te.div,
      L({ tabIndex: -1 }, s, { ref: p, onKeyDown: y })
    );
  });
function Xe(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((T(r, { select: t }), document.activeElement !== n)) return;
}
function Ye(e) {
  const t = $e(e),
    n = ce(t, e),
    r = ce(t.reverse(), e);
  return [n, r];
}
function $e(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ce(e, t) {
  for (const n of e) if (!ze(n, { upTo: t })) return n;
}
function ze(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Ge(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function T(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Ge(e) && t && e.select();
  }
}
const ie = Ze();
function Ze() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), (e = ue(e, t)), e.unshift(t);
    },
    remove(t) {
      var n;
      (e = ue(e, t)), (n = e[0]) === null || n === void 0 || n.resume();
    },
  };
}
function ue(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function qe(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Vt = a.forwardRef((e, t) => {
  var n;
  const {
    container: r = globalThis == null ||
    (n = globalThis.document) === null ||
    n === void 0
      ? void 0
      : n.body,
    ...o
  } = e;
  return r
    ? xe.createPortal(a.createElement(te.div, L({}, o, { ref: t })), r)
    : null;
});
function Qe(e, t) {
  return a.useReducer((n, r) => {
    const o = t[n][r];
    return o ?? n;
  }, e);
}
const Je = (e) => {
  const { present: t, children: n } = e,
    r = et(t),
    o =
      typeof n == "function" ? n({ present: r.isPresent }) : a.Children.only(n),
    i = ee(r.ref, o.ref);
  return typeof n == "function" || r.isPresent
    ? a.cloneElement(o, { ref: i })
    : null;
};
Je.displayName = "Presence";
function et(e) {
  const [t, n] = a.useState(),
    r = a.useRef({}),
    o = a.useRef(e),
    i = a.useRef("none"),
    s = e ? "mounted" : "unmounted",
    [c, f] = Qe(s, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    a.useEffect(() => {
      const d = k(r.current);
      i.current = c === "mounted" ? d : "none";
    }, [c]),
    Z(() => {
      const d = r.current,
        v = o.current;
      if (v !== e) {
        const p = i.current,
          m = k(d);
        e
          ? f("MOUNT")
          : m === "none" || (d == null ? void 0 : d.display) === "none"
          ? f("UNMOUNT")
          : f(v && p !== m ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e);
      }
    }, [e, f]),
    Z(() => {
      if (t) {
        const d = (l) => {
            const m = k(r.current).includes(l.animationName);
            l.target === t && m && me.flushSync(() => f("ANIMATION_END"));
          },
          v = (l) => {
            l.target === t && (i.current = k(r.current));
          };
        return (
          t.addEventListener("animationstart", v),
          t.addEventListener("animationcancel", d),
          t.addEventListener("animationend", d),
          () => {
            t.removeEventListener("animationstart", v),
              t.removeEventListener("animationcancel", d),
              t.removeEventListener("animationend", d);
          }
        );
      } else f("ANIMATION_END");
    }, [t, f]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(c),
      ref: a.useCallback((d) => {
        d && (r.current = getComputedStyle(d)), n(d);
      }, []),
    }
  );
}
function k(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
let X = 0;
function Ht() {
  a.useEffect(() => {
    var e, t;
    const n = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement(
        "afterbegin",
        (e = n[0]) !== null && e !== void 0 ? e : se()
      ),
      document.body.insertAdjacentElement(
        "beforeend",
        (t = n[1]) !== null && t !== void 0 ? t : se()
      ),
      X++,
      () => {
        X === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((r) => r.remove()),
          X--;
      }
    );
  }, []);
}
function se() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.cssText =
      "outline: none; opacity: 0; position: fixed; pointer-events: none"),
    e
  );
}
var w = function () {
  return (
    (w =
      Object.assign ||
      function (t) {
        for (var n, r = 1, o = arguments.length; r < o; r++) {
          n = arguments[r];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }),
    w.apply(this, arguments)
  );
};
function ge(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function tt(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
var B = "right-scroll-bar-position",
  W = "width-before-scroll-bar",
  nt = "with-scroll-bars-hidden",
  rt = "--removed-body-scroll-bar-size";
function ot(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function at(e, t) {
  var n = a.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
function ct(e, t) {
  return at(t || null, function (n) {
    return e.forEach(function (r) {
      return ot(r, n);
    });
  });
}
function it(e) {
  return e;
}
function ut(e, t) {
  t === void 0 && (t = it);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (i) {
        var s = t(i, r);
        return (
          n.push(s),
          function () {
            n = n.filter(function (c) {
              return c !== s;
            });
          }
        );
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var s = n;
          (n = []), s.forEach(i);
        }
        n = {
          push: function (c) {
            return i(c);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (i) {
        r = !0;
        var s = [];
        if (n.length) {
          var c = n;
          (n = []), c.forEach(i), (s = n);
        }
        var f = function () {
            var v = s;
            (s = []), v.forEach(i);
          },
          d = function () {
            return Promise.resolve().then(f);
          };
        d(),
          (n = {
            push: function (v) {
              s.push(v), d();
            },
            filter: function (v) {
              return (s = s.filter(v)), n;
            },
          });
      },
    };
  return o;
}
function st(e) {
  e === void 0 && (e = {});
  var t = ut(null);
  return (t.options = w({ async: !0, ssr: !1 }, e)), t;
}
var Ee = function (e) {
  var t = e.sideCar,
    n = ge(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return a.createElement(r, w({}, n));
};
Ee.isSideCarExport = !0;
function lt(e, t) {
  return e.useMedium(t), Ee;
}
var ye = st(),
  Y = function () {},
  U = a.forwardRef(function (e, t) {
    var n = a.useRef(null),
      r = a.useState({
        onScrollCapture: Y,
        onWheelCapture: Y,
        onTouchMoveCapture: Y,
      }),
      o = r[0],
      i = r[1],
      s = e.forwardProps,
      c = e.children,
      f = e.className,
      d = e.removeScrollBar,
      v = e.enabled,
      l = e.shards,
      p = e.sideCar,
      m = e.noIsolation,
      y = e.inert,
      u = e.allowPinchZoom,
      h = e.as,
      b = h === void 0 ? "div" : h,
      C = ge(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
      ]),
      $ = p,
      g = ct([n, t]),
      S = w(w({}, C), o);
    return a.createElement(
      a.Fragment,
      null,
      v &&
        a.createElement($, {
          sideCar: ye,
          removeScrollBar: d,
          shards: l,
          noIsolation: m,
          inert: y,
          setCallbacks: i,
          allowPinchZoom: !!u,
          lockRef: n,
        }),
      s
        ? a.cloneElement(a.Children.only(c), w(w({}, S), { ref: g }))
        : a.createElement(b, w({}, S, { className: f, ref: g }), c)
    );
  });
U.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
U.classNames = { fullWidth: W, zeroRight: B };
var le,
  dt = function () {
    if (le) return le;
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
function ft() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = dt();
  return t && e.setAttribute("nonce", t), e;
}
function vt(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function mt(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var ht = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = ft()) && (vt(t, n), mt(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  pt = function () {
    var e = ht();
    return function (t, n) {
      a.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n]
      );
    };
  },
  Se = function () {
    var e = pt(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return e(r, o), null;
      };
    return t;
  },
  bt = { left: 0, top: 0, right: 0, gap: 0 },
  z = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  $t = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [z(n), z(r), z(o)];
  },
  gt = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return bt;
    var t = $t(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  Et = Se(),
  yt = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      s = e.right,
      c = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          nt,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(c, "px ")
        .concat(
          r,
          `;
  }
  body {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  i,
                  `px;
    padding-right: `
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(c, "px ")
                .concat(
                  r,
                  `;
    `
                ),
            n === "padding" &&
              "padding-right: ".concat(c, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          B,
          ` {
    right: `
        )
        .concat(c, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          W,
          ` {
    margin-right: `
        )
        .concat(c, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(B, " .")
        .concat(
          B,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(W, " .")
        .concat(
          W,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body {
    `
        )
        .concat(rt, ": ")
        .concat(
          c,
          `px;
  }
`
        )
    );
  },
  St = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r,
      i = a.useMemo(
        function () {
          return gt(o);
        },
        [o]
      );
    return a.createElement(Et, { styles: yt(i, !t, o, n ? "" : "!important") });
  },
  J = !1;
if (typeof window < "u")
  try {
    var I = Object.defineProperty({}, "passive", {
      get: function () {
        return (J = !0), !0;
      },
    });
    window.addEventListener("test", I, I),
      window.removeEventListener("test", I, I);
  } catch {
    J = !1;
  }
var x = J ? { passive: !1 } : !1,
  Ct = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Ce = function (e, t) {
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !Ct(e) && n[t] === "visible")
    );
  },
  wt = function (e) {
    return Ce(e, "overflowY");
  },
  Pt = function (e) {
    return Ce(e, "overflowX");
  },
  de = function (e, t) {
    var n = t;
    do {
      typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
      var r = we(e, n);
      if (r) {
        var o = Pe(e, n),
          i = o[1],
          s = o[2];
        if (i > s) return !0;
      }
      n = n.parentNode;
    } while (n && n !== document.body);
    return !1;
  },
  Tt = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  Nt = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  we = function (e, t) {
    return e === "v" ? wt(t) : Pt(t);
  },
  Pe = function (e, t) {
    return e === "v" ? Tt(t) : Nt(t);
  },
  Ot = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  xt = function (e, t, n, r, o) {
    var i = Ot(e, window.getComputedStyle(t).direction),
      s = i * r,
      c = n.target,
      f = t.contains(c),
      d = !1,
      v = s > 0,
      l = 0,
      p = 0;
    do {
      var m = Pe(e, c),
        y = m[0],
        u = m[1],
        h = m[2],
        b = u - h - i * y;
      (y || b) && we(e, c) && ((l += b), (p += y)), (c = c.parentNode);
    } while ((!f && c !== document.body) || (f && (t.contains(c) || t === c)));
    return (
      ((v && ((o && l === 0) || (!o && s > l))) ||
        (!v && ((o && p === 0) || (!o && -s > p)))) &&
        (d = !0),
      d
    );
  },
  F = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  fe = function (e) {
    return [e.deltaX, e.deltaY];
  },
  ve = function (e) {
    return e && "current" in e ? e.current : e;
  },
  At = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  Rt = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  Lt = 0,
  A = [];
function Dt(e) {
  var t = a.useRef([]),
    n = a.useRef([0, 0]),
    r = a.useRef(),
    o = a.useState(Lt++)[0],
    i = a.useState(function () {
      return Se();
    })[0],
    s = a.useRef(e);
  a.useEffect(
    function () {
      s.current = e;
    },
    [e]
  ),
    a.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var u = tt([e.lockRef.current], (e.shards || []).map(ve), !0).filter(
            Boolean
          );
          return (
            u.forEach(function (h) {
              return h.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(o)),
                u.forEach(function (h) {
                  return h.classList.remove("allow-interactivity-".concat(o));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    );
  var c = a.useCallback(function (u, h) {
      if ("touches" in u && u.touches.length === 2)
        return !s.current.allowPinchZoom;
      var b = F(u),
        C = n.current,
        $ = "deltaX" in u ? u.deltaX : C[0] - b[0],
        g = "deltaY" in u ? u.deltaY : C[1] - b[1],
        S,
        D = u.target,
        P = Math.abs($) > Math.abs(g) ? "h" : "v";
      if ("touches" in u && P === "h" && D.type === "range") return !1;
      var E = de(P, D);
      if (!E) return !0;
      if ((E ? (S = P) : ((S = P === "v" ? "h" : "v"), (E = de(P, D))), !E))
        return !1;
      if (
        (!r.current && "changedTouches" in u && ($ || g) && (r.current = S), !S)
      )
        return !0;
      var N = r.current || S;
      return xt(N, h, u, N === "h" ? $ : g, !0);
    }, []),
    f = a.useCallback(function (u) {
      var h = u;
      if (!(!A.length || A[A.length - 1] !== i)) {
        var b = "deltaY" in h ? fe(h) : F(h),
          C = t.current.filter(function (S) {
            return S.name === h.type && S.target === h.target && At(S.delta, b);
          })[0];
        if (C && C.should) {
          h.cancelable && h.preventDefault();
          return;
        }
        if (!C) {
          var $ = (s.current.shards || [])
              .map(ve)
              .filter(Boolean)
              .filter(function (S) {
                return S.contains(h.target);
              }),
            g = $.length > 0 ? c(h, $[0]) : !s.current.noIsolation;
          g && h.cancelable && h.preventDefault();
        }
      }
    }, []),
    d = a.useCallback(function (u, h, b, C) {
      var $ = { name: u, delta: h, target: b, should: C };
      t.current.push($),
        setTimeout(function () {
          t.current = t.current.filter(function (g) {
            return g !== $;
          });
        }, 1);
    }, []),
    v = a.useCallback(function (u) {
      (n.current = F(u)), (r.current = void 0);
    }, []),
    l = a.useCallback(function (u) {
      d(u.type, fe(u), u.target, c(u, e.lockRef.current));
    }, []),
    p = a.useCallback(function (u) {
      d(u.type, F(u), u.target, c(u, e.lockRef.current));
    }, []);
  a.useEffect(function () {
    return (
      A.push(i),
      e.setCallbacks({
        onScrollCapture: l,
        onWheelCapture: l,
        onTouchMoveCapture: p,
      }),
      document.addEventListener("wheel", f, x),
      document.addEventListener("touchmove", f, x),
      document.addEventListener("touchstart", v, x),
      function () {
        (A = A.filter(function (u) {
          return u !== i;
        })),
          document.removeEventListener("wheel", f, x),
          document.removeEventListener("touchmove", f, x),
          document.removeEventListener("touchstart", v, x);
      }
    );
  }, []);
  var m = e.removeScrollBar,
    y = e.inert;
  return a.createElement(
    a.Fragment,
    null,
    y ? a.createElement(i, { styles: Rt(o) }) : null,
    m ? a.createElement(St, { gapMode: "margin" }) : null
  );
}
const kt = lt(ye, Dt);
var Te = a.forwardRef(function (e, t) {
  return a.createElement(U, w({}, e, { ref: t, sideCar: kt }));
});
Te.classNames = U.classNames;
const Xt = Te;
var It = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  R = new WeakMap(),
  M = new WeakMap(),
  _ = {},
  G = 0,
  Ne = function (e) {
    return e && (e.host || Ne(e.parentNode));
  },
  Ft = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Ne(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing"
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  Mt = function (e, t, n, r) {
    var o = Ft(t, Array.isArray(e) ? e : [e]);
    _[n] || (_[n] = new WeakMap());
    var i = _[n],
      s = [],
      c = new Set(),
      f = new Set(o),
      d = function (l) {
        !l || c.has(l) || (c.add(l), d(l.parentNode));
      };
    o.forEach(d);
    var v = function (l) {
      !l ||
        f.has(l) ||
        Array.prototype.forEach.call(l.children, function (p) {
          if (c.has(p)) v(p);
          else {
            var m = p.getAttribute(r),
              y = m !== null && m !== "false",
              u = (R.get(p) || 0) + 1,
              h = (i.get(p) || 0) + 1;
            R.set(p, u),
              i.set(p, h),
              s.push(p),
              u === 1 && y && M.set(p, !0),
              h === 1 && p.setAttribute(n, "true"),
              y || p.setAttribute(r, "true");
          }
        });
    };
    return (
      v(t),
      c.clear(),
      G++,
      function () {
        s.forEach(function (l) {
          var p = R.get(l) - 1,
            m = i.get(l) - 1;
          R.set(l, p),
            i.set(l, m),
            p || (M.has(l) || l.removeAttribute(r), M.delete(l)),
            m || l.removeAttribute(n);
        }),
          G--,
          G ||
            ((R = new WeakMap()),
            (R = new WeakMap()),
            (M = new WeakMap()),
            (_ = {}));
      }
    );
  },
  Yt = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = t || It(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))),
        Mt(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  };
export {
  Bt as $,
  ee as a,
  te as b,
  j as c,
  Je as d,
  Vt as e,
  Xt as f,
  pe as g,
  Yt as h,
  Ht as i,
  jt as j,
  Kt as k,
  Ut as l,
  Wt as m,
  Z as n,
  O as o,
  he as p,
  Be as q,
};
