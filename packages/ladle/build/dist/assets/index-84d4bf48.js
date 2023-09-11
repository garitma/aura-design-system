function S2(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
var Wo =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Sr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Rl = { exports: {} },
  Ga,
  x0;
function Pm() {
  if (x0) return Ga;
  x0 = 1;
  var e = 1e3,
    t = e * 60,
    n = t * 60,
    r = n * 24,
    o = r * 7,
    i = r * 365.25;
  Ga = function (d, c) {
    c = c || {};
    var m = typeof d;
    if (m === "string" && d.length > 0) return a(d);
    if (m === "number" && isFinite(d)) return c.long ? l(d) : s(d);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(d)
    );
  };
  function a(d) {
    if (((d = String(d)), !(d.length > 100))) {
      var c =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          d
        );
      if (c) {
        var m = parseFloat(c[1]),
          C = (c[2] || "ms").toLowerCase();
        switch (C) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return m * i;
          case "weeks":
          case "week":
          case "w":
            return m * o;
          case "days":
          case "day":
          case "d":
            return m * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return m * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return m * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return m * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return m;
          default:
            return;
        }
      }
    }
  }
  function s(d) {
    var c = Math.abs(d);
    return c >= r
      ? Math.round(d / r) + "d"
      : c >= n
      ? Math.round(d / n) + "h"
      : c >= t
      ? Math.round(d / t) + "m"
      : c >= e
      ? Math.round(d / e) + "s"
      : d + "ms";
  }
  function l(d) {
    var c = Math.abs(d);
    return c >= r
      ? u(d, c, r, "day")
      : c >= n
      ? u(d, c, n, "hour")
      : c >= t
      ? u(d, c, t, "minute")
      : c >= e
      ? u(d, c, e, "second")
      : d + " ms";
  }
  function u(d, c, m, C) {
    var v = c >= m * 1.5;
    return Math.round(d / m) + " " + C + (v ? "s" : "");
  }
  return Ga;
}
function $m(e) {
  (n.debug = n),
    (n.default = n),
    (n.coerce = l),
    (n.disable = i),
    (n.enable = o),
    (n.enabled = a),
    (n.humanize = Pm()),
    (n.destroy = u),
    Object.keys(e).forEach((d) => {
      n[d] = e[d];
    }),
    (n.names = []),
    (n.skips = []),
    (n.formatters = {});
  function t(d) {
    let c = 0;
    for (let m = 0; m < d.length; m++)
      (c = (c << 5) - c + d.charCodeAt(m)), (c |= 0);
    return n.colors[Math.abs(c) % n.colors.length];
  }
  n.selectColor = t;
  function n(d) {
    let c,
      m = null,
      C,
      v;
    function p(...E) {
      if (!p.enabled) return;
      const h = p,
        f = Number(new Date()),
        g = f - (c || f);
      (h.diff = g),
        (h.prev = c),
        (h.curr = f),
        (c = f),
        (E[0] = n.coerce(E[0])),
        typeof E[0] != "string" && E.unshift("%O");
      let _ = 0;
      (E[0] = E[0].replace(/%([a-zA-Z%])/g, (T, k) => {
        if (T === "%%") return "%";
        _++;
        const x = n.formatters[k];
        if (typeof x == "function") {
          const P = E[_];
          (T = x.call(h, P)), E.splice(_, 1), _--;
        }
        return T;
      })),
        n.formatArgs.call(h, E),
        (h.log || n.log).apply(h, E);
    }
    return (
      (p.namespace = d),
      (p.useColors = n.useColors()),
      (p.color = n.selectColor(d)),
      (p.extend = r),
      (p.destroy = n.destroy),
      Object.defineProperty(p, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () =>
          m !== null
            ? m
            : (C !== n.namespaces && ((C = n.namespaces), (v = n.enabled(d))),
              v),
        set: (E) => {
          m = E;
        },
      }),
      typeof n.init == "function" && n.init(p),
      p
    );
  }
  function r(d, c) {
    const m = n(this.namespace + (typeof c > "u" ? ":" : c) + d);
    return (m.log = this.log), m;
  }
  function o(d) {
    n.save(d), (n.namespaces = d), (n.names = []), (n.skips = []);
    let c;
    const m = (typeof d == "string" ? d : "").split(/[\s,]+/),
      C = m.length;
    for (c = 0; c < C; c++)
      m[c] &&
        ((d = m[c].replace(/\*/g, ".*?")),
        d[0] === "-"
          ? n.skips.push(new RegExp("^" + d.slice(1) + "$"))
          : n.names.push(new RegExp("^" + d + "$")));
  }
  function i() {
    const d = [...n.names.map(s), ...n.skips.map(s).map((c) => "-" + c)].join(
      ","
    );
    return n.enable(""), d;
  }
  function a(d) {
    if (d[d.length - 1] === "*") return !0;
    let c, m;
    for (c = 0, m = n.skips.length; c < m; c++)
      if (n.skips[c].test(d)) return !1;
    for (c = 0, m = n.names.length; c < m; c++)
      if (n.names[c].test(d)) return !0;
    return !1;
  }
  function s(d) {
    return d
      .toString()
      .substring(2, d.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  function l(d) {
    return d instanceof Error ? d.stack || d.message : d;
  }
  function u() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
  }
  return n.enable(n.load()), n;
}
var Mm = $m;
(function (e, t) {
  (t.formatArgs = r),
    (t.save = o),
    (t.load = i),
    (t.useColors = n),
    (t.storage = a()),
    (t.destroy = (() => {
      let l = !1;
      return () => {
        l ||
          ((l = !0),
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
          ));
      };
    })()),
    (t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ]);
  function n() {
    return typeof window < "u" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator < "u" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < "u" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function r(l) {
    if (
      ((l[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        l[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        e.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    const u = "color: " + this.color;
    l.splice(1, 0, u, "color: inherit");
    let d = 0,
      c = 0;
    l[0].replace(/%[a-zA-Z%]/g, (m) => {
      m !== "%%" && (d++, m === "%c" && (c = d));
    }),
      l.splice(c, 0, u);
  }
  t.log = console.debug || console.log || (() => {});
  function o(l) {
    try {
      l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
    } catch {}
  }
  function i() {
    let l;
    try {
      l = t.storage.getItem("debug");
    } catch {}
    return !l && typeof process < "u" && "env" in process && (l = {}.DEBUG), l;
  }
  function a() {
    try {
      return localStorage;
    } catch {}
  }
  e.exports = Mm(t);
  const { formatters: s } = e.exports;
  s.j = function (l) {
    try {
      return JSON.stringify(l);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(Rl, Rl.exports);
var zm = Rl.exports;
const jm = Sr(zm),
  Dt = jm("ladle"),
  k2 = "%[a-f0-9]{2}",
  F0 = new RegExp("(" + k2 + ")|([^%]+?)", "gi"),
  O0 = new RegExp("(" + k2 + ")+", "gi");
function Nl(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {}
  if (e.length === 1) return e;
  t = t || 1;
  const n = e.slice(0, t),
    r = e.slice(t);
  return Array.prototype.concat.call([], Nl(n), Nl(r));
}
function Um(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    let t = e.match(F0) || [];
    for (let n = 1; n < t.length; n++)
      (e = Nl(t, n).join("")), (t = e.match(F0) || []);
    return e;
  }
}
function Vm(e) {
  const t = { "%FE%FF": "��", "%FF%FE": "��" };
  let n = O0.exec(e);
  for (; n; ) {
    try {
      t[n[0]] = decodeURIComponent(n[0]);
    } catch {
      const o = Um(n[0]);
      o !== n[0] && (t[n[0]] = o);
    }
    n = O0.exec(e);
  }
  t["%C2"] = "�";
  const r = Object.keys(t);
  for (const o of r) e = e.replace(new RegExp(o, "g"), t[o]);
  return e;
}
function Hm(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Expected `encodedURI` to be of type `string`, got `" + typeof e + "`"
    );
  try {
    return decodeURIComponent(e);
  } catch {
    return Vm(e);
  }
}
function D2(e, t) {
  if (!(typeof e == "string" && typeof t == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "" || t === "") return [];
  const n = e.indexOf(t);
  return n === -1 ? [] : [e.slice(0, n), e.slice(n + t.length)];
}
function Wm(e, t) {
  const n = {};
  if (Array.isArray(t))
    for (const r of t) {
      const o = Object.getOwnPropertyDescriptor(e, r);
      o != null && o.enumerable && Object.defineProperty(n, r, o);
    }
  else
    for (const r of Reflect.ownKeys(e)) {
      const o = Object.getOwnPropertyDescriptor(e, r);
      if (o.enumerable) {
        const i = e[r];
        t(r, i, e) && Object.defineProperty(n, r, o);
      }
    }
  return n;
}
const Gm = (e) => e == null,
  Ym = (e) =>
    encodeURIComponent(e).replace(
      /[!'()*]/g,
      (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`
    ),
  Bl = Symbol("encodeFragmentIdentifier");
function Zm(e) {
  switch (e.arrayFormat) {
    case "index":
      return (t) => (n, r) => {
        const o = n.length;
        return r === void 0 ||
          (e.skipNull && r === null) ||
          (e.skipEmptyString && r === "")
          ? n
          : r === null
          ? [...n, [Se(t, e), "[", o, "]"].join("")]
          : [...n, [Se(t, e), "[", Se(o, e), "]=", Se(r, e)].join("")];
      };
    case "bracket":
      return (t) => (n, r) =>
        r === void 0 ||
        (e.skipNull && r === null) ||
        (e.skipEmptyString && r === "")
          ? n
          : r === null
          ? [...n, [Se(t, e), "[]"].join("")]
          : [...n, [Se(t, e), "[]=", Se(r, e)].join("")];
    case "colon-list-separator":
      return (t) => (n, r) =>
        r === void 0 ||
        (e.skipNull && r === null) ||
        (e.skipEmptyString && r === "")
          ? n
          : r === null
          ? [...n, [Se(t, e), ":list="].join("")]
          : [...n, [Se(t, e), ":list=", Se(r, e)].join("")];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (n) => (r, o) =>
        o === void 0 ||
        (e.skipNull && o === null) ||
        (e.skipEmptyString && o === "")
          ? r
          : ((o = o === null ? "" : o),
            r.length === 0
              ? [[Se(n, e), t, Se(o, e)].join("")]
              : [[r, Se(o, e)].join(e.arrayFormatSeparator)]);
    }
    default:
      return (t) => (n, r) =>
        r === void 0 ||
        (e.skipNull && r === null) ||
        (e.skipEmptyString && r === "")
          ? n
          : r === null
          ? [...n, Se(t, e)]
          : [...n, [Se(t, e), "=", Se(r, e)].join("")];
  }
}
function Qm(e) {
  let t;
  switch (e.arrayFormat) {
    case "index":
      return (n, r, o) => {
        if (((t = /\[(\d*)]$/.exec(n)), (n = n.replace(/\[\d*]$/, "")), !t)) {
          o[n] = r;
          return;
        }
        o[n] === void 0 && (o[n] = {}), (o[n][t[1]] = r);
      };
    case "bracket":
      return (n, r, o) => {
        if (((t = /(\[])$/.exec(n)), (n = n.replace(/\[]$/, "")), !t)) {
          o[n] = r;
          return;
        }
        if (o[n] === void 0) {
          o[n] = [r];
          return;
        }
        o[n] = [...o[n], r];
      };
    case "colon-list-separator":
      return (n, r, o) => {
        if (((t = /(:list)$/.exec(n)), (n = n.replace(/:list$/, "")), !t)) {
          o[n] = r;
          return;
        }
        if (o[n] === void 0) {
          o[n] = [r];
          return;
        }
        o[n] = [...o[n], r];
      };
    case "comma":
    case "separator":
      return (n, r, o) => {
        const i = typeof r == "string" && r.includes(e.arrayFormatSeparator),
          a =
            typeof r == "string" &&
            !i &&
            Lt(r, e).includes(e.arrayFormatSeparator);
        r = a ? Lt(r, e) : r;
        const s =
          i || a
            ? r.split(e.arrayFormatSeparator).map((l) => Lt(l, e))
            : r === null
            ? r
            : Lt(r, e);
        o[n] = s;
      };
    case "bracket-separator":
      return (n, r, o) => {
        const i = /(\[])$/.test(n);
        if (((n = n.replace(/\[]$/, "")), !i)) {
          o[n] = r && Lt(r, e);
          return;
        }
        const a =
          r === null
            ? []
            : r.split(e.arrayFormatSeparator).map((s) => Lt(s, e));
        if (o[n] === void 0) {
          o[n] = a;
          return;
        }
        o[n] = [...o[n], ...a];
      };
    default:
      return (n, r, o) => {
        if (o[n] === void 0) {
          o[n] = r;
          return;
        }
        o[n] = [...[o[n]].flat(), r];
      };
  }
}
function x2(e) {
  if (typeof e != "string" || e.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function Se(e, t) {
  return t.encode ? (t.strict ? Ym(e) : encodeURIComponent(e)) : e;
}
function Lt(e, t) {
  return t.decode ? Hm(e) : e;
}
function F2(e) {
  return Array.isArray(e)
    ? e.sort()
    : typeof e == "object"
    ? F2(Object.keys(e))
        .sort((t, n) => Number(t) - Number(n))
        .map((t) => e[t])
    : e;
}
function O2(e) {
  const t = e.indexOf("#");
  return t !== -1 && (e = e.slice(0, t)), e;
}
function Xm(e) {
  let t = "";
  const n = e.indexOf("#");
  return n !== -1 && (t = e.slice(n)), t;
}
function T0(e, t) {
  return (
    t.parseNumbers &&
    !Number.isNaN(Number(e)) &&
    typeof e == "string" &&
    e.trim() !== ""
      ? (e = Number(e))
      : t.parseBooleans &&
        e !== null &&
        (e.toLowerCase() === "true" || e.toLowerCase() === "false") &&
        (e = e.toLowerCase() === "true"),
    e
  );
}
function Zs(e) {
  e = O2(e);
  const t = e.indexOf("?");
  return t === -1 ? "" : e.slice(t + 1);
}
function Qs(e, t) {
  (t = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...t,
  }),
    x2(t.arrayFormatSeparator);
  const n = Qm(t),
    r = Object.create(null);
  if (typeof e != "string" || ((e = e.trim().replace(/^[?#&]/, "")), !e))
    return r;
  for (const o of e.split("&")) {
    if (o === "") continue;
    const i = t.decode ? o.replace(/\+/g, " ") : o;
    let [a, s] = D2(i, "=");
    a === void 0 && (a = i),
      (s =
        s === void 0
          ? null
          : ["comma", "separator", "bracket-separator"].includes(t.arrayFormat)
          ? s
          : Lt(s, t)),
      n(Lt(a, t), s, r);
  }
  for (const [o, i] of Object.entries(r))
    if (typeof i == "object" && i !== null)
      for (const [a, s] of Object.entries(i)) i[a] = T0(s, t);
    else r[o] = T0(i, t);
  return t.sort === !1
    ? r
    : (t.sort === !0
        ? Object.keys(r).sort()
        : Object.keys(r).sort(t.sort)
      ).reduce((o, i) => {
        const a = r[i];
        return (
          a && typeof a == "object" && !Array.isArray(a)
            ? (o[i] = F2(a))
            : (o[i] = a),
          o
        );
      }, Object.create(null));
}
function T2(e, t) {
  if (!e) return "";
  (t = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...t,
  }),
    x2(t.arrayFormatSeparator);
  const n = (a) =>
      (t.skipNull && Gm(e[a])) || (t.skipEmptyString && e[a] === ""),
    r = Zm(t),
    o = {};
  for (const [a, s] of Object.entries(e)) n(a) || (o[a] = s);
  const i = Object.keys(o);
  return (
    t.sort !== !1 && i.sort(t.sort),
    i
      .map((a) => {
        const s = e[a];
        return s === void 0
          ? ""
          : s === null
          ? Se(a, t)
          : Array.isArray(s)
          ? s.length === 0 && t.arrayFormat === "bracket-separator"
            ? Se(a, t) + "[]"
            : s.reduce(r(a), []).join("&")
          : Se(a, t) + "=" + Se(s, t);
      })
      .filter((a) => a.length > 0)
      .join("&")
  );
}
function R2(e, t) {
  var o;
  t = { decode: !0, ...t };
  let [n, r] = D2(e, "#");
  return (
    n === void 0 && (n = e),
    {
      url:
        ((o = n == null ? void 0 : n.split("?")) == null ? void 0 : o[0]) ?? "",
      query: Qs(Zs(e), t),
      ...(t && t.parseFragmentIdentifier && r
        ? { fragmentIdentifier: Lt(r, t) }
        : {}),
    }
  );
}
function N2(e, t) {
  t = { encode: !0, strict: !0, [Bl]: !0, ...t };
  const n = O2(e.url).split("?")[0] || "",
    r = Zs(e.url),
    o = { ...Qs(r, { sort: !1 }), ...e.query };
  let i = T2(o, t);
  i && (i = `?${i}`);
  let a = Xm(e.url);
  if (e.fragmentIdentifier) {
    const s = new URL(n);
    (s.hash = e.fragmentIdentifier),
      (a = t[Bl] ? s.hash : `#${e.fragmentIdentifier}`);
  }
  return `${n}${i}${a}`;
}
function B2(e, t, n) {
  n = { parseFragmentIdentifier: !0, [Bl]: !1, ...n };
  const { url: r, query: o, fragmentIdentifier: i } = R2(e, n);
  return N2({ url: r, query: Wm(o, t), fragmentIdentifier: i }, n);
}
function qm(e, t, n) {
  const r = Array.isArray(t) ? (o) => !t.includes(o) : (o, i) => !t(o, i);
  return B2(e, r, n);
}
const Wt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        exclude: qm,
        extract: Zs,
        parse: Qs,
        parseUrl: R2,
        pick: B2,
        stringify: T2,
        stringifyUrl: N2,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Yn = "-",
  I2 = (e, t) => Wt.parse(e).story || t,
  Km = (e) => !!Wt.parse(e).story,
  L2 = (e) =>
    typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1),
  P2 = (e) =>
    e
      ? e
          .split(`${Yn}${Yn}`)
          .reverse()
          .map((t) => L2(t.replace(/-/g, " ")))
          .join(" - ")
      : "",
  Ya = (e, t, n) => {
    const r = [],
      o = (a, s, l, u) => {
        const d = s.shift();
        let c = !!n,
          m = [];
        l[0] === d && ((m = [...l.slice(1)]), (c = !0));
        const C = a.findIndex((v) => v.subId === d);
        d &&
          (C === -1 &&
            a.push({
              id: `${u}${d}`,
              subId: d,
              name: L2(d.replace(/-/g, " ")),
              isLinkable: s.length === 0,
              isExpanded: c,
              isFocused: !1,
              children: [],
            }),
          o(a[C > -1 ? C : a.length - 1].children, s, m, `${u}${d}--`));
      },
      i = t ? t.split(`${Yn}${Yn}`) : [];
    return (
      e.forEach((a) => {
        const s = a.split(`${Yn}${Yn}`);
        o(r, s, i, "");
      }),
      r
    );
  },
  Jm = (e, t) => {
    const n = e.split("--"),
      r = t.split("--"),
      o = Math.min(n.length, r.length);
    for (let i = 0; i < o; i++)
      if (n[i] !== r[i])
        return !n[i + 1] && r[i + 1]
          ? 1
          : (n[i + 1] && !r[i + 1]) || [n[i], r[i]].sort()[0] === n[i]
          ? -1
          : 1;
    return 0;
  },
  $2 = (e, t) => {
    const n = e.sort(Jm);
    let r = [...n];
    Array.isArray(t) ? (r = t) : (r = t(n));
    const o = new Set();
    return (
      r.forEach((i) => {
        const a = i.toLowerCase();
        if (a.includes("*")) {
          const s = a.split("*")[0];
          n.forEach((l) => {
            l.startsWith(s) && o.add(l);
          });
        } else {
          if (!n.includes(a))
            throw new Error(
              `Story "${i}" does not exist in your storybook. Please check your storyOrder config.`
            );
          o.add(a);
        }
      }),
      [...o]
    );
  };
var Fi = { exports: {} };
Fi.exports;
(function (e, t) {
  var n = 200,
    r = "__lodash_hash_undefined__",
    o = 800,
    i = 16,
    a = 9007199254740991,
    s = "[object Arguments]",
    l = "[object Array]",
    u = "[object AsyncFunction]",
    d = "[object Boolean]",
    c = "[object Date]",
    m = "[object Error]",
    C = "[object Function]",
    v = "[object GeneratorFunction]",
    p = "[object Map]",
    E = "[object Number]",
    h = "[object Null]",
    f = "[object Object]",
    g = "[object Proxy]",
    _ = "[object RegExp]",
    D = "[object Set]",
    T = "[object String]",
    k = "[object Undefined]",
    x = "[object WeakMap]",
    P = "[object ArrayBuffer]",
    $ = "[object DataView]",
    ee = "[object Float32Array]",
    R = "[object Float64Array]",
    M = "[object Int8Array]",
    j = "[object Int16Array]",
    Q = "[object Int32Array]",
    q = "[object Uint8Array]",
    ne = "[object Uint8ClampedArray]",
    F = "[object Uint16Array]",
    L = "[object Uint32Array]",
    I = /[\\^$.*+?()[\]{}|]/g,
    G = /^\[object .+?Constructor\]$/,
    J = /^(?:0|[1-9]\d*)$/,
    K = {};
  (K[ee] = K[R] = K[M] = K[j] = K[Q] = K[q] = K[ne] = K[F] = K[L] = !0),
    (K[s] =
      K[l] =
      K[P] =
      K[d] =
      K[$] =
      K[c] =
      K[m] =
      K[C] =
      K[p] =
      K[E] =
      K[f] =
      K[_] =
      K[D] =
      K[T] =
      K[x] =
        !1);
  var ce = typeof Wo == "object" && Wo && Wo.Object === Object && Wo,
    ot = typeof self == "object" && self && self.Object === Object && self,
    de = ce || ot || Function("return this")(),
    De = t && !t.nodeType && t,
    it = De && !0 && e && !e.nodeType && e,
    Yt = it && it.exports === De,
    Or = Yt && ce.process,
    Bo = (function () {
      try {
        var y = it && it.require && it.require("util").types;
        return y || (Or && Or.binding && Or.binding("util"));
      } catch {}
    })(),
    Io = Bo && Bo.isTypedArray;
  function Ba(y, b, S) {
    switch (S.length) {
      case 0:
        return y.call(b);
      case 1:
        return y.call(b, S[0]);
      case 2:
        return y.call(b, S[0], S[1]);
      case 3:
        return y.call(b, S[0], S[1], S[2]);
    }
    return y.apply(b, S);
  }
  function X(y, b) {
    for (var S = -1, V = Array(y); ++S < y; ) V[S] = b(S);
    return V;
  }
  function zn(y) {
    return function (b) {
      return y(b);
    };
  }
  function Lo(y, b) {
    return y == null ? void 0 : y[b];
  }
  function Tr(y, b) {
    return function (S) {
      return y(b(S));
    };
  }
  var Fh = Array.prototype,
    Oh = Function.prototype,
    Po = Object.prototype,
    Ia = de["__core-js_shared__"],
    $o = Oh.toString,
    Rt = Po.hasOwnProperty,
    u0 = (function () {
      var y = /[^.]+$/.exec((Ia && Ia.keys && Ia.keys.IE_PROTO) || "");
      return y ? "Symbol(src)_1." + y : "";
    })(),
    c0 = Po.toString,
    Th = $o.call(Object),
    Rh = RegExp(
      "^" +
        $o
          .call(Rt)
          .replace(I, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    ),
    Mo = Yt ? de.Buffer : void 0,
    d0 = de.Symbol,
    f0 = de.Uint8Array,
    p0 = Mo ? Mo.allocUnsafe : void 0,
    h0 = Tr(Object.getPrototypeOf, Object),
    m0 = Object.create,
    Nh = Po.propertyIsEnumerable,
    Bh = Fh.splice,
    En = d0 ? d0.toStringTag : void 0,
    zo = (function () {
      try {
        var y = $a(Object, "defineProperty");
        return y({}, "", {}), y;
      } catch {}
    })(),
    Ih = Mo ? Mo.isBuffer : void 0,
    g0 = Math.max,
    Lh = Date.now,
    y0 = $a(de, "Map"),
    Rr = $a(Object, "create"),
    Ph = (function () {
      function y() {}
      return function (b) {
        if (!wn(b)) return {};
        if (m0) return m0(b);
        y.prototype = b;
        var S = new y();
        return (y.prototype = void 0), S;
      };
    })();
  function An(y) {
    var b = -1,
      S = y == null ? 0 : y.length;
    for (this.clear(); ++b < S; ) {
      var V = y[b];
      this.set(V[0], V[1]);
    }
  }
  function $h() {
    (this.__data__ = Rr ? Rr(null) : {}), (this.size = 0);
  }
  function Mh(y) {
    var b = this.has(y) && delete this.__data__[y];
    return (this.size -= b ? 1 : 0), b;
  }
  function zh(y) {
    var b = this.__data__;
    if (Rr) {
      var S = b[y];
      return S === r ? void 0 : S;
    }
    return Rt.call(b, y) ? b[y] : void 0;
  }
  function jh(y) {
    var b = this.__data__;
    return Rr ? b[y] !== void 0 : Rt.call(b, y);
  }
  function Uh(y, b) {
    var S = this.__data__;
    return (
      (this.size += this.has(y) ? 0 : 1),
      (S[y] = Rr && b === void 0 ? r : b),
      this
    );
  }
  (An.prototype.clear = $h),
    (An.prototype.delete = Mh),
    (An.prototype.get = zh),
    (An.prototype.has = jh),
    (An.prototype.set = Uh);
  function Nt(y) {
    var b = -1,
      S = y == null ? 0 : y.length;
    for (this.clear(); ++b < S; ) {
      var V = y[b];
      this.set(V[0], V[1]);
    }
  }
  function Vh() {
    (this.__data__ = []), (this.size = 0);
  }
  function Hh(y) {
    var b = this.__data__,
      S = jo(b, y);
    if (S < 0) return !1;
    var V = b.length - 1;
    return S == V ? b.pop() : Bh.call(b, S, 1), --this.size, !0;
  }
  function Wh(y) {
    var b = this.__data__,
      S = jo(b, y);
    return S < 0 ? void 0 : b[S][1];
  }
  function Gh(y) {
    return jo(this.__data__, y) > -1;
  }
  function Yh(y, b) {
    var S = this.__data__,
      V = jo(S, y);
    return V < 0 ? (++this.size, S.push([y, b])) : (S[V][1] = b), this;
  }
  (Nt.prototype.clear = Vh),
    (Nt.prototype.delete = Hh),
    (Nt.prototype.get = Wh),
    (Nt.prototype.has = Gh),
    (Nt.prototype.set = Yh);
  function jn(y) {
    var b = -1,
      S = y == null ? 0 : y.length;
    for (this.clear(); ++b < S; ) {
      var V = y[b];
      this.set(V[0], V[1]);
    }
  }
  function Zh() {
    (this.size = 0),
      (this.__data__ = {
        hash: new An(),
        map: new (y0 || Nt)(),
        string: new An(),
      });
  }
  function Qh(y) {
    var b = Vo(this, y).delete(y);
    return (this.size -= b ? 1 : 0), b;
  }
  function Xh(y) {
    return Vo(this, y).get(y);
  }
  function qh(y) {
    return Vo(this, y).has(y);
  }
  function Kh(y, b) {
    var S = Vo(this, y),
      V = S.size;
    return S.set(y, b), (this.size += S.size == V ? 0 : 1), this;
  }
  (jn.prototype.clear = Zh),
    (jn.prototype.delete = Qh),
    (jn.prototype.get = Xh),
    (jn.prototype.has = qh),
    (jn.prototype.set = Kh);
  function Un(y) {
    var b = (this.__data__ = new Nt(y));
    this.size = b.size;
  }
  function Jh() {
    (this.__data__ = new Nt()), (this.size = 0);
  }
  function em(y) {
    var b = this.__data__,
      S = b.delete(y);
    return (this.size = b.size), S;
  }
  function tm(y) {
    return this.__data__.get(y);
  }
  function nm(y) {
    return this.__data__.has(y);
  }
  function rm(y, b) {
    var S = this.__data__;
    if (S instanceof Nt) {
      var V = S.__data__;
      if (!y0 || V.length < n - 1)
        return V.push([y, b]), (this.size = ++S.size), this;
      S = this.__data__ = new jn(V);
    }
    return S.set(y, b), (this.size = S.size), this;
  }
  (Un.prototype.clear = Jh),
    (Un.prototype.delete = em),
    (Un.prototype.get = tm),
    (Un.prototype.has = nm),
    (Un.prototype.set = rm);
  function om(y, b) {
    var S = ja(y),
      V = !S && za(y),
      ae = !S && !V && C0(y),
      fe = !S && !V && !ae && _0(y),
      ge = S || V || ae || fe,
      ie = ge ? X(y.length, String) : [],
      ye = ie.length;
    for (var at in y)
      (b || Rt.call(y, at)) &&
        !(
          ge &&
          (at == "length" ||
            (ae && (at == "offset" || at == "parent")) ||
            (fe &&
              (at == "buffer" || at == "byteLength" || at == "byteOffset")) ||
            A0(at, ye))
        ) &&
        ie.push(at);
    return ie;
  }
  function La(y, b, S) {
    ((S !== void 0 && !Ho(y[b], S)) || (S === void 0 && !(b in y))) &&
      Pa(y, b, S);
  }
  function im(y, b, S) {
    var V = y[b];
    (!(Rt.call(y, b) && Ho(V, S)) || (S === void 0 && !(b in y))) &&
      Pa(y, b, S);
  }
  function jo(y, b) {
    for (var S = y.length; S--; ) if (Ho(y[S][0], b)) return S;
    return -1;
  }
  function Pa(y, b, S) {
    b == "__proto__" && zo
      ? zo(y, b, { configurable: !0, enumerable: !0, value: S, writable: !0 })
      : (y[b] = S);
  }
  var am = Em();
  function Uo(y) {
    return y == null
      ? y === void 0
        ? k
        : h
      : En && En in Object(y)
      ? Am(y)
      : km(y);
  }
  function v0(y) {
    return Nr(y) && Uo(y) == s;
  }
  function lm(y) {
    if (!wn(y) || _m(y)) return !1;
    var b = Va(y) ? Rh : G;
    return b.test(Om(y));
  }
  function sm(y) {
    return Nr(y) && b0(y.length) && !!K[Uo(y)];
  }
  function um(y) {
    if (!wn(y)) return Sm(y);
    var b = w0(y),
      S = [];
    for (var V in y) (V == "constructor" && (b || !Rt.call(y, V))) || S.push(V);
    return S;
  }
  function E0(y, b, S, V, ae) {
    y !== b &&
      am(
        b,
        function (fe, ge) {
          if ((ae || (ae = new Un()), wn(fe))) cm(y, b, ge, S, E0, V, ae);
          else {
            var ie = V ? V(Ma(y, ge), fe, ge + "", y, b, ae) : void 0;
            ie === void 0 && (ie = fe), La(y, ge, ie);
          }
        },
        S0
      );
  }
  function cm(y, b, S, V, ae, fe, ge) {
    var ie = Ma(y, S),
      ye = Ma(b, S),
      at = ge.get(ye);
    if (at) {
      La(y, S, at);
      return;
    }
    var Qe = fe ? fe(ie, ye, S + "", y, b, ge) : void 0,
      Br = Qe === void 0;
    if (Br) {
      var Ha = ja(ye),
        Wa = !Ha && C0(ye),
        D0 = !Ha && !Wa && _0(ye);
      (Qe = ye),
        Ha || Wa || D0
          ? ja(ie)
            ? (Qe = ie)
            : Tm(ie)
            ? (Qe = gm(ie))
            : Wa
            ? ((Br = !1), (Qe = pm(ye, !0)))
            : D0
            ? ((Br = !1), (Qe = mm(ye, !0)))
            : (Qe = [])
          : Rm(ye) || za(ye)
          ? ((Qe = ie),
            za(ie) ? (Qe = Nm(ie)) : (!wn(ie) || Va(ie)) && (Qe = wm(ye)))
          : (Br = !1);
    }
    Br && (ge.set(ye, Qe), ae(Qe, ye, V, fe, ge), ge.delete(ye)), La(y, S, Qe);
  }
  function dm(y, b) {
    return xm(Dm(y, b, k0), y + "");
  }
  var fm = zo
    ? function (y, b) {
        return zo(y, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Im(b),
          writable: !0,
        });
      }
    : k0;
  function pm(y, b) {
    if (b) return y.slice();
    var S = y.length,
      V = p0 ? p0(S) : new y.constructor(S);
    return y.copy(V), V;
  }
  function hm(y) {
    var b = new y.constructor(y.byteLength);
    return new f0(b).set(new f0(y)), b;
  }
  function mm(y, b) {
    var S = b ? hm(y.buffer) : y.buffer;
    return new y.constructor(S, y.byteOffset, y.length);
  }
  function gm(y, b) {
    var S = -1,
      V = y.length;
    for (b || (b = Array(V)); ++S < V; ) b[S] = y[S];
    return b;
  }
  function ym(y, b, S, V) {
    var ae = !S;
    S || (S = {});
    for (var fe = -1, ge = b.length; ++fe < ge; ) {
      var ie = b[fe],
        ye = V ? V(S[ie], y[ie], ie, S, y) : void 0;
      ye === void 0 && (ye = y[ie]), ae ? Pa(S, ie, ye) : im(S, ie, ye);
    }
    return S;
  }
  function vm(y) {
    return dm(function (b, S) {
      var V = -1,
        ae = S.length,
        fe = ae > 1 ? S[ae - 1] : void 0,
        ge = ae > 2 ? S[2] : void 0;
      for (
        fe = y.length > 3 && typeof fe == "function" ? (ae--, fe) : void 0,
          ge && Cm(S[0], S[1], ge) && ((fe = ae < 3 ? void 0 : fe), (ae = 1)),
          b = Object(b);
        ++V < ae;

      ) {
        var ie = S[V];
        ie && y(b, ie, V, fe);
      }
      return b;
    });
  }
  function Em(y) {
    return function (b, S, V) {
      for (var ae = -1, fe = Object(b), ge = V(b), ie = ge.length; ie--; ) {
        var ye = ge[y ? ie : ++ae];
        if (S(fe[ye], ye, fe) === !1) break;
      }
      return b;
    };
  }
  function Vo(y, b) {
    var S = y.__data__;
    return bm(b) ? S[typeof b == "string" ? "string" : "hash"] : S.map;
  }
  function $a(y, b) {
    var S = Lo(y, b);
    return lm(S) ? S : void 0;
  }
  function Am(y) {
    var b = Rt.call(y, En),
      S = y[En];
    try {
      y[En] = void 0;
      var V = !0;
    } catch {}
    var ae = c0.call(y);
    return V && (b ? (y[En] = S) : delete y[En]), ae;
  }
  function wm(y) {
    return typeof y.constructor == "function" && !w0(y) ? Ph(h0(y)) : {};
  }
  function A0(y, b) {
    var S = typeof y;
    return (
      (b = b ?? a),
      !!b &&
        (S == "number" || (S != "symbol" && J.test(y))) &&
        y > -1 &&
        y % 1 == 0 &&
        y < b
    );
  }
  function Cm(y, b, S) {
    if (!wn(S)) return !1;
    var V = typeof b;
    return (V == "number" ? Ua(S) && A0(b, S.length) : V == "string" && b in S)
      ? Ho(S[b], y)
      : !1;
  }
  function bm(y) {
    var b = typeof y;
    return b == "string" || b == "number" || b == "symbol" || b == "boolean"
      ? y !== "__proto__"
      : y === null;
  }
  function _m(y) {
    return !!u0 && u0 in y;
  }
  function w0(y) {
    var b = y && y.constructor,
      S = (typeof b == "function" && b.prototype) || Po;
    return y === S;
  }
  function Sm(y) {
    var b = [];
    if (y != null) for (var S in Object(y)) b.push(S);
    return b;
  }
  function km(y) {
    return c0.call(y);
  }
  function Dm(y, b, S) {
    return (
      (b = g0(b === void 0 ? y.length - 1 : b, 0)),
      function () {
        for (
          var V = arguments, ae = -1, fe = g0(V.length - b, 0), ge = Array(fe);
          ++ae < fe;

        )
          ge[ae] = V[b + ae];
        ae = -1;
        for (var ie = Array(b + 1); ++ae < b; ) ie[ae] = V[ae];
        return (ie[b] = S(ge)), Ba(y, this, ie);
      }
    );
  }
  function Ma(y, b) {
    if (!(b === "constructor" && typeof y[b] == "function") && b != "__proto__")
      return y[b];
  }
  var xm = Fm(fm);
  function Fm(y) {
    var b = 0,
      S = 0;
    return function () {
      var V = Lh(),
        ae = i - (V - S);
      if (((S = V), ae > 0)) {
        if (++b >= o) return arguments[0];
      } else b = 0;
      return y.apply(void 0, arguments);
    };
  }
  function Om(y) {
    if (y != null) {
      try {
        return $o.call(y);
      } catch {}
      try {
        return y + "";
      } catch {}
    }
    return "";
  }
  function Ho(y, b) {
    return y === b || (y !== y && b !== b);
  }
  var za = v0(
      (function () {
        return arguments;
      })()
    )
      ? v0
      : function (y) {
          return Nr(y) && Rt.call(y, "callee") && !Nh.call(y, "callee");
        },
    ja = Array.isArray;
  function Ua(y) {
    return y != null && b0(y.length) && !Va(y);
  }
  function Tm(y) {
    return Nr(y) && Ua(y);
  }
  var C0 = Ih || Lm;
  function Va(y) {
    if (!wn(y)) return !1;
    var b = Uo(y);
    return b == C || b == v || b == u || b == g;
  }
  function b0(y) {
    return typeof y == "number" && y > -1 && y % 1 == 0 && y <= a;
  }
  function wn(y) {
    var b = typeof y;
    return y != null && (b == "object" || b == "function");
  }
  function Nr(y) {
    return y != null && typeof y == "object";
  }
  function Rm(y) {
    if (!Nr(y) || Uo(y) != f) return !1;
    var b = h0(y);
    if (b === null) return !0;
    var S = Rt.call(b, "constructor") && b.constructor;
    return typeof S == "function" && S instanceof S && $o.call(S) == Th;
  }
  var _0 = Io ? zn(Io) : sm;
  function Nm(y) {
    return ym(y, S0(y));
  }
  function S0(y) {
    return Ua(y) ? om(y, !0) : um(y);
  }
  var Bm = vm(function (y, b, S) {
    E0(y, b, S);
  });
  function Im(y) {
    return function () {
      return y;
    };
  }
  function k0(y) {
    return y;
  }
  function Lm() {
    return !1;
  }
  e.exports = Bm;
})(Fi, Fi.exports);
var eg = Fi.exports;
const tg = Sr(eg),
  ng = "modulepreload",
  rg = function (e) {
    return "/" + e;
  },
  R0 = {},
  W = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const o = document.getElementsByTagName("link");
    return Promise.all(
      n.map((i) => {
        if (((i = rg(i)), i in R0)) return;
        R0[i] = !0;
        const a = i.endsWith(".css"),
          s = a ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let d = o.length - 1; d >= 0; d--) {
            const c = o[d];
            if (c.href === i && (!a || c.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${i}"]${s}`)) return;
        const u = document.createElement("link");
        if (
          ((u.rel = a ? "stylesheet" : ng),
          a || ((u.as = "script"), (u.crossOrigin = "")),
          (u.href = i),
          document.head.appendChild(u),
          a)
        )
          return new Promise((d, c) => {
            u.addEventListener("load", d),
              u.addEventListener("error", () =>
                c(new Error(`Unable to preload CSS for ${i}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((i) => {
        const a = new Event("vite:preloadError", { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
          throw i;
      });
  };
var M2 = { exports: {} },
  oe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ko = Symbol.for("react.element"),
  og = Symbol.for("react.portal"),
  ig = Symbol.for("react.fragment"),
  ag = Symbol.for("react.strict_mode"),
  lg = Symbol.for("react.profiler"),
  sg = Symbol.for("react.provider"),
  ug = Symbol.for("react.context"),
  cg = Symbol.for("react.forward_ref"),
  dg = Symbol.for("react.suspense"),
  fg = Symbol.for("react.memo"),
  pg = Symbol.for("react.lazy"),
  N0 = Symbol.iterator;
function hg(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (N0 && e[N0]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var z2 = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  j2 = Object.assign,
  U2 = {};
function kr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = U2),
    (this.updater = n || z2);
}
kr.prototype.isReactComponent = {};
kr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
kr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function V2() {}
V2.prototype = kr.prototype;
function Xs(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = U2),
    (this.updater = n || z2);
}
var qs = (Xs.prototype = new V2());
qs.constructor = Xs;
j2(qs, kr.prototype);
qs.isPureReactComponent = !0;
var B0 = Array.isArray,
  H2 = Object.prototype.hasOwnProperty,
  Ks = { current: null },
  W2 = { key: !0, ref: !0, __self: !0, __source: !0 };
function G2(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (a = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      H2.call(t, r) && !W2.hasOwnProperty(r) && (o[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) o.children = n;
  else if (1 < s) {
    for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
    o.children = l;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) o[r] === void 0 && (o[r] = s[r]);
  return {
    $$typeof: ko,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: Ks.current,
  };
}
function mg(e, t) {
  return {
    $$typeof: ko,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Js(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ko;
}
function gg(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var I0 = /\/+/g;
function Za(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? gg("" + e.key)
    : t.toString(36);
}
function di(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else
    switch (i) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case ko:
          case og:
            a = !0;
        }
    }
  if (a)
    return (
      (a = e),
      (o = o(a)),
      (e = r === "" ? "." + Za(a, 0) : r),
      B0(o)
        ? ((n = ""),
          e != null && (n = e.replace(I0, "$&/") + "/"),
          di(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Js(o) &&
            (o = mg(
              o,
              n +
                (!o.key || (a && a.key === o.key)
                  ? ""
                  : ("" + o.key).replace(I0, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((a = 0), (r = r === "" ? "." : r + ":"), B0(e)))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var l = r + Za(i, s);
      a += di(i, t, n, l, o);
    }
  else if (((l = hg(e)), typeof l == "function"))
    for (e = l.call(e), s = 0; !(i = e.next()).done; )
      (i = i.value), (l = r + Za(i, s++)), (a += di(i, t, n, l, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return a;
}
function Go(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    di(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function yg(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ue = { current: null },
  fi = { transition: null },
  vg = {
    ReactCurrentDispatcher: Ue,
    ReactCurrentBatchConfig: fi,
    ReactCurrentOwner: Ks,
  };
oe.Children = {
  map: Go,
  forEach: function (e, t, n) {
    Go(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Go(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Go(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Js(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
oe.Component = kr;
oe.Fragment = ig;
oe.Profiler = lg;
oe.PureComponent = Xs;
oe.StrictMode = ag;
oe.Suspense = dg;
oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vg;
oe.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = j2({}, e.props),
    o = e.key,
    i = e.ref,
    a = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (a = Ks.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (l in t)
      H2.call(t, l) &&
        !W2.hasOwnProperty(l) &&
        (r[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    s = Array(l);
    for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: ko, type: e.type, key: o, ref: i, props: r, _owner: a };
};
oe.createContext = function (e) {
  return (
    (e = {
      $$typeof: ug,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: sg, _context: e }),
    (e.Consumer = e)
  );
};
oe.createElement = G2;
oe.createFactory = function (e) {
  var t = G2.bind(null, e);
  return (t.type = e), t;
};
oe.createRef = function () {
  return { current: null };
};
oe.forwardRef = function (e) {
  return { $$typeof: cg, render: e };
};
oe.isValidElement = Js;
oe.lazy = function (e) {
  return { $$typeof: pg, _payload: { _status: -1, _result: e }, _init: yg };
};
oe.memo = function (e, t) {
  return { $$typeof: fg, type: e, compare: t === void 0 ? null : t };
};
oe.startTransition = function (e) {
  var t = fi.transition;
  fi.transition = {};
  try {
    e();
  } finally {
    fi.transition = t;
  }
};
oe.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
oe.useCallback = function (e, t) {
  return Ue.current.useCallback(e, t);
};
oe.useContext = function (e) {
  return Ue.current.useContext(e);
};
oe.useDebugValue = function () {};
oe.useDeferredValue = function (e) {
  return Ue.current.useDeferredValue(e);
};
oe.useEffect = function (e, t) {
  return Ue.current.useEffect(e, t);
};
oe.useId = function () {
  return Ue.current.useId();
};
oe.useImperativeHandle = function (e, t, n) {
  return Ue.current.useImperativeHandle(e, t, n);
};
oe.useInsertionEffect = function (e, t) {
  return Ue.current.useInsertionEffect(e, t);
};
oe.useLayoutEffect = function (e, t) {
  return Ue.current.useLayoutEffect(e, t);
};
oe.useMemo = function (e, t) {
  return Ue.current.useMemo(e, t);
};
oe.useReducer = function (e, t, n) {
  return Ue.current.useReducer(e, t, n);
};
oe.useRef = function (e) {
  return Ue.current.useRef(e);
};
oe.useState = function (e) {
  return Ue.current.useState(e);
};
oe.useSyncExternalStore = function (e, t, n) {
  return Ue.current.useSyncExternalStore(e, t, n);
};
oe.useTransition = function () {
  return Ue.current.useTransition();
};
oe.version = "18.2.0";
M2.exports = oe;
var w = M2.exports;
const O = Sr(w),
  IC = S2({ __proto__: null, default: O }, [w]);
var Y2 = { exports: {} },
  da = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Eg = w,
  Ag = Symbol.for("react.element"),
  wg = Symbol.for("react.fragment"),
  Cg = Object.prototype.hasOwnProperty,
  bg = Eg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  _g = { key: !0, ref: !0, __self: !0, __source: !0 };
function Z2(e, t, n) {
  var r,
    o = {},
    i = null,
    a = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (a = t.ref);
  for (r in t) Cg.call(t, r) && !_g.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Ag,
    type: e,
    key: i,
    ref: a,
    props: o,
    _owner: bg.current,
  };
}
da.Fragment = wg;
da.jsx = Z2;
da.jsxs = Z2;
Y2.exports = da;
var eu = Y2.exports;
const io = eu.Fragment,
  A = eu.jsx,
  z = eu.jsxs,
  Q2 = w.createContext(void 0),
  L0 = Q2,
  Il = () => w.useContext(Q2);
function Ll() {
  return (
    (Ll = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Ll.apply(this, arguments)
  );
}
var X2 = ["shift", "alt", "meta", "mod", "ctrl"],
  Sg = {
    esc: "escape",
    return: "enter",
    ".": "period",
    ",": "comma",
    "-": "slash",
    " ": "space",
    "`": "backquote",
    "#": "backslash",
    "+": "bracketright",
    ShiftLeft: "shift",
    ShiftRight: "shift",
    AltLeft: "alt",
    AltRight: "alt",
    MetaLeft: "meta",
    MetaRight: "meta",
    OSLeft: "meta",
    OSRight: "meta",
    ControlLeft: "ctrl",
    ControlRight: "ctrl",
  };
function Jt(e) {
  return (Sg[e] || e)
    .trim()
    .toLowerCase()
    .replace(/key|digit|numpad|arrow/, "");
}
function kg(e) {
  return X2.includes(e);
}
function Qa(e, t) {
  return t === void 0 && (t = ","), e.split(t);
}
function Xa(e, t, n) {
  t === void 0 && (t = "+");
  var r = e
      .toLocaleLowerCase()
      .split(t)
      .map(function (a) {
        return Jt(a);
      }),
    o = {
      alt: r.includes("alt"),
      ctrl: r.includes("ctrl") || r.includes("control"),
      shift: r.includes("shift"),
      meta: r.includes("meta"),
      mod: r.includes("mod"),
    },
    i = r.filter(function (a) {
      return !X2.includes(a);
    });
  return Ll({}, o, { keys: i, description: n });
}
(function () {
  typeof document < "u" &&
    (document.addEventListener("keydown", function (e) {
      e.key !== void 0 && q2([Jt(e.key), Jt(e.code)]);
    }),
    document.addEventListener("keyup", function (e) {
      e.key !== void 0 && K2([Jt(e.key), Jt(e.code)]);
    })),
    typeof window < "u" &&
      window.addEventListener("blur", function () {
        en.clear();
      });
})();
var en = new Set();
function tu(e) {
  return Array.isArray(e);
}
function Dg(e, t) {
  t === void 0 && (t = ",");
  var n = tu(e) ? e : e.split(t);
  return n.every(function (r) {
    return en.has(r.trim().toLowerCase());
  });
}
function q2(e) {
  var t = Array.isArray(e) ? e : [e];
  en.has("meta") &&
    en.forEach(function (n) {
      return !kg(n) && en.delete(n.toLowerCase());
    }),
    t.forEach(function (n) {
      return en.add(n.toLowerCase());
    });
}
function K2(e) {
  var t = Array.isArray(e) ? e : [e];
  e === "meta"
    ? en.clear()
    : t.forEach(function (n) {
        return en.delete(n.toLowerCase());
      });
}
function xg(e, t, n) {
  ((typeof n == "function" && n(e, t)) || n === !0) && e.preventDefault();
}
function Fg(e, t, n) {
  return typeof n == "function" ? n(e, t) : n === !0 || n === void 0;
}
function Og(e) {
  return J2(e, ["input", "textarea", "select"]);
}
function J2(e, t) {
  var n = e.target;
  t === void 0 && (t = !1);
  var r = n && n.tagName;
  return tu(t)
    ? !!(
        r &&
        t &&
        t.some(function (o) {
          return o.toLowerCase() === r.toLowerCase();
        })
      )
    : !!(r && t && t === !0);
}
function Tg(e, t) {
  return e.length === 0 && t
    ? (console.warn(
        'A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>'
      ),
      !0)
    : t
    ? e.some(function (n) {
        return t.includes(n);
      }) || e.includes("*")
    : !0;
}
var Rg = function (t, n, r) {
    r === void 0 && (r = !1);
    var o = n.alt,
      i = n.meta,
      a = n.mod,
      s = n.shift,
      l = n.ctrl,
      u = n.keys,
      d = t.key,
      c = t.code,
      m = t.ctrlKey,
      C = t.metaKey,
      v = t.shiftKey,
      p = t.altKey,
      E = Jt(c),
      h = d.toLowerCase();
    if (!r) {
      if ((o === !p && h !== "alt") || (s === !v && h !== "shift")) return !1;
      if (a) {
        if (!C && !m) return !1;
      } else if (
        (i === !C && h !== "meta" && h !== "os") ||
        (l === !m && h !== "ctrl" && h !== "control")
      )
        return !1;
    }
    return u && u.length === 1 && (u.includes(h) || u.includes(E))
      ? !0
      : u
      ? Dg(u)
      : !u;
  },
  Ng = w.createContext(void 0),
  Bg = function () {
    return w.useContext(Ng);
  };
function ed(e, t) {
  return e && t && typeof e == "object" && typeof t == "object"
    ? Object.keys(e).length === Object.keys(t).length &&
        Object.keys(e).reduce(function (n, r) {
          return n && ed(e[r], t[r]);
        }, !0)
    : e === t;
}
var Ig = w.createContext({
    hotkeys: [],
    enabledScopes: [],
    toggleScope: function () {},
    enableScope: function () {},
    disableScope: function () {},
  }),
  Lg = function () {
    return w.useContext(Ig);
  };
function Pg(e) {
  var t = w.useRef(void 0);
  return ed(t.current, e) || (t.current = e), t.current;
}
var P0 = function (t) {
    t.stopPropagation(), t.preventDefault(), t.stopImmediatePropagation();
  },
  $g = typeof window < "u" ? w.useLayoutEffect : w.useEffect;
function ct(e, t, n, r) {
  var o = w.useRef(null),
    i = w.useRef(!1),
    a = n instanceof Array ? (r instanceof Array ? void 0 : r) : n,
    s = tu(e) ? e.join(a == null ? void 0 : a.splitKey) : e,
    l = n instanceof Array ? n : r instanceof Array ? r : void 0,
    u = w.useCallback(t, l ?? []),
    d = w.useRef(u);
  l ? (d.current = u) : (d.current = t);
  var c = Pg(a),
    m = Lg(),
    C = m.enabledScopes,
    v = Bg();
  return (
    $g(
      function () {
        if (
          !(
            (c == null ? void 0 : c.enabled) === !1 ||
            !Tg(C, c == null ? void 0 : c.scopes)
          )
        ) {
          var p = function (_, D) {
              var T;
              if (
                (D === void 0 && (D = !1),
                !(Og(_) && !J2(_, c == null ? void 0 : c.enableOnFormTags)) &&
                  !(
                    c != null &&
                    c.ignoreEventWhen != null &&
                    c.ignoreEventWhen(_)
                  ))
              ) {
                if (
                  o.current !== null &&
                  document.activeElement !== o.current &&
                  !o.current.contains(document.activeElement)
                ) {
                  P0(_);
                  return;
                }
                ((T = _.target) != null &&
                  T.isContentEditable &&
                  !(c != null && c.enableOnContentEditable)) ||
                  Qa(s, c == null ? void 0 : c.splitKey).forEach(function (k) {
                    var x,
                      P = Xa(k, c == null ? void 0 : c.combinationKey);
                    if (
                      Rg(_, P, c == null ? void 0 : c.ignoreModifiers) ||
                      ((x = P.keys) != null && x.includes("*"))
                    ) {
                      if (D && i.current) return;
                      if (
                        (xg(_, P, c == null ? void 0 : c.preventDefault),
                        !Fg(_, P, c == null ? void 0 : c.enabled))
                      ) {
                        P0(_);
                        return;
                      }
                      d.current(_, P), D || (i.current = !0);
                    }
                  });
              }
            },
            E = function (_) {
              _.key !== void 0 &&
                (q2(Jt(_.code)),
                (((c == null ? void 0 : c.keydown) === void 0 &&
                  (c == null ? void 0 : c.keyup) !== !0) ||
                  (c != null && c.keydown)) &&
                  p(_));
            },
            h = function (_) {
              _.key !== void 0 &&
                (K2(Jt(_.code)),
                (i.current = !1),
                c != null && c.keyup && p(_, !0));
            },
            f = o.current || (a == null ? void 0 : a.document) || document;
          return (
            f.addEventListener("keyup", h),
            f.addEventListener("keydown", E),
            v &&
              Qa(s, c == null ? void 0 : c.splitKey).forEach(function (g) {
                return v.addHotkey(
                  Xa(
                    g,
                    c == null ? void 0 : c.combinationKey,
                    c == null ? void 0 : c.description
                  )
                );
              }),
            function () {
              f.removeEventListener("keyup", h),
                f.removeEventListener("keydown", E),
                v &&
                  Qa(s, c == null ? void 0 : c.splitKey).forEach(function (g) {
                    return v.removeHotkey(
                      Xa(
                        g,
                        c == null ? void 0 : c.combinationKey,
                        c == null ? void 0 : c.description
                      )
                    );
                  });
            }
          );
        }
      },
      [s, c, C]
    ),
    o
  );
}
const Mg = () =>
    z("svg", {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("path", { d: "M18 6L6 18M6 6l12 12" }),
      ],
    }),
  zg = () =>
    A("svg", {
      viewBox: "0 0 24 24",
      strokeWidth: 0.5,
      stroke: "currentColor",
      fill: "currentColor",
      width: 24,
      height: 24,
      children: A("path", {
        d: "M22 14H9V5a4 4 0 00-8 0v3a1 1 0 002 0V5a2 2 0 014 0v10a8 8 0 0016 0 1 1 0 00-1-1zm-7 7a6.01 6.01 0 01-5.917-5h11.834A6.01 6.01 0 0115 21z",
      }),
    }),
  jg = () =>
    z("svg", {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("path", {
          d: "M16 4H9.5a3.5 3.5 0 000 7h.5M14 15V4M10 15V4M5 19h14M7 21l-2-2 2-2",
        }),
      ],
    }),
  Ug = () => (
    w.useEffect(
      () => (
        document.documentElement.removeAttribute("data-storyloaded"),
        () => document.documentElement.setAttribute("data-storyloaded", "")
      ),
      []
    ),
    A("div", {
      className: "ladle-ring-wrapper",
      children: z("div", {
        className: "ladle-ring",
        children: [A("div", {}), A("div", {}), A("div", {}), A("div", {})],
      }),
    })
  ),
  Vg = () =>
    z("svg", {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("path", { d: "M16 4h4v4M14 10l6-6M8 20H4v-4M4 20l6-6" }),
      ],
    }),
  Hg = () =>
    z("svg", {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        A("path", {
          d: "M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7",
        }),
        A("path", {
          d: "M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3",
        }),
        A("line", { x1: 9.7, y1: 17, x2: 14.3, y2: 17 }),
      ],
    }),
  Wg = () =>
    A("div", {
      style: { width: "10px", marginInlineEnd: "0.5em", flexShrink: 0 },
      children: A("svg", {
        fill: "currentColor",
        viewBox: "0 0 768 1024",
        children: A("path", {
          d: "M509 64l195 218v669q0 3-4 6t-9 3H77q-5 0-9-3t-4-6V73q0-3 4-6t9-3h432zm29-64H77Q45 0 22.5 21.5T0 73v878q0 30 22.5 51.5T77 1024h614q32 0 54.5-21.5T768 951V257zm-26 256V0h-64v256q0 26 19 45t45 19h253v-64H512z",
        }),
      }),
    }),
  Gg = ({ rotate: e }) =>
    A("div", {
      "aria-hidden": !0,
      style: {
        width: "10px",
        marginInlineEnd: "0.4em",
        marginTop: "-0.1em",
        transform: e ? "rotate(-90deg)" : void 0,
      },
      children: A("svg", {
        fill: "currentColor",
        viewBox: "0 0 1024 574",
        children: A("path", {
          d: "M1015 10q-10-10-23-10t-23 10L512 492 55 10Q45 0 32 0T9 10Q0 20 0 34t9 24l480 506q10 10 23 10t23-10l480-506q9-10 9-24t-9-24z",
        }),
      }),
    }),
  Yg = () =>
    z("svg", {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      children: [
        A("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        A("circle", { cx: 14, cy: 6, r: 2 }),
        A("line", { x1: 4, y1: 6, x2: 12, y2: 6 }),
        A("line", { x1: 16, y1: 6, x2: 20, y2: 6 }),
        A("circle", { cx: 8, cy: 12, r: 2 }),
        A("line", { x1: 4, y1: 12, x2: 6, y2: 12 }),
        A("line", { x1: 10, y1: 12, x2: 20, y2: 12 }),
        A("circle", { cx: 17, cy: 18, r: 2 }),
        A("line", { x1: 4, y1: 18, x2: 15, y2: 18 }),
        A("line", { x1: 19, y1: 18, x2: 20, y2: 18 }),
      ],
    }),
  Zg = () =>
    z("svg", {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("path", { d: "m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" }),
      ],
    }),
  Qg = () =>
    z("svg", {
      width: 24,
      height: 24,
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("circle", { cx: 12, cy: 12, r: 9 }),
        A("path", { d: "m10 16.5 2-3 2 3m-2-3v-2l3-1m-6 0 3 1" }),
        A("circle", { cx: 12, cy: 7.5, r: 0.5, fill: "currentColor" }),
      ],
    }),
  Xg = () =>
    z("svg", {
      width: 24,
      height: 24,
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("rect", { x: 13, y: 8, width: 8, height: 12, rx: 1 }),
        A("path", {
          d: "M18 8V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9M16 9h2",
        }),
      ],
    }),
  qg = () =>
    z("svg", {
      width: 24,
      height: 24,
      strokeWidth: 2,
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        A("path", { d: "M0 0h24v24H0z", stroke: "none" }),
        A("path", {
          d: "M18 8a3 3 0 0 1 0 6M10 8v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5",
        }),
        A("path", {
          d: "M12 8h0l4.524-3.77A.9.9 0 0 1 18 4.922v12.156a.9.9 0 0 1-1.476.692L12 14H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h8",
        }),
      ],
    });
var td = { exports: {} },
  nt = {},
  nd = { exports: {} },
  rd = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(F, L) {
    var I = F.length;
    F.push(L);
    e: for (; 0 < I; ) {
      var G = (I - 1) >>> 1,
        J = F[G];
      if (0 < o(J, L)) (F[G] = L), (F[I] = J), (I = G);
      else break e;
    }
  }
  function n(F) {
    return F.length === 0 ? null : F[0];
  }
  function r(F) {
    if (F.length === 0) return null;
    var L = F[0],
      I = F.pop();
    if (I !== L) {
      F[0] = I;
      e: for (var G = 0, J = F.length, K = J >>> 1; G < K; ) {
        var ce = 2 * (G + 1) - 1,
          ot = F[ce],
          de = ce + 1,
          De = F[de];
        if (0 > o(ot, I))
          de < J && 0 > o(De, ot)
            ? ((F[G] = De), (F[de] = I), (G = de))
            : ((F[G] = ot), (F[ce] = I), (G = ce));
        else if (de < J && 0 > o(De, I)) (F[G] = De), (F[de] = I), (G = de);
        else break e;
      }
    }
    return L;
  }
  function o(F, L) {
    var I = F.sortIndex - L.sortIndex;
    return I !== 0 ? I : F.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var a = Date,
      s = a.now();
    e.unstable_now = function () {
      return a.now() - s;
    };
  }
  var l = [],
    u = [],
    d = 1,
    c = null,
    m = 3,
    C = !1,
    v = !1,
    p = !1,
    E = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(F) {
    for (var L = n(u); L !== null; ) {
      if (L.callback === null) r(u);
      else if (L.startTime <= F)
        r(u), (L.sortIndex = L.expirationTime), t(l, L);
      else break;
      L = n(u);
    }
  }
  function _(F) {
    if (((p = !1), g(F), !v))
      if (n(l) !== null) (v = !0), q(D);
      else {
        var L = n(u);
        L !== null && ne(_, L.startTime - F);
      }
  }
  function D(F, L) {
    (v = !1), p && ((p = !1), h(x), (x = -1)), (C = !0);
    var I = m;
    try {
      for (
        g(L), c = n(l);
        c !== null && (!(c.expirationTime > L) || (F && !ee()));

      ) {
        var G = c.callback;
        if (typeof G == "function") {
          (c.callback = null), (m = c.priorityLevel);
          var J = G(c.expirationTime <= L);
          (L = e.unstable_now()),
            typeof J == "function" ? (c.callback = J) : c === n(l) && r(l),
            g(L);
        } else r(l);
        c = n(l);
      }
      if (c !== null) var K = !0;
      else {
        var ce = n(u);
        ce !== null && ne(_, ce.startTime - L), (K = !1);
      }
      return K;
    } finally {
      (c = null), (m = I), (C = !1);
    }
  }
  var T = !1,
    k = null,
    x = -1,
    P = 5,
    $ = -1;
  function ee() {
    return !(e.unstable_now() - $ < P);
  }
  function R() {
    if (k !== null) {
      var F = e.unstable_now();
      $ = F;
      var L = !0;
      try {
        L = k(!0, F);
      } finally {
        L ? M() : ((T = !1), (k = null));
      }
    } else T = !1;
  }
  var M;
  if (typeof f == "function")
    M = function () {
      f(R);
    };
  else if (typeof MessageChannel < "u") {
    var j = new MessageChannel(),
      Q = j.port2;
    (j.port1.onmessage = R),
      (M = function () {
        Q.postMessage(null);
      });
  } else
    M = function () {
      E(R, 0);
    };
  function q(F) {
    (k = F), T || ((T = !0), M());
  }
  function ne(F, L) {
    x = E(function () {
      F(e.unstable_now());
    }, L);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (F) {
      F.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || C || ((v = !0), q(D));
    }),
    (e.unstable_forceFrameRate = function (F) {
      0 > F || 125 < F
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (P = 0 < F ? Math.floor(1e3 / F) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (e.unstable_next = function (F) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var L = 3;
          break;
        default:
          L = m;
      }
      var I = m;
      m = L;
      try {
        return F();
      } finally {
        m = I;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (F, L) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var I = m;
      m = F;
      try {
        return L();
      } finally {
        m = I;
      }
    }),
    (e.unstable_scheduleCallback = function (F, L, I) {
      var G = e.unstable_now();
      switch (
        (typeof I == "object" && I !== null
          ? ((I = I.delay), (I = typeof I == "number" && 0 < I ? G + I : G))
          : (I = G),
        F)
      ) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return (
        (J = I + J),
        (F = {
          id: d++,
          callback: L,
          priorityLevel: F,
          startTime: I,
          expirationTime: J,
          sortIndex: -1,
        }),
        I > G
          ? ((F.sortIndex = I),
            t(u, F),
            n(l) === null &&
              F === n(u) &&
              (p ? (h(x), (x = -1)) : (p = !0), ne(_, I - G)))
          : ((F.sortIndex = J), t(l, F), v || C || ((v = !0), q(D))),
        F
      );
    }),
    (e.unstable_shouldYield = ee),
    (e.unstable_wrapCallback = function (F) {
      var L = m;
      return function () {
        var I = m;
        m = L;
        try {
          return F.apply(this, arguments);
        } finally {
          m = I;
        }
      };
    });
})(rd);
nd.exports = rd;
var Kg = nd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var od = w,
  et = Kg;
function B(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var id = new Set(),
  ao = {};
function $n(e, t) {
  vr(e, t), vr(e + "Capture", t);
}
function vr(e, t) {
  for (ao[e] = t, e = 0; e < t.length; e++) id.add(t[e]);
}
var jt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Pl = Object.prototype.hasOwnProperty,
  Jg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  $0 = {},
  M0 = {};
function ey(e) {
  return Pl.call(M0, e)
    ? !0
    : Pl.call($0, e)
    ? !1
    : Jg.test(e)
    ? (M0[e] = !0)
    : (($0[e] = !0), !1);
}
function ty(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function ny(e, t, n, r) {
  if (t === null || typeof t > "u" || ty(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ve(e, t, n, r, o, i, a) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = a);
}
var Be = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Be[e] = new Ve(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  Be[t] = new Ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Be[e] = new Ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Be[e] = new Ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Be[e] = new Ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Be[e] = new Ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Be[e] = new Ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Be[e] = new Ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Be[e] = new Ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var nu = /[\-:]([a-z])/g;
function ru(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(nu, ru);
    Be[t] = new Ve(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(nu, ru);
    Be[t] = new Ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(nu, ru);
  Be[t] = new Ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Be[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Be.xlinkHref = new Ve(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Be[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ou(e, t, n, r) {
  var o = Be.hasOwnProperty(t) ? Be[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (ny(t, n, o, r) && (n = null),
    r || o === null
      ? ey(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Gt = od.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Yo = Symbol.for("react.element"),
  Zn = Symbol.for("react.portal"),
  Qn = Symbol.for("react.fragment"),
  iu = Symbol.for("react.strict_mode"),
  $l = Symbol.for("react.profiler"),
  ad = Symbol.for("react.provider"),
  ld = Symbol.for("react.context"),
  au = Symbol.for("react.forward_ref"),
  Ml = Symbol.for("react.suspense"),
  zl = Symbol.for("react.suspense_list"),
  lu = Symbol.for("react.memo"),
  Qt = Symbol.for("react.lazy"),
  sd = Symbol.for("react.offscreen"),
  z0 = Symbol.iterator;
function Ir(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (z0 && e[z0]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var we = Object.assign,
  qa;
function Hr(e) {
  if (qa === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      qa = (t && t[1]) || "";
    }
  return (
    `
` +
    qa +
    e
  );
}
var Ka = !1;
function Ja(e, t) {
  if (!e || Ka) return "";
  Ka = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          a = o.length - 1,
          s = i.length - 1;
        1 <= a && 0 <= s && o[a] !== i[s];

      )
        s--;
      for (; 1 <= a && 0 <= s; a--, s--)
        if (o[a] !== i[s]) {
          if (a !== 1 || s !== 1)
            do
              if ((a--, s--, 0 > s || o[a] !== i[s])) {
                var l =
                  `
` + o[a].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= a && 0 <= s);
          break;
        }
    }
  } finally {
    (Ka = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Hr(e) : "";
}
function ry(e) {
  switch (e.tag) {
    case 5:
      return Hr(e.type);
    case 16:
      return Hr("Lazy");
    case 13:
      return Hr("Suspense");
    case 19:
      return Hr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ja(e.type, !1)), e;
    case 11:
      return (e = Ja(e.type.render, !1)), e;
    case 1:
      return (e = Ja(e.type, !0)), e;
    default:
      return "";
  }
}
function jl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Qn:
      return "Fragment";
    case Zn:
      return "Portal";
    case $l:
      return "Profiler";
    case iu:
      return "StrictMode";
    case Ml:
      return "Suspense";
    case zl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case ld:
        return (e.displayName || "Context") + ".Consumer";
      case ad:
        return (e._context.displayName || "Context") + ".Provider";
      case au:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case lu:
        return (
          (t = e.displayName || null), t !== null ? t : jl(e.type) || "Memo"
        );
      case Qt:
        (t = e._payload), (e = e._init);
        try {
          return jl(e(t));
        } catch {}
    }
  return null;
}
function oy(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return jl(t);
    case 8:
      return t === iu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function fn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ud(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function iy(e) {
  var t = ud(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (a) {
          (r = "" + a), i.call(this, a);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (a) {
          r = "" + a;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Zo(e) {
  e._valueTracker || (e._valueTracker = iy(e));
}
function cd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = ud(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Oi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ul(e, t) {
  var n = t.checked;
  return we({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function j0(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = fn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function dd(e, t) {
  (t = t.checked), t != null && ou(e, "checked", t, !1);
}
function Vl(e, t) {
  dd(e, t);
  var n = fn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Hl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Hl(e, t.type, fn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function U0(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Hl(e, t, n) {
  (t !== "number" || Oi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Wr = Array.isArray;
function lr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + fn(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Wl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(B(91));
  return we({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function V0(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(B(92));
      if (Wr(n)) {
        if (1 < n.length) throw Error(B(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: fn(n) };
}
function fd(e, t) {
  var n = fn(t.value),
    r = fn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function H0(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function pd(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Gl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? pd(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Qo,
  hd = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Qo = Qo || document.createElement("div"),
          Qo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Qo.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function lo(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Qr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  ay = ["Webkit", "ms", "Moz", "O"];
Object.keys(Qr).forEach(function (e) {
  ay.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Qr[t] = Qr[e]);
  });
});
function md(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Qr.hasOwnProperty(e) && Qr[e])
    ? ("" + t).trim()
    : t + "px";
}
function gd(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = md(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var ly = we(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Yl(e, t) {
  if (t) {
    if (ly[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(B(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(B(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(B(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(B(62));
  }
}
function Zl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ql = null;
function su(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Xl = null,
  sr = null,
  ur = null;
function W0(e) {
  if ((e = Fo(e))) {
    if (typeof Xl != "function") throw Error(B(280));
    var t = e.stateNode;
    t && ((t = ga(t)), Xl(e.stateNode, e.type, t));
  }
}
function yd(e) {
  sr ? (ur ? ur.push(e) : (ur = [e])) : (sr = e);
}
function vd() {
  if (sr) {
    var e = sr,
      t = ur;
    if (((ur = sr = null), W0(e), t)) for (e = 0; e < t.length; e++) W0(t[e]);
  }
}
function Ed(e, t) {
  return e(t);
}
function Ad() {}
var el = !1;
function wd(e, t, n) {
  if (el) return e(t, n);
  el = !0;
  try {
    return Ed(e, t, n);
  } finally {
    (el = !1), (sr !== null || ur !== null) && (Ad(), vd());
  }
}
function so(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ga(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(B(231, t, typeof n));
  return n;
}
var ql = !1;
if (jt)
  try {
    var Lr = {};
    Object.defineProperty(Lr, "passive", {
      get: function () {
        ql = !0;
      },
    }),
      window.addEventListener("test", Lr, Lr),
      window.removeEventListener("test", Lr, Lr);
  } catch {
    ql = !1;
  }
function sy(e, t, n, r, o, i, a, s, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var Xr = !1,
  Ti = null,
  Ri = !1,
  Kl = null,
  uy = {
    onError: function (e) {
      (Xr = !0), (Ti = e);
    },
  };
function cy(e, t, n, r, o, i, a, s, l) {
  (Xr = !1), (Ti = null), sy.apply(uy, arguments);
}
function dy(e, t, n, r, o, i, a, s, l) {
  if ((cy.apply(this, arguments), Xr)) {
    if (Xr) {
      var u = Ti;
      (Xr = !1), (Ti = null);
    } else throw Error(B(198));
    Ri || ((Ri = !0), (Kl = u));
  }
}
function Mn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Cd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function G0(e) {
  if (Mn(e) !== e) throw Error(B(188));
}
function fy(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Mn(e)), t === null)) throw Error(B(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return G0(o), e;
        if (i === r) return G0(o), t;
        i = i.sibling;
      }
      throw Error(B(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var a = !1, s = o.child; s; ) {
        if (s === n) {
          (a = !0), (n = o), (r = i);
          break;
        }
        if (s === r) {
          (a = !0), (r = o), (n = i);
          break;
        }
        s = s.sibling;
      }
      if (!a) {
        for (s = i.child; s; ) {
          if (s === n) {
            (a = !0), (n = i), (r = o);
            break;
          }
          if (s === r) {
            (a = !0), (r = i), (n = o);
            break;
          }
          s = s.sibling;
        }
        if (!a) throw Error(B(189));
      }
    }
    if (n.alternate !== r) throw Error(B(190));
  }
  if (n.tag !== 3) throw Error(B(188));
  return n.stateNode.current === n ? e : t;
}
function bd(e) {
  return (e = fy(e)), e !== null ? _d(e) : null;
}
function _d(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = _d(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Sd = et.unstable_scheduleCallback,
  Y0 = et.unstable_cancelCallback,
  py = et.unstable_shouldYield,
  hy = et.unstable_requestPaint,
  _e = et.unstable_now,
  my = et.unstable_getCurrentPriorityLevel,
  uu = et.unstable_ImmediatePriority,
  kd = et.unstable_UserBlockingPriority,
  Ni = et.unstable_NormalPriority,
  gy = et.unstable_LowPriority,
  Dd = et.unstable_IdlePriority,
  fa = null,
  xt = null;
function yy(e) {
  if (xt && typeof xt.onCommitFiberRoot == "function")
    try {
      xt.onCommitFiberRoot(fa, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var At = Math.clz32 ? Math.clz32 : Ay,
  vy = Math.log,
  Ey = Math.LN2;
function Ay(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((vy(e) / Ey) | 0)) | 0;
}
var Xo = 64,
  qo = 4194304;
function Gr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Bi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    a = n & 268435455;
  if (a !== 0) {
    var s = a & ~o;
    s !== 0 ? (r = Gr(s)) : ((i &= a), i !== 0 && (r = Gr(i)));
  } else (a = n & ~o), a !== 0 ? (r = Gr(a)) : i !== 0 && (r = Gr(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - At(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function wy(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Cy(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var a = 31 - At(i),
      s = 1 << a,
      l = o[a];
    l === -1
      ? (!(s & n) || s & r) && (o[a] = wy(s, t))
      : l <= t && (e.expiredLanes |= s),
      (i &= ~s);
  }
}
function Jl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function xd() {
  var e = Xo;
  return (Xo <<= 1), !(Xo & 4194240) && (Xo = 64), e;
}
function tl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Do(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - At(t)),
    (e[t] = n);
}
function by(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - At(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function cu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - At(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var ue = 0;
function Fd(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Od,
  du,
  Td,
  Rd,
  Nd,
  es = !1,
  Ko = [],
  rn = null,
  on = null,
  an = null,
  uo = new Map(),
  co = new Map(),
  qt = [],
  _y =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Z0(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rn = null;
      break;
    case "dragenter":
    case "dragleave":
      on = null;
      break;
    case "mouseover":
    case "mouseout":
      an = null;
      break;
    case "pointerover":
    case "pointerout":
      uo.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      co.delete(t.pointerId);
  }
}
function Pr(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Fo(t)), t !== null && du(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Sy(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (rn = Pr(rn, e, t, n, r, o)), !0;
    case "dragenter":
      return (on = Pr(on, e, t, n, r, o)), !0;
    case "mouseover":
      return (an = Pr(an, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return uo.set(i, Pr(uo.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), co.set(i, Pr(co.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function Bd(e) {
  var t = kn(e.target);
  if (t !== null) {
    var n = Mn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Cd(n)), t !== null)) {
          (e.blockedOn = t),
            Nd(e.priority, function () {
              Td(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function pi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ts(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Ql = r), n.target.dispatchEvent(r), (Ql = null);
    } else return (t = Fo(n)), t !== null && du(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function Q0(e, t, n) {
  pi(e) && n.delete(t);
}
function ky() {
  (es = !1),
    rn !== null && pi(rn) && (rn = null),
    on !== null && pi(on) && (on = null),
    an !== null && pi(an) && (an = null),
    uo.forEach(Q0),
    co.forEach(Q0);
}
function $r(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    es ||
      ((es = !0),
      et.unstable_scheduleCallback(et.unstable_NormalPriority, ky)));
}
function fo(e) {
  function t(o) {
    return $r(o, e);
  }
  if (0 < Ko.length) {
    $r(Ko[0], e);
    for (var n = 1; n < Ko.length; n++) {
      var r = Ko[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    rn !== null && $r(rn, e),
      on !== null && $r(on, e),
      an !== null && $r(an, e),
      uo.forEach(t),
      co.forEach(t),
      n = 0;
    n < qt.length;
    n++
  )
    (r = qt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < qt.length && ((n = qt[0]), n.blockedOn === null); )
    Bd(n), n.blockedOn === null && qt.shift();
}
var cr = Gt.ReactCurrentBatchConfig,
  Ii = !0;
function Dy(e, t, n, r) {
  var o = ue,
    i = cr.transition;
  cr.transition = null;
  try {
    (ue = 1), fu(e, t, n, r);
  } finally {
    (ue = o), (cr.transition = i);
  }
}
function xy(e, t, n, r) {
  var o = ue,
    i = cr.transition;
  cr.transition = null;
  try {
    (ue = 4), fu(e, t, n, r);
  } finally {
    (ue = o), (cr.transition = i);
  }
}
function fu(e, t, n, r) {
  if (Ii) {
    var o = ts(e, t, n, r);
    if (o === null) dl(e, t, r, Li, n), Z0(e, r);
    else if (Sy(o, e, t, n, r)) r.stopPropagation();
    else if ((Z0(e, r), t & 4 && -1 < _y.indexOf(e))) {
      for (; o !== null; ) {
        var i = Fo(o);
        if (
          (i !== null && Od(i),
          (i = ts(e, t, n, r)),
          i === null && dl(e, t, r, Li, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else dl(e, t, r, null, n);
  }
}
var Li = null;
function ts(e, t, n, r) {
  if (((Li = null), (e = su(r)), (e = kn(e)), e !== null))
    if (((t = Mn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Cd(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Li = e), null;
}
function Id(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (my()) {
        case uu:
          return 1;
        case kd:
          return 4;
        case Ni:
        case gy:
          return 16;
        case Dd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var tn = null,
  pu = null,
  hi = null;
function Ld() {
  if (hi) return hi;
  var e,
    t = pu,
    n = t.length,
    r,
    o = "value" in tn ? tn.value : tn.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var a = n - e;
  for (r = 1; r <= a && t[n - r] === o[i - r]; r++);
  return (hi = o.slice(e, 1 < r ? 1 - r : void 0));
}
function mi(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Jo() {
  return !0;
}
function X0() {
  return !1;
}
function rt(e) {
  function t(n, r, o, i, a) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = a),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(i) : i[s]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Jo
        : X0),
      (this.isPropagationStopped = X0),
      this
    );
  }
  return (
    we(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Jo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Jo));
      },
      persist: function () {},
      isPersistent: Jo,
    }),
    t
  );
}
var Dr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  hu = rt(Dr),
  xo = we({}, Dr, { view: 0, detail: 0 }),
  Fy = rt(xo),
  nl,
  rl,
  Mr,
  pa = we({}, xo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: mu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Mr &&
            (Mr && e.type === "mousemove"
              ? ((nl = e.screenX - Mr.screenX), (rl = e.screenY - Mr.screenY))
              : (rl = nl = 0),
            (Mr = e)),
          nl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : rl;
    },
  }),
  q0 = rt(pa),
  Oy = we({}, pa, { dataTransfer: 0 }),
  Ty = rt(Oy),
  Ry = we({}, xo, { relatedTarget: 0 }),
  ol = rt(Ry),
  Ny = we({}, Dr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  By = rt(Ny),
  Iy = we({}, Dr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ly = rt(Iy),
  Py = we({}, Dr, { data: 0 }),
  K0 = rt(Py),
  $y = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  My = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  zy = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function jy(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = zy[e]) ? !!t[e] : !1;
}
function mu() {
  return jy;
}
var Uy = we({}, xo, {
    key: function (e) {
      if (e.key) {
        var t = $y[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = mi(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? My[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: mu,
    charCode: function (e) {
      return e.type === "keypress" ? mi(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? mi(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Vy = rt(Uy),
  Hy = we({}, pa, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  J0 = rt(Hy),
  Wy = we({}, xo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: mu,
  }),
  Gy = rt(Wy),
  Yy = we({}, Dr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Zy = rt(Yy),
  Qy = we({}, pa, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Xy = rt(Qy),
  qy = [9, 13, 27, 32],
  gu = jt && "CompositionEvent" in window,
  qr = null;
jt && "documentMode" in document && (qr = document.documentMode);
var Ky = jt && "TextEvent" in window && !qr,
  Pd = jt && (!gu || (qr && 8 < qr && 11 >= qr)),
  ec = String.fromCharCode(32),
  tc = !1;
function $d(e, t) {
  switch (e) {
    case "keyup":
      return qy.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Md(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Xn = !1;
function Jy(e, t) {
  switch (e) {
    case "compositionend":
      return Md(t);
    case "keypress":
      return t.which !== 32 ? null : ((tc = !0), ec);
    case "textInput":
      return (e = t.data), e === ec && tc ? null : e;
    default:
      return null;
  }
}
function ev(e, t) {
  if (Xn)
    return e === "compositionend" || (!gu && $d(e, t))
      ? ((e = Ld()), (hi = pu = tn = null), (Xn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Pd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var tv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function nc(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!tv[e.type] : t === "textarea";
}
function zd(e, t, n, r) {
  yd(r),
    (t = Pi(t, "onChange")),
    0 < t.length &&
      ((n = new hu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Kr = null,
  po = null;
function nv(e) {
  qd(e, 0);
}
function ha(e) {
  var t = Jn(e);
  if (cd(t)) return e;
}
function rv(e, t) {
  if (e === "change") return t;
}
var jd = !1;
if (jt) {
  var il;
  if (jt) {
    var al = "oninput" in document;
    if (!al) {
      var rc = document.createElement("div");
      rc.setAttribute("oninput", "return;"),
        (al = typeof rc.oninput == "function");
    }
    il = al;
  } else il = !1;
  jd = il && (!document.documentMode || 9 < document.documentMode);
}
function oc() {
  Kr && (Kr.detachEvent("onpropertychange", Ud), (po = Kr = null));
}
function Ud(e) {
  if (e.propertyName === "value" && ha(po)) {
    var t = [];
    zd(t, po, e, su(e)), wd(nv, t);
  }
}
function ov(e, t, n) {
  e === "focusin"
    ? (oc(), (Kr = t), (po = n), Kr.attachEvent("onpropertychange", Ud))
    : e === "focusout" && oc();
}
function iv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return ha(po);
}
function av(e, t) {
  if (e === "click") return ha(t);
}
function lv(e, t) {
  if (e === "input" || e === "change") return ha(t);
}
function sv(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ct = typeof Object.is == "function" ? Object.is : sv;
function ho(e, t) {
  if (Ct(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Pl.call(t, o) || !Ct(e[o], t[o])) return !1;
  }
  return !0;
}
function ic(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ac(e, t) {
  var n = ic(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ic(n);
  }
}
function Vd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Vd(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Hd() {
  for (var e = window, t = Oi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Oi(e.document);
  }
  return t;
}
function yu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function uv(e) {
  var t = Hd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Vd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && yu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = ac(n, i));
        var a = ac(n, r);
        o &&
          a &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== a.node ||
            e.focusOffset !== a.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(a.node, a.offset))
            : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var cv = jt && "documentMode" in document && 11 >= document.documentMode,
  qn = null,
  ns = null,
  Jr = null,
  rs = !1;
function lc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  rs ||
    qn == null ||
    qn !== Oi(r) ||
    ((r = qn),
    "selectionStart" in r && yu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Jr && ho(Jr, r)) ||
      ((Jr = r),
      (r = Pi(ns, "onSelect")),
      0 < r.length &&
        ((t = new hu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = qn))));
}
function ei(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Kn = {
    animationend: ei("Animation", "AnimationEnd"),
    animationiteration: ei("Animation", "AnimationIteration"),
    animationstart: ei("Animation", "AnimationStart"),
    transitionend: ei("Transition", "TransitionEnd"),
  },
  ll = {},
  Wd = {};
jt &&
  ((Wd = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Kn.animationend.animation,
    delete Kn.animationiteration.animation,
    delete Kn.animationstart.animation),
  "TransitionEvent" in window || delete Kn.transitionend.transition);
function ma(e) {
  if (ll[e]) return ll[e];
  if (!Kn[e]) return e;
  var t = Kn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Wd) return (ll[e] = t[n]);
  return e;
}
var Gd = ma("animationend"),
  Yd = ma("animationiteration"),
  Zd = ma("animationstart"),
  Qd = ma("transitionend"),
  Xd = new Map(),
  sc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function gn(e, t) {
  Xd.set(e, t), $n(t, [e]);
}
for (var sl = 0; sl < sc.length; sl++) {
  var ul = sc[sl],
    dv = ul.toLowerCase(),
    fv = ul[0].toUpperCase() + ul.slice(1);
  gn(dv, "on" + fv);
}
gn(Gd, "onAnimationEnd");
gn(Yd, "onAnimationIteration");
gn(Zd, "onAnimationStart");
gn("dblclick", "onDoubleClick");
gn("focusin", "onFocus");
gn("focusout", "onBlur");
gn(Qd, "onTransitionEnd");
vr("onMouseEnter", ["mouseout", "mouseover"]);
vr("onMouseLeave", ["mouseout", "mouseover"]);
vr("onPointerEnter", ["pointerout", "pointerover"]);
vr("onPointerLeave", ["pointerout", "pointerover"]);
$n(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
$n(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
$n("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
$n(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
$n(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
$n(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Yr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  pv = new Set("cancel close invalid load scroll toggle".split(" ").concat(Yr));
function uc(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), dy(r, t, void 0, e), (e.currentTarget = null);
}
function qd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var a = r.length - 1; 0 <= a; a--) {
          var s = r[a],
            l = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), l !== i && o.isPropagationStopped())) break e;
          uc(o, s, u), (i = l);
        }
      else
        for (a = 0; a < r.length; a++) {
          if (
            ((s = r[a]),
            (l = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            l !== i && o.isPropagationStopped())
          )
            break e;
          uc(o, s, u), (i = l);
        }
    }
  }
  if (Ri) throw ((e = Kl), (Ri = !1), (Kl = null), e);
}
function he(e, t) {
  var n = t[ss];
  n === void 0 && (n = t[ss] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Kd(t, e, 2, !1), n.add(r));
}
function cl(e, t, n) {
  var r = 0;
  t && (r |= 4), Kd(n, e, r, t);
}
var ti = "_reactListening" + Math.random().toString(36).slice(2);
function mo(e) {
  if (!e[ti]) {
    (e[ti] = !0),
      id.forEach(function (n) {
        n !== "selectionchange" && (pv.has(n) || cl(n, !1, e), cl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ti] || ((t[ti] = !0), cl("selectionchange", !1, t));
  }
}
function Kd(e, t, n, r) {
  switch (Id(t)) {
    case 1:
      var o = Dy;
      break;
    case 4:
      o = xy;
      break;
    default:
      o = fu;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !ql ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function dl(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var a = r.tag;
      if (a === 3 || a === 4) {
        var s = r.stateNode.containerInfo;
        if (s === o || (s.nodeType === 8 && s.parentNode === o)) break;
        if (a === 4)
          for (a = r.return; a !== null; ) {
            var l = a.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = a.stateNode.containerInfo),
              l === o || (l.nodeType === 8 && l.parentNode === o))
            )
              return;
            a = a.return;
          }
        for (; s !== null; ) {
          if (((a = kn(s)), a === null)) return;
          if (((l = a.tag), l === 5 || l === 6)) {
            r = i = a;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  wd(function () {
    var u = i,
      d = su(n),
      c = [];
    e: {
      var m = Xd.get(e);
      if (m !== void 0) {
        var C = hu,
          v = e;
        switch (e) {
          case "keypress":
            if (mi(n) === 0) break e;
          case "keydown":
          case "keyup":
            C = Vy;
            break;
          case "focusin":
            (v = "focus"), (C = ol);
            break;
          case "focusout":
            (v = "blur"), (C = ol);
            break;
          case "beforeblur":
          case "afterblur":
            C = ol;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            C = q0;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            C = Ty;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            C = Gy;
            break;
          case Gd:
          case Yd:
          case Zd:
            C = By;
            break;
          case Qd:
            C = Zy;
            break;
          case "scroll":
            C = Fy;
            break;
          case "wheel":
            C = Xy;
            break;
          case "copy":
          case "cut":
          case "paste":
            C = Ly;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            C = J0;
        }
        var p = (t & 4) !== 0,
          E = !p && e === "scroll",
          h = p ? (m !== null ? m + "Capture" : null) : m;
        p = [];
        for (var f = u, g; f !== null; ) {
          g = f;
          var _ = g.stateNode;
          if (
            (g.tag === 5 &&
              _ !== null &&
              ((g = _),
              h !== null && ((_ = so(f, h)), _ != null && p.push(go(f, _, g)))),
            E)
          )
            break;
          f = f.return;
        }
        0 < p.length &&
          ((m = new C(m, v, null, n, d)), c.push({ event: m, listeners: p }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (C = e === "mouseout" || e === "pointerout"),
          m &&
            n !== Ql &&
            (v = n.relatedTarget || n.fromElement) &&
            (kn(v) || v[Ut]))
        )
          break e;
        if (
          (C || m) &&
          ((m =
            d.window === d
              ? d
              : (m = d.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          C
            ? ((v = n.relatedTarget || n.toElement),
              (C = u),
              (v = v ? kn(v) : null),
              v !== null &&
                ((E = Mn(v)), v !== E || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((C = null), (v = u)),
          C !== v)
        ) {
          if (
            ((p = q0),
            (_ = "onMouseLeave"),
            (h = "onMouseEnter"),
            (f = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((p = J0),
              (_ = "onPointerLeave"),
              (h = "onPointerEnter"),
              (f = "pointer")),
            (E = C == null ? m : Jn(C)),
            (g = v == null ? m : Jn(v)),
            (m = new p(_, f + "leave", C, n, d)),
            (m.target = E),
            (m.relatedTarget = g),
            (_ = null),
            kn(d) === u &&
              ((p = new p(h, f + "enter", v, n, d)),
              (p.target = g),
              (p.relatedTarget = E),
              (_ = p)),
            (E = _),
            C && v)
          )
            t: {
              for (p = C, h = v, f = 0, g = p; g; g = Vn(g)) f++;
              for (g = 0, _ = h; _; _ = Vn(_)) g++;
              for (; 0 < f - g; ) (p = Vn(p)), f--;
              for (; 0 < g - f; ) (h = Vn(h)), g--;
              for (; f--; ) {
                if (p === h || (h !== null && p === h.alternate)) break t;
                (p = Vn(p)), (h = Vn(h));
              }
              p = null;
            }
          else p = null;
          C !== null && cc(c, m, C, p, !1),
            v !== null && E !== null && cc(c, E, v, p, !0);
        }
      }
      e: {
        if (
          ((m = u ? Jn(u) : window),
          (C = m.nodeName && m.nodeName.toLowerCase()),
          C === "select" || (C === "input" && m.type === "file"))
        )
          var D = rv;
        else if (nc(m))
          if (jd) D = lv;
          else {
            D = iv;
            var T = ov;
          }
        else
          (C = m.nodeName) &&
            C.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (D = av);
        if (D && (D = D(e, u))) {
          zd(c, D, n, d);
          break e;
        }
        T && T(e, m, u),
          e === "focusout" &&
            (T = m._wrapperState) &&
            T.controlled &&
            m.type === "number" &&
            Hl(m, "number", m.value);
      }
      switch (((T = u ? Jn(u) : window), e)) {
        case "focusin":
          (nc(T) || T.contentEditable === "true") &&
            ((qn = T), (ns = u), (Jr = null));
          break;
        case "focusout":
          Jr = ns = qn = null;
          break;
        case "mousedown":
          rs = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (rs = !1), lc(c, n, d);
          break;
        case "selectionchange":
          if (cv) break;
        case "keydown":
        case "keyup":
          lc(c, n, d);
      }
      var k;
      if (gu)
        e: {
          switch (e) {
            case "compositionstart":
              var x = "onCompositionStart";
              break e;
            case "compositionend":
              x = "onCompositionEnd";
              break e;
            case "compositionupdate":
              x = "onCompositionUpdate";
              break e;
          }
          x = void 0;
        }
      else
        Xn
          ? $d(e, n) && (x = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      x &&
        (Pd &&
          n.locale !== "ko" &&
          (Xn || x !== "onCompositionStart"
            ? x === "onCompositionEnd" && Xn && (k = Ld())
            : ((tn = d),
              (pu = "value" in tn ? tn.value : tn.textContent),
              (Xn = !0))),
        (T = Pi(u, x)),
        0 < T.length &&
          ((x = new K0(x, e, null, n, d)),
          c.push({ event: x, listeners: T }),
          k ? (x.data = k) : ((k = Md(n)), k !== null && (x.data = k)))),
        (k = Ky ? Jy(e, n) : ev(e, n)) &&
          ((u = Pi(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new K0("onBeforeInput", "beforeinput", null, n, d)),
            c.push({ event: d, listeners: u }),
            (d.data = k)));
    }
    qd(c, t);
  });
}
function go(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Pi(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = so(e, n)),
      i != null && r.unshift(go(e, i, o)),
      (i = so(e, t)),
      i != null && r.push(go(e, i, o))),
      (e = e.return);
  }
  return r;
}
function Vn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function cc(e, t, n, r, o) {
  for (var i = t._reactName, a = []; n !== null && n !== r; ) {
    var s = n,
      l = s.alternate,
      u = s.stateNode;
    if (l !== null && l === r) break;
    s.tag === 5 &&
      u !== null &&
      ((s = u),
      o
        ? ((l = so(n, i)), l != null && a.unshift(go(n, l, s)))
        : o || ((l = so(n, i)), l != null && a.push(go(n, l, s)))),
      (n = n.return);
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var hv = /\r\n?/g,
  mv = /\u0000|\uFFFD/g;
function dc(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      hv,
      `
`
    )
    .replace(mv, "");
}
function ni(e, t, n) {
  if (((t = dc(t)), dc(e) !== t && n)) throw Error(B(425));
}
function $i() {}
var os = null,
  is = null;
function as(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ls = typeof setTimeout == "function" ? setTimeout : void 0,
  gv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  fc = typeof Promise == "function" ? Promise : void 0,
  yv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof fc < "u"
      ? function (e) {
          return fc.resolve(null).then(e).catch(vv);
        }
      : ls;
function vv(e) {
  setTimeout(function () {
    throw e;
  });
}
function fl(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), fo(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  fo(t);
}
function ln(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function pc(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var xr = Math.random().toString(36).slice(2),
  kt = "__reactFiber$" + xr,
  yo = "__reactProps$" + xr,
  Ut = "__reactContainer$" + xr,
  ss = "__reactEvents$" + xr,
  Ev = "__reactListeners$" + xr,
  Av = "__reactHandles$" + xr;
function kn(e) {
  var t = e[kt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Ut] || n[kt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = pc(e); e !== null; ) {
          if ((n = e[kt])) return n;
          e = pc(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Fo(e) {
  return (
    (e = e[kt] || e[Ut]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Jn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(B(33));
}
function ga(e) {
  return e[yo] || null;
}
var us = [],
  er = -1;
function yn(e) {
  return { current: e };
}
function me(e) {
  0 > er || ((e.current = us[er]), (us[er] = null), er--);
}
function pe(e, t) {
  er++, (us[er] = e.current), (e.current = t);
}
var pn = {},
  $e = yn(pn),
  Ge = yn(!1),
  Rn = pn;
function Er(e, t) {
  var n = e.type.contextTypes;
  if (!n) return pn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Ye(e) {
  return (e = e.childContextTypes), e != null;
}
function Mi() {
  me(Ge), me($e);
}
function hc(e, t, n) {
  if ($e.current !== pn) throw Error(B(168));
  pe($e, t), pe(Ge, n);
}
function Jd(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(B(108, oy(e) || "Unknown", o));
  return we({}, n, r);
}
function zi(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || pn),
    (Rn = $e.current),
    pe($e, e),
    pe(Ge, Ge.current),
    !0
  );
}
function mc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(B(169));
  n
    ? ((e = Jd(e, t, Rn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      me(Ge),
      me($e),
      pe($e, e))
    : me(Ge),
    pe(Ge, n);
}
var Pt = null,
  ya = !1,
  pl = !1;
function ef(e) {
  Pt === null ? (Pt = [e]) : Pt.push(e);
}
function wv(e) {
  (ya = !0), ef(e);
}
function vn() {
  if (!pl && Pt !== null) {
    pl = !0;
    var e = 0,
      t = ue;
    try {
      var n = Pt;
      for (ue = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Pt = null), (ya = !1);
    } catch (o) {
      throw (Pt !== null && (Pt = Pt.slice(e + 1)), Sd(uu, vn), o);
    } finally {
      (ue = t), (pl = !1);
    }
  }
  return null;
}
var tr = [],
  nr = 0,
  ji = null,
  Ui = 0,
  lt = [],
  st = 0,
  Nn = null,
  $t = 1,
  Mt = "";
function Cn(e, t) {
  (tr[nr++] = Ui), (tr[nr++] = ji), (ji = e), (Ui = t);
}
function tf(e, t, n) {
  (lt[st++] = $t), (lt[st++] = Mt), (lt[st++] = Nn), (Nn = e);
  var r = $t;
  e = Mt;
  var o = 32 - At(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - At(t) + o;
  if (30 < i) {
    var a = o - (o % 5);
    (i = (r & ((1 << a) - 1)).toString(32)),
      (r >>= a),
      (o -= a),
      ($t = (1 << (32 - At(t) + o)) | (n << o) | r),
      (Mt = i + e);
  } else ($t = (1 << i) | (n << o) | r), (Mt = e);
}
function vu(e) {
  e.return !== null && (Cn(e, 1), tf(e, 1, 0));
}
function Eu(e) {
  for (; e === ji; )
    (ji = tr[--nr]), (tr[nr] = null), (Ui = tr[--nr]), (tr[nr] = null);
  for (; e === Nn; )
    (Nn = lt[--st]),
      (lt[st] = null),
      (Mt = lt[--st]),
      (lt[st] = null),
      ($t = lt[--st]),
      (lt[st] = null);
}
var Je = null,
  Ke = null,
  ve = !1,
  vt = null;
function nf(e, t) {
  var n = dt(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function gc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Je = e), (Ke = ln(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Je = e), (Ke = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Nn !== null ? { id: $t, overflow: Mt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = dt(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Je = e),
            (Ke = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function cs(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ds(e) {
  if (ve) {
    var t = Ke;
    if (t) {
      var n = t;
      if (!gc(e, t)) {
        if (cs(e)) throw Error(B(418));
        t = ln(n.nextSibling);
        var r = Je;
        t && gc(e, t)
          ? nf(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (ve = !1), (Je = e));
      }
    } else {
      if (cs(e)) throw Error(B(418));
      (e.flags = (e.flags & -4097) | 2), (ve = !1), (Je = e);
    }
  }
}
function yc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Je = e;
}
function ri(e) {
  if (e !== Je) return !1;
  if (!ve) return yc(e), (ve = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !as(e.type, e.memoizedProps))),
    t && (t = Ke))
  ) {
    if (cs(e)) throw (rf(), Error(B(418)));
    for (; t; ) nf(e, t), (t = ln(t.nextSibling));
  }
  if ((yc(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(B(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ke = ln(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ke = null;
    }
  } else Ke = Je ? ln(e.stateNode.nextSibling) : null;
  return !0;
}
function rf() {
  for (var e = Ke; e; ) e = ln(e.nextSibling);
}
function Ar() {
  (Ke = Je = null), (ve = !1);
}
function Au(e) {
  vt === null ? (vt = [e]) : vt.push(e);
}
var Cv = Gt.ReactCurrentBatchConfig;
function gt(e, t) {
  if (e && e.defaultProps) {
    (t = we({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var Vi = yn(null),
  Hi = null,
  rr = null,
  wu = null;
function Cu() {
  wu = rr = Hi = null;
}
function bu(e) {
  var t = Vi.current;
  me(Vi), (e._currentValue = t);
}
function fs(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function dr(e, t) {
  (Hi = e),
    (wu = rr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (We = !0), (e.firstContext = null));
}
function pt(e) {
  var t = e._currentValue;
  if (wu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), rr === null)) {
      if (Hi === null) throw Error(B(308));
      (rr = e), (Hi.dependencies = { lanes: 0, firstContext: e });
    } else rr = rr.next = e;
  return t;
}
var Dn = null;
function _u(e) {
  Dn === null ? (Dn = [e]) : Dn.push(e);
}
function of(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), _u(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    Vt(e, r)
  );
}
function Vt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Xt = !1;
function Su(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function af(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function zt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function sn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), le & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      Vt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), _u(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    Vt(e, n)
  );
}
function gi(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), cu(e, n);
  }
}
function vc(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var a = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = a) : (i = i.next = a), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Wi(e, t, n, r) {
  var o = e.updateQueue;
  Xt = !1;
  var i = o.firstBaseUpdate,
    a = o.lastBaseUpdate,
    s = o.shared.pending;
  if (s !== null) {
    o.shared.pending = null;
    var l = s,
      u = l.next;
    (l.next = null), a === null ? (i = u) : (a.next = u), (a = l);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (s = d.lastBaseUpdate),
      s !== a &&
        (s === null ? (d.firstBaseUpdate = u) : (s.next = u),
        (d.lastBaseUpdate = l)));
  }
  if (i !== null) {
    var c = o.baseState;
    (a = 0), (d = u = l = null), (s = i);
    do {
      var m = s.lane,
        C = s.eventTime;
      if ((r & m) === m) {
        d !== null &&
          (d = d.next =
            {
              eventTime: C,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var v = e,
            p = s;
          switch (((m = t), (C = n), p.tag)) {
            case 1:
              if (((v = p.payload), typeof v == "function")) {
                c = v.call(C, c, m);
                break e;
              }
              c = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = p.payload),
                (m = typeof v == "function" ? v.call(C, c, m) : v),
                m == null)
              )
                break e;
              c = we({}, c, m);
              break e;
            case 2:
              Xt = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [s]) : m.push(s));
      } else
        (C = {
          eventTime: C,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          d === null ? ((u = d = C), (l = c)) : (d = d.next = C),
          (a |= m);
      if (((s = s.next), s === null)) {
        if (((s = o.shared.pending), s === null)) break;
        (m = s),
          (s = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null);
      }
    } while (1);
    if (
      (d === null && (l = c),
      (o.baseState = l),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = d),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (a |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (In |= a), (e.lanes = a), (e.memoizedState = c);
  }
}
function Ec(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(B(191, o));
        o.call(r);
      }
    }
}
var lf = new od.Component().refs;
function ps(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : we({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var va = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Mn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = je(),
      o = cn(e),
      i = zt(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = sn(e, i, o)),
      t !== null && (wt(t, e, o, r), gi(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = je(),
      o = cn(e),
      i = zt(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = sn(e, i, o)),
      t !== null && (wt(t, e, o, r), gi(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = je(),
      r = cn(e),
      o = zt(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = sn(e, o, r)),
      t !== null && (wt(t, e, r, n), gi(t, e, r));
  },
};
function Ac(e, t, n, r, o, i, a) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, a)
      : t.prototype && t.prototype.isPureReactComponent
      ? !ho(n, r) || !ho(o, i)
      : !0
  );
}
function sf(e, t, n) {
  var r = !1,
    o = pn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = pt(i))
      : ((o = Ye(t) ? Rn : $e.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Er(e, o) : pn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = va),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function wc(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && va.enqueueReplaceState(t, t.state, null);
}
function hs(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = lf), Su(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = pt(i))
    : ((i = Ye(t) ? Rn : $e.current), (o.context = Er(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (ps(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && va.enqueueReplaceState(o, o.state, null),
      Wi(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function zr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(B(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(B(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (a) {
            var s = o.refs;
            s === lf && (s = o.refs = {}),
              a === null ? delete s[i] : (s[i] = a);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(B(284));
    if (!n._owner) throw Error(B(290, e));
  }
  return e;
}
function oi(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      B(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Cc(e) {
  var t = e._init;
  return t(e._payload);
}
function uf(e) {
  function t(h, f) {
    if (e) {
      var g = h.deletions;
      g === null ? ((h.deletions = [f]), (h.flags |= 16)) : g.push(f);
    }
  }
  function n(h, f) {
    if (!e) return null;
    for (; f !== null; ) t(h, f), (f = f.sibling);
    return null;
  }
  function r(h, f) {
    for (h = new Map(); f !== null; )
      f.key !== null ? h.set(f.key, f) : h.set(f.index, f), (f = f.sibling);
    return h;
  }
  function o(h, f) {
    return (h = dn(h, f)), (h.index = 0), (h.sibling = null), h;
  }
  function i(h, f, g) {
    return (
      (h.index = g),
      e
        ? ((g = h.alternate),
          g !== null
            ? ((g = g.index), g < f ? ((h.flags |= 2), f) : g)
            : ((h.flags |= 2), f))
        : ((h.flags |= 1048576), f)
    );
  }
  function a(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function s(h, f, g, _) {
    return f === null || f.tag !== 6
      ? ((f = Al(g, h.mode, _)), (f.return = h), f)
      : ((f = o(f, g)), (f.return = h), f);
  }
  function l(h, f, g, _) {
    var D = g.type;
    return D === Qn
      ? d(h, f, g.props.children, _, g.key)
      : f !== null &&
        (f.elementType === D ||
          (typeof D == "object" &&
            D !== null &&
            D.$$typeof === Qt &&
            Cc(D) === f.type))
      ? ((_ = o(f, g.props)), (_.ref = zr(h, f, g)), (_.return = h), _)
      : ((_ = Ci(g.type, g.key, g.props, null, h.mode, _)),
        (_.ref = zr(h, f, g)),
        (_.return = h),
        _);
  }
  function u(h, f, g, _) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== g.containerInfo ||
      f.stateNode.implementation !== g.implementation
      ? ((f = wl(g, h.mode, _)), (f.return = h), f)
      : ((f = o(f, g.children || [])), (f.return = h), f);
  }
  function d(h, f, g, _, D) {
    return f === null || f.tag !== 7
      ? ((f = Tn(g, h.mode, _, D)), (f.return = h), f)
      : ((f = o(f, g)), (f.return = h), f);
  }
  function c(h, f, g) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return (f = Al("" + f, h.mode, g)), (f.return = h), f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Yo:
          return (
            (g = Ci(f.type, f.key, f.props, null, h.mode, g)),
            (g.ref = zr(h, null, f)),
            (g.return = h),
            g
          );
        case Zn:
          return (f = wl(f, h.mode, g)), (f.return = h), f;
        case Qt:
          var _ = f._init;
          return c(h, _(f._payload), g);
      }
      if (Wr(f) || Ir(f))
        return (f = Tn(f, h.mode, g, null)), (f.return = h), f;
      oi(h, f);
    }
    return null;
  }
  function m(h, f, g, _) {
    var D = f !== null ? f.key : null;
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return D !== null ? null : s(h, f, "" + g, _);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Yo:
          return g.key === D ? l(h, f, g, _) : null;
        case Zn:
          return g.key === D ? u(h, f, g, _) : null;
        case Qt:
          return (D = g._init), m(h, f, D(g._payload), _);
      }
      if (Wr(g) || Ir(g)) return D !== null ? null : d(h, f, g, _, null);
      oi(h, g);
    }
    return null;
  }
  function C(h, f, g, _, D) {
    if ((typeof _ == "string" && _ !== "") || typeof _ == "number")
      return (h = h.get(g) || null), s(f, h, "" + _, D);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Yo:
          return (h = h.get(_.key === null ? g : _.key) || null), l(f, h, _, D);
        case Zn:
          return (h = h.get(_.key === null ? g : _.key) || null), u(f, h, _, D);
        case Qt:
          var T = _._init;
          return C(h, f, g, T(_._payload), D);
      }
      if (Wr(_) || Ir(_)) return (h = h.get(g) || null), d(f, h, _, D, null);
      oi(f, _);
    }
    return null;
  }
  function v(h, f, g, _) {
    for (
      var D = null, T = null, k = f, x = (f = 0), P = null;
      k !== null && x < g.length;
      x++
    ) {
      k.index > x ? ((P = k), (k = null)) : (P = k.sibling);
      var $ = m(h, k, g[x], _);
      if ($ === null) {
        k === null && (k = P);
        break;
      }
      e && k && $.alternate === null && t(h, k),
        (f = i($, f, x)),
        T === null ? (D = $) : (T.sibling = $),
        (T = $),
        (k = P);
    }
    if (x === g.length) return n(h, k), ve && Cn(h, x), D;
    if (k === null) {
      for (; x < g.length; x++)
        (k = c(h, g[x], _)),
          k !== null &&
            ((f = i(k, f, x)), T === null ? (D = k) : (T.sibling = k), (T = k));
      return ve && Cn(h, x), D;
    }
    for (k = r(h, k); x < g.length; x++)
      (P = C(k, h, x, g[x], _)),
        P !== null &&
          (e && P.alternate !== null && k.delete(P.key === null ? x : P.key),
          (f = i(P, f, x)),
          T === null ? (D = P) : (T.sibling = P),
          (T = P));
    return (
      e &&
        k.forEach(function (ee) {
          return t(h, ee);
        }),
      ve && Cn(h, x),
      D
    );
  }
  function p(h, f, g, _) {
    var D = Ir(g);
    if (typeof D != "function") throw Error(B(150));
    if (((g = D.call(g)), g == null)) throw Error(B(151));
    for (
      var T = (D = null), k = f, x = (f = 0), P = null, $ = g.next();
      k !== null && !$.done;
      x++, $ = g.next()
    ) {
      k.index > x ? ((P = k), (k = null)) : (P = k.sibling);
      var ee = m(h, k, $.value, _);
      if (ee === null) {
        k === null && (k = P);
        break;
      }
      e && k && ee.alternate === null && t(h, k),
        (f = i(ee, f, x)),
        T === null ? (D = ee) : (T.sibling = ee),
        (T = ee),
        (k = P);
    }
    if ($.done) return n(h, k), ve && Cn(h, x), D;
    if (k === null) {
      for (; !$.done; x++, $ = g.next())
        ($ = c(h, $.value, _)),
          $ !== null &&
            ((f = i($, f, x)), T === null ? (D = $) : (T.sibling = $), (T = $));
      return ve && Cn(h, x), D;
    }
    for (k = r(h, k); !$.done; x++, $ = g.next())
      ($ = C(k, h, x, $.value, _)),
        $ !== null &&
          (e && $.alternate !== null && k.delete($.key === null ? x : $.key),
          (f = i($, f, x)),
          T === null ? (D = $) : (T.sibling = $),
          (T = $));
    return (
      e &&
        k.forEach(function (R) {
          return t(h, R);
        }),
      ve && Cn(h, x),
      D
    );
  }
  function E(h, f, g, _) {
    if (
      (typeof g == "object" &&
        g !== null &&
        g.type === Qn &&
        g.key === null &&
        (g = g.props.children),
      typeof g == "object" && g !== null)
    ) {
      switch (g.$$typeof) {
        case Yo:
          e: {
            for (var D = g.key, T = f; T !== null; ) {
              if (T.key === D) {
                if (((D = g.type), D === Qn)) {
                  if (T.tag === 7) {
                    n(h, T.sibling),
                      (f = o(T, g.props.children)),
                      (f.return = h),
                      (h = f);
                    break e;
                  }
                } else if (
                  T.elementType === D ||
                  (typeof D == "object" &&
                    D !== null &&
                    D.$$typeof === Qt &&
                    Cc(D) === T.type)
                ) {
                  n(h, T.sibling),
                    (f = o(T, g.props)),
                    (f.ref = zr(h, T, g)),
                    (f.return = h),
                    (h = f);
                  break e;
                }
                n(h, T);
                break;
              } else t(h, T);
              T = T.sibling;
            }
            g.type === Qn
              ? ((f = Tn(g.props.children, h.mode, _, g.key)),
                (f.return = h),
                (h = f))
              : ((_ = Ci(g.type, g.key, g.props, null, h.mode, _)),
                (_.ref = zr(h, f, g)),
                (_.return = h),
                (h = _));
          }
          return a(h);
        case Zn:
          e: {
            for (T = g.key; f !== null; ) {
              if (f.key === T)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === g.containerInfo &&
                  f.stateNode.implementation === g.implementation
                ) {
                  n(h, f.sibling),
                    (f = o(f, g.children || [])),
                    (f.return = h),
                    (h = f);
                  break e;
                } else {
                  n(h, f);
                  break;
                }
              else t(h, f);
              f = f.sibling;
            }
            (f = wl(g, h.mode, _)), (f.return = h), (h = f);
          }
          return a(h);
        case Qt:
          return (T = g._init), E(h, f, T(g._payload), _);
      }
      if (Wr(g)) return v(h, f, g, _);
      if (Ir(g)) return p(h, f, g, _);
      oi(h, g);
    }
    return (typeof g == "string" && g !== "") || typeof g == "number"
      ? ((g = "" + g),
        f !== null && f.tag === 6
          ? (n(h, f.sibling), (f = o(f, g)), (f.return = h), (h = f))
          : (n(h, f), (f = Al(g, h.mode, _)), (f.return = h), (h = f)),
        a(h))
      : n(h, f);
  }
  return E;
}
var wr = uf(!0),
  cf = uf(!1),
  Oo = {},
  Ft = yn(Oo),
  vo = yn(Oo),
  Eo = yn(Oo);
function xn(e) {
  if (e === Oo) throw Error(B(174));
  return e;
}
function ku(e, t) {
  switch ((pe(Eo, t), pe(vo, e), pe(Ft, Oo), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Gl(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Gl(t, e));
  }
  me(Ft), pe(Ft, t);
}
function Cr() {
  me(Ft), me(vo), me(Eo);
}
function df(e) {
  xn(Eo.current);
  var t = xn(Ft.current),
    n = Gl(t, e.type);
  t !== n && (pe(vo, e), pe(Ft, n));
}
function Du(e) {
  vo.current === e && (me(Ft), me(vo));
}
var Ee = yn(0);
function Gi(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var hl = [];
function xu() {
  for (var e = 0; e < hl.length; e++)
    hl[e]._workInProgressVersionPrimary = null;
  hl.length = 0;
}
var yi = Gt.ReactCurrentDispatcher,
  ml = Gt.ReactCurrentBatchConfig,
  Bn = 0,
  Ae = null,
  xe = null,
  Oe = null,
  Yi = !1,
  eo = !1,
  Ao = 0,
  bv = 0;
function Ie() {
  throw Error(B(321));
}
function Fu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Ct(e[n], t[n])) return !1;
  return !0;
}
function Ou(e, t, n, r, o, i) {
  if (
    ((Bn = i),
    (Ae = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (yi.current = e === null || e.memoizedState === null ? Dv : xv),
    (e = n(r, o)),
    eo)
  ) {
    i = 0;
    do {
      if (((eo = !1), (Ao = 0), 25 <= i)) throw Error(B(301));
      (i += 1),
        (Oe = xe = null),
        (t.updateQueue = null),
        (yi.current = Fv),
        (e = n(r, o));
    } while (eo);
  }
  if (
    ((yi.current = Zi),
    (t = xe !== null && xe.next !== null),
    (Bn = 0),
    (Oe = xe = Ae = null),
    (Yi = !1),
    t)
  )
    throw Error(B(300));
  return e;
}
function Tu() {
  var e = Ao !== 0;
  return (Ao = 0), e;
}
function St() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Oe === null ? (Ae.memoizedState = Oe = e) : (Oe = Oe.next = e), Oe;
}
function ht() {
  if (xe === null) {
    var e = Ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = xe.next;
  var t = Oe === null ? Ae.memoizedState : Oe.next;
  if (t !== null) (Oe = t), (xe = e);
  else {
    if (e === null) throw Error(B(310));
    (xe = e),
      (e = {
        memoizedState: xe.memoizedState,
        baseState: xe.baseState,
        baseQueue: xe.baseQueue,
        queue: xe.queue,
        next: null,
      }),
      Oe === null ? (Ae.memoizedState = Oe = e) : (Oe = Oe.next = e);
  }
  return Oe;
}
function wo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function gl(e) {
  var t = ht(),
    n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var r = xe,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var a = o.next;
      (o.next = i.next), (i.next = a);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var s = (a = null),
      l = null,
      u = i;
    do {
      var d = u.lane;
      if ((Bn & d) === d)
        l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var c = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        l === null ? ((s = l = c), (a = r)) : (l = l.next = c),
          (Ae.lanes |= d),
          (In |= d);
      }
      u = u.next;
    } while (u !== null && u !== i);
    l === null ? (a = r) : (l.next = s),
      Ct(r, t.memoizedState) || (We = !0),
      (t.memoizedState = r),
      (t.baseState = a),
      (t.baseQueue = l),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (Ae.lanes |= i), (In |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function yl(e) {
  var t = ht(),
    n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var a = (o = o.next);
    do (i = e(i, a.action)), (a = a.next);
    while (a !== o);
    Ct(i, t.memoizedState) || (We = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function ff() {}
function pf(e, t) {
  var n = Ae,
    r = ht(),
    o = t(),
    i = !Ct(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (We = !0)),
    (r = r.queue),
    Ru(gf.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (Oe !== null && Oe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Co(9, mf.bind(null, n, r, o, t), void 0, null),
      Te === null)
    )
      throw Error(B(349));
    Bn & 30 || hf(n, t, o);
  }
  return o;
}
function hf(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ae.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function mf(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), yf(t) && vf(e);
}
function gf(e, t, n) {
  return n(function () {
    yf(t) && vf(e);
  });
}
function yf(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ct(e, n);
  } catch {
    return !0;
  }
}
function vf(e) {
  var t = Vt(e, 1);
  t !== null && wt(t, e, 1, -1);
}
function bc(e) {
  var t = St();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: wo,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = kv.bind(null, Ae, e)),
    [t.memoizedState, e]
  );
}
function Co(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = Ae.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Ae.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Ef() {
  return ht().memoizedState;
}
function vi(e, t, n, r) {
  var o = St();
  (Ae.flags |= e),
    (o.memoizedState = Co(1 | t, n, void 0, r === void 0 ? null : r));
}
function Ea(e, t, n, r) {
  var o = ht();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (xe !== null) {
    var a = xe.memoizedState;
    if (((i = a.destroy), r !== null && Fu(r, a.deps))) {
      o.memoizedState = Co(t, n, i, r);
      return;
    }
  }
  (Ae.flags |= e), (o.memoizedState = Co(1 | t, n, i, r));
}
function _c(e, t) {
  return vi(8390656, 8, e, t);
}
function Ru(e, t) {
  return Ea(2048, 8, e, t);
}
function Af(e, t) {
  return Ea(4, 2, e, t);
}
function wf(e, t) {
  return Ea(4, 4, e, t);
}
function Cf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function bf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Ea(4, 4, Cf.bind(null, t, e), n)
  );
}
function Nu() {}
function _f(e, t) {
  var n = ht();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Sf(e, t) {
  var n = ht();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Fu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function kf(e, t, n) {
  return Bn & 21
    ? (Ct(n, t) || ((n = xd()), (Ae.lanes |= n), (In |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (We = !0)), (e.memoizedState = n));
}
function _v(e, t) {
  var n = ue;
  (ue = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = ml.transition;
  ml.transition = {};
  try {
    e(!1), t();
  } finally {
    (ue = n), (ml.transition = r);
  }
}
function Df() {
  return ht().memoizedState;
}
function Sv(e, t, n) {
  var r = cn(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    xf(e))
  )
    Ff(t, n);
  else if (((n = of(e, t, n, r)), n !== null)) {
    var o = je();
    wt(n, e, r, o), Of(n, t, r);
  }
}
function kv(e, t, n) {
  var r = cn(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (xf(e)) Ff(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var a = t.lastRenderedState,
          s = i(a, n);
        if (((o.hasEagerState = !0), (o.eagerState = s), Ct(s, a))) {
          var l = t.interleaved;
          l === null
            ? ((o.next = o), _u(t))
            : ((o.next = l.next), (l.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = of(e, t, o, r)),
      n !== null && ((o = je()), wt(n, e, r, o), Of(n, t, r));
  }
}
function xf(e) {
  var t = e.alternate;
  return e === Ae || (t !== null && t === Ae);
}
function Ff(e, t) {
  eo = Yi = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Of(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), cu(e, n);
  }
}
var Zi = {
    readContext: pt,
    useCallback: Ie,
    useContext: Ie,
    useEffect: Ie,
    useImperativeHandle: Ie,
    useInsertionEffect: Ie,
    useLayoutEffect: Ie,
    useMemo: Ie,
    useReducer: Ie,
    useRef: Ie,
    useState: Ie,
    useDebugValue: Ie,
    useDeferredValue: Ie,
    useTransition: Ie,
    useMutableSource: Ie,
    useSyncExternalStore: Ie,
    useId: Ie,
    unstable_isNewReconciler: !1,
  },
  Dv = {
    readContext: pt,
    useCallback: function (e, t) {
      return (St().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: pt,
    useEffect: _c,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        vi(4194308, 4, Cf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return vi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return vi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = St();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = St();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Sv.bind(null, Ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = St();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: bc,
    useDebugValue: Nu,
    useDeferredValue: function (e) {
      return (St().memoizedState = e);
    },
    useTransition: function () {
      var e = bc(!1),
        t = e[0];
      return (e = _v.bind(null, e[1])), (St().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = Ae,
        o = St();
      if (ve) {
        if (n === void 0) throw Error(B(407));
        n = n();
      } else {
        if (((n = t()), Te === null)) throw Error(B(349));
        Bn & 30 || hf(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        _c(gf.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Co(9, mf.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = St(),
        t = Te.identifierPrefix;
      if (ve) {
        var n = Mt,
          r = $t;
        (n = (r & ~(1 << (32 - At(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Ao++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = bv++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  xv = {
    readContext: pt,
    useCallback: _f,
    useContext: pt,
    useEffect: Ru,
    useImperativeHandle: bf,
    useInsertionEffect: Af,
    useLayoutEffect: wf,
    useMemo: Sf,
    useReducer: gl,
    useRef: Ef,
    useState: function () {
      return gl(wo);
    },
    useDebugValue: Nu,
    useDeferredValue: function (e) {
      var t = ht();
      return kf(t, xe.memoizedState, e);
    },
    useTransition: function () {
      var e = gl(wo)[0],
        t = ht().memoizedState;
      return [e, t];
    },
    useMutableSource: ff,
    useSyncExternalStore: pf,
    useId: Df,
    unstable_isNewReconciler: !1,
  },
  Fv = {
    readContext: pt,
    useCallback: _f,
    useContext: pt,
    useEffect: Ru,
    useImperativeHandle: bf,
    useInsertionEffect: Af,
    useLayoutEffect: wf,
    useMemo: Sf,
    useReducer: yl,
    useRef: Ef,
    useState: function () {
      return yl(wo);
    },
    useDebugValue: Nu,
    useDeferredValue: function (e) {
      var t = ht();
      return xe === null ? (t.memoizedState = e) : kf(t, xe.memoizedState, e);
    },
    useTransition: function () {
      var e = yl(wo)[0],
        t = ht().memoizedState;
      return [e, t];
    },
    useMutableSource: ff,
    useSyncExternalStore: pf,
    useId: Df,
    unstable_isNewReconciler: !1,
  };
function br(e, t) {
  try {
    var n = "",
      r = t;
    do (n += ry(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function vl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ms(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ov = typeof WeakMap == "function" ? WeakMap : Map;
function Tf(e, t, n) {
  (n = zt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Xi || ((Xi = !0), (Ss = r)), ms(e, t);
    }),
    n
  );
}
function Rf(e, t, n) {
  (n = zt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        ms(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        ms(e, t),
          typeof r != "function" &&
            (un === null ? (un = new Set([this])) : un.add(this));
        var a = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: a !== null ? a : "",
        });
      }),
    n
  );
}
function Sc(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ov();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = Hv.bind(null, e, t, n)), t.then(e, e));
}
function kc(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Dc(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = zt(-1, 1)), (t.tag = 2), sn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Tv = Gt.ReactCurrentOwner,
  We = !1;
function Me(e, t, n, r) {
  t.child = e === null ? cf(t, null, n, r) : wr(t, e.child, n, r);
}
function xc(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    dr(t, o),
    (r = Ou(e, t, n, r, i, o)),
    (n = Tu()),
    e !== null && !We
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Ht(e, t, o))
      : (ve && n && vu(t), (t.flags |= 1), Me(e, t, r, o), t.child)
  );
}
function Fc(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !ju(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Nf(e, t, i, r, o))
      : ((e = Ci(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var a = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : ho), n(a, r) && e.ref === t.ref)
    )
      return Ht(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = dn(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Nf(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (ho(i, r) && e.ref === t.ref)
      if (((We = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (We = !0);
      else return (t.lanes = e.lanes), Ht(e, t, o);
  }
  return gs(e, t, n, r, o);
}
function Bf(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        pe(ir, qe),
        (qe |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          pe(ir, qe),
          (qe |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        pe(ir, qe),
        (qe |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      pe(ir, qe),
      (qe |= r);
  return Me(e, t, o, n), t.child;
}
function If(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function gs(e, t, n, r, o) {
  var i = Ye(n) ? Rn : $e.current;
  return (
    (i = Er(t, i)),
    dr(t, o),
    (n = Ou(e, t, n, r, i, o)),
    (r = Tu()),
    e !== null && !We
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        Ht(e, t, o))
      : (ve && r && vu(t), (t.flags |= 1), Me(e, t, n, o), t.child)
  );
}
function Oc(e, t, n, r, o) {
  if (Ye(n)) {
    var i = !0;
    zi(t);
  } else i = !1;
  if ((dr(t, o), t.stateNode === null))
    Ei(e, t), sf(t, n, r), hs(t, n, r, o), (r = !0);
  else if (e === null) {
    var a = t.stateNode,
      s = t.memoizedProps;
    a.props = s;
    var l = a.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = pt(u))
      : ((u = Ye(n) ? Rn : $e.current), (u = Er(t, u)));
    var d = n.getDerivedStateFromProps,
      c =
        typeof d == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== r || l !== u) && wc(t, a, r, u)),
      (Xt = !1);
    var m = t.memoizedState;
    (a.state = m),
      Wi(t, r, a, o),
      (l = t.memoizedState),
      s !== r || m !== l || Ge.current || Xt
        ? (typeof d == "function" && (ps(t, n, d, r), (l = t.memoizedState)),
          (s = Xt || Ac(t, n, s, r, m, l, u))
            ? (c ||
                (typeof a.UNSAFE_componentWillMount != "function" &&
                  typeof a.componentWillMount != "function") ||
                (typeof a.componentWillMount == "function" &&
                  a.componentWillMount(),
                typeof a.UNSAFE_componentWillMount == "function" &&
                  a.UNSAFE_componentWillMount()),
              typeof a.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = l)),
          (a.props = r),
          (a.state = l),
          (a.context = u),
          (r = s))
        : (typeof a.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (a = t.stateNode),
      af(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : gt(t.type, s)),
      (a.props = u),
      (c = t.pendingProps),
      (m = a.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = pt(l))
        : ((l = Ye(n) ? Rn : $e.current), (l = Er(t, l)));
    var C = n.getDerivedStateFromProps;
    (d =
      typeof C == "function" ||
      typeof a.getSnapshotBeforeUpdate == "function") ||
      (typeof a.UNSAFE_componentWillReceiveProps != "function" &&
        typeof a.componentWillReceiveProps != "function") ||
      ((s !== c || m !== l) && wc(t, a, r, l)),
      (Xt = !1),
      (m = t.memoizedState),
      (a.state = m),
      Wi(t, r, a, o);
    var v = t.memoizedState;
    s !== c || m !== v || Ge.current || Xt
      ? (typeof C == "function" && (ps(t, n, C, r), (v = t.memoizedState)),
        (u = Xt || Ac(t, n, u, r, m, v, l) || !1)
          ? (d ||
              (typeof a.UNSAFE_componentWillUpdate != "function" &&
                typeof a.componentWillUpdate != "function") ||
              (typeof a.componentWillUpdate == "function" &&
                a.componentWillUpdate(r, v, l),
              typeof a.UNSAFE_componentWillUpdate == "function" &&
                a.UNSAFE_componentWillUpdate(r, v, l)),
            typeof a.componentDidUpdate == "function" && (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof a.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof a.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (a.props = r),
        (a.state = v),
        (a.context = l),
        (r = u))
      : (typeof a.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof a.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ys(e, t, n, r, i, o);
}
function ys(e, t, n, r, o, i) {
  If(e, t);
  var a = (t.flags & 128) !== 0;
  if (!r && !a) return o && mc(t, n, !1), Ht(e, t, i);
  (r = t.stateNode), (Tv.current = t);
  var s =
    a && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && a
      ? ((t.child = wr(t, e.child, null, i)), (t.child = wr(t, null, s, i)))
      : Me(e, t, s, i),
    (t.memoizedState = r.state),
    o && mc(t, n, !0),
    t.child
  );
}
function Lf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? hc(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && hc(e, t.context, !1),
    ku(e, t.containerInfo);
}
function Tc(e, t, n, r, o) {
  return Ar(), Au(o), (t.flags |= 256), Me(e, t, n, r), t.child;
}
var vs = { dehydrated: null, treeContext: null, retryLane: 0 };
function Es(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Pf(e, t, n) {
  var r = t.pendingProps,
    o = Ee.current,
    i = !1,
    a = (t.flags & 128) !== 0,
    s;
  if (
    ((s = a) ||
      (s = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    s
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    pe(Ee, o & 1),
    e === null)
  )
    return (
      ds(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((a = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (a = { mode: "hidden", children: a }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = a))
                : (i = Ca(a, r, 0, null)),
              (e = Tn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Es(n)),
              (t.memoizedState = vs),
              e)
            : Bu(t, a))
    );
  if (((o = e.memoizedState), o !== null && ((s = o.dehydrated), s !== null)))
    return Rv(e, t, a, r, s, o, n);
  if (i) {
    (i = r.fallback), (a = t.mode), (o = e.child), (s = o.sibling);
    var l = { mode: "hidden", children: r.children };
    return (
      !(a & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (t.deletions = null))
        : ((r = dn(o, l)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      s !== null ? (i = dn(s, i)) : ((i = Tn(i, a, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (a = e.child.memoizedState),
      (a =
        a === null
          ? Es(n)
          : {
              baseLanes: a.baseLanes | n,
              cachePool: null,
              transitions: a.transitions,
            }),
      (i.memoizedState = a),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = vs),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = dn(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Bu(e, t) {
  return (
    (t = Ca({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function ii(e, t, n, r) {
  return (
    r !== null && Au(r),
    wr(t, e.child, null, n),
    (e = Bu(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Rv(e, t, n, r, o, i, a) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = vl(Error(B(422)))), ii(e, t, a, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = Ca({ mode: "visible", children: r.children }, o, 0, null)),
        (i = Tn(i, o, a, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && wr(t, e.child, null, a),
        (t.child.memoizedState = Es(a)),
        (t.memoizedState = vs),
        i);
  if (!(t.mode & 1)) return ii(e, t, a, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (i = Error(B(419))), (r = vl(i, r, void 0)), ii(e, t, a, r);
  }
  if (((s = (a & e.childLanes) !== 0), We || s)) {
    if (((r = Te), r !== null)) {
      switch (a & -a) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | a) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), Vt(e, o), wt(r, e, o, -1));
    }
    return zu(), (r = vl(Error(B(421)))), ii(e, t, a, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Wv.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ke = ln(o.nextSibling)),
      (Je = t),
      (ve = !0),
      (vt = null),
      e !== null &&
        ((lt[st++] = $t),
        (lt[st++] = Mt),
        (lt[st++] = Nn),
        ($t = e.id),
        (Mt = e.overflow),
        (Nn = t)),
      (t = Bu(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Rc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), fs(e.return, t, n);
}
function El(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function $f(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((Me(e, t, r.children, n), (r = Ee.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Rc(e, n, t);
        else if (e.tag === 19) Rc(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((pe(Ee, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && Gi(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          El(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Gi(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        El(t, !0, n, null, i);
        break;
      case "together":
        El(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Ei(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ht(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (In |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(B(153));
  if (t.child !== null) {
    for (
      e = t.child, n = dn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = dn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Nv(e, t, n) {
  switch (t.tag) {
    case 3:
      Lf(t), Ar();
      break;
    case 5:
      df(t);
      break;
    case 1:
      Ye(t.type) && zi(t);
      break;
    case 4:
      ku(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      pe(Vi, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (pe(Ee, Ee.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Pf(e, t, n)
          : (pe(Ee, Ee.current & 1),
            (e = Ht(e, t, n)),
            e !== null ? e.sibling : null);
      pe(Ee, Ee.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return $f(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        pe(Ee, Ee.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Bf(e, t, n);
  }
  return Ht(e, t, n);
}
var Mf, As, zf, jf;
Mf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
As = function () {};
zf = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), xn(Ft.current);
    var i = null;
    switch (n) {
      case "input":
        (o = Ul(e, o)), (r = Ul(e, r)), (i = []);
        break;
      case "select":
        (o = we({}, o, { value: void 0 })),
          (r = we({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = Wl(e, o)), (r = Wl(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = $i);
    }
    Yl(n, r);
    var a;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var s = o[u];
          for (a in s) s.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (ao.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((s = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && l !== s && (l != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (a in s)
              !s.hasOwnProperty(a) ||
                (l && l.hasOwnProperty(a)) ||
                (n || (n = {}), (n[a] = ""));
            for (a in l)
              l.hasOwnProperty(a) &&
                s[a] !== l[a] &&
                (n || (n = {}), (n[a] = l[a]));
          } else n || (i || (i = []), i.push(u, n)), (n = l);
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (s = s ? s.__html : void 0),
              l != null && s !== l && (i = i || []).push(u, l))
            : u === "children"
            ? (typeof l != "string" && typeof l != "number") ||
              (i = i || []).push(u, "" + l)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (ao.hasOwnProperty(u)
                ? (l != null && u === "onScroll" && he("scroll", e),
                  i || s === l || (i = []))
                : (i = i || []).push(u, l));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
jf = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function jr(e, t) {
  if (!ve)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Bv(e, t, n) {
  var r = t.pendingProps;
  switch ((Eu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Le(t), null;
    case 1:
      return Ye(t.type) && Mi(), Le(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Cr(),
        me(Ge),
        me($e),
        xu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (ri(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), vt !== null && (xs(vt), (vt = null)))),
        As(e, t),
        Le(t),
        null
      );
    case 5:
      Du(t);
      var o = xn(Eo.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        zf(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(B(166));
          return Le(t), null;
        }
        if (((e = xn(Ft.current)), ri(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[kt] = t), (r[yo] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              he("cancel", r), he("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              he("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Yr.length; o++) he(Yr[o], r);
              break;
            case "source":
              he("error", r);
              break;
            case "img":
            case "image":
            case "link":
              he("error", r), he("load", r);
              break;
            case "details":
              he("toggle", r);
              break;
            case "input":
              j0(r, i), he("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                he("invalid", r);
              break;
            case "textarea":
              V0(r, i), he("invalid", r);
          }
          Yl(n, i), (o = null);
          for (var a in i)
            if (i.hasOwnProperty(a)) {
              var s = i[a];
              a === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (i.suppressHydrationWarning !== !0 &&
                      ni(r.textContent, s, e),
                    (o = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (i.suppressHydrationWarning !== !0 &&
                      ni(r.textContent, s, e),
                    (o = ["children", "" + s]))
                : ao.hasOwnProperty(a) &&
                  s != null &&
                  a === "onScroll" &&
                  he("scroll", r);
            }
          switch (n) {
            case "input":
              Zo(r), U0(r, i, !0);
              break;
            case "textarea":
              Zo(r), H0(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = $i);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (a = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = pd(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = a.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = a.createElement(n, { is: r.is }))
                : ((e = a.createElement(n)),
                  n === "select" &&
                    ((a = e),
                    r.multiple
                      ? (a.multiple = !0)
                      : r.size && (a.size = r.size)))
              : (e = a.createElementNS(e, n)),
            (e[kt] = t),
            (e[yo] = r),
            Mf(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((a = Zl(n, r)), n)) {
              case "dialog":
                he("cancel", e), he("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                he("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Yr.length; o++) he(Yr[o], e);
                o = r;
                break;
              case "source":
                he("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                he("error", e), he("load", e), (o = r);
                break;
              case "details":
                he("toggle", e), (o = r);
                break;
              case "input":
                j0(e, r), (o = Ul(e, r)), he("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = we({}, r, { value: void 0 })),
                  he("invalid", e);
                break;
              case "textarea":
                V0(e, r), (o = Wl(e, r)), he("invalid", e);
                break;
              default:
                o = r;
            }
            Yl(n, o), (s = o);
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var l = s[i];
                i === "style"
                  ? gd(e, l)
                  : i === "dangerouslySetInnerHTML"
                  ? ((l = l ? l.__html : void 0), l != null && hd(e, l))
                  : i === "children"
                  ? typeof l == "string"
                    ? (n !== "textarea" || l !== "") && lo(e, l)
                    : typeof l == "number" && lo(e, "" + l)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (ao.hasOwnProperty(i)
                      ? l != null && i === "onScroll" && he("scroll", e)
                      : l != null && ou(e, i, l, a));
              }
            switch (n) {
              case "input":
                Zo(e), U0(e, r, !1);
                break;
              case "textarea":
                Zo(e), H0(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + fn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? lr(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      lr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = $i);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Le(t), null;
    case 6:
      if (e && t.stateNode != null) jf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(B(166));
        if (((n = xn(Eo.current)), xn(Ft.current), ri(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[kt] = t),
            (i = r.nodeValue !== n) && ((e = Je), e !== null))
          )
            switch (e.tag) {
              case 3:
                ni(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ni(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[kt] = t),
            (t.stateNode = r);
      }
      return Le(t), null;
    case 13:
      if (
        (me(Ee),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ve && Ke !== null && t.mode & 1 && !(t.flags & 128))
          rf(), Ar(), (t.flags |= 98560), (i = !1);
        else if (((i = ri(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(B(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(B(317));
            i[kt] = t;
          } else
            Ar(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Le(t), (i = !1);
        } else vt !== null && (xs(vt), (vt = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Ee.current & 1 ? Fe === 0 && (Fe = 3) : zu())),
          t.updateQueue !== null && (t.flags |= 4),
          Le(t),
          null);
    case 4:
      return (
        Cr(), As(e, t), e === null && mo(t.stateNode.containerInfo), Le(t), null
      );
    case 10:
      return bu(t.type._context), Le(t), null;
    case 17:
      return Ye(t.type) && Mi(), Le(t), null;
    case 19:
      if ((me(Ee), (i = t.memoizedState), i === null)) return Le(t), null;
      if (((r = (t.flags & 128) !== 0), (a = i.rendering), a === null))
        if (r) jr(i, !1);
        else {
          if (Fe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((a = Gi(e)), a !== null)) {
                for (
                  t.flags |= 128,
                    jr(i, !1),
                    r = a.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (a = i.alternate),
                    a === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = a.childLanes),
                        (i.lanes = a.lanes),
                        (i.child = a.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = a.memoizedProps),
                        (i.memoizedState = a.memoizedState),
                        (i.updateQueue = a.updateQueue),
                        (i.type = a.type),
                        (e = a.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return pe(Ee, (Ee.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            _e() > _r &&
            ((t.flags |= 128), (r = !0), jr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Gi(a)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              jr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !a.alternate && !ve)
            )
              return Le(t), null;
          } else
            2 * _e() - i.renderingStartTime > _r &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), jr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((a.sibling = t.child), (t.child = a))
          : ((n = i.last),
            n !== null ? (n.sibling = a) : (t.child = a),
            (i.last = a));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = _e()),
          (t.sibling = null),
          (n = Ee.current),
          pe(Ee, r ? (n & 1) | 2 : n & 1),
          t)
        : (Le(t), null);
    case 22:
    case 23:
      return (
        Mu(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? qe & 1073741824 && (Le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Le(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(B(156, t.tag));
}
function Iv(e, t) {
  switch ((Eu(t), t.tag)) {
    case 1:
      return (
        Ye(t.type) && Mi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Cr(),
        me(Ge),
        me($e),
        xu(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Du(t), null;
    case 13:
      if (
        (me(Ee), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(B(340));
        Ar();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return me(Ee), null;
    case 4:
      return Cr(), null;
    case 10:
      return bu(t.type._context), null;
    case 22:
    case 23:
      return Mu(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ai = !1,
  Pe = !1,
  Lv = typeof WeakSet == "function" ? WeakSet : Set,
  U = null;
function or(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        Ce(e, t, r);
      }
    else n.current = null;
}
function ws(e, t, n) {
  try {
    n();
  } catch (r) {
    Ce(e, t, r);
  }
}
var Nc = !1;
function Pv(e, t) {
  if (((os = Ii), (e = Hd()), yu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var a = 0,
            s = -1,
            l = -1,
            u = 0,
            d = 0,
            c = e,
            m = null;
          t: for (;;) {
            for (
              var C;
              c !== n || (o !== 0 && c.nodeType !== 3) || (s = a + o),
                c !== i || (r !== 0 && c.nodeType !== 3) || (l = a + r),
                c.nodeType === 3 && (a += c.nodeValue.length),
                (C = c.firstChild) !== null;

            )
              (m = c), (c = C);
            for (;;) {
              if (c === e) break t;
              if (
                (m === n && ++u === o && (s = a),
                m === i && ++d === r && (l = a),
                (C = c.nextSibling) !== null)
              )
                break;
              (c = m), (m = c.parentNode);
            }
            c = C;
          }
          n = s === -1 || l === -1 ? null : { start: s, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (is = { focusedElem: e, selectionRange: n }, Ii = !1, U = t; U !== null; )
    if (((t = U), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (U = e);
    else
      for (; U !== null; ) {
        t = U;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var p = v.memoizedProps,
                    E = v.memoizedState,
                    h = t.stateNode,
                    f = h.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? p : gt(t.type, p),
                      E
                    );
                  h.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var g = t.stateNode.containerInfo;
                g.nodeType === 1
                  ? (g.textContent = "")
                  : g.nodeType === 9 &&
                    g.documentElement &&
                    g.removeChild(g.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(B(163));
            }
        } catch (_) {
          Ce(t, t.return, _);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (U = e);
          break;
        }
        U = t.return;
      }
  return (v = Nc), (Nc = !1), v;
}
function to(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && ws(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function Aa(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Cs(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Uf(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Uf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[kt], delete t[yo], delete t[ss], delete t[Ev], delete t[Av])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Vf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bc(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Vf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function bs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = $i));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (bs(e, t, n), e = e.sibling; e !== null; ) bs(e, t, n), (e = e.sibling);
}
function _s(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (_s(e, t, n), e = e.sibling; e !== null; ) _s(e, t, n), (e = e.sibling);
}
var Re = null,
  yt = !1;
function Zt(e, t, n) {
  for (n = n.child; n !== null; ) Hf(e, t, n), (n = n.sibling);
}
function Hf(e, t, n) {
  if (xt && typeof xt.onCommitFiberUnmount == "function")
    try {
      xt.onCommitFiberUnmount(fa, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Pe || or(n, t);
    case 6:
      var r = Re,
        o = yt;
      (Re = null),
        Zt(e, t, n),
        (Re = r),
        (yt = o),
        Re !== null &&
          (yt
            ? ((e = Re),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Re.removeChild(n.stateNode));
      break;
    case 18:
      Re !== null &&
        (yt
          ? ((e = Re),
            (n = n.stateNode),
            e.nodeType === 8
              ? fl(e.parentNode, n)
              : e.nodeType === 1 && fl(e, n),
            fo(e))
          : fl(Re, n.stateNode));
      break;
    case 4:
      (r = Re),
        (o = yt),
        (Re = n.stateNode.containerInfo),
        (yt = !0),
        Zt(e, t, n),
        (Re = r),
        (yt = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Pe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            a = i.destroy;
          (i = i.tag),
            a !== void 0 && (i & 2 || i & 4) && ws(n, t, a),
            (o = o.next);
        } while (o !== r);
      }
      Zt(e, t, n);
      break;
    case 1:
      if (
        !Pe &&
        (or(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          Ce(n, t, s);
        }
      Zt(e, t, n);
      break;
    case 21:
      Zt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Pe = (r = Pe) || n.memoizedState !== null), Zt(e, t, n), (Pe = r))
        : Zt(e, t, n);
      break;
    default:
      Zt(e, t, n);
  }
}
function Ic(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Lv()),
      t.forEach(function (r) {
        var o = Gv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function mt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          a = t,
          s = a;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (Re = s.stateNode), (yt = !1);
              break e;
            case 3:
              (Re = s.stateNode.containerInfo), (yt = !0);
              break e;
            case 4:
              (Re = s.stateNode.containerInfo), (yt = !0);
              break e;
          }
          s = s.return;
        }
        if (Re === null) throw Error(B(160));
        Hf(i, a, o), (Re = null), (yt = !1);
        var l = o.alternate;
        l !== null && (l.return = null), (o.return = null);
      } catch (u) {
        Ce(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Wf(t, e), (t = t.sibling);
}
function Wf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((mt(t, e), bt(e), r & 4)) {
        try {
          to(3, e, e.return), Aa(3, e);
        } catch (p) {
          Ce(e, e.return, p);
        }
        try {
          to(5, e, e.return);
        } catch (p) {
          Ce(e, e.return, p);
        }
      }
      break;
    case 1:
      mt(t, e), bt(e), r & 512 && n !== null && or(n, n.return);
      break;
    case 5:
      if (
        (mt(t, e),
        bt(e),
        r & 512 && n !== null && or(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          lo(o, "");
        } catch (p) {
          Ce(e, e.return, p);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          a = n !== null ? n.memoizedProps : i,
          s = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            s === "input" && i.type === "radio" && i.name != null && dd(o, i),
              Zl(s, a);
            var u = Zl(s, i);
            for (a = 0; a < l.length; a += 2) {
              var d = l[a],
                c = l[a + 1];
              d === "style"
                ? gd(o, c)
                : d === "dangerouslySetInnerHTML"
                ? hd(o, c)
                : d === "children"
                ? lo(o, c)
                : ou(o, d, c, u);
            }
            switch (s) {
              case "input":
                Vl(o, i);
                break;
              case "textarea":
                fd(o, i);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var C = i.value;
                C != null
                  ? lr(o, !!i.multiple, C, !1)
                  : m !== !!i.multiple &&
                    (i.defaultValue != null
                      ? lr(o, !!i.multiple, i.defaultValue, !0)
                      : lr(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[yo] = i;
          } catch (p) {
            Ce(e, e.return, p);
          }
      }
      break;
    case 6:
      if ((mt(t, e), bt(e), r & 4)) {
        if (e.stateNode === null) throw Error(B(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (p) {
          Ce(e, e.return, p);
        }
      }
      break;
    case 3:
      if (
        (mt(t, e), bt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          fo(t.containerInfo);
        } catch (p) {
          Ce(e, e.return, p);
        }
      break;
    case 4:
      mt(t, e), bt(e);
      break;
    case 13:
      mt(t, e),
        bt(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (Pu = _e())),
        r & 4 && Ic(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Pe = (u = Pe) || d), mt(t, e), (Pe = u)) : mt(t, e),
        bt(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !d && e.mode & 1)
        )
          for (U = e, d = e.child; d !== null; ) {
            for (c = U = d; U !== null; ) {
              switch (((m = U), (C = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  to(4, m, m.return);
                  break;
                case 1:
                  or(m, m.return);
                  var v = m.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (p) {
                      Ce(r, n, p);
                    }
                  }
                  break;
                case 5:
                  or(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Pc(c);
                    continue;
                  }
              }
              C !== null ? ((C.return = m), (U = C)) : Pc(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = e; ; ) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                (o = c.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((s = c.stateNode),
                      (l = c.memoizedProps.style),
                      (a =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (s.style.display = md("display", a)));
              } catch (p) {
                Ce(e, e.return, p);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = u ? "" : c.memoizedProps;
              } catch (p) {
                Ce(e, e.return, p);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            d === c && (d = null), (c = c.return);
          }
          d === c && (d = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      mt(t, e), bt(e), r & 4 && Ic(e);
      break;
    case 21:
      break;
    default:
      mt(t, e), bt(e);
  }
}
function bt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Vf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(B(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (lo(o, ""), (r.flags &= -33));
          var i = Bc(e);
          _s(e, i, o);
          break;
        case 3:
        case 4:
          var a = r.stateNode.containerInfo,
            s = Bc(e);
          bs(e, s, a);
          break;
        default:
          throw Error(B(161));
      }
    } catch (l) {
      Ce(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function $v(e, t, n) {
  (U = e), Gf(e);
}
function Gf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; U !== null; ) {
    var o = U,
      i = o.child;
    if (o.tag === 22 && r) {
      var a = o.memoizedState !== null || ai;
      if (!a) {
        var s = o.alternate,
          l = (s !== null && s.memoizedState !== null) || Pe;
        s = ai;
        var u = Pe;
        if (((ai = a), (Pe = l) && !u))
          for (U = o; U !== null; )
            (a = U),
              (l = a.child),
              a.tag === 22 && a.memoizedState !== null
                ? $c(o)
                : l !== null
                ? ((l.return = a), (U = l))
                : $c(o);
        for (; i !== null; ) (U = i), Gf(i), (i = i.sibling);
        (U = o), (ai = s), (Pe = u);
      }
      Lc(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (U = i)) : Lc(e);
  }
}
function Lc(e) {
  for (; U !== null; ) {
    var t = U;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Pe || Aa(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Pe)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : gt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Ec(t, i, r);
              break;
            case 3:
              var a = t.updateQueue;
              if (a !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ec(t, a, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && fo(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(B(163));
          }
        Pe || (t.flags & 512 && Cs(t));
      } catch (m) {
        Ce(t, t.return, m);
      }
    }
    if (t === e) {
      U = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (U = n);
      break;
    }
    U = t.return;
  }
}
function Pc(e) {
  for (; U !== null; ) {
    var t = U;
    if (t === e) {
      U = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (U = n);
      break;
    }
    U = t.return;
  }
}
function $c(e) {
  for (; U !== null; ) {
    var t = U;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Aa(4, t);
          } catch (l) {
            Ce(t, n, l);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (l) {
              Ce(t, o, l);
            }
          }
          var i = t.return;
          try {
            Cs(t);
          } catch (l) {
            Ce(t, i, l);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Cs(t);
          } catch (l) {
            Ce(t, a, l);
          }
      }
    } catch (l) {
      Ce(t, t.return, l);
    }
    if (t === e) {
      U = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (U = s);
      break;
    }
    U = t.return;
  }
}
var Mv = Math.ceil,
  Qi = Gt.ReactCurrentDispatcher,
  Iu = Gt.ReactCurrentOwner,
  ft = Gt.ReactCurrentBatchConfig,
  le = 0,
  Te = null,
  ke = null,
  Ne = 0,
  qe = 0,
  ir = yn(0),
  Fe = 0,
  bo = null,
  In = 0,
  wa = 0,
  Lu = 0,
  no = null,
  He = null,
  Pu = 0,
  _r = 1 / 0,
  It = null,
  Xi = !1,
  Ss = null,
  un = null,
  li = !1,
  nn = null,
  qi = 0,
  ro = 0,
  ks = null,
  Ai = -1,
  wi = 0;
function je() {
  return le & 6 ? _e() : Ai !== -1 ? Ai : (Ai = _e());
}
function cn(e) {
  return e.mode & 1
    ? le & 2 && Ne !== 0
      ? Ne & -Ne
      : Cv.transition !== null
      ? (wi === 0 && (wi = xd()), wi)
      : ((e = ue),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Id(e.type))),
        e)
    : 1;
}
function wt(e, t, n, r) {
  if (50 < ro) throw ((ro = 0), (ks = null), Error(B(185)));
  Do(e, n, r),
    (!(le & 2) || e !== Te) &&
      (e === Te && (!(le & 2) && (wa |= n), Fe === 4 && Kt(e, Ne)),
      Ze(e, r),
      n === 1 && le === 0 && !(t.mode & 1) && ((_r = _e() + 500), ya && vn()));
}
function Ze(e, t) {
  var n = e.callbackNode;
  Cy(e, t);
  var r = Bi(e, e === Te ? Ne : 0);
  if (r === 0)
    n !== null && Y0(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Y0(n), t === 1))
      e.tag === 0 ? wv(Mc.bind(null, e)) : ef(Mc.bind(null, e)),
        yv(function () {
          !(le & 6) && vn();
        }),
        (n = null);
    else {
      switch (Fd(r)) {
        case 1:
          n = uu;
          break;
        case 4:
          n = kd;
          break;
        case 16:
          n = Ni;
          break;
        case 536870912:
          n = Dd;
          break;
        default:
          n = Ni;
      }
      n = ep(n, Yf.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Yf(e, t) {
  if (((Ai = -1), (wi = 0), le & 6)) throw Error(B(327));
  var n = e.callbackNode;
  if (fr() && e.callbackNode !== n) return null;
  var r = Bi(e, e === Te ? Ne : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ki(e, r);
  else {
    t = r;
    var o = le;
    le |= 2;
    var i = Qf();
    (Te !== e || Ne !== t) && ((It = null), (_r = _e() + 500), On(e, t));
    do
      try {
        Uv();
        break;
      } catch (s) {
        Zf(e, s);
      }
    while (1);
    Cu(),
      (Qi.current = i),
      (le = o),
      ke !== null ? (t = 0) : ((Te = null), (Ne = 0), (t = Fe));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Jl(e)), o !== 0 && ((r = o), (t = Ds(e, o)))), t === 1)
    )
      throw ((n = bo), On(e, 0), Kt(e, r), Ze(e, _e()), n);
    if (t === 6) Kt(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !zv(o) &&
          ((t = Ki(e, r)),
          t === 2 && ((i = Jl(e)), i !== 0 && ((r = i), (t = Ds(e, i)))),
          t === 1))
      )
        throw ((n = bo), On(e, 0), Kt(e, r), Ze(e, _e()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(B(345));
        case 2:
          bn(e, He, It);
          break;
        case 3:
          if (
            (Kt(e, r), (r & 130023424) === r && ((t = Pu + 500 - _e()), 10 < t))
          ) {
            if (Bi(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              je(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = ls(bn.bind(null, e, He, It), t);
            break;
          }
          bn(e, He, It);
          break;
        case 4:
          if ((Kt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var a = 31 - At(r);
            (i = 1 << a), (a = t[a]), a > o && (o = a), (r &= ~i);
          }
          if (
            ((r = o),
            (r = _e() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Mv(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ls(bn.bind(null, e, He, It), r);
            break;
          }
          bn(e, He, It);
          break;
        case 5:
          bn(e, He, It);
          break;
        default:
          throw Error(B(329));
      }
    }
  }
  return Ze(e, _e()), e.callbackNode === n ? Yf.bind(null, e) : null;
}
function Ds(e, t) {
  var n = no;
  return (
    e.current.memoizedState.isDehydrated && (On(e, t).flags |= 256),
    (e = Ki(e, t)),
    e !== 2 && ((t = He), (He = n), t !== null && xs(t)),
    e
  );
}
function xs(e) {
  He === null ? (He = e) : He.push.apply(He, e);
}
function zv(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!Ct(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Kt(e, t) {
  for (
    t &= ~Lu,
      t &= ~wa,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - At(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Mc(e) {
  if (le & 6) throw Error(B(327));
  fr();
  var t = Bi(e, 0);
  if (!(t & 1)) return Ze(e, _e()), null;
  var n = Ki(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Jl(e);
    r !== 0 && ((t = r), (n = Ds(e, r)));
  }
  if (n === 1) throw ((n = bo), On(e, 0), Kt(e, t), Ze(e, _e()), n);
  if (n === 6) throw Error(B(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    bn(e, He, It),
    Ze(e, _e()),
    null
  );
}
function $u(e, t) {
  var n = le;
  le |= 1;
  try {
    return e(t);
  } finally {
    (le = n), le === 0 && ((_r = _e() + 500), ya && vn());
  }
}
function Ln(e) {
  nn !== null && nn.tag === 0 && !(le & 6) && fr();
  var t = le;
  le |= 1;
  var n = ft.transition,
    r = ue;
  try {
    if (((ft.transition = null), (ue = 1), e)) return e();
  } finally {
    (ue = r), (ft.transition = n), (le = t), !(le & 6) && vn();
  }
}
function Mu() {
  (qe = ir.current), me(ir);
}
function On(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), gv(n)), ke !== null))
    for (n = ke.return; n !== null; ) {
      var r = n;
      switch ((Eu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Mi();
          break;
        case 3:
          Cr(), me(Ge), me($e), xu();
          break;
        case 5:
          Du(r);
          break;
        case 4:
          Cr();
          break;
        case 13:
          me(Ee);
          break;
        case 19:
          me(Ee);
          break;
        case 10:
          bu(r.type._context);
          break;
        case 22:
        case 23:
          Mu();
      }
      n = n.return;
    }
  if (
    ((Te = e),
    (ke = e = dn(e.current, null)),
    (Ne = qe = t),
    (Fe = 0),
    (bo = null),
    (Lu = wa = In = 0),
    (He = no = null),
    Dn !== null)
  ) {
    for (t = 0; t < Dn.length; t++)
      if (((n = Dn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var a = i.next;
          (i.next = o), (r.next = a);
        }
        n.pending = r;
      }
    Dn = null;
  }
  return e;
}
function Zf(e, t) {
  do {
    var n = ke;
    try {
      if ((Cu(), (yi.current = Zi), Yi)) {
        for (var r = Ae.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        Yi = !1;
      }
      if (
        ((Bn = 0),
        (Oe = xe = Ae = null),
        (eo = !1),
        (Ao = 0),
        (Iu.current = null),
        n === null || n.return === null)
      ) {
        (Fe = 1), (bo = t), (ke = null);
        break;
      }
      e: {
        var i = e,
          a = n.return,
          s = n,
          l = t;
        if (
          ((t = Ne),
          (s.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            d = s,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var m = d.alternate;
            m
              ? ((d.updateQueue = m.updateQueue),
                (d.memoizedState = m.memoizedState),
                (d.lanes = m.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var C = kc(a);
          if (C !== null) {
            (C.flags &= -257),
              Dc(C, a, s, i, t),
              C.mode & 1 && Sc(i, u, t),
              (t = C),
              (l = u);
            var v = t.updateQueue;
            if (v === null) {
              var p = new Set();
              p.add(l), (t.updateQueue = p);
            } else v.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              Sc(i, u, t), zu();
              break e;
            }
            l = Error(B(426));
          }
        } else if (ve && s.mode & 1) {
          var E = kc(a);
          if (E !== null) {
            !(E.flags & 65536) && (E.flags |= 256),
              Dc(E, a, s, i, t),
              Au(br(l, s));
            break e;
          }
        }
        (i = l = br(l, s)),
          Fe !== 4 && (Fe = 2),
          no === null ? (no = [i]) : no.push(i),
          (i = a);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var h = Tf(i, l, t);
              vc(i, h);
              break e;
            case 1:
              s = l;
              var f = i.type,
                g = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (g !== null &&
                    typeof g.componentDidCatch == "function" &&
                    (un === null || !un.has(g))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var _ = Rf(i, s, t);
                vc(i, _);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      qf(n);
    } catch (D) {
      (t = D), ke === n && n !== null && (ke = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function Qf() {
  var e = Qi.current;
  return (Qi.current = Zi), e === null ? Zi : e;
}
function zu() {
  (Fe === 0 || Fe === 3 || Fe === 2) && (Fe = 4),
    Te === null || (!(In & 268435455) && !(wa & 268435455)) || Kt(Te, Ne);
}
function Ki(e, t) {
  var n = le;
  le |= 2;
  var r = Qf();
  (Te !== e || Ne !== t) && ((It = null), On(e, t));
  do
    try {
      jv();
      break;
    } catch (o) {
      Zf(e, o);
    }
  while (1);
  if ((Cu(), (le = n), (Qi.current = r), ke !== null)) throw Error(B(261));
  return (Te = null), (Ne = 0), Fe;
}
function jv() {
  for (; ke !== null; ) Xf(ke);
}
function Uv() {
  for (; ke !== null && !py(); ) Xf(ke);
}
function Xf(e) {
  var t = Jf(e.alternate, e, qe);
  (e.memoizedProps = e.pendingProps),
    t === null ? qf(e) : (ke = t),
    (Iu.current = null);
}
function qf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Iv(n, t)), n !== null)) {
        (n.flags &= 32767), (ke = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Fe = 6), (ke = null);
        return;
      }
    } else if (((n = Bv(n, t, qe)), n !== null)) {
      ke = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ke = t;
      return;
    }
    ke = t = e;
  } while (t !== null);
  Fe === 0 && (Fe = 5);
}
function bn(e, t, n) {
  var r = ue,
    o = ft.transition;
  try {
    (ft.transition = null), (ue = 1), Vv(e, t, n, r);
  } finally {
    (ft.transition = o), (ue = r);
  }
  return null;
}
function Vv(e, t, n, r) {
  do fr();
  while (nn !== null);
  if (le & 6) throw Error(B(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(B(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (by(e, i),
    e === Te && ((ke = Te = null), (Ne = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      li ||
      ((li = !0),
      ep(Ni, function () {
        return fr(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = ft.transition), (ft.transition = null);
    var a = ue;
    ue = 1;
    var s = le;
    (le |= 4),
      (Iu.current = null),
      Pv(e, n),
      Wf(n, e),
      uv(is),
      (Ii = !!os),
      (is = os = null),
      (e.current = n),
      $v(n),
      hy(),
      (le = s),
      (ue = a),
      (ft.transition = i);
  } else e.current = n;
  if (
    (li && ((li = !1), (nn = e), (qi = o)),
    (i = e.pendingLanes),
    i === 0 && (un = null),
    yy(n.stateNode),
    Ze(e, _e()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (Xi) throw ((Xi = !1), (e = Ss), (Ss = null), e);
  return (
    qi & 1 && e.tag !== 0 && fr(),
    (i = e.pendingLanes),
    i & 1 ? (e === ks ? ro++ : ((ro = 0), (ks = e))) : (ro = 0),
    vn(),
    null
  );
}
function fr() {
  if (nn !== null) {
    var e = Fd(qi),
      t = ft.transition,
      n = ue;
    try {
      if (((ft.transition = null), (ue = 16 > e ? 16 : e), nn === null))
        var r = !1;
      else {
        if (((e = nn), (nn = null), (qi = 0), le & 6)) throw Error(B(331));
        var o = le;
        for (le |= 4, U = e.current; U !== null; ) {
          var i = U,
            a = i.child;
          if (U.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var l = 0; l < s.length; l++) {
                var u = s[l];
                for (U = u; U !== null; ) {
                  var d = U;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      to(8, d, i);
                  }
                  var c = d.child;
                  if (c !== null) (c.return = d), (U = c);
                  else
                    for (; U !== null; ) {
                      d = U;
                      var m = d.sibling,
                        C = d.return;
                      if ((Uf(d), d === u)) {
                        U = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = C), (U = m);
                        break;
                      }
                      U = C;
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var p = v.child;
                if (p !== null) {
                  v.child = null;
                  do {
                    var E = p.sibling;
                    (p.sibling = null), (p = E);
                  } while (p !== null);
                }
              }
              U = i;
            }
          }
          if (i.subtreeFlags & 2064 && a !== null) (a.return = i), (U = a);
          else
            e: for (; U !== null; ) {
              if (((i = U), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    to(9, i, i.return);
                }
              var h = i.sibling;
              if (h !== null) {
                (h.return = i.return), (U = h);
                break e;
              }
              U = i.return;
            }
        }
        var f = e.current;
        for (U = f; U !== null; ) {
          a = U;
          var g = a.child;
          if (a.subtreeFlags & 2064 && g !== null) (g.return = a), (U = g);
          else
            e: for (a = f; U !== null; ) {
              if (((s = U), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Aa(9, s);
                  }
                } catch (D) {
                  Ce(s, s.return, D);
                }
              if (s === a) {
                U = null;
                break e;
              }
              var _ = s.sibling;
              if (_ !== null) {
                (_.return = s.return), (U = _);
                break e;
              }
              U = s.return;
            }
        }
        if (
          ((le = o), vn(), xt && typeof xt.onPostCommitFiberRoot == "function")
        )
          try {
            xt.onPostCommitFiberRoot(fa, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (ue = n), (ft.transition = t);
    }
  }
  return !1;
}
function zc(e, t, n) {
  (t = br(n, t)),
    (t = Tf(e, t, 1)),
    (e = sn(e, t, 1)),
    (t = je()),
    e !== null && (Do(e, 1, t), Ze(e, t));
}
function Ce(e, t, n) {
  if (e.tag === 3) zc(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        zc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (un === null || !un.has(r)))
        ) {
          (e = br(n, e)),
            (e = Rf(t, e, 1)),
            (t = sn(t, e, 1)),
            (e = je()),
            t !== null && (Do(t, 1, e), Ze(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Hv(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = je()),
    (e.pingedLanes |= e.suspendedLanes & n),
    Te === e &&
      (Ne & n) === n &&
      (Fe === 4 || (Fe === 3 && (Ne & 130023424) === Ne && 500 > _e() - Pu)
        ? On(e, 0)
        : (Lu |= n)),
    Ze(e, t);
}
function Kf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = qo), (qo <<= 1), !(qo & 130023424) && (qo = 4194304))
      : (t = 1));
  var n = je();
  (e = Vt(e, t)), e !== null && (Do(e, t, n), Ze(e, n));
}
function Wv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Kf(e, n);
}
function Gv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(B(314));
  }
  r !== null && r.delete(t), Kf(e, n);
}
var Jf;
Jf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ge.current) We = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (We = !1), Nv(e, t, n);
      We = !!(e.flags & 131072);
    }
  else (We = !1), ve && t.flags & 1048576 && tf(t, Ui, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Ei(e, t), (e = t.pendingProps);
      var o = Er(t, $e.current);
      dr(t, n), (o = Ou(null, t, r, e, o, n));
      var i = Tu();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ye(r) ? ((i = !0), zi(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            Su(t),
            (o.updater = va),
            (t.stateNode = o),
            (o._reactInternals = t),
            hs(t, r, e, n),
            (t = ys(null, t, r, !0, i, n)))
          : ((t.tag = 0), ve && i && vu(t), Me(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Ei(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Zv(r)),
          (e = gt(r, e)),
          o)
        ) {
          case 0:
            t = gs(null, t, r, e, n);
            break e;
          case 1:
            t = Oc(null, t, r, e, n);
            break e;
          case 11:
            t = xc(null, t, r, e, n);
            break e;
          case 14:
            t = Fc(null, t, r, gt(r.type, e), n);
            break e;
        }
        throw Error(B(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : gt(r, o)),
        gs(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : gt(r, o)),
        Oc(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((Lf(t), e === null)) throw Error(B(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          af(e, t),
          Wi(t, r, null, n);
        var a = t.memoizedState;
        if (((r = a.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: a.cache,
              pendingSuspenseBoundaries: a.pendingSuspenseBoundaries,
              transitions: a.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = br(Error(B(423)), t)), (t = Tc(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = br(Error(B(424)), t)), (t = Tc(e, t, r, n, o));
            break e;
          } else
            for (
              Ke = ln(t.stateNode.containerInfo.firstChild),
                Je = t,
                ve = !0,
                vt = null,
                n = cf(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Ar(), r === o)) {
            t = Ht(e, t, n);
            break e;
          }
          Me(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        df(t),
        e === null && ds(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (a = o.children),
        as(r, o) ? (a = null) : i !== null && as(r, i) && (t.flags |= 32),
        If(e, t),
        Me(e, t, a, n),
        t.child
      );
    case 6:
      return e === null && ds(t), null;
    case 13:
      return Pf(e, t, n);
    case 4:
      return (
        ku(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = wr(t, null, r, n)) : Me(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : gt(r, o)),
        xc(e, t, r, o, n)
      );
    case 7:
      return Me(e, t, t.pendingProps, n), t.child;
    case 8:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (a = o.value),
          pe(Vi, r._currentValue),
          (r._currentValue = a),
          i !== null)
        )
          if (Ct(i.value, a)) {
            if (i.children === o.children && !Ge.current) {
              t = Ht(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var s = i.dependencies;
              if (s !== null) {
                a = i.child;
                for (var l = s.firstContext; l !== null; ) {
                  if (l.context === r) {
                    if (i.tag === 1) {
                      (l = zt(-1, n & -n)), (l.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        d === null
                          ? (l.next = l)
                          : ((l.next = d.next), (d.next = l)),
                          (u.pending = l);
                      }
                    }
                    (i.lanes |= n),
                      (l = i.alternate),
                      l !== null && (l.lanes |= n),
                      fs(i.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  l = l.next;
                }
              } else if (i.tag === 10) a = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((a = i.return), a === null)) throw Error(B(341));
                (a.lanes |= n),
                  (s = a.alternate),
                  s !== null && (s.lanes |= n),
                  fs(a, n, t),
                  (a = i.sibling);
              } else a = i.child;
              if (a !== null) a.return = i;
              else
                for (a = i; a !== null; ) {
                  if (a === t) {
                    a = null;
                    break;
                  }
                  if (((i = a.sibling), i !== null)) {
                    (i.return = a.return), (a = i);
                    break;
                  }
                  a = a.return;
                }
              i = a;
            }
        Me(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        dr(t, n),
        (o = pt(o)),
        (r = r(o)),
        (t.flags |= 1),
        Me(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = gt(r, t.pendingProps)),
        (o = gt(r.type, o)),
        Fc(e, t, r, o, n)
      );
    case 15:
      return Nf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : gt(r, o)),
        Ei(e, t),
        (t.tag = 1),
        Ye(r) ? ((e = !0), zi(t)) : (e = !1),
        dr(t, n),
        sf(t, r, o),
        hs(t, r, o, n),
        ys(null, t, r, !0, e, n)
      );
    case 19:
      return $f(e, t, n);
    case 22:
      return Bf(e, t, n);
  }
  throw Error(B(156, t.tag));
};
function ep(e, t) {
  return Sd(e, t);
}
function Yv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function dt(e, t, n, r) {
  return new Yv(e, t, n, r);
}
function ju(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Zv(e) {
  if (typeof e == "function") return ju(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === au)) return 11;
    if (e === lu) return 14;
  }
  return 2;
}
function dn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = dt(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Ci(e, t, n, r, o, i) {
  var a = 2;
  if (((r = e), typeof e == "function")) ju(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else
    e: switch (e) {
      case Qn:
        return Tn(n.children, o, i, t);
      case iu:
        (a = 8), (o |= 8);
        break;
      case $l:
        return (
          (e = dt(12, n, t, o | 2)), (e.elementType = $l), (e.lanes = i), e
        );
      case Ml:
        return (e = dt(13, n, t, o)), (e.elementType = Ml), (e.lanes = i), e;
      case zl:
        return (e = dt(19, n, t, o)), (e.elementType = zl), (e.lanes = i), e;
      case sd:
        return Ca(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case ad:
              a = 10;
              break e;
            case ld:
              a = 9;
              break e;
            case au:
              a = 11;
              break e;
            case lu:
              a = 14;
              break e;
            case Qt:
              (a = 16), (r = null);
              break e;
          }
        throw Error(B(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = dt(a, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function Tn(e, t, n, r) {
  return (e = dt(7, e, r, t)), (e.lanes = n), e;
}
function Ca(e, t, n, r) {
  return (
    (e = dt(22, e, r, t)),
    (e.elementType = sd),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Al(e, t, n) {
  return (e = dt(6, e, null, t)), (e.lanes = n), e;
}
function wl(e, t, n) {
  return (
    (t = dt(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Qv(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = tl(0)),
    (this.expirationTimes = tl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = tl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function Uu(e, t, n, r, o, i, a, s, l) {
  return (
    (e = new Qv(e, t, n, s, l)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = dt(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Su(i),
    e
  );
}
function Xv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Zn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function tp(e) {
  if (!e) return pn;
  e = e._reactInternals;
  e: {
    if (Mn(e) !== e || e.tag !== 1) throw Error(B(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ye(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(B(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ye(n)) return Jd(e, n, t);
  }
  return t;
}
function np(e, t, n, r, o, i, a, s, l) {
  return (
    (e = Uu(n, r, !0, e, o, i, a, s, l)),
    (e.context = tp(null)),
    (n = e.current),
    (r = je()),
    (o = cn(n)),
    (i = zt(r, o)),
    (i.callback = t ?? null),
    sn(n, i, o),
    (e.current.lanes = o),
    Do(e, o, r),
    Ze(e, r),
    e
  );
}
function ba(e, t, n, r) {
  var o = t.current,
    i = je(),
    a = cn(o);
  return (
    (n = tp(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = zt(i, a)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = sn(o, t, a)),
    e !== null && (wt(e, o, a, i), gi(e, o, a)),
    a
  );
}
function Ji(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function jc(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Vu(e, t) {
  jc(e, t), (e = e.alternate) && jc(e, t);
}
function qv() {
  return null;
}
var rp =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Hu(e) {
  this._internalRoot = e;
}
_a.prototype.render = Hu.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(B(409));
  ba(e, t, null, null);
};
_a.prototype.unmount = Hu.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ln(function () {
      ba(null, e, null, null);
    }),
      (t[Ut] = null);
  }
};
function _a(e) {
  this._internalRoot = e;
}
_a.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Rd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < qt.length && t !== 0 && t < qt[n].priority; n++);
    qt.splice(n, 0, e), n === 0 && Bd(e);
  }
};
function Wu(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Sa(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Uc() {}
function Kv(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = Ji(a);
        i.call(u);
      };
    }
    var a = np(t, r, e, 0, null, !1, !1, "", Uc);
    return (
      (e._reactRootContainer = a),
      (e[Ut] = a.current),
      mo(e.nodeType === 8 ? e.parentNode : e),
      Ln(),
      a
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = Ji(l);
      s.call(u);
    };
  }
  var l = Uu(e, 0, !1, null, null, !1, !1, "", Uc);
  return (
    (e._reactRootContainer = l),
    (e[Ut] = l.current),
    mo(e.nodeType === 8 ? e.parentNode : e),
    Ln(function () {
      ba(t, l, n, r);
    }),
    l
  );
}
function ka(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var a = i;
    if (typeof o == "function") {
      var s = o;
      o = function () {
        var l = Ji(a);
        s.call(l);
      };
    }
    ba(t, a, e, o);
  } else a = Kv(n, t, e, o, r);
  return Ji(a);
}
Od = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Gr(t.pendingLanes);
        n !== 0 &&
          (cu(t, n | 1), Ze(t, _e()), !(le & 6) && ((_r = _e() + 500), vn()));
      }
      break;
    case 13:
      Ln(function () {
        var r = Vt(e, 1);
        if (r !== null) {
          var o = je();
          wt(r, e, 1, o);
        }
      }),
        Vu(e, 1);
  }
};
du = function (e) {
  if (e.tag === 13) {
    var t = Vt(e, 134217728);
    if (t !== null) {
      var n = je();
      wt(t, e, 134217728, n);
    }
    Vu(e, 134217728);
  }
};
Td = function (e) {
  if (e.tag === 13) {
    var t = cn(e),
      n = Vt(e, t);
    if (n !== null) {
      var r = je();
      wt(n, e, t, r);
    }
    Vu(e, t);
  }
};
Rd = function () {
  return ue;
};
Nd = function (e, t) {
  var n = ue;
  try {
    return (ue = e), t();
  } finally {
    ue = n;
  }
};
Xl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Vl(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = ga(r);
            if (!o) throw Error(B(90));
            cd(r), Vl(r, o);
          }
        }
      }
      break;
    case "textarea":
      fd(e, n);
      break;
    case "select":
      (t = n.value), t != null && lr(e, !!n.multiple, t, !1);
  }
};
Ed = $u;
Ad = Ln;
var Jv = { usingClientEntryPoint: !1, Events: [Fo, Jn, ga, yd, vd, $u] },
  Ur = {
    findFiberByHostInstance: kn,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  e3 = {
    bundleType: Ur.bundleType,
    version: Ur.version,
    rendererPackageName: Ur.rendererPackageName,
    rendererConfig: Ur.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Gt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = bd(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Ur.findFiberByHostInstance || qv,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var si = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!si.isDisabled && si.supportsFiber)
    try {
      (fa = si.inject(e3)), (xt = si);
    } catch {}
}
nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jv;
nt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Wu(t)) throw Error(B(200));
  return Xv(e, t, null, n);
};
nt.createRoot = function (e, t) {
  if (!Wu(e)) throw Error(B(299));
  var n = !1,
    r = "",
    o = rp;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Uu(e, 1, !1, null, null, n, !1, r, o)),
    (e[Ut] = t.current),
    mo(e.nodeType === 8 ? e.parentNode : e),
    new Hu(t)
  );
};
nt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(B(188))
      : ((e = Object.keys(e).join(",")), Error(B(268, e)));
  return (e = bd(t)), (e = e === null ? null : e.stateNode), e;
};
nt.flushSync = function (e) {
  return Ln(e);
};
nt.hydrate = function (e, t, n) {
  if (!Sa(t)) throw Error(B(200));
  return ka(null, e, t, !0, n);
};
nt.hydrateRoot = function (e, t, n) {
  if (!Wu(e)) throw Error(B(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    a = rp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (a = n.onRecoverableError)),
    (t = np(t, null, e, 1, n ?? null, o, !1, i, a)),
    (e[Ut] = t.current),
    mo(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new _a(t);
};
nt.render = function (e, t, n) {
  if (!Sa(t)) throw Error(B(200));
  return ka(null, e, t, !1, n);
};
nt.unmountComponentAtNode = function (e) {
  if (!Sa(e)) throw Error(B(40));
  return e._reactRootContainer
    ? (Ln(function () {
        ka(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Ut] = null);
        });
      }),
      !0)
    : !1;
};
nt.unstable_batchedUpdates = $u;
nt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Sa(n)) throw Error(B(200));
  if (e == null || e._reactInternals === void 0) throw Error(B(38));
  return ka(e, t, n, !1, r);
};
nt.version = "18.2.0-next-9e3b772b8-20220608";
function op() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(op);
    } catch (e) {
      console.error(e);
    }
}
op(), (td.exports = nt);
var To = td.exports;
const LC = Sr(To);
function Fs() {
  return (
    (Tt =
      Object.assign ||
      function (e) {
        for (let t = 1; t < arguments.length; t++) {
          const n = arguments[t];
          for (const r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    Tt.apply(this, arguments)
  );
}
function Gu(e, t, n) {
  return (
    (n = {
      path: t,
      exports: {},
      require: function (r, o) {
        return t3(r, o ?? n.path);
      },
    }),
    e(n, n.exports),
    n.exports
  );
}
function t3() {
  throw new Error(
    "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
  );
}
let pr;
typeof window < "u"
  ? (pr = window)
  : typeof self < "u"
  ? (pr = self)
  : (pr = {});
pr.setTimeout;
pr.clearTimeout;
function Ro() {}
const Vr = pr.performance || {};
Vr.now || Vr.mozNow || Vr.msNow || Vr.oNow || Vr.webkitNow;
const n3 = function (e, t) {
    let n;
    const r = toObject(e);
    let o;
    for (let i = 1; i < arguments.length; i++) {
      n = Object(arguments[i]);
      for (const a in n) hasOwnProperty.call(n, a) && (r[a] = n[a]);
      if (getOwnPropertySymbols) {
        o = getOwnPropertySymbols(n);
        for (let a = 0; a < o.length; a++)
          propIsEnumerable.call(n, o[a]) && (r[o[a]] = n[o[a]]);
      }
    }
    return r;
  },
  r3 = ap() ? w.useLayoutEffect : w.useEffect,
  Vc = {};
let ip = Ro;
ip = function (t) {
  Vc[t] || (Vc[t] = !0);
};
function o3(e, t) {
  if (e != null)
    if (a3(e)) e(t);
    else
      try {
        e.current = t;
      } catch {
        throw new Error('Cannot assign value "' + t + '" to ref "' + e + '"');
      }
}
function ap() {
  return !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  );
}
function Da(e) {
  return w.forwardRef(e);
}
function i3(e) {
  return ap() ? (e ? e.ownerDocument : document) : null;
}
function a3(e) {
  return !!(e && {}.toString.call(e) == "[object Function]");
}
function l3(e) {
  return typeof e == "string";
}
let lp = Ro;
lp = function (t) {
  const n = w.useRef(t);
  w.useEffect(
    function () {
      return void (n.current = t);
    },
    [t]
  ),
    w.useEffect(function () {
      return ip(n.current);
    }, []);
};
function s3() {
  const e = w.useState(Object.create(null)),
    t = e[1];
  return w.useCallback(function () {
    t(Object.create(null));
  }, []);
}
function u3() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return w.useMemo(function () {
    return t.every(function (r) {
      return r == null;
    })
      ? null
      : function (r) {
          t.forEach(function (o) {
            o3(o, r);
          });
        };
  }, [].concat(t));
}
function bi(e, t) {
  return function (n) {
    if ((e && e(n), !n.defaultPrevented)) return t(n);
  };
}
const sp = function (t) {
  const n = t.children,
    r = t.type,
    o = r === void 0 ? "reach-portal" : r,
    i = w.useRef(null),
    a = w.useRef(null),
    s = s3();
  return (
    r3(
      function () {
        if (!i.current) return;
        const l = i.current.ownerDocument;
        return (
          (a.current = l == null ? void 0 : l.createElement(o)),
          l.body.appendChild(a.current),
          s(),
          function () {
            a.current &&
              a.current.ownerDocument &&
              a.current.ownerDocument.body.removeChild(a.current);
          }
        );
      },
      [o, s]
    ),
    a.current
      ? To.createPortal(n, a.current)
      : w.createElement("span", { ref: i })
  );
};
sp.displayName = "Portal";
function c3(e, t) {
  if (e == null) return {};
  const n = {},
    r = Object.keys(e);
  let o, i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const d3 = Gu(function (e, t) {
    (function () {
      const n = typeof Symbol == "function" && Symbol.for,
        r = n ? Symbol.for("react.element") : 60103,
        o = n ? Symbol.for("react.portal") : 60106,
        i = n ? Symbol.for("react.fragment") : 60107,
        a = n ? Symbol.for("react.strict_mode") : 60108,
        s = n ? Symbol.for("react.profiler") : 60114,
        l = n ? Symbol.for("react.provider") : 60109,
        u = n ? Symbol.for("react.context") : 60110,
        d = n ? Symbol.for("react.async_mode") : 60111,
        c = n ? Symbol.for("react.concurrent_mode") : 60111,
        m = n ? Symbol.for("react.forward_ref") : 60112,
        C = n ? Symbol.for("react.suspense") : 60113,
        v = n ? Symbol.for("react.suspense_list") : 60120,
        p = n ? Symbol.for("react.memo") : 60115,
        E = n ? Symbol.for("react.lazy") : 60116,
        h = n ? Symbol.for("react.block") : 60121,
        f = n ? Symbol.for("react.fundamental") : 60117,
        g = n ? Symbol.for("react.responder") : 60118,
        _ = n ? Symbol.for("react.scope") : 60119;
      function D(X) {
        return (
          typeof X == "string" ||
          typeof X == "function" ||
          X === i ||
          X === c ||
          X === s ||
          X === a ||
          X === C ||
          X === v ||
          (typeof X == "object" &&
            X !== null &&
            (X.$$typeof === E ||
              X.$$typeof === p ||
              X.$$typeof === l ||
              X.$$typeof === u ||
              X.$$typeof === m ||
              X.$$typeof === f ||
              X.$$typeof === g ||
              X.$$typeof === _ ||
              X.$$typeof === h))
        );
      }
      function T(X) {
        if (typeof X == "object" && X !== null) {
          const Tr = X.$$typeof;
          switch (Tr) {
            case r:
              var zn = X.type;
              switch (zn) {
                case d:
                case c:
                case i:
                case s:
                case a:
                case C:
                  return zn;
                default:
                  var Lo = zn && zn.$$typeof;
                  switch (Lo) {
                    case u:
                    case m:
                    case E:
                    case p:
                    case l:
                      return Lo;
                    default:
                      return Tr;
                  }
              }
            case o:
              return Tr;
          }
        }
      }
      const k = d,
        x = c,
        P = u,
        $ = l,
        ee = r,
        R = m,
        M = i,
        j = E,
        Q = p,
        q = o,
        ne = s,
        F = a,
        L = C;
      let I = !1;
      function G(X) {
        return (
          I ||
            ((I = !0),
            console.warn(
              "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API."
            )),
          J(X) || T(X) === d
        );
      }
      function J(X) {
        return T(X) === c;
      }
      function K(X) {
        return T(X) === u;
      }
      function ce(X) {
        return T(X) === l;
      }
      function ot(X) {
        return typeof X == "object" && X !== null && X.$$typeof === r;
      }
      function de(X) {
        return T(X) === m;
      }
      function De(X) {
        return T(X) === i;
      }
      function it(X) {
        return T(X) === E;
      }
      function Yt(X) {
        return T(X) === p;
      }
      function Or(X) {
        return T(X) === o;
      }
      function Bo(X) {
        return T(X) === s;
      }
      function Io(X) {
        return T(X) === a;
      }
      function Ba(X) {
        return T(X) === C;
      }
      (t.AsyncMode = k),
        (t.ConcurrentMode = x),
        (t.ContextConsumer = P),
        (t.ContextProvider = $),
        (t.Element = ee),
        (t.ForwardRef = R),
        (t.Fragment = M),
        (t.Lazy = j),
        (t.Memo = Q),
        (t.Portal = q),
        (t.Profiler = ne),
        (t.StrictMode = F),
        (t.Suspense = L),
        (t.isAsyncMode = G),
        (t.isConcurrentMode = J),
        (t.isContextConsumer = K),
        (t.isContextProvider = ce),
        (t.isElement = ot),
        (t.isForwardRef = de),
        (t.isFragment = De),
        (t.isLazy = it),
        (t.isMemo = Yt),
        (t.isPortal = Or),
        (t.isProfiler = Bo),
        (t.isStrictMode = Io),
        (t.isSuspense = Ba),
        (t.isValidElementType = D),
        (t.typeOf = T);
    })();
  }),
  up = Gu(function (e) {
    e.exports = d3;
  }),
  f3 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  _n = f3;
let Os = function () {};
{
  var p3 = _n,
    Ts = {},
    h3 = Function.call.bind(Object.prototype.hasOwnProperty);
  Os = function (e) {
    const t = "Warning: " + e;
    typeof console < "u" && console.error(t);
    try {
      throw new Error(t);
    } catch {}
  };
}
function cp(e, t, n, r, o) {
  for (const a in e)
    if (h3(e, a)) {
      var i;
      try {
        if (typeof e[a] != "function") {
          const s = Error(
            (r || "React class") +
              ": " +
              n +
              " type `" +
              a +
              "` is invalid; it must be a function, usually from the `prop-types` package, but received `" +
              typeof e[a] +
              "`."
          );
          throw ((s.name = "Invariant Violation"), s);
        }
        i = e[a](t, a, r, n, null, p3);
      } catch (s) {
        i = s;
      }
      if (
        (i &&
          !(i instanceof Error) &&
          Os(
            (r || "React class") +
              ": type specification of " +
              n +
              " `" +
              a +
              "` is invalid; the type checker function must return `null` or an `Error` but returned a " +
              typeof i +
              ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ),
        i instanceof Error && !(i.message in Ts))
      ) {
        Ts[i.message] = !0;
        const s = o ? o() : "";
        Os("Failed " + n + " type: " + i.message + (s ?? ""));
      }
    }
}
cp.resetWarningCache = function () {
  Ts = {};
};
const Hc = cp,
  m3 = Function.call.bind(Object.prototype.hasOwnProperty);
let Gn = function () {};
Gn = function (e) {
  const t = "Warning: " + e;
  typeof console < "u" && console.error(t);
  try {
    throw new Error(t);
  } catch {}
};
function ui() {
  return null;
}
const g3 = function (e, t) {
    const n = typeof Symbol == "function" && Symbol.iterator,
      r = "@@iterator";
    function o(R) {
      const M = R && ((n && R[n]) || R[r]);
      if (typeof M == "function") return M;
    }
    const i = "<<anonymous>>",
      a = {
        array: d("array"),
        bool: d("boolean"),
        func: d("function"),
        number: d("number"),
        object: d("object"),
        string: d("string"),
        symbol: d("symbol"),
        any: c(),
        arrayOf: m,
        element: C(),
        elementType: v(),
        instanceOf: p,
        node: g(),
        objectOf: h,
        oneOf: E,
        oneOfType: f,
        shape: _,
        exact: D,
      };
    function s(R, M) {
      return R === M ? R !== 0 || 1 / R === 1 / M : R !== R && M !== M;
    }
    function l(R) {
      (this.message = R), (this.stack = "");
    }
    l.prototype = Error.prototype;
    function u(R) {
      var M = {},
        j = 0;
      function Q(ne, F, L, I, G, J, K) {
        if (((I = I || i), (J = J || L), K !== _n)) {
          if (t) {
            const ce = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((ce.name = "Invariant Violation"), ce);
          } else if (typeof console < "u") {
            const ce = I + ":" + L;
            !M[ce] &&
              j < 3 &&
              (Gn(
                "You are manually calling a React.PropTypes validation function for the `" +
                  J +
                  "` prop on `" +
                  I +
                  "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
              ),
              (M[ce] = !0),
              j++);
          }
        }
        return F[L] == null
          ? ne
            ? F[L] === null
              ? new l(
                  "The " +
                    G +
                    " `" +
                    J +
                    "` is marked as required " +
                    ("in `" + I + "`, but its value is `null`.")
                )
              : new l(
                  "The " +
                    G +
                    " `" +
                    J +
                    "` is marked as required in " +
                    ("`" + I + "`, but its value is `undefined`.")
                )
            : null
          : R(F, L, I, G, J);
      }
      const q = Q.bind(null, !1);
      return (q.isRequired = Q.bind(null, !0)), q;
    }
    function d(R) {
      function M(j, Q, q, ne, F, L) {
        const I = j[Q];
        if (x(I) !== R) {
          const J = P(I);
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type " +
              ("`" + J + "` supplied to `" + q + "`, expected ") +
              ("`" + R + "`.")
          );
        }
        return null;
      }
      return u(M);
    }
    function c() {
      return u(ui);
    }
    function m(R) {
      function M(j, Q, q, ne, F) {
        if (typeof R != "function")
          return new l(
            "Property `" +
              F +
              "` of component `" +
              q +
              "` has invalid PropType notation inside arrayOf."
          );
        const L = j[Q];
        if (!Array.isArray(L)) {
          const I = x(L);
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type " +
              ("`" + I + "` supplied to `" + q + "`, expected an array.")
          );
        }
        for (let I = 0; I < L.length; I++) {
          const G = R(L, I, q, ne, F + "[" + I + "]", _n);
          if (G instanceof Error) return G;
        }
        return null;
      }
      return u(M);
    }
    function C() {
      function R(M, j, Q, q, ne) {
        const F = M[j];
        if (!e(F)) {
          const L = x(F);
          return new l(
            "Invalid " +
              q +
              " `" +
              ne +
              "` of type " +
              ("`" +
                L +
                "` supplied to `" +
                Q +
                "`, expected a single ReactElement.")
          );
        }
        return null;
      }
      return u(R);
    }
    function v() {
      function R(M, j, Q, q, ne) {
        const F = M[j];
        if (!up.isValidElementType(F)) {
          const L = x(F);
          return new l(
            "Invalid " +
              q +
              " `" +
              ne +
              "` of type " +
              ("`" +
                L +
                "` supplied to `" +
                Q +
                "`, expected a single ReactElement type.")
          );
        }
        return null;
      }
      return u(R);
    }
    function p(R) {
      function M(j, Q, q, ne, F) {
        if (!(j[Q] instanceof R)) {
          const L = R.name || i,
            I = ee(j[Q]);
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type " +
              ("`" + I + "` supplied to `" + q + "`, expected ") +
              ("instance of `" + L + "`.")
          );
        }
        return null;
      }
      return u(M);
    }
    function E(R) {
      if (!Array.isArray(R))
        return (
          arguments.length > 1
            ? Gn(
                "Invalid arguments supplied to oneOf, expected an array, got " +
                  arguments.length +
                  " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              )
            : Gn("Invalid argument supplied to oneOf, expected an array."),
          ui
        );
      function M(j, Q, q, ne, F) {
        const L = j[Q];
        for (let G = 0; G < R.length; G++) if (s(L, R[G])) return null;
        const I = JSON.stringify(R, function (J, K) {
          return P(K) === "symbol" ? String(K) : K;
        });
        return new l(
          "Invalid " +
            ne +
            " `" +
            F +
            "` of value `" +
            String(L) +
            "` " +
            ("supplied to `" + q + "`, expected one of " + I + ".")
        );
      }
      return u(M);
    }
    function h(R) {
      function M(j, Q, q, ne, F) {
        if (typeof R != "function")
          return new l(
            "Property `" +
              F +
              "` of component `" +
              q +
              "` has invalid PropType notation inside objectOf."
          );
        const L = j[Q],
          I = x(L);
        if (I !== "object")
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type " +
              ("`" + I + "` supplied to `" + q + "`, expected an object.")
          );
        for (const G in L)
          if (m3(L, G)) {
            const J = R(L, G, q, ne, F + "." + G, _n);
            if (J instanceof Error) return J;
          }
        return null;
      }
      return u(M);
    }
    function f(R) {
      if (!Array.isArray(R))
        return (
          Gn(
            "Invalid argument supplied to oneOfType, expected an instance of array."
          ),
          ui
        );
      for (let j = 0; j < R.length; j++) {
        const Q = R[j];
        if (typeof Q != "function")
          return (
            Gn(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " +
                $(Q) +
                " at index " +
                j +
                "."
            ),
            ui
          );
      }
      function M(j, Q, q, ne, F) {
        for (let L = 0; L < R.length; L++) {
          const I = R[L];
          if (I(j, Q, q, ne, F, _n) == null) return null;
        }
        return new l(
          "Invalid " + ne + " `" + F + "` supplied to " + ("`" + q + "`.")
        );
      }
      return u(M);
    }
    function g() {
      function R(M, j, Q, q, ne) {
        return T(M[j])
          ? null
          : new l(
              "Invalid " +
                q +
                " `" +
                ne +
                "` supplied to " +
                ("`" + Q + "`, expected a ReactNode.")
            );
      }
      return u(R);
    }
    function _(R) {
      function M(j, Q, q, ne, F) {
        const L = j[Q],
          I = x(L);
        if (I !== "object")
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type `" +
              I +
              "` " +
              ("supplied to `" + q + "`, expected `object`.")
          );
        for (const G in R) {
          const J = R[G];
          if (!J) continue;
          const K = J(L, G, q, ne, F + "." + G, _n);
          if (K) return K;
        }
        return null;
      }
      return u(M);
    }
    function D(R) {
      function M(j, Q, q, ne, F) {
        const L = j[Q],
          I = x(L);
        if (I !== "object")
          return new l(
            "Invalid " +
              ne +
              " `" +
              F +
              "` of type `" +
              I +
              "` " +
              ("supplied to `" + q + "`, expected `object`.")
          );
        const G = n3({}, j[Q], R);
        for (const J in G) {
          const K = R[J];
          if (!K)
            return new l(
              "Invalid " +
                ne +
                " `" +
                F +
                "` key `" +
                J +
                "` supplied to `" +
                q +
                "`.\nBad object: " +
                JSON.stringify(j[Q], null, "  ") +
                `
Valid keys: ` +
                JSON.stringify(Object.keys(R), null, "  ")
            );
          const ce = K(L, J, q, ne, F + "." + J, _n);
          if (ce) return ce;
        }
        return null;
      }
      return u(M);
    }
    function T(R) {
      switch (typeof R) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !R;
        case "object":
          if (Array.isArray(R)) return R.every(T);
          if (R === null || e(R)) return !0;
          var M = o(R);
          if (M) {
            const j = M.call(R);
            let Q;
            if (M !== R.entries) {
              for (; !(Q = j.next()).done; ) if (!T(Q.value)) return !1;
            } else
              for (; !(Q = j.next()).done; ) {
                const q = Q.value;
                if (q && !T(q[1])) return !1;
              }
          } else return !1;
          return !0;
        default:
          return !1;
      }
    }
    function k(R, M) {
      return R === "symbol"
        ? !0
        : M
        ? M["@@toStringTag"] === "Symbol" ||
          (typeof Symbol == "function" && M instanceof Symbol)
        : !1;
    }
    function x(R) {
      const M = typeof R;
      return Array.isArray(R)
        ? "array"
        : R instanceof RegExp
        ? "object"
        : k(M, R)
        ? "symbol"
        : M;
    }
    function P(R) {
      if (typeof R > "u" || R === null) return "" + R;
      const M = x(R);
      if (M === "object") {
        if (R instanceof Date) return "date";
        if (R instanceof RegExp) return "regexp";
      }
      return M;
    }
    function $(R) {
      const M = P(R);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function ee(R) {
      return !R.constructor || !R.constructor.name ? i : R.constructor.name;
    }
    return (
      (a.checkPropTypes = Hc),
      (a.resetWarningCache = Hc.resetWarningCache),
      (a.PropTypes = a),
      a
    );
  },
  se = Gu(function (e) {
    {
      const t = up,
        n = !0;
      e.exports = g3(t.isElement, n);
    }
  }),
  Rs = "data-focus-lock",
  dp = "data-focus-lock-disabled",
  y3 = "data-no-focus-lock",
  v3 = "data-autofocus-inside";
function E3(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function A3(e, t) {
  var n = w.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          const o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
function fp(e, t) {
  return A3(t, function (n) {
    return e.forEach(function (r) {
      return E3(r, n);
    });
  });
}
const Cl = {
  width: "1px",
  height: "0px",
  padding: 0,
  overflow: "hidden",
  position: "fixed",
  top: "1px",
  left: "1px",
};
se.node;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var ea =
  function () {
    return (
      (ea =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (const i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      ea.apply(this, arguments)
    );
  };
function w3(e, t) {
  const n = {};
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
function pp(e) {
  return e;
}
function hp(e, t) {
  t === void 0 && (t = pp);
  let n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw new Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (i) {
      const a = t(i, r);
      return (
        n.push(a),
        function () {
          n = n.filter(function (s) {
            return s !== a;
          });
        }
      );
    },
    assignSyncMedium: function (i) {
      for (r = !0; n.length; ) {
        const a = n;
        (n = []), a.forEach(i);
      }
      n = {
        push: function (a) {
          return i(a);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (i) {
      r = !0;
      let a = [];
      if (n.length) {
        const u = n;
        (n = []), u.forEach(i), (a = n);
      }
      const s = function () {
          const u = a;
          (a = []), u.forEach(i);
        },
        l = function () {
          return Promise.resolve().then(s);
        };
      l(),
        (n = {
          push: function (u) {
            a.push(u), l();
          },
          filter: function (u) {
            return (a = a.filter(u)), n;
          },
        });
    },
  };
}
function Yu(e, t) {
  return t === void 0 && (t = pp), hp(e, t);
}
function mp(e) {
  e === void 0 && (e = {});
  const t = hp(null);
  return (t.options = ea({ async: !0, ssr: !1 }, e)), t;
}
const gp = function (e) {
  const t = e.sideCar,
    n = w3(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  const r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return w.createElement(r, ea({}, n));
};
gp.isSideCarExport = !0;
function C3(e, t) {
  return e.useMedium(t), gp;
}
const yp = Yu({}, function (e) {
    const t = e.target,
      n = e.currentTarget;
    return { target: t, currentTarget: n };
  }),
  vp = Yu(),
  b3 = Yu(),
  _3 = mp({ async: !0 }),
  S3 = [],
  xa = w.forwardRef(function (t, n) {
    let r;
    const o = w.useState(),
      i = o[0],
      a = o[1],
      s = w.useRef(),
      l = w.useRef(!1),
      u = w.useRef(null),
      d = t.children,
      c = t.disabled,
      m = t.noFocusGuards,
      C = t.persistentFocus,
      v = t.crossFrame,
      p = t.autoFocus,
      E = t.allowTextSelection,
      h = t.group,
      f = t.className,
      g = t.whiteList,
      _ = t.shards,
      D = _ === void 0 ? S3 : _,
      T = t.as,
      k = T === void 0 ? "div" : T,
      x = t.lockProps,
      P = x === void 0 ? {} : x,
      $ = t.sideCar,
      ee = t.returnFocus,
      R = t.onActivation,
      M = t.onDeactivation,
      j = w.useState({}),
      Q = j[0],
      q = w.useCallback(
        function () {
          (u.current = u.current || (document && document.activeElement)),
            s.current && R && R(s.current),
            (l.current = !0);
        },
        [R]
      ),
      ne = w.useCallback(
        function () {
          (l.current = !1), M && M(s.current);
        },
        [M]
      ),
      F = w.useCallback(
        function (de) {
          const De = u.current;
          if (ee && De && De.focus) {
            const it = typeof ee == "object" ? ee : void 0;
            (u.current = null),
              de
                ? Promise.resolve().then(function () {
                    return De.focus(it);
                  })
                : De.focus(it);
          }
        },
        [ee]
      ),
      L = w.useCallback(function (de) {
        l.current && yp.useMedium(de);
      }, []),
      I = vp.useMedium,
      G = w.useCallback(function (de) {
        s.current !== de && ((s.current = de), a(de));
      }, []);
    typeof E < "u" &&
      console.warn(
        "React-Focus-Lock: allowTextSelection is deprecated and enabled by default"
      ),
      w.useEffect(function () {
        s.current ||
          console.error("FocusLock: could not obtain ref to internal node");
      }, []);
    const J = Fs(((r = {}), (r[dp] = c && "disabled"), (r[Rs] = h), r), P),
      K = m !== !0,
      ce = K && m !== "tail",
      ot = fp([n, G]);
    return w.createElement(
      w.Fragment,
      null,
      K && [
        w.createElement("div", {
          key: "guard-first",
          "data-focus-guard": !0,
          tabIndex: c ? -1 : 0,
          style: Cl,
        }),
        w.createElement("div", {
          key: "guard-nearest",
          "data-focus-guard": !0,
          tabIndex: c ? -1 : 1,
          style: Cl,
        }),
      ],
      !c &&
        w.createElement($, {
          id: Q,
          sideCar: _3,
          observed: i,
          disabled: c,
          persistentFocus: C,
          crossFrame: v,
          autoFocus: p,
          whiteList: g,
          shards: D,
          onActivation: q,
          onDeactivation: ne,
          returnFocus: F,
        }),
      w.createElement(
        k,
        Fs({ ref: ot }, J, { className: f, onBlur: I, onFocus: L }),
        d
      ),
      ce &&
        w.createElement("div", {
          "data-focus-guard": !0,
          tabIndex: c ? -1 : 0,
          style: Cl,
        })
    );
  });
xa.propTypes = {
  children: se.node,
  disabled: se.bool,
  returnFocus: se.oneOfType([se.bool, se.object]),
  noFocusGuards: se.bool,
  allowTextSelection: se.bool,
  autoFocus: se.bool,
  persistentFocus: se.bool,
  crossFrame: se.bool,
  group: se.string,
  className: se.string,
  whiteList: se.func,
  shards: se.arrayOf(se.any),
  as: se.oneOfType([se.string, se.func, se.object]),
  lockProps: se.object,
  onActivation: se.func,
  onDeactivation: se.func,
  sideCar: se.any.isRequired,
};
xa.defaultProps = {
  children: void 0,
  disabled: !1,
  returnFocus: !1,
  noFocusGuards: !1,
  autoFocus: !0,
  persistentFocus: !1,
  crossFrame: !0,
  allowTextSelection: void 0,
  group: void 0,
  className: void 0,
  whiteList: void 0,
  shards: void 0,
  as: "div",
  lockProps: {},
  onActivation: void 0,
  onDeactivation: void 0,
};
function Ns(e, t) {
  return (
    (Ns =
      Object.setPrototypeOf ||
      function (r, o) {
        return (r.__proto__ = o), r;
      }),
    Ns(e, t)
  );
}
function k3(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    Ns(e, t);
}
function D3(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function x3(e, t) {
  {
    if (typeof e != "function")
      throw new Error("Expected reducePropsToState to be a function.");
    if (typeof t != "function")
      throw new Error("Expected handleStateChangeOnClient to be a function.");
  }
  function n(r) {
    return r.displayName || r.name || "Component";
  }
  return function (o) {
    if (typeof o != "function")
      throw new Error("Expected WrappedComponent to be a React component.");
    const i = [];
    let a;
    function s() {
      (a = e(
        i.map(function (u) {
          return u.props;
        })
      )),
        t(a);
    }
    const l = (function (u) {
      k3(d, u);
      function d() {
        return u.apply(this, arguments) || this;
      }
      d.peek = function () {
        return a;
      };
      const c = d.prototype;
      return (
        (c.componentDidMount = function () {
          i.push(this), s();
        }),
        (c.componentDidUpdate = function () {
          s();
        }),
        (c.componentWillUnmount = function () {
          const C = i.indexOf(this);
          i.splice(C, 1), s();
        }),
        (c.render = function () {
          return w.createElement(o, this.props);
        }),
        d
      );
    })(w.PureComponent);
    return D3(l, "displayName", "SideEffect(" + n(o) + ")"), l;
  };
}
const hn = function (e) {
    const t = Array(e.length);
    for (let n = 0; n < e.length; ++n) t[n] = e[n];
    return t;
  },
  Bs = function (e) {
    return Array.isArray(e) ? e : [e];
  },
  F3 = function (e) {
    const t = new Set(),
      n = e.length;
    for (let r = 0; r < n; r += 1)
      for (let o = r + 1; o < n; o += 1) {
        const i = e[r].compareDocumentPosition(e[o]);
        (i & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0 && t.add(o),
          (i & Node.DOCUMENT_POSITION_CONTAINS) > 0 && t.add(r);
      }
    return e.filter(function (r, o) {
      return !t.has(o);
    });
  };
var Ep = function (e) {
  return e.parentNode ? Ep(e.parentNode) : e;
};
const Zu = function (e) {
    return Bs(e)
      .filter(Boolean)
      .reduce(function (n, r) {
        const o = r.getAttribute(Rs);
        return (
          n.push.apply(
            n,
            o
              ? F3(
                  hn(
                    Ep(r).querySelectorAll(
                      "[" + Rs + '="' + o + '"]:not([' + dp + '="disabled"])'
                    )
                  )
                )
              : [r]
          ),
          n
        );
      }, []);
  },
  O3 = function (e) {
    return !e || !e.getPropertyValue
      ? !1
      : e.getPropertyValue("display") === "none" ||
          e.getPropertyValue("visibility") === "hidden";
  };
var Ap = function (e) {
  return (
    !e ||
    e === document ||
    (e && e.nodeType === Node.DOCUMENT_NODE) ||
    (!O3(window.getComputedStyle(e, null)) &&
      Ap(
        e.parentNode && e.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
          ? e.parentNode.host
          : e.parentNode
      ))
  );
};
const T3 = function (e) {
    return !(
      (e.tagName === "INPUT" || e.tagName === "BUTTON") &&
      (e.type === "hidden" || e.disabled)
    );
  },
  Qu = function (e) {
    return !!(e && e.dataset && e.dataset.focusGuard);
  },
  ta = function (e) {
    return !Qu(e);
  },
  R3 = function (e) {
    return !!e;
  },
  N3 = function (e, t) {
    const n = e.tabIndex - t.tabIndex,
      r = e.index - t.index;
    if (n) {
      if (!e.tabIndex) return 1;
      if (!t.tabIndex) return -1;
    }
    return n || r;
  },
  wp = function (e, t, n) {
    return hn(e)
      .map(function (r, o) {
        return {
          node: r,
          index: o,
          tabIndex:
            n && r.tabIndex === -1
              ? (r.dataset || {}).focusGuard
                ? 0
                : -1
              : r.tabIndex,
        };
      })
      .filter(function (r) {
        return !t || r.tabIndex >= 0;
      })
      .sort(N3);
  },
  B3 = [
    "button:enabled",
    "select:enabled",
    "textarea:enabled",
    "input:enabled",
    "a[href]",
    "area[href]",
    "summary",
    "iframe",
    "object",
    "embed",
    "audio[controls]",
    "video[controls]",
    "[tabindex]",
    "[contenteditable]",
    "[autofocus]",
  ],
  Is = B3.join(","),
  I3 = Is + ", [data-focus-guard]",
  Xu = function (e, t) {
    return e.reduce(function (n, r) {
      return n.concat(
        hn(r.querySelectorAll(t ? I3 : Is)),
        r.parentNode
          ? hn(r.parentNode.querySelectorAll(Is)).filter(function (o) {
              return o === r;
            })
          : []
      );
    }, []);
  },
  L3 = function (e) {
    const t = e.querySelectorAll("[" + v3 + "]");
    return hn(t)
      .map(function (n) {
        return Xu([n]);
      })
      .reduce(function (n, r) {
        return n.concat(r);
      }, []);
  },
  qu = function (e) {
    return hn(e)
      .filter(function (t) {
        return Ap(t);
      })
      .filter(function (t) {
        return T3(t);
      });
  },
  Ls = function (e, t) {
    return wp(qu(Xu(e, t)), !0, t);
  },
  Wc = function (e) {
    return wp(qu(Xu(e)), !1);
  },
  P3 = function (e) {
    return qu(L3(e));
  };
var Ps = function (e, t) {
  return (
    t === void 0 && (t = []), t.push(e), e.parentNode && Ps(e.parentNode, t), t
  );
};
const bl = function (e, t) {
    const n = Ps(e),
      r = Ps(t);
    for (let o = 0; o < n.length; o += 1) {
      const i = n[o];
      if (r.indexOf(i) >= 0) return i;
    }
    return !1;
  },
  Cp = function (e, t, n) {
    const r = Bs(e),
      o = Bs(t),
      i = r[0];
    let a = !1;
    return (
      o.filter(Boolean).forEach(function (s) {
        (a = bl(a || s, s) || a),
          n.filter(Boolean).forEach(function (l) {
            const u = bl(i, l);
            u && (!a || u.contains(a) ? (a = u) : (a = bl(u, a)));
          });
      }),
      a
    );
  },
  $3 = function (e) {
    return e.reduce(function (t, n) {
      return t.concat(P3(n));
    }, []);
  },
  M3 = function (e) {
    const t = Zu(e).filter(ta),
      n = Cp(e, e, t),
      r = Ls([n], !0),
      o = Ls(t)
        .filter(function (i) {
          const a = i.node;
          return ta(a);
        })
        .map(function (i) {
          return i.node;
        });
    return r.map(function (i) {
      const a = i.node,
        s = i.index;
      return { node: a, index: s, lockItem: o.indexOf(a) >= 0, guard: Qu(a) };
    });
  },
  z3 = function (e) {
    return e === document.activeElement;
  },
  j3 = function (e) {
    return !!hn(e.querySelectorAll("iframe")).some(function (t) {
      return z3(t);
    });
  },
  bp = function (e) {
    const t = document && document.activeElement;
    return !t || (t.dataset && t.dataset.focusGuard)
      ? !1
      : Zu(e).reduce(function (n, r) {
          return n || r.contains(t) || j3(r);
        }, !1);
  },
  U3 = function () {
    return (
      document &&
      hn(document.querySelectorAll("[" + y3 + "]")).some(function (e) {
        return e.contains(document.activeElement);
      })
    );
  },
  _p = function (e) {
    return e.tagName === "INPUT" && e.type === "radio";
  },
  V3 = function (e, t) {
    return (
      t
        .filter(_p)
        .filter(function (n) {
          return n.name === e.name;
        })
        .filter(function (n) {
          return n.checked;
        })[0] || e
    );
  },
  Ku = function (e, t) {
    return _p(e) && e.name ? V3(e, t) : e;
  },
  H3 = function (e) {
    const t = new Set();
    return (
      e.forEach(function (n) {
        return t.add(Ku(n, e));
      }),
      e.filter(function (n) {
        return t.has(n);
      })
    );
  },
  Gc = function (e) {
    return e[0] && e.length > 1 ? Ku(e[0], e) : e[0];
  },
  Yc = function (e, t) {
    return e.length > 1 ? e.indexOf(Ku(e[t], e)) : t;
  },
  Sp = "NEW_FOCUS",
  W3 = function (e, t, n, r) {
    const o = e.length,
      i = e[0],
      a = e[o - 1],
      s = Qu(n);
    if (e.indexOf(n) >= 0) return;
    const l = t.indexOf(n),
      u = r ? t.indexOf(r) : l,
      d = r ? e.indexOf(r) : -1,
      c = l - u,
      m = t.indexOf(i),
      C = t.indexOf(a),
      v = H3(t),
      p = v.indexOf(n) - (r ? v.indexOf(r) : l),
      E = Yc(e, 0),
      h = Yc(e, o - 1);
    if (l === -1 || d === -1) return Sp;
    if (!c && d >= 0) return d;
    if (l <= m && s && Math.abs(c) > 1) return h;
    if (l >= C && s && Math.abs(c) > 1) return E;
    if (c && Math.abs(p) > 1) return d;
    if (l <= m) return h;
    if (l > C) return E;
    if (c) return Math.abs(c) > 1 ? d : (o + d + c) % o;
  },
  G3 = function (e) {
    return function (t) {
      return (
        t.autofocus || (t.dataset && !!t.dataset.autofocus) || e.indexOf(t) >= 0
      );
    };
  },
  Y3 = function (e, t) {
    const n = new Map();
    return (
      t.forEach(function (r) {
        return n.set(r.node, r);
      }),
      e
        .map(function (r) {
          return n.get(r);
        })
        .filter(R3)
    );
  },
  Z3 = function (e, t) {
    const n = document && document.activeElement,
      r = Zu(e).filter(ta),
      o = Cp(n || e, e, r),
      i = Wc(r);
    let a = Ls(r).filter(function (c) {
      const m = c.node;
      return ta(m);
    });
    if (!a[0] && ((a = i), !a[0])) return;
    const s = Wc([o]).map(function (c) {
        return c.node;
      }),
      l = Y3(s, a),
      u = l.map(function (c) {
        return c.node;
      }),
      d = W3(u, s, n, t);
    if (d === Sp) {
      const c = i
        .map(function (m) {
          return m.node;
        })
        .filter(G3($3(r)));
      return { node: c && c.length ? Gc(c) : Gc(u) };
    }
    return d === void 0 ? d : l[d];
  },
  Q3 = function (e) {
    e.focus(),
      "contentWindow" in e && e.contentWindow && e.contentWindow.focus();
  };
let _l = 0,
  Sl = !1;
const kp = function (e, t) {
  const n = Z3(e, t);
  if (!Sl && n) {
    if (_l > 2) {
      console.error(
        "FocusLock: focus-fighting detected. Only one focus management system could be active. See https://github.com/theKashey/focus-lock/#focus-fighting"
      ),
        (Sl = !0),
        setTimeout(function () {
          Sl = !1;
        }, 1);
      return;
    }
    _l++, Q3(n.node), _l--;
  }
};
function Dp(e) {
  const t = window,
    n = t.setImmediate;
  typeof n < "u" ? n(e) : setTimeout(e, 1);
}
const X3 = function () {
    return document && document.activeElement === document.body;
  },
  q3 = function () {
    return X3() || U3();
  };
let hr = null,
  ar = null,
  mr = null,
  _o = !1;
const K3 = function () {
    return !0;
  },
  J3 = function (t) {
    return (hr.whiteList || K3)(t);
  },
  eE = function (t, n) {
    mr = { observerNode: t, portaledElement: n };
  },
  tE = function (t) {
    return mr && mr.portaledElement === t;
  };
function Zc(e, t, n, r) {
  let o = null,
    i = e;
  do {
    const a = r[i];
    if (a.guard) a.node.dataset.focusAutoGuard && (o = a);
    else if (a.lockItem) {
      if (i !== e) return;
      o = null;
    } else break;
  } while ((i += n) !== t);
  o && (o.node.tabIndex = 0);
}
const nE = function (t) {
    return t && "current" in t ? t.current : t;
  },
  rE = function (t) {
    return t ? !!_o : _o === "meanwhile";
  },
  na = function () {
    let t = !1;
    if (hr) {
      const n = hr,
        r = n.observed,
        o = n.persistentFocus,
        i = n.autoFocus,
        a = n.shards,
        s = n.crossFrame,
        l = r || (mr && mr.portaledElement),
        u = document && document.activeElement;
      if (l) {
        const d = [l].concat(a.map(nE).filter(Boolean));
        if (
          ((!u || J3(u)) &&
            (o || rE(s) || !q3() || (!ar && i)) &&
            (l &&
              !(bp(d) || tE(u)) &&
              (document && !ar && u && !i
                ? (u.blur && u.blur(), document.body.focus())
                : ((t = kp(d, ar)), (mr = {}))),
            (_o = !1),
            (ar = document && document.activeElement)),
          document)
        ) {
          const c = document && document.activeElement,
            m = M3(d),
            C = m
              .map(function (v) {
                return v.node;
              })
              .indexOf(c);
          C > -1 &&
            (m
              .filter(function (v) {
                const p = v.guard,
                  E = v.node;
                return p && E.dataset.focusAutoGuard;
              })
              .forEach(function (v) {
                return v.node.removeAttribute("tabIndex");
              }),
            Zc(C, m.length, 1, m),
            Zc(C, -1, -1, m));
        }
      }
    }
    return t;
  },
  xp = function (t) {
    na() && t && (t.stopPropagation(), t.preventDefault());
  },
  Ju = function () {
    return Dp(na);
  },
  oE = function (t) {
    const n = t.target,
      r = t.currentTarget;
    r.contains(n) || eE(r, n);
  },
  iE = function () {
    return null;
  };
se.node.isRequired;
const Fp = function () {
    (_o = "just"),
      setTimeout(function () {
        _o = "meanwhile";
      }, 0);
  },
  aE = function () {
    document.addEventListener("focusin", xp, !0),
      document.addEventListener("focusout", Ju),
      window.addEventListener("blur", Fp);
  },
  lE = function () {
    document.removeEventListener("focusin", xp, !0),
      document.removeEventListener("focusout", Ju),
      window.removeEventListener("blur", Fp);
  };
function sE(e) {
  return e.filter(function (t) {
    return !t.disabled;
  });
}
function uE(e) {
  const t = e.slice(-1)[0];
  t && !hr && aE();
  const n = hr,
    r = n && t && t.id === n.id;
  (hr = t),
    n &&
      !r &&
      (n.onDeactivation(),
      e.filter(function (o) {
        return o.id === n.id;
      }).length || n.returnFocus(!t)),
    t
      ? ((ar = null),
        (!r || n.observed !== t.observed) && t.onActivation(),
        na(),
        Dp(na))
      : (lE(), (ar = null));
}
yp.assignSyncMedium(oE);
vp.assignMedium(Ju);
b3.assignMedium(function (e) {
  return e({ moveFocusInside: kp, focusInside: bp });
});
const cE = x3(sE, uE)(iE),
  Op = w.forwardRef(function (t, n) {
    return w.createElement(xa, Fs({ sideCar: cE, ref: n }, t));
  }),
  Tp = xa.propTypes || {};
Tp.sideCar;
const dE = c3(Tp, ["sideCar"]);
Op.propTypes = dE;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var gr =
  function () {
    return (
      (gr =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (const i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      gr.apply(this, arguments)
    );
  };
function fE(e, t) {
  const n = {};
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
const _i = "right-scroll-bar-position",
  Si = "width-before-scroll-bar",
  pE = "with-scroll-bars-hidden",
  hE = "--removed-body-scroll-bar-size",
  Rp = mp(),
  kl = function () {},
  Fa = w.forwardRef(function (e, t) {
    const n = w.useRef(null),
      r = w.useState({
        onScrollCapture: kl,
        onWheelCapture: kl,
        onTouchMoveCapture: kl,
      }),
      o = r[0],
      i = r[1],
      a = e.forwardProps,
      s = e.children,
      l = e.className,
      u = e.removeScrollBar,
      d = e.enabled,
      c = e.shards,
      m = e.sideCar,
      C = e.noIsolation,
      v = e.inert,
      p = e.allowPinchZoom,
      E = e.as,
      h = E === void 0 ? "div" : E,
      f = fE(e, [
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
      g = m,
      _ = fp([n, t]),
      D = gr({}, f, o);
    return w.createElement(
      w.Fragment,
      null,
      d &&
        w.createElement(g, {
          sideCar: Rp,
          removeScrollBar: u,
          shards: c,
          noIsolation: C,
          inert: v,
          setCallbacks: i,
          allowPinchZoom: !!p,
          lockRef: n,
        }),
      a
        ? w.cloneElement(w.Children.only(s), gr({}, D, { ref: _ }))
        : w.createElement(h, gr({}, D, { className: l, ref: _ }), s)
    );
  });
Fa.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Fa.classNames = { fullWidth: Si, zeroRight: _i };
const mE = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function gE() {
  if (!document) return null;
  const e = document.createElement("style");
  e.type = "text/css";
  const t = mE();
  return t && e.setAttribute("nonce", t), e;
}
function yE(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function vE(e) {
  (document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
const EE = function () {
    let e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = gE()) && (yE(t, n), vE(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  AE = function () {
    const e = EE();
    return function (t) {
      w.useEffect(function () {
        return (
          e.add(t),
          function () {
            e.remove();
          }
        );
      }, []);
    };
  },
  Np = function () {
    const e = AE();
    return function (n) {
      const r = n.styles;
      return e(r), null;
    };
  },
  wE = { left: 0, top: 0, right: 0, gap: 0 },
  Dl = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  CE = function (e) {
    const t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [Dl(n), Dl(r), Dl(o)];
  },
  Qc = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return wE;
    const t = CE(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  bE = Np(),
  _E = function (e, t, n, r) {
    const o = e.left,
      i = e.top,
      a = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .` +
        pE +
        ` {
   overflow: hidden ` +
        r +
        `;
   padding-right: ` +
        s +
        "px " +
        r +
        `;
  }
  body {
    overflow: hidden ` +
        r +
        `;
    ` +
        [
          t && "position: relative " + r + ";",
          n === "margin" &&
            `
    padding-left: ` +
              o +
              `px;
    padding-top: ` +
              i +
              `px;
    padding-right: ` +
              a +
              `px;
    margin-left:0;
    margin-top:0;
    margin-right: ` +
              s +
              "px " +
              r +
              `;
    `,
          n === "padding" && "padding-right: " + s + "px " + r + ";",
        ]
          .filter(Boolean)
          .join("") +
        `
  }
  
  .` +
        _i +
        ` {
    right: ` +
        s +
        "px " +
        r +
        `;
  }
  
  .` +
        Si +
        ` {
    margin-right: ` +
        s +
        "px " +
        r +
        `;
  }
  
  .` +
        _i +
        " ." +
        _i +
        ` {
    right: 0 ` +
        r +
        `;
  }
  
  .` +
        Si +
        " ." +
        Si +
        ` {
    margin-right: 0 ` +
        r +
        `;
  }
  
  body {
    ` +
        hE +
        ": " +
        s +
        `px;
  }
`
    );
  },
  SE = function (e) {
    const t = w.useState(Qc(e.gapMode)),
      n = t[0],
      r = t[1];
    w.useEffect(
      function () {
        r(Qc(e.gapMode));
      },
      [e.gapMode]
    );
    const o = e.noRelative,
      i = e.noImportant,
      a = e.gapMode,
      s = a === void 0 ? "margin" : a;
    return w.createElement(bE, { styles: _E(n, !o, s, i ? "" : "!important") });
  },
  kE = function (e) {
    const t = window.getComputedStyle(e);
    return (
      t.overflowY !== "hidden" &&
      !(t.overflowY === t.overflowX && t.overflowY === "visible")
    );
  },
  DE = function (e) {
    const t = window.getComputedStyle(e);
    return (
      t.overflowX !== "hidden" &&
      !(t.overflowY === t.overflowX && t.overflowX === "visible")
    );
  },
  Xc = function (e, t) {
    let n = t;
    do {
      if (Bp(e, n)) {
        const o = Ip(e, n),
          i = o[1],
          a = o[2];
        if (i > a) return !0;
      }
      n = n.parentNode;
    } while (n && n !== document.body);
    return !1;
  },
  xE = function (e) {
    const t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  FE = function (e) {
    const t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  };
var Bp = function (e, t) {
    return e === "v" ? kE(t) : DE(t);
  },
  Ip = function (e, t) {
    return e === "v" ? xE(t) : FE(t);
  };
const OE = function (e, t, n, r, o) {
  const i = r;
  let a = n.target;
  const s = t.contains(a);
  let l = !1;
  const u = i > 0;
  let d = 0,
    c = 0;
  do {
    const m = Ip(e, a),
      C = m[0],
      v = m[1],
      p = m[2],
      E = v - p - C;
    (C || E) && Bp(e, a) && ((d += E), (c += C)), (a = a.parentNode);
  } while ((!s && a !== document.body) || (s && (t.contains(a) || t === a)));
  return (
    ((u && ((o && d === 0) || (!o && i > d))) ||
      (!u && ((o && c === 0) || (!o && -i > c)))) &&
      (l = !0),
    l
  );
};
let $s = !1;
if (typeof window < "u")
  try {
    const e = Object.defineProperty({}, "passive", {
      get: function () {
        return ($s = !0), !0;
      },
    });
    window.addEventListener("test", e, e),
      window.removeEventListener("test", e, e);
  } catch {
    $s = !1;
  }
const Hn = $s ? { passive: !1 } : !1,
  ci = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  qc = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Kc = function (e) {
    return e && "current" in e ? e.current : e;
  },
  TE = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  RE = function (e) {
    return (
      `
  .block-interactivity-` +
      e +
      ` {pointer-events: none;}
  .allow-interactivity-` +
      e +
      ` {pointer-events: all;}
`
    );
  };
let NE = 0,
  Wn = [];
function BE(e) {
  const t = w.useRef([]),
    n = w.useRef([0, 0]),
    r = w.useRef(),
    o = w.useState(NE++)[0],
    i = w.useState(function () {
      return Np();
    })[0],
    a = w.useRef(e);
  w.useEffect(
    function () {
      a.current = e;
    },
    [e]
  ),
    w.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-" + o);
          const p = [e.lockRef.current]
            .concat((e.shards || []).map(Kc))
            .filter(Boolean);
          return (
            p.forEach(function (E) {
              return E.classList.add("allow-interactivity-" + o);
            }),
            function () {
              document.body.classList.remove("block-interactivity-" + o),
                p.forEach(function (E) {
                  return E.classList.remove("allow-interactivity-" + o);
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    );
  const s = w.useCallback(function (p, E) {
      if ("touches" in p && p.touches.length === 2)
        return !a.current.allowPinchZoom;
      const h = ci(p),
        f = n.current,
        g = "deltaX" in p ? p.deltaX : f[0] - h[0],
        _ = "deltaY" in p ? p.deltaY : f[1] - h[1];
      let D;
      const T = p.target,
        k = Math.abs(g) > Math.abs(_) ? "h" : "v";
      let x = Xc(k, T);
      if (!x) return !0;
      if ((x ? (D = k) : ((D = k === "v" ? "h" : "v"), (x = Xc(k, T))), !x))
        return !1;
      if (
        (!r.current && "changedTouches" in p && (g || _) && (r.current = D), !D)
      )
        return !0;
      const P = r.current || D;
      return OE(P, E, p, P === "h" ? g : _, !0);
    }, []),
    l = w.useCallback(function (p) {
      const E = p;
      if (!Wn.length || Wn[Wn.length - 1] !== i) return;
      const h = "deltaY" in E ? qc(E) : ci(E),
        f = t.current.filter(function (g) {
          return g.name === E.type && g.target === E.target && TE(g.delta, h);
        })[0];
      if (f && f.should) {
        E.preventDefault();
        return;
      }
      if (!f) {
        const g = (a.current.shards || [])
          .map(Kc)
          .filter(Boolean)
          .filter(function (D) {
            return D.contains(E.target);
          });
        (g.length > 0 ? s(E, g[0]) : !a.current.noIsolation) &&
          E.preventDefault();
      }
    }, []),
    u = w.useCallback(function (p, E, h, f) {
      const g = { name: p, delta: E, target: h, should: f };
      t.current.push(g),
        setTimeout(function () {
          t.current = t.current.filter(function (_) {
            return _ !== g;
          });
        }, 1);
    }, []),
    d = w.useCallback(function (p) {
      (n.current = ci(p)), (r.current = void 0);
    }, []),
    c = w.useCallback(function (p) {
      u(p.type, qc(p), p.target, s(p, e.lockRef.current));
    }, []),
    m = w.useCallback(function (p) {
      u(p.type, ci(p), p.target, s(p, e.lockRef.current));
    }, []);
  w.useEffect(function () {
    return (
      Wn.push(i),
      e.setCallbacks({
        onScrollCapture: c,
        onWheelCapture: c,
        onTouchMoveCapture: m,
      }),
      document.addEventListener("wheel", l, Hn),
      document.addEventListener("touchmove", l, Hn),
      document.addEventListener("touchstart", d, Hn),
      function () {
        (Wn = Wn.filter(function (p) {
          return p !== i;
        })),
          document.removeEventListener("wheel", l, Hn),
          document.removeEventListener("touchmove", l, Hn),
          document.removeEventListener("touchstart", d, Hn);
      }
    );
  }, []);
  const C = e.removeScrollBar,
    v = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    v ? w.createElement(i, { styles: RE(o) }) : null,
    C ? w.createElement(SE, { gapMode: "margin" }) : null
  );
}
const IE = C3(Rp, BE),
  Lp = w.forwardRef(function (e, t) {
    return w.createElement(Fa, gr({}, e, { ref: t, sideCar: IE }));
  });
Lp.classNames = Fa.classNames;
function Tt() {
  return (
    (Tt =
      Object.assign ||
      function (e) {
        for (let t = 1; t < arguments.length; t++) {
          const n = arguments[t];
          for (const r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }),
    Tt.apply(this, arguments)
  );
}
function Oa(e, t) {
  if (e == null) return {};
  const n = {},
    r = Object.keys(e);
  let o, i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const Pp = {
    allowPinchZoom: se.bool,
    dangerouslyBypassFocusLock: se.bool,
    dangerouslyBypassScrollLock: se.bool,
    initialFocusRef: function () {
      return null;
    },
    onDismiss: se.func,
  },
  So = Da(function (t, n) {
    const r = t.as,
      o = r === void 0 ? "div" : r,
      i = t.isOpen,
      a = i === void 0 ? !0 : i,
      s = Oa(t, ["as", "isOpen"]);
    return (
      lp("dialog"),
      w.useEffect(
        function () {
          a
            ? (window.__REACH_DISABLE_TOOLTIPS = !0)
            : window.requestAnimationFrame(function () {
                window.__REACH_DISABLE_TOOLTIPS = !1;
              });
        },
        [a]
      ),
      a
        ? w.createElement(
            sp,
            { "data-reach-dialog-wrapper": "" },
            w.createElement(LE, Tt({ ref: n, as: o }, s))
          )
        : null
    );
  });
(So.displayName = "DialogOverlay"),
  (So.propTypes = Tt({}, Pp, { isOpen: se.bool }));
var LE = Da(function (t, n) {
  const r = t.allowPinchZoom,
    o = t.as,
    i = o === void 0 ? "div" : o,
    a = t.dangerouslyBypassFocusLock,
    s = a === void 0 ? !1 : a,
    l = t.dangerouslyBypassScrollLock,
    u = l === void 0 ? !1 : l,
    d = t.initialFocusRef,
    c = t.onClick,
    m = t.onDismiss,
    C = m === void 0 ? Ro : m,
    v = t.onKeyDown,
    p = t.onMouseDown,
    E = t.unstable_lockFocusAcrossFrames,
    h = E === void 0 ? !0 : E,
    f = Oa(t, [
      "allowPinchZoom",
      "as",
      "dangerouslyBypassFocusLock",
      "dangerouslyBypassScrollLock",
      "initialFocusRef",
      "onClick",
      "onDismiss",
      "onKeyDown",
      "onMouseDown",
      "unstable_lockFocusAcrossFrames",
    ]),
    g = w.useRef(null),
    _ = w.useRef(null),
    D = u3(_, n),
    T = w.useCallback(
      function () {
        d && d.current && d.current.focus();
      },
      [d]
    );
  function k($) {
    g.current === $.target && ($.stopPropagation(), C($));
  }
  function x($) {
    $.key === "Escape" && ($.stopPropagation(), C($));
  }
  function P($) {
    g.current = $.target;
  }
  return (
    w.useEffect(function () {
      return _.current ? PE(_.current) : void 0;
    }, []),
    w.createElement(
      Op,
      {
        autoFocus: !0,
        returnFocus: !0,
        onActivation: T,
        disabled: s,
        crossFrame: h,
      },
      w.createElement(
        Lp,
        { allowPinchZoom: r, enabled: !u },
        w.createElement(
          i,
          Tt({}, f, {
            ref: D,
            "data-reach-dialog-overlay": "",
            onClick: bi(c, k),
            onKeyDown: bi(v, x),
            onMouseDown: bi(p, P),
          })
        )
      )
    )
  );
});
(So.displayName = "DialogOverlay"), (So.propTypes = Tt({}, Pp));
const Ms = Da(function (t, n) {
  const r = t.as,
    o = r === void 0 ? "div" : r,
    i = t.onClick;
  t.onKeyDown;
  const a = Oa(t, ["as", "onClick", "onKeyDown"]);
  return w.createElement(
    o,
    Tt({ "aria-modal": "true", role: "dialog", tabIndex: -1 }, a, {
      ref: n,
      "data-reach-dialog-content": "",
      onClick: bi(i, function (s) {
        s.stopPropagation();
      }),
    })
  );
});
(Ms.displayName = "DialogContent"),
  (Ms.propTypes = { "aria-label": ra, "aria-labelledby": ra });
const zs = Da(function (t, n) {
  const r = t.allowPinchZoom,
    o = r === void 0 ? !1 : r,
    i = t.initialFocusRef,
    a = t.isOpen,
    s = t.onDismiss,
    l = s === void 0 ? Ro : s,
    u = Oa(t, ["allowPinchZoom", "initialFocusRef", "isOpen", "onDismiss"]);
  return w.createElement(
    So,
    { allowPinchZoom: o, initialFocusRef: i, isOpen: a, onDismiss: l },
    w.createElement(Ms, Tt({ ref: n }, u))
  );
});
(zs.displayName = "Dialog"),
  (zs.propTypes = {
    isOpen: se.bool,
    onDismiss: se.func,
    "aria-label": ra,
    "aria-labelledby": ra,
  });
function PE(e) {
  const t = [],
    n = [],
    r = i3(e);
  return e
    ? (Array.prototype.forEach.call(
        r.querySelectorAll("body > *"),
        function (o) {
          let i, a;
          const s =
            (i = e.parentNode) == null || (a = i.parentNode) == null
              ? void 0
              : a.parentNode;
          if (o === s) return;
          const l = o.getAttribute("aria-hidden");
          (l !== null && l !== "false") ||
            (t.push(l), n.push(o), o.setAttribute("aria-hidden", "true"));
        }
      ),
      function () {
        n.forEach(function (o, i) {
          const a = t[i];
          a === null
            ? o.removeAttribute("aria-hidden")
            : o.setAttribute("aria-hidden", a);
        });
      })
    : (console.warn(
        "A ref has not yet been attached to a dialog node when attempting to call `createAriaHider`."
      ),
      Ro);
}
function ra(e, t, n, r, o) {
  const i = `
See https://www.w3.org/TR/wai-aria/#aria-label for details.`;
  return !e["aria-label"] && !e["aria-labelledby"]
    ? new Error(
        "A <" +
          n +
          "> must have either an `aria-label` or `aria-labelledby` prop.\n      " +
          i
      )
    : e["aria-label"] && e["aria-labelledby"]
    ? new Error(
        "You provided both `aria-label` and `aria-labelledby` props to a <" +
          n +
          ">. If the a label for this component is visible on the screen, that label's component should be given a unique ID prop, and that ID should be passed as the `aria-labelledby` prop into <" +
          n +
          ">. If the label cannot be determined programmatically from the content of the element, an alternative label should be provided as the `aria-label` prop, which will be used as an `aria-label` on the HTML tag." +
          i
      )
    : e[t] != null && !l3(e[t])
    ? new Error(
        "Invalid prop `" +
          t +
          "` supplied to `" +
          n +
          "`. Expected `string`, received `" +
          (Array.isArray(o) ? "array" : typeof o) +
          "`."
      )
    : null;
}
const $E = ({ children: e, onClick: t, style: n, ...r }) =>
    A("button", {
      className: "ladle-button",
      onClick: t,
      style: n,
      "aria-label": r["aria-label"],
      type: "button",
      children: e,
    }),
  yr = ({ children: e, href: t, style: n }) =>
    A("a", { className: "ladle-link", href: t, style: n, children: e }),
  Pn = ({ children: e }) => A("code", { className: "ladle-code", children: e }),
  Fr = ({ children: e, close: t, isOpen: n, label: r, maxWidth: o = "40em" }) =>
    z(zs, {
      isOpen: n,
      onDismiss: () => t(),
      "aria-label": r || "Modal",
      "data-testid": "ladle-dialog",
      style: { maxWidth: o },
      children: [
        A("div", {
          style: { position: "absolute", insetInlineEnd: "-6px", top: "0px" },
          children: A($E, {
            onClick: () => t(),
            "aria-label": "Close modal",
            style: {
              height: "36px",
              width: "36px",
              borderColor: "transparent",
              boxShadow: "none",
            },
            children: A(Mg, {}),
          }),
        }),
        A("div", { className: "ladle-addon-modal-body", children: e }),
      ],
    });
var ze;
(function (e) {
  (e.Full = "full"), (e.Preview = "preview");
})(ze || (ze = {}));
var be;
(function (e) {
  (e.Light = "light"), (e.Dark = "dark"), (e.Auto = "auto");
})(be || (be = {}));
var te;
(function (e) {
  (e.Boolean = "boolean"),
    (e.String = "string"),
    (e.Number = "number"),
    (e.Complex = "complex"),
    (e.Function = "function"),
    (e.Radio = "radio"),
    (e.InlineRadio = "inline-radio"),
    (e.Select = "select"),
    (e.MultiSelect = "multi-select"),
    (e.Check = "check"),
    (e.InlineCheck = "inline-check"),
    (e.Action = "action"),
    (e.Range = "range"),
    (e.Background = "background");
})(te || (te = {}));
var re;
(function (e) {
  (e.UpdateAll = "update-all"),
    (e.UpdateMode = "update-mode"),
    (e.UpdateAction = "update-action"),
    (e.UpdateRtl = "update-rtl"),
    (e.UpdateSource = "update-source"),
    (e.UpdateStory = "update-story"),
    (e.UpdateTheme = "update-theme"),
    (e.UpdateWidth = "update-width"),
    (e.UpdateControl = "update-control"),
    (e.UpdateControlIntialized = "update-control-initialized"),
    (e.UpdateHotkeys = "update-hotkeys");
})(re || (re = {}));
const Jc = (e) => {
    switch (e) {
      case te.Boolean:
        return "checkbox";
      case te.Number:
        return "number";
      case te.Range:
        return "range";
      default:
        return "text";
    }
  },
  e2 = (e, t) => {
    switch (t) {
      case te.Boolean:
        return e.checked;
      case te.Number:
      case te.Range:
        return parseFloat(e.value);
      default:
        return e.value;
    }
  },
  oa = (e) => (e === "true" || e === "false" ? e !== "false" : e),
  $p = (e, t) => {
    const n = Wt.parse(e),
      r = {};
    return Object.keys(t).length === 0
      ? t
      : (Object.keys(n).forEach((o) => {
          if (o.startsWith("arg-") && t[o.split("-")[1]]) {
            const a = o.split("-")[1],
              s = n[o],
              l = t[a].type;
            if (l !== te.Action) {
              let u = s;
              switch (l) {
                case te.String:
                  u = decodeURI(s);
                  break;
                case te.Boolean:
                  u = s === "true";
                  break;
                case te.Range:
                  u = parseFloat(s);
                  break;
                case te.Number:
                  u = parseInt(s, 10);
                  break;
                case te.Complex:
                  u = JSON.parse(decodeURI(s));
                  break;
                case te.Radio:
                case te.InlineRadio:
                case te.Select:
                case te.Background:
                  u = oa(decodeURI(s));
                  break;
                case te.InlineCheck:
                case te.MultiSelect:
                case te.Check:
                  u = oa(JSON.parse(decodeURI(s)));
                  break;
              }
              r[a] = {
                value: u,
                defaultValue: t[a].defaultValue,
                description: t[a].description,
                type: t[a].type,
              };
            }
          }
        }),
        r);
  },
  ME = ({ controlKey: e, globalState: t, dispatch: n }) => {
    const r = t.control[e],
      o = t.control[e].name || e;
    if (t.control[e].type === te.Action)
      return z("tr", {
        children: [A("td", { children: o }), A("td", { children: "action" })],
      });
    if (t.control[e].type === te.Function)
      return z("tr", {
        children: [A("td", { children: o }), A("td", { children: "function" })],
      });
    if (
      t.control[e].type === te.Radio ||
      t.control[e].type === te.InlineRadio ||
      (t.control[e].type === te.Background && t.control[e].options.length < 5)
    )
      return z("tr", {
        children: [
          A("td", { children: o }),
          A("td", {
            style:
              t.control[e].type === te.InlineRadio ? { display: "flex" } : {},
            children: (t.control[e].options || []).map((i) => {
              const a = t.control[e].value,
                l = (t.control[e].labels || {})[i] || i,
                u = a === i || a === String(i);
              return z(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    ...(t.control[e].type === te.InlineRadio
                      ? { paddingRight: "0.5em" }
                      : {}),
                  },
                  children: [
                    A("input", {
                      id: `${e}-${String(i)}`,
                      type: "radio",
                      name: e,
                      value: String(i),
                      onChange: () => {
                        n({
                          type: re.UpdateControl,
                          value: {
                            ...t.control,
                            [e]: { ...t.control[e], value: oa(String(i)) },
                          },
                        });
                      },
                      checked: u,
                    }),
                    A("label", {
                      htmlFor: `${e}-${String(i)}`,
                      children: String(l),
                    }),
                  ],
                },
                `${String(i)}-${e}`
              );
            }),
          }),
        ],
      });
    if (
      t.control[e].type === te.Check ||
      t.control[e].type === te.InlineCheck ||
      t.control[e].type === te.MultiSelect
    )
      return z("tr", {
        children: [
          A("td", { children: o }),
          A("td", {
            style:
              t.control[e].type === te.InlineCheck ? { display: "flex" } : {},
            children: (t.control[e].options || []).map((i) => {
              const a = new Set(t.control[e].value),
                l = (t.control[e].labels || {})[i] || i;
              return z(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    ...(t.control[e].type === te.InlineCheck
                      ? { paddingRight: "0.5em" }
                      : {}),
                  },
                  children: [
                    A("input", {
                      id: `${e}-${String(i)}`,
                      type: "checkbox",
                      name: `${e}-${String(i)}`,
                      value: String(i),
                      checked: a.has(String(i)),
                      onChange: () => {
                        const u = String(i);
                        a.has(u) ? a.delete(u) : a.add(u),
                          n({
                            type: re.UpdateControl,
                            value: {
                              ...t.control,
                              [e]: {
                                ...t.control[e],
                                value: a.size > 0 ? Array.from(a) : void 0,
                              },
                            },
                          });
                      },
                    }),
                    A("label", {
                      htmlFor: `${e}-${String(i)}`,
                      style: { marginLeft: "0.3em" },
                      children: String(l),
                    }),
                  ],
                },
                `${String(i)}-${e}`
              );
            }),
          }),
        ],
      });
    if (t.control[e].type === te.Select || t.control[e].type === te.Background)
      return z("tr", {
        children: [
          A("td", { children: A("label", { htmlFor: e, children: o }) }),
          A("td", {
            children: z("select", {
              id: e,
              value: String(t.control[e].value),
              onChange: (i) => {
                const a = t.control[e].labels || {},
                  s =
                    Object.keys(a).find((l) => a[l] === i.target.value) ||
                    i.target.value;
                n({
                  type: re.UpdateControl,
                  value: {
                    ...t.control,
                    [e]: { ...t.control[e], value: oa(s) },
                  },
                });
              },
              children: [
                A("option", {
                  value: "undefined",
                  disabled: !0,
                  children: "Choose option...",
                }),
                (t.control[e].options || []).map((i) => {
                  const s = (t.control[e].labels || {})[i] || i;
                  return A("option", { children: String(s) }, `${i}-${e}`);
                }),
              ],
            }),
          }),
        ],
      });
    if (t.control[e].type === te.Complex) {
      let i = "";
      try {
        i = JSON.stringify(t.control[e].value);
      } catch {
        i = "Object/Array argument must be serializable.";
      }
      return z("tr", {
        children: [
          A("td", { children: A("label", { htmlFor: e, children: o }) }),
          A("td", {
            children: A("textarea", {
              id: e,
              defaultValue: i,
              onChange: (a) => {
                let s = t.control[e].value;
                try {
                  s = JSON.parse(a.target.value);
                } catch {}
                n({
                  type: re.UpdateControl,
                  value: { ...t.control, [e]: { ...t.control[e], value: s } },
                });
              },
            }),
          }),
        ],
      });
    }
    if (r.type === te.Range) {
      const i = r.min ?? 0,
        a = r.max ?? 100;
      return z("tr", {
        children: [
          A("td", { children: A("label", { htmlFor: e, children: o }) }),
          z("td", {
            children: [
              i,
              A("input", {
                id: e,
                type: Jc(r.type),
                value: r.value,
                min: r.min,
                max: r.max,
                step: r.step,
                onChange: (s) =>
                  n({
                    type: re.UpdateControl,
                    value: {
                      ...t.control,
                      [e]: { ...r, value: e2(s.target, r.type) },
                    },
                  }),
              }),
              r.value,
              " / ",
              a,
            ],
          }),
        ],
      });
    }
    return z("tr", {
      children: [
        A("td", { children: A("label", { htmlFor: e, children: o }) }),
        A("td", {
          children: A("input", {
            id: e,
            type: Jc(t.control[e].type),
            value: t.control[e].value,
            checked:
              t.control[e].type === te.Boolean && t.control[e].value === !0,
            onChange: (i) =>
              n({
                type: re.UpdateControl,
                value: {
                  ...t.control,
                  [e]: {
                    ...t.control[e],
                    value: e2(i.target, t.control[e].type),
                  },
                },
              }),
          }),
        }),
      ],
    });
  },
  zE = ({ globalState: e, dispatch: t }) => {
    const [n, r] = w.useState(!1);
    ct(H.hotkeys.control, () => r((a) => !a), {
      enabled: e.hotkeys && H.addons.control.enabled,
    });
    const o = "Explore different versions of this story through controls.",
      i = Object.keys(e.control).filter(
        (a) =>
          JSON.stringify(e.control[a].value) !==
          JSON.stringify(e.control[a].defaultValue)
      );
    return A("li", {
      children: z("button", {
        "aria-label": o,
        title: o,
        onClick: () => r(!0),
        className: n ? "ladle-active" : "",
        "data-testid": "addon-control",
        type: "button",
        children: [
          A(Yg, {}),
          A("span", { className: "ladle-addon-tooltip", children: o }),
          A("label", { children: "Story Controls" }),
          i.length
            ? A("div", { className: "ladle-badge", children: i.length })
            : null,
          z(Fr, {
            isOpen: n,
            close: () => r(!1),
            label: "Toggle different controls to update the story.",
            children: [
              A("table", {
                className: "ladle-controls-table",
                children: A("tbody", {
                  children: Object.keys(e.control)
                    .sort()
                    .map((a) =>
                      A(ME, { globalState: e, dispatch: t, controlKey: a }, a)
                    ),
                }),
              }),
              A("button", {
                onClick: () => {
                  const a = {};
                  Object.keys(e.control).forEach((s) => {
                    a[s] = {
                      ...e.control[s],
                      value: e.control[s].defaultValue,
                    };
                  }),
                    t({ type: re.UpdateControl, value: a });
                },
                type: "button",
                children: "Reset to defaults",
              }),
            ],
          }),
        ],
      }),
    });
  },
  t2 = [
    "select",
    "multi-select",
    "radio",
    "inline-radio",
    "background",
    "check",
    "inline-check",
    "range",
    "color",
    "date",
    "number",
    "text",
    "boolean",
  ],
  jE = ({ component: e, args: t, argTypes: n }) => {
    const { globalState: r, dispatch: o } = Il(),
      i = (l) => (u) => {
        o({ type: re.UpdateAction, value: { name: l, event: u }, clear: !1 });
      };
    w.useEffect(() => {
      const l = {};
      let u = 0;
      if (
        (t &&
          Object.keys(t).forEach((d) => {
            const c = t[d];
            if (r.control[d])
              l[d] = {
                type: r.control[d].type,
                defaultValue: c,
                value: r.control[d].value,
                description: "",
              };
            else {
              let m = te.Complex;
              switch (typeof c) {
                case "function":
                  m = te.Function;
                  break;
                case "boolean":
                  m = te.Boolean;
                  break;
                case "number":
                  m = te.Number;
                  break;
                case "string":
                  m = te.String;
                  break;
              }
              l[d] = { type: m, defaultValue: c, value: c, description: "" };
            }
          }),
        n &&
          Object.keys(n).forEach((d) => {
            const c = n[d];
            if (c && c.action) {
              l[d] = {
                type: te.Action,
                defaultValue: i(d),
                value: i(d),
                description: "",
              };
              return;
            }
            if (!c.control || !c.control.type)
              throw new Error("argTypes should have control type specified");
            if (t2.indexOf(c.control.type) === -1)
              throw new Error(
                `only ${t2.join(
                  ", "
                )} argTypes are supported now. For strings, booleans and numbers use just args.`
              );
            if (c.control.type === "background" && (u++, u > 1))
              throw new Error(
                "There can be only single argType with the type background since it's used to change Ladle's background color."
              );
            (l[d] = {
              name: c.name,
              type: c.control.type,
              labels: c.control.labels,
              defaultValue: t[d] ? t[d] : c.defaultValue,
              options: c.options,
              value: t[d] ? t[d] : c.defaultValue,
              description: c.description || d,
              min: c.control.min,
              max: c.control.max,
              step: c.control.step,
            }),
              r.control[d] && (l[d].value = r.control[d].value);
          }),
        Object.keys(l).length)
      ) {
        const d = $p(location.search, l);
        Object.keys(d).forEach((c) => {
          l[c].value = d[c].value;
        }),
          Object.keys(l).some(
            (c) => !r.control[c] || l[c].value !== r.control[c].value
          ) && o({ type: re.UpdateControl, value: l });
      } else
        r.controlInitialized ||
          o({ type: re.UpdateControlIntialized, value: !0 });
    }, []);
    const a = (l, u) =>
        n && n[l] && n[l].mapping && n[l].mapping.hasOwnProperty(u)
          ? n[l].mapping[u]
          : u,
      s = {};
    return (
      Object.keys(r.control).forEach((l) => {
        Array.isArray(r.control[l].value)
          ? (s[l] = r.control[l].value.map((u) => a(l, u)))
          : (s[l] = a(l, r.control[l].value));
      }),
      r.controlInitialized ? w.createElement(e, s) : null
    );
  };
function Z(e, t) {
  let n = [],
    r = {};
  const o = {
    args: {
      ...GA,
      ...(e.default && e.default.args ? e.default.args : {}),
      ...(e[t].args ? e[t].args : {}),
    },
    argTypes: {
      ...YA,
      ...(e.default && e.default.argTypes ? e.default.argTypes : {}),
      ...(e[t].argTypes ? e[t].argTypes : {}),
    },
    component: e[t],
  };
  return (
    e[t] && Array.isArray(e[t].decorators) && (n = [...n, ...e[t].decorators]),
    e.default &&
      Array.isArray(e.default.decorators) &&
      (n = [...n, ...e.default.decorators]),
    (r = {
      ...(e.default && e.default.parameters ? e.default.parameters : {}),
      ...(e[t].parameters ? e[t].parameters : {}),
    }),
    function () {
      const { globalState: a } = Il(),
        s = O.useMemo(
          () =>
            function () {
              return A(jE, { ...o });
            },
          []
        );
      if (n.length === 0) return A(s, {});
      const l = (d) =>
          O.useRef(() => {
            const c = Il(),
              m = {};
            return (
              Object.keys(c.globalState.control).forEach(
                (C) => (m[C] = c.globalState.control[C].value)
              ),
              n[d](d === 0 ? s : l(d - 1), {
                ...c,
                parameters: r,
                argTypes: o.argTypes,
                args: m,
              })
            );
          }).current,
        u = l(n.length - 1);
      return a.controlInitialized ? A(u, {}) : A(s, {});
    }
  );
}
const UE = ({ children: e }) => A("div", { children: e }),
  VE = w.lazy(() =>
    W(
      () => import("./accordion.stories-ad387e16.js"),
      [
        "assets/accordion.stories-ad387e16.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "WithColor") }))
  ),
  HE = w.lazy(() =>
    W(
      () => import("./accordion.stories-ad387e16.js"),
      [
        "assets/accordion.stories-ad387e16.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "WithContent") }))
  ),
  WE = w.lazy(() =>
    W(
      () => import("./accordion.stories-ad387e16.js"),
      [
        "assets/accordion.stories-ad387e16.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "WithHeaderSize") }))
  ),
  GE = w.lazy(() =>
    W(
      () => import("./alert.stories-f8d822f6.js"),
      ["assets/alert.stories-f8d822f6.js", "assets/alert-c594dbf1.js"]
    ).then((e) => ({ default: Z(e, "dangerAlert") }))
  ),
  YE = w.lazy(() =>
    W(
      () => import("./alert.stories-f8d822f6.js"),
      ["assets/alert.stories-f8d822f6.js", "assets/alert-c594dbf1.js"]
    ).then((e) => ({ default: Z(e, "infoAlert") }))
  ),
  ZE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonDisabled") }))
  ),
  QE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonFill") }))
  ),
  XE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonFluid") }))
  ),
  qE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonLink") }))
  ),
  KE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonPill") }))
  ),
  JE = w.lazy(() =>
    W(
      () => import("./button.stories-3db7e496.js"),
      ["assets/button.stories-3db7e496.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "ButtonWaiting") }))
  ),
  eA = w.lazy(() =>
    W(
      () => import("./checkbox.stories-3a363e69.js"),
      [
        "assets/checkbox.stories-3a363e69.js",
        "assets/checkbox-cce0589c.js",
        "assets/input-ffabb90e.js",
      ]
    ).then((e) => ({ default: Z(e, "Naked") }))
  ),
  tA = w.lazy(() =>
    W(
      () => import("./drawer.stories-42db2a91.js"),
      [
        "assets/drawer.stories-42db2a91.js",
        "assets/index-ef9f5095.js",
        "assets/button-1ecdeecd.js",
        "assets/section-f3002482.js",
      ]
    ).then((e) => ({ default: Z(e, "Default") }))
  ),
  nA = w.lazy(() =>
    W(
      () => import("./dropdown.stories-03b7f31e.js"),
      [
        "assets/dropdown.stories-03b7f31e.js",
        "assets/index-ef9f5095.js",
        "assets/react-icons.esm-3c58d05b.js",
        "assets/button-1ecdeecd.js",
        "assets/separator-feb39716.js",
      ]
    ).then((e) => ({ default: Z(e, "Default") }))
  ),
  rA = w.lazy(() =>
    W(
      () => import("./form.stories-bb89a771.js"),
      [
        "assets/form.stories-bb89a771.js",
        "assets/input-ffabb90e.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/button-1ecdeecd.js",
        "assets/alert-c594dbf1.js",
        "assets/grid-61ba842e.js",
        "assets/checkbox-cce0589c.js",
      ]
    ).then((e) => ({ default: Z(e, "WithGrid") }))
  ),
  oA = w.lazy(() =>
    W(
      () => import("./form.stories-bb89a771.js"),
      [
        "assets/form.stories-bb89a771.js",
        "assets/input-ffabb90e.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/button-1ecdeecd.js",
        "assets/alert-c594dbf1.js",
        "assets/grid-61ba842e.js",
        "assets/checkbox-cce0589c.js",
      ]
    ).then((e) => ({ default: Z(e, "WithHook") }))
  ),
  iA = w.lazy(() =>
    W(
      () => import("./form.stories-bb89a771.js"),
      [
        "assets/form.stories-bb89a771.js",
        "assets/input-ffabb90e.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/button-1ecdeecd.js",
        "assets/alert-c594dbf1.js",
        "assets/grid-61ba842e.js",
        "assets/checkbox-cce0589c.js",
      ]
    ).then((e) => ({ default: Z(e, "WithStatus") }))
  ),
  aA = w.lazy(() =>
    W(
      () => import("./form.stories-bb89a771.js"),
      [
        "assets/form.stories-bb89a771.js",
        "assets/input-ffabb90e.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/button-1ecdeecd.js",
        "assets/alert-c594dbf1.js",
        "assets/grid-61ba842e.js",
        "assets/checkbox-cce0589c.js",
      ]
    ).then((e) => ({ default: Z(e, "WithValidator") }))
  ),
  lA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withColumnsFixed") }))
  ),
  sA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withColumnsReverse") }))
  ),
  uA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withFourColumns") }))
  ),
  cA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withOneColumns") }))
  ),
  dA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withSpan") }))
  ),
  fA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withThreeColumns") }))
  ),
  pA = w.lazy(() =>
    W(
      () => import("./grid.stories-93ff4200.js"),
      ["assets/grid.stories-93ff4200.js", "assets/grid-61ba842e.js"]
    ).then((e) => ({ default: Z(e, "withTwoColumns") }))
  ),
  hA = w.lazy(() =>
    W(() => import("./headline.stories-1e79585e.js"), []).then((e) => ({
      default: Z(e, "Headlines"),
    }))
  ),
  mA = w.lazy(() =>
    W(
      () => import("./icons.stories-4a96eb28.js"),
      [
        "assets/icons.stories-4a96eb28.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/react-icons.esm-3c58d05b.js",
      ]
    ).then((e) => ({ default: Z(e, "Icon") }))
  ),
  gA = w.lazy(() =>
    W(
      () => import("./icons.stories-4a96eb28.js"),
      [
        "assets/icons.stories-4a96eb28.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/react-icons.esm-3c58d05b.js",
      ]
    ).then((e) => ({ default: Z(e, "IconSize") }))
  ),
  yA = w.lazy(() =>
    W(
      () => import("./icons.stories-4a96eb28.js"),
      [
        "assets/icons.stories-4a96eb28.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/react-icons.esm-3c58d05b.js",
      ]
    ).then((e) => ({ default: Z(e, "WithExternalIcon") }))
  ),
  vA = w.lazy(() =>
    W(
      () => import("./icons.stories-4a96eb28.js"),
      [
        "assets/icons.stories-4a96eb28.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
        "assets/react-icons.esm-3c58d05b.js",
      ]
    ).then((e) => ({ default: Z(e, "WithExternalIconSize") }))
  ),
  EA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithDate") }))
  ),
  AA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithDialog") }))
  ),
  wA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithFile") }))
  ),
  CA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithLabel") }))
  ),
  bA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithPicker") }))
  ),
  _A = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithPlaceholder") }))
  ),
  SA = w.lazy(() =>
    W(
      () => import("./input.stories-ceffff72.js"),
      ["assets/input.stories-ceffff72.js", "assets/input-ffabb90e.js"]
    ).then((e) => ({ default: Z(e, "WithRage") }))
  ),
  kA = w.lazy(() =>
    W(() => import("./layout.stories-6d98bb73.js"), []).then((e) => ({
      default: Z(e, "Dashboard"),
    }))
  ),
  DA = w.lazy(() =>
    W(() => import("./layout.stories-6d98bb73.js"), []).then((e) => ({
      default: Z(e, "Pancake"),
    }))
  ),
  xA = w.lazy(() =>
    W(
      () => import("./modal.stories-31b7fede.js"),
      [
        "assets/modal.stories-31b7fede.js",
        "assets/button-1ecdeecd.js",
        "assets/grid-61ba842e.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "DefaultConfig") }))
  ),
  FA = w.lazy(() =>
    W(
      () => import("./notice.stories-9e63c70a.js"),
      ["assets/notice.stories-9e63c70a.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "Sonner") }))
  ),
  OA = w.lazy(() =>
    W(
      () => import("./section.stories-a2861e5d.js"),
      ["assets/section.stories-a2861e5d.js", "assets/section-f3002482.js"]
    ).then((e) => ({ default: Z(e, "Default") }))
  ),
  TA = w.lazy(() =>
    W(
      () => import("./section.stories-a2861e5d.js"),
      ["assets/section.stories-a2861e5d.js", "assets/section-f3002482.js"]
    ).then((e) => ({ default: Z(e, "WithColor") }))
  ),
  RA = w.lazy(() =>
    W(
      () => import("./section.stories-a2861e5d.js"),
      ["assets/section.stories-a2861e5d.js", "assets/section-f3002482.js"]
    ).then((e) => ({ default: Z(e, "WithContainer") }))
  ),
  NA = w.lazy(() =>
    W(
      () => import("./section.stories-a2861e5d.js"),
      ["assets/section.stories-a2861e5d.js", "assets/section-f3002482.js"]
    ).then((e) => ({ default: Z(e, "WithPassDiv") }))
  ),
  BA = w.lazy(() =>
    W(
      () => import("./section.stories-a2861e5d.js"),
      ["assets/section.stories-a2861e5d.js", "assets/section-f3002482.js"]
    ).then((e) => ({ default: Z(e, "WithSubClassName") }))
  ),
  IA = w.lazy(() =>
    W(
      () => import("./select.stories-a8da5f39.js"),
      [
        "assets/select.stories-a8da5f39.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "Naked") }))
  ),
  LA = w.lazy(() =>
    W(
      () => import("./select.stories-a8da5f39.js"),
      [
        "assets/select.stories-a8da5f39.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "WithDialog") }))
  ),
  PA = w.lazy(() =>
    W(
      () => import("./select.stories-a8da5f39.js"),
      [
        "assets/select.stories-a8da5f39.js",
        "assets/select-341b64a8.js",
        "assets/MenuIcon-7236a2ad.js",
        "assets/CloseIcon-013c2dde.js",
      ]
    ).then((e) => ({ default: Z(e, "WithPlaceholder") }))
  ),
  $A = w.lazy(() =>
    W(
      () => import("./separator.stories-13d378c8.js"),
      [
        "assets/separator.stories-13d378c8.js",
        "assets/section-f3002482.js",
        "assets/separator-feb39716.js",
      ]
    ).then((e) => ({ default: Z(e, "Horizontal") }))
  ),
  MA = w.lazy(() =>
    W(
      () => import("./separator.stories-13d378c8.js"),
      [
        "assets/separator.stories-13d378c8.js",
        "assets/section-f3002482.js",
        "assets/separator-feb39716.js",
      ]
    ).then((e) => ({ default: Z(e, "Vertical") }))
  ),
  zA = w.lazy(() =>
    W(() => import("./skeleton.stories-a05aa10f.js"), []).then((e) => ({
      default: Z(e, "Basic"),
    }))
  ),
  jA = w.lazy(() =>
    W(() => import("./skeleton.stories-a05aa10f.js"), []).then((e) => ({
      default: Z(e, "Circle"),
    }))
  ),
  UA = w.lazy(() =>
    W(() => import("./skeleton.stories-a05aa10f.js"), []).then((e) => ({
      default: Z(e, "Example"),
    }))
  ),
  VA = w.lazy(() =>
    W(() => import("./skeleton.stories-a05aa10f.js"), []).then((e) => ({
      default: Z(e, "Fluid"),
    }))
  ),
  HA = w.lazy(() =>
    W(
      () => import("./tabs.stories-49c67c01.js"),
      ["assets/tabs.stories-49c67c01.js", "assets/button-1ecdeecd.js"]
    ).then((e) => ({ default: Z(e, "Basic") }))
  );
let mn = {
    "accordion--with-color": {
      component: VE,
      locStart: 16,
      locEnd: 20,
      entry: "stories/accordion.stories.tsx",
    },
    "accordion--with-content": {
      component: HE,
      locStart: 4,
      locEnd: 8,
      entry: "stories/accordion.stories.tsx",
    },
    "accordion--with-header-size": {
      component: WE,
      locStart: 10,
      locEnd: 14,
      entry: "stories/accordion.stories.tsx",
    },
    "alert--danger-alert": {
      component: GE,
      locStart: 10,
      locEnd: 14,
      entry: "stories/alert.stories.tsx",
    },
    "alert--info-alert": {
      component: YE,
      locStart: 4,
      locEnd: 8,
      entry: "stories/alert.stories.tsx",
    },
    "button--button-disabled": {
      component: ZE,
      locStart: 8,
      locEnd: 8,
      entry: "stories/button.stories.tsx",
    },
    "button--button-fill": {
      component: QE,
      locStart: 4,
      locEnd: 4,
      entry: "stories/button.stories.tsx",
    },
    "button--button-fluid": {
      component: XE,
      locStart: 7,
      locEnd: 7,
      entry: "stories/button.stories.tsx",
    },
    "button--button-link": {
      component: qE,
      locStart: 6,
      locEnd: 6,
      entry: "stories/button.stories.tsx",
    },
    "button--button-pill": {
      component: KE,
      locStart: 5,
      locEnd: 5,
      entry: "stories/button.stories.tsx",
    },
    "button--button-waiting": {
      component: JE,
      locStart: 9,
      locEnd: 11,
      entry: "stories/button.stories.tsx",
    },
    "checkbox--naked": {
      component: eA,
      locStart: 5,
      locEnd: 5,
      entry: "stories/checkbox.stories.tsx",
    },
    "drawer--default": {
      component: tA,
      locStart: 7,
      locEnd: 82,
      entry: "stories/drawer.stories.tsx",
    },
    "dropdown--default": {
      component: nA,
      locStart: 13,
      locEnd: 105,
      entry: "stories/dropdown.stories.tsx",
    },
    "form--with-grid": {
      component: rA,
      locStart: 44,
      locEnd: 64,
      entry: "stories/form.stories.tsx",
    },
    "form--with-hook": {
      component: oA,
      locStart: 17,
      locEnd: 42,
      entry: "stories/form.stories.tsx",
    },
    "form--with-status": {
      component: iA,
      locStart: 66,
      locEnd: 122,
      entry: "stories/form.stories.tsx",
    },
    "form--with-validator": {
      component: aA,
      locStart: 124,
      locEnd: 242,
      entry: "stories/form.stories.tsx",
    },
    "grid--with-columns-fixed": {
      component: lA,
      locStart: 56,
      locEnd: 67,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-columns-reverse": {
      component: sA,
      locStart: 69,
      locEnd: 74,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-four-columns": {
      component: uA,
      locStart: 43,
      locEnd: 54,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-one-columns": {
      component: cA,
      locStart: 4,
      locEnd: 15,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-span": {
      component: dA,
      locStart: 76,
      locEnd: 83,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-three-columns": {
      component: fA,
      locStart: 30,
      locEnd: 41,
      entry: "stories/grid.stories.tsx",
    },
    "grid--with-two-columns": {
      component: pA,
      locStart: 17,
      locEnd: 28,
      entry: "stories/grid.stories.tsx",
    },
    "headline--headlines": {
      component: hA,
      locStart: 3,
      locEnd: 14,
      entry: "stories/headline.stories.tsx",
    },
    "icons--icon": {
      component: mA,
      locStart: 6,
      locEnd: 6,
      entry: "stories/icons.stories.tsx",
    },
    "icons--icon-size": {
      component: gA,
      locStart: 8,
      locEnd: 8,
      entry: "stories/icons.stories.tsx",
    },
    "icons--with-external-icon": {
      component: yA,
      locStart: 10,
      locEnd: 10,
      entry: "stories/icons.stories.tsx",
    },
    "icons--with-external-icon-size": {
      component: vA,
      locStart: 12,
      locEnd: 12,
      entry: "stories/icons.stories.tsx",
    },
    "input--with-date": {
      component: EA,
      locStart: 16,
      locEnd: 24,
      entry: "stories/input.stories.tsx",
    },
    "input--with-dialog": {
      component: AA,
      locStart: 8,
      locEnd: 14,
      entry: "stories/input.stories.tsx",
    },
    "input--with-file": {
      component: wA,
      locStart: 32,
      locEnd: 32,
      entry: "stories/input.stories.tsx",
    },
    "input--with-label": {
      component: CA,
      locStart: 5,
      locEnd: 7,
      entry: "stories/input.stories.tsx",
    },
    "input--with-picker": {
      component: bA,
      locStart: 26,
      locEnd: 28,
      entry: "stories/input.stories.tsx",
    },
    "input--with-placeholder": {
      component: _A,
      locStart: 4,
      locEnd: 4,
      entry: "stories/input.stories.tsx",
    },
    "input--with-rage": {
      component: SA,
      locStart: 30,
      locEnd: 30,
      entry: "stories/input.stories.tsx",
    },
    "layout--dashboard": {
      component: kA,
      locStart: 19,
      locEnd: 34,
      entry: "stories/layout.stories.tsx",
    },
    "layout--pancake": {
      component: DA,
      locStart: 3,
      locEnd: 17,
      entry: "stories/layout.stories.tsx",
    },
    "modal--default-config": {
      component: xA,
      locStart: 6,
      locEnd: 30,
      entry: "stories/modal.stories.tsx",
    },
    "notice--sonner": {
      component: FA,
      locStart: 6,
      locEnd: 26,
      entry: "stories/notice.stories.tsx",
    },
    "section--default": {
      component: OA,
      locStart: 4,
      locEnd: 17,
      entry: "stories/section.stories.tsx",
    },
    "section--with-color": {
      component: TA,
      locStart: 19,
      locEnd: 32,
      entry: "stories/section.stories.tsx",
    },
    "section--with-container": {
      component: RA,
      locStart: 34,
      locEnd: 63,
      entry: "stories/section.stories.tsx",
    },
    "section--with-pass-div": {
      component: NA,
      locStart: 72,
      locEnd: 77,
      entry: "stories/section.stories.tsx",
    },
    "section--with-sub-class-name": {
      component: BA,
      locStart: 65,
      locEnd: 70,
      entry: "stories/section.stories.tsx",
    },
    "select--naked": {
      component: IA,
      locStart: 4,
      locEnd: 10,
      entry: "stories/select.stories.tsx",
    },
    "select--with-dialog": {
      component: LA,
      locStart: 20,
      locEnd: 30,
      entry: "stories/select.stories.tsx",
    },
    "select--with-placeholder": {
      component: PA,
      locStart: 12,
      locEnd: 18,
      entry: "stories/select.stories.tsx",
    },
    "separator--horizontal": {
      component: $A,
      locStart: 6,
      locEnd: 10,
      entry: "stories/separator.stories.tsx",
    },
    "separator--vertical": {
      component: MA,
      locStart: 12,
      locEnd: 22,
      entry: "stories/separator.stories.tsx",
    },
    "skeleton--basic": {
      component: zA,
      locStart: 5,
      locEnd: 7,
      entry: "stories/skeleton.stories.tsx",
    },
    "skeleton--circle": {
      component: jA,
      locStart: 8,
      locEnd: 10,
      entry: "stories/skeleton.stories.tsx",
    },
    "skeleton--example": {
      component: UA,
      locStart: 14,
      locEnd: 55,
      entry: "stories/skeleton.stories.tsx",
    },
    "skeleton--fluid": {
      component: VA,
      locStart: 11,
      locEnd: 13,
      entry: "stories/skeleton.stories.tsx",
    },
    "tabs--basic": {
      component: HA,
      locStart: 5,
      locEnd: 11,
      entry: "stories/tabs.stories.tsx",
    },
  },
  ut = {
    addons: {
      theme: { enabled: !1, defaultState: "light" },
      control: { enabled: !0, defaultState: {} },
      mode: { enabled: !0, defaultState: "full" },
      rtl: { enabled: !0, defaultState: !1 },
      source: { enabled: !0, defaultState: !1 },
      a11y: { enabled: !0 },
      action: { enabled: !0, defaultState: [] },
      ladle: { enabled: !0 },
      width: {
        enabled: !0,
        options: { xsmall: 414, small: 640, medium: 768, large: 1024 },
        defaultState: 0,
      },
    },
    stories: "stories",
    hotkeys: {
      search: ["/", "meta+p"],
      nextStory: ["alt+arrowright"],
      previousStory: ["alt+arrowleft"],
      nextComponent: ["alt+arrowdown"],
      previousComponent: ["alt+arrowup"],
      control: ["c"],
      darkMode: ["d"],
      fullscreen: ["f"],
      width: ["w"],
      rtl: ["r"],
      source: ["s"],
      a11y: ["a"],
    },
    i18n: {
      buildTooltip:
        '💡 Tip: Run "ladle preview" to check that the build works!',
    },
    storyOrder: "(stories) => stories",
  };
const WA = ({ path: e }) =>
    w.createElement(
      "div",
      { style: { paddingTop: "2em" } },
      w.createElement("code", { className: "ladle-code" }, e)
    ),
  GA = {},
  YA = {};
let Y = {
    44490782:
      "import%20React%20from%20%22react%22%3B%0Aimport%20Section%20from%20%22..%2F..%2Fcomponents%2Fsection%22%3B%0A%0Aexport%20const%20Default%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%3E%0A%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20Aplicar%20un%20abrazo%20osado%20con%20un%20apret%C3%B3n%20fuerte%20profundamente%20en%20el%20alma%201%20%C3%B3%202%0A%20%20%20%20veces%20por%20herida%2C%20preferiblemente%20en%20la%20noche%20durante%20varios%20d%C3%ADas%20seg%C3%BAn%0A%20%20%20%20prescripci%C3%B3n.%20Indicaciones%3A%20Antidepresivo%20de%20uso%20diario.%20Contra%0A%20%20%20%20indicaciones%3A%20Hipersensibilidad%20y%20lagrimeo%20excesivo.%20Precauciones%20y%0A%20%20%20%20advertencias%3A%20Se%20debe%20evitar%20el%20uso%20concomitante%20de%20otros%20productos%20que%0A%20%20%20%20contengan%20el%20componente%20de%20SORPRESA%20pues%20%C3%A9ste%20puede%20reducir%20su%20efectividad.%0A%20%20%20%20Dosis%20altas%20de%20cualquier%20SORPRESA%20probablemente%20conllevan%20un%20mayor%20riesgo%20de%0A%20%20%20%20estas%20reacciones%2C%20aunque%20los%20estudios%20cl%C3%ADnicos%20controlados%20muestran%20que%20esto%0A%20%20%20%20no%20sucede%20en%20los%20casos%20donde%20el%20coraz%C3%B3n%20lo%20necesitaba.%0A%20%20%3C%2FSection%3E%0A)%3B%0A%0Aexport%20const%20WithColor%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%20color%3D%22teal-green%22%3E%0A%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20Aplicar%20un%20abrazo%20osado%20con%20un%20apret%C3%B3n%20fuerte%20profundamente%20en%20el%20alma%201%20%C3%B3%202%0A%20%20%20%20veces%20por%20herida%2C%20preferiblemente%20en%20la%20noche%20durante%20varios%20d%C3%ADas%20seg%C3%BAn%0A%20%20%20%20prescripci%C3%B3n.%20Indicaciones%3A%20Antidepresivo%20de%20uso%20diario.%20Contra%0A%20%20%20%20indicaciones%3A%20Hipersensibilidad%20y%20lagrimeo%20excesivo.%20Precauciones%20y%0A%20%20%20%20advertencias%3A%20Se%20debe%20evitar%20el%20uso%20concomitante%20de%20otros%20productos%20que%0A%20%20%20%20contengan%20el%20componente%20de%20SORPRESA%20pues%20%C3%A9ste%20puede%20reducir%20su%20efectividad.%0A%20%20%20%20Dosis%20altas%20de%20cualquier%20SORPRESA%20probablemente%20conllevan%20un%20mayor%20riesgo%20de%0A%20%20%20%20estas%20reacciones%2C%20aunque%20los%20estudios%20cl%C3%ADnicos%20controlados%20muestran%20que%20esto%0A%20%20%20%20no%20sucede%20en%20los%20casos%20donde%20el%20coraz%C3%B3n%20lo%20necesitaba.%0A%20%20%3C%2FSection%3E%0A)%3B%0A%0Aexport%20const%20WithContainer%20%3D%20()%20%3D%3E%20(%0A%20%20%3C%3E%0A%20%20%20%20%3CSection%20color%3D%22teal-green%22%20container%3D%22smesh%22%3E%0A%20%20%20%20%20%20%3Ch3%20className%3D%22h6%22%3ESmesh%201600px%3C%2Fh3%3E%0A%20%20%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20%20%20Posolog%C3%ADa%3A%20Aplicar%20un%20abrazo%20osado%20con%20un%20apret%C3%B3n%20fuerte%20profundamente%20en%0A%20%20%20%20%20%20el%20alma%201%20%C3%B3%202%20veces%20por%20herida%0A%20%20%20%20%3C%2FSection%3E%0A%20%20%20%20%3CSection%20color%3D%22blue%22%20container%3D%22smush%22%3E%0A%20%20%20%20%20%20%3Ch3%20className%3D%22h6%22%3ESmush%201032px%3C%2Fh3%3E%0A%20%20%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20%20%20Posolog%C3%ADa%3A%20Aplicar%20un%20abrazo%20osado%20con%20un%20apret%C3%B3n%20fuerte%20profundamente%20en%0A%20%20%20%20%20%20el%20alma%201%20%C3%B3%202%20veces%20por%20herida%0A%20%20%20%20%3C%2FSection%3E%0A%20%20%20%20%3CSection%20color%3D%22lemon-green%22%20container%3D%22smash%22%3E%0A%20%20%20%20%20%20%3Ch3%20className%3D%22h6%22%3ESmash%20740px%3C%2Fh3%3E%0A%20%20%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20%20%20Posolog%C3%ADa%3A%20Aplicar%20un%20abrazo%20osado%20con%20un%20apret%C3%B3n%20fuerte%20profundamente%20en%0A%20%20%20%20%20%20el%20alma%201%20%C3%B3%202%20veces%20por%20herida%0A%20%20%20%20%3C%2FSection%3E%0A%20%20%20%20%3CSection%20color%3D%22pink%22%20container%3D%22smosh%22%3E%0A%20%20%20%20%20%20%3Ch3%20className%3D%22h6%22%3ESmosh%20440px%3C%2Fh3%3E%0A%20%20%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%20Posolog%C3%ADa%3A%0A%20%20%20%20%3C%2FSection%3E%0A%20%20%20%20%3CSection%20color%3D%22yellow%22%20container%3D%22smish%22%3E%0A%20%20%20%20%20%20%3Ch3%20className%3D%22h6%22%3ESmish%20250px%3C%2Fh3%3E%0A%20%20%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%0A%20%20%20%20%3C%2FSection%3E%0A%20%20%3C%2F%3E%0A)%3B%0A%0Aexport%20const%20WithSubClassName%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%20color%3D%22pink%22%20container%3D%22smash%22%20subClassName%3D%22green%20aura%22%3E%0A%20%20%20%20%3Ch3%20className%3D%22h6%22%3EsubClassName%20box%3C%2Fh3%3E%0A%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%0A%20%20%3C%2FSection%3E%0A)%3B%0A%0Aexport%20const%20WithPassDiv%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%20color%3D%22blue%22%20passDiv%3E%0A%20%20%20%20%3Ch3%20className%3D%22h6%22%3EThis%20section%20use%20div%20html%20tag%20as%20wrapper%20%3C%2Fh3%3E%0A%20%20%20%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%0A%20%20%3C%2FSection%3E%0A)%3B%0A",
    "5537930d":
      "import%20React%20from%20%22react%22%3B%0Aimport%20Accordion%20from%20%22..%2F..%2Fcomponents%2Faccordion%22%3B%0A%0Aexport%20const%20WithContent%20%3D%20()%20%3D%3E%20(%0A%20%20%3CAccordion%20title%3D%22Accordion%20title%22%3E%0A%20%20%20%20%3Cp%3ECada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%3C%2Fp%3E%0A%20%20%3C%2FAccordion%3E%0A)%3B%0A%0Aexport%20const%20WithHeaderSize%20%3D%20()%20%3D%3E%20(%0A%20%20%3CAccordion%20title%3D%22Accordion%20title%22%20headerSize%3D%22h3%22%3E%0A%20%20%20%20%3Cp%3ECada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%3C%2Fp%3E%0A%20%20%3C%2FAccordion%3E%0A)%3B%0A%0Aexport%20const%20WithColor%20%3D%20()%20%3D%3E%20(%0A%20%20%3CAccordion%20title%3D%22Accordion%20title%22%20color%3D%22teal-green%22%3E%0A%20%20%20%20%3Cp%3E%20Cada%20abrazo%20de%20oso%20contiene%3A%201%20dosis%20de%20amor%20por%20cada%202%20brazos.%3C%2Fp%3E%0A%20%20%3C%2FAccordion%3E%0A)%3B%0A",
    "5c51dc8b":
      "import%20React%20from%20%22react%22%3B%0Aimport%20Alert%20from%20%22..%2F..%2Fcomponents%2Falert%22%3B%0A%0Aexport%20const%20infoAlert%20%3D%20()%20%3D%3E%20(%0A%20%20%3CAlert%0A%20%20%20%20state%3D%7B%7B%20info%3A%20%7B%20message%3A%20%22This%20is%20a%20info%20alert%22%2C%20isError%3A%20false%20%7D%20%7D%7D%0A%20%20%2F%3E%0A)%3B%0A%0Aexport%20const%20dangerAlert%20%3D%20()%20%3D%3E%20(%0A%20%20%3CAlert%0A%20%20%20%20state%3D%7B%7B%20info%3A%20%7B%20message%3A%20%22This%20is%20a%20danger%20alert%22%2C%20isError%3A%20true%20%7D%20%7D%7D%0A%20%20%2F%3E%0A)%3B%0A",
    "925f065d":
      "import%20React%20from%20%22react%22%3B%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0A%0Aexport%20const%20ButtonFill%20%3D%20()%20%3D%3E%20%3CButton%20label%3D%22Button%20fill%22%20%2F%3E%3B%0Aexport%20const%20ButtonPill%20%3D%20()%20%3D%3E%20%3CButton%20mode%3D%22pill%22%20label%3D%22Button%20Pill%22%20%2F%3E%3B%0Aexport%20const%20ButtonLink%20%3D%20()%20%3D%3E%20%3CButton%20mode%3D%22link%22%20label%3D%22Button%20Pill%22%20%2F%3E%3B%0Aexport%20const%20ButtonFluid%20%3D%20()%20%3D%3E%20%3CButton%20isFluid%20label%3D%22Button%20Fluid%22%20%2F%3E%3B%0Aexport%20const%20ButtonDisabled%20%3D%20()%20%3D%3E%20%3CButton%20label%3D%22Disabled%22%20isDisabled%20%2F%3E%3B%0Aexport%20const%20ButtonWaiting%20%3D%20()%20%3D%3E%20(%0A%20%20%3CButton%20isLoading%20isLoadingText%3D%22Loading...%22%20label%3D%22Button%20Fluid%22%3E%3C%2FButton%3E%0A)%3B%0A",
    c68721cf:
      "import%20React%20from%20%22react%22%3B%0A%0Aimport%20Checkbox%20from%20%22..%2F..%2Fcomponents%2Fcheckbox%22%0A%0Aexport%20const%20Naked%20%3D%20()%20%3D%3E%20%3CCheckbox%20%20label%3D%22Accept%20terms%20and%20conditions.%22%2F%3E",
    f49a9317:
      "import%20React%20from%20%22react%22%3B%0Aimport%20%7B%20Drawer%20%7D%20from%20%22vaul%22%3B%0A%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0Aimport%20Section%20from%20%22..%2F..%2Fcomponents%2Fsection%22%3B%0A%0Aexport%20const%20Default%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%20className%3D%22relative%22%3E%0A%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22info%20info-text%20wall-pad%22%3EExternal%20library%20%3Cspan%20className%3D%22font-bold%22%3E%24%20pnpm%20i%20vaul%3C%2Fspan%3E%3C%2Fspan%3E%20Drawer%0A%20%20%20%20%20%20%20%20component%20for%20React.%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Fvaul.emilkowal.ski%2F%22%0A%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20All%20documentaiton%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20made%20by%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%3Ca%20href%3D%22https%3A%2F%2Femilkowal.ski%2F%22%20className%3D%22underline%22%20target%3D%22_blank%22%3E%0A%20%20%20%20%20%20%20%20%20%20Emil%20Kowalski%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20.%0A%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cp%3E%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3CDrawer.Root%20shouldScaleBackground%3E%0A%20%20%20%20%20%20%20%20%20%20%3CDrawer.Trigger%20asChild%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CButton%3EOpen%20Drawer%3C%2FButton%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FDrawer.Trigger%3E%0A%20%20%20%20%20%20%20%20%20%20%3CDrawer.Overlay%20className%3D%22fixed%20inset-0%20bg-black%2F40%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3CDrawer.Portal%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDrawer.Content%20className%3D%22bg-gray-100%20flex%20flex-col%20rounded-t-%5B10px%5D%20h-full%20mt-24%20max-h-%5B96%25%5D%20fixed%20bottom-0%20left-0%20right-0%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22mx-auto%20w-6%20h-0.5%20flex-shrink-0%20rounded-full%20bg-accents-3%20mb-2%20mt-1%22%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSection%20passDiv%20container%3D%22smash%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ch2%3EDrawer%20for%20React.%3C%2Fh2%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20This%20component%20can%20be%20used%20as%20a%20Dialog%20replacement%20on%20mobile%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20and%20tablet%20devices.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20It%20comes%20unstyled%2C%20has%20gesture-driven%20animations%2C%20and%20is%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20made%20by%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Femilkowal.ski%2F%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Emil%20Kowalski%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20It%20uses%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Fwww.radix-ui.com%2Fdocs%2Fprimitives%2Fcomponents%2Fdialog%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Radix's%20Dialog%20primitive%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20under%20the%20hood%20and%20is%20inspired%20by%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Ftwitter.com%2Fdevongovett%2Fstatus%2F1674470185783402496%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20this%20tweet.%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FSection%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDrawer.Content%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FDrawer.Portal%3E%0A%20%20%20%20%20%20%20%20%3C%2FDrawer.Root%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A",
    c816009b:
      "import%20React%20from%20%22react%22%3B%0Aimport%20*%20as%20DropdownMenu%20from%20%22%40radix-ui%2Freact-dropdown-menu%22%3B%0Aimport%20%7B%0A%20%20HamburgerMenuIcon%2C%0A%20%20DotFilledIcon%2C%0A%20%20CheckIcon%2C%0A%20%20ChevronRightIcon%2C%0A%7D%20from%20%22%40radix-ui%2Freact-icons%22%3B%0A%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0Aimport%20Separator%20from%20%22..%2F..%2Fcomponents%2Fseparator%22%3B%0A%0Aexport%20const%20Default%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20%5BbookmarksChecked%2C%20setBookmarksChecked%5D%20%3D%20React.useState(true)%3B%0A%20%20const%20%5BurlsChecked%2C%20setUrlsChecked%5D%20%3D%20React.useState(false)%3B%0A%20%20const%20%5Bperson%2C%20setPerson%5D%20%3D%20React.useState(%22pedro%22)%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3C%3E%0A%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22info%20info-text%20wall-pad%22%3E%0A%20%20%20%20%20%20%20%20%20%20External%20library%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22font-bold%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%24%20pnpm%20i%20%40radix-ui%2Freact-dropdown-menu%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%3C%2Fspan%3E%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20Displays%20a%20menu%20to%20the%20user%E2%80%94such%20as%20a%20set%20of%20actions%20or%0A%20%20%20%20%20%20%20%20functions%E2%80%94triggered%20by%20a%20button..%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Fwww.radix-ui.com%2Fprimitives%2Fdocs%2Fcomponents%2Fdropdown-menu%22%0A%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20All%20documentaiton%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20Made%20by%20%7B%22%22%7D%0A%20%20%20%20%20%20%20%20%3Ca%0A%20%20%20%20%20%20%20%20%20%20href%3D%22https%3A%2F%2Fwww.radix-ui.com%2F%22%0A%20%20%20%20%20%20%20%20%20%20className%3D%22underline%22%0A%20%20%20%20%20%20%20%20%20%20target%3D%22_blank%22%0A%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20Radix%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%20%20.%0A%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%3CDropdownMenu.Root%3E%0A%20%20%20%20%20%20%20%20%3CDropdownMenu.Trigger%20asChild%3E%0A%20%20%20%20%20%20%20%20%20%20%3CButton%20aria-label%3D%22Customise%20options%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CHamburgerMenuIcon%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FButton%3E%0A%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Trigger%3E%0A%0A%20%20%20%20%20%20%20%20%3CDropdownMenu.Portal%3E%0A%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Content%0A%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22min-w-%5B220px%5D%20%20rounded-md%20p-1%20will-change-%5Bopacity%2Ctransform%5D%20data-%5Bside%3Dtop%5D%3Aanimate-slideDownAndFade%20data-%5Bside%3Dright%5D%3Aanimate-slideLeftAndFade%20data-%5Bside%3Dbottom%5D%3Aanimate-slideUpAndFade%20data-%5Bside%3Dleft%5D%3Aanimate-slideRightAndFade%22%0A%20%20%20%20%20%20%20%20%20%20%20%20sideOffset%3D%7B5%7D%0A%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20groupleading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20data-%5Bhighlighted%5D%3Abg-blue%20data-%5Bhighlighted%5D%3Atext-violet1%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20New%20Tab%20%3Cdiv%20className%3D%22ml-auto%20pl-2.5%22%3E%E2%8C%98%2BT%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20groupleading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20New%20Window%20%3Cdiv%20className%3D%22ml-auto%20pl-2.5%22%3E%E2%8C%98%2BN%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22hover%3Abg-accents-2%20groupleading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20disabled%0A%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20New%20Private%20Window%20%3Cdiv%20className%3D%22ml-auto%20pl-2.5%22%3E%E2%87%A7%2B%E2%8C%98%2BN%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Sub%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.SubTrigger%20className%3D%22hover%3Abg-accents-2%20groupleading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20data-%5Bstate%3Dopen%5D%3Abg-violet4%20data-%5Bstate%3Dopen%5D%3Atext-violet11%20%20%20%20data-%5Bhighlighted%5D%3Adata-%5Bstate%3Dopen%5D%3Abg-violet9%20data-%5Bhighlighted%5D%3Adata-%5Bstate%3Dopen%5D%3Atext-violet1%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20More%20Tools%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22ml-auto%20pl-2.5%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CChevronRightIcon%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.SubTrigger%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Portal%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.SubContent%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20className%3D%22min-w-%5B220px%5D%20rounded-md%20p-1%20will-change-%5Bopacity%2Ctransform%5D%20data-%5Bside%3Dtop%5D%3Aanimate-slideDownAndFade%20data-%5Bside%3Dright%5D%3Aanimate-slideLeftAndFade%20data-%5Bside%3Dbottom%5D%3Aanimate-slideUpAndFade%20data-%5Bside%3Dleft%5D%3Aanimate-slideRightAndFade%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20sideOffset%3D%7B2%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20alignOffset%3D%7B-5%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20groupleading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Save%20Page%20As%E2%80%A6%20%3Cdiv%20className%3D%22ml-auto%20pl-2.5%22%3E%E2%8C%98%2BS%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20leading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Create%20Shortcut%E2%80%A6%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20leading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Name%20Window%E2%80%A6%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CSeparator%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Item%20className%3D%22hover%3Abg-accents-2%20leading-none%20flex%20items-center%20h-2%20px-0.5%20relative%20pl-2%20select-none%20outline-none%20%20%20%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Developer%20Tools%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Item%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.SubContent%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Portal%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Sub%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CDropdownMenu.Arrow%20className%3D%22fill-white%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Content%3E%0A%20%20%20%20%20%20%20%20%3C%2FDropdownMenu.Portal%3E%0A%20%20%20%20%20%20%3C%2FDropdownMenu.Root%3E%0A%20%20%20%20%3C%2F%3E%0A%20%20)%3B%0A%7D%3B%0A",
    "11da1c79":
      "import%20React%2C%20%7B%20FormEvent%20%7D%20from%20%22react%22%3B%0A%0Aimport%20%7B%0A%20%20useForm%2C%0A%20%20useStatus%2C%0A%20%20useFormIsValid%2C%0A%20%20isInvalidSchema%2C%0A%7D%20from%20%22..%2F..%2Fhooks%2Fuse-form%22%3B%0Aimport%20type%20%7B%20FormDataProps%20%7D%20from%20%22..%2F..%2Fhooks%2Fuse-form%22%3B%0Aimport%20Input%20from%20%22..%2F..%2Fcomponents%2Finput%22%3B%0Aimport%20Select%20from%20%22..%2F..%2Fcomponents%2Fselect%22%3B%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0Aimport%20Alert%20from%20%22..%2F..%2Fcomponents%2Falert%22%3B%0Aimport%20Grid%20from%20%22..%2F..%2Fcomponents%2Fgrid%22%3B%0Aimport%20Checkbox%20from%20%22..%2F..%2Fcomponents%2Fcheckbox%22%3B%0A%0Aexport%20const%20WithHook%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20formData%3A%20FormDataProps%20%3D%20useForm(%7B%0A%20%20%20%20firstName%3A%20%22%22%2C%0A%20%20%20%20lastName%3A%20%22%22%2C%0A%20%20%20%20email%3A%20%22%22%2C%0A%20%20%20%20options%3A%20%22%22%2C%0A%20%20%20%20accept%3A%20false%2C%0A%20%20%7D)%3B%0A%0A%20%20const%20%7B%20firstName%2C%20lastName%2C%20email%2C%20options%2C%20accept%20%7D%20%3D%20formData%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cform%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Name%22%20%7B...firstName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Last%20name%22%20%7B...lastName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Email%22%20%7B...email%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CSelect%20%7B...options%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%3EFoo%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%3EFoo2%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%3C%2FSelect%3E%0A%20%20%20%20%20%20%20%20%3CCheckbox%20label%3D%22Accept%20terms%20and%20conditions.%22%20%7B...accept%7D%20%2F%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20const%20WithGrid%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20formData%3A%20FormDataProps%20%3D%20useForm(%7B%0A%20%20%20%20firstName%3A%20%22%22%2C%0A%20%20%20%20lastName%3A%20%22%22%2C%0A%20%20%20%20email%3A%20%22%22%2C%0A%20%20%7D)%3B%0A%0A%20%20const%20%7B%20firstName%2C%20lastName%2C%20email%20%7D%20%3D%20formData%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cform%3E%0A%20%20%20%20%20%20%20%20%3CGrid%20col%3D%22two%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Name%22%20%7B...firstName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Last%20name%22%20%7B...lastName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Email%22%20%7B...email%7D%20classNameContainer%3D%22span-2%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FGrid%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20const%20WithStatus%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20status%20%3D%20useStatus()%3B%0A%20%20const%20formData%3A%20FormDataProps%20%3D%20useForm(%7B%0A%20%20%20%20firstName%3A%20%22%22%2C%0A%20%20%20%20lastName%3A%20%22%22%2C%0A%20%20%20%20email%3A%20%22%22%2C%0A%20%20%7D)%3B%0A%0A%20%20const%20%7B%20firstName%2C%20lastName%2C%20email%20%7D%20%3D%20formData%3B%0A%0A%20%20const%20handleOnSubmit%20%3D%20async%20(event%3A%20FormEvent%3CHTMLFormElement%3E)%20%3D%3E%20%7B%0A%20%20%20%20event.preventDefault()%3B%0A%20%20%20%20status.resetStatus()%3B%0A%20%20%20%20status.setIsLoading(true)%3B%0A%0A%20%20%20%20const%20fakeFetch%20%3D%20new%20Promise((resolve%2C%20reject)%20%3D%3E%20%7B%0A%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20const%20random_boolean%20%3D%20Math.random()%20%3C%200.5%3B%0A%20%20%20%20%20%20%20%20resolve(%7B%20ok%3A%20random_boolean%20%7D)%3B%0A%20%20%20%20%20%20%7D%2C%20600)%3B%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20const%20res%20%3D%20await%20fakeFetch%3B%0A%0A%20%20%20%20handleOnResponse(res)%3B%0A%20%20%7D%3B%0A%0A%20%20const%20handleOnResponse%20%3D%20(res%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20status.setIsLoading(false)%3B%0A%20%20%20%20status.setSubmited(true)%3B%0A%20%20%20%20if%20(!res.ok)%20%7B%0A%20%20%20%20%20%20status.setIsError(true)%3B%0A%20%20%20%20%20%20status.setMessage(%22An%20unexpected%20error%20has%20occurred.%22)%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20status.setMessage(%22Everything%20has%20gone%20well.%22)%3B%0A%20%20%7D%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cform%20onSubmit%3D%7BhandleOnSubmit%7D%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Name%22%20%7B...firstName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Last%20name%22%20%7B...lastName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Email%22%20%7B...email%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22inputer%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3CButton%0A%20%20%20%20%20%20%20%20%20%20%20%20label%3D%22Submit%22%0A%20%20%20%20%20%20%20%20%20%20%20%20isLoadingText%3D%22Loading...%22%0A%20%20%20%20%20%20%20%20%20%20%20%20isLoading%3D%7Bstatus.state.isLoading%7D%0A%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%20%20%3CAlert%20state%3D%7Bstatus.state%7D%20isPushTop%20%2F%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20const%20WithValidator%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20status%20%3D%20useStatus()%3B%0A%20%20const%20formData%3A%20FormDataProps%20%3D%20useForm(%7B%0A%20%20%20%20firstName%3A%20%22%22%2C%0A%20%20%20%20lastName%3A%20%22%22%2C%0A%20%20%20%20email%3A%20%22%22%2C%0A%20%20%20%20options%3A%20%22%22%2C%0A%20%20%7D)%3B%0A%0A%20%20const%20%7B%20firstName%2C%20lastName%2C%20email%2C%20options%20%7D%20%3D%20formData%3B%0A%0A%20%20const%20regexEmail%20%3D%20%2F%5E%5Ba-zA-Z0-9_.%2B-%5D%2B%40%5Ba-zA-Z0-9-%5D%2B%5C.%5Ba-zA-Z0-9-.%5D%2B%24%2F%3B%0A%0A%20%20const%20validatorSchema%20%3D%20(%7B%0A%20%20%20%20firstName%2C%0A%20%20%20%20lastName%2C%0A%20%20%20%20email%2C%0A%20%20%20%20options%2C%0A%20%20%7D%3A%20%7B%0A%20%20%20%20%5Bkey%3A%20string%5D%3A%20any%3B%0A%20%20%7D)%20%3D%3E%20%7B%0A%20%20%20%20let%20schema%3A%20%7B%20%5Bkey%3A%20string%5D%3A%20boolean%20%7D%20%3D%20%7B%7D%3B%0A%0A%20%20%20%20if%20(!firstName.value)%20%7B%0A%20%20%20%20%20%20firstName.dialog(%22Name%20is%20required.%22)%3B%0A%20%20%20%20%20%20schema.firstName%20%3D%20false%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20schema.firstName%20%3D%20true%3B%0A%20%20%20%20%20%20firstName.dialog(null)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20(!lastName.value)%20%7B%0A%20%20%20%20%20%20lastName.dialog(%22Name%20is%20required.%22)%3B%0A%20%20%20%20%20%20schema.lastName%20%3D%20false%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20schema.lastName%20%3D%20true%3B%0A%20%20%20%20%20%20lastName.dialog(null)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20(!options.value)%20%7B%0A%20%20%20%20%20%20options.dialog(%22Options%20is%20required.%22)%3B%0A%20%20%20%20%20%20schema.options%20%3D%20false%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20schema.options%20%3D%20true%3B%0A%20%20%20%20%20%20options.dialog(null)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20(!email.value)%20%7B%0A%20%20%20%20%20%20email.dialog(%22Email%20is%20required.%22)%3B%0A%20%20%20%20%20%20schema.email%20%3D%20false%3B%0A%20%20%20%20%7D%20else%20if%20(!regexEmail.test(email.value))%20%7B%0A%20%20%20%20%20%20email.dialog(%22Email%20is%20not%20valid.%22)%3B%0A%20%20%20%20%20%20schema.email%20%3D%20false%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20schema.email%20%3D%20true%3B%0A%20%20%20%20%20%20email.dialog(null)%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20if%20(isInvalidSchema(schema))%20%7B%0A%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20return%20true%3B%0A%20%20%20%20%7D%0A%20%20%7D%3B%0A%0A%20%20const%20isValid%20%3D%20useFormIsValid(formData%2C%20validatorSchema)%3B%0A%0A%20%20const%20handleOnSubmit%20%3D%20async%20(event)%20%3D%3E%20%7B%0A%20%20%20%20event.preventDefault()%3B%0A%20%20%20%20status.resetStatus()%3B%0A%20%20%20%20status.setIsLoading(true)%3B%0A%0A%20%20%20%20const%20fakeFetch%20%3D%20new%20Promise((resolve%2C%20reject)%20%3D%3E%20%7B%0A%20%20%20%20%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20const%20random_boolean%20%3D%20Math.random()%20%3C%200.5%3B%0A%20%20%20%20%20%20%20%20resolve(%7B%20ok%3A%20random_boolean%20%7D)%3B%0A%20%20%20%20%20%20%7D%2C%20600)%3B%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20const%20res%20%3D%20await%20fakeFetch%3B%0A%0A%20%20%20%20handleOnResponse(res)%3B%0A%20%20%7D%3B%0A%0A%20%20const%20handleOnResponse%20%3D%20(res%3A%20any)%20%3D%3E%20%7B%0A%20%20%20%20status.setIsLoading(false)%3B%0A%20%20%20%20status.setSubmited(true)%3B%0A%20%20%20%20if%20(!res.ok)%20%7B%0A%20%20%20%20%20%20status.setIsError(true)%3B%0A%20%20%20%20%20%20status.setMessage(%22An%20unexpected%20error%20has%20occurred.%22)%3B%0A%20%20%20%20%20%20return%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20status.setMessage(%22Everything%20has%20gone%20well.%22)%3B%0A%20%20%7D%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cform%20onSubmit%3D%7BhandleOnSubmit%7D%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Name%22%20%7B...firstName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Last%20name%22%20%7B...lastName%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CInput%20placeholder%3D%22Email%22%20%7B...email%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%3CSelect%20placeholder%3D%22Select%20an%20option%22%20%7B...options%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%3EFoo%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%20%20%3Coption%3EFoo2%3C%2Foption%3E%0A%20%20%20%20%20%20%20%20%3C%2FSelect%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22inputer%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3CButton%0A%20%20%20%20%20%20%20%20%20%20%20%20label%3D%22Submit%22%0A%20%20%20%20%20%20%20%20%20%20%20%20isLoadingText%3D%22Loading...%22%0A%20%20%20%20%20%20%20%20%20%20%20%20isLoading%3D%7Bstatus.state.isLoading%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20isDisabled%3D%7B!isValid%7D%0A%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fform%3E%0A%20%20%20%20%20%20%3CAlert%20state%3D%7Bstatus.state%7D%20isPushTop%20%2F%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A",
    "3eea5fb6":
      "import%20React%20from%20%22react%22%3B%0Aimport%20Grid%20from%20%22..%2F..%2Fcomponents%2Fgrid%22%3B%0A%0Aexport%20const%20withOneColumns%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22one%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withTwoColumns%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22two%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withThreeColumns%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22three%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withFourColumns%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22four%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withColumnsFixed%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22four%22%20isFixed%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%20%2F%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withColumnsReverse%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22two%22%20className%3D%22reverse%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20green%20one%22%3E1%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%20two%22%3E2%3C%2Fdiv%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A%0Aexport%20const%20withSpan%20%3D%20()%20%3D%3E%20(%0A%20%20%3CGrid%20col%3D%22twelve%22%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20green%20span-6%22%3Espan-6%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20yellow%20span-3%22%3Espan-3%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20orange%20span-2%22%3Espan-2%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%20span-1%22%3Espan-1%3C%2Fdiv%3E%0A%20%20%3C%2FGrid%3E%0A)%3B%0A",
    "3ca65d75":
      "import%20React%20from%20%22react%22%3B%0A%0Aexport%20const%20Headlines%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3C%3E%0A%20%20%20%20%20%20%3Ch1%3EHeadline%201%3C%2Fh1%3E%0A%20%20%20%20%20%20%3Ch2%3EHeadline%202%3C%2Fh2%3E%0A%20%20%20%20%20%20%3Ch3%3EHeadline%203%3C%2Fh3%3E%0A%20%20%20%20%20%20%3Ch4%3EHeadline%204%3C%2Fh4%3E%0A%20%20%20%20%20%20%3Ch5%3EHeadline%205%3C%2Fh5%3E%0A%20%20%20%20%20%20%3Ch6%3EHeadline%206%3C%2Fh6%3E%0A%20%20%20%20%3C%2F%3E%0A%20%20)%3B%0A%7D%3B%0A",
    "1edda4df":
      "import%20React%20from%20%22react%22%3B%0Aimport%20%7B%20ChevronDownIcon%2C%20CopyIcon%2CMenuIcon%20%7D%20from%20%22..%2F..%2Ficons%22%3B%0Aimport%20%7B%20SunIcon%2C%20ImageIcon%20%7D%20from%20%22%40radix-ui%2Freact-icons%22%3B%0A%0A%0Aexport%20const%20Icon%3D%20()%20%3D%3E%20%3CCopyIcon%20%2F%3E%3B%0A%0Aexport%20const%20IconSize%20%3D%20()%20%3D%3E%20%3CCopyIcon%20className%3D%22h1%22%20%2F%3E%3B%0A%0Aexport%20const%20WithExternalIcon%20%3D%20()%20%3D%3E%20%3CSunIcon%20className%3D%22icon%22%20%2F%3E%3B%0A%0Aexport%20const%20WithExternalIconSize%20%3D%20()%20%3D%3E%20%3CImageIcon%20className%3D%22icon%20h3%22%20%2F%3E%3B%0A",
    "3c16a936":
      "import%20React%20from%20%22react%22%3B%0Aimport%20Input%20from%20%22..%2F..%2Fcomponents%2Finput%22%3B%0A%0Aexport%20const%20WithPlaceholder%20%3D%20()%20%3D%3E%20%3CInput%20placeholder%3D%22Placeholder%22%20%2F%3E%3B%0Aexport%20const%20WithLabel%20%3D%20()%20%3D%3E%20(%0A%20%20%3CInput%20placeholder%3D%22Placeholder%20and%20label%22%20isLabelable%20%2F%3E%0A)%3B%0Aexport%20const%20WithDialog%20%3D%20()%20%3D%3E%20(%0A%20%20%3CInput%0A%20%20%20%20placeholder%3D%22Placeholder%22%0A%20%20%20%20isHelping%0A%20%20%20%20helpText%3D%22%E2%9A%A0%EF%B8%8F%20Oooops%2C%20something%20happened%20text%22%0A%20%20%2F%3E%0A)%3B%0A%0Aexport%20const%20WithDate%20%3D%20()%20%3D%3E%20(%0A%20%20%3C%3E%0A%20%20%20%20%3CInput%20type%3D%22date%22%20%2F%3E%0A%20%20%20%20%3CInput%20type%3D%22datetime-local%22%20%2F%3E%0A%20%20%20%20%3CInput%20type%3D%22time%22%20%2F%3E%0A%20%20%20%20%3CInput%20type%3D%22week%22%20%2F%3E%0A%20%20%20%20%3CInput%20type%3D%22month%22%20%2F%3E%0A%20%20%3C%2F%3E%0A)%3B%0A%0Aexport%20const%20WithPicker%20%3D%20()%20%3D%3E%20(%0A%20%20%3CInput%20type%3D%22color%22%20className%3D%22p0%22%20value%3D%22%23e8ebfe%22%20%2F%3E%0A)%3B%0A%0Aexport%20const%20WithRage%20%3D%20()%20%3D%3E%20%3CInput%20type%3D%22range%22%20%2F%3E%3B%0A%0Aexport%20const%20WithFile%20%3D%20()%20%3D%3E%20%3CInput%20type%3D%22file%22%20className%3D%22pt0%22%20%2F%3E%3B%0A%0A%2F%2F%20%3CInput%20type%3D%22file%22%2F%3E%0A%0A%2F%2F%20%3CInput%20type%3D%22image%22%2F%3E%0A",
    "77cb9b04":
      "import%20React%20from%20%22react%22%3B%0A%0Aexport%20const%20Pancake%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cbody%20className%3D%22page-pancake%22%3E%0A%20%20%20%20%20%20%3Cheader%20className%3D%22pad%20blue%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Eheader%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Fheader%3E%0A%20%20%20%20%20%20%3Cmain%20className%3D%22pad%20teal-green%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Emain%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Fmain%3E%0A%20%20%20%20%20%20%3Cfooter%20className%3D%22pad%20orange%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Efooter%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Ffooter%3E%0A%20%20%20%20%3C%2Fbody%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20const%20Dashboard%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cbody%20className%3D%22page-dashboard%22%3E%0A%20%20%20%20%20%20%3Cdiv%20className%3D%22pad%20blue%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Elogo%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cheader%20className%3D%22pad%20yellow%22%3Eheader%3C%2Fheader%3E%0A%20%20%20%20%20%20%3Caside%20className%3D%22pad%20teal-green%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Easide%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Faside%3E%0A%20%20%20%20%20%20%3Cmain%20className%3D%22pad%20orange%22%3E%0A%20%20%20%20%20%20%20%20%3Cspan%3Emain%3C%2Fspan%3E%0A%20%20%20%20%20%20%3C%2Fmain%3E%0A%20%20%20%20%3C%2Fbody%3E%0A%20%20)%3B%0A%7D%3B%0A",
    "7f585258":
      "import%20React%2C%20%7B%20useState%20%7D%20from%20%22react%22%3B%0A%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0Aimport%20Modal%20from%20%22..%2F..%2Fcomponents%2Fmodal%22%3B%0A%0Aexport%20const%20DefaultConfig%20%3D%20()%20%3D%3E%20%7B%0A%20%20const%20%5BisOpen%2C%20setIsOpen%5D%20%3D%20useState(false)%3B%0A%0A%20%20return%20(%0A%20%20%20%20%3C%3E%0A%20%20%20%20%20%20%3CButton%20onClick%3D%7B()%20%3D%3E%20setIsOpen(true)%7D%20label%3D%22Delete%20Account%22%20%2F%3E%0A%20%20%20%20%20%20%3CModal%0A%20%20%20%20%20%20%20%20isVisible%3D%7BisOpen%7D%0A%20%20%20%20%20%20%20%20title%3D%22Are%20you%20absolutely%20sure%3F%22%0A%20%20%20%20%20%20%20%20firstButton%3D%7B%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20%22Cancel%22%2C%0A%20%20%20%20%20%20%20%20%20%20onClick%3A%20()%20%3D%3E%20setIsOpen(false)%2C%0A%20%20%20%20%20%20%20%20%7D%7D%0A%20%20%20%20%20%20%20%20secondButton%3D%7B%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20%22Yes%2C%20delete%20account%22%2C%0A%20%20%20%20%20%20%20%20%20%20onClick%3A%20()%20%3D%3E%20setIsOpen(false)%2C%0A%20%20%20%20%20%20%20%20%7D%7D%0A%20%20%20%20%20%20%20%20onClose%3D%7B()%20%3D%3E%20setIsOpen(false)%7D%0A%20%20%20%20%20%20%3E%0A%20%20%20%20%20%20%20%20This%20action%20cannot%20be%20undone.%20This%20will%20permanently%20delete%20your%20account%0A%20%20%20%20%20%20%20%20and%20remove%20your%20data%20from%20our%20servers.%0A%20%20%20%20%20%20%3C%2FModal%3E%0A%20%20%20%20%3C%2F%3E%0A%20%20)%3B%0A%7D%3B%0A",
    a53c0300:
      "import%20React%20from%20%22react%22%3B%0Aimport%20%7B%20Toaster%2C%20toast%20%7D%20from%20%22sonner%22%3B%0A%0Aimport%20Button%20from%20%22..%2F..%2Fcomponents%2Fbutton%22%3B%0A%0Aexport%20const%20Sonner%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%3Cp%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20className%3D%22info%20info-text%20wall-pad%22%3EExternal%20library%20%3Cspan%20className%3D%22font-bold%22%3E%24%20pnpm%20i%20sonner%3C%2Fspan%3E%3C%2Fspan%3E%20An%0A%20%20%20%20%20%20%20%20opinionated%20toast%20component%20for%20React.%0A%20%20%20%20%20%20%20%20%3Ca%20href%3D%22https%3A%2F%2Fsonner.emilkowal.ski%2F%22%20className%3D%22underline%22%20target%3D%22_blank%22%3E%0A%20%20%20%20%20%20%20%20%20%20All%20documentaiton%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20made%20by%7B%22%20%22%7D%0A%20%20%20%20%20%20%20%20%3Ca%20href%3D%22https%3A%2F%2Femilkowal.ski%2F%22%20className%3D%22underline%22%20target%3D%22_blank%22%3E%0A%20%20%20%20%20%20%20%20%20%20Emil%20Kowalski%0A%20%20%20%20%20%20%20%20%3C%2Fa%3E%0A%20%20%20%20%20%20%3C%2Fp%3E%0A%20%20%20%20%20%20%3CToaster%20position%3D%22top-center%22%20%2F%3E%0A%20%20%20%20%20%20%3CButton%20onClick%3D%7B()%20%3D%3E%20toast.success(%22My%20first%20toast%22)%7D%3E%0A%20%20%20%20%20%20%20%20Give%20me%20a%20toast%0A%20%20%20%20%20%20%3C%2FButton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A",
    dc64b295:
      "import%20React%20from%20%22react%22%3B%0Aimport%20Select%20from%20%22..%2F..%2Fcomponents%2Fselect%22%3B%0A%0Aexport%20const%20Naked%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSelect%20aria-label%3D%22Naked%20select%22%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%201%22%3EOption%201%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%202%22%3EOption%202%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%203%22%3EOption%203%3C%2Foption%3E%0A%20%20%3C%2FSelect%3E%0A)%3B%0A%0Aexport%20const%20WithPlaceholder%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSelect%20placeholder%3D%22Placeholder%22%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%201%22%3EOption%201%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%202%22%3EOption%202%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%203%22%3EOption%203%3C%2Foption%3E%0A%20%20%3C%2FSelect%3E%0A)%3B%0A%0Aexport%20const%20WithDialog%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSelect%0A%20%20%20%20placeholder%3D%22Placeholder%22%0A%20%20%20%20isHelping%0A%20%20%20%20helpText%3D%22%E2%9A%A0%EF%B8%8F%20Oooops%2C%20something%20happened%20text%22%0A%20%20%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%201%22%3EOption%201%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%202%22%3EOption%202%3C%2Foption%3E%0A%20%20%20%20%3Coption%20value%3D%22Option%203%22%3EOption%203%3C%2Foption%3E%0A%20%20%3C%2FSelect%3E%0A)%3B%0A",
    "94a9eddd":
      "import%20React%20from%20%22react%22%3B%0A%0Aimport%20Section%20from%20%22..%2F..%2Fcomponents%2Fsection%22%3B%0Aimport%20Separator%20from%20%22..%2F..%2Fcomponents%2Fseparator%22%3B%0A%0Aexport%20const%20Horizontal%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%3E%0A%20%20%20%20%3CSeparator%20%2F%3E%0A%20%20%3C%2FSection%3E%0A)%3B%0A%0Aexport%20const%20Vertical%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSection%20container%3D%22smish%22%3E%0A%20%20%3Cul%20className%3D%22nav-list%22%3E%0A%20%20%20%20%3Cli%3EBlog%3C%2Fli%3E%0A%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%3CSeparator%20isVertical%20%2F%3E%0A%20%20%20%20%3C%2Fli%3E%0A%20%20%20%20%3Cli%3EDocs%3C%2Fli%3E%0A%20%20%3C%2Ful%3E%0A%20%20%3C%2FSection%3E%0A)%3B%0A",
    "0af8835b":
      "import%20React%20from%20%22react%22%3B%0A%0Aimport%20Skeleton%20from%20%22..%2F..%2Fcomponents%2Fskeleton%22%3B%0A%0Aexport%20const%20Basic%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSkeleton%20widthAspectRation%3D%7B5%7D%20heightAspectRation%3D%7B5%7D%20%2F%3E%0A)%3B%0Aexport%20const%20Circle%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSkeleton%20widthAspectRation%3D%7B5%7D%20heightAspectRation%3D%7B5%7D%20isCircle%20%2F%3E%0A)%3B%0Aexport%20const%20Fluid%20%3D%20()%20%3D%3E%20(%0A%20%20%3CSkeleton%20widthAspectRation%3D%7B5%7D%20heightAspectRation%3D%7B5%7D%20isFluid%20%2F%3E%0A)%3B%0Aexport%20const%20Example%20%3D%20()%20%3D%3E%20(%0A%20%20%3C%3E%0A%20%20%20%20%3Cheader%20className%3D%22aura%22%3E%0A%20%20%20%20%20%20%3Cnav%3E%0A%20%20%20%20%20%20%20%20%3Cul%20className%3D%22nav-list%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20heightAspectRation%3D%7B4.5%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20widthAspectRation%3D%7B4.5%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20isCircle%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cli%3E%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cli%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%20heightAspectRation%3D%7B3%7D%20widthAspectRation%3D%7B10%7D%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fli%3E%0A%20%20%20%20%20%20%20%20%3C%2Ful%3E%0A%20%20%20%20%20%20%3C%2Fnav%3E%0A%20%20%20%20%3C%2Fheader%3E%0A%20%20%20%20%3Caside%20className%3D%22white%22%3E%0A%20%20%20%20%20%20%3Cdiv%20className%3D%22mt13%22%3E%0A%20%20%20%20%20%20%20%20%7B%5B0%2C%201%2C%202%5D.map((item%2C%20index)%20%3D%3E%20(%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22mb13%22%20key%3D%7Bindex%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%20heightAspectRation%3D%7B5%7D%20widthAspectRation%3D%7B5%7D%20isFluid%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20))%7D%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Faside%3E%0A%20%20%20%20%3Cdiv%20className%3D%22pad%20snow%22%3E%0A%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22smush%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cdiv%20className%3D%22aureole%20one%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%20heightAspectRation%3D%7B3%7D%20className%3D%22fluid%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%20heightAspectRation%3D%7B1%7D%20className%3D%22fluid%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CSkeleton%20heightAspectRation%3D%7B40%7D%20className%3D%22fluid%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2F%3E%0A)%3B%0A",
    "892117d0":
      "import%20React%20from%20%22react%22%3B%0A%0Aimport%20Tabs%20from%20%22..%2F..%2Fcomponents%2Ftabs%22%3B%0A%0Aexport%20const%20Basic%20%3D%20()%20%3D%3E%20(%0A%20%20%3CTabs%20data%3D%7B%5B%7B%20label%3A%20%22One%22%20%7D%2C%20%7B%20label%3A%20%22Two%22%20%7D%2C%20%7B%20label%3A%20%22Three%22%20%7D%5D%7D%3E%0A%20%20%20%20%3Cdiv%20className%3D%22mod-detail%20one%22%3EOne%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22mod-detail%20two%22%3ETwo%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20className%3D%22mod-detail%20three%22%3EThree%3C%2Fdiv%3E%0A%20%20%3C%2FTabs%3E%0A)%3B%0A",
  },
  ZA = {
    "accordion--with-color": Y["5537930d"],
    "accordion--with-content": Y["5537930d"],
    "accordion--with-header-size": Y["5537930d"],
    "alert--danger-alert": Y["5c51dc8b"],
    "alert--info-alert": Y["5c51dc8b"],
    "button--button-disabled": Y["925f065d"],
    "button--button-fill": Y["925f065d"],
    "button--button-fluid": Y["925f065d"],
    "button--button-link": Y["925f065d"],
    "button--button-pill": Y["925f065d"],
    "button--button-waiting": Y["925f065d"],
    "checkbox--naked": Y.c68721cf,
    "drawer--default": Y.f49a9317,
    "dropdown--default": Y.c816009b,
    "form--with-grid": Y["11da1c79"],
    "form--with-hook": Y["11da1c79"],
    "form--with-status": Y["11da1c79"],
    "form--with-validator": Y["11da1c79"],
    "grid--with-columns-fixed": Y["3eea5fb6"],
    "grid--with-columns-reverse": Y["3eea5fb6"],
    "grid--with-four-columns": Y["3eea5fb6"],
    "grid--with-one-columns": Y["3eea5fb6"],
    "grid--with-span": Y["3eea5fb6"],
    "grid--with-three-columns": Y["3eea5fb6"],
    "grid--with-two-columns": Y["3eea5fb6"],
    "headline--headlines": Y["3ca65d75"],
    "icons--icon": Y["1edda4df"],
    "icons--icon-size": Y["1edda4df"],
    "icons--with-external-icon": Y["1edda4df"],
    "icons--with-external-icon-size": Y["1edda4df"],
    "input--with-date": Y["3c16a936"],
    "input--with-dialog": Y["3c16a936"],
    "input--with-file": Y["3c16a936"],
    "input--with-label": Y["3c16a936"],
    "input--with-picker": Y["3c16a936"],
    "input--with-placeholder": Y["3c16a936"],
    "input--with-rage": Y["3c16a936"],
    "layout--dashboard": Y["77cb9b04"],
    "layout--pancake": Y["77cb9b04"],
    "modal--default-config": Y["7f585258"],
    "notice--sonner": Y.a53c0300,
    "section--default": Y[44490782],
    "section--with-color": Y[44490782],
    "section--with-container": Y[44490782],
    "section--with-pass-div": Y[44490782],
    "section--with-sub-class-name": Y[44490782],
    "select--naked": Y.dc64b295,
    "select--with-dialog": Y.dc64b295,
    "select--with-placeholder": Y.dc64b295,
    "separator--horizontal": Y["94a9eddd"],
    "separator--vertical": Y["94a9eddd"],
    "skeleton--basic": Y["0af8835b"],
    "skeleton--circle": Y["0af8835b"],
    "skeleton--example": Y["0af8835b"],
    "skeleton--fluid": Y["0af8835b"],
    "tabs--basic": Y["892117d0"],
  };
const Mp = {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  defaultStory: "",
  storyOrder: (e) => e,
  viteConfig: void 0,
  appendToHead: "",
  port: 61e3,
  previewPort: 8080,
  outDir: "build",
  base: void 0,
  hotkeys: {
    search: ["/", "meta+p"],
    nextStory: ["alt+arrowright"],
    previousStory: ["alt+arrowleft"],
    nextComponent: ["alt+arrowdown"],
    previousComponent: ["alt+arrowup"],
    control: ["c"],
    darkMode: ["d"],
    fullscreen: ["f"],
    width: ["w"],
    rtl: ["r"],
    source: ["s"],
    a11y: ["a"],
  },
  onDevServerStart: () => {},
  i18n: {
    buildTooltip: '💡 Tip: Run "ladle preview" to check that the build works!',
  },
  addons: {
    control: { enabled: !0, defaultState: {} },
    theme: { enabled: !0, defaultState: "light" },
    mode: { enabled: !0, defaultState: "full" },
    rtl: { enabled: !0, defaultState: !1 },
    source: { enabled: !0, defaultState: !1 },
    a11y: { enabled: !0 },
    action: { enabled: !0, defaultState: [] },
    ladle: { enabled: !0 },
    width: {
      enabled: !0,
      options: { xsmall: 414, small: 640, medium: 768, large: 1024 },
      defaultState: 0,
    },
  },
};
Object.keys(ut).length === 0
  ? Dt("No custom config found.")
  : (ut.storyOrder &&
      typeof ut.storyOrder == "string" &&
      (ut.storyOrder = new Function("return " + ut.storyOrder)()),
    Dt("Custom config found:"),
    Dt(ut));
var b2, _2;
(_2 = (b2 = ut == null ? void 0 : ut.addons) == null ? void 0 : b2.width) !=
  null &&
  _2.options &&
  (Mp.addons.width.options = {});
const H = tg(Mp, ut);
H.defaultStory === "" &&
  (H.defaultStory = $2(Object.keys(mn), H.storyOrder)[0]);
H.hotkeys = { ...H.hotkeys, ...ut.hotkeys };
Dt("Final config", H);
const zp = (e) => {
    switch (Wt.parse(e).theme) {
      case be.Light:
        return be.Light;
      case be.Dark:
        return be.Dark;
      case be.Auto:
        return be.Auto;
      default:
        return "light";
    }
  },
  QA = ({ globalState: e, dispatch: t }) => {
    const n = "Switch to dark theme.",
      r = "Switch to light theme.",
      o = () => {
        const i = e.theme === be.Light ? be.Dark : be.Light;
        document.documentElement.setAttribute("data-theme", i),
          t({ type: re.UpdateTheme, value: i });
      };
    return (
      ct(H.hotkeys.darkMode, o, {
        enabled: e.hotkeys && H.addons.mode.enabled,
      }),
      A("li", {
        children: z("button", {
          "aria-label": e.theme === be.Light ? n : r,
          title: e.theme === be.Light ? n : r,
          onClick: o,
          type: "button",
          children: [
            A(Hg, {}),
            A("span", {
              className: "ladle-addon-tooltip",
              children: e.theme === be.Light ? n : r,
            }),
            z("label", {
              children: [
                "Switch to",
                " ",
                e.theme === be.Light ? be.Dark : be.Light,
                " ",
                "theme",
              ],
            }),
          ],
        }),
      })
    );
  },
  jp = P2(I2(location.search, H.defaultStory));
Dt(`Initial document.title: ${jp}`);
document.title = `${jp} | Ladle`;
const js = zp(location.search);
Dt(`Initial theme state: ${js}`);
js === be.Auto
  ? window.matchMedia("(prefers-color-scheme: dark)").matches
    ? document.documentElement.setAttribute("data-theme", be.Dark)
    : document.documentElement.setAttribute("data-theme", be.Light)
  : document.documentElement.setAttribute("data-theme", js);
var ia = {},
  Up,
  aa,
  n2 = To;
(aa = ia.createRoot = n2.createRoot), (Up = ia.hydrateRoot = n2.hydrateRoot);
const XA = S2(
  {
    __proto__: null,
    get createRoot() {
      return aa;
    },
    default: ia,
    get hydrateRoot() {
      return Up;
    },
  },
  [ia]
);
var e0 = {},
  No = {},
  Vp = { exports: {} },
  qA = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
  KA = qA,
  JA = KA;
function Hp() {}
function Wp() {}
Wp.resetWarningCache = Hp;
var e1 = function () {
  function e(r, o, i, a, s, l) {
    if (l !== JA) {
      var u = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw ((u.name = "Invariant Violation"), u);
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Wp,
    resetWarningCache: Hp,
  };
  return (n.PropTypes = n), n;
};
Vp.exports = e1();
var Gp = Vp.exports,
  Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.FrameContextConsumer =
  Et.FrameContextProvider =
  Et.useFrame =
  Et.FrameContext =
    void 0;
var t1 = w,
  Yp = n1(t1);
function n1(e) {
  return e && e.__esModule ? e : { default: e };
}
var Zp = void 0,
  Qp = void 0;
typeof document < "u" && (Zp = document);
typeof window < "u" && (Qp = window);
var t0 = (Et.FrameContext = Yp.default.createContext({
  document: Zp,
  window: Qp,
}));
Et.useFrame = function () {
  return Yp.default.useContext(t0);
};
var r1 = t0.Provider,
  o1 = t0.Consumer;
Et.FrameContextProvider = r1;
Et.FrameContextConsumer = o1;
var n0 = {};
Object.defineProperty(n0, "__esModule", { value: !0 });
var i1 = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var o = n[r];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(t, o.key, o);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  Us = w;
Xp(Us);
var a1 = Gp,
  xl = Xp(a1);
function Xp(e) {
  return e && e.__esModule ? e : { default: e };
}
function l1(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function s1(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t && (typeof t == "object" || typeof t == "function") ? t : e;
}
function u1(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof t
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var qp = (function (e) {
  u1(t, e);
  function t() {
    return (
      l1(this, t),
      s1(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
    );
  }
  return (
    i1(t, [
      {
        key: "componentDidMount",
        value: function () {
          this.props.contentDidMount();
        },
      },
      {
        key: "componentDidUpdate",
        value: function () {
          this.props.contentDidUpdate();
        },
      },
      {
        key: "render",
        value: function () {
          return Us.Children.only(this.props.children);
        },
      },
    ]),
    t
  );
})(Us.Component);
qp.propTypes = {
  children: xl.default.element.isRequired,
  contentDidMount: xl.default.func.isRequired,
  contentDidUpdate: xl.default.func.isRequired,
};
n0.default = qp;
Object.defineProperty(No, "__esModule", { value: !0 });
No.Frame = void 0;
var Vs =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n)
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
      }
      return e;
    },
  c1 = (function () {
    function e(t, n) {
      for (var r = 0; r < n.length; r++) {
        var o = n[r];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(t, o.key, o);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  })(),
  Kp = w,
  Sn = Ta(Kp),
  d1 = To,
  r2 = Ta(d1),
  f1 = Gp,
  _t = Ta(f1),
  p1 = Et,
  h1 = n0,
  m1 = Ta(h1);
function Ta(e) {
  return e && e.__esModule ? e : { default: e };
}
function g1(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function y1(e, t) {
  if (!e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return t && (typeof t == "object" || typeof t == "function") ? t : e;
}
function v1(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Super expression must either be null or a function, not " + typeof t
    );
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
  })),
    t &&
      (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t));
}
var r0 = (No.Frame = (function (e) {
  v1(t, e);
  function t(n, r) {
    g1(this, t);
    var o = y1(
      this,
      (t.__proto__ || Object.getPrototypeOf(t)).call(this, n, r)
    );
    return (
      (o.setRef = function (i) {
        o.nodeRef.current = i;
        var a = o.props.forwardedRef;
        typeof a == "function" ? a(i) : a && (a.current = i);
      }),
      (o.handleLoad = function () {
        o.setState({ iframeLoaded: !0 });
      }),
      (o._isMounted = !1),
      (o.nodeRef = Sn.default.createRef()),
      (o.state = { iframeLoaded: !1 }),
      o
    );
  }
  return (
    c1(t, [
      {
        key: "componentDidMount",
        value: function () {
          this._isMounted = !0;
          var r = this.getDoc();
          r && r.readyState === "complete"
            ? this.forceUpdate()
            : this.nodeRef.current.addEventListener("load", this.handleLoad);
        },
      },
      {
        key: "componentWillUnmount",
        value: function () {
          (this._isMounted = !1),
            this.nodeRef.current.removeEventListener("load", this.handleLoad);
        },
      },
      {
        key: "getDoc",
        value: function () {
          return this.nodeRef.current
            ? this.nodeRef.current.contentDocument
            : null;
        },
      },
      {
        key: "getMountTarget",
        value: function () {
          var r = this.getDoc();
          return this.props.mountTarget
            ? r.querySelector(this.props.mountTarget)
            : r.body.children[0];
        },
      },
      {
        key: "renderFrameContents",
        value: function () {
          if (!this._isMounted) return null;
          var r = this.getDoc();
          if (!r) return null;
          var o = this.props.contentDidMount,
            i = this.props.contentDidUpdate,
            a = r.defaultView || r.parentView,
            s = Sn.default.createElement(
              m1.default,
              { contentDidMount: o, contentDidUpdate: i },
              Sn.default.createElement(
                p1.FrameContextProvider,
                { value: { document: r, window: a } },
                Sn.default.createElement(
                  "div",
                  { className: "frame-content" },
                  this.props.children
                )
              )
            ),
            l = this.getMountTarget();
          return [
            r2.default.createPortal(this.props.head, this.getDoc().head),
            r2.default.createPortal(s, l),
          ];
        },
      },
      {
        key: "render",
        value: function () {
          var r = Vs({}, this.props, {
            srcDoc: this.props.initialContent,
            children: void 0,
          });
          return (
            delete r.head,
            delete r.initialContent,
            delete r.mountTarget,
            delete r.contentDidMount,
            delete r.contentDidUpdate,
            delete r.forwardedRef,
            Sn.default.createElement(
              "iframe",
              Vs({}, r, { ref: this.setRef, onLoad: this.handleLoad }),
              this.state.iframeLoaded && this.renderFrameContents()
            )
          );
        },
      },
    ]),
    t
  );
})(Kp.Component));
r0.propTypes = {
  style: _t.default.object,
  head: _t.default.node,
  initialContent: _t.default.string,
  mountTarget: _t.default.string,
  contentDidMount: _t.default.func,
  contentDidUpdate: _t.default.func,
  children: _t.default.oneOfType([
    _t.default.element,
    _t.default.arrayOf(_t.default.element),
  ]),
};
r0.defaultProps = {
  style: {},
  head: null,
  children: void 0,
  mountTarget: void 0,
  contentDidMount: function () {},
  contentDidUpdate: function () {},
  initialContent:
    '<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>',
};
No.default = Sn.default.forwardRef(function (e, t) {
  return Sn.default.createElement(r0, Vs({}, e, { forwardedRef: t }));
});
(function (e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = No;
  Object.defineProperty(e, "default", {
    enumerable: !0,
    get: function () {
      return r(t).default;
    },
  });
  var n = Et;
  Object.defineProperty(e, "FrameContext", {
    enumerable: !0,
    get: function () {
      return n.FrameContext;
    },
  }),
    Object.defineProperty(e, "FrameContextConsumer", {
      enumerable: !0,
      get: function () {
        return n.FrameContextConsumer;
      },
    }),
    Object.defineProperty(e, "useFrame", {
      enumerable: !0,
      get: function () {
        return n.useFrame;
      },
    });
  function r(o) {
    return o && o.__esModule ? o : { default: o };
  }
})(e0);
const E1 = Sr(e0),
  Jp = O.createContext({});
function A1(e) {
  const t = O.useContext(Jp);
  return O.useMemo(
    () => (typeof e == "function" ? e(t) : { ...t, ...e }),
    [t, e]
  );
}
const w1 = {};
function C1({ components: e, children: t, disableParentContext: n }) {
  let r;
  return (
    n ? (r = typeof e == "function" ? e({}) : e || w1) : (r = A1(e)),
    O.createElement(Jp.Provider, { value: r }, t)
  );
}
class b1 extends w.Component {
  constructor(t) {
    super(t), (this.state = { hasError: !1 });
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch() {}
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
const _1 = ({ activeStory: e }) =>
  z("div", {
    className: "ladle-error-content",
    children: [
      A("h1", { children: "Story not found" }),
      z("p", {
        children: [
          "The story id ",
          A(Pn, { children: e }),
          " you are trying to open does not exist. Typo?",
        ],
      }),
      A("p", { children: A(yr, { href: "/", children: "Back to home" }) }),
      A("p", {
        children: A(yr, {
          href: "https://github.com/tajo/ladle",
          children: "GitHub",
        }),
      }),
      A("p", {
        children: A(yr, { href: "https://www.ladle.dev", children: "Docs" }),
      }),
    ],
  });
function eh(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = eh(e[t])) && (r && (r += " "), (r += n));
    else for (t in e) e[t] && (r && (r += " "), (r += t));
  return r;
}
function th() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = eh(e)) && (r && (r += " "), (r += t));
  return r;
}
var S1 = Object.create,
  Ra = Object.defineProperty,
  k1 = Object.defineProperties,
  D1 = Object.getOwnPropertyDescriptor,
  x1 = Object.getOwnPropertyDescriptors,
  nh = Object.getOwnPropertyNames,
  la = Object.getOwnPropertySymbols,
  F1 = Object.getPrototypeOf,
  o0 = Object.prototype.hasOwnProperty,
  rh = Object.prototype.propertyIsEnumerable,
  o2 = (e, t, n) =>
    t in e
      ? Ra(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Ot = (e, t) => {
    for (var n in t || (t = {})) o0.call(t, n) && o2(e, n, t[n]);
    if (la) for (var n of la(t)) rh.call(t, n) && o2(e, n, t[n]);
    return e;
  },
  Na = (e, t) => k1(e, x1(t)),
  oh = (e, t) => {
    var n = {};
    for (var r in e) o0.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && la)
      for (var r of la(e)) t.indexOf(r) < 0 && rh.call(e, r) && (n[r] = e[r]);
    return n;
  },
  O1 = (e, t) =>
    function () {
      return t || (0, e[nh(e)[0]])((t = { exports: {} }).exports, t), t.exports;
    },
  T1 = (e, t) => {
    for (var n in t) Ra(e, n, { get: t[n], enumerable: !0 });
  },
  R1 = (e, t, n, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of nh(t))
        !o0.call(e, o) &&
          o !== n &&
          Ra(e, o, {
            get: () => t[o],
            enumerable: !(r = D1(t, o)) || r.enumerable,
          });
    return e;
  },
  N1 = (e, t, n) => (
    (n = e != null ? S1(F1(e)) : {}),
    R1(
      t || !e || !e.__esModule
        ? Ra(n, "default", { value: e, enumerable: !0 })
        : n,
      e
    )
  ),
  B1 = O1({
    "../../node_modules/.pnpm/prismjs@1.29.0_patch_hash=vrxx3pzkik6jpmgpayxfjunetu/node_modules/prismjs/prism.js"(
      e,
      t
    ) {
      var n = (function () {
        var r = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
          o = 0,
          i = {},
          a = {
            util: {
              encode: function v(p) {
                return p instanceof s
                  ? new s(p.type, v(p.content), p.alias)
                  : Array.isArray(p)
                  ? p.map(v)
                  : p
                      .replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/\u00a0/g, " ");
              },
              type: function (v) {
                return Object.prototype.toString.call(v).slice(8, -1);
              },
              objId: function (v) {
                return (
                  v.__id || Object.defineProperty(v, "__id", { value: ++o }),
                  v.__id
                );
              },
              clone: function v(p, E) {
                E = E || {};
                var h, f;
                switch (a.util.type(p)) {
                  case "Object":
                    if (((f = a.util.objId(p)), E[f])) return E[f];
                    (h = {}), (E[f] = h);
                    for (var g in p) p.hasOwnProperty(g) && (h[g] = v(p[g], E));
                    return h;
                  case "Array":
                    return (
                      (f = a.util.objId(p)),
                      E[f]
                        ? E[f]
                        : ((h = []),
                          (E[f] = h),
                          p.forEach(function (_, D) {
                            h[D] = v(_, E);
                          }),
                          h)
                    );
                  default:
                    return p;
                }
              },
              getLanguage: function (v) {
                for (; v; ) {
                  var p = r.exec(v.className);
                  if (p) return p[1].toLowerCase();
                  v = v.parentElement;
                }
                return "none";
              },
              setLanguage: function (v, p) {
                (v.className = v.className.replace(RegExp(r, "gi"), "")),
                  v.classList.add("language-" + p);
              },
              isActive: function (v, p, E) {
                for (var h = "no-" + p; v; ) {
                  var f = v.classList;
                  if (f.contains(p)) return !0;
                  if (f.contains(h)) return !1;
                  v = v.parentElement;
                }
                return !!E;
              },
            },
            languages: {
              plain: i,
              plaintext: i,
              text: i,
              txt: i,
              extend: function (v, p) {
                var E = a.util.clone(a.languages[v]);
                for (var h in p) E[h] = p[h];
                return E;
              },
              insertBefore: function (v, p, E, h) {
                h = h || a.languages;
                var f = h[v],
                  g = {};
                for (var _ in f)
                  if (f.hasOwnProperty(_)) {
                    if (_ == p)
                      for (var D in E) E.hasOwnProperty(D) && (g[D] = E[D]);
                    E.hasOwnProperty(_) || (g[_] = f[_]);
                  }
                var T = h[v];
                return (
                  (h[v] = g),
                  a.languages.DFS(a.languages, function (k, x) {
                    x === T && k != v && (this[k] = g);
                  }),
                  g
                );
              },
              DFS: function v(p, E, h, f) {
                f = f || {};
                var g = a.util.objId;
                for (var _ in p)
                  if (p.hasOwnProperty(_)) {
                    E.call(p, _, p[_], h || _);
                    var D = p[_],
                      T = a.util.type(D);
                    T === "Object" && !f[g(D)]
                      ? ((f[g(D)] = !0), v(D, E, null, f))
                      : T === "Array" &&
                        !f[g(D)] &&
                        ((f[g(D)] = !0), v(D, E, _, f));
                  }
              },
            },
            plugins: {},
            highlight: function (v, p, E) {
              var h = { code: v, grammar: p, language: E };
              if ((a.hooks.run("before-tokenize", h), !h.grammar))
                throw new Error(
                  'The language "' + h.language + '" has no grammar.'
                );
              return (
                (h.tokens = a.tokenize(h.code, h.grammar)),
                a.hooks.run("after-tokenize", h),
                s.stringify(a.util.encode(h.tokens), h.language)
              );
            },
            tokenize: function (v, p) {
              var E = p.rest;
              if (E) {
                for (var h in E) p[h] = E[h];
                delete p.rest;
              }
              var f = new d();
              return c(f, f.head, v), u(v, f, p, f.head, 0), C(f);
            },
            hooks: {
              all: {},
              add: function (v, p) {
                var E = a.hooks.all;
                (E[v] = E[v] || []), E[v].push(p);
              },
              run: function (v, p) {
                var E = a.hooks.all[v];
                if (!(!E || !E.length)) for (var h = 0, f; (f = E[h++]); ) f(p);
              },
            },
            Token: s,
          };
        function s(v, p, E, h) {
          (this.type = v),
            (this.content = p),
            (this.alias = E),
            (this.length = (h || "").length | 0);
        }
        s.stringify = function v(p, E) {
          if (typeof p == "string") return p;
          if (Array.isArray(p)) {
            var h = "";
            return (
              p.forEach(function (T) {
                h += v(T, E);
              }),
              h
            );
          }
          var f = {
              type: p.type,
              content: v(p.content, E),
              tag: "span",
              classes: ["token", p.type],
              attributes: {},
              language: E,
            },
            g = p.alias;
          g &&
            (Array.isArray(g)
              ? Array.prototype.push.apply(f.classes, g)
              : f.classes.push(g)),
            a.hooks.run("wrap", f);
          var _ = "";
          for (var D in f.attributes)
            _ +=
              " " +
              D +
              '="' +
              (f.attributes[D] || "").replace(/"/g, "&quot;") +
              '"';
          return (
            "<" +
            f.tag +
            ' class="' +
            f.classes.join(" ") +
            '"' +
            _ +
            ">" +
            f.content +
            "</" +
            f.tag +
            ">"
          );
        };
        function l(v, p, E, h) {
          v.lastIndex = p;
          var f = v.exec(E);
          if (f && h && f[1]) {
            var g = f[1].length;
            (f.index += g), (f[0] = f[0].slice(g));
          }
          return f;
        }
        function u(v, p, E, h, f, g) {
          for (var _ in E)
            if (!(!E.hasOwnProperty(_) || !E[_])) {
              var D = E[_];
              D = Array.isArray(D) ? D : [D];
              for (var T = 0; T < D.length; ++T) {
                if (g && g.cause == _ + "," + T) return;
                var k = D[T],
                  x = k.inside,
                  P = !!k.lookbehind,
                  $ = !!k.greedy,
                  ee = k.alias;
                if ($ && !k.pattern.global) {
                  var R = k.pattern.toString().match(/[imsuy]*$/)[0];
                  k.pattern = RegExp(k.pattern.source, R + "g");
                }
                for (
                  var M = k.pattern || k, j = h.next, Q = f;
                  j !== p.tail && !(g && Q >= g.reach);
                  Q += j.value.length, j = j.next
                ) {
                  var q = j.value;
                  if (p.length > v.length) return;
                  if (!(q instanceof s)) {
                    var ne = 1,
                      F;
                    if ($) {
                      if (((F = l(M, Q, v, P)), !F || F.index >= v.length))
                        break;
                      var J = F.index,
                        L = F.index + F[0].length,
                        I = Q;
                      for (I += j.value.length; J >= I; )
                        (j = j.next), (I += j.value.length);
                      if (
                        ((I -= j.value.length), (Q = I), j.value instanceof s)
                      )
                        continue;
                      for (
                        var G = j;
                        G !== p.tail && (I < L || typeof G.value == "string");
                        G = G.next
                      )
                        ne++, (I += G.value.length);
                      ne--, (q = v.slice(Q, I)), (F.index -= Q);
                    } else if (((F = l(M, 0, q, P)), !F)) continue;
                    var J = F.index,
                      K = F[0],
                      ce = q.slice(0, J),
                      ot = q.slice(J + K.length),
                      de = Q + q.length;
                    g && de > g.reach && (g.reach = de);
                    var De = j.prev;
                    ce && ((De = c(p, De, ce)), (Q += ce.length)), m(p, De, ne);
                    var it = new s(_, x ? a.tokenize(K, x) : K, ee, K);
                    if (((j = c(p, De, it)), ot && c(p, j, ot), ne > 1)) {
                      var Yt = { cause: _ + "," + T, reach: de };
                      u(v, p, E, j.prev, Q, Yt),
                        g && Yt.reach > g.reach && (g.reach = Yt.reach);
                    }
                  }
                }
              }
            }
        }
        function d() {
          var v = { value: null, prev: null, next: null },
            p = { value: null, prev: v, next: null };
          (v.next = p), (this.head = v), (this.tail = p), (this.length = 0);
        }
        function c(v, p, E) {
          var h = p.next,
            f = { value: E, prev: p, next: h };
          return (p.next = f), (h.prev = f), v.length++, f;
        }
        function m(v, p, E) {
          for (var h = p.next, f = 0; f < E && h !== v.tail; f++) h = h.next;
          (p.next = h), (h.prev = p), (v.length -= f);
        }
        function C(v) {
          for (var p = [], E = v.head.next; E !== v.tail; )
            p.push(E.value), (E = E.next);
          return p;
        }
        return a;
      })();
      (t.exports = n), (n.default = n);
    },
  }),
  N = N1(B1());
(function (e) {
  var t = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" },
    n =
      /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,
    r = "(?:[^\\\\-]|" + n.source + ")",
    r = RegExp(r + "-" + r),
    o = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: "variable" };
  e.languages.regex = {
    "char-class": {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
      lookbehind: !0,
      inside: {
        "char-class-negation": {
          pattern: /(^\[)\^/,
          lookbehind: !0,
          alias: "operator",
        },
        "char-class-punctuation": { pattern: /^\[|\]$/, alias: "punctuation" },
        range: {
          pattern: r,
          inside: {
            escape: n,
            "range-punctuation": { pattern: /-/, alias: "operator" },
          },
        },
        "special-escape": t,
        "char-set": { pattern: /\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" },
        escape: n,
      },
    },
    "special-escape": t,
    "char-set": { pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i, alias: "class-name" },
    backreference: [
      { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" },
      {
        pattern: /\\k<[^<>']+>/,
        alias: "keyword",
        inside: { "group-name": o },
      },
    ],
    anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" },
    escape: n,
    group: [
      {
        pattern:
          /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
        alias: "punctuation",
        inside: { "group-name": o },
      },
      { pattern: /\)/, alias: "punctuation" },
    ],
    quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: "number" },
    alternation: { pattern: /\|/, alias: "keyword" },
  };
})(N),
  (N.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0,
      },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    "class-name": {
      pattern:
        /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (N.languages.javascript = N.languages.extend("clike", {
    "class-name": [
      N.languages.clike["class-name"],
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0,
      },
    ],
    keyword: [
      { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      },
    ],
    function:
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        /(^|[^\w$])/.source +
          "(?:" +
          /NaN|Infinity/.source +
          "|" +
          /0[bB][01]+(?:_[01]+)*n?/.source +
          "|" +
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source +
          "|" +
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
          "|" +
          /\d+(?:_\d+)*n/.source +
          "|" +
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/
            .source +
          ")" +
          /(?![\w$])/.source
      ),
      lookbehind: !0,
    },
    operator:
      /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
  })),
  (N.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  N.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
          /\//.source +
          "(?:" +
          /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/
            .source +
          "|" +
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/
            .source +
          ")" +
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/
            .source
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: N.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: N.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: N.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: N.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: N.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  N.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: N.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "string-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
    },
  }),
  N.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property",
    },
  }),
  N.languages.markup &&
    (N.languages.markup.tag.addInlined("script", "javascript"),
    N.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/
        .source,
      "javascript"
    )),
  (N.languages.js = N.languages.javascript),
  (N.languages.actionscript = N.languages.extend("javascript", {
    keyword:
      /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
    operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/,
  })),
  (N.languages.actionscript["class-name"].alias = "function"),
  delete N.languages.actionscript.parameter,
  delete N.languages.actionscript["literal-property"],
  N.languages.markup &&
    N.languages.insertBefore("actionscript", "string", {
      xml: {
        pattern:
          /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
        lookbehind: !0,
        inside: N.languages.markup,
      },
    }),
  (function (e) {
    var t = /#(?!\{).+/,
      n = { pattern: /#\{[^}]+\}/, alias: "variable" };
    (e.languages.coffeescript = e.languages.extend("javascript", {
      comment: t,
      string: [
        { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
        {
          pattern: /"(?:\\[\s\S]|[^\\"])*"/,
          greedy: !0,
          inside: { interpolation: n },
        },
      ],
      keyword:
        /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
      "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
    })),
      e.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
        "block-regex": {
          pattern: /\/{3}[\s\S]*?\/{3}/,
          alias: "regex",
          inside: { comment: t, interpolation: n },
        },
      }),
      e.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: {
            delimiter: { pattern: /^`|`$/, alias: "punctuation" },
            script: {
              pattern: /[\s\S]+/,
              alias: "language-javascript",
              inside: e.languages.javascript,
            },
          },
        },
        "multiline-string": [
          { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
          {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: "string",
            inside: { interpolation: n },
          },
        ],
      }),
      e.languages.insertBefore("coffeescript", "keyword", {
        property: /(?!\d)\w+(?=\s*:(?!:))/,
      }),
      delete e.languages.coffeescript["template-string"],
      (e.languages.coffee = e.languages.coffeescript);
  })(N),
  (function (e) {
    var t = (e.languages.javadoclike = {
      parameter: {
        pattern:
          /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
        lookbehind: !0,
      },
      keyword: {
        pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
        lookbehind: !0,
      },
      punctuation: /[{}]/,
    });
    Object.defineProperty(t, "addSupport", {
      value: function (n, r) {
        (n = typeof n == "string" ? [n] : n).forEach(function (o) {
          var i = function (c) {
              c.inside || (c.inside = {}), (c.inside.rest = r);
            },
            a = "doc-comment";
          if ((s = e.languages[o])) {
            var s,
              l = s[a];
            if (
              ((l =
                l ||
                (s = e.languages.insertBefore(o, "comment", {
                  "doc-comment": {
                    pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                    lookbehind: !0,
                    alias: "comment",
                  },
                }))[a]) instanceof RegExp && (l = s[a] = { pattern: l }),
              Array.isArray(l))
            )
              for (var u = 0, d = l.length; u < d; u++)
                l[u] instanceof RegExp && (l[u] = { pattern: l[u] }), i(l[u]);
            else i(l);
          }
        });
      },
    }),
      t.addSupport(["java", "javascript", "php"], t);
  })(N),
  (function (e) {
    var t =
        /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/,
      t =
        ((e.languages.css = {
          comment: /\/\*[\s\S]*?\*\//,
          atrule: {
            pattern: RegExp(
              "@[\\w-](?:" +
                /[^;{\s"']|\s+(?!\s)/.source +
                "|" +
                t.source +
                ")*?" +
                /(?:;|(?=\s*\{))/.source
            ),
            inside: {
              rule: /^@[\w-]+/,
              "selector-function-argument": {
                pattern:
                  /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                lookbehind: !0,
                alias: "selector",
              },
              keyword: {
                pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                lookbehind: !0,
              },
            },
          },
          url: {
            pattern: RegExp(
              "\\burl\\((?:" +
                t.source +
                "|" +
                /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                ")\\)",
              "i"
            ),
            greedy: !0,
            inside: {
              function: /^url/i,
              punctuation: /^\(|\)$/,
              string: { pattern: RegExp("^" + t.source + "$"), alias: "url" },
            },
          },
          selector: {
            pattern: RegExp(
              `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` +
                t.source +
                ")*(?=\\s*\\{)"
            ),
            lookbehind: !0,
          },
          string: { pattern: t, greedy: !0 },
          property: {
            pattern:
              /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: !0,
          },
          important: /!important\b/i,
          function: {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: !0,
          },
          punctuation: /[(){};:,]/,
        }),
        (e.languages.css.atrule.inside.rest = e.languages.css),
        e.languages.markup);
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
  })(N),
  (function (e) {
    var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      t =
        ((e.languages.css.selector = {
          pattern: e.languages.css.selector.pattern,
          lookbehind: !0,
          inside: (t = {
            "pseudo-element":
              /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
            "pseudo-class": /:[-\w]+/,
            class: /\.[-\w]+/,
            id: /#[-\w]+/,
            attribute: {
              pattern: RegExp(`\\[(?:[^[\\]"']|` + t.source + ")*\\]"),
              greedy: !0,
              inside: {
                punctuation: /^\[|\]$/,
                "case-sensitivity": {
                  pattern: /(\s)[si]$/i,
                  lookbehind: !0,
                  alias: "keyword",
                },
                namespace: {
                  pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                  lookbehind: !0,
                  inside: { punctuation: /\|$/ },
                },
                "attr-name": {
                  pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
                  lookbehind: !0,
                },
                "attr-value": [
                  t,
                  {
                    pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                    lookbehind: !0,
                  },
                ],
                operator: /[|~*^$]?=/,
              },
            },
            "n-th": [
              {
                pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
                lookbehind: !0,
                inside: { number: /[\dn]+/, operator: /[+-]/ },
              },
              { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
            ],
            combinator: />|\+|~|\|\|/,
            punctuation: /[(),]/,
          }),
        }),
        (e.languages.css.atrule.inside["selector-function-argument"].inside =
          t),
        e.languages.insertBefore("css", "property", {
          variable: {
            pattern:
              /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
            lookbehind: !0,
          },
        }),
        { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: !0 }),
      n = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 };
    e.languages.insertBefore("css", "function", {
      operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
      hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" },
      color: [
        {
          pattern:
            /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
          lookbehind: !0,
        },
        {
          pattern:
            /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
          inside: {
            unit: t,
            number: n,
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
          },
        },
      ],
      entity: /\\[\da-f]{1,8}/i,
      unit: t,
      number: n,
    });
  })(N),
  (function (e) {
    var t = /[*&][^\s[\]{},]+/,
      n =
        /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
      r =
        "(?:" +
        n.source +
        "(?:[ 	]+" +
        t.source +
        ")?|" +
        t.source +
        "(?:[ 	]+" +
        n.source +
        ")?)",
      o =
        /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
          /<PLAIN>/g,
          function () {
            return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/
              .source;
          }
        ),
      i = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
    function a(s, l) {
      l = (l || "").replace(/m/g, "") + "m";
      var u =
        /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source
          .replace(/<<prop>>/g, function () {
            return r;
          })
          .replace(/<<value>>/g, function () {
            return s;
          });
      return RegExp(u, l);
    }
    (e.languages.yaml = {
      scalar: {
        pattern: RegExp(
          /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
            /<<prop>>/g,
            function () {
              return r;
            }
          )
        ),
        lookbehind: !0,
        alias: "string",
      },
      comment: /#.*/,
      key: {
        pattern: RegExp(
          /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source
            .replace(/<<prop>>/g, function () {
              return r;
            })
            .replace(/<<key>>/g, function () {
              return "(?:" + o + "|" + i + ")";
            })
        ),
        lookbehind: !0,
        greedy: !0,
        alias: "atrule",
      },
      directive: {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: !0,
        alias: "important",
      },
      datetime: {
        pattern: a(
          /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/
            .source
        ),
        lookbehind: !0,
        alias: "number",
      },
      boolean: {
        pattern: a(/false|true/.source, "i"),
        lookbehind: !0,
        alias: "important",
      },
      null: {
        pattern: a(/null|~/.source, "i"),
        lookbehind: !0,
        alias: "important",
      },
      string: { pattern: a(i), lookbehind: !0, greedy: !0 },
      number: {
        pattern: a(
          /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/
            .source,
          "i"
        ),
        lookbehind: !0,
      },
      tag: n,
      important: t,
      punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
    }),
      (e.languages.yml = e.languages.yaml);
  })(N),
  (N.languages.markup = {
    comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
    prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
    doctype: {
      pattern:
        /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: !0,
          greedy: !0,
          inside: null,
        },
        string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/,
      },
    },
    cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
    tag: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              { pattern: /^=/, alias: "attr-equals" },
              { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
            ],
          },
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ },
        },
      },
    },
    entity: [
      { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
      /&#x?[\da-f]{1,8};/i,
    ],
  }),
  (N.languages.markup.tag.inside["attr-value"].inside.entity =
    N.languages.markup.entity),
  (N.languages.markup.doctype.inside["internal-subset"].inside =
    N.languages.markup),
  N.hooks.add("wrap", function (e) {
    e.type === "entity" &&
      (e.attributes.title = e.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(N.languages.markup.tag, "addInlined", {
    value: function (e, r) {
      var n = {},
        n =
          ((n["language-" + r] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: N.languages[r],
          }),
          (n.cdata = /^<!\[CDATA\[|\]\]>$/i),
          {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: n,
            },
          }),
        r =
          ((n["language-" + r] = {
            pattern: /[\s\S]+/,
            inside: N.languages[r],
          }),
          {});
      (r[e] = {
        pattern: RegExp(
          /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
            /__/g,
            function () {
              return e;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        N.languages.insertBefore("markup", "cdata", r);
    },
  }),
  Object.defineProperty(N.languages.markup.tag, "addAttribute", {
    value: function (e, t) {
      N.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source +
            "(?:" +
            e +
            ")" +
            /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [t, "language-" + t],
                inside: N.languages[t],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (N.languages.html = N.languages.markup),
  (N.languages.mathml = N.languages.markup),
  (N.languages.svg = N.languages.markup),
  (N.languages.xml = N.languages.extend("markup", {})),
  (N.languages.ssml = N.languages.xml),
  (N.languages.atom = N.languages.xml),
  (N.languages.rss = N.languages.xml),
  (function (e) {
    var t = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
    function n(u) {
      return (
        (u = u.replace(/<inner>/g, function () {
          return t;
        })),
        RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + u + ")")
      );
    }
    var r = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,
      o = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
        /__/g,
        function () {
          return r;
        }
      ),
      i = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/
        .source,
      a =
        ((e.languages.markdown = e.languages.extend("markup", {})),
        e.languages.insertBefore("markdown", "prolog", {
          "front-matter-block": {
            pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
            lookbehind: !0,
            greedy: !0,
            inside: {
              punctuation: /^---|---$/,
              "front-matter": {
                pattern: /\S+(?:\s+\S+)*/,
                alias: ["yaml", "language-yaml"],
                inside: e.languages.yaml,
              },
            },
          },
          blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
          table: {
            pattern: RegExp("^" + o + i + "(?:" + o + ")*", "m"),
            inside: {
              "table-data-rows": {
                pattern: RegExp("^(" + o + i + ")(?:" + o + ")*$"),
                lookbehind: !0,
                inside: {
                  "table-data": {
                    pattern: RegExp(r),
                    inside: e.languages.markdown,
                  },
                  punctuation: /\|/,
                },
              },
              "table-line": {
                pattern: RegExp("^(" + o + ")" + i + "$"),
                lookbehind: !0,
                inside: { punctuation: /\||:?-{3,}:?/ },
              },
              "table-header-row": {
                pattern: RegExp("^" + o + "$"),
                inside: {
                  "table-header": {
                    pattern: RegExp(r),
                    alias: "important",
                    inside: e.languages.markdown,
                  },
                  punctuation: /\|/,
                },
              },
            },
          },
          code: [
            {
              pattern:
                /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
              lookbehind: !0,
              alias: "keyword",
            },
            {
              pattern: /^```[\s\S]*?^```$/m,
              greedy: !0,
              inside: {
                "code-block": {
                  pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                  lookbehind: !0,
                },
                "code-language": { pattern: /^(```).+/, lookbehind: !0 },
                punctuation: /```/,
              },
            },
          ],
          title: [
            {
              pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
              alias: "important",
              inside: { punctuation: /==+$|--+$/ },
            },
            {
              pattern: /(^\s*)#.+/m,
              lookbehind: !0,
              alias: "important",
              inside: { punctuation: /^#+|#+$/ },
            },
          ],
          hr: {
            pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: "punctuation",
          },
          list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: "punctuation",
          },
          "url-reference": {
            pattern:
              /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
              string:
                /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              punctuation: /^[\[\]!:]|[<>]/,
            },
            alias: "url",
          },
          bold: {
            pattern: n(
              /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/
                .source
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
              content: {
                pattern: /(^..)[\s\S]+(?=..$)/,
                lookbehind: !0,
                inside: {},
              },
              punctuation: /\*\*|__/,
            },
          },
          italic: {
            pattern: n(
              /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/
                .source
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
              content: {
                pattern: /(^.)[\s\S]+(?=.$)/,
                lookbehind: !0,
                inside: {},
              },
              punctuation: /[*_]/,
            },
          },
          strike: {
            pattern: n(/(~~?)(?:(?!~)<inner>)+\2/.source),
            lookbehind: !0,
            greedy: !0,
            inside: {
              content: {
                pattern: /(^~~?)[\s\S]+(?=\1$)/,
                lookbehind: !0,
                inside: {},
              },
              punctuation: /~~?/,
            },
          },
          "code-snippet": {
            pattern:
              /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
            lookbehind: !0,
            greedy: !0,
            alias: ["code", "keyword"],
          },
          url: {
            pattern: n(
              /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/
                .source
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
              operator: /^!/,
              content: {
                pattern: /(^\[)[^\]]+(?=\])/,
                lookbehind: !0,
                inside: {},
              },
              variable: {
                pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
                lookbehind: !0,
              },
              url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
              string: {
                pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
                lookbehind: !0,
              },
            },
          },
        }),
        ["url", "bold", "italic", "strike"].forEach(function (u) {
          ["url", "bold", "italic", "strike", "code-snippet"].forEach(function (
            d
          ) {
            u !== d &&
              (e.languages.markdown[u].inside.content.inside[d] =
                e.languages.markdown[d]);
          });
        }),
        e.hooks.add("after-tokenize", function (u) {
          (u.language !== "markdown" && u.language !== "md") ||
            (function d(c) {
              if (c && typeof c != "string")
                for (var m = 0, C = c.length; m < C; m++) {
                  var v,
                    p = c[m];
                  p.type !== "code"
                    ? d(p.content)
                    : ((v = p.content[1]),
                      (p = p.content[3]),
                      v &&
                        p &&
                        v.type === "code-language" &&
                        p.type === "code-block" &&
                        typeof v.content == "string" &&
                        ((v = v.content
                          .replace(/\b#/g, "sharp")
                          .replace(/\b\+\+/g, "pp")),
                        (v =
                          "language-" +
                          (v = (/[a-z][\w-]*/i.exec(v) || [
                            "",
                          ])[0].toLowerCase())),
                        p.alias
                          ? typeof p.alias == "string"
                            ? (p.alias = [p.alias, v])
                            : p.alias.push(v)
                          : (p.alias = [v])));
                }
            })(u.tokens);
        }),
        e.hooks.add("wrap", function (u) {
          if (u.type === "code-block") {
            for (var d = "", c = 0, m = u.classes.length; c < m; c++) {
              var C = u.classes[c],
                C = /language-(.+)/.exec(C);
              if (C) {
                d = C[1];
                break;
              }
            }
            var v,
              p = e.languages[d];
            p
              ? (u.content = e.highlight(
                  (function (E) {
                    return (
                      (E = E.replace(a, "")),
                      (E = E.replace(
                        /&(\w{1,8}|#x?[\da-f]{1,8});/gi,
                        function (h, f) {
                          var g;
                          return (f = f.toLowerCase())[0] === "#"
                            ? ((g =
                                f[1] === "x"
                                  ? parseInt(f.slice(2), 16)
                                  : Number(f.slice(1))),
                              l(g))
                            : s[f] || h;
                        }
                      ))
                    );
                  })(u.content),
                  p,
                  d
                ))
              : d &&
                d !== "none" &&
                e.plugins.autoloader &&
                ((v =
                  "md-" +
                  new Date().valueOf() +
                  "-" +
                  Math.floor(1e16 * Math.random())),
                (u.attributes.id = v),
                e.plugins.autoloader.loadLanguages(d, function () {
                  var E = document.getElementById(v);
                  E &&
                    (E.innerHTML = e.highlight(
                      E.textContent,
                      e.languages[d],
                      d
                    ));
                }));
          }
        }),
        RegExp(e.languages.markup.tag.pattern.source, "gi")),
      s = { amp: "&", lt: "<", gt: ">", quot: '"' },
      l = String.fromCodePoint || String.fromCharCode;
    e.languages.md = e.languages.markdown;
  })(N),
  (N.languages.graphql = {
    comment: /#.*/,
    description: {
      pattern:
        /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
      greedy: !0,
      alias: "string",
      inside: {
        "language-markdown": {
          pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
          lookbehind: !0,
          inside: N.languages.markdown,
        },
      },
    },
    string: {
      pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
      greedy: !0,
    },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:false|true)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
    "attr-name": {
      pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
      greedy: !0,
    },
    "atom-input": { pattern: /\b[A-Z]\w*Input\b/, alias: "class-name" },
    scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
    constant: /\b[A-Z][A-Z_\d]*\b/,
    "class-name": {
      pattern:
        /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
      lookbehind: !0,
    },
    fragment: {
      pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
      lookbehind: !0,
      alias: "function",
    },
    "definition-mutation": {
      pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
      lookbehind: !0,
      alias: "function",
    },
    "definition-query": {
      pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
      lookbehind: !0,
      alias: "function",
    },
    keyword:
      /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
    operator: /[!=|&]|\.{3}/,
    "property-query": /\w+(?=\s*\()/,
    object: /\w+(?=\s*\{)/,
    punctuation: /[!(){}\[\]:=,]/,
    property: /\w+/,
  }),
  N.hooks.add("after-tokenize", function (e) {
    if (e.language === "graphql")
      for (
        var t = e.tokens.filter(function (v) {
            return (
              typeof v != "string" &&
              v.type !== "comment" &&
              v.type !== "scalar"
            );
          }),
          n = 0;
        n < t.length;

      ) {
        var r = t[n++];
        if (r.type === "keyword" && r.content === "mutation") {
          var o = [];
          if (
            c(["definition-mutation", "punctuation"]) &&
            d(1).content === "("
          ) {
            n += 2;
            var i = m(/^\($/, /^\)$/);
            if (i === -1) continue;
            for (; n < i; n++) {
              var a = d(0);
              a.type === "variable" &&
                (C(a, "variable-input"), o.push(a.content));
            }
            n = i + 1;
          }
          if (
            c(["punctuation", "property-query"]) &&
            d(0).content === "{" &&
            (n++, C(d(0), "property-mutation"), 0 < o.length)
          ) {
            var s = m(/^\{$/, /^\}$/);
            if (s !== -1)
              for (var l = n; l < s; l++) {
                var u = t[l];
                u.type === "variable" &&
                  0 <= o.indexOf(u.content) &&
                  C(u, "variable-input");
              }
          }
        }
      }
    function d(v) {
      return t[n + v];
    }
    function c(v, p) {
      p = p || 0;
      for (var E = 0; E < v.length; E++) {
        var h = d(E + p);
        if (!h || h.type !== v[E]) return;
      }
      return 1;
    }
    function m(v, p) {
      for (var E = 1, h = n; h < t.length; h++) {
        var f = t[h],
          g = f.content;
        if (f.type === "punctuation" && typeof g == "string") {
          if (v.test(g)) E++;
          else if (p.test(g) && --E === 0) return h;
        }
      }
      return -1;
    }
    function C(v, p) {
      var E = v.alias;
      E ? Array.isArray(E) || (v.alias = E = [E]) : (v.alias = E = []),
        E.push(p);
    }
  }),
  (N.languages.sql = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: !0,
    },
    variable: [
      { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
      /@[\w.$]+/,
    ],
    string: {
      pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
      greedy: !0,
      lookbehind: !0,
    },
    identifier: {
      pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
      greedy: !0,
      lookbehind: !0,
      inside: { punctuation: /^`|`$/ },
    },
    function:
      /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
      /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
    operator:
      /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
  }),
  (function (e) {
    var t = e.languages.javascript["template-string"],
      n = t.pattern.source,
      r = t.inside.interpolation,
      o = r.inside["interpolation-punctuation"],
      i = r.pattern.source;
    function a(c, m) {
      if (e.languages[c])
        return {
          pattern: RegExp("((?:" + m + ")\\s*)" + n),
          lookbehind: !0,
          greedy: !0,
          inside: {
            "template-punctuation": { pattern: /^`|`$/, alias: "string" },
            "embedded-code": { pattern: /[\s\S]+/, alias: c },
          },
        };
    }
    function s(c, m, C) {
      return (
        (c = { code: c, grammar: m, language: C }),
        e.hooks.run("before-tokenize", c),
        (c.tokens = e.tokenize(c.code, c.grammar)),
        e.hooks.run("after-tokenize", c),
        c.tokens
      );
    }
    function l(c, m, C) {
      var E = e.tokenize(c, {
          interpolation: { pattern: RegExp(i), lookbehind: !0 },
        }),
        v = 0,
        p = {},
        E = s(
          E.map(function (f) {
            if (typeof f == "string") return f;
            for (
              var g, _, f = f.content;
              c.indexOf(
                ((_ = v++), (g = "___" + C.toUpperCase() + "_" + _ + "___"))
              ) !== -1;

            );
            return (p[g] = f), g;
          }).join(""),
          m,
          C
        ),
        h = Object.keys(p);
      return (
        (v = 0),
        (function f(g) {
          for (var _ = 0; _ < g.length; _++) {
            if (v >= h.length) return;
            var D,
              T,
              k,
              x,
              P,
              $,
              ee,
              R = g[_];
            typeof R == "string" || typeof R.content == "string"
              ? ((D = h[v]),
                (ee = ($ = typeof R == "string" ? R : R.content).indexOf(D)) !==
                  -1 &&
                  (++v,
                  (T = $.substring(0, ee)),
                  (P = p[D]),
                  (k = void 0),
                  ((x = {})["interpolation-punctuation"] = o),
                  (x = e.tokenize(P, x)).length === 3 &&
                    ((k = [1, 1]).push.apply(
                      k,
                      s(x[1], e.languages.javascript, "javascript")
                    ),
                    x.splice.apply(x, k)),
                  (k = new e.Token("interpolation", x, r.alias, P)),
                  (x = $.substring(ee + D.length)),
                  (P = []),
                  T && P.push(T),
                  P.push(k),
                  x && (f(($ = [x])), P.push.apply(P, $)),
                  typeof R == "string"
                    ? (g.splice.apply(g, [_, 1].concat(P)), (_ += P.length - 1))
                    : (R.content = P)))
              : ((ee = R.content), Array.isArray(ee) ? f(ee) : f([ee]));
          }
        })(E),
        new e.Token(C, E, "language-" + C, c)
      );
    }
    e.languages.javascript["template-string"] = [
      a(
        "css",
        /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/
          .source
      ),
      a("html", /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),
      a("svg", /\bsvg/.source),
      a("markdown", /\b(?:markdown|md)/.source),
      a("graphql", /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),
      a("sql", /\bsql/.source),
      t,
    ].filter(Boolean);
    var u = {
      javascript: !0,
      js: !0,
      typescript: !0,
      ts: !0,
      jsx: !0,
      tsx: !0,
    };
    function d(c) {
      return typeof c == "string"
        ? c
        : Array.isArray(c)
        ? c.map(d).join("")
        : d(c.content);
    }
    e.hooks.add("after-tokenize", function (c) {
      c.language in u &&
        (function m(C) {
          for (var v = 0, p = C.length; v < p; v++) {
            var E,
              h,
              f,
              g = C[v];
            typeof g != "string" &&
              ((E = g.content),
              Array.isArray(E)
                ? g.type === "template-string"
                  ? ((g = E[1]),
                    E.length === 3 &&
                      typeof g != "string" &&
                      g.type === "embedded-code" &&
                      ((h = d(g)),
                      (g = g.alias),
                      (g = Array.isArray(g) ? g[0] : g),
                      (f = e.languages[g])) &&
                      (E[1] = l(h, f, g)))
                  : m(E)
                : typeof E != "string" && m([E]));
          }
        })(c.tokens);
    });
  })(N),
  (function (e) {
    (e.languages.typescript = e.languages.extend("javascript", {
      "class-name": {
        pattern:
          /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      builtin:
        /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
    })),
      e.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        /\btype\b(?=\s*(?:[\{*]|$))/
      ),
      delete e.languages.typescript.parameter,
      delete e.languages.typescript["literal-property"];
    var t = e.languages.extend("typescript", {});
    delete t["class-name"],
      (e.languages.typescript["class-name"].inside = t),
      e.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: { pattern: /^@/, alias: "operator" },
            function: /^[\s\S]+/,
          },
        },
        "generic-function": {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: {
            function:
              /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: t },
          },
        },
      }),
      (e.languages.ts = e.languages.typescript);
  })(N),
  (function (e) {
    var t = e.languages.javascript,
      n = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source,
      r = "(@(?:arg|argument|param|property)\\s+(?:" + n + "\\s+)?)";
    (e.languages.jsdoc = e.languages.extend("javadoclike", {
      parameter: {
        pattern: RegExp(r + /(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    })),
      e.languages.insertBefore("jsdoc", "keyword", {
        "optional-parameter": {
          pattern: RegExp(
            r + /\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source
          ),
          lookbehind: !0,
          inside: {
            parameter: {
              pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
              lookbehind: !0,
              inside: { punctuation: /\./ },
            },
            code: {
              pattern: /(=)[\s\S]*(?=\]$)/,
              lookbehind: !0,
              inside: t,
              alias: "language-javascript",
            },
            punctuation: /[=[\]]/,
          },
        },
        "class-name": [
          {
            pattern: RegExp(
              /(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(
                /<TYPE>/g,
                function () {
                  return n;
                }
              )
            ),
            lookbehind: !0,
            inside: { punctuation: /\./ },
          },
          {
            pattern: RegExp("(@[a-z]+\\s+)" + n),
            lookbehind: !0,
            inside: {
              string: t.string,
              number: t.number,
              boolean: t.boolean,
              keyword: e.languages.typescript.keyword,
              operator: /=>|\.\.\.|[&|?:*]/,
              punctuation: /[.,;=<>{}()[\]]/,
            },
          },
        ],
        example: {
          pattern:
            /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
          lookbehind: !0,
          inside: {
            code: {
              pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m,
              lookbehind: !0,
              inside: t,
              alias: "language-javascript",
            },
          },
        },
      }),
      e.languages.javadoclike.addSupport("javascript", e.languages.jsdoc);
  })(N),
  (function (e) {
    (e.languages.flow = e.languages.extend("javascript", {})),
      e.languages.insertBefore("flow", "keyword", {
        type: [
          {
            pattern:
              /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/,
            alias: "class-name",
          },
        ],
      }),
      (e.languages.flow["function-variable"].pattern =
        /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/i),
      delete e.languages.flow.parameter,
      e.languages.insertBefore("flow", "operator", {
        "flow-punctuation": { pattern: /\{\||\|\}/, alias: "punctuation" },
      }),
      Array.isArray(e.languages.flow.keyword) ||
        (e.languages.flow.keyword = [e.languages.flow.keyword]),
      e.languages.flow.keyword.unshift(
        {
          pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,
          lookbehind: !0,
        },
        {
          pattern:
            /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,
          lookbehind: !0,
        }
      );
  })(N),
  (N.languages.n4js = N.languages.extend("javascript", {
    keyword:
      /\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
  })),
  N.languages.insertBefore("n4js", "constant", {
    annotation: { pattern: /@+\w+/, alias: "operator" },
  }),
  (N.languages.n4jsd = N.languages.n4js),
  (function (e) {
    function t(a, s) {
      return RegExp(
        a.replace(/<ID>/g, function () {
          return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/
            .source;
        }),
        s
      );
    }
    e.languages.insertBefore("javascript", "function-variable", {
      "method-variable": {
        pattern: RegExp(
          "(\\.\\s*)" +
            e.languages.javascript["function-variable"].pattern.source
        ),
        lookbehind: !0,
        alias: ["function-variable", "method", "function", "property-access"],
      },
    }),
      e.languages.insertBefore("javascript", "function", {
        method: {
          pattern: RegExp("(\\.\\s*)" + e.languages.javascript.function.source),
          lookbehind: !0,
          alias: ["function", "property-access"],
        },
      }),
      e.languages.insertBefore("javascript", "constant", {
        "known-class-name": [
          {
            pattern:
              /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
            alias: "class-name",
          },
          { pattern: /\b(?:[A-Z]\w*)Error\b/, alias: "class-name" },
        ],
      }),
      e.languages.insertBefore("javascript", "keyword", {
        imports: {
          pattern: t(
            /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/
              .source
          ),
          lookbehind: !0,
          inside: e.languages.javascript,
        },
        exports: {
          pattern: t(
            /(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/
              .source
          ),
          lookbehind: !0,
          inside: e.languages.javascript,
        },
      }),
      e.languages.javascript.keyword.unshift(
        { pattern: /\b(?:as|default|export|from|import)\b/, alias: "module" },
        {
          pattern:
            /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
          alias: "control-flow",
        },
        { pattern: /\bnull\b/, alias: ["null", "nil"] },
        { pattern: /\bundefined\b/, alias: "nil" }
      ),
      e.languages.insertBefore("javascript", "operator", {
        spread: { pattern: /\.{3}/, alias: "operator" },
        arrow: { pattern: /=>/, alias: "operator" },
      }),
      e.languages.insertBefore("javascript", "punctuation", {
        "property-access": {
          pattern: t(/(\.\s*)#?<ID>/.source),
          lookbehind: !0,
        },
        "maybe-class-name": {
          pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
          lookbehind: !0,
        },
        dom: {
          pattern:
            /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
          alias: "variable",
        },
        console: { pattern: /\bconsole(?=\s*\.)/, alias: "class-name" },
      });
    for (
      var n = [
          "function",
          "function-variable",
          "method",
          "method-variable",
          "property-access",
        ],
        r = 0;
      r < n.length;
      r++
    ) {
      var i = n[r],
        o = e.languages.javascript[i],
        i =
          (o =
            e.util.type(o) === "RegExp"
              ? (e.languages.javascript[i] = { pattern: o })
              : o).inside || {};
      (o.inside = i)["maybe-class-name"] = /^[A-Z][\s\S]*/;
    }
  })(N),
  (function (e) {
    var t = e.util.clone(e.languages.javascript),
      n = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,
      r = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,
      o = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
    function i(l, u) {
      return (
        (l = l
          .replace(/<S>/g, function () {
            return n;
          })
          .replace(/<BRACES>/g, function () {
            return r;
          })
          .replace(/<SPREAD>/g, function () {
            return o;
          })),
        RegExp(l, u)
      );
    }
    (o = i(o).source),
      (e.languages.jsx = e.languages.extend("markup", t)),
      (e.languages.jsx.tag.pattern = i(
        /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/
          .source
      )),
      (e.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
      (e.languages.jsx.tag.inside["attr-value"].pattern =
        /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
      (e.languages.jsx.tag.inside.tag.inside["class-name"] =
        /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
      (e.languages.jsx.tag.inside.comment = t.comment),
      e.languages.insertBefore(
        "inside",
        "attr-name",
        { spread: { pattern: i(/<SPREAD>/.source), inside: e.languages.jsx } },
        e.languages.jsx.tag
      ),
      e.languages.insertBefore(
        "inside",
        "special-attr",
        {
          script: {
            pattern: i(/=<BRACES>/.source),
            alias: "language-javascript",
            inside: {
              "script-punctuation": {
                pattern: /^=(?=\{)/,
                alias: "punctuation",
              },
              rest: e.languages.jsx,
            },
          },
        },
        e.languages.jsx.tag
      );
    function a(l) {
      for (var u = [], d = 0; d < l.length; d++) {
        var c = l[d],
          m = !1;
        typeof c != "string" &&
          (c.type === "tag" && c.content[0] && c.content[0].type === "tag"
            ? c.content[0].content[0].content === "</"
              ? 0 < u.length &&
                u[u.length - 1].tagName === s(c.content[0].content[1]) &&
                u.pop()
              : c.content[c.content.length - 1].content !== "/>" &&
                u.push({ tagName: s(c.content[0].content[1]), openedBraces: 0 })
            : 0 < u.length && c.type === "punctuation" && c.content === "{"
            ? u[u.length - 1].openedBraces++
            : 0 < u.length &&
              0 < u[u.length - 1].openedBraces &&
              c.type === "punctuation" &&
              c.content === "}"
            ? u[u.length - 1].openedBraces--
            : (m = !0)),
          (m || typeof c == "string") &&
            0 < u.length &&
            u[u.length - 1].openedBraces === 0 &&
            ((m = s(c)),
            d < l.length - 1 &&
              (typeof l[d + 1] == "string" || l[d + 1].type === "plain-text") &&
              ((m += s(l[d + 1])), l.splice(d + 1, 1)),
            0 < d &&
              (typeof l[d - 1] == "string" || l[d - 1].type === "plain-text") &&
              ((m = s(l[d - 1]) + m), l.splice(d - 1, 1), d--),
            (l[d] = new e.Token("plain-text", m, null, m))),
          c.content && typeof c.content != "string" && a(c.content);
      }
    }
    var s = function (l) {
      return l
        ? typeof l == "string"
          ? l
          : typeof l.content == "string"
          ? l.content
          : l.content.map(s).join("")
        : "";
    };
    e.hooks.add("after-tokenize", function (l) {
      (l.language !== "jsx" && l.language !== "tsx") || a(l.tokens);
    });
  })(N),
  (function (e) {
    var t = e.util.clone(e.languages.typescript),
      t =
        ((e.languages.tsx = e.languages.extend("jsx", t)),
        delete e.languages.tsx.parameter,
        delete e.languages.tsx["literal-property"],
        e.languages.tsx.tag);
    (t.pattern = RegExp(
      /(^|[^\w$]|(?=<\/))/.source + "(?:" + t.pattern.source + ")",
      t.pattern.flags
    )),
      (t.lookbehind = !0);
  })(N),
  (N.languages.swift = {
    comment: {
      pattern:
        /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
      lookbehind: !0,
      greedy: !0,
    },
    "string-literal": [
      {
        pattern: RegExp(
          /(^|[^"#])/.source +
            "(?:" +
            /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/
              .source +
            "|" +
            /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/
              .source +
            ")" +
            /(?!["#])/.source
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          interpolation: {
            pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
            lookbehind: !0,
            inside: null,
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\\($/,
            alias: "punctuation",
          },
          punctuation: /\\(?=[\r\n])/,
          string: /[\s\S]+/,
        },
      },
      {
        pattern: RegExp(
          /(^|[^"#])(#+)/.source +
            "(?:" +
            /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/
              .source +
            "|" +
            /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source +
            ")\\2"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          interpolation: {
            pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
            lookbehind: !0,
            inside: null,
          },
          "interpolation-punctuation": {
            pattern: /^\)|\\#+\($/,
            alias: "punctuation",
          },
          string: /[\s\S]+/,
        },
      },
    ],
    directive: {
      pattern: RegExp(
        /#/.source +
          "(?:" +
          /(?:elseif|if)\b/.source +
          "(?:[ 	]*" +
          /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/
            .source +
          ")+|" +
          /(?:else|endif)\b/.source +
          ")"
      ),
      alias: "property",
      inside: {
        "directive-name": /^#\w+/,
        boolean: /\b(?:false|true)\b/,
        number: /\b\d+(?:\.\d+)*\b/,
        operator: /!|&&|\|\||[<>]=?/,
        punctuation: /[(),]/,
      },
    },
    literal: {
      pattern:
        /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
      alias: "constant",
    },
    "other-directive": { pattern: /#\w+\b/, alias: "property" },
    attribute: { pattern: /@\w+/, alias: "atrule" },
    "function-definition": {
      pattern: /(\bfunc\s+)\w+/,
      lookbehind: !0,
      alias: "function",
    },
    label: {
      pattern:
        /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
      lookbehind: !0,
      alias: "important",
    },
    keyword:
      /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
    boolean: /\b(?:false|true)\b/,
    nil: { pattern: /\bnil\b/, alias: "constant" },
    "short-argument": /\$\d+\b/,
    omit: { pattern: /\b_\b/, alias: "keyword" },
    number:
      /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
    punctuation: /[{}[\]();,.:\\]/,
  }),
  N.languages.swift["string-literal"].forEach(function (e) {
    e.inside.interpolation.inside = N.languages.swift;
  }),
  (function (e) {
    (e.languages.kotlin = e.languages.extend("clike", {
      keyword: {
        pattern:
          /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: !0,
      },
      function: [
        { pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/, greedy: !0 },
        {
          pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
          lookbehind: !0,
          greedy: !0,
        },
      ],
      number:
        /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
      operator:
        /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
    })),
      delete e.languages.kotlin["class-name"];
    var t = {
      "interpolation-punctuation": {
        pattern: /^\$\{?|\}$/,
        alias: "punctuation",
      },
      expression: { pattern: /[\s\S]+/, inside: e.languages.kotlin },
    };
    e.languages.insertBefore("kotlin", "string", {
      "string-literal": [
        {
          pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
          alias: "multiline",
          inside: {
            interpolation: {
              pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
              inside: t,
            },
            string: /[\s\S]+/,
          },
        },
        {
          pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
          alias: "singleline",
          inside: {
            interpolation: {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
              lookbehind: !0,
              inside: t,
            },
            string: /[\s\S]+/,
          },
        },
      ],
      char: {
        pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
        greedy: !0,
      },
    }),
      delete e.languages.kotlin.string,
      e.languages.insertBefore("kotlin", "keyword", {
        annotation: {
          pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
          alias: "builtin",
        },
      }),
      e.languages.insertBefore("kotlin", "function", {
        label: { pattern: /\b\w+@|@\w+\b/, alias: "symbol" },
      }),
      (e.languages.kt = e.languages.kotlin),
      (e.languages.kts = e.languages.kotlin);
  })(N),
  (N.languages.c = N.languages.extend("clike", {
    comment: {
      pattern:
        /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
      greedy: !0,
    },
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    "class-name": {
      pattern:
        /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
      lookbehind: !0,
    },
    keyword:
      /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
    function: /\b[a-z_]\w*(?=\s*\()/i,
    number:
      /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
  })),
  N.languages.insertBefore("c", "string", {
    char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 },
  }),
  N.languages.insertBefore("c", "string", {
    macro: {
      pattern:
        /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          N.languages.c.string,
        ],
        char: N.languages.c.char,
        comment: N.languages.c.comment,
        "macro-name": [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: !0,
            alias: "function",
          },
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: "keyword",
        },
        "directive-hash": /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: N.languages.c },
      },
    },
  }),
  N.languages.insertBefore("c", "function", {
    constant:
      /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/,
  }),
  delete N.languages.c.boolean,
  (N.languages.objectivec = N.languages.extend("c", {
    string: { pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    keyword:
      /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
  })),
  delete N.languages.objectivec["class-name"],
  (N.languages.objc = N.languages.objectivec),
  (N.languages.reason = N.languages.extend("clike", {
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
    "class-name": /\b[A-Z]\w*/,
    keyword:
      /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
    operator:
      /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:asr|land|lor|lsl|lsr|lxor|mod)\b/,
  })),
  N.languages.insertBefore("reason", "class-name", {
    char: {
      pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
      greedy: !0,
    },
    constructor: /\b[A-Z]\w*\b(?!\s*\.)/,
    label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" },
  }),
  delete N.languages.reason.function,
  (function (e) {
    for (
      var t = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source, n = 0;
      n < 2;
      n++
    )
      t = t.replace(/<self>/g, function () {
        return t;
      });
    (t = t.replace(/<self>/g, function () {
      return /[^\s\S]/.source;
    })),
      (e.languages.rust = {
        comment: [
          {
            pattern: RegExp(/(^|[^\\])/.source + t),
            lookbehind: !0,
            greedy: !0,
          },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
        ],
        string: {
          pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
          greedy: !0,
        },
        char: {
          pattern:
            /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
          greedy: !0,
        },
        attribute: {
          pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
          greedy: !0,
          alias: "attr-name",
          inside: { string: null },
        },
        "closure-params": {
          pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            "closure-punctuation": { pattern: /^\||\|$/, alias: "punctuation" },
            rest: null,
          },
        },
        "lifetime-annotation": { pattern: /'\w+/, alias: "symbol" },
        "fragment-specifier": {
          pattern: /(\$\w+:)[a-z]+/,
          lookbehind: !0,
          alias: "punctuation",
        },
        variable: /\$\w+/,
        "function-definition": {
          pattern: /(\bfn\s+)\w+/,
          lookbehind: !0,
          alias: "function",
        },
        "type-definition": {
          pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
          lookbehind: !0,
          alias: "class-name",
        },
        "module-declaration": [
          {
            pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
            lookbehind: !0,
            alias: "namespace",
          },
          {
            pattern:
              /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
            lookbehind: !0,
            alias: "namespace",
            inside: { punctuation: /::/ },
          },
        ],
        keyword: [
          /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
          /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/,
        ],
        function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
        macro: { pattern: /\b\w+!/, alias: "property" },
        constant: /\b[A-Z_][A-Z_\d]+\b/,
        "class-name": /\b[A-Z]\w*\b/,
        namespace: {
          pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
          inside: { punctuation: /::/ },
        },
        number:
          /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
        boolean: /\b(?:false|true)\b/,
        punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
        operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
      }),
      (e.languages.rust["closure-params"].inside.rest = e.languages.rust),
      (e.languages.rust.attribute.inside.string = e.languages.rust.string);
  })(N),
  (N.languages.go = N.languages.extend("clike", {
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
      lookbehind: !0,
      greedy: !0,
    },
    keyword:
      /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    boolean: /\b(?:_|false|iota|nil|true)\b/,
    number: [
      /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
      /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
      /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i,
    ],
    operator:
      /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    builtin:
      /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/,
  })),
  N.languages.insertBefore("go", "string", {
    char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 },
  }),
  delete N.languages.go["class-name"],
  (function (e) {
    var t =
        /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
      n = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(
        /<keyword>/g,
        function () {
          return t.source;
        }
      );
    (e.languages.cpp = e.languages.extend("c", {
      "class-name": [
        {
          pattern: RegExp(
            /(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(
              /<keyword>/g,
              function () {
                return t.source;
              }
            )
          ),
          lookbehind: !0,
        },
        /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
        /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
        /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
      ],
      keyword: t,
      number: {
        pattern:
          /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
        greedy: !0,
      },
      operator:
        />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
      boolean: /\b(?:false|true)\b/,
    })),
      e.languages.insertBefore("cpp", "string", {
        module: {
          pattern: RegExp(
            /(\b(?:import|module)\s+)/.source +
              "(?:" +
              /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source +
              "|" +
              /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(
                /<mod-name>/g,
                function () {
                  return n;
                }
              ) +
              ")"
          ),
          lookbehind: !0,
          greedy: !0,
          inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
        },
        "raw-string": {
          pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
          alias: "string",
          greedy: !0,
        },
      }),
      e.languages.insertBefore("cpp", "keyword", {
        "generic-function": {
          pattern:
            /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
          inside: {
            function: /^\w+/,
            generic: {
              pattern: /<[\s\S]+/,
              alias: "class-name",
              inside: e.languages.cpp,
            },
          },
        },
      }),
      e.languages.insertBefore("cpp", "operator", {
        "double-colon": { pattern: /::/, alias: "punctuation" },
      }),
      e.languages.insertBefore("cpp", "class-name", {
        "base-clause": {
          pattern:
            /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
          lookbehind: !0,
          greedy: !0,
          inside: e.languages.extend("cpp", {}),
        },
      }),
      e.languages.insertBefore(
        "inside",
        "double-colon",
        { "class-name": /\b[a-z_]\w*\b(?!\s*::)/i },
        e.languages.cpp["base-clause"]
      );
  })(N);
var Bt = {};
T1(Bt, {
  dracula: () => L1,
  duotoneDark: () => $1,
  duotoneLight: () => z1,
  github: () => U1,
  jettwaveDark: () => uw,
  jettwaveLight: () => dw,
  nightOwl: () => H1,
  nightOwlLight: () => G1,
  oceanicNext: () => Z1,
  okaidia: () => X1,
  palenight: () => K1,
  shadesOfPurple: () => ew,
  synthwave84: () => nw,
  ultramin: () => ow,
  vsDark: () => ih,
  vsLight: () => lw,
});
var I1 = {
    plain: { color: "#F8F8F2", backgroundColor: "#282A36" },
    styles: [
      {
        types: ["prolog", "constant", "builtin"],
        style: { color: "rgb(189, 147, 249)" },
      },
      {
        types: ["inserted", "function"],
        style: { color: "rgb(80, 250, 123)" },
      },
      { types: ["deleted"], style: { color: "rgb(255, 85, 85)" } },
      { types: ["changed"], style: { color: "rgb(255, 184, 108)" } },
      {
        types: ["punctuation", "symbol"],
        style: { color: "rgb(248, 248, 242)" },
      },
      {
        types: ["string", "char", "tag", "selector"],
        style: { color: "rgb(255, 121, 198)" },
      },
      {
        types: ["keyword", "variable"],
        style: { color: "rgb(189, 147, 249)", fontStyle: "italic" },
      },
      { types: ["comment"], style: { color: "rgb(98, 114, 164)" } },
      { types: ["attr-name"], style: { color: "rgb(241, 250, 140)" } },
    ],
  },
  L1 = I1,
  P1 = {
    plain: { backgroundColor: "#2a2734", color: "#9a86fd" },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
        style: { color: "#6c6783" },
      },
      { types: ["namespace"], style: { opacity: 0.7 } },
      { types: ["tag", "operator", "number"], style: { color: "#e09142" } },
      { types: ["property", "function"], style: { color: "#9a86fd" } },
      {
        types: ["tag-id", "selector", "atrule-id"],
        style: { color: "#eeebff" },
      },
      { types: ["attr-name"], style: { color: "#c4b9fe" } },
      {
        types: [
          "boolean",
          "string",
          "entity",
          "url",
          "attr-value",
          "keyword",
          "control",
          "directive",
          "unit",
          "statement",
          "regex",
          "atrule",
          "placeholder",
          "variable",
        ],
        style: { color: "#ffcc99" },
      },
      { types: ["deleted"], style: { textDecorationLine: "line-through" } },
      { types: ["inserted"], style: { textDecorationLine: "underline" } },
      { types: ["italic"], style: { fontStyle: "italic" } },
      { types: ["important", "bold"], style: { fontWeight: "bold" } },
      { types: ["important"], style: { color: "#c4b9fe" } },
    ],
  },
  $1 = P1,
  M1 = {
    plain: { backgroundColor: "#faf8f5", color: "#728fcb" },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
        style: { color: "#b6ad9a" },
      },
      { types: ["namespace"], style: { opacity: 0.7 } },
      { types: ["tag", "operator", "number"], style: { color: "#063289" } },
      { types: ["property", "function"], style: { color: "#b29762" } },
      {
        types: ["tag-id", "selector", "atrule-id"],
        style: { color: "#2d2006" },
      },
      { types: ["attr-name"], style: { color: "#896724" } },
      {
        types: [
          "boolean",
          "string",
          "entity",
          "url",
          "attr-value",
          "keyword",
          "control",
          "directive",
          "unit",
          "statement",
          "regex",
          "atrule",
        ],
        style: { color: "#728fcb" },
      },
      { types: ["placeholder", "variable"], style: { color: "#93abdc" } },
      { types: ["deleted"], style: { textDecorationLine: "line-through" } },
      { types: ["inserted"], style: { textDecorationLine: "underline" } },
      { types: ["italic"], style: { fontStyle: "italic" } },
      { types: ["important", "bold"], style: { fontWeight: "bold" } },
      { types: ["important"], style: { color: "#896724" } },
    ],
  },
  z1 = M1,
  j1 = {
    plain: { color: "#393A34", backgroundColor: "#f6f8fa" },
    styles: [
      {
        types: ["comment", "prolog", "doctype", "cdata"],
        style: { color: "#999988", fontStyle: "italic" },
      },
      { types: ["namespace"], style: { opacity: 0.7 } },
      { types: ["string", "attr-value"], style: { color: "#e3116c" } },
      { types: ["punctuation", "operator"], style: { color: "#393A34" } },
      {
        types: [
          "entity",
          "url",
          "symbol",
          "number",
          "boolean",
          "variable",
          "constant",
          "property",
          "regex",
          "inserted",
        ],
        style: { color: "#36acaa" },
      },
      {
        types: ["atrule", "keyword", "attr-name", "selector"],
        style: { color: "#00a4db" },
      },
      { types: ["function", "deleted", "tag"], style: { color: "#d73a49" } },
      { types: ["function-variable"], style: { color: "#6f42c1" } },
      { types: ["tag", "selector", "keyword"], style: { color: "#00009f" } },
    ],
  },
  U1 = j1,
  V1 = {
    plain: { color: "#d6deeb", backgroundColor: "#011627" },
    styles: [
      {
        types: ["changed"],
        style: { color: "rgb(162, 191, 252)", fontStyle: "italic" },
      },
      {
        types: ["deleted"],
        style: { color: "rgba(239, 83, 80, 0.56)", fontStyle: "italic" },
      },
      {
        types: ["inserted", "attr-name"],
        style: { color: "rgb(173, 219, 103)", fontStyle: "italic" },
      },
      {
        types: ["comment"],
        style: { color: "rgb(99, 119, 119)", fontStyle: "italic" },
      },
      { types: ["string", "url"], style: { color: "rgb(173, 219, 103)" } },
      { types: ["variable"], style: { color: "rgb(214, 222, 235)" } },
      { types: ["number"], style: { color: "rgb(247, 140, 108)" } },
      {
        types: ["builtin", "char", "constant", "function"],
        style: { color: "rgb(130, 170, 255)" },
      },
      { types: ["punctuation"], style: { color: "rgb(199, 146, 234)" } },
      {
        types: ["selector", "doctype"],
        style: { color: "rgb(199, 146, 234)", fontStyle: "italic" },
      },
      { types: ["class-name"], style: { color: "rgb(255, 203, 139)" } },
      {
        types: ["tag", "operator", "keyword"],
        style: { color: "rgb(127, 219, 202)" },
      },
      { types: ["boolean"], style: { color: "rgb(255, 88, 116)" } },
      { types: ["property"], style: { color: "rgb(128, 203, 196)" } },
      { types: ["namespace"], style: { color: "rgb(178, 204, 214)" } },
    ],
  },
  H1 = V1,
  W1 = {
    plain: { color: "#403f53", backgroundColor: "#FBFBFB" },
    styles: [
      {
        types: ["changed"],
        style: { color: "rgb(162, 191, 252)", fontStyle: "italic" },
      },
      {
        types: ["deleted"],
        style: { color: "rgba(239, 83, 80, 0.56)", fontStyle: "italic" },
      },
      {
        types: ["inserted", "attr-name"],
        style: { color: "rgb(72, 118, 214)", fontStyle: "italic" },
      },
      {
        types: ["comment"],
        style: { color: "rgb(152, 159, 177)", fontStyle: "italic" },
      },
      {
        types: ["string", "builtin", "char", "constant", "url"],
        style: { color: "rgb(72, 118, 214)" },
      },
      { types: ["variable"], style: { color: "rgb(201, 103, 101)" } },
      { types: ["number"], style: { color: "rgb(170, 9, 130)" } },
      { types: ["punctuation"], style: { color: "rgb(153, 76, 195)" } },
      {
        types: ["function", "selector", "doctype"],
        style: { color: "rgb(153, 76, 195)", fontStyle: "italic" },
      },
      { types: ["class-name"], style: { color: "rgb(17, 17, 17)" } },
      { types: ["tag"], style: { color: "rgb(153, 76, 195)" } },
      {
        types: ["operator", "property", "keyword", "namespace"],
        style: { color: "rgb(12, 150, 155)" },
      },
      { types: ["boolean"], style: { color: "rgb(188, 84, 84)" } },
    ],
  },
  G1 = W1,
  Xe = {
    char: "#D8DEE9",
    comment: "#999999",
    keyword: "#c5a5c5",
    primitive: "#5a9bcf",
    string: "#8dc891",
    variable: "#d7deea",
    boolean: "#ff8b50",
    punctuation: "#5FB3B3",
    tag: "#fc929e",
    function: "#79b6f2",
    className: "#FAC863",
    method: "#6699CC",
    operator: "#fc929e",
  },
  Y1 = {
    plain: { backgroundColor: "#282c34", color: "#ffffff" },
    styles: [
      { types: ["attr-name"], style: { color: Xe.keyword } },
      { types: ["attr-value"], style: { color: Xe.string } },
      {
        types: [
          "comment",
          "block-comment",
          "prolog",
          "doctype",
          "cdata",
          "shebang",
        ],
        style: { color: Xe.comment },
      },
      {
        types: [
          "property",
          "number",
          "function-name",
          "constant",
          "symbol",
          "deleted",
        ],
        style: { color: Xe.primitive },
      },
      { types: ["boolean"], style: { color: Xe.boolean } },
      { types: ["tag"], style: { color: Xe.tag } },
      { types: ["string"], style: { color: Xe.string } },
      { types: ["punctuation"], style: { color: Xe.string } },
      {
        types: ["selector", "char", "builtin", "inserted"],
        style: { color: Xe.char },
      },
      { types: ["function"], style: { color: Xe.function } },
      {
        types: ["operator", "entity", "url", "variable"],
        style: { color: Xe.variable },
      },
      { types: ["keyword"], style: { color: Xe.keyword } },
      { types: ["atrule", "class-name"], style: { color: Xe.className } },
      { types: ["important"], style: { fontWeight: "400" } },
      { types: ["bold"], style: { fontWeight: "bold" } },
      { types: ["italic"], style: { fontStyle: "italic" } },
      { types: ["namespace"], style: { opacity: 0.7 } },
    ],
  },
  Z1 = Y1,
  Q1 = {
    plain: { color: "#f8f8f2", backgroundColor: "#272822" },
    styles: [
      {
        types: ["changed"],
        style: { color: "rgb(162, 191, 252)", fontStyle: "italic" },
      },
      { types: ["deleted"], style: { color: "#f92672", fontStyle: "italic" } },
      {
        types: ["inserted"],
        style: { color: "rgb(173, 219, 103)", fontStyle: "italic" },
      },
      { types: ["comment"], style: { color: "#8292a2", fontStyle: "italic" } },
      { types: ["string", "url"], style: { color: "#a6e22e" } },
      { types: ["variable"], style: { color: "#f8f8f2" } },
      { types: ["number"], style: { color: "#ae81ff" } },
      {
        types: ["builtin", "char", "constant", "function", "class-name"],
        style: { color: "#e6db74" },
      },
      { types: ["punctuation"], style: { color: "#f8f8f2" } },
      {
        types: ["selector", "doctype"],
        style: { color: "#a6e22e", fontStyle: "italic" },
      },
      { types: ["tag", "operator", "keyword"], style: { color: "#66d9ef" } },
      { types: ["boolean"], style: { color: "#ae81ff" } },
      {
        types: ["namespace"],
        style: { color: "rgb(178, 204, 214)", opacity: 0.7 },
      },
      { types: ["tag", "property"], style: { color: "#f92672" } },
      { types: ["attr-name"], style: { color: "#a6e22e !important" } },
      { types: ["doctype"], style: { color: "#8292a2" } },
      { types: ["rule"], style: { color: "#e6db74" } },
    ],
  },
  X1 = Q1,
  q1 = {
    plain: { color: "#bfc7d5", backgroundColor: "#292d3e" },
    styles: [
      {
        types: ["comment"],
        style: { color: "rgb(105, 112, 152)", fontStyle: "italic" },
      },
      { types: ["string", "inserted"], style: { color: "rgb(195, 232, 141)" } },
      { types: ["number"], style: { color: "rgb(247, 140, 108)" } },
      {
        types: ["builtin", "char", "constant", "function"],
        style: { color: "rgb(130, 170, 255)" },
      },
      {
        types: ["punctuation", "selector"],
        style: { color: "rgb(199, 146, 234)" },
      },
      { types: ["variable"], style: { color: "rgb(191, 199, 213)" } },
      {
        types: ["class-name", "attr-name"],
        style: { color: "rgb(255, 203, 107)" },
      },
      { types: ["tag", "deleted"], style: { color: "rgb(255, 85, 114)" } },
      { types: ["operator"], style: { color: "rgb(137, 221, 255)" } },
      { types: ["boolean"], style: { color: "rgb(255, 88, 116)" } },
      { types: ["keyword"], style: { fontStyle: "italic" } },
      {
        types: ["doctype"],
        style: { color: "rgb(199, 146, 234)", fontStyle: "italic" },
      },
      { types: ["namespace"], style: { color: "rgb(178, 204, 214)" } },
      { types: ["url"], style: { color: "rgb(221, 221, 221)" } },
    ],
  },
  K1 = q1,
  J1 = {
    plain: { color: "#9EFEFF", backgroundColor: "#2D2A55" },
    styles: [
      { types: ["changed"], style: { color: "rgb(255, 238, 128)" } },
      { types: ["deleted"], style: { color: "rgba(239, 83, 80, 0.56)" } },
      { types: ["inserted"], style: { color: "rgb(173, 219, 103)" } },
      {
        types: ["comment"],
        style: { color: "rgb(179, 98, 255)", fontStyle: "italic" },
      },
      { types: ["punctuation"], style: { color: "rgb(255, 255, 255)" } },
      { types: ["constant"], style: { color: "rgb(255, 98, 140)" } },
      { types: ["string", "url"], style: { color: "rgb(165, 255, 144)" } },
      { types: ["variable"], style: { color: "rgb(255, 238, 128)" } },
      { types: ["number", "boolean"], style: { color: "rgb(255, 98, 140)" } },
      { types: ["attr-name"], style: { color: "rgb(255, 180, 84)" } },
      {
        types: [
          "keyword",
          "operator",
          "property",
          "namespace",
          "tag",
          "selector",
          "doctype",
        ],
        style: { color: "rgb(255, 157, 0)" },
      },
      {
        types: ["builtin", "char", "constant", "function", "class-name"],
        style: { color: "rgb(250, 208, 0)" },
      },
    ],
  },
  ew = J1,
  tw = {
    plain: {
      backgroundColor: "linear-gradient(to bottom, #2a2139 75%, #34294f)",
      backgroundImage: "#34294f",
      color: "#f92aad",
      textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
    },
    styles: [
      {
        types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
        style: { color: "#495495", fontStyle: "italic" },
      },
      { types: ["punctuation"], style: { color: "#ccc" } },
      {
        types: [
          "tag",
          "attr-name",
          "namespace",
          "number",
          "unit",
          "hexcode",
          "deleted",
        ],
        style: { color: "#e2777a" },
      },
      {
        types: ["property", "selector"],
        style: {
          color: "#72f1b8",
          textShadow: "0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475",
        },
      },
      { types: ["function-name"], style: { color: "#6196cc" } },
      {
        types: ["boolean", "selector-id", "function"],
        style: {
          color: "#fdfdfd",
          textShadow:
            "0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975",
        },
      },
      {
        types: ["class-name", "maybe-class-name", "builtin"],
        style: {
          color: "#fff5f6",
          textShadow:
            "0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75",
        },
      },
      {
        types: ["constant", "symbol"],
        style: {
          color: "#f92aad",
          textShadow: "0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3",
        },
      },
      {
        types: ["important", "atrule", "keyword", "selector-class"],
        style: {
          color: "#f4eee4",
          textShadow: "0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575",
        },
      },
      {
        types: ["string", "char", "attr-value", "regex", "variable"],
        style: { color: "#f87c32" },
      },
      { types: ["parameter"], style: { fontStyle: "italic" } },
      { types: ["entity", "url"], style: { color: "#67cdcc" } },
      { types: ["operator"], style: { color: "ffffffee" } },
      { types: ["important", "bold"], style: { fontWeight: "bold" } },
      { types: ["italic"], style: { fontStyle: "italic" } },
      { types: ["entity"], style: { cursor: "help" } },
      { types: ["inserted"], style: { color: "green" } },
    ],
  },
  nw = tw,
  rw = {
    plain: { color: "#282a2e", backgroundColor: "#ffffff" },
    styles: [
      { types: ["comment"], style: { color: "rgb(197, 200, 198)" } },
      {
        types: ["string", "number", "builtin", "variable"],
        style: { color: "rgb(150, 152, 150)" },
      },
      {
        types: ["class-name", "function", "tag", "attr-name"],
        style: { color: "rgb(40, 42, 46)" },
      },
    ],
  },
  ow = rw,
  iw = {
    plain: { color: "#9CDCFE", backgroundColor: "#1E1E1E" },
    styles: [
      { types: ["prolog"], style: { color: "rgb(0, 0, 128)" } },
      { types: ["comment"], style: { color: "rgb(106, 153, 85)" } },
      {
        types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
        style: { color: "rgb(86, 156, 214)" },
      },
      { types: ["number", "inserted"], style: { color: "rgb(181, 206, 168)" } },
      { types: ["constant"], style: { color: "rgb(100, 102, 149)" } },
      {
        types: ["attr-name", "variable"],
        style: { color: "rgb(156, 220, 254)" },
      },
      {
        types: ["deleted", "string", "attr-value", "template-punctuation"],
        style: { color: "rgb(206, 145, 120)" },
      },
      { types: ["selector"], style: { color: "rgb(215, 186, 125)" } },
      { types: ["tag"], style: { color: "rgb(78, 201, 176)" } },
      {
        types: ["tag"],
        languages: ["markup"],
        style: { color: "rgb(86, 156, 214)" },
      },
      {
        types: ["punctuation", "operator"],
        style: { color: "rgb(212, 212, 212)" },
      },
      {
        types: ["punctuation"],
        languages: ["markup"],
        style: { color: "#808080" },
      },
      { types: ["function"], style: { color: "rgb(220, 220, 170)" } },
      { types: ["class-name"], style: { color: "rgb(78, 201, 176)" } },
      { types: ["char"], style: { color: "rgb(209, 105, 105)" } },
    ],
  },
  ih = iw,
  aw = {
    plain: { color: "#000000", backgroundColor: "#ffffff" },
    styles: [
      { types: ["comment"], style: { color: "rgb(0, 128, 0)" } },
      { types: ["builtin"], style: { color: "rgb(0, 112, 193)" } },
      {
        types: ["number", "variable", "inserted"],
        style: { color: "rgb(9, 134, 88)" },
      },
      { types: ["operator"], style: { color: "rgb(0, 0, 0)" } },
      { types: ["constant", "char"], style: { color: "rgb(129, 31, 63)" } },
      { types: ["tag"], style: { color: "rgb(128, 0, 0)" } },
      { types: ["attr-name"], style: { color: "rgb(255, 0, 0)" } },
      { types: ["deleted", "string"], style: { color: "rgb(163, 21, 21)" } },
      {
        types: ["changed", "punctuation"],
        style: { color: "rgb(4, 81, 165)" },
      },
      { types: ["function", "keyword"], style: { color: "rgb(0, 0, 255)" } },
      { types: ["class-name"], style: { color: "rgb(38, 127, 153)" } },
    ],
  },
  lw = aw,
  sw = {
    plain: { color: "#f8fafc", backgroundColor: "#011627" },
    styles: [
      { types: ["prolog"], style: { color: "#000080" } },
      { types: ["comment"], style: { color: "#6A9955" } },
      {
        types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
        style: { color: "#569CD6" },
      },
      { types: ["number", "inserted"], style: { color: "#B5CEA8" } },
      { types: ["constant"], style: { color: "#f8fafc" } },
      { types: ["attr-name", "variable"], style: { color: "#9CDCFE" } },
      {
        types: ["deleted", "string", "attr-value", "template-punctuation"],
        style: { color: "#cbd5e1" },
      },
      { types: ["selector"], style: { color: "#D7BA7D" } },
      { types: ["tag"], style: { color: "#0ea5e9" } },
      { types: ["tag"], languages: ["markup"], style: { color: "#0ea5e9" } },
      { types: ["punctuation", "operator"], style: { color: "#D4D4D4" } },
      {
        types: ["punctuation"],
        languages: ["markup"],
        style: { color: "#808080" },
      },
      { types: ["function"], style: { color: "#7dd3fc" } },
      { types: ["class-name"], style: { color: "#0ea5e9" } },
      { types: ["char"], style: { color: "#D16969" } },
    ],
  },
  uw = sw,
  cw = {
    plain: { color: "#0f172a", backgroundColor: "#f1f5f9" },
    styles: [
      { types: ["prolog"], style: { color: "#000080" } },
      { types: ["comment"], style: { color: "#6A9955" } },
      {
        types: ["builtin", "changed", "keyword", "interpolation-punctuation"],
        style: { color: "#0c4a6e" },
      },
      { types: ["number", "inserted"], style: { color: "#B5CEA8" } },
      { types: ["constant"], style: { color: "#0f172a" } },
      { types: ["attr-name", "variable"], style: { color: "#0c4a6e" } },
      {
        types: ["deleted", "string", "attr-value", "template-punctuation"],
        style: { color: "#64748b" },
      },
      { types: ["selector"], style: { color: "#D7BA7D" } },
      { types: ["tag"], style: { color: "#0ea5e9" } },
      { types: ["tag"], languages: ["markup"], style: { color: "#0ea5e9" } },
      { types: ["punctuation", "operator"], style: { color: "#475569" } },
      {
        types: ["punctuation"],
        languages: ["markup"],
        style: { color: "#808080" },
      },
      { types: ["function"], style: { color: "#0e7490" } },
      { types: ["class-name"], style: { color: "#0ea5e9" } },
      { types: ["char"], style: { color: "#D16969" } },
    ],
  },
  dw = cw,
  fw = (e, t) => {
    const { plain: n } = e,
      r = e.styles.reduce((o, i) => {
        const { languages: a, style: s } = i;
        return (
          (a && !a.includes(t)) ||
            i.types.forEach((l) => {
              const u = Ot(Ot({}, o[l]), s);
              o[l] = u;
            }),
          o
        );
      }, {});
    return (
      (r.root = n), (r.plain = Na(Ot({}, n), { backgroundColor: void 0 })), r
    );
  },
  i2 = fw,
  pw = (e, t) => {
    const [n, r] = w.useState(i2(t, e)),
      o = w.useRef(),
      i = w.useRef();
    return (
      w.useEffect(() => {
        (t !== o.current || e !== i.current) &&
          ((o.current = t), (i.current = e), r(i2(t, e)));
      }, [e, t]),
      n
    );
  },
  hw = (e) =>
    w.useCallback(
      (t) => {
        var n = t,
          { className: r, style: o, line: i } = n,
          a = oh(n, ["className", "style", "line"]);
        const s = Na(Ot({}, a), { className: th("token-line", r) });
        return (
          typeof e == "object" && "plain" in e && (s.style = e.plain),
          typeof o == "object" && (s.style = Ot(Ot({}, s.style || {}), o)),
          s
        );
      },
      [e]
    ),
  mw = (e) => {
    const t = w.useCallback(
      ({ types: n, empty: r }) => {
        if (e != null) {
          {
            if (n.length === 1 && n[0] === "plain")
              return r != null ? { display: "inline-block" } : void 0;
            if (n.length === 1 && r != null) return e[n[0]];
          }
          return Object.assign(
            r != null ? { display: "inline-block" } : {},
            ...n.map((o) => e[o])
          );
        }
      },
      [e]
    );
    return w.useCallback(
      (n) => {
        var r = n,
          { token: o, className: i, style: a } = r,
          s = oh(r, ["token", "className", "style"]);
        const l = Na(Ot({}, s), {
          className: th("token", ...o.types, i),
          children: o.content,
          style: t(o),
        });
        return a != null && (l.style = Ot(Ot({}, l.style || {}), a)), l;
      },
      [t]
    );
  },
  gw = /\r\n|\r|\n/,
  a2 = (e) => {
    e.length === 0
      ? e.push({
          types: ["plain"],
          content: `
`,
          empty: !0,
        })
      : e.length === 1 &&
        e[0].content === "" &&
        ((e[0].content = `
`),
        (e[0].empty = !0));
  },
  l2 = (e, t) => {
    const n = e.length;
    return n > 0 && e[n - 1] === t ? e : e.concat(t);
  },
  yw = (e) => {
    const t = [[]],
      n = [e],
      r = [0],
      o = [e.length];
    let i = 0,
      a = 0,
      s = [];
    const l = [s];
    for (; a > -1; ) {
      for (; (i = r[a]++) < o[a]; ) {
        let u,
          d = t[a];
        const m = n[a][i];
        if (
          (typeof m == "string"
            ? ((d = a > 0 ? d : ["plain"]), (u = m))
            : ((d = l2(d, m.type)),
              m.alias && (d = l2(d, m.alias)),
              (u = m.content)),
          typeof u != "string")
        ) {
          a++, t.push(d), n.push(u), r.push(0), o.push(u.length);
          continue;
        }
        const C = u.split(gw),
          v = C.length;
        s.push({ types: d, content: C[0] });
        for (let p = 1; p < v; p++)
          a2(s), l.push((s = [])), s.push({ types: d, content: C[p] });
      }
      a--, t.pop(), n.pop(), r.pop(), o.pop();
    }
    return a2(s), l;
  },
  s2 = yw,
  vw = ({ prism: e, code: t, grammar: n, language: r }) => {
    const o = w.useRef(e);
    return w.useMemo(() => {
      if (n == null) return s2([t]);
      const i = { code: t, grammar: n, language: r, tokens: [] };
      return (
        o.current.hooks.run("before-tokenize", i),
        (i.tokens = o.current.tokenize(t, n)),
        o.current.hooks.run("after-tokenize", i),
        s2(i.tokens)
      );
    }, [t, n, r]);
  },
  Ew = ({ children: e, language: t, code: n, theme: r, prism: o }) => {
    const i = t.toLowerCase(),
      a = pw(i, r),
      s = hw(a),
      l = mw(a),
      u = o.languages[i],
      d = vw({ prism: o, language: i, code: n, grammar: u });
    return e({
      tokens: d,
      className: `prism-code language-${i}`,
      style: a != null ? a.root : {},
      getLineProps: s,
      getTokenProps: l,
    });
  },
  u2 = (e) =>
    w.createElement(
      Ew,
      Na(Ot({}, e), {
        prism: e.prism || N,
        theme: e.theme || ih,
        code: e.code,
        language: e.language,
      })
    );
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/ const Aw = (e) => {
    const t = Wt.parse(e).source;
    return t === "true"
      ? !0
      : t === "false"
      ? !1
      : H.addons.source.defaultState;
  },
  ah = ({
    children: e,
    theme: t,
    language: n = "tsx",
    locStart: r,
    locEnd: o,
    className: i,
  }) => {
    const a = typeof r < "u" && typeof o < "u",
      s = /language-(\w+)/.exec(i || "");
    return s
      ? ((n = s[1]),
        A(u2, {
          code: e.trim(),
          language: n,
          theme: {
            ...(t === "dark" ? Bt.nightOwl : Bt.github),
            plain: {
              ...(t === "dark" ? Bt.nightOwl : Bt.github).plain,
              backgroundColor: "var(--ladle-bg-color-secondary)",
            },
          },
          children: ({ className: l, style: u, tokens: d, getTokenProps: c }) =>
            A("div", {
              className: l,
              style: {
                ...u,
                textAlign: "left",
                margin: "0.5em 0 1em 0",
                padding: "1em",
              },
              children: d.map((m, C) =>
                A(
                  "div",
                  {
                    children: m.map((v, p) =>
                      A("span", { ...c({ token: v, key: p }) }, p)
                    ),
                  },
                  C
                )
              ),
            }),
        }))
      : a
      ? A(u2, {
          code: e.trim(),
          language: n,
          theme: {
            ...(t === "dark" ? Bt.nightOwl : Bt.github),
            plain: {
              ...(t === "dark" ? Bt.nightOwl : Bt.github).plain,
              backgroundColor: "var(--ladle-bg-color-secondary)",
            },
          },
          children: ({
            className: l,
            style: u,
            tokens: d,
            getLineProps: c,
            getTokenProps: m,
          }) =>
            A("pre", {
              className: l,
              style: {
                ...u,
                textAlign: "left",
                margin: "0.5em 0 1em 0",
                padding: "1em 0",
                overflow: "auto",
                maxHeight: "50vh",
              },
              children: d.map((C, v) =>
                z(
                  "div",
                  {
                    id: `ladle_loc_${v + 1}`,
                    ...c({ line: C, key: v }),
                    style: { display: "table-row" },
                    children: [
                      A("span", {
                        className: "ladle-addon-source-lineno",
                        style:
                          v + 1 >= r && v + 1 <= o
                            ? {
                                backgroundColor: "var(--ladle-color-accent)",
                                color: "#FFF",
                              }
                            : void 0,
                        children: v + 1,
                      }),
                      A("div", {
                        style: { display: "table-cell", paddingLeft: "0.5em" },
                        children: C.map((p, E) =>
                          A("span", { ...m({ token: p, key: E }) }, E)
                        ),
                      }),
                    ],
                  },
                  v
                )
              ),
            }),
        })
      : A("code", { children: e });
  },
  ww = ({ globalState: e }) => {
    if (!mn[e.story]) return A(io, { children: "There is no story loaded." });
    const { entry: t, locStart: n, locEnd: r } = mn[e.story];
    return (
      w.useEffect(() => {
        (window.location.hash = ""), (window.location.hash = `ladle_loc_${n}`);
      }, [n]),
      z(io, {
        children: [
          A(WA, { path: t, locStart: n, locEnd: r }),
          A(ah, {
            theme: e.theme,
            language: "tsx",
            locEnd: r,
            locStart: n,
            children: decodeURIComponent(ZA[e.story]),
          }),
        ],
      })
    );
  },
  Cw = ({ globalState: e, dispatch: t }) => {
    const n = "Show the story source code.";
    return (
      ct(
        H.hotkeys.source,
        () => {
          t({ type: re.UpdateSource, value: !e.source });
        },
        { enabled: e.hotkeys && H.addons.source.enabled }
      ),
      A("li", {
        children: z("button", {
          "aria-label": n,
          "data-testid": "addon-source",
          title: n,
          onClick: () => {
            t({ type: re.UpdateSource, value: !e.source });
          },
          className: e.source ? "source-active" : "",
          type: "button",
          children: [
            A(Zg, {}),
            A("span", { className: "ladle-addon-tooltip", children: n }),
            A("label", { children: "Story Source Code" }),
            A(Fr, {
              isOpen: e.source,
              close: () => t({ type: re.UpdateSource, value: !1 }),
              label: "Dialog with the story source code.",
              children: A(ww, { globalState: e }),
            }),
          ],
        }),
      })
    );
  },
  bw = (e) => e.altKey || e.ctrlKey || e.shiftKey || e.metaKey,
  lh = (e) => {
    const t = e.target || {};
    return !!(
      !e.key ||
      t.isContentEditable ||
      (["INPUT", "TEXTAREA"].includes(t.nodeName) && !bw(e))
    );
  },
  c2 = (e) => {
    if (lh(e)) return;
    const t = new KeyboardEvent("keydown", {
      key: e.key,
      code: e.code,
      keyCode: e.keyCode,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    });
    document.dispatchEvent(t);
  },
  d2 = (e) => {
    if (lh(e)) return;
    const t = new KeyboardEvent("keyup", {
      key: e.key,
      code: e.code,
      keyCode: e.keyCode,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
    });
    document.dispatchEvent(t);
  },
  _w = ({ children: e, active: t, width: n, story: r, mode: o }) =>
    (!t && n === 0) || o === ze.Preview
      ? e
      : A(E1, {
          title: `Story ${r}`,
          initialContent:
            '<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>',
          mountTarget: "#root",
          className: "ladle-iframe",
          style: { width: n || "100%" },
          children: e,
        }),
  Sw = ({ active: e, children: t, rtl: n, width: r }) => {
    const { window: o, document: i } = e0.useFrame(),
      a = () => {
        o &&
          (o.document.documentElement.setAttribute("dir", n ? "rtl" : "ltr"),
          [...document.head.children].forEach((s) => {
            (s.tagName === "STYLE" ||
              (s.tagName === "LINK" &&
                (s.getAttribute("type") === "text/css" ||
                  s.getAttribute("rel") === "stylesheet"))) &&
              o.document.head.appendChild(s.cloneNode(!0));
          }));
      };
    return (
      w.useEffect(() => {
        if (e) {
          a(),
            i == null || i.addEventListener("keydown", c2),
            i == null || i.addEventListener("keyup", d2);
          const s = new MutationObserver(() => a());
          return (
            document.documentElement.setAttribute("data-iframed", `${r}`),
            s.observe(document.head, {
              subtree: !0,
              characterData: !0,
              childList: !0,
            }),
            () => {
              s && s.disconnect(),
                i == null || i.removeEventListener("keydown", c2),
                i == null || i.removeEventListener("keyup", d2);
            }
          );
        }
      }, [e, n, i]),
      t
    );
  },
  f2 = ({ globalState: e, dispatch: t }) => {
    var l;
    const n = mn[e.story],
      r = e.width,
      o = (l = n == null ? void 0 : n.meta) == null ? void 0 : l.meta,
      i = o ? o.hotkeys : !0,
      a = n && o ? o.iframed : !1;
    let s = n && o ? o.width : 0;
    return (
      Object.keys(H.addons.width.options).forEach((u) => {
        u === s && (s = H.addons.width.options[u]);
      }),
      w.useEffect(() => {
        typeof i < "u" &&
          i !== e.hotkeys &&
          t({ type: re.UpdateHotkeys, value: i });
      }, [i]),
      w.useEffect(() => {
        if (s && s !== 0) {
          t({ type: re.UpdateWidth, value: s });
          return;
        }
        H.addons.width.defaultState !== 0 &&
          t({ type: re.UpdateWidth, value: H.addons.width.defaultState });
      }, [s, e.story]),
      w.useEffect(() => {
        e.mode !== ze.Preview && (a || r)
          ? document.documentElement.setAttribute("data-iframed", `${r}`)
          : document.documentElement.removeAttribute("data-iframed");
      }, [a, e.story, e.mode, e.width]),
      e.story
        ? A(b1, {
            children: A(w.Suspense, {
              fallback: A(Ug, {}),
              children: A(_w, {
                active: a,
                story: e.story,
                width: r,
                mode: e.mode,
                children: A(Sw, {
                  active: (a || r > 0) && e.mode !== ze.Preview,
                  rtl: e.rtl,
                  width: r,
                  children: A(C1, {
                    components: {
                      code: (u) => A(ah, { ...u, theme: e.theme }),
                    },
                    children: A(UE, {
                      config: H,
                      globalState: e,
                      dispatch: t,
                      storyMeta: o,
                      children: n
                        ? w.createElement(n.component)
                        : A(_1, { activeStory: e.story }),
                    }),
                  }),
                }),
              }),
            }),
          })
        : null
    );
  },
  kw = () =>
    z("div", {
      className: "ladle-error-content",
      children: [
        A("h1", { children: "No stories found" }),
        z("p", {
          children: [
            "The configured glob pattern for stories is: ",
            A(Pn, { children: ut.stories }),
            ".",
          ],
        }),
        z("p", {
          children: [
            "It can be changed through the",
            " ",
            A(yr, {
              href: "https://www.ladle.dev/docs/config#story-filenames",
              children: "configuration file",
            }),
            " ",
            "or CLI flag ",
            A(Pn, { children: "--stories=your-glob" }),
            ".",
          ],
        }),
        A("p", {
          children: A(yr, {
            href: "https://github.com/tajo/ladle",
            children: "GitHub",
          }),
        }),
        A("p", {
          children: A(yr, { href: "https://www.ladle.dev", children: "Docs" }),
        }),
      ],
    });
var sh = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var r = [], o = 0; o < arguments.length; o++) {
        var i = arguments[o];
        if (i) {
          var a = typeof i;
          if (a === "string" || a === "number") r.push(i);
          else if (Array.isArray(i)) {
            if (i.length) {
              var s = n.apply(null, i);
              s && r.push(s);
            }
          } else if (a === "object") {
            if (
              i.toString !== Object.prototype.toString &&
              !i.toString.toString().includes("[native code]")
            ) {
              r.push(i.toString());
              continue;
            }
            for (var l in i) t.call(i, l) && i[l] && r.push(l);
          }
        }
      }
      return r.join(" ");
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(sh);
var Dw = sh.exports;
const xw = Sr(Dw);
function sa() {
  return (
    (sa = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    sa.apply(this, arguments)
  );
}
var Fn;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Fn || (Fn = {}));
var p2 = function (e) {
    return e;
  },
  h2 = "beforeunload",
  Fw = "popstate";
function Ow(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.window,
    r = n === void 0 ? document.defaultView : n,
    o = r.history;
  function i() {
    var k = r.location,
      x = k.pathname,
      P = k.search,
      $ = k.hash,
      ee = o.state || {};
    return [
      ee.idx,
      p2({
        pathname: x,
        search: P,
        hash: $,
        state: ee.usr || null,
        key: ee.key || "default",
      }),
    ];
  }
  var a = null;
  function s() {
    if (a) C.call(a), (a = null);
    else {
      var k = Fn.Pop,
        x = i(),
        P = x[0],
        $ = x[1];
      if (C.length) {
        if (P != null) {
          var ee = d - P;
          ee &&
            ((a = {
              action: k,
              location: $,
              retry: function () {
                D(ee * -1);
              },
            }),
            D(ee));
        }
      } else f(k);
    }
  }
  r.addEventListener(Fw, s);
  var l = Fn.Pop,
    u = i(),
    d = u[0],
    c = u[1],
    m = g2(),
    C = g2();
  d == null && ((d = 0), o.replaceState(sa({}, o.state, { idx: d }), ""));
  function v(k) {
    return typeof k == "string" ? k : Rw(k);
  }
  function p(k, x) {
    return (
      x === void 0 && (x = null),
      p2(
        sa(
          { pathname: c.pathname, hash: "", search: "" },
          typeof k == "string" ? Nw(k) : k,
          { state: x, key: Tw() }
        )
      )
    );
  }
  function E(k, x) {
    return [{ usr: k.state, key: k.key, idx: x }, v(k)];
  }
  function h(k, x, P) {
    return !C.length || (C.call({ action: k, location: x, retry: P }), !1);
  }
  function f(k) {
    l = k;
    var x = i();
    (d = x[0]), (c = x[1]), m.call({ action: l, location: c });
  }
  function g(k, x) {
    var P = Fn.Push,
      $ = p(k, x);
    function ee() {
      g(k, x);
    }
    if (h(P, $, ee)) {
      var R = E($, d + 1),
        M = R[0],
        j = R[1];
      try {
        o.pushState(M, "", j);
      } catch {
        r.location.assign(j);
      }
      f(P);
    }
  }
  function _(k, x) {
    var P = Fn.Replace,
      $ = p(k, x);
    function ee() {
      _(k, x);
    }
    if (h(P, $, ee)) {
      var R = E($, d),
        M = R[0],
        j = R[1];
      o.replaceState(M, "", j), f(P);
    }
  }
  function D(k) {
    o.go(k);
  }
  var T = {
    get action() {
      return l;
    },
    get location() {
      return c;
    },
    createHref: v,
    push: g,
    replace: _,
    go: D,
    back: function () {
      D(-1);
    },
    forward: function () {
      D(1);
    },
    listen: function (x) {
      return m.push(x);
    },
    block: function (x) {
      var P = C.push(x);
      return (
        C.length === 1 && r.addEventListener(h2, m2),
        function () {
          P(), C.length || r.removeEventListener(h2, m2);
        }
      );
    },
  };
  return T;
}
function m2(e) {
  e.preventDefault(), (e.returnValue = "");
}
function g2() {
  var e = [];
  return {
    get length() {
      return e.length;
    },
    push: function (n) {
      return (
        e.push(n),
        function () {
          e = e.filter(function (r) {
            return r !== n;
          });
        }
      );
    },
    call: function (n) {
      e.forEach(function (r) {
        return r && r(n);
      });
    },
  };
}
function Tw() {
  return Math.random().toString(36).substr(2, 8);
}
function Rw(e) {
  var t = e.pathname,
    n = t === void 0 ? "/" : t,
    r = e.search,
    o = r === void 0 ? "" : r,
    i = e.hash,
    a = i === void 0 ? "" : i;
  return (
    o && o !== "?" && (n += o.charAt(0) === "?" ? o : "?" + o),
    a && a !== "#" && (n += a.charAt(0) === "#" ? a : "#" + a),
    n
  );
}
function Nw(e) {
  var t = {};
  if (e) {
    var n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    var r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
const uh = Ow(),
  ch = (e) => {
    Object.keys(e).forEach((t) => {
      const n = e[t],
        r = H.addons[t] ? H.addons[t].defaultState : "$$LADLE_unknown";
      n === r && delete e[t];
    });
  },
  Fl = (e) => {
    if (!e.controlInitialized) return;
    const t = {
      mode: e.mode,
      rtl: e.rtl,
      source: e.source,
      story: e.story,
      theme: e.theme,
      width: e.width,
      control: e.control,
    };
    ch(t),
      location.search !== ki(t) &&
        (Dt(`Updating URL to ${ki(t)}`), uh.push(ki(t)));
  },
  ki = (e) => {
    ch(e);
    const t = {};
    return (
      Object.keys(e).forEach((n) => {
        n === "control"
          ? Object.keys(e[n]).forEach((r) => {
              const o = e[n][r];
              if (o.type === te.Action) return;
              let i = o.value,
                a = !1;
              i = encodeURI(
                typeof o.value == "string" ? o.value : JSON.stringify(o.value)
              );
              try {
                (a =
                  JSON.stringify(o.value) === JSON.stringify(o.defaultValue)),
                  !a &&
                    JSON.stringify(i) !== JSON.stringify(o.defaultValue) &&
                    (t[`arg-${r}`] = i);
              } catch {}
            })
          : (t[n] = e[n]);
      }),
      `?${Wt.stringify(t)}`
    );
  },
  dh = (e) =>
    e.isExpanded && e.children && e.children.length
      ? dh(e.children[e.children.length - 1])
      : e.id,
  fh = (e, t, n) => {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id === t) return n;
      if (e[r].isExpanded && e[r].children && e[r].children.length) {
        const o = fh(e[r].children, t, e[r].id);
        if (o) return o;
      }
    }
    return null;
  },
  ph = (e, t, n) => {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id === t) return r === 0 ? n : dh(e[r - 1]);
      if (e[r].isExpanded && e[r].children && e[r].children.length) {
        const o = ph(e[r].children, t, e[r].id);
        if (o) return o;
      }
    }
    return null;
  },
  hh = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      if (e[n].id === t) return e[n].children;
      const r = hh(e[n].children, t);
      if (r.length) return r;
    }
    return [];
  },
  mh = (e, t) => (e[0].isLinkable ? e[0] : mh(e[0].children)),
  gh = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      if (
        e[n].id === t &&
        e[n].isExpanded &&
        e[n].children &&
        e[n].children.length
      )
        return e[n].children[0].id;
      if (e[n].isExpanded && e[n].children && e[n].children.length) {
        const r = gh(e[n].children, t);
        if (r) return r;
      }
    }
    return null;
  },
  yh = (e, t, n) => {
    for (let r = 0; r < e.length; r++) {
      if (e[r].id === t)
        return e[r].isExpanded && e[r].children && e[r].children.length
          ? e[r].children[0].id
          : e[r + 1]
          ? e[r + 1].id
          : n;
      if (e[r].isExpanded && e[r].children && e[r].children.length) {
        const o = yh(e[r].children, t, e[r + 1] ? e[r + 1].id : n);
        if (o) return o;
      }
    }
    return null;
  },
  vh = (e) => {
    const t = e[e.length - 1];
    return t.isExpanded && t.children && t.children.length
      ? vh(t.children)
      : t.id;
  },
  Zr = (e, t) =>
    e.map((n, r) => {
      const o = { ...n };
      return (
        o.id === t.id && (o.isExpanded = !o.isExpanded),
        t.id === "+" && r === 0 && (o.isExpanded = !0),
        t.id === "-" && (o.isExpanded = !1),
        o.children &&
          o.children.length &&
          (o.children = Zr(
            o.children,
            o.id === t.id ? { id: o.isExpanded ? "+" : "-" } : t
          )),
        o
      );
    }),
  Bw = ({
    stories: e,
    story: t,
    updateStory: n,
    searchActive: r,
    searchRef: o,
    setTreeRootRef: i,
    hotkeys: a,
  }) => {
    const s = w.useRef({}),
      [l, u] = w.useState(Ya(e, t, r));
    w.useEffect(() => {
      u(Ya(e, t, r));
    }, [e.join(",")]);
    const [d, c] = w.useState(l.length ? l[0].id : null),
      m = (p) => {
        var E;
        p && s && s.current[p] && ((E = s.current[p]) == null || E.focus()),
          c(p || l[0].id),
          !p && o.current.focus();
      },
      C = (p) => {
        p && (n(p), u(Ya(e, p, r)), setTimeout(() => m(p), 1));
      };
    return (
      ct(
        H.hotkeys.nextStory,
        () => {
          const p = e.findIndex((E) => E === t);
          C(e[p + 1]);
        },
        { preventDefault: !0, enableOnFormTags: !0, enabled: a }
      ),
      ct(
        H.hotkeys.previousStory,
        () => {
          const p = e.findIndex((E) => E === t);
          C(e[p - 1]);
        },
        { preventDefault: !0, enableOnFormTags: !0, enabled: a }
      ),
      ct(
        H.hotkeys.nextComponent,
        () => {
          const p = e.findIndex((f) => f === t),
            E = e[p].split("--"),
            h = E[E.length - 2];
          for (let f = p + 1; f < e.length; f++) {
            const g = e[f].split("--");
            if (g[g.length - 2] !== h) {
              C(e[f]);
              return;
            }
          }
        },
        { preventDefault: !0, enableOnFormTags: !0, enabled: a }
      ),
      ct(
        H.hotkeys.previousComponent,
        () => {
          const p = e.findIndex((f) => f === t),
            E = e[p].split("--"),
            h = E[E.length - 2];
          for (let f = p - 1; f >= 0; f--) {
            const g = e[f].split("--"),
              _ = f > 0 ? e[f - 1].split("--") : ["", ""];
            if (g[g.length - 2] !== h && _[_.length - 2] !== g[g.length - 2]) {
              C(e[f]);
              return;
            }
          }
        },
        { preventDefault: !0, enableOnFormTags: !0, enabled: a }
      ),
      A("ul", {
        role: "tree",
        style: { marginInlineStart: "-6px" },
        ref: (p) => i(p),
        children: A(Eh, {
          tree: l,
          fullTree: l,
          story: t,
          updateStory: n,
          onItemClick: (p) => {
            const E = Zr(l, p),
              h = mh(hh(E, p.id), p.id);
            h && t !== h.id && h.isExpanded && n(h.id), u(E);
          },
          selectedItemId: d,
          onKeyDownFn: (p, E) => {
            if (!(p.metaKey || p.ctrlKey || p.altKey))
              switch (p.key) {
                case "ArrowRight":
                  p.preventDefault(),
                    p.stopPropagation(),
                    E.isExpanded ? m(gh(l, E.id)) : u(Zr(l, E));
                  break;
                case "ArrowLeft":
                  p.preventDefault(),
                    p.stopPropagation(),
                    E.isExpanded ? u(Zr(l, E)) : m(fh(l, E.id, null));
                  break;
                case "ArrowUp":
                  p.preventDefault(), p.stopPropagation(), m(ph(l, E.id, null));
                  break;
                case "ArrowDown":
                  p.preventDefault(), p.stopPropagation();
                  const h = yh(l, E.id, null);
                  h && m(h);
                  break;
                case " ":
                case "Enter":
                  p.target.href ||
                    (p.preventDefault(), p.stopPropagation(), u(Zr(l, E)));
                  break;
                case "Home":
                  p.preventDefault(),
                    p.stopPropagation(),
                    l.length && m(l[0].id);
                  break;
                case "End":
                  p.preventDefault(), p.stopPropagation(), m(vh(l));
                  break;
              }
          },
          treeItemRefs: s,
        }),
      })
    );
  },
  Eh = ({
    tree: e,
    fullTree: t,
    story: n,
    updateStory: r,
    onItemClick: o,
    onKeyDownFn: i,
    selectedItemId: a,
    treeItemRefs: s,
  }) =>
    A(w.Fragment, {
      children: e.map((l) =>
        z(
          "li",
          {
            onDragStart: (u) => u.preventDefault(),
            onKeyDown: (u) => i(u, l),
            "aria-expanded": l.isExpanded,
            title: l.name,
            tabIndex: l.id === a && !l.isLinkable ? 0 : -1,
            ref: l.isLinkable ? void 0 : (u) => (s.current[l.id] = u),
            role: "treeitem",
            className: xw({
              "ladle-linkable": l.isLinkable,
              "ladle-active": l.id === n,
            }),
            style: l.isLinkable ? {} : { marginTop: "0.5em" },
            children: [
              l.isLinkable
                ? z("div", {
                    style: { display: "flex" },
                    children: [
                      A(Wg, {}),
                      A("a", {
                        tabIndex: l.id === a ? 0 : -1,
                        ref: (u) => (s.current[l.id] = u),
                        href: ki({ story: l.id }),
                        onKeyDown: (u) => n !== l.id && i(u, l),
                        onClick: (u) => {
                          !u.ctrlKey &&
                            !u.metaKey &&
                            (u.preventDefault(), n !== l.id && r(l.id));
                        },
                        children: l.name,
                      }),
                    ],
                  })
                : z("div", {
                    style: { display: "flex", cursor: "pointer" },
                    title: l.name,
                    onClick: () => o(l),
                    children: [
                      A(Gg, { rotate: !l.isExpanded }),
                      A("div", {
                        style: {
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        },
                        children: l.name,
                      }),
                    ],
                  }),
              Object.keys(l.children).length > 0 &&
                l.isExpanded &&
                A("ul", {
                  role: "group",
                  children: A(Eh, {
                    tree: l.children,
                    fullTree: t,
                    story: n,
                    updateStory: r,
                    selectedItemId: a,
                    onKeyDownFn: i,
                    onItemClick: o,
                    treeItemRefs: s,
                  }),
                }),
            ],
          },
          l.id
        )
      ),
    }),
  Iw = ({ stories: e, story: t, updateStory: n, hotkeys: r }) => {
    const [o, i] = w.useState(""),
      a = w.useRef(null),
      s = w.useRef(null);
    ct(H.hotkeys.search, () => a.current.focus(), {
      preventDefault: !0,
      enabled: r,
    });
    const l = o.toLocaleLowerCase().replace(new RegExp("\\s+", "g"), "-"),
      u = e.filter((d) => d.includes(l));
    return z("nav", {
      role: "navigation",
      className: "ladle-aside",
      children: [
        A("input", {
          placeholder: "Search",
          "aria-label": "Search stories",
          value: o,
          ref: a,
          onKeyDown: (d) => {
            d.key === "ArrowDown" && s.current.firstChild.focus();
          },
          onChange: (d) => i(d.target.value),
        }),
        A(Bw, {
          searchRef: a,
          stories: u,
          story: t,
          hotkeys: r,
          updateStory: n,
          searchActive: o !== "",
          setTreeRootRef: (d) => (s.current = d),
        }),
      ],
    });
  },
  Lw = (e) => {
    switch (Wt.parse(e).mode) {
      case ze.Full:
        return ze.Full;
      case ze.Preview:
        return ze.Preview;
      default:
        return H.addons.mode.defaultState;
    }
  },
  Pw = ({ dispatch: e }) => {
    const t = `Open fullscreen mode. Can be toggled by pressing ${H.hotkeys.fullscreen.join(
      " or "
    )}.`;
    return A("li", {
      children: z("button", {
        "aria-label": t,
        title: t,
        onClick: () => e({ type: re.UpdateMode, value: ze.Preview }),
        type: "button",
        children: [
          A(Vg, {}),
          A("span", { className: "ladle-addon-tooltip", children: t }),
          A("label", { children: "Open fullscreen mode" }),
        ],
      }),
    });
  };
var $w = Object.create,
  i0 = Object.defineProperty,
  Mw = Object.getOwnPropertyDescriptor,
  Ah = Object.getOwnPropertyNames,
  zw = Object.getPrototypeOf,
  jw = Object.prototype.hasOwnProperty,
  a0 = (e, t) =>
    function () {
      return t || (0, e[Ah(e)[0]])((t = { exports: {} }).exports, t), t.exports;
    },
  Uw = (e, t) => {
    for (var n in t) i0(e, n, { get: t[n], enumerable: !0 });
  },
  Vw = (e, t, n, r) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of Ah(t))
        !jw.call(e, o) &&
          o !== n &&
          i0(e, o, {
            get: () => t[o],
            enumerable: !(r = Mw(t, o)) || r.enumerable,
          });
    return e;
  },
  Hw = (e, t, n) => (
    (n = e != null ? $w(zw(e)) : {}),
    Vw(
      t || !e || !e.__esModule
        ? i0(n, "default", { value: e, enumerable: !0 })
        : n,
      e
    )
  ),
  Ww = a0({
    "node_modules/is-object/index.js"(e, t) {
      t.exports = function (r) {
        return typeof r == "object" && r !== null;
      };
    },
  }),
  Gw = a0({
    "node_modules/is-window/index.js"(e, t) {
      t.exports = function (n) {
        if (n == null) return !1;
        var r = Object(n);
        return r === r.window;
      };
    },
  }),
  Yw = a0({
    "node_modules/is-dom/index.js"(e, t) {
      var n = Ww(),
        r = Gw();
      function o(i) {
        return !n(i) || !r(window) || typeof window.Node != "function"
          ? !1
          : typeof i.nodeType == "number" && typeof i.nodeName == "string";
      }
      t.exports = o;
    },
  }),
  ua = {};
Uw(ua, { chromeDark: () => wh, chromeLight: () => Ch });
var wh = {
    BASE_FONT_FAMILY: "Menlo, monospace",
    BASE_FONT_SIZE: "11px",
    BASE_LINE_HEIGHT: 1.2,
    BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
    BASE_COLOR: "rgb(213, 213, 213)",
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
    OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
    OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
    OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
    OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
    OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
    HTML_TAG_COLOR: "rgb(93, 176, 215)",
    HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
    HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
    HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
    HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
    HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
    HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
    ARROW_COLOR: "rgb(145, 145, 145)",
    ARROW_MARGIN_RIGHT: 3,
    ARROW_FONT_SIZE: 12,
    ARROW_ANIMATION_DURATION: "0",
    TREENODE_FONT_FAMILY: "Menlo, monospace",
    TREENODE_FONT_SIZE: "11px",
    TREENODE_LINE_HEIGHT: 1.2,
    TREENODE_PADDING_LEFT: 12,
    TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
    TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
    TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
    TABLE_SORT_ICON_COLOR: "black",
    TABLE_DATA_BACKGROUND_IMAGE:
      "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
    TABLE_DATA_BACKGROUND_SIZE: "128px 32px",
  },
  Ch = {
    BASE_FONT_FAMILY: "Menlo, monospace",
    BASE_FONT_SIZE: "11px",
    BASE_LINE_HEIGHT: 1.2,
    BASE_BACKGROUND_COLOR: "white",
    BASE_COLOR: "black",
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
    OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
    OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
    OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
    OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
    OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
    OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
    OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
    HTML_TAG_COLOR: "rgb(168, 148, 166)",
    HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
    HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
    HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
    HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
    HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
    HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
    ARROW_COLOR: "#6e6e6e",
    ARROW_MARGIN_RIGHT: 3,
    ARROW_FONT_SIZE: 12,
    ARROW_ANIMATION_DURATION: "0",
    TREENODE_FONT_FAMILY: "Menlo, monospace",
    TREENODE_FONT_SIZE: "11px",
    TREENODE_LINE_HEIGHT: 1.2,
    TREENODE_PADDING_LEFT: 12,
    TABLE_BORDER_COLOR: "#aaa",
    TABLE_TH_BACKGROUND_COLOR: "#eee",
    TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
    TABLE_SORT_ICON_COLOR: "#6e6e6e",
    TABLE_DATA_BACKGROUND_IMAGE:
      "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
    TABLE_DATA_BACKGROUND_SIZE: "128px 32px",
  },
  bh = w.createContext([{}, () => {}]),
  Ol = {
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    OUserSelect: "none",
    userSelect: "none",
  },
  Di = (e) => ({
    DOMNodePreview: {
      htmlOpenTag: {
        base: { color: e.HTML_TAG_COLOR },
        tagName: {
          color: e.HTML_TAGNAME_COLOR,
          textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM,
        },
        htmlAttributeName: { color: e.HTML_ATTRIBUTE_NAME_COLOR },
        htmlAttributeValue: { color: e.HTML_ATTRIBUTE_VALUE_COLOR },
      },
      htmlCloseTag: {
        base: { color: e.HTML_TAG_COLOR },
        offsetLeft: { marginLeft: -e.TREENODE_PADDING_LEFT },
        tagName: {
          color: e.HTML_TAGNAME_COLOR,
          textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM,
        },
      },
      htmlComment: { color: e.HTML_COMMENT_COLOR },
      htmlDoctype: { color: e.HTML_DOCTYPE_COLOR },
    },
    ObjectPreview: {
      objectDescription: { fontStyle: "italic" },
      preview: { fontStyle: "italic" },
      arrayMaxProperties: e.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
      objectMaxProperties: e.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES,
    },
    ObjectName: {
      base: { color: e.OBJECT_NAME_COLOR },
      dimmed: { opacity: 0.6 },
    },
    ObjectValue: {
      objectValueNull: { color: e.OBJECT_VALUE_NULL_COLOR },
      objectValueUndefined: { color: e.OBJECT_VALUE_UNDEFINED_COLOR },
      objectValueRegExp: { color: e.OBJECT_VALUE_REGEXP_COLOR },
      objectValueString: { color: e.OBJECT_VALUE_STRING_COLOR },
      objectValueSymbol: { color: e.OBJECT_VALUE_SYMBOL_COLOR },
      objectValueNumber: { color: e.OBJECT_VALUE_NUMBER_COLOR },
      objectValueBoolean: { color: e.OBJECT_VALUE_BOOLEAN_COLOR },
      objectValueFunctionPrefix: {
        color: e.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
        fontStyle: "italic",
      },
      objectValueFunctionName: { fontStyle: "italic" },
    },
    TreeView: {
      treeViewOutline: { padding: 0, margin: 0, listStyleType: "none" },
    },
    TreeNode: {
      treeNodeBase: {
        color: e.BASE_COLOR,
        backgroundColor: e.BASE_BACKGROUND_COLOR,
        lineHeight: e.TREENODE_LINE_HEIGHT,
        cursor: "default",
        boxSizing: "border-box",
        listStyle: "none",
        fontFamily: e.TREENODE_FONT_FAMILY,
        fontSize: e.TREENODE_FONT_SIZE,
      },
      treeNodePreviewContainer: {},
      treeNodePlaceholder: {
        whiteSpace: "pre",
        fontSize: e.ARROW_FONT_SIZE,
        marginRight: e.ARROW_MARGIN_RIGHT,
        ...Ol,
      },
      treeNodeArrow: {
        base: {
          color: e.ARROW_COLOR,
          display: "inline-block",
          fontSize: e.ARROW_FONT_SIZE,
          marginRight: e.ARROW_MARGIN_RIGHT,
          ...(parseFloat(e.ARROW_ANIMATION_DURATION) > 0
            ? { transition: `transform ${e.ARROW_ANIMATION_DURATION} ease 0s` }
            : {}),
          ...Ol,
        },
        expanded: {
          WebkitTransform: "rotateZ(90deg)",
          MozTransform: "rotateZ(90deg)",
          transform: "rotateZ(90deg)",
        },
        collapsed: {
          WebkitTransform: "rotateZ(0deg)",
          MozTransform: "rotateZ(0deg)",
          transform: "rotateZ(0deg)",
        },
      },
      treeNodeChildNodesContainer: {
        margin: 0,
        paddingLeft: e.TREENODE_PADDING_LEFT,
      },
    },
    TableInspector: {
      base: {
        color: e.BASE_COLOR,
        position: "relative",
        border: `1px solid ${e.TABLE_BORDER_COLOR}`,
        fontFamily: e.BASE_FONT_FAMILY,
        fontSize: e.BASE_FONT_SIZE,
        lineHeight: "120%",
        boxSizing: "border-box",
        cursor: "default",
      },
    },
    TableInspectorHeaderContainer: {
      base: { top: 0, height: "17px", left: 0, right: 0, overflowX: "hidden" },
      table: {
        tableLayout: "fixed",
        borderSpacing: 0,
        borderCollapse: "separate",
        height: "100%",
        width: "100%",
        margin: 0,
      },
    },
    TableInspectorDataContainer: {
      tr: { display: "table-row" },
      td: {
        boxSizing: "border-box",
        border: "none",
        height: "16px",
        verticalAlign: "top",
        padding: "1px 4px",
        WebkitUserSelect: "text",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: "14px",
      },
      div: {
        position: "static",
        top: "17px",
        bottom: 0,
        overflowY: "overlay",
        transform: "translateZ(0)",
        left: 0,
        right: 0,
        overflowX: "hidden",
      },
      table: {
        positon: "static",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderTop: "0 none transparent",
        margin: 0,
        backgroundImage: e.TABLE_DATA_BACKGROUND_IMAGE,
        backgroundSize: e.TABLE_DATA_BACKGROUND_SIZE,
        tableLayout: "fixed",
        borderSpacing: 0,
        borderCollapse: "separate",
        width: "100%",
        fontSize: e.BASE_FONT_SIZE,
        lineHeight: "120%",
      },
    },
    TableInspectorTH: {
      base: {
        position: "relative",
        height: "auto",
        textAlign: "left",
        backgroundColor: e.TABLE_TH_BACKGROUND_COLOR,
        borderBottom: `1px solid ${e.TABLE_BORDER_COLOR}`,
        fontWeight: "normal",
        verticalAlign: "middle",
        padding: "0 4px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        lineHeight: "14px",
        ":hover": { backgroundColor: e.TABLE_TH_HOVER_COLOR },
      },
      div: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize: e.BASE_FONT_SIZE,
        lineHeight: "120%",
      },
    },
    TableInspectorLeftBorder: {
      none: { borderLeft: "none" },
      solid: { borderLeft: `1px solid ${e.TABLE_BORDER_COLOR}` },
    },
    TableInspectorSortIcon: {
      display: "block",
      marginRight: 3,
      width: 8,
      height: 7,
      marginTop: -7,
      color: e.TABLE_SORT_ICON_COLOR,
      fontSize: 12,
      ...Ol,
    },
  }),
  Hs = "chromeLight",
  _h = w.createContext(Di(ua[Hs])),
  tt = (e) => w.useContext(_h)[e],
  l0 =
    (e) =>
    ({ theme: n = Hs, ...r }) => {
      const o = w.useMemo(() => {
        switch (Object.prototype.toString.call(n)) {
          case "[object String]":
            return Di(ua[n]);
          case "[object Object]":
            return Di(n);
          default:
            return Di(ua[Hs]);
        }
      }, [n]);
      return O.createElement(
        _h.Provider,
        { value: o },
        O.createElement(e, { ...r })
      );
    },
  Zw = ({ expanded: e, styles: t }) =>
    O.createElement(
      "span",
      { style: { ...t.base, ...(e ? t.expanded : t.collapsed) } },
      "▶"
    ),
  Qw = w.memo((e) => {
    e = {
      expanded: !0,
      nodeRenderer: ({ name: d }) => O.createElement("span", null, d),
      onClick: () => {},
      shouldShowArrow: !1,
      shouldShowPlaceholder: !0,
      ...e,
    };
    const {
        expanded: t,
        onClick: n,
        children: r,
        nodeRenderer: o,
        title: i,
        shouldShowArrow: a,
        shouldShowPlaceholder: s,
      } = e,
      l = tt("TreeNode"),
      u = o;
    return O.createElement(
      "li",
      { "aria-expanded": t, role: "treeitem", style: l.treeNodeBase, title: i },
      O.createElement(
        "div",
        { style: l.treeNodePreviewContainer, onClick: n },
        a || w.Children.count(r) > 0
          ? O.createElement(Zw, { expanded: t, styles: l.treeNodeArrow })
          : s && O.createElement("span", { style: l.treeNodePlaceholder }, " "),
        O.createElement(u, { ...e })
      ),
      O.createElement(
        "ol",
        { role: "group", style: l.treeNodeChildNodesContainer },
        t ? r : void 0
      )
    );
  }),
  ca = "$",
  y2 = "*";
function xi(e, t) {
  return !t(e).next().done;
}
var Xw = (e) =>
    Array.from({ length: e }, (t, n) =>
      [ca].concat(Array.from({ length: n }, () => "*")).join(".")
    ),
  qw = (e, t, n, r, o) => {
    const i = []
        .concat(Xw(r))
        .concat(n)
        .filter((s) => typeof s == "string"),
      a = [];
    return (
      i.forEach((s) => {
        const l = s.split("."),
          u = (d, c, m) => {
            if (m === l.length) {
              a.push(c);
              return;
            }
            const C = l[m];
            if (m === 0) xi(d, t) && (C === ca || C === y2) && u(d, ca, m + 1);
            else if (C === y2)
              for (const { name: v, data: p } of t(d))
                xi(p, t) && u(p, `${c}.${v}`, m + 1);
            else {
              const v = d[C];
              xi(v, t) && u(v, `${c}.${C}`, m + 1);
            }
          };
        u(e, "", 0);
      }),
      a.reduce((s, l) => ((s[l] = !0), s), { ...o })
    );
  },
  Sh = w.memo((e) => {
    const { data: t, dataIterator: n, path: r, depth: o, nodeRenderer: i } = e,
      [a, s] = w.useContext(bh),
      l = xi(t, n),
      u = !!a[r],
      d = w.useCallback(() => l && s((c) => ({ ...c, [r]: !u })), [l, s, r, u]);
    return O.createElement(
      Qw,
      {
        expanded: u,
        onClick: d,
        shouldShowArrow: l,
        shouldShowPlaceholder: o > 0,
        nodeRenderer: i,
        ...e,
      },
      u
        ? [...n(t)].map(({ name: c, data: m, ...C }) =>
            O.createElement(Sh, {
              name: c,
              data: m,
              depth: o + 1,
              path: `${r}.${c}`,
              key: c,
              dataIterator: n,
              nodeRenderer: i,
              ...C,
            })
          )
        : null
    );
  }),
  kh = w.memo(
    ({
      name: e,
      data: t,
      dataIterator: n,
      nodeRenderer: r,
      expandPaths: o,
      expandLevel: i,
    }) => {
      const a = tt("TreeView"),
        s = w.useState({}),
        [, l] = s;
      return (
        w.useLayoutEffect(() => l((u) => qw(t, n, o, i, u)), [t, n, o, i]),
        O.createElement(
          bh.Provider,
          { value: s },
          O.createElement(
            "ol",
            { role: "tree", style: a.treeViewOutline },
            O.createElement(Sh, {
              name: e,
              data: t,
              dataIterator: n,
              depth: 0,
              path: ca,
              nodeRenderer: r,
            })
          )
        )
      );
    }
  ),
  s0 = ({ name: e, dimmed: t = !1, styles: n = {} }) => {
    const r = tt("ObjectName"),
      o = { ...r.base, ...(t ? r.dimmed : {}), ...n };
    return O.createElement("span", { style: o }, e);
  },
  oo = ({ object: e, styles: t }) => {
    const n = tt("ObjectValue"),
      r = (o) => ({ ...n[o], ...t });
    switch (typeof e) {
      case "bigint":
        return O.createElement(
          "span",
          { style: r("objectValueNumber") },
          String(e),
          "n"
        );
      case "number":
        return O.createElement(
          "span",
          { style: r("objectValueNumber") },
          String(e)
        );
      case "string":
        return O.createElement(
          "span",
          { style: r("objectValueString") },
          '"',
          e,
          '"'
        );
      case "boolean":
        return O.createElement(
          "span",
          { style: r("objectValueBoolean") },
          String(e)
        );
      case "undefined":
        return O.createElement(
          "span",
          { style: r("objectValueUndefined") },
          "undefined"
        );
      case "object":
        return e === null
          ? O.createElement("span", { style: r("objectValueNull") }, "null")
          : e instanceof Date
          ? O.createElement("span", null, e.toString())
          : e instanceof RegExp
          ? O.createElement(
              "span",
              { style: r("objectValueRegExp") },
              e.toString()
            )
          : Array.isArray(e)
          ? O.createElement("span", null, `Array(${e.length})`)
          : e.constructor
          ? typeof e.constructor.isBuffer == "function" &&
            e.constructor.isBuffer(e)
            ? O.createElement("span", null, `Buffer[${e.length}]`)
            : O.createElement("span", null, e.constructor.name)
          : O.createElement("span", null, "Object");
      case "function":
        return O.createElement(
          "span",
          null,
          O.createElement(
            "span",
            { style: r("objectValueFunctionPrefix") },
            "ƒ "
          ),
          O.createElement(
            "span",
            { style: r("objectValueFunctionName") },
            e.name,
            "()"
          )
        );
      case "symbol":
        return O.createElement(
          "span",
          { style: r("objectValueSymbol") },
          e.toString()
        );
      default:
        return O.createElement("span", null);
    }
  },
  Dh = Object.prototype.hasOwnProperty,
  Kw = Object.prototype.propertyIsEnumerable;
function Ws(e, t) {
  const n = Object.getOwnPropertyDescriptor(e, t);
  if (n.get)
    try {
      return n.get();
    } catch {
      return n.get;
    }
  return e[t];
}
function v2(e, t) {
  return e.length === 0
    ? []
    : e.slice(1).reduce((n, r) => n.concat([t, r]), [e[0]]);
}
var Gs = ({ data: e }) => {
    const t = tt("ObjectPreview"),
      n = e;
    if (
      typeof n != "object" ||
      n === null ||
      n instanceof Date ||
      n instanceof RegExp
    )
      return O.createElement(oo, { object: n });
    if (Array.isArray(n)) {
      const r = t.arrayMaxProperties,
        o = n
          .slice(0, r)
          .map((a, s) => O.createElement(oo, { key: s, object: a }));
      n.length > r && o.push(O.createElement("span", { key: "ellipsis" }, "…"));
      const i = n.length;
      return O.createElement(
        O.Fragment,
        null,
        O.createElement(
          "span",
          { style: t.objectDescription },
          i === 0 ? "" : `(${i}) `
        ),
        O.createElement("span", { style: t.preview }, "[", v2(o, ", "), "]")
      );
    } else {
      const r = t.objectMaxProperties,
        o = [];
      for (const a in n)
        if (Dh.call(n, a)) {
          let s;
          o.length === r - 1 &&
            Object.keys(n).length > r &&
            (s = O.createElement("span", { key: "ellipsis" }, "…"));
          const l = Ws(n, a);
          if (
            (o.push(
              O.createElement(
                "span",
                { key: a },
                O.createElement(s0, { name: a || '""' }),
                ": ",
                O.createElement(oo, { object: l }),
                s
              )
            ),
            s)
          )
            break;
        }
      const i = n.constructor ? n.constructor.name : "Object";
      return O.createElement(
        O.Fragment,
        null,
        O.createElement(
          "span",
          { style: t.objectDescription },
          i === "Object" ? "" : `${i} `
        ),
        O.createElement("span", { style: t.preview }, "{", v2(o, ", "), "}")
      );
    }
  },
  Jw = ({ name: e, data: t }) =>
    typeof e == "string"
      ? O.createElement(
          "span",
          null,
          O.createElement(s0, { name: e }),
          O.createElement("span", null, ": "),
          O.createElement(Gs, { data: t })
        )
      : O.createElement(Gs, { data: t }),
  eC = ({ name: e, data: t, isNonenumerable: n = !1 }) => {
    const r = t;
    return O.createElement(
      "span",
      null,
      typeof e == "string"
        ? O.createElement(s0, { name: e, dimmed: n })
        : O.createElement(Gs, { data: e }),
      O.createElement("span", null, ": "),
      O.createElement(oo, { object: r })
    );
  },
  tC = (e, t) =>
    function* (r) {
      if (!((typeof r == "object" && r !== null) || typeof r == "function"))
        return;
      const i = Array.isArray(r);
      if (!i && r[Symbol.iterator]) {
        let a = 0;
        for (const s of r) {
          if (Array.isArray(s) && s.length === 2) {
            const [l, u] = s;
            yield { name: l, data: u };
          } else yield { name: a.toString(), data: s };
          a++;
        }
      } else {
        const a = Object.getOwnPropertyNames(r);
        t === !0 && !i ? a.sort() : typeof t == "function" && a.sort(t);
        for (const s of a)
          if (Kw.call(r, s)) {
            const l = Ws(r, s);
            yield { name: s || '""', data: l };
          } else if (e) {
            let l;
            try {
              l = Ws(r, s);
            } catch {}
            l !== void 0 && (yield { name: s, data: l, isNonenumerable: !0 });
          }
        e &&
          r !== Object.prototype &&
          (yield {
            name: "__proto__",
            data: Object.getPrototypeOf(r),
            isNonenumerable: !0,
          });
      }
    },
  nC = ({ depth: e, name: t, data: n, isNonenumerable: r }) =>
    e === 0
      ? O.createElement(Jw, { name: t, data: n })
      : O.createElement(eC, { name: t, data: n, isNonenumerable: r }),
  rC = ({
    showNonenumerable: e = !1,
    sortObjectKeys: t,
    nodeRenderer: n,
    ...r
  }) => {
    const o = tC(e, t),
      i = n || nC;
    return O.createElement(kh, { nodeRenderer: i, dataIterator: o, ...r });
  },
  oC = l0(rC);
function iC(e) {
  if (typeof e == "object") {
    let t = [];
    if (Array.isArray(e)) {
      const r = e.length;
      t = [...Array(r).keys()];
    } else e !== null && (t = Object.keys(e));
    const n = t.reduce((r, o) => {
      const i = e[o];
      return (
        typeof i == "object" &&
          i !== null &&
          Object.keys(i).reduce((s, l) => (s.includes(l) || s.push(l), s), r),
        r
      );
    }, []);
    return { rowHeaders: t, colHeaders: n };
  }
}
var aC = ({ rows: e, columns: t, rowsData: n }) => {
    const r = tt("TableInspectorDataContainer"),
      o = tt("TableInspectorLeftBorder");
    return O.createElement(
      "div",
      { style: r.div },
      O.createElement(
        "table",
        { style: r.table },
        O.createElement("colgroup", null),
        O.createElement(
          "tbody",
          null,
          e.map((i, a) =>
            O.createElement(
              "tr",
              { key: i, style: r.tr },
              O.createElement("td", { style: { ...r.td, ...o.none } }, i),
              t.map((s) => {
                const l = n[a];
                return typeof l == "object" && l !== null && Dh.call(l, s)
                  ? O.createElement(
                      "td",
                      { key: s, style: { ...r.td, ...o.solid } },
                      O.createElement(oo, { object: l[s] })
                    )
                  : O.createElement("td", {
                      key: s,
                      style: { ...r.td, ...o.solid },
                    });
              })
            )
          )
        )
      )
    );
  },
  lC = (e) =>
    O.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 1,
          right: 0,
          bottom: 1,
          display: "flex",
          alignItems: "center",
        },
      },
      e.children
    ),
  sC = ({ sortAscending: e }) => {
    const t = tt("TableInspectorSortIcon"),
      n = e ? "▲" : "▼";
    return O.createElement("div", { style: t }, n);
  },
  E2 = ({
    sortAscending: e = !1,
    sorted: t = !1,
    onClick: n = void 0,
    borderStyle: r = {},
    children: o,
    ...i
  }) => {
    const a = tt("TableInspectorTH"),
      [s, l] = w.useState(!1),
      u = w.useCallback(() => l(!0), []),
      d = w.useCallback(() => l(!1), []);
    return O.createElement(
      "th",
      {
        ...i,
        style: { ...a.base, ...r, ...(s ? a.base[":hover"] : {}) },
        onMouseEnter: u,
        onMouseLeave: d,
        onClick: n,
      },
      O.createElement("div", { style: a.div }, o),
      t && O.createElement(lC, null, O.createElement(sC, { sortAscending: e }))
    );
  },
  uC = ({
    indexColumnText: e = "(index)",
    columns: t = [],
    sorted: n,
    sortIndexColumn: r,
    sortColumn: o,
    sortAscending: i,
    onTHClick: a,
    onIndexTHClick: s,
  }) => {
    const l = tt("TableInspectorHeaderContainer"),
      u = tt("TableInspectorLeftBorder");
    return O.createElement(
      "div",
      { style: l.base },
      O.createElement(
        "table",
        { style: l.table },
        O.createElement(
          "tbody",
          null,
          O.createElement(
            "tr",
            null,
            O.createElement(
              E2,
              {
                borderStyle: u.none,
                sorted: n && r,
                sortAscending: i,
                onClick: s,
              },
              e
            ),
            t.map((d) =>
              O.createElement(
                E2,
                {
                  borderStyle: u.solid,
                  key: d,
                  sorted: n && o === d,
                  sortAscending: i,
                  onClick: a.bind(null, d),
                },
                d
              )
            )
          )
        )
      )
    );
  },
  cC = ({ data: e, columns: t }) => {
    const n = tt("TableInspector"),
      [{ sorted: r, sortIndexColumn: o, sortColumn: i, sortAscending: a }, s] =
        w.useState({
          sorted: !1,
          sortIndexColumn: !1,
          sortColumn: void 0,
          sortAscending: !1,
        }),
      l = w.useCallback(() => {
        s(({ sortIndexColumn: v, sortAscending: p }) => ({
          sorted: !0,
          sortIndexColumn: !0,
          sortColumn: void 0,
          sortAscending: v ? !p : !0,
        }));
      }, []),
      u = w.useCallback((v) => {
        s(({ sortColumn: p, sortAscending: E }) => ({
          sorted: !0,
          sortIndexColumn: !1,
          sortColumn: v,
          sortAscending: v === p ? !E : !0,
        }));
      }, []);
    if (typeof e != "object" || e === null) return O.createElement("div", null);
    let { rowHeaders: d, colHeaders: c } = iC(e);
    t !== void 0 && (c = t);
    let m = d.map((v) => e[v]),
      C;
    if (
      (i !== void 0
        ? (C = m.map((v, p) =>
            typeof v == "object" && v !== null ? [v[i], p] : [void 0, p]
          ))
        : o && (C = d.map((v, p) => [d[p], p])),
      C !== void 0)
    ) {
      const v = (E, h) => (f, g) => {
          const _ = E(f),
            D = E(g),
            T = typeof _,
            k = typeof D,
            x = ($, ee) => ($ < ee ? -1 : $ > ee ? 1 : 0);
          let P;
          if (T === k) P = x(_, D);
          else {
            const $ = {
              string: 0,
              number: 1,
              object: 2,
              symbol: 3,
              boolean: 4,
              undefined: 5,
              function: 6,
            };
            P = x($[T], $[k]);
          }
          return h || (P = -P), P;
        },
        p = C.sort(v((E) => E[0], a)).map((E) => E[1]);
      (d = p.map((E) => d[E])), (m = p.map((E) => m[E]));
    }
    return O.createElement(
      "div",
      { style: n.base },
      O.createElement(uC, {
        columns: c,
        sorted: r,
        sortIndexColumn: o,
        sortColumn: i,
        sortAscending: a,
        onTHClick: u,
        onIndexTHClick: l,
      }),
      O.createElement(aC, { rows: d, columns: c, rowsData: m })
    );
  },
  dC = l0(cC),
  fC = 80,
  xh = (e) =>
    e.childNodes.length === 0 ||
    (e.childNodes.length === 1 &&
      e.childNodes[0].nodeType === Node.TEXT_NODE &&
      e.textContent.length < fC),
  pC = ({ tagName: e, attributes: t, styles: n }) =>
    O.createElement(
      "span",
      { style: n.base },
      "<",
      O.createElement("span", { style: n.tagName }, e),
      (() => {
        if (t) {
          const r = [];
          for (let o = 0; o < t.length; o++) {
            const i = t[o];
            r.push(
              O.createElement(
                "span",
                { key: o },
                " ",
                O.createElement("span", { style: n.htmlAttributeName }, i.name),
                '="',
                O.createElement(
                  "span",
                  { style: n.htmlAttributeValue },
                  i.value
                ),
                '"'
              )
            );
          }
          return r;
        }
      })(),
      ">"
    ),
  A2 = ({ tagName: e, isChildNode: t = !1, styles: n }) =>
    O.createElement(
      "span",
      { style: Object.assign({}, n.base, t && n.offsetLeft) },
      "</",
      O.createElement("span", { style: n.tagName }, e),
      ">"
    ),
  hC = {
    1: "ELEMENT_NODE",
    3: "TEXT_NODE",
    7: "PROCESSING_INSTRUCTION_NODE",
    8: "COMMENT_NODE",
    9: "DOCUMENT_NODE",
    10: "DOCUMENT_TYPE_NODE",
    11: "DOCUMENT_FRAGMENT_NODE",
  },
  mC = ({ isCloseTag: e, data: t, expanded: n }) => {
    const r = tt("DOMNodePreview");
    if (e)
      return O.createElement(A2, {
        styles: r.htmlCloseTag,
        isChildNode: !0,
        tagName: t.tagName,
      });
    switch (t.nodeType) {
      case Node.ELEMENT_NODE:
        return O.createElement(
          "span",
          null,
          O.createElement(pC, {
            tagName: t.tagName,
            attributes: t.attributes,
            styles: r.htmlOpenTag,
          }),
          xh(t) ? t.textContent : !n && "…",
          !n &&
            O.createElement(A2, { tagName: t.tagName, styles: r.htmlCloseTag })
        );
      case Node.TEXT_NODE:
        return O.createElement("span", null, t.textContent);
      case Node.CDATA_SECTION_NODE:
        return O.createElement(
          "span",
          null,
          "<![CDATA[" + t.textContent + "]]>"
        );
      case Node.COMMENT_NODE:
        return O.createElement(
          "span",
          { style: r.htmlComment },
          "<!--",
          t.textContent,
          "-->"
        );
      case Node.PROCESSING_INSTRUCTION_NODE:
        return O.createElement("span", null, t.nodeName);
      case Node.DOCUMENT_TYPE_NODE:
        return O.createElement(
          "span",
          { style: r.htmlDoctype },
          "<!DOCTYPE ",
          t.name,
          t.publicId ? ` PUBLIC "${t.publicId}"` : "",
          !t.publicId && t.systemId ? " SYSTEM" : "",
          t.systemId ? ` "${t.systemId}"` : "",
          ">"
        );
      case Node.DOCUMENT_NODE:
        return O.createElement("span", null, t.nodeName);
      case Node.DOCUMENT_FRAGMENT_NODE:
        return O.createElement("span", null, t.nodeName);
      default:
        return O.createElement("span", null, hC[t.nodeType]);
    }
  },
  gC = function* (e) {
    if (e && e.childNodes) {
      if (xh(e)) return;
      for (let n = 0; n < e.childNodes.length; n++) {
        const r = e.childNodes[n];
        (r.nodeType === Node.TEXT_NODE && r.textContent.trim().length === 0) ||
          (yield { name: `${r.tagName}[${n}]`, data: r });
      }
      e.tagName &&
        (yield {
          name: "CLOSE_TAG",
          data: { tagName: e.tagName },
          isCloseTag: !0,
        });
    }
  },
  yC = (e) => O.createElement(kh, { nodeRenderer: mC, dataIterator: gC, ...e }),
  vC = l0(yC),
  EC = Hw(Yw()),
  AC = ({ table: e = !1, data: t, ...n }) =>
    e
      ? O.createElement(dC, { data: t, ...n })
      : (0, EC.default)(t)
      ? O.createElement(vC, { data: t, ...n })
      : O.createElement(oC, { data: t, ...n });
const wC = ({ dispatch: e, globalState: t }) => {
    const [n, r] = w.useState(!1),
      o = "Log of events triggered by user.";
    return A("li", {
      children: z("button", {
        "aria-label": o,
        title: o,
        onClick: () => r(!0),
        className: n ? "ladle-active" : "",
        "data-testid": "addon-action",
        type: "button",
        children: [
          A(qg, {}),
          A("span", { className: "ladle-addon-tooltip", children: o }),
          A("label", { children: "Actions" }),
          t.action.length
            ? A("div", { className: "ladle-badge", children: t.action.length })
            : null,
          z(Fr, {
            maxWidth: "60em",
            isOpen: n,
            close: () => r(!1),
            label: "Dialog with a log of events triggered by user.",
            children: [
              t.action.map((i, a) =>
                A(
                  AC,
                  {
                    table: !1,
                    sortObjectKeys: !0,
                    theme: {
                      ...(t.theme === be.Light ? Ch : wh),
                      BASE_BACKGROUND_COLOR: "var(--ladle-bg-color-secondary)",
                    },
                    showNonenumerable: !1,
                    name: i.name,
                    data: i.event,
                  },
                  a
                )
              ),
              A("button", {
                onClick: () => {
                  e({ type: re.UpdateAction, clear: !0, value: void 0 });
                },
                type: "button",
                children: "Clear actions",
              }),
            ],
          }),
        ],
      }),
    });
  },
  CC = (e) => {
    const t = Wt.parse(e).rtl;
    return t === "true" ? !0 : t === "false" ? !1 : H.addons.rtl.defaultState;
  },
  bC = ({ dispatch: e, globalState: t }) => {
    const n = "Switch text direction to right to left.",
      r = "Switch text direction to left to right.";
    return (
      ct(H.hotkeys.rtl, () => e({ type: re.UpdateRtl, value: !t.rtl }), {
        enabled: t.hotkeys && H.addons.rtl.enabled,
      }),
      A("li", {
        children: z("button", {
          "aria-label": t.rtl ? r : n,
          title: t.rtl ? r : n,
          className: t.rtl ? "ladle-active" : "",
          onClick: () => e({ type: re.UpdateRtl, value: !t.rtl }),
          type: "button",
          children: [
            A(jg, {}),
            A("span", {
              className: "ladle-addon-tooltip",
              children: t.rtl ? r : n,
            }),
            A("label", { children: "Right to left" }),
          ],
        }),
      })
    );
  },
  _C = {
    fullscreen: "Toggle fullscreen mode",
    search: "Focus search input in the sidebar",
    nextStory: "Go to the next story",
    previousStory: "Go to the previous story",
    nextComponent: "Go to the next component",
    previousComponent: "Go to the previous component",
    control: "Toggle controls addon",
    darkMode: "Toggle dark mode",
    width: "Toggle width addon",
    rtl: "Toggle right-to-left mode",
    a11y: "Toggle accessibility addon",
    source: "Toggle story source addon",
  },
  SC = ({ children: e }) => (
    navigator.platform.toLowerCase().includes("mac")
      ? (e = e.replace(/alt/g, "⌥ opt").replace(/meta/g, "⌘ cmd"))
      : navigator.platform.toLowerCase().includes("win") &&
        (e = e.replace(/meta/g, "⊞ win")),
    (e = e.replace(/shift/g, "⇧ shift")),
    (e = e
      .replace(/arrowright/g, "→")
      .replace(/arrowleft/g, "←")
      .replace(/arrowup/g, "↑")
      .replace(/arrowdown/g, "↓")
      .replace(/\+/g, " ＋ ")),
    A(Pn, { children: e })
  ),
  kC = ({ globalState: e }) => {
    const [t, n] = w.useState(!1),
      r = "Get more information about Ladle.";
    return A("li", {
      children: z("button", {
        "aria-label": r,
        title: r,
        onClick: () => n(!0),
        className: t ? "ladle-active" : "",
        type: "button",
        children: [
          A(zg, {}),
          A("span", { className: "ladle-addon-tooltip", children: r }),
          A("label", { children: "About Ladle" }),
          z(Fr, {
            isOpen: t,
            close: () => n(!1),
            label: "Dialog with information about Ladle.",
            children: [
              A("h3", { children: "Hotkeys" }),
              e.hotkeys
                ? z(io, {
                    children: [
                      A("ul", {
                        style: {
                          listStyle: "none",
                          marginLeft: 0,
                          paddingLeft: 0,
                        },
                        children: Object.keys(H.hotkeys).map((o) =>
                          H.hotkeys[o].length
                            ? z(
                                "li",
                                {
                                  children: [
                                    A("span", {
                                      style: {
                                        display: "inline-block",
                                        width: "200px",
                                      },
                                      children: H.hotkeys[o].map((i, a) =>
                                        z(
                                          "span",
                                          {
                                            children: [
                                              A(SC, { children: i }),
                                              H.hotkeys[o].length > a + 1
                                                ? " or "
                                                : "",
                                            ],
                                          },
                                          i
                                        )
                                      ),
                                    }),
                                    A("span", {
                                      style: { display: "inline-block" },
                                      children: _C[o],
                                    }),
                                  ],
                                },
                                o
                              )
                            : null
                        ),
                      }),
                      z("p", {
                        children: [
                          "Hotkeys can be disabled through",
                          " ",
                          A(Pn, {
                            children: "Story.meta = { hotkeys: false }",
                          }),
                          ".",
                        ],
                      }),
                    ],
                  })
                : z("p", {
                    children: [
                      "Hotkeys are disabled for this story by",
                      " ",
                      A(Pn, { children: "meta.hotkeys = false" }),
                      ".",
                    ],
                  }),
              z("p", {
                children: [
                  "Ladle is a modern and fast playground for React components powered by Vite. For more information visit",
                  " ",
                  A("a", {
                    href: "https://www.ladle.dev/",
                    children: "ladle.dev",
                  }),
                  " or our",
                  " ",
                  A("a", {
                    href: "https://discord.gg/H6FSHjyW7e",
                    children: "discord",
                  }),
                  ".",
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  DC = async (e, t, n) => {
    const r = await W(() => import("./axe-d9289978.js").then((o) => o.a), []);
    try {
      const o = await r.default.run(document.getElementsByTagName("main"));
      e(o.violations), t(!0), n && n.setAttribute("aria-hidden", "true");
    } catch {}
  },
  xC = ({ violation: e }) => {
    const [t, n] = w.useState(!1);
    return z("li", {
      children: [
        e.help,
        " (",
        e.nodes.length,
        ").",
        " ",
        t
          ? z(io, {
              children: [
                z("ul", {
                  children: [
                    z("li", { children: ["ID: ", e.id] }),
                    z("li", { children: ["Impact: ", e.impact] }),
                    z("li", { children: ["Description: ", e.description] }),
                    A("li", {
                      children: A("a", {
                        href: e.helpUrl,
                        children: "Documentation",
                      }),
                    }),
                  ],
                }),
                A("p", { children: "Violating nodes:" }),
                A("ul", {
                  children: e.nodes.map((r) =>
                    A("li", { children: A(Pn, { children: r.html }) }, r.html)
                  ),
                }),
                A("p", {
                  children: A("a", {
                    href: "#",
                    onClick: () => n(!1),
                    children: "Hide details",
                  }),
                }),
              ],
            })
          : A("a", {
              href: "#",
              onClick: () => n(!0),
              children: "Show details",
            }),
      ],
    });
  },
  FC = ({ reportFinished: e, violations: t }) =>
    e
      ? t.length === 0
        ? z("p", {
            children: [
              "There are no ",
              A("a", {
                href: "https://github.com/dequelabs/axe-core",
                children: "axe",
              }),
              " ",
              "accessibility violations. Good job!",
            ],
          })
        : z(io, {
            children: [
              z("h3", {
                children: [
                  "There are ",
                  t.length,
                  " ",
                  A("a", {
                    href: "https://github.com/dequelabs/axe-core",
                    children: "axe",
                  }),
                  " accessibility violations",
                ],
              }),
              A("ul", {
                children: t.map((n) => A(xC, { violation: n }, n.id)),
              }),
            ],
          })
      : A("p", { children: "Report is loading..." }),
  OC = ({ globalState: e }) => {
    const [t, n] = w.useState(!1),
      [r, o] = w.useState(!1),
      [i, a] = w.useState([]);
    w.useEffect(() => {}, []);
    const s = "Show accessibility report.",
      l = () => {
        DC(a, o, null).catch(console.error), setTimeout(() => n(!t), 100);
      };
    return (
      ct(H.hotkeys.a11y, () => (t ? n(!1) : l()), {
        enabled: e.hotkeys && H.addons.a11y.enabled,
      }),
      A("li", {
        children: z("button", {
          "aria-label": s,
          "data-testid": "addon-a11y",
          title: s,
          onClick: l,
          className: t ? "a11y-active" : "",
          type: "button",
          children: [
            A(Qg, {}),
            A("span", { className: "ladle-addon-tooltip", children: s }),
            A("label", { children: "Accessibility report" }),
            i.length
              ? A("div", { className: "ladle-badge", children: i.length })
              : null,
            A(Fr, {
              isOpen: t,
              close: () => n(!1),
              label: "Dialog with the story accessibility report.",
              children: A(FC, { reportFinished: r, violations: i }),
            }),
          ],
        }),
      })
    );
  },
  TC = (e) => {
    const t = Wt.parse(e).width;
    let n = 0;
    return (
      Object.keys(H.addons.width.options).forEach((r) => {
        (r === t || parseInt(t, 10) === H.addons.width.options[r]) &&
          (n = H.addons.width.options[r]);
      }),
      n !== 0 ? n : H.addons.width.defaultState
    );
  },
  RC = ({ globalState: e, dispatch: t }) => {
    const n = "Change the story viewport.",
      [r, o] = w.useState(!1);
    ct(H.hotkeys.width, () => o((l) => !l), {
      enabled: e.hotkeys && H.addons.width.enabled,
    });
    const i = mn[e.story];
    let a = i && i.meta ? i.meta.meta.width : 0,
      s = H.addons.width.options;
    return (
      Object.keys(s).forEach((l) => {
        l === a && (a = s[l]);
      }),
      a && !Object.values(s).includes(a) && (s = { custom: a, ...s }),
      A("li", {
        children: z("button", {
          "aria-label": n,
          "data-testid": "addon-width",
          title: n,
          onClick: () => o(!0),
          className: r ? "width-active" : "",
          type: "button",
          children: [
            A(Xg, {}),
            A("span", { className: "ladle-addon-tooltip", children: n }),
            A("label", { children: "Set story width" }),
            z(Fr, {
              isOpen: r,
              close: () => o(!1),
              label: "Dialog with the story width selector.",
              children: [
                A("p", { children: "Select story width" }),
                z("div", {
                  children: [
                    A("input", {
                      onChange: () => t({ type: re.UpdateWidth, value: 0 }),
                      type: "radio",
                      id: "width-unset",
                      name: "width",
                      value: 0,
                      checked: e.width === 0,
                    }),
                    A("label", {
                      htmlFor: "width-unset",
                      style: { paddingLeft: "8px" },
                      children: "unset",
                    }),
                  ],
                }),
                Object.keys(s).map((l) =>
                  z(
                    "div",
                    {
                      children: [
                        A("input", {
                          onChange: () =>
                            t({ type: re.UpdateWidth, value: s[l] }),
                          type: "radio",
                          id: `width-${l}`,
                          name: "width",
                          value: s[l],
                          checked: e.width === s[l],
                        }),
                        z("label", {
                          htmlFor: `width-${l}`,
                          style: { paddingLeft: "8px" },
                          children: [s[l], "px - ", l],
                        }),
                      ],
                    },
                    l
                  )
                ),
                A("p", {}),
              ],
            }),
          ],
        }),
      })
    );
  },
  NC = ({ globalState: e, dispatch: t }) =>
    Object.keys(H.addons).every((n) => H.addons[n].enabled === !1)
      ? null
      : A("header", {
          role: "banner",
          className: "ladle-addons",
          children: z("ul", {
            children: [
              H.addons.control.enabled &&
                Object.keys(e.control).length > 0 &&
                A(zE, { globalState: e, dispatch: t }),
              H.addons.theme.enabled && A(QA, { globalState: e, dispatch: t }),
              H.addons.mode.enabled && A(Pw, { globalState: e, dispatch: t }),
              H.addons.width.enabled && A(RC, { globalState: e, dispatch: t }),
              H.addons.rtl.enabled && A(bC, { globalState: e, dispatch: t }),
              H.addons.source.enabled && A(Cw, { globalState: e, dispatch: t }),
              H.addons.a11y.enabled && A(OC, { globalState: e, dispatch: t }),
              H.addons.ladle.enabled && A(kC, { globalState: e, dispatch: t }),
              H.addons.control.enabled &&
                e.action.length > 0 &&
                A(wC, { globalState: e, dispatch: t }),
            ],
          }),
        }),
  BC = (e, t) => {
    switch ((Dt("Action dispatched", t), t.type)) {
      case re.UpdateAll:
        return { ...e, ...t.value };
      case re.UpdateMode:
        return { ...e, mode: t.value };
      case re.UpdateAction:
        const n = { ...e };
        return (
          t.clear && (n.action = []),
          t.value ? { ...e, action: [...n.action, t.value] } : n
        );
      case re.UpdateRtl:
        return { ...e, rtl: t.value };
      case re.UpdateSource:
        return { ...e, source: t.value };
      case re.UpdateStory:
        return {
          ...e,
          story: t.value,
          control: {},
          controlInitialized: !1,
          width: 0,
          action: [],
        };
      case re.UpdateTheme:
        return { ...e, theme: t.value };
      case re.UpdateWidth:
        return { ...e, width: t.value };
      case re.UpdateControl:
        return { ...e, control: t.value, controlInitialized: !0 };
      case re.UpdateControlIntialized:
        return { ...e, controlInitialized: t.value };
      case re.UpdateHotkeys:
        return { ...e, hotkeys: t.value };
      default:
        return e;
    }
  },
  Ys = $2(Object.keys(mn), H.storyOrder);
Dt("Stories found", Ys);
const Tl = (e, t) => ({
    theme: zp(e),
    mode: Lw(e),
    story: I2(e, H.defaultStory),
    rtl: CC(e),
    source: Aw(e),
    width: TC(e),
    control: $p(e, t ? t.control : {}),
    action: [],
    controlInitialized: !1,
    hotkeys: !0,
  }),
  w2 = () => {
    const e = Tl(location.search),
      [t, n] = w.useReducer(BC, e),
      r = w.useRef({});
    let o = "";
    t.control &&
      Object.keys(t.control).forEach((a) => {
        t.control[a].type === "background" && (o = t.control[a].value || "");
      }),
      ct(
        H.hotkeys.fullscreen,
        () => {
          n({
            type: re.UpdateMode,
            value: t.mode === ze.Full ? ze.Preview : ze.Full,
          });
        },
        { preventDefault: !0, enabled: t.hotkeys && H.addons.mode.enabled }
      ),
      w.useEffect(() => {
        document.getElementsByClassName(
          "ladle-background"
        )[0].style.background = o;
      }, [o]),
      w.useEffect(() => {
        r.current = t;
      }),
      w.useEffect(() => {
        window.ladleDispatch = n;
      }, []);
    const i = r.current;
    return (
      w.useEffect(() => {
        var a, s;
        Dt("Global state update", t),
          Km(location.search) || Fl(t),
          Fl(t),
          t.story !== i.story && (document.title = `${P2(t.story)} | Ladle`),
          t.theme !== i.theme &&
            document.documentElement.setAttribute("data-theme", t.theme),
          t.rtl !== i.rtl &&
            (t.rtl
              ? document.documentElement.setAttribute("dir", "rtl")
              : document.documentElement.removeAttribute("dir")),
          t.story && mn[t.story] && mn[t.story].entry.endsWith(".mdx")
            ? document.documentElement.setAttribute("data-mdx", "true")
            : document.documentElement.removeAttribute("data-mdx"),
          t.mode !== i.mode &&
            (document.documentElement.setAttribute("data-mode", t.mode),
            t.mode === ze.Preview
              ? (a = document.getElementById("ladle-root")) == null ||
                a.removeAttribute("class")
              : (s = document.getElementById("ladle-root")) == null ||
                s.setAttribute("class", "ladle-wrapper"));
      }, [t]),
      w.useEffect(() => {
        const a = uh.listen(({ location: s, action: l }) => {
          if (l === Fn.Pop) {
            const u = {};
            Object.keys(t.control).forEach((c) => {
              const m = Tl(s.search, t).control[c];
              u[c] = {
                ...t.control[c],
                value: m ? m.value : t.control[c].defaultValue,
              };
            });
            const d = Tl(s.search, t);
            n({
              type: re.UpdateAll,
              value: {
                ...d,
                control: u,
                controlInitialized: t.story === d.story,
              },
            });
          }
        });
        return () => a();
      }, [t]),
      t.mode === ze.Preview
        ? A(L0.Provider, {
            value: { globalState: t, dispatch: n },
            children: A(f2, { globalState: t, dispatch: n }),
          })
        : z(L0.Provider, {
            value: { globalState: t, dispatch: n },
            children: [
              A("main", {
                className: "ladle-main",
                children:
                  Ys.length > 0
                    ? A(f2, { globalState: t, dispatch: n })
                    : A(kw, {}),
              }),
              A(Iw, {
                stories: Ys,
                hotkeys: t.hotkeys,
                story: t.story,
                updateStory: (a) => {
                  Fl({ ...t, story: a, control: {} }),
                    n({ type: re.UpdateStory, value: a });
                },
              }),
              A(NC, { globalState: t, dispatch: n }),
            ],
          })
    );
  },
  C2 = document.getElementById("ladle-root");
XA && aa ? aa(C2).render(A(w2, {})) : To.render(A(w2, {}), C2);
export {
  IC as $,
  io as F,
  sa as _,
  A as a,
  To as b,
  Wo as c,
  O as e,
  Sr as g,
  z as j,
  w as r,
  LC as y,
};
