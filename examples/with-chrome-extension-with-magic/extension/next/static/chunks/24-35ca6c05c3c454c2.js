(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [24],
  {
    6872: function (e, t, r) {
      e.exports = r(206);
    },
    206: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__assign) ||
          function () {
            return (n =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
        o =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                0 > t.indexOf(n) &&
                (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (
                var o = 0, n = Object.getOwnPropertySymbols(e);
                o < n.length;
                o++
              )
                0 > t.indexOf(n[o]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                  (r[n[o]] = e[n[o]]);
            return r;
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = r(5893),
        a = r(7294).forwardRef(function (e, t) {
          var r = e.isDisabled,
            a = void 0 !== r && r,
            s = e.isFluid,
            l = e.isWaiting,
            u = void 0 !== l && l,
            c = e.waitingText,
            f = e.mode,
            d = void 0 === f ? "fill" : f,
            h = e.label,
            p = e.className,
            v = e.href,
            m = e.children,
            y = o(e, [
              "isDisabled",
              "isFluid",
              "isWaiting",
              "waitingText",
              "mode",
              "label",
              "className",
              "href",
              "children",
            ]),
            g = [p, "button-".concat(d)];
          return (
            void 0 !== s && s && g.push("fluid"),
            (a || u) && g.push("disabled"),
            (0, i.jsx)(
              v || "menu" === d ? "a" : "button",
              n(
                {
                  className: g.join(" ").trim(),
                  disabled: a || u,
                  href: v,
                  ref: t,
                },
                y,
                {
                  children: (0, i.jsxs)(
                    "span",
                    n(
                      { className: "container" },
                      { children: [u ? (void 0 === c ? "..." : c) : h, m] }
                    ),
                    void 0
                  ),
                }
              ),
              void 0
            )
          );
        });
      t.default = a;
    },
    4129: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__assign) ||
          function () {
            return (n =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
        o =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                0 > t.indexOf(n) &&
                (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (
                var o = 0, n = Object.getOwnPropertySymbols(e);
                o < n.length;
                o++
              )
                0 > t.indexOf(n[o]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                  (r[n[o]] = e[n[o]]);
            return r;
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = r(5893);
      t.default = function (e) {
        var t = e.sprite,
          r = e.className,
          a = o(e, ["sprite", "className"]);
        return (0, i.jsx)(
          "i",
          n({ className: ["icon", t, r].join(" ").trim() }, a),
          void 0
        );
      };
    },
    2267: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__assign) ||
          function () {
            return (n =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
        o =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                0 > t.indexOf(n) &&
                (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (
                var o = 0, n = Object.getOwnPropertySymbols(e);
                o < n.length;
                o++
              )
                0 > t.indexOf(n[o]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                  (r[n[o]] = e[n[o]]);
            return r;
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = r(5893),
        a = r(4129);
      t.default = function (e) {
        var t = e.isDisabled,
          r = e.isHelping,
          s = e.isLabelable,
          l = e.helpMode,
          u = void 0 === l ? "warning" : l,
          c = e.helpText,
          f = e.leftIcon,
          d = e.rightIcon,
          h = e.onClickRightIcon,
          p = e.placeholder,
          v = e.className,
          m = e.name,
          y = o(e, [
            "isDisabled",
            "isHelping",
            "isLabelable",
            "helpMode",
            "helpText",
            "leftIcon",
            "rightIcon",
            "onClickRightIcon",
            "placeholder",
            "className",
            "name",
          ]),
          g = [v],
          E = function (e) {
            e.preventDefault(), h && h();
          };
        return (
          f && g.push("typeahead"),
          t && g.push("disabled"),
          r && (g.push("help"), g.push(u)),
          s || g.push("naked"),
          (0, i.jsx)(
            "div",
            n(
              { className: "inputer" },
              {
                children: (0, i.jsxs)(
                  "div",
                  n(
                    { className: "inputer-group" },
                    {
                      children: [
                        (0, i.jsxs)(
                          "div",
                          n(
                            { className: "halo" },
                            {
                              children: [
                                (0, i.jsx)(
                                  "input",
                                  n(
                                    {
                                      name: m,
                                      "aria-label": p,
                                      placeholder: p,
                                      disabled: t,
                                      className: g.join(" ").trim(),
                                    },
                                    y
                                  ),
                                  void 0
                                ),
                                p &&
                                  s &&
                                  (0, i.jsx)(
                                    "label",
                                    n({ htmlFor: m }, { children: p }),
                                    void 0
                                  ),
                                f &&
                                  (0, i.jsx)(
                                    a.default,
                                    {
                                      sprite: f,
                                      className: "action left disabled",
                                    },
                                    void 0
                                  ),
                                d &&
                                  h &&
                                  (0, i.jsx)(
                                    "button",
                                    n(
                                      {
                                        className: "button-link pin right",
                                        onClick: function (e) {
                                          return E(e);
                                        },
                                        type: "button",
                                      },
                                      {
                                        children: (0, i.jsx)(
                                          a.default,
                                          { sprite: d },
                                          void 0
                                        ),
                                      }
                                    ),
                                    void 0
                                  ),
                              ],
                            }
                          ),
                          void 0
                        ),
                        r &&
                          (0, i.jsx)(
                            "span",
                            n(
                              { className: "".concat(u, "-text") },
                              { children: c }
                            ),
                            void 0
                          ),
                      ],
                    }
                  ),
                  void 0
                ),
              }
            ),
            void 0
          )
        );
      };
    },
    9893: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__assign) ||
          function () {
            return (n =
              Object.assign ||
              function (e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                  for (var o in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                return e;
              }).apply(this, arguments);
          },
        o =
          (this && this.__rest) ||
          function (e, t) {
            var r = {};
            for (var n in e)
              Object.prototype.hasOwnProperty.call(e, n) &&
                0 > t.indexOf(n) &&
                (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
              for (
                var o = 0, n = Object.getOwnPropertySymbols(e);
                o < n.length;
                o++
              )
                0 > t.indexOf(n[o]) &&
                  Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                  (r[n[o]] = e[n[o]]);
            return r;
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = r(5893);
      t.default = function (e) {
        var t = e.children,
          r = e.className,
          a = e.subClassName,
          s = e.color,
          l = e.space,
          u = e.container,
          c = e.passDiv,
          f = o(e, [
            "children",
            "className",
            "subClassName",
            "color",
            "space",
            "container",
            "passDiv",
          ]),
          d = [r, void 0 === l ? "pad" : l];
        return (
          s && d.push(s),
          (0, i.jsx)(
            c ? "div" : "section",
            n({ className: d.join(" ").trim() }, f, {
              children: (0, i.jsx)(
                "div",
                n(
                  {
                    className: [a, void 0 === u ? "smush" : u].join(" ").trim(),
                  },
                  { children: t }
                ),
                void 0
              ),
            }),
            void 0
          )
        );
      };
    },
    2048: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__assign) ||
        function () {
          return (n =
            Object.assign ||
            function (e) {
              for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var o in (t = arguments[r]))
                  Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
              return e;
            }).apply(this, arguments);
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isInvalidSchema =
          t.useStatus =
          t.useFormIsValid =
          t.useFormValues =
          t.useForm =
          t.useInputValue =
            void 0);
      var o = r(7294);
      (t.useInputValue = function (e) {
        var t = (0, o.useState)(e),
          r = t[0],
          n = t[1],
          i = (0, o.useState)(""),
          a = i[0],
          s = i[1],
          l = (0, o.useState)(!1),
          u = l[0],
          c = l[1],
          f = function (e) {
            n(e.target.value), c(!0);
          };
        return {
          value: r,
          onChange: f,
          error: a,
          touch: u,
          reset: function () {
            return n("");
          },
          dialog: s,
          setTouch: c,
          setValue: n,
          input: { value: r, onChange: f, helpText: a, isHelping: !!a && !!u },
        };
      }),
        (t.useForm = function (e) {
          var r,
            o = {};
          for (var i in e)
            o = n(n({}, o), (((r = {})[i] = (0, t.useInputValue)(e[i])), r));
          return o;
        }),
        (t.useFormValues = function (e) {
          var t,
            r = {};
          for (var o in e) r = n(n({}, r), (((t = {})[o] = e[o].value), t));
          return r;
        }),
        (t.useFormIsValid = function (e, t) {
          var r = (0, o.useState)(!1),
            n = r[0],
            i = r[1];
          return (
            (0, o.useEffect)(
              function () {
                i(t(e));
              },
              [e]
            ),
            n
          );
        }),
        (t.useStatus = function () {
          var e = (0, o.useState)({
              isWaiting: !1,
              isSubmited: !1,
              info: { isError: !1, message: null },
            }),
            t = e[0],
            r = e[1];
          return {
            state: t,
            message: t.info.message,
            setStatus: r,
            setMessage: function (e) {
              return r(function (t) {
                return n(n({}, t), { info: n(n({}, t.info), { message: e }) });
              });
            },
            setIsWaiting: function (e) {
              return r(function (t) {
                return n(n({}, t), { isWaiting: e });
              });
            },
            setSubmited: function (e) {
              return r(function (t) {
                return n(n({}, t), { isSubmited: e });
              });
            },
            setIsError: function (e) {
              return r(function (t) {
                return n(n({}, t), { info: n(n({}, t.info), { isError: e }) });
              });
            },
            resetStatus: function () {
              r({
                isWaiting: !1,
                isSubmited: !1,
                info: { isError: !1, message: null },
              });
            },
          };
        }),
        (t.isInvalidSchema = function (e) {
          return Object.values(e).some(function (e) {
            return !1 === e;
          });
        });
    },
    4833: function (e, t, r) {
      e.exports = r(2048);
    },
    1728: function (e, t, r) {
      e.exports = r(4129);
    },
    3466: function (e, t, r) {
      e.exports = r(2267);
    },
    9406: function (e, t, r) {
      e.exports = r(9893);
    },
    227: function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getDomainLocale = function (e, t, r, n) {
          return !1;
        }),
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    1551: function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = r(2648).Z,
        o = r(7273).Z,
        i = n(r(7294)),
        a = r(1003),
        s = r(7795),
        l = r(4465),
        u = r(2692),
        c = r(8245),
        f = r(9246),
        d = r(227),
        h = r(3468);
      let p = new Set();
      function v(e, t, r, n) {
        if (a.isLocalURL(t)) {
          if (!n.bypassPrefetchedCheck) {
            let o =
                void 0 !== n.locale
                  ? n.locale
                  : "locale" in e
                  ? e.locale
                  : void 0,
              i = t + "%" + r + "%" + o;
            if (p.has(i)) return;
            p.add(i);
          }
          Promise.resolve(e.prefetch(t, r, n)).catch((e) => {});
        }
      }
      function m(e) {
        return "string" == typeof e ? e : s.formatUrl(e);
      }
      let y = i.default.forwardRef(function (e, t) {
        let r, n;
        let {
            href: s,
            as: p,
            children: y,
            prefetch: g,
            passHref: E,
            replace: b,
            shallow: _,
            scroll: I,
            locale: O,
            onClick: w,
            onMouseEnter: N,
            onTouchStart: S,
            legacyBehavior: R = !0 !== Boolean(!0),
          } = e,
          A = o(e, [
            "href",
            "as",
            "children",
            "prefetch",
            "passHref",
            "replace",
            "shallow",
            "scroll",
            "locale",
            "onClick",
            "onMouseEnter",
            "onTouchStart",
            "legacyBehavior",
          ]);
        (r = y),
          R &&
            ("string" == typeof r || "number" == typeof r) &&
            (r = i.default.createElement("a", null, r));
        let T = !1 !== g,
          L = i.default.useContext(u.RouterContext),
          M = i.default.useContext(c.AppRouterContext),
          j = null != L ? L : M,
          $ = !L,
          { href: P, as: C } = i.default.useMemo(() => {
            if (!L) {
              let e = m(s);
              return { href: e, as: p ? m(p) : e };
            }
            let [t, r] = a.resolveHref(L, s, !0);
            return { href: t, as: p ? a.resolveHref(L, p) : r || t };
          }, [L, s, p]),
          x = i.default.useRef(P),
          D = i.default.useRef(C);
        R && (n = i.default.Children.only(r));
        let k = R ? n && "object" == typeof n && n.ref : t,
          [U, F, B] = f.useIntersection({ rootMargin: "200px" }),
          G = i.default.useCallback(
            (e) => {
              (D.current !== C || x.current !== P) &&
                (B(), (D.current = C), (x.current = P)),
                U(e),
                k &&
                  ("function" == typeof k
                    ? k(e)
                    : "object" == typeof k && (k.current = e));
            },
            [C, k, P, B, U]
          );
        i.default.useEffect(() => {
          j && F && T && v(j, P, C, { locale: O });
        }, [C, P, F, O, T, null == L ? void 0 : L.locale, j]);
        let W = {
          ref: G,
          onClick(e) {
            R || "function" != typeof w || w(e),
              R &&
                n.props &&
                "function" == typeof n.props.onClick &&
                n.props.onClick(e),
              j &&
                !e.defaultPrevented &&
                (function (e, t, r, n, o, s, l, u, c, f) {
                  let { nodeName: d } = e.currentTarget,
                    h = "A" === d.toUpperCase();
                  if (
                    h &&
                    ((function (e) {
                      let { target: t } = e.currentTarget;
                      return (
                        (t && "_self" !== t) ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey ||
                        e.altKey ||
                        (e.nativeEvent && 2 === e.nativeEvent.which)
                      );
                    })(e) ||
                      !a.isLocalURL(r))
                  )
                    return;
                  e.preventDefault();
                  let p = () => {
                    "beforePopState" in t
                      ? t[o ? "replace" : "push"](r, n, {
                          shallow: s,
                          locale: u,
                          scroll: l,
                        })
                      : t[o ? "replace" : "push"](n || r, {
                          forceOptimisticNavigation: !f,
                        });
                  };
                  c ? i.default.startTransition(p) : p();
                })(e, j, P, C, b, _, I, O, $, T);
          },
          onMouseEnter(e) {
            R || "function" != typeof N || N(e),
              R &&
                n.props &&
                "function" == typeof n.props.onMouseEnter &&
                n.props.onMouseEnter(e),
              j &&
                (T || !$) &&
                v(j, P, C, {
                  locale: O,
                  priority: !0,
                  bypassPrefetchedCheck: !0,
                });
          },
          onTouchStart(e) {
            R || "function" != typeof S || S(e),
              R &&
                n.props &&
                "function" == typeof n.props.onTouchStart &&
                n.props.onTouchStart(e),
              j &&
                (T || !$) &&
                v(j, P, C, {
                  locale: O,
                  priority: !0,
                  bypassPrefetchedCheck: !0,
                });
          },
        };
        if (!R || E || ("a" === n.type && !("href" in n.props))) {
          let H = void 0 !== O ? O : null == L ? void 0 : L.locale,
            q =
              (null == L ? void 0 : L.isLocaleDomain) &&
              d.getDomainLocale(
                C,
                H,
                null == L ? void 0 : L.locales,
                null == L ? void 0 : L.domainLocales
              );
          W.href =
            q ||
            h.addBasePath(
              l.addLocale(C, H, null == L ? void 0 : L.defaultLocale)
            );
        }
        return R
          ? i.default.cloneElement(n, W)
          : i.default.createElement("a", Object.assign({}, A, W), r);
      });
      (t.default = y),
        ("function" == typeof t.default ||
          ("object" == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, "__esModule", { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    9246: function (e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.useIntersection = function (e) {
          let { rootRef: t, rootMargin: r, disabled: l } = e,
            u = l || !i,
            [c, f] = n.useState(!1),
            [d, h] = n.useState(null);
          n.useEffect(() => {
            if (i) {
              if (!u && !c && d && d.tagName) {
                let e = (function (e, t, r) {
                  let {
                    id: n,
                    observer: o,
                    elements: i,
                  } = (function (e) {
                    let t;
                    let r = {
                        root: e.root || null,
                        margin: e.rootMargin || "",
                      },
                      n = s.find(
                        (e) => e.root === r.root && e.margin === r.margin
                      );
                    if (n && (t = a.get(n))) return t;
                    let o = new Map(),
                      i = new IntersectionObserver((e) => {
                        e.forEach((e) => {
                          let t = o.get(e.target),
                            r = e.isIntersecting || e.intersectionRatio > 0;
                          t && r && t(r);
                        });
                      }, e);
                    return (
                      (t = { id: r, observer: i, elements: o }),
                      s.push(r),
                      a.set(r, t),
                      t
                    );
                  })(r);
                  return (
                    i.set(e, t),
                    o.observe(e),
                    function () {
                      if ((i.delete(e), o.unobserve(e), 0 === i.size)) {
                        o.disconnect(), a.delete(n);
                        let t = s.findIndex(
                          (e) => e.root === n.root && e.margin === n.margin
                        );
                        t > -1 && s.splice(t, 1);
                      }
                    }
                  );
                })(d, (e) => e && f(e), {
                  root: null == t ? void 0 : t.current,
                  rootMargin: r,
                });
                return e;
              }
            } else if (!c) {
              let n = o.requestIdleCallback(() => f(!0));
              return () => o.cancelIdleCallback(n);
            }
          }, [d, u, r, t, c]);
          let p = n.useCallback(() => {
            f(!1);
          }, []);
          return [h, c, p];
        });
      var n = r(7294),
        o = r(4686);
      let i = "function" == typeof IntersectionObserver,
        a = new Map(),
        s = [];
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    9008: function (e, t, r) {
      r(3121);
    },
    1664: function (e, t, r) {
      r(1551);
    },
    4155: function (e) {
      var t,
        r,
        n,
        o = (e.exports = {});
      function i() {
        throw Error("setTimeout has not been defined");
      }
      function a() {
        throw Error("clearTimeout has not been defined");
      }
      function s(e) {
        if (t === setTimeout) return setTimeout(e, 0);
        if ((t === i || !t) && setTimeout)
          return (t = setTimeout), setTimeout(e, 0);
        try {
          return t(e, 0);
        } catch (n) {
          try {
            return t.call(null, e, 0);
          } catch (r) {
            return t.call(this, e, 0);
          }
        }
      }
      !(function () {
        try {
          t = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          t = i;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : a;
        } catch (n) {
          r = a;
        }
      })();
      var l = [],
        u = !1,
        c = -1;
      function f() {
        u &&
          n &&
          ((u = !1), n.length ? (l = n.concat(l)) : (c = -1), l.length && d());
      }
      function d() {
        if (!u) {
          var e = s(f);
          u = !0;
          for (var t = l.length; t; ) {
            for (n = l, l = []; ++c < t; ) n && n[c].run();
            (c = -1), (t = l.length);
          }
          (n = null),
            (u = !1),
            (function (e) {
              if (r === clearTimeout) return clearTimeout(e);
              if ((r === a || !r) && clearTimeout)
                return (r = clearTimeout), clearTimeout(e);
              try {
                r(e);
              } catch (n) {
                try {
                  return r.call(null, e);
                } catch (t) {
                  return r.call(this, e);
                }
              }
            })(e);
        }
      }
      function h(e, t) {
        (this.fun = e), (this.array = t);
      }
      function p() {}
      (o.nextTick = function (e) {
        var t = Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        l.push(new h(e, t)), 1 !== l.length || u || s(d);
      }),
        (h.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (o.title = "browser"),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ""),
        (o.versions = {}),
        (o.on = p),
        (o.addListener = p),
        (o.once = p),
        (o.off = p),
        (o.removeListener = p),
        (o.removeAllListeners = p),
        (o.emit = p),
        (o.prependListener = p),
        (o.prependOnceListener = p),
        (o.listeners = function (e) {
          return [];
        }),
        (o.binding = function (e) {
          throw Error("process.binding is not supported");
        }),
        (o.cwd = function () {
          return "/";
        }),
        (o.chdir = function (e) {
          throw Error("process.chdir is not supported");
        }),
        (o.umask = function () {
          return 0;
        });
    },
    2083: function (e, t, r) {
      "use strict";
      let n;
      r.d(t, {
        s$: function () {
          return tJ;
        },
      });
      var o,
        i,
        a,
        s,
        l,
        u,
        c,
        f,
        d,
        h,
        p,
        v,
        m,
        y =
          (((h = y || {}).MissingApiKey = "MISSING_API_KEY"),
          (h.ModalNotReady = "MODAL_NOT_READY"),
          (h.MalformedResponse = "MALFORMED_RESPONSE"),
          (h.InvalidArgument = "INVALID_ARGUMENT"),
          (h.ExtensionNotInitialized = "EXTENSION_NOT_INITIALIZED"),
          (h.IncompatibleExtensions = "INCOMPATIBLE_EXTENSIONS"),
          h),
        g =
          (((p = g || {}).SyncWeb3Method = "SYNC_WEB3_METHOD"),
          (p.DuplicateIframe = "DUPLICATE_IFRAME"),
          (p.ReactNativeEndpointConfiguration =
            "REACT_NATIVE_ENDPOINT_CONFIGURATION"),
          (p.DeprecationNotice = "DEPRECATION_NOTICE"),
          p),
        E =
          (((v = E || {})[(v.ParseError = -32700)] = "ParseError"),
          (v[(v.InvalidRequest = -32600)] = "InvalidRequest"),
          (v[(v.MethodNotFound = -32601)] = "MethodNotFound"),
          (v[(v.InvalidParams = -32602)] = "InvalidParams"),
          (v[(v.InternalError = -32603)] = "InternalError"),
          (v[(v.MagicLinkFailedVerification = -1e4)] =
            "MagicLinkFailedVerification"),
          (v[(v.MagicLinkExpired = -10001)] = "MagicLinkExpired"),
          (v[(v.MagicLinkRateLimited = -10002)] = "MagicLinkRateLimited"),
          (v[(v.MagicLinkInvalidRedirectURL = -10006)] =
            "MagicLinkInvalidRedirectURL"),
          (v[(v.UserAlreadyLoggedIn = -10003)] = "UserAlreadyLoggedIn"),
          (v[(v.UpdateEmailFailed = -10004)] = "UpdateEmailFailed"),
          (v[(v.UserRequestEditEmail = -10005)] = "UserRequestEditEmail"),
          (v[(v.InactiveRecipient = -10010)] = "InactiveRecipient"),
          (v[(v.AccessDeniedToUser = -10011)] = "AccessDeniedToUser"),
          v),
        b =
          (((i = b || {}).LoginWithSms = "magic_auth_login_with_sms"),
          (i.LoginWithEmailOTP = "magic_auth_login_with_email_otp"),
          (i.LoginWithMagicLink = "magic_auth_login_with_magic_link"),
          (i.LoginWithCredential = "magic_auth_login_with_credential"),
          (i.GetIdToken = "magic_auth_get_id_token"),
          (i.GenerateIdToken = "magic_auth_generate_id_token"),
          (i.GetMetadata = "magic_auth_get_metadata"),
          (i.IsLoggedIn = "magic_auth_is_logged_in"),
          (i.Logout = "magic_auth_logout"),
          (i.UpdateEmail = "magic_auth_update_email"),
          (i.UserSettings = "magic_auth_settings"),
          (i.UserSettingsTestMode = "magic_auth_settings_testing_mode"),
          (i.LoginWithSmsTestMode = "magic_auth_login_with_sms_testing_mode"),
          (i.LoginWithEmailOTPTestMode =
            "magic_auth_login_with_email_otp_testing_mode"),
          (i.LoginWithMagicLinkTestMode =
            "magic_login_with_magic_link_testing_mode"),
          (i.LoginWithCredentialTestMode =
            "magic_auth_login_with_credential_testing_mode"),
          (i.GetIdTokenTestMode = "magic_auth_get_id_token_testing_mode"),
          (i.GenerateIdTokenTestMode =
            "magic_auth_generate_id_token_testing_mode"),
          (i.GetMetadataTestMode = "magic_auth_get_metadata_testing_mode"),
          (i.IsLoggedInTestMode = "magic_auth_is_logged_in_testing_mode"),
          (i.LogoutTestMode = "magic_auth_logout_testing_mode"),
          (i.UpdateEmailTestMode = "magic_auth_update_email_testing_mode"),
          (i.IntermediaryEvent = "magic_intermediary_event"),
          i),
        _ =
          (((a = _ || {}).MAGIC_HANDLE_RESPONSE = "MAGIC_HANDLE_RESPONSE"),
          (a.MAGIC_OVERLAY_READY = "MAGIC_OVERLAY_READY"),
          (a.MAGIC_SHOW_OVERLAY = "MAGIC_SHOW_OVERLAY"),
          (a.MAGIC_HIDE_OVERLAY = "MAGIC_HIDE_OVERLAY"),
          (a.MAGIC_HANDLE_EVENT = "MAGIC_HANDLE_EVENT"),
          a),
        I = (((s = I || {}).MAGIC_HANDLE_REQUEST = "MAGIC_HANDLE_REQUEST"), s),
        O = (((l = O || {}).Harmony = "HARMONY"), l),
        w = r(4155),
        N = Object.create,
        S = Object.defineProperty,
        R = Object.defineProperties,
        A = Object.getOwnPropertyDescriptor,
        T = Object.getOwnPropertyDescriptors,
        L = Object.getOwnPropertyNames,
        M = Object.getOwnPropertySymbols,
        j = Object.getPrototypeOf,
        $ = Object.prototype.hasOwnProperty,
        P = Object.prototype.propertyIsEnumerable,
        C = (e, t, r) =>
          t in e
            ? S(e, t, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: r,
              })
            : (e[t] = r),
        x = (e, t) => {
          for (var r in t || (t = {})) $.call(t, r) && C(e, r, t[r]);
          if (M) for (var r of M(t)) P.call(t, r) && C(e, r, t[r]);
          return e;
        },
        D = (e, t) => R(e, T(t)),
        k = (e, t, r) =>
          new Promise((n, o) => {
            var i = (e) => {
                try {
                  s(r.next(e));
                } catch (t) {
                  o(t);
                }
              },
              a = (e) => {
                try {
                  s(r.throw(e));
                } catch (t) {
                  o(t);
                }
              },
              s = (e) =>
                e.done ? n(e.value) : Promise.resolve(e.value).then(i, a);
            s((r = r.apply(e, t)).next());
          }),
        U =
          ((u = (e, t) => {
            var r = Object.prototype.hasOwnProperty,
              n = "~";
            function o() {}
            function i(e, t, r) {
              (this.fn = e), (this.context = t), (this.once = r || !1);
            }
            function a(e, t, r, o, a) {
              if ("function" != typeof r)
                throw TypeError("The listener must be a function");
              var s = new i(r, o || e, a),
                l = n ? n + t : t;
              return (
                e._events[l]
                  ? e._events[l].fn
                    ? (e._events[l] = [e._events[l], s])
                    : e._events[l].push(s)
                  : ((e._events[l] = s), e._eventsCount++),
                e
              );
            }
            function s(e, t) {
              0 == --e._eventsCount
                ? (e._events = new o())
                : delete e._events[t];
            }
            function l() {
              (this._events = new o()), (this._eventsCount = 0);
            }
            Object.create &&
              ((o.prototype = Object.create(null)),
              new o().__proto__ || (n = !1)),
              (l.prototype.eventNames = function () {
                var e,
                  t,
                  o = [];
                if (0 === this._eventsCount) return o;
                for (t in (e = this._events))
                  r.call(e, t) && o.push(n ? t.slice(1) : t);
                return Object.getOwnPropertySymbols
                  ? o.concat(Object.getOwnPropertySymbols(e))
                  : o;
              }),
              (l.prototype.listeners = function (e) {
                var t = n ? n + e : e,
                  r = this._events[t];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var o = 0, i = r.length, a = Array(i); o < i; o++)
                  a[o] = r[o].fn;
                return a;
              }),
              (l.prototype.listenerCount = function (e) {
                var t = n ? n + e : e,
                  r = this._events[t];
                return r ? (r.fn ? 1 : r.length) : 0;
              }),
              (l.prototype.emit = function (e, t, r, o, i, a) {
                var s = n ? n + e : e;
                if (!this._events[s]) return !1;
                var l,
                  u,
                  c = this._events[s],
                  f = arguments.length;
                if (c.fn) {
                  switch (
                    (c.once && this.removeListener(e, c.fn, void 0, !0), f)
                  ) {
                    case 1:
                      return c.fn.call(c.context), !0;
                    case 2:
                      return c.fn.call(c.context, t), !0;
                    case 3:
                      return c.fn.call(c.context, t, r), !0;
                    case 4:
                      return c.fn.call(c.context, t, r, o), !0;
                    case 5:
                      return c.fn.call(c.context, t, r, o, i), !0;
                    case 6:
                      return c.fn.call(c.context, t, r, o, i, a), !0;
                  }
                  for (u = 1, l = Array(f - 1); u < f; u++)
                    l[u - 1] = arguments[u];
                  c.fn.apply(c.context, l);
                } else {
                  var d,
                    h = c.length;
                  for (u = 0; u < h; u++)
                    switch (
                      (c[u].once && this.removeListener(e, c[u].fn, void 0, !0),
                      f)
                    ) {
                      case 1:
                        c[u].fn.call(c[u].context);
                        break;
                      case 2:
                        c[u].fn.call(c[u].context, t);
                        break;
                      case 3:
                        c[u].fn.call(c[u].context, t, r);
                        break;
                      case 4:
                        c[u].fn.call(c[u].context, t, r, o);
                        break;
                      default:
                        if (!l)
                          for (d = 1, l = Array(f - 1); d < f; d++)
                            l[d - 1] = arguments[d];
                        c[u].fn.apply(c[u].context, l);
                    }
                }
                return !0;
              }),
              (l.prototype.on = function (e, t, r) {
                return a(this, e, t, r, !1);
              }),
              (l.prototype.once = function (e, t, r) {
                return a(this, e, t, r, !0);
              }),
              (l.prototype.removeListener = function (e, t, r, o) {
                var i = n ? n + e : e;
                if (!this._events[i]) return this;
                if (!t) return s(this, i), this;
                var a = this._events[i];
                if (a.fn)
                  a.fn !== t ||
                    (o && !a.once) ||
                    (r && a.context !== r) ||
                    s(this, i);
                else {
                  for (var l = 0, u = [], c = a.length; l < c; l++)
                    (a[l].fn !== t ||
                      (o && !a[l].once) ||
                      (r && a[l].context !== r)) &&
                      u.push(a[l]);
                  u.length
                    ? (this._events[i] = 1 === u.length ? u[0] : u)
                    : s(this, i);
                }
                return this;
              }),
              (l.prototype.removeAllListeners = function (e) {
                var t;
                return (
                  e
                    ? ((t = n ? n + e : e), this._events[t] && s(this, t))
                    : ((this._events = new o()), (this._eventsCount = 0)),
                  this
                );
              }),
              (l.prototype.off = l.prototype.removeListener),
              (l.prototype.addListener = l.prototype.on),
              (l.prefixed = n),
              (l.EventEmitter = l),
              void 0 !== t && (t.exports = l);
          }),
          () => (c || u((c = { exports: {} }).exports, c), c.exports)),
        F = {
          SEMVER_SPEC_VERSION: "2.0.0",
          MAX_LENGTH: 256,
          MAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER || 9007199254740991,
          MAX_SAFE_COMPONENT_LENGTH: 16,
        },
        B =
          "object" == typeof w &&
          w.env &&
          w.env.NODE_DEBUG &&
          /\bsemver\b/i.test(w.env.NODE_DEBUG)
            ? (...e) => console.error("SEMVER", ...e)
            : () => {},
        G =
          ((function (e, t) {
            let { MAX_SAFE_COMPONENT_LENGTH: r } = F,
              n = ((t = e.exports = {}).re = []),
              o = (t.src = []),
              i = (t.t = {}),
              a = 0,
              s = (e, t, r) => {
                let s = a++;
                B(s, t),
                  (i[e] = s),
                  (o[s] = t),
                  (n[s] = RegExp(t, r ? "g" : void 0));
              };
            s("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
              s("NUMERICIDENTIFIERLOOSE", "[0-9]+"),
              s("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"),
              s(
                "MAINVERSION",
                `(${o[i.NUMERICIDENTIFIER]})\\.(${o[i.NUMERICIDENTIFIER]})\\.(${
                  o[i.NUMERICIDENTIFIER]
                })`
              ),
              s(
                "MAINVERSIONLOOSE",
                `(${o[i.NUMERICIDENTIFIERLOOSE]})\\.(${
                  o[i.NUMERICIDENTIFIERLOOSE]
                })\\.(${o[i.NUMERICIDENTIFIERLOOSE]})`
              ),
              s(
                "PRERELEASEIDENTIFIER",
                `(?:${o[i.NUMERICIDENTIFIER]}|${o[i.NONNUMERICIDENTIFIER]})`
              ),
              s(
                "PRERELEASEIDENTIFIERLOOSE",
                `(?:${o[i.NUMERICIDENTIFIERLOOSE]}|${
                  o[i.NONNUMERICIDENTIFIER]
                })`
              ),
              s(
                "PRERELEASE",
                `(?:-(${o[i.PRERELEASEIDENTIFIER]}(?:\\.${
                  o[i.PRERELEASEIDENTIFIER]
                })*))`
              ),
              s(
                "PRERELEASELOOSE",
                `(?:-?(${o[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
                  o[i.PRERELEASEIDENTIFIERLOOSE]
                })*))`
              ),
              s("BUILDIDENTIFIER", "[0-9A-Za-z-]+"),
              s(
                "BUILD",
                `(?:\\+(${o[i.BUILDIDENTIFIER]}(?:\\.${
                  o[i.BUILDIDENTIFIER]
                })*))`
              ),
              s(
                "FULLPLAIN",
                `v?${o[i.MAINVERSION]}${o[i.PRERELEASE]}?${o[i.BUILD]}?`
              ),
              s("FULL", `^${o[i.FULLPLAIN]}$`),
              s(
                "LOOSEPLAIN",
                `[v=\\s]*${o[i.MAINVERSIONLOOSE]}${o[i.PRERELEASELOOSE]}?${
                  o[i.BUILD]
                }?`
              ),
              s("LOOSE", `^${o[i.LOOSEPLAIN]}$`),
              s("GTLT", "((?:<|>)?=?)"),
              s(
                "XRANGEIDENTIFIERLOOSE",
                `${o[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`
              ),
              s("XRANGEIDENTIFIER", `${o[i.NUMERICIDENTIFIER]}|x|X|\\*`),
              s(
                "XRANGEPLAIN",
                `[v=\\s]*(${o[i.XRANGEIDENTIFIER]})(?:\\.(${
                  o[i.XRANGEIDENTIFIER]
                })(?:\\.(${o[i.XRANGEIDENTIFIER]})(?:${o[i.PRERELEASE]})?${
                  o[i.BUILD]
                }?)?)?`
              ),
              s(
                "XRANGEPLAINLOOSE",
                `[v=\\s]*(${o[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
                  o[i.XRANGEIDENTIFIERLOOSE]
                })(?:\\.(${o[i.XRANGEIDENTIFIERLOOSE]})(?:${
                  o[i.PRERELEASELOOSE]
                })?${o[i.BUILD]}?)?)?`
              ),
              s("XRANGE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAIN]}$`),
              s("XRANGELOOSE", `^${o[i.GTLT]}\\s*${o[i.XRANGEPLAINLOOSE]}$`),
              s(
                "COERCE",
                `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?(?:$|[^\\d])`
              ),
              s("COERCERTL", o[i.COERCE], !0),
              s("LONETILDE", "(?:~>?)"),
              s("TILDETRIM", `(\\s*)${o[i.LONETILDE]}\\s+`, !0),
              (t.tildeTrimReplace = "$1~"),
              s("TILDE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAIN]}$`),
              s("TILDELOOSE", `^${o[i.LONETILDE]}${o[i.XRANGEPLAINLOOSE]}$`),
              s("LONECARET", "(?:\\^)"),
              s("CARETTRIM", `(\\s*)${o[i.LONECARET]}\\s+`, !0),
              (t.caretTrimReplace = "$1^"),
              s("CARET", `^${o[i.LONECARET]}${o[i.XRANGEPLAIN]}$`),
              s("CARETLOOSE", `^${o[i.LONECARET]}${o[i.XRANGEPLAINLOOSE]}$`),
              s("COMPARATORLOOSE", `^${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]})$|^$`),
              s("COMPARATOR", `^${o[i.GTLT]}\\s*(${o[i.FULLPLAIN]})$|^$`),
              s(
                "COMPARATORTRIM",
                `(\\s*)${o[i.GTLT]}\\s*(${o[i.LOOSEPLAIN]}|${
                  o[i.XRANGEPLAIN]
                })`,
                !0
              ),
              (t.comparatorTrimReplace = "$1$2$3"),
              s(
                "HYPHENRANGE",
                `^\\s*(${o[i.XRANGEPLAIN]})\\s+-\\s+(${o[i.XRANGEPLAIN]})\\s*$`
              ),
              s(
                "HYPHENRANGELOOSE",
                `^\\s*(${o[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${
                  o[i.XRANGEPLAINLOOSE]
                })\\s*$`
              ),
              s("STAR", "(<|>)?=?\\s*\\*"),
              s("GTE0", "^\\s*>=\\s*0.0.0\\s*$"),
              s("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
          })((n = { exports: {} }), n.exports),
          n.exports),
        W = /^[0-9]+$/,
        H = (e, t) => {
          let r = W.test(e),
            n = W.test(t);
          return (
            r && n && ((e = +e), (t = +t)),
            e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
          );
        },
        q = (e, t) => H(t, e),
        { MAX_LENGTH: z, MAX_SAFE_INTEGER: V } = F,
        { re: X, t: K } = G,
        { compareIdentifiers: Y } = {
          compareIdentifiers: H,
          rcompareIdentifiers: q,
        },
        J = class {
          constructor(e, t) {
            if (
              ((t && "object" == typeof t) ||
                (t = { loose: !!t, includePrerelease: !1 }),
              e instanceof J)
            ) {
              if (
                !!t.loose === e.loose &&
                !!t.includePrerelease === e.includePrerelease
              )
                return e;
              e = e.version;
            } else if ("string" != typeof e)
              throw TypeError(`Invalid Version: ${e}`);
            if (e.length > z)
              throw TypeError(`version is longer than ${z} characters`);
            B("SemVer", e, t),
              (this.options = t),
              (this.loose = !!t.loose),
              (this.includePrerelease = !!t.includePrerelease);
            let r = e.trim().match(t.loose ? X[K.LOOSE] : X[K.FULL]);
            if (!r) throw TypeError(`Invalid Version: ${e}`);
            if (
              ((this.raw = e),
              (this.major = +r[1]),
              (this.minor = +r[2]),
              (this.patch = +r[3]),
              this.major > V || this.major < 0)
            )
              throw TypeError("Invalid major version");
            if (this.minor > V || this.minor < 0)
              throw TypeError("Invalid minor version");
            if (this.patch > V || this.patch < 0)
              throw TypeError("Invalid patch version");
            r[4]
              ? (this.prerelease = r[4].split(".").map((e) => {
                  if (/^[0-9]+$/.test(e)) {
                    let t = +e;
                    if (t >= 0 && t < V) return t;
                  }
                  return e;
                }))
              : (this.prerelease = []),
              (this.build = r[5] ? r[5].split(".") : []),
              this.format();
          }
          format() {
            return (
              (this.version = `${this.major}.${this.minor}.${this.patch}`),
              this.prerelease.length &&
                (this.version += `-${this.prerelease.join(".")}`),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(e) {
            if (
              (B("SemVer.compare", this.version, this.options, e),
              !(e instanceof J))
            ) {
              if ("string" == typeof e && e === this.version) return 0;
              e = new J(e, this.options);
            }
            return e.version === this.version
              ? 0
              : this.compareMain(e) || this.comparePre(e);
          }
          compareMain(e) {
            return (
              e instanceof J || (e = new J(e, this.options)),
              Y(this.major, e.major) ||
                Y(this.minor, e.minor) ||
                Y(this.patch, e.patch)
            );
          }
          comparePre(e) {
            if (
              (e instanceof J || (e = new J(e, this.options)),
              this.prerelease.length && !e.prerelease.length)
            )
              return -1;
            if (!this.prerelease.length && e.prerelease.length) return 1;
            if (!this.prerelease.length && !e.prerelease.length) return 0;
            let t = 0;
            do {
              let r = this.prerelease[t],
                n = e.prerelease[t];
              if (
                (B("prerelease compare", t, r, n), void 0 === r && void 0 === n)
              )
                return 0;
              if (void 0 === n) return 1;
              if (void 0 === r) return -1;
              if (r !== n) return Y(r, n);
            } while (++t);
          }
          compareBuild(e) {
            e instanceof J || (e = new J(e, this.options));
            let t = 0;
            do {
              let r = this.build[t],
                n = e.build[t];
              if (
                (B("prerelease compare", t, r, n), void 0 === r && void 0 === n)
              )
                return 0;
              if (void 0 === n) return 1;
              if (void 0 === r) return -1;
              if (r !== n) return Y(r, n);
            } while (++t);
          }
          inc(e, t) {
            switch (e) {
              case "premajor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  (this.minor = 0),
                  this.major++,
                  this.inc("pre", t);
                break;
              case "preminor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  this.minor++,
                  this.inc("pre", t);
                break;
              case "prepatch":
                (this.prerelease.length = 0),
                  this.inc("patch", t),
                  this.inc("pre", t);
                break;
              case "prerelease":
                0 === this.prerelease.length && this.inc("patch", t),
                  this.inc("pre", t);
                break;
              case "major":
                (0 === this.minor &&
                  0 === this.patch &&
                  0 !== this.prerelease.length) ||
                  this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "minor":
                (0 === this.patch && 0 !== this.prerelease.length) ||
                  this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "patch":
                0 === this.prerelease.length && this.patch++,
                  (this.prerelease = []);
                break;
              case "pre":
                if (0 === this.prerelease.length) this.prerelease = [0];
                else {
                  let r = this.prerelease.length;
                  for (; --r >= 0; )
                    "number" == typeof this.prerelease[r] &&
                      (this.prerelease[r]++, (r = -2));
                  -1 === r && this.prerelease.push(0);
                }
                t &&
                  (this.prerelease[0] === t
                    ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0])
                    : (this.prerelease = [t, 0]));
                break;
              default:
                throw Error(`invalid increment argument: ${e}`);
            }
            return this.format(), (this.raw = this.version), this;
          }
        },
        Q = (e, t, r) => new J(e, r).compare(new J(t, r)),
        Z = (e, t, r) => 0 === Q(e, t, r),
        ee = (e, t, r) => 0 !== Q(e, t, r),
        et = (e, t, r) => Q(e, t, r) > 0,
        er = (e, t, r) => Q(e, t, r) >= 0,
        en = (e, t, r) => 0 > Q(e, t, r),
        eo = (e, t, r) => 0 >= Q(e, t, r),
        ei = (e, t, r, n) => {
          switch (t) {
            case "===":
              return (
                "object" == typeof e && (e = e.version),
                "object" == typeof r && (r = r.version),
                e === r
              );
            case "!==":
              return (
                "object" == typeof e && (e = e.version),
                "object" == typeof r && (r = r.version),
                e !== r
              );
            case "":
            case "=":
            case "==":
              return Z(e, r, n);
            case "!=":
              return ee(e, r, n);
            case ">":
              return et(e, r, n);
            case ">=":
              return er(e, r, n);
            case "<":
              return en(e, r, n);
            case "<=":
              return eo(e, r, n);
            default:
              throw TypeError(`Invalid operator: ${t}`);
          }
        },
        ea = Symbol("SemVer ANY"),
        es = class {
          static get ANY() {
            return ea;
          }
          constructor(e, t) {
            if (
              ((t && "object" == typeof t) ||
                (t = { loose: !!t, includePrerelease: !1 }),
              e instanceof es)
            ) {
              if (!!t.loose === e.loose) return e;
              e = e.value;
            }
            B("comparator", e, t),
              (this.options = t),
              (this.loose = !!t.loose),
              this.parse(e),
              this.semver === ea
                ? (this.value = "")
                : (this.value = this.operator + this.semver.version),
              B("comp", this);
          }
          parse(e) {
            let t = this.options.loose
                ? el[eu.COMPARATORLOOSE]
                : el[eu.COMPARATOR],
              r = e.match(t);
            if (!r) throw TypeError(`Invalid comparator: ${e}`);
            (this.operator = void 0 !== r[1] ? r[1] : ""),
              "=" === this.operator && (this.operator = ""),
              r[2]
                ? (this.semver = new J(r[2], this.options.loose))
                : (this.semver = ea);
          }
          toString() {
            return this.value;
          }
          test(e) {
            if (
              (B("Comparator.test", e, this.options.loose),
              this.semver === ea || e === ea)
            )
              return !0;
            if ("string" == typeof e)
              try {
                e = new J(e, this.options);
              } catch (t) {
                return !1;
              }
            return ei(e, this.operator, this.semver, this.options);
          }
          intersects(e, t) {
            if (!(e instanceof es)) throw TypeError("a Comparator is required");
            if (
              ((t && "object" == typeof t) ||
                (t = { loose: !!t, includePrerelease: !1 }),
              "" === this.operator)
            )
              return "" === this.value || new ec(e.value, t).test(this.value);
            if ("" === e.operator)
              return "" === e.value || new ec(this.value, t).test(e.semver);
            let r = !(
                (">=" !== this.operator && ">" !== this.operator) ||
                (">=" !== e.operator && ">" !== e.operator)
              ),
              n = !(
                ("<=" !== this.operator && "<" !== this.operator) ||
                ("<=" !== e.operator && "<" !== e.operator)
              ),
              o = this.semver.version === e.semver.version,
              i = !(
                (">=" !== this.operator && "<=" !== this.operator) ||
                (">=" !== e.operator && "<=" !== e.operator)
              ),
              a =
                ei(this.semver, "<", e.semver, t) &&
                (">=" === this.operator || ">" === this.operator) &&
                ("<=" === e.operator || "<" === e.operator),
              s =
                ei(this.semver, ">", e.semver, t) &&
                ("<=" === this.operator || "<" === this.operator) &&
                (">=" === e.operator || ">" === e.operator);
            return r || n || (o && i) || a || s;
          }
        },
        { re: el, t: eu } = G,
        ec = class {
          constructor(e, t) {
            if (
              ((t && "object" == typeof t) ||
                (t = { loose: !!t, includePrerelease: !1 }),
              e instanceof ec)
            )
              return !!t.loose === e.loose &&
                !!t.includePrerelease === e.includePrerelease
                ? e
                : new ec(e.raw, t);
            if (e instanceof es)
              return (
                (this.raw = e.value), (this.set = [[e]]), this.format(), this
              );
            if (
              ((this.options = t),
              (this.loose = !!t.loose),
              (this.includePrerelease = !!t.includePrerelease),
              (this.raw = e),
              (this.set = e
                .split(/\s*\|\|\s*/)
                .map((e) => this.parseRange(e.trim()))
                .filter((e) => e.length)),
              !this.set.length)
            )
              throw TypeError(`Invalid SemVer Range: ${e}`);
            this.format();
          }
          format() {
            return (
              (this.range = this.set
                .map((e) => e.join(" ").trim())
                .join("||")
                .trim()),
              this.range
            );
          }
          toString() {
            return this.range;
          }
          parseRange(e) {
            let { loose: t } = this.options;
            e = e.trim();
            let r = t ? ef[ed.HYPHENRANGELOOSE] : ef[ed.HYPHENRANGE];
            B(
              "hyphen replace",
              (e = e.replace(r, eR(this.options.includePrerelease)))
            ),
              B(
                "comparator trim",
                (e = e.replace(ef[ed.COMPARATORTRIM], eh)),
                ef[ed.COMPARATORTRIM]
              ),
              (e = (e = (e = e.replace(ef[ed.TILDETRIM], ep)).replace(
                ef[ed.CARETTRIM],
                ev
              ))
                .split(/\s+/)
                .join(" "));
            let n = t ? ef[ed.COMPARATORLOOSE] : ef[ed.COMPARATOR];
            return e
              .split(" ")
              .map((e) => ey(e, this.options))
              .join(" ")
              .split(/\s+/)
              .map((e) => eS(e, this.options))
              .filter(this.options.loose ? (e) => !!e.match(n) : () => !0)
              .map((e) => new es(e, this.options));
          }
          intersects(e, t) {
            if (!(e instanceof ec)) throw TypeError("a Range is required");
            return this.set.some(
              (r) =>
                em(r, t) &&
                e.set.some(
                  (e) =>
                    em(e, t) &&
                    r.every((r) => e.every((e) => r.intersects(e, t)))
                )
            );
          }
          test(e) {
            if (!e) return !1;
            if ("string" == typeof e)
              try {
                e = new J(e, this.options);
              } catch (t) {
                return !1;
              }
            for (let r = 0; r < this.set.length; r++)
              if (eA(this.set[r], e, this.options)) return !0;
            return !1;
          }
        },
        {
          re: ef,
          t: ed,
          comparatorTrimReplace: eh,
          tildeTrimReplace: ep,
          caretTrimReplace: ev,
        } = G,
        em = (e, t) => {
          let r = !0,
            n = e.slice(),
            o = n.pop();
          for (; r && n.length; )
            (r = n.every((e) => o.intersects(e, t))), (o = n.pop());
          return r;
        },
        ey = (e, t) => (
          B("comp", e, t),
          (e = e_(e, t)),
          B("caret", e),
          (e = eE(e, t)),
          B("tildes", e),
          (e = eO(e, t)),
          B("xrange", e),
          (e = eN(e, t)),
          B("stars", e),
          e
        ),
        eg = (e) => !e || "x" === e.toLowerCase() || "*" === e,
        eE = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map((e) => eb(e, t))
            .join(" "),
        eb = (e, t) => {
          let r = t.loose ? ef[ed.TILDELOOSE] : ef[ed.TILDE];
          return e.replace(r, (t, r, n, o, i) => {
            let a;
            return (
              B("tilde", e, t, r, n, o, i),
              eg(r)
                ? (a = "")
                : eg(n)
                ? (a = `>=${r}.0.0 <${+r + 1}.0.0-0`)
                : eg(o)
                ? (a = `>=${r}.${n}.0 <${r}.${+n + 1}.0-0`)
                : i
                ? (B("replaceTilde pr", i),
                  (a = `>=${r}.${n}.${o}-${i} <${r}.${+n + 1}.0-0`))
                : (a = `>=${r}.${n}.${o} <${r}.${+n + 1}.0-0`),
              B("tilde return", a),
              a
            );
          });
        },
        e_ = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map((e) => eI(e, t))
            .join(" "),
        eI = (e, t) => {
          B("caret", e, t);
          let r = t.loose ? ef[ed.CARETLOOSE] : ef[ed.CARET],
            n = t.includePrerelease ? "-0" : "";
          return e.replace(r, (t, r, o, i, a) => {
            let s;
            return (
              B("caret", e, t, r, o, i, a),
              eg(r)
                ? (s = "")
                : eg(o)
                ? (s = `>=${r}.0.0${n} <${+r + 1}.0.0-0`)
                : eg(i)
                ? (s =
                    "0" === r
                      ? `>=${r}.${o}.0${n} <${r}.${+o + 1}.0-0`
                      : `>=${r}.${o}.0${n} <${+r + 1}.0.0-0`)
                : a
                ? (B("replaceCaret pr", a),
                  (s =
                    "0" === r
                      ? "0" === o
                        ? `>=${r}.${o}.${i}-${a} <${r}.${o}.${+i + 1}-0`
                        : `>=${r}.${o}.${i}-${a} <${r}.${+o + 1}.0-0`
                      : `>=${r}.${o}.${i}-${a} <${+r + 1}.0.0-0`))
                : (B("no pr"),
                  (s =
                    "0" === r
                      ? "0" === o
                        ? `>=${r}.${o}.${i}${n} <${r}.${o}.${+i + 1}-0`
                        : `>=${r}.${o}.${i}${n} <${r}.${+o + 1}.0-0`
                      : `>=${r}.${o}.${i} <${+r + 1}.0.0-0`)),
              B("caret return", s),
              s
            );
          });
        },
        eO = (e, t) => (
          B("replaceXRanges", e, t),
          e
            .split(/\s+/)
            .map((e) => ew(e, t))
            .join(" ")
        ),
        ew = (e, t) => {
          e = e.trim();
          let r = t.loose ? ef[ed.XRANGELOOSE] : ef[ed.XRANGE];
          return e.replace(r, (r, n, o, i, a, s) => {
            B("xRange", e, r, n, o, i, a, s);
            let l = eg(o),
              u = l || eg(i),
              c = u || eg(a);
            return (
              "=" === n && c && (n = ""),
              (s = t.includePrerelease ? "-0" : ""),
              l
                ? (r = ">" === n || "<" === n ? "<0.0.0-0" : "*")
                : n && c
                ? (u && (i = 0),
                  (a = 0),
                  ">" === n
                    ? ((n = ">="),
                      u
                        ? ((o = +o + 1), (i = 0), (a = 0))
                        : ((i = +i + 1), (a = 0)))
                    : "<=" === n &&
                      ((n = "<"), u ? (o = +o + 1) : (i = +i + 1)),
                  "<" === n && (s = "-0"),
                  (r = `${n + o}.${i}.${a}${s}`))
                : u
                ? (r = `>=${o}.0.0${s} <${+o + 1}.0.0-0`)
                : c && (r = `>=${o}.${i}.0${s} <${o}.${+i + 1}.0-0`),
              B("xRange return", r),
              r
            );
          });
        },
        eN = (e, t) => (
          B("replaceStars", e, t), e.trim().replace(ef[ed.STAR], "")
        ),
        eS = (e, t) => (
          B("replaceGTE0", e, t),
          e.trim().replace(ef[t.includePrerelease ? ed.GTE0PRE : ed.GTE0], "")
        ),
        eR = (e) => (t, r, n, o, i, a, s, l, u, c, f, d, h) =>
          `${(r = eg(n)
            ? ""
            : eg(o)
            ? `>=${n}.0.0${e ? "-0" : ""}`
            : eg(i)
            ? `>=${n}.${o}.0${e ? "-0" : ""}`
            : a
            ? `>=${r}`
            : `>=${r}${e ? "-0" : ""}`)} ${(l = eg(u)
            ? ""
            : eg(c)
            ? `<${+u + 1}.0.0-0`
            : eg(f)
            ? `<${u}.${+c + 1}.0-0`
            : d
            ? `<=${u}.${c}.${f}-${d}`
            : e
            ? `<${u}.${c}.${+f + 1}-0`
            : `<=${l}`)}`.trim(),
        eA = (e, t, r) => {
          for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
          if (t.prerelease.length && !r.includePrerelease) {
            for (let o = 0; o < e.length; o++)
              if (
                (B(e[o].semver),
                e[o].semver !== es.ANY && e[o].semver.prerelease.length > 0)
              ) {
                let i = e[o].semver;
                if (
                  i.major === t.major &&
                  i.minor === t.minor &&
                  i.patch === t.patch
                )
                  return !0;
              }
            return !1;
          }
          return !0;
        },
        eT = (e, t, r) => {
          try {
            t = new ec(t, r);
          } catch (n) {
            return !1;
          }
          return t.test(e);
        },
        { MAX_LENGTH: eL } = F,
        { re: eM, t: ej } = G,
        e$ = (e, t) => {
          if (
            ((t && "object" == typeof t) ||
              (t = { loose: !!t, includePrerelease: !1 }),
            e instanceof J)
          )
            return e;
          if (
            "string" != typeof e ||
            e.length > eL ||
            !(t.loose ? eM[ej.LOOSE] : eM[ej.FULL]).test(e)
          )
            return null;
          try {
            return new J(e, t);
          } catch (r) {
            return null;
          }
        },
        { re: eP, t: eC } = G,
        ex = (e, t) => {
          if (e instanceof J) return e;
          if (("number" == typeof e && (e = String(e)), "string" != typeof e))
            return null;
          let r = null;
          if ((t = t || {}).rtl) {
            let n;
            for (
              ;
              (n = eP[eC.COERCERTL].exec(e)) &&
              (!r || r.index + r[0].length !== e.length);

            )
              (r && n.index + n[0].length === r.index + r[0].length) || (r = n),
                (eP[eC.COERCERTL].lastIndex =
                  n.index + n[1].length + n[2].length);
            eP[eC.COERCERTL].lastIndex = -1;
          } else r = e.match(eP[eC.COERCE]);
          return null === r
            ? null
            : e$(`${r[2]}.${r[3] || "0"}.${r[4] || "0"}`, t);
        };
      function eD(e) {
        return String.fromCharCode(parseInt(e.slice(1), 16));
      }
      function ek(e) {
        return `%${`00${e.charCodeAt(0).toString(16)}`.slice(-2)}`;
      }
      function eU(e) {
        return btoa(
          encodeURIComponent(JSON.stringify(e)).replace(/%[0-9A-F]{2}/g, eD)
        );
      }
      function eF(e) {
        return JSON.parse(decodeURIComponent(Array.from(atob(e), ek).join("")));
      }
      function eB(e) {
        return void 0 === e;
      }
      function eG(e) {
        return null === e || eB(e);
      }
      function eW(e) {
        if (!e) return !0;
        for (let t in e) if (Object.hasOwnProperty.call(e, t)) return !1;
        return !0;
      }
      var eH = {},
        eq = {
          "magic-sdk": "magic-sdk",
          "@magic-sdk/react-native": "magic-sdk-rn",
        },
        ez = class extends Error {
          constructor(e, t) {
            super(`Magic SDK Error: [${e}] ${t}`),
              (this.code = e),
              (this.rawMessage = t),
              (this.__proto__ = Error),
              Object.setPrototypeOf(this, ez.prototype);
          }
        },
        eV = class extends Error {
          constructor(e) {
            super(), (this.__proto__ = Error);
            let t = Number(null == e ? void 0 : e.code);
            (this.rawMessage =
              (null == e ? void 0 : e.message) || "Internal error"),
              (this.code =
                !eG(t) && "number" == typeof t && Object.values(E).includes(t)
                  ? t
                  : E.InternalError),
              (this.message = `Magic RPC Error: [${this.code}] ${this.rawMessage}`),
              Object.setPrototypeOf(this, eV.prototype);
          }
        },
        eX = class {
          constructor(e, t) {
            (this.code = e),
              (this.rawMessage = t),
              (this.message = `Magic SDK Warning: [${e}] ${t}`);
          }
          log() {
            console.warn(this.message);
          }
        },
        eK = class extends Error {
          constructor(e, t, r, n) {
            super(`Magic Extension Error (${e.name}): [${t}] ${r}`),
              (this.code = t),
              (this.rawMessage = r),
              (this.data = n),
              (this.__proto__ = Error),
              Object.setPrototypeOf(this, eK.prototype);
          }
        },
        eY = class {
          constructor(e, t, r) {
            (this.code = t),
              (this.rawMessage = r),
              (this.message = `Magic Extension Warning (${e.name}): [${t}] ${r}`);
          }
          log() {
            console.warn(this.message);
          }
        },
        eJ = (function* () {
          let e = 0;
          for (;;) e < Number.MAX_SAFE_INTEGER ? yield ++e : (e = 0);
        })();
      function eQ() {
        return eJ.next().value;
      }
      var eZ = Symbol("Payload pre-processed by Magic SDK");
      function e0(e) {
        return Object.defineProperty(e, eZ, { value: !0, enumerable: !1 }), e;
      }
      function e1(e) {
        var t, r, n;
        return (
          e[eZ] ||
            ((e.jsonrpc = null != (t = e.jsonrpc) ? t : "2.0"),
            (e.id = eQ()),
            (e.method = null != (r = e.method) ? r : "noop"),
            (e.params = null != (n = e.params) ? n : []),
            e0(e)),
          e
        );
      }
      function e2(e, t = []) {
        return e0({ params: t, method: e, jsonrpc: "2.0", id: eQ() });
      }
      var e3 = class {
          constructor(e) {
            e instanceof e3
              ? ((this._jsonrpc = e.payload.jsonrpc),
                (this._id = e.payload.id),
                (this._result = e.payload.result),
                (this._error = e.payload.error))
              : eG(e) ||
                eB(e.jsonrpc) ||
                eB(e.id) ||
                (eB(e.result) && eB(e.error))
              ? ((this._jsonrpc = e.jsonrpc),
                (this._id = e.id),
                (this._result = void 0),
                (this._error = void 0))
              : ((this._jsonrpc = e.jsonrpc),
                (this._id = e.id),
                (this._result = e.result),
                (this._error = e.error));
          }
          applyError(e) {
            return (this._error = e), this;
          }
          applyResult(e) {
            return (this._result = e), this;
          }
          get hasError() {
            return void 0 !== this._error && null !== this._error;
          }
          get hasResult() {
            return void 0 !== this._result;
          }
          get payload() {
            return {
              jsonrpc: this._jsonrpc,
              id: this._id,
              result: this._result,
              error: this._error,
            };
          }
        },
        e6 = ((e, t, r, n) => {
          if ((t && "object" == typeof t) || "function" == typeof t)
            for (let o of L(t))
              $.call(e, o) ||
                "default" === o ||
                S(e, o, {
                  get: () => t[o],
                  enumerable: !(n = A(t, o)) || n.enumerable,
                });
          return e;
        })(
          ((o = S(
            null != (f = U()) ? N(j(f)) : {},
            "default",
            f && f.__esModule
              ? { get: () => f.default, enumerable: !0 }
              : { value: f, enumerable: !0 }
          )),
          S(o, "__esModule", { value: !0 })),
          f
        ),
        e4 = class extends e6.default {};
      function e8() {
        let e = new e4();
        return {
          emitter: e,
          createChainingEmitterMethod:
            (t, r) =>
            (...n) => (e[t].apply(e, n), r),
          createBoundEmitterMethod:
            (t) =>
            (...r) =>
              e[t].apply(e, r),
        };
      }
      var e9 = Symbol("isPromiEvent");
      function e5(e) {
        return !!e[e9];
      }
      function e7(e) {
        let t = te(e),
          { createBoundEmitterMethod: r, createChainingEmitterMethod: n } =
            e8(),
          o = Symbol("Promise.then"),
          i = Symbol("Promise.catch"),
          a = Symbol("Promise.finally"),
          s =
            (e, t) =>
            (...r) =>
              l(t[e].apply(t, r)),
          l = (e) =>
            Object.assign(e, {
              [e9]: !0,
              [o]: e[o] || e.then,
              [i]: e[i] || e.catch,
              [a]: e[a] || e.finally,
              then: s(o, e),
              catch: s(i, e),
              finally: s(a, e),
              on: n("on", e),
              once: n("once", e),
              addListener: n("addListener", e),
              off: n("off", e),
              removeListener: n("removeListener", e),
              removeAllListeners: n("removeAllListeners", e),
              emit: r("emit"),
              eventNames: r("eventNames"),
              listeners: r("listeners"),
              listenerCount: r("listenerCount"),
            }),
          u = l(
            t.then(
              (e) => (u.emit("done", e), u.emit("settled"), e),
              (e) => {
                throw (u.emit("error", e), u.emit("settled"), e);
              }
            )
          );
        return u;
      }
      function te(e) {
        return new Promise((t, r) => {
          Promise.resolve(e(t, r)).catch(r);
        });
      }
      var tt = class {
          constructor(e) {
            this.sdk = e;
          }
          get overlay() {
            return this.sdk.overlay;
          }
          request(e) {
            let t = this.overlay.post(I.MAGIC_HANDLE_REQUEST, e1(e)),
              r = e7((e, r) => {
                t.then((t) => {
                  if ((n(), t.hasError)) r(new eV(t.payload.error));
                  else if (t.hasResult) e(t.payload.result);
                  else
                    throw new ez(
                      y.MalformedResponse,
                      "Response from the Magic iframe is malformed."
                    );
                }).catch((e) => {
                  n(), r(e);
                });
              }),
              n = this.overlay.on(_.MAGIC_HANDLE_EVENT, (t) => {
                var n;
                let { response: o } = t.data;
                if (
                  o.id === e.id &&
                  (null == (n = o.result) ? void 0 : n.event)
                ) {
                  let { event: i, params: a = [] } = o.result;
                  r.emit(i, ...a);
                }
              });
            return r;
          }
          createIntermediaryEvent(e, t) {
            return (r) => {
              let n = e2(b.IntermediaryEvent, [
                { payloadId: t, eventType: e, args: r },
              ]);
              this.request(n);
            };
          }
        },
        tr = class extends tt {
          loginWithMagicLink(e) {
            let { email: t, showUI: r = !0, redirectURI: n } = e,
              o = e2(
                this.sdk.testMode
                  ? b.LoginWithMagicLinkTestMode
                  : b.LoginWithMagicLink,
                [{ email: t, showUI: r, redirectURI: n }]
              );
            return this.request(o);
          }
          loginWithSMS(e) {
            let { phoneNumber: t } = e,
              r = e2(
                this.sdk.testMode ? b.LoginWithSmsTestMode : b.LoginWithSms,
                [{ phoneNumber: t, showUI: !0 }]
              );
            return this.request(r);
          }
          loginWithEmailOTP(e) {
            let { email: t } = e,
              r = e2(
                this.sdk.testMode
                  ? b.LoginWithEmailOTPTestMode
                  : b.LoginWithEmailOTP,
                [{ email: t, showUI: !0 }]
              );
            return this.request(r);
          }
          loginWithCredential(e) {
            let t = null != e ? e : "";
            if (!e && "web" === eH.platform) {
              t = window.location.search;
              let r = window.location.origin + window.location.pathname;
              window.history.replaceState(null, "", r);
            }
            let n = e2(
              this.sdk.testMode
                ? b.LoginWithCredentialTestMode
                : b.LoginWithCredential,
              [t]
            );
            return this.request(n);
          }
        },
        tn = {};
      function to(e) {
        return (...t) =>
          k(this, null, function* () {
            return (
              m || (m = yield eH.configureStorage()),
              yield m.ready(),
              m[e](...t)
            );
          });
      }
      ((e, t) => {
        for (var r in t) S(e, r, { get: t[r], enumerable: !0 });
      })(tn, {
        clear: () => tl,
        getItem: () => ti,
        iterate: () => td,
        key: () => tc,
        keys: () => tf,
        length: () => tu,
        removeItem: () => ts,
        setItem: () => ta,
      });
      var ti = to("getItem"),
        ta = to("setItem"),
        ts = to("removeItem"),
        tl = to("clear"),
        tu = to("length"),
        tc = to("key"),
        tf = to("keys"),
        td = to("iterate"),
        th = "STORE_KEY_PRIVATE_KEY",
        tp = "STORE_KEY_PUBLIC_JWK",
        tv = "ECDSA",
        tm = "P-256",
        ty = { name: tv, namedCurve: tm },
        tg = { name: tv, namedCurve: tm };
      function tE(e) {
        return btoa(e)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+/g, "");
      }
      function tb(e) {
        return encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, (e, t) =>
          String.fromCharCode(parseInt(t, 16))
        );
      }
      var t_ = class extends tt {
          getIdToken(e) {
            let t = e2(
              this.sdk.testMode ? b.GetIdTokenTestMode : b.GetIdToken,
              [e]
            );
            return this.request(t);
          }
          generateIdToken(e) {
            let t = e2(
              this.sdk.testMode ? b.GenerateIdTokenTestMode : b.GenerateIdToken,
              [e]
            );
            return this.request(t);
          }
          getMetadata() {
            let e = e2(
              this.sdk.testMode ? b.GetMetadataTestMode : b.GetMetadata
            );
            return this.request(e);
          }
          updateEmail(e) {
            let { email: t, showUI: r = !0 } = e,
              n = e2(
                this.sdk.testMode ? b.UpdateEmailTestMode : b.UpdateEmail,
                [{ email: t, showUI: r }]
              );
            return this.request(n);
          }
          isLoggedIn() {
            let e = e2(this.sdk.testMode ? b.IsLoggedInTestMode : b.IsLoggedIn);
            return this.request(e);
          }
          logout() {
            ts(tp), ts(th);
            let e = e2(this.sdk.testMode ? b.LogoutTestMode : b.Logout);
            return this.request(e);
          }
          showSettings() {
            let e = e2(
              this.sdk.testMode ? b.UserSettingsTestMode : b.UserSettings
            );
            return this.request(e);
          }
        },
        { createBoundEmitterMethod: tI, createChainingEmitterMethod: tO } =
          e8(),
        tw = class extends tt {
          constructor() {
            super(...arguments),
              (this.isMagic = !0),
              (this.on = tO("on", this)),
              (this.once = tO("once", this)),
              (this.addListener = tO("addListener", this)),
              (this.off = tO("off", this)),
              (this.removeListener = tO("removeListener", this)),
              (this.removeAllListeners = tO("removeAllListeners", this)),
              (this.emit = tI("emit")),
              (this.eventNames = tI("eventNames")),
              (this.listeners = tI("listeners")),
              (this.listenerCount = tI("listenerCount"));
          }
          sendAsync(e, t) {
            if (!t) {
              var r;
              let n, o, i;
              throw (
                ((r = {
                  procedure: "Magic.rpcProvider.sendAsync",
                  argument: 1,
                  expected: "function",
                  received: null === t ? "null" : typeof t,
                }),
                new ez(
                  y.InvalidArgument,
                  `Invalid ${
                    ((o = (n = r.argument + 1) % 10),
                    (i = n % 100),
                    1 === o && 11 !== i
                      ? `${n}st`
                      : 2 === o && 12 !== i
                      ? `${n}nd`
                      : 3 === o && 13 !== i
                      ? `${n}rd`
                      : `${n}th`)
                  } argument given to \`${r.procedure}\`.
  Expected: \`${r.expected}\`
  Received: \`${r.received}\``
                ))
              );
            }
            if (Array.isArray(e))
              this.overlay
                .post(
                  I.MAGIC_HANDLE_REQUEST,
                  e.map((e) => {
                    let t = e1(e);
                    return this.prefixPayloadMethodForTestMode(t), t;
                  })
                )
                .then((e) => {
                  t(
                    null,
                    e.map((e) =>
                      D(x({}, e.payload), {
                        error: e.hasError ? new eV(e.payload.error) : null,
                      })
                    )
                  );
                });
            else {
              let a = e1(e);
              this.prefixPayloadMethodForTestMode(a),
                this.overlay.post(I.MAGIC_HANDLE_REQUEST, a).then((e) => {
                  t(e.hasError ? new eV(e.payload.error) : null, e.payload);
                });
            }
          }
          send(e, t) {
            if ("string" == typeof e) {
              let r = e2(e, Array.isArray(t) ? t : []);
              return this.request(r);
            }
            if (Array.isArray(e) || t) {
              this.sendAsync(e, t);
              return;
            }
            let n = new eX(
              g.SyncWeb3Method,
              "Non-async web3 methods are deprecated in web3 > 1.0 and are not supported by the Magic web3 provider. Please use an async method instead."
            );
            return (
              n.log(),
              new e3(e).applyError({ code: -32603, message: n.rawMessage })
                .payload
            );
          }
          enable() {
            let e = e2("eth_accounts");
            return this.request(e);
          }
          request(e) {
            return this.prefixPayloadMethodForTestMode(e), super.request(e);
          }
          prefixPayloadMethodForTestMode(e) {
            this.sdk.testMode && (e.method = `testMode/eth/${e.method}`);
          }
        };
      function tN(e, t) {
        return t ? new URL(e, t) : new URL(e);
      }
      var tS = ["request", "overlay", "sdk"],
        tR = class extends tt {
          constructor() {
            super(void 0),
              (this.__sdk_access_field_descriptors__ = new Map()),
              (this.__is_initialized__ = !1),
              (this.utils = {
                createPromiEvent: e7,
                isPromiEvent: e5,
                encodeJSON: eU,
                decodeJSON: eF,
                createJsonRpcRequestPayload: e2,
                standardizeJsonRpcRequestPayload: e1,
                storage: tn,
              });
            let e = [
              this,
              ...(function (e) {
                let t = Object.getPrototypeOf(e),
                  r = [t];
                for (; t !== tt.prototype; )
                  r.push((t = Object.getPrototypeOf(t)));
                return r;
              })(this),
            ];
            tS.forEach((t) => {
              let r = e.map((e) => Object.getOwnPropertyDescriptor(e, t)),
                n = r.findIndex((e) => !!e),
                o = r[n];
              o &&
                (this.__sdk_access_field_descriptors__.set(t, {
                  descriptor: o,
                  isPrototypeField: n > 0,
                }),
                Object.defineProperty(this, t, {
                  configurable: !0,
                  get() {
                    throw new ez(
                      y.ExtensionNotInitialized,
                      `Extensions must be initialized with a Magic SDK instance before \`Extension.${t}\` can be accessed. Do not invoke \`Extension.${t}\` inside an extension constructor.`
                    );
                  },
                }));
            });
          }
          init(e) {
            this.__is_initialized__ ||
              (tS.forEach((e) => {
                if (this.__sdk_access_field_descriptors__.has(e)) {
                  let { descriptor: t, isPrototypeField: r } =
                    this.__sdk_access_field_descriptors__.get(e);
                  r ? delete this[e] : Object.defineProperty(this, e, t);
                }
              }),
              (this.sdk = e),
              (this.__is_initialized__ = !0));
          }
          createDeprecationWarning(e) {
            let { method: t, removalVersion: r, useInstead: n } = e,
              o = `\`${t}\` will be removed from this Extension in version \`${r}\`.${
                n ? ` Use \`${n}\` instead.` : ""
              }`;
            return new eY(this, "DEPRECATION_NOTICE", o);
          }
          createWarning(e, t) {
            return new eY(this, e, t);
          }
          createError(e, t, r) {
            return new eK(this, e, t, r);
          }
        },
        tA = class extends tR {};
      function tT(e) {
        return (
          !e.compat ||
          null == e.compat[eH.sdkName] ||
          ("string" == typeof e.compat[eH.sdkName]
            ? eT(ex(eH.version), e.compat[eH.sdkName])
            : !!e.compat[eH.sdkName])
        );
      }
      function tL(e) {
        var t;
        let r = null != (t = null == e ? void 0 : e.extensions) ? t : [],
          n = {},
          o = [];
        if (
          (Array.isArray(r)
            ? r.forEach((e) => {
                tT(e)
                  ? (e.init(this),
                    (e.name || e.name !== tA.Anonymous) && (this[e.name] = e),
                    e instanceof tA.Internal &&
                      (eW(e.config) || (n[e.name] = e.config)))
                  : o.push(e);
              })
            : Object.keys(r).forEach((e) => {
                if (tT(r[e])) {
                  r[e].init(this);
                  let t = r[e];
                  (this[e] = t),
                    t instanceof tA.Internal &&
                      (eW(t.config) || (n[r[e].name] = t.config));
                } else o.push(r[e]);
              }),
          o.length)
        ) {
          let i;
          throw (
            ((i = `Some extensions are incompatible with \`${eH.sdkName}@${eH.version}\`:`),
            o
              .filter((e) => void 0 !== e.compat && null !== e.compat)
              .forEach((e) => {
                let t = e.compat[eH.sdkName];
                "string" == typeof t
                  ? (i += `
  - Extension \`${e.name}\` supports version(s) \`${t}\``)
                  : t ||
                    (i += `
  - Extension \`${e.name}\` does not support ${eH.platform} environments.`);
              }),
            new ez(y.IncompatibleExtensions, i))
          );
        }
        return n;
      }
      (tA.Internal = class extends tR {}),
        (tA.Anonymous = "anonymous extension");
      var tM = class {
          constructor(e, t) {
            var r;
            if (((this.apiKey = e), !e))
              throw new ez(
                y.MissingApiKey,
                "Please provide an API key that you acquired from the Magic developer dashboard."
              );
            "react-native" === eH.platform &&
              (null == t ? void 0 : t.endpoint) &&
              new eX(
                g.ReactNativeEndpointConfiguration,
                `CUSTOM DOMAINS ARE NOT SUPPORTED WHEN USING MAGIC SDK WITH REACT NATIVE! The \`endpoint\` parameter SHOULD NOT be provided. The Magic \`<iframe>\` is automatically wrapped by a WebView pointed at \`${eH.defaultEndpoint}\`. Changing this default behavior will lead to unexpected results and potentially security-threatening bugs.`
              ).log();
            let { defaultEndpoint: n, version: o } = eH;
            (this.testMode = !!(null == t ? void 0 : t.testMode)),
              (this.endpoint = tN(
                null != (r = null == t ? void 0 : t.endpoint) ? r : n
              ).origin),
              (this.auth = new tr(this)),
              (this.user = new t_(this)),
              (this.rpcProvider = new tw(this));
            let i = tL.call(this, t);
            this.parameters = eU(
              x(
                {
                  API_KEY: this.apiKey,
                  DOMAIN_ORIGIN: window.location ? window.location.origin : "",
                  ETH_NETWORK: null == t ? void 0 : t.network,
                  host: tN(this.endpoint).host,
                  sdk: eq[eH.sdkName],
                  version: o,
                  ext: eW(i) ? void 0 : i,
                  locale: (null == t ? void 0 : t.locale) || "en_US",
                },
                eH.bundleId ? { bundleId: eH.bundleId } : {}
              )
            );
          }
          get overlay() {
            if (!tM.__overlays__.has(this.parameters)) {
              let e = new eH.ViewController(this.endpoint, this.parameters);
              e.init(), tM.__overlays__.set(this.parameters, e);
            }
            return tM.__overlays__.get(this.parameters);
          }
          preload() {
            return k(this, null, function* () {
              yield this.overlay.ready;
            });
          }
        },
        tj = tM;
      tj.__overlays__ = new Map();
      var t$ = class {
          constructor(e, t) {
            (this.endpoint = e),
              (this.parameters = t),
              (this.messageHandlers = new Set()),
              (this.ready = this.waitForReady()),
              this.listen();
          }
          post(e, t) {
            return k(this, null, function* () {
              return te((r) =>
                k(this, null, function* () {
                  var n;
                  yield this.ready;
                  let o = [],
                    i = Array.isArray(t) ? t.map((e) => e.id) : [];
                  yield this._post(
                    yield (function (e, t) {
                      return k(this, null, function* () {
                        let r = yield ti("rt"),
                          n;
                        if ("web" === eH.platform)
                          try {
                            n = yield (function () {
                              return k(this, null, function* () {
                                var e, t, r, n;
                                let o,
                                  i,
                                  a = yield (function () {
                                    return k(this, null, function* () {
                                      let e, t;
                                      if (
                                        ((t =
                                          (e =
                                            "undefined" != typeof window &&
                                            !!window.crypto) &&
                                          !!window.crypto.subtle),
                                        !e || !t)
                                      ) {
                                        console.info(
                                          "webcrypto is not supported"
                                        );
                                        return;
                                      }
                                      return (
                                        (yield ti(tp)) ||
                                          (yield (function () {
                                            return k(this, null, function* () {
                                              let e = null,
                                                { subtle: t } = window.crypto,
                                                r = yield t.generateKey(
                                                  ty,
                                                  !0,
                                                  ["sign"]
                                                ),
                                                n = yield t.exportKey(
                                                  "jwk",
                                                  r.privateKey
                                                );
                                              (e = yield t.exportKey(
                                                "jwk",
                                                r.publicKey
                                              )),
                                                yield ta(
                                                  th,
                                                  yield t.importKey(
                                                    "jwk",
                                                    n,
                                                    tg,
                                                    !1,
                                                    ["sign"]
                                                  )
                                                ),
                                                yield ta(tp, e);
                                            });
                                          })()),
                                        ti(tp)
                                      );
                                    });
                                  })();
                                if (!a) {
                                  console.info(
                                    "unable to create public key or webcrypto is unsupported"
                                  );
                                  return;
                                }
                                let { subtle: s } = window.crypto,
                                  l = yield ti(th);
                                if (!l || !s) {
                                  console.info(
                                    "unable to find private key or webcrypto unsupported"
                                  );
                                  return;
                                }
                                let u = {
                                    iat: Math.floor(new Date().getTime() / 1e3),
                                    jti:
                                      (((i = window.crypto.getRandomValues(
                                        new Uint8Array(16)
                                      ))[6] = (15 & i[6]) | 64),
                                      (i[8] = (191 & i[8]) | 128),
                                      i[0].toString(16) +
                                        i[1].toString(16) +
                                        i[2].toString(16) +
                                        i[3].toString(16) +
                                        "-" +
                                        i[4].toString(16) +
                                        i[5].toString(16) +
                                        "-" +
                                        i[6].toString(16) +
                                        i[7].toString(16) +
                                        "-" +
                                        i[8].toString(16) +
                                        i[9].toString(16) +
                                        "-" +
                                        i[10].toString(16) +
                                        i[11].toString(16) +
                                        i[12].toString(16) +
                                        i[13].toString(16) +
                                        i[14].toString(16) +
                                        i[15].toString(16)),
                                  },
                                  c = {
                                    protected:
                                      ((e = JSON.stringify({
                                        typ: "dpop+jwt",
                                        alg: "ES256",
                                        jwk: a,
                                      })),
                                      tE(tb(e))),
                                    claims:
                                      ((t = JSON.stringify(u)), tE(tb(t))),
                                  };
                                return `${c.protected}.${c.claims}.${
                                  ((n = new Uint8Array(
                                    yield s.sign(
                                      { name: tv, hash: { name: "SHA-256" } },
                                      l,
                                      ((r = `${c.protected}.${c.claims}`),
                                      new TextEncoder().encode(r))
                                    )
                                  )),
                                  (o = ""),
                                  n.forEach((e) => {
                                    o += String.fromCharCode(e);
                                  }),
                                  tE(o))
                                }`;
                              });
                            })();
                          } catch (o) {
                            console.error("webcrypto error", o);
                          }
                        return n
                          ? r
                            ? { msgType: e, payload: t, jwt: n, rt: r }
                            : { msgType: e, payload: t, jwt: n }
                          : { msgType: e, payload: t };
                      });
                    })(`${e}-${this.parameters}`, t)
                  );
                  let a = this.on(
                    _.MAGIC_HANDLE_RESPONSE,
                    ((n = () => a()),
                    (e) => {
                      let { id: a, response: s } = (function (e, t) {
                        var r;
                        let n = null == (r = t.data.response) ? void 0 : r.id,
                          o =
                            n && Array.isArray(e)
                              ? e.find((e) => e.id === n)
                              : e;
                        if (n && o) {
                          let i = new e3(o)
                            .applyResult(t.data.response.result)
                            .applyError(t.data.response.error);
                          return { id: n, response: i };
                        }
                        return {};
                      })(t, e);
                      (function (e) {
                        k(this, null, function* () {
                          e.data.rt && (yield ta("rt", e.data.rt));
                        });
                      })(e),
                        a && s && Array.isArray(t) && i.includes(a)
                          ? (o.push(s), o.length === t.length && (n(), r(o)))
                          : a &&
                            s &&
                            !Array.isArray(t) &&
                            a === t.id &&
                            (n(), r(s));
                    })
                  );
                })
              );
            });
          }
          on(e, t) {
            let r = t.bind(window),
              n = (t) => {
                t.data.msgType === `${e}-${this.parameters}` && r(t);
              };
            return (
              this.messageHandlers.add(n), () => this.messageHandlers.delete(n)
            );
          }
          waitForReady() {
            return new Promise((e) => {
              this.on(_.MAGIC_OVERLAY_READY, () => e());
            });
          }
          listen() {
            this.on(_.MAGIC_HIDE_OVERLAY, () => {
              this.hideOverlay();
            }),
              this.on(_.MAGIC_SHOW_OVERLAY, () => {
                this.showOverlay();
              });
          }
        },
        tP = Object.create,
        tC = Object.defineProperty,
        tx = Object.getOwnPropertyDescriptor,
        tD = Object.getOwnPropertyNames,
        tk = Object.getPrototypeOf,
        tU = Object.prototype.hasOwnProperty,
        tF = (e) => tC(e, "__esModule", { value: !0 }),
        tB =
          ((d = function (e) {
            if ("undefined" != typeof require)
              return require.apply(this, arguments);
            throw Error('Dynamic require of "' + e + '" is not supported');
          }),
          "undefined" != typeof require
            ? require
            : "undefined" != typeof Proxy
            ? new Proxy(d, {
                get: (e, t) => ("undefined" != typeof require ? require : e)[t],
              })
            : d),
        tG = (e, t) => () => (
          t || e((t = { exports: {} }).exports, t), t.exports
        ),
        tW = (e, t, r, n) => {
          if ((t && "object" == typeof t) || "function" == typeof t)
            for (let o of tD(t))
              !tU.call(e, o) &&
                (r || "default" !== o) &&
                tC(e, o, {
                  get: () => t[o],
                  enumerable: !(n = tx(t, o)) || n.enumerable,
                });
          return e;
        },
        tH = (e, t) =>
          tW(
            tF(
              tC(
                null != e ? tP(tk(e)) : {},
                "default",
                !t && e && e.__esModule
                  ? { get: () => e.default, enumerable: !0 }
                  : { value: e, enumerable: !0 }
              )
            ),
            e
          ),
        tq = (e, t, r) =>
          new Promise((n, o) => {
            var i = (e) => {
                try {
                  s(r.next(e));
                } catch (t) {
                  o(t);
                }
              },
              a = (e) => {
                try {
                  s(r.throw(e));
                } catch (t) {
                  o(t);
                }
              },
              s = (e) =>
                e.done ? n(e.value) : Promise.resolve(e.value).then(i, a);
            s((r = r.apply(e, t)).next());
          }),
        tz = tG((e, t) => {
          !(function (r) {
            "object" == typeof e && void 0 !== t
              ? (t.exports = r())
              : "function" == typeof define && define.amd
              ? define([], r)
              : (("undefined" != typeof window
                  ? window
                  : "undefined" != typeof global
                  ? global
                  : "undefined" != typeof self
                  ? self
                  : this
                ).localforage = r());
          })(function () {
            return (function e(t, r, n) {
              function o(a, s) {
                if (!r[a]) {
                  if (!t[a]) {
                    var l = "function" == typeof tB && tB;
                    if (!s && l) return l(a, !0);
                    if (i) return i(a, !0);
                    var u = Error("Cannot find module '" + a + "'");
                    throw ((u.code = "MODULE_NOT_FOUND"), u);
                  }
                  var c = (r[a] = { exports: {} });
                  t[a][0].call(
                    c.exports,
                    function (e) {
                      return o(t[a][1][e] || e);
                    },
                    c,
                    c.exports,
                    e,
                    t,
                    r,
                    n
                  );
                }
                return r[a].exports;
              }
              for (
                var i = "function" == typeof tB && tB, a = 0;
                a < n.length;
                a++
              )
                o(n[a]);
              return o;
            })(
              {
                1: [
                  function (e, t, r) {
                    (function (e) {
                      var r,
                        n = e.MutationObserver || e.WebKitMutationObserver;
                      if (n) {
                        var o = 0,
                          i = new n(c),
                          a = e.document.createTextNode("");
                        i.observe(a, { characterData: !0 }),
                          (r = function () {
                            a.data = o = ++o % 2;
                          });
                      } else if (e.setImmediate || void 0 === e.MessageChannel)
                        r =
                          "document" in e &&
                          "onreadystatechange" in
                            e.document.createElement("script")
                            ? function () {
                                var t = e.document.createElement("script");
                                (t.onreadystatechange = function () {
                                  c(),
                                    (t.onreadystatechange = null),
                                    t.parentNode.removeChild(t),
                                    (t = null);
                                }),
                                  e.document.documentElement.appendChild(t);
                              }
                            : function () {
                                setTimeout(c, 0);
                              };
                      else {
                        var s = new e.MessageChannel();
                        (s.port1.onmessage = c),
                          (r = function () {
                            s.port2.postMessage(0);
                          });
                      }
                      var l,
                        u = [];
                      function c() {
                        l = !0;
                        for (var e, t, r = u.length; r; ) {
                          for (t = u, u = [], e = -1; ++e < r; ) t[e]();
                          r = u.length;
                        }
                        l = !1;
                      }
                      t.exports = function (e) {
                        1 !== u.push(e) || l || r();
                      };
                    }).call(
                      this,
                      "undefined" != typeof global
                        ? global
                        : "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : {}
                    );
                  },
                  {},
                ],
                2: [
                  function (e, t, r) {
                    var n = e(1);
                    function o() {}
                    var i = {},
                      a = ["REJECTED"],
                      s = ["FULFILLED"],
                      l = ["PENDING"];
                    function u(e) {
                      if ("function" != typeof e)
                        throw TypeError("resolver must be a function");
                      (this.state = l),
                        (this.queue = []),
                        (this.outcome = void 0),
                        e !== o && h(this, e);
                    }
                    function c(e, t, r) {
                      (this.promise = e),
                        "function" == typeof t &&
                          ((this.onFulfilled = t),
                          (this.callFulfilled = this.otherCallFulfilled)),
                        "function" == typeof r &&
                          ((this.onRejected = r),
                          (this.callRejected = this.otherCallRejected));
                    }
                    function f(e, t, r) {
                      n(function () {
                        var n;
                        try {
                          n = t(r);
                        } catch (o) {
                          return i.reject(e, o);
                        }
                        n === e
                          ? i.reject(
                              e,
                              TypeError("Cannot resolve promise with itself")
                            )
                          : i.resolve(e, n);
                      });
                    }
                    function d(e) {
                      var t = e && e.then;
                      if (
                        e &&
                        ("object" == typeof e || "function" == typeof e) &&
                        "function" == typeof t
                      )
                        return function () {
                          t.apply(e, arguments);
                        };
                    }
                    function h(e, t) {
                      var r = !1;
                      function n(t) {
                        r || ((r = !0), i.reject(e, t));
                      }
                      function o(t) {
                        r || ((r = !0), i.resolve(e, t));
                      }
                      var a = p(function () {
                        t(o, n);
                      });
                      "error" === a.status && n(a.value);
                    }
                    function p(e, t) {
                      var r = {};
                      try {
                        (r.value = e(t)), (r.status = "success");
                      } catch (n) {
                        (r.status = "error"), (r.value = n);
                      }
                      return r;
                    }
                    (t.exports = u),
                      (u.prototype.catch = function (e) {
                        return this.then(null, e);
                      }),
                      (u.prototype.then = function (e, t) {
                        if (
                          ("function" != typeof e && this.state === s) ||
                          ("function" != typeof t && this.state === a)
                        )
                          return this;
                        var r = new this.constructor(o);
                        return (
                          this.state !== l
                            ? f(r, this.state === s ? e : t, this.outcome)
                            : this.queue.push(new c(r, e, t)),
                          r
                        );
                      }),
                      (c.prototype.callFulfilled = function (e) {
                        i.resolve(this.promise, e);
                      }),
                      (c.prototype.otherCallFulfilled = function (e) {
                        f(this.promise, this.onFulfilled, e);
                      }),
                      (c.prototype.callRejected = function (e) {
                        i.reject(this.promise, e);
                      }),
                      (c.prototype.otherCallRejected = function (e) {
                        f(this.promise, this.onRejected, e);
                      }),
                      (i.resolve = function (e, t) {
                        var r = p(d, t);
                        if ("error" === r.status) return i.reject(e, r.value);
                        var n = r.value;
                        if (n) h(e, n);
                        else {
                          (e.state = s), (e.outcome = t);
                          for (var o = -1, a = e.queue.length; ++o < a; )
                            e.queue[o].callFulfilled(t);
                        }
                        return e;
                      }),
                      (i.reject = function (e, t) {
                        (e.state = a), (e.outcome = t);
                        for (var r = -1, n = e.queue.length; ++r < n; )
                          e.queue[r].callRejected(t);
                        return e;
                      }),
                      (u.resolve = function (e) {
                        return e instanceof this
                          ? e
                          : i.resolve(new this(o), e);
                      }),
                      (u.reject = function (e) {
                        var t = new this(o);
                        return i.reject(t, e);
                      }),
                      (u.all = function (e) {
                        var t = this;
                        if (
                          "[object Array]" !== Object.prototype.toString.call(e)
                        )
                          return this.reject(TypeError("must be an array"));
                        var r = e.length,
                          n = !1;
                        if (!r) return this.resolve([]);
                        for (
                          var a = Array(r), s = 0, l = -1, u = new this(o);
                          ++l < r;

                        )
                          !(function (e, o) {
                            t.resolve(e).then(
                              function (e) {
                                (a[o] = e),
                                  ++s !== r || n || ((n = !0), i.resolve(u, a));
                              },
                              function (e) {
                                n || ((n = !0), i.reject(u, e));
                              }
                            );
                          })(e[l], l);
                        return u;
                      }),
                      (u.race = function (e) {
                        var t = this;
                        if (
                          "[object Array]" !== Object.prototype.toString.call(e)
                        )
                          return this.reject(TypeError("must be an array"));
                        var r = e.length,
                          n = !1;
                        if (!r) return this.resolve([]);
                        for (var a = -1, s = new this(o); ++a < r; )
                          !(function (e) {
                            t.resolve(e).then(
                              function (e) {
                                n || ((n = !0), i.resolve(s, e));
                              },
                              function (e) {
                                n || ((n = !0), i.reject(s, e));
                              }
                            );
                          })(e[a]);
                        return s;
                      });
                  },
                  { 1: 1 },
                ],
                3: [
                  function (e, t, r) {
                    (function (t) {
                      "function" != typeof t.Promise && (t.Promise = e(2));
                    }).call(
                      this,
                      "undefined" != typeof global
                        ? global
                        : "undefined" != typeof self
                        ? self
                        : "undefined" != typeof window
                        ? window
                        : {}
                    );
                  },
                  { 2: 2 },
                ],
                4: [
                  function (e, t, r) {
                    var n =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                          ? function (e) {
                              return typeof e;
                            }
                          : function (e) {
                              return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                            },
                      o = (function () {
                        try {
                          if ("undefined" != typeof indexedDB) return indexedDB;
                          if ("undefined" != typeof webkitIndexedDB)
                            return webkitIndexedDB;
                          if ("undefined" != typeof mozIndexedDB)
                            return mozIndexedDB;
                          if ("undefined" != typeof OIndexedDB)
                            return OIndexedDB;
                          if ("undefined" != typeof msIndexedDB)
                            return msIndexedDB;
                        } catch {
                          return;
                        }
                      })();
                    function i(e, t) {
                      (e = e || []), (t = t || {});
                      try {
                        return new Blob(e, t);
                      } catch (i) {
                        if ("TypeError" !== i.name) throw i;
                        for (
                          var r =
                              "undefined" != typeof BlobBuilder
                                ? BlobBuilder
                                : "undefined" != typeof MSBlobBuilder
                                ? MSBlobBuilder
                                : "undefined" != typeof MozBlobBuilder
                                ? MozBlobBuilder
                                : WebKitBlobBuilder,
                            n = new r(),
                            o = 0;
                          o < e.length;
                          o += 1
                        )
                          n.append(e[o]);
                        return n.getBlob(t.type);
                      }
                    }
                    "undefined" == typeof Promise && e(3);
                    var a = Promise;
                    function s(e, t) {
                      t &&
                        e.then(
                          function (e) {
                            t(null, e);
                          },
                          function (e) {
                            t(e);
                          }
                        );
                    }
                    function l(e, t, r) {
                      "function" == typeof t && e.then(t),
                        "function" == typeof r && e.catch(r);
                    }
                    function u(e) {
                      return (
                        "string" != typeof e &&
                          (console.warn(
                            e + " used as a key, but it is not a string."
                          ),
                          (e = String(e))),
                        e
                      );
                    }
                    function c() {
                      if (
                        arguments.length &&
                        "function" == typeof arguments[arguments.length - 1]
                      )
                        return arguments[arguments.length - 1];
                    }
                    var f = "local-forage-detect-blob-support",
                      d = void 0,
                      h = {},
                      p = Object.prototype.toString,
                      v = "readonly",
                      m = "readwrite";
                    function y(e) {
                      var t = h[e.name],
                        r = {};
                      (r.promise = new a(function (e, t) {
                        (r.resolve = e), (r.reject = t);
                      })),
                        t.deferredOperations.push(r),
                        t.dbReady
                          ? (t.dbReady = t.dbReady.then(function () {
                              return r.promise;
                            }))
                          : (t.dbReady = r.promise);
                    }
                    function g(e) {
                      var t = h[e.name].deferredOperations.pop();
                      if (t) return t.resolve(), t.promise;
                    }
                    function E(e, t) {
                      var r = h[e.name].deferredOperations.pop();
                      if (r) return r.reject(t), r.promise;
                    }
                    function b(e, t) {
                      return new a(function (r, n) {
                        if (((h[e.name] = h[e.name] || S()), e.db)) {
                          if (!t) return r(e.db);
                          y(e), e.db.close();
                        }
                        var i = [e.name];
                        t && i.push(e.version);
                        var a = o.open.apply(o, i);
                        t &&
                          (a.onupgradeneeded = function (t) {
                            var r = a.result;
                            try {
                              r.createObjectStore(e.storeName),
                                t.oldVersion <= 1 && r.createObjectStore(f);
                            } catch (n) {
                              if ("ConstraintError" === n.name)
                                console.warn(
                                  'The database "' +
                                    e.name +
                                    '" has been upgraded from version ' +
                                    t.oldVersion +
                                    " to version " +
                                    t.newVersion +
                                    ', but the storage "' +
                                    e.storeName +
                                    '" already exists.'
                                );
                              else throw n;
                            }
                          }),
                          (a.onerror = function (e) {
                            e.preventDefault(), n(a.error);
                          }),
                          (a.onsuccess = function () {
                            r(a.result), g(e);
                          });
                      });
                    }
                    function _(e, t) {
                      if (!e.db) return !0;
                      var r = !e.db.objectStoreNames.contains(e.storeName),
                        n = e.version < e.db.version,
                        o = e.version > e.db.version;
                      if (
                        (n &&
                          (e.version !== t &&
                            console.warn(
                              'The database "' +
                                e.name +
                                "\" can't be downgraded from version " +
                                e.db.version +
                                " to version " +
                                e.version +
                                "."
                            ),
                          (e.version = e.db.version)),
                        o || r)
                      ) {
                        if (r) {
                          var i = e.db.version + 1;
                          i > e.version && (e.version = i);
                        }
                        return !0;
                      }
                      return !1;
                    }
                    function I(e) {
                      return i(
                        [
                          (function (e) {
                            for (
                              var t = e.length,
                                r = new ArrayBuffer(t),
                                n = new Uint8Array(r),
                                o = 0;
                              o < t;
                              o++
                            )
                              n[o] = e.charCodeAt(o);
                            return r;
                          })(atob(e.data)),
                        ],
                        { type: e.type }
                      );
                    }
                    function O(e) {
                      return e && e.__local_forage_encoded_blob;
                    }
                    function w(e) {
                      var t = this,
                        r = t._initReady().then(function () {
                          var e = h[t._dbInfo.name];
                          if (e && e.dbReady) return e.dbReady;
                        });
                      return l(r, e, e), r;
                    }
                    function N(e, t, r, n) {
                      void 0 === n && (n = 1);
                      try {
                        var o = e.db.transaction(e.storeName, t);
                        r(null, o);
                      } catch (i) {
                        if (
                          n > 0 &&
                          (!e.db ||
                            "InvalidStateError" === i.name ||
                            "NotFoundError" === i.name)
                        )
                          return a
                            .resolve()
                            .then(function () {
                              if (
                                !e.db ||
                                ("NotFoundError" === i.name &&
                                  !e.db.objectStoreNames.contains(
                                    e.storeName
                                  ) &&
                                  e.version <= e.db.version)
                              )
                                return (
                                  e.db && (e.version = e.db.version + 1),
                                  b(e, !0)
                                );
                            })
                            .then(function () {
                              return (function (e) {
                                y(e);
                                for (
                                  var t = h[e.name], r = t.forages, n = 0;
                                  n < r.length;
                                  n++
                                ) {
                                  var o = r[n];
                                  o._dbInfo.db &&
                                    (o._dbInfo.db.close(),
                                    (o._dbInfo.db = null));
                                }
                                return (
                                  (e.db = null),
                                  b(e, !1)
                                    .then(function (t) {
                                      return (e.db = t), _(e) ? b(e, !0) : t;
                                    })
                                    .then(function (n) {
                                      e.db = t.db = n;
                                      for (var o = 0; o < r.length; o++)
                                        r[o]._dbInfo.db = n;
                                    })
                                    .catch(function (t) {
                                      throw (E(e, t), t);
                                    })
                                );
                              })(e).then(function () {
                                N(e, t, r, n - 1);
                              });
                            })
                            .catch(r);
                        r(i);
                      }
                    }
                    function S() {
                      return {
                        forages: [],
                        db: null,
                        dbReady: null,
                        deferredOperations: [],
                      };
                    }
                    var R = {
                        _driver: "asyncStorage",
                        _initStorage: function (e) {
                          var t = this,
                            r = { db: null };
                          if (e) for (var n in e) r[n] = e[n];
                          var o = h[r.name];
                          o || ((o = S()), (h[r.name] = o)),
                            o.forages.push(t),
                            t._initReady ||
                              ((t._initReady = t.ready), (t.ready = w));
                          var i = [];
                          function s() {
                            return a.resolve();
                          }
                          for (var l = 0; l < o.forages.length; l++) {
                            var u = o.forages[l];
                            u !== t && i.push(u._initReady().catch(s));
                          }
                          var c = o.forages.slice(0);
                          return a
                            .all(i)
                            .then(function () {
                              return (r.db = o.db), b(r, !1);
                            })
                            .then(function (e) {
                              return (
                                (r.db = e),
                                _(r, t._defaultConfig.version) ? b(r, !0) : e
                              );
                            })
                            .then(function (e) {
                              (r.db = o.db = e), (t._dbInfo = r);
                              for (var n = 0; n < c.length; n++) {
                                var i = c[n];
                                i !== t &&
                                  ((i._dbInfo.db = r.db),
                                  (i._dbInfo.version = r.version));
                              }
                            });
                        },
                        _support: (function () {
                          try {
                            if (!o || !o.open) return !1;
                            var e =
                                "undefined" != typeof openDatabase &&
                                /(Safari|iPhone|iPad|iPod)/.test(
                                  navigator.userAgent
                                ) &&
                                !/Chrome/.test(navigator.userAgent) &&
                                !/BlackBerry/.test(navigator.platform),
                              t =
                                "function" == typeof fetch &&
                                -1 !== fetch.toString().indexOf("[native code");
                            return (
                              (!e || t) &&
                              "undefined" != typeof indexedDB &&
                              "undefined" != typeof IDBKeyRange
                            );
                          } catch {
                            return !1;
                          }
                        })(),
                        iterate: function (e, t) {
                          var r = this,
                            n = new a(function (t, n) {
                              r.ready()
                                .then(function () {
                                  N(r._dbInfo, v, function (o, i) {
                                    if (o) return n(o);
                                    try {
                                      var a = i
                                          .objectStore(r._dbInfo.storeName)
                                          .openCursor(),
                                        s = 1;
                                      (a.onsuccess = function () {
                                        var r = a.result;
                                        if (r) {
                                          var n = r.value;
                                          O(n) && (n = I(n));
                                          var o = e(n, r.key, s++);
                                          void 0 !== o ? t(o) : r.continue();
                                        } else t();
                                      }),
                                        (a.onerror = function () {
                                          n(a.error);
                                        });
                                    } catch (l) {
                                      n(l);
                                    }
                                  });
                                })
                                .catch(n);
                            });
                          return s(n, t), n;
                        },
                        getItem: function (e, t) {
                          var r = this;
                          e = u(e);
                          var n = new a(function (t, n) {
                            r.ready()
                              .then(function () {
                                N(r._dbInfo, v, function (o, i) {
                                  if (o) return n(o);
                                  try {
                                    var a = i
                                      .objectStore(r._dbInfo.storeName)
                                      .get(e);
                                    (a.onsuccess = function () {
                                      var e = a.result;
                                      void 0 === e && (e = null),
                                        O(e) && (e = I(e)),
                                        t(e);
                                    }),
                                      (a.onerror = function () {
                                        n(a.error);
                                      });
                                  } catch (s) {
                                    n(s);
                                  }
                                });
                              })
                              .catch(n);
                          });
                          return s(n, t), n;
                        },
                        setItem: function (e, t, r) {
                          var n = this;
                          e = u(e);
                          var o = new a(function (r, o) {
                            var s;
                            n.ready()
                              .then(function () {
                                var e;
                                return (
                                  (s = n._dbInfo),
                                  "[object Blob]" === p.call(t)
                                    ? ((e = s.db),
                                      "boolean" == typeof d
                                        ? a.resolve(d)
                                        : new a(function (t) {
                                            var r = e.transaction(f, m),
                                              n = i([""]);
                                            r.objectStore(f).put(n, "key"),
                                              (r.onabort = function (e) {
                                                e.preventDefault(),
                                                  e.stopPropagation(),
                                                  t(!1);
                                              }),
                                              (r.oncomplete = function () {
                                                var e =
                                                  navigator.userAgent.match(
                                                    /Chrome\/(\d+)/
                                                  );
                                                t(
                                                  navigator.userAgent.match(
                                                    /Edge\//
                                                  ) ||
                                                    !e ||
                                                    parseInt(e[1], 10) >= 43
                                                );
                                              });
                                          })
                                            .catch(function () {
                                              return !1;
                                            })
                                            .then(function (e) {
                                              return (d = e);
                                            })).then(function (e) {
                                        return e
                                          ? t
                                          : new a(function (e, r) {
                                              var n = new FileReader();
                                              (n.onerror = r),
                                                (n.onloadend = function (r) {
                                                  e({
                                                    __local_forage_encoded_blob:
                                                      !0,
                                                    data: btoa(
                                                      r.target.result || ""
                                                    ),
                                                    type: t.type,
                                                  });
                                                }),
                                                n.readAsBinaryString(t);
                                            });
                                      })
                                    : t
                                );
                              })
                              .then(function (t) {
                                N(n._dbInfo, m, function (i, a) {
                                  if (i) return o(i);
                                  try {
                                    var s = a.objectStore(n._dbInfo.storeName);
                                    null === t && (t = void 0);
                                    var l = s.put(t, e);
                                    (a.oncomplete = function () {
                                      void 0 === t && (t = null), r(t);
                                    }),
                                      (a.onabort = a.onerror =
                                        function () {
                                          var e = l.error
                                            ? l.error
                                            : l.transaction.error;
                                          o(e);
                                        });
                                  } catch (u) {
                                    o(u);
                                  }
                                });
                              })
                              .catch(o);
                          });
                          return s(o, r), o;
                        },
                        removeItem: function (e, t) {
                          var r = this;
                          e = u(e);
                          var n = new a(function (t, n) {
                            r.ready()
                              .then(function () {
                                N(r._dbInfo, m, function (o, i) {
                                  if (o) return n(o);
                                  try {
                                    var a = i
                                      .objectStore(r._dbInfo.storeName)
                                      .delete(e);
                                    (i.oncomplete = function () {
                                      t();
                                    }),
                                      (i.onerror = function () {
                                        n(a.error);
                                      }),
                                      (i.onabort = function () {
                                        var e = a.error
                                          ? a.error
                                          : a.transaction.error;
                                        n(e);
                                      });
                                  } catch (s) {
                                    n(s);
                                  }
                                });
                              })
                              .catch(n);
                          });
                          return s(n, t), n;
                        },
                        clear: function (e) {
                          var t = this,
                            r = new a(function (e, r) {
                              t.ready()
                                .then(function () {
                                  N(t._dbInfo, m, function (n, o) {
                                    if (n) return r(n);
                                    try {
                                      var i = o
                                        .objectStore(t._dbInfo.storeName)
                                        .clear();
                                      (o.oncomplete = function () {
                                        e();
                                      }),
                                        (o.onabort = o.onerror =
                                          function () {
                                            var e = i.error
                                              ? i.error
                                              : i.transaction.error;
                                            r(e);
                                          });
                                    } catch (a) {
                                      r(a);
                                    }
                                  });
                                })
                                .catch(r);
                            });
                          return s(r, e), r;
                        },
                        length: function (e) {
                          var t = this,
                            r = new a(function (e, r) {
                              t.ready()
                                .then(function () {
                                  N(t._dbInfo, v, function (n, o) {
                                    if (n) return r(n);
                                    try {
                                      var i = o
                                        .objectStore(t._dbInfo.storeName)
                                        .count();
                                      (i.onsuccess = function () {
                                        e(i.result);
                                      }),
                                        (i.onerror = function () {
                                          r(i.error);
                                        });
                                    } catch (a) {
                                      r(a);
                                    }
                                  });
                                })
                                .catch(r);
                            });
                          return s(r, e), r;
                        },
                        key: function (e, t) {
                          var r = this,
                            n = new a(function (t, n) {
                              if (e < 0) {
                                t(null);
                                return;
                              }
                              r.ready()
                                .then(function () {
                                  N(r._dbInfo, v, function (o, i) {
                                    if (o) return n(o);
                                    try {
                                      var a = i.objectStore(
                                          r._dbInfo.storeName
                                        ),
                                        s = !1,
                                        l = a.openKeyCursor();
                                      (l.onsuccess = function () {
                                        var r = l.result;
                                        if (!r) {
                                          t(null);
                                          return;
                                        }
                                        0 === e || s
                                          ? t(r.key)
                                          : ((s = !0), r.advance(e));
                                      }),
                                        (l.onerror = function () {
                                          n(l.error);
                                        });
                                    } catch (u) {
                                      n(u);
                                    }
                                  });
                                })
                                .catch(n);
                            });
                          return s(n, t), n;
                        },
                        keys: function (e) {
                          var t = this,
                            r = new a(function (e, r) {
                              t.ready()
                                .then(function () {
                                  N(t._dbInfo, v, function (n, o) {
                                    if (n) return r(n);
                                    try {
                                      var i = o
                                          .objectStore(t._dbInfo.storeName)
                                          .openKeyCursor(),
                                        a = [];
                                      (i.onsuccess = function () {
                                        var t = i.result;
                                        if (!t) {
                                          e(a);
                                          return;
                                        }
                                        a.push(t.key), t.continue();
                                      }),
                                        (i.onerror = function () {
                                          r(i.error);
                                        });
                                    } catch (s) {
                                      r(s);
                                    }
                                  });
                                })
                                .catch(r);
                            });
                          return s(r, e), r;
                        },
                        dropInstance: function (e, t) {
                          t = c.apply(this, arguments);
                          var r,
                            n = this.config();
                          if (
                            ((e = ("function" != typeof e && e) || {}).name ||
                              ((e.name = e.name || n.name),
                              (e.storeName = e.storeName || n.storeName)),
                            e.name)
                          ) {
                            var i =
                              e.name === n.name && this._dbInfo.db
                                ? a.resolve(this._dbInfo.db)
                                : b(e, !1).then(function (t) {
                                    var r = h[e.name],
                                      n = r.forages;
                                    r.db = t;
                                    for (var o = 0; o < n.length; o++)
                                      n[o]._dbInfo.db = t;
                                    return t;
                                  });
                            r = e.storeName
                              ? i.then(function (t) {
                                  if (
                                    t.objectStoreNames.contains(e.storeName)
                                  ) {
                                    var r = t.version + 1;
                                    y(e);
                                    var n = h[e.name],
                                      i = n.forages;
                                    t.close();
                                    for (var s = 0; s < i.length; s++) {
                                      var l = i[s];
                                      (l._dbInfo.db = null),
                                        (l._dbInfo.version = r);
                                    }
                                    return new a(function (t, n) {
                                      var i = o.open(e.name, r);
                                      (i.onerror = function (e) {
                                        i.result.close(), n(e);
                                      }),
                                        (i.onupgradeneeded = function () {
                                          i.result.deleteObjectStore(
                                            e.storeName
                                          );
                                        }),
                                        (i.onsuccess = function () {
                                          var e = i.result;
                                          e.close(), t(e);
                                        });
                                    })
                                      .then(function (e) {
                                        n.db = e;
                                        for (var t = 0; t < i.length; t++) {
                                          var r = i[t];
                                          (r._dbInfo.db = e), g(r._dbInfo);
                                        }
                                      })
                                      .catch(function (t) {
                                        throw (
                                          ((E(e, t) || a.resolve()).catch(
                                            function () {}
                                          ),
                                          t)
                                        );
                                      });
                                  }
                                })
                              : i.then(function (t) {
                                  y(e);
                                  var r = h[e.name],
                                    n = r.forages;
                                  t.close();
                                  for (var i = 0; i < n.length; i++)
                                    n[i]._dbInfo.db = null;
                                  return new a(function (t, r) {
                                    var n = o.deleteDatabase(e.name);
                                    (n.onerror = n.onblocked =
                                      function (e) {
                                        var t = n.result;
                                        t && t.close(), r(e);
                                      }),
                                      (n.onsuccess = function () {
                                        var e = n.result;
                                        e && e.close(), t(e);
                                      });
                                  })
                                    .then(function (e) {
                                      r.db = e;
                                      for (var t = 0; t < n.length; t++)
                                        g(n[t]._dbInfo);
                                    })
                                    .catch(function (t) {
                                      throw (
                                        ((E(e, t) || a.resolve()).catch(
                                          function () {}
                                        ),
                                        t)
                                      );
                                    });
                                });
                          } else r = a.reject("Invalid arguments");
                          return s(r, t), r;
                        },
                      },
                      A =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                      T = /^~~local_forage_type~([^~]+)~/,
                      L = "__lfsc__:",
                      M = L.length,
                      j = "arbf",
                      $ = "blob",
                      P = "si08",
                      C = "ui08",
                      x = "uic8",
                      D = "si16",
                      k = "si32",
                      U = "ur16",
                      F = "ui32",
                      B = "fl32",
                      G = "fl64",
                      W = M + j.length,
                      H = Object.prototype.toString;
                    function q(e) {
                      var t,
                        r,
                        n,
                        o,
                        i,
                        a = 0.75 * e.length,
                        s = e.length,
                        l = 0;
                      "=" === e[e.length - 1] &&
                        (a--, "=" === e[e.length - 2] && a--);
                      var u = new ArrayBuffer(a),
                        c = new Uint8Array(u);
                      for (t = 0; t < s; t += 4)
                        (r = A.indexOf(e[t])),
                          (n = A.indexOf(e[t + 1])),
                          (o = A.indexOf(e[t + 2])),
                          (i = A.indexOf(e[t + 3])),
                          (c[l++] = (r << 2) | (n >> 4)),
                          (c[l++] = ((15 & n) << 4) | (o >> 2)),
                          (c[l++] = ((3 & o) << 6) | (63 & i));
                      return u;
                    }
                    function z(e) {
                      var t,
                        r = new Uint8Array(e),
                        n = "";
                      for (t = 0; t < r.length; t += 3)
                        n +=
                          A[r[t] >> 2] +
                          A[((3 & r[t]) << 4) | (r[t + 1] >> 4)] +
                          A[((15 & r[t + 1]) << 2) | (r[t + 2] >> 6)] +
                          A[63 & r[t + 2]];
                      return (
                        r.length % 3 == 2
                          ? (n = n.substring(0, n.length - 1) + "=")
                          : r.length % 3 == 1 &&
                            (n = n.substring(0, n.length - 2) + "=="),
                        n
                      );
                    }
                    var V = {
                      serialize: function (e, t) {
                        var r = "";
                        if (
                          (e && (r = H.call(e)),
                          e &&
                            ("[object ArrayBuffer]" === r ||
                              (e.buffer &&
                                "[object ArrayBuffer]" === H.call(e.buffer))))
                        ) {
                          var n,
                            o = L;
                          e instanceof ArrayBuffer
                            ? ((n = e), (o += j))
                            : ((n = e.buffer),
                              "[object Int8Array]" === r
                                ? (o += P)
                                : "[object Uint8Array]" === r
                                ? (o += C)
                                : "[object Uint8ClampedArray]" === r
                                ? (o += x)
                                : "[object Int16Array]" === r
                                ? (o += D)
                                : "[object Uint16Array]" === r
                                ? (o += U)
                                : "[object Int32Array]" === r
                                ? (o += k)
                                : "[object Uint32Array]" === r
                                ? (o += F)
                                : "[object Float32Array]" === r
                                ? (o += B)
                                : "[object Float64Array]" === r
                                ? (o += G)
                                : t(
                                    Error("Failed to get type for BinaryArray")
                                  )),
                            t(o + z(n));
                        } else if ("[object Blob]" === r) {
                          var i = new FileReader();
                          (i.onload = function () {
                            t(
                              L +
                                $ +
                                ("~~local_forage_type~" + e.type) +
                                "~" +
                                z(this.result)
                            );
                          }),
                            i.readAsArrayBuffer(e);
                        } else
                          try {
                            t(JSON.stringify(e));
                          } catch (a) {
                            console.error(
                              "Couldn't convert value into a JSON string: ",
                              e
                            ),
                              t(null, a);
                          }
                      },
                      deserialize: function (e) {
                        if (e.substring(0, M) !== L) return JSON.parse(e);
                        var t,
                          r = e.substring(W),
                          n = e.substring(M, W);
                        if (n === $ && T.test(r)) {
                          var o = r.match(T);
                          (t = o[1]), (r = r.substring(o[0].length));
                        }
                        var a = q(r);
                        switch (n) {
                          case j:
                            return a;
                          case $:
                            return i([a], { type: t });
                          case P:
                            return new Int8Array(a);
                          case C:
                            return new Uint8Array(a);
                          case x:
                            return new Uint8ClampedArray(a);
                          case D:
                            return new Int16Array(a);
                          case U:
                            return new Uint16Array(a);
                          case k:
                            return new Int32Array(a);
                          case F:
                            return new Uint32Array(a);
                          case B:
                            return new Float32Array(a);
                          case G:
                            return new Float64Array(a);
                          default:
                            throw Error("Unkown type: " + n);
                        }
                      },
                      stringToBuffer: q,
                      bufferToString: z,
                    };
                    function X(e, t, r, n) {
                      e.executeSql(
                        "CREATE TABLE IF NOT EXISTS " +
                          t.storeName +
                          " (id INTEGER PRIMARY KEY, key unique, value)",
                        [],
                        r,
                        n
                      );
                    }
                    function K(e, t, r, n, o, i) {
                      e.executeSql(
                        r,
                        n,
                        o,
                        function (e, a) {
                          a.code === a.SYNTAX_ERR
                            ? e.executeSql(
                                "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                                [t.storeName],
                                function (e, s) {
                                  s.rows.length
                                    ? i(e, a)
                                    : X(
                                        e,
                                        t,
                                        function () {
                                          e.executeSql(r, n, o, i);
                                        },
                                        i
                                      );
                                },
                                i
                              )
                            : i(e, a);
                        },
                        i
                      );
                    }
                    function Y(e, t, r, n) {
                      var o = this;
                      e = u(e);
                      var i = new a(function (i, a) {
                        o.ready()
                          .then(function () {
                            void 0 === t && (t = null);
                            var s = t,
                              l = o._dbInfo;
                            l.serializer.serialize(t, function (t, u) {
                              u
                                ? a(u)
                                : l.db.transaction(
                                    function (r) {
                                      K(
                                        r,
                                        l,
                                        "INSERT OR REPLACE INTO " +
                                          l.storeName +
                                          " (key, value) VALUES (?, ?)",
                                        [e, t],
                                        function () {
                                          i(s);
                                        },
                                        function (e, t) {
                                          a(t);
                                        }
                                      );
                                    },
                                    function (t) {
                                      if (t.code === t.QUOTA_ERR) {
                                        if (n > 0) {
                                          i(Y.apply(o, [e, s, r, n - 1]));
                                          return;
                                        }
                                        a(t);
                                      }
                                    }
                                  );
                            });
                          })
                          .catch(a);
                      });
                      return s(i, r), i;
                    }
                    var J = {
                      _driver: "webSQLStorage",
                      _initStorage: function (e) {
                        var t = this,
                          r = { db: null };
                        if (e)
                          for (var n in e)
                            r[n] =
                              "string" != typeof e[n] ? e[n].toString() : e[n];
                        var o = new a(function (e, n) {
                          try {
                            r.db = openDatabase(
                              r.name,
                              String(r.version),
                              r.description,
                              r.size
                            );
                          } catch (o) {
                            return n(o);
                          }
                          r.db.transaction(function (o) {
                            X(
                              o,
                              r,
                              function () {
                                (t._dbInfo = r), e();
                              },
                              function (e, t) {
                                n(t);
                              }
                            );
                          }, n);
                        });
                        return (r.serializer = V), o;
                      },
                      _support: "function" == typeof openDatabase,
                      iterate: function (e, t) {
                        var r = this,
                          n = new a(function (t, n) {
                            r.ready()
                              .then(function () {
                                var o = r._dbInfo;
                                o.db.transaction(function (r) {
                                  K(
                                    r,
                                    o,
                                    "SELECT * FROM " + o.storeName,
                                    [],
                                    function (r, n) {
                                      for (
                                        var i = n.rows, a = i.length, s = 0;
                                        s < a;
                                        s++
                                      ) {
                                        var l = i.item(s),
                                          u = l.value;
                                        if (
                                          (u &&
                                            (u = o.serializer.deserialize(u)),
                                          void 0 !== (u = e(u, l.key, s + 1)))
                                        ) {
                                          t(u);
                                          return;
                                        }
                                      }
                                      t();
                                    },
                                    function (e, t) {
                                      n(t);
                                    }
                                  );
                                });
                              })
                              .catch(n);
                          });
                        return s(n, t), n;
                      },
                      getItem: function (e, t) {
                        var r = this;
                        e = u(e);
                        var n = new a(function (t, n) {
                          r.ready()
                            .then(function () {
                              var o = r._dbInfo;
                              o.db.transaction(function (r) {
                                K(
                                  r,
                                  o,
                                  "SELECT * FROM " +
                                    o.storeName +
                                    " WHERE key = ? LIMIT 1",
                                  [e],
                                  function (e, r) {
                                    var n = r.rows.length
                                      ? r.rows.item(0).value
                                      : null;
                                    n && (n = o.serializer.deserialize(n)),
                                      t(n);
                                  },
                                  function (e, t) {
                                    n(t);
                                  }
                                );
                              });
                            })
                            .catch(n);
                        });
                        return s(n, t), n;
                      },
                      setItem: function (e, t, r) {
                        return Y.apply(this, [e, t, r, 1]);
                      },
                      removeItem: function (e, t) {
                        var r = this;
                        e = u(e);
                        var n = new a(function (t, n) {
                          r.ready()
                            .then(function () {
                              var o = r._dbInfo;
                              o.db.transaction(function (r) {
                                K(
                                  r,
                                  o,
                                  "DELETE FROM " +
                                    o.storeName +
                                    " WHERE key = ?",
                                  [e],
                                  function () {
                                    t();
                                  },
                                  function (e, t) {
                                    n(t);
                                  }
                                );
                              });
                            })
                            .catch(n);
                        });
                        return s(n, t), n;
                      },
                      clear: function (e) {
                        var t = this,
                          r = new a(function (e, r) {
                            t.ready()
                              .then(function () {
                                var n = t._dbInfo;
                                n.db.transaction(function (t) {
                                  K(
                                    t,
                                    n,
                                    "DELETE FROM " + n.storeName,
                                    [],
                                    function () {
                                      e();
                                    },
                                    function (e, t) {
                                      r(t);
                                    }
                                  );
                                });
                              })
                              .catch(r);
                          });
                        return s(r, e), r;
                      },
                      length: function (e) {
                        var t = this,
                          r = new a(function (e, r) {
                            t.ready()
                              .then(function () {
                                var n = t._dbInfo;
                                n.db.transaction(function (t) {
                                  K(
                                    t,
                                    n,
                                    "SELECT COUNT(key) as c FROM " +
                                      n.storeName,
                                    [],
                                    function (t, r) {
                                      e(r.rows.item(0).c);
                                    },
                                    function (e, t) {
                                      r(t);
                                    }
                                  );
                                });
                              })
                              .catch(r);
                          });
                        return s(r, e), r;
                      },
                      key: function (e, t) {
                        var r = this,
                          n = new a(function (t, n) {
                            r.ready()
                              .then(function () {
                                var o = r._dbInfo;
                                o.db.transaction(function (r) {
                                  K(
                                    r,
                                    o,
                                    "SELECT key FROM " +
                                      o.storeName +
                                      " WHERE id = ? LIMIT 1",
                                    [e + 1],
                                    function (e, r) {
                                      t(
                                        r.rows.length
                                          ? r.rows.item(0).key
                                          : null
                                      );
                                    },
                                    function (e, t) {
                                      n(t);
                                    }
                                  );
                                });
                              })
                              .catch(n);
                          });
                        return s(n, t), n;
                      },
                      keys: function (e) {
                        var t = this,
                          r = new a(function (e, r) {
                            t.ready()
                              .then(function () {
                                var n = t._dbInfo;
                                n.db.transaction(function (t) {
                                  K(
                                    t,
                                    n,
                                    "SELECT key FROM " + n.storeName,
                                    [],
                                    function (t, r) {
                                      for (
                                        var n = [], o = 0;
                                        o < r.rows.length;
                                        o++
                                      )
                                        n.push(r.rows.item(o).key);
                                      e(n);
                                    },
                                    function (e, t) {
                                      r(t);
                                    }
                                  );
                                });
                              })
                              .catch(r);
                          });
                        return s(r, e), r;
                      },
                      dropInstance: function (e, t) {
                        t = c.apply(this, arguments);
                        var r = this.config();
                        (e = ("function" != typeof e && e) || {}).name ||
                          ((e.name = e.name || r.name),
                          (e.storeName = e.storeName || r.storeName));
                        var n,
                          o = this;
                        return (
                          s(
                            (n = e.name
                              ? new a(function (t) {
                                  var n;
                                  (n =
                                    e.name === r.name
                                      ? o._dbInfo.db
                                      : openDatabase(e.name, "", "", 0)),
                                    t(
                                      e.storeName
                                        ? { db: n, storeNames: [e.storeName] }
                                        : new a(function (e, t) {
                                            n.transaction(
                                              function (r) {
                                                r.executeSql(
                                                  "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                                                  [],
                                                  function (t, r) {
                                                    for (
                                                      var o = [], i = 0;
                                                      i < r.rows.length;
                                                      i++
                                                    )
                                                      o.push(
                                                        r.rows.item(i).name
                                                      );
                                                    e({ db: n, storeNames: o });
                                                  },
                                                  function (e, r) {
                                                    t(r);
                                                  }
                                                );
                                              },
                                              function (e) {
                                                t(e);
                                              }
                                            );
                                          })
                                    );
                                }).then(function (e) {
                                  return new a(function (t, r) {
                                    e.db.transaction(
                                      function (n) {
                                        for (
                                          var o = [],
                                            i = 0,
                                            s = e.storeNames.length;
                                          i < s;
                                          i++
                                        )
                                          o.push(
                                            (function (e) {
                                              return new a(function (t, r) {
                                                n.executeSql(
                                                  "DROP TABLE IF EXISTS " + e,
                                                  [],
                                                  function () {
                                                    t();
                                                  },
                                                  function (e, t) {
                                                    r(t);
                                                  }
                                                );
                                              });
                                            })(e.storeNames[i])
                                          );
                                        a.all(o)
                                          .then(function () {
                                            t();
                                          })
                                          .catch(function (e) {
                                            r(e);
                                          });
                                      },
                                      function (e) {
                                        r(e);
                                      }
                                    );
                                  });
                                })
                              : a.reject("Invalid arguments")),
                            t
                          ),
                          n
                        );
                      },
                    };
                    function Q(e, t) {
                      var r = e.name + "/";
                      return (
                        e.storeName !== t.storeName && (r += e.storeName + "/"),
                        r
                      );
                    }
                    var Z = function (e, t) {
                        for (var r, n = e.length, o = 0; o < n; ) {
                          if (
                            (r = e[o]) === t ||
                            ("number" == typeof r &&
                              "number" == typeof t &&
                              isNaN(r) &&
                              isNaN(t))
                          )
                            return !0;
                          o++;
                        }
                        return !1;
                      },
                      ee =
                        Array.isArray ||
                        function (e) {
                          return (
                            "[object Array]" ===
                            Object.prototype.toString.call(e)
                          );
                        },
                      et = {},
                      er = {},
                      en = {
                        INDEXEDDB: R,
                        WEBSQL: J,
                        LOCALSTORAGE: {
                          _driver: "localStorageWrapper",
                          _initStorage: function (e) {
                            var t = this,
                              r = {};
                            if (e) for (var n in e) r[n] = e[n];
                            return (
                              (r.keyPrefix = Q(e, t._defaultConfig)),
                              !(function () {
                                var e = "_localforage_support_test";
                                try {
                                  return (
                                    localStorage.setItem(e, !0),
                                    localStorage.removeItem(e),
                                    !1
                                  );
                                } catch {
                                  return !0;
                                }
                              })() || localStorage.length > 0
                                ? ((t._dbInfo = r),
                                  (r.serializer = V),
                                  a.resolve())
                                : a.reject()
                            );
                          },
                          _support: (function () {
                            try {
                              return (
                                "undefined" != typeof localStorage &&
                                "setItem" in localStorage &&
                                !!localStorage.setItem
                              );
                            } catch {
                              return !1;
                            }
                          })(),
                          iterate: function (e, t) {
                            var r = this,
                              n = r.ready().then(function () {
                                for (
                                  var t = r._dbInfo,
                                    n = t.keyPrefix,
                                    o = n.length,
                                    i = localStorage.length,
                                    a = 1,
                                    s = 0;
                                  s < i;
                                  s++
                                ) {
                                  var l = localStorage.key(s);
                                  if (0 === l.indexOf(n)) {
                                    var u = localStorage.getItem(l);
                                    if (
                                      (u && (u = t.serializer.deserialize(u)),
                                      void 0 !==
                                        (u = e(u, l.substring(o), a++)))
                                    )
                                      return u;
                                  }
                                }
                              });
                            return s(n, t), n;
                          },
                          getItem: function (e, t) {
                            var r = this;
                            e = u(e);
                            var n = r.ready().then(function () {
                              var t = r._dbInfo,
                                n = localStorage.getItem(t.keyPrefix + e);
                              return n && (n = t.serializer.deserialize(n)), n;
                            });
                            return s(n, t), n;
                          },
                          setItem: function (e, t, r) {
                            var n = this;
                            e = u(e);
                            var o = n.ready().then(function () {
                              void 0 === t && (t = null);
                              var r = t;
                              return new a(function (o, i) {
                                var a = n._dbInfo;
                                a.serializer.serialize(t, function (t, n) {
                                  if (n) i(n);
                                  else
                                    try {
                                      localStorage.setItem(a.keyPrefix + e, t),
                                        o(r);
                                    } catch (s) {
                                      ("QuotaExceededError" === s.name ||
                                        "NS_ERROR_DOM_QUOTA_REACHED" ===
                                          s.name) &&
                                        i(s),
                                        i(s);
                                    }
                                });
                              });
                            });
                            return s(o, r), o;
                          },
                          removeItem: function (e, t) {
                            var r = this;
                            e = u(e);
                            var n = r.ready().then(function () {
                              var t = r._dbInfo;
                              localStorage.removeItem(t.keyPrefix + e);
                            });
                            return s(n, t), n;
                          },
                          clear: function (e) {
                            var t = this,
                              r = t.ready().then(function () {
                                for (
                                  var e = t._dbInfo.keyPrefix,
                                    r = localStorage.length - 1;
                                  r >= 0;
                                  r--
                                ) {
                                  var n = localStorage.key(r);
                                  0 === n.indexOf(e) &&
                                    localStorage.removeItem(n);
                                }
                              });
                            return s(r, e), r;
                          },
                          length: function (e) {
                            var t = this.keys().then(function (e) {
                              return e.length;
                            });
                            return s(t, e), t;
                          },
                          key: function (e, t) {
                            var r = this,
                              n = r.ready().then(function () {
                                var t,
                                  n = r._dbInfo;
                                try {
                                  t = localStorage.key(e);
                                } catch {
                                  t = null;
                                }
                                return (
                                  t && (t = t.substring(n.keyPrefix.length)), t
                                );
                              });
                            return s(n, t), n;
                          },
                          keys: function (e) {
                            var t = this,
                              r = t.ready().then(function () {
                                for (
                                  var e = t._dbInfo,
                                    r = localStorage.length,
                                    n = [],
                                    o = 0;
                                  o < r;
                                  o++
                                ) {
                                  var i = localStorage.key(o);
                                  0 === i.indexOf(e.keyPrefix) &&
                                    n.push(i.substring(e.keyPrefix.length));
                                }
                                return n;
                              });
                            return s(r, e), r;
                          },
                          dropInstance: function (e, t) {
                            if (
                              ((t = c.apply(this, arguments)),
                              !(e = ("function" != typeof e && e) || {}).name)
                            ) {
                              var r = this.config();
                              (e.name = e.name || r.name),
                                (e.storeName = e.storeName || r.storeName);
                            }
                            var n,
                              o = this;
                            return (
                              s(
                                (n = e.name
                                  ? new a(function (t) {
                                      t(
                                        e.storeName
                                          ? Q(e, o._defaultConfig)
                                          : e.name + "/"
                                      );
                                    }).then(function (e) {
                                      for (
                                        var t = localStorage.length - 1;
                                        t >= 0;
                                        t--
                                      ) {
                                        var r = localStorage.key(t);
                                        0 === r.indexOf(e) &&
                                          localStorage.removeItem(r);
                                      }
                                    })
                                  : a.reject("Invalid arguments")),
                                t
                              ),
                              n
                            );
                          },
                        },
                      },
                      eo = [
                        en.INDEXEDDB._driver,
                        en.WEBSQL._driver,
                        en.LOCALSTORAGE._driver,
                      ],
                      ei = ["dropInstance"],
                      ea = [
                        "clear",
                        "getItem",
                        "iterate",
                        "key",
                        "keys",
                        "length",
                        "removeItem",
                        "setItem",
                      ].concat(ei),
                      es = {
                        description: "",
                        driver: eo.slice(),
                        name: "localforage",
                        size: 4980736,
                        storeName: "keyvaluepairs",
                        version: 1,
                      };
                    function el() {
                      for (var e = 1; e < arguments.length; e++) {
                        var t = arguments[e];
                        if (t)
                          for (var r in t)
                            t.hasOwnProperty(r) &&
                              (ee(t[r])
                                ? (arguments[0][r] = t[r].slice())
                                : (arguments[0][r] = t[r]));
                      }
                      return arguments[0];
                    }
                    var eu = new ((function () {
                      function e(t) {
                        for (var r in (!(function (e, t) {
                          if (!(e instanceof t))
                            throw TypeError(
                              "Cannot call a class as a function"
                            );
                        })(this, e),
                        en))
                          if (en.hasOwnProperty(r)) {
                            var n = en[r],
                              o = n._driver;
                            (this[r] = o), et[o] || this.defineDriver(n);
                          }
                        (this._defaultConfig = el({}, es)),
                          (this._config = el({}, this._defaultConfig, t)),
                          (this._driverSet = null),
                          (this._initDriver = null),
                          (this._ready = !1),
                          (this._dbInfo = null),
                          this._wrapLibraryMethodsWithReady(),
                          this.setDriver(this._config.driver).catch(
                            function () {}
                          );
                      }
                      return (
                        (e.prototype.config = function (e) {
                          if ((void 0 === e ? "undefined" : n(e)) !== "object")
                            return "string" == typeof e
                              ? this._config[e]
                              : this._config;
                          if (this._ready)
                            return Error(
                              "Can't call config() after localforage has been used."
                            );
                          for (var t in e) {
                            if (
                              ("storeName" === t &&
                                (e[t] = e[t].replace(/\W/g, "_")),
                              "version" === t && "number" != typeof e[t])
                            )
                              return Error(
                                "Database version must be a number."
                              );
                            this._config[t] = e[t];
                          }
                          return (
                            !("driver" in e) ||
                            !e.driver ||
                            this.setDriver(this._config.driver)
                          );
                        }),
                        (e.prototype.defineDriver = function (e, t, r) {
                          var n = new a(function (t, r) {
                            try {
                              var n = e._driver,
                                o = Error(
                                  "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"
                                );
                              if (!e._driver) {
                                r(o);
                                return;
                              }
                              for (
                                var i = ea.concat("_initStorage"),
                                  l = 0,
                                  u = i.length;
                                l < u;
                                l++
                              ) {
                                var c = i[l];
                                if (
                                  (!Z(ei, c) || e[c]) &&
                                  "function" != typeof e[c]
                                ) {
                                  r(o);
                                  return;
                                }
                              }
                              (function () {
                                for (
                                  var t = function (e) {
                                      return function () {
                                        var t = Error(
                                            "Method " +
                                              e +
                                              " is not implemented by the current driver"
                                          ),
                                          r = a.reject(t);
                                        return (
                                          s(r, arguments[arguments.length - 1]),
                                          r
                                        );
                                      };
                                    },
                                    r = 0,
                                    n = ei.length;
                                  r < n;
                                  r++
                                ) {
                                  var o = ei[r];
                                  e[o] || (e[o] = t(o));
                                }
                              })();
                              var f = function (r) {
                                et[n] &&
                                  console.info(
                                    "Redefining LocalForage driver: " + n
                                  ),
                                  (et[n] = e),
                                  (er[n] = r),
                                  t();
                              };
                              "_support" in e
                                ? e._support && "function" == typeof e._support
                                  ? e._support().then(f, r)
                                  : f(!!e._support)
                                : f(!0);
                            } catch (d) {
                              r(d);
                            }
                          });
                          return l(n, t, r), n;
                        }),
                        (e.prototype.driver = function () {
                          return this._driver || null;
                        }),
                        (e.prototype.getDriver = function (e, t, r) {
                          var n = et[e]
                            ? a.resolve(et[e])
                            : a.reject(Error("Driver not found."));
                          return l(n, t, r), n;
                        }),
                        (e.prototype.getSerializer = function (e) {
                          var t = a.resolve(V);
                          return l(t, e), t;
                        }),
                        (e.prototype.ready = function (e) {
                          var t = this,
                            r = t._driverSet.then(function () {
                              return (
                                null === t._ready &&
                                  (t._ready = t._initDriver()),
                                t._ready
                              );
                            });
                          return l(r, e, e), r;
                        }),
                        (e.prototype.setDriver = function (e, t, r) {
                          var n = this;
                          ee(e) || (e = [e]);
                          var o = this._getSupportedDrivers(e);
                          function i() {
                            n._config.driver = n.driver();
                          }
                          function s(e) {
                            return (
                              n._extend(e),
                              i(),
                              (n._ready = n._initStorage(n._config)),
                              n._ready
                            );
                          }
                          var u =
                            null !== this._driverSet
                              ? this._driverSet.catch(function () {
                                  return a.resolve();
                                })
                              : a.resolve();
                          return (
                            (this._driverSet = u
                              .then(function () {
                                var e = o[0];
                                return (
                                  (n._dbInfo = null),
                                  (n._ready = null),
                                  n.getDriver(e).then(function (e) {
                                    (n._driver = e._driver),
                                      i(),
                                      n._wrapLibraryMethodsWithReady(),
                                      (n._initDriver = function () {
                                        var e = 0;
                                        return (function t() {
                                          for (; e < o.length; ) {
                                            var r = o[e];
                                            return (
                                              e++,
                                              (n._dbInfo = null),
                                              (n._ready = null),
                                              n.getDriver(r).then(s).catch(t)
                                            );
                                          }
                                          i();
                                          var l = Error(
                                            "No available storage method found."
                                          );
                                          return (
                                            (n._driverSet = a.reject(l)),
                                            n._driverSet
                                          );
                                        })();
                                      });
                                  })
                                );
                              })
                              .catch(function () {
                                i();
                                var e = Error(
                                  "No available storage method found."
                                );
                                return (
                                  (n._driverSet = a.reject(e)), n._driverSet
                                );
                              })),
                            l(this._driverSet, t, r),
                            this._driverSet
                          );
                        }),
                        (e.prototype.supports = function (e) {
                          return !!er[e];
                        }),
                        (e.prototype._extend = function (e) {
                          el(this, e);
                        }),
                        (e.prototype._getSupportedDrivers = function (e) {
                          for (var t = [], r = 0, n = e.length; r < n; r++) {
                            var o = e[r];
                            this.supports(o) && t.push(o);
                          }
                          return t;
                        }),
                        (e.prototype._wrapLibraryMethodsWithReady =
                          function () {
                            for (var e = 0, t = ea.length; e < t; e++)
                              (function (e, t) {
                                e[t] = function () {
                                  var r = arguments;
                                  return e.ready().then(function () {
                                    return e[t].apply(e, r);
                                  });
                                };
                              })(this, ea[e]);
                          }),
                        (e.prototype.createInstance = function (t) {
                          return new e(t);
                        }),
                        e
                      );
                    })())();
                    t.exports = eu;
                  },
                  { 3: 3 },
                ],
              },
              {},
              [4]
            )(4);
          });
        }),
        tV = tG((e, t) => {
          var r, n;
          (r = "undefined" != typeof self ? self : e),
            (n = function (e) {
              var t = /^~~local_forage_type~([^~]+)~/,
                r = Object.prototype.toString;
              function n(e) {
                var t = 0.75 * e.length,
                  r = e.length;
                "=" === e[e.length - 1] &&
                  (t--, "=" === e[e.length - 2] && t--);
                for (
                  var n = new ArrayBuffer(t),
                    o = new Uint8Array(n),
                    i = 0,
                    a = 0;
                  i < r;
                  i += 4
                ) {
                  var s =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                        e[i]
                      ),
                    l =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                        e[i + 1]
                      ),
                    u =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                        e[i + 2]
                      ),
                    c =
                      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
                        e[i + 3]
                      );
                  (o[a++] = (s << 2) | (l >> 4)),
                    (o[a++] = ((15 & l) << 4) | (u >> 2)),
                    (o[a++] = ((3 & u) << 6) | (63 & c));
                }
                return n;
              }
              function o(e) {
                for (
                  var t = new Uint8Array(e), r = "", n = 0;
                  n < t.length;
                  n += 3
                )
                  r +=
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      t[n] >> 2
                    ] +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      ((3 & t[n]) << 4) | (t[n + 1] >> 4)
                    ] +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      ((15 & t[n + 1]) << 2) | (t[n + 2] >> 6)
                    ] +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
                      63 & t[n + 2]
                    ];
                return (
                  t.length % 3 == 2
                    ? (r = r.substring(0, r.length - 1) + "=")
                    : t.length % 3 == 1 &&
                      (r = r.substring(0, r.length - 2) + "=="),
                  r
                );
              }
              function i(e, t) {
                return (
                  (e.name || t.name) + "/" + (e.storeName || t.storeName) + "/"
                );
              }
              function a(e, t) {
                t &&
                  e.then(
                    function (e) {
                      t(null, e);
                    },
                    function (e) {
                      t(e);
                    }
                  );
              }
              function s() {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                if (
                  arguments.length &&
                  "function" == typeof arguments[arguments.length - 1]
                )
                  return arguments[arguments.length - 1];
              }
              function l(e, t) {
                var r = this;
                if (
                  ((t = s.apply(this, arguments)),
                  !(e = ("function" != typeof e && e) || {}).name)
                ) {
                  var n = this.config();
                  (e.name = e.name || n.name),
                    (e.storeName = e.storeName || n.storeName);
                }
                return {
                  promise: e.name
                    ? new Promise(function (t) {
                        t(e.storeName ? i(e, r._defaultConfig) : e.name + "/");
                      })
                    : Promise.reject("Invalid arguments"),
                  callback: t,
                };
              }
              function u(e) {
                return (
                  "string" != typeof e &&
                    (console.warn(
                      e + " used as a key, but it is not a string."
                    ),
                    (e = String(e))),
                  e
                );
              }
              var c = {
                  bufferToString: o,
                  deserialize: function (e) {
                    if ("__lfsc__:" !== e.substring(0, 9)) return JSON.parse(e);
                    var r,
                      o = e.substring(13),
                      i = e.substring(9, 13);
                    if ("blob" === i && t.test(o)) {
                      var a = o.match(t);
                      (r = a[1]), (o = o.substring(a[0].length));
                    }
                    var s = n(o);
                    switch (i) {
                      case "arbf":
                        return s;
                      case "blob":
                        return (function (e, t) {
                          (e = e || []), (t = t || {});
                          try {
                            return new Blob(e, t);
                          } catch (i) {
                            if ("TypeError" !== i.name) throw i;
                            for (
                              var r =
                                  "undefined" != typeof BlobBuilder
                                    ? BlobBuilder
                                    : "undefined" != typeof MSBlobBuilder
                                    ? MSBlobBuilder
                                    : "undefined" != typeof MozBlobBuilder
                                    ? MozBlobBuilder
                                    : WebKitBlobBuilder,
                                n = new r(),
                                o = 0;
                              o < e.length;
                              o += 1
                            )
                              n.append(e[o]);
                            return n.getBlob(t.type);
                          }
                        })([s], { type: r });
                      case "si08":
                        return new Int8Array(s);
                      case "ui08":
                        return new Uint8Array(s);
                      case "uic8":
                        return new Uint8ClampedArray(s);
                      case "si16":
                        return new Int16Array(s);
                      case "ur16":
                        return new Uint16Array(s);
                      case "si32":
                        return new Int32Array(s);
                      case "ui32":
                        return new Uint32Array(s);
                      case "fl32":
                        return new Float32Array(s);
                      case "fl64":
                        return new Float64Array(s);
                      default:
                        throw Error("Unkown type: " + i);
                    }
                  },
                  serialize: function (e, t) {
                    var n = "";
                    if (
                      (e && (n = r.call(e)),
                      e &&
                        ("[object ArrayBuffer]" === n ||
                          (e.buffer &&
                            "[object ArrayBuffer]" === r.call(e.buffer))))
                    ) {
                      var i = void 0,
                        a = "__lfsc__:";
                      e instanceof ArrayBuffer
                        ? ((i = e), (a += "arbf"))
                        : ((i = e.buffer),
                          "[object Int8Array]" === n
                            ? (a += "si08")
                            : "[object Uint8Array]" === n
                            ? (a += "ui08")
                            : "[object Uint8ClampedArray]" === n
                            ? (a += "uic8")
                            : "[object Int16Array]" === n
                            ? (a += "si16")
                            : "[object Uint16Array]" === n
                            ? (a += "ur16")
                            : "[object Int32Array]" === n
                            ? (a += "si32")
                            : "[object Uint32Array]" === n
                            ? (a += "ui32")
                            : "[object Float32Array]" === n
                            ? (a += "fl32")
                            : "[object Float64Array]" === n
                            ? (a += "fl64")
                            : t(Error("Failed to get type for BinaryArray"))),
                        t(a + o(i));
                    } else if ("[object Blob]" === n) {
                      var s = new FileReader();
                      (s.onload = function () {
                        t(
                          "__lfsc__:blob~~local_forage_type~" +
                            e.type +
                            "~" +
                            o(this.result)
                        );
                      }),
                        s.readAsArrayBuffer(e);
                    } else
                      try {
                        t(JSON.stringify(e));
                      } catch (l) {
                        console.error(
                          "Couldn't convert value into a JSON string: ",
                          e
                        ),
                          t(null, l);
                      }
                  },
                  stringToBuffer: n,
                },
                f = {},
                d = (function () {
                  function e(e) {
                    (this.kp = e), (this.data = {});
                  }
                  return (
                    (e.resolve = function (t) {
                      return f[t] || (f[t] = new e(t)), f[t];
                    }),
                    (e.prototype.clear = function () {
                      this.data = {};
                    }),
                    (e.prototype.drop = function () {
                      this.clear(), delete f[this.kp];
                    }),
                    (e.prototype.get = function (e) {
                      return this.data[e];
                    }),
                    (e.prototype.key = function (e) {
                      return this.keys()[e];
                    }),
                    (e.prototype.keys = function () {
                      return Object.keys(this.data);
                    }),
                    (e.prototype.rm = function (e) {
                      delete this.data[e];
                    }),
                    (e.prototype.set = function (e, t) {
                      this.data[e] = t;
                    }),
                    e
                  );
                })();
              (e._support = !0),
                (e._driver = "localforage-driver-memory"),
                (e._initStorage = function (e) {
                  var t = e
                      ? (function e(t) {
                          if (
                            null === t ||
                            "object" != typeof t ||
                            "isActiveClone" in t
                          )
                            return t;
                          var r,
                            n,
                            o =
                              t instanceof Date ? new Date(t) : t.constructor();
                          try {
                            for (
                              var i,
                                a,
                                s,
                                l =
                                  ((i = Object.keys(t)),
                                  (a =
                                    "function" == typeof Symbol &&
                                    i[Symbol.iterator]),
                                  (s = 0),
                                  a
                                    ? a.call(i)
                                    : {
                                        next: function () {
                                          return (
                                            i && s >= i.length && (i = void 0),
                                            { value: i && i[s++], done: !i }
                                          );
                                        },
                                      }),
                                u = l.next();
                              !u.done;
                              u = l.next()
                            ) {
                              var c = u.value;
                              Object.prototype.hasOwnProperty.call(t, c) &&
                                ((t.isActiveClone = null),
                                (o[c] = e(t[c])),
                                delete t.isActiveClone);
                            }
                          } catch (f) {
                            r = { error: f };
                          } finally {
                            try {
                              u && !u.done && (n = l.return) && n.call(l);
                            } finally {
                              if (r) throw r.error;
                            }
                          }
                          return o;
                        })(e)
                      : {},
                    r = i(t, this._defaultConfig),
                    n = d.resolve(r);
                  return (
                    (this._dbInfo = t),
                    (this._dbInfo.serializer = c),
                    (this._dbInfo.keyPrefix = r),
                    (this._dbInfo.mStore = n),
                    Promise.resolve()
                  );
                }),
                (e.clear = function (e) {
                  var t = this,
                    r = this.ready().then(function () {
                      t._dbInfo.mStore.clear();
                    });
                  return a(r, e), r;
                }),
                (e.dropInstance = function (e, t) {
                  var r = l.apply(this, arguments),
                    n = r.promise,
                    o = r.callback;
                  return (
                    a(
                      n.then(function (e) {
                        d.resolve(e).drop();
                      }),
                      o
                    ),
                    n
                  );
                }),
                (e.getItem = function (e, t) {
                  var r = this;
                  e = u(e);
                  var n = this.ready().then(function () {
                    var t = r._dbInfo.mStore.get(e);
                    return null == t
                      ? null
                      : r._dbInfo.serializer.deserialize(t);
                  });
                  return a(n, t), n;
                }),
                (e.iterate = function (e, t) {
                  var r = this,
                    n = this.ready().then(function () {
                      for (
                        var t = r._dbInfo.mStore, n = t.keys(), o = 0;
                        o < n.length;
                        o++
                      ) {
                        var i = t.get(n[o]);
                        if (
                          (i && (i = r._dbInfo.serializer.deserialize(i)),
                          void 0 !== (i = e(i, n[o], o + 1)))
                        )
                          return i;
                      }
                    });
                  return a(n, t), n;
                }),
                (e.key = function (e, t) {
                  var r = this,
                    n = this.ready().then(function () {
                      var t;
                      try {
                        (t = r._dbInfo.mStore.key(e)),
                          void 0 === t && (t = null);
                      } catch {
                        t = null;
                      }
                      return t;
                    });
                  return a(n, t), n;
                }),
                (e.keys = function (e) {
                  var t = this,
                    r = this.ready().then(function () {
                      return t._dbInfo.mStore.keys();
                    });
                  return a(r, e), r;
                }),
                (e.length = function (e) {
                  var t = this.keys().then(function (e) {
                    return e.length;
                  });
                  return a(t, e), t;
                }),
                (e.removeItem = function (e, t) {
                  var r = this;
                  e = u(e);
                  var n = this.ready().then(function () {
                    r._dbInfo.mStore.rm(e);
                  });
                  return a(n, t), n;
                }),
                (e.setItem = function (e, t, r) {
                  var n = this;
                  e = u(e);
                  var o = this.ready().then(function () {
                    void 0 === t && (t = null);
                    var r = t;
                    return new Promise(function (o, i) {
                      n._dbInfo.serializer.serialize(t, function (t, a) {
                        if (a) i(a);
                        else
                          try {
                            n._dbInfo.mStore.set(e, t), o(r);
                          } catch (s) {
                            i(s);
                          }
                      });
                    });
                  });
                  return a(o, r), o;
                }),
                Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            "object" == typeof e && void 0 !== t
              ? n(e)
              : "function" == typeof define && define.amd
              ? define("localforage-driver-memory", ["exports"], n)
              : n((r.LocalforageDriverMemory = {}));
        }),
        tX = tH(tz()),
        tK = tH(tV()),
        tY = {
          display: "none",
          position: "fixed",
          top: "0",
          right: "0",
          width: "100%",
          height: "100%",
          borderRadius: "0",
          border: "none",
          zIndex: "2147483647",
        },
        tJ =
          (Object.assign(eH, {
            platform: "web",
            sdkName: "magic-sdk",
            version: "10.1.0",
            defaultEndpoint: "https://auth.magic.link/",
            ViewController: class extends t$ {
              constructor() {
                super(...arguments), (this.activeElement = null);
              }
              init() {
                (this.test = "hello"),
                  (this.iframe = new Promise((e) => {
                    let t = () => {
                      var t;
                      if (
                        ((t = encodeURIComponent(this.parameters)),
                        Boolean(
                          [].slice
                            .call(document.querySelectorAll(".magic-iframe"))
                            .find((e) => e.src.includes(t))
                        ))
                      )
                        new eX(
                          g.DuplicateIframe,
                          "Duplicate iframes found."
                        ).log();
                      else {
                        let r = document.createElement("iframe");
                        r.classList.add("magic-iframe"),
                          (r.dataset.magicIframeLabel = tN(this.endpoint).host),
                          (r.title = "Secure Modal"),
                          (r.src = tN(
                            `/send?params=${encodeURIComponent(
                              this.parameters
                            )}`,
                            this.endpoint
                          ).href),
                          (function (e) {
                            for (let [t, r] of Object.entries(tY))
                              e.style[t] = r;
                          })(r),
                          document.body.appendChild(r),
                          e(r);
                      }
                    };
                    ["loaded", "interactive", "complete"].includes(
                      document.readyState
                    )
                      ? t()
                      : window.addEventListener("load", t, !1);
                  })),
                  window.addEventListener("message", (e) => {
                    var t;
                    if (
                      e.origin === this.endpoint &&
                      e.data &&
                      e.data.msgType &&
                      this.messageHandlers.size
                    )
                      for (let r of ((e.data.response =
                        null != (t = e.data.response) ? t : {}),
                      this.messageHandlers.values()))
                        r(e);
                  });
              }
              showOverlay() {
                return tq(this, null, function* () {
                  let e = yield this.iframe;
                  (e.style.display = "block"),
                    (this.activeElement = document.activeElement),
                    e.focus();
                });
              }
              hideOverlay() {
                return tq(this, null, function* () {
                  var e;
                  ((yield this.iframe).style.display = "none"),
                    (null == (e = this.activeElement) ? void 0 : e.focus) &&
                      this.activeElement.focus(),
                    (this.activeElement = null);
                });
              }
              _post(e) {
                return tq(this, null, function* () {
                  let t = yield this.iframe;
                  if (t && t.contentWindow)
                    t.contentWindow.postMessage(e, this.endpoint);
                  else throw new ez(y.ModalNotReady, "Modal is not ready.");
                });
              }
            },
            configureStorage: () =>
              tq(void 0, null, function* () {
                let e = tX.default.createInstance({
                  name: "MagicAuthLocalStorageDB",
                  storeName: "MagicAuthLocalStorage",
                });
                return (
                  yield e.defineDriver(tK),
                  yield e.setDriver([
                    tX.default.INDEXEDDB,
                    tX.default.LOCALSTORAGE,
                    tK._driver,
                  ]),
                  e
                );
              }),
          }),
          tj);
    },
  },
]);
