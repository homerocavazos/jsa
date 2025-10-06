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
 * Version: 2.0.1
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
 *  theme: '',             // options: '', 'minimal' 'core'
 *  openFirst: false,      // Whether to open the first item on load
 *  openAll: false,        // Whether to open all items on load
 *  closeAll: null,        // Selector e.g. <a class="close-all">Close All</a>
 *  closeOthers: false,    // Whether to close other items when one is opened
 *  animate: false,        // Whether to animate the opening and closing of items
 *  prefix: '',            // Prefix for IDs and data attributes (optional)
 *  icons: ['', ''],       // options: ['+', '-'], [] for no icons
 *  iconClass: 'jsa-icon', // Class for the icon span
 *  termPadding: '1em', 	 // Padding for dt elements when theme is 'custom'
 *  schema: false,         // Whether to include FAQ schema
 *  schemaType: 'FAQPage', // Schema type, default is 'FAQPage'
 *  termBg: '',            // Background color for term elements ('core' theme)
 *  termBgActive: '',      // Background color for active term elements ('core' theme)
 *  termColor: '',        // Text color for term elements ('core' theme)
 *  termColorActive: '',  // Text color for active term elements ('core' theme)
 *  borderColor: '',      // Border color for term elements ('core' theme)
 *  darkmode: false,
 *  debug: false,
 * */



class jsa {

	constructor(opts = {}) {
		const _ = this;

		_.darkmode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false;

		_.settings = Object.assign({
			dl: ".jsa",
			dt: "dt a",
			dd: "dd",
			theme: '',
			openFirst: false,
			openAll: false,
			closeAll: null,
			closeOthers: false,
			animate: false,
			prefix: opts.prefix ?? `${Math.random().toString(36).substring(2, 7)}-`,
			hasNested: document.querySelector(opts.dl) ? document.querySelector(opts.dl).querySelectorAll(opts.dl).length > 0 : false,
			icons: ['', ''],
			iconClass: 'jsa-icon',
			termPadding: '0.5em 1em 0.5em 0',
			schema: false,
			schemaType: 'FAQPage',
			termBg: _.darkmode ? 'transparent' : '',
			termBgActive: _.darkmode ? 'black' : '',
			termColor: _.darkmode ? '#719456' : '',
			termColorActive: _.darkmode ? '#fff' : '',
			borders: true,
			borderColor: _.darkmode ? '#719456' : '',
			darkmode: false,
			debug: false,
		}, opts);


		if (_.settings.debug) {
			console.log('jsa settings = ', _.settings);
		}


		_.parentDL = document.querySelector(_.settings.dl) || null;

		// Get only direct children dt and dd of parentDL, excluding any nested dl elements
		_.terms = Array.from(_.parentDL.querySelectorAll(`${_.settings.dt}`)).filter(dt => dt.closest(_.settings.dl) === _.parentDL);

		_.definitions = Array.from(document.querySelectorAll(`${_.settings.dl} ${_.settings.dd}`)).filter(dd => {
			// Only include dd if its closest .jsa is parentDL AND it is not inside a nested dl
			const closestDL = dd.parentElement.closest(_.settings.dl);
			const parentDL = _.parentDL;
			// Exclude dd if it is inside a nested dl (other than parentDL)
			return closestDL === parentDL && dd.parentElement.closest(_.settings.dl) === parentDL;

		});

		if (_.settings.theme) _.parentDL.classList.add(`jsa-theme-${_.settings.theme}`);

		// Event Delegation for terms
		_.parentDL.addEventListener("click", e => {
			e.preventDefault();
			e.stopPropagation();
			_.toggle(e.target);
		});

		// Set the IDs and data-target attributes for terms
		_.terms.map((term, index) => {
			term.setAttribute('tabindex', 0);
			term.setAttribute('id', `${_.settings.prefix}term${index}`);
			term.setAttribute('data-target', `${_.settings.prefix}definition${index}`);

			term.style.cursor = "pointer";
			term.setAttribute("aria-controls", `${_.settings.prefix}definition${index}`);
			term.setAttribute("aria-expanded", "false");
			if (_.settings.openFirst && index === 0) term.setAttribute("aria-expanded", "true");
			if (_.settings.openAll) term.setAttribute("aria-expanded", "true");
			term.setAttribute("role", "button");
			term.setAttribute("aria-label", !term.ariaLabel ? `Toggle definition for ${term.textContent.trim()}` : term.ariaLabel);

			if (_.settings.theme === 'core') {
				term.style.display = "flex";
				term.style.position = "relative";
				term.style.justifyContent = "space-between";
				term.style.alignItems = "center";
				term.style.gap = "1em";
				term.style.textDecoration = "none";
				term.style.padding = _.settings.termPadding;
				term.style.borderTop = _.settings.borders ? "1px solid " + (_.settings.darkmode ? _.settings.borderColor : "") : "none";
				term.style.color = (_.settings.darkmode ? _.settings.termColor : "");

				let icon = document.createElement('span');
				icon.innerHTML = _.settings.icons[0];
				icon.classList.add(_.settings.iconClass);
				icon.style.pointerEvents = "none";

				// If open first is true, set the icon to the "open" icon
				if (_.settings.openFirst && index === 0) icon.innerHTML = _.settings.icons[1];
				if (_.settings.openAll === true) icon.innerHTML = _.settings.icons[1];

				term.appendChild(icon);

			};


			if (_.settings.openFirst && index === 0) term.parentNode.classList.add("active");
			if (_.settings.openAll === true) term.parentNode.classList.add("active");

			// This covers accessibility for keyboard users
			term.addEventListener("keydown", e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					_.toggle(e.target);
				}
			});

		});

		_.definitions.map((definition, index) => {
			definition.setAttribute('id', `${_.settings.prefix}definition${index}`);
			definition.setAttribute("aria-labelledby", `${_.settings.prefix}term${index}`);

			definition.style.maxHeight = "0";
			definition.style.overflow = "hidden";
			definition.style.margin = "0";
			if (_.settings.animate === true) definition.style.transition = "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

			if (_.settings.openFirst === true && index === 0) definition.classList.add("show");
			if (_.settings.openFirst === true && index === 0) definition.style.maxHeight = definition.scrollHeight + "px";
			if (_.settings.openAll === true) definition.classList.add("show");

			if (_.settings.openAll === true) definition.style.maxHeight = definition.scrollHeight + "px";

			if (_.settings.theme === 'core') {
				definition.style.padding = "0";
				definition.style.margin = "0";
				definition.style.borderTop = "none";
				definition.style.transition = "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

			}
		});

		_.init();
		_.schema = [];
		_.buildSchema();

		if (_.settings.closeAll && document.querySelector(_.settings.closeAll)) {
			document.querySelector(_.settings.closeAll).addEventListener('click', e => {
				e.preventDefault();
				e.stopPropagation();
				_.reset();
			});
		};




	}// constructor

	init() {
		const _ = this;
		window.addEventListener('resize', _.debounce((e) => {
			_.updateDefinitionHeight();
		}, 200));

	}

	toggle(term) {
		const _ = this;
		if (!term.dataset.target) return; // Prevent toggling if the clicked element is not a term

		let target = term.dataset.target;

		let def = document.getElementById(`${target}`);
		const isOpen = def.classList.contains("show");

		if (_.settings.closeOthers && !isOpen) {
			_.reset();
		}

		def.classList.toggle("show");

		term.setAttribute("aria-expanded", !isOpen ? "true" : "false");
		term.parentNode.classList.toggle("active");

		if (_.settings.theme === 'core') {
			if (term.parentNode.classList.contains("active") && _.settings.darkmode === true) {
				term.style.color = (_.settings.darkmode ? _.settings.termColorActive : _settings.termColor);
				term.parentNode.style.backgroundColor = (_.settings.darkmode ? _.settings.termBgActive : "");
			} else {
				term.style.color = (_.settings.darkmode ? _.settings.termColor : '');
				term.parentNode.style.backgroundColor = (_.settings.darkmode ? _.settings.termBg : '');
			}
		}


		// Swap icon if applicable
		let icon = term.querySelector(`.${_.settings.iconClass}`);
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

	reset() {
		const _ = this;
		_.terms.map((term, index) => {
			term.parentNode.classList.remove("active");
			term.setAttribute("aria-expanded", "false");

			let icon = term.querySelector(`.${_.settings.iconClass}`);
			if (icon) {
				icon.innerHTML = _.settings.icons[0];
			}

		});
		_.definitions.map((definition, index) => {
			definition.classList.remove("show");
			definition.style.maxHeight = "0";
			if (_.settings.theme === 'core') definition.style.padding = "0";
		});
	}

	buildSchema() {

		const _ = this;

		if (!_.settings.schema) return;

		let schema = {
			"@context": "https://schema.org",
			"@type": _.settings.schemaType,
			"mainEntity": [

			]
		};
		_.terms.map((term, index) => {
			const question = {
				"@type": "Question",
				"name": term.textContent.trim(),
				"acceptedAnswer": {
					"@type": "Answer",
					"text": _.definitions[index].innerHTML.trim()
				}
			};
			schema.mainEntity.push(question);
		});

		_.el.insertAdjacentHTML("beforeend", `<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
	}

	debounce(fn, time) {
		let timeout;
		return function () {
			const functionCall = () => fn.apply(this, arguments);
			clearTimeout(timeout);
			timeout = setTimeout(functionCall, time);
		}
	}

	updateDefinitionHeight() {
		const _ = this;
		_.definitions.map((definition, index) => {
			if (definition.classList.contains("show")) {
				definition.style.maxHeight = definition.scrollHeight + "px";
			}
		});
	}

}// class jsa



const __webpack_exports__jsa = __webpack_exports__.jsa;
export { __webpack_exports__jsa as jsa };

//# sourceMappingURL=jsa.js.map