// can be removed after updating to next version of Manipulator
u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		// global page reference
		window.page = page;


		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs(".servicenavigation", page.hN);
		u.e.drag(page.hN, page.hN);


		// content reference
		page.cN = u.qs("#content", page);


		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN = u.ie(page.hN, page.nN);


		// footer reference
		page.fN = u.qs("#footer");
		page.fN.service = u.qs(".servicenavigation", page.fN);


		// LOGO
		// add logo to header
		page.logo = u.ie(page.hN, "a", {"class":"logo", "html":"Templator", "href":"/"});


		// global resize handler 
		page.resized = function() {
//			u.bug("page resized")

			page.browser_h = u.browserH();
			page.browser_w = u.browserW();

			// adjust content height
			page.available_height = page.browser_h - page.hN.offsetHeight - page.fN.offsetHeight;
			u.as(page.cN, "min-height", "auto", false);
			if(page.available_height >= page.cN.offsetHeight) {
				u.as(page.cN, "min-height", page.available_height+"px", false);
			}

			// forward resize event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.resized) == "function") {
				page.cN.scene.resized();
			}

			// update dom
			page.offsetHeight;
		}

		// global scroll handler 
		page.scrolled = function() {
//			u.bug("page scrolled")

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}

			// update dom
			page.offsetHeight;
		}

		// global orientationchange handler
		page.orientationchanged = function() {
//			u.bug("page orientationchanged")

			// resize navigation if it is open
			if(u.hc(page.bn_nav, "open")) {
				u.as(page.hN, "height", window.innerHeight + "px");
			}

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.orientationchanged) == "function") {
				page.cN.scene.orientationchanged();
			}
		}
		


		// Page is ready - can be called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//			u.bug("page ready")

			// page is ready to be shown - only initalize if not already shown
			if(!this.is_ready) {

				// page is ready
				this.is_ready = true;

				// set resize handler
				u.e.addEvent(window, "resize", page.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);
				// set orientation change handler
				u.e.addEvent(window, "orientationchange", page.orientationchanged);

				// Initiate Navigation
				this.initNavigation();

				// Invoke global resize
				this.resized();

			}
		}

		// show accept cookies dialogue
		page.acceptCookies = function() {

			// show terms notification
			if(u.terms_version && !u.getCookie(u.terms_version)) {
				var terms = u.ie(page.cN, "div", {"class":"terms_notification"});
				u.ae(terms, "h3", {"html":"We love <br />cookies and privacy"});
				var bn_accept = u.ae(terms, "a", {"class":"accept", "html":"Accept"});
				bn_accept.terms = terms;
				u.ce(bn_accept);
				bn_accept.clicked = function() {
					this.terms.parentNode.removeChild(this.terms);
					u.saveCookie(u.terms_version, true, {"expiry":new Date(new Date().getTime()+(1000*60*60*24*365)).toGMTString()});
				}

				if(!location.href.match(/\/terms/)) {
					var bn_details = u.ae(terms, "a", {"class":"details", "html":"Details", "href":"/terms"});
					u.ce(bn_details, {"type":"link"});
				}

				// show terms/cookie approval
				u.a.transition(terms, "all 0.5s ease-in");
				u.ass(terms, {
					"opacity": 1
				});
			}

		}

		// initialize navigation elements
		page.initNavigation = function() {

			// get reference to Navigation UL
			page.nN.list = u.qs("ul.navigation", page.nN);

			// create burger menu
			this.bn_nav = u.qs(".servicenavigation li.navigation", this.hN);
			u.ae(this.bn_nav, "div");
			u.ae(this.bn_nav, "div");
			u.ae(this.bn_nav, "div");

			// enable nav link
			u.ce(this.bn_nav);
			this.bn_nav.clicked = function(event) {

				// close navigation
				if(u.hc(this, "open")) {
					u.rc(this, "open");

					// collapse header
					u.a.transition(page.hN, "all 0.3s ease-in");
					u.ass(page.hN, {
						"height": "60px"
					});
					u.ass(page.nN, {
						"display": "none"
					});


				}
				// open navigation
				else {
					u.ac(this, "open");

					// expand header
					u.a.transition(page.hN, "all 0.3s ease-in");
					u.ass(page.hN, {
						"height": window.innerHeight+"px",
					});
					u.ass(page.nN, {
						"display": "block"
					});

				}

				// update drag coordinates
				page.nN.start_drag_y = (window.innerHeight - 100) - page.nN.offsetHeight;
				page.nN.end_drag_y = page.nN.offsetHeight;

			}
			// enable dragging on navigation
			u.e.drag(this.nN, [0, (window.innerHeight - 100) - this.nN.offsetHeight, this.hN.offsetWidth, this.nN.offsetHeight], {"strict":false, "elastica":200, "vertical_lock":true});


			// append header servicenavigation to navigation (except li.navigation)
			if(page.hN.service) {
				nodes = u.qsa("li:not(.navigation)", page.hN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(page.nN.list, node);
				}
			}

			// append footer servicenavigation to navigation
			if(page.fN.service) {
				nodes = u.qsa("li", page.fN.service);
				for(i = 0; node = nodes[i]; i++) {
					u.ae(page.nN.list, node);
				}
				page.fN.removeChild(page.fN.service);
			}


			var i, node, nodes;
			// enable animation on submenus and logo
			nodes = u.qsa("#navigation li,a.logo", page.hN);
			for(i = 0; node = nodes[i]; i++) {

				// build first living proof model of CEL clickableElementLink
				u.ce(node, {"type":"link"});

				// add over and out animation
				u.e.hover(node);
				node.over = function() {}
				node.out = function() {}

			}

			// get clean set of navigation nodes (for animation on open and close)
			page.nN.nodes = u.qsa("li", page.nN.list);

		}


		// ready to start page builing process
		page.ready();

	}
}

u.e.addDOMReadyEvent(u.init);

