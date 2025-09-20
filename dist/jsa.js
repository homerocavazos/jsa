/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/_jsa.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   jsa: () => (/* binding */ jsa)
/* harmony export */ });
/*!
 * jsa.js – JavaScript Accordion Utility
 * Version: 2.0.0
 * Author: Homero Cavazos
 * GitHub: https://github.com/homiehomes
 * License: MIT
 * Website: https://homiehomes.dev
 * Description: A simple JavaScript accordion component.
 * 
 * opts = {
 *  dl: "dl",               // Selector for the definition list
 *  dt: "dt a",            // Selector for the term elements
 *  dd: "dd",              // Selector for the definition elements
 *  openFirst: false,      // Whether to open the first item by default
 *  openAll: false,        // Whether to open all items by default
 *  prefix: "jsa",         // Prefix for IDs and classes to avoid conflicts
 *  inline: true           // Whether to use inline styles for maxHeight and overflow. Set to false to manage styles via CSS.
 * 
 * */



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var jsa = /*#__PURE__*/function () {
  function jsa() {
    var _opts$prefix;
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, jsa);
    var _ = this;
    _.settings = Object.assign({
      dl: "dl",
      dt: "dt a",
      dd: "dd",
      openFirst: false,
      openAll: false,
      prefix: (_opts$prefix = opts.prefix) !== null && _opts$prefix !== void 0 ? _opts$prefix : "".concat(Math.random().toString(36).substring(2, 7), "-"),
      // Generate a random prefix if not provided
      inline: true
    }, opts);
    console.log('jsa settings = ', _.settings);
    _.el = document.getElementsByTagName(_.settings.dl)[0] || document.querySelector(_.settings.dl) || null;
    _.terms = _.getObjs(document.querySelectorAll("".concat(_.settings.dl, " ").concat(_.settings.dt)));
    _.definitions = _.getObjs(document.querySelectorAll("".concat(_.settings.dl, " ").concat(_.settings.dd)));
    console.log('el = ', _.el);
    console.log('terms = ', _.terms);
    console.log('definitions = ', _.definitions);

    // Set the IDs and data-target attributes for terms
    _.terms.map(function (term, index) {
      console.log(term, index);
      term.setAttribute('tabindex', 0);
      term.setAttribute('id', "".concat(_.settings.prefix, "term").concat(index));
      term.setAttribute('data-target', "".concat(_.settings.prefix, "definition").concat(index));
      if (_.settings.openFirst && index === 0) term.classList.add("active");
      term.addEventListener("click", function (e) {
        e.preventDefault();
        _.toggle(e.target);
      });
      // This covers accessibility for keyboard users
      term.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          _.toggle(e.target);
        }
      });
    });

    // Set the IDs for definitions
    _.definitions.map(function (definition, index) {
      console.log(definition, index);
      definition.setAttribute('id', "".concat(_.settings.prefix, "definition").concat(index));
      definition.setAttribute("aria-labelledby", "".concat(_.settings.prefix, "term").concat(index));
      if (_.settings.inline) definition.style.maxHeight = "0";
      if (_.settings.inline) definition.style.overflow = "hidden";
      if (_.settings.openFirst === true && index === 0) definition.classList.add("show");
      if (_.settings.openFirst === true && index === 0 && _.settings.inline) definition.style.maxHeight = "100%";
      if (_.settings.openAll === true) definition.classList.add("show");
      if (_.settings.openAll === true && _.settings.inline) definition.style.maxHeight = "100%";
    });
  } // constructor
  return _createClass(jsa, [{
    key: "toggle",
    value: function toggle(term) {
      var _ = this;
      var target = term.dataset.target;
      var def = document.getElementById("".concat(target));
      def.classList.toggle("show");
      if (_.settings.inline) def.style.maxHeight = def.style.maxHeight === "100%" ? "0" : "100%";
    }
  }, {
    key: "getObjs",
    value: function getObjs(objs) {
      return Object.keys(objs).map(function (e) {
        return objs[e];
      });
    }
  }]);
}();

const __webpack_exports__jsa = __webpack_exports__.jsa;
export { __webpack_exports__jsa as jsa };

//# sourceMappingURL=jsa.js.map