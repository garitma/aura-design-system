(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    5557: function (e, s, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return a(8352);
        },
      ]);
    },
    8352: function (e, s, a) {
      "use strict";
      a.r(s),
        a.d(s, {
          default: function () {
            return f;
          },
        });
      var i = a(5893),
        l = a(7294);
      a(9008), a(1664);
      var n = a(9406),
        t = a.n(n),
        c = a(6872),
        r = a.n(c),
        h = a(3466),
        o = a.n(h),
        u = a(1728),
        d = a.n(u),
        m = a(4833);
      let x = (e) => Object.values(e).some((e) => !1 === e),
        g = (e) => {
          let { email: s } = e,
            a = {};
          return (
            "" === s.value
              ? (s.dialog("Ooops, you must write an email \uD83D\uDE05"),
                (a.email = !1))
              : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(s.value)
              ? ((a.email = !0), s.dialog(null))
              : (s.dialog("Oh, write a valid email \uD83E\uDDD0"),
                (a.email = !1)),
            !x(a)
          );
        };
      var j = a(2083),
        v = a(4155);
      let N = new j.s$(v.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY),
        w = () => {
          let e = (0, m.useStatus)(),
            [s, a] = (0, l.useState)(!1),
            [n, c] = (0, l.useState)(!1),
            [h, u] = (0, l.useState)(!0),
            [x, j] = (0, l.useState)();
          (0, l.useEffect)(() => {
            window.innerWidth > 400 && a(!0);
          }, []),
            (0, l.useEffect)(() => {
              u(!0),
                N.user
                  .isLoggedIn()
                  .then((e) => {
                    e ? N.user.getMetadata().then(j) : u(!1);
                  })
                  .catch((e) => {});
            }, []),
            (0, l.useEffect)(() => {
              x && u(!1);
            }, [x]);
          let { email: v } = (0, m.useForm)({ email: "" }),
            w = (0, m.useFormIsValid)({ email: v }, g),
            f = (0, l.useCallback)(() => {
              N.user.logout().then(() => {
                j(null);
              });
            }, []),
            b = async (s) => {
              s.preventDefault(), e.setIsWaiting(!0);
              try {
                await N.auth.loginWithMagicLink({ email: v.value }), c(!0);
              } catch (a) {
                console.log(a),
                  e.setIsWaiting(!1),
                  e.setIsError(!0),
                  e.setMessage("An error occurred while authenticating.");
              }
            };
          return h
            ? (0, i.jsx)(t(), { children: "Loading..." })
            : x
            ? (0, i.jsxs)(t(), {
                className: "center-text",
                children: [
                  (0, i.jsxs)("h1", {
                    className: "mb0 mt0 ",
                    children: ["Hello, ", x.email],
                  }),
                  (0, i.jsx)("div", {
                    className: "pad",
                    children: (0, i.jsxs)(r(), {
                      onClick: f,
                      mode: "pill",
                      children: [
                        "Log Out ",
                        (0, i.jsx)(d(), { sprite: "poweroff" }),
                      ],
                    }),
                  }),
                ],
              })
            : s
            ? n
              ? (0, i.jsx)(t(), {
                  className: "anchor flow-cancel",
                  children: (0, i.jsx)("div", {
                    className: "aureole one valign",
                    style: { minHeight: "85vh" },
                    children: (0, i.jsxs)("div", {
                      className: "center-text",
                      children: [
                        (0, i.jsx)("h1", {
                          className: "mb0 mt0",
                          children: "You are logged In",
                        }),
                        (0, i.jsx)("p", {
                          className: "h6",
                          children: (0, i.jsx)("b", {
                            children:
                              "You can close this tab and use the extension.",
                          }),
                        }),
                      ],
                    }),
                  }),
                })
              : (0, i.jsx)(t(), {
                  className: "anchor flow-cancel",
                  children: (0, i.jsxs)("div", {
                    className: "aureole two valign",
                    style: { minHeight: "85vh" },
                    children: [
                      (0, i.jsx)("div", {
                        className: "one valign",
                        children: (0, i.jsxs)("div", {
                          className: "smosh",
                          children: [
                            (0, i.jsxs)("div", {
                              className: "inputer",
                              children: [
                                (0, i.jsx)("h1", {
                                  className: "mb0 mt0",
                                  children: "Sign in to Aura Magic Link",
                                }),
                                (0, i.jsx)("p", {
                                  className: "h6",
                                  children: (0, i.jsx)("b", {
                                    children: "Enter your email below",
                                  }),
                                }),
                              ],
                            }),
                            (0, i.jsx)("form", {
                              onSubmit: b,
                              children: (0, i.jsxs)("div", {
                                className: "aureole one",
                                children: [
                                  (0, i.jsx)(o(), {
                                    placeholder: "email",
                                    ...v.input,
                                    isLabelable: !0,
                                  }),
                                  (0, i.jsx)("div", {
                                    className: "inputer",
                                    children: (0, i.jsx)(r(), {
                                      className: "green-with-white",
                                      isFluid: !0,
                                      isDisabled: !w,
                                      isWaiting: e.state.isWaiting,
                                      waitingText: "Loading...",
                                      label: "Iniciar sesi\xf3n",
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, i.jsx)("div", {
                        className: "two anchor halo smash",
                        children: (0, i.jsx)("div", {
                          className: "anchor",
                          children: (0, i.jsx)("div", {
                            className: "spin anchor",
                          }),
                        }),
                      }),
                    ],
                  }),
                })
            : (0, i.jsxs)(t(), {
                children: [
                  (0, i.jsx)("h1", {
                    className: "mt0",
                    children: "Please login to use this extensi\xf3n.",
                  }),
                  (0, i.jsx)(r(), {
                    onClick: () => chrome.tabs.create({ url: "index.html" }),
                    children: "Sign In",
                  }),
                ],
              });
        };
      var f = w;
    },
  },
  function (e) {
    e.O(0, [24, 774, 888, 179], function () {
      return e((e.s = 5557));
    }),
      (_N_E = e.O());
  },
]);
