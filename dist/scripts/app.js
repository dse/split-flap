(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = false,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = true, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), true), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
    return t;
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(t.prototype ), o, e);
    return "function" == typeof p ? function (t) {
      return p.apply(e, t);
    } : p;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /*global console */

  var idCounter = 0;
  var reflowCount = 0;
  var Reflow = /*#__PURE__*/function () {
    function Reflow(ticks) {
      var _this = this;
      _classCallCheck(this, Reflow);
      this.id = idCounter;
      idCounter += 1;
      // console.log(`Reflow #${this.id}: initializing with ${ticks} ticks`);
      this.ticks = ticks;
      this.tickCount = 0;
      this.promise = new Promise(function (resolve, reject) {
        // console.log(`Reflow #${this.id}: promise created`);
        _this.resolve = resolve;
      });
      this.reflowCompleted = false;
      this.trueCount = 0;
      this.falseCount = 0;
    }
    return _createClass(Reflow, [{
      key: "tick",
      value: function tick(bool) {
        var _this2 = this;
        // console.log(`Reflow #${this.id}: ticking`);
        new Promise(function (resolve, reject) {
          return resolve();
        }).then(function () {
          if (_this2.tickCount >= _this2.ticks) {
            return;
          }
          _this2.tickCount += 1;
          // console.log(`Reflow #${this.id}: new tickCount is ${this.tickCount} of ${this.ticks}`);
          if (bool) {
            _this2.trueCount += 1;
          } else {
            _this2.falseCount += 1;
          }
          if (_this2.tickCount >= _this2.ticks) {
            _this2.resolve();
          }
        });
      }
    }, {
      key: "reflow",
      value: function reflow(elt) {
        if (this.reflowCompleted) {
          // console.log(`Reflow #${this.id}: reflow already triggered`);
          return false;
        }
        reflowCount += 1;
        console.log("Reflow #".concat(this.id, ": triggering reflow #").concat(reflowCount));
        this.reflowCompleted = true;
        void elt.offsetHeight; // triggers the reflow
        return true;
      }
    }]);
  }();

  var SplitFlap = /*#__PURE__*/function () {
    function SplitFlap(element, start, end, strings) {
      _classCallCheck(this, SplitFlap);
      if (!element) {
        throw new Error("element not found");
      }
      this.id = element.id;
      this.element = element;
      this.start = start;
      this.end = end;
      this.strings = [];
      var i;
      if (Array.isArray(strings)) {
        this.strings = strings;
      } else if (strings instanceof Function) {
        for (i = start; i <= end; i += 1) {
          this.strings.push(strings(i));
        }
      } else if (strings == null) {
        for (i = start; i <= end; i += 1) {
          this.strings.push(i);
        }
      }
      this.topElement = this.element.querySelector('[data-top]');
      this.bottomElement = this.element.querySelector('[data-bottom]');
      this.transitionTopElement = this.element.querySelector('[data-transition-top]');
      this.transitionBottomElement = this.element.querySelector('[data-transition-bottom]');
      this.state = start;
      this.targetState = start;
      this.update();
    }
    return _createClass(SplitFlap, [{
      key: "transition",
      value: function () {
        var _transition = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(firstReflow) {
          var _firstReflow$secondRe;
          var nextState, currentState, currentString, nextString, secondReflow, duration, handler1Executed, handler2Executed, timeout1, timeout2, finish, handler1, handler2, ms;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                if (!(this.state === this.targetState)) {
                  _context2.n = 1;
                  break;
                }
                this.transitioning = false;
                firstReflow.tick(false);
                return _context2.a(2);
              case 1:
                nextState = (this.state - this.start + 1) % this.strings.length + this.start;
                currentState = this.state;
                currentString = this.strings[this.state - this.start];
                nextString = this.strings[nextState - this.start];
                this.transitionTopElement.innerHTML = currentString;
                this.transitionTopElement.setAttribute('data-state', currentState);
                this.topElement.innerHTML = nextString;
                this.topElement.setAttribute('data-state', nextState);
                this.transitionBottomElement.innerHTML = nextString;
                this.transitionBottomElement.setAttribute('data-state', nextState);
                this.transitionTopElement.classList.add('xx--start');
                this.transitionBottomElement.classList.add('xx--start');
                if (this.targetState !== nextState) {
                  this.transitionTopElement.classList.add('xx--speedy');
                  this.transitionBottomElement.classList.add('xx--speedy');
                }
                firstReflow.tick(true);
                _context2.n = 2;
                return firstReflow.promise;
              case 2:
                firstReflow.reflow(this.element);
                secondReflow = firstReflow.secondReflow = (_firstReflow$secondRe = firstReflow.secondReflow) !== null && _firstReflow$secondRe !== void 0 ? _firstReflow$secondRe : new Reflow(firstReflow.trueCount);
                this.transitionTopElement.classList.add('xx--transition');
                this.transitionBottomElement.classList.add('xx--transition');
                duration = Math.max(this.getTransitionDuration(this.transitionTopElement), this.getTransitionDuration(this.transitionBottomElement));
                handler1Executed = 0;
                handler2Executed = 0;
                finish = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                  var _secondReflow$thirdRe;
                  var thirdReflow;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        secondReflow.tick();
                        _context.n = 1;
                        return secondReflow.promise;
                      case 1:
                        secondReflow.reflow(this.element);
                        thirdReflow = secondReflow.thirdReflow = (_secondReflow$thirdRe = secondReflow.thirdReflow) !== null && _secondReflow$thirdRe !== void 0 ? _secondReflow$thirdRe : new Reflow(firstReflow.trueCount);
                        this.state = nextState;
                        this.transition(thirdReflow);
                      case 2:
                        return _context.a(2);
                    }
                  }, _callee, this);
                })).bind(this);
                handler1 = function (event) {
                  if (timeout1) {
                    clearTimeout(timeout1);
                    timeout1 = null;
                  }
                  if (handler1Executed++) {
                    return;
                  }
                  this.transitionTopElement.removeEventListener('transitionend', handler1);
                  this.transitionTopElement.removeEventListener('transitioncancel', handler1);
                  this.transitionTopElement.classList.remove('xx--start', 'xx--transition', 'xx--speedy');
                  if (handler1Executed && handler2Executed) {
                    finish();
                  }
                }.bind(this);
                handler2 = function (event) {
                  if (timeout2) {
                    clearTimeout(timeout2);
                    timeout2 = null;
                  }
                  if (handler2Executed++) {
                    return;
                  }
                  this.transitionBottomElement.removeEventListener('transitionend', handler2);
                  this.transitionBottomElement.removeEventListener('transitioncancel', handler2);
                  this.bottomElement.innerHTML = nextString;
                  this.bottomElement.setAttribute('data-state', nextState);
                  this.transitionBottomElement.classList.remove('xx--start', 'xx--transition', 'xx--speedy');
                  if (handler1Executed && handler2Executed) {
                    finish();
                  }
                }.bind(this);
                this.transitionTopElement.addEventListener('transitionend', handler1);
                this.transitionTopElement.addEventListener('transitioncancel', handler1);
                this.transitionBottomElement.addEventListener('transitionend', handler2);
                this.transitionBottomElement.addEventListener('transitioncancel', handler2);

                // in case transition events fail...
                ms = duration + 100;
                timeout1 = setTimeout(handler1, ms);
                timeout2 = setTimeout(handler2, ms);
              case 3:
                return _context2.a(2);
            }
          }, _callee2, this);
        }));
        function transition(_x) {
          return _transition.apply(this, arguments);
        }
        return transition;
      }()
    }, {
      key: "transitionTo",
      value: function transitionTo(targetState, firstReflow) {
        this.targetState = targetState;
        if (this.transitioning) {
          firstReflow.tick(false);
          return;
        }
        if (this.state === this.targetState) {
          firstReflow.tick(false);
          return;
        }
        this.transitioning = true;
        this.transition(firstReflow);
      }
    }, {
      key: "goTo",
      value: function goTo(targetState, firstReflow) {
        this.transitionTo(targetState, firstReflow);
      }
    }, {
      key: "reflow",
      value: function reflow() {
        /*jshint -W030 */
        this.element.offsetHeight;
        /*jshint +W030 */
      }
    }, {
      key: "getTransitionDuration",
      value: function getTransitionDuration(element) {
        var cs = window.getComputedStyle(element);
        return this.parseDuration(cs.transitionDuration) || this.parseDuration(cs.webkitTransitionDuration);
      }
    }, {
      key: "parseDuration",
      value: function parseDuration(dur) {
        if (dur == null) {
          return null;
        }
        if (/ms$/.test(dur)) {
          return Number(dur.slice(0, -2));
        }
        if (/s$/.test(dur)) {
          return Number(dur.slice(0, -1)) * 1000;
        }
        return 0;
      }

      // You call this after changing 12/24 hour setting and such.
      // This can execute during transitions.
    }, {
      key: "update",
      value: function update() {
        var state;
        var string;
        if (this.topElement.hasAttribute('data-state')) {
          state = parseInt(this.topElement.getAttribute('data-state'), 10);
          string = isNaN(state) ? '' : this.strings[state - this.start];
          this.topElement.innerHTML = string;
        } else {
          string = this.strings[this.state - this.start];
          this.topElement.innerHTML = string;
        }
        if (this.bottomElement.hasAttribute('data-state')) {
          state = parseInt(this.bottomElement.getAttribute('data-state'), 10);
          string = isNaN(state) ? '' : this.strings[state - this.start];
          this.bottomElement.innerHTML = string;
        } else {
          string = this.strings[this.state - this.start];
          this.bottomElement.innerHTML = string;
        }
        if (this.transitionTopElement.hasAttribute('data-state')) {
          state = parseInt(this.transitionTopElement.getAttribute('data-state'), 10);
          string = isNaN(state) ? '' : this.strings[state - this.start];
          this.transitionTopElement.innerHTML = string;
        }
        if (this.transitionBottomElement.hasAttribute('data-state')) {
          state = parseInt(this.transitionBottomElement.getAttribute('data-state'), 10);
          string = isNaN(state) ? '' : this.strings[state - this.start];
          this.transitionBottomElement.innerHTML = string;
        }
      }
    }]);
  }();
  SplitFlap.counter = 0;
  var DayOfMonthSplitFlap = /*#__PURE__*/function (_SplitFlap) {
    function DayOfMonthSplitFlap(element) {
      _classCallCheck(this, DayOfMonthSplitFlap);
      return _callSuper(this, DayOfMonthSplitFlap, [element, 1, 31, function (d) {
        return "<span class=\"nn\" data-number=\"".concat(d, "\">").concat(d, "</span>");
      }]);
    }
    _inherits(DayOfMonthSplitFlap, _SplitFlap);
    return _createClass(DayOfMonthSplitFlap);
  }(SplitFlap);
  var MonthSplitFlap = /*#__PURE__*/function (_SplitFlap2) {
    function MonthSplitFlap(element) {
      _classCallCheck(this, MonthSplitFlap);
      return _callSuper(this, MonthSplitFlap, [element, 0, 11, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']]);
    }
    _inherits(MonthSplitFlap, _SplitFlap2);
    return _createClass(MonthSplitFlap);
  }(SplitFlap);
  var DayOfWeekSplitFlap = /*#__PURE__*/function (_SplitFlap3) {
    function DayOfWeekSplitFlap(element) {
      _classCallCheck(this, DayOfWeekSplitFlap);
      return _callSuper(this, DayOfWeekSplitFlap, [element, 0, 6, ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']]);
    }
    _inherits(DayOfWeekSplitFlap, _SplitFlap3);
    return _createClass(DayOfWeekSplitFlap);
  }(SplitFlap);
  var HourSplitFlap = /*#__PURE__*/function (_SplitFlap4) {
    function HourSplitFlap(element, options) {
      var _this;
      _classCallCheck(this, HourSplitFlap);
      _this = _callSuper(this, HourSplitFlap, [element, 0, 23]);
      if (options != null && options.twentyFourHour) {
        _this.setTwentyFourHour();
      } else {
        _this.setTwelveHour();
      }
      return _this;
    }
    _inherits(HourSplitFlap, _SplitFlap4);
    return _createClass(HourSplitFlap, [{
      key: "update",
      value: function update() {
        var h;
        if (this.twentyFourHour) {
          this.strings = [];
          for (h = 0; h < 24; h += 1) {
            this.strings.push(twentyFourHourString(h));
          }
        } else {
          this.strings = [];
          for (h = 0; h < 24; h += 1) {
            this.strings.push(twelveHourString(h));
          }
        }
        _superPropGet(HourSplitFlap, "update", this)([]);
      }
    }, {
      key: "setTwelveHour",
      value: function setTwelveHour(flag) {
        if (flag == null) {
          flag = true;
        }
        this.twentyFourHour = !flag;
        this.update();
      }
    }, {
      key: "setTwentyFourHour",
      value: function setTwentyFourHour(flag) {
        if (flag == null) {
          flag = true;
        }
        this.twentyFourHour = flag;
        this.update();
      }
    }]);
  }(SplitFlap);
  function twelveHourString(h) {
    var h12 = (h + 11) % 12 + 1;
    return "<span class=\"nn hh\" data-number=\"".concat(h12, "\">").concat(h12, "</span>") + (h < 12 ? '<span class="ampm am">am</span>' : '<span class="ampm pm">pm</span>');
  }
  function twentyFourHourString(h) {
    var hh = String(h).padStart(2, '0');
    return "<span class=\"nn\" data-number=\"".concat(hh, "\">").concat(hh, "</span>");
  }
  var MinuteSplitFlap = /*#__PURE__*/function (_SplitFlap5) {
    function MinuteSplitFlap(element) {
      _classCallCheck(this, MinuteSplitFlap);
      return _callSuper(this, MinuteSplitFlap, [element, 0, 59, function (n) {
        var mm = String(n).padStart(2, '0');
        return "<span class=\"nn\" data-number=\"".concat(mm, "\">").concat(mm, "</span>");
      }]);
    }
    _inherits(MinuteSplitFlap, _SplitFlap5);
    return _createClass(MinuteSplitFlap);
  }(SplitFlap);
  var SecondSplitFlap = /*#__PURE__*/function (_SplitFlap6) {
    function SecondSplitFlap(element) {
      _classCallCheck(this, SecondSplitFlap);
      return _callSuper(this, SecondSplitFlap, [element, 0, 59, function (n) {
        var ss = String(n).padStart(2, '0');
        return "<span class=\"nn\" data-number=\"".concat(ss, "\">").concat(ss, "</span>");
      }]);
    }
    _inherits(SecondSplitFlap, _SplitFlap6);
    return _createClass(SecondSplitFlap);
  }(SplitFlap);

  var Clock = /*#__PURE__*/function () {
    function Clock() {
      _classCallCheck(this, Clock);
      this.id = "clock";
      this.mmm = new MonthSplitFlap(document.getElementById('month'));
      this.ddd = new DayOfWeekSplitFlap(document.getElementById('dayOfWeek'));
      this.dd = new DayOfMonthSplitFlap(document.getElementById('dayOfMonth'));
      this.hh = new HourSplitFlap(document.getElementById('hours'));
      this.mm = new MinuteSplitFlap(document.getElementById('minutes'));
      this.ss = new SecondSplitFlap(document.getElementById('seconds'));
    }
    return _createClass(Clock, [{
      key: "setTwentyFourHour",
      value: function setTwentyFourHour(flag) {
        this.hh.setTwentyFourHour(flag);
      }
    }, {
      key: "setTwelveHour",
      value: function setTwelveHour(flag) {
        this.hh.setTwelveHour(flag);
      }
    }, {
      key: "update",
      value: function update() {
        var date = new Date();
        var firstReflow = new Reflow(6);
        this.ddd.goTo(date.getDay(), firstReflow);
        this.dd.goTo(date.getDate(), firstReflow);
        this.mmm.goTo(date.getMonth(), firstReflow);
        this.hh.goTo(date.getHours(), firstReflow);
        this.mm.goTo(date.getMinutes(), firstReflow);
        this.ss.goTo(date.getSeconds(), firstReflow);
      }
    }, {
      key: "start",
      value: function start() {
        if (this.timeout) {
          return;
        }
        this.update();
        var ms = 1000 - Date.now() % 1000;
        this.timeout = setTimeout(function () {
          this.timeout = null;
          this.start();
        }.bind(this), ms);
      }
    }]);
  }();

  var wakeLockObject;
  function acquireWakeLock() {
    if (!('wakeLock' in navigator) || wakeLockObject) {
      return;
    }
    navigator.wakeLock.request('screen').then(function (wakeLock) {
      wakeLockObject = wakeLock;
      wakeLockObject.addEventListener('release', function () {
        wakeLockObject = null;
      });
    });
  }
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      window.deferredPrompt = event;
      if (document.readyState === 'complete') {
        document.getElementById('pwa').style.display = 'block';
      } else {
        window.addEventListener('load', function () {
          document.getElementById('pwa').style.display = 'block';
        });
      }
    });
    window.addEventListener('appinstalled', function (event) {
      window.deferredPrompt = null;
      if (document.readyState === 'complete') {
        document.getElementById('pwa').style.display = 'none';
      } else {
        window.addEventListener('load', function () {
          document.getElementById('pwa').style.display = 'none';
        });
      }
    });
    navigator.serviceWorker.register("service-worker.js", null).then(function (registration) {
      if (registration.installing) {
        registration.installing;
      } else if (registration.waiting) {
        registration.waiting;
      } else if (registration.active) {
        registration.active;
      }
    });
  }
  function setupFromQueryString() {
    var sp = new URL(location.href).searchParams;
    if (sp.has('arial-black') || sp.has('arialBlack')) {
      document.body.classList.add('clock-page--arial-black');
    }
    if (sp.has('arial')) {
      document.body.classList.add('clock-page--arial');
    }
    if (sp.has('italic')) {
      document.body.classList.add('clock-page--italic');
    }
    if (sp.has('helvetica')) {
      document.body.classList.add('clock-page--helvetica');
    }
    if (sp.has('times')) {
      document.body.classList.add('clock-page--times');
    }
    if (sp.has('futura')) {
      document.body.classList.add('clock-page--futura');
    }
    if (sp.has('helvboldcond') || sp.has('helvcondbold')) {
      document.body.classList.add('clock-page--helvetica-condensed-bold');
    }
    var i;
    var timeWeight;
    var dateWeight;
    if (sp.has('bold')) {
      dateWeight = 700;
    }
    if (sp.getAll('bold').length >= 2) {
      timeWeight = 700;
    }
    for (i = 100; i <= 900; i += 100) {
      if (sp.has(i)) {
        timeWeight = Math.min(timeWeight == null ? Infinity : timeWeight, i);
        dateWeight = Math.max(dateWeight == null ? -Infinity : dateWeight, i);
      }
    }
    if (timeWeight != null) {
      document.body.classList.add('clock-page--time-' + timeWeight);
    }
    if (dateWeight != null) {
      document.body.classList.add('clock-page--date-' + dateWeight);
    }
    var fg = sp.get('fg');
    var bg = sp.get('bg');
    var frame = sp.get('frame');
    if (fg != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(fg)) {
      fg = '#' + fg;
    }
    if (bg != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(bg)) {
      bg = '#' + bg;
    }
    if (frame != null && /^[0-9A-Za-z]{3}(?:[0-9A-Za-z]{3})?$/.test(frame)) {
      frame = '#' + frame;
    }
    if (fg != null) {
      document.querySelector(':root').style.setProperty('--split-flap-color', fg);
    }
    if (bg != null) {
      document.querySelector(':root').style.setProperty('--split-flap-background-color', bg);
    }
    if (frame != null) {
      document.querySelector(':root').style.setProperty('--frame-background-color', frame);
    }
    if (sp.has('font')) {
      document.querySelector(':root').style.setProperty('--font-family', sp.get('font'));
    }
  }
  function setupPwa() {
    Array.from(document.querySelectorAll('[data-pwa-install]')).forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
    Array.from(document.querySelectorAll('[data-pwa-dismiss]')).forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('pwa').style.display = 'none';
      });
    });
  }
  var clock;
  function setupPrefs() {
    var prefsModal = document.getElementById('prefsModal');
    var prefsToggle = document.getElementById('prefsToggle');
    var closePrefsModal = document.getElementById('closePrefsModal');
    var prefsModalBackingLayer = document.getElementById('prefsModalBackingLayer');
    var prefsForm = document.getElementById('prefsForm');
    var twentyFourHourCheckbox = document.getElementById('twentyFourHourCheckbox');
    prefsToggle.addEventListener('click', function (event) {
      event.preventDefault();
      prefsModal.style.display = prefsModal.style.display !== 'none' && prefsModal.style.display !== '' ? 'none' : 'block';
    });
    closePrefsModal.addEventListener('click', function (event) {
      event.preventDefault();
      prefsModal.style.display = 'none';
    });
    prefsModalBackingLayer.addEventListener('click', function (event) {
      event.preventDefault();
      prefsModal.style.display = 'none';
    });
    prefsForm.addEventListener('submit', function (event) {
      event.preventDefault();
    });
    var twentyFourHour = JSON.parse(localStorage.getItem('twentyFourHour'));
    if (twentyFourHour == null) {
      twentyFourHour = false;
    }
    if (twentyFourHour) {
      clock.hh.setTwentyFourHour(twentyFourHour);
    }
    twentyFourHourCheckbox.addEventListener('change', function (event) {
      twentyFourHour = document.getElementById('twentyFourHourCheckbox').checked;
      clock.setTwentyFourHour(twentyFourHour);
      localStorage.setItem('twentyFourHour', JSON.stringify(twentyFourHour));
    });
  }
  window.addEventListener('load', function () {
    acquireWakeLock();
    registerServiceWorker();
    setupPwa();
    setupFromQueryString();
    clock = new Clock();
    setupPrefs();
    clock.start();
  });

}));
