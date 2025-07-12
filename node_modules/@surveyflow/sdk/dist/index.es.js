import Ie, { useState as V, useEffect as fr } from "react";
var ye = { exports: {} }, G = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function dr() {
  if (Fe) return G;
  Fe = 1;
  var j = Ie, d = Symbol.for("react.element"), x = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, P = j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, f = { key: !0, ref: !0, __self: !0, __source: !0 };
  function k(v, y, _) {
    var b, S = {}, s = null, C = null;
    _ !== void 0 && (s = "" + _), y.key !== void 0 && (s = "" + y.key), y.ref !== void 0 && (C = y.ref);
    for (b in y) m.call(y, b) && !f.hasOwnProperty(b) && (S[b] = y[b]);
    if (v && v.defaultProps) for (b in y = v.defaultProps, y) S[b] === void 0 && (S[b] = y[b]);
    return { $$typeof: d, type: v, key: s, ref: C, props: S, _owner: P.current };
  }
  return G.Fragment = x, G.jsx = k, G.jsxs = k, G;
}
var z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function vr() {
  return $e || ($e = 1, process.env.NODE_ENV !== "production" && function() {
    var j = Ie, d = Symbol.for("react.element"), x = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), v = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), s = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), I = Symbol.iterator, J = "@@iterator";
    function re(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = I && e[I] || e[J];
      return typeof r == "function" ? r : null;
    }
    var D = j.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          t[a - 1] = arguments[a];
        te("error", e, t);
      }
    }
    function te(e, r, t) {
      {
        var a = D.ReactDebugCurrentFrame, u = a.getStackAddendum();
        u !== "" && (r += "%s", t = t.concat([u]));
        var l = t.map(function(o) {
          return String(o);
        });
        l.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, l);
      }
    }
    var ne = !1, ae = !1, se = !1, ie = !1, oe = !1, M;
    M = Symbol.for("react.module.reference");
    function ue(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === f || oe || e === P || e === _ || e === b || ie || e === C || ne || ae || se || typeof e == "object" && e !== null && (e.$$typeof === s || e.$$typeof === S || e.$$typeof === k || e.$$typeof === v || e.$$typeof === y || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === M || e.getModuleId !== void 0));
    }
    function le(e, r, t) {
      var a = e.displayName;
      if (a)
        return a;
      var u = r.displayName || r.name || "";
      return u !== "" ? t + "(" + u + ")" : t;
    }
    function Y(e) {
      return e.displayName || "Context";
    }
    function N(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case x:
          return "Portal";
        case f:
          return "Profiler";
        case P:
          return "StrictMode";
        case _:
          return "Suspense";
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            var r = e;
            return Y(r) + ".Consumer";
          case k:
            var t = e;
            return Y(t._context) + ".Provider";
          case y:
            return le(e, e.render, "ForwardRef");
          case S:
            var a = e.displayName || null;
            return a !== null ? a : N(e.type) || "Memo";
          case s: {
            var u = e, l = u._payload, o = u._init;
            try {
              return N(o(l));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var L = Object.assign, q = 0, B, c, R, E, F, A, $;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Le() {
      {
        if (q === 0) {
          B = console.log, c = console.info, R = console.warn, E = console.error, F = console.group, A = console.groupCollapsed, $ = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        q++;
      }
    }
    function Ye() {
      {
        if (q--, q === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: L({}, e, {
              value: B
            }),
            info: L({}, e, {
              value: c
            }),
            warn: L({}, e, {
              value: R
            }),
            error: L({}, e, {
              value: E
            }),
            group: L({}, e, {
              value: F
            }),
            groupCollapsed: L({}, e, {
              value: A
            }),
            groupEnd: L({}, e, {
              value: $
            })
          });
        }
        q < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ce = D.ReactCurrentDispatcher, fe;
    function X(e, r, t) {
      {
        if (fe === void 0)
          try {
            throw Error();
          } catch (u) {
            var a = u.stack.trim().match(/\n( *(at )?)/);
            fe = a && a[1] || "";
          }
        return `
` + fe + e;
      }
    }
    var de = !1, H;
    {
      var qe = typeof WeakMap == "function" ? WeakMap : Map;
      H = new qe();
    }
    function xe(e, r) {
      if (!e || de)
        return "";
      {
        var t = H.get(e);
        if (t !== void 0)
          return t;
      }
      var a;
      de = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var l;
      l = ce.current, ce.current = null, Le();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (T) {
              a = T;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (T) {
              a = T;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (T) {
            a = T;
          }
          e();
        }
      } catch (T) {
        if (T && a && typeof T.stack == "string") {
          for (var i = T.stack.split(`
`), w = a.stack.split(`
`), h = i.length - 1, g = w.length - 1; h >= 1 && g >= 0 && i[h] !== w[g]; )
            g--;
          for (; h >= 1 && g >= 0; h--, g--)
            if (i[h] !== w[g]) {
              if (h !== 1 || g !== 1)
                do
                  if (h--, g--, g < 0 || i[h] !== w[g]) {
                    var O = `
` + i[h].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && H.set(e, O), O;
                  }
                while (h >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        de = !1, ce.current = l, Ye(), Error.prepareStackTrace = u;
      }
      var Q = e ? e.displayName || e.name : "", W = Q ? X(Q) : "";
      return typeof e == "function" && H.set(e, W), W;
    }
    function We(e, r, t) {
      return xe(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function Z(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return xe(e, Ve(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case _:
          return X("Suspense");
        case b:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            return We(e.render);
          case S:
            return Z(e.type, r, t);
          case s: {
            var a = e, u = a._payload, l = a._init;
            try {
              return Z(l(u), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var K = Object.prototype.hasOwnProperty, je = {}, Re = D.ReactDebugCurrentFrame;
    function ee(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        Re.setExtraStackFrame(t);
      } else
        Re.setExtraStackFrame(null);
    }
    function Me(e, r, t, a, u) {
      {
        var l = Function.call.bind(K);
        for (var o in e)
          if (l(e, o)) {
            var i = void 0;
            try {
              if (typeof e[o] != "function") {
                var w = Error((a || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw w.name = "Invariant Violation", w;
              }
              i = e[o](r, o, a, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (h) {
              i = h;
            }
            i && !(i instanceof Error) && (ee(u), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", t, o, typeof i), ee(null)), i instanceof Error && !(i.message in je) && (je[i.message] = !0, ee(u), p("Failed %s type: %s", t, i.message), ee(null));
          }
      }
    }
    var Ue = Array.isArray;
    function ve(e) {
      return Ue(e);
    }
    function Qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Je(e) {
      try {
        return _e(e), !1;
      } catch {
        return !0;
      }
    }
    function _e(e) {
      return "" + e;
    }
    function Ee(e) {
      if (Je(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), _e(e);
    }
    var we = D.ReactCurrentOwner, Be = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Se, Te;
    function Ke(e) {
      if (K.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ge(e) {
      if (K.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ze(e, r) {
      typeof e.ref == "string" && we.current;
    }
    function Xe(e, r) {
      {
        var t = function() {
          Se || (Se = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function He(e, r) {
      {
        var t = function() {
          Te || (Te = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Ze = function(e, r, t, a, u, l, o) {
      var i = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: d,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: l
      };
      return i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(i, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(i, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: u
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    };
    function er(e, r, t, a, u) {
      {
        var l, o = {}, i = null, w = null;
        t !== void 0 && (Ee(t), i = "" + t), Ge(r) && (Ee(r.key), i = "" + r.key), Ke(r) && (w = r.ref, ze(r, u));
        for (l in r)
          K.call(r, l) && !Be.hasOwnProperty(l) && (o[l] = r[l]);
        if (e && e.defaultProps) {
          var h = e.defaultProps;
          for (l in h)
            o[l] === void 0 && (o[l] = h[l]);
        }
        if (i || w) {
          var g = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          i && Xe(o, g), w && He(o, g);
        }
        return Ze(e, i, w, u, a, we.current, o);
      }
    }
    var he = D.ReactCurrentOwner, Ce = D.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, t = Z(e.type, e._source, r ? r.type : null);
        Ce.setExtraStackFrame(t);
      } else
        Ce.setExtraStackFrame(null);
    }
    var pe;
    pe = !1;
    function ge(e) {
      return typeof e == "object" && e !== null && e.$$typeof === d;
    }
    function Oe() {
      {
        if (he.current) {
          var e = N(he.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function rr(e) {
      return "";
    }
    var Pe = {};
    function tr(e) {
      {
        var r = Oe();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function ke(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = tr(r);
        if (Pe[t])
          return;
        Pe[t] = !0;
        var a = "";
        e && e._owner && e._owner !== he.current && (a = " It was passed a child from " + N(e._owner.type) + "."), U(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, a), U(null);
      }
    }
    function Ne(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ve(e))
          for (var t = 0; t < e.length; t++) {
            var a = e[t];
            ge(a) && ke(a, r);
          }
        else if (ge(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var u = re(e);
          if (typeof u == "function" && u !== e.entries)
            for (var l = u.call(e), o; !(o = l.next()).done; )
              ge(o.value) && ke(o.value, r);
        }
      }
    }
    function nr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === y || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === S))
          t = r.propTypes;
        else
          return;
        if (t) {
          var a = N(r);
          Me(t, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !pe) {
          pe = !0;
          var u = N(r);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", u || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ar(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var a = r[t];
          if (a !== "children" && a !== "key") {
            U(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), U(null);
            break;
          }
        }
        e.ref !== null && (U(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), U(null));
      }
    }
    var Ae = {};
    function De(e, r, t, a, u, l) {
      {
        var o = ue(e);
        if (!o) {
          var i = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var w = rr();
          w ? i += w : i += Oe();
          var h;
          e === null ? h = "null" : ve(e) ? h = "array" : e !== void 0 && e.$$typeof === d ? (h = "<" + (N(e.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : h = typeof e, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", h, i);
        }
        var g = er(e, r, t, u, l);
        if (g == null)
          return g;
        if (o) {
          var O = r.children;
          if (O !== void 0)
            if (a)
              if (ve(O)) {
                for (var Q = 0; Q < O.length; Q++)
                  Ne(O[Q], e);
                Object.freeze && Object.freeze(O);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ne(O, e);
        }
        if (K.call(r, "key")) {
          var W = N(e), T = Object.keys(r).filter(function(cr) {
            return cr !== "key";
          }), me = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ae[W + me]) {
            var lr = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            p(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, me, W, lr, W), Ae[W + me] = !0;
          }
        }
        return e === m ? ar(g) : nr(g), g;
      }
    }
    function sr(e, r, t) {
      return De(e, r, t, !0);
    }
    function ir(e, r, t) {
      return De(e, r, t, !1);
    }
    var or = ir, ur = sr;
    z.Fragment = m, z.jsx = or, z.jsxs = ur;
  }()), z;
}
process.env.NODE_ENV === "production" ? ye.exports = dr() : ye.exports = vr();
var n = ye.exports;
const gr = ({
  surveyId: j,
  apiUrl: d,
  onComplete: x,
  onError: m,
  className: P = ""
}) => {
  var B;
  const [f, k] = V(null), [v, y] = V(0), [_, b] = V([]), [S, s] = V(!0), [C, I] = V(!1), [J, re] = V(!1), [D, p] = V([]);
  fr(() => {
    (async () => {
      try {
        const R = await fetch(`${d}/api/surveys/${j}`);
        if (!R.ok) throw new Error("Failed to fetch survey");
        const E = await R.json();
        k(E.data), s(!1);
      } catch (R) {
        m == null || m(R instanceof Error ? R.message : "Unknown error"), s(!1);
      }
    })();
  }, [j, d, m]);
  const te = (c, R) => {
    b((E) => {
      const F = E.findIndex(($) => $.questionId === c), A = { questionId: c, value: R };
      if (F >= 0) {
        const $ = [...E];
        return $[F] = A, $;
      }
      return [...E, A];
    }), p([]);
  }, ne = () => {
    if (!f) return !1;
    const c = f.questions[v];
    if (!(v < 2)) return !0;
    const E = _.find((F) => F.questionId === c.id);
    return !!(E && E.value !== "" && E.value !== null && E.value !== void 0);
  }, ae = () => {
    if (!f) return !1;
    const c = [];
    return f.questions.slice(0, 2).forEach((E, F) => {
      const A = _.find(($) => $.questionId === E.id);
      (!A || A.value === "" || A.value === null || A.value === void 0) && c.push(`Question ${F + 1} is required`);
    }), p(c), c.length === 0;
  }, se = () => {
    if (v < 2 && !ne()) {
      p(["Please answer this question before continuing"]);
      return;
    }
    p([]), f && v < f.questions.length - 1 && y((c) => c + 1);
  }, ie = () => {
    v > 0 && y((c) => c - 1);
  }, oe = async () => {
    if (f && ae()) {
      I(!0);
      try {
        if (!(await fetch(`${d}/api/responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            surveyId: f.id,
            answers: _
          })
        })).ok) throw new Error("Failed to submit response");
        const R = { surveyId: f.id, answers: _ };
        x == null || x(R), re(!0);
      } catch (c) {
        m == null || m(c instanceof Error ? c.message : "Submission failed");
      } finally {
        I(!1);
      }
    }
  };
  if (S)
    return /* @__PURE__ */ n.jsx("div", { className: `survey-widget ${P}`, children: /* @__PURE__ */ n.jsx("div", { className: "loading", children: "Loading survey..." }) });
  if (!f)
    return /* @__PURE__ */ n.jsx("div", { className: `survey-widget ${P}`, children: /* @__PURE__ */ n.jsx("div", { className: "error", children: "Survey not found" }) });
  if (J)
    return /* @__PURE__ */ n.jsx("div", { className: `survey-widget ${P}`, children: /* @__PURE__ */ n.jsxs("div", { className: "success", children: [
      /* @__PURE__ */ n.jsx("h3", { children: "Thank you!" }),
      /* @__PURE__ */ n.jsx("p", { children: "Your response has been submitted successfully." })
    ] }) });
  const M = f.questions[v], ue = (v + 1) / f.questions.length * 100, le = v === f.questions.length - 1, Y = (B = _.find((c) => c.questionId === M.id)) == null ? void 0 : B.value, N = Y !== void 0 && Y !== "" && Y !== null, q = !(v < 2) || N;
  return /* @__PURE__ */ n.jsxs("div", { className: `survey-widget ${P}`, children: [
    /* @__PURE__ */ n.jsxs("div", { className: "survey-header", children: [
      /* @__PURE__ */ n.jsx("h2", { children: f.title }),
      f.description && /* @__PURE__ */ n.jsx("p", { children: f.description }),
      /* @__PURE__ */ n.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: "progress-fill",
          style: { width: `${ue}%` }
        }
      ) }),
      /* @__PURE__ */ n.jsxs("span", { className: "progress-text", children: [
        "Question ",
        v + 1,
        " of ",
        f.questions.length
      ] })
    ] }),
    /* @__PURE__ */ n.jsx("div", { className: "question-container", children: /* @__PURE__ */ n.jsx(
      hr,
      {
        question: M,
        value: Y,
        onChange: (c) => te(M.id, c),
        isRequired: v < 2
      }
    ) }),
    D.length > 0 && /* @__PURE__ */ n.jsx("div", { className: "validation-errors", children: D.map((c, R) => /* @__PURE__ */ n.jsx("div", { className: "error-message", children: c }, R)) }),
    /* @__PURE__ */ n.jsxs("div", { className: "navigation", children: [
      /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: ie,
          disabled: v === 0,
          className: "btn btn-secondary",
          children: "Previous"
        }
      ),
      le ? /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: oe,
          disabled: C,
          className: "btn btn-primary",
          children: C ? "Submitting..." : "Submit"
        }
      ) : /* @__PURE__ */ n.jsx(
        "button",
        {
          onClick: se,
          disabled: !q,
          className: "btn btn-primary",
          children: "Next"
        }
      )
    ] })
  ] });
}, hr = ({ question: j, value: d, onChange: x, isRequired: m = !1 }) => {
  const P = () => {
    var f, k, v;
    switch (j.type) {
      case "text":
        const _ = (d || "").length;
        return /* @__PURE__ */ n.jsxs("div", { children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "text",
              value: d || "",
              onChange: (s) => x(s.target.value),
              className: "form-input",
              placeholder: m ? "Your answer (required)..." : "Your answer (optional)...",
              maxLength: 200
            }
          ),
          /* @__PURE__ */ n.jsxs("div", { className: `char-counter ${_ > 160 ? "char-counter-warning" : ""}`, children: [
            _,
            "/",
            200
          ] })
        ] });
      case "textarea":
        const b = 500, S = (d || "").length;
        return /* @__PURE__ */ n.jsxs("div", { children: [
          /* @__PURE__ */ n.jsx(
            "textarea",
            {
              value: d || "",
              onChange: (s) => x(s.target.value),
              className: "form-textarea",
              rows: 4,
              placeholder: m ? "Your answer (required)..." : "Your answer (optional)...",
              maxLength: b
            }
          ),
          /* @__PURE__ */ n.jsxs("div", { className: `char-counter ${S > b * 0.8 ? "char-counter-warning" : ""}`, children: [
            S,
            "/",
            b
          ] })
        ] });
      case "radio":
        return /* @__PURE__ */ n.jsx("div", { className: "radio-group", children: (f = j.options) == null ? void 0 : f.map((s) => /* @__PURE__ */ n.jsxs("label", { className: "radio-option", children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "radio",
              name: j.id,
              value: s.value,
              checked: d === s.value,
              onChange: (C) => x(C.target.value)
            }
          ),
          /* @__PURE__ */ n.jsx("span", { children: s.label })
        ] }, s.id)) });
      case "checkbox":
        return /* @__PURE__ */ n.jsx("div", { className: "checkbox-group", children: (k = j.options) == null ? void 0 : k.map((s) => /* @__PURE__ */ n.jsxs("label", { className: "checkbox-option", children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "checkbox",
              value: s.value,
              checked: Array.isArray(d) && d.includes(s.value),
              onChange: (C) => {
                const I = Array.isArray(d) ? d : [];
                C.target.checked ? x([...I, s.value]) : x(I.filter((J) => J !== s.value));
              }
            }
          ),
          /* @__PURE__ */ n.jsx("span", { children: s.label })
        ] }, s.id)) });
      case "select":
        return /* @__PURE__ */ n.jsxs(
          "select",
          {
            value: d || "",
            onChange: (s) => x(s.target.value),
            className: "form-select",
            children: [
              /* @__PURE__ */ n.jsx("option", { value: "", children: m ? "Select an option (required)..." : "Select an option (optional)..." }),
              (v = j.options) == null ? void 0 : v.map((s) => /* @__PURE__ */ n.jsx("option", { value: s.value, children: s.label }, s.id))
            ]
          }
        );
      case "scale":
        return /* @__PURE__ */ n.jsx("div", { className: "scale-group", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ n.jsxs("label", { className: "scale-option", children: [
          /* @__PURE__ */ n.jsx(
            "input",
            {
              type: "radio",
              name: j.id,
              value: s,
              checked: d === s,
              onChange: (C) => x(Number(C.target.value))
            }
          ),
          /* @__PURE__ */ n.jsx("span", { className: "scale-number", children: s })
        ] }, s)) });
      case "yes_no":
        return /* @__PURE__ */ n.jsxs("div", { className: "yes-no-group", children: [
          /* @__PURE__ */ n.jsxs("label", { className: "yes-no-option", children: [
            /* @__PURE__ */ n.jsx(
              "input",
              {
                type: "radio",
                name: j.id,
                value: "yes",
                checked: d === "yes",
                onChange: (s) => x(s.target.value)
              }
            ),
            /* @__PURE__ */ n.jsx("span", { children: "Yes" })
          ] }),
          /* @__PURE__ */ n.jsxs("label", { className: "yes-no-option", children: [
            /* @__PURE__ */ n.jsx(
              "input",
              {
                type: "radio",
                name: j.id,
                value: "no",
                checked: d === "no",
                onChange: (s) => x(s.target.value)
              }
            ),
            /* @__PURE__ */ n.jsx("span", { children: "No" })
          ] })
        ] });
      default:
        return /* @__PURE__ */ n.jsx("div", { children: "Unsupported question type" });
    }
  };
  return /* @__PURE__ */ n.jsxs("div", { className: "question", children: [
    /* @__PURE__ */ n.jsxs("h3", { className: "question-text", children: [
      j.text,
      m && /* @__PURE__ */ n.jsx("span", { className: "required", children: "*" })
    ] }),
    P()
  ] });
};
export {
  gr as SurveyWidget
};
//# sourceMappingURL=index.es.js.map
