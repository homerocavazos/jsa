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

"use strict";

class jsa {

	constructor(opts = {}) {
		const _ = this;

		_.settings = Object.assign({
			dl: "dl",
			dt: "dt a",
			dd: "dd",
			openFirst: false,
			openAll: false,
			prefix: opts.prefix ?? `${Math.random().toString(36).substring(2, 7)}-`, // Generate a random prefix if not provided
			inline: true,
			styled: 'basic', // options: 'basic', 'fancy', '' 
			icons: ['+', '-'], // options: ['+', '-'], ['arrow-down', 'arrow-up'], [] for no icons
			iconClass: 'jsa-icon', // Class for the icon span
			schema: false,
			mobileOnly: false
		}, opts);

		console.log('--------------------------------');
		console.log('jsa settings = ', _.settings);

		_.el = document.getElementsByTagName(_.settings.dl)[0] || document.querySelector(_.settings.dl) || null;
		_.terms = _.getObjs(document.querySelectorAll(`${_.settings.dl} ${_.settings.dt}`));
		_.definitions = _.getObjs(document.querySelectorAll(`${_.settings.dl} ${_.settings.dd}`));

		// Event Delegation for terms
		_.el.addEventListener("click", e => {
			e.preventDefault();
			_.toggle(e.target);
		});

		console.log('Accordion Element = ', _.el);

		// Set the IDs and data-target attributes for terms
		_.terms.map((term, index) => {
			console.log('Trigger = ', term);
			term.setAttribute('tabindex', 0);
			term.setAttribute('id', `${_.settings.prefix}term${index}`);
			term.setAttribute('data-target', `${_.settings.prefix}definition${index}`);

			term.style.cursor = "pointer";
			term.setAttribute("aria-controls", `${_.settings.prefix}definition${index}`);
			term.setAttribute("aria-expanded", "false");
			term.setAttribute("role", "button");
			term.setAttribute("aria-label", !term.ariaLabel ? `Toggle definition for ${term.textContent.trim()}` : term.ariaLabel);

			if (_.settings.styled === 'basic') {
				term.style.display = "flex";
				term.style.position = "relative";
				term.style.justifyContent = "space-between";
				term.style.alignItems = "center";
				term.style.textDecoration = "none";
				term.style.paddingRight = "1em";
				term.style.paddingTop = ".5em";
				term.style.paddingBottom = ".5em";
				term.style.borderTop = "1px solid #eee";

				let icon = document.createElement('span');
				icon.textContent = _.settings.icons[0];
				icon.classList.add(_.settings.iconClass);

				// If open first is true, set the icon to the "open" icon
				if (_.settings.openFirst && index === 0) icon.textContent = _.settings.icons[1];

				term.appendChild(icon);

			};
			if (_.settings.openFirst && index === 0) term.classList.add("active");

			// This covers accessibility for keyboard users
			term.addEventListener("keydown", e => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					_.toggle(e.target);
				}
			});

		});

		// Set the IDs for definitions
		_.definitions.map((definition, index) => {
			console.log('Definition = ', definition);

			definition.setAttribute('id', `${_.settings.prefix}definition${index}`);
			definition.setAttribute("aria-labelledby", `${_.settings.prefix}term${index}`);

			if (_.settings.inline) definition.style.maxHeight = "0";
			if (_.settings.inline) definition.style.overflow = "hidden";
			if (_.settings.openFirst === true && index === 0) definition.classList.add("show");
			if (_.settings.openFirst === true && index === 0 && _.settings.inline) definition.style.maxHeight = "100%";

			if (_.settings.openAll === true) definition.classList.add("show");
			if (_.settings.openAll === true && _.settings.inline) definition.style.maxHeight = "100%";

			if (_.settings.styled === 'basic') {
				definition.style.padding = "0";
				definition.style.margin = "0";
				definition.style.borderBottom = "1px solid #eee";
				definition.style.borderTop = "none";
				definition.style.transition = "max-height 0.2s ease-out";
				if (_.settings.openFirst === true && index === 0) definition.style.padding = "1em";
			}
		});

		_.schema = [];
		_.buildSchema();

	}// constructor

	toggle(term) {
		const _ = this;

		if (!term.dataset.target) return; // Prevent toggling if the clicked element is not a term

		let target = term.dataset.target;
		let def = document.getElementById(`${target}`);

		if (_.settings.styled === 'basic') {
			def.style.padding = def.classList.contains("show") ? "0" : "1em";
		}

		def.classList.toggle("show");
		term.setAttribute("aria-expanded", def.classList.contains("show") ? "true" : "false");

		// Swap icon if applicable
		let icon = term.querySelector(`.${_.settings.iconClass}`);
		if (icon) {
			icon.textContent = def.classList.contains("show") ? _.settings.icons[1] : _.settings.icons[0];
		}


		if (_.settings.inline) def.style.maxHeight = def.style.maxHeight === "100%" ? "0" : "100%";

	}

	getObjs(objs) {
		return Object.keys(objs).map(function (e) {
			return objs[e];
		});
	};

	buildSchema() {
		const _ = this;

		if (!_.settings.schema) return;

		let schema = {
			"@context": "https://schema.org",
			"@type": "FAQPage",
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

}



export { jsa };