import {
  e as H,
  r as s,
  b as dn,
  _,
  j as U,
  F as fn,
  a as L,
} from "./index-84d4bf48.js";
import {
  $ as Re,
  a as q,
  g as Ve,
  b as ge,
  n as ze,
  o as Be,
  l as Je,
  c as M,
  m as ve,
  d as Qe,
  e as un,
  h as pn,
  i as mn,
  j as gn,
  k as hn,
  p as xt,
  f as $n,
  q as bn,
} from "./index-ef9f5095.js";
import { H as wn, C as xn } from "./react-icons.esm-3c58d05b.js";
import { B as vn } from "./button-1ecdeecd.js";
import { S as yn } from "./separator-feb39716.js";
function vt(e) {
  const t = e + "CollectionProvider",
    [n, o] = Re(t),
    [c, r] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    i = (u) => {
      const { scope: p, children: $ } = u,
        w = H.useRef(null),
        h = H.useRef(new Map()).current;
      return H.createElement(c, { scope: p, itemMap: h, collectionRef: w }, $);
    },
    l = e + "CollectionSlot",
    a = H.forwardRef((u, p) => {
      const { scope: $, children: w } = u,
        h = r(l, $),
        b = q(p, h.collectionRef);
      return H.createElement(Ve, { ref: b }, w);
    }),
    f = e + "CollectionItemSlot",
    m = "data-radix-collection-item",
    d = H.forwardRef((u, p) => {
      const { scope: $, children: w, ...h } = u,
        b = H.useRef(null),
        v = q(p, b),
        x = r(f, $);
      return (
        H.useEffect(
          () => (
            x.itemMap.set(b, { ref: b, ...h }), () => void x.itemMap.delete(b)
          )
        ),
        H.createElement(Ve, { [m]: "", ref: v }, w)
      );
    });
  function g(u) {
    const p = r(e + "CollectionConsumer", u);
    return H.useCallback(() => {
      const w = p.collectionRef.current;
      if (!w) return [];
      const h = Array.from(w.querySelectorAll(`[${m}]`));
      return Array.from(p.itemMap.values()).sort(
        (x, y) => h.indexOf(x.ref.current) - h.indexOf(y.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return [{ Provider: i, Slot: a, ItemSlot: d }, g, o];
}
const Cn = s.createContext(void 0);
function yt(e) {
  const t = s.useContext(Cn);
  return e || t || "ltr";
}
const En = ["top", "right", "bottom", "left"],
  ce = Math.min,
  W = Math.max,
  Ie = Math.round,
  Oe = Math.floor,
  ie = (e) => ({ x: e, y: e }),
  Rn = { left: "right", right: "left", bottom: "top", top: "bottom" },
  _n = { start: "end", end: "start" };
function Ye(e, t, n) {
  return W(e, ce(t, n));
}
function Q(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ee(e) {
  return e.split("-")[0];
}
function we(e) {
  return e.split("-")[1];
}
function et(e) {
  return e === "x" ? "y" : "x";
}
function tt(e) {
  return e === "y" ? "height" : "width";
}
function xe(e) {
  return ["top", "bottom"].includes(ee(e)) ? "y" : "x";
}
function nt(e) {
  return et(xe(e));
}
function Mn(e, t, n) {
  n === void 0 && (n = !1);
  const o = we(e),
    c = nt(e),
    r = tt(c);
  let i =
    c === "x"
      ? o === (n ? "end" : "start")
        ? "right"
        : "left"
      : o === "start"
      ? "bottom"
      : "top";
  return t.reference[r] > t.floating[r] && (i = Fe(i)), [i, Fe(i)];
}
function An(e) {
  const t = Fe(e);
  return [Xe(e), t, Xe(t)];
}
function Xe(e) {
  return e.replace(/start|end/g, (t) => _n[t]);
}
function Sn(e, t, n) {
  const o = ["left", "right"],
    c = ["right", "left"],
    r = ["top", "bottom"],
    i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? c : o) : t ? o : c;
    case "left":
    case "right":
      return t ? r : i;
    default:
      return [];
  }
}
function Pn(e, t, n, o) {
  const c = we(e);
  let r = Sn(ee(e), n === "start", o);
  return (
    c && ((r = r.map((i) => i + "-" + c)), t && (r = r.concat(r.map(Xe)))), r
  );
}
function Fe(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rn[t]);
}
function On(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Ct(e) {
  return typeof e != "number"
    ? On(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Ne(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height,
  };
}
function lt(e, t, n) {
  let { reference: o, floating: c } = e;
  const r = xe(t),
    i = nt(t),
    l = tt(i),
    a = ee(t),
    f = r === "y",
    m = o.x + o.width / 2 - c.width / 2,
    d = o.y + o.height / 2 - c.height / 2,
    g = o[l] / 2 - c[l] / 2;
  let u;
  switch (a) {
    case "top":
      u = { x: m, y: o.y - c.height };
      break;
    case "bottom":
      u = { x: m, y: o.y + o.height };
      break;
    case "right":
      u = { x: o.x + o.width, y: d };
      break;
    case "left":
      u = { x: o.x - c.width, y: d };
      break;
    default:
      u = { x: o.x, y: o.y };
  }
  switch (we(t)) {
    case "start":
      u[i] -= g * (n && f ? -1 : 1);
      break;
    case "end":
      u[i] += g * (n && f ? -1 : 1);
      break;
  }
  return u;
}
const Dn = async (e, t, n) => {
  const {
      placement: o = "bottom",
      strategy: c = "absolute",
      middleware: r = [],
      platform: i,
    } = n,
    l = r.filter(Boolean),
    a = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let f = await i.getElementRects({ reference: e, floating: t, strategy: c }),
    { x: m, y: d } = lt(f, o, a),
    g = o,
    u = {},
    p = 0;
  for (let $ = 0; $ < l.length; $++) {
    const { name: w, fn: h } = l[$],
      {
        x: b,
        y: v,
        data: x,
        reset: y,
      } = await h({
        x: m,
        y: d,
        initialPlacement: o,
        placement: g,
        strategy: c,
        middlewareData: u,
        rects: f,
        platform: i,
        elements: { reference: e, floating: t },
      });
    if (
      ((m = b ?? m),
      (d = v ?? d),
      (u = { ...u, [w]: { ...u[w], ...x } }),
      y && p <= 50)
    ) {
      p++,
        typeof y == "object" &&
          (y.placement && (g = y.placement),
          y.rects &&
            (f =
              y.rects === !0
                ? await i.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: c,
                  })
                : y.rects),
          ({ x: m, y: d } = lt(f, g, a))),
        ($ = -1);
      continue;
    }
  }
  return { x: m, y: d, placement: g, strategy: c, middlewareData: u };
};
async function ye(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: o, y: c, platform: r, rects: i, elements: l, strategy: a } = e,
    {
      boundary: f = "clippingAncestors",
      rootBoundary: m = "viewport",
      elementContext: d = "floating",
      altBoundary: g = !1,
      padding: u = 0,
    } = Q(t, e),
    p = Ct(u),
    w = l[g ? (d === "floating" ? "reference" : "floating") : d],
    h = Ne(
      await r.getClippingRect({
        element:
          (n = await (r.isElement == null ? void 0 : r.isElement(w))) == null ||
          n
            ? w
            : w.contextElement ||
              (await (r.getDocumentElement == null
                ? void 0
                : r.getDocumentElement(l.floating))),
        boundary: f,
        rootBoundary: m,
        strategy: a,
      })
    ),
    b = d === "floating" ? { ...i.floating, x: o, y: c } : i.reference,
    v = await (r.getOffsetParent == null
      ? void 0
      : r.getOffsetParent(l.floating)),
    x = (await (r.isElement == null ? void 0 : r.isElement(v)))
      ? (await (r.getScale == null ? void 0 : r.getScale(v))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    y = Ne(
      r.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
            rect: b,
            offsetParent: v,
            strategy: a,
          })
        : b
    );
  return {
    top: (h.top - y.top + p.top) / x.y,
    bottom: (y.bottom - h.bottom + p.bottom) / x.y,
    left: (h.left - y.left + p.left) / x.x,
    right: (y.right - h.right + p.right) / x.x,
  };
}
const dt = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: o,
          placement: c,
          rects: r,
          platform: i,
          elements: l,
        } = t,
        { element: a, padding: f = 0 } = Q(e, t) || {};
      if (a == null) return {};
      const m = Ct(f),
        d = { x: n, y: o },
        g = nt(c),
        u = tt(g),
        p = await i.getDimensions(a),
        $ = g === "y",
        w = $ ? "top" : "left",
        h = $ ? "bottom" : "right",
        b = $ ? "clientHeight" : "clientWidth",
        v = r.reference[u] + r.reference[g] - d[g] - r.floating[u],
        x = d[g] - r.reference[g],
        y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a));
      let C = y ? y[b] : 0;
      (!C || !(await (i.isElement == null ? void 0 : i.isElement(y)))) &&
        (C = l.floating[b] || r.floating[u]);
      const R = v / 2 - x / 2,
        F = C / 2 - p[u] / 2 - 1,
        T = ce(m[w], F),
        N = ce(m[h], F),
        P = T,
        k = C - p[u] - N,
        S = C / 2 - p[u] / 2 + R,
        O = Ye(P, S, k),
        A =
          we(c) != null &&
          S != O &&
          r.reference[u] / 2 - (S < P ? T : N) - p[u] / 2 < 0
            ? S < P
              ? P - S
              : k - S
            : 0;
      return { [g]: d[g] - A, data: { [g]: O, centerOffset: S - O + A } };
    },
  }),
  Tn = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n;
          const {
              placement: o,
              middlewareData: c,
              rects: r,
              initialPlacement: i,
              platform: l,
              elements: a,
            } = t,
            {
              mainAxis: f = !0,
              crossAxis: m = !0,
              fallbackPlacements: d,
              fallbackStrategy: g = "bestFit",
              fallbackAxisSideDirection: u = "none",
              flipAlignment: p = !0,
              ...$
            } = Q(e, t),
            w = ee(o),
            h = ee(i) === i,
            b = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)),
            v = d || (h || !p ? [Fe(i)] : An(i));
          !d && u !== "none" && v.push(...Pn(i, p, u, b));
          const x = [i, ...v],
            y = await ye(t, $),
            C = [];
          let R = ((n = c.flip) == null ? void 0 : n.overflows) || [];
          if ((f && C.push(y[w]), m)) {
            const P = Mn(o, r, b);
            C.push(y[P[0]], y[P[1]]);
          }
          if (
            ((R = [...R, { placement: o, overflows: C }]),
            !C.every((P) => P <= 0))
          ) {
            var F, T;
            const P = (((F = c.flip) == null ? void 0 : F.index) || 0) + 1,
              k = x[P];
            if (k)
              return {
                data: { index: P, overflows: R },
                reset: { placement: k },
              };
            let S =
              (T = R.filter((O) => O.overflows[0] <= 0).sort(
                (O, D) => O.overflows[1] - D.overflows[1]
              )[0]) == null
                ? void 0
                : T.placement;
            if (!S)
              switch (g) {
                case "bestFit": {
                  var N;
                  const O =
                    (N = R.map((D) => [
                      D.placement,
                      D.overflows
                        .filter((A) => A > 0)
                        .reduce((A, X) => A + X, 0),
                    ]).sort((D, A) => D[1] - A[1])[0]) == null
                      ? void 0
                      : N[0];
                  O && (S = O);
                  break;
                }
                case "initialPlacement":
                  S = i;
                  break;
              }
            if (o !== S) return { reset: { placement: S } };
          }
          return {};
        },
      }
    );
  };
function ft(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function ut(e) {
  return En.some((t) => e[t] >= 0);
}
const In = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "hide",
      options: e,
      async fn(t) {
        const { rects: n } = t,
          { strategy: o = "referenceHidden", ...c } = Q(e, t);
        switch (o) {
          case "referenceHidden": {
            const r = await ye(t, { ...c, elementContext: "reference" }),
              i = ft(r, n.reference);
            return {
              data: { referenceHiddenOffsets: i, referenceHidden: ut(i) },
            };
          }
          case "escaped": {
            const r = await ye(t, { ...c, altBoundary: !0 }),
              i = ft(r, n.floating);
            return { data: { escapedOffsets: i, escaped: ut(i) } };
          }
          default:
            return {};
        }
      },
    }
  );
};
async function Fn(e, t) {
  const { placement: n, platform: o, elements: c } = e,
    r = await (o.isRTL == null ? void 0 : o.isRTL(c.floating)),
    i = ee(n),
    l = we(n),
    a = xe(n) === "y",
    f = ["left", "top"].includes(i) ? -1 : 1,
    m = r && a ? -1 : 1,
    d = Q(t, e);
  let {
    mainAxis: g,
    crossAxis: u,
    alignmentAxis: p,
  } = typeof d == "number"
    ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...d };
  return (
    l && typeof p == "number" && (u = l === "end" ? p * -1 : p),
    a ? { x: u * m, y: g * f } : { x: g * f, y: u * m }
  );
}
const Nn = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          const { x: n, y: o } = t,
            c = await Fn(t, e);
          return { x: n + c.x, y: o + c.y, data: c };
        },
      }
    );
  },
  Ln = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: o, placement: c } = t,
            {
              mainAxis: r = !0,
              crossAxis: i = !1,
              limiter: l = {
                fn: (w) => {
                  let { x: h, y: b } = w;
                  return { x: h, y: b };
                },
              },
              ...a
            } = Q(e, t),
            f = { x: n, y: o },
            m = await ye(t, a),
            d = xe(ee(c)),
            g = et(d);
          let u = f[g],
            p = f[d];
          if (r) {
            const w = g === "y" ? "top" : "left",
              h = g === "y" ? "bottom" : "right",
              b = u + m[w],
              v = u - m[h];
            u = Ye(b, u, v);
          }
          if (i) {
            const w = d === "y" ? "top" : "left",
              h = d === "y" ? "bottom" : "right",
              b = p + m[w],
              v = p - m[h];
            p = Ye(b, p, v);
          }
          const $ = l.fn({ ...t, [g]: u, [d]: p });
          return { ...$, data: { x: $.x - n, y: $.y - o } };
        },
      }
    );
  },
  kn = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: o, placement: c, rects: r, middlewareData: i } = t,
            { offset: l = 0, mainAxis: a = !0, crossAxis: f = !0 } = Q(e, t),
            m = { x: n, y: o },
            d = xe(c),
            g = et(d);
          let u = m[g],
            p = m[d];
          const $ = Q(l, t),
            w =
              typeof $ == "number"
                ? { mainAxis: $, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...$ };
          if (a) {
            const v = g === "y" ? "height" : "width",
              x = r.reference[g] - r.floating[v] + w.mainAxis,
              y = r.reference[g] + r.reference[v] - w.mainAxis;
            u < x ? (u = x) : u > y && (u = y);
          }
          if (f) {
            var h, b;
            const v = g === "y" ? "width" : "height",
              x = ["top", "left"].includes(ee(c)),
              y =
                r.reference[d] -
                r.floating[v] +
                ((x && ((h = i.offset) == null ? void 0 : h[d])) || 0) +
                (x ? 0 : w.crossAxis),
              C =
                r.reference[d] +
                r.reference[v] +
                (x ? 0 : ((b = i.offset) == null ? void 0 : b[d]) || 0) -
                (x ? w.crossAxis : 0);
            p < y ? (p = y) : p > C && (p = C);
          }
          return { [g]: u, [d]: p };
        },
      }
    );
  },
  Bn = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          const { placement: n, rects: o, platform: c, elements: r } = t,
            { apply: i = () => {}, ...l } = Q(e, t),
            a = await ye(t, l),
            f = ee(n),
            m = we(n),
            d = xe(n) === "y",
            { width: g, height: u } = o.floating;
          let p, $;
          f === "top" || f === "bottom"
            ? ((p = f),
              ($ =
                m ===
                ((await (c.isRTL == null ? void 0 : c.isRTL(r.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : (($ = f), (p = m === "end" ? "top" : "bottom"));
          const w = u - a[p],
            h = g - a[$],
            b = !t.middlewareData.shift;
          let v = w,
            x = h;
          if (d) {
            const C = g - a.left - a.right;
            x = m || b ? ce(h, C) : C;
          } else {
            const C = u - a.top - a.bottom;
            v = m || b ? ce(w, C) : C;
          }
          if (b && !m) {
            const C = W(a.left, 0),
              R = W(a.right, 0),
              F = W(a.top, 0),
              T = W(a.bottom, 0);
            d
              ? (x = g - 2 * (C !== 0 || R !== 0 ? C + R : W(a.left, a.right)))
              : (v = u - 2 * (F !== 0 || T !== 0 ? F + T : W(a.top, a.bottom)));
          }
          await i({ ...t, availableWidth: x, availableHeight: v });
          const y = await c.getDimensions(r.floating);
          return g !== y.width || u !== y.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function se(e) {
  return Et(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function G(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function ne(e) {
  var t;
  return (t = (Et(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Et(e) {
  return e instanceof Node || e instanceof G(e).Node;
}
function te(e) {
  return e instanceof Element || e instanceof G(e).Element;
}
function Z(e) {
  return e instanceof HTMLElement || e instanceof G(e).HTMLElement;
}
function pt(e) {
  return typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof G(e).ShadowRoot;
}
function _e(e) {
  const { overflow: t, overflowX: n, overflowY: o, display: c } = V(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + o + n) &&
    !["inline", "contents"].includes(c)
  );
}
function Kn(e) {
  return ["table", "td", "th"].includes(se(e));
}
function ot(e) {
  const t = rt(),
    n = V(e);
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((o) =>
      (n.willChange || "").includes(o)
    ) ||
    ["paint", "layout", "strict", "content"].some((o) =>
      (n.contain || "").includes(o)
    )
  );
}
function Hn(e) {
  let t = be(e);
  for (; Z(t) && !Ke(t); ) {
    if (ot(t)) return t;
    t = be(t);
  }
  return null;
}
function rt() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ke(e) {
  return ["html", "body", "#document"].includes(se(e));
}
function V(e) {
  return G(e).getComputedStyle(e);
}
function He(e) {
  return te(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function be(e) {
  if (se(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (pt(e) && e.host) || ne(e);
  return pt(t) ? t.host : t;
}
function Rt(e) {
  const t = be(e);
  return Ke(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Z(t) && _e(t)
    ? t
    : Rt(t);
}
function Le(e, t) {
  var n;
  t === void 0 && (t = []);
  const o = Rt(e),
    c = o === ((n = e.ownerDocument) == null ? void 0 : n.body),
    r = G(o);
  return c
    ? t.concat(r, r.visualViewport || [], _e(o) ? o : [])
    : t.concat(o, Le(o));
}
function _t(e) {
  const t = V(e);
  let n = parseFloat(t.width) || 0,
    o = parseFloat(t.height) || 0;
  const c = Z(e),
    r = c ? e.offsetWidth : n,
    i = c ? e.offsetHeight : o,
    l = Ie(n) !== r || Ie(o) !== i;
  return l && ((n = r), (o = i)), { width: n, height: o, $: l };
}
function ct(e) {
  return te(e) ? e : e.contextElement;
}
function $e(e) {
  const t = ct(e);
  if (!Z(t)) return ie(1);
  const n = t.getBoundingClientRect(),
    { width: o, height: c, $: r } = _t(t);
  let i = (r ? Ie(n.width) : n.width) / o,
    l = (r ? Ie(n.height) : n.height) / c;
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: i, y: l }
  );
}
const Wn = ie(0);
function Mt(e) {
  const t = G(e);
  return !rt() || !t.visualViewport
    ? Wn
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function Gn(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== G(e)) ? !1 : t;
}
function me(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const c = e.getBoundingClientRect(),
    r = ct(e);
  let i = ie(1);
  t && (o ? te(o) && (i = $e(o)) : (i = $e(e)));
  const l = Gn(r, n, o) ? Mt(r) : ie(0);
  let a = (c.left + l.x) / i.x,
    f = (c.top + l.y) / i.y,
    m = c.width / i.x,
    d = c.height / i.y;
  if (r) {
    const g = G(r),
      u = o && te(o) ? G(o) : o;
    let p = g.frameElement;
    for (; p && o && u !== g; ) {
      const $ = $e(p),
        w = p.getBoundingClientRect(),
        h = V(p),
        b = w.left + (p.clientLeft + parseFloat(h.paddingLeft)) * $.x,
        v = w.top + (p.clientTop + parseFloat(h.paddingTop)) * $.y;
      (a *= $.x),
        (f *= $.y),
        (m *= $.x),
        (d *= $.y),
        (a += b),
        (f += v),
        (p = G(p).frameElement);
    }
  }
  return Ne({ width: m, height: d, x: a, y: f });
}
function Un(e) {
  let { rect: t, offsetParent: n, strategy: o } = e;
  const c = Z(n),
    r = ne(n);
  if (n === r) return t;
  let i = { scrollLeft: 0, scrollTop: 0 },
    l = ie(1);
  const a = ie(0);
  if (
    (c || (!c && o !== "fixed")) &&
    ((se(n) !== "body" || _e(r)) && (i = He(n)), Z(n))
  ) {
    const f = me(n);
    (l = $e(n)), (a.x = f.x + n.clientLeft), (a.y = f.y + n.clientTop);
  }
  return {
    width: t.width * l.x,
    height: t.height * l.y,
    x: t.x * l.x - i.scrollLeft * l.x + a.x,
    y: t.y * l.y - i.scrollTop * l.y + a.y,
  };
}
function Vn(e) {
  return Array.from(e.getClientRects());
}
function At(e) {
  return me(ne(e)).left + He(e).scrollLeft;
}
function zn(e) {
  const t = ne(e),
    n = He(e),
    o = e.ownerDocument.body,
    c = W(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth),
    r = W(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let i = -n.scrollLeft + At(e);
  const l = -n.scrollTop;
  return (
    V(o).direction === "rtl" && (i += W(t.clientWidth, o.clientWidth) - c),
    { width: c, height: r, x: i, y: l }
  );
}
function Yn(e, t) {
  const n = G(e),
    o = ne(e),
    c = n.visualViewport;
  let r = o.clientWidth,
    i = o.clientHeight,
    l = 0,
    a = 0;
  if (c) {
    (r = c.width), (i = c.height);
    const f = rt();
    (!f || (f && t === "fixed")) && ((l = c.offsetLeft), (a = c.offsetTop));
  }
  return { width: r, height: i, x: l, y: a };
}
function Xn(e, t) {
  const n = me(e, !0, t === "fixed"),
    o = n.top + e.clientTop,
    c = n.left + e.clientLeft,
    r = Z(e) ? $e(e) : ie(1),
    i = e.clientWidth * r.x,
    l = e.clientHeight * r.y,
    a = c * r.x,
    f = o * r.y;
  return { width: i, height: l, x: a, y: f };
}
function mt(e, t, n) {
  let o;
  if (t === "viewport") o = Yn(e, n);
  else if (t === "document") o = zn(ne(e));
  else if (te(t)) o = Xn(t, n);
  else {
    const c = Mt(e);
    o = { ...t, x: t.x - c.x, y: t.y - c.y };
  }
  return Ne(o);
}
function St(e, t) {
  const n = be(e);
  return n === t || !te(n) || Ke(n)
    ? !1
    : V(n).position === "fixed" || St(n, t);
}
function jn(e, t) {
  const n = t.get(e);
  if (n) return n;
  let o = Le(e).filter((l) => te(l) && se(l) !== "body"),
    c = null;
  const r = V(e).position === "fixed";
  let i = r ? be(e) : e;
  for (; te(i) && !Ke(i); ) {
    const l = V(i),
      a = ot(i);
    !a && l.position === "fixed" && (c = null),
      (
        r
          ? !a && !c
          : (!a &&
              l.position === "static" &&
              !!c &&
              ["absolute", "fixed"].includes(c.position)) ||
            (_e(i) && !a && St(e, i))
      )
        ? (o = o.filter((m) => m !== i))
        : (c = l),
      (i = be(i));
  }
  return t.set(e, o), o;
}
function qn(e) {
  let { element: t, boundary: n, rootBoundary: o, strategy: c } = e;
  const i = [...(n === "clippingAncestors" ? jn(t, this._c) : [].concat(n)), o],
    l = i[0],
    a = i.reduce((f, m) => {
      const d = mt(t, m, c);
      return (
        (f.top = W(d.top, f.top)),
        (f.right = ce(d.right, f.right)),
        (f.bottom = ce(d.bottom, f.bottom)),
        (f.left = W(d.left, f.left)),
        f
      );
    }, mt(t, l, c));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top,
  };
}
function Zn(e) {
  return _t(e);
}
function Jn(e, t, n) {
  const o = Z(t),
    c = ne(t),
    r = n === "fixed",
    i = me(e, !0, r, t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const a = ie(0);
  if (o || (!o && !r))
    if (((se(t) !== "body" || _e(c)) && (l = He(t)), o)) {
      const f = me(t, !0, r, t);
      (a.x = f.x + t.clientLeft), (a.y = f.y + t.clientTop);
    } else c && (a.x = At(c));
  return {
    x: i.left + l.scrollLeft - a.x,
    y: i.top + l.scrollTop - a.y,
    width: i.width,
    height: i.height,
  };
}
function gt(e, t) {
  return !Z(e) || V(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Pt(e, t) {
  const n = G(e);
  if (!Z(e)) return n;
  let o = gt(e, t);
  for (; o && Kn(o) && V(o).position === "static"; ) o = gt(o, t);
  return o &&
    (se(o) === "html" ||
      (se(o) === "body" && V(o).position === "static" && !ot(o)))
    ? n
    : o || Hn(e) || n;
}
const Qn = async function (e) {
  let { reference: t, floating: n, strategy: o } = e;
  const c = this.getOffsetParent || Pt,
    r = this.getDimensions;
  return {
    reference: Jn(t, await c(n), o),
    floating: { x: 0, y: 0, ...(await r(n)) },
  };
};
function eo(e) {
  return V(e).direction === "rtl";
}
const to = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Un,
  getDocumentElement: ne,
  getClippingRect: qn,
  getOffsetParent: Pt,
  getElementRects: Qn,
  getClientRects: Vn,
  getDimensions: Zn,
  getScale: $e,
  isElement: te,
  isRTL: eo,
};
function no(e, t) {
  let n = null,
    o;
  const c = ne(e);
  function r() {
    clearTimeout(o), n && n.disconnect(), (n = null);
  }
  function i(l, a) {
    l === void 0 && (l = !1), a === void 0 && (a = 1), r();
    const { left: f, top: m, width: d, height: g } = e.getBoundingClientRect();
    if ((l || t(), !d || !g)) return;
    const u = Oe(m),
      p = Oe(c.clientWidth - (f + d)),
      $ = Oe(c.clientHeight - (m + g)),
      w = Oe(f),
      b = {
        rootMargin: -u + "px " + -p + "px " + -$ + "px " + -w + "px",
        threshold: W(0, ce(1, a)) || 1,
      };
    let v = !0;
    function x(y) {
      const C = y[0].intersectionRatio;
      if (C !== a) {
        if (!v) return i();
        C
          ? i(!1, C)
          : (o = setTimeout(() => {
              i(!1, 1e-7);
            }, 100));
      }
      v = !1;
    }
    try {
      n = new IntersectionObserver(x, { ...b, root: c.ownerDocument });
    } catch {
      n = new IntersectionObserver(x, b);
    }
    n.observe(e);
  }
  return i(!0), r;
}
function oo(e, t, n, o) {
  o === void 0 && (o = {});
  const {
      ancestorScroll: c = !0,
      ancestorResize: r = !0,
      elementResize: i = typeof ResizeObserver == "function",
      layoutShift: l = typeof IntersectionObserver == "function",
      animationFrame: a = !1,
    } = o,
    f = ct(e),
    m = c || r ? [...(f ? Le(f) : []), ...Le(t)] : [];
  m.forEach((h) => {
    c && h.addEventListener("scroll", n, { passive: !0 }),
      r && h.addEventListener("resize", n);
  });
  const d = f && l ? no(f, n) : null;
  let g = -1,
    u = null;
  i &&
    ((u = new ResizeObserver((h) => {
      let [b] = h;
      b &&
        b.target === f &&
        u &&
        (u.unobserve(t),
        cancelAnimationFrame(g),
        (g = requestAnimationFrame(() => {
          u && u.observe(t);
        }))),
        n();
    })),
    f && !a && u.observe(f),
    u.observe(t));
  let p,
    $ = a ? me(e) : null;
  a && w();
  function w() {
    const h = me(e);
    $ &&
      (h.x !== $.x ||
        h.y !== $.y ||
        h.width !== $.width ||
        h.height !== $.height) &&
      n(),
      ($ = h),
      (p = requestAnimationFrame(w));
  }
  return (
    n(),
    () => {
      m.forEach((h) => {
        c && h.removeEventListener("scroll", n),
          r && h.removeEventListener("resize", n);
      }),
        d && d(),
        u && u.disconnect(),
        (u = null),
        a && cancelAnimationFrame(p);
    }
  );
}
const ro = (e, t, n) => {
    const o = new Map(),
      c = { platform: to, ...n },
      r = { ...c.platform, _c: o };
    return Dn(e, t, { ...c, platform: r });
  },
  co = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: o, padding: c } = typeof e == "function" ? e(n) : e;
        return o && t(o)
          ? o.current != null
            ? dt({ element: o.current, padding: c }).fn(n)
            : {}
          : o
          ? dt({ element: o, padding: c }).fn(n)
          : {};
      },
    };
  };
var Te = typeof document < "u" ? s.useLayoutEffect : s.useEffect;
function ke(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, o, c;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n != t.length)) return !1;
      for (o = n; o-- !== 0; ) if (!ke(e[o], t[o])) return !1;
      return !0;
    }
    if (((c = Object.keys(e)), (n = c.length), n !== Object.keys(t).length))
      return !1;
    for (o = n; o-- !== 0; ) if (!{}.hasOwnProperty.call(t, c[o])) return !1;
    for (o = n; o-- !== 0; ) {
      const r = c[o];
      if (!(r === "_owner" && e.$$typeof) && !ke(e[r], t[r])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ot(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ht(e, t) {
  const n = Ot(e);
  return Math.round(t * n) / n;
}
function $t(e) {
  const t = s.useRef(e);
  return (
    Te(() => {
      t.current = e;
    }),
    t
  );
}
function io(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: o = [],
      platform: c,
      elements: { reference: r, floating: i } = {},
      transform: l = !0,
      whileElementsMounted: a,
      open: f,
    } = e,
    [m, d] = s.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [g, u] = s.useState(o);
  ke(g, o) || u(o);
  const [p, $] = s.useState(null),
    [w, h] = s.useState(null),
    b = s.useCallback(
      (A) => {
        A != C.current && ((C.current = A), $(A));
      },
      [$]
    ),
    v = s.useCallback(
      (A) => {
        A !== R.current && ((R.current = A), h(A));
      },
      [h]
    ),
    x = r || p,
    y = i || w,
    C = s.useRef(null),
    R = s.useRef(null),
    F = s.useRef(m),
    T = $t(a),
    N = $t(c),
    P = s.useCallback(() => {
      if (!C.current || !R.current) return;
      const A = { placement: t, strategy: n, middleware: g };
      N.current && (A.platform = N.current),
        ro(C.current, R.current, A).then((X) => {
          const B = { ...X, isPositioned: !0 };
          k.current &&
            !ke(F.current, B) &&
            ((F.current = B),
            dn.flushSync(() => {
              d(B);
            }));
        });
    }, [g, t, n, N]);
  Te(() => {
    f === !1 &&
      F.current.isPositioned &&
      ((F.current.isPositioned = !1), d((A) => ({ ...A, isPositioned: !1 })));
  }, [f]);
  const k = s.useRef(!1);
  Te(
    () => (
      (k.current = !0),
      () => {
        k.current = !1;
      }
    ),
    []
  ),
    Te(() => {
      if ((x && (C.current = x), y && (R.current = y), x && y)) {
        if (T.current) return T.current(x, y, P);
        P();
      }
    }, [x, y, P, T]);
  const S = s.useMemo(
      () => ({ reference: C, floating: R, setReference: b, setFloating: v }),
      [b, v]
    ),
    O = s.useMemo(() => ({ reference: x, floating: y }), [x, y]),
    D = s.useMemo(() => {
      const A = { position: n, left: 0, top: 0 };
      if (!O.floating) return A;
      const X = ht(O.floating, m.x),
        B = ht(O.floating, m.y);
      return l
        ? {
            ...A,
            transform: "translate(" + X + "px, " + B + "px)",
            ...(Ot(O.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: X, top: B };
    }, [n, l, O.floating, m.x, m.y]);
  return s.useMemo(
    () => ({ ...m, update: P, refs: S, elements: O, floatingStyles: D }),
    [m, P, S, O, D]
  );
}
const so = s.forwardRef((e, t) => {
    const { children: n, width: o = 10, height: c = 5, ...r } = e;
    return s.createElement(
      ge.svg,
      _({}, r, {
        ref: t,
        width: o,
        height: c,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none",
      }),
      e.asChild ? n : s.createElement("polygon", { points: "0,0 30,0 15,10" })
    );
  }),
  ao = so;
function lo(e) {
  const [t, n] = s.useState(void 0);
  return (
    ze(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const o = new ResizeObserver((c) => {
          if (!Array.isArray(c) || !c.length) return;
          const r = c[0];
          let i, l;
          if ("borderBoxSize" in r) {
            const a = r.borderBoxSize,
              f = Array.isArray(a) ? a[0] : a;
            (i = f.inlineSize), (l = f.blockSize);
          } else (i = e.offsetWidth), (l = e.offsetHeight);
          n({ width: i, height: l });
        });
        return o.observe(e, { box: "border-box" }), () => o.unobserve(e);
      } else n(void 0);
    }, [e]),
    t
  );
}
const Dt = "Popper",
  [Tt, It] = Re(Dt),
  [fo, Ft] = Tt(Dt),
  uo = (e) => {
    const { __scopePopper: t, children: n } = e,
      [o, c] = s.useState(null);
    return s.createElement(fo, { scope: t, anchor: o, onAnchorChange: c }, n);
  },
  po = "PopperAnchor",
  mo = s.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: o, ...c } = e,
      r = Ft(po, n),
      i = s.useRef(null),
      l = q(t, i);
    return (
      s.useEffect(() => {
        r.onAnchorChange((o == null ? void 0 : o.current) || i.current);
      }),
      o ? null : s.createElement(ge.div, _({}, c, { ref: l }))
    );
  }),
  Nt = "PopperContent",
  [go, ho] = Tt(Nt),
  $o = s.forwardRef((e, t) => {
    var n, o, c, r, i, l, a, f;
    const {
        __scopePopper: m,
        side: d = "bottom",
        sideOffset: g = 0,
        align: u = "center",
        alignOffset: p = 0,
        arrowPadding: $ = 0,
        collisionBoundary: w = [],
        collisionPadding: h = 0,
        sticky: b = "partial",
        hideWhenDetached: v = !1,
        avoidCollisions: x = !0,
        onPlaced: y,
        ...C
      } = e,
      R = Ft(Nt, m),
      [F, T] = s.useState(null),
      N = q(t, (Ge) => T(Ge)),
      [P, k] = s.useState(null),
      S = lo(P),
      O = (n = S == null ? void 0 : S.width) !== null && n !== void 0 ? n : 0,
      D = (o = S == null ? void 0 : S.height) !== null && o !== void 0 ? o : 0,
      A = d + (u !== "center" ? "-" + u : ""),
      X =
        typeof h == "number"
          ? h
          : { top: 0, right: 0, bottom: 0, left: 0, ...h },
      B = Array.isArray(w) ? w : [w],
      E = B.length > 0,
      I = { padding: X, boundary: B.filter(vo), altBoundary: E },
      {
        refs: K,
        floatingStyles: j,
        placement: le,
        isPositioned: re,
        middlewareData: J,
      } = io({
        strategy: "fixed",
        placement: A,
        whileElementsMounted: oo,
        elements: { reference: R.anchor },
        middleware: [
          Nn({ mainAxis: g + D, alignmentAxis: p }),
          x &&
            Ln({
              mainAxis: !0,
              crossAxis: !1,
              limiter: b === "partial" ? kn() : void 0,
              ...I,
            }),
          x && Tn({ ...I }),
          Bn({
            ...I,
            apply: ({
              elements: Ge,
              rects: rn,
              availableWidth: cn,
              availableHeight: sn,
            }) => {
              const { width: an, height: ln } = rn.reference,
                Pe = Ge.floating.style;
              Pe.setProperty("--radix-popper-available-width", `${cn}px`),
                Pe.setProperty("--radix-popper-available-height", `${sn}px`),
                Pe.setProperty("--radix-popper-anchor-width", `${an}px`),
                Pe.setProperty("--radix-popper-anchor-height", `${ln}px`);
            },
          }),
          P && co({ element: P, padding: $ }),
          yo({ arrowWidth: O, arrowHeight: D }),
          v && In({ strategy: "referenceHidden" }),
        ],
      }),
      [de, fe] = Lt(le),
      ue = Be(y);
    ze(() => {
      re && (ue == null || ue());
    }, [re, ue]);
    const z = (c = J.arrow) === null || c === void 0 ? void 0 : c.x,
      Se = (r = J.arrow) === null || r === void 0 ? void 0 : r.y,
      tn =
        ((i = J.arrow) === null || i === void 0 ? void 0 : i.centerOffset) !==
        0,
      [nn, on] = s.useState();
    return (
      ze(() => {
        F && on(window.getComputedStyle(F).zIndex);
      }, [F]),
      s.createElement(
        "div",
        {
          ref: K.setFloating,
          "data-radix-popper-content-wrapper": "",
          style: {
            ...j,
            transform: re ? j.transform : "translate(0, -200%)",
            minWidth: "max-content",
            zIndex: nn,
            "--radix-popper-transform-origin": [
              (l = J.transformOrigin) === null || l === void 0 ? void 0 : l.x,
              (a = J.transformOrigin) === null || a === void 0 ? void 0 : a.y,
            ].join(" "),
          },
          dir: e.dir,
        },
        s.createElement(
          go,
          {
            scope: m,
            placedSide: de,
            onArrowChange: k,
            arrowX: z,
            arrowY: Se,
            shouldHideArrow: tn,
          },
          s.createElement(
            ge.div,
            _({ "data-side": de, "data-align": fe }, C, {
              ref: N,
              style: {
                ...C.style,
                animation: re ? void 0 : "none",
                opacity:
                  (f = J.hide) !== null && f !== void 0 && f.referenceHidden
                    ? 0
                    : void 0,
              },
            })
          )
        )
      )
    );
  }),
  bo = "PopperArrow",
  wo = { top: "bottom", right: "left", bottom: "top", left: "right" },
  xo = s.forwardRef(function (t, n) {
    const { __scopePopper: o, ...c } = t,
      r = ho(bo, o),
      i = wo[r.placedSide];
    return s.createElement(
      "span",
      {
        ref: r.onArrowChange,
        style: {
          position: "absolute",
          left: r.arrowX,
          top: r.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0",
          }[r.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)",
          }[r.placedSide],
          visibility: r.shouldHideArrow ? "hidden" : void 0,
        },
      },
      s.createElement(
        ao,
        _({}, c, { ref: n, style: { ...c.style, display: "block" } })
      )
    );
  });
function vo(e) {
  return e !== null;
}
const yo = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var n, o, c, r, i;
    const { placement: l, rects: a, middlewareData: f } = t,
      d =
        ((n = f.arrow) === null || n === void 0 ? void 0 : n.centerOffset) !==
        0,
      g = d ? 0 : e.arrowWidth,
      u = d ? 0 : e.arrowHeight,
      [p, $] = Lt(l),
      w = { start: "0%", center: "50%", end: "100%" }[$],
      h =
        ((o = (c = f.arrow) === null || c === void 0 ? void 0 : c.x) !== null &&
        o !== void 0
          ? o
          : 0) +
        g / 2,
      b =
        ((r = (i = f.arrow) === null || i === void 0 ? void 0 : i.y) !== null &&
        r !== void 0
          ? r
          : 0) +
        u / 2;
    let v = "",
      x = "";
    return (
      p === "bottom"
        ? ((v = d ? w : `${h}px`), (x = `${-u}px`))
        : p === "top"
        ? ((v = d ? w : `${h}px`), (x = `${a.floating.height + u}px`))
        : p === "right"
        ? ((v = `${-u}px`), (x = d ? w : `${b}px`))
        : p === "left" &&
          ((v = `${a.floating.width + u}px`), (x = d ? w : `${b}px`)),
      { data: { x: v, y: x } }
    );
  },
});
function Lt(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const kt = uo,
  Co = mo,
  Eo = $o,
  Ro = xo,
  Ue = "rovingFocusGroup.onEntryFocus",
  _o = { bubbles: !1, cancelable: !0 },
  it = "RovingFocusGroup",
  [je, Bt, Mo] = vt(it),
  [Ao, Kt] = Re(it, [Mo]),
  [So, Po] = Ao(it),
  Oo = s.forwardRef((e, t) =>
    s.createElement(
      je.Provider,
      { scope: e.__scopeRovingFocusGroup },
      s.createElement(
        je.Slot,
        { scope: e.__scopeRovingFocusGroup },
        s.createElement(Do, _({}, e, { ref: t }))
      )
    )
  ),
  Do = s.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: o,
        loop: c = !1,
        dir: r,
        currentTabStopId: i,
        defaultCurrentTabStopId: l,
        onCurrentTabStopIdChange: a,
        onEntryFocus: f,
        ...m
      } = e,
      d = s.useRef(null),
      g = q(t, d),
      u = yt(r),
      [p = null, $] = Je({ prop: i, defaultProp: l, onChange: a }),
      [w, h] = s.useState(!1),
      b = Be(f),
      v = Bt(n),
      x = s.useRef(!1),
      [y, C] = s.useState(0);
    return (
      s.useEffect(() => {
        const R = d.current;
        if (R)
          return R.addEventListener(Ue, b), () => R.removeEventListener(Ue, b);
      }, [b]),
      s.createElement(
        So,
        {
          scope: n,
          orientation: o,
          dir: u,
          loop: c,
          currentTabStopId: p,
          onItemFocus: s.useCallback((R) => $(R), [$]),
          onItemShiftTab: s.useCallback(() => h(!0), []),
          onFocusableItemAdd: s.useCallback(() => C((R) => R + 1), []),
          onFocusableItemRemove: s.useCallback(() => C((R) => R - 1), []),
        },
        s.createElement(
          ge.div,
          _({ tabIndex: w || y === 0 ? -1 : 0, "data-orientation": o }, m, {
            ref: g,
            style: { outline: "none", ...e.style },
            onMouseDown: M(e.onMouseDown, () => {
              x.current = !0;
            }),
            onFocus: M(e.onFocus, (R) => {
              const F = !x.current;
              if (R.target === R.currentTarget && F && !w) {
                const T = new CustomEvent(Ue, _o);
                if ((R.currentTarget.dispatchEvent(T), !T.defaultPrevented)) {
                  const N = v().filter((D) => D.focusable),
                    P = N.find((D) => D.active),
                    k = N.find((D) => D.id === p),
                    O = [P, k, ...N].filter(Boolean).map((D) => D.ref.current);
                  Ht(O);
                }
              }
              x.current = !1;
            }),
            onBlur: M(e.onBlur, () => h(!1)),
          })
        )
      )
    );
  }),
  To = "RovingFocusGroupItem",
  Io = s.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: o = !0,
        active: c = !1,
        tabStopId: r,
        ...i
      } = e,
      l = ve(),
      a = r || l,
      f = Po(To, n),
      m = f.currentTabStopId === a,
      d = Bt(n),
      { onFocusableItemAdd: g, onFocusableItemRemove: u } = f;
    return (
      s.useEffect(() => {
        if (o) return g(), () => u();
      }, [o, g, u]),
      s.createElement(
        je.ItemSlot,
        { scope: n, id: a, focusable: o, active: c },
        s.createElement(
          ge.span,
          _({ tabIndex: m ? 0 : -1, "data-orientation": f.orientation }, i, {
            ref: t,
            onMouseDown: M(e.onMouseDown, (p) => {
              o ? f.onItemFocus(a) : p.preventDefault();
            }),
            onFocus: M(e.onFocus, () => f.onItemFocus(a)),
            onKeyDown: M(e.onKeyDown, (p) => {
              if (p.key === "Tab" && p.shiftKey) {
                f.onItemShiftTab();
                return;
              }
              if (p.target !== p.currentTarget) return;
              const $ = Lo(p, f.orientation, f.dir);
              if ($ !== void 0) {
                p.preventDefault();
                let h = d()
                  .filter((b) => b.focusable)
                  .map((b) => b.ref.current);
                if ($ === "last") h.reverse();
                else if ($ === "prev" || $ === "next") {
                  $ === "prev" && h.reverse();
                  const b = h.indexOf(p.currentTarget);
                  h = f.loop ? ko(h, b + 1) : h.slice(b + 1);
                }
                setTimeout(() => Ht(h));
              }
            }),
          })
        )
      )
    );
  }),
  Fo = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
  };
function No(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
    ? "ArrowRight"
    : e === "ArrowRight"
    ? "ArrowLeft"
    : e;
}
function Lo(e, t, n) {
  const o = No(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o))
  )
    return Fo[o];
}
function Ht(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function ko(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
const Bo = Oo,
  Ko = Io,
  qe = ["Enter", " "],
  Ho = ["ArrowDown", "PageUp", "Home"],
  Wt = ["ArrowUp", "PageDown", "End"],
  Wo = [...Ho, ...Wt],
  Go = { ltr: [...qe, "ArrowRight"], rtl: [...qe, "ArrowLeft"] },
  Uo = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  We = "Menu",
  [Ce, Vo, zo] = vt(We),
  [he, Gt] = Re(We, [zo, It, Kt]),
  Me = It(),
  Ut = Kt(),
  [Vt, ae] = he(We),
  [Yo, Ae] = he(We),
  Xo = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: o,
        dir: c,
        onOpenChange: r,
        modal: i = !0,
      } = e,
      l = Me(t),
      [a, f] = s.useState(null),
      m = s.useRef(!1),
      d = Be(r),
      g = yt(c);
    return (
      s.useEffect(() => {
        const u = () => {
            (m.current = !0),
              document.addEventListener("pointerdown", p, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", p, {
                capture: !0,
                once: !0,
              });
          },
          p = () => (m.current = !1);
        return (
          document.addEventListener("keydown", u, { capture: !0 }),
          () => {
            document.removeEventListener("keydown", u, { capture: !0 }),
              document.removeEventListener("pointerdown", p, { capture: !0 }),
              document.removeEventListener("pointermove", p, { capture: !0 });
          }
        );
      }, []),
      s.createElement(
        kt,
        l,
        s.createElement(
          Vt,
          {
            scope: t,
            open: n,
            onOpenChange: d,
            content: a,
            onContentChange: f,
          },
          s.createElement(
            Yo,
            {
              scope: t,
              onClose: s.useCallback(() => d(!1), [d]),
              isUsingKeyboardRef: m,
              dir: g,
              modal: i,
            },
            o
          )
        )
      )
    );
  },
  zt = s.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      c = Me(n);
    return s.createElement(Co, _({}, c, o, { ref: t }));
  }),
  Yt = "MenuPortal",
  [jo, Xt] = he(Yt, { forceMount: void 0 }),
  qo = (e) => {
    const { __scopeMenu: t, forceMount: n, children: o, container: c } = e,
      r = ae(Yt, t);
    return s.createElement(
      jo,
      { scope: t, forceMount: n },
      s.createElement(
        Qe,
        { present: n || r.open },
        s.createElement(un, { asChild: !0, container: c }, o)
      )
    );
  },
  Y = "MenuContent",
  [Zo, st] = he(Y),
  Jo = s.forwardRef((e, t) => {
    const n = Xt(Y, e.__scopeMenu),
      { forceMount: o = n.forceMount, ...c } = e,
      r = ae(Y, e.__scopeMenu),
      i = Ae(Y, e.__scopeMenu);
    return s.createElement(
      Ce.Provider,
      { scope: e.__scopeMenu },
      s.createElement(
        Qe,
        { present: o || r.open },
        s.createElement(
          Ce.Slot,
          { scope: e.__scopeMenu },
          i.modal
            ? s.createElement(Qo, _({}, c, { ref: t }))
            : s.createElement(er, _({}, c, { ref: t }))
        )
      )
    );
  }),
  Qo = s.forwardRef((e, t) => {
    const n = ae(Y, e.__scopeMenu),
      o = s.useRef(null),
      c = q(t, o);
    return (
      s.useEffect(() => {
        const r = o.current;
        if (r) return pn(r);
      }, []),
      s.createElement(
        at,
        _({}, e, {
          ref: c,
          trapFocus: n.open,
          disableOutsidePointerEvents: n.open,
          disableOutsideScroll: !0,
          onFocusOutside: M(e.onFocusOutside, (r) => r.preventDefault(), {
            checkForDefaultPrevented: !1,
          }),
          onDismiss: () => n.onOpenChange(!1),
        })
      )
    );
  }),
  er = s.forwardRef((e, t) => {
    const n = ae(Y, e.__scopeMenu);
    return s.createElement(
      at,
      _({}, e, {
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  at = s.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: o = !1,
        trapFocus: c,
        onOpenAutoFocus: r,
        onCloseAutoFocus: i,
        disableOutsidePointerEvents: l,
        onEntryFocus: a,
        onEscapeKeyDown: f,
        onPointerDownOutside: m,
        onFocusOutside: d,
        onInteractOutside: g,
        onDismiss: u,
        disableOutsideScroll: p,
        ...$
      } = e,
      w = ae(Y, n),
      h = Ae(Y, n),
      b = Me(n),
      v = Ut(n),
      x = Vo(n),
      [y, C] = s.useState(null),
      R = s.useRef(null),
      F = q(t, R, w.onContentChange),
      T = s.useRef(0),
      N = s.useRef(""),
      P = s.useRef(0),
      k = s.useRef(null),
      S = s.useRef("right"),
      O = s.useRef(0),
      D = p ? $n : s.Fragment,
      A = p ? { as: Ve, allowPinchZoom: !0 } : void 0,
      X = (E) => {
        var I, K;
        const j = N.current + E,
          le = x().filter((z) => !z.disabled),
          re = document.activeElement,
          J =
            (I = le.find((z) => z.ref.current === re)) === null || I === void 0
              ? void 0
              : I.textValue,
          de = le.map((z) => z.textValue),
          fe = ur(de, j, J),
          ue =
            (K = le.find((z) => z.textValue === fe)) === null || K === void 0
              ? void 0
              : K.ref.current;
        (function z(Se) {
          (N.current = Se),
            window.clearTimeout(T.current),
            Se !== "" && (T.current = window.setTimeout(() => z(""), 1e3));
        })(j),
          ue && setTimeout(() => ue.focus());
      };
    s.useEffect(() => () => window.clearTimeout(T.current), []), mn();
    const B = s.useCallback((E) => {
      var I, K;
      return (
        S.current ===
          ((I = k.current) === null || I === void 0 ? void 0 : I.side) &&
        mr(E, (K = k.current) === null || K === void 0 ? void 0 : K.area)
      );
    }, []);
    return s.createElement(
      Zo,
      {
        scope: n,
        searchRef: N,
        onItemEnter: s.useCallback(
          (E) => {
            B(E) && E.preventDefault();
          },
          [B]
        ),
        onItemLeave: s.useCallback(
          (E) => {
            var I;
            B(E) ||
              ((I = R.current) === null || I === void 0 || I.focus(), C(null));
          },
          [B]
        ),
        onTriggerLeave: s.useCallback(
          (E) => {
            B(E) && E.preventDefault();
          },
          [B]
        ),
        pointerGraceTimerRef: P,
        onPointerGraceIntentChange: s.useCallback((E) => {
          k.current = E;
        }, []),
      },
      s.createElement(
        D,
        A,
        s.createElement(
          gn,
          {
            asChild: !0,
            trapped: c,
            onMountAutoFocus: M(r, (E) => {
              var I;
              E.preventDefault(),
                (I = R.current) === null || I === void 0 || I.focus();
            }),
            onUnmountAutoFocus: i,
          },
          s.createElement(
            hn,
            {
              asChild: !0,
              disableOutsidePointerEvents: l,
              onEscapeKeyDown: f,
              onPointerDownOutside: m,
              onFocusOutside: d,
              onInteractOutside: g,
              onDismiss: u,
            },
            s.createElement(
              Bo,
              _({ asChild: !0 }, v, {
                dir: h.dir,
                orientation: "vertical",
                loop: o,
                currentTabStopId: y,
                onCurrentTabStopIdChange: C,
                onEntryFocus: M(a, (E) => {
                  h.isUsingKeyboardRef.current || E.preventDefault();
                }),
              }),
              s.createElement(
                Eo,
                _(
                  {
                    role: "menu",
                    "aria-orientation": "vertical",
                    "data-state": Jt(w.open),
                    "data-radix-menu-content": "",
                    dir: h.dir,
                  },
                  b,
                  $,
                  {
                    ref: F,
                    style: { outline: "none", ...$.style },
                    onKeyDown: M($.onKeyDown, (E) => {
                      const K =
                          E.target.closest("[data-radix-menu-content]") ===
                          E.currentTarget,
                        j = E.ctrlKey || E.altKey || E.metaKey,
                        le = E.key.length === 1;
                      K &&
                        (E.key === "Tab" && E.preventDefault(),
                        !j && le && X(E.key));
                      const re = R.current;
                      if (E.target !== re || !Wo.includes(E.key)) return;
                      E.preventDefault();
                      const de = x()
                        .filter((fe) => !fe.disabled)
                        .map((fe) => fe.ref.current);
                      Wt.includes(E.key) && de.reverse(), dr(de);
                    }),
                    onBlur: M(e.onBlur, (E) => {
                      E.currentTarget.contains(E.target) ||
                        (window.clearTimeout(T.current), (N.current = ""));
                    }),
                    onPointerMove: M(
                      e.onPointerMove,
                      Ee((E) => {
                        const I = E.target,
                          K = O.current !== E.clientX;
                        if (E.currentTarget.contains(I) && K) {
                          const j = E.clientX > O.current ? "right" : "left";
                          (S.current = j), (O.current = E.clientX);
                        }
                      })
                    ),
                  }
                )
              )
            )
          )
        )
      )
    );
  }),
  Ze = "MenuItem",
  bt = "menu.itemSelect",
  tr = s.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: o, ...c } = e,
      r = s.useRef(null),
      i = Ae(Ze, e.__scopeMenu),
      l = st(Ze, e.__scopeMenu),
      a = q(t, r),
      f = s.useRef(!1),
      m = () => {
        const d = r.current;
        if (!n && d) {
          const g = new CustomEvent(bt, { bubbles: !0, cancelable: !0 });
          d.addEventListener(bt, (u) => (o == null ? void 0 : o(u)), {
            once: !0,
          }),
            bn(d, g),
            g.defaultPrevented ? (f.current = !1) : i.onClose();
        }
      };
    return s.createElement(
      jt,
      _({}, c, {
        ref: a,
        disabled: n,
        onClick: M(e.onClick, m),
        onPointerDown: (d) => {
          var g;
          (g = e.onPointerDown) === null || g === void 0 || g.call(e, d),
            (f.current = !0);
        },
        onPointerUp: M(e.onPointerUp, (d) => {
          var g;
          f.current ||
            (g = d.currentTarget) === null ||
            g === void 0 ||
            g.click();
        }),
        onKeyDown: M(e.onKeyDown, (d) => {
          const g = l.searchRef.current !== "";
          n ||
            (g && d.key === " ") ||
            (qe.includes(d.key) &&
              (d.currentTarget.click(), d.preventDefault()));
        }),
      })
    );
  }),
  jt = s.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: c, ...r } = e,
      i = st(Ze, n),
      l = Ut(n),
      a = s.useRef(null),
      f = q(t, a),
      [m, d] = s.useState(!1),
      [g, u] = s.useState("");
    return (
      s.useEffect(() => {
        const p = a.current;
        if (p) {
          var $;
          u((($ = p.textContent) !== null && $ !== void 0 ? $ : "").trim());
        }
      }, [r.children]),
      s.createElement(
        Ce.ItemSlot,
        { scope: n, disabled: o, textValue: c ?? g },
        s.createElement(
          Ko,
          _({ asChild: !0 }, l, { focusable: !o }),
          s.createElement(
            ge.div,
            _(
              {
                role: "menuitem",
                "data-highlighted": m ? "" : void 0,
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
              },
              r,
              {
                ref: f,
                onPointerMove: M(
                  e.onPointerMove,
                  Ee((p) => {
                    o
                      ? i.onItemLeave(p)
                      : (i.onItemEnter(p),
                        p.defaultPrevented || p.currentTarget.focus());
                  })
                ),
                onPointerLeave: M(
                  e.onPointerLeave,
                  Ee((p) => i.onItemLeave(p))
                ),
                onFocus: M(e.onFocus, () => d(!0)),
                onBlur: M(e.onBlur, () => d(!1)),
              }
            )
          )
        )
      )
    );
  }),
  nr = "MenuRadioGroup";
he(nr, { value: void 0, onValueChange: () => {} });
const or = "MenuItemIndicator";
he(or, { checked: !1 });
const rr = s.forwardRef((e, t) => {
    const { __scopeMenu: n, ...o } = e,
      c = Me(n);
    return s.createElement(Ro, _({}, c, o, { ref: t }));
  }),
  qt = "MenuSub",
  [cr, Zt] = he(qt),
  ir = (e) => {
    const { __scopeMenu: t, children: n, open: o = !1, onOpenChange: c } = e,
      r = ae(qt, t),
      i = Me(t),
      [l, a] = s.useState(null),
      [f, m] = s.useState(null),
      d = Be(c);
    return (
      s.useEffect(() => (r.open === !1 && d(!1), () => d(!1)), [r.open, d]),
      s.createElement(
        kt,
        i,
        s.createElement(
          Vt,
          {
            scope: t,
            open: o,
            onOpenChange: d,
            content: f,
            onContentChange: m,
          },
          s.createElement(
            cr,
            {
              scope: t,
              contentId: ve(),
              triggerId: ve(),
              trigger: l,
              onTriggerChange: a,
            },
            n
          )
        )
      )
    );
  },
  De = "MenuSubTrigger",
  sr = s.forwardRef((e, t) => {
    const n = ae(De, e.__scopeMenu),
      o = Ae(De, e.__scopeMenu),
      c = Zt(De, e.__scopeMenu),
      r = st(De, e.__scopeMenu),
      i = s.useRef(null),
      { pointerGraceTimerRef: l, onPointerGraceIntentChange: a } = r,
      f = { __scopeMenu: e.__scopeMenu },
      m = s.useCallback(() => {
        i.current && window.clearTimeout(i.current), (i.current = null);
      }, []);
    return (
      s.useEffect(() => m, [m]),
      s.useEffect(() => {
        const d = l.current;
        return () => {
          window.clearTimeout(d), a(null);
        };
      }, [l, a]),
      s.createElement(
        zt,
        _({ asChild: !0 }, f),
        s.createElement(
          jt,
          _(
            {
              id: c.triggerId,
              "aria-haspopup": "menu",
              "aria-expanded": n.open,
              "aria-controls": c.contentId,
              "data-state": Jt(n.open),
            },
            e,
            {
              ref: xt(t, c.onTriggerChange),
              onClick: (d) => {
                var g;
                (g = e.onClick) === null || g === void 0 || g.call(e, d),
                  !(e.disabled || d.defaultPrevented) &&
                    (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
              },
              onPointerMove: M(
                e.onPointerMove,
                Ee((d) => {
                  r.onItemEnter(d),
                    !d.defaultPrevented &&
                      !e.disabled &&
                      !n.open &&
                      !i.current &&
                      (r.onPointerGraceIntentChange(null),
                      (i.current = window.setTimeout(() => {
                        n.onOpenChange(!0), m();
                      }, 100)));
                })
              ),
              onPointerLeave: M(
                e.onPointerLeave,
                Ee((d) => {
                  var g;
                  m();
                  const u =
                    (g = n.content) === null || g === void 0
                      ? void 0
                      : g.getBoundingClientRect();
                  if (u) {
                    var p;
                    const $ =
                        (p = n.content) === null || p === void 0
                          ? void 0
                          : p.dataset.side,
                      w = $ === "right",
                      h = w ? -5 : 5,
                      b = u[w ? "left" : "right"],
                      v = u[w ? "right" : "left"];
                    r.onPointerGraceIntentChange({
                      area: [
                        { x: d.clientX + h, y: d.clientY },
                        { x: b, y: u.top },
                        { x: v, y: u.top },
                        { x: v, y: u.bottom },
                        { x: b, y: u.bottom },
                      ],
                      side: $,
                    }),
                      window.clearTimeout(l.current),
                      (l.current = window.setTimeout(
                        () => r.onPointerGraceIntentChange(null),
                        300
                      ));
                  } else {
                    if ((r.onTriggerLeave(d), d.defaultPrevented)) return;
                    r.onPointerGraceIntentChange(null);
                  }
                })
              ),
              onKeyDown: M(e.onKeyDown, (d) => {
                const g = r.searchRef.current !== "";
                if (
                  !(e.disabled || (g && d.key === " ")) &&
                  Go[o.dir].includes(d.key)
                ) {
                  var u;
                  n.onOpenChange(!0),
                    (u = n.content) === null || u === void 0 || u.focus(),
                    d.preventDefault();
                }
              }),
            }
          )
        )
      )
    );
  }),
  ar = "MenuSubContent",
  lr = s.forwardRef((e, t) => {
    const n = Xt(Y, e.__scopeMenu),
      { forceMount: o = n.forceMount, ...c } = e,
      r = ae(Y, e.__scopeMenu),
      i = Ae(Y, e.__scopeMenu),
      l = Zt(ar, e.__scopeMenu),
      a = s.useRef(null),
      f = q(t, a);
    return s.createElement(
      Ce.Provider,
      { scope: e.__scopeMenu },
      s.createElement(
        Qe,
        { present: o || r.open },
        s.createElement(
          Ce.Slot,
          { scope: e.__scopeMenu },
          s.createElement(
            at,
            _({ id: l.contentId, "aria-labelledby": l.triggerId }, c, {
              ref: f,
              align: "start",
              side: i.dir === "rtl" ? "left" : "right",
              disableOutsidePointerEvents: !1,
              disableOutsideScroll: !1,
              trapFocus: !1,
              onOpenAutoFocus: (m) => {
                var d;
                i.isUsingKeyboardRef.current &&
                  ((d = a.current) === null || d === void 0 || d.focus()),
                  m.preventDefault();
              },
              onCloseAutoFocus: (m) => m.preventDefault(),
              onFocusOutside: M(e.onFocusOutside, (m) => {
                m.target !== l.trigger && r.onOpenChange(!1);
              }),
              onEscapeKeyDown: M(e.onEscapeKeyDown, (m) => {
                i.onClose(), m.preventDefault();
              }),
              onKeyDown: M(e.onKeyDown, (m) => {
                const d = m.currentTarget.contains(m.target),
                  g = Uo[i.dir].includes(m.key);
                if (d && g) {
                  var u;
                  r.onOpenChange(!1),
                    (u = l.trigger) === null || u === void 0 || u.focus(),
                    m.preventDefault();
                }
              }),
            })
          )
        )
      )
    );
  });
function Jt(e) {
  return e ? "open" : "closed";
}
function dr(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function fr(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function ur(e, t, n) {
  const c = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t,
    r = n ? e.indexOf(n) : -1;
  let i = fr(e, Math.max(r, 0));
  c.length === 1 && (i = i.filter((f) => f !== n));
  const a = i.find((f) => f.toLowerCase().startsWith(c.toLowerCase()));
  return a !== n ? a : void 0;
}
function pr(e, t) {
  const { x: n, y: o } = e;
  let c = !1;
  for (let r = 0, i = t.length - 1; r < t.length; i = r++) {
    const l = t[r].x,
      a = t[r].y,
      f = t[i].x,
      m = t[i].y;
    a > o != m > o && n < ((f - l) * (o - a)) / (m - a) + l && (c = !c);
  }
  return c;
}
function mr(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return pr(n, t);
}
function Ee(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
const gr = Xo,
  hr = zt,
  $r = qo,
  br = Jo,
  wr = tr,
  xr = rr,
  vr = ir,
  yr = sr,
  Cr = lr,
  Qt = "DropdownMenu",
  [Er, jr] = Re(Qt, [Gt]),
  oe = Gt(),
  [Rr, en] = Er(Qt),
  _r = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: o,
        open: c,
        defaultOpen: r,
        onOpenChange: i,
        modal: l = !0,
      } = e,
      a = oe(t),
      f = s.useRef(null),
      [m = !1, d] = Je({ prop: c, defaultProp: r, onChange: i });
    return s.createElement(
      Rr,
      {
        scope: t,
        triggerId: ve(),
        triggerRef: f,
        contentId: ve(),
        open: m,
        onOpenChange: d,
        onOpenToggle: s.useCallback(() => d((g) => !g), [d]),
        modal: l,
      },
      s.createElement(
        gr,
        _({}, a, { open: m, onOpenChange: d, dir: o, modal: l }),
        n
      )
    );
  },
  Mr = "DropdownMenuTrigger",
  Ar = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...c } = e,
      r = en(Mr, n),
      i = oe(n);
    return s.createElement(
      hr,
      _({ asChild: !0 }, i),
      s.createElement(
        ge.button,
        _(
          {
            type: "button",
            id: r.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": r.open,
            "aria-controls": r.open ? r.contentId : void 0,
            "data-state": r.open ? "open" : "closed",
            "data-disabled": o ? "" : void 0,
            disabled: o,
          },
          c,
          {
            ref: xt(t, r.triggerRef),
            onPointerDown: M(e.onPointerDown, (l) => {
              !o &&
                l.button === 0 &&
                l.ctrlKey === !1 &&
                (r.onOpenToggle(), r.open || l.preventDefault());
            }),
            onKeyDown: M(e.onKeyDown, (l) => {
              o ||
                (["Enter", " "].includes(l.key) && r.onOpenToggle(),
                l.key === "ArrowDown" && r.onOpenChange(!0),
                ["Enter", " ", "ArrowDown"].includes(l.key) &&
                  l.preventDefault());
            }),
          }
        )
      )
    );
  }),
  Sr = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      o = oe(t);
    return s.createElement($r, _({}, o, n));
  },
  Pr = "DropdownMenuContent",
  Or = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      c = en(Pr, n),
      r = oe(n),
      i = s.useRef(!1);
    return s.createElement(
      br,
      _({ id: c.contentId, "aria-labelledby": c.triggerId }, r, o, {
        ref: t,
        onCloseAutoFocus: M(e.onCloseAutoFocus, (l) => {
          var a;
          i.current ||
            (a = c.triggerRef.current) === null ||
            a === void 0 ||
            a.focus(),
            (i.current = !1),
            l.preventDefault();
        }),
        onInteractOutside: M(e.onInteractOutside, (l) => {
          const a = l.detail.originalEvent,
            f = a.button === 0 && a.ctrlKey === !0,
            m = a.button === 2 || f;
          (!c.modal || m) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin":
            "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width":
            "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height":
            "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width":
            "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height":
            "var(--radix-popper-anchor-height)",
        },
      })
    );
  }),
  Dr = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      c = oe(n);
    return s.createElement(wr, _({}, c, o, { ref: t }));
  }),
  Tr = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      c = oe(n);
    return s.createElement(xr, _({}, c, o, { ref: t }));
  }),
  Ir = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        open: o,
        onOpenChange: c,
        defaultOpen: r,
      } = e,
      i = oe(t),
      [l = !1, a] = Je({ prop: o, defaultProp: r, onChange: c });
    return s.createElement(vr, _({}, i, { open: l, onOpenChange: a }), n);
  },
  Fr = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      c = oe(n);
    return s.createElement(yr, _({}, c, o, { ref: t }));
  }),
  Nr = s.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e,
      c = oe(n);
    return s.createElement(
      Cr,
      _({}, c, o, {
        ref: t,
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin":
            "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width":
            "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height":
            "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width":
            "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height":
            "var(--radix-popper-anchor-height)",
        },
      })
    );
  }),
  Lr = _r,
  kr = Ar,
  wt = Sr,
  Br = Or,
  pe = Dr,
  Kr = Tr,
  Hr = Ir,
  Wr = Fr,
  Gr = Nr,
  qr = () => (
    H.useState(!0),
    H.useState(!1),
    H.useState("pedro"),
    U(fn, {
      children: [
        U("p", {
          children: [
            U("span", {
              className: "info info-text wall-pad",
              children: [
                "External library",
                " ",
                L("span", {
                  className: "font-bold",
                  children: "$ pnpm i @radix-ui/react-dropdown-menu",
                }),
              ],
            }),
            " ",
            "Displays a menu to the user—such as a set of actions or functions—triggered by a button..",
            " ",
            L("a", {
              href: "https://www.radix-ui.com/primitives/docs/components/dropdown-menu",
              className: "underline",
              target: "_blank",
              children: "All documentaiton",
            }),
            " ",
            "Made by ",
            "",
            L("a", {
              href: "https://www.radix-ui.com/",
              className: "underline",
              target: "_blank",
              children: "Radix",
            }),
            ".",
          ],
        }),
        U(Lr, {
          children: [
            L(kr, {
              asChild: !0,
              children: L(vn, {
                "aria-label": "Customise options",
                children: L(wn, {}),
              }),
            }),
            L(wt, {
              children: U(Br, {
                className:
                  "min-w-[220px]  rounded-md p-1 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade",
                sideOffset: 5,
                children: [
                  U(pe, {
                    className:
                      "hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   data-[highlighted]:bg-blue data-[highlighted]:text-violet1",
                    children: [
                      "New Tab ",
                      L("div", {
                        className: "ml-auto pl-2.5",
                        children: "⌘+T",
                      }),
                    ],
                  }),
                  U(pe, {
                    className:
                      "hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                    children: [
                      "New Window ",
                      L("div", {
                        className: "ml-auto pl-2.5",
                        children: "⌘+N",
                      }),
                    ],
                  }),
                  U(pe, {
                    className:
                      "hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                    disabled: !0,
                    children: [
                      "New Private Window ",
                      L("div", {
                        className: "ml-auto pl-2.5",
                        children: "⇧+⌘+N",
                      }),
                    ],
                  }),
                  U(Hr, {
                    children: [
                      U(Wr, {
                        className:
                          "hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11    data-[highlighted]:data-[state=open]:bg-violet9 data-[highlighted]:data-[state=open]:text-violet1",
                        children: [
                          "More Tools",
                          L("div", {
                            className: "ml-auto pl-2.5",
                            children: L(xn, {}),
                          }),
                        ],
                      }),
                      L(wt, {
                        children: U(Gr, {
                          className:
                            "min-w-[220px] rounded-md p-1 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade",
                          sideOffset: 2,
                          alignOffset: -5,
                          children: [
                            U(pe, {
                              className:
                                "hover:bg-accents-2 groupleading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                              children: [
                                "Save Page As… ",
                                L("div", {
                                  className: "ml-auto pl-2.5",
                                  children: "⌘+S",
                                }),
                              ],
                            }),
                            L(pe, {
                              className:
                                "hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                              children: "Create Shortcut…",
                            }),
                            L(pe, {
                              className:
                                "hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                              children: "Name Window…",
                            }),
                            L(yn, {}),
                            L(pe, {
                              className:
                                "hover:bg-accents-2 leading-none flex items-center h-2 px-0.5 relative pl-2 select-none outline-none   ",
                              children: "Developer Tools",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  L(Kr, { className: "fill-white" }),
                ],
              }),
            }),
          ],
        }),
      ],
    })
  );
typeof window < "u" &&
  window.document &&
  window.document.createElement &&
  document.documentElement.setAttribute("data-storyloaded", "");
export { qr as Default };
