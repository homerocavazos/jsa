(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cba"] = factory();
	else
		root["cba"] = root["cba"] || {}, root["cba"]["jsa"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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
 *  dl: ".jsa",            // Selector for the definition list
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
      dl: ".jsa",
      dt: "dt a",
      dd: "dd",
      openFirst: false,
      openAll: false,
      closeAll: null,
      // Selector e.g. <a class="close-all">Close All</a>
      closeOthers: false,
      // Whether to close other items when one is opened
      prefix: (_opts$prefix = opts.prefix) !== null && _opts$prefix !== void 0 ? _opts$prefix : "".concat(Math.random().toString(36).substring(2, 7), "-"),
      // Generate a random prefix if not provided
      theme: '',
      // options: 'basic', '' 
      icons: ['+', '-'],
      // options: ['+', '-'], ['arrow-down', 'arrow-up'], [] for no icons
      iconClass: 'jsa-icon',
      // Class for the icon span
      schema: false,
      schemaType: 'FAQPage',
      termPadding: '0.5em 1em 0.5em 0' // Padding for dt elements when theme is 'basic'
    }, opts);
    console.log('--------------------------------');
    console.log('jsa settings = ', _.settings);
    _.el = document.querySelector(_.settings.dl) || null;
    _.terms = _.getObjs(document.querySelectorAll("".concat(_.settings.dl, " ").concat(_.settings.dt)));
    _.definitions = _.getObjs(document.querySelectorAll("".concat(_.settings.dl, " ").concat(_.settings.dd)));
    if (_.settings.theme) _.el.classList.add("jsa-theme-".concat(_.settings.theme));

    // Event Delegation for terms
    _.el.addEventListener("click", function (e) {
      e.preventDefault();
      _.toggle(e.target);
    });

    // Set the IDs and data-target attributes for terms
    _.terms.map(function (term, index) {
      term.setAttribute('tabindex', 0);
      term.setAttribute('id', "".concat(_.settings.prefix, "term").concat(index));
      term.setAttribute('data-target', "".concat(_.settings.prefix, "definition").concat(index));
      term.style.cursor = "pointer";
      term.setAttribute("aria-controls", "".concat(_.settings.prefix, "definition").concat(index));
      term.setAttribute("aria-expanded", "false");
      term.setAttribute("role", "button");
      term.setAttribute("aria-label", !term.ariaLabel ? "Toggle definition for ".concat(term.textContent.trim()) : term.ariaLabel);
      if (_.settings.theme === 'basic') {
        term.style.display = "flex";
        term.style.position = "relative";
        term.style.justifyContent = "space-between";
        term.style.alignItems = "center";
        term.style.textDecoration = "none";
        term.style.padding = _.settings.termPadding;
        term.style.borderTop = "1px solid #eee";
        var icon = document.createElement('span');
        icon.innerHTML = _.settings.icons[0];
        icon.classList.add(_.settings.iconClass);
        icon.style.pointerEvents = "none";

        // If open first is true, set the icon to the "open" icon
        if (_.settings.openFirst && index === 0) icon.innerHTML = _.settings.icons[1];
        term.appendChild(icon);
      }
      ;
      if (_.settings.openFirst && index === 0) term.classList.add("active");

      // This covers accessibility for keyboard users
      term.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          _.toggle(e.target);
        }
      });
    });

    // Set the http://127.0.0.1:5500/demo.html#IDs for definitions
    _.definitions.map(function (definition, index) {
      definition.setAttribute('id', "".concat(_.settings.prefix, "definition").concat(index));
      definition.setAttribute("aria-labelledby", "".concat(_.settings.prefix, "term").concat(index));
      definition.style.maxHeight = "0";
      definition.style.overflow = "hidden";
      if (_.settings.openFirst === true && index === 0) definition.classList.add("show");
      if (_.settings.openFirst === true && index === 0) definition.style.maxHeight = definition.scrollHeight + "px";
      if (_.settings.openAll === true) definition.classList.add("show");
      if (_.settings.openAll === true) definition.style.maxHeight = definition.scrollHeight + "px";
      if (_.settings.theme === 'basic') {
        definition.style.padding = "0";
        definition.style.margin = "0";
        definition.style.borderBottom = "1px solid #eee";
        definition.style.borderTop = "none";
        definition.style.transition = "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        if (_.settings.openFirst === true && index === 0) definition.style.padding = "1em 0";
      }
    });
    _.schema = [];
    _.buildSchema();
    if (_.settings.closeAll) {
      document.querySelector(_.settings.closeAll).addEventListener('click', function (e) {
        return _.reset();
      });
    }
    ;
  } // constructor
  return _createClass(jsa, [{
    key: "toggle",
    value: function toggle(term) {
      var _ = this;
      if (!term.dataset.target) return; // Prevent toggling if the clicked element is not a term

      var target = term.dataset.target;
      var def = document.getElementById("".concat(target));
      var isOpen = def.classList.contains("show");
      if (_.settings.closeOthers && !isOpen) {
        _.reset();
      }
      if (_.settings.theme === 'basic') {
        def.style.padding = isOpen ? "0" : "1em 0";
      }
      def.classList.toggle("show");
      term.setAttribute("aria-expanded", !isOpen ? "true" : "false");

      // Swap icon if applicable
      var icon = term.querySelector(".".concat(_.settings.iconClass));
      if (icon) {
        icon.innerHTML = !isOpen ? _.settings.icons[1] : _.settings.icons[0];
      }

      // Apply transition for inline elements for smooth open/close

      if (!isOpen) {
        def.style.maxHeight = def.scrollHeight + "px";
      } else {
        def.style.maxHeight = "0";
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var _ = this;
      _.terms.map(function (term, index) {
        term.classList.remove("active");
        term.setAttribute("aria-expanded", "false");
      });
      _.definitions.map(function (definition, index) {
        definition.classList.remove("show");
        definition.style.maxHeight = "0";
        if (_.settings.theme === 'basic') definition.style.padding = "0";
      });
    }
  }, {
    key: "getObjs",
    value: function getObjs(objs) {
      return Object.keys(objs).map(function (e) {
        return objs[e];
      });
    }
  }, {
    key: "buildSchema",
    value: function buildSchema() {
      var _ = this;
      if (!_.settings.schema) return;
      var schema = {
        "@context": "https://schema.org",
        "@type": _.settings.schemaType,
        "mainEntity": []
      };
      _.terms.map(function (term, index) {
        var question = {
          "@type": "Question",
          "name": term.textContent.trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": _.definitions[index].innerHTML.trim()
          }
        };
        schema.mainEntity.push(question);
      });
      _.el.insertAdjacentHTML("beforeend", "<script type=\"application/ld+json\">".concat(JSON.stringify(schema), "</script>"));
    }
  }]);
}();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=jsa.umd.js.map