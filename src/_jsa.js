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
			inline: true
		}, opts);

		console.log('jsa settings = ', _.settings);

		_.el = document.getElementsByTagName(_.settings.dl)[0] || document.querySelector(_.settings.dl) || null;
		_.terms = _.getObjs(document.querySelectorAll(`${_.settings.dl} ${_.settings.dt}`));
		_.definitions = _.getObjs(document.querySelectorAll(`${_.settings.dl} ${_.settings.dd}`));

		console.log('el = ', _.el);
		console.log('terms = ', _.terms);
		console.log('definitions = ', _.definitions);

		// Set the IDs and data-target attributes for terms
		_.terms.map((term, index) => {
			console.log(term, index);
			term.setAttribute('tabindex', 0);
			term.setAttribute('id', `${_.settings.prefix}term${index}`);
			term.setAttribute('data-target', `${_.settings.prefix}definition${index}`);

			if (_.settings.openFirst && index === 0) term.classList.add("active");

			term.addEventListener("click", e => {
				e.preventDefault();
				_.toggle(e.target);
			});
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
			console.log(definition, index);

			definition.setAttribute('id', `${_.settings.prefix}definition${index}`);
			definition.setAttribute("aria-labelledby", `${_.settings.prefix}term${index}`);

			if (_.settings.inline) definition.style.maxHeight = "0";
			if (_.settings.inline) definition.style.overflow = "hidden";
			if (_.settings.openFirst === true && index === 0) definition.classList.add("show");
			if (_.settings.openFirst === true && index === 0 && _.settings.inline) definition.style.maxHeight = "100%";

			if (_.settings.openAll === true) definition.classList.add("show");
			if (_.settings.openAll === true && _.settings.inline) definition.style.maxHeight = "100%";
		});


	}// constructor

	toggle(term) {
		const _ = this;
		let target = term.dataset.target;
		let def = document.getElementById(`${target}`);

		def.classList.toggle("show");
		if (_.settings.inline) def.style.maxHeight = def.style.maxHeight === "100%" ? "0" : "100%";

	}

	getObjs(objs) {
		return Object.keys(objs).map(function (e) {
			return objs[e];
		});
	};

}


export { jsa };