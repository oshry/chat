/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rtl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GetYoDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return transitionend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




// Core Foundation Utilities, utilized in a number of places.

  /**
   * Returns a boolean for RTL support
   */
function rtl() {
  return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').attr('dir') === 'rtl';
}

/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
function GetYoDigits(length, namespace){
  length = length || 6;
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (namespace ? `-${namespace}` : '');
}

function transitionend($elem){
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div'),
      end;

  for (var t in transitions){
    if (typeof elem.style[t] !== 'undefined'){
      end = transitions[t];
    }
  }
  if(end){
    return end;
  }else{
    end = setTimeout(function(){
      $elem.triggerHandler('transitionend', [$elem]);
    }, 1);
    return 'transitionend';
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);





// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
class Plugin {

  constructor(element, options) {
    this._setup(element, options);
    var pluginName = getPluginName(this);
    this.uuid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, pluginName);

    if(!this.$element.attr(`data-${pluginName}`)){ this.$element.attr(`data-${pluginName}`, this.uuid); }
    if(!this.$element.data('zfPlugin')){ this.$element.data('zfPlugin', this); }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    this.$element.trigger(`init.zf.${pluginName}`);
  }

  destroy() {
    this._destroy();
    var pluginName = getPluginName(this);
    this.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
        /**
         * Fires when the plugin has been destroyed.
         * @event Plugin#destroyed
         */
        .trigger(`destroyed.zf.${pluginName}`);
    for(var prop in this){
      this[prop] = null;//clean up script to prep for garbage collection.
    }
  }
}

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function getPluginName(obj) {
  if(typeof(obj.constructor.name) !== 'undefined') {
    return hyphenate(obj.constructor.name);
  } else {
    return hyphenate(obj.className);
  }
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keyboard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/*******************************************
 *                                         *
 * This util was created by Marius Olbertz *
 * Please thank Marius on GitHub /owlbertz *
 * or the web http://www.mariusolbertz.de/ *
 *                                         *
 ******************************************/






const keyCodes = {
  9: 'TAB',
  13: 'ENTER',
  27: 'ESCAPE',
  32: 'SPACE',
  35: 'END',
  36: 'HOME',
  37: 'ARROW_LEFT',
  38: 'ARROW_UP',
  39: 'ARROW_RIGHT',
  40: 'ARROW_DOWN'
}

var commands = {}

// Functions pulled out to be referenceable from internals
function findFocusable($element) {
  if(!$element) {return false; }
  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function() {
    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':visible') || __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('tabindex') < 0) { return false; } //only have visible elements and those that have a tabindex greater or equal 0
    return true;
  });
}

function parseKey(event) {
  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
  key = key.replace(/\W+/, '');

  if (event.shiftKey) key = `SHIFT_${key}`;
  if (event.ctrlKey) key = `CTRL_${key}`;
  if (event.altKey) key = `ALT_${key}`;

  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
  key = key.replace(/_$/, '');

  return key;
}

var Keyboard = {
  keys: getKeyCodes(keyCodes),

  /**
   * Parses the (keyboard) event and returns a String that represents its key
   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
   * @param {Event} event - the event generated by the event handler
   * @return String key - String that represents the key pressed
   */
  parseKey: parseKey,

  /**
   * Handles the given (keyboard) event
   * @param {Event} event - the event generated by the event handler
   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
   * @param {Objects} functions - collection of functions that are to be executed
   */
  handleKey(event, component, functions) {
    var commandList = commands[component],
      keyCode = this.parseKey(event),
      cmds,
      command,
      fn;

    if (!commandList) return console.warn('Component not defined!');

    if (typeof commandList.ltr === 'undefined') { // this component does not differentiate between ltr and rtl
        cmds = commandList; // use plain list
    } else { // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["a" /* rtl */])()) cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.ltr, commandList.rtl);

        else cmds = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, commandList.rtl, commandList.ltr);
    }
    command = cmds[keyCode];

    fn = functions[command];
    if (fn && typeof fn === 'function') { // execute function  if exists
      var returnValue = fn.apply();
      if (functions.handled || typeof functions.handled === 'function') { // execute function when event was handled
          functions.handled(returnValue);
      }
    } else {
      if (functions.unhandled || typeof functions.unhandled === 'function') { // execute function when event was not handled
          functions.unhandled();
      }
    }
  },

  /**
   * Finds all focusable elements within the given `$element`
   * @param {jQuery} $element - jQuery object to search within
   * @return {jQuery} $focusable - all focusable elements within `$element`
   */

  findFocusable: findFocusable,

  /**
   * Returns the component name name
   * @param {Object} component - Foundation component, e.g. Slider or Reveal
   * @return String componentName
   */

  register(componentName, cmds) {
    commands[componentName] = cmds;
  },


  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
  //
  /**
   * Traps the focus in the given element.
   * @param  {jQuery} $element  jQuery object to trap the foucs into.
   */
  trapFocus($element) {
    var $focusable = findFocusable($element),
        $firstFocusable = $focusable.eq(0),
        $lastFocusable = $focusable.eq(-1);

    $element.on('keydown.zf.trapfocus', function(event) {
      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
        event.preventDefault();
        $firstFocusable.focus();
      }
      else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
        event.preventDefault();
        $lastFocusable.focus();
      }
    });
  },
  /**
   * Releases the trapped focus from the given element.
   * @param  {jQuery} $element  jQuery object to release the focus for.
   */
  releaseFocus($element) {
    $element.off('keydown.zf.trapfocus');
  }
}

/*
 * Constants for easier comparing.
 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
 */
function getKeyCodes(kcs) {
  var k = {};
  for (var kc in kcs) k[kcs[kc]] = kcs[kc];
  return k;
}




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MediaQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




// Default set of media queries
const defaultQueries = {
  'default' : 'only screen',
  landscape : 'only screen and (orientation: landscape)',
  portrait : 'only screen and (orientation: portrait)',
  retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
    'only screen and (min--moz-device-pixel-ratio: 2),' +
    'only screen and (-o-min-device-pixel-ratio: 2/1),' +
    'only screen and (min-device-pixel-ratio: 2),' +
    'only screen and (min-resolution: 192dpi),' +
    'only screen and (min-resolution: 2dppx)'
  };


// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
let matchMedia = window.matchMedia || (function() {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style   = document.createElement('style'),
    script      = document.getElementsByTagName('script')[0],
    info        = null;

    style.type  = 'text/css';
    style.id    = 'matchmediajs-test';

    script && script.parentNode && script.parentNode.insertBefore(style, script);

    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
    info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

    styleMedia = {
      matchMedium(media) {
        var text = `@media ${media}{ #matchmediajs-test { width: 1px; } }`;

        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        }

        // Test if media query is true or false
        return info.width === '1px';
      }
    }
  }

  return function(media) {
    return {
      matches: styleMedia.matchMedium(media || 'all'),
      media: media || 'all'
    };
  }
})();

var MediaQuery = {
  queries: [],

  current: '',

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init() {
    var self = this;
    var $meta = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('meta.foundation-mq');
    if(!$meta.length){
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<meta class="foundation-mq">').appendTo(document.head);
    }

    var extractedStyles = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('.foundation-mq').css('font-family');
    var namedQueries;

    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      if(namedQueries.hasOwnProperty(key)) {
        self.queries.push({
          name: key,
          value: `only screen and (min-width: ${namedQueries[key]})`
        });
      }
    }

    this.current = this._getCurrentSize();

    this._watcher();
  },

  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast(size) {
    var query = this.get(size);

    if (query) {
      return matchMedia(query).matches;
    }

    return false;
  },

  /**
   * Checks if the screen matches to a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
   */
  is(size) {
    size = size.trim().split(' ');
    if(size.length > 1 && size[1] === 'only') {
      if(size[0] === this._getCurrentSize()) return true;
    } else {
      return this.atLeast(size[0]);
    }
    return false;
  },

  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get(size) {
    for (var i in this.queries) {
      if(this.queries.hasOwnProperty(i)) {
        var query = this.queries[i];
        if (size === query.name) return query.value;
      }
    }

    return null;
  },

  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize() {
    var matched;

    for (var i = 0; i < this.queries.length; i++) {
      var query = this.queries[i];

      if (matchMedia(query.value).matches) {
        matched = query;
      }
    }

    if (typeof matched === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },

  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher() {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', () => {
      var newSize = this._getCurrentSize(), currentSize = this.current;

      if (newSize !== currentSize) {
        // Change the current media query
        this.current = newSize;

        // Broadcast the media query change on the window
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
      }
    });
  }
};



// Thank you: https://github.com/sindresorhus/query-string
function parseStyleToObject(str) {
  var styleObject = {};

  if (typeof str !== 'string') {
    return styleObject;
  }

  str = str.trim().slice(1, -1); // browsers re-quote string style values

  if (!str) {
    return styleObject;
  }

  styleObject = str.split('&').reduce(function(ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = parts[0];
    var val = parts[1];
    key = decodeURIComponent(key);

    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);

    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    } else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    } else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});

  return styleObject;
}




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Triggers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__ = __webpack_require__(6);





const MutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i=0; i < prefixes.length; i++) {
    if (`${prefixes[i]}MutationObserver` in window) {
      return window[`${prefixes[i]}MutationObserver`];
    }
  }
  return false;
}());

const triggers = (el, type) => {
  el.data(type).split(' ').forEach(id => {
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${id}`)[ type === 'close' ? 'trigger' : 'triggerHandler'](`${type}.zf.trigger`, [el]);
  });
};

var Triggers = {
  Listeners: {
    Basic: {},
    Global: {}
  },
  Initializers: {}
}

Triggers.Listeners.Basic  = {
  openListener: function() {
    triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'open');
  },
  closeListener: function() {
    let id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('close');
    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'close');
    }
    else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('close.zf.trigger');
    }
  },
  toggleListener: function() {
    let id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
    if (id) {
      triggers(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), 'toggle');
    } else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('toggle.zf.trigger');
    }
  },
  closeableListener: function(e) {
    e.stopPropagation();
    let animation = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('closable');

    if(animation !== ''){
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateOut(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), animation, function() {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('closed.zf');
      });
    }else{
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).fadeOut().trigger('closed.zf');
    }
  },
  toggleFocusListener: function() {
    let id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle-focus');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${id}`).triggerHandler('toggle.zf.trigger', [__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)]);
  }
};

// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.Initializers.addOpenListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.Listeners.Basic.openListener);
}

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.Initializers.addCloseListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.Listeners.Basic.closeListener);
}

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.Initializers.addToggleListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.Listeners.Basic.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.Listeners.Basic.toggleListener);
}

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.Initializers.addCloseableListener = ($elem) => {
  $elem.off('close.zf.trigger', Triggers.Listeners.Basic.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable], [data-closable]', Triggers.Listeners.Basic.closeableListener);
}

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.Initializers.addToggleFocusListener = ($elem) => {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.Listeners.Basic.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.Listeners.Basic.toggleFocusListener);
}



// More Global/complex listeners and triggers
Triggers.Listeners.Global  = {
  resizeListener: function($nodes) {
    if(!MutationObserver){//fallback for IE 9
      $nodes.each(function(){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('resizeme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a resize event
    $nodes.attr('data-events', "resize");
  },
  scrollListener: function($nodes) {
    if(!MutationObserver){//fallback for IE 9
      $nodes.each(function(){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).triggerHandler('scrollme.zf.trigger');
      });
    }
    //trigger all listening elements and signal a scroll event
    $nodes.attr('data-events', "scroll");
  },
  closeMeListener: function(e, pluginId){
    let plugin = e.namespace.split('.')[0];
    let plugins = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-${plugin}]`).not(`[data-yeti-box="${pluginId}"]`);

    plugins.each(function(){
      let _this = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      _this.triggerHandler('close.zf.trigger', [_this]);
    });
  }
}

// Global, parses whole document.
Triggers.Initializers.addClosemeListener = function(pluginName) {
  var yetiBoxes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-yeti-box]'),
      plugNames = ['dropdown', 'tooltip', 'reveal'];

  if(pluginName){
    if(typeof pluginName === 'string'){
      plugNames.push(pluginName);
    }else if(typeof pluginName === 'object' && typeof pluginName[0] === 'string'){
      plugNames.concat(pluginName);
    }else{
      console.error('Plugin names must be strings');
    }
  }
  if(yetiBoxes.length){
    let listeners = plugNames.map((name) => {
      return `closeme.zf.${name}`;
    }).join(' ');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(listeners).on(listeners, Triggers.Listeners.Global.closeMeListener);
  }
}

function debounceGlobalListener(debounce, trigger, listener) {
  let timer, args = Array.prototype.slice.call(arguments, 3);
  __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(trigger).on(trigger, function(e) {
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(function(){
      listener.apply(null, args);
    }, debounce || 10);//default time to emit scroll event
  });
}

Triggers.Initializers.addResizeListener = function(debounce){
  let $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-resize]');
  if($nodes.length){
    debounceGlobalListener(debounce, 'resize.zf.trigger', Triggers.Listeners.Global.resizeListener, $nodes);
  }
}

Triggers.Initializers.addScrollListener = function(debounce){
  let $nodes = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-scroll]');
  if($nodes.length){
    debounceGlobalListener(debounce, 'scroll.zf.trigger', Triggers.Listeners.Global.scrollListener, $nodes);
  }
}

Triggers.Initializers.addMutationEventsListener = function($elem) {
  if(!MutationObserver){ return false; }
  let $nodes = $elem.find('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function (mutationRecordsList) {
    var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(mutationRecordsList[0].target);

    //trigger the event handler for the element depending on type
    switch (mutationRecordsList[0].type) {
      case "attributes":
        if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
        }
        if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
          $target.triggerHandler('resizeme.zf.trigger', [$target]);
         }
        if (mutationRecordsList[0].attributeName === "style") {
          $target.closest("[data-mutate]").attr("data-events","mutate");
          $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        }
        break;

      case "childList":
        $target.closest("[data-mutate]").attr("data-events","mutate");
        $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
        break;

      default:
        return false;
      //nothing
    }
  };

  if ($nodes.length) {
    //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
    for (var i = 0; i <= $nodes.length - 1; i++) {
      var elementObserver = new MutationObserver(listeningElementsMutation);
      elementObserver.observe($nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
    }
  }
}

Triggers.Initializers.addSimpleListeners = function() {
  let $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);

  Triggers.Initializers.addOpenListener($document);
  Triggers.Initializers.addCloseListener($document);
  Triggers.Initializers.addToggleListener($document);
  Triggers.Initializers.addCloseableListener($document);
  Triggers.Initializers.addToggleFocusListener($document);

}

Triggers.Initializers.addGlobalListeners = function() {
  let $document = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document);
  Triggers.Initializers.addMutationEventsListener($document);
  Triggers.Initializers.addResizeListener();
  Triggers.Initializers.addScrollListener();
  Triggers.Initializers.addClosemeListener();
}


Triggers.init = function($, Foundation) {
  if (typeof($.triggersInitialized) === 'undefined') {
    let $document = $(document);

    if(document.readyState === "complete") {
      Triggers.Initializers.addSimpleListeners();
      Triggers.Initializers.addGlobalListeners();
    } else {
      $(window).on('load', () => {
        Triggers.Initializers.addSimpleListeners();
        Triggers.Initializers.addGlobalListeners();
      });
    }


    $.triggersInitialized = true;
  }

  if(Foundation) {
    Foundation.Triggers = Triggers;
    // Legacy included to be backwards compatible for now.
    Foundation.IHearYou = Triggers.Initializers.addGlobalListeners
  }
}




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Motion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);





/**
 * Motion module.
 * @module foundation.motion
 */

const initClasses   = ['mui-enter', 'mui-leave'];
const activeClasses = ['mui-enter-active', 'mui-leave-active'];

const Motion = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
}

function Move(duration, elem, fn){
  var anim, prog, start = null;
  // console.log('called');

  if (duration === 0) {
    fn.apply(elem);
    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    return;
  }

  function move(ts){
    if(!start) start = ts;
    // console.log(start, ts);
    prog = ts - start;
    fn.apply(elem);

    if(prog < duration){ anim = window.requestAnimationFrame(move, elem); }
    else{
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
}

/**
 * Animates an element in or out using a CSS transition class.
 * @function
 * @private
 * @param {Boolean} isIn - Defines if the animation is in or out.
 * @param {Object} element - jQuery or HTML object to animate.
 * @param {String} animation - CSS class to use.
 * @param {Function} cb - Callback to run when animation is finished.
 */
function animate(isIn, element, animation, cb) {
  element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element).eq(0);

  if (!element.length) return;

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();

  element
    .addClass(animation)
    .css('transition', 'none');

  requestAnimationFrame(() => {
    element.addClass(initClass);
    if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(() => {
    element[0].offsetWidth;
    element
      .css('transition', '')
      .addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["c" /* transitionend */])(element), finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(`${initClass} ${activeClass} ${animation}`);
  }
}





/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Box; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_util_core__ = __webpack_require__(1);





var Box = {
  ImNotTouchingYou: ImNotTouchingYou,
  OverlapArea: OverlapArea,
  GetDimensions: GetDimensions,
  GetOffsets: GetOffsets,
  GetExplicitOffsets: GetExplicitOffsets
}

/**
 * Compares the dimensions of an element to a container and determines collision events with container.
 * @function
 * @param {jQuery} element - jQuery object to test for collisions.
 * @param {jQuery} parent - jQuery object to use as bounding container.
 * @param {Boolean} lrOnly - set to true to check left and right values only.
 * @param {Boolean} tbOnly - set to true to check top and bottom values only.
 * @default if no parent object passed, detects collisions with `window`.
 * @returns {Boolean} - true if collision free, false if a collision in any direction.
 */
function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
};

function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
  var eleDims = GetDimensions(element),
  topOver, bottomOver, leftOver, rightOver;
  if (parent) {
    var parDims = GetDimensions(parent);

    bottomOver = (parDims.height + parDims.offset.top) - (eleDims.offset.top + eleDims.height);
    topOver    = eleDims.offset.top - parDims.offset.top;
    leftOver   = eleDims.offset.left - parDims.offset.left;
    rightOver  = (parDims.width + parDims.offset.left) - (eleDims.offset.left + eleDims.width);
  }
  else {
    bottomOver = (eleDims.windowDims.height + eleDims.windowDims.offset.top) - (eleDims.offset.top + eleDims.height);
    topOver    = eleDims.offset.top - eleDims.windowDims.offset.top;
    leftOver   = eleDims.offset.left - eleDims.windowDims.offset.left;
    rightOver  = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
  }

  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
  topOver    = Math.min(topOver, 0);
  leftOver   = Math.min(leftOver, 0);
  rightOver  = Math.min(rightOver, 0);

  if (lrOnly) {
    return leftOver + rightOver;
  }
  if (tbOnly) {
    return topOver + bottomOver;
  }

  // use sum of squares b/c we care about overlap area.
  return Math.sqrt((topOver * topOver) + (bottomOver * bottomOver) + (leftOver * leftOver) + (rightOver * rightOver));
}

/**
 * Uses native methods to return an object of dimension values.
 * @function
 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
 * @returns {Object} - nested object of integer pixel values
 * TODO - if element is window, return only those values.
 */
function GetDimensions(elem){
  elem = elem.length ? elem[0] : elem;

  if (elem === window || elem === document) {
    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
  }

  var rect = elem.getBoundingClientRect(),
      parRect = elem.parentNode.getBoundingClientRect(),
      winRect = document.body.getBoundingClientRect(),
      winY = window.pageYOffset,
      winX = window.pageXOffset;

  return {
    width: rect.width,
    height: rect.height,
    offset: {
      top: rect.top + winY,
      left: rect.left + winX
    },
    parentDims: {
      width: parRect.width,
      height: parRect.height,
      offset: {
        top: parRect.top + winY,
        left: parRect.left + winX
      }
    },
    windowDims: {
      width: winRect.width,
      height: winRect.height,
      offset: {
        top: winY,
        left: winX
      }
    }
  }
}

/**
 * Returns an object of top and left integer pixel values for dynamically rendered elements,
 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
 * you don't know alignment, but generally from
 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
 * @function
 * @param {jQuery} element - jQuery object for the element being positioned.
 * @param {jQuery} anchor - jQuery object for the element's anchor point.
 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
 * TODO alter/rewrite to work with `em` values as well/instead of pixels
 */
function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");
  switch (position) {
    case 'top':
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["a" /* rtl */])() ?
        GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) :
        GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);
    case 'bottom':
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["a" /* rtl */])() ?
        GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) :
        GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    case 'center top':
      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);
    case 'center bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);
    case 'center left':
      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);
    case 'center right':
      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);
    case 'left bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);
    case 'right bottom':
      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
    // Backwards compatibility... this along with the reveal and reveal full
    // classes are the only ones that didn't reference anchor
    case 'center':
      return {
        left: ($eleDims.windowDims.offset.left + ($eleDims.windowDims.width / 2)) - ($eleDims.width / 2) + hOffset,
        top: ($eleDims.windowDims.offset.top + ($eleDims.windowDims.height / 2)) - ($eleDims.height / 2 + vOffset)
      }
    case 'reveal':
      return {
        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
        top: $eleDims.windowDims.offset.top + vOffset
      }
    case 'reveal full':
      return {
        left: $eleDims.windowDims.offset.left,
        top: $eleDims.windowDims.offset.top
      }
      break;
    default:
      return {
        left: (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__foundation_util_core__["a" /* rtl */])() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset: $anchorDims.offset.left + hOffset),
        top: $anchorDims.offset.top + $anchorDims.height + vOffset
      }

  }

}

function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
  var $eleDims = GetDimensions(element),
      $anchorDims = anchor ? GetDimensions(anchor) : null;

      var topVal, leftVal;

  // set position related attribute

  switch (position) {
    case 'top':
      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
      break;
    case 'bottom':
      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
      break;
    case 'left':
      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
      break;
    case 'right':
      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
      break;
  }


  // set alignment related attribute
  switch (position) {
    case 'top':
    case 'bottom':
      switch (alignment) {
        case 'left':
          leftVal = $anchorDims.offset.left + hOffset;
          break;
        case 'right':
          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
          break;
        case 'center':
          leftVal = isOverflow ? hOffset : (($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2)) + hOffset;
          break;
      }
      break;
    case 'right':
    case 'left':
      switch (alignment) {
        case 'bottom':
          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
          break;
        case 'top':
          topVal = $anchorDims.offset.top + vOffset
          break;
        case 'center':
          topVal = ($anchorDims.offset.top + vOffset + ($anchorDims.height / 2)) - ($eleDims.height / 2)
          break;
      }
      break;
  }
  return {top: topVal, left: leftVal};
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return onImagesLoaded; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images, callback){
  var self = this,
      unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function(){
    // Check if image is loaded
    if (this.complete && this.naturalWidth !== undefined) {
      singleImageLoaded();
    }
    else {
      // If the above check failed, simulate loading on detached element.
      var image = new Image();
      // Still count image as loaded if it finalizes with an error.
      var events = "load.zf.images error.zf.images";
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(image).one(events, function me(event){
        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off(events, me);
        singleImageLoaded();
      });
      image.src = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('src');
    }
  });

  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




const Nest = {
  Feather(menu, type = 'zf') {
    menu.attr('role', 'menubar');

    var items = menu.find('li').attr({'role': 'menuitem'}),
        subMenuClass = `is-${type}-submenu`,
        subItemClass = `${subMenuClass}-item`,
        hasSubClass = `is-${type}-submenu-parent`,
        applyAria = (type !== 'accordion'); // Accordions handle their own ARIA attriutes.

    items.each(function() {
      var $item = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item.addClass(hasSubClass);
        $sub.addClass(`submenu ${subMenuClass}`).attr({'data-submenu': ''});
        if(applyAria) {
          $item.attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          });
          // Note:  Drilldowns behave differently in how they hide, and so need
          // additional attributes.  We should look if this possibly over-generalized
          // utility (Nest) is appropriate when we rework menus in 6.4
          if(type === 'drilldown') {
            $item.attr({'aria-expanded': false});
          }
        }
        $sub
          .addClass(`submenu ${subMenuClass}`)
          .attr({
            'data-submenu': '',
            'role': 'menu'
          });
        if(type === 'drilldown') {
          $sub.attr({'aria-hidden': true});
        }
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass(`is-submenu-item ${subItemClass}`);
      }
    });

    return;
  },

  Burn(menu, type) {
    var //items = menu.find('li'),
        subMenuClass = `is-${type}-submenu`,
        subItemClass = `${subMenuClass}-item`,
        hasSubClass = `is-${type}-submenu-parent`;

    menu
      .find('>li, .menu, .menu > li')
      .removeClass(`${subMenuClass} ${subItemClass} ${hasSubClass} is-submenu-item submenu is-active`)
      .removeAttr('data-submenu').css('display', '');

  }
}




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Touch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
//**************************************************
//**Work inspired by multiple jquery swipe plugins**
//**Done by Yohai Ararat ***************************
//**************************************************



var Touch = {};

var startPosX,
    startPosY,
    startTime,
    elapsedTime,
    isMoving = false;

function onTouchEnd() {
  //  alert(this);
  this.removeEventListener('touchmove', onTouchMove);
  this.removeEventListener('touchend', onTouchEnd);
  isMoving = false;
}

function onTouchMove(e) {
  if (__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.preventDefault) { e.preventDefault(); }
  if(isMoving) {
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    var dx = startPosX - x;
    var dy = startPosY - y;
    var dir;
    elapsedTime = new Date().getTime() - startTime;
    if(Math.abs(dx) >= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.moveThreshold && elapsedTime <= __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.spotSwipe.timeThreshold) {
      dir = dx > 0 ? 'left' : 'right';
    }
    // else if(Math.abs(dy) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
    //   dir = dy > 0 ? 'down' : 'up';
    // }
    if(dir) {
      e.preventDefault();
      onTouchEnd.call(this);
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).trigger('swipe', dir).trigger(`swipe${dir}`);
    }
  }
}

function onTouchStart(e) {
  if (e.touches.length == 1) {
    startPosX = e.touches[0].pageX;
    startPosY = e.touches[0].pageY;
    isMoving = true;
    startTime = new Date().getTime();
    this.addEventListener('touchmove', onTouchMove, false);
    this.addEventListener('touchend', onTouchEnd, false);
  }
}

function init() {
  this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
}

function teardown() {
  this.removeEventListener('touchstart', onTouchStart);
}

class SpotSwipe {
  constructor($) {
    this.version = '1.0.0';
    this.enabled = 'ontouchstart' in document.documentElement;
    this.preventDefault = false;
    this.moveThreshold = 75;
    this.timeThreshold = 200;
    this.$ = $;
    this._init();
  }

  _init() {
    var $ = this.$;
    $.event.special.swipe = { setup: init };

    $.each(['left', 'up', 'down', 'right'], function () {
      $.event.special[`swipe${this}`] = { setup: function(){
        $(this).on('swipe', $.noop);
      } };
    });
  }
}

/****************************************************
 * As far as I can tell, both setupSpotSwipe and    *
 * setupTouchHandler should be idempotent,          *
 * because they directly replace functions &        *
 * values, and do not add event handlers directly.  *
 ****************************************************/

Touch.setupSpotSwipe = function($) {
  $.spotSwipe = new SpotSwipe($);
};

/****************************************************
 * Method for adding pseudo drag events to elements *
 ***************************************************/
Touch.setupTouchHandler = function($) {
  $.fn.addTouch = function(){
    this.each(function(i,el){
      $(el).bind('touchstart touchmove touchend touchcancel', function(event)  {
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function(event){
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
            touchstart: 'mousedown',
            touchmove: 'mousemove',
            touchend: 'mouseup'
          },
          type = eventTypes[event.type],
          simulatedEvent
        ;

      if('MouseEvent' in window && typeof window.MouseEvent === 'function') {
        simulatedEvent = new window.MouseEvent(type, {
          'bubbles': true,
          'cancelable': true,
          'screenX': first.screenX,
          'screenY': first.screenY,
          'clientX': first.clientX,
          'clientY': first.clientY
        });
      } else {
        simulatedEvent = document.createEvent('MouseEvent');
        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
      }
      first.target.dispatchEvent(simulatedEvent);
    };
  };
};

Touch.init = function($) {
  if(typeof($.spotSwipe) === 'undefined') {
    Touch.setupSpotSwipe($);
    Touch.setupTouchHandler($);
  }
};




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accordion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);







/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */

class Accordion extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of an accordion.
   * @class
   * @name Accordion
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - a plain object with settings to override the default options.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Accordion.defaults, this.$element.data(), options);

    this.className = 'Accordion'; // ie9 back compat
    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Accordion', {
      'ENTER': 'toggle',
      'SPACE': 'toggle',
      'ARROW_DOWN': 'next',
      'ARROW_UP': 'previous'
    });
  }

  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  _init() {
    this.$element.attr('role', 'tablist');
    this.$tabs = this.$element.children('[data-accordion-item]');

    this.$tabs.each(function(idx, el) {
      var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el),
          $content = $el.children('[data-tab-content]'),
          id = $content[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* GetYoDigits */])(6, 'accordion'),
          linkId = el.id || `${id}-label`;

      $el.find('a:first').attr({
        'aria-controls': id,
        'role': 'tab',
        'id': linkId,
        'aria-expanded': false,
        'aria-selected': false
      });

      $content.attr({'role': 'tabpanel', 'aria-labelledby': linkId, 'aria-hidden': true, 'id': id});
    });
    var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
    this.firstTimeInit = true;
    if($initActive.length){
      this.down($initActive, this.firstTimeInit);
      this.firstTimeInit = false;
    }

    this._checkDeepLink = () => {
      var anchor = window.location.hash;
      //need a hash and a relevant anchor in this tabset
      if(anchor.length) {
        var $link = this.$element.find('[href$="'+anchor+'"]'),
        $anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor);

        if ($link.length && $anchor) {
          if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
            this.down($anchor, this.firstTimeInit);
            this.firstTimeInit = false;
          };

          //roll up a little to show the titles
          if (this.options.deepLinkSmudge) {
            var _this = this;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).load(function() {
              var offset = _this.$element.offset();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: offset.top }, _this.options.deepLinkSmudgeDelay);
            });
          }

          /**
            * Fires when the zplugin has deeplinked at pageload
            * @event Accordion#deeplink
            */
          this.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
        }
      }
    }

    //use browser to open a tab, if it exists in this tabset
    if (this.options.deepLink) {
      this._checkDeepLink();
    }

    this._events();
  }

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  _events() {
    var _this = this;

    this.$tabs.each(function() {
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var $tabContent = $elem.children('[data-tab-content]');
      if ($tabContent.length) {
        $elem.children('a').off('click.zf.accordion keydown.zf.accordion')
               .on('click.zf.accordion', function(e) {
          e.preventDefault();
          _this.toggle($tabContent);
        }).on('keydown.zf.accordion', function(e){
          __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Accordion', {
            toggle: function() {
              _this.toggle($tabContent);
            },
            next: function() {
              var $a = $elem.next().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion')
              }
            },
            previous: function() {
              var $a = $elem.prev().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion')
              }
            },
            handled: function() {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        });
      }
    });
    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._checkDeepLink);
    }
  }

  /**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
   * @function
   */
  toggle($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot toggle an accordion that is disabled.');
      return;
    }
    if($target.parent().hasClass('is-active')) {
      this.up($target);
    } else {
      this.down($target);
    }
    //either replace or update browser history
    if (this.options.deepLink) {
      var anchor = $target.prev('a').attr('href');

      if (this.options.updateHistory) {
        history.pushState({}, '', anchor);
      } else {
        history.replaceState({}, '', anchor);
      }
    }
  }

  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
   * @param {Boolean} firstTime - flag to determine if reflow should happen.
   * @fires Accordion#down
   * @function
   */
  down($target, firstTime) {
    /**
     * checking firstTime allows for initial render of the accordion
     * to render preset is-active panes.
     */
    if ($target.closest('[data-accordion]').is('[disabled]') && !firstTime)  {
      console.info('Cannot call down on an accordion that is disabled.');
      return;
    }
    $target
      .attr('aria-hidden', false)
      .parent('[data-tab-content]')
      .addBack()
      .parent().addClass('is-active');

    if (!this.options.multiExpand && !firstTime) {
      var $currentActive = this.$element.children('.is-active').children('[data-tab-content]');
      if ($currentActive.length) {
        this.up($currentActive.not($target));
      }
    }

    $target.slideDown(this.options.slideSpeed, () => {
      /**
       * Fires when the tab is done opening.
       * @event Accordion#down
       */
      this.$element.trigger('down.zf.accordion', [$target]);
    });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${$target.attr('aria-labelledby')}`).attr({
      'aria-expanded': true,
      'aria-selected': true
    });
  }

  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   */
  up($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot call up on an accordion that is disabled.');
      return;
    }

    var $aunts = $target.parent().siblings(),
        _this = this;

    if((!this.options.allowAllClosed && !$aunts.hasClass('is-active')) || !$target.parent().hasClass('is-active')) {
      return;
    }

    $target.slideUp(_this.options.slideSpeed, function () {
      /**
       * Fires when the tab is done collapsing up.
       * @event Accordion#up
       */
      _this.$element.trigger('up.zf.accordion', [$target]);
    });

    $target.attr('aria-hidden', true)
           .parent().removeClass('is-active');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${$target.attr('aria-labelledby')}`).attr({
     'aria-expanded': false,
     'aria-selected': false
   });
  }

  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */
  _destroy() {
    this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
    this.$element.find('a').off('.zf.accordion');
    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._checkDeepLink);
    }

  }
}

Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,
  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false
};




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);









/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */

class AccordionMenu extends __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of an accordion menu.
   * @class
   * @name AccordionMenu
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, AccordionMenu.defaults, this.$element.data(), options);
    this.className = 'AccordionMenu'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('AccordionMenu', {
      'ENTER': 'toggle',
      'SPACE': 'toggle',
      'ARROW_RIGHT': 'open',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'close',
      'ESCAPE': 'closeAll'
    });
  }



  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'accordion');

    var _this = this;

    this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
    this.$element.attr({
      'role': 'tree',
      'aria-multiselectable': this.options.multiOpen
    });

    this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
    this.$menuLinks.each(function(){
      var linkId = this.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'acc-menu-link'),
          $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $sub = $elem.children('[data-submenu]'),
          subId = $sub[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'acc-menu'),
          isActive = $sub.hasClass('is-active');

      if(_this.options.parentLink) {
        let $anchor = $elem.children('a');
        $anchor.clone().prependTo($sub).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-accordion-submenu-item"></li>');
      }

      if(_this.options.submenuToggle) {
        $elem.addClass('has-submenu-toggle');
        $elem.children('a').after('<button id="' + linkId + '" class="submenu-toggle" aria-controls="' + subId + '" aria-expanded="' + isActive + '" title="' + _this.options.submenuToggleText + '"><span class="submenu-toggle-text">' + _this.options.submenuToggleText + '</span></button>');
      } else {
        $elem.attr({
          'aria-controls': subId,
          'aria-expanded': isActive,
          'id': linkId
        });
      }
      $sub.attr({
        'aria-labelledby': linkId,
        'aria-hidden': !isActive,
        'role': 'group',
        'id': subId
      });
    });
    this.$element.find('li').attr({
      'role': 'treeitem'
    });
    var initPanes = this.$element.find('.is-active');
    if(initPanes.length){
      var _this = this;
      initPanes.each(function(){
        _this.down(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
    }
    this._events();
  }

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  _events() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]');

      if ($submenu.length) {
        if(_this.options.submenuToggle) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('.submenu-toggle').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function(e) {
            _this.toggle($submenu);
          });
        } else {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function(e) {
              e.preventDefault();
              _this.toggle($submenu);
            });
        }
      }
    }).on('keydown.zf.accordionmenu', function(e){
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $elements = $element.parent('ul').children('li'),
          $prevElement,
          $nextElement,
          $target = $element.children('[data-submenu]');

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1)).find('a').first();
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1)).find('a').first();

          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('[data-submenu]:visible').length) { // has open sub menu
            $nextElement = $element.find('li:first-child').find('a').first();
          }
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':first-child')) { // is first element of sub menu
            $prevElement = $element.parents('li').first().find('a').first();
          } else if ($prevElement.parents('li').first().children('[data-submenu]:visible').length) { // if previous element has open sub menu
            $prevElement = $prevElement.parents('li').find('li:last-child').find('a').first();
          }
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is(':last-child')) { // is last element of sub menu
            $nextElement = $element.parents('li').first().next('li').find('a').first();
          }

          return;
        }
      });

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'AccordionMenu', {
        open: function() {
          if ($target.is(':hidden')) {
            _this.down($target);
            $target.find('li').first().find('a').first().focus();
          }
        },
        close: function() {
          if ($target.length && !$target.is(':hidden')) { // close active sub of this item
            _this.up($target);
          } else if ($element.parent('[data-submenu]').length) { // close currently open sub
            _this.up($element.parent('[data-submenu]'));
            $element.parents('li').first().find('a').first().focus();
          }
        },
        up: function() {
          $prevElement.focus();
          return true;
        },
        down: function() {
          $nextElement.focus();
          return true;
        },
        toggle: function() {
          if (_this.options.submenuToggle) {
            return false;
          }
          if ($element.children('[data-submenu]').length) {
            _this.toggle($element.children('[data-submenu]'));
            return true;
          }
        },
        closeAll: function() {
          _this.hideAll();
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
        }
      });
    });//.attr('tabindex', 0);
  }

  /**
   * Closes all panes of the menu.
   * @function
   */
  hideAll() {
    this.up(this.$element.find('[data-submenu]'));
  }

  /**
   * Opens all panes of the menu.
   * @function
   */
  showAll() {
    this.down(this.$element.find('[data-submenu]'));
  }

  /**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */
  toggle($target){
    if(!$target.is(':animated')) {
      if (!$target.is(':hidden')) {
        this.up($target);
      }
      else {
        this.down($target);
      }
    }
  }

  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  down($target) {
    var _this = this;

    if(!this.options.multiOpen) {
      this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
    }

    $target.addClass('is-active').attr({'aria-hidden': false});

    if(this.options.submenuToggle) {
      $target.prev('.submenu-toggle').attr({'aria-expanded': true});
    }
    else {
      $target.parent('.is-accordion-submenu-parent').attr({'aria-expanded': true});
    }

    $target.slideDown(_this.options.slideSpeed, function () {
      /**
       * Fires when the menu is done opening.
       * @event AccordionMenu#down
       */
      _this.$element.trigger('down.zf.accordionMenu', [$target]);
    });
  }

  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  up($target) {
    var _this = this;
    $target.slideUp(_this.options.slideSpeed, function () {
      /**
       * Fires when the menu is done collapsing up.
       * @event AccordionMenu#up
       */
      _this.$element.trigger('up.zf.accordionMenu', [$target]);
    });

    var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);

    if(this.options.submenuToggle) {
      $menus.prev('.submenu-toggle').attr('aria-expanded', false);
    }
    else {
      $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
    }
  }

  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  _destroy() {
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');
    this.$element.find('[data-is-parent-link]').detach();

    if(this.options.submenuToggle) {
      this.$element.find('.has-submenu-toggle').removeClass('has-submenu-toggle');
      this.$element.find('.submenu-toggle').remove();
    }

    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'accordion');
  }
}

AccordionMenu.defaults = {
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Amount of time to animate the opening of a submenu in ms.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Adds a separate submenu toggle button. This allows the parent item to have a link.
   * @option
   * @example true
   */
  submenuToggle: false,
  /**
   * The text used for the submenu toggle if enabled. This is used for screen readers only.
   * @option
   * @example true
   */
  submenuToggleText: 'Toggle menu',
  /**
   * Allow the menu to have multiple open panes.
   * @option
   * @type {boolean}
   * @default true
   */
  multiOpen: true
};




/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Drilldown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__ = __webpack_require__(2);









/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */

class Drilldown extends __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of a drilldown menu.
   * @class
   * @name Drilldown
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Drilldown.defaults, this.$element.data(), options);
    this.className = 'Drilldown'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Drilldown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close',
      'TAB': 'down',
      'SHIFT_TAB': 'up'
    });
  }

  /**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'drilldown');

    if(this.options.autoApplyClass) {
      this.$element.addClass('drilldown');
    }

    this.$element.attr({
      'role': 'tree',
      'aria-multiselectable': false
    });
    this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
    this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]').attr('role', 'group');
    this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'treeitem').find('a');
    this.$element.attr('data-mutate', (this.$element.attr('data-drilldown') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'drilldown')));

    this._prepareMenu();
    this._registerEvents();

    this._keyboardEvents();
  }

  /**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */
  _prepareMenu() {
    var _this = this;
    // if(!this.options.holdOpen){
    //   this._menuLinkEvents();
    // }
    this.$submenuAnchors.each(function(){
      var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      var $sub = $link.parent();
      if(_this.options.parentLink){
        $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li data-is-parent-link class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menuitem"></li>');
      }
      $link.data('savedHref', $link.attr('href')).removeAttr('href').attr('tabindex', 0);
      $link.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'group'
          });
      _this._events($link);
    });
    this.$submenus.each(function(){
      var $menu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $back = $menu.find('.js-drilldown-back');
      if(!$back.length){
        switch (_this.options.backButtonPosition) {
          case "bottom":
            $menu.append(_this.options.backButton);
            break;
          case "top":
            $menu.prepend(_this.options.backButton);
            break;
          default:
            console.error("Unsupported backButtonPosition value '" + _this.options.backButtonPosition + "'");
        }
      }
      _this._back($menu);
    });

    this.$submenus.addClass('invisible');
    if(!this.options.autoHeight) {
      this.$submenus.addClass('drilldown-submenu-cover-previous');
    }

    // create a wrapper on element if it doesn't exist.
    if(!this.$element.parent().hasClass('is-drilldown')){
      this.$wrapper = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.wrapper).addClass('is-drilldown');
      if(this.options.animateHeight) this.$wrapper.addClass('animate-height');
      this.$element.wrap(this.$wrapper);
    }
    // set wrapper
    this.$wrapper = this.$element.parent();
    this.$wrapper.css(this._getMaxDims());
  }

  _resize() {
    this.$wrapper.css({'max-width': 'none', 'min-height': 'none'});
    // _getMaxDims has side effects (boo) but calling it should update all other necessary heights & widths
    this.$wrapper.css(this._getMaxDims());
  }

  /**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */
  _events($elem) {
    var _this = this;

    $elem.off('click.zf.drilldown')
    .on('click.zf.drilldown', function(e){
      if(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')){
        e.stopImmediatePropagation();
        e.preventDefault();
      }

      // if(e.target !== e.currentTarget.firstElementChild){
      //   return false;
      // }
      _this._show($elem.parent('li'));

      if(_this.options.closeOnClick){
        var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
        $body.off('.zf.drilldown').on('click.zf.drilldown', function(e){
          if (e.target === _this.$element[0] || __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target)) { return; }
          e.preventDefault();
          _this._hideAll();
          $body.off('.zf.drilldown');
        });
      }
    });
  }

  /**
   * Adds event handlers to the menu element.
   * @function
   * @private
   */
  _registerEvents() {
    if(this.options.scrollTop){
      this._bindHandler = this._scrollTop.bind(this);
      this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown',this._bindHandler);
    }
    this.$element.on('mutateme.zf.trigger', this._resize.bind(this));
  }

  /**
   * Scroll to Top of Element or data-scroll-top-element
   * @function
   * @fires Drilldown#scrollme
   */
  _scrollTop() {
    var _this = this;
    var $scrollTopElement = _this.options.scrollTopElement!=''?__WEBPACK_IMPORTED_MODULE_0_jquery___default()(_this.options.scrollTopElement):_this.$element,
        scrollPos = parseInt($scrollTopElement.offset().top+_this.options.scrollTopOffset, 10);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing,function(){
      /**
        * Fires after the menu has scrolled
        * @event Drilldown#scrollme
        */
      if(this===__WEBPACK_IMPORTED_MODULE_0_jquery___default()('html')[0])_this.$element.trigger('scrollme.zf.drilldown');
    });
  }

  /**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */
  _keyboardEvents() {
    var _this = this;

    this.$menuItems.add(this.$element.find('.js-drilldown-back > a, .is-submenu-parent-item > a')).on('keydown.zf.drilldown', function(e){
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $elements = $element.parent('li').parent('ul').children('li').children('a'),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1));
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          return;
        }
      });

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Drilldown', {
        next: function() {
          if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
            return true;
          }
        },
        previous: function() {
          _this._hide($element.parent('li').parent('ul'));
          $element.parent('li').parent('ul').one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
            setTimeout(function() {
              $element.parent('li').parent('ul').parent('li').children('a').first().focus();
            }, 1);
          });
          return true;
        },
        up: function() {
          $prevElement.focus();
          // Don't tap focus on first element in root ul
          return !$element.is(_this.$element.find('> li:first-child > a'));
        },
        down: function() {
          $nextElement.focus();
          // Don't tap focus on last element in root ul
          return !$element.is(_this.$element.find('> li:last-child > a'));
        },
        close: function() {
          // Don't close on element in root ul
          if (!$element.is(_this.$element.find('> li > a'))) {
            _this._hide($element.parent().parent());
            $element.parent().parent().siblings('a').focus();
          }
        },
        open: function() {
          if (!$element.is(_this.$menuItems)) { // not menu item means back button
            _this._hide($element.parent('li').parent('ul'));
            $element.parent('li').parent('ul').one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              setTimeout(function() {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
            return true;
          } else if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
            return true;
          }
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
        }
      });
    }); // end keyboardAccess
  }

  /**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#closed
   */
  _hideAll() {
    var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
    if(this.options.autoHeight) this.$wrapper.css({height:$elem.parent().closest('ul').data('calcHeight')});
    $elem.one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($elem), function(e){
      $elem.removeClass('is-active is-closing');
    });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
    this.$element.trigger('closed.zf.drilldown');
  }

  /**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */
  _back($elem) {
    var _this = this;
    $elem.off('click.zf.drilldown');
    $elem.children('.js-drilldown-back')
      .on('click.zf.drilldown', function(e){
        e.stopImmediatePropagation();
        // console.log('mouseup on back');
        _this._hide($elem);

        // If there is a parent submenu, call show
        let parentSubMenu = $elem.parent('li').parent('ul').parent('li');
        if (parentSubMenu.length) {
          _this._show(parentSubMenu);
        }
      });
  }

  /**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */
  _menuLinkEvents() {
    var _this = this;
    this.$menuItems.not('.is-drilldown-submenu-parent')
        .off('click.zf.drilldown')
        .on('click.zf.drilldown', function(e){
          // e.stopImmediatePropagation();
          setTimeout(function(){
            _this._hideAll();
          }, 0);
      });
  }

  /**
   * Sets the CSS classes for submenu to show it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */
  _setShowSubMenuClasses($elem, trigger) {
    $elem.addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
    $elem.parent('li').attr('aria-expanded', true);
    if (trigger === true) {
      this.$element.trigger('open.zf.drilldown', [$elem]);
    }
  }

  /**
   * Sets the CSS classes for submenu to hide it.
   * @function
   * @private
   * @param {jQuery} $elem - the target submenu (`ul` tag)
   * @param {boolean} trigger - trigger drilldown event
   */
  _setHideSubMenuClasses($elem, trigger) {
    $elem.removeClass('is-active').addClass('invisible').attr('aria-hidden', true);
    $elem.parent('li').attr('aria-expanded', false);
    if (trigger === true) {
      $elem.trigger('hide.zf.drilldown', [$elem]);
    }
  }

  /**
   * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
   * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
   * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
   */
  _showMenu($elem, autoFocus) {

    var _this = this;

    // Reset drilldown
    var $expandedSubmenus = this.$element.find('li[aria-expanded="true"] > ul[data-submenu]');
    $expandedSubmenus.each(function(index) {
      _this._setHideSubMenuClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
    });

    // If target menu is root, focus first link & exit
    if ($elem.is('[data-drilldown]')) {
      if (autoFocus === true) $elem.find('li[role="treeitem"] > a').first().focus();
      if (this.options.autoHeight) this.$wrapper.css('height', $elem.data('calcHeight'));
      return;
    }

    // Find all submenus on way to root incl. the element itself
    var $submenus = $elem.children().first().parentsUntil('[data-drilldown]', '[data-submenu]');

    // Open target menu and all submenus on its way to root
    $submenus.each(function(index) {

      // Update height of first child (target menu) if autoHeight option true
      if (index === 0 && _this.options.autoHeight) {
        _this.$wrapper.css('height', __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('calcHeight'));
      }

      var isLastChild = index == $submenus.length - 1;

      // Add transitionsend listener to last child (root due to reverse order) to open target menu's first link
      // Last child makes sure the event gets always triggered even if going through several menus
      if (isLastChild === true) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)), () => {
          if (autoFocus === true) {
            $elem.find('li[role="treeitem"] > a').first().focus();
          }
        });
      }

      _this._setShowSubMenuClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), isLastChild);
    });
  }

  /**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
   */
  _show($elem) {
    if(this.options.autoHeight) this.$wrapper.css({height:$elem.children('[data-submenu]').data('calcHeight')});
    $elem.attr('aria-expanded', true);
    $elem.children('[data-submenu]').addClass('is-active').removeClass('invisible').attr('aria-hidden', false);
    /**
     * Fires when the submenu has opened.
     * @event Drilldown#open
     */
    this.$element.trigger('open.zf.drilldown', [$elem]);
  }

  /**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
   */
  _hide($elem) {
    if(this.options.autoHeight) this.$wrapper.css({height:$elem.parent().closest('ul').data('calcHeight')});
    var _this = this;
    $elem.parent('li').attr('aria-expanded', false);
    $elem.attr('aria-hidden', true);
    $elem.addClass('is-closing')
         .one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])($elem), function(){
           $elem.removeClass('is-active is-closing');
           $elem.blur().addClass('invisible');
         });
    /**
     * Fires when the submenu has closed.
     * @event Drilldown#hide
     */
    $elem.trigger('hide.zf.drilldown', [$elem]);
  }

  /**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */
  _getMaxDims() {
    var  maxHeight = 0, result = {}, _this = this;
    this.$submenus.add(this.$element).each(function(){
      var numOfElems = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).children('li').length;
      var height = __WEBPACK_IMPORTED_MODULE_4__foundation_util_box__["a" /* Box */].GetDimensions(this).height;
      maxHeight = height > maxHeight ? height : maxHeight;
      if(_this.options.autoHeight) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('calcHeight',height);
        if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass('is-drilldown-submenu')) result['height'] = height;
      }
    });

    if(!this.options.autoHeight) result['min-height'] = `${maxHeight}px`;

    result['max-width'] = `${this.$element[0].getBoundingClientRect().width}px`;

    return result;
  }

  /**
   * Destroys the Drilldown Menu
   * @function
   */
  _destroy() {
    if(this.options.scrollTop) this.$element.off('.zf.drilldown',this._bindHandler);
    this._hideAll();
	  this.$element.off('mutateme.zf.trigger');
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'drilldown');
    this.$element.unwrap()
                 .find('.js-drilldown-back, .is-submenu-parent-item').remove()
                 .end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu')
                 .end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
    this.$submenuAnchors.each(function() {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).off('.zf.drilldown');
    });

    this.$element.find('[data-is-parent-link]').detach();
    this.$submenus.removeClass('drilldown-submenu-cover-previous invisible');

    this.$element.find('a').each(function(){
      var $link = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this);
      $link.removeAttr('tabindex');
      if($link.data('savedHref')){
        $link.attr('href', $link.data('savedHref')).removeData('savedHref');
      }else{ return; }
    });
  };
}

Drilldown.defaults = {
  /**
   * Drilldowns depend on styles in order to function properly; in the default build of Foundation these are
   * on the `drilldown` class. This option auto-applies this class to the drilldown upon initialization.
   * @option
   * @type {boolian}
   * @default true
   */
  autoApplyClass: true,
  /**
   * Markup used for JS generated back button. Prepended  or appended (see backButtonPosition) to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
  /**
   * Position the back button either at the top or bottom of drilldown submenus. Can be `'left'` or `'bottom'`.
   * @option
   * @type {string}
   * @default top
   */
  backButtonPosition: 'top',
  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @type {string}
   * @default '<div></div>'
   */
  wrapper: '<div></div>',
  /**
   * Adds the parent link to the submenu.
   * @option
   * @type {boolean}
   * @default false
   */
  parentLink: false,
  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false,
  /**
   * Allow the menu to auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  autoHeight: false,
  /**
   * Animate the auto adjust height.
   * @option
   * @type {boolean}
   * @default false
   */
  animateHeight: false,
  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @type {boolean}
   * @default false
   */
  scrollTop: false,
  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @type {string}
   * @default ''
   */
  scrollTopElement: '',
  /**
   * ScrollTop offset
   * @option
   * @type {number}
   * @default 0
   */
  scrollTopOffset: 0,
  /**
   * Scroll animation duration
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Scroll animation easing. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @see {@link https://api.jquery.com/animate|JQuery animate}
   * @default 'swing'
   */
  animationEasing: 'swing'
  // holdOpen: false
};




/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__ = __webpack_require__(2);










/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */

class DropdownMenu extends __WEBPACK_IMPORTED_MODULE_5__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of DropdownMenu.
   * @class
   * @name DropdownMenu
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, DropdownMenu.defaults, this.$element.data(), options);
    this.className = 'DropdownMenu'; // ie9 back compat

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('DropdownMenu', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close'
    });
  }

  /**
   * Initializes the plugin, and calls _prepareMenu
   * @private
   * @function
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Feather(this.$element, 'dropdown');

    var subs = this.$element.find('li.is-dropdown-submenu-parent');
    this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

    this.$menuItems = this.$element.find('[role="menuitem"]');
    this.$tabs = this.$element.children('[role="menuitem"]');
    this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

    if (this.options.alignment === 'auto') {
        if (this.$element.hasClass(this.options.rightClass) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__foundation_util_core__["a" /* rtl */])() || this.$element.parents('.top-bar-right').is('*')) {
            this.options.alignment = 'right';
            subs.addClass('opens-left');
        } else {
            this.options.alignment = 'left';
            subs.addClass('opens-right');
        }
    } else {
      if (this.options.alignment === 'right') {
          subs.addClass('opens-left');
      } else {
          subs.addClass('opens-right');
      }
    }
    this.changed = false;
    this._events();
  };

  _isVertical() {
    return this.$tabs.css('display') === 'block' || this.$element.css('flex-direction') === 'column';
  }

  _isRtl() {
    return this.$element.hasClass('align-right') || (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__foundation_util_core__["a" /* rtl */])() && !this.$element.hasClass('align-left'));
  }

  /**
   * Adds event listeners to elements within the menu
   * @private
   * @function
   */
  _events() {
    var _this = this,
        hasTouch = 'ontouchstart' in window || (typeof window.ontouchstart !== 'undefined'),
        parClass = 'is-dropdown-submenu-parent';

    // used for onClick and in the keyboard handlers
    var handleClickFn = function(e) {
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', `.${parClass}`),
          hasSub = $elem.hasClass(parClass),
          hasClicked = $elem.attr('data-is-click') === 'true',
          $sub = $elem.children('.is-dropdown-submenu');

      if (hasSub) {
        if (hasClicked) {
          if (!_this.options.closeOnClick || (!_this.options.clickOpen && !hasTouch) || (_this.options.forceFollow && hasTouch)) { return; }
          else {
            e.stopImmediatePropagation();
            e.preventDefault();
            _this._hide($elem);
          }
        } else {
          e.preventDefault();
          e.stopImmediatePropagation();
          _this._show($sub);
          $elem.add($elem.parentsUntil(_this.$element, `.${parClass}`)).attr('data-is-click', true);
        }
      }
    };

    if (this.options.clickOpen || hasTouch) {
      this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', handleClickFn);
    }

    // Handle Leaf element Clicks
    if(_this.options.closeOnClickInside){
      this.$menuItems.on('click.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);
        if(!hasSub){
          _this._hide();
        }
      });
    }

    if (!this.options.disableHover) {
      this.$menuItems.on('mouseenter.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);

        if (hasSub) {
          clearTimeout($elem.data('_delay'));
          $elem.data('_delay', setTimeout(function() {
            _this._show($elem.children('.is-dropdown-submenu'));
          }, _this.options.hoverDelay));
        }
      }).on('mouseleave.zf.dropdownmenu', function(e) {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            hasSub = $elem.hasClass(parClass);
        if (hasSub && _this.options.autoclose) {
          if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) { return false; }

          clearTimeout($elem.data('_delay'));
          $elem.data('_delay', setTimeout(function() {
            _this._hide($elem);
          }, _this.options.closingTime));
        }
      });
    }
    this.$menuItems.on('keydown.zf.dropdownmenu', function(e) {
      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).parentsUntil('ul', '[role="menuitem"]'),
          isTab = _this.$tabs.index($element) > -1,
          $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          $prevElement = $elements.eq(i-1);
          $nextElement = $elements.eq(i+1);
          return;
        }
      });

      var nextSibling = function() {
        $nextElement.children('a:first').focus();
        e.preventDefault();
      }, prevSibling = function() {
        $prevElement.children('a:first').focus();
        e.preventDefault();
      }, openSub = function() {
        var $sub = $element.children('ul.is-dropdown-submenu');
        if ($sub.length) {
          _this._show($sub);
          $element.find('li > a:first').focus();
          e.preventDefault();
        } else { return; }
      }, closeSub = function() {
        //if ($element.is(':first-child')) {
        var close = $element.parent('ul').parent('li');
        close.children('a:first').focus();
        _this._hide(close);
        e.preventDefault();
        //}
      };
      var functions = {
        open: openSub,
        close: function() {
          _this._hide(_this.$element);
          _this.$menuItems.eq(0).children('a').focus(); // focus to first element
          e.preventDefault();
        },
        handled: function() {
          e.stopImmediatePropagation();
        }
      };

      if (isTab) {
        if (_this._isVertical()) { // vertical menu
          if (_this._isRtl()) { // right aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: closeSub,
              previous: openSub
            });
          } else { // left aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: openSub,
              previous: closeSub
            });
          }
        } else { // horizontal menu
          if (_this._isRtl()) { // right aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: prevSibling,
              previous: nextSibling,
              down: openSub,
              up: closeSub
            });
          } else { // left aligned
            __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
              next: nextSibling,
              previous: prevSibling,
              down: openSub,
              up: closeSub
            });
          }
        }
      } else { // not tabs -> one sub
        if (_this._isRtl()) { // right aligned
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
            next: closeSub,
            previous: openSub,
            down: nextSibling,
            up: prevSibling
          });
        } else { // left aligned
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(functions, {
            next: openSub,
            previous: closeSub,
            down: nextSibling,
            up: prevSibling
          });
        }
      }
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'DropdownMenu', functions);

    });
  }

  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  _addBodyHandler() {
    var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body),
        _this = this;
    $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu')
         .on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function(e) {
           var $link = _this.$element.find(e.target);
           if ($link.length) { return; }

           _this._hide();
           $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
         });
  }

  /**
   * Opens a dropdown pane, and checks for collisions first.
   * @param {jQuery} $sub - ul element that is a submenu to show
   * @function
   * @private
   * @fires DropdownMenu#show
   */
  _show($sub) {
    var idx = this.$tabs.index(this.$tabs.filter(function(i, el) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).find($sub).length > 0;
    }));
    var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
    this._hide($sibs, idx);
    $sub.css('visibility', 'hidden').addClass('js-dropdown-active')
        .parent('li.is-dropdown-submenu-parent').addClass('is-active');
    var clear = __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__["a" /* Box */].ImNotTouchingYou($sub, null, true);
    if (!clear) {
      var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
          $parentLi = $sub.parent('.is-dropdown-submenu-parent');
      $parentLi.removeClass(`opens${oldClass}`).addClass(`opens-${this.options.alignment}`);
      clear = __WEBPACK_IMPORTED_MODULE_3__foundation_util_box__["a" /* Box */].ImNotTouchingYou($sub, null, true);
      if (!clear) {
        $parentLi.removeClass(`opens-${this.options.alignment}`).addClass('opens-inner');
      }
      this.changed = true;
    }
    $sub.css('visibility', '');
    if (this.options.closeOnClick) { this._addBodyHandler(); }
    /**
     * Fires when the new dropdown pane is visible.
     * @event DropdownMenu#show
     */
    this.$element.trigger('show.zf.dropdownmenu', [$sub]);
  }

  /**
   * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
   * @function
   * @param {jQuery} $elem - element with a submenu to hide
   * @param {Number} idx - index of the $tabs collection to hide
   * @private
   */
  _hide($elem, idx) {
    var $toClose;
    if ($elem && $elem.length) {
      $toClose = $elem;
    } else if (idx !== undefined) {
      $toClose = this.$tabs.not(function(i, el) {
        return i === idx;
      });
    }
    else {
      $toClose = this.$element;
    }
    var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

    if (somethingToClose) {
      $toClose.find('li.is-active').add($toClose).attr({
        'data-is-click': false
      }).removeClass('is-active');

      $toClose.find('ul.js-dropdown-active').removeClass('js-dropdown-active');

      if (this.changed || $toClose.find('opens-inner').length) {
        var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
        $toClose.find('li.is-dropdown-submenu-parent').add($toClose)
                .removeClass(`opens-inner opens-${this.options.alignment}`)
                .addClass(`opens-${oldClass}`);
        this.changed = false;
      }
      /**
       * Fires when the open menus are closed.
       * @event DropdownMenu#hide
       */
      this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
    }
  }

  /**
   * Destroys the plugin.
   * @function
   */
  _destroy() {
    this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click')
        .removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('.zf.dropdownmenu');
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_nest__["a" /* Nest */].Burn(this.$element, 'dropdown');
  }
}

/**
 * Default settings for plugin
 */
DropdownMenu.defaults = {
  /**
   * Disallows hover events from opening submenus
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Allow a submenu to automatically close on a mouseleave event, if not clicked open.
   * @option
   * @type {boolean}
   * @default true
   */
  autoclose: true,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 50
   */
  hoverDelay: 50,
  /**
   * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
   * @option
   * @type {boolean}
   * @default false
   */
  clickOpen: false,
  /**
   * Amount of time to delay closing a submenu on a mouseleave event.
   * @option
   * @type {number}
   * @default 500
   */

  closingTime: 500,
  /**
   * Position of the menu relative to what direction the submenus should open. Handled by JS. Can be `'auto'`, `'left'` or `'right'`.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow clicks on the body to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allow clicks on leaf anchor links to close any open submenus.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClickInside: true,
  /**
   * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'vertical'
   */
  verticalClass: 'vertical',
  /**
   * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
   * @option
   * @type {string}
   * @default 'align-right'
   */
  rightClass: 'align-right',
  /**
   * Boolean to force overide the clicking of links to perform default action, on second touch event for mobile.
   * @option
   * @type {boolean}
   * @default true
   */
  forceFollow: true
};




/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Positionable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);






const POSITIONS = ['left', 'right', 'top', 'bottom'];
const VERTICAL_ALIGNMENTS = ['top', 'bottom', 'center'];
const HORIZONTAL_ALIGNMENTS = ['left', 'right', 'center'];

const ALIGNMENTS = {
  'left': VERTICAL_ALIGNMENTS,
  'right': VERTICAL_ALIGNMENTS,
  'top': HORIZONTAL_ALIGNMENTS,
  'bottom': HORIZONTAL_ALIGNMENTS
}

function nextItem(item, array) {
  var currentIdx = array.indexOf(item);
  if(currentIdx === array.length - 1) {
    return array[0];
  } else {
    return array[currentIdx + 1];
  }
}


class Positionable extends __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__["a" /* Plugin */] {
  /**
   * Abstract class encapsulating the tether-like explicit positioning logic
   * including repositioning based on overlap.
   * Expects classes to define defaults for vOffset, hOffset, position,
   * alignment, allowOverlap, and allowBottomOverlap. They can do this by
   * extending the defaults, or (for now recommended due to the way docs are
   * generated) by explicitly declaring them.
   *
   **/

  _init() {
    this.triedPositions = {};
    this.position  = this.options.position === 'auto' ? this._getDefaultPosition() : this.options.position;
    this.alignment = this.options.alignment === 'auto' ? this._getDefaultAlignment() : this.options.alignment;
    this.originalPosition = this.position;
    this.originalAlignment = this.alignment;
  }

  _getDefaultPosition () {
    return 'bottom';
  }

  _getDefaultAlignment() {
    switch(this.position) {
      case 'bottom':
      case 'top':
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["a" /* rtl */])() ? 'right' : 'left';
      case 'left':
      case 'right':
        return 'bottom';
    }
  }

  /**
   * Adjusts the positionable possible positions by iterating through alignments
   * and positions.
   * @function
   * @private
   */
  _reposition() {
    if(this._alignmentsExhausted(this.position)) {
      this.position = nextItem(this.position, POSITIONS);
      this.alignment = ALIGNMENTS[this.position][0];
    } else {
      this._realign();
    }
  }

  /**
   * Adjusts the dropdown pane possible positions by iterating through alignments
   * on the current position.
   * @function
   * @private
   */
  _realign() {
    this._addTriedPosition(this.position, this.alignment)
    this.alignment = nextItem(this.alignment, ALIGNMENTS[this.position])
  }

  _addTriedPosition(position, alignment) {
    this.triedPositions[position] = this.triedPositions[position] || []
    this.triedPositions[position].push(alignment);
  }

  _positionsExhausted() {
    var isExhausted = true;
    for(var i = 0; i < POSITIONS.length; i++) {
      isExhausted = isExhausted && this._alignmentsExhausted(POSITIONS[i]);
    }
    return isExhausted;
  }

  _alignmentsExhausted(position) {
    return this.triedPositions[position] && this.triedPositions[position].length == ALIGNMENTS[position].length;
  }


  // When we're trying to center, we don't want to apply offset that's going to
  // take us just off center, so wrap around to return 0 for the appropriate
  // offset in those alignments.  TODO: Figure out if we want to make this
  // configurable behavior... it feels more intuitive, especially for tooltips, but
  // it's possible someone might actually want to start from center and then nudge
  // slightly off.
  _getVOffset() {
    return this.options.vOffset;
  }

  _getHOffset() {
    return this.options.hOffset;
  }


  _setPosition($anchor, $element, $parent) {
    if($anchor.attr('aria-expanded') === 'false'){ return false; }
    var $eleDims = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetDimensions($element),
        $anchorDims = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetDimensions($anchor);


    if (!this.options.allowOverlap) {
      // restore original position & alignment before checking overlap
      this.position = this.originalPosition;
      this.alignment = this.originalAlignment;
    }

    $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));

    if(!this.options.allowOverlap) {
      var overlaps = {};
      var minOverlap = 100000000;
      // default coordinates to how we start, in case we can't figure out better
      var minCoordinates = {position: this.position, alignment: this.alignment};
      while(!this._positionsExhausted()) {
        let overlap = __WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].OverlapArea($element, $parent, false, false, this.options.allowBottomOverlap);
        if(overlap === 0) {
          return;
        }

        if(overlap < minOverlap) {
          minOverlap = overlap;
          minCoordinates = {position: this.position, alignment: this.alignment};
        }

        this._reposition();

        $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
      }
      // If we get through the entire loop, there was no non-overlapping
      // position available. Pick the version with least overlap.
      this.position = minCoordinates.position;
      this.alignment = minCoordinates.alignment;
      $element.offset(__WEBPACK_IMPORTED_MODULE_0__foundation_util_box__["a" /* Box */].GetExplicitOffsets($element, $anchor, this.position, this.alignment, this._getVOffset(), this._getHOffset()));
    }
  }

}

Positionable.defaults = {
  /**
   * Position of positionable relative to anchor. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of positionable relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown positionable first
   * try to position as defined by data-position and data-alignment, but
   * reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Number of pixels the positionable should be separated vertically from anchor
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels the positionable should be separated horizontally from anchor
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
}




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmoothScroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);






/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */
class SmoothScroll extends __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of SmoothScroll.
   * @class
   * @name SmoothScroll
   * @fires SmoothScroll#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
    _setup(element, options) {
        this.$element = element;
        this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, SmoothScroll.defaults, this.$element.data(), options);
        this.className = 'SmoothScroll'; // ie9 back compat

        this._init();
    }

    /**
     * Initialize the SmoothScroll plugin
     * @private
     */
    _init() {
        var id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, 'smooth-scroll');
        var _this = this;
        this.$element.attr({
            'id': id
        });

        this._events();
    }

    /**
     * Initializes events for SmoothScroll.
     * @private
     */
    _events() {
        var _this = this;

        // click handler function.
        var handleLinkClick = function(e) {
            // exit function if the event source isn't coming from an anchor with href attribute starts with '#'
            if(!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is('a[href^="#"]'))  {
                return false;
            }

            var arrival = this.getAttribute('href');

            _this._inTransition = true;

            SmoothScroll.scrollToLoc(arrival, _this.options, function() {
                _this._inTransition = false;
            });

            e.preventDefault();
        };

        this.$element.on('click.zf.smoothScroll', handleLinkClick)
        this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', handleLinkClick);
    }

    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - The options to use.
     * @param {Function} callback - The callback function.
     * @static
     * @function
     */
    static scrollToLoc(loc, options = SmoothScroll.defaults, callback) {
        // Do nothing if target does not exist to prevent errors
        if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(loc).length) {
            return false;
        }

        var scrollPos = Math.round(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(loc).offset().top - options.threshold / 2 - options.offset);

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').stop(true).animate(
            { scrollTop: scrollPos },
            options.animationDuration,
            options.animationEasing,
            function() {
                if(callback && typeof callback == "function"){
                    callback();
                }
            }
        );
    }
}

/**
 * Default settings for plugin.
 */
SmoothScroll.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);






/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */

class Tabs extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of tabs.
   * @class
   * @name Tabs
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tabs.defaults, this.$element.data(), options);
    this.className = 'Tabs'; // ie9 back compat

    this._init();
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Tabs', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'previous',
      'ARROW_DOWN': 'next',
      'ARROW_LEFT': 'previous'
      // 'TAB': 'next',
      // 'SHIFT_TAB': 'previous'
    });
  }

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  _init() {
    var _this = this;

    this.$element.attr({'role': 'tablist'});
    this.$tabTitles = this.$element.find(`.${this.options.linkClass}`);
    this.$tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-tabs-content="${this.$element[0].id}"]`);

    this.$tabTitles.each(function(){
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          $link = $elem.find('a'),
          isActive = $elem.hasClass(`${_this.options.linkActiveClass}`),
          hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
          linkId = $link[0].id ? $link[0].id : `${hash}-label`,
          $tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${hash}`);

      $elem.attr({'role': 'presentation'});

      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
        'aria-selected': isActive,
        'id': linkId,
        'tabindex': isActive ? '0' : '-1'
      });

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-labelledby': linkId
      });

      if(!isActive) {
        $tabContent.attr('aria-hidden', 'true');
      }

      if(isActive && _this.options.autoFocus){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).load(function() {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: $elem.offset().top }, _this.options.deepLinkSmudgeDelay, () => {
            $link.focus();
          });
        });
      }
    });
    if(this.options.matchHeight) {
      var $images = this.$tabContent.find('img');

      if ($images.length) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__["a" /* onImagesLoaded */])($images, this._setHeight.bind(this));
      } else {
        this._setHeight();
      }
    }

     //current context-bound function to open tabs on page load or history popstate
    this._checkDeepLink = () => {
      var anchor = window.location.hash;
      //need a hash and a relevant anchor in this tabset
      if(anchor.length) {
        var $link = this.$element.find('[href$="'+anchor+'"]');
        if ($link.length) {
          this.selectTab(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor), true);

          //roll up a little to show the titles
          if (this.options.deepLinkSmudge) {
            var offset = this.$element.offset();
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: offset.top }, this.options.deepLinkSmudgeDelay);
          }

          /**
            * Fires when the zplugin has deeplinked at pageload
            * @event Tabs#deeplink
            */
           this.$element.trigger('deeplink.zf.tabs', [$link, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor)]);
         }
       }
     }

    //use browser to open a tab, if it exists in this tabset
    if (this.options.deepLink) {
      this._checkDeepLink();
    }

    this._events();
  }

  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
  _events() {
    this._addKeyHandler();
    this._addClickHandler();
    this._setHeightMqHandler = null;

    if (this.options.matchHeight) {
      this._setHeightMqHandler = this._setHeight.bind(this);

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
    }

    if(this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._checkDeepLink);
    }
  }

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  _addClickHandler() {
    var _this = this;

    this.$element
      .off('click.zf.tabs')
      .on('click.zf.tabs', `.${this.options.linkClass}`, function(e){
        e.preventDefault();
        e.stopPropagation();
        _this._handleTabChange(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
  }

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */
  _addKeyHandler() {
    var _this = this;

    this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function(e){
      if (e.which === 9) return;


      var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
        $elements = $element.parent('ul').children('li'),
        $prevElement,
        $nextElement;

      $elements.each(function(i) {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
          if (_this.options.wrapOnKeys) {
            $prevElement = i === 0 ? $elements.last() : $elements.eq(i-1);
            $nextElement = i === $elements.length -1 ? $elements.first() : $elements.eq(i+1);
          } else {
            $prevElement = $elements.eq(Math.max(0, i-1));
            $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          }
          return;
        }
      });

      // handle keyboard event with keyboard util
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Tabs', {
        open: function() {
          $element.find('[role="tab"]').focus();
          _this._handleTabChange($element);
        },
        previous: function() {
          $prevElement.find('[role="tab"]').focus();
          _this._handleTabChange($prevElement);
        },
        next: function() {
          $nextElement.find('[role="tab"]').focus();
          _this._handleTabChange($nextElement);
        },
        handled: function() {
          e.stopPropagation();
          e.preventDefault();
        }
      });
    });
  }

  /**
   * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
   * @param {jQuery} $target - Tab to open.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @fires Tabs#change
   * @function
   */
  _handleTabChange($target, historyHandled) {

    /**
     * Check for active class on target. Collapse if exists.
     */
    if ($target.hasClass(`${this.options.linkActiveClass}`)) {
        if(this.options.activeCollapse) {
            this._collapseTab($target);

           /**
            * Fires when the zplugin has successfully collapsed tabs.
            * @event Tabs#collapse
            */
            this.$element.trigger('collapse.zf.tabs', [$target]);
        }
        return;
    }

    var $oldTab = this.$element.
          find(`.${this.options.linkClass}.${this.options.linkActiveClass}`),
          $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find(`#${hash}`);

    //close old tab
    this._collapseTab($oldTab);

    //open new tab
    this._openTab($target);

    //either replace or update browser history
    if (this.options.deepLink && !historyHandled) {
      var anchor = $target.find('a').attr('href');

      if (this.options.updateHistory) {
        history.pushState({}, '', anchor);
      } else {
        history.replaceState({}, '', anchor);
      }
    }

    /**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */
    this.$element.trigger('change.zf.tabs', [$target, $targetContent]);

    //fire to children a mutation event
    $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
  }

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to Open.
   * @function
   */
  _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find(`#${hash}`);

      $target.addClass(`${this.options.linkActiveClass}`);

      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });

      $targetContent
        .addClass(`${this.options.panelActiveClass}`).removeAttr('aria-hidden');
  }

  /**
   * Collapses `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to Open.
   * @function
   */
  _collapseTab($target) {
    var $target_anchor = $target
      .removeClass(`${this.options.linkActiveClass}`)
      .find('[role="tab"]')
      .attr({
        'aria-selected': 'false',
        'tabindex': -1
      });

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${$target_anchor.attr('aria-controls')}`)
      .removeClass(`${this.options.panelActiveClass}`)
      .attr({ 'aria-hidden': 'true' })
  }

  /**
   * Public method for selecting a content pane to display.
   * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
   * @param {boolean} historyHandled - browser has already handled a history update
   * @function
   */
  selectTab(elem, historyHandled) {
    var idStr;

    if (typeof elem === 'object') {
      idStr = elem[0].id;
    } else {
      idStr = elem;
    }

    if (idStr.indexOf('#') < 0) {
      idStr = `#${idStr}`;
    }

    var $target = this.$tabTitles.find(`[href$="${idStr}"]`).parent(`.${this.options.linkClass}`);

    this._handleTabChange($target, historyHandled);
  };
  /**
   * Sets the height of each panel to the height of the tallest panel.
   * If enabled in options, gets called on media query change.
   * If loading content via external source, can be called directly or with _reflow.
   * If enabled with `data-match-height="true"`, tabs sets to equal height
   * @function
   * @private
   */
  _setHeight() {
    var max = 0,
        _this = this; // Lock down the `this` value for the root tabs object

    this.$tabContent
      .find(`.${this.options.panelClass}`)
      .css('height', '')
      .each(function() {

        var panel = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            isActive = panel.hasClass(`${_this.options.panelActiveClass}`); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({'visibility': 'hidden', 'display': 'block'});
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      })
      .css('height', `${max}px`);
  }

  /**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */
  _destroy() {
    this.$element
      .find(`.${this.options.linkClass}`)
      .off('.zf.tabs').hide().end()
      .find(`.${this.options.panelClass}`)
      .hide();

    if (this.options.matchHeight) {
      if (this._setHeightMqHandler != null) {
         __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
      }
    }

    if (this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._checkDeepLink);
    }

  }
}

Tabs.defaults = {
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load if set to true.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
  wrapOnKeys: true,

  /**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
  matchHeight: false,

  /**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
  activeCollapse: false,

  /**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
  linkClass: 'tabs-title',

  /**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  linkActiveClass: 'is-active',

  /**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
  panelClass: 'tabs-panel',

  /**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  panelActiveClass: 'is-active'
};




/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);




function Timer(elem, options, cb) {
  var _this = this,
      duration = options.duration,//options is an object for easily adding features later.
      nameSpace = Object.keys(elem.data())[0] || 'timer',
      remain = -1,
      start,
      timer;

  this.isPaused = false;

  this.restart = function() {
    remain = -1;
    clearTimeout(timer);
    this.start();
  }

  this.start = function() {
    this.isPaused = false;
    // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    remain = remain <= 0 ? duration : remain;
    elem.data('paused', false);
    start = Date.now();
    timer = setTimeout(function(){
      if(options.infinite){
        _this.restart();//rerun the timer.
      }
      if (cb && typeof cb === 'function') { cb(); }
    }, remain);
    elem.trigger(`timerstart.zf.${nameSpace}`);
  }

  this.pause = function() {
    this.isPaused = true;
    //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
    clearTimeout(timer);
    elem.data('paused', true);
    var end = Date.now();
    remain = remain - (end - start);
    elem.trigger(`timerpaused.zf.${nameSpace}`);
  }
}




/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(23);

var _common = __webpack_require__(20);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import '../dist/main.bundle.css';
// require('../scss/main.scss');
//require('./assets/css/style.css')
var Spinner = __webpack_require__(44);

var Main = function (_Common) {
    _inherits(Main, _Common);

    function Main() {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, self));

        _this.main();
        return _this;
    }

    _createClass(Main, [{
        key: 'main',
        value: function main(e, base) {
            console.log('main');
            // var td = $('table tr td');
            // td.each(function(elem){
            //     var bodyColor = $(this).css("backgroundColor");
            //     var color = $(this).css("color");
            //     if(color == bodyColor){
            //         $(this).remove();
            //     }
            // });
            // var value = $('table tr td').text();
            // console.log(value);
            //
            //
            // let rows = document.getElementsByTagName("table")[0].rows;
            // var last = rows[rows.length - 1];
            // var cell = last.cells[0];
            // var value = cell.innerHTML;
            // console.log(last);
            //
            //
            // // valid form - ajax post new item form
            // $('#item_form').on('submit', (ev) => {
            //     ev.preventDefault();
            // });
            // $(document).on("formvalid.zf.abide.item_form", function(ev,frm) {
            //     ev.preventDefault();
            //     var $form = $("#item_form");
            //     let data = $form.serialize();
            //     console.log(data);
            //     var _this = this;
            //     console.log("Form id  is valid");
            //     console.log(data);
            //     $.ajax({
            //         type: "POST",
            //         url: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+ '/~oshry/test/' + $form.attr("action"),
            //         data: data,
            //         success: function(data){
            //             $(".message").show();
            //             $(".message").html('Saved Successfully');
            //         },
            //         error: function (xhr, status, error) {
            //             $(".message").show();
            //             $(".message").html('');
            //             $(".message").append(_this.print_r(JSON.parse(xhr.responseText)));
            //         }
            //     });
            // });
        }
    }]);

    return Main;
}(_common2.default);

exports.default = Main;


(function () {
    $(document).foundation();
    new Main();
})();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by oshry on 08/08/2016.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(43);

__webpack_require__(45);

__webpack_require__(24);

__webpack_require__(21);

__webpack_require__(22);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Common() {
        _classCallCheck(this, Common);

        var _this = self;
        this.base = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        this.init(_this, this.base);
    }

    _createClass(Common, [{
        key: 'init',
        value: function init() {}
    }]);

    return Common;
}();

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_foundation_core__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_foundation_util_box__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__js_foundation_util_nest__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__js_foundation_util_timer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__js_foundation_util_touch__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__js_foundation_util_triggers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__js_foundation_abide__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__js_foundation_accordion__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__js_foundation_accordionMenu__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__js_foundation_drilldown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__js_foundation_dropdown__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__js_foundation_dropdownMenu__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__js_foundation_equalizer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__js_foundation_interchange__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__js_foundation_magellan__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__js_foundation_offcanvas__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__js_foundation_orbit__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__js_foundation_responsiveMenu__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__js_foundation_responsiveToggle__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__js_foundation_reveal__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__js_foundation_slider__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__js_foundation_smoothScroll__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__js_foundation_sticky__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__js_foundation_tabs__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__js_foundation_toggler__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__js_foundation_tooltip__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__js_foundation_responsiveAccordionTabs__ = __webpack_require__(33);



__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].addToJquery(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].rtl = __WEBPACK_IMPORTED_MODULE_2__js_foundation_util_core__["a" /* rtl */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].GetYoDigits = __WEBPACK_IMPORTED_MODULE_2__js_foundation_util_core__["b" /* GetYoDigits */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].transitionend = __WEBPACK_IMPORTED_MODULE_2__js_foundation_util_core__["c" /* transitionend */];









__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Box = __WEBPACK_IMPORTED_MODULE_3__js_foundation_util_box__["a" /* Box */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].onImagesLoaded = __WEBPACK_IMPORTED_MODULE_4__js_foundation_util_imageLoader__["a" /* onImagesLoaded */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Keyboard = __WEBPACK_IMPORTED_MODULE_5__js_foundation_util_keyboard__["a" /* Keyboard */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].MediaQuery = __WEBPACK_IMPORTED_MODULE_6__js_foundation_util_mediaQuery__["a" /* MediaQuery */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Motion = __WEBPACK_IMPORTED_MODULE_7__js_foundation_util_motion__["a" /* Motion */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Move = __WEBPACK_IMPORTED_MODULE_7__js_foundation_util_motion__["b" /* Move */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Nest = __WEBPACK_IMPORTED_MODULE_8__js_foundation_util_nest__["a" /* Nest */];
__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].Timer = __WEBPACK_IMPORTED_MODULE_9__js_foundation_util_timer__["a" /* Timer */];

// Touch and Triggers previously were almost purely sede effect driven,
// so n../../js// need to add it to Foundation, just init them.


__WEBPACK_IMPORTED_MODULE_10__js_foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);


__WEBPACK_IMPORTED_MODULE_11__js_foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a, __WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */]);


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_12__js_foundation_abide__["a" /* Abide */], 'Abide');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_13__js_foundation_accordion__["a" /* Accordion */], 'Accordion');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_14__js_foundation_accordionMenu__["a" /* AccordionMenu */], 'AccordionMenu');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_15__js_foundation_drilldown__["a" /* Drilldown */], 'Drilldown');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_16__js_foundation_dropdown__["a" /* Dropdown */], 'Dropdown');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_17__js_foundation_dropdownMenu__["a" /* DropdownMenu */], 'DropdownMenu');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_18__js_foundation_equalizer__["a" /* Equalizer */], 'Equalizer');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_19__js_foundation_interchange__["a" /* Interchange */], 'Interchange');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_20__js_foundation_magellan__["a" /* Magellan */], 'Magellan');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_21__js_foundation_offcanvas__["a" /* OffCanvas */], 'OffCanvas');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_22__js_foundation_orbit__["a" /* Orbit */], 'Orbit');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_23__js_foundation_responsiveMenu__["a" /* ResponsiveMenu */], 'ResponsiveMenu');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_24__js_foundation_responsiveToggle__["a" /* ResponsiveToggle */], 'ResponsiveToggle');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_25__js_foundation_reveal__["a" /* Reveal */], 'Reveal');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_26__js_foundation_slider__["a" /* Slider */], 'Slider');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_27__js_foundation_smoothScroll__["a" /* SmoothScroll */], 'SmoothScroll');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_28__js_foundation_sticky__["a" /* Sticky */], 'Sticky');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_29__js_foundation_tabs__["a" /* Tabs */], 'Tabs');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_30__js_foundation_toggler__["a" /* Toggler */], 'Toggler');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_31__js_foundation_tooltip__["a" /* Tooltip */], 'Tooltip');


__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */].plugin(__WEBPACK_IMPORTED_MODULE_32__js_foundation_responsiveAccordionTabs__["a" /* ResponsiveAccordionTabs */], 'ResponsiveAccordionTabs');

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__js_foundation_core__["a" /* Foundation */]);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Abide; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__ = __webpack_require__(2);





/**
 * Abide module.
 * @module foundation.abide
 */

class Abide extends __WEBPACK_IMPORTED_MODULE_1__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Abide.
   * @class
   * @name Abide
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options = {}) {
    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend(true, {}, Abide.defaults, this.$element.data(), options);

    this.className = 'Abide'; // ie9 back compat
    this._init();
  }

  /**
   * Initializes the Abide plugin and calls functions to get Abide functioning on load.
   * @private
   */
  _init() {
    this.$inputs = this.$element.find('input, textarea, select');

    this._events();
  }

  /**
   * Initializes events for Abide.
   * @private
   */
  _events() {
    this.$element.off('.abide')
      .on('reset.zf.abide', () => {
        this.resetForm();
      })
      .on('submit.zf.abide', () => {
        return this.validateForm();
      });

    if (this.options.validateOn === 'fieldChange') {
      this.$inputs
        .off('change.zf.abide')
        .on('change.zf.abide', (e) => {
          this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }

    if (this.options.liveValidate) {
      this.$inputs
        .off('input.zf.abide')
        .on('input.zf.abide', (e) => {
          this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }

    if (this.options.validateOnBlur) {
      this.$inputs
        .off('blur.zf.abide')
        .on('blur.zf.abide', (e) => {
          this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target));
        });
    }
  }

  /**
   * Calls necessary functions to update Abide upon DOM change
   * @private
   */
  _reflow() {
    this._init();
  }

  /**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  requiredCheck($el) {
    if (!$el.attr('required')) return true;

    var isGood = true;

    switch ($el[0].type) {
      case 'checkbox':
        isGood = $el[0].checked;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        var opt = $el.find('option:selected');
        if (!opt.length || !opt.val()) isGood = false;
        break;

      default:
        if(!$el.val() || !$el.val().length) isGood = false;
    }

    return isGood;
  }

  /**
   * Get:
   * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
   *   1. The element's direct sibling('s).
   *   2. The element's parent's children.
   * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
   *
   * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
   *
   * @param {Object} $el - jQuery object to use as reference to find the form error selector.
   * @returns {Object} jQuery object with the selector.
   */
  findFormError($el) {
    var id = $el[0].id;
    var $error = $el.siblings(this.options.formErrorSelector);

    if (!$error.length) {
      $error = $el.parent().find(this.options.formErrorSelector);
    }

    $error = $error.add(this.$element.find(`[data-form-error-for="${id}"]`));

    return $error;
  }

  /**
   * Get the first element in this order:
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  findLabel($el) {
    var id = $el[0].id;
    var $label = this.$element.find(`label[for="${id}"]`);

    if (!$label.length) {
      return $el.closest('label');
    }

    return $label;
  }

  /**
   * Get the set of labels associated with a set of radio els in this order
   * 2. The <label> with the attribute `[for="someInputId"]`
   * 3. The `.closest()` <label>
   *
   * @param {Object} $el - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  findRadioLabels($els) {
    var labels = $els.map((i, el) => {
      var id = el.id;
      var $label = this.$element.find(`label[for="${id}"]`);

      if (!$label.length) {
        $label = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).closest('label');
      }
      return $label[0];
    });

    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(labels);
  }

  /**
   * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
   * @param {Object} $el - jQuery object to add the class to
   */
  addErrorClasses($el) {
    var $label = this.findLabel($el);
    var $formError = this.findFormError($el);

    if ($label.length) {
      $label.addClass(this.options.labelErrorClass);
    }

    if ($formError.length) {
      $formError.addClass(this.options.formErrorClass);
    }

    $el.addClass(this.options.inputErrorClass).attr('data-invalid', '');
  }

  /**
   * Remove CSS error classes etc from an entire radio button group
   * @param {String} groupName - A string that specifies the name of a radio button group
   *
   */

  removeRadioErrorClasses(groupName) {
    var $els = this.$element.find(`:radio[name="${groupName}"]`);
    var $labels = this.findRadioLabels($els);
    var $formErrors = this.findFormError($els);

    if ($labels.length) {
      $labels.removeClass(this.options.labelErrorClass);
    }

    if ($formErrors.length) {
      $formErrors.removeClass(this.options.formErrorClass);
    }

    $els.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');

  }

  /**
   * Removes CSS error class as specified by the Abide settings from the label, input, and the form
   * @param {Object} $el - jQuery object to remove the class from
   */
  removeErrorClasses($el) {
    // radios need to clear all of the els
    if($el[0].type == 'radio') {
      return this.removeRadioErrorClasses($el.attr('name'));
    }

    var $label = this.findLabel($el);
    var $formError = this.findFormError($el);

    if ($label.length) {
      $label.removeClass(this.options.labelErrorClass);
    }

    if ($formError.length) {
      $formError.removeClass(this.options.formErrorClass);
    }

    $el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
  }

  /**
   * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
   * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
   * @fires Abide#invalid
   * @fires Abide#valid
   * @param {Object} element - jQuery object to validate, should be an HTML input
   * @returns {Boolean} goodToGo - If the input is valid or not.
   */
  validateInput($el) {
    var clearRequire = this.requiredCheck($el),
        validated = false,
        customValidator = true,
        validator = $el.attr('data-validator'),
        equalTo = true;

    // don't validate ignored inputs or hidden inputs or disabled inputs
    if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
      return true;
    }

    switch ($el[0].type) {
      case 'radio':
        validated = this.validateRadio($el.attr('name'));
        break;

      case 'checkbox':
        validated = clearRequire;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        validated = clearRequire;
        break;

      default:
        validated = this.validateText($el);
    }

    if (validator) {
      customValidator = this.matchValidation($el, validator, $el.attr('required'));
    }

    if ($el.attr('data-equalto')) {
      equalTo = this.options.validators.equalTo($el);
    }


    var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
    var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';

    if (goodToGo) {
      // Re-validate inputs that depend on this one with equalto
      const dependentElements = this.$element.find(`[data-equalto="${$el.attr('id')}"]`);
      if (dependentElements.length) {
        let _this = this;
        dependentElements.each(function() {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val()) {
            _this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
          }
        });
      }
    }

    this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);

    /**
     * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
     * Trigger includes the DOM element of the input.
     * @event Abide#valid
     * @event Abide#invalid
     */
    $el.trigger(message, [$el]);

    return goodToGo;
  }

  /**
   * Goes through a form and if there are any invalid inputs, it will display the form error element
   * @returns {Boolean} noError - true if no errors were detected...
   * @fires Abide#formvalid
   * @fires Abide#forminvalid
   */
  validateForm() {
    var acc = [];
    var _this = this;

    this.$inputs.each(function() {
      acc.push(_this.validateInput(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)));
    });

    var noError = acc.indexOf(false) === -1;

    this.$element.find('[data-abide-error]').css('display', (noError ? 'none' : 'block'));

    /**
     * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
     * Trigger includes the element of the form.
     * @event Abide#formvalid
     * @event Abide#forminvalid
     */
    this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);

    return noError;
  }

  /**
   * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
   * @param {Object} $el - jQuery object to validate, should be a text input HTML element
   * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
   * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
   */
  validateText($el, pattern) {
    // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
    pattern = (pattern || $el.attr('pattern') || $el.attr('type'));
    var inputText = $el.val();
    var valid = false;

    if (inputText.length) {
      // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
      if (this.options.patterns.hasOwnProperty(pattern)) {
        valid = this.options.patterns[pattern].test(inputText);
      }
      // If the pattern name isn't also the type attribute of the field, then test it as a regexp
      else if (pattern !== $el.attr('type')) {
        valid = new RegExp(pattern).test(inputText);
      }
      else {
        valid = true;
      }
    }
    // An empty field is valid if it's not required
    else if (!$el.prop('required')) {
      valid = true;
    }

    return valid;
   }

  /**
   * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
   * @param {String} groupName - A string that specifies the name of a radio button group
   * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
   */
  validateRadio(groupName) {
    // If at least one radio in the group has the `required` attribute, the group is considered required
    // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
    var $group = this.$element.find(`:radio[name="${groupName}"]`);
    var valid = false, required = false;

    // For the group to be required, at least one radio needs to be required
    $group.each((i, e) => {
      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).attr('required')) {
        required = true;
      }
    });
    if(!required) valid=true;

    if (!valid) {
      // For the group to be valid, at least one radio needs to be checked
      $group.each((i, e) => {
        if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e).prop('checked')) {
          valid = true;
        }
      });
    };

    return valid;
  }

  /**
   * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
   * @param {Object} $el - jQuery input element.
   * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
   * @param {Boolean} required - self explanatory?
   * @returns {Boolean} - true if validations passed.
   */
  matchValidation($el, validators, required) {
    required = required ? true : false;

    var clear = validators.split(' ').map((v) => {
      return this.options.validators[v]($el, required, $el.parent());
    });
    return clear.indexOf(false) === -1;
  }

  /**
   * Resets form inputs and styles
   * @fires Abide#formreset
   */
  resetForm() {
    var $form = this.$element,
        opts = this.options;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`.${opts.labelErrorClass}`, $form).not('small').removeClass(opts.labelErrorClass);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`.${opts.inputErrorClass}`, $form).not('small').removeClass(opts.inputErrorClass);
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`${opts.formErrorSelector}.${opts.formErrorClass}`).removeClass(opts.formErrorClass);
    $form.find('[data-abide-error]').css('display', 'none');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').removeAttr('data-invalid');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked',false).removeAttr('data-invalid');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked',false).removeAttr('data-invalid');
    /**
     * Fires when the form has been reset.
     * @event Abide#formreset
     */
    $form.trigger('formreset.zf.abide', [$form]);
  }

  /**
   * Destroys an instance of Abide.
   * Removes error styles and classes from elements, without resetting their values.
   */
  _destroy() {
    var _this = this;
    this.$element
      .off('.abide')
      .find('[data-abide-error]')
        .css('display', 'none');

    this.$inputs
      .off('.abide')
      .each(function() {
        _this.removeErrorClasses(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
  }
}

/**
 * Default settings for plugin
 */
Abide.defaults = {
  /**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @type {?string}
   * @default 'fieldChange'
   */
  validateOn: 'fieldChange',

  /**
   * Class to be applied to input labels on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-label'
   */
  labelErrorClass: 'is-invalid-label',

  /**
   * Class to be applied to inputs on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-input'
   */
  inputErrorClass: 'is-invalid-input',

  /**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @type {string}
   * @default '.form-error'
   */
  formErrorSelector: '.form-error',

  /**
   * Class added to Form Errors on failed validation.
   * @option
   * @type {string}
   * @default 'is-visible'
   */
  formErrorClass: 'is-visible',

  /**
   * Set to true to validate text inputs on any value change.
   * @option
   * @type {boolean}
   * @default false
   */
  liveValidate: false,

  /**
   * Set to true to validate inputs on blur.
   * @option
   * @type {boolean}
   * @default false
   */
  validateOnBlur: false,

  patterns: {
    alpha : /^[a-zA-Z]+$/,
    alpha_numeric : /^[a-zA-Z0-9]+$/,
    integer : /^[-+]?\d+$/,
    number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

    // amex, visa, diners
    card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv : /^([0-9]){3,4}$/,

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

    url : /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
    // abc.de
    domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

    datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
    // YYYY-MM-DD
    date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
    // HH:MM:SS
    time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
    dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
    // MM/DD/YYYY
    month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
    // DD/MM/YYYY
    day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

    // #FFF or #FFFFFF
    color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,

    // Domain || URL
    website: {
      test: (text) => {
        return Abide.defaults.patterns['domain'].test(text) || Abide.defaults.patterns['url'].test(text);
      }
    }
  },

  /**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * required : Boolean value of the required attribute be present or not.
   * parent : The direct parent of the input.
   * @option
   */
  validators: {
    equalTo: function (el, required, parent) {
      return __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${el.attr('data-equalto')}`).val() === el.val();
    }
  }
}




/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Foundation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(4);






var FOUNDATION_VERSION = '6.4.4-rc1';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
  version: FOUNDATION_VERSION,

  /**
   * Stores initialized plugins.
   */
  _plugins: {},

  /**
   * Stores generated unique ids for plugin instances
   */
  _uuids: [],

  /**
   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
   * @param {Object} plugin - The constructor of the plugin.
   */
  plugin: function(plugin, name) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = (name || functionName(plugin));
    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName  = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = plugin;
  },
  /**
   * @function
   * Populates the _uuids array with pointers to each individual plugin instance.
   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
   * Also fires the initialization event for each plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @param {String} name - the name of the plugin, passed as a camelCased string.
   * @fires Plugin#init
   */
  registerPlugin: function(plugin, name){
    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
    plugin.uuid = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, pluginName);

    if(!plugin.$element.attr(`data-${pluginName}`)){ plugin.$element.attr(`data-${pluginName}`, plugin.uuid); }
    if(!plugin.$element.data('zfPlugin')){ plugin.$element.data('zfPlugin', plugin); }
          /**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
    plugin.$element.trigger(`init.zf.${pluginName}`);

    this._uuids.push(plugin.uuid);

    return;
  },
  /**
   * @function
   * Removes the plugins uuid from the _uuids array.
   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
   * Also fires the destroyed event for the plugin, consolidating repetitive code.
   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
   * @fires Plugin#destroyed
   */
  unregisterPlugin: function(plugin){
    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
    plugin.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
          /**
           * Fires when the plugin has been destroyed.
           * @event Plugin#destroyed
           */
          .trigger(`destroyed.zf.${pluginName}`);
    for(var prop in plugin){
      plugin[prop] = null;//clean up script to prep for garbage collection.
    }
    return;
  },

  /**
   * @function
   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
   * @default If no argument is passed, reflow all currently active plugins.
   */
   reInit: function(plugins){
     var isJQ = plugins instanceof __WEBPACK_IMPORTED_MODULE_0_jquery___default.a;
     try{
       if(isJQ){
         plugins.each(function(){
           __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('zfPlugin')._init();
         });
       }else{
         var type = typeof plugins,
         _this = this,
         fns = {
           'object': function(plgs){
             plgs.forEach(function(p){
               p = hyphenate(p);
               __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-'+ p +']').foundation('_init');
             });
           },
           'string': function(){
             plugins = hyphenate(plugins);
             __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-'+ plugins +']').foundation('_init');
           },
           'undefined': function(){
             this['object'](Object.keys(_this._plugins));
           }
         };
         fns[type](plugins);
       }
     }catch(err){
       console.error(err);
     }finally{
       return plugins;
     }
   },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {

    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    var _this = this;

    // Iterate through each plugin
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(plugins, function(i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(elem).find('[data-'+name+']').addBack('[data-'+name+']');

      // For each plugin found, initialize it
      $elem.each(function() {
        var $el = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            opts = {};
        // Don't double-dip on plugins
        if ($el.data('zfPlugin')) {
          console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");
          return;
        }

        if($el.attr('data-options')){
          var thing = $el.attr('data-options').split(';').forEach(function(e, i){
            var opt = e.split(':').map(function(el){ return el.trim(); });
            if(opt[0]) opts[opt[0]] = parseValue(opt[1]);
          });
        }
        try{
          $el.data('zfPlugin', new plugin(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this), opts));
        }catch(er){
          console.error(er);
        }finally{
          return;
        }
      });
    });
  },
  getFnName: functionName,

  addToJquery: function($) {
    // TODO: consider not making this a jQuery function
    // TODO: need way to reflow vs. re-initialize
    /**
     * The Foundation jQuery method.
     * @param {String|Array} method - An action to perform on the current jQuery object.
     */
    var foundation = function(method) {
      var type = typeof method,
          $noJS = $('.no-js');

      if($noJS.length){
        $noJS.removeClass('no-js');
      }

      if(type === 'undefined'){//needs to initialize the Foundation object, or an individual plugin.
        __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
        Foundation.reflow(this);
      }else if(type === 'string'){//an individual method to invoke on a plugin or group of plugins
        var args = Array.prototype.slice.call(arguments, 1);//collect all the arguments, if necessary
        var plugClass = this.data('zfPlugin');//determine the class of plugin

        if(plugClass !== undefined && plugClass[method] !== undefined){//make sure both the class and method exist
          if(this.length === 1){//if there's only one, call it directly.
              plugClass[method].apply(plugClass, args);
          }else{
            this.each(function(i, el){//otherwise loop through the jQuery collection and invoke the method on each
              plugClass[method].apply($(el).data('zfPlugin'), args);
            });
          }
        }else{//error for no class or no method
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      }else{//error for invalid argument type
        throw new TypeError(`We're sorry, ${type} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
      }
      return this;
    };
    $.fn.foundation = foundation;
    return $;
  }
};

Foundation.util = {
  /**
   * Function for applying a debounce effect to a function call.
   * @function
   * @param {Function} func - Function to be called at end of timeout.
   * @param {Number} delay - Time in ms to delay the call of `func`.
   * @returns function
   */
  throttle: function (func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  }
};

window.Foundation = Foundation;

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now || !window.Date.now)
    window.Date.now = Date.now = function() { return new Date().getTime(); };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
  /**
   * Polyfill for performance.now, required by rAF
   */
  if(!window.performance || !window.performance.now){
    window.performance = {
      start: Date.now(),
      now: function(){ return Date.now() - this.start; }
    };
  }
})();
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
  };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
  }
  else if (fn.prototype === undefined) {
    return fn.constructor.name;
  }
  else {
    return fn.prototype.constructor.name;
  }
}
function parseValue(str){
  if ('true' === str) return true;
  else if ('false' === str) return false;
  else if (!isNaN(str * 1)) return parseFloat(str);
  return str;
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}




/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dropdown; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_positionable__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__ = __webpack_require__(5);










/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */
class Dropdown extends __WEBPACK_IMPORTED_MODULE_3__foundation_positionable__["a" /* Positionable */] {
  /**
   * Creates a new instance of a dropdown.
   * @class
   * @name Dropdown
   * @param {jQuery} element - jQuery object to make into a dropdown.
   *        Object should be of the dropdown panel, rather than its anchor.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Dropdown.defaults, this.$element.data(), options);
    this.className = 'Dropdown'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Dropdown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ESCAPE': 'close'
    });
  }

  /**
   * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
   * @function
   * @private
   */
  _init() {
    var $id = this.$element.attr('id');

    this.$anchors = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-toggle="${$id}"]`).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-toggle="${$id}"]`) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-open="${$id}"]`);
    this.$anchors.attr({
      'aria-controls': $id,
      'data-is-focus': false,
      'data-yeti-box': $id,
      'aria-haspopup': true,
      'aria-expanded': false
    });

    this._setCurrentAnchor(this.$anchors.first());

    if(this.options.parentClass){
      this.$parent = this.$element.parents('.' + this.options.parentClass);
    }else{
      this.$parent = null;
    }

    this.$element.attr({
      'aria-hidden': 'true',
      'data-yeti-box': $id,
      'data-resize': $id,
      'aria-labelledby': this.$currentAnchor.id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* GetYoDigits */])(6, 'dd-anchor')
    });
    super._init();
    this._events();
  }

  _getDefaultPosition() {
    // handle legacy classnames
    var position = this.$element[0].className.match(/(top|left|right|bottom)/g);
    if(position) {
      return position[0];
    } else {
      return 'bottom'
    }
  }

  _getDefaultAlignment() {
    // handle legacy float approach
    var horizontalPosition = /float-(\S+)/.exec(this.$currentAnchor.className);
    if(horizontalPosition) {
      return horizontalPosition[1];
    }

    return super._getDefaultAlignment();
  }



  /**
   * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
   * Recursively calls itself if a collision is detected, with a new position class.
   * @function
   * @private
   */
  _setPosition() {
    this.$element.removeClass(`has-position-${this.position} has-alignment-${this.alignment}`);
    super._setPosition(this.$currentAnchor, this.$element, this.$parent);
    this.$element.addClass(`has-position-${this.position} has-alignment-${this.alignment}`);
  }

  /**
   * Make it a current anchor.
   * Current anchor as the reference for the position of Dropdown panes.
   * @param {HTML} el - DOM element of the anchor.
   * @function
   * @private
   */
  _setCurrentAnchor(el) {
    this.$currentAnchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el);
  }

  /**
   * Adds event listeners to the element utilizing the triggers utility library.
   * @function
   * @private
   */
  _events() {
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': this._setPosition.bind(this)
    });

    this.$anchors.off('click.zf.trigger')
      .on('click.zf.trigger', function() { _this._setCurrentAnchor(this); });

    if(this.options.hover){
      this.$anchors.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
      .on('mouseenter.zf.dropdown', function(){
        _this._setCurrentAnchor(this);

        var bodyData = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').data();
        if(typeof(bodyData.whatinput) === 'undefined' || bodyData.whatinput === 'mouse') {
          clearTimeout(_this.timeout);
          _this.timeout = setTimeout(function(){
            _this.open();
            _this.$anchors.data('hover', true);
          }, _this.options.hoverDelay);
        }
      }).on('mouseleave.zf.dropdown', function(){
        clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function(){
          _this.close();
          _this.$anchors.data('hover', false);
        }, _this.options.hoverDelay);
      });
      if(this.options.hoverPane){
        this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown')
            .on('mouseenter.zf.dropdown', function(){
              clearTimeout(_this.timeout);
            }).on('mouseleave.zf.dropdown', function(){
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function(){
                _this.close();
                _this.$anchors.data('hover', false);
              }, _this.options.hoverDelay);
            });
      }
    }
    this.$anchors.add(this.$element).on('keydown.zf.dropdown', function(e) {

      var $target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
        visibleFocusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(_this.$element);

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Dropdown', {
        open: function() {
          if ($target.is(_this.$anchors)) {
            _this.open();
            _this.$element.attr('tabindex', -1).focus();
            e.preventDefault();
          }
        },
        close: function() {
          _this.close();
          _this.$anchors.focus();
        }
      });
    });
  }

  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  _addBodyHandler() {
     var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).not(this.$element),
         _this = this;
     $body.off('click.zf.dropdown')
          .on('click.zf.dropdown', function(e){
            if(_this.$anchors.is(e.target) || _this.$anchors.find(e.target).length) {
              return;
            }
            if(_this.$element.is(e.target) || _this.$element.find(e.target).length) {
              return;
            }
            _this.close();
            $body.off('click.zf.dropdown');
          });
  }

  /**
   * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
   * @function
   * @fires Dropdown#closeme
   * @fires Dropdown#show
   */
  open() {
    // var _this = this;
    /**
     * Fires to close other open dropdowns, typically when dropdown is opening
     * @event Dropdown#closeme
     */
    this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
    this.$anchors.addClass('hover')
        .attr({'aria-expanded': true});
    // this.$element/*.show()*/;

    this.$element.addClass('is-opening');
    this._setPosition();
    this.$element.removeClass('is-opening').addClass('is-open')
        .attr({'aria-hidden': false});

    if(this.options.autoFocus){
      var $focusable = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this.$element);
      if($focusable.length){
        $focusable.eq(0).focus();
      }
    }

    if(this.options.closeOnClick){ this._addBodyHandler(); }

    if (this.options.trapFocus) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);
    }

    /**
     * Fires once the dropdown is visible.
     * @event Dropdown#show
     */
    this.$element.trigger('show.zf.dropdown', [this.$element]);
  }

  /**
   * Closes the open dropdown pane.
   * @function
   * @fires Dropdown#hide
   */
  close() {
    if(!this.$element.hasClass('is-open')){
      return false;
    }
    this.$element.removeClass('is-open')
        .attr({'aria-hidden': true});

    this.$anchors.removeClass('hover')
        .attr('aria-expanded', false);

    /**
     * Fires once the dropdown is no longer visible.
     * @event Dropdown#hide
     */
    this.$element.trigger('hide.zf.dropdown', [this.$element]);

    if (this.options.trapFocus) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(this.$element);
    }
  }

  /**
   * Toggles the dropdown pane's visibility.
   * @function
   */
  toggle() {
    if(this.$element.hasClass('is-open')){
      if(this.$anchors.data('hover')) return;
      this.close();
    }else{
      this.open();
    }
  }

  /**
   * Destroys the dropdown.
   * @function
   */
  _destroy() {
    this.$element.off('.zf.trigger').hide();
    this.$anchors.off('.zf.dropdown');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document.body).off('click.zf.dropdown');

  }
}

Dropdown.defaults = {
  /**
   * Class that designates bounding container of Dropdown (default: window)
   * @option
   * @type {?string}
   * @default null
   */
  parentClass: null,
  /**
   * Amount of time to delay opening a submenu on hover event.
   * @option
   * @type {number}
   * @default 250
   */
  hoverDelay: 250,
  /**
   * Allow submenus to open on hover events
   * @option
   * @type {boolean}
   * @default false
   */
  hover: false,
  /**
   * Don't close dropdown when hovering over dropdown pane
   * @option
   * @type {boolean}
   * @default false
   */
  hoverPane: false,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Number of pixels between the dropdown pane and the triggering element on open.
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * DEPRECATED: Class applied to adjust open position.
   * @option
   * @type {string}
   * @default ''
   */
  positionClass: '',

  /**
   * Position of dropdown. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of dropdown relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, dropdown will first try to position as defined by data-position and data-alignment, but reposition if it would cause an overflow.
   * @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * @option
   * @type {boolean}
   * @default true
   */
  allowBottomOverlap: true,
  /**
   * Allow the plugin to trap focus to the dropdown pane if opened with keyboard commands.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false,
  /**
   * Allow the plugin to set focus to the first focusable element within the pane, regardless of method of opening.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,
  /**
   * Allows a click on the body to close the dropdown.
   * @option
   * @type {boolean}
   * @default false
   */
  closeOnClick: false
}




/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Equalizer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);








/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */

class Equalizer extends __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Equalizer.
   * @class
   * @name Equalizer
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options){
    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Equalizer.defaults, this.$element.data(), options);
    this.className = 'Equalizer'; // ie9 back compat

    this._init();
  }

  /**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  _init() {
    var eqId = this.$element.attr('data-equalizer') || '';
    var $watched = this.$element.find(`[data-equalizer-watch="${eqId}"]`);

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
    this.$element.attr('data-resize', (eqId || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'eq')));
    this.$element.attr('data-mutate', (eqId || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'eq')));

    this.hasNested = this.$element.find('[data-equalizer]').length > 0;
    this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
    this.isOn = false;
    this._bindHandler = {
      onResizeMeBound: this._onResizeMe.bind(this),
      onPostEqualizedBound: this._onPostEqualized.bind(this)
    };

    var imgs = this.$element.find('img');
    var tooSmall;
    if(this.options.equalizeOn){
      tooSmall = this._checkMQ();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
    }else{
      this._events();
    }
    if((tooSmall !== undefined && tooSmall === false) || tooSmall === undefined){
      if(imgs.length){
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__["a" /* onImagesLoaded */])(imgs, this._reflow.bind(this));
      }else{
        this._reflow();
      }
    }
  }

  /**
   * Removes event listeners if the breakpoint is too small.
   * @private
   */
  _pauseEvents() {
    this.isOn = false;
    this.$element.off({
      '.zf.equalizer': this._bindHandler.onPostEqualizedBound,
      'resizeme.zf.trigger': this._bindHandler.onResizeMeBound,
	  'mutateme.zf.trigger': this._bindHandler.onResizeMeBound
    });
  }

  /**
   * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
   * @private
   */
  _onResizeMe(e) {
    this._reflow();
  }

  /**
   * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
   * @private
   */
  _onPostEqualized(e) {
    if(e.target !== this.$element[0]){ this._reflow(); }
  }

  /**
   * Initializes events for Equalizer.
   * @private
   */
  _events() {
    var _this = this;
    this._pauseEvents();
    if(this.hasNested){
      this.$element.on('postequalized.zf.equalizer', this._bindHandler.onPostEqualizedBound);
    }else{
      this.$element.on('resizeme.zf.trigger', this._bindHandler.onResizeMeBound);
	  this.$element.on('mutateme.zf.trigger', this._bindHandler.onResizeMeBound);
    }
    this.isOn = true;
  }

  /**
   * Checks the current breakpoint to the minimum required size.
   * @private
   */
  _checkMQ() {
    var tooSmall = !__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.equalizeOn);
    if(tooSmall){
      if(this.isOn){
        this._pauseEvents();
        this.$watched.css('height', 'auto');
      }
    }else{
      if(!this.isOn){
        this._events();
      }
    }
    return tooSmall;
  }

  /**
   * A noop version for the plugin
   * @private
   */
  _killswitch() {
    return;
  }

  /**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */
  _reflow() {
    if(!this.options.equalizeOnStack){
      if(this._isStacked()){
        this.$watched.css('height', 'auto');
        return false;
      }
    }
    if (this.options.equalizeByRow) {
      this.getHeightsByRow(this.applyHeightByRow.bind(this));
    }else{
      this.getHeights(this.applyHeight.bind(this));
    }
  }

  /**
   * Manually determines if the first 2 elements are *NOT* stacked.
   * @private
   */
  _isStacked() {
    if (!this.$watched[0] || !this.$watched[1]) {
      return true;
    }
    return this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top;
  }

  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} heights - An array of heights of children within Equalizer container
   */
  getHeights(cb) {
    var heights = [];
    for(var i = 0, len = this.$watched.length; i < len; i++){
      this.$watched[i].style.height = 'auto';
      heights.push(this.$watched[i].offsetHeight);
    }
    cb(heights);
  }

  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Function} cb - A non-optional callback to return the heights array to.
   * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   */
  getHeightsByRow(cb) {
    var lastElTopOffset = (this.$watched.length ? this.$watched.first().offset().top : 0),
        groups = [],
        group = 0;
    //group by Row
    groups[group] = [];
    for(var i = 0, len = this.$watched.length; i < len; i++){
      this.$watched[i].style.height = 'auto';
      //maybe could use this.$watched[i].offsetTop
      var elOffsetTop = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$watched[i]).offset().top;
      if (elOffsetTop!=lastElTopOffset) {
        group++;
        groups[group] = [];
        lastElTopOffset=elOffsetTop;
      }
      groups[group].push([this.$watched[i],this.$watched[i].offsetHeight]);
    }

    for (var j = 0, ln = groups.length; j < ln; j++) {
      var heights = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[j]).map(function(){ return this[1]; }).get();
      var max         = Math.max.apply(null, heights);
      groups[j].push(max);
    }
    cb(groups);
  }

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preequalized
   * @fires Equalizer#postequalized
   */
  applyHeight(heights) {
    var max = Math.max.apply(null, heights);
    /**
     * Fires before the heights are applied
     * @event Equalizer#preequalized
     */
    this.$element.trigger('preequalized.zf.equalizer');

    this.$watched.css('height', max);

    /**
     * Fires when the heights have been applied
     * @event Equalizer#postequalized
     */
     this.$element.trigger('postequalized.zf.equalizer');
  }

  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
   * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
   * @fires Equalizer#preequalized
   * @fires Equalizer#preequalizedrow
   * @fires Equalizer#postequalizedrow
   * @fires Equalizer#postequalized
   */
  applyHeightByRow(groups) {
    /**
     * Fires before the heights are applied
     */
    this.$element.trigger('preequalized.zf.equalizer');
    for (var i = 0, len = groups.length; i < len ; i++) {
      var groupsILength = groups[i].length,
          max = groups[i][groupsILength - 1];
      if (groupsILength<=2) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][0][0]).css({'height':'auto'});
        continue;
      }
      /**
        * Fires before the heights per row are applied
        * @event Equalizer#preequalizedrow
        */
      this.$element.trigger('preequalizedrow.zf.equalizer');
      for (var j = 0, lenJ = (groupsILength-1); j < lenJ ; j++) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(groups[i][j][0]).css({'height':max});
      }
      /**
        * Fires when the heights per row have been applied
        * @event Equalizer#postequalizedrow
        */
      this.$element.trigger('postequalizedrow.zf.equalizer');
    }
    /**
     * Fires when the heights have been applied
     */
     this.$element.trigger('postequalized.zf.equalizer');
  }

  /**
   * Destroys an instance of Equalizer.
   * @function
   */
  _destroy() {
    this._pauseEvents();
    this.$watched.css('height', 'auto');
  }
}

/**
 * Default settings for plugin
 */
Equalizer.defaults = {
  /**
   * Enable height equalization when stacked on smaller screens.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeOnStack: false,
  /**
   * Enable height equalization row by row.
   * @option
   * @type {boolean}
   * @default false
   */
  equalizeByRow: false,
  /**
   * String representing the minimum breakpoint size the plugin should equalize heights on.
   * @option
   * @type {string}
   * @default ''
   */
  equalizeOn: ''
};




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Interchange; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);








/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 */

class Interchange extends __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Interchange.
   * @class
   * @name Interchange
   * @fires Interchange#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Interchange.defaults, options);
    this.rules = [];
    this.currentPath = '';
    this.className = 'Interchange'; // ie9 back compat

    this._init();
    this._events();
  }

  /**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @function
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    var id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'interchange');
    this.$element.attr({
      'data-resize': id,
      'id': id
    });

    this._addBreakpoints();
    this._generateRules();
    this._reflow();
  }

  /**
   * Initializes events for Interchange.
   * @function
   * @private
   */
  _events() {
    this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', () => this._reflow());
  }

  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @function
   * @private
   */
  _reflow() {
    var match;

    // Iterate through each rule, but only save the last match
    for (var i in this.rules) {
      if(this.rules.hasOwnProperty(i)) {
        var rule = this.rules[i];
        if (window.matchMedia(rule.query).matches) {
          match = rule;
        }
      }
    }

    if (match) {
      this.replace(match.path);
    }
  }

  /**
   * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
   * @function
   * @private
   */
  _addBreakpoints() {
    for (var i in __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries.hasOwnProperty(i)) {
        var query = __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].queries[i];
        Interchange.SPECIAL_QUERIES[query.name] = query.value;
      }
    }
  }

  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @function
   * @private
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  _generateRules(element) {
    var rulesList = [];
    var rules;

    if (this.options.rules) {
      rules = this.options.rules;
    }
    else {
      rules = this.$element.data('interchange');
    }

    rules =  typeof rules === 'string' ? rules.match(/\[.*?\]/g) : rules;

    for (var i in rules) {
      if(rules.hasOwnProperty(i)) {
        var rule = rules[i].slice(1, -1).split(', ');
        var path = rule.slice(0, -1).join('');
        var query = rule[rule.length - 1];

        if (Interchange.SPECIAL_QUERIES[query]) {
          query = Interchange.SPECIAL_QUERIES[query];
        }

        rulesList.push({
          path: path,
          query: query
        });
      }
    }

    this.rules = rulesList;
  }

  /**
   * Update the `src` property of an image, or change the HTML of a container, to the specified path.
   * @function
   * @param {String} path - Path to the image or HTML partial.
   * @fires Interchange#replaced
   */
  replace(path) {
    if (this.currentPath === path) return;

    var _this = this,
        trigger = 'replaced.zf.interchange';

    // Replacing images
    if (this.$element[0].nodeName === 'IMG') {
      this.$element.attr('src', path).on('load', function() {
        _this.currentPath = path;
      })
      .trigger(trigger);
    }
    // Replacing background images
    else if (path.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i)) {
      path = path.replace(/\(/g, '%28').replace(/\)/g, '%29');
      this.$element.css({ 'background-image': 'url('+path+')' })
          .trigger(trigger);
    }
    // Replacing HTML
    else {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.get(path, function(response) {
        _this.$element.html(response)
             .trigger(trigger);
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(response).foundation();
        _this.currentPath = path;
      });
    }

    /**
     * Fires when content in an Interchange element is done being loaded.
     * @event Interchange#replaced
     */
    // this.$element.trigger('replaced.zf.interchange');
  }

  /**
   * Destroys an instance of interchange.
   * @function
   */
  _destroy() {
    this.$element.off('resizeme.zf.trigger')
  }
}

/**
 * Default settings for plugin
 */
Interchange.defaults = {
  /**
   * Rules to be applied to Interchange elements. Set with the `data-interchange` array notation.
   * @option
   * @type {?array}
   * @default null
   */
  rules: null
};

Interchange.SPECIAL_QUERIES = {
  'landscape': 'screen and (orientation: landscape)',
  'portrait': 'screen and (orientation: portrait)',
  'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
};




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Magellan; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_smoothScroll__ = __webpack_require__(16);








/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.smoothScroll
 */

class Magellan extends __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Magellan.
   * @class
   * @name Magellan
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Magellan.defaults, this.$element.data(), options);
    this.className = 'Magellan'; // ie9 back compat

    this._init();
    this.calcPoints();
  }

  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  _init() {
    var id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, 'magellan');
    var _this = this;
    this.$targets = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-magellan-target]');
    this.$links = this.$element.find('a');
    this.$element.attr({
      'data-resize': id,
      'data-scroll': id,
      'id': id
    });
    this.$active = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.scrollPos = parseInt(window.pageYOffset, 10);

    this._events();
  }

  /**
   * Calculates an array of pixel values that are the demarcation lines between locations on the page.
   * Can be invoked if new elements are added or the size of a location changes.
   * @function
   */
  calcPoints() {
    var _this = this,
        body = document.body,
        html = document.documentElement;

    this.points = [];
    this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
    this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));

    this.$targets.each(function(){
      var $tar = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          pt = Math.round($tar.offset().top - _this.options.threshold);
      $tar.targetPoint = pt;
      _this.points.push(pt);
    });
  }

  /**
   * Initializes events for Magellan.
   * @private
   */
  _events() {
    var _this = this,
        $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body'),
        opts = {
          duration: _this.options.animationDuration,
          easing:   _this.options.animationEasing
        };
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load', function(){
      if(_this.options.deepLinking){
        if(location.hash){
          _this.scrollToLoc(location.hash);
        }
      }
      _this.calcPoints();
      _this._updateActive();
    });

    this.$element.on({
      'resizeme.zf.trigger': this.reflow.bind(this),
      'scrollme.zf.trigger': this._updateActive.bind(this)
    }).on('click.zf.magellan', 'a[href^="#"]', function(e) {
        e.preventDefault();
        var arrival   = this.getAttribute('href');
        _this.scrollToLoc(arrival);
      });

    this._deepLinkScroll = function(e) {
      if(_this.options.deepLinking) {
        _this.scrollToLoc(window.location.hash);
      }
    };

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._deepLinkScroll);
  }

  /**
   * Function to scroll to a given location on the page.
   * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
   * @function
   */
  scrollToLoc(loc) {
    this._inTransition = true;
    var _this = this;

    var options = {
      animationEasing: this.options.animationEasing,
      animationDuration: this.options.animationDuration,
      threshold: this.options.threshold,
      offset: this.options.offset
    };

    __WEBPACK_IMPORTED_MODULE_3__foundation_smoothScroll__["a" /* SmoothScroll */].scrollToLoc(loc, options, function() {
      _this._inTransition = false;
      _this._updateActive();
    })
  }

  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @function
   */
  reflow() {
    this.calcPoints();
    this._updateActive();
  }

  /**
   * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
   * @private
   * @function
   * @fires Magellan#update
   */
  _updateActive(/*evt, elem, scrollPos*/) {
    if(this._inTransition) {return;}
    var winPos = /*scrollPos ||*/ parseInt(window.pageYOffset, 10),
        curIdx;

    if(winPos + this.winHeight === this.docHeight){ curIdx = this.points.length - 1; }
    else if(winPos < this.points[0]){ curIdx = undefined; }
    else{
      var isDown = this.scrollPos < winPos,
          _this = this,
          curVisible = this.points.filter(function(p, i){
            return isDown ? p - _this.options.offset <= winPos : p - _this.options.offset - _this.options.threshold <= winPos;
          });
      curIdx = curVisible.length ? curVisible.length - 1 : 0;
    }

    this.$active.removeClass(this.options.activeClass);
    this.$active = this.$links.filter('[href="#' + this.$targets.eq(curIdx).data('magellan-target') + '"]').addClass(this.options.activeClass);

    if(this.options.deepLinking){
      var hash = "";
      if(curIdx != undefined){
        hash = this.$active[0].getAttribute('href');
      }
      if(hash !== window.location.hash) {
        if(window.history.pushState){
          window.history.pushState(null, null, hash);
        }else{
          window.location.hash = hash;
        }
      }
    }

    this.scrollPos = winPos;
    /**
     * Fires when magellan is finished updating to the new active element.
     * @event Magellan#update
     */
    this.$element.trigger('update.zf.magellan', [this.$active]);
  }

  /**
   * Destroys an instance of Magellan and resets the url of the window.
   * @function
   */
  _destroy() {
    this.$element.off('.zf.trigger .zf.magellan')
        .find(`.${this.options.activeClass}`).removeClass(this.options.activeClass);

    if(this.options.deepLinking){
      var hash = this.$active[0].getAttribute('href');
      window.location.hash.replace(hash, '');
    }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._deepLinkScroll);
  }
}

/**
 * Default settings for plugin
 */
Magellan.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Class applied to the active locations link on the magellan container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  activeClass: 'is-active',
  /**
   * Allows the script to manipulate the url of the current page, and if supported, alter the history.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinking: false,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
}




/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OffCanvas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__ = __webpack_require__(5);










/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

class OffCanvas extends __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of an off-canvas wrapper.
   * @class
   * @name OffCanvas
   * @fires OffCanvas#init
   * @param {Object} element - jQuery object to initialize.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.className = 'OffCanvas'; // ie9 back compat
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, OffCanvas.defaults, this.$element.data(), options);
    this.contentClasses = { base: [], reveal: [] };
    this.$lastTrigger = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.position = 'left';
    this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()();
    this.nested = !!(this.options.nested);

    // Defines the CSS transition/position classes of the off-canvas content container.
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['push', 'overlap']).each((index, val) => {
      this.contentClasses.base.push('has-transition-'+val);
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(['left', 'right', 'top', 'bottom']).each((index, val) => {
      this.contentClasses.base.push('has-position-'+val);
      this.contentClasses.reveal.push('has-reveal-'+val);
    });

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    this._init();
    this._events();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('OffCanvas', {
      'ESCAPE': 'close'
    });

  }

  /**
   * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
   * @function
   * @private
   */
  _init() {
    var id = this.$element.attr('id');

    this.$element.attr('aria-hidden', 'true');

    // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)
    if (this.options.contentId) {
      this.$content = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#'+this.options.contentId);
    } else if (this.$element.siblings('[data-off-canvas-content]').length) {
      this.$content = this.$element.siblings('[data-off-canvas-content]').first();
    } else {
      this.$content = this.$element.closest('[data-off-canvas-content]').first();
    }

    if (!this.options.contentId) {
      // Assume that the off-canvas element is nested if it isn't a sibling of the content
      this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;

    } else if (this.options.contentId && this.options.nested === null) {
      // Warning if using content ID without setting the nested option
      // Once the element is nested it is required to work properly in this case
      console.warn('Remember to use the nested option if using the content ID option!');
    }

    if (this.nested === true) {
      // Force transition overlap if nested
      this.options.transition = 'overlap';
      // Remove appropriate classes if already assigned in markup
      this.$element.removeClass('is-transition-push');
    }

    this.$element.addClass(`is-transition-${this.options.transition} is-closed`);

    // Find triggers that affect this element and add aria-expanded to them
    this.$triggers = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(document)
      .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
      .attr('aria-expanded', 'false')
      .attr('aria-controls', id);

    // Get position by checking for related CSS class
    this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position;

    // Add an overlay over the content if necessary
    if (this.options.contentOverlay === true) {
      var overlay = document.createElement('div');
      var overlayPosition = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
      overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
      this.$overlay = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(overlay);
      if(overlayPosition === 'is-overlay-fixed') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.$overlay).insertAfter(this.$element);
      } else {
        this.$content.append(this.$overlay);
      }
    }

    this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

    if (this.options.isRevealed === true) {
      this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
      this._setMQChecker();
    }

    if (this.options.transitionTime) {
      this.$element.css('transition-duration', this.options.transitionTime);
    }

    // Initally remove all transition/position CSS classes from off-canvas content container.
    this._removeContentClasses();
  }

  /**
   * Adds event handlers to the off-canvas wrapper and the exit overlay.
   * @function
   * @private
   */
  _events() {
    this.$element.off('.zf.trigger .zf.offcanvas').on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
    });

    if (this.options.closeOnClick === true) {
      var $target = this.options.contentOverlay ? this.$overlay : this.$content;
      $target.on({'click.zf.offcanvas': this.close.bind(this)});
    }
  }

  /**
   * Applies event listener for elements that will reveal at certain breakpoints.
   * @private
   */
  _setMQChecker() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      if (__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      } else {
        _this.reveal(false);
      }
    }).one('load.zf.offcanvas', function() {
      if (__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      }
    });
  }

  /**
   * Removes the CSS transition/position classes of the off-canvas content container.
   * Removing the classes is important when another off-canvas gets opened that uses the same content container.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  _removeContentClasses(hasReveal) {
    if (typeof hasReveal !== 'boolean') {
      this.$content.removeClass(this.contentClasses.base.join(' '));
    } else if (hasReveal === false) {
      this.$content.removeClass(`has-reveal-${this.position}`);
    }
  }

  /**
   * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
   * Beforehand any transition/position class gets removed.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  _addContentClasses(hasReveal) {
    this._removeContentClasses(hasReveal);
    if (typeof hasReveal !== 'boolean') {
      this.$content.addClass(`has-transition-${this.options.transition} has-position-${this.position}`);
    } else if (hasReveal === true) {
      this.$content.addClass(`has-reveal-${this.position}`);
    }
  }

  /**
   * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
   * @param {Boolean} isRevealed - true if element should be revealed.
   * @function
   */
  reveal(isRevealed) {
    if (isRevealed) {
      this.close();
      this.isRevealed = true;
      this.$element.attr('aria-hidden', 'false');
      this.$element.off('open.zf.trigger toggle.zf.trigger');
      this.$element.removeClass('is-closed');
    } else {
      this.isRevealed = false;
      this.$element.attr('aria-hidden', 'true');
      this.$element.off('open.zf.trigger toggle.zf.trigger').on({
        'open.zf.trigger': this.open.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this)
      });
      this.$element.addClass('is-closed');
    }
    this._addContentClasses(isRevealed);
  }

  /**
   * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
   * @private
   */
  _stopScrolling(event) {
    return false;
  }

  // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
  // Only really works for y, not sure how to extend to x or if we need to.
  _recordScrollable(event) {
    let elem = this; // called from event handler context with this as elem

     // If the element is scrollable (content overflows), then...
    if (elem.scrollHeight !== elem.clientHeight) {
      // If we're at the top, scroll down one pixel to allow scrolling up
      if (elem.scrollTop === 0) {
        elem.scrollTop = 1;
      }
      // If we're at the bottom, scroll up one pixel to allow scrolling down
      if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
        elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
      }
    }
    elem.allowUp = elem.scrollTop > 0;
    elem.allowDown = elem.scrollTop < (elem.scrollHeight - elem.clientHeight);
    elem.lastY = event.originalEvent.pageY;
  }

  _stopScrollPropagation(event) {
    let elem = this; // called from event handler context with this as elem
    let up = event.pageY < elem.lastY;
    let down = !up;
    elem.lastY = event.pageY;

    if((up && elem.allowUp) || (down && elem.allowDown)) {
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  }

  /**
   * Opens the off-canvas menu.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   * @fires OffCanvas#opened
   */
  open(event, trigger) {
    if (this.$element.hasClass('is-open') || this.isRevealed) { return; }
    var _this = this;

    if (trigger) {
      this.$lastTrigger = trigger;
    }

    if (this.options.forceTo === 'top') {
      window.scrollTo(0, 0);
    } else if (this.options.forceTo === 'bottom') {
      window.scrollTo(0,document.body.scrollHeight);
    }

    if (this.options.transitionTime && this.options.transition !== 'overlap') {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
    } else {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
    }

    /**
     * Fires when the off-canvas menu opens.
     * @event OffCanvas#opened
     */
    this.$element.addClass('is-open').removeClass('is-closed');

    this.$triggers.attr('aria-expanded', 'true');
    this.$element.attr('aria-hidden', 'false')
        .trigger('opened.zf.offcanvas');

    this.$content.addClass('is-open-' + this.position);

    // If `contentScroll` is set to false, add class and disable scrolling on touch devices.
    if (this.options.contentScroll === false) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
      this.$element.on('touchstart', this._recordScrollable);
      this.$element.on('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.addClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.addClass('is-closable');
    }

    if (this.options.autoFocus === true) {
      this.$element.one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])(this.$element), function() {
        if (!_this.$element.hasClass('is-open')) {
          return; // exit if prematurely closed
        }
        var canvasFocus = _this.$element.find('[data-autofocus]');
        if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
        } else {
            _this.$element.find('a, button').eq(0).focus();
        }
      });
    }

    if (this.options.trapFocus === true) {
      this.$content.attr('tabindex', '-1');
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);
    }

    this._addContentClasses();
  }

  /**
   * Closes the off-canvas menu.
   * @function
   * @param {Function} cb - optional cb to fire after closure.
   * @fires OffCanvas#closed
   */
  close(cb) {
    if (!this.$element.hasClass('is-open') || this.isRevealed) { return; }

    var _this = this;

    this.$element.removeClass('is-open');

    this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */
        .trigger('closed.zf.offcanvas');

    this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

    // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.
    if (this.options.contentScroll === false) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
      this.$element.off('touchstart', this._recordScrollable);
      this.$element.off('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-closable');
    }

    this.$triggers.attr('aria-expanded', 'false');

    if (this.options.trapFocus === true) {
      this.$content.removeAttr('tabindex');
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(this.$element);
    }

    // Listen to transitionEnd and add class when done.
    this.$element.one(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["c" /* transitionend */])(this.$element), function(e) {
      _this.$element.addClass('is-closed');
      _this._removeContentClasses();
    });
  }

  /**
   * Toggles the off-canvas menu open or closed.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   */
  toggle(event, trigger) {
    if (this.$element.hasClass('is-open')) {
      this.close(event, trigger);
    }
    else {
      this.open(event, trigger);
    }
  }

  /**
   * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
   * @function
   * @private
   */
  _handleKeyboard(e) {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'OffCanvas', {
      close: () => {
        this.close();
        this.$lastTrigger.focus();
        return true;
      },
      handled: () => {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }

  /**
   * Destroys the offcanvas plugin.
   * @function
   */
  _destroy() {
    this.close();
    this.$element.off('.zf.trigger .zf.offcanvas');
    this.$overlay.off('.zf.offcanvas');
  }
}

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken.
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
}




/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Orbit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__ = __webpack_require__(10);












/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timer
 * @requires foundation.util.imageLoader
 * @requires foundation.util.touch
 */

class Orbit extends __WEBPACK_IMPORTED_MODULE_6__foundation_plugin__["a" /* Plugin */] {
  /**
  * Creates a new instance of an orbit carousel.
  * @class
  * @name Orbit
  * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
  * @param {Object} options - Overrides to the default plugin settings.
  */
  _setup(element, options){
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Orbit.defaults, this.$element.data(), options);
    this.className = 'Orbit'; // ie9 back compat

    __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a); // Touch init is idempotent, we just need to make sure it's initialied.

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Orbit', {
      'ltr': {
        'ARROW_RIGHT': 'next',
        'ARROW_LEFT': 'previous'
      },
      'rtl': {
        'ARROW_LEFT': 'next',
        'ARROW_RIGHT': 'previous'
      }
    });
  }

  /**
  * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
  * @function
  * @private
  */
  _init() {
    // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide
    this._reset();

    this.$wrapper = this.$element.find(`.${this.options.containerClass}`);
    this.$slides = this.$element.find(`.${this.options.slideClass}`);

    var $images = this.$element.find('img'),
        initActive = this.$slides.filter('.is-active'),
        id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__["b" /* GetYoDigits */])(6, 'orbit');

    this.$element.attr({
      'data-resize': id,
      'id': id
    });

    if (!initActive.length) {
      this.$slides.eq(0).addClass('is-active');
    }

    if (!this.options.useMUI) {
      this.$slides.addClass('no-motionui');
    }

    if ($images.length) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__["a" /* onImagesLoaded */])($images, this._prepareForOrbit.bind(this));
    } else {
      this._prepareForOrbit();//hehe
    }

    if (this.options.bullets) {
      this._loadBullets();
    }

    this._events();

    if (this.options.autoPlay && this.$slides.length > 1) {
      this.geoSync();
    }

    if (this.options.accessible) { // allow wrapper to be focusable to enable arrow navigation
      this.$wrapper.attr('tabindex', 0);
    }
  }

  /**
  * Creates a jQuery collection of bullets, if they are being used.
  * @function
  * @private
  */
  _loadBullets() {
    this.$bullets = this.$element.find(`.${this.options.boxOfBullets}`).find('button');
  }

  /**
  * Sets a `timer` object on the orbit, and starts the counter for the next slide.
  * @function
  */
  geoSync() {
    var _this = this;
    this.timer = new __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__["a" /* Timer */](
      this.$element,
      {
        duration: this.options.timerDelay,
        infinite: false
      },
      function() {
        _this.changeSlide(true);
      });
    this.timer.start();
  }

  /**
  * Sets wrapper and slide heights for the orbit.
  * @function
  * @private
  */
  _prepareForOrbit() {
    var _this = this;
    this._setWrapperHeight();
  }

  /**
  * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
  * @function
  * @private
  * @param {Function} cb - a callback function to fire when complete.
  */
  _setWrapperHeight(cb) {//rewrite this to `for` loop
    var max = 0, temp, counter = 0, _this = this;

    this.$slides.each(function() {
      temp = this.getBoundingClientRect().height;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('data-slide', counter);

      if (!/mui/g.test(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this)[0].className) && _this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {//if not the active slide, set css position and display property
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css({'position': 'relative', 'display': 'none'});
      }
      max = temp > max ? temp : max;
      counter++;
    });

    if (counter === this.$slides.length) {
      this.$wrapper.css({'height': max}); //only change the wrapper height property once.
      if(cb) {cb(max);} //fire callback with max height dimension.
    }
  }

  /**
  * Sets the max-height of each slide.
  * @function
  * @private
  */
  _setSlideHeight(height) {
    this.$slides.each(function() {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('max-height', height);
    });
  }

  /**
  * Adds event listeners to basically everything within the element.
  * @function
  * @private
  */
  _events() {
    var _this = this;

    //***************************************
    //**Now using custom event - thanks to:**
    //**      Yohai Ararat of Toronto      **
    //***************************************
    //
    this.$element.off('.resizeme.zf.trigger').on({
      'resizeme.zf.trigger': this._prepareForOrbit.bind(this)
    })
    if (this.$slides.length > 1) {

      if (this.options.swipe) {
        this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit')
        .on('swipeleft.zf.orbit', function(e){
          e.preventDefault();
          _this.changeSlide(true);
        }).on('swiperight.zf.orbit', function(e){
          e.preventDefault();
          _this.changeSlide(false);
        });
      }
      //***************************************

      if (this.options.autoPlay) {
        this.$slides.on('click.zf.orbit', function() {
          _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);
          _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
        });

        if (this.options.pauseOnHover) {
          this.$element.on('mouseenter.zf.orbit', function() {
            _this.timer.pause();
          }).on('mouseleave.zf.orbit', function() {
            if (!_this.$element.data('clickedOn')) {
              _this.timer.start();
            }
          });
        }
      }

      if (this.options.navButtons) {
        var $controls = this.$element.find(`.${this.options.nextClass}, .${this.options.prevClass}`);
        $controls.attr('tabindex', 0)
        //also need to handle enter/return and spacebar key presses
        .on('click.zf.orbit touchend.zf.orbit', function(e){
	  e.preventDefault();
          _this.changeSlide(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass(_this.options.nextClass));
        });
      }

      if (this.options.bullets) {
        this.$bullets.on('click.zf.orbit touchend.zf.orbit', function() {
          if (/is-active/g.test(this.className)) { return false; }//if this is active, kick out of function.
          var idx = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('slide'),
          ltr = idx > _this.$slides.filter('.is-active').data('slide'),
          $slide = _this.$slides.eq(idx);

          _this.changeSlide(ltr, $slide, idx);
        });
      }

      if (this.options.accessible) {
        this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function(e) {
          // handle keyboard event with keyboard util
          __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Orbit', {
            next: function() {
              _this.changeSlide(true);
            },
            previous: function() {
              _this.changeSlide(false);
            },
            handled: function() { // if bullet is focused, make sure focus moves
              if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is(_this.$bullets)) {
                _this.$bullets.filter('.is-active').focus();
              }
            }
          });
        });
      }
    }
  }

  /**
   * Resets Orbit so it can be reinitialized
   */
  _reset() {
    // Don't do anything if there are no slides (first run)
    if (typeof this.$slides == 'undefined') {
      return;
    }

    if (this.$slides.length > 1) {
      // Remove old events
      this.$element.off('.zf.orbit').find('*').off('.zf.orbit')

      // Restart timer if autoPlay is enabled
      if (this.options.autoPlay) {
        this.timer.restart();
      }

      // Reset all sliddes
      this.$slides.each(function(el) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).removeClass('is-active is-active is-in')
          .removeAttr('aria-live')
          .hide();
      });

      // Show the first slide
      this.$slides.first().addClass('is-active').show();

      // Triggers when the slide has finished animating
      this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]);

      // Select first bullet if bullets are present
      if (this.options.bullets) {
        this._updateBullets(0);
      }
    }
  }

  /**
  * Changes the current slide to a new one.
  * @function
  * @param {Boolean} isLTR - flag if the slide should move left to right.
  * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
  * @param {Number} idx - the index of the new slide in its collection, if one chosen.
  * @fires Orbit#slidechange
  */
  changeSlide(isLTR, chosenSlide, idx) {
    if (!this.$slides) {return; } // Don't freak out if we're in the middle of cleanup
    var $curSlide = this.$slides.filter('.is-active').eq(0);

    if (/mui/g.test($curSlide[0].className)) { return false; } //if the slide is currently animating, kick out of the function

    var $firstSlide = this.$slides.first(),
    $lastSlide = this.$slides.last(),
    dirIn = isLTR ? 'Right' : 'Left',
    dirOut = isLTR ? 'Left' : 'Right',
    _this = this,
    $newSlide;

    if (!chosenSlide) { //most of the time, this will be auto played or clicked from the navButtons.
      $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
      (this.options.infiniteWrap ? $curSlide.next(`.${this.options.slideClass}`).length ? $curSlide.next(`.${this.options.slideClass}`) : $firstSlide : $curSlide.next(`.${this.options.slideClass}`))//pick next slide if moving left to right
      :
      (this.options.infiniteWrap ? $curSlide.prev(`.${this.options.slideClass}`).length ? $curSlide.prev(`.${this.options.slideClass}`) : $lastSlide : $curSlide.prev(`.${this.options.slideClass}`));//pick prev slide if moving right to left
    } else {
      $newSlide = chosenSlide;
    }

    if ($newSlide.length) {
      /**
      * Triggers before the next slide starts animating in and only if a next slide has been found.
      * @event Orbit#beforeslidechange
      */
      this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

      if (this.options.bullets) {
        idx = idx || this.$slides.index($newSlide); //grab index to update bullets
        this._updateBullets(idx);
      }

      if (this.options.useMUI && !this.$element.is(':hidden')) {
        __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateIn(
          $newSlide.addClass('is-active').css({'position': 'absolute', 'top': 0}),
          this.options[`animInFrom${dirIn}`],
          function(){
            $newSlide.css({'position': 'relative', 'display': 'block'})
            .attr('aria-live', 'polite');
        });

        __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateOut(
          $curSlide.removeClass('is-active'),
          this.options[`animOutTo${dirOut}`],
          function(){
            $curSlide.removeAttr('aria-live');
            if(_this.options.autoPlay && !_this.timer.isPaused){
              _this.timer.restart();
            }
            //do stuff?
          });
      } else {
        $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
        $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();
        if (this.options.autoPlay && !this.timer.isPaused) {
          this.timer.restart();
        }
      }
    /**
    * Triggers when the slide has finished animating in.
    * @event Orbit#slidechange
    */
      this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
    }
  }

  /**
  * Updates the active state of the bullets, if displayed.
  * @function
  * @private
  * @param {Number} idx - the index of the current slide.
  */
  _updateBullets(idx) {
    var $oldBullet = this.$element.find(`.${this.options.boxOfBullets}`)
    .find('.is-active').removeClass('is-active').blur(),
    span = $oldBullet.find('span:last').detach(),
    $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
  }

  /**
  * Destroys the carousel and hides the element.
  * @function
  */
  _destroy() {
    this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
  }
}

Orbit.defaults = {
  /**
  * Tells the JS to look for and loadBullets.
  * @option
   * @type {boolean}
  * @default true
  */
  bullets: true,
  /**
  * Tells the JS to apply event listeners to nav buttons
  * @option
   * @type {boolean}
  * @default true
  */
  navButtons: true,
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-right'
  */
  animInFromRight: 'slide-in-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-right'
  */
  animOutToRight: 'slide-out-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-left'
  *
  */
  animInFromLeft: 'slide-in-left',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-left'
  */
  animOutToLeft: 'slide-out-left',
  /**
  * Allows Orbit to automatically animate on page load.
  * @option
   * @type {boolean}
  * @default true
  */
  autoPlay: true,
  /**
  * Amount of time, in ms, between slide transitions
  * @option
   * @type {number}
  * @default 5000
  */
  timerDelay: 5000,
  /**
  * Allows Orbit to infinitely loop through the slides
  * @option
   * @type {boolean}
  * @default true
  */
  infiniteWrap: true,
  /**
  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
  * @option
   * @type {boolean}
  * @default true
  */
  swipe: true,
  /**
  * Allows the timing function to pause animation on hover.
  * @option
   * @type {boolean}
  * @default true
  */
  pauseOnHover: true,
  /**
  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
  * @option
   * @type {boolean}
  * @default true
  */
  accessible: true,
  /**
  * Class applied to the container of Orbit
  * @option
   * @type {string}
  * @default 'orbit-container'
  */
  containerClass: 'orbit-container',
  /**
  * Class applied to individual slides.
  * @option
   * @type {string}
  * @default 'orbit-slide'
  */
  slideClass: 'orbit-slide',
  /**
  * Class applied to the bullet container. You're welcome.
  * @option
   * @type {string}
  * @default 'orbit-bullets'
  */
  boxOfBullets: 'orbit-bullets',
  /**
  * Class applied to the `next` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-next'
  */
  nextClass: 'orbit-next',
  /**
  * Class applied to the `previous` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-previous'
  */
  prevClass: 'orbit-previous',
  /**
  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatability.
  * @option
   * @type {boolean}
  * @default true
  */
  useMUI: true
};




/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveAccordionTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_accordion__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_tabs__ = __webpack_require__(17);










// The plugin matches the plugin classes with these plugin instances.
var MenuPlugins = {
  tabs: {
    cssClass: 'tabs',
    plugin: __WEBPACK_IMPORTED_MODULE_5__foundation_tabs__["a" /* Tabs */]
  },
  accordion: {
    cssClass: 'accordion',
    plugin: __WEBPACK_IMPORTED_MODULE_4__foundation_accordion__["a" /* Accordion */]
  }
};


/**
 * ResponsiveAccordionTabs module.
 * @module foundation.responsiveAccordionTabs
 * @requires foundation.util.motion
 * @requires foundation.accordion
 * @requires foundation.tabs
 */

class ResponsiveAccordionTabs extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */]{
  /**
   * Creates a new instance of a responsive accordion tabs.
   * @class
   * @name ResponsiveAccordionTabs
   * @fires ResponsiveAccordionTabs#init
   * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.options  = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.$element.data(), options);
    this.rules = this.$element.data('responsive-accordion-tabs');
    this.currentMq = null;
    this.currentPlugin = null;
    this.className = 'ResponsiveAccordionTabs'; // ie9 back compat
    if (!this.$element.attr('id')) {
      this.$element.attr('id',__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* GetYoDigits */])(6, 'responsiveaccordiontabs'));
    };

    this._init();
    this._events();
  }

  /**
   * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
   * @function
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
    if (typeof this.rules === 'string') {
      let rulesTree = {};

      // Parse rules from "classes" pulled from data attribute
      let rules = this.rules.split(' ');

      // Iterate through every rule found
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i].split('-');
        let ruleSize = rule.length > 1 ? rule[0] : 'small';
        let rulePlugin = rule.length > 1 ? rule[1] : rule[0];

        if (MenuPlugins[rulePlugin] !== null) {
          rulesTree[ruleSize] = MenuPlugins[rulePlugin];
        }
      }

      this.rules = rulesTree;
    }

    this._getAllOptions();

    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
      this._checkMediaQueries();
    }
  }

  _getAllOptions() {
    //get all defaults and options
    var _this = this;
    _this.allOptions = {};
    for (var key in MenuPlugins) {
      if (MenuPlugins.hasOwnProperty(key)) {
        var obj = MenuPlugins[key];
        try {
          var dummyPlugin = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<ul></ul>');
          var tmpPlugin = new obj.plugin(dummyPlugin,_this.options);
          for (var keyKey in tmpPlugin.options) {
            if (tmpPlugin.options.hasOwnProperty(keyKey) && keyKey !== 'zfPlugin') {
              var objObj = tmpPlugin.options[keyKey];
              _this.allOptions[keyKey] = objObj;
            }
          }
          tmpPlugin.destroy();
        }
        catch(e) {
        }
      }
    }
  }

  /**
   * Initializes events for the Menu.
   * @function
   * @private
   */
  _events() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      _this._checkMediaQueries();
    });
  }

  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  _checkMediaQueries() {
    var matchedMq, _this = this;
    // Iterate through each rule and find the last matching rule
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function(key) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(key)) {
        matchedMq = key;
      }
    });

    // No match? No dice
    if (!matchedMq) return;

    // Plugin already initialized? We good
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

    // Remove existing plugin-specific CSS classes
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });

    // Add the CSS class for the new plugin
    this.$element.addClass(this.rules[matchedMq].cssClass);

    // Create an instance of the new plugin
    if (this.currentPlugin) {
      //don't know why but on nested elements data zfPlugin get's lost
      if (!this.currentPlugin.$element.data('zfPlugin') && this.storezfData) this.currentPlugin.$element.data('zfPlugin',this.storezfData);
      this.currentPlugin.destroy();
    }
    this._handleMarkup(this.rules[matchedMq].cssClass);
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
    this.storezfData = this.currentPlugin.$element.data('zfPlugin');

  }

  _handleMarkup(toSet){
    var _this = this, fromString = 'accordion';
    var $panels = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+this.$element.attr('id')+']');
    if ($panels.length) fromString = 'tabs';
    if (fromString === toSet) {
      return;
    };

    var tabsTitle = _this.allOptions.linkClass?_this.allOptions.linkClass:'tabs-title';
    var tabsPanel = _this.allOptions.panelClass?_this.allOptions.panelClass:'tabs-panel';

    this.$element.removeAttr('role');
    var $liHeads = this.$element.children('.'+tabsTitle+',[data-accordion-item]').removeClass(tabsTitle).removeClass('accordion-item').removeAttr('data-accordion-item');
    var $liHeadsA = $liHeads.children('a').removeClass('accordion-title');

    if (fromString === 'tabs') {
      $panels = $panels.children('.'+tabsPanel).removeClass(tabsPanel).removeAttr('role').removeAttr('aria-hidden').removeAttr('aria-labelledby');
      $panels.children('a').removeAttr('role').removeAttr('aria-controls').removeAttr('aria-selected');
    }else{
      $panels = $liHeads.children('[data-tab-content]').removeClass('accordion-content');
    };

    $panels.css({display:'',visibility:''});
    $liHeads.css({display:'',visibility:''});
    if (toSet === 'accordion') {
      $panels.each(function(key,value){
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($liHeads.get(key)).addClass('accordion-content').attr('data-tab-content','').removeClass('is-active').css({height:''});
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+_this.$element.attr('id')+']').after('<div id="tabs-placeholder-'+_this.$element.attr('id')+'"></div>').detach();
        $liHeads.addClass('accordion-item').attr('data-accordion-item','');
        $liHeadsA.addClass('accordion-title');
      });
    }else if (toSet === 'tabs'){
      var $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content='+_this.$element.attr('id')+']');
      var $placeholder = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#tabs-placeholder-'+_this.$element.attr('id'));
      if ($placeholder.length) {
        $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter($placeholder).attr('data-tabs-content',_this.$element.attr('id'));
        $placeholder.remove();
      }else{
        $tabsContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div class="tabs-content"></div>').insertAfter(_this.$element).attr('data-tabs-content',_this.$element.attr('id'));
      };
      $panels.each(function(key,value){
        var tempValue = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).appendTo($tabsContent).addClass(tabsPanel);
        var hash = $liHeadsA.get(key).hash.slice(1);
        var id = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* GetYoDigits */])(6, 'accordion');
        if (hash !== id) {
          if (hash !== '') {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id',hash);
          }else{
            hash = id;
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()(value).attr('id',hash);
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href',__WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeadsA.get(key)).attr('href').replace('#','')+'#'+hash);
          };
        };
        var isActive = __WEBPACK_IMPORTED_MODULE_0_jquery___default()($liHeads.get(key)).hasClass('is-active');
        if (isActive) {
          tempValue.addClass('is-active');
        };
      });
      $liHeads.addClass(tabsTitle);
    };
  }

  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  _destroy() {
    if (this.currentPlugin) this.currentPlugin.destroy();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('.zf.ResponsiveAccordionTabs');
  }
}

ResponsiveAccordionTabs.defaults = {};




/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_dropdownMenu__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_drilldown__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_accordionMenu__ = __webpack_require__(12);












let MenuPlugins = {
  dropdown: {
    cssClass: 'dropdown',
    plugin: __WEBPACK_IMPORTED_MODULE_4__foundation_dropdownMenu__["a" /* DropdownMenu */]
  },
 drilldown: {
    cssClass: 'drilldown',
    plugin: __WEBPACK_IMPORTED_MODULE_5__foundation_drilldown__["a" /* Drilldown */]
  },
  accordion: {
    cssClass: 'accordion-menu',
    plugin: __WEBPACK_IMPORTED_MODULE_6__foundation_accordionMenu__["a" /* AccordionMenu */]
  }
};

  // import "foundation.util.triggers.js";


/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

class ResponsiveMenu extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of a responsive menu.
   * @class
   * @name ResponsiveMenu
   * @fires ResponsiveMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.rules = this.$element.data('responsive-menu');
    this.currentMq = null;
    this.currentPlugin = null;
    this.className = 'ResponsiveMenu'; // ie9 back compat

    this._init();
    this._events();
  }

  /**
   * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
   * @function
   * @private
   */
  _init() {

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    // The first time an Interchange plugin is initialized, this.rules is converted from a string of "classes" to an object of rules
    if (typeof this.rules === 'string') {
      let rulesTree = {};

      // Parse rules from "classes" pulled from data attribute
      let rules = this.rules.split(' ');

      // Iterate through every rule found
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i].split('-');
        let ruleSize = rule.length > 1 ? rule[0] : 'small';
        let rulePlugin = rule.length > 1 ? rule[1] : rule[0];

        if (MenuPlugins[rulePlugin] !== null) {
          rulesTree[ruleSize] = MenuPlugins[rulePlugin];
        }
      }

      this.rules = rulesTree;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.isEmptyObject(this.rules)) {
      this._checkMediaQueries();
    }
    // Add data-mutate since children may need it.
    this.$element.attr('data-mutate', (this.$element.attr('data-mutate') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_core__["b" /* GetYoDigits */])(6, 'responsive-menu')));
  }

  /**
   * Initializes events for the Menu.
   * @function
   * @private
   */
  _events() {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', function() {
      _this._checkMediaQueries();
    });
    // $(window).on('resize.zf.ResponsiveMenu', function() {
    //   _this._checkMediaQueries();
    // });
  }

  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  _checkMediaQueries() {
    var matchedMq, _this = this;
    // Iterate through each rule and find the last matching rule
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(this.rules, function(key) {
      if (__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(key)) {
        matchedMq = key;
      }
    });

    // No match? No dice
    if (!matchedMq) return;

    // Plugin already initialized? We good
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

    // Remove existing plugin-specific CSS classes
    __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.each(MenuPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });

    // Add the CSS class for the new plugin
    this.$element.addClass(this.rules[matchedMq].cssClass);

    // Create an instance of the new plugin
    if (this.currentPlugin) this.currentPlugin.destroy();
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
  }

  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  _destroy() {
    this.currentPlugin.destroy();
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('.zf.ResponsiveMenu');
  }
}

ResponsiveMenu.defaults = {};




/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveToggle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);








/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */

class ResponsiveToggle extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Tab Bar.
   * @class
   * @name ResponsiveToggle
   * @fires ResponsiveToggle#init
   * @param {jQuery} element - jQuery object to attach tab bar functionality to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(element);
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);
    this.className = 'ResponsiveToggle'; // ie9 back compat

    this._init();
    this._events();
  }

  /**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    var targetID = this.$element.data('responsive-toggle');
    if (!targetID) {
      console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
    }

    this.$targetMenu = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${targetID}`);
    this.$toggler = this.$element.find('[data-toggle]').filter(function() {
      var target = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('toggle');
      return (target === targetID || target === "");
    });
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, this.options, this.$targetMenu.data());

    // If they were set, parse the animation classes
    if(this.options.animate) {
      let input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }

    this._update();
  }

  /**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */
  _events() {
    var _this = this;

    this._updateMqHandler = this._update.bind(this);

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._updateMqHandler);

    this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
  }

  /**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */
  _update() {
    // Mobile
    if (!__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(this.options.hideFor)) {
      this.$element.show();
      this.$targetMenu.hide();
    }

    // Desktop
    else {
      this.$element.hide();
      this.$targetMenu.show();
    }
  }

  /**
   * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
   * @function
   * @fires ResponsiveToggle#toggled
   */
  toggleMenu() {
    if (!__WEBPACK_IMPORTED_MODULE_1__foundation_util_mediaQuery__["a" /* MediaQuery */].atLeast(this.options.hideFor)) {
      /**
       * Fires when the element attached to the tab bar toggles.
       * @event ResponsiveToggle#toggled
       */
      if(this.options.animate) {
        if (this.$targetMenu.is(':hidden')) {
          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateIn(this.$targetMenu, this.animationIn, () => {
            this.$element.trigger('toggled.zf.responsiveToggle');
            this.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
          });
        }
        else {
          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["a" /* Motion */].animateOut(this.$targetMenu, this.animationOut, () => {
            this.$element.trigger('toggled.zf.responsiveToggle');
          });
        }
      }
      else {
        this.$targetMenu.toggle(0);
        this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
        this.$element.trigger('toggled.zf.responsiveToggle');
      }
    }
  };

  _destroy() {
    this.$element.off('.zf.responsiveToggle');
    this.$toggler.off('.zf.responsiveToggle');

    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._updateMqHandler);
  }
}

ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: 'medium',

  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};




/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reveal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__ = __webpack_require__(5);









/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */

class Reveal extends __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Reveal.
   * @class
   * @name Reveal
   * @param {jQuery} element - jQuery object to use for the modal.
   * @param {Object} options - optional parameters.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Reveal.defaults, this.$element.data(), options);
    this.className = 'Reveal'; // ie9 back compat
    this._init();

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Reveal', {
      'ESCAPE': 'close',
    });
  }

  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    this.id = this.$element.attr('id');
    this.isActive = false;
    this.cached = {mq: __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].current};

    this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-open="${this.id}"]`).length ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-open="${this.id}"]`) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-toggle="${this.id}"]`);
    this.$anchor.attr({
      'aria-controls': this.id,
      'aria-haspopup': true,
      'tabindex': 0
    });

    if (this.options.fullScreen || this.$element.hasClass('full')) {
      this.options.fullScreen = true;
      this.options.overlay = false;
    }
    if (this.options.overlay && !this.$overlay) {
      this.$overlay = this._makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'data-yeti-box': this.id,
        'data-resize': this.id
    });

    if(this.$overlay) {
      this.$element.detach().appendTo(this.$overlay);
    } else {
      this.$element.detach().appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo));
      this.$element.addClass('without-overlay');
    }
    this._events();
    if (this.options.deepLink && window.location.hash === ( `#${this.id}`)) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load.zf.reveal', this.open.bind(this));
    }
  }

  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  _makeOverlay() {
    var additionalOverlayClasses = '';

    if (this.options.additionalOverlayClasses) {
      additionalOverlayClasses = ' ' + this.options.additionalOverlayClasses;
    }

    return __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>')
      .addClass('reveal-overlay' + additionalOverlayClasses)
      .appendTo(this.options.appendTo);
  }

  /**
   * Updates position of modal
   * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
   * @private
   */
  _updatePosition() {
    var width = this.$element.outerWidth();
    var outerWidth = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).width();
    var height = this.$element.outerHeight();
    var outerHeight = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height();
    var left, top = null;
    if (this.options.hOffset === 'auto') {
      left = parseInt((outerWidth - width) / 2, 10);
    } else {
      left = parseInt(this.options.hOffset, 10);
    }
    if (this.options.vOffset === 'auto') {
      if (height > outerHeight) {
        top = parseInt(Math.min(100, outerHeight / 10), 10);
      } else {
        top = parseInt((outerHeight - height) / 4, 10);
      }
    } else if (this.options.vOffset !== null) {
      top = parseInt(this.options.vOffset, 10);
    }

    if (top !== null) {
      this.$element.css({top: top + 'px'});
    }

    // only worry about left if we don't have an overlay or we have a horizontal offset,
    // otherwise we're perfectly in the middle
    if (!this.$overlay || (this.options.hOffset !== 'auto')) {
      this.$element.css({left: left + 'px'});
      this.$element.css({margin: '0px'});
    }

  }

  /**
   * Adds event handlers for the modal.
   * @private
   */
  _events() {
    var _this = this;

    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': (event, $element) => {
        if ((event.target === _this.$element[0]) ||
            (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(event.target).parents('[data-closable]')[0] === $element)) { // only close reveal when it's explicitly called
          return this.close.apply(this);
        }
      },
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': function() {
        _this._updatePosition();
      }
    });

    if (this.options.closeOnClick && this.options.overlay) {
      this.$overlay.off('.zf.reveal').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] ||
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) ||
            !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) {
              return;
        }
        _this.close();
      });
    }
    if (this.options.deepLink) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on(`popstate.zf.reveal:${this.id}`, this._handleState.bind(this));
    }
  }

  /**
   * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
   * @private
   */
  _handleState(e) {
    if(window.location.hash === ( '#' + this.id) && !this.isActive){ this.open(); }
    else{ this.close(); }
  }

  /**
  * Disables the scroll when Reveal is shown to prevent the background from shifting
  */
  _disableScroll(){
    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height() > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height()) {
      var scrollTop = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop();
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html")
        .css("top", -scrollTop);
    }
  }

  /**
  * Reenables the scroll when Reveal closes
  */
  _enableScroll(){
    if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(document).height() > __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).height()) {
      var scrollTop = parseInt(__WEBPACK_IMPORTED_MODULE_0_jquery___default()("html").css("top"));
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()("html")
        .css("top", "");
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop(-scrollTop);
    }
  }


  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @function
   * @fires Reveal#closeme
   * @fires Reveal#open
   */
  open() {
    // either update or replace browser history
    if (this.options.deepLink) {
      var hash = `#${this.id}`;

      if (window.history.pushState) {
        if (this.options.updateHistory) {
          window.history.pushState({}, '', hash);
        } else {
          window.history.replaceState({}, '', hash);
        }
      } else {
        window.location.hash = hash;
      }
    }

    this.isActive = true;

    // Make elements invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({ 'visibility': 'hidden' })
        .show()
        .scrollTop(0);
    if (this.options.overlay) {
      this.$overlay.css({'visibility': 'hidden'}).show();
    }

    this._updatePosition();

    this.$element
      .hide()
      .css({ 'visibility': '' });

    if(this.$overlay) {
      this.$overlay.css({'visibility': ''}).hide();
      if(this.$element.hasClass('fast')) {
        this.$overlay.addClass('fast');
      } else if (this.$element.hasClass('slow')) {
        this.$overlay.addClass('slow');
      }
    }


    if (!this.options.multipleOpened) {
      /**
       * Fires immediately before the modal opens.
       * Closes any other modals that are currently open
       * @event Reveal#closeme
       */
      this.$element.trigger('closeme.zf.reveal', this.id);
    }

    this._disableScroll();

    var _this = this;

    function addRevealOpenClasses() {

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').addClass('is-reveal-open');
    }

    // Motion UI method of reveal
    if (this.options.animationIn) {
      function afterAnimation(){
        _this.$element
          .attr({
            'aria-hidden': false,
            'tabindex': -1
          })
          .focus();
        addRevealOpenClasses();
        __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(_this.$element);
      }
      if (this.options.overlay) {
        __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateIn(this.$overlay, 'fade-in');
      }
      __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateIn(this.$element, this.options.animationIn, () => {
        if(this.$element) { // protect against object having been removed
          this.focusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this.$element);
          afterAnimation();
        }
      });
    }
    // jQuery method of reveal
    else {
      if (this.options.overlay) {
        this.$overlay.show(0);
      }
      this.$element.show(this.options.showDelay);
    }

    // handle accessibility
    this.$element
      .attr({
        'aria-hidden': false,
        'tabindex': -1
      })
      .focus();
    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].trapFocus(this.$element);

    addRevealOpenClasses();

    this._extraHandlers();

    /**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
    this.$element.trigger('open.zf.reveal');
  }

  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  _extraHandlers() {
    var _this = this;
    if(!this.$element) { return; } // If we're in the middle of cleanup, don't freak out
    this.focusableElements = __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].findFocusable(this.$element);

    if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').on('click.zf.reveal', function(e) {
        if (e.target === _this.$element[0] ||
          __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(_this.$element[0], e.target) ||
            !__WEBPACK_IMPORTED_MODULE_0_jquery___default.a.contains(document, e.target)) { return; }
        _this.close();
      });
    }

    if (this.options.closeOnEsc) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('keydown.zf.reveal', function(e) {
        __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Reveal', {
          close: function() {
            if (_this.options.closeOnEsc) {
              _this.close();
            }
          }
        });
      });
    }
  }

  /**
   * Closes the modal.
   * @function
   * @fires Reveal#closed
   */
  close() {
    if (!this.isActive || !this.$element.is(':visible')) {
      return false;
    }
    var _this = this;

    // Motion UI method of hiding
    if (this.options.animationOut) {
      if (this.options.overlay) {
        __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateOut(this.$overlay, 'fade-out');
      }

      __WEBPACK_IMPORTED_MODULE_3__foundation_util_motion__["a" /* Motion */].animateOut(this.$element, this.options.animationOut, finishUp);
    }
    // jQuery method of hiding
    else {
      this.$element.hide(this.options.hideDelay);

      if (this.options.overlay) {
        this.$overlay.hide(0, finishUp);
      }
      else {
        finishUp();
      }
    }

    // Conditionals to remove extra event listeners added on open
    if (this.options.closeOnEsc) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('keydown.zf.reveal');
    }

    if (!this.options.overlay && this.options.closeOnClick) {
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body').off('click.zf.reveal');
    }

    this.$element.off('keydown.zf.reveal');

    function finishUp() {

      if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()('.reveal:visible').length  === 0) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html').removeClass('is-reveal-open');
      }

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].releaseFocus(_this.$element);

      _this.$element.attr('aria-hidden', true);

      _this._enableScroll();

      /**
      * Fires when the modal is done closing.
      * @event Reveal#closed
      */
      _this.$element.trigger('closed.zf.reveal');
    }

    /**
    * Resets the modal content
    * This prevents a running video to keep going in the background
    */
    if (this.options.resetOnClose) {
      this.$element.html(this.$element.html());
    }

    this.isActive = false;
     if (_this.options.deepLink) {
       if (window.history.replaceState) {
         window.history.replaceState('', document.title, window.location.href.replace(`#${this.id}`, ''));
       } else {
         window.location.hash = '';
       }
     }

    this.$anchor.focus();
  }

  /**
   * Toggles the open/closed state of a modal.
   * @function
   */
  toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  };

  /**
   * Destroys an instance of a modal.
   * @function
   */
  _destroy() {
    if (this.options.overlay) {
      this.$element.appendTo(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.appendTo)); // move $element outside of $overlay to prevent error unregisterPlugin()
      this.$overlay.hide().off().remove();
    }
    this.$element.hide().off();
    this.$anchor.off('.zf');
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(`.zf.reveal:${this.id}`);
  };
}

Reveal.defaults = {
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationIn: '',
  /**
   * Motion-UI class to use for animated elements. If none used, defaults to simple show/hide.
   * @option
   * @type {string}
   * @default ''
   */
  animationOut: '',
  /**
   * Time, in ms, to delay the opening of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  showDelay: 0,
  /**
   * Time, in ms, to delay the closing of a modal after a click if no animation used.
   * @option
   * @type {number}
   * @default 0
   */
  hideDelay: 0,
  /**
   * Allows a click on the body/overlay to close the modal.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,
  /**
   * Allows the modal to close if the user presses the `ESCAPE` key.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnEsc: true,
  /**
   * If true, allows multiple modals to be displayed at once.
   * @option
   * @type {boolean}
   * @default false
   */
  multipleOpened: false,
  /**
   * Distance, in pixels, the modal should push down from the top of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  vOffset: 'auto',
  /**
   * Distance, in pixels, the modal should push in from the side of the screen.
   * @option
   * @type {number|string}
   * @default auto
   */
  hOffset: 'auto',
  /**
   * Allows the modal to be fullscreen, completely blocking out the rest of the view. JS checks for this as well.
   * @option
   * @type {boolean}
   * @default false
   */
  fullScreen: false,
  /**
   * Percentage of screen height the modal should push up from the bottom of the view.
   * @option
   * @type {number}
   * @default 10
   */
  btmOffsetPct: 10,
  /**
   * Allows the modal to generate an overlay div, which will cover the view when modal opens.
   * @option
   * @type {boolean}
   * @default true
   */
  overlay: true,
  /**
   * Allows the modal to remove and reinject markup on close. Should be true if using video elements w/o using provider's api, otherwise, videos will continue to play in the background.
   * @option
   * @type {boolean}
   * @default false
   */
  resetOnClose: false,
  /**
   * Allows the modal to alter the url on open/close, and allows the use of the `back` button to close modals. ALSO, allows a modal to auto-maniacally open on page load IF the hash === the modal's user-set id.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,
  /**
   * Update the browser history with the open modal
   * @option
   * @default false
   */
  updateHistory: false,
    /**
   * Allows the modal to append to custom div.
   * @option
   * @type {string}
   * @default "body"
   */
  appendTo: "body",
  /**
   * Allows adding additional class names to the reveal overlay.
   * @option
   * @type {string}
   * @default ''
   */
  additionalOverlayClasses: ''
};




/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Slider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_touch__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_util_triggers__ = __webpack_require__(5);












/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */

class Slider extends __WEBPACK_IMPORTED_MODULE_4__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of a slider control.
   * @class
   * @name Slider
   * @param {jQuery} element - jQuery object to make into a slider control.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Slider.defaults, this.$element.data(), options);
    this.className = 'Slider'; // ie9 back compat

  // Touch and Triggers inits are idempotent, we just need to make sure it's initialied.
    __WEBPACK_IMPORTED_MODULE_5__foundation_util_touch__["a" /* Touch */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);
    __WEBPACK_IMPORTED_MODULE_6__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();

    __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].register('Slider', {
      'ltr': {
        'ARROW_RIGHT': 'increase',
        'ARROW_UP': 'increase',
        'ARROW_DOWN': 'decrease',
        'ARROW_LEFT': 'decrease',
        'SHIFT_ARROW_RIGHT': 'increase_fast',
        'SHIFT_ARROW_UP': 'increase_fast',
        'SHIFT_ARROW_DOWN': 'decrease_fast',
        'SHIFT_ARROW_LEFT': 'decrease_fast',
        'HOME': 'min',
        'END': 'max'
      },
      'rtl': {
        'ARROW_LEFT': 'increase',
        'ARROW_RIGHT': 'decrease',
        'SHIFT_ARROW_LEFT': 'increase_fast',
        'SHIFT_ARROW_RIGHT': 'decrease_fast'
      }
    });
  }

  /**
   * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
   * @function
   * @private
   */
  _init() {
    this.inputs = this.$element.find('input');
    this.handles = this.$element.find('[data-slider-handle]');

    this.$handle = this.handles.eq(0);
    this.$input = this.inputs.length ? this.inputs.eq(0) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${this.$handle.attr('aria-controls')}`);
    this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

    var isDbl = false,
        _this = this;
    if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
      this.options.disabled = true;
      this.$element.addClass(this.options.disabledClass);
    }
    if (!this.inputs.length) {
      this.inputs = __WEBPACK_IMPORTED_MODULE_0_jquery___default()().add(this.$input);
      this.options.binding = true;
    }

    this._setInitAttr(0);

    if (this.handles[1]) {
      this.options.doubleSided = true;
      this.$handle2 = this.handles.eq(1);
      this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${this.$handle2.attr('aria-controls')}`);

      if (!this.inputs[1]) {
        this.inputs = this.inputs.add(this.$input2);
      }
      isDbl = true;

      // this.$handle.triggerHandler('click.zf.slider');
      this._setInitAttr(1);
    }

    // Set handle positions
    this.setHandles();

    this._events();
  }

  setHandles() {
    if(this.handles[1]) {
      this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true, () => {
        this._setHandlePos(this.$handle2, this.inputs.eq(1).val(), true);
      });
    } else {
      this._setHandlePos(this.$handle, this.inputs.eq(0).val(), true);
    }
  }

  _reflow() {
    this.setHandles();
  }
  /**
  * @function
  * @private
  * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)
  */
  _pctOfBar(value) {
    var pctOfBar = percent(value - this.options.start, this.options.end - this.options.start)

    switch(this.options.positionValueFunction) {
    case "pow":
      pctOfBar = this._logTransform(pctOfBar);
      break;
    case "log":
      pctOfBar = this._powTransform(pctOfBar);
      break;
    }

    return pctOfBar.toFixed(2)
  }

  /**
  * @function
  * @private
  * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value
  */
  _value(pctOfBar) {
    switch(this.options.positionValueFunction) {
    case "pow":
      pctOfBar = this._powTransform(pctOfBar);
      break;
    case "log":
      pctOfBar = this._logTransform(pctOfBar);
      break;
    }
    var value = (this.options.end - this.options.start) * pctOfBar + parseFloat(this.options.start);

    return value
  }

  /**
  * @function
  * @private
  * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function
  */
  _logTransform(value) {
    return baseLog(this.options.nonLinearBase, ((value*(this.options.nonLinearBase-1))+1))
  }

  /**
  * @function
  * @private
  * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function
  */
  _powTransform(value) {
    return (Math.pow(this.options.nonLinearBase, value) - 1) / (this.options.nonLinearBase - 1)
  }

  /**
   * Sets the position of the selected handle and fill bar.
   * @function
   * @private
   * @param {jQuery} $hndl - the selected handle to move.
   * @param {Number} location - floating point between the start and end values of the slider bar.
   * @param {Function} cb - callback function to fire on completion.
   * @fires Slider#moved
   * @fires Slider#changed
   */
  _setHandlePos($hndl, location, noInvert, cb) {
    // don't move if the slider has been disabled since its initialization
    if (this.$element.hasClass(this.options.disabledClass)) {
      return;
    }
    //might need to alter that slightly for bars that will have odd number selections.
    location = parseFloat(location);//on input change events, convert string to number...grumble.

    // prevent slider from running out of bounds, if value exceeds the limits set through options, override the value to min/max
    if (location < this.options.start) { location = this.options.start; }
    else if (location > this.options.end) { location = this.options.end; }

    var isDbl = this.options.doubleSided;

    //this is for single-handled vertical sliders, it adjusts the value to account for the slider being "upside-down"
    //for click and drag events, it's weird due to the scale(-1, 1) css property
    if (this.options.vertical && !noInvert) {
      location = this.options.end - location;
    }

    if (isDbl) { //this block is to prevent 2 handles from crossing eachother. Could/should be improved.
      if (this.handles.index($hndl) === 0) {
        var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
        location = location >= h2Val ? h2Val - this.options.step : location;
      } else {
        var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
        location = location <= h1Val ? h1Val + this.options.step : location;
      }
    }

    var _this = this,
        vert = this.options.vertical,
        hOrW = vert ? 'height' : 'width',
        lOrT = vert ? 'top' : 'left',
        handleDim = $hndl[0].getBoundingClientRect()[hOrW],
        elemDim = this.$element[0].getBoundingClientRect()[hOrW],
        //percentage of bar min/max value based on click or drag point
        pctOfBar = this._pctOfBar(location),
        //number of actual pixels to shift the handle, based on the percentage obtained above
        pxToMove = (elemDim - handleDim) * pctOfBar,
        //percentage of bar to shift the handle
        movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal);
        //fixing the decimal value for the location number, is passed to other methods as a fixed floating-point value
        location = parseFloat(location.toFixed(this.options.decimal));
        // declare empty object for css adjustments, only used with 2 handled-sliders
    var css = {};

    this._setValues($hndl, location);

    // TODO update to calculate based on values set to respective inputs??
    if (isDbl) {
      var isLeftHndl = this.handles.index($hndl) === 0,
          //empty variable, will be used for min-height/width for fill bar
          dim,
          //percentage w/h of the handle compared to the slider bar
          handlePct =  ~~(percent(handleDim, elemDim) * 100);
      //if left handle, the math is slightly different than if it's the right handle, and the left/top property needs to be changed for the fill bar
      if (isLeftHndl) {
        //left or top percentage value to apply to the fill bar.
        css[lOrT] = `${movement}%`;
        //calculate the new min-height/width for the fill bar.
        dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct;
        //this callback is necessary to prevent errors and allow the proper placement and initialization of a 2-handled slider
        //plus, it means we don't care if 'dim' isNaN on init, it won't be in the future.
        if (cb && typeof cb === 'function') { cb(); }//this is only needed for the initialization of 2 handled sliders
      } else {
        //just caching the value of the left/bottom handle's left/top property
        var handlePos = parseFloat(this.$handle[0].style[lOrT]);
        //calculate the new min-height/width for the fill bar. Use isNaN to prevent false positives for numbers <= 0
        //based on the percentage of movement of the handle being manipulated, less the opposing handle's left/top position, plus the percentage w/h of the handle itself
        dim = movement - (isNaN(handlePos) ? (this.options.initialStart - this.options.start)/((this.options.end-this.options.start)/100) : handlePos) + handlePct;
      }
      // assign the min-height/width to our css object
      css[`min-${hOrW}`] = `${dim}%`;
    }

    this.$element.one('finished.zf.animate', function() {
                    /**
                     * Fires when the handle is done moving.
                     * @event Slider#moved
                     */
                    _this.$element.trigger('moved.zf.slider', [$hndl]);
                });

    //because we don't know exactly how the handle will be moved, check the amount of time it should take to move.
    var moveTime = this.$element.data('dragging') ? 1000/60 : this.options.moveTime;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["b" /* Move */])(moveTime, $hndl, function() {
      // adjusting the left/top property of the handle, based on the percentage calculated above
      // if movement isNaN, that is because the slider is hidden and we cannot determine handle width,
      // fall back to next best guess.
      if (isNaN(movement)) {
        $hndl.css(lOrT, `${pctOfBar * 100}%`);
      }
      else {
        $hndl.css(lOrT, `${movement}%`);
      }

      if (!_this.options.doubleSided) {
        //if single-handled, a simple method to expand the fill bar
        _this.$fill.css(hOrW, `${pctOfBar * 100}%`);
      } else {
        //otherwise, use the css object we created above
        _this.$fill.css(css);
      }
    });


    /**
     * Fires when the value has not been change for a given time.
     * @event Slider#changed
     */
    clearTimeout(_this.timeout);
    _this.timeout = setTimeout(function(){
      _this.$element.trigger('changed.zf.slider', [$hndl]);
    }, _this.options.changedDelay);
  }

  /**
   * Sets the initial attribute for the slider element.
   * @function
   * @private
   * @param {Number} idx - index of the current handle/input to use.
   */
  _setInitAttr(idx) {
    var initVal = (idx === 0 ? this.options.initialStart : this.options.initialEnd)
    var id = this.inputs.eq(idx).attr('id') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["b" /* GetYoDigits */])(6, 'slider');
    this.inputs.eq(idx).attr({
      'id': id,
      'max': this.options.end,
      'min': this.options.start,
      'step': this.options.step
    });
    this.inputs.eq(idx).val(initVal);
    this.handles.eq(idx).attr({
      'role': 'slider',
      'aria-controls': id,
      'aria-valuemax': this.options.end,
      'aria-valuemin': this.options.start,
      'aria-valuenow': initVal,
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
      'tabindex': 0
    });
  }

  /**
   * Sets the input and `aria-valuenow` values for the slider element.
   * @function
   * @private
   * @param {jQuery} $handle - the currently selected handle.
   * @param {Number} val - floating point of the new value.
   */
  _setValues($handle, val) {
    var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
    this.inputs.eq(idx).val(val);
    $handle.attr('aria-valuenow', val);
  }

  /**
   * Handles events on the slider element.
   * Calculates the new location of the current handle.
   * If there are two handles and the bar was clicked, it determines which handle to move.
   * @function
   * @private
   * @param {Object} e - the `event` object passed from the listener.
   * @param {jQuery} $handle - the current handle to calculate for, if selected.
   * @param {Number} val - floating point number for the new value of the slider.
   * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
   */
  _handleEvent(e, $handle, val) {
    var value, hasVal;
    if (!val) {//click or drag events
      e.preventDefault();
      var _this = this,
          vertical = this.options.vertical,
          param = vertical ? 'height' : 'width',
          direction = vertical ? 'top' : 'left',
          eventOffset = vertical ? e.pageY : e.pageX,
          halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
          barDim = this.$element[0].getBoundingClientRect()[param],
          windowScroll = vertical ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollTop() : __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).scrollLeft();


      var elemOffset = this.$element.offset()[direction];

      // touch events emulated by the touch util give position relative to screen, add window.scroll to event coordinates...
      // best way to guess this is simulated is if clientY == pageY
      if (e.clientY === e.pageY) { eventOffset = eventOffset + windowScroll; }
      var eventFromBar = eventOffset - elemOffset;
      var barXY;
      if (eventFromBar < 0) {
        barXY = 0;
      } else if (eventFromBar > barDim) {
        barXY = barDim;
      } else {
        barXY = eventFromBar;
      }
      var offsetPct = percent(barXY, barDim);

      value = this._value(offsetPct);

      // turn everything around for RTL, yay math!
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__foundation_util_core__["a" /* rtl */])() && !this.options.vertical) {value = this.options.end - value;}

      value = _this._adjustValue(null, value);
      //boolean flag for the setHandlePos fn, specifically for vertical sliders
      hasVal = false;

      if (!$handle) {//figure out which handle it is, pass it to the next function.
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
      }

    } else {//change event on input
      value = this._adjustValue(null, val);
      hasVal = true;
    }

    this._setHandlePos($handle, value, hasVal);
  }

  /**
   * Adjustes value for handle in regard to step value. returns adjusted value
   * @function
   * @private
   * @param {jQuery} $handle - the selected handle.
   * @param {Number} value - value to adjust. used if $handle is falsy
   */
  _adjustValue($handle, value) {
    var val,
      step = this.options.step,
      div = parseFloat(step/2),
      left, prev_val, next_val;
    if (!!$handle) {
      val = parseFloat($handle.attr('aria-valuenow'));
    }
    else {
      val = value;
    }
    left = val % step;
    prev_val = val - left;
    next_val = prev_val + step;
    if (left === 0) {
      return val;
    }
    val = val >= prev_val + div ? next_val : prev_val;
    return val;
  }

  /**
   * Adds event listeners to the slider elements.
   * @function
   * @private
   */
  _events() {
    this._eventsForHandle(this.$handle);
    if(this.handles[1]) {
      this._eventsForHandle(this.$handle2);
    }
  }


  /**
   * Adds event listeners a particular handle
   * @function
   * @private
   * @param {jQuery} $handle - the current handle to apply listeners to.
   */
  _eventsForHandle($handle) {
    var _this = this,
        curHandle,
        timer;

      this.inputs.off('change.zf.slider').on('change.zf.slider', function(e) {
        var idx = _this.inputs.index(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
        _this._handleEvent(e, _this.handles.eq(idx), __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).val());
      });

      if (this.options.clickSelect) {
        this.$element.off('click.zf.slider').on('click.zf.slider', function(e) {
          if (_this.$element.data('dragging')) { return false; }

          if (!__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is('[data-slider-handle]')) {
            if (_this.options.doubleSided) {
              _this._handleEvent(e);
            } else {
              _this._handleEvent(e, _this.$handle);
            }
          }
        });
      }

    if (this.options.draggable) {
      this.handles.addTouch();

      var $body = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('body');
      $handle
        .off('mousedown.zf.slider')
        .on('mousedown.zf.slider', function(e) {
          $handle.addClass('is-dragging');
          _this.$fill.addClass('is-dragging');//
          _this.$element.data('dragging', true);

          curHandle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.currentTarget);

          $body.on('mousemove.zf.slider', function(e) {
            e.preventDefault();
            _this._handleEvent(e, curHandle);

          }).on('mouseup.zf.slider', function(e) {
            _this._handleEvent(e, curHandle);

            $handle.removeClass('is-dragging');
            _this.$fill.removeClass('is-dragging');
            _this.$element.data('dragging', false);

            $body.off('mousemove.zf.slider mouseup.zf.slider');
          });
      })
      // prevent events triggered by touch
      .on('selectstart.zf.slider touchmove.zf.slider', function(e) {
        e.preventDefault();
      });
    }

    $handle.off('keydown.zf.slider').on('keydown.zf.slider', function(e) {
      var _$handle = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
          idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
          oldValue = parseFloat(_this.inputs.eq(idx).val()),
          newValue;

      // handle keyboard event with keyboard util
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["a" /* Keyboard */].handleKey(e, 'Slider', {
        decrease: function() {
          newValue = oldValue - _this.options.step;
        },
        increase: function() {
          newValue = oldValue + _this.options.step;
        },
        decrease_fast: function() {
          newValue = oldValue - _this.options.step * 10;
        },
        increase_fast: function() {
          newValue = oldValue + _this.options.step * 10;
        },
        min: function() {
          newValue = _this.options.start;
        },
        max: function() {
          newValue = _this.options.end;
        },
        handled: function() { // only set handle pos when event was handled specially
          e.preventDefault();
          _this._setHandlePos(_$handle, newValue, true);
        }
      });
      /*if (newValue) { // if pressed key has special function, update value
        e.preventDefault();
        _this._setHandlePos(_$handle, newValue);
      }*/
    });
  }

  /**
   * Destroys the slider plugin.
   */
  _destroy() {
    this.handles.off('.zf.slider');
    this.inputs.off('.zf.slider');
    this.$element.off('.zf.slider');

    clearTimeout(this.timeout);
  }
}

Slider.defaults = {
  /**
   * Minimum value for the slider scale.
   * @option
   * @type {number}
   * @default 0
   */
  start: 0,
  /**
   * Maximum value for the slider scale.
   * @option
   * @type {number}
   * @default 100
   */
  end: 100,
  /**
   * Minimum value change per change event.
   * @option
   * @type {number}
   * @default 1
   */
  step: 1,
  /**
   * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
   * @option
   * @type {number}
   * @default 0
   */
  initialStart: 0,
  /**
   * Value at which the right handle/second input should be set to on initialization.
   * @option
   * @type {number}
   * @default 100
   */
  initialEnd: 100,
  /**
   * Allows the input to be located outside the container and visible. Set to by the JS
   * @option
   * @type {boolean}
   * @default false
   */
  binding: false,
  /**
   * Allows the user to click/tap on the slider bar to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  clickSelect: true,
  /**
   * Set to true and use the `vertical` class to change alignment to vertical.
   * @option
   * @type {boolean}
   * @default false
   */
  vertical: false,
  /**
   * Allows the user to drag the slider handle(s) to select a value.
   * @option
   * @type {boolean}
   * @default true
   */
  draggable: true,
  /**
   * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
   * @option
   * @type {boolean}
   * @default false
   */
  disabled: false,
  /**
   * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
   * @option
   * @type {boolean}
   * @default false
   */
  doubleSided: false,
  /**
   * Potential future feature.
   */
  // steps: 100,
  /**
   * Number of decimal places the plugin should go to for floating point precision.
   * @option
   * @type {number}
   * @default 2
   */
  decimal: 2,
  /**
   * Time delay for dragged elements.
   */
  // dragDelay: 0,
  /**
   * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
   * @option
   * @type {number}
   * @default 200
   */
  moveTime: 200,//update this if changing the transition time in the sass
  /**
   * Class applied to disabled sliders.
   * @option
   * @type {string}
   * @default 'disabled'
   */
  disabledClass: 'disabled',
  /**
   * Will invert the default layout for a vertical<span data-tooltip title="who would do this???"> </span>slider.
   * @option
   * @type {boolean}
   * @default false
   */
  invertVertical: false,
  /**
   * Milliseconds before the `changed.zf-slider` event is triggered after value change.
   * @option
   * @type {number}
   * @default 500
   */
  changedDelay: 500,
  /**
  * Basevalue for non-linear sliders
  * @option
  * @type {number}
  * @default 5
  */
  nonLinearBase: 5,
  /**
  * Basevalue for non-linear sliders, possible values are: `'linear'`, `'pow'` & `'log'`. Pow and Log use the nonLinearBase setting.
  * @option
  * @type {string}
  * @default 'linear'
  */
  positionValueFunction: 'linear',
};

function percent(frac, num) {
  return (frac / num);
}
function absPosition($handle, dir, clickPos, param) {
  return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
}
function baseLog(base, value) {
  return Math.log(value)/Math.log(base)
}




/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sticky; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__ = __webpack_require__(5);








/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */

class Sticky extends __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of a sticky thing.
   * @class
   * @name Sticky
   * @param {jQuery} element - jQuery object to make sticky.
   * @param {Object} options - options object passed when creating the element programmatically.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Sticky.defaults, this.$element.data(), options);
    this.className = 'Sticky'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_4__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
  }

  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @function
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();

    var $parent = this.$element.parent('[data-sticky-container]'),
        id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, 'sticky'),
        _this = this;

    if($parent.length){
      this.$container = $parent;
    } else {
      this.wasWrapped = true;
      this.$element.wrap(this.options.container);
      this.$container = this.$element.parent();
    }
    this.$container.addClass(this.options.containerClass);

    this.$element.addClass(this.options.stickyClass).attr({ 'data-resize': id, 'data-mutate': id });
    if (this.options.anchor !== '') {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor).attr({ 'data-mutate': id });
    }

    this.scrollCount = this.options.checkEvery;
    this.isStuck = false;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).one('load.zf.sticky', function(){
      //We calculate the container height to have correct values for anchor points offset calculation.
      _this.containerHeight = _this.$element.css("display") == "none" ? 0 : _this.$element[0].getBoundingClientRect().height;
      _this.$container.css('height', _this.containerHeight);
      _this.elemHeight = _this.containerHeight;
      if(_this.options.anchor !== ''){
        _this.$anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + _this.options.anchor);
      }else{
        _this._parsePoints();
      }

      _this._setSizes(function(){
        var scroll = window.pageYOffset;
        _this._calc(false, scroll);
        //Unstick the element will ensure that proper classes are set.
        if (!_this.isStuck) {
          _this._removeSticky((scroll >= _this.topPoint) ? false : true);
        }
      });
      _this._events(id.split('-').reverse().join('-'));
    });
  }

  /**
   * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
   * @function
   * @private
   */
  _parsePoints() {
    var top = this.options.topAnchor == "" ? 1 : this.options.topAnchor,
        btm = this.options.btmAnchor== "" ? document.documentElement.scrollHeight : this.options.btmAnchor,
        pts = [top, btm],
        breaks = {};
    for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
      var pt;
      if (typeof pts[i] === 'number') {
        pt = pts[i];
      } else {
        var place = pts[i].split(':'),
            anchor = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`#${place[0]}`);

        pt = anchor.offset().top;
        if (place[1] && place[1].toLowerCase() === 'bottom') {
          pt += anchor[0].getBoundingClientRect().height;
        }
      }
      breaks[i] = pt;
    }


    this.points = breaks;
    return;
  }

  /**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  _events(id) {
    var _this = this,
        scrollListener = this.scrollListener = `scroll.zf.${id}`;
    if (this.isOn) { return; }
    if (this.canStick) {
      this.isOn = true;
      __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener)
               .on(scrollListener, function(e) {
                 if (_this.scrollCount === 0) {
                   _this.scrollCount = _this.options.checkEvery;
                   _this._setSizes(function() {
                     _this._calc(false, window.pageYOffset);
                   });
                 } else {
                   _this.scrollCount--;
                   _this._calc(false, window.pageYOffset);
                 }
              });
    }

    this.$element.off('resizeme.zf.trigger')
                 .on('resizeme.zf.trigger', function(e, el) {
                    _this._eventsHandler(id);
    });

    this.$element.on('mutateme.zf.trigger', function (e, el) {
        _this._eventsHandler(id);
    });

    if(this.$anchor) {
      this.$anchor.on('mutateme.zf.trigger', function (e, el) {
          _this._eventsHandler(id);
      });
    }
  }

  /**
   * Handler for events.
   * @private
   * @param {String} id - pseudo-random id for unique scroll event listener.
   */
  _eventsHandler(id) {
       var _this = this,
        scrollListener = this.scrollListener = `scroll.zf.${id}`;

       _this._setSizes(function() {
       _this._calc(false);
       if (_this.canStick) {
         if (!_this.isOn) {
           _this._events(id);
         }
       } else if (_this.isOn) {
         _this._pauseListeners(scrollListener);
       }
     });
  }

  /**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */
  _pauseListeners(scrollListener) {
    this.isOn = false;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(scrollListener);

    /**
     * Fires when the plugin is paused due to resize event shrinking the view.
     * @event Sticky#pause
     * @private
     */
     this.$element.trigger('pause.zf.sticky');
  }

  /**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
   */
  _calc(checkSizes, scroll) {
    if (checkSizes) { this._setSizes(); }

    if (!this.canStick) {
      if (this.isStuck) {
        this._removeSticky(true);
      }
      return false;
    }

    if (!scroll) { scroll = window.pageYOffset; }

    if (scroll >= this.topPoint) {
      if (scroll <= this.bottomPoint) {
        if (!this.isStuck) {
          this._setSticky();
        }
      } else {
        if (this.isStuck) {
          this._removeSticky(false);
        }
      }
    } else {
      if (this.isStuck) {
        this._removeSticky(true);
      }
    }
  }

  /**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   * @function
   * @private
   */
  _setSticky() {
    var _this = this,
        stickTo = this.options.stickTo,
        mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
        notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
        css = {};

    css[mrgn] = `${this.options[mrgn]}em`;
    css[stickTo] = 0;
    css[notStuckTo] = 'auto';
    this.isStuck = true;
    this.$element.removeClass(`is-anchored is-at-${notStuckTo}`)
                 .addClass(`is-stuck is-at-${stickTo}`)
                 .css(css)
                 /**
                  * Fires when the $element has become `position: fixed;`
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.stuckto:top`
                  * @event Sticky#stuckto
                  */
                 .trigger(`sticky.zf.stuckto:${stickTo}`);
    this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
      _this._setSizes();
    });
  }

  /**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   * @private
   */
  _removeSticky(isTop) {
    var stickTo = this.options.stickTo,
        stickToTop = stickTo === 'top',
        css = {},
        anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
        mrgn = stickToTop ? 'marginTop' : 'marginBottom',
        notStuckTo = stickToTop ? 'bottom' : 'top',
        topOrBottom = isTop ? 'top' : 'bottom';

    css[mrgn] = 0;

    css['bottom'] = 'auto';
    if(isTop) {
      css['top'] = 0;
    } else {
      css['top'] = anchorPt;
    }

    this.isStuck = false;
    this.$element.removeClass(`is-stuck is-at-${stickTo}`)
                 .addClass(`is-anchored is-at-${topOrBottom}`)
                 .css(css)
                 /**
                  * Fires when the $element has become anchored.
                  * Namespaced to `top` or `bottom`, e.g. `sticky.zf.unstuckfrom:bottom`
                  * @event Sticky#unstuckfrom
                  */
                 .trigger(`sticky.zf.unstuckfrom:${topOrBottom}`);
  }

  /**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   * @private
   */
  _setSizes(cb) {
    this.canStick = __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.stickyOn);
    if (!this.canStick) {
      if (cb && typeof cb === 'function') { cb(); }
    }
    var _this = this,
        newElemWidth = this.$container[0].getBoundingClientRect().width,
        comp = window.getComputedStyle(this.$container[0]),
        pdngl = parseInt(comp['padding-left'], 10),
        pdngr = parseInt(comp['padding-right'], 10);

    if (this.$anchor && this.$anchor.length) {
      this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
    } else {
      this._parsePoints();
    }

    this.$element.css({
      'max-width': `${newElemWidth - pdngl - pdngr}px`
    });

    var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
    if (this.$element.css("display") == "none") {
      newContainerHeight = 0;
    }
    this.containerHeight = newContainerHeight;
    this.$container.css({
      height: newContainerHeight
    });
    this.elemHeight = newContainerHeight;

    if (!this.isStuck) {
      if (this.$element.hasClass('is-at-bottom')) {
        var anchorPt = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
        this.$element.css('top', anchorPt);
      }
    }

    this._setBreakPoints(newContainerHeight, function() {
      if (cb && typeof cb === 'function') { cb(); }
    });
  }

  /**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */
  _setBreakPoints(elemHeight, cb) {
    if (!this.canStick) {
      if (cb && typeof cb === 'function') { cb(); }
      else { return false; }
    }
    var mTop = emCalc(this.options.marginTop),
        mBtm = emCalc(this.options.marginBottom),
        topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
        bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
        // topPoint = this.$anchor.offset().top || this.points[0],
        // bottomPoint = topPoint + this.anchorHeight || this.points[1],
        winHeight = window.innerHeight;

    if (this.options.stickTo === 'top') {
      topPoint -= mTop;
      bottomPoint -= (elemHeight + mTop);
    } else if (this.options.stickTo === 'bottom') {
      topPoint -= (winHeight - (elemHeight + mBtm));
      bottomPoint -= (winHeight - mBtm);
    } else {
      //this would be the stickTo: both option... tricky
    }

    this.topPoint = topPoint;
    this.bottomPoint = bottomPoint;

    if (cb && typeof cb === 'function') { cb(); }
  }

  /**
   * Destroys the current sticky element.
   * Resets the element to the top position first.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   * @function
   */
  _destroy() {
    this._removeSticky(true);

    this.$element.removeClass(`${this.options.stickyClass} is-anchored is-at-top`)
                 .css({
                   height: '',
                   top: '',
                   bottom: '',
                   'max-width': ''
                 })
                 .off('resizeme.zf.trigger')
                 .off('mutateme.zf.trigger');
    if (this.$anchor && this.$anchor.length) {
      this.$anchor.off('change.zf.sticky');
    }
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off(this.scrollListener);

    if (this.wasWrapped) {
      this.$element.unwrap();
    } else {
      this.$container.removeClass(this.options.containerClass)
                     .css({
                       height: ''
                     });
    }
  }
}

Sticky.defaults = {
  /**
   * Customizable container template. Add your own classes for styling and sizing.
   * @option
   * @type {string}
   * @default '&lt;div data-sticky-container&gt;&lt;/div&gt;'
   */
  container: '<div data-sticky-container></div>',
  /**
   * Location in the view the element sticks to. Can be `'top'` or `'bottom'`.
   * @option
   * @type {string}
   * @default 'top'
   */
  stickTo: 'top',
  /**
   * If anchored to a single element, the id of that element.
   * @option
   * @type {string}
   * @default ''
   */
  anchor: '',
  /**
   * If using more than one element as anchor points, the id of the top anchor.
   * @option
   * @type {string}
   * @default ''
   */
  topAnchor: '',
  /**
   * If using more than one element as anchor points, the id of the bottom anchor.
   * @option
   * @type {string}
   * @default ''
   */
  btmAnchor: '',
  /**
   * Margin, in `em`'s to apply to the top of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginTop: 1,
  /**
   * Margin, in `em`'s to apply to the bottom of the element when it becomes sticky.
   * @option
   * @type {number}
   * @default 1
   */
  marginBottom: 1,
  /**
   * Breakpoint string that is the minimum screen size an element should become sticky.
   * @option
   * @type {string}
   * @default 'medium'
   */
  stickyOn: 'medium',
  /**
   * Class applied to sticky element, and removed on destruction. Foundation defaults to `sticky`.
   * @option
   * @type {string}
   * @default 'sticky'
   */
  stickyClass: 'sticky',
  /**
   * Class applied to sticky container. Foundation defaults to `sticky-container`.
   * @option
   * @type {string}
   * @default 'sticky-container'
   */
  containerClass: 'sticky-container',
  /**
   * Number of scroll events between the plugin's recalculating sticky points. Setting it to `0` will cause it to recalc every scroll event, setting it to `-1` will prevent recalc on scroll.
   * @option
   * @type {number}
   * @default -1
   */
  checkEvery: -1
};

/**
 * Helper function to calculate em values
 * @param Number {em} - number of em's to calculate into pixels
 */
function emCalc(em) {
  return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
}




/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toggler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__ = __webpack_require__(5);







/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */

class Toggler extends __WEBPACK_IMPORTED_MODULE_2__foundation_plugin__["a" /* Plugin */] {
  /**
   * Creates a new instance of Toggler.
   * @class
   * @name Toggler
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Toggler.defaults, element.data(), options);
    this.className = '';
    this.className = 'Toggler'; // ie9 back compat

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
    this._events();
  }

  /**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */
  _init() {
    var input;
    // Parse animation classes if they were set
    if (this.options.animate) {
      input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }
    // Otherwise, parse toggle class
    else {
      input = this.$element.data('toggler');
      // Allow for a . at the beginning of the string
      this.className = input[0] === '.' ? input.slice(1) : input;
    }

    // Add ARIA attributes to triggers
    var id = this.$element[0].id;
    __WEBPACK_IMPORTED_MODULE_0_jquery___default()(`[data-open="${id}"], [data-close="${id}"], [data-toggle="${id}"]`)
      .attr('aria-controls', id);
    // If the target is hidden, add aria-hidden
    this.$element.attr('aria-expanded', this.$element.is(':hidden') ? false : true);
  }

  /**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */
  _events() {
    this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
  }

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  toggle() {
    this[ this.options.animate ? '_toggleAnimate' : '_toggleClass']();
  }

  _toggleClass() {
    this.$element.toggleClass(this.className);

    var isOn = this.$element.hasClass(this.className);
    if (isOn) {
      /**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
      this.$element.trigger('on.zf.toggler');
    }
    else {
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      this.$element.trigger('off.zf.toggler');
    }

    this._updateARIA(isOn);
    this.$element.find('[data-mutate]').trigger('mutateme.zf.trigger');
  }

  _toggleAnimate() {
    var _this = this;

    if (this.$element.is(':hidden')) {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateIn(this.$element, this.animationIn, function() {
        _this._updateARIA(true);
        this.trigger('on.zf.toggler');
        this.find('[data-mutate]').trigger('mutateme.zf.trigger');
      });
    }
    else {
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_motion__["a" /* Motion */].animateOut(this.$element, this.animationOut, function() {
        _this._updateARIA(false);
        this.trigger('off.zf.toggler');
        this.find('[data-mutate]').trigger('mutateme.zf.trigger');
      });
    }
  }

  _updateARIA(isOn) {
    this.$element.attr('aria-expanded', isOn ? true : false);
  }

  /**
   * Destroys the instance of Toggler on the element.
   * @function
   */
  _destroy() {
    this.$element.off('.zf.toggler');
  }
}

Toggler.defaults = {
  /**
   * Tells the plugin if the element should animated when toggled.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};




/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tooltip; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_positionable__ = __webpack_require__(15);









/**
 * Tooltip module.
 * @module foundation.tooltip
 * @requires foundation.util.box
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

class Tooltip extends __WEBPACK_IMPORTED_MODULE_4__foundation_positionable__["a" /* Positionable */] {
  /**
   * Creates a new instance of a Tooltip.
   * @class
   * @name Tooltip
   * @fires Tooltip#init
   * @param {jQuery} element - jQuery object to attach a tooltip to.
   * @param {Object} options - object to extend the default configuration.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tooltip.defaults, this.$element.data(), options);
    this.className = 'Tooltip'; // ie9 back compat

    this.isActive = false;
    this.isClick = false;

    // Triggers init is idempotent, just need to make sure it is initialized
    __WEBPACK_IMPORTED_MODULE_3__foundation_util_triggers__["a" /* Triggers */].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a);

    this._init();
  }

  /**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */
  _init() {
    __WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */]._init();
    var elemId = this.$element.attr('aria-describedby') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__foundation_util_core__["b" /* GetYoDigits */])(6, 'tooltip');

    this.options.tipText = this.options.tipText || this.$element.attr('title');
    this.template = this.options.template ? __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this.options.template) : this._buildTemplate(elemId);

    if (this.options.allowHtml) {
      this.template.appendTo(document.body)
        .html(this.options.tipText)
        .hide();
    } else {
      this.template.appendTo(document.body)
        .text(this.options.tipText)
        .hide();
    }

    this.$element.attr({
      'title': '',
      'aria-describedby': elemId,
      'data-yeti-box': elemId,
      'data-toggle': elemId,
      'data-resize': elemId
    }).addClass(this.options.triggerClass);

    super._init();
    this._events();
  }

  _getDefaultPosition() {
    // handle legacy classnames
    var position = this.$element[0].className.match(/\b(top|left|right|bottom)\b/g);
    return position ? position[0] : 'top';
  }

  _getDefaultAlignment() {
    return 'center';
  }

  _getHOffset() {
    if(this.position === 'left' || this.position === 'right') {
      return this.options.hOffset + this.options.tooltipWidth;
    } else {
      return this.options.hOffset
    }
  }

  _getVOffset() {
    if(this.position === 'top' || this.position === 'bottom') {
      return this.options.vOffset + this.options.tooltipHeight;
    } else {
      return this.options.vOffset
    }
  }

  /**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */
  _buildTemplate(id) {
    var templateClasses = (`${this.options.tooltipClass} ${this.options.positionClass} ${this.options.templateClasses}`).trim();
    var $template =  __WEBPACK_IMPORTED_MODULE_0_jquery___default()('<div></div>').addClass(templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'data-is-focus': false,
      'id': id
    });
    return $template;
  }

  /**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */
  _setPosition() {
    super._setPosition(this.$element, this.template);
  }

  /**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Tooltip#closeme
   * @fires Tooltip#show
   * @function
   */
  show() {
    if (this.options.showOn !== 'all' && !__WEBPACK_IMPORTED_MODULE_2__foundation_util_mediaQuery__["a" /* MediaQuery */].is(this.options.showOn)) {
      // console.error('The screen is too small to display this tooltip');
      return false;
    }

    var _this = this;
    this.template.css('visibility', 'hidden').show();
    this._setPosition();
    this.template.removeClass('top bottom left right').addClass(this.position)
    this.template.removeClass('align-top align-bottom align-left align-right align-center').addClass('align-' + this.alignment);

    /**
     * Fires to close all other open tooltips on the page
     * @event Closeme#tooltip
     */
    this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));


    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    _this.isActive = true;
    // console.log(this.template);
    this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function() {
      //maybe do stuff?
    });
    /**
     * Fires when the tooltip is shown
     * @event Tooltip#show
     */
    this.$element.trigger('show.zf.tooltip');
  }

  /**
   * Hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @function
   */
  hide() {
    // console.log('hiding', this.$element.data('yeti-box'));
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function() {
      _this.isActive = false;
      _this.isClick = false;
    });
    /**
     * fires when the tooltip is hidden
     * @event Tooltip#hide
     */
    this.$element.trigger('hide.zf.tooltip');
  }

  /**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */
  _events() {
    var _this = this;
    var $template = this.template;
    var isFocus = false;

    if (!this.options.disableHover) {

      this.$element
      .on('mouseenter.zf.tooltip', function(e) {
        if (!_this.isActive) {
          _this.timeout = setTimeout(function() {
            _this.show();
          }, _this.options.hoverDelay);
        }
      })
      .on('mouseleave.zf.tooltip', function(e) {
        clearTimeout(_this.timeout);
        if (!isFocus || (_this.isClick && !_this.options.clickOpen)) {
          _this.hide();
        }
      });
    }

    if (this.options.clickOpen) {
      this.$element.on('mousedown.zf.tooltip', function(e) {
        e.stopImmediatePropagation();
        if (_this.isClick) {
          //_this.hide();
          // _this.isClick = false;
        } else {
          _this.isClick = true;
          if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
            _this.show();
          }
        }
      });
    } else {
      this.$element.on('mousedown.zf.tooltip', function(e) {
        e.stopImmediatePropagation();
        _this.isClick = true;
      });
    }

    if (!this.options.disableForTouch) {
      this.$element
      .on('tap.zf.tooltip touchend.zf.tooltip', function(e) {
        _this.isActive ? _this.hide() : _this.show();
      });
    }

    this.$element.on({
      // 'toggle.zf.trigger': this.toggle.bind(this),
      // 'close.zf.trigger': this.hide.bind(this)
      'close.zf.trigger': this.hide.bind(this)
    });

    this.$element
      .on('focus.zf.tooltip', function(e) {
        isFocus = true;
        if (_this.isClick) {
          // If we're not showing open on clicks, we need to pretend a click-launched focus isn't
          // a real focus, otherwise on hover and come back we get bad behavior
          if(!_this.options.clickOpen) { isFocus = false; }
          return false;
        } else {
          _this.show();
        }
      })

      .on('focusout.zf.tooltip', function(e) {
        isFocus = false;
        _this.isClick = false;
        _this.hide();
      })

      .on('resizeme.zf.trigger', function() {
        if (_this.isActive) {
          _this._setPosition();
        }
      });
  }

  /**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @function
   */
  toggle() {
    if (this.isActive) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Destroys an instance of tooltip, removes template element from the view.
   * @function
   */
  _destroy() {
    this.$element.attr('title', this.template.text())
                 .off('.zf.trigger .zf.tooltip')
                 .removeClass('has-tip top right left')
                 .removeAttr('aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box');

    this.template.remove();
  }
}

Tooltip.defaults = {
  disableForTouch: false,
  /**
   * Time, in ms, before a tooltip should open on hover.
   * @option
   * @type {number}
   * @default 200
   */
  hoverDelay: 200,
  /**
   * Time, in ms, a tooltip should take to fade into view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeInDuration: 150,
  /**
   * Time, in ms, a tooltip should take to fade out of view.
   * @option
   * @type {number}
   * @default 150
   */
  fadeOutDuration: 150,
  /**
   * Disables hover events from opening the tooltip if set to true
   * @option
   * @type {boolean}
   * @default false
   */
  disableHover: false,
  /**
   * Optional addtional classes to apply to the tooltip template on init.
   * @option
   * @type {string}
   * @default ''
   */
  templateClasses: '',
  /**
   * Non-optional class added to tooltip templates. Foundation default is 'tooltip'.
   * @option
   * @type {string}
   * @default 'tooltip'
   */
  tooltipClass: 'tooltip',
  /**
   * Class applied to the tooltip anchor element.
   * @option
   * @type {string}
   * @default 'has-tip'
   */
  triggerClass: 'has-tip',
  /**
   * Minimum breakpoint size at which to open the tooltip.
   * @option
   * @type {string}
   * @default 'small'
   */
  showOn: 'small',
  /**
   * Custom template to be used to generate markup for tooltip.
   * @option
   * @type {string}
   * @default ''
   */
  template: '',
  /**
   * Text displayed in the tooltip template on open.
   * @option
   * @type {string}
   * @default ''
   */
  tipText: '',
  touchCloseText: 'Tap to close.',
  /**
   * Allows the tooltip to remain open if triggered with a click or touch event.
   * @option
   * @type {boolean}
   * @default true
   */
  clickOpen: true,
  /**
   * DEPRECATED Additional positioning classes, set by the JS
   * @option
   * @type {string}
   * @default ''
   */
  positionClass: '',
  /**
   * Position of tooltip. Can be left, right, bottom, top, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  position: 'auto',
  /**
   * Alignment of tooltip relative to anchor. Can be left, right, bottom, top, center, or auto.
   * @option
   * @type {string}
   * @default 'auto'
   */
  alignment: 'auto',
  /**
   * Allow overlap of container/window. If false, tooltip will first try to
   * position as defined by data-position and data-alignment, but reposition if
   * it would cause an overflow.  @option
   * @type {boolean}
   * @default false
   */
  allowOverlap: false,
  /**
   * Allow overlap of only the bottom of the container. This is the most common
   * behavior for dropdowns, allowing the dropdown to extend the bottom of the
   * screen but not otherwise influence or break out of the container.
   * Less common for tooltips.
   * @option
   * @type {boolean}
   * @default false
   */
  allowBottomOverlap: false,
  /**
   * Distance, in pixels, the template should push away from the anchor on the Y axis.
   * @option
   * @type {number}
   * @default 0
   */
  vOffset: 0,
  /**
   * Distance, in pixels, the template should push away from the anchor on the X axis
   * @option
   * @type {number}
   * @default 0
   */
  hOffset: 0,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a vertical tooltip
   * @option
   * @type {number}
   * @default 14
   */
  tooltipHeight: 14,
  /**
   * Distance, in pixels, the template spacing auto-adjust for a horizontal tooltip
   * @option
   * @type {number}
   * @default 12
   */
  tooltipWidth: 12,
    /**
   * Allow HTML in tooltip. Warning: If you are loading user-generated content into tooltips,
   * allowing HTML may open yourself up to XSS attacks.
   * @option
   * @type {boolean}
   * @default false
   */
  allowHtml: false
};

/**
 * TODO utilize resize event trigger
 */




/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "/*!\n * jQuery JavaScript Library v3.2.1\n * https://jquery.com/\n *\n * Includes Sizzle.js\n * https://sizzlejs.com/\n *\n * Copyright JS Foundation and other contributors\n * Released under the MIT license\n * https://jquery.org/license\n *\n * Date: 2017-03-20T18:59Z\n */\n( function( global, factory ) {\n\n\t\"use strict\";\n\n\tif ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n\n\t\t// For CommonJS and CommonJS-like environments where a proper `window`\n\t\t// is present, execute the factory and get jQuery.\n\t\t// For environments that do not have a `window` with a `document`\n\t\t// (such as Node.js), expose a factory as module.exports.\n\t\t// This accentuates the need for the creation of a real `window`.\n\t\t// e.g. var jQuery = require(\"jquery\")(window);\n\t\t// See ticket #14549 for more info.\n\t\tmodule.exports = global.document ?\n\t\t\tfactory( global, true ) :\n\t\t\tfunction( w ) {\n\t\t\t\tif ( !w.document ) {\n\t\t\t\t\tthrow new Error( \"jQuery requires a window with a document\" );\n\t\t\t\t}\n\t\t\t\treturn factory( w );\n\t\t\t};\n\t} else {\n\t\tfactory( global );\n\t}\n\n// Pass this if window is not defined yet\n} )( typeof window !== \"undefined\" ? window : this, function( window, noGlobal ) {\n\n// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1\n// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode\n// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common\n// enough that all such attempts are guarded in a try block.\n\"use strict\";\n\nvar arr = [];\n\nvar document = window.document;\n\nvar getProto = Object.getPrototypeOf;\n\nvar slice = arr.slice;\n\nvar concat = arr.concat;\n\nvar push = arr.push;\n\nvar indexOf = arr.indexOf;\n\nvar class2type = {};\n\nvar toString = class2type.toString;\n\nvar hasOwn = class2type.hasOwnProperty;\n\nvar fnToString = hasOwn.toString;\n\nvar ObjectFunctionString = fnToString.call( Object );\n\nvar support = {};\n\n\n\n\tfunction DOMEval( code, doc ) {\n\t\tdoc = doc || document;\n\n\t\tvar script = doc.createElement( \"script\" );\n\n\t\tscript.text = code;\n\t\tdoc.head.appendChild( script ).parentNode.removeChild( script );\n\t}\n/* global Symbol */\n// Defining this global in .eslintrc.json would create a danger of using the global\n// unguarded in another place, it seems safer to define global only for this module\n\n\n\nvar\n\tversion = \"3.2.1\",\n\n\t// Define a local copy of jQuery\n\tjQuery = function( selector, context ) {\n\n\t\t// The jQuery object is actually just the init constructor 'enhanced'\n\t\t// Need init if jQuery is called (just allow error to be thrown if not included)\n\t\treturn new jQuery.fn.init( selector, context );\n\t},\n\n\t// Support: Android <=4.0 only\n\t// Make sure we trim BOM and NBSP\n\trtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\n\t// Matches dashed string for camelizing\n\trmsPrefix = /^-ms-/,\n\trdashAlpha = /-([a-z])/g,\n\n\t// Used by jQuery.camelCase as callback to replace()\n\tfcamelCase = function( all, letter ) {\n\t\treturn letter.toUpperCase();\n\t};\n\njQuery.fn = jQuery.prototype = {\n\n\t// The current version of jQuery being used\n\tjquery: version,\n\n\tconstructor: jQuery,\n\n\t// The default length of a jQuery object is 0\n\tlength: 0,\n\n\ttoArray: function() {\n\t\treturn slice.call( this );\n\t},\n\n\t// Get the Nth element in the matched element set OR\n\t// Get the whole matched element set as a clean array\n\tget: function( num ) {\n\n\t\t// Return all the elements in a clean array\n\t\tif ( num == null ) {\n\t\t\treturn slice.call( this );\n\t\t}\n\n\t\t// Return just the one element from the set\n\t\treturn num < 0 ? this[ num + this.length ] : this[ num ];\n\t},\n\n\t// Take an array of elements and push it onto the stack\n\t// (returning the new matched element set)\n\tpushStack: function( elems ) {\n\n\t\t// Build a new jQuery matched element set\n\t\tvar ret = jQuery.merge( this.constructor(), elems );\n\n\t\t// Add the old object onto the stack (as a reference)\n\t\tret.prevObject = this;\n\n\t\t// Return the newly-formed element set\n\t\treturn ret;\n\t},\n\n\t// Execute a callback for every element in the matched set.\n\teach: function( callback ) {\n\t\treturn jQuery.each( this, callback );\n\t},\n\n\tmap: function( callback ) {\n\t\treturn this.pushStack( jQuery.map( this, function( elem, i ) {\n\t\t\treturn callback.call( elem, i, elem );\n\t\t} ) );\n\t},\n\n\tslice: function() {\n\t\treturn this.pushStack( slice.apply( this, arguments ) );\n\t},\n\n\tfirst: function() {\n\t\treturn this.eq( 0 );\n\t},\n\n\tlast: function() {\n\t\treturn this.eq( -1 );\n\t},\n\n\teq: function( i ) {\n\t\tvar len = this.length,\n\t\t\tj = +i + ( i < 0 ? len : 0 );\n\t\treturn this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );\n\t},\n\n\tend: function() {\n\t\treturn this.prevObject || this.constructor();\n\t},\n\n\t// For internal use only.\n\t// Behaves like an Array's method, not like a jQuery method.\n\tpush: push,\n\tsort: arr.sort,\n\tsplice: arr.splice\n};\n\njQuery.extend = jQuery.fn.extend = function() {\n\tvar options, name, src, copy, copyIsArray, clone,\n\t\ttarget = arguments[ 0 ] || {},\n\t\ti = 1,\n\t\tlength = arguments.length,\n\t\tdeep = false;\n\n\t// Handle a deep copy situation\n\tif ( typeof target === \"boolean\" ) {\n\t\tdeep = target;\n\n\t\t// Skip the boolean and the target\n\t\ttarget = arguments[ i ] || {};\n\t\ti++;\n\t}\n\n\t// Handle case when target is a string or something (possible in deep copy)\n\tif ( typeof target !== \"object\" && !jQuery.isFunction( target ) ) {\n\t\ttarget = {};\n\t}\n\n\t// Extend jQuery itself if only one argument is passed\n\tif ( i === length ) {\n\t\ttarget = this;\n\t\ti--;\n\t}\n\n\tfor ( ; i < length; i++ ) {\n\n\t\t// Only deal with non-null/undefined values\n\t\tif ( ( options = arguments[ i ] ) != null ) {\n\n\t\t\t// Extend the base object\n\t\t\tfor ( name in options ) {\n\t\t\t\tsrc = target[ name ];\n\t\t\t\tcopy = options[ name ];\n\n\t\t\t\t// Prevent never-ending loop\n\t\t\t\tif ( target === copy ) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\n\t\t\t\t// Recurse if we're merging plain objects or arrays\n\t\t\t\tif ( deep && copy && ( jQuery.isPlainObject( copy ) ||\n\t\t\t\t\t( copyIsArray = Array.isArray( copy ) ) ) ) {\n\n\t\t\t\t\tif ( copyIsArray ) {\n\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\tclone = src && Array.isArray( src ) ? src : [];\n\n\t\t\t\t\t} else {\n\t\t\t\t\t\tclone = src && jQuery.isPlainObject( src ) ? src : {};\n\t\t\t\t\t}\n\n\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\ttarget[ name ] = jQuery.extend( deep, clone, copy );\n\n\t\t\t\t// Don't bring in undefined values\n\t\t\t\t} else if ( copy !== undefined ) {\n\t\t\t\t\ttarget[ name ] = copy;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Return the modified object\n\treturn target;\n};\n\njQuery.extend( {\n\n\t// Unique for each copy of jQuery on the page\n\texpando: \"jQuery\" + ( version + Math.random() ).replace( /\\D/g, \"\" ),\n\n\t// Assume jQuery is ready without the ready module\n\tisReady: true,\n\n\terror: function( msg ) {\n\t\tthrow new Error( msg );\n\t},\n\n\tnoop: function() {},\n\n\tisFunction: function( obj ) {\n\t\treturn jQuery.type( obj ) === \"function\";\n\t},\n\n\tisWindow: function( obj ) {\n\t\treturn obj != null && obj === obj.window;\n\t},\n\n\tisNumeric: function( obj ) {\n\n\t\t// As of jQuery 3.0, isNumeric is limited to\n\t\t// strings and numbers (primitives or objects)\n\t\t// that can be coerced to finite numbers (gh-2662)\n\t\tvar type = jQuery.type( obj );\n\t\treturn ( type === \"number\" || type === \"string\" ) &&\n\n\t\t\t// parseFloat NaNs numeric-cast false positives (\"\")\n\t\t\t// ...but misinterprets leading-number strings, particularly hex literals (\"0x...\")\n\t\t\t// subtraction forces infinities to NaN\n\t\t\t!isNaN( obj - parseFloat( obj ) );\n\t},\n\n\tisPlainObject: function( obj ) {\n\t\tvar proto, Ctor;\n\n\t\t// Detect obvious negatives\n\t\t// Use toString instead of jQuery.type to catch host objects\n\t\tif ( !obj || toString.call( obj ) !== \"[object Object]\" ) {\n\t\t\treturn false;\n\t\t}\n\n\t\tproto = getProto( obj );\n\n\t\t// Objects with no prototype (e.g., `Object.create( null )`) are plain\n\t\tif ( !proto ) {\n\t\t\treturn true;\n\t\t}\n\n\t\t// Objects with prototype are plain iff they were constructed by a global Object function\n\t\tCtor = hasOwn.call( proto, \"constructor\" ) && proto.constructor;\n\t\treturn typeof Ctor === \"function\" && fnToString.call( Ctor ) === ObjectFunctionString;\n\t},\n\n\tisEmptyObject: function( obj ) {\n\n\t\t/* eslint-disable no-unused-vars */\n\t\t// See https://github.com/eslint/eslint/issues/6125\n\t\tvar name;\n\n\t\tfor ( name in obj ) {\n\t\t\treturn false;\n\t\t}\n\t\treturn true;\n\t},\n\n\ttype: function( obj ) {\n\t\tif ( obj == null ) {\n\t\t\treturn obj + \"\";\n\t\t}\n\n\t\t// Support: Android <=2.3 only (functionish RegExp)\n\t\treturn typeof obj === \"object\" || typeof obj === \"function\" ?\n\t\t\tclass2type[ toString.call( obj ) ] || \"object\" :\n\t\t\ttypeof obj;\n\t},\n\n\t// Evaluates a script in a global context\n\tglobalEval: function( code ) {\n\t\tDOMEval( code );\n\t},\n\n\t// Convert dashed to camelCase; used by the css and data modules\n\t// Support: IE <=9 - 11, Edge 12 - 13\n\t// Microsoft forgot to hump their vendor prefix (#9572)\n\tcamelCase: function( string ) {\n\t\treturn string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );\n\t},\n\n\teach: function( obj, callback ) {\n\t\tvar length, i = 0;\n\n\t\tif ( isArrayLike( obj ) ) {\n\t\t\tlength = obj.length;\n\t\t\tfor ( ; i < length; i++ ) {\n\t\t\t\tif ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\tfor ( i in obj ) {\n\t\t\t\tif ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn obj;\n\t},\n\n\t// Support: Android <=4.0 only\n\ttrim: function( text ) {\n\t\treturn text == null ?\n\t\t\t\"\" :\n\t\t\t( text + \"\" ).replace( rtrim, \"\" );\n\t},\n\n\t// results is for internal usage only\n\tmakeArray: function( arr, results ) {\n\t\tvar ret = results || [];\n\n\t\tif ( arr != null ) {\n\t\t\tif ( isArrayLike( Object( arr ) ) ) {\n\t\t\t\tjQuery.merge( ret,\n\t\t\t\t\ttypeof arr === \"string\" ?\n\t\t\t\t\t[ arr ] : arr\n\t\t\t\t);\n\t\t\t} else {\n\t\t\t\tpush.call( ret, arr );\n\t\t\t}\n\t\t}\n\n\t\treturn ret;\n\t},\n\n\tinArray: function( elem, arr, i ) {\n\t\treturn arr == null ? -1 : indexOf.call( arr, elem, i );\n\t},\n\n\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t// push.apply(_, arraylike) throws on ancient WebKit\n\tmerge: function( first, second ) {\n\t\tvar len = +second.length,\n\t\t\tj = 0,\n\t\t\ti = first.length;\n\n\t\tfor ( ; j < len; j++ ) {\n\t\t\tfirst[ i++ ] = second[ j ];\n\t\t}\n\n\t\tfirst.length = i;\n\n\t\treturn first;\n\t},\n\n\tgrep: function( elems, callback, invert ) {\n\t\tvar callbackInverse,\n\t\t\tmatches = [],\n\t\t\ti = 0,\n\t\t\tlength = elems.length,\n\t\t\tcallbackExpect = !invert;\n\n\t\t// Go through the array, only saving the items\n\t\t// that pass the validator function\n\t\tfor ( ; i < length; i++ ) {\n\t\t\tcallbackInverse = !callback( elems[ i ], i );\n\t\t\tif ( callbackInverse !== callbackExpect ) {\n\t\t\t\tmatches.push( elems[ i ] );\n\t\t\t}\n\t\t}\n\n\t\treturn matches;\n\t},\n\n\t// arg is for internal usage only\n\tmap: function( elems, callback, arg ) {\n\t\tvar length, value,\n\t\t\ti = 0,\n\t\t\tret = [];\n\n\t\t// Go through the array, translating each of the items to their new values\n\t\tif ( isArrayLike( elems ) ) {\n\t\t\tlength = elems.length;\n\t\t\tfor ( ; i < length; i++ ) {\n\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\n\t\t\t\tif ( value != null ) {\n\t\t\t\t\tret.push( value );\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Go through every key on the object,\n\t\t} else {\n\t\t\tfor ( i in elems ) {\n\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\n\t\t\t\tif ( value != null ) {\n\t\t\t\t\tret.push( value );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Flatten any nested arrays\n\t\treturn concat.apply( [], ret );\n\t},\n\n\t// A global GUID counter for objects\n\tguid: 1,\n\n\t// Bind a function to a context, optionally partially applying any\n\t// arguments.\n\tproxy: function( fn, context ) {\n\t\tvar tmp, args, proxy;\n\n\t\tif ( typeof context === \"string\" ) {\n\t\t\ttmp = fn[ context ];\n\t\t\tcontext = fn;\n\t\t\tfn = tmp;\n\t\t}\n\n\t\t// Quick check to determine if target is callable, in the spec\n\t\t// this throws a TypeError, but we will just return undefined.\n\t\tif ( !jQuery.isFunction( fn ) ) {\n\t\t\treturn undefined;\n\t\t}\n\n\t\t// Simulated bind\n\t\targs = slice.call( arguments, 2 );\n\t\tproxy = function() {\n\t\t\treturn fn.apply( context || this, args.concat( slice.call( arguments ) ) );\n\t\t};\n\n\t\t// Set the guid of unique handler to the same of original handler, so it can be removed\n\t\tproxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\n\t\treturn proxy;\n\t},\n\n\tnow: Date.now,\n\n\t// jQuery.support is not used in Core but other projects attach their\n\t// properties to it so it needs to exist.\n\tsupport: support\n} );\n\nif ( typeof Symbol === \"function\" ) {\n\tjQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];\n}\n\n// Populate the class2type map\njQuery.each( \"Boolean Number String Function Array Date RegExp Object Error Symbol\".split( \" \" ),\nfunction( i, name ) {\n\tclass2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();\n} );\n\nfunction isArrayLike( obj ) {\n\n\t// Support: real iOS 8.2 only (not reproducible in simulator)\n\t// `in` check used to prevent JIT error (gh-2145)\n\t// hasOwn isn't used here due to false negatives\n\t// regarding Nodelist length in IE\n\tvar length = !!obj && \"length\" in obj && obj.length,\n\t\ttype = jQuery.type( obj );\n\n\tif ( type === \"function\" || jQuery.isWindow( obj ) ) {\n\t\treturn false;\n\t}\n\n\treturn type === \"array\" || length === 0 ||\n\t\ttypeof length === \"number\" && length > 0 && ( length - 1 ) in obj;\n}\nvar Sizzle =\n/*!\n * Sizzle CSS Selector Engine v2.3.3\n * https://sizzlejs.com/\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2016-08-08\n */\n(function( window ) {\n\nvar i,\n\tsupport,\n\tExpr,\n\tgetText,\n\tisXML,\n\ttokenize,\n\tcompile,\n\tselect,\n\toutermostContext,\n\tsortInput,\n\thasDuplicate,\n\n\t// Local document vars\n\tsetDocument,\n\tdocument,\n\tdocElem,\n\tdocumentIsHTML,\n\trbuggyQSA,\n\trbuggyMatches,\n\tmatches,\n\tcontains,\n\n\t// Instance-specific data\n\texpando = \"sizzle\" + 1 * new Date(),\n\tpreferredDoc = window.document,\n\tdirruns = 0,\n\tdone = 0,\n\tclassCache = createCache(),\n\ttokenCache = createCache(),\n\tcompilerCache = createCache(),\n\tsortOrder = function( a, b ) {\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t}\n\t\treturn 0;\n\t},\n\n\t// Instance methods\n\thasOwn = ({}).hasOwnProperty,\n\tarr = [],\n\tpop = arr.pop,\n\tpush_native = arr.push,\n\tpush = arr.push,\n\tslice = arr.slice,\n\t// Use a stripped-down indexOf as it's faster than native\n\t// https://jsperf.com/thor-indexof-vs-for/5\n\tindexOf = function( list, elem ) {\n\t\tvar i = 0,\n\t\t\tlen = list.length;\n\t\tfor ( ; i < len; i++ ) {\n\t\t\tif ( list[i] === elem ) {\n\t\t\t\treturn i;\n\t\t\t}\n\t\t}\n\t\treturn -1;\n\t},\n\n\tbooleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n\n\t// Regular expressions\n\n\t// http://www.w3.org/TR/css3-selectors/#whitespace\n\twhitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\n\n\t// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n\tidentifier = \"(?:\\\\\\\\.|[\\\\w-]|[^\\0-\\\\xa0])+\",\n\n\t// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n\tattributes = \"\\\\[\" + whitespace + \"*(\" + identifier + \")(?:\" + whitespace +\n\t\t// Operator (capture 2)\n\t\t\"*([*^$|!~]?=)\" + whitespace +\n\t\t// \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\n\t\t\"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\n\t\t\"*\\\\]\",\n\n\tpseudos = \":(\" + identifier + \")(?:\\\\((\" +\n\t\t// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n\t\t// 1. quoted (capture 3; capture 4 or capture 5)\n\t\t\"('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\n\t\t// 2. simple (capture 6)\n\t\t\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\n\t\t// 3. anything else (capture 2)\n\t\t\".*\" +\n\t\t\")\\\\)|)\",\n\n\t// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n\trwhitespace = new RegExp( whitespace + \"+\", \"g\" ),\n\trtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\n\n\trcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\n\trcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\n\n\trattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\n\n\trpseudo = new RegExp( pseudos ),\n\tridentifier = new RegExp( \"^\" + identifier + \"$\" ),\n\n\tmatchExpr = {\n\t\t\"ID\": new RegExp( \"^#(\" + identifier + \")\" ),\n\t\t\"CLASS\": new RegExp( \"^\\\\.(\" + identifier + \")\" ),\n\t\t\"TAG\": new RegExp( \"^(\" + identifier + \"|[*])\" ),\n\t\t\"ATTR\": new RegExp( \"^\" + attributes ),\n\t\t\"PSEUDO\": new RegExp( \"^\" + pseudos ),\n\t\t\"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\n\t\t\t\"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\n\t\t\t\"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\n\t\t\"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\n\t\t// For use in libraries implementing .is()\n\t\t// We use this for POS matching in `select`\n\t\t\"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\n\t\t\twhitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\n\t},\n\n\trinputs = /^(?:input|select|textarea|button)$/i,\n\trheader = /^h\\d$/i,\n\n\trnative = /^[^{]+\\{\\s*\\[native \\w/,\n\n\t// Easily-parseable/retrievable ID or TAG or CLASS selectors\n\trquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\n\trsibling = /[+~]/,\n\n\t// CSS escapes\n\t// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n\trunescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\n\tfunescape = function( _, escaped, escapedWhitespace ) {\n\t\tvar high = \"0x\" + escaped - 0x10000;\n\t\t// NaN means non-codepoint\n\t\t// Support: Firefox<24\n\t\t// Workaround erroneous numeric interpretation of +\"0x\"\n\t\treturn high !== high || escapedWhitespace ?\n\t\t\tescaped :\n\t\t\thigh < 0 ?\n\t\t\t\t// BMP codepoint\n\t\t\t\tString.fromCharCode( high + 0x10000 ) :\n\t\t\t\t// Supplemental Plane codepoint (surrogate pair)\n\t\t\t\tString.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\n\t},\n\n\t// CSS string/identifier serialization\n\t// https://drafts.csswg.org/cssom/#common-serializing-idioms\n\trcssescape = /([\\0-\\x1f\\x7f]|^-?\\d)|^-$|[^\\0-\\x1f\\x7f-\\uFFFF\\w-]/g,\n\tfcssescape = function( ch, asCodePoint ) {\n\t\tif ( asCodePoint ) {\n\n\t\t\t// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER\n\t\t\tif ( ch === \"\\0\" ) {\n\t\t\t\treturn \"\\uFFFD\";\n\t\t\t}\n\n\t\t\t// Control characters and (dependent upon position) numbers get escaped as code points\n\t\t\treturn ch.slice( 0, -1 ) + \"\\\\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + \" \";\n\t\t}\n\n\t\t// Other potentially-special ASCII characters get backslash-escaped\n\t\treturn \"\\\\\" + ch;\n\t},\n\n\t// Used for iframes\n\t// See setDocument()\n\t// Removing the function wrapper causes a \"Permission Denied\"\n\t// error in IE\n\tunloadHandler = function() {\n\t\tsetDocument();\n\t},\n\n\tdisabledAncestor = addCombinator(\n\t\tfunction( elem ) {\n\t\t\treturn elem.disabled === true && (\"form\" in elem || \"label\" in elem);\n\t\t},\n\t\t{ dir: \"parentNode\", next: \"legend\" }\n\t);\n\n// Optimize for push.apply( _, NodeList )\ntry {\n\tpush.apply(\n\t\t(arr = slice.call( preferredDoc.childNodes )),\n\t\tpreferredDoc.childNodes\n\t);\n\t// Support: Android<4.0\n\t// Detect silently failing push.apply\n\tarr[ preferredDoc.childNodes.length ].nodeType;\n} catch ( e ) {\n\tpush = { apply: arr.length ?\n\n\t\t// Leverage slice if possible\n\t\tfunction( target, els ) {\n\t\t\tpush_native.apply( target, slice.call(els) );\n\t\t} :\n\n\t\t// Support: IE<9\n\t\t// Otherwise append directly\n\t\tfunction( target, els ) {\n\t\t\tvar j = target.length,\n\t\t\t\ti = 0;\n\t\t\t// Can't trust NodeList.length\n\t\t\twhile ( (target[j++] = els[i++]) ) {}\n\t\t\ttarget.length = j - 1;\n\t\t}\n\t};\n}\n\nfunction Sizzle( selector, context, results, seed ) {\n\tvar m, i, elem, nid, match, groups, newSelector,\n\t\tnewContext = context && context.ownerDocument,\n\n\t\t// nodeType defaults to 9, since context defaults to document\n\t\tnodeType = context ? context.nodeType : 9;\n\n\tresults = results || [];\n\n\t// Return early from calls with invalid selector or context\n\tif ( typeof selector !== \"string\" || !selector ||\n\t\tnodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {\n\n\t\treturn results;\n\t}\n\n\t// Try to shortcut find operations (as opposed to filters) in HTML documents\n\tif ( !seed ) {\n\n\t\tif ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {\n\t\t\tsetDocument( context );\n\t\t}\n\t\tcontext = context || document;\n\n\t\tif ( documentIsHTML ) {\n\n\t\t\t// If the selector is sufficiently simple, try using a \"get*By*\" DOM method\n\t\t\t// (excepting DocumentFragment context, where the methods don't exist)\n\t\t\tif ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {\n\n\t\t\t\t// ID selector\n\t\t\t\tif ( (m = match[1]) ) {\n\n\t\t\t\t\t// Document context\n\t\t\t\t\tif ( nodeType === 9 ) {\n\t\t\t\t\t\tif ( (elem = context.getElementById( m )) ) {\n\n\t\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\t\tif ( elem.id === m ) {\n\t\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t// Element context\n\t\t\t\t\t} else {\n\n\t\t\t\t\t\t// Support: IE, Opera, Webkit\n\t\t\t\t\t\t// TODO: identify versions\n\t\t\t\t\t\t// getElementById can match elements by name instead of ID\n\t\t\t\t\t\tif ( newContext && (elem = newContext.getElementById( m )) &&\n\t\t\t\t\t\t\tcontains( context, elem ) &&\n\t\t\t\t\t\t\telem.id === m ) {\n\n\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\treturn results;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t// Type selector\n\t\t\t\t} else if ( match[2] ) {\n\t\t\t\t\tpush.apply( results, context.getElementsByTagName( selector ) );\n\t\t\t\t\treturn results;\n\n\t\t\t\t// Class selector\n\t\t\t\t} else if ( (m = match[3]) && support.getElementsByClassName &&\n\t\t\t\t\tcontext.getElementsByClassName ) {\n\n\t\t\t\t\tpush.apply( results, context.getElementsByClassName( m ) );\n\t\t\t\t\treturn results;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Take advantage of querySelectorAll\n\t\t\tif ( support.qsa &&\n\t\t\t\t!compilerCache[ selector + \" \" ] &&\n\t\t\t\t(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {\n\n\t\t\t\tif ( nodeType !== 1 ) {\n\t\t\t\t\tnewContext = context;\n\t\t\t\t\tnewSelector = selector;\n\n\t\t\t\t// qSA looks outside Element context, which is not what we want\n\t\t\t\t// Thanks to Andrew Dupont for this workaround technique\n\t\t\t\t// Support: IE <=8\n\t\t\t\t// Exclude object elements\n\t\t\t\t} else if ( context.nodeName.toLowerCase() !== \"object\" ) {\n\n\t\t\t\t\t// Capture the context ID, setting it first if necessary\n\t\t\t\t\tif ( (nid = context.getAttribute( \"id\" )) ) {\n\t\t\t\t\t\tnid = nid.replace( rcssescape, fcssescape );\n\t\t\t\t\t} else {\n\t\t\t\t\t\tcontext.setAttribute( \"id\", (nid = expando) );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Prefix every selector in the list\n\t\t\t\t\tgroups = tokenize( selector );\n\t\t\t\t\ti = groups.length;\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tgroups[i] = \"#\" + nid + \" \" + toSelector( groups[i] );\n\t\t\t\t\t}\n\t\t\t\t\tnewSelector = groups.join( \",\" );\n\n\t\t\t\t\t// Expand context for sibling selectors\n\t\t\t\t\tnewContext = rsibling.test( selector ) && testContext( context.parentNode ) ||\n\t\t\t\t\t\tcontext;\n\t\t\t\t}\n\n\t\t\t\tif ( newSelector ) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tpush.apply( results,\n\t\t\t\t\t\t\tnewContext.querySelectorAll( newSelector )\n\t\t\t\t\t\t);\n\t\t\t\t\t\treturn results;\n\t\t\t\t\t} catch ( qsaError ) {\n\t\t\t\t\t} finally {\n\t\t\t\t\t\tif ( nid === expando ) {\n\t\t\t\t\t\t\tcontext.removeAttribute( \"id\" );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// All others\n\treturn select( selector.replace( rtrim, \"$1\" ), context, results, seed );\n}\n\n/**\n * Create key-value caches of limited size\n * @returns {function(string, object)} Returns the Object data after storing it on itself with\n *\tproperty name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n *\tdeleting the oldest entry\n */\nfunction createCache() {\n\tvar keys = [];\n\n\tfunction cache( key, value ) {\n\t\t// Use (key + \" \") to avoid collision with native prototype properties (see Issue #157)\n\t\tif ( keys.push( key + \" \" ) > Expr.cacheLength ) {\n\t\t\t// Only keep the most recent entries\n\t\t\tdelete cache[ keys.shift() ];\n\t\t}\n\t\treturn (cache[ key + \" \" ] = value);\n\t}\n\treturn cache;\n}\n\n/**\n * Mark a function for special use by Sizzle\n * @param {Function} fn The function to mark\n */\nfunction markFunction( fn ) {\n\tfn[ expando ] = true;\n\treturn fn;\n}\n\n/**\n * Support testing using an element\n * @param {Function} fn Passed the created element and returns a boolean result\n */\nfunction assert( fn ) {\n\tvar el = document.createElement(\"fieldset\");\n\n\ttry {\n\t\treturn !!fn( el );\n\t} catch (e) {\n\t\treturn false;\n\t} finally {\n\t\t// Remove from its parent by default\n\t\tif ( el.parentNode ) {\n\t\t\tel.parentNode.removeChild( el );\n\t\t}\n\t\t// release memory in IE\n\t\tel = null;\n\t}\n}\n\n/**\n * Adds the same handler for all of the specified attrs\n * @param {String} attrs Pipe-separated list of attributes\n * @param {Function} handler The method that will be applied\n */\nfunction addHandle( attrs, handler ) {\n\tvar arr = attrs.split(\"|\"),\n\t\ti = arr.length;\n\n\twhile ( i-- ) {\n\t\tExpr.attrHandle[ arr[i] ] = handler;\n\t}\n}\n\n/**\n * Checks document order of two siblings\n * @param {Element} a\n * @param {Element} b\n * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n */\nfunction siblingCheck( a, b ) {\n\tvar cur = b && a,\n\t\tdiff = cur && a.nodeType === 1 && b.nodeType === 1 &&\n\t\t\ta.sourceIndex - b.sourceIndex;\n\n\t// Use IE sourceIndex if available on both nodes\n\tif ( diff ) {\n\t\treturn diff;\n\t}\n\n\t// Check if b follows a\n\tif ( cur ) {\n\t\twhile ( (cur = cur.nextSibling) ) {\n\t\t\tif ( cur === b ) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t}\n\t}\n\n\treturn a ? 1 : -1;\n}\n\n/**\n * Returns a function to use in pseudos for input types\n * @param {String} type\n */\nfunction createInputPseudo( type ) {\n\treturn function( elem ) {\n\t\tvar name = elem.nodeName.toLowerCase();\n\t\treturn name === \"input\" && elem.type === type;\n\t};\n}\n\n/**\n * Returns a function to use in pseudos for buttons\n * @param {String} type\n */\nfunction createButtonPseudo( type ) {\n\treturn function( elem ) {\n\t\tvar name = elem.nodeName.toLowerCase();\n\t\treturn (name === \"input\" || name === \"button\") && elem.type === type;\n\t};\n}\n\n/**\n * Returns a function to use in pseudos for :enabled/:disabled\n * @param {Boolean} disabled true for :disabled; false for :enabled\n */\nfunction createDisabledPseudo( disabled ) {\n\n\t// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable\n\treturn function( elem ) {\n\n\t\t// Only certain elements can match :enabled or :disabled\n\t\t// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled\n\t\t// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled\n\t\tif ( \"form\" in elem ) {\n\n\t\t\t// Check for inherited disabledness on relevant non-disabled elements:\n\t\t\t// * listed form-associated elements in a disabled fieldset\n\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#category-listed\n\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled\n\t\t\t// * option elements in a disabled optgroup\n\t\t\t//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled\n\t\t\t// All such elements have a \"form\" property.\n\t\t\tif ( elem.parentNode && elem.disabled === false ) {\n\n\t\t\t\t// Option elements defer to a parent optgroup if present\n\t\t\t\tif ( \"label\" in elem ) {\n\t\t\t\t\tif ( \"label\" in elem.parentNode ) {\n\t\t\t\t\t\treturn elem.parentNode.disabled === disabled;\n\t\t\t\t\t} else {\n\t\t\t\t\t\treturn elem.disabled === disabled;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Support: IE 6 - 11\n\t\t\t\t// Use the isDisabled shortcut property to check for disabled fieldset ancestors\n\t\t\t\treturn elem.isDisabled === disabled ||\n\n\t\t\t\t\t// Where there is no isDisabled, check manually\n\t\t\t\t\t/* jshint -W018 */\n\t\t\t\t\telem.isDisabled !== !disabled &&\n\t\t\t\t\t\tdisabledAncestor( elem ) === disabled;\n\t\t\t}\n\n\t\t\treturn elem.disabled === disabled;\n\n\t\t// Try to winnow out elements that can't be disabled before trusting the disabled property.\n\t\t// Some victims get caught in our net (label, legend, menu, track), but it shouldn't\n\t\t// even exist on them, let alone have a boolean value.\n\t\t} else if ( \"label\" in elem ) {\n\t\t\treturn elem.disabled === disabled;\n\t\t}\n\n\t\t// Remaining elements are neither :enabled nor :disabled\n\t\treturn false;\n\t};\n}\n\n/**\n * Returns a function to use in pseudos for positionals\n * @param {Function} fn\n */\nfunction createPositionalPseudo( fn ) {\n\treturn markFunction(function( argument ) {\n\t\targument = +argument;\n\t\treturn markFunction(function( seed, matches ) {\n\t\t\tvar j,\n\t\t\t\tmatchIndexes = fn( [], seed.length, argument ),\n\t\t\t\ti = matchIndexes.length;\n\n\t\t\t// Match elements found at the specified indexes\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( seed[ (j = matchIndexes[i]) ] ) {\n\t\t\t\t\tseed[j] = !(matches[j] = seed[j]);\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t});\n}\n\n/**\n * Checks a node for validity as a Sizzle context\n * @param {Element|Object=} context\n * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n */\nfunction testContext( context ) {\n\treturn context && typeof context.getElementsByTagName !== \"undefined\" && context;\n}\n\n// Expose support vars for convenience\nsupport = Sizzle.support = {};\n\n/**\n * Detects XML nodes\n * @param {Element|Object} elem An element or a document\n * @returns {Boolean} True iff elem is a non-HTML XML node\n */\nisXML = Sizzle.isXML = function( elem ) {\n\t// documentElement is verified for cases where it doesn't yet exist\n\t// (such as loading iframes in IE - #4833)\n\tvar documentElement = elem && (elem.ownerDocument || elem).documentElement;\n\treturn documentElement ? documentElement.nodeName !== \"HTML\" : false;\n};\n\n/**\n * Sets document-related variables once based on the current document\n * @param {Element|Object} [doc] An element or document object to use to set the document\n * @returns {Object} Returns the current document\n */\nsetDocument = Sizzle.setDocument = function( node ) {\n\tvar hasCompare, subWindow,\n\t\tdoc = node ? node.ownerDocument || node : preferredDoc;\n\n\t// Return early if doc is invalid or already selected\n\tif ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {\n\t\treturn document;\n\t}\n\n\t// Update global variables\n\tdocument = doc;\n\tdocElem = document.documentElement;\n\tdocumentIsHTML = !isXML( document );\n\n\t// Support: IE 9-11, Edge\n\t// Accessing iframe documents after unload throws \"permission denied\" errors (jQuery #13936)\n\tif ( preferredDoc !== document &&\n\t\t(subWindow = document.defaultView) && subWindow.top !== subWindow ) {\n\n\t\t// Support: IE 11, Edge\n\t\tif ( subWindow.addEventListener ) {\n\t\t\tsubWindow.addEventListener( \"unload\", unloadHandler, false );\n\n\t\t// Support: IE 9 - 10 only\n\t\t} else if ( subWindow.attachEvent ) {\n\t\t\tsubWindow.attachEvent( \"onunload\", unloadHandler );\n\t\t}\n\t}\n\n\t/* Attributes\n\t---------------------------------------------------------------------- */\n\n\t// Support: IE<8\n\t// Verify that getAttribute really returns attributes and not properties\n\t// (excepting IE8 booleans)\n\tsupport.attributes = assert(function( el ) {\n\t\tel.className = \"i\";\n\t\treturn !el.getAttribute(\"className\");\n\t});\n\n\t/* getElement(s)By*\n\t---------------------------------------------------------------------- */\n\n\t// Check if getElementsByTagName(\"*\") returns only elements\n\tsupport.getElementsByTagName = assert(function( el ) {\n\t\tel.appendChild( document.createComment(\"\") );\n\t\treturn !el.getElementsByTagName(\"*\").length;\n\t});\n\n\t// Support: IE<9\n\tsupport.getElementsByClassName = rnative.test( document.getElementsByClassName );\n\n\t// Support: IE<10\n\t// Check if getElementById returns elements by name\n\t// The broken getElementById methods don't pick up programmatically-set names,\n\t// so use a roundabout getElementsByName test\n\tsupport.getById = assert(function( el ) {\n\t\tdocElem.appendChild( el ).id = expando;\n\t\treturn !document.getElementsByName || !document.getElementsByName( expando ).length;\n\t});\n\n\t// ID filter and find\n\tif ( support.getById ) {\n\t\tExpr.filter[\"ID\"] = function( id ) {\n\t\t\tvar attrId = id.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\treturn elem.getAttribute(\"id\") === attrId;\n\t\t\t};\n\t\t};\n\t\tExpr.find[\"ID\"] = function( id, context ) {\n\t\t\tif ( typeof context.getElementById !== \"undefined\" && documentIsHTML ) {\n\t\t\t\tvar elem = context.getElementById( id );\n\t\t\t\treturn elem ? [ elem ] : [];\n\t\t\t}\n\t\t};\n\t} else {\n\t\tExpr.filter[\"ID\"] =  function( id ) {\n\t\t\tvar attrId = id.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\tvar node = typeof elem.getAttributeNode !== \"undefined\" &&\n\t\t\t\t\telem.getAttributeNode(\"id\");\n\t\t\t\treturn node && node.value === attrId;\n\t\t\t};\n\t\t};\n\n\t\t// Support: IE 6 - 7 only\n\t\t// getElementById is not reliable as a find shortcut\n\t\tExpr.find[\"ID\"] = function( id, context ) {\n\t\t\tif ( typeof context.getElementById !== \"undefined\" && documentIsHTML ) {\n\t\t\t\tvar node, i, elems,\n\t\t\t\t\telem = context.getElementById( id );\n\n\t\t\t\tif ( elem ) {\n\n\t\t\t\t\t// Verify the id attribute\n\t\t\t\t\tnode = elem.getAttributeNode(\"id\");\n\t\t\t\t\tif ( node && node.value === id ) {\n\t\t\t\t\t\treturn [ elem ];\n\t\t\t\t\t}\n\n\t\t\t\t\t// Fall back on getElementsByName\n\t\t\t\t\telems = context.getElementsByName( id );\n\t\t\t\t\ti = 0;\n\t\t\t\t\twhile ( (elem = elems[i++]) ) {\n\t\t\t\t\t\tnode = elem.getAttributeNode(\"id\");\n\t\t\t\t\t\tif ( node && node.value === id ) {\n\t\t\t\t\t\t\treturn [ elem ];\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn [];\n\t\t\t}\n\t\t};\n\t}\n\n\t// Tag\n\tExpr.find[\"TAG\"] = support.getElementsByTagName ?\n\t\tfunction( tag, context ) {\n\t\t\tif ( typeof context.getElementsByTagName !== \"undefined\" ) {\n\t\t\t\treturn context.getElementsByTagName( tag );\n\n\t\t\t// DocumentFragment nodes don't have gEBTN\n\t\t\t} else if ( support.qsa ) {\n\t\t\t\treturn context.querySelectorAll( tag );\n\t\t\t}\n\t\t} :\n\n\t\tfunction( tag, context ) {\n\t\t\tvar elem,\n\t\t\t\ttmp = [],\n\t\t\t\ti = 0,\n\t\t\t\t// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too\n\t\t\t\tresults = context.getElementsByTagName( tag );\n\n\t\t\t// Filter out possible comments\n\t\t\tif ( tag === \"*\" ) {\n\t\t\t\twhile ( (elem = results[i++]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\t\t\t\t\t\ttmp.push( elem );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn tmp;\n\t\t\t}\n\t\t\treturn results;\n\t\t};\n\n\t// Class\n\tExpr.find[\"CLASS\"] = support.getElementsByClassName && function( className, context ) {\n\t\tif ( typeof context.getElementsByClassName !== \"undefined\" && documentIsHTML ) {\n\t\t\treturn context.getElementsByClassName( className );\n\t\t}\n\t};\n\n\t/* QSA/matchesSelector\n\t---------------------------------------------------------------------- */\n\n\t// QSA and matchesSelector support\n\n\t// matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n\trbuggyMatches = [];\n\n\t// qSa(:focus) reports false when true (Chrome 21)\n\t// We allow this because of a bug in IE8/9 that throws an error\n\t// whenever `document.activeElement` is accessed on an iframe\n\t// So, we allow :focus to pass through QSA all the time to avoid the IE error\n\t// See https://bugs.jquery.com/ticket/13378\n\trbuggyQSA = [];\n\n\tif ( (support.qsa = rnative.test( document.querySelectorAll )) ) {\n\t\t// Build QSA regex\n\t\t// Regex strategy adopted from Diego Perini\n\t\tassert(function( el ) {\n\t\t\t// Select is set to empty string on purpose\n\t\t\t// This is to test IE's treatment of not explicitly\n\t\t\t// setting a boolean content attribute,\n\t\t\t// since its presence should be enough\n\t\t\t// https://bugs.jquery.com/ticket/12359\n\t\t\tdocElem.appendChild( el ).innerHTML = \"<a id='\" + expando + \"'></a>\" +\n\t\t\t\t\"<select id='\" + expando + \"-\\r\\\\' msallowcapture=''>\" +\n\t\t\t\t\"<option selected=''></option></select>\";\n\n\t\t\t// Support: IE8, Opera 11-12.16\n\t\t\t// Nothing should be selected when empty strings follow ^= or $= or *=\n\t\t\t// The test attribute must be unknown in Opera but \"safe\" for WinRT\n\t\t\t// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n\t\t\tif ( el.querySelectorAll(\"[msallowcapture^='']\").length ) {\n\t\t\t\trbuggyQSA.push( \"[*^$]=\" + whitespace + \"*(?:''|\\\"\\\")\" );\n\t\t\t}\n\n\t\t\t// Support: IE8\n\t\t\t// Boolean attributes and \"value\" are not treated correctly\n\t\t\tif ( !el.querySelectorAll(\"[selected]\").length ) {\n\t\t\t\trbuggyQSA.push( \"\\\\[\" + whitespace + \"*(?:value|\" + booleans + \")\" );\n\t\t\t}\n\n\t\t\t// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+\n\t\t\tif ( !el.querySelectorAll( \"[id~=\" + expando + \"-]\" ).length ) {\n\t\t\t\trbuggyQSA.push(\"~=\");\n\t\t\t}\n\n\t\t\t// Webkit/Opera - :checked should return selected option elements\n\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\t// IE8 throws error here and will not see later tests\n\t\t\tif ( !el.querySelectorAll(\":checked\").length ) {\n\t\t\t\trbuggyQSA.push(\":checked\");\n\t\t\t}\n\n\t\t\t// Support: Safari 8+, iOS 8+\n\t\t\t// https://bugs.webkit.org/show_bug.cgi?id=136851\n\t\t\t// In-page `selector#id sibling-combinator selector` fails\n\t\t\tif ( !el.querySelectorAll( \"a#\" + expando + \"+*\" ).length ) {\n\t\t\t\trbuggyQSA.push(\".#.+[+~]\");\n\t\t\t}\n\t\t});\n\n\t\tassert(function( el ) {\n\t\t\tel.innerHTML = \"<a href='' disabled='disabled'></a>\" +\n\t\t\t\t\"<select disabled='disabled'><option/></select>\";\n\n\t\t\t// Support: Windows 8 Native Apps\n\t\t\t// The type and name attributes are restricted during .innerHTML assignment\n\t\t\tvar input = document.createElement(\"input\");\n\t\t\tinput.setAttribute( \"type\", \"hidden\" );\n\t\t\tel.appendChild( input ).setAttribute( \"name\", \"D\" );\n\n\t\t\t// Support: IE8\n\t\t\t// Enforce case-sensitivity of name attribute\n\t\t\tif ( el.querySelectorAll(\"[name=d]\").length ) {\n\t\t\t\trbuggyQSA.push( \"name\" + whitespace + \"*[*^$|!~]?=\" );\n\t\t\t}\n\n\t\t\t// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n\t\t\t// IE8 throws error here and will not see later tests\n\t\t\tif ( el.querySelectorAll(\":enabled\").length !== 2 ) {\n\t\t\t\trbuggyQSA.push( \":enabled\", \":disabled\" );\n\t\t\t}\n\n\t\t\t// Support: IE9-11+\n\t\t\t// IE's :disabled selector does not pick up the children of disabled fieldsets\n\t\t\tdocElem.appendChild( el ).disabled = true;\n\t\t\tif ( el.querySelectorAll(\":disabled\").length !== 2 ) {\n\t\t\t\trbuggyQSA.push( \":enabled\", \":disabled\" );\n\t\t\t}\n\n\t\t\t// Opera 10-11 does not throw on post-comma invalid pseudos\n\t\t\tel.querySelectorAll(\"*,:x\");\n\t\t\trbuggyQSA.push(\",.*:\");\n\t\t});\n\t}\n\n\tif ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||\n\t\tdocElem.webkitMatchesSelector ||\n\t\tdocElem.mozMatchesSelector ||\n\t\tdocElem.oMatchesSelector ||\n\t\tdocElem.msMatchesSelector) )) ) {\n\n\t\tassert(function( el ) {\n\t\t\t// Check to see if it's possible to do matchesSelector\n\t\t\t// on a disconnected node (IE 9)\n\t\t\tsupport.disconnectedMatch = matches.call( el, \"*\" );\n\n\t\t\t// This should fail with an exception\n\t\t\t// Gecko does not error, returns false instead\n\t\t\tmatches.call( el, \"[s!='']:x\" );\n\t\t\trbuggyMatches.push( \"!=\", pseudos );\n\t\t});\n\t}\n\n\trbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join(\"|\") );\n\trbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join(\"|\") );\n\n\t/* Contains\n\t---------------------------------------------------------------------- */\n\thasCompare = rnative.test( docElem.compareDocumentPosition );\n\n\t// Element contains another\n\t// Purposefully self-exclusive\n\t// As in, an element does not contain itself\n\tcontains = hasCompare || rnative.test( docElem.contains ) ?\n\t\tfunction( a, b ) {\n\t\t\tvar adown = a.nodeType === 9 ? a.documentElement : a,\n\t\t\t\tbup = b && b.parentNode;\n\t\t\treturn a === bup || !!( bup && bup.nodeType === 1 && (\n\t\t\t\tadown.contains ?\n\t\t\t\t\tadown.contains( bup ) :\n\t\t\t\t\ta.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16\n\t\t\t));\n\t\t} :\n\t\tfunction( a, b ) {\n\t\t\tif ( b ) {\n\t\t\t\twhile ( (b = b.parentNode) ) {\n\t\t\t\t\tif ( b === a ) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn false;\n\t\t};\n\n\t/* Sorting\n\t---------------------------------------------------------------------- */\n\n\t// Document order sorting\n\tsortOrder = hasCompare ?\n\tfunction( a, b ) {\n\n\t\t// Flag for duplicate removal\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t\treturn 0;\n\t\t}\n\n\t\t// Sort on method existence if only one input has compareDocumentPosition\n\t\tvar compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n\t\tif ( compare ) {\n\t\t\treturn compare;\n\t\t}\n\n\t\t// Calculate position if both inputs belong to the same document\n\t\tcompare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?\n\t\t\ta.compareDocumentPosition( b ) :\n\n\t\t\t// Otherwise we know they are disconnected\n\t\t\t1;\n\n\t\t// Disconnected nodes\n\t\tif ( compare & 1 ||\n\t\t\t(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {\n\n\t\t\t// Choose the first element that is related to our preferred document\n\t\t\tif ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t\tif ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\t// Maintain original order\n\t\t\treturn sortInput ?\n\t\t\t\t( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n\t\t\t\t0;\n\t\t}\n\n\t\treturn compare & 4 ? -1 : 1;\n\t} :\n\tfunction( a, b ) {\n\t\t// Exit early if the nodes are identical\n\t\tif ( a === b ) {\n\t\t\thasDuplicate = true;\n\t\t\treturn 0;\n\t\t}\n\n\t\tvar cur,\n\t\t\ti = 0,\n\t\t\taup = a.parentNode,\n\t\t\tbup = b.parentNode,\n\t\t\tap = [ a ],\n\t\t\tbp = [ b ];\n\n\t\t// Parentless nodes are either documents or disconnected\n\t\tif ( !aup || !bup ) {\n\t\t\treturn a === document ? -1 :\n\t\t\t\tb === document ? 1 :\n\t\t\t\taup ? -1 :\n\t\t\t\tbup ? 1 :\n\t\t\t\tsortInput ?\n\t\t\t\t( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :\n\t\t\t\t0;\n\n\t\t// If the nodes are siblings, we can do a quick check\n\t\t} else if ( aup === bup ) {\n\t\t\treturn siblingCheck( a, b );\n\t\t}\n\n\t\t// Otherwise we need full lists of their ancestors for comparison\n\t\tcur = a;\n\t\twhile ( (cur = cur.parentNode) ) {\n\t\t\tap.unshift( cur );\n\t\t}\n\t\tcur = b;\n\t\twhile ( (cur = cur.parentNode) ) {\n\t\t\tbp.unshift( cur );\n\t\t}\n\n\t\t// Walk down the tree looking for a discrepancy\n\t\twhile ( ap[i] === bp[i] ) {\n\t\t\ti++;\n\t\t}\n\n\t\treturn i ?\n\t\t\t// Do a sibling check if the nodes have a common ancestor\n\t\t\tsiblingCheck( ap[i], bp[i] ) :\n\n\t\t\t// Otherwise nodes in our document sort first\n\t\t\tap[i] === preferredDoc ? -1 :\n\t\t\tbp[i] === preferredDoc ? 1 :\n\t\t\t0;\n\t};\n\n\treturn document;\n};\n\nSizzle.matches = function( expr, elements ) {\n\treturn Sizzle( expr, null, null, elements );\n};\n\nSizzle.matchesSelector = function( elem, expr ) {\n\t// Set document vars if needed\n\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\t\tsetDocument( elem );\n\t}\n\n\t// Make sure that attribute selectors are quoted\n\texpr = expr.replace( rattributeQuotes, \"='$1']\" );\n\n\tif ( support.matchesSelector && documentIsHTML &&\n\t\t!compilerCache[ expr + \" \" ] &&\n\t\t( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&\n\t\t( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {\n\n\t\ttry {\n\t\t\tvar ret = matches.call( elem, expr );\n\n\t\t\t// IE 9's matchesSelector returns false on disconnected nodes\n\t\t\tif ( ret || support.disconnectedMatch ||\n\t\t\t\t\t// As well, disconnected nodes are said to be in a document\n\t\t\t\t\t// fragment in IE 9\n\t\t\t\t\telem.document && elem.document.nodeType !== 11 ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\t\t} catch (e) {}\n\t}\n\n\treturn Sizzle( expr, document, null, [ elem ] ).length > 0;\n};\n\nSizzle.contains = function( context, elem ) {\n\t// Set document vars if needed\n\tif ( ( context.ownerDocument || context ) !== document ) {\n\t\tsetDocument( context );\n\t}\n\treturn contains( context, elem );\n};\n\nSizzle.attr = function( elem, name ) {\n\t// Set document vars if needed\n\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\t\tsetDocument( elem );\n\t}\n\n\tvar fn = Expr.attrHandle[ name.toLowerCase() ],\n\t\t// Don't get fooled by Object.prototype properties (jQuery #13807)\n\t\tval = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?\n\t\t\tfn( elem, name, !documentIsHTML ) :\n\t\t\tundefined;\n\n\treturn val !== undefined ?\n\t\tval :\n\t\tsupport.attributes || !documentIsHTML ?\n\t\t\telem.getAttribute( name ) :\n\t\t\t(val = elem.getAttributeNode(name)) && val.specified ?\n\t\t\t\tval.value :\n\t\t\t\tnull;\n};\n\nSizzle.escape = function( sel ) {\n\treturn (sel + \"\").replace( rcssescape, fcssescape );\n};\n\nSizzle.error = function( msg ) {\n\tthrow new Error( \"Syntax error, unrecognized expression: \" + msg );\n};\n\n/**\n * Document sorting and removing duplicates\n * @param {ArrayLike} results\n */\nSizzle.uniqueSort = function( results ) {\n\tvar elem,\n\t\tduplicates = [],\n\t\tj = 0,\n\t\ti = 0;\n\n\t// Unless we *know* we can detect duplicates, assume their presence\n\thasDuplicate = !support.detectDuplicates;\n\tsortInput = !support.sortStable && results.slice( 0 );\n\tresults.sort( sortOrder );\n\n\tif ( hasDuplicate ) {\n\t\twhile ( (elem = results[i++]) ) {\n\t\t\tif ( elem === results[ i ] ) {\n\t\t\t\tj = duplicates.push( i );\n\t\t\t}\n\t\t}\n\t\twhile ( j-- ) {\n\t\t\tresults.splice( duplicates[ j ], 1 );\n\t\t}\n\t}\n\n\t// Clear input after sorting to release objects\n\t// See https://github.com/jquery/sizzle/pull/225\n\tsortInput = null;\n\n\treturn results;\n};\n\n/**\n * Utility function for retrieving the text value of an array of DOM nodes\n * @param {Array|Element} elem\n */\ngetText = Sizzle.getText = function( elem ) {\n\tvar node,\n\t\tret = \"\",\n\t\ti = 0,\n\t\tnodeType = elem.nodeType;\n\n\tif ( !nodeType ) {\n\t\t// If no nodeType, this is expected to be an array\n\t\twhile ( (node = elem[i++]) ) {\n\t\t\t// Do not traverse comment nodes\n\t\t\tret += getText( node );\n\t\t}\n\t} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {\n\t\t// Use textContent for elements\n\t\t// innerText usage removed for consistency of new lines (jQuery #11153)\n\t\tif ( typeof elem.textContent === \"string\" ) {\n\t\t\treturn elem.textContent;\n\t\t} else {\n\t\t\t// Traverse its children\n\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\t\t\t\tret += getText( elem );\n\t\t\t}\n\t\t}\n\t} else if ( nodeType === 3 || nodeType === 4 ) {\n\t\treturn elem.nodeValue;\n\t}\n\t// Do not include comment or processing instruction nodes\n\n\treturn ret;\n};\n\nExpr = Sizzle.selectors = {\n\n\t// Can be adjusted by the user\n\tcacheLength: 50,\n\n\tcreatePseudo: markFunction,\n\n\tmatch: matchExpr,\n\n\tattrHandle: {},\n\n\tfind: {},\n\n\trelative: {\n\t\t\">\": { dir: \"parentNode\", first: true },\n\t\t\" \": { dir: \"parentNode\" },\n\t\t\"+\": { dir: \"previousSibling\", first: true },\n\t\t\"~\": { dir: \"previousSibling\" }\n\t},\n\n\tpreFilter: {\n\t\t\"ATTR\": function( match ) {\n\t\t\tmatch[1] = match[1].replace( runescape, funescape );\n\n\t\t\t// Move the given value to match[3] whether quoted or unquoted\n\t\t\tmatch[3] = ( match[3] || match[4] || match[5] || \"\" ).replace( runescape, funescape );\n\n\t\t\tif ( match[2] === \"~=\" ) {\n\t\t\t\tmatch[3] = \" \" + match[3] + \" \";\n\t\t\t}\n\n\t\t\treturn match.slice( 0, 4 );\n\t\t},\n\n\t\t\"CHILD\": function( match ) {\n\t\t\t/* matches from matchExpr[\"CHILD\"]\n\t\t\t\t1 type (only|nth|...)\n\t\t\t\t2 what (child|of-type)\n\t\t\t\t3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n\t\t\t\t4 xn-component of xn+y argument ([+-]?\\d*n|)\n\t\t\t\t5 sign of xn-component\n\t\t\t\t6 x of xn-component\n\t\t\t\t7 sign of y-component\n\t\t\t\t8 y of y-component\n\t\t\t*/\n\t\t\tmatch[1] = match[1].toLowerCase();\n\n\t\t\tif ( match[1].slice( 0, 3 ) === \"nth\" ) {\n\t\t\t\t// nth-* requires argument\n\t\t\t\tif ( !match[3] ) {\n\t\t\t\t\tSizzle.error( match[0] );\n\t\t\t\t}\n\n\t\t\t\t// numeric x and y parameters for Expr.filter.CHILD\n\t\t\t\t// remember that false/true cast respectively to 0/1\n\t\t\t\tmatch[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === \"even\" || match[3] === \"odd\" ) );\n\t\t\t\tmatch[5] = +( ( match[7] + match[8] ) || match[3] === \"odd\" );\n\n\t\t\t// other types prohibit arguments\n\t\t\t} else if ( match[3] ) {\n\t\t\t\tSizzle.error( match[0] );\n\t\t\t}\n\n\t\t\treturn match;\n\t\t},\n\n\t\t\"PSEUDO\": function( match ) {\n\t\t\tvar excess,\n\t\t\t\tunquoted = !match[6] && match[2];\n\n\t\t\tif ( matchExpr[\"CHILD\"].test( match[0] ) ) {\n\t\t\t\treturn null;\n\t\t\t}\n\n\t\t\t// Accept quoted arguments as-is\n\t\t\tif ( match[3] ) {\n\t\t\t\tmatch[2] = match[4] || match[5] || \"\";\n\n\t\t\t// Strip excess characters from unquoted arguments\n\t\t\t} else if ( unquoted && rpseudo.test( unquoted ) &&\n\t\t\t\t// Get excess from tokenize (recursively)\n\t\t\t\t(excess = tokenize( unquoted, true )) &&\n\t\t\t\t// advance to the next closing parenthesis\n\t\t\t\t(excess = unquoted.indexOf( \")\", unquoted.length - excess ) - unquoted.length) ) {\n\n\t\t\t\t// excess is a negative index\n\t\t\t\tmatch[0] = match[0].slice( 0, excess );\n\t\t\t\tmatch[2] = unquoted.slice( 0, excess );\n\t\t\t}\n\n\t\t\t// Return only captures needed by the pseudo filter method (type and argument)\n\t\t\treturn match.slice( 0, 3 );\n\t\t}\n\t},\n\n\tfilter: {\n\n\t\t\"TAG\": function( nodeNameSelector ) {\n\t\t\tvar nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();\n\t\t\treturn nodeNameSelector === \"*\" ?\n\t\t\t\tfunction() { return true; } :\n\t\t\t\tfunction( elem ) {\n\t\t\t\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n\t\t\t\t};\n\t\t},\n\n\t\t\"CLASS\": function( className ) {\n\t\t\tvar pattern = classCache[ className + \" \" ];\n\n\t\t\treturn pattern ||\n\t\t\t\t(pattern = new RegExp( \"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\" )) &&\n\t\t\t\tclassCache( className, function( elem ) {\n\t\t\t\t\treturn pattern.test( typeof elem.className === \"string\" && elem.className || typeof elem.getAttribute !== \"undefined\" && elem.getAttribute(\"class\") || \"\" );\n\t\t\t\t});\n\t\t},\n\n\t\t\"ATTR\": function( name, operator, check ) {\n\t\t\treturn function( elem ) {\n\t\t\t\tvar result = Sizzle.attr( elem, name );\n\n\t\t\t\tif ( result == null ) {\n\t\t\t\t\treturn operator === \"!=\";\n\t\t\t\t}\n\t\t\t\tif ( !operator ) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\n\t\t\t\tresult += \"\";\n\n\t\t\t\treturn operator === \"=\" ? result === check :\n\t\t\t\t\toperator === \"!=\" ? result !== check :\n\t\t\t\t\toperator === \"^=\" ? check && result.indexOf( check ) === 0 :\n\t\t\t\t\toperator === \"*=\" ? check && result.indexOf( check ) > -1 :\n\t\t\t\t\toperator === \"$=\" ? check && result.slice( -check.length ) === check :\n\t\t\t\t\toperator === \"~=\" ? ( \" \" + result.replace( rwhitespace, \" \" ) + \" \" ).indexOf( check ) > -1 :\n\t\t\t\t\toperator === \"|=\" ? result === check || result.slice( 0, check.length + 1 ) === check + \"-\" :\n\t\t\t\t\tfalse;\n\t\t\t};\n\t\t},\n\n\t\t\"CHILD\": function( type, what, argument, first, last ) {\n\t\t\tvar simple = type.slice( 0, 3 ) !== \"nth\",\n\t\t\t\tforward = type.slice( -4 ) !== \"last\",\n\t\t\t\tofType = what === \"of-type\";\n\n\t\t\treturn first === 1 && last === 0 ?\n\n\t\t\t\t// Shortcut for :nth-*(n)\n\t\t\t\tfunction( elem ) {\n\t\t\t\t\treturn !!elem.parentNode;\n\t\t\t\t} :\n\n\t\t\t\tfunction( elem, context, xml ) {\n\t\t\t\t\tvar cache, uniqueCache, outerCache, node, nodeIndex, start,\n\t\t\t\t\t\tdir = simple !== forward ? \"nextSibling\" : \"previousSibling\",\n\t\t\t\t\t\tparent = elem.parentNode,\n\t\t\t\t\t\tname = ofType && elem.nodeName.toLowerCase(),\n\t\t\t\t\t\tuseCache = !xml && !ofType,\n\t\t\t\t\t\tdiff = false;\n\n\t\t\t\t\tif ( parent ) {\n\n\t\t\t\t\t\t// :(first|last|only)-(child|of-type)\n\t\t\t\t\t\tif ( simple ) {\n\t\t\t\t\t\t\twhile ( dir ) {\n\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\twhile ( (node = node[ dir ]) ) {\n\t\t\t\t\t\t\t\t\tif ( ofType ?\n\t\t\t\t\t\t\t\t\t\tnode.nodeName.toLowerCase() === name :\n\t\t\t\t\t\t\t\t\t\tnode.nodeType === 1 ) {\n\n\t\t\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t// Reverse direction for :only-* (if we haven't yet done so)\n\t\t\t\t\t\t\t\tstart = dir = type === \"only\" && !start && \"nextSibling\";\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tstart = [ forward ? parent.firstChild : parent.lastChild ];\n\n\t\t\t\t\t\t// non-xml :nth-child(...) stores cache data on `parent`\n\t\t\t\t\t\tif ( forward && useCache ) {\n\n\t\t\t\t\t\t\t// Seek `elem` from a previously-cached index\n\n\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\tnode = parent;\n\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\tcache = uniqueCache[ type ] || [];\n\t\t\t\t\t\t\tnodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];\n\t\t\t\t\t\t\tdiff = nodeIndex && cache[ 2 ];\n\t\t\t\t\t\t\tnode = nodeIndex && parent.childNodes[ nodeIndex ];\n\n\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\n\t\t\t\t\t\t\t\t// Fallback to seeking `elem` from the start\n\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\n\t\t\t\t\t\t\t\t// When found, cache indexes on `parent` and break\n\t\t\t\t\t\t\t\tif ( node.nodeType === 1 && ++diff && node === elem ) {\n\t\t\t\t\t\t\t\t\tuniqueCache[ type ] = [ dirruns, nodeIndex, diff ];\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t// Use previously-cached element index if available\n\t\t\t\t\t\t\tif ( useCache ) {\n\t\t\t\t\t\t\t\t// ...in a gzip-friendly way\n\t\t\t\t\t\t\t\tnode = elem;\n\t\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\t\tcache = uniqueCache[ type ] || [];\n\t\t\t\t\t\t\t\tnodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];\n\t\t\t\t\t\t\t\tdiff = nodeIndex;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t// xml :nth-child(...)\n\t\t\t\t\t\t\t// or :nth-last-child(...) or :nth(-last)?-of-type(...)\n\t\t\t\t\t\t\tif ( diff === false ) {\n\t\t\t\t\t\t\t\t// Use the same loop as above to seek `elem` from the start\n\t\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\t\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\n\t\t\t\t\t\t\t\t\tif ( ( ofType ?\n\t\t\t\t\t\t\t\t\t\tnode.nodeName.toLowerCase() === name :\n\t\t\t\t\t\t\t\t\t\tnode.nodeType === 1 ) &&\n\t\t\t\t\t\t\t\t\t\t++diff ) {\n\n\t\t\t\t\t\t\t\t\t\t// Cache the index of each encountered element\n\t\t\t\t\t\t\t\t\t\tif ( useCache ) {\n\t\t\t\t\t\t\t\t\t\t\touterCache = node[ expando ] || (node[ expando ] = {});\n\n\t\t\t\t\t\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\t\t\t\t\t\tuniqueCache = outerCache[ node.uniqueID ] ||\n\t\t\t\t\t\t\t\t\t\t\t\t(outerCache[ node.uniqueID ] = {});\n\n\t\t\t\t\t\t\t\t\t\t\tuniqueCache[ type ] = [ dirruns, diff ];\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\tif ( node === elem ) {\n\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Incorporate the offset, then check against cycle size\n\t\t\t\t\t\tdiff -= last;\n\t\t\t\t\t\treturn diff === first || ( diff % first === 0 && diff / first >= 0 );\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t},\n\n\t\t\"PSEUDO\": function( pseudo, argument ) {\n\t\t\t// pseudo-class names are case-insensitive\n\t\t\t// http://www.w3.org/TR/selectors/#pseudo-classes\n\t\t\t// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n\t\t\t// Remember that setFilters inherits from pseudos\n\t\t\tvar args,\n\t\t\t\tfn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||\n\t\t\t\t\tSizzle.error( \"unsupported pseudo: \" + pseudo );\n\n\t\t\t// The user may use createPseudo to indicate that\n\t\t\t// arguments are needed to create the filter function\n\t\t\t// just as Sizzle does\n\t\t\tif ( fn[ expando ] ) {\n\t\t\t\treturn fn( argument );\n\t\t\t}\n\n\t\t\t// But maintain support for old signatures\n\t\t\tif ( fn.length > 1 ) {\n\t\t\t\targs = [ pseudo, pseudo, \"\", argument ];\n\t\t\t\treturn Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?\n\t\t\t\t\tmarkFunction(function( seed, matches ) {\n\t\t\t\t\t\tvar idx,\n\t\t\t\t\t\t\tmatched = fn( seed, argument ),\n\t\t\t\t\t\t\ti = matched.length;\n\t\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\t\tidx = indexOf( seed, matched[i] );\n\t\t\t\t\t\t\tseed[ idx ] = !( matches[ idx ] = matched[i] );\n\t\t\t\t\t\t}\n\t\t\t\t\t}) :\n\t\t\t\t\tfunction( elem ) {\n\t\t\t\t\t\treturn fn( elem, 0, args );\n\t\t\t\t\t};\n\t\t\t}\n\n\t\t\treturn fn;\n\t\t}\n\t},\n\n\tpseudos: {\n\t\t// Potentially complex pseudos\n\t\t\"not\": markFunction(function( selector ) {\n\t\t\t// Trim the selector passed to compile\n\t\t\t// to avoid treating leading and trailing\n\t\t\t// spaces as combinators\n\t\t\tvar input = [],\n\t\t\t\tresults = [],\n\t\t\t\tmatcher = compile( selector.replace( rtrim, \"$1\" ) );\n\n\t\t\treturn matcher[ expando ] ?\n\t\t\t\tmarkFunction(function( seed, matches, context, xml ) {\n\t\t\t\t\tvar elem,\n\t\t\t\t\t\tunmatched = matcher( seed, null, xml, [] ),\n\t\t\t\t\t\ti = seed.length;\n\n\t\t\t\t\t// Match elements unmatched by `matcher`\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tif ( (elem = unmatched[i]) ) {\n\t\t\t\t\t\t\tseed[i] = !(matches[i] = elem);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}) :\n\t\t\t\tfunction( elem, context, xml ) {\n\t\t\t\t\tinput[0] = elem;\n\t\t\t\t\tmatcher( input, null, xml, results );\n\t\t\t\t\t// Don't keep the element (issue #299)\n\t\t\t\t\tinput[0] = null;\n\t\t\t\t\treturn !results.pop();\n\t\t\t\t};\n\t\t}),\n\n\t\t\"has\": markFunction(function( selector ) {\n\t\t\treturn function( elem ) {\n\t\t\t\treturn Sizzle( selector, elem ).length > 0;\n\t\t\t};\n\t\t}),\n\n\t\t\"contains\": markFunction(function( text ) {\n\t\t\ttext = text.replace( runescape, funescape );\n\t\t\treturn function( elem ) {\n\t\t\t\treturn ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;\n\t\t\t};\n\t\t}),\n\n\t\t// \"Whether an element is represented by a :lang() selector\n\t\t// is based solely on the element's language value\n\t\t// being equal to the identifier C,\n\t\t// or beginning with the identifier C immediately followed by \"-\".\n\t\t// The matching of C against the element's language value is performed case-insensitively.\n\t\t// The identifier C does not have to be a valid language name.\"\n\t\t// http://www.w3.org/TR/selectors/#lang-pseudo\n\t\t\"lang\": markFunction( function( lang ) {\n\t\t\t// lang value must be a valid identifier\n\t\t\tif ( !ridentifier.test(lang || \"\") ) {\n\t\t\t\tSizzle.error( \"unsupported lang: \" + lang );\n\t\t\t}\n\t\t\tlang = lang.replace( runescape, funescape ).toLowerCase();\n\t\t\treturn function( elem ) {\n\t\t\t\tvar elemLang;\n\t\t\t\tdo {\n\t\t\t\t\tif ( (elemLang = documentIsHTML ?\n\t\t\t\t\t\telem.lang :\n\t\t\t\t\t\telem.getAttribute(\"xml:lang\") || elem.getAttribute(\"lang\")) ) {\n\n\t\t\t\t\t\telemLang = elemLang.toLowerCase();\n\t\t\t\t\t\treturn elemLang === lang || elemLang.indexOf( lang + \"-\" ) === 0;\n\t\t\t\t\t}\n\t\t\t\t} while ( (elem = elem.parentNode) && elem.nodeType === 1 );\n\t\t\t\treturn false;\n\t\t\t};\n\t\t}),\n\n\t\t// Miscellaneous\n\t\t\"target\": function( elem ) {\n\t\t\tvar hash = window.location && window.location.hash;\n\t\t\treturn hash && hash.slice( 1 ) === elem.id;\n\t\t},\n\n\t\t\"root\": function( elem ) {\n\t\t\treturn elem === docElem;\n\t\t},\n\n\t\t\"focus\": function( elem ) {\n\t\t\treturn elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n\t\t},\n\n\t\t// Boolean properties\n\t\t\"enabled\": createDisabledPseudo( false ),\n\t\t\"disabled\": createDisabledPseudo( true ),\n\n\t\t\"checked\": function( elem ) {\n\t\t\t// In CSS3, :checked should return both checked and selected elements\n\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\t\t\tvar nodeName = elem.nodeName.toLowerCase();\n\t\t\treturn (nodeName === \"input\" && !!elem.checked) || (nodeName === \"option\" && !!elem.selected);\n\t\t},\n\n\t\t\"selected\": function( elem ) {\n\t\t\t// Accessing this property makes selected-by-default\n\t\t\t// options in Safari work properly\n\t\t\tif ( elem.parentNode ) {\n\t\t\t\telem.parentNode.selectedIndex;\n\t\t\t}\n\n\t\t\treturn elem.selected === true;\n\t\t},\n\n\t\t// Contents\n\t\t\"empty\": function( elem ) {\n\t\t\t// http://www.w3.org/TR/selectors/#empty-pseudo\n\t\t\t// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n\t\t\t//   but not by others (comment: 8; processing instruction: 7; etc.)\n\t\t\t// nodeType < 6 works because attributes (2) do not appear as children\n\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\t\t\t\tif ( elem.nodeType < 6 ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t},\n\n\t\t\"parent\": function( elem ) {\n\t\t\treturn !Expr.pseudos[\"empty\"]( elem );\n\t\t},\n\n\t\t// Element/input types\n\t\t\"header\": function( elem ) {\n\t\t\treturn rheader.test( elem.nodeName );\n\t\t},\n\n\t\t\"input\": function( elem ) {\n\t\t\treturn rinputs.test( elem.nodeName );\n\t\t},\n\n\t\t\"button\": function( elem ) {\n\t\t\tvar name = elem.nodeName.toLowerCase();\n\t\t\treturn name === \"input\" && elem.type === \"button\" || name === \"button\";\n\t\t},\n\n\t\t\"text\": function( elem ) {\n\t\t\tvar attr;\n\t\t\treturn elem.nodeName.toLowerCase() === \"input\" &&\n\t\t\t\telem.type === \"text\" &&\n\n\t\t\t\t// Support: IE<8\n\t\t\t\t// New HTML5 attribute values (e.g., \"search\") appear with elem.type === \"text\"\n\t\t\t\t( (attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === \"text\" );\n\t\t},\n\n\t\t// Position-in-collection\n\t\t\"first\": createPositionalPseudo(function() {\n\t\t\treturn [ 0 ];\n\t\t}),\n\n\t\t\"last\": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\treturn [ length - 1 ];\n\t\t}),\n\n\t\t\"eq\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\treturn [ argument < 0 ? argument + length : argument ];\n\t\t}),\n\n\t\t\"even\": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\tvar i = 0;\n\t\t\tfor ( ; i < length; i += 2 ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t\"odd\": createPositionalPseudo(function( matchIndexes, length ) {\n\t\t\tvar i = 1;\n\t\t\tfor ( ; i < length; i += 2 ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t\"lt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\tfor ( ; --i >= 0; ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t}),\n\n\t\t\"gt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\t\t\tvar i = argument < 0 ? argument + length : argument;\n\t\t\tfor ( ; ++i < length; ) {\n\t\t\t\tmatchIndexes.push( i );\n\t\t\t}\n\t\t\treturn matchIndexes;\n\t\t})\n\t}\n};\n\nExpr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];\n\n// Add button/input type pseudos\nfor ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {\n\tExpr.pseudos[ i ] = createInputPseudo( i );\n}\nfor ( i in { submit: true, reset: true } ) {\n\tExpr.pseudos[ i ] = createButtonPseudo( i );\n}\n\n// Easy API for creating new setFilters\nfunction setFilters() {}\nsetFilters.prototype = Expr.filters = Expr.pseudos;\nExpr.setFilters = new setFilters();\n\ntokenize = Sizzle.tokenize = function( selector, parseOnly ) {\n\tvar matched, match, tokens, type,\n\t\tsoFar, groups, preFilters,\n\t\tcached = tokenCache[ selector + \" \" ];\n\n\tif ( cached ) {\n\t\treturn parseOnly ? 0 : cached.slice( 0 );\n\t}\n\n\tsoFar = selector;\n\tgroups = [];\n\tpreFilters = Expr.preFilter;\n\n\twhile ( soFar ) {\n\n\t\t// Comma and first run\n\t\tif ( !matched || (match = rcomma.exec( soFar )) ) {\n\t\t\tif ( match ) {\n\t\t\t\t// Don't consume trailing commas as valid\n\t\t\t\tsoFar = soFar.slice( match[0].length ) || soFar;\n\t\t\t}\n\t\t\tgroups.push( (tokens = []) );\n\t\t}\n\n\t\tmatched = false;\n\n\t\t// Combinators\n\t\tif ( (match = rcombinators.exec( soFar )) ) {\n\t\t\tmatched = match.shift();\n\t\t\ttokens.push({\n\t\t\t\tvalue: matched,\n\t\t\t\t// Cast descendant combinators to space\n\t\t\t\ttype: match[0].replace( rtrim, \" \" )\n\t\t\t});\n\t\t\tsoFar = soFar.slice( matched.length );\n\t\t}\n\n\t\t// Filters\n\t\tfor ( type in Expr.filter ) {\n\t\t\tif ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||\n\t\t\t\t(match = preFilters[ type ]( match ))) ) {\n\t\t\t\tmatched = match.shift();\n\t\t\t\ttokens.push({\n\t\t\t\t\tvalue: matched,\n\t\t\t\t\ttype: type,\n\t\t\t\t\tmatches: match\n\t\t\t\t});\n\t\t\t\tsoFar = soFar.slice( matched.length );\n\t\t\t}\n\t\t}\n\n\t\tif ( !matched ) {\n\t\t\tbreak;\n\t\t}\n\t}\n\n\t// Return the length of the invalid excess\n\t// if we're just parsing\n\t// Otherwise, throw an error or return tokens\n\treturn parseOnly ?\n\t\tsoFar.length :\n\t\tsoFar ?\n\t\t\tSizzle.error( selector ) :\n\t\t\t// Cache the tokens\n\t\t\ttokenCache( selector, groups ).slice( 0 );\n};\n\nfunction toSelector( tokens ) {\n\tvar i = 0,\n\t\tlen = tokens.length,\n\t\tselector = \"\";\n\tfor ( ; i < len; i++ ) {\n\t\tselector += tokens[i].value;\n\t}\n\treturn selector;\n}\n\nfunction addCombinator( matcher, combinator, base ) {\n\tvar dir = combinator.dir,\n\t\tskip = combinator.next,\n\t\tkey = skip || dir,\n\t\tcheckNonElements = base && key === \"parentNode\",\n\t\tdoneName = done++;\n\n\treturn combinator.first ?\n\t\t// Check against closest ancestor/preceding element\n\t\tfunction( elem, context, xml ) {\n\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\treturn matcher( elem, context, xml );\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn false;\n\t\t} :\n\n\t\t// Check against all ancestor/preceding elements\n\t\tfunction( elem, context, xml ) {\n\t\t\tvar oldCache, uniqueCache, outerCache,\n\t\t\t\tnewCache = [ dirruns, doneName ];\n\n\t\t\t// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching\n\t\t\tif ( xml ) {\n\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\t\tif ( matcher( elem, context, xml ) ) {\n\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\t\t\t\t\t\touterCache = elem[ expando ] || (elem[ expando ] = {});\n\n\t\t\t\t\t\t// Support: IE <9 only\n\t\t\t\t\t\t// Defend against cloned attroperties (jQuery gh-1709)\n\t\t\t\t\t\tuniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});\n\n\t\t\t\t\t\tif ( skip && skip === elem.nodeName.toLowerCase() ) {\n\t\t\t\t\t\t\telem = elem[ dir ] || elem;\n\t\t\t\t\t\t} else if ( (oldCache = uniqueCache[ key ]) &&\n\t\t\t\t\t\t\toldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {\n\n\t\t\t\t\t\t\t// Assign to newCache so results back-propagate to previous elements\n\t\t\t\t\t\t\treturn (newCache[ 2 ] = oldCache[ 2 ]);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t// Reuse newcache so results back-propagate to previous elements\n\t\t\t\t\t\t\tuniqueCache[ key ] = newCache;\n\n\t\t\t\t\t\t\t// A match means we're done; a fail means we have to keep checking\n\t\t\t\t\t\t\tif ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn false;\n\t\t};\n}\n\nfunction elementMatcher( matchers ) {\n\treturn matchers.length > 1 ?\n\t\tfunction( elem, context, xml ) {\n\t\t\tvar i = matchers.length;\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( !matchers[i]( elem, context, xml ) ) {\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn true;\n\t\t} :\n\t\tmatchers[0];\n}\n\nfunction multipleContexts( selector, contexts, results ) {\n\tvar i = 0,\n\t\tlen = contexts.length;\n\tfor ( ; i < len; i++ ) {\n\t\tSizzle( selector, contexts[i], results );\n\t}\n\treturn results;\n}\n\nfunction condense( unmatched, map, filter, context, xml ) {\n\tvar elem,\n\t\tnewUnmatched = [],\n\t\ti = 0,\n\t\tlen = unmatched.length,\n\t\tmapped = map != null;\n\n\tfor ( ; i < len; i++ ) {\n\t\tif ( (elem = unmatched[i]) ) {\n\t\t\tif ( !filter || filter( elem, context, xml ) ) {\n\t\t\t\tnewUnmatched.push( elem );\n\t\t\t\tif ( mapped ) {\n\t\t\t\t\tmap.push( i );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn newUnmatched;\n}\n\nfunction setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {\n\tif ( postFilter && !postFilter[ expando ] ) {\n\t\tpostFilter = setMatcher( postFilter );\n\t}\n\tif ( postFinder && !postFinder[ expando ] ) {\n\t\tpostFinder = setMatcher( postFinder, postSelector );\n\t}\n\treturn markFunction(function( seed, results, context, xml ) {\n\t\tvar temp, i, elem,\n\t\t\tpreMap = [],\n\t\t\tpostMap = [],\n\t\t\tpreexisting = results.length,\n\n\t\t\t// Get initial elements from seed or context\n\t\t\telems = seed || multipleContexts( selector || \"*\", context.nodeType ? [ context ] : context, [] ),\n\n\t\t\t// Prefilter to get matcher input, preserving a map for seed-results synchronization\n\t\t\tmatcherIn = preFilter && ( seed || !selector ) ?\n\t\t\t\tcondense( elems, preMap, preFilter, context, xml ) :\n\t\t\t\telems,\n\n\t\t\tmatcherOut = matcher ?\n\t\t\t\t// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n\t\t\t\tpostFinder || ( seed ? preFilter : preexisting || postFilter ) ?\n\n\t\t\t\t\t// ...intermediate processing is necessary\n\t\t\t\t\t[] :\n\n\t\t\t\t\t// ...otherwise use results directly\n\t\t\t\t\tresults :\n\t\t\t\tmatcherIn;\n\n\t\t// Find primary matches\n\t\tif ( matcher ) {\n\t\t\tmatcher( matcherIn, matcherOut, context, xml );\n\t\t}\n\n\t\t// Apply postFilter\n\t\tif ( postFilter ) {\n\t\t\ttemp = condense( matcherOut, postMap );\n\t\t\tpostFilter( temp, [], context, xml );\n\n\t\t\t// Un-match failing elements by moving them back to matcherIn\n\t\t\ti = temp.length;\n\t\t\twhile ( i-- ) {\n\t\t\t\tif ( (elem = temp[i]) ) {\n\t\t\t\t\tmatcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( seed ) {\n\t\t\tif ( postFinder || preFilter ) {\n\t\t\t\tif ( postFinder ) {\n\t\t\t\t\t// Get the final matcherOut by condensing this intermediate into postFinder contexts\n\t\t\t\t\ttemp = [];\n\t\t\t\t\ti = matcherOut.length;\n\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\tif ( (elem = matcherOut[i]) ) {\n\t\t\t\t\t\t\t// Restore matcherIn since elem is not yet a final match\n\t\t\t\t\t\t\ttemp.push( (matcherIn[i] = elem) );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tpostFinder( null, (matcherOut = []), temp, xml );\n\t\t\t\t}\n\n\t\t\t\t// Move matched elements from seed to results to keep them synchronized\n\t\t\t\ti = matcherOut.length;\n\t\t\t\twhile ( i-- ) {\n\t\t\t\t\tif ( (elem = matcherOut[i]) &&\n\t\t\t\t\t\t(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {\n\n\t\t\t\t\t\tseed[temp] = !(results[temp] = elem);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Add elements to results, through postFinder if defined\n\t\t} else {\n\t\t\tmatcherOut = condense(\n\t\t\t\tmatcherOut === results ?\n\t\t\t\t\tmatcherOut.splice( preexisting, matcherOut.length ) :\n\t\t\t\t\tmatcherOut\n\t\t\t);\n\t\t\tif ( postFinder ) {\n\t\t\t\tpostFinder( null, results, matcherOut, xml );\n\t\t\t} else {\n\t\t\t\tpush.apply( results, matcherOut );\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction matcherFromTokens( tokens ) {\n\tvar checkContext, matcher, j,\n\t\tlen = tokens.length,\n\t\tleadingRelative = Expr.relative[ tokens[0].type ],\n\t\timplicitRelative = leadingRelative || Expr.relative[\" \"],\n\t\ti = leadingRelative ? 1 : 0,\n\n\t\t// The foundational matcher ensures that elements are reachable from top-level context(s)\n\t\tmatchContext = addCombinator( function( elem ) {\n\t\t\treturn elem === checkContext;\n\t\t}, implicitRelative, true ),\n\t\tmatchAnyContext = addCombinator( function( elem ) {\n\t\t\treturn indexOf( checkContext, elem ) > -1;\n\t\t}, implicitRelative, true ),\n\t\tmatchers = [ function( elem, context, xml ) {\n\t\t\tvar ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (\n\t\t\t\t(checkContext = context).nodeType ?\n\t\t\t\t\tmatchContext( elem, context, xml ) :\n\t\t\t\t\tmatchAnyContext( elem, context, xml ) );\n\t\t\t// Avoid hanging onto element (issue #299)\n\t\t\tcheckContext = null;\n\t\t\treturn ret;\n\t\t} ];\n\n\tfor ( ; i < len; i++ ) {\n\t\tif ( (matcher = Expr.relative[ tokens[i].type ]) ) {\n\t\t\tmatchers = [ addCombinator(elementMatcher( matchers ), matcher) ];\n\t\t} else {\n\t\t\tmatcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );\n\n\t\t\t// Return special upon seeing a positional matcher\n\t\t\tif ( matcher[ expando ] ) {\n\t\t\t\t// Find the next relative operator (if any) for proper handling\n\t\t\t\tj = ++i;\n\t\t\t\tfor ( ; j < len; j++ ) {\n\t\t\t\t\tif ( Expr.relative[ tokens[j].type ] ) {\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn setMatcher(\n\t\t\t\t\ti > 1 && elementMatcher( matchers ),\n\t\t\t\t\ti > 1 && toSelector(\n\t\t\t\t\t\t// If the preceding token was a descendant combinator, insert an implicit any-element `*`\n\t\t\t\t\t\ttokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === \" \" ? \"*\" : \"\" })\n\t\t\t\t\t).replace( rtrim, \"$1\" ),\n\t\t\t\t\tmatcher,\n\t\t\t\t\ti < j && matcherFromTokens( tokens.slice( i, j ) ),\n\t\t\t\t\tj < len && matcherFromTokens( (tokens = tokens.slice( j )) ),\n\t\t\t\t\tj < len && toSelector( tokens )\n\t\t\t\t);\n\t\t\t}\n\t\t\tmatchers.push( matcher );\n\t\t}\n\t}\n\n\treturn elementMatcher( matchers );\n}\n\nfunction matcherFromGroupMatchers( elementMatchers, setMatchers ) {\n\tvar bySet = setMatchers.length > 0,\n\t\tbyElement = elementMatchers.length > 0,\n\t\tsuperMatcher = function( seed, context, xml, results, outermost ) {\n\t\t\tvar elem, j, matcher,\n\t\t\t\tmatchedCount = 0,\n\t\t\t\ti = \"0\",\n\t\t\t\tunmatched = seed && [],\n\t\t\t\tsetMatched = [],\n\t\t\t\tcontextBackup = outermostContext,\n\t\t\t\t// We must always have either seed elements or outermost context\n\t\t\t\telems = seed || byElement && Expr.find[\"TAG\"]( \"*\", outermost ),\n\t\t\t\t// Use integer dirruns iff this is the outermost matcher\n\t\t\t\tdirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),\n\t\t\t\tlen = elems.length;\n\n\t\t\tif ( outermost ) {\n\t\t\t\toutermostContext = context === document || context || outermost;\n\t\t\t}\n\n\t\t\t// Add elements passing elementMatchers directly to results\n\t\t\t// Support: IE<9, Safari\n\t\t\t// Tolerate NodeList properties (IE: \"length\"; Safari: <number>) matching elements by id\n\t\t\tfor ( ; i !== len && (elem = elems[i]) != null; i++ ) {\n\t\t\t\tif ( byElement && elem ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\tif ( !context && elem.ownerDocument !== document ) {\n\t\t\t\t\t\tsetDocument( elem );\n\t\t\t\t\t\txml = !documentIsHTML;\n\t\t\t\t\t}\n\t\t\t\t\twhile ( (matcher = elementMatchers[j++]) ) {\n\t\t\t\t\t\tif ( matcher( elem, context || document, xml) ) {\n\t\t\t\t\t\t\tresults.push( elem );\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif ( outermost ) {\n\t\t\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Track unmatched elements for set filters\n\t\t\t\tif ( bySet ) {\n\t\t\t\t\t// They will have gone through all possible matchers\n\t\t\t\t\tif ( (elem = !matcher && elem) ) {\n\t\t\t\t\t\tmatchedCount--;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Lengthen the array for every element, matched or not\n\t\t\t\t\tif ( seed ) {\n\t\t\t\t\t\tunmatched.push( elem );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// `i` is now the count of elements visited above, and adding it to `matchedCount`\n\t\t\t// makes the latter nonnegative.\n\t\t\tmatchedCount += i;\n\n\t\t\t// Apply set filters to unmatched elements\n\t\t\t// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`\n\t\t\t// equals `i`), unless we didn't visit _any_ elements in the above loop because we have\n\t\t\t// no element matchers and no seed.\n\t\t\t// Incrementing an initially-string \"0\" `i` allows `i` to remain a string only in that\n\t\t\t// case, which will result in a \"00\" `matchedCount` that differs from `i` but is also\n\t\t\t// numerically zero.\n\t\t\tif ( bySet && i !== matchedCount ) {\n\t\t\t\tj = 0;\n\t\t\t\twhile ( (matcher = setMatchers[j++]) ) {\n\t\t\t\t\tmatcher( unmatched, setMatched, context, xml );\n\t\t\t\t}\n\n\t\t\t\tif ( seed ) {\n\t\t\t\t\t// Reintegrate element matches to eliminate the need for sorting\n\t\t\t\t\tif ( matchedCount > 0 ) {\n\t\t\t\t\t\twhile ( i-- ) {\n\t\t\t\t\t\t\tif ( !(unmatched[i] || setMatched[i]) ) {\n\t\t\t\t\t\t\t\tsetMatched[i] = pop.call( results );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Discard index placeholder values to get only actual matches\n\t\t\t\t\tsetMatched = condense( setMatched );\n\t\t\t\t}\n\n\t\t\t\t// Add matches to results\n\t\t\t\tpush.apply( results, setMatched );\n\n\t\t\t\t// Seedless set matches succeeding multiple successful matchers stipulate sorting\n\t\t\t\tif ( outermost && !seed && setMatched.length > 0 &&\n\t\t\t\t\t( matchedCount + setMatchers.length ) > 1 ) {\n\n\t\t\t\t\tSizzle.uniqueSort( results );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Override manipulation of globals by nested matchers\n\t\t\tif ( outermost ) {\n\t\t\t\tdirruns = dirrunsUnique;\n\t\t\t\toutermostContext = contextBackup;\n\t\t\t}\n\n\t\t\treturn unmatched;\n\t\t};\n\n\treturn bySet ?\n\t\tmarkFunction( superMatcher ) :\n\t\tsuperMatcher;\n}\n\ncompile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {\n\tvar i,\n\t\tsetMatchers = [],\n\t\telementMatchers = [],\n\t\tcached = compilerCache[ selector + \" \" ];\n\n\tif ( !cached ) {\n\t\t// Generate a function of recursive functions that can be used to check each element\n\t\tif ( !match ) {\n\t\t\tmatch = tokenize( selector );\n\t\t}\n\t\ti = match.length;\n\t\twhile ( i-- ) {\n\t\t\tcached = matcherFromTokens( match[i] );\n\t\t\tif ( cached[ expando ] ) {\n\t\t\t\tsetMatchers.push( cached );\n\t\t\t} else {\n\t\t\t\telementMatchers.push( cached );\n\t\t\t}\n\t\t}\n\n\t\t// Cache the compiled function\n\t\tcached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );\n\n\t\t// Save selector and tokenization\n\t\tcached.selector = selector;\n\t}\n\treturn cached;\n};\n\n/**\n * A low-level selection function that works with Sizzle's compiled\n *  selector functions\n * @param {String|Function} selector A selector or a pre-compiled\n *  selector function built with Sizzle.compile\n * @param {Element} context\n * @param {Array} [results]\n * @param {Array} [seed] A set of elements to match against\n */\nselect = Sizzle.select = function( selector, context, results, seed ) {\n\tvar i, tokens, token, type, find,\n\t\tcompiled = typeof selector === \"function\" && selector,\n\t\tmatch = !seed && tokenize( (selector = compiled.selector || selector) );\n\n\tresults = results || [];\n\n\t// Try to minimize operations if there is only one selector in the list and no seed\n\t// (the latter of which guarantees us context)\n\tif ( match.length === 1 ) {\n\n\t\t// Reduce context if the leading compound selector is an ID\n\t\ttokens = match[0] = match[0].slice( 0 );\n\t\tif ( tokens.length > 2 && (token = tokens[0]).type === \"ID\" &&\n\t\t\t\tcontext.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {\n\n\t\t\tcontext = ( Expr.find[\"ID\"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];\n\t\t\tif ( !context ) {\n\t\t\t\treturn results;\n\n\t\t\t// Precompiled matchers will still verify ancestry, so step up a level\n\t\t\t} else if ( compiled ) {\n\t\t\t\tcontext = context.parentNode;\n\t\t\t}\n\n\t\t\tselector = selector.slice( tokens.shift().value.length );\n\t\t}\n\n\t\t// Fetch a seed set for right-to-left matching\n\t\ti = matchExpr[\"needsContext\"].test( selector ) ? 0 : tokens.length;\n\t\twhile ( i-- ) {\n\t\t\ttoken = tokens[i];\n\n\t\t\t// Abort if we hit a combinator\n\t\t\tif ( Expr.relative[ (type = token.type) ] ) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tif ( (find = Expr.find[ type ]) ) {\n\t\t\t\t// Search, expanding context for leading sibling combinators\n\t\t\t\tif ( (seed = find(\n\t\t\t\t\ttoken.matches[0].replace( runescape, funescape ),\n\t\t\t\t\trsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context\n\t\t\t\t)) ) {\n\n\t\t\t\t\t// If seed is empty or no tokens remain, we can return early\n\t\t\t\t\ttokens.splice( i, 1 );\n\t\t\t\t\tselector = seed.length && toSelector( tokens );\n\t\t\t\t\tif ( !selector ) {\n\t\t\t\t\t\tpush.apply( results, seed );\n\t\t\t\t\t\treturn results;\n\t\t\t\t\t}\n\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Compile and execute a filtering function if one is not provided\n\t// Provide `match` to avoid retokenization if we modified the selector above\n\t( compiled || compile( selector, match ) )(\n\t\tseed,\n\t\tcontext,\n\t\t!documentIsHTML,\n\t\tresults,\n\t\t!context || rsibling.test( selector ) && testContext( context.parentNode ) || context\n\t);\n\treturn results;\n};\n\n// One-time assignments\n\n// Sort stability\nsupport.sortStable = expando.split(\"\").sort( sortOrder ).join(\"\") === expando;\n\n// Support: Chrome 14-35+\n// Always assume duplicates if they aren't passed to the comparison function\nsupport.detectDuplicates = !!hasDuplicate;\n\n// Initialize against the default document\nsetDocument();\n\n// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n// Detached nodes confoundingly follow *each other*\nsupport.sortDetached = assert(function( el ) {\n\t// Should return 1, but returns 4 (following)\n\treturn el.compareDocumentPosition( document.createElement(\"fieldset\") ) & 1;\n});\n\n// Support: IE<8\n// Prevent attribute/property \"interpolation\"\n// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !assert(function( el ) {\n\tel.innerHTML = \"<a href='#'></a>\";\n\treturn el.firstChild.getAttribute(\"href\") === \"#\" ;\n}) ) {\n\taddHandle( \"type|href|height|width\", function( elem, name, isXML ) {\n\t\tif ( !isXML ) {\n\t\t\treturn elem.getAttribute( name, name.toLowerCase() === \"type\" ? 1 : 2 );\n\t\t}\n\t});\n}\n\n// Support: IE<9\n// Use defaultValue in place of getAttribute(\"value\")\nif ( !support.attributes || !assert(function( el ) {\n\tel.innerHTML = \"<input/>\";\n\tel.firstChild.setAttribute( \"value\", \"\" );\n\treturn el.firstChild.getAttribute( \"value\" ) === \"\";\n}) ) {\n\taddHandle( \"value\", function( elem, name, isXML ) {\n\t\tif ( !isXML && elem.nodeName.toLowerCase() === \"input\" ) {\n\t\t\treturn elem.defaultValue;\n\t\t}\n\t});\n}\n\n// Support: IE<9\n// Use getAttributeNode to fetch booleans when getAttribute lies\nif ( !assert(function( el ) {\n\treturn el.getAttribute(\"disabled\") == null;\n}) ) {\n\taddHandle( booleans, function( elem, name, isXML ) {\n\t\tvar val;\n\t\tif ( !isXML ) {\n\t\t\treturn elem[ name ] === true ? name.toLowerCase() :\n\t\t\t\t\t(val = elem.getAttributeNode( name )) && val.specified ?\n\t\t\t\t\tval.value :\n\t\t\t\tnull;\n\t\t}\n\t});\n}\n\nreturn Sizzle;\n\n})( window );\n\n\n\njQuery.find = Sizzle;\njQuery.expr = Sizzle.selectors;\n\n// Deprecated\njQuery.expr[ \":\" ] = jQuery.expr.pseudos;\njQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;\njQuery.text = Sizzle.getText;\njQuery.isXMLDoc = Sizzle.isXML;\njQuery.contains = Sizzle.contains;\njQuery.escapeSelector = Sizzle.escape;\n\n\n\n\nvar dir = function( elem, dir, until ) {\n\tvar matched = [],\n\t\ttruncate = until !== undefined;\n\n\twhile ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {\n\t\tif ( elem.nodeType === 1 ) {\n\t\t\tif ( truncate && jQuery( elem ).is( until ) ) {\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tmatched.push( elem );\n\t\t}\n\t}\n\treturn matched;\n};\n\n\nvar siblings = function( n, elem ) {\n\tvar matched = [];\n\n\tfor ( ; n; n = n.nextSibling ) {\n\t\tif ( n.nodeType === 1 && n !== elem ) {\n\t\t\tmatched.push( n );\n\t\t}\n\t}\n\n\treturn matched;\n};\n\n\nvar rneedsContext = jQuery.expr.match.needsContext;\n\n\n\nfunction nodeName( elem, name ) {\n\n  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n\n};\nvar rsingleTag = ( /^<([a-z][^\\/\\0>:\\x20\\t\\r\\n\\f]*)[\\x20\\t\\r\\n\\f]*\\/?>(?:<\\/\\1>|)$/i );\n\n\n\nvar risSimple = /^.[^:#\\[\\.,]*$/;\n\n// Implement the identical functionality for filter and not\nfunction winnow( elements, qualifier, not ) {\n\tif ( jQuery.isFunction( qualifier ) ) {\n\t\treturn jQuery.grep( elements, function( elem, i ) {\n\t\t\treturn !!qualifier.call( elem, i, elem ) !== not;\n\t\t} );\n\t}\n\n\t// Single element\n\tif ( qualifier.nodeType ) {\n\t\treturn jQuery.grep( elements, function( elem ) {\n\t\t\treturn ( elem === qualifier ) !== not;\n\t\t} );\n\t}\n\n\t// Arraylike of elements (jQuery, arguments, Array)\n\tif ( typeof qualifier !== \"string\" ) {\n\t\treturn jQuery.grep( elements, function( elem ) {\n\t\t\treturn ( indexOf.call( qualifier, elem ) > -1 ) !== not;\n\t\t} );\n\t}\n\n\t// Simple selector that can be filtered directly, removing non-Elements\n\tif ( risSimple.test( qualifier ) ) {\n\t\treturn jQuery.filter( qualifier, elements, not );\n\t}\n\n\t// Complex selector, compare the two sets, removing non-Elements\n\tqualifier = jQuery.filter( qualifier, elements );\n\treturn jQuery.grep( elements, function( elem ) {\n\t\treturn ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;\n\t} );\n}\n\njQuery.filter = function( expr, elems, not ) {\n\tvar elem = elems[ 0 ];\n\n\tif ( not ) {\n\t\texpr = \":not(\" + expr + \")\";\n\t}\n\n\tif ( elems.length === 1 && elem.nodeType === 1 ) {\n\t\treturn jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];\n\t}\n\n\treturn jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {\n\t\treturn elem.nodeType === 1;\n\t} ) );\n};\n\njQuery.fn.extend( {\n\tfind: function( selector ) {\n\t\tvar i, ret,\n\t\t\tlen = this.length,\n\t\t\tself = this;\n\n\t\tif ( typeof selector !== \"string\" ) {\n\t\t\treturn this.pushStack( jQuery( selector ).filter( function() {\n\t\t\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\t\t\tif ( jQuery.contains( self[ i ], this ) ) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} ) );\n\t\t}\n\n\t\tret = this.pushStack( [] );\n\n\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\tjQuery.find( selector, self[ i ], ret );\n\t\t}\n\n\t\treturn len > 1 ? jQuery.uniqueSort( ret ) : ret;\n\t},\n\tfilter: function( selector ) {\n\t\treturn this.pushStack( winnow( this, selector || [], false ) );\n\t},\n\tnot: function( selector ) {\n\t\treturn this.pushStack( winnow( this, selector || [], true ) );\n\t},\n\tis: function( selector ) {\n\t\treturn !!winnow(\n\t\t\tthis,\n\n\t\t\t// If this is a positional/relative selector, check membership in the returned set\n\t\t\t// so $(\"p:first\").is(\"p:last\") won't return true for a doc with two \"p\".\n\t\t\ttypeof selector === \"string\" && rneedsContext.test( selector ) ?\n\t\t\t\tjQuery( selector ) :\n\t\t\t\tselector || [],\n\t\t\tfalse\n\t\t).length;\n\t}\n} );\n\n\n// Initialize a jQuery object\n\n\n// A central reference to the root jQuery(document)\nvar rootjQuery,\n\n\t// A simple way to check for HTML strings\n\t// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n\t// Strict HTML recognition (#11290: must start with <)\n\t// Shortcut simple #id case for speed\n\trquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]+))$/,\n\n\tinit = jQuery.fn.init = function( selector, context, root ) {\n\t\tvar match, elem;\n\n\t\t// HANDLE: $(\"\"), $(null), $(undefined), $(false)\n\t\tif ( !selector ) {\n\t\t\treturn this;\n\t\t}\n\n\t\t// Method init() accepts an alternate rootjQuery\n\t\t// so migrate can support jQuery.sub (gh-2101)\n\t\troot = root || rootjQuery;\n\n\t\t// Handle HTML strings\n\t\tif ( typeof selector === \"string\" ) {\n\t\t\tif ( selector[ 0 ] === \"<\" &&\n\t\t\t\tselector[ selector.length - 1 ] === \">\" &&\n\t\t\t\tselector.length >= 3 ) {\n\n\t\t\t\t// Assume that strings that start and end with <> are HTML and skip the regex check\n\t\t\t\tmatch = [ null, selector, null ];\n\n\t\t\t} else {\n\t\t\t\tmatch = rquickExpr.exec( selector );\n\t\t\t}\n\n\t\t\t// Match html or make sure no context is specified for #id\n\t\t\tif ( match && ( match[ 1 ] || !context ) ) {\n\n\t\t\t\t// HANDLE: $(html) -> $(array)\n\t\t\t\tif ( match[ 1 ] ) {\n\t\t\t\t\tcontext = context instanceof jQuery ? context[ 0 ] : context;\n\n\t\t\t\t\t// Option to run scripts is true for back-compat\n\t\t\t\t\t// Intentionally let the error be thrown if parseHTML is not present\n\t\t\t\t\tjQuery.merge( this, jQuery.parseHTML(\n\t\t\t\t\t\tmatch[ 1 ],\n\t\t\t\t\t\tcontext && context.nodeType ? context.ownerDocument || context : document,\n\t\t\t\t\t\ttrue\n\t\t\t\t\t) );\n\n\t\t\t\t\t// HANDLE: $(html, props)\n\t\t\t\t\tif ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {\n\t\t\t\t\t\tfor ( match in context ) {\n\n\t\t\t\t\t\t\t// Properties of context are called as methods if possible\n\t\t\t\t\t\t\tif ( jQuery.isFunction( this[ match ] ) ) {\n\t\t\t\t\t\t\t\tthis[ match ]( context[ match ] );\n\n\t\t\t\t\t\t\t// ...and otherwise set as attributes\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tthis.attr( match, context[ match ] );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t// HANDLE: $(#id)\n\t\t\t\t} else {\n\t\t\t\t\telem = document.getElementById( match[ 2 ] );\n\n\t\t\t\t\tif ( elem ) {\n\n\t\t\t\t\t\t// Inject the element directly into the jQuery object\n\t\t\t\t\t\tthis[ 0 ] = elem;\n\t\t\t\t\t\tthis.length = 1;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\n\t\t\t// HANDLE: $(expr, $(...))\n\t\t\t} else if ( !context || context.jquery ) {\n\t\t\t\treturn ( context || root ).find( selector );\n\n\t\t\t// HANDLE: $(expr, context)\n\t\t\t// (which is just equivalent to: $(context).find(expr)\n\t\t\t} else {\n\t\t\t\treturn this.constructor( context ).find( selector );\n\t\t\t}\n\n\t\t// HANDLE: $(DOMElement)\n\t\t} else if ( selector.nodeType ) {\n\t\t\tthis[ 0 ] = selector;\n\t\t\tthis.length = 1;\n\t\t\treturn this;\n\n\t\t// HANDLE: $(function)\n\t\t// Shortcut for document ready\n\t\t} else if ( jQuery.isFunction( selector ) ) {\n\t\t\treturn root.ready !== undefined ?\n\t\t\t\troot.ready( selector ) :\n\n\t\t\t\t// Execute immediately if ready is not present\n\t\t\t\tselector( jQuery );\n\t\t}\n\n\t\treturn jQuery.makeArray( selector, this );\n\t};\n\n// Give the init function the jQuery prototype for later instantiation\ninit.prototype = jQuery.fn;\n\n// Initialize central reference\nrootjQuery = jQuery( document );\n\n\nvar rparentsprev = /^(?:parents|prev(?:Until|All))/,\n\n\t// Methods guaranteed to produce a unique set when starting from a unique set\n\tguaranteedUnique = {\n\t\tchildren: true,\n\t\tcontents: true,\n\t\tnext: true,\n\t\tprev: true\n\t};\n\njQuery.fn.extend( {\n\thas: function( target ) {\n\t\tvar targets = jQuery( target, this ),\n\t\t\tl = targets.length;\n\n\t\treturn this.filter( function() {\n\t\t\tvar i = 0;\n\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\tif ( jQuery.contains( this, targets[ i ] ) ) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t} );\n\t},\n\n\tclosest: function( selectors, context ) {\n\t\tvar cur,\n\t\t\ti = 0,\n\t\t\tl = this.length,\n\t\t\tmatched = [],\n\t\t\ttargets = typeof selectors !== \"string\" && jQuery( selectors );\n\n\t\t// Positional selectors never match, since there's no _selection_ context\n\t\tif ( !rneedsContext.test( selectors ) ) {\n\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\tfor ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {\n\n\t\t\t\t\t// Always skip document fragments\n\t\t\t\t\tif ( cur.nodeType < 11 && ( targets ?\n\t\t\t\t\t\ttargets.index( cur ) > -1 :\n\n\t\t\t\t\t\t// Don't pass non-elements to Sizzle\n\t\t\t\t\t\tcur.nodeType === 1 &&\n\t\t\t\t\t\t\tjQuery.find.matchesSelector( cur, selectors ) ) ) {\n\n\t\t\t\t\t\tmatched.push( cur );\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );\n\t},\n\n\t// Determine the position of an element within the set\n\tindex: function( elem ) {\n\n\t\t// No argument, return index in parent\n\t\tif ( !elem ) {\n\t\t\treturn ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;\n\t\t}\n\n\t\t// Index in selector\n\t\tif ( typeof elem === \"string\" ) {\n\t\t\treturn indexOf.call( jQuery( elem ), this[ 0 ] );\n\t\t}\n\n\t\t// Locate the position of the desired element\n\t\treturn indexOf.call( this,\n\n\t\t\t// If it receives a jQuery object, the first element is used\n\t\t\telem.jquery ? elem[ 0 ] : elem\n\t\t);\n\t},\n\n\tadd: function( selector, context ) {\n\t\treturn this.pushStack(\n\t\t\tjQuery.uniqueSort(\n\t\t\t\tjQuery.merge( this.get(), jQuery( selector, context ) )\n\t\t\t)\n\t\t);\n\t},\n\n\taddBack: function( selector ) {\n\t\treturn this.add( selector == null ?\n\t\t\tthis.prevObject : this.prevObject.filter( selector )\n\t\t);\n\t}\n} );\n\nfunction sibling( cur, dir ) {\n\twhile ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}\n\treturn cur;\n}\n\njQuery.each( {\n\tparent: function( elem ) {\n\t\tvar parent = elem.parentNode;\n\t\treturn parent && parent.nodeType !== 11 ? parent : null;\n\t},\n\tparents: function( elem ) {\n\t\treturn dir( elem, \"parentNode\" );\n\t},\n\tparentsUntil: function( elem, i, until ) {\n\t\treturn dir( elem, \"parentNode\", until );\n\t},\n\tnext: function( elem ) {\n\t\treturn sibling( elem, \"nextSibling\" );\n\t},\n\tprev: function( elem ) {\n\t\treturn sibling( elem, \"previousSibling\" );\n\t},\n\tnextAll: function( elem ) {\n\t\treturn dir( elem, \"nextSibling\" );\n\t},\n\tprevAll: function( elem ) {\n\t\treturn dir( elem, \"previousSibling\" );\n\t},\n\tnextUntil: function( elem, i, until ) {\n\t\treturn dir( elem, \"nextSibling\", until );\n\t},\n\tprevUntil: function( elem, i, until ) {\n\t\treturn dir( elem, \"previousSibling\", until );\n\t},\n\tsiblings: function( elem ) {\n\t\treturn siblings( ( elem.parentNode || {} ).firstChild, elem );\n\t},\n\tchildren: function( elem ) {\n\t\treturn siblings( elem.firstChild );\n\t},\n\tcontents: function( elem ) {\n        if ( nodeName( elem, \"iframe\" ) ) {\n            return elem.contentDocument;\n        }\n\n        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only\n        // Treat the template element as a regular one in browsers that\n        // don't support it.\n        if ( nodeName( elem, \"template\" ) ) {\n            elem = elem.content || elem;\n        }\n\n        return jQuery.merge( [], elem.childNodes );\n\t}\n}, function( name, fn ) {\n\tjQuery.fn[ name ] = function( until, selector ) {\n\t\tvar matched = jQuery.map( this, fn, until );\n\n\t\tif ( name.slice( -5 ) !== \"Until\" ) {\n\t\t\tselector = until;\n\t\t}\n\n\t\tif ( selector && typeof selector === \"string\" ) {\n\t\t\tmatched = jQuery.filter( selector, matched );\n\t\t}\n\n\t\tif ( this.length > 1 ) {\n\n\t\t\t// Remove duplicates\n\t\t\tif ( !guaranteedUnique[ name ] ) {\n\t\t\t\tjQuery.uniqueSort( matched );\n\t\t\t}\n\n\t\t\t// Reverse order for parents* and prev-derivatives\n\t\t\tif ( rparentsprev.test( name ) ) {\n\t\t\t\tmatched.reverse();\n\t\t\t}\n\t\t}\n\n\t\treturn this.pushStack( matched );\n\t};\n} );\nvar rnothtmlwhite = ( /[^\\x20\\t\\r\\n\\f]+/g );\n\n\n\n// Convert String-formatted options into Object-formatted ones\nfunction createOptions( options ) {\n\tvar object = {};\n\tjQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {\n\t\tobject[ flag ] = true;\n\t} );\n\treturn object;\n}\n\n/*\n * Create a callback list using the following parameters:\n *\n *\toptions: an optional list of space-separated options that will change how\n *\t\t\tthe callback list behaves or a more traditional option object\n *\n * By default a callback list will act like an event callback list and can be\n * \"fired\" multiple times.\n *\n * Possible options:\n *\n *\tonce:\t\t\twill ensure the callback list can only be fired once (like a Deferred)\n *\n *\tmemory:\t\t\twill keep track of previous values and will call any callback added\n *\t\t\t\t\tafter the list has been fired right away with the latest \"memorized\"\n *\t\t\t\t\tvalues (like a Deferred)\n *\n *\tunique:\t\t\twill ensure a callback can only be added once (no duplicate in the list)\n *\n *\tstopOnFalse:\tinterrupt callings when a callback returns false\n *\n */\njQuery.Callbacks = function( options ) {\n\n\t// Convert options from String-formatted to Object-formatted if needed\n\t// (we check in cache first)\n\toptions = typeof options === \"string\" ?\n\t\tcreateOptions( options ) :\n\t\tjQuery.extend( {}, options );\n\n\tvar // Flag to know if list is currently firing\n\t\tfiring,\n\n\t\t// Last fire value for non-forgettable lists\n\t\tmemory,\n\n\t\t// Flag to know if list was already fired\n\t\tfired,\n\n\t\t// Flag to prevent firing\n\t\tlocked,\n\n\t\t// Actual callback list\n\t\tlist = [],\n\n\t\t// Queue of execution data for repeatable lists\n\t\tqueue = [],\n\n\t\t// Index of currently firing callback (modified by add/remove as needed)\n\t\tfiringIndex = -1,\n\n\t\t// Fire callbacks\n\t\tfire = function() {\n\n\t\t\t// Enforce single-firing\n\t\t\tlocked = locked || options.once;\n\n\t\t\t// Execute callbacks for all pending executions,\n\t\t\t// respecting firingIndex overrides and runtime changes\n\t\t\tfired = firing = true;\n\t\t\tfor ( ; queue.length; firingIndex = -1 ) {\n\t\t\t\tmemory = queue.shift();\n\t\t\t\twhile ( ++firingIndex < list.length ) {\n\n\t\t\t\t\t// Run callback and check for early termination\n\t\t\t\t\tif ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&\n\t\t\t\t\t\toptions.stopOnFalse ) {\n\n\t\t\t\t\t\t// Jump to end and forget the data so .add doesn't re-fire\n\t\t\t\t\t\tfiringIndex = list.length;\n\t\t\t\t\t\tmemory = false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Forget the data if we're done with it\n\t\t\tif ( !options.memory ) {\n\t\t\t\tmemory = false;\n\t\t\t}\n\n\t\t\tfiring = false;\n\n\t\t\t// Clean up if we're done firing for good\n\t\t\tif ( locked ) {\n\n\t\t\t\t// Keep an empty list if we have data for future add calls\n\t\t\t\tif ( memory ) {\n\t\t\t\t\tlist = [];\n\n\t\t\t\t// Otherwise, this object is spent\n\t\t\t\t} else {\n\t\t\t\t\tlist = \"\";\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\t// Actual Callbacks object\n\t\tself = {\n\n\t\t\t// Add a callback or a collection of callbacks to the list\n\t\t\tadd: function() {\n\t\t\t\tif ( list ) {\n\n\t\t\t\t\t// If we have memory from a past run, we should fire after adding\n\t\t\t\t\tif ( memory && !firing ) {\n\t\t\t\t\t\tfiringIndex = list.length - 1;\n\t\t\t\t\t\tqueue.push( memory );\n\t\t\t\t\t}\n\n\t\t\t\t\t( function add( args ) {\n\t\t\t\t\t\tjQuery.each( args, function( _, arg ) {\n\t\t\t\t\t\t\tif ( jQuery.isFunction( arg ) ) {\n\t\t\t\t\t\t\t\tif ( !options.unique || !self.has( arg ) ) {\n\t\t\t\t\t\t\t\t\tlist.push( arg );\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else if ( arg && arg.length && jQuery.type( arg ) !== \"string\" ) {\n\n\t\t\t\t\t\t\t\t// Inspect recursively\n\t\t\t\t\t\t\t\tadd( arg );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} );\n\t\t\t\t\t} )( arguments );\n\n\t\t\t\t\tif ( memory && !firing ) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Remove a callback from the list\n\t\t\tremove: function() {\n\t\t\t\tjQuery.each( arguments, function( _, arg ) {\n\t\t\t\t\tvar index;\n\t\t\t\t\twhile ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {\n\t\t\t\t\t\tlist.splice( index, 1 );\n\n\t\t\t\t\t\t// Handle firing indexes\n\t\t\t\t\t\tif ( index <= firingIndex ) {\n\t\t\t\t\t\t\tfiringIndex--;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t} );\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Check if a given callback is in the list.\n\t\t\t// If no argument is given, return whether or not list has callbacks attached.\n\t\t\thas: function( fn ) {\n\t\t\t\treturn fn ?\n\t\t\t\t\tjQuery.inArray( fn, list ) > -1 :\n\t\t\t\t\tlist.length > 0;\n\t\t\t},\n\n\t\t\t// Remove all callbacks from the list\n\t\t\tempty: function() {\n\t\t\t\tif ( list ) {\n\t\t\t\t\tlist = [];\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Disable .fire and .add\n\t\t\t// Abort any current/pending executions\n\t\t\t// Clear all callbacks and values\n\t\t\tdisable: function() {\n\t\t\t\tlocked = queue = [];\n\t\t\t\tlist = memory = \"\";\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tdisabled: function() {\n\t\t\t\treturn !list;\n\t\t\t},\n\n\t\t\t// Disable .fire\n\t\t\t// Also disable .add unless we have memory (since it would have no effect)\n\t\t\t// Abort any pending executions\n\t\t\tlock: function() {\n\t\t\t\tlocked = queue = [];\n\t\t\t\tif ( !memory && !firing ) {\n\t\t\t\t\tlist = memory = \"\";\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\t\t\tlocked: function() {\n\t\t\t\treturn !!locked;\n\t\t\t},\n\n\t\t\t// Call all callbacks with the given context and arguments\n\t\t\tfireWith: function( context, args ) {\n\t\t\t\tif ( !locked ) {\n\t\t\t\t\targs = args || [];\n\t\t\t\t\targs = [ context, args.slice ? args.slice() : args ];\n\t\t\t\t\tqueue.push( args );\n\t\t\t\t\tif ( !firing ) {\n\t\t\t\t\t\tfire();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// Call all the callbacks with the given arguments\n\t\t\tfire: function() {\n\t\t\t\tself.fireWith( this, arguments );\n\t\t\t\treturn this;\n\t\t\t},\n\n\t\t\t// To know if the callbacks have already been called at least once\n\t\t\tfired: function() {\n\t\t\t\treturn !!fired;\n\t\t\t}\n\t\t};\n\n\treturn self;\n};\n\n\nfunction Identity( v ) {\n\treturn v;\n}\nfunction Thrower( ex ) {\n\tthrow ex;\n}\n\nfunction adoptValue( value, resolve, reject, noValue ) {\n\tvar method;\n\n\ttry {\n\n\t\t// Check for promise aspect first to privilege synchronous behavior\n\t\tif ( value && jQuery.isFunction( ( method = value.promise ) ) ) {\n\t\t\tmethod.call( value ).done( resolve ).fail( reject );\n\n\t\t// Other thenables\n\t\t} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {\n\t\t\tmethod.call( value, resolve, reject );\n\n\t\t// Other non-thenables\n\t\t} else {\n\n\t\t\t// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:\n\t\t\t// * false: [ value ].slice( 0 ) => resolve( value )\n\t\t\t// * true: [ value ].slice( 1 ) => resolve()\n\t\t\tresolve.apply( undefined, [ value ].slice( noValue ) );\n\t\t}\n\n\t// For Promises/A+, convert exceptions into rejections\n\t// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in\n\t// Deferred#then to conditionally suppress rejection.\n\t} catch ( value ) {\n\n\t\t// Support: Android 4.0 only\n\t\t// Strict mode functions invoked without .call/.apply get global-object context\n\t\treject.apply( undefined, [ value ] );\n\t}\n}\n\njQuery.extend( {\n\n\tDeferred: function( func ) {\n\t\tvar tuples = [\n\n\t\t\t\t// action, add listener, callbacks,\n\t\t\t\t// ... .then handlers, argument index, [final state]\n\t\t\t\t[ \"notify\", \"progress\", jQuery.Callbacks( \"memory\" ),\n\t\t\t\t\tjQuery.Callbacks( \"memory\" ), 2 ],\n\t\t\t\t[ \"resolve\", \"done\", jQuery.Callbacks( \"once memory\" ),\n\t\t\t\t\tjQuery.Callbacks( \"once memory\" ), 0, \"resolved\" ],\n\t\t\t\t[ \"reject\", \"fail\", jQuery.Callbacks( \"once memory\" ),\n\t\t\t\t\tjQuery.Callbacks( \"once memory\" ), 1, \"rejected\" ]\n\t\t\t],\n\t\t\tstate = \"pending\",\n\t\t\tpromise = {\n\t\t\t\tstate: function() {\n\t\t\t\t\treturn state;\n\t\t\t\t},\n\t\t\t\talways: function() {\n\t\t\t\t\tdeferred.done( arguments ).fail( arguments );\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\t\t\t\t\"catch\": function( fn ) {\n\t\t\t\t\treturn promise.then( null, fn );\n\t\t\t\t},\n\n\t\t\t\t// Keep pipe for back-compat\n\t\t\t\tpipe: function( /* fnDone, fnFail, fnProgress */ ) {\n\t\t\t\t\tvar fns = arguments;\n\n\t\t\t\t\treturn jQuery.Deferred( function( newDefer ) {\n\t\t\t\t\t\tjQuery.each( tuples, function( i, tuple ) {\n\n\t\t\t\t\t\t\t// Map tuples (progress, done, fail) to arguments (done, fail, progress)\n\t\t\t\t\t\t\tvar fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];\n\n\t\t\t\t\t\t\t// deferred.progress(function() { bind to newDefer or newDefer.notify })\n\t\t\t\t\t\t\t// deferred.done(function() { bind to newDefer or newDefer.resolve })\n\t\t\t\t\t\t\t// deferred.fail(function() { bind to newDefer or newDefer.reject })\n\t\t\t\t\t\t\tdeferred[ tuple[ 1 ] ]( function() {\n\t\t\t\t\t\t\t\tvar returned = fn && fn.apply( this, arguments );\n\t\t\t\t\t\t\t\tif ( returned && jQuery.isFunction( returned.promise ) ) {\n\t\t\t\t\t\t\t\t\treturned.promise()\n\t\t\t\t\t\t\t\t\t\t.progress( newDefer.notify )\n\t\t\t\t\t\t\t\t\t\t.done( newDefer.resolve )\n\t\t\t\t\t\t\t\t\t\t.fail( newDefer.reject );\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tnewDefer[ tuple[ 0 ] + \"With\" ](\n\t\t\t\t\t\t\t\t\t\tthis,\n\t\t\t\t\t\t\t\t\t\tfn ? [ returned ] : arguments\n\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t} );\n\t\t\t\t\t\tfns = null;\n\t\t\t\t\t} ).promise();\n\t\t\t\t},\n\t\t\t\tthen: function( onFulfilled, onRejected, onProgress ) {\n\t\t\t\t\tvar maxDepth = 0;\n\t\t\t\t\tfunction resolve( depth, deferred, handler, special ) {\n\t\t\t\t\t\treturn function() {\n\t\t\t\t\t\t\tvar that = this,\n\t\t\t\t\t\t\t\targs = arguments,\n\t\t\t\t\t\t\t\tmightThrow = function() {\n\t\t\t\t\t\t\t\t\tvar returned, then;\n\n\t\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.3\n\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-59\n\t\t\t\t\t\t\t\t\t// Ignore double-resolution attempts\n\t\t\t\t\t\t\t\t\tif ( depth < maxDepth ) {\n\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\treturned = handler.apply( that, args );\n\n\t\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.1\n\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-48\n\t\t\t\t\t\t\t\t\tif ( returned === deferred.promise() ) {\n\t\t\t\t\t\t\t\t\t\tthrow new TypeError( \"Thenable self-resolution\" );\n\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t// Support: Promises/A+ sections 2.3.3.1, 3.5\n\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-54\n\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-75\n\t\t\t\t\t\t\t\t\t// Retrieve `then` only once\n\t\t\t\t\t\t\t\t\tthen = returned &&\n\n\t\t\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.4\n\t\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-64\n\t\t\t\t\t\t\t\t\t\t// Only check objects and functions for thenability\n\t\t\t\t\t\t\t\t\t\t( typeof returned === \"object\" ||\n\t\t\t\t\t\t\t\t\t\t\ttypeof returned === \"function\" ) &&\n\t\t\t\t\t\t\t\t\t\treturned.then;\n\n\t\t\t\t\t\t\t\t\t// Handle a returned thenable\n\t\t\t\t\t\t\t\t\tif ( jQuery.isFunction( then ) ) {\n\n\t\t\t\t\t\t\t\t\t\t// Special processors (notify) just wait for resolution\n\t\t\t\t\t\t\t\t\t\tif ( special ) {\n\t\t\t\t\t\t\t\t\t\t\tthen.call(\n\t\t\t\t\t\t\t\t\t\t\t\treturned,\n\t\t\t\t\t\t\t\t\t\t\t\tresolve( maxDepth, deferred, Identity, special ),\n\t\t\t\t\t\t\t\t\t\t\t\tresolve( maxDepth, deferred, Thrower, special )\n\t\t\t\t\t\t\t\t\t\t\t);\n\n\t\t\t\t\t\t\t\t\t\t// Normal processors (resolve) also hook into progress\n\t\t\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\t\t\t// ...and disregard older resolution values\n\t\t\t\t\t\t\t\t\t\t\tmaxDepth++;\n\n\t\t\t\t\t\t\t\t\t\t\tthen.call(\n\t\t\t\t\t\t\t\t\t\t\t\treturned,\n\t\t\t\t\t\t\t\t\t\t\t\tresolve( maxDepth, deferred, Identity, special ),\n\t\t\t\t\t\t\t\t\t\t\t\tresolve( maxDepth, deferred, Thrower, special ),\n\t\t\t\t\t\t\t\t\t\t\t\tresolve( maxDepth, deferred, Identity,\n\t\t\t\t\t\t\t\t\t\t\t\t\tdeferred.notifyWith )\n\t\t\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t// Handle all other returned values\n\t\t\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t\t\t// Only substitute handlers pass on context\n\t\t\t\t\t\t\t\t\t\t// and multiple values (non-spec behavior)\n\t\t\t\t\t\t\t\t\t\tif ( handler !== Identity ) {\n\t\t\t\t\t\t\t\t\t\t\tthat = undefined;\n\t\t\t\t\t\t\t\t\t\t\targs = [ returned ];\n\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t// Process the value(s)\n\t\t\t\t\t\t\t\t\t\t// Default process is resolve\n\t\t\t\t\t\t\t\t\t\t( special || deferred.resolveWith )( that, args );\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t// Only normal processors (resolve) catch and reject exceptions\n\t\t\t\t\t\t\t\tprocess = special ?\n\t\t\t\t\t\t\t\t\tmightThrow :\n\t\t\t\t\t\t\t\t\tfunction() {\n\t\t\t\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\t\t\t\tmightThrow();\n\t\t\t\t\t\t\t\t\t\t} catch ( e ) {\n\n\t\t\t\t\t\t\t\t\t\t\tif ( jQuery.Deferred.exceptionHook ) {\n\t\t\t\t\t\t\t\t\t\t\t\tjQuery.Deferred.exceptionHook( e,\n\t\t\t\t\t\t\t\t\t\t\t\t\tprocess.stackTrace );\n\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.4.1\n\t\t\t\t\t\t\t\t\t\t\t// https://promisesaplus.com/#point-61\n\t\t\t\t\t\t\t\t\t\t\t// Ignore post-resolution exceptions\n\t\t\t\t\t\t\t\t\t\t\tif ( depth + 1 >= maxDepth ) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t// Only substitute handlers pass on context\n\t\t\t\t\t\t\t\t\t\t\t\t// and multiple values (non-spec behavior)\n\t\t\t\t\t\t\t\t\t\t\t\tif ( handler !== Thrower ) {\n\t\t\t\t\t\t\t\t\t\t\t\t\tthat = undefined;\n\t\t\t\t\t\t\t\t\t\t\t\t\targs = [ e ];\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tdeferred.rejectWith( that, args );\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\t// Support: Promises/A+ section 2.3.3.3.1\n\t\t\t\t\t\t\t// https://promisesaplus.com/#point-57\n\t\t\t\t\t\t\t// Re-resolve promises immediately to dodge false rejection from\n\t\t\t\t\t\t\t// subsequent errors\n\t\t\t\t\t\t\tif ( depth ) {\n\t\t\t\t\t\t\t\tprocess();\n\t\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t\t// Call an optional hook to record the stack, in case of exception\n\t\t\t\t\t\t\t\t// since it's otherwise lost when execution goes async\n\t\t\t\t\t\t\t\tif ( jQuery.Deferred.getStackHook ) {\n\t\t\t\t\t\t\t\t\tprocess.stackTrace = jQuery.Deferred.getStackHook();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\twindow.setTimeout( process );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t};\n\t\t\t\t\t}\n\n\t\t\t\t\treturn jQuery.Deferred( function( newDefer ) {\n\n\t\t\t\t\t\t// progress_handlers.add( ... )\n\t\t\t\t\t\ttuples[ 0 ][ 3 ].add(\n\t\t\t\t\t\t\tresolve(\n\t\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\t\tnewDefer,\n\t\t\t\t\t\t\t\tjQuery.isFunction( onProgress ) ?\n\t\t\t\t\t\t\t\t\tonProgress :\n\t\t\t\t\t\t\t\t\tIdentity,\n\t\t\t\t\t\t\t\tnewDefer.notifyWith\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t);\n\n\t\t\t\t\t\t// fulfilled_handlers.add( ... )\n\t\t\t\t\t\ttuples[ 1 ][ 3 ].add(\n\t\t\t\t\t\t\tresolve(\n\t\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\t\tnewDefer,\n\t\t\t\t\t\t\t\tjQuery.isFunction( onFulfilled ) ?\n\t\t\t\t\t\t\t\t\tonFulfilled :\n\t\t\t\t\t\t\t\t\tIdentity\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t);\n\n\t\t\t\t\t\t// rejected_handlers.add( ... )\n\t\t\t\t\t\ttuples[ 2 ][ 3 ].add(\n\t\t\t\t\t\t\tresolve(\n\t\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\t\tnewDefer,\n\t\t\t\t\t\t\t\tjQuery.isFunction( onRejected ) ?\n\t\t\t\t\t\t\t\t\tonRejected :\n\t\t\t\t\t\t\t\t\tThrower\n\t\t\t\t\t\t\t)\n\t\t\t\t\t\t);\n\t\t\t\t\t} ).promise();\n\t\t\t\t},\n\n\t\t\t\t// Get a promise for this deferred\n\t\t\t\t// If obj is provided, the promise aspect is added to the object\n\t\t\t\tpromise: function( obj ) {\n\t\t\t\t\treturn obj != null ? jQuery.extend( obj, promise ) : promise;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdeferred = {};\n\n\t\t// Add list-specific methods\n\t\tjQuery.each( tuples, function( i, tuple ) {\n\t\t\tvar list = tuple[ 2 ],\n\t\t\t\tstateString = tuple[ 5 ];\n\n\t\t\t// promise.progress = list.add\n\t\t\t// promise.done = list.add\n\t\t\t// promise.fail = list.add\n\t\t\tpromise[ tuple[ 1 ] ] = list.add;\n\n\t\t\t// Handle state\n\t\t\tif ( stateString ) {\n\t\t\t\tlist.add(\n\t\t\t\t\tfunction() {\n\n\t\t\t\t\t\t// state = \"resolved\" (i.e., fulfilled)\n\t\t\t\t\t\t// state = \"rejected\"\n\t\t\t\t\t\tstate = stateString;\n\t\t\t\t\t},\n\n\t\t\t\t\t// rejected_callbacks.disable\n\t\t\t\t\t// fulfilled_callbacks.disable\n\t\t\t\t\ttuples[ 3 - i ][ 2 ].disable,\n\n\t\t\t\t\t// progress_callbacks.lock\n\t\t\t\t\ttuples[ 0 ][ 2 ].lock\n\t\t\t\t);\n\t\t\t}\n\n\t\t\t// progress_handlers.fire\n\t\t\t// fulfilled_handlers.fire\n\t\t\t// rejected_handlers.fire\n\t\t\tlist.add( tuple[ 3 ].fire );\n\n\t\t\t// deferred.notify = function() { deferred.notifyWith(...) }\n\t\t\t// deferred.resolve = function() { deferred.resolveWith(...) }\n\t\t\t// deferred.reject = function() { deferred.rejectWith(...) }\n\t\t\tdeferred[ tuple[ 0 ] ] = function() {\n\t\t\t\tdeferred[ tuple[ 0 ] + \"With\" ]( this === deferred ? undefined : this, arguments );\n\t\t\t\treturn this;\n\t\t\t};\n\n\t\t\t// deferred.notifyWith = list.fireWith\n\t\t\t// deferred.resolveWith = list.fireWith\n\t\t\t// deferred.rejectWith = list.fireWith\n\t\t\tdeferred[ tuple[ 0 ] + \"With\" ] = list.fireWith;\n\t\t} );\n\n\t\t// Make the deferred a promise\n\t\tpromise.promise( deferred );\n\n\t\t// Call given func if any\n\t\tif ( func ) {\n\t\t\tfunc.call( deferred, deferred );\n\t\t}\n\n\t\t// All done!\n\t\treturn deferred;\n\t},\n\n\t// Deferred helper\n\twhen: function( singleValue ) {\n\t\tvar\n\n\t\t\t// count of uncompleted subordinates\n\t\t\tremaining = arguments.length,\n\n\t\t\t// count of unprocessed arguments\n\t\t\ti = remaining,\n\n\t\t\t// subordinate fulfillment data\n\t\t\tresolveContexts = Array( i ),\n\t\t\tresolveValues = slice.call( arguments ),\n\n\t\t\t// the master Deferred\n\t\t\tmaster = jQuery.Deferred(),\n\n\t\t\t// subordinate callback factory\n\t\t\tupdateFunc = function( i ) {\n\t\t\t\treturn function( value ) {\n\t\t\t\t\tresolveContexts[ i ] = this;\n\t\t\t\t\tresolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;\n\t\t\t\t\tif ( !( --remaining ) ) {\n\t\t\t\t\t\tmaster.resolveWith( resolveContexts, resolveValues );\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t};\n\n\t\t// Single- and empty arguments are adopted like Promise.resolve\n\t\tif ( remaining <= 1 ) {\n\t\t\tadoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,\n\t\t\t\t!remaining );\n\n\t\t\t// Use .then() to unwrap secondary thenables (cf. gh-3000)\n\t\t\tif ( master.state() === \"pending\" ||\n\t\t\t\tjQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {\n\n\t\t\t\treturn master.then();\n\t\t\t}\n\t\t}\n\n\t\t// Multiple arguments are aggregated like Promise.all array elements\n\t\twhile ( i-- ) {\n\t\t\tadoptValue( resolveValues[ i ], updateFunc( i ), master.reject );\n\t\t}\n\n\t\treturn master.promise();\n\t}\n} );\n\n\n// These usually indicate a programmer mistake during development,\n// warn about them ASAP rather than swallowing them by default.\nvar rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;\n\njQuery.Deferred.exceptionHook = function( error, stack ) {\n\n\t// Support: IE 8 - 9 only\n\t// Console exists when dev tools are open, which can happen at any time\n\tif ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {\n\t\twindow.console.warn( \"jQuery.Deferred exception: \" + error.message, error.stack, stack );\n\t}\n};\n\n\n\n\njQuery.readyException = function( error ) {\n\twindow.setTimeout( function() {\n\t\tthrow error;\n\t} );\n};\n\n\n\n\n// The deferred used on DOM ready\nvar readyList = jQuery.Deferred();\n\njQuery.fn.ready = function( fn ) {\n\n\treadyList\n\t\t.then( fn )\n\n\t\t// Wrap jQuery.readyException in a function so that the lookup\n\t\t// happens at the time of error handling instead of callback\n\t\t// registration.\n\t\t.catch( function( error ) {\n\t\t\tjQuery.readyException( error );\n\t\t} );\n\n\treturn this;\n};\n\njQuery.extend( {\n\n\t// Is the DOM ready to be used? Set to true once it occurs.\n\tisReady: false,\n\n\t// A counter to track how many items to wait for before\n\t// the ready event fires. See #6781\n\treadyWait: 1,\n\n\t// Handle when the DOM is ready\n\tready: function( wait ) {\n\n\t\t// Abort if there are pending holds or we're already ready\n\t\tif ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Remember that the DOM is ready\n\t\tjQuery.isReady = true;\n\n\t\t// If a normal DOM Ready event fired, decrement, and wait if need be\n\t\tif ( wait !== true && --jQuery.readyWait > 0 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// If there are functions bound, to execute\n\t\treadyList.resolveWith( document, [ jQuery ] );\n\t}\n} );\n\njQuery.ready.then = readyList.then;\n\n// The ready event handler and self cleanup method\nfunction completed() {\n\tdocument.removeEventListener( \"DOMContentLoaded\", completed );\n\twindow.removeEventListener( \"load\", completed );\n\tjQuery.ready();\n}\n\n// Catch cases where $(document).ready() is called\n// after the browser event has already occurred.\n// Support: IE <=9 - 10 only\n// Older IE sometimes signals \"interactive\" too soon\nif ( document.readyState === \"complete\" ||\n\t( document.readyState !== \"loading\" && !document.documentElement.doScroll ) ) {\n\n\t// Handle it asynchronously to allow scripts the opportunity to delay ready\n\twindow.setTimeout( jQuery.ready );\n\n} else {\n\n\t// Use the handy event callback\n\tdocument.addEventListener( \"DOMContentLoaded\", completed );\n\n\t// A fallback to window.onload, that will always work\n\twindow.addEventListener( \"load\", completed );\n}\n\n\n\n\n// Multifunctional method to get and set values of a collection\n// The value/s can optionally be executed if it's a function\nvar access = function( elems, fn, key, value, chainable, emptyGet, raw ) {\n\tvar i = 0,\n\t\tlen = elems.length,\n\t\tbulk = key == null;\n\n\t// Sets many values\n\tif ( jQuery.type( key ) === \"object\" ) {\n\t\tchainable = true;\n\t\tfor ( i in key ) {\n\t\t\taccess( elems, fn, i, key[ i ], true, emptyGet, raw );\n\t\t}\n\n\t// Sets one value\n\t} else if ( value !== undefined ) {\n\t\tchainable = true;\n\n\t\tif ( !jQuery.isFunction( value ) ) {\n\t\t\traw = true;\n\t\t}\n\n\t\tif ( bulk ) {\n\n\t\t\t// Bulk operations run against the entire set\n\t\t\tif ( raw ) {\n\t\t\t\tfn.call( elems, value );\n\t\t\t\tfn = null;\n\n\t\t\t// ...except when executing function values\n\t\t\t} else {\n\t\t\t\tbulk = fn;\n\t\t\t\tfn = function( elem, key, value ) {\n\t\t\t\t\treturn bulk.call( jQuery( elem ), value );\n\t\t\t\t};\n\t\t\t}\n\t\t}\n\n\t\tif ( fn ) {\n\t\t\tfor ( ; i < len; i++ ) {\n\t\t\t\tfn(\n\t\t\t\t\telems[ i ], key, raw ?\n\t\t\t\t\tvalue :\n\t\t\t\t\tvalue.call( elems[ i ], i, fn( elems[ i ], key ) )\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}\n\n\tif ( chainable ) {\n\t\treturn elems;\n\t}\n\n\t// Gets\n\tif ( bulk ) {\n\t\treturn fn.call( elems );\n\t}\n\n\treturn len ? fn( elems[ 0 ], key ) : emptyGet;\n};\nvar acceptData = function( owner ) {\n\n\t// Accepts only:\n\t//  - Node\n\t//    - Node.ELEMENT_NODE\n\t//    - Node.DOCUMENT_NODE\n\t//  - Object\n\t//    - Any\n\treturn owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );\n};\n\n\n\n\nfunction Data() {\n\tthis.expando = jQuery.expando + Data.uid++;\n}\n\nData.uid = 1;\n\nData.prototype = {\n\n\tcache: function( owner ) {\n\n\t\t// Check if the owner object already has a cache\n\t\tvar value = owner[ this.expando ];\n\n\t\t// If not, create one\n\t\tif ( !value ) {\n\t\t\tvalue = {};\n\n\t\t\t// We can accept data for non-element nodes in modern browsers,\n\t\t\t// but we should not, see #8335.\n\t\t\t// Always return an empty object.\n\t\t\tif ( acceptData( owner ) ) {\n\n\t\t\t\t// If it is a node unlikely to be stringify-ed or looped over\n\t\t\t\t// use plain assignment\n\t\t\t\tif ( owner.nodeType ) {\n\t\t\t\t\towner[ this.expando ] = value;\n\n\t\t\t\t// Otherwise secure it in a non-enumerable property\n\t\t\t\t// configurable must be true to allow the property to be\n\t\t\t\t// deleted when data is removed\n\t\t\t\t} else {\n\t\t\t\t\tObject.defineProperty( owner, this.expando, {\n\t\t\t\t\t\tvalue: value,\n\t\t\t\t\t\tconfigurable: true\n\t\t\t\t\t} );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn value;\n\t},\n\tset: function( owner, data, value ) {\n\t\tvar prop,\n\t\t\tcache = this.cache( owner );\n\n\t\t// Handle: [ owner, key, value ] args\n\t\t// Always use camelCase key (gh-2257)\n\t\tif ( typeof data === \"string\" ) {\n\t\t\tcache[ jQuery.camelCase( data ) ] = value;\n\n\t\t// Handle: [ owner, { properties } ] args\n\t\t} else {\n\n\t\t\t// Copy the properties one-by-one to the cache object\n\t\t\tfor ( prop in data ) {\n\t\t\t\tcache[ jQuery.camelCase( prop ) ] = data[ prop ];\n\t\t\t}\n\t\t}\n\t\treturn cache;\n\t},\n\tget: function( owner, key ) {\n\t\treturn key === undefined ?\n\t\t\tthis.cache( owner ) :\n\n\t\t\t// Always use camelCase key (gh-2257)\n\t\t\towner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];\n\t},\n\taccess: function( owner, key, value ) {\n\n\t\t// In cases where either:\n\t\t//\n\t\t//   1. No key was specified\n\t\t//   2. A string key was specified, but no value provided\n\t\t//\n\t\t// Take the \"read\" path and allow the get method to determine\n\t\t// which value to return, respectively either:\n\t\t//\n\t\t//   1. The entire cache object\n\t\t//   2. The data stored at the key\n\t\t//\n\t\tif ( key === undefined ||\n\t\t\t\t( ( key && typeof key === \"string\" ) && value === undefined ) ) {\n\n\t\t\treturn this.get( owner, key );\n\t\t}\n\n\t\t// When the key is not a string, or both a key and value\n\t\t// are specified, set or extend (existing objects) with either:\n\t\t//\n\t\t//   1. An object of properties\n\t\t//   2. A key and value\n\t\t//\n\t\tthis.set( owner, key, value );\n\n\t\t// Since the \"set\" path can have two possible entry points\n\t\t// return the expected data based on which path was taken[*]\n\t\treturn value !== undefined ? value : key;\n\t},\n\tremove: function( owner, key ) {\n\t\tvar i,\n\t\t\tcache = owner[ this.expando ];\n\n\t\tif ( cache === undefined ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( key !== undefined ) {\n\n\t\t\t// Support array or space separated string of keys\n\t\t\tif ( Array.isArray( key ) ) {\n\n\t\t\t\t// If key is an array of keys...\n\t\t\t\t// We always set camelCase keys, so remove that.\n\t\t\t\tkey = key.map( jQuery.camelCase );\n\t\t\t} else {\n\t\t\t\tkey = jQuery.camelCase( key );\n\n\t\t\t\t// If a key with the spaces exists, use it.\n\t\t\t\t// Otherwise, create an array by matching non-whitespace\n\t\t\t\tkey = key in cache ?\n\t\t\t\t\t[ key ] :\n\t\t\t\t\t( key.match( rnothtmlwhite ) || [] );\n\t\t\t}\n\n\t\t\ti = key.length;\n\n\t\t\twhile ( i-- ) {\n\t\t\t\tdelete cache[ key[ i ] ];\n\t\t\t}\n\t\t}\n\n\t\t// Remove the expando if there's no more data\n\t\tif ( key === undefined || jQuery.isEmptyObject( cache ) ) {\n\n\t\t\t// Support: Chrome <=35 - 45\n\t\t\t// Webkit & Blink performance suffers when deleting properties\n\t\t\t// from DOM nodes, so set to undefined instead\n\t\t\t// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)\n\t\t\tif ( owner.nodeType ) {\n\t\t\t\towner[ this.expando ] = undefined;\n\t\t\t} else {\n\t\t\t\tdelete owner[ this.expando ];\n\t\t\t}\n\t\t}\n\t},\n\thasData: function( owner ) {\n\t\tvar cache = owner[ this.expando ];\n\t\treturn cache !== undefined && !jQuery.isEmptyObject( cache );\n\t}\n};\nvar dataPriv = new Data();\n\nvar dataUser = new Data();\n\n\n\n//\tImplementation Summary\n//\n//\t1. Enforce API surface and semantic compatibility with 1.9.x branch\n//\t2. Improve the module's maintainability by reducing the storage\n//\t\tpaths to a single mechanism.\n//\t3. Use the same single mechanism to support \"private\" and \"user\" data.\n//\t4. _Never_ expose \"private\" data to user code (TODO: Drop _data, _removeData)\n//\t5. Avoid exposing implementation details on user objects (eg. expando properties)\n//\t6. Provide a clear path for implementation upgrade to WeakMap in 2014\n\nvar rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n\trmultiDash = /[A-Z]/g;\n\nfunction getData( data ) {\n\tif ( data === \"true\" ) {\n\t\treturn true;\n\t}\n\n\tif ( data === \"false\" ) {\n\t\treturn false;\n\t}\n\n\tif ( data === \"null\" ) {\n\t\treturn null;\n\t}\n\n\t// Only convert to a number if it doesn't change the string\n\tif ( data === +data + \"\" ) {\n\t\treturn +data;\n\t}\n\n\tif ( rbrace.test( data ) ) {\n\t\treturn JSON.parse( data );\n\t}\n\n\treturn data;\n}\n\nfunction dataAttr( elem, key, data ) {\n\tvar name;\n\n\t// If nothing was found internally, try to fetch any\n\t// data from the HTML5 data-* attribute\n\tif ( data === undefined && elem.nodeType === 1 ) {\n\t\tname = \"data-\" + key.replace( rmultiDash, \"-$&\" ).toLowerCase();\n\t\tdata = elem.getAttribute( name );\n\n\t\tif ( typeof data === \"string\" ) {\n\t\t\ttry {\n\t\t\t\tdata = getData( data );\n\t\t\t} catch ( e ) {}\n\n\t\t\t// Make sure we set the data so it isn't changed later\n\t\t\tdataUser.set( elem, key, data );\n\t\t} else {\n\t\t\tdata = undefined;\n\t\t}\n\t}\n\treturn data;\n}\n\njQuery.extend( {\n\thasData: function( elem ) {\n\t\treturn dataUser.hasData( elem ) || dataPriv.hasData( elem );\n\t},\n\n\tdata: function( elem, name, data ) {\n\t\treturn dataUser.access( elem, name, data );\n\t},\n\n\tremoveData: function( elem, name ) {\n\t\tdataUser.remove( elem, name );\n\t},\n\n\t// TODO: Now that all calls to _data and _removeData have been replaced\n\t// with direct calls to dataPriv methods, these can be deprecated.\n\t_data: function( elem, name, data ) {\n\t\treturn dataPriv.access( elem, name, data );\n\t},\n\n\t_removeData: function( elem, name ) {\n\t\tdataPriv.remove( elem, name );\n\t}\n} );\n\njQuery.fn.extend( {\n\tdata: function( key, value ) {\n\t\tvar i, name, data,\n\t\t\telem = this[ 0 ],\n\t\t\tattrs = elem && elem.attributes;\n\n\t\t// Gets all values\n\t\tif ( key === undefined ) {\n\t\t\tif ( this.length ) {\n\t\t\t\tdata = dataUser.get( elem );\n\n\t\t\t\tif ( elem.nodeType === 1 && !dataPriv.get( elem, \"hasDataAttrs\" ) ) {\n\t\t\t\t\ti = attrs.length;\n\t\t\t\t\twhile ( i-- ) {\n\n\t\t\t\t\t\t// Support: IE 11 only\n\t\t\t\t\t\t// The attrs elements can be null (#14894)\n\t\t\t\t\t\tif ( attrs[ i ] ) {\n\t\t\t\t\t\t\tname = attrs[ i ].name;\n\t\t\t\t\t\t\tif ( name.indexOf( \"data-\" ) === 0 ) {\n\t\t\t\t\t\t\t\tname = jQuery.camelCase( name.slice( 5 ) );\n\t\t\t\t\t\t\t\tdataAttr( elem, name, data[ name ] );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tdataPriv.set( elem, \"hasDataAttrs\", true );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn data;\n\t\t}\n\n\t\t// Sets multiple values\n\t\tif ( typeof key === \"object\" ) {\n\t\t\treturn this.each( function() {\n\t\t\t\tdataUser.set( this, key );\n\t\t\t} );\n\t\t}\n\n\t\treturn access( this, function( value ) {\n\t\t\tvar data;\n\n\t\t\t// The calling jQuery object (element matches) is not empty\n\t\t\t// (and therefore has an element appears at this[ 0 ]) and the\n\t\t\t// `value` parameter was not undefined. An empty jQuery object\n\t\t\t// will result in `undefined` for elem = this[ 0 ] which will\n\t\t\t// throw an exception if an attempt to read a data cache is made.\n\t\t\tif ( elem && value === undefined ) {\n\n\t\t\t\t// Attempt to get data from the cache\n\t\t\t\t// The key will always be camelCased in Data\n\t\t\t\tdata = dataUser.get( elem, key );\n\t\t\t\tif ( data !== undefined ) {\n\t\t\t\t\treturn data;\n\t\t\t\t}\n\n\t\t\t\t// Attempt to \"discover\" the data in\n\t\t\t\t// HTML5 custom data-* attrs\n\t\t\t\tdata = dataAttr( elem, key );\n\t\t\t\tif ( data !== undefined ) {\n\t\t\t\t\treturn data;\n\t\t\t\t}\n\n\t\t\t\t// We tried really hard, but the data doesn't exist.\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Set the data...\n\t\t\tthis.each( function() {\n\n\t\t\t\t// We always store the camelCased key\n\t\t\t\tdataUser.set( this, key, value );\n\t\t\t} );\n\t\t}, null, value, arguments.length > 1, null, true );\n\t},\n\n\tremoveData: function( key ) {\n\t\treturn this.each( function() {\n\t\t\tdataUser.remove( this, key );\n\t\t} );\n\t}\n} );\n\n\njQuery.extend( {\n\tqueue: function( elem, type, data ) {\n\t\tvar queue;\n\n\t\tif ( elem ) {\n\t\t\ttype = ( type || \"fx\" ) + \"queue\";\n\t\t\tqueue = dataPriv.get( elem, type );\n\n\t\t\t// Speed up dequeue by getting out quickly if this is just a lookup\n\t\t\tif ( data ) {\n\t\t\t\tif ( !queue || Array.isArray( data ) ) {\n\t\t\t\t\tqueue = dataPriv.access( elem, type, jQuery.makeArray( data ) );\n\t\t\t\t} else {\n\t\t\t\t\tqueue.push( data );\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn queue || [];\n\t\t}\n\t},\n\n\tdequeue: function( elem, type ) {\n\t\ttype = type || \"fx\";\n\n\t\tvar queue = jQuery.queue( elem, type ),\n\t\t\tstartLength = queue.length,\n\t\t\tfn = queue.shift(),\n\t\t\thooks = jQuery._queueHooks( elem, type ),\n\t\t\tnext = function() {\n\t\t\t\tjQuery.dequeue( elem, type );\n\t\t\t};\n\n\t\t// If the fx queue is dequeued, always remove the progress sentinel\n\t\tif ( fn === \"inprogress\" ) {\n\t\t\tfn = queue.shift();\n\t\t\tstartLength--;\n\t\t}\n\n\t\tif ( fn ) {\n\n\t\t\t// Add a progress sentinel to prevent the fx queue from being\n\t\t\t// automatically dequeued\n\t\t\tif ( type === \"fx\" ) {\n\t\t\t\tqueue.unshift( \"inprogress\" );\n\t\t\t}\n\n\t\t\t// Clear up the last queue stop function\n\t\t\tdelete hooks.stop;\n\t\t\tfn.call( elem, next, hooks );\n\t\t}\n\n\t\tif ( !startLength && hooks ) {\n\t\t\thooks.empty.fire();\n\t\t}\n\t},\n\n\t// Not public - generate a queueHooks object, or return the current one\n\t_queueHooks: function( elem, type ) {\n\t\tvar key = type + \"queueHooks\";\n\t\treturn dataPriv.get( elem, key ) || dataPriv.access( elem, key, {\n\t\t\tempty: jQuery.Callbacks( \"once memory\" ).add( function() {\n\t\t\t\tdataPriv.remove( elem, [ type + \"queue\", key ] );\n\t\t\t} )\n\t\t} );\n\t}\n} );\n\njQuery.fn.extend( {\n\tqueue: function( type, data ) {\n\t\tvar setter = 2;\n\n\t\tif ( typeof type !== \"string\" ) {\n\t\t\tdata = type;\n\t\t\ttype = \"fx\";\n\t\t\tsetter--;\n\t\t}\n\n\t\tif ( arguments.length < setter ) {\n\t\t\treturn jQuery.queue( this[ 0 ], type );\n\t\t}\n\n\t\treturn data === undefined ?\n\t\t\tthis :\n\t\t\tthis.each( function() {\n\t\t\t\tvar queue = jQuery.queue( this, type, data );\n\n\t\t\t\t// Ensure a hooks for this queue\n\t\t\t\tjQuery._queueHooks( this, type );\n\n\t\t\t\tif ( type === \"fx\" && queue[ 0 ] !== \"inprogress\" ) {\n\t\t\t\t\tjQuery.dequeue( this, type );\n\t\t\t\t}\n\t\t\t} );\n\t},\n\tdequeue: function( type ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.dequeue( this, type );\n\t\t} );\n\t},\n\tclearQueue: function( type ) {\n\t\treturn this.queue( type || \"fx\", [] );\n\t},\n\n\t// Get a promise resolved when queues of a certain type\n\t// are emptied (fx is the type by default)\n\tpromise: function( type, obj ) {\n\t\tvar tmp,\n\t\t\tcount = 1,\n\t\t\tdefer = jQuery.Deferred(),\n\t\t\telements = this,\n\t\t\ti = this.length,\n\t\t\tresolve = function() {\n\t\t\t\tif ( !( --count ) ) {\n\t\t\t\t\tdefer.resolveWith( elements, [ elements ] );\n\t\t\t\t}\n\t\t\t};\n\n\t\tif ( typeof type !== \"string\" ) {\n\t\t\tobj = type;\n\t\t\ttype = undefined;\n\t\t}\n\t\ttype = type || \"fx\";\n\n\t\twhile ( i-- ) {\n\t\t\ttmp = dataPriv.get( elements[ i ], type + \"queueHooks\" );\n\t\t\tif ( tmp && tmp.empty ) {\n\t\t\t\tcount++;\n\t\t\t\ttmp.empty.add( resolve );\n\t\t\t}\n\t\t}\n\t\tresolve();\n\t\treturn defer.promise( obj );\n\t}\n} );\nvar pnum = ( /[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/ ).source;\n\nvar rcssNum = new RegExp( \"^(?:([+-])=|)(\" + pnum + \")([a-z%]*)$\", \"i\" );\n\n\nvar cssExpand = [ \"Top\", \"Right\", \"Bottom\", \"Left\" ];\n\nvar isHiddenWithinTree = function( elem, el ) {\n\n\t\t// isHiddenWithinTree might be called from jQuery#filter function;\n\t\t// in that case, element will be second argument\n\t\telem = el || elem;\n\n\t\t// Inline style trumps all\n\t\treturn elem.style.display === \"none\" ||\n\t\t\telem.style.display === \"\" &&\n\n\t\t\t// Otherwise, check computed style\n\t\t\t// Support: Firefox <=43 - 45\n\t\t\t// Disconnected elements can have computed display: none, so first confirm that elem is\n\t\t\t// in the document.\n\t\t\tjQuery.contains( elem.ownerDocument, elem ) &&\n\n\t\t\tjQuery.css( elem, \"display\" ) === \"none\";\n\t};\n\nvar swap = function( elem, options, callback, args ) {\n\tvar ret, name,\n\t\told = {};\n\n\t// Remember the old values, and insert the new ones\n\tfor ( name in options ) {\n\t\told[ name ] = elem.style[ name ];\n\t\telem.style[ name ] = options[ name ];\n\t}\n\n\tret = callback.apply( elem, args || [] );\n\n\t// Revert the old values\n\tfor ( name in options ) {\n\t\telem.style[ name ] = old[ name ];\n\t}\n\n\treturn ret;\n};\n\n\n\n\nfunction adjustCSS( elem, prop, valueParts, tween ) {\n\tvar adjusted,\n\t\tscale = 1,\n\t\tmaxIterations = 20,\n\t\tcurrentValue = tween ?\n\t\t\tfunction() {\n\t\t\t\treturn tween.cur();\n\t\t\t} :\n\t\t\tfunction() {\n\t\t\t\treturn jQuery.css( elem, prop, \"\" );\n\t\t\t},\n\t\tinitial = currentValue(),\n\t\tunit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" ),\n\n\t\t// Starting value computation is required for potential unit mismatches\n\t\tinitialInUnit = ( jQuery.cssNumber[ prop ] || unit !== \"px\" && +initial ) &&\n\t\t\trcssNum.exec( jQuery.css( elem, prop ) );\n\n\tif ( initialInUnit && initialInUnit[ 3 ] !== unit ) {\n\n\t\t// Trust units reported by jQuery.css\n\t\tunit = unit || initialInUnit[ 3 ];\n\n\t\t// Make sure we update the tween properties later on\n\t\tvalueParts = valueParts || [];\n\n\t\t// Iteratively approximate from a nonzero starting point\n\t\tinitialInUnit = +initial || 1;\n\n\t\tdo {\n\n\t\t\t// If previous iteration zeroed out, double until we get *something*.\n\t\t\t// Use string for doubling so we don't accidentally see scale as unchanged below\n\t\t\tscale = scale || \".5\";\n\n\t\t\t// Adjust and apply\n\t\t\tinitialInUnit = initialInUnit / scale;\n\t\t\tjQuery.style( elem, prop, initialInUnit + unit );\n\n\t\t// Update scale, tolerating zero or NaN from tween.cur()\n\t\t// Break the loop if scale is unchanged or perfect, or if we've just had enough.\n\t\t} while (\n\t\t\tscale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations\n\t\t);\n\t}\n\n\tif ( valueParts ) {\n\t\tinitialInUnit = +initialInUnit || +initial || 0;\n\n\t\t// Apply relative offset (+=/-=) if specified\n\t\tadjusted = valueParts[ 1 ] ?\n\t\t\tinitialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :\n\t\t\t+valueParts[ 2 ];\n\t\tif ( tween ) {\n\t\t\ttween.unit = unit;\n\t\t\ttween.start = initialInUnit;\n\t\t\ttween.end = adjusted;\n\t\t}\n\t}\n\treturn adjusted;\n}\n\n\nvar defaultDisplayMap = {};\n\nfunction getDefaultDisplay( elem ) {\n\tvar temp,\n\t\tdoc = elem.ownerDocument,\n\t\tnodeName = elem.nodeName,\n\t\tdisplay = defaultDisplayMap[ nodeName ];\n\n\tif ( display ) {\n\t\treturn display;\n\t}\n\n\ttemp = doc.body.appendChild( doc.createElement( nodeName ) );\n\tdisplay = jQuery.css( temp, \"display\" );\n\n\ttemp.parentNode.removeChild( temp );\n\n\tif ( display === \"none\" ) {\n\t\tdisplay = \"block\";\n\t}\n\tdefaultDisplayMap[ nodeName ] = display;\n\n\treturn display;\n}\n\nfunction showHide( elements, show ) {\n\tvar display, elem,\n\t\tvalues = [],\n\t\tindex = 0,\n\t\tlength = elements.length;\n\n\t// Determine new display value for elements that need to change\n\tfor ( ; index < length; index++ ) {\n\t\telem = elements[ index ];\n\t\tif ( !elem.style ) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tdisplay = elem.style.display;\n\t\tif ( show ) {\n\n\t\t\t// Since we force visibility upon cascade-hidden elements, an immediate (and slow)\n\t\t\t// check is required in this first loop unless we have a nonempty display value (either\n\t\t\t// inline or about-to-be-restored)\n\t\t\tif ( display === \"none\" ) {\n\t\t\t\tvalues[ index ] = dataPriv.get( elem, \"display\" ) || null;\n\t\t\t\tif ( !values[ index ] ) {\n\t\t\t\t\telem.style.display = \"\";\n\t\t\t\t}\n\t\t\t}\n\t\t\tif ( elem.style.display === \"\" && isHiddenWithinTree( elem ) ) {\n\t\t\t\tvalues[ index ] = getDefaultDisplay( elem );\n\t\t\t}\n\t\t} else {\n\t\t\tif ( display !== \"none\" ) {\n\t\t\t\tvalues[ index ] = \"none\";\n\n\t\t\t\t// Remember what we're overwriting\n\t\t\t\tdataPriv.set( elem, \"display\", display );\n\t\t\t}\n\t\t}\n\t}\n\n\t// Set the display of the elements in a second loop to avoid constant reflow\n\tfor ( index = 0; index < length; index++ ) {\n\t\tif ( values[ index ] != null ) {\n\t\t\telements[ index ].style.display = values[ index ];\n\t\t}\n\t}\n\n\treturn elements;\n}\n\njQuery.fn.extend( {\n\tshow: function() {\n\t\treturn showHide( this, true );\n\t},\n\thide: function() {\n\t\treturn showHide( this );\n\t},\n\ttoggle: function( state ) {\n\t\tif ( typeof state === \"boolean\" ) {\n\t\t\treturn state ? this.show() : this.hide();\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tif ( isHiddenWithinTree( this ) ) {\n\t\t\t\tjQuery( this ).show();\n\t\t\t} else {\n\t\t\t\tjQuery( this ).hide();\n\t\t\t}\n\t\t} );\n\t}\n} );\nvar rcheckableType = ( /^(?:checkbox|radio)$/i );\n\nvar rtagName = ( /<([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]+)/i );\n\nvar rscriptType = ( /^$|\\/(?:java|ecma)script/i );\n\n\n\n// We have to close these tags to support XHTML (#13200)\nvar wrapMap = {\n\n\t// Support: IE <=9 only\n\toption: [ 1, \"<select multiple='multiple'>\", \"</select>\" ],\n\n\t// XHTML parsers do not magically insert elements in the\n\t// same way that tag soup parsers do. So we cannot shorten\n\t// this by omitting <tbody> or other required elements.\n\tthead: [ 1, \"<table>\", \"</table>\" ],\n\tcol: [ 2, \"<table><colgroup>\", \"</colgroup></table>\" ],\n\ttr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],\n\ttd: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],\n\n\t_default: [ 0, \"\", \"\" ]\n};\n\n// Support: IE <=9 only\nwrapMap.optgroup = wrapMap.option;\n\nwrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\nwrapMap.th = wrapMap.td;\n\n\nfunction getAll( context, tag ) {\n\n\t// Support: IE <=9 - 11 only\n\t// Use typeof to avoid zero-argument method invocation on host objects (#15151)\n\tvar ret;\n\n\tif ( typeof context.getElementsByTagName !== \"undefined\" ) {\n\t\tret = context.getElementsByTagName( tag || \"*\" );\n\n\t} else if ( typeof context.querySelectorAll !== \"undefined\" ) {\n\t\tret = context.querySelectorAll( tag || \"*\" );\n\n\t} else {\n\t\tret = [];\n\t}\n\n\tif ( tag === undefined || tag && nodeName( context, tag ) ) {\n\t\treturn jQuery.merge( [ context ], ret );\n\t}\n\n\treturn ret;\n}\n\n\n// Mark scripts as having already been evaluated\nfunction setGlobalEval( elems, refElements ) {\n\tvar i = 0,\n\t\tl = elems.length;\n\n\tfor ( ; i < l; i++ ) {\n\t\tdataPriv.set(\n\t\t\telems[ i ],\n\t\t\t\"globalEval\",\n\t\t\t!refElements || dataPriv.get( refElements[ i ], \"globalEval\" )\n\t\t);\n\t}\n}\n\n\nvar rhtml = /<|&#?\\w+;/;\n\nfunction buildFragment( elems, context, scripts, selection, ignored ) {\n\tvar elem, tmp, tag, wrap, contains, j,\n\t\tfragment = context.createDocumentFragment(),\n\t\tnodes = [],\n\t\ti = 0,\n\t\tl = elems.length;\n\n\tfor ( ; i < l; i++ ) {\n\t\telem = elems[ i ];\n\n\t\tif ( elem || elem === 0 ) {\n\n\t\t\t// Add nodes directly\n\t\t\tif ( jQuery.type( elem ) === \"object\" ) {\n\n\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\tjQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );\n\n\t\t\t// Convert non-html into a text node\n\t\t\t} else if ( !rhtml.test( elem ) ) {\n\t\t\t\tnodes.push( context.createTextNode( elem ) );\n\n\t\t\t// Convert html into DOM nodes\n\t\t\t} else {\n\t\t\t\ttmp = tmp || fragment.appendChild( context.createElement( \"div\" ) );\n\n\t\t\t\t// Deserialize a standard representation\n\t\t\t\ttag = ( rtagName.exec( elem ) || [ \"\", \"\" ] )[ 1 ].toLowerCase();\n\t\t\t\twrap = wrapMap[ tag ] || wrapMap._default;\n\t\t\t\ttmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];\n\n\t\t\t\t// Descend through wrappers to the right content\n\t\t\t\tj = wrap[ 0 ];\n\t\t\t\twhile ( j-- ) {\n\t\t\t\t\ttmp = tmp.lastChild;\n\t\t\t\t}\n\n\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\tjQuery.merge( nodes, tmp.childNodes );\n\n\t\t\t\t// Remember the top-level container\n\t\t\t\ttmp = fragment.firstChild;\n\n\t\t\t\t// Ensure the created nodes are orphaned (#12392)\n\t\t\t\ttmp.textContent = \"\";\n\t\t\t}\n\t\t}\n\t}\n\n\t// Remove wrapper from fragment\n\tfragment.textContent = \"\";\n\n\ti = 0;\n\twhile ( ( elem = nodes[ i++ ] ) ) {\n\n\t\t// Skip elements already in the context collection (trac-4087)\n\t\tif ( selection && jQuery.inArray( elem, selection ) > -1 ) {\n\t\t\tif ( ignored ) {\n\t\t\t\tignored.push( elem );\n\t\t\t}\n\t\t\tcontinue;\n\t\t}\n\n\t\tcontains = jQuery.contains( elem.ownerDocument, elem );\n\n\t\t// Append to fragment\n\t\ttmp = getAll( fragment.appendChild( elem ), \"script\" );\n\n\t\t// Preserve script evaluation history\n\t\tif ( contains ) {\n\t\t\tsetGlobalEval( tmp );\n\t\t}\n\n\t\t// Capture executables\n\t\tif ( scripts ) {\n\t\t\tj = 0;\n\t\t\twhile ( ( elem = tmp[ j++ ] ) ) {\n\t\t\t\tif ( rscriptType.test( elem.type || \"\" ) ) {\n\t\t\t\t\tscripts.push( elem );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn fragment;\n}\n\n\n( function() {\n\tvar fragment = document.createDocumentFragment(),\n\t\tdiv = fragment.appendChild( document.createElement( \"div\" ) ),\n\t\tinput = document.createElement( \"input\" );\n\n\t// Support: Android 4.0 - 4.3 only\n\t// Check state lost if the name is set (#11217)\n\t// Support: Windows Web Apps (WWA)\n\t// `name` and `type` must use .setAttribute for WWA (#14901)\n\tinput.setAttribute( \"type\", \"radio\" );\n\tinput.setAttribute( \"checked\", \"checked\" );\n\tinput.setAttribute( \"name\", \"t\" );\n\n\tdiv.appendChild( input );\n\n\t// Support: Android <=4.1 only\n\t// Older WebKit doesn't clone checked state correctly in fragments\n\tsupport.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\n\t// Support: IE <=11 only\n\t// Make sure textarea (and checkbox) defaultValue is properly cloned\n\tdiv.innerHTML = \"<textarea>x</textarea>\";\n\tsupport.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;\n} )();\nvar documentElement = document.documentElement;\n\n\n\nvar\n\trkeyEvent = /^key/,\n\trmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,\n\trtypenamespace = /^([^.]*)(?:\\.(.+)|)/;\n\nfunction returnTrue() {\n\treturn true;\n}\n\nfunction returnFalse() {\n\treturn false;\n}\n\n// Support: IE <=9 only\n// See #13393 for more info\nfunction safeActiveElement() {\n\ttry {\n\t\treturn document.activeElement;\n\t} catch ( err ) { }\n}\n\nfunction on( elem, types, selector, data, fn, one ) {\n\tvar origFn, type;\n\n\t// Types can be a map of types/handlers\n\tif ( typeof types === \"object\" ) {\n\n\t\t// ( types-Object, selector, data )\n\t\tif ( typeof selector !== \"string\" ) {\n\n\t\t\t// ( types-Object, data )\n\t\t\tdata = data || selector;\n\t\t\tselector = undefined;\n\t\t}\n\t\tfor ( type in types ) {\n\t\t\ton( elem, type, selector, data, types[ type ], one );\n\t\t}\n\t\treturn elem;\n\t}\n\n\tif ( data == null && fn == null ) {\n\n\t\t// ( types, fn )\n\t\tfn = selector;\n\t\tdata = selector = undefined;\n\t} else if ( fn == null ) {\n\t\tif ( typeof selector === \"string\" ) {\n\n\t\t\t// ( types, selector, fn )\n\t\t\tfn = data;\n\t\t\tdata = undefined;\n\t\t} else {\n\n\t\t\t// ( types, data, fn )\n\t\t\tfn = data;\n\t\t\tdata = selector;\n\t\t\tselector = undefined;\n\t\t}\n\t}\n\tif ( fn === false ) {\n\t\tfn = returnFalse;\n\t} else if ( !fn ) {\n\t\treturn elem;\n\t}\n\n\tif ( one === 1 ) {\n\t\torigFn = fn;\n\t\tfn = function( event ) {\n\n\t\t\t// Can use an empty set, since event contains the info\n\t\t\tjQuery().off( event );\n\t\t\treturn origFn.apply( this, arguments );\n\t\t};\n\n\t\t// Use same guid so caller can remove using origFn\n\t\tfn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );\n\t}\n\treturn elem.each( function() {\n\t\tjQuery.event.add( this, types, fn, data, selector );\n\t} );\n}\n\n/*\n * Helper functions for managing events -- not part of the public interface.\n * Props to Dean Edwards' addEvent library for many of the ideas.\n */\njQuery.event = {\n\n\tglobal: {},\n\n\tadd: function( elem, types, handler, data, selector ) {\n\n\t\tvar handleObjIn, eventHandle, tmp,\n\t\t\tevents, t, handleObj,\n\t\t\tspecial, handlers, type, namespaces, origType,\n\t\t\telemData = dataPriv.get( elem );\n\n\t\t// Don't attach events to noData or text/comment nodes (but allow plain objects)\n\t\tif ( !elemData ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Caller can pass in an object of custom data in lieu of the handler\n\t\tif ( handler.handler ) {\n\t\t\thandleObjIn = handler;\n\t\t\thandler = handleObjIn.handler;\n\t\t\tselector = handleObjIn.selector;\n\t\t}\n\n\t\t// Ensure that invalid selectors throw exceptions at attach time\n\t\t// Evaluate against documentElement in case elem is a non-element node (e.g., document)\n\t\tif ( selector ) {\n\t\t\tjQuery.find.matchesSelector( documentElement, selector );\n\t\t}\n\n\t\t// Make sure that the handler has a unique ID, used to find/remove it later\n\t\tif ( !handler.guid ) {\n\t\t\thandler.guid = jQuery.guid++;\n\t\t}\n\n\t\t// Init the element's event structure and main handler, if this is the first\n\t\tif ( !( events = elemData.events ) ) {\n\t\t\tevents = elemData.events = {};\n\t\t}\n\t\tif ( !( eventHandle = elemData.handle ) ) {\n\t\t\teventHandle = elemData.handle = function( e ) {\n\n\t\t\t\t// Discard the second event of a jQuery.event.trigger() and\n\t\t\t\t// when an event is called after a page has unloaded\n\t\t\t\treturn typeof jQuery !== \"undefined\" && jQuery.event.triggered !== e.type ?\n\t\t\t\t\tjQuery.event.dispatch.apply( elem, arguments ) : undefined;\n\t\t\t};\n\t\t}\n\n\t\t// Handle multiple events separated by a space\n\t\ttypes = ( types || \"\" ).match( rnothtmlwhite ) || [ \"\" ];\n\t\tt = types.length;\n\t\twhile ( t-- ) {\n\t\t\ttmp = rtypenamespace.exec( types[ t ] ) || [];\n\t\t\ttype = origType = tmp[ 1 ];\n\t\t\tnamespaces = ( tmp[ 2 ] || \"\" ).split( \".\" ).sort();\n\n\t\t\t// There *must* be a type, no attaching namespace-only handlers\n\t\t\tif ( !type ) {\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\t// If event changes its type, use the special event handlers for the changed type\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\n\t\t\t// If selector defined, determine special event api type, otherwise given type\n\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\n\t\t\t// Update special based on newly reset type\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\n\t\t\t// handleObj is passed to all event handlers\n\t\t\thandleObj = jQuery.extend( {\n\t\t\t\ttype: type,\n\t\t\t\torigType: origType,\n\t\t\t\tdata: data,\n\t\t\t\thandler: handler,\n\t\t\t\tguid: handler.guid,\n\t\t\t\tselector: selector,\n\t\t\t\tneedsContext: selector && jQuery.expr.match.needsContext.test( selector ),\n\t\t\t\tnamespace: namespaces.join( \".\" )\n\t\t\t}, handleObjIn );\n\n\t\t\t// Init the event handler queue if we're the first\n\t\t\tif ( !( handlers = events[ type ] ) ) {\n\t\t\t\thandlers = events[ type ] = [];\n\t\t\t\thandlers.delegateCount = 0;\n\n\t\t\t\t// Only use addEventListener if the special events handler returns false\n\t\t\t\tif ( !special.setup ||\n\t\t\t\t\tspecial.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n\n\t\t\t\t\tif ( elem.addEventListener ) {\n\t\t\t\t\t\telem.addEventListener( type, eventHandle );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ( special.add ) {\n\t\t\t\tspecial.add.call( elem, handleObj );\n\n\t\t\t\tif ( !handleObj.handler.guid ) {\n\t\t\t\t\thandleObj.handler.guid = handler.guid;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Add to the element's handler list, delegates in front\n\t\t\tif ( selector ) {\n\t\t\t\thandlers.splice( handlers.delegateCount++, 0, handleObj );\n\t\t\t} else {\n\t\t\t\thandlers.push( handleObj );\n\t\t\t}\n\n\t\t\t// Keep track of which events have ever been used, for event optimization\n\t\t\tjQuery.event.global[ type ] = true;\n\t\t}\n\n\t},\n\n\t// Detach an event or set of events from an element\n\tremove: function( elem, types, handler, selector, mappedTypes ) {\n\n\t\tvar j, origCount, tmp,\n\t\t\tevents, t, handleObj,\n\t\t\tspecial, handlers, type, namespaces, origType,\n\t\t\telemData = dataPriv.hasData( elem ) && dataPriv.get( elem );\n\n\t\tif ( !elemData || !( events = elemData.events ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Once for each type.namespace in types; type may be omitted\n\t\ttypes = ( types || \"\" ).match( rnothtmlwhite ) || [ \"\" ];\n\t\tt = types.length;\n\t\twhile ( t-- ) {\n\t\t\ttmp = rtypenamespace.exec( types[ t ] ) || [];\n\t\t\ttype = origType = tmp[ 1 ];\n\t\t\tnamespaces = ( tmp[ 2 ] || \"\" ).split( \".\" ).sort();\n\n\t\t\t// Unbind all events (on this namespace, if provided) for the element\n\t\t\tif ( !type ) {\n\t\t\t\tfor ( type in events ) {\n\t\t\t\t\tjQuery.event.remove( elem, type + types[ t ], handler, selector, true );\n\t\t\t\t}\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tspecial = jQuery.event.special[ type ] || {};\n\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\t\t\thandlers = events[ type ] || [];\n\t\t\ttmp = tmp[ 2 ] &&\n\t\t\t\tnew RegExp( \"(^|\\\\.)\" + namespaces.join( \"\\\\.(?:.*\\\\.|)\" ) + \"(\\\\.|$)\" );\n\n\t\t\t// Remove matching events\n\t\t\torigCount = j = handlers.length;\n\t\t\twhile ( j-- ) {\n\t\t\t\thandleObj = handlers[ j ];\n\n\t\t\t\tif ( ( mappedTypes || origType === handleObj.origType ) &&\n\t\t\t\t\t( !handler || handler.guid === handleObj.guid ) &&\n\t\t\t\t\t( !tmp || tmp.test( handleObj.namespace ) ) &&\n\t\t\t\t\t( !selector || selector === handleObj.selector ||\n\t\t\t\t\t\tselector === \"**\" && handleObj.selector ) ) {\n\t\t\t\t\thandlers.splice( j, 1 );\n\n\t\t\t\t\tif ( handleObj.selector ) {\n\t\t\t\t\t\thandlers.delegateCount--;\n\t\t\t\t\t}\n\t\t\t\t\tif ( special.remove ) {\n\t\t\t\t\t\tspecial.remove.call( elem, handleObj );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Remove generic event handler if we removed something and no more handlers exist\n\t\t\t// (avoids potential for endless recursion during removal of special event handlers)\n\t\t\tif ( origCount && !handlers.length ) {\n\t\t\t\tif ( !special.teardown ||\n\t\t\t\t\tspecial.teardown.call( elem, namespaces, elemData.handle ) === false ) {\n\n\t\t\t\t\tjQuery.removeEvent( elem, type, elemData.handle );\n\t\t\t\t}\n\n\t\t\t\tdelete events[ type ];\n\t\t\t}\n\t\t}\n\n\t\t// Remove data and the expando if it's no longer used\n\t\tif ( jQuery.isEmptyObject( events ) ) {\n\t\t\tdataPriv.remove( elem, \"handle events\" );\n\t\t}\n\t},\n\n\tdispatch: function( nativeEvent ) {\n\n\t\t// Make a writable jQuery.Event from the native event object\n\t\tvar event = jQuery.event.fix( nativeEvent );\n\n\t\tvar i, j, ret, matched, handleObj, handlerQueue,\n\t\t\targs = new Array( arguments.length ),\n\t\t\thandlers = ( dataPriv.get( this, \"events\" ) || {} )[ event.type ] || [],\n\t\t\tspecial = jQuery.event.special[ event.type ] || {};\n\n\t\t// Use the fix-ed jQuery.Event rather than the (read-only) native event\n\t\targs[ 0 ] = event;\n\n\t\tfor ( i = 1; i < arguments.length; i++ ) {\n\t\t\targs[ i ] = arguments[ i ];\n\t\t}\n\n\t\tevent.delegateTarget = this;\n\n\t\t// Call the preDispatch hook for the mapped type, and let it bail if desired\n\t\tif ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Determine handlers\n\t\thandlerQueue = jQuery.event.handlers.call( this, event, handlers );\n\n\t\t// Run delegates first; they may want to stop propagation beneath us\n\t\ti = 0;\n\t\twhile ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {\n\t\t\tevent.currentTarget = matched.elem;\n\n\t\t\tj = 0;\n\t\t\twhile ( ( handleObj = matched.handlers[ j++ ] ) &&\n\t\t\t\t!event.isImmediatePropagationStopped() ) {\n\n\t\t\t\t// Triggered event must either 1) have no namespace, or 2) have namespace(s)\n\t\t\t\t// a subset or equal to those in the bound event (both can have no namespace).\n\t\t\t\tif ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {\n\n\t\t\t\t\tevent.handleObj = handleObj;\n\t\t\t\t\tevent.data = handleObj.data;\n\n\t\t\t\t\tret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||\n\t\t\t\t\t\thandleObj.handler ).apply( matched.elem, args );\n\n\t\t\t\t\tif ( ret !== undefined ) {\n\t\t\t\t\t\tif ( ( event.result = ret ) === false ) {\n\t\t\t\t\t\t\tevent.preventDefault();\n\t\t\t\t\t\t\tevent.stopPropagation();\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Call the postDispatch hook for the mapped type\n\t\tif ( special.postDispatch ) {\n\t\t\tspecial.postDispatch.call( this, event );\n\t\t}\n\n\t\treturn event.result;\n\t},\n\n\thandlers: function( event, handlers ) {\n\t\tvar i, handleObj, sel, matchedHandlers, matchedSelectors,\n\t\t\thandlerQueue = [],\n\t\t\tdelegateCount = handlers.delegateCount,\n\t\t\tcur = event.target;\n\n\t\t// Find delegate handlers\n\t\tif ( delegateCount &&\n\n\t\t\t// Support: IE <=9\n\t\t\t// Black-hole SVG <use> instance trees (trac-13180)\n\t\t\tcur.nodeType &&\n\n\t\t\t// Support: Firefox <=42\n\t\t\t// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)\n\t\t\t// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click\n\t\t\t// Support: IE 11 only\n\t\t\t// ...but not arrow key \"clicks\" of radio inputs, which can have `button` -1 (gh-2343)\n\t\t\t!( event.type === \"click\" && event.button >= 1 ) ) {\n\n\t\t\tfor ( ; cur !== this; cur = cur.parentNode || this ) {\n\n\t\t\t\t// Don't check non-elements (#13208)\n\t\t\t\t// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)\n\t\t\t\tif ( cur.nodeType === 1 && !( event.type === \"click\" && cur.disabled === true ) ) {\n\t\t\t\t\tmatchedHandlers = [];\n\t\t\t\t\tmatchedSelectors = {};\n\t\t\t\t\tfor ( i = 0; i < delegateCount; i++ ) {\n\t\t\t\t\t\thandleObj = handlers[ i ];\n\n\t\t\t\t\t\t// Don't conflict with Object.prototype properties (#13203)\n\t\t\t\t\t\tsel = handleObj.selector + \" \";\n\n\t\t\t\t\t\tif ( matchedSelectors[ sel ] === undefined ) {\n\t\t\t\t\t\t\tmatchedSelectors[ sel ] = handleObj.needsContext ?\n\t\t\t\t\t\t\t\tjQuery( sel, this ).index( cur ) > -1 :\n\t\t\t\t\t\t\t\tjQuery.find( sel, this, null, [ cur ] ).length;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif ( matchedSelectors[ sel ] ) {\n\t\t\t\t\t\t\tmatchedHandlers.push( handleObj );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tif ( matchedHandlers.length ) {\n\t\t\t\t\t\thandlerQueue.push( { elem: cur, handlers: matchedHandlers } );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Add the remaining (directly-bound) handlers\n\t\tcur = this;\n\t\tif ( delegateCount < handlers.length ) {\n\t\t\thandlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );\n\t\t}\n\n\t\treturn handlerQueue;\n\t},\n\n\taddProp: function( name, hook ) {\n\t\tObject.defineProperty( jQuery.Event.prototype, name, {\n\t\t\tenumerable: true,\n\t\t\tconfigurable: true,\n\n\t\t\tget: jQuery.isFunction( hook ) ?\n\t\t\t\tfunction() {\n\t\t\t\t\tif ( this.originalEvent ) {\n\t\t\t\t\t\t\treturn hook( this.originalEvent );\n\t\t\t\t\t}\n\t\t\t\t} :\n\t\t\t\tfunction() {\n\t\t\t\t\tif ( this.originalEvent ) {\n\t\t\t\t\t\t\treturn this.originalEvent[ name ];\n\t\t\t\t\t}\n\t\t\t\t},\n\n\t\t\tset: function( value ) {\n\t\t\t\tObject.defineProperty( this, name, {\n\t\t\t\t\tenumerable: true,\n\t\t\t\t\tconfigurable: true,\n\t\t\t\t\twritable: true,\n\t\t\t\t\tvalue: value\n\t\t\t\t} );\n\t\t\t}\n\t\t} );\n\t},\n\n\tfix: function( originalEvent ) {\n\t\treturn originalEvent[ jQuery.expando ] ?\n\t\t\toriginalEvent :\n\t\t\tnew jQuery.Event( originalEvent );\n\t},\n\n\tspecial: {\n\t\tload: {\n\n\t\t\t// Prevent triggered image.load events from bubbling to window.load\n\t\t\tnoBubble: true\n\t\t},\n\t\tfocus: {\n\n\t\t\t// Fire native event if possible so blur/focus sequence is correct\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this !== safeActiveElement() && this.focus ) {\n\t\t\t\t\tthis.focus();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdelegateType: \"focusin\"\n\t\t},\n\t\tblur: {\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this === safeActiveElement() && this.blur ) {\n\t\t\t\t\tthis.blur();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\t\t\tdelegateType: \"focusout\"\n\t\t},\n\t\tclick: {\n\n\t\t\t// For checkbox, fire native event so checked state will be right\n\t\t\ttrigger: function() {\n\t\t\t\tif ( this.type === \"checkbox\" && this.click && nodeName( this, \"input\" ) ) {\n\t\t\t\t\tthis.click();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t},\n\n\t\t\t// For cross-browser consistency, don't fire native .click() on links\n\t\t\t_default: function( event ) {\n\t\t\t\treturn nodeName( event.target, \"a\" );\n\t\t\t}\n\t\t},\n\n\t\tbeforeunload: {\n\t\t\tpostDispatch: function( event ) {\n\n\t\t\t\t// Support: Firefox 20+\n\t\t\t\t// Firefox doesn't alert if the returnValue field is not set.\n\t\t\t\tif ( event.result !== undefined && event.originalEvent ) {\n\t\t\t\t\tevent.originalEvent.returnValue = event.result;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n};\n\njQuery.removeEvent = function( elem, type, handle ) {\n\n\t// This \"if\" is needed for plain objects\n\tif ( elem.removeEventListener ) {\n\t\telem.removeEventListener( type, handle );\n\t}\n};\n\njQuery.Event = function( src, props ) {\n\n\t// Allow instantiation without the 'new' keyword\n\tif ( !( this instanceof jQuery.Event ) ) {\n\t\treturn new jQuery.Event( src, props );\n\t}\n\n\t// Event object\n\tif ( src && src.type ) {\n\t\tthis.originalEvent = src;\n\t\tthis.type = src.type;\n\n\t\t// Events bubbling up the document may have been marked as prevented\n\t\t// by a handler lower down the tree; reflect the correct value.\n\t\tthis.isDefaultPrevented = src.defaultPrevented ||\n\t\t\t\tsrc.defaultPrevented === undefined &&\n\n\t\t\t\t// Support: Android <=2.3 only\n\t\t\t\tsrc.returnValue === false ?\n\t\t\treturnTrue :\n\t\t\treturnFalse;\n\n\t\t// Create target properties\n\t\t// Support: Safari <=6 - 7 only\n\t\t// Target should not be a text node (#504, #13143)\n\t\tthis.target = ( src.target && src.target.nodeType === 3 ) ?\n\t\t\tsrc.target.parentNode :\n\t\t\tsrc.target;\n\n\t\tthis.currentTarget = src.currentTarget;\n\t\tthis.relatedTarget = src.relatedTarget;\n\n\t// Event type\n\t} else {\n\t\tthis.type = src;\n\t}\n\n\t// Put explicitly provided properties onto the event object\n\tif ( props ) {\n\t\tjQuery.extend( this, props );\n\t}\n\n\t// Create a timestamp if incoming event doesn't have one\n\tthis.timeStamp = src && src.timeStamp || jQuery.now();\n\n\t// Mark it as fixed\n\tthis[ jQuery.expando ] = true;\n};\n\n// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\njQuery.Event.prototype = {\n\tconstructor: jQuery.Event,\n\tisDefaultPrevented: returnFalse,\n\tisPropagationStopped: returnFalse,\n\tisImmediatePropagationStopped: returnFalse,\n\tisSimulated: false,\n\n\tpreventDefault: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isDefaultPrevented = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.preventDefault();\n\t\t}\n\t},\n\tstopPropagation: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isPropagationStopped = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.stopPropagation();\n\t\t}\n\t},\n\tstopImmediatePropagation: function() {\n\t\tvar e = this.originalEvent;\n\n\t\tthis.isImmediatePropagationStopped = returnTrue;\n\n\t\tif ( e && !this.isSimulated ) {\n\t\t\te.stopImmediatePropagation();\n\t\t}\n\n\t\tthis.stopPropagation();\n\t}\n};\n\n// Includes all common event props including KeyEvent and MouseEvent specific props\njQuery.each( {\n\taltKey: true,\n\tbubbles: true,\n\tcancelable: true,\n\tchangedTouches: true,\n\tctrlKey: true,\n\tdetail: true,\n\teventPhase: true,\n\tmetaKey: true,\n\tpageX: true,\n\tpageY: true,\n\tshiftKey: true,\n\tview: true,\n\t\"char\": true,\n\tcharCode: true,\n\tkey: true,\n\tkeyCode: true,\n\tbutton: true,\n\tbuttons: true,\n\tclientX: true,\n\tclientY: true,\n\toffsetX: true,\n\toffsetY: true,\n\tpointerId: true,\n\tpointerType: true,\n\tscreenX: true,\n\tscreenY: true,\n\ttargetTouches: true,\n\ttoElement: true,\n\ttouches: true,\n\n\twhich: function( event ) {\n\t\tvar button = event.button;\n\n\t\t// Add which for key events\n\t\tif ( event.which == null && rkeyEvent.test( event.type ) ) {\n\t\t\treturn event.charCode != null ? event.charCode : event.keyCode;\n\t\t}\n\n\t\t// Add which for click: 1 === left; 2 === middle; 3 === right\n\t\tif ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {\n\t\t\tif ( button & 1 ) {\n\t\t\t\treturn 1;\n\t\t\t}\n\n\t\t\tif ( button & 2 ) {\n\t\t\t\treturn 3;\n\t\t\t}\n\n\t\t\tif ( button & 4 ) {\n\t\t\t\treturn 2;\n\t\t\t}\n\n\t\t\treturn 0;\n\t\t}\n\n\t\treturn event.which;\n\t}\n}, jQuery.event.addProp );\n\n// Create mouseenter/leave events using mouseover/out and event-time checks\n// so that event delegation works in jQuery.\n// Do the same for pointerenter/pointerleave and pointerover/pointerout\n//\n// Support: Safari 7 only\n// Safari sends mouseenter too often; see:\n// https://bugs.chromium.org/p/chromium/issues/detail?id=470258\n// for the description of the bug (it existed in older Chrome versions as well).\njQuery.each( {\n\tmouseenter: \"mouseover\",\n\tmouseleave: \"mouseout\",\n\tpointerenter: \"pointerover\",\n\tpointerleave: \"pointerout\"\n}, function( orig, fix ) {\n\tjQuery.event.special[ orig ] = {\n\t\tdelegateType: fix,\n\t\tbindType: fix,\n\n\t\thandle: function( event ) {\n\t\t\tvar ret,\n\t\t\t\ttarget = this,\n\t\t\t\trelated = event.relatedTarget,\n\t\t\t\thandleObj = event.handleObj;\n\n\t\t\t// For mouseenter/leave call the handler if related is outside the target.\n\t\t\t// NB: No relatedTarget if the mouse left/entered the browser window\n\t\t\tif ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {\n\t\t\t\tevent.type = handleObj.origType;\n\t\t\t\tret = handleObj.handler.apply( this, arguments );\n\t\t\t\tevent.type = fix;\n\t\t\t}\n\t\t\treturn ret;\n\t\t}\n\t};\n} );\n\njQuery.fn.extend( {\n\n\ton: function( types, selector, data, fn ) {\n\t\treturn on( this, types, selector, data, fn );\n\t},\n\tone: function( types, selector, data, fn ) {\n\t\treturn on( this, types, selector, data, fn, 1 );\n\t},\n\toff: function( types, selector, fn ) {\n\t\tvar handleObj, type;\n\t\tif ( types && types.preventDefault && types.handleObj ) {\n\n\t\t\t// ( event )  dispatched jQuery.Event\n\t\t\thandleObj = types.handleObj;\n\t\t\tjQuery( types.delegateTarget ).off(\n\t\t\t\thandleObj.namespace ?\n\t\t\t\t\thandleObj.origType + \".\" + handleObj.namespace :\n\t\t\t\t\thandleObj.origType,\n\t\t\t\thandleObj.selector,\n\t\t\t\thandleObj.handler\n\t\t\t);\n\t\t\treturn this;\n\t\t}\n\t\tif ( typeof types === \"object\" ) {\n\n\t\t\t// ( types-object [, selector] )\n\t\t\tfor ( type in types ) {\n\t\t\t\tthis.off( type, selector, types[ type ] );\n\t\t\t}\n\t\t\treturn this;\n\t\t}\n\t\tif ( selector === false || typeof selector === \"function\" ) {\n\n\t\t\t// ( types [, fn] )\n\t\t\tfn = selector;\n\t\t\tselector = undefined;\n\t\t}\n\t\tif ( fn === false ) {\n\t\t\tfn = returnFalse;\n\t\t}\n\t\treturn this.each( function() {\n\t\t\tjQuery.event.remove( this, types, fn, selector );\n\t\t} );\n\t}\n} );\n\n\nvar\n\n\t/* eslint-disable max-len */\n\n\t// See https://github.com/eslint/eslint/issues/3229\n\trxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]*)[^>]*)\\/>/gi,\n\n\t/* eslint-enable */\n\n\t// Support: IE <=10 - 11, Edge 12 - 13\n\t// In IE/Edge using regex groups here causes severe slowdowns.\n\t// See https://connect.microsoft.com/IE/feedback/details/1736512/\n\trnoInnerhtml = /<script|<style|<link/i,\n\n\t// checked=\"checked\" or checked\n\trchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n\trscriptTypeMasked = /^true\\/(.*)/,\n\trcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g;\n\n// Prefer a tbody over its parent table for containing new rows\nfunction manipulationTarget( elem, content ) {\n\tif ( nodeName( elem, \"table\" ) &&\n\t\tnodeName( content.nodeType !== 11 ? content : content.firstChild, \"tr\" ) ) {\n\n\t\treturn jQuery( \">tbody\", elem )[ 0 ] || elem;\n\t}\n\n\treturn elem;\n}\n\n// Replace/restore the type attribute of script elements for safe DOM manipulation\nfunction disableScript( elem ) {\n\telem.type = ( elem.getAttribute( \"type\" ) !== null ) + \"/\" + elem.type;\n\treturn elem;\n}\nfunction restoreScript( elem ) {\n\tvar match = rscriptTypeMasked.exec( elem.type );\n\n\tif ( match ) {\n\t\telem.type = match[ 1 ];\n\t} else {\n\t\telem.removeAttribute( \"type\" );\n\t}\n\n\treturn elem;\n}\n\nfunction cloneCopyEvent( src, dest ) {\n\tvar i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;\n\n\tif ( dest.nodeType !== 1 ) {\n\t\treturn;\n\t}\n\n\t// 1. Copy private data: events, handlers, etc.\n\tif ( dataPriv.hasData( src ) ) {\n\t\tpdataOld = dataPriv.access( src );\n\t\tpdataCur = dataPriv.set( dest, pdataOld );\n\t\tevents = pdataOld.events;\n\n\t\tif ( events ) {\n\t\t\tdelete pdataCur.handle;\n\t\t\tpdataCur.events = {};\n\n\t\t\tfor ( type in events ) {\n\t\t\t\tfor ( i = 0, l = events[ type ].length; i < l; i++ ) {\n\t\t\t\t\tjQuery.event.add( dest, type, events[ type ][ i ] );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// 2. Copy user data\n\tif ( dataUser.hasData( src ) ) {\n\t\tudataOld = dataUser.access( src );\n\t\tudataCur = jQuery.extend( {}, udataOld );\n\n\t\tdataUser.set( dest, udataCur );\n\t}\n}\n\n// Fix IE bugs, see support tests\nfunction fixInput( src, dest ) {\n\tvar nodeName = dest.nodeName.toLowerCase();\n\n\t// Fails to persist the checked state of a cloned checkbox or radio button.\n\tif ( nodeName === \"input\" && rcheckableType.test( src.type ) ) {\n\t\tdest.checked = src.checked;\n\n\t// Fails to return the selected option to the default selected state when cloning options\n\t} else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {\n\t\tdest.defaultValue = src.defaultValue;\n\t}\n}\n\nfunction domManip( collection, args, callback, ignored ) {\n\n\t// Flatten any nested arrays\n\targs = concat.apply( [], args );\n\n\tvar fragment, first, scripts, hasScripts, node, doc,\n\t\ti = 0,\n\t\tl = collection.length,\n\t\tiNoClone = l - 1,\n\t\tvalue = args[ 0 ],\n\t\tisFunction = jQuery.isFunction( value );\n\n\t// We can't cloneNode fragments that contain checked, in WebKit\n\tif ( isFunction ||\n\t\t\t( l > 1 && typeof value === \"string\" &&\n\t\t\t\t!support.checkClone && rchecked.test( value ) ) ) {\n\t\treturn collection.each( function( index ) {\n\t\t\tvar self = collection.eq( index );\n\t\t\tif ( isFunction ) {\n\t\t\t\targs[ 0 ] = value.call( this, index, self.html() );\n\t\t\t}\n\t\t\tdomManip( self, args, callback, ignored );\n\t\t} );\n\t}\n\n\tif ( l ) {\n\t\tfragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );\n\t\tfirst = fragment.firstChild;\n\n\t\tif ( fragment.childNodes.length === 1 ) {\n\t\t\tfragment = first;\n\t\t}\n\n\t\t// Require either new content or an interest in ignored elements to invoke the callback\n\t\tif ( first || ignored ) {\n\t\t\tscripts = jQuery.map( getAll( fragment, \"script\" ), disableScript );\n\t\t\thasScripts = scripts.length;\n\n\t\t\t// Use the original fragment for the last item\n\t\t\t// instead of the first because it can end up\n\t\t\t// being emptied incorrectly in certain situations (#8070).\n\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\tnode = fragment;\n\n\t\t\t\tif ( i !== iNoClone ) {\n\t\t\t\t\tnode = jQuery.clone( node, true, true );\n\n\t\t\t\t\t// Keep references to cloned scripts for later restoration\n\t\t\t\t\tif ( hasScripts ) {\n\n\t\t\t\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t\t\t\t// push.apply(_, arraylike) throws on ancient WebKit\n\t\t\t\t\t\tjQuery.merge( scripts, getAll( node, \"script\" ) );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tcallback.call( collection[ i ], node, i );\n\t\t\t}\n\n\t\t\tif ( hasScripts ) {\n\t\t\t\tdoc = scripts[ scripts.length - 1 ].ownerDocument;\n\n\t\t\t\t// Reenable scripts\n\t\t\t\tjQuery.map( scripts, restoreScript );\n\n\t\t\t\t// Evaluate executable scripts on first document insertion\n\t\t\t\tfor ( i = 0; i < hasScripts; i++ ) {\n\t\t\t\t\tnode = scripts[ i ];\n\t\t\t\t\tif ( rscriptType.test( node.type || \"\" ) &&\n\t\t\t\t\t\t!dataPriv.access( node, \"globalEval\" ) &&\n\t\t\t\t\t\tjQuery.contains( doc, node ) ) {\n\n\t\t\t\t\t\tif ( node.src ) {\n\n\t\t\t\t\t\t\t// Optional AJAX dependency, but won't run scripts if not present\n\t\t\t\t\t\t\tif ( jQuery._evalUrl ) {\n\t\t\t\t\t\t\t\tjQuery._evalUrl( node.src );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tDOMEval( node.textContent.replace( rcleanScript, \"\" ), doc );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn collection;\n}\n\nfunction remove( elem, selector, keepData ) {\n\tvar node,\n\t\tnodes = selector ? jQuery.filter( selector, elem ) : elem,\n\t\ti = 0;\n\n\tfor ( ; ( node = nodes[ i ] ) != null; i++ ) {\n\t\tif ( !keepData && node.nodeType === 1 ) {\n\t\t\tjQuery.cleanData( getAll( node ) );\n\t\t}\n\n\t\tif ( node.parentNode ) {\n\t\t\tif ( keepData && jQuery.contains( node.ownerDocument, node ) ) {\n\t\t\t\tsetGlobalEval( getAll( node, \"script\" ) );\n\t\t\t}\n\t\t\tnode.parentNode.removeChild( node );\n\t\t}\n\t}\n\n\treturn elem;\n}\n\njQuery.extend( {\n\thtmlPrefilter: function( html ) {\n\t\treturn html.replace( rxhtmlTag, \"<$1></$2>\" );\n\t},\n\n\tclone: function( elem, dataAndEvents, deepDataAndEvents ) {\n\t\tvar i, l, srcElements, destElements,\n\t\t\tclone = elem.cloneNode( true ),\n\t\t\tinPage = jQuery.contains( elem.ownerDocument, elem );\n\n\t\t// Fix IE cloning issues\n\t\tif ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&\n\t\t\t\t!jQuery.isXMLDoc( elem ) ) {\n\n\t\t\t// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2\n\t\t\tdestElements = getAll( clone );\n\t\t\tsrcElements = getAll( elem );\n\n\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\t\t\t\tfixInput( srcElements[ i ], destElements[ i ] );\n\t\t\t}\n\t\t}\n\n\t\t// Copy the events from the original to the clone\n\t\tif ( dataAndEvents ) {\n\t\t\tif ( deepDataAndEvents ) {\n\t\t\t\tsrcElements = srcElements || getAll( elem );\n\t\t\t\tdestElements = destElements || getAll( clone );\n\n\t\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\t\t\t\t\tcloneCopyEvent( srcElements[ i ], destElements[ i ] );\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tcloneCopyEvent( elem, clone );\n\t\t\t}\n\t\t}\n\n\t\t// Preserve script evaluation history\n\t\tdestElements = getAll( clone, \"script\" );\n\t\tif ( destElements.length > 0 ) {\n\t\t\tsetGlobalEval( destElements, !inPage && getAll( elem, \"script\" ) );\n\t\t}\n\n\t\t// Return the cloned set\n\t\treturn clone;\n\t},\n\n\tcleanData: function( elems ) {\n\t\tvar data, elem, type,\n\t\t\tspecial = jQuery.event.special,\n\t\t\ti = 0;\n\n\t\tfor ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {\n\t\t\tif ( acceptData( elem ) ) {\n\t\t\t\tif ( ( data = elem[ dataPriv.expando ] ) ) {\n\t\t\t\t\tif ( data.events ) {\n\t\t\t\t\t\tfor ( type in data.events ) {\n\t\t\t\t\t\t\tif ( special[ type ] ) {\n\t\t\t\t\t\t\t\tjQuery.event.remove( elem, type );\n\n\t\t\t\t\t\t\t// This is a shortcut to avoid jQuery.event.remove's overhead\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tjQuery.removeEvent( elem, type, data.handle );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Support: Chrome <=35 - 45+\n\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\telem[ dataPriv.expando ] = undefined;\n\t\t\t\t}\n\t\t\t\tif ( elem[ dataUser.expando ] ) {\n\n\t\t\t\t\t// Support: Chrome <=35 - 45+\n\t\t\t\t\t// Assign undefined instead of using delete, see Data#remove\n\t\t\t\t\telem[ dataUser.expando ] = undefined;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n} );\n\njQuery.fn.extend( {\n\tdetach: function( selector ) {\n\t\treturn remove( this, selector, true );\n\t},\n\n\tremove: function( selector ) {\n\t\treturn remove( this, selector );\n\t},\n\n\ttext: function( value ) {\n\t\treturn access( this, function( value ) {\n\t\t\treturn value === undefined ?\n\t\t\t\tjQuery.text( this ) :\n\t\t\t\tthis.empty().each( function() {\n\t\t\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\t\t\tthis.textContent = value;\n\t\t\t\t\t}\n\t\t\t\t} );\n\t\t}, null, value, arguments.length );\n\t},\n\n\tappend: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\tvar target = manipulationTarget( this, elem );\n\t\t\t\ttarget.appendChild( elem );\n\t\t\t}\n\t\t} );\n\t},\n\n\tprepend: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\t\t\t\tvar target = manipulationTarget( this, elem );\n\t\t\t\ttarget.insertBefore( elem, target.firstChild );\n\t\t\t}\n\t\t} );\n\t},\n\n\tbefore: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.parentNode ) {\n\t\t\t\tthis.parentNode.insertBefore( elem, this );\n\t\t\t}\n\t\t} );\n\t},\n\n\tafter: function() {\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tif ( this.parentNode ) {\n\t\t\t\tthis.parentNode.insertBefore( elem, this.nextSibling );\n\t\t\t}\n\t\t} );\n\t},\n\n\tempty: function() {\n\t\tvar elem,\n\t\t\ti = 0;\n\n\t\tfor ( ; ( elem = this[ i ] ) != null; i++ ) {\n\t\t\tif ( elem.nodeType === 1 ) {\n\n\t\t\t\t// Prevent memory leaks\n\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\n\t\t\t\t// Remove any remaining nodes\n\t\t\t\telem.textContent = \"\";\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\tclone: function( dataAndEvents, deepDataAndEvents ) {\n\t\tdataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n\t\tdeepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\n\t\treturn this.map( function() {\n\t\t\treturn jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n\t\t} );\n\t},\n\n\thtml: function( value ) {\n\t\treturn access( this, function( value ) {\n\t\t\tvar elem = this[ 0 ] || {},\n\t\t\t\ti = 0,\n\t\t\t\tl = this.length;\n\n\t\t\tif ( value === undefined && elem.nodeType === 1 ) {\n\t\t\t\treturn elem.innerHTML;\n\t\t\t}\n\n\t\t\t// See if we can take a shortcut and just use innerHTML\n\t\t\tif ( typeof value === \"string\" && !rnoInnerhtml.test( value ) &&\n\t\t\t\t!wrapMap[ ( rtagName.exec( value ) || [ \"\", \"\" ] )[ 1 ].toLowerCase() ] ) {\n\n\t\t\t\tvalue = jQuery.htmlPrefilter( value );\n\n\t\t\t\ttry {\n\t\t\t\t\tfor ( ; i < l; i++ ) {\n\t\t\t\t\t\telem = this[ i ] || {};\n\n\t\t\t\t\t\t// Remove element nodes and prevent memory leaks\n\t\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\t\t\t\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\t\t\t\t\t\t\telem.innerHTML = value;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\telem = 0;\n\n\t\t\t\t// If using innerHTML throws an exception, use the fallback method\n\t\t\t\t} catch ( e ) {}\n\t\t\t}\n\n\t\t\tif ( elem ) {\n\t\t\t\tthis.empty().append( value );\n\t\t\t}\n\t\t}, null, value, arguments.length );\n\t},\n\n\treplaceWith: function() {\n\t\tvar ignored = [];\n\n\t\t// Make the changes, replacing each non-ignored context element with the new content\n\t\treturn domManip( this, arguments, function( elem ) {\n\t\t\tvar parent = this.parentNode;\n\n\t\t\tif ( jQuery.inArray( this, ignored ) < 0 ) {\n\t\t\t\tjQuery.cleanData( getAll( this ) );\n\t\t\t\tif ( parent ) {\n\t\t\t\t\tparent.replaceChild( elem, this );\n\t\t\t\t}\n\t\t\t}\n\n\t\t// Force callback invocation\n\t\t}, ignored );\n\t}\n} );\n\njQuery.each( {\n\tappendTo: \"append\",\n\tprependTo: \"prepend\",\n\tinsertBefore: \"before\",\n\tinsertAfter: \"after\",\n\treplaceAll: \"replaceWith\"\n}, function( name, original ) {\n\tjQuery.fn[ name ] = function( selector ) {\n\t\tvar elems,\n\t\t\tret = [],\n\t\t\tinsert = jQuery( selector ),\n\t\t\tlast = insert.length - 1,\n\t\t\ti = 0;\n\n\t\tfor ( ; i <= last; i++ ) {\n\t\t\telems = i === last ? this : this.clone( true );\n\t\t\tjQuery( insert[ i ] )[ original ]( elems );\n\n\t\t\t// Support: Android <=4.0 only, PhantomJS 1 only\n\t\t\t// .get() because push.apply(_, arraylike) throws on ancient WebKit\n\t\t\tpush.apply( ret, elems.get() );\n\t\t}\n\n\t\treturn this.pushStack( ret );\n\t};\n} );\nvar rmargin = ( /^margin/ );\n\nvar rnumnonpx = new RegExp( \"^(\" + pnum + \")(?!px)[a-z%]+$\", \"i\" );\n\nvar getStyles = function( elem ) {\n\n\t\t// Support: IE <=11 only, Firefox <=30 (#15098, #14150)\n\t\t// IE throws on elements created in popups\n\t\t// FF meanwhile throws on frame elements through \"defaultView.getComputedStyle\"\n\t\tvar view = elem.ownerDocument.defaultView;\n\n\t\tif ( !view || !view.opener ) {\n\t\t\tview = window;\n\t\t}\n\n\t\treturn view.getComputedStyle( elem );\n\t};\n\n\n\n( function() {\n\n\t// Executing both pixelPosition & boxSizingReliable tests require only one layout\n\t// so they're executed at the same time to save the second computation.\n\tfunction computeStyleTests() {\n\n\t\t// This is a singleton, we need to execute it only once\n\t\tif ( !div ) {\n\t\t\treturn;\n\t\t}\n\n\t\tdiv.style.cssText =\n\t\t\t\"box-sizing:border-box;\" +\n\t\t\t\"position:relative;display:block;\" +\n\t\t\t\"margin:auto;border:1px;padding:1px;\" +\n\t\t\t\"top:1%;width:50%\";\n\t\tdiv.innerHTML = \"\";\n\t\tdocumentElement.appendChild( container );\n\n\t\tvar divStyle = window.getComputedStyle( div );\n\t\tpixelPositionVal = divStyle.top !== \"1%\";\n\n\t\t// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44\n\t\treliableMarginLeftVal = divStyle.marginLeft === \"2px\";\n\t\tboxSizingReliableVal = divStyle.width === \"4px\";\n\n\t\t// Support: Android 4.0 - 4.3 only\n\t\t// Some styles come back with percentage values, even though they shouldn't\n\t\tdiv.style.marginRight = \"50%\";\n\t\tpixelMarginRightVal = divStyle.marginRight === \"4px\";\n\n\t\tdocumentElement.removeChild( container );\n\n\t\t// Nullify the div so it wouldn't be stored in the memory and\n\t\t// it will also be a sign that checks already performed\n\t\tdiv = null;\n\t}\n\n\tvar pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,\n\t\tcontainer = document.createElement( \"div\" ),\n\t\tdiv = document.createElement( \"div\" );\n\n\t// Finish early in limited (non-browser) environments\n\tif ( !div.style ) {\n\t\treturn;\n\t}\n\n\t// Support: IE <=9 - 11 only\n\t// Style of cloned element affects source element cloned (#8908)\n\tdiv.style.backgroundClip = \"content-box\";\n\tdiv.cloneNode( true ).style.backgroundClip = \"\";\n\tsupport.clearCloneStyle = div.style.backgroundClip === \"content-box\";\n\n\tcontainer.style.cssText = \"border:0;width:8px;height:0;top:0;left:-9999px;\" +\n\t\t\"padding:0;margin-top:1px;position:absolute\";\n\tcontainer.appendChild( div );\n\n\tjQuery.extend( support, {\n\t\tpixelPosition: function() {\n\t\t\tcomputeStyleTests();\n\t\t\treturn pixelPositionVal;\n\t\t},\n\t\tboxSizingReliable: function() {\n\t\t\tcomputeStyleTests();\n\t\t\treturn boxSizingReliableVal;\n\t\t},\n\t\tpixelMarginRight: function() {\n\t\t\tcomputeStyleTests();\n\t\t\treturn pixelMarginRightVal;\n\t\t},\n\t\treliableMarginLeft: function() {\n\t\t\tcomputeStyleTests();\n\t\t\treturn reliableMarginLeftVal;\n\t\t}\n\t} );\n} )();\n\n\nfunction curCSS( elem, name, computed ) {\n\tvar width, minWidth, maxWidth, ret,\n\n\t\t// Support: Firefox 51+\n\t\t// Retrieving style before computed somehow\n\t\t// fixes an issue with getting wrong values\n\t\t// on detached elements\n\t\tstyle = elem.style;\n\n\tcomputed = computed || getStyles( elem );\n\n\t// getPropertyValue is needed for:\n\t//   .css('filter') (IE 9 only, #12537)\n\t//   .css('--customProperty) (#3144)\n\tif ( computed ) {\n\t\tret = computed.getPropertyValue( name ) || computed[ name ];\n\n\t\tif ( ret === \"\" && !jQuery.contains( elem.ownerDocument, elem ) ) {\n\t\t\tret = jQuery.style( elem, name );\n\t\t}\n\n\t\t// A tribute to the \"awesome hack by Dean Edwards\"\n\t\t// Android Browser returns percentage for some values,\n\t\t// but width seems to be reliably pixels.\n\t\t// This is against the CSSOM draft spec:\n\t\t// https://drafts.csswg.org/cssom/#resolved-values\n\t\tif ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {\n\n\t\t\t// Remember the original values\n\t\t\twidth = style.width;\n\t\t\tminWidth = style.minWidth;\n\t\t\tmaxWidth = style.maxWidth;\n\n\t\t\t// Put in the new values to get a computed value out\n\t\t\tstyle.minWidth = style.maxWidth = style.width = ret;\n\t\t\tret = computed.width;\n\n\t\t\t// Revert the changed values\n\t\t\tstyle.width = width;\n\t\t\tstyle.minWidth = minWidth;\n\t\t\tstyle.maxWidth = maxWidth;\n\t\t}\n\t}\n\n\treturn ret !== undefined ?\n\n\t\t// Support: IE <=9 - 11 only\n\t\t// IE returns zIndex value as an integer.\n\t\tret + \"\" :\n\t\tret;\n}\n\n\nfunction addGetHookIf( conditionFn, hookFn ) {\n\n\t// Define the hook, we'll check on the first run if it's really needed.\n\treturn {\n\t\tget: function() {\n\t\t\tif ( conditionFn() ) {\n\n\t\t\t\t// Hook not needed (or it's not possible to use it due\n\t\t\t\t// to missing dependency), remove it.\n\t\t\t\tdelete this.get;\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Hook needed; redefine it so that the support test is not executed again.\n\t\t\treturn ( this.get = hookFn ).apply( this, arguments );\n\t\t}\n\t};\n}\n\n\nvar\n\n\t// Swappable if display is none or starts with table\n\t// except \"table\", \"table-cell\", or \"table-caption\"\n\t// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n\trdisplayswap = /^(none|table(?!-c[ea]).+)/,\n\trcustomProp = /^--/,\n\tcssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n\tcssNormalTransform = {\n\t\tletterSpacing: \"0\",\n\t\tfontWeight: \"400\"\n\t},\n\n\tcssPrefixes = [ \"Webkit\", \"Moz\", \"ms\" ],\n\temptyStyle = document.createElement( \"div\" ).style;\n\n// Return a css property mapped to a potentially vendor prefixed property\nfunction vendorPropName( name ) {\n\n\t// Shortcut for names that are not vendor prefixed\n\tif ( name in emptyStyle ) {\n\t\treturn name;\n\t}\n\n\t// Check for vendor prefixed names\n\tvar capName = name[ 0 ].toUpperCase() + name.slice( 1 ),\n\t\ti = cssPrefixes.length;\n\n\twhile ( i-- ) {\n\t\tname = cssPrefixes[ i ] + capName;\n\t\tif ( name in emptyStyle ) {\n\t\t\treturn name;\n\t\t}\n\t}\n}\n\n// Return a property mapped along what jQuery.cssProps suggests or to\n// a vendor prefixed property.\nfunction finalPropName( name ) {\n\tvar ret = jQuery.cssProps[ name ];\n\tif ( !ret ) {\n\t\tret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;\n\t}\n\treturn ret;\n}\n\nfunction setPositiveNumber( elem, value, subtract ) {\n\n\t// Any relative (+/-) values have already been\n\t// normalized at this point\n\tvar matches = rcssNum.exec( value );\n\treturn matches ?\n\n\t\t// Guard against undefined \"subtract\", e.g., when used as in cssHooks\n\t\tMath.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || \"px\" ) :\n\t\tvalue;\n}\n\nfunction augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {\n\tvar i,\n\t\tval = 0;\n\n\t// If we already have the right measurement, avoid augmentation\n\tif ( extra === ( isBorderBox ? \"border\" : \"content\" ) ) {\n\t\ti = 4;\n\n\t// Otherwise initialize for horizontal or vertical properties\n\t} else {\n\t\ti = name === \"width\" ? 1 : 0;\n\t}\n\n\tfor ( ; i < 4; i += 2 ) {\n\n\t\t// Both box models exclude margin, so add it if we want it\n\t\tif ( extra === \"margin\" ) {\n\t\t\tval += jQuery.css( elem, extra + cssExpand[ i ], true, styles );\n\t\t}\n\n\t\tif ( isBorderBox ) {\n\n\t\t\t// border-box includes padding, so remove it if we want content\n\t\t\tif ( extra === \"content\" ) {\n\t\t\t\tval -= jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\t\t\t}\n\n\t\t\t// At this point, extra isn't border nor margin, so remove border\n\t\t\tif ( extra !== \"margin\" ) {\n\t\t\t\tval -= jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n\t\t\t}\n\t\t} else {\n\n\t\t\t// At this point, extra isn't content, so add padding\n\t\t\tval += jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\n\t\t\t// At this point, extra isn't content nor padding, so add border\n\t\t\tif ( extra !== \"padding\" ) {\n\t\t\t\tval += jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n\t\t\t}\n\t\t}\n\t}\n\n\treturn val;\n}\n\nfunction getWidthOrHeight( elem, name, extra ) {\n\n\t// Start with computed style\n\tvar valueIsBorderBox,\n\t\tstyles = getStyles( elem ),\n\t\tval = curCSS( elem, name, styles ),\n\t\tisBorderBox = jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\";\n\n\t// Computed unit is not pixels. Stop here and return.\n\tif ( rnumnonpx.test( val ) ) {\n\t\treturn val;\n\t}\n\n\t// Check for style in case a browser which returns unreliable values\n\t// for getComputedStyle silently falls back to the reliable elem.style\n\tvalueIsBorderBox = isBorderBox &&\n\t\t( support.boxSizingReliable() || val === elem.style[ name ] );\n\n\t// Fall back to offsetWidth/Height when value is \"auto\"\n\t// This happens for inline elements with no explicit setting (gh-3571)\n\tif ( val === \"auto\" ) {\n\t\tval = elem[ \"offset\" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];\n\t}\n\n\t// Normalize \"\", auto, and prepare for extra\n\tval = parseFloat( val ) || 0;\n\n\t// Use the active box-sizing model to add/subtract irrelevant styles\n\treturn ( val +\n\t\taugmentWidthOrHeight(\n\t\t\telem,\n\t\t\tname,\n\t\t\textra || ( isBorderBox ? \"border\" : \"content\" ),\n\t\t\tvalueIsBorderBox,\n\t\t\tstyles\n\t\t)\n\t) + \"px\";\n}\n\njQuery.extend( {\n\n\t// Add in style property hooks for overriding the default\n\t// behavior of getting and setting a style property\n\tcssHooks: {\n\t\topacity: {\n\t\t\tget: function( elem, computed ) {\n\t\t\t\tif ( computed ) {\n\n\t\t\t\t\t// We should always get a number back from opacity\n\t\t\t\t\tvar ret = curCSS( elem, \"opacity\" );\n\t\t\t\t\treturn ret === \"\" ? \"1\" : ret;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\t// Don't automatically add \"px\" to these possibly-unitless properties\n\tcssNumber: {\n\t\t\"animationIterationCount\": true,\n\t\t\"columnCount\": true,\n\t\t\"fillOpacity\": true,\n\t\t\"flexGrow\": true,\n\t\t\"flexShrink\": true,\n\t\t\"fontWeight\": true,\n\t\t\"lineHeight\": true,\n\t\t\"opacity\": true,\n\t\t\"order\": true,\n\t\t\"orphans\": true,\n\t\t\"widows\": true,\n\t\t\"zIndex\": true,\n\t\t\"zoom\": true\n\t},\n\n\t// Add in properties whose names you wish to fix before\n\t// setting or getting the value\n\tcssProps: {\n\t\t\"float\": \"cssFloat\"\n\t},\n\n\t// Get and set the style property on a DOM Node\n\tstyle: function( elem, name, value, extra ) {\n\n\t\t// Don't set styles on text and comment nodes\n\t\tif ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Make sure that we're working with the right name\n\t\tvar ret, type, hooks,\n\t\t\torigName = jQuery.camelCase( name ),\n\t\t\tisCustomProp = rcustomProp.test( name ),\n\t\t\tstyle = elem.style;\n\n\t\t// Make sure that we're working with the right name. We don't\n\t\t// want to query the value if it is a CSS custom property\n\t\t// since they are user-defined.\n\t\tif ( !isCustomProp ) {\n\t\t\tname = finalPropName( origName );\n\t\t}\n\n\t\t// Gets hook for the prefixed version, then unprefixed version\n\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n\t\t// Check if we're setting a value\n\t\tif ( value !== undefined ) {\n\t\t\ttype = typeof value;\n\n\t\t\t// Convert \"+=\" or \"-=\" to relative numbers (#7345)\n\t\t\tif ( type === \"string\" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {\n\t\t\t\tvalue = adjustCSS( elem, name, ret );\n\n\t\t\t\t// Fixes bug #9237\n\t\t\t\ttype = \"number\";\n\t\t\t}\n\n\t\t\t// Make sure that null and NaN values aren't set (#7116)\n\t\t\tif ( value == null || value !== value ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// If a number was passed in, add the unit (except for certain CSS properties)\n\t\t\tif ( type === \"number\" ) {\n\t\t\t\tvalue += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? \"\" : \"px\" );\n\t\t\t}\n\n\t\t\t// background-* props affect original clone's values\n\t\t\tif ( !support.clearCloneStyle && value === \"\" && name.indexOf( \"background\" ) === 0 ) {\n\t\t\t\tstyle[ name ] = \"inherit\";\n\t\t\t}\n\n\t\t\t// If a hook was provided, use that value, otherwise just set the specified value\n\t\t\tif ( !hooks || !( \"set\" in hooks ) ||\n\t\t\t\t( value = hooks.set( elem, value, extra ) ) !== undefined ) {\n\n\t\t\t\tif ( isCustomProp ) {\n\t\t\t\t\tstyle.setProperty( name, value );\n\t\t\t\t} else {\n\t\t\t\t\tstyle[ name ] = value;\n\t\t\t\t}\n\t\t\t}\n\n\t\t} else {\n\n\t\t\t// If a hook was provided get the non-computed value from there\n\t\t\tif ( hooks && \"get\" in hooks &&\n\t\t\t\t( ret = hooks.get( elem, false, extra ) ) !== undefined ) {\n\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\t// Otherwise just get the value from the style object\n\t\t\treturn style[ name ];\n\t\t}\n\t},\n\n\tcss: function( elem, name, extra, styles ) {\n\t\tvar val, num, hooks,\n\t\t\torigName = jQuery.camelCase( name ),\n\t\t\tisCustomProp = rcustomProp.test( name );\n\n\t\t// Make sure that we're working with the right name. We don't\n\t\t// want to modify the value if it is a CSS custom property\n\t\t// since they are user-defined.\n\t\tif ( !isCustomProp ) {\n\t\t\tname = finalPropName( origName );\n\t\t}\n\n\t\t// Try prefixed name followed by the unprefixed name\n\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n\t\t// If a hook was provided get the computed value from there\n\t\tif ( hooks && \"get\" in hooks ) {\n\t\t\tval = hooks.get( elem, true, extra );\n\t\t}\n\n\t\t// Otherwise, if a way to get the computed value exists, use that\n\t\tif ( val === undefined ) {\n\t\t\tval = curCSS( elem, name, styles );\n\t\t}\n\n\t\t// Convert \"normal\" to computed value\n\t\tif ( val === \"normal\" && name in cssNormalTransform ) {\n\t\t\tval = cssNormalTransform[ name ];\n\t\t}\n\n\t\t// Make numeric if forced or a qualifier was provided and val looks numeric\n\t\tif ( extra === \"\" || extra ) {\n\t\t\tnum = parseFloat( val );\n\t\t\treturn extra === true || isFinite( num ) ? num || 0 : val;\n\t\t}\n\n\t\treturn val;\n\t}\n} );\n\njQuery.each( [ \"height\", \"width\" ], function( i, name ) {\n\tjQuery.cssHooks[ name ] = {\n\t\tget: function( elem, computed, extra ) {\n\t\t\tif ( computed ) {\n\n\t\t\t\t// Certain elements can have dimension info if we invisibly show them\n\t\t\t\t// but it must have a current display style that would benefit\n\t\t\t\treturn rdisplayswap.test( jQuery.css( elem, \"display\" ) ) &&\n\n\t\t\t\t\t// Support: Safari 8+\n\t\t\t\t\t// Table columns in Safari have non-zero offsetWidth & zero\n\t\t\t\t\t// getBoundingClientRect().width unless display is changed.\n\t\t\t\t\t// Support: IE <=11 only\n\t\t\t\t\t// Running getBoundingClientRect on a disconnected node\n\t\t\t\t\t// in IE throws an error.\n\t\t\t\t\t( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?\n\t\t\t\t\t\tswap( elem, cssShow, function() {\n\t\t\t\t\t\t\treturn getWidthOrHeight( elem, name, extra );\n\t\t\t\t\t\t} ) :\n\t\t\t\t\t\tgetWidthOrHeight( elem, name, extra );\n\t\t\t}\n\t\t},\n\n\t\tset: function( elem, value, extra ) {\n\t\t\tvar matches,\n\t\t\t\tstyles = extra && getStyles( elem ),\n\t\t\t\tsubtract = extra && augmentWidthOrHeight(\n\t\t\t\t\telem,\n\t\t\t\t\tname,\n\t\t\t\t\textra,\n\t\t\t\t\tjQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\",\n\t\t\t\t\tstyles\n\t\t\t\t);\n\n\t\t\t// Convert to pixels if value adjustment is needed\n\t\t\tif ( subtract && ( matches = rcssNum.exec( value ) ) &&\n\t\t\t\t( matches[ 3 ] || \"px\" ) !== \"px\" ) {\n\n\t\t\t\telem.style[ name ] = value;\n\t\t\t\tvalue = jQuery.css( elem, name );\n\t\t\t}\n\n\t\t\treturn setPositiveNumber( elem, value, subtract );\n\t\t}\n\t};\n} );\n\njQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,\n\tfunction( elem, computed ) {\n\t\tif ( computed ) {\n\t\t\treturn ( parseFloat( curCSS( elem, \"marginLeft\" ) ) ||\n\t\t\t\telem.getBoundingClientRect().left -\n\t\t\t\t\tswap( elem, { marginLeft: 0 }, function() {\n\t\t\t\t\t\treturn elem.getBoundingClientRect().left;\n\t\t\t\t\t} )\n\t\t\t\t) + \"px\";\n\t\t}\n\t}\n);\n\n// These hooks are used by animate to expand properties\njQuery.each( {\n\tmargin: \"\",\n\tpadding: \"\",\n\tborder: \"Width\"\n}, function( prefix, suffix ) {\n\tjQuery.cssHooks[ prefix + suffix ] = {\n\t\texpand: function( value ) {\n\t\t\tvar i = 0,\n\t\t\t\texpanded = {},\n\n\t\t\t\t// Assumes a single number if not a string\n\t\t\t\tparts = typeof value === \"string\" ? value.split( \" \" ) : [ value ];\n\n\t\t\tfor ( ; i < 4; i++ ) {\n\t\t\t\texpanded[ prefix + cssExpand[ i ] + suffix ] =\n\t\t\t\t\tparts[ i ] || parts[ i - 2 ] || parts[ 0 ];\n\t\t\t}\n\n\t\t\treturn expanded;\n\t\t}\n\t};\n\n\tif ( !rmargin.test( prefix ) ) {\n\t\tjQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;\n\t}\n} );\n\njQuery.fn.extend( {\n\tcss: function( name, value ) {\n\t\treturn access( this, function( elem, name, value ) {\n\t\t\tvar styles, len,\n\t\t\t\tmap = {},\n\t\t\t\ti = 0;\n\n\t\t\tif ( Array.isArray( name ) ) {\n\t\t\t\tstyles = getStyles( elem );\n\t\t\t\tlen = name.length;\n\n\t\t\t\tfor ( ; i < len; i++ ) {\n\t\t\t\t\tmap[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );\n\t\t\t\t}\n\n\t\t\t\treturn map;\n\t\t\t}\n\n\t\t\treturn value !== undefined ?\n\t\t\t\tjQuery.style( elem, name, value ) :\n\t\t\t\tjQuery.css( elem, name );\n\t\t}, name, value, arguments.length > 1 );\n\t}\n} );\n\n\nfunction Tween( elem, options, prop, end, easing ) {\n\treturn new Tween.prototype.init( elem, options, prop, end, easing );\n}\njQuery.Tween = Tween;\n\nTween.prototype = {\n\tconstructor: Tween,\n\tinit: function( elem, options, prop, end, easing, unit ) {\n\t\tthis.elem = elem;\n\t\tthis.prop = prop;\n\t\tthis.easing = easing || jQuery.easing._default;\n\t\tthis.options = options;\n\t\tthis.start = this.now = this.cur();\n\t\tthis.end = end;\n\t\tthis.unit = unit || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );\n\t},\n\tcur: function() {\n\t\tvar hooks = Tween.propHooks[ this.prop ];\n\n\t\treturn hooks && hooks.get ?\n\t\t\thooks.get( this ) :\n\t\t\tTween.propHooks._default.get( this );\n\t},\n\trun: function( percent ) {\n\t\tvar eased,\n\t\t\thooks = Tween.propHooks[ this.prop ];\n\n\t\tif ( this.options.duration ) {\n\t\t\tthis.pos = eased = jQuery.easing[ this.easing ](\n\t\t\t\tpercent, this.options.duration * percent, 0, 1, this.options.duration\n\t\t\t);\n\t\t} else {\n\t\t\tthis.pos = eased = percent;\n\t\t}\n\t\tthis.now = ( this.end - this.start ) * eased + this.start;\n\n\t\tif ( this.options.step ) {\n\t\t\tthis.options.step.call( this.elem, this.now, this );\n\t\t}\n\n\t\tif ( hooks && hooks.set ) {\n\t\t\thooks.set( this );\n\t\t} else {\n\t\t\tTween.propHooks._default.set( this );\n\t\t}\n\t\treturn this;\n\t}\n};\n\nTween.prototype.init.prototype = Tween.prototype;\n\nTween.propHooks = {\n\t_default: {\n\t\tget: function( tween ) {\n\t\t\tvar result;\n\n\t\t\t// Use a property on the element directly when it is not a DOM element,\n\t\t\t// or when there is no matching style property that exists.\n\t\t\tif ( tween.elem.nodeType !== 1 ||\n\t\t\t\ttween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {\n\t\t\t\treturn tween.elem[ tween.prop ];\n\t\t\t}\n\n\t\t\t// Passing an empty string as a 3rd parameter to .css will automatically\n\t\t\t// attempt a parseFloat and fallback to a string if the parse fails.\n\t\t\t// Simple values such as \"10px\" are parsed to Float;\n\t\t\t// complex values such as \"rotate(1rad)\" are returned as-is.\n\t\t\tresult = jQuery.css( tween.elem, tween.prop, \"\" );\n\n\t\t\t// Empty strings, null, undefined and \"auto\" are converted to 0.\n\t\t\treturn !result || result === \"auto\" ? 0 : result;\n\t\t},\n\t\tset: function( tween ) {\n\n\t\t\t// Use step hook for back compat.\n\t\t\t// Use cssHook if its there.\n\t\t\t// Use .style if available and use plain properties where available.\n\t\t\tif ( jQuery.fx.step[ tween.prop ] ) {\n\t\t\t\tjQuery.fx.step[ tween.prop ]( tween );\n\t\t\t} else if ( tween.elem.nodeType === 1 &&\n\t\t\t\t( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||\n\t\t\t\t\tjQuery.cssHooks[ tween.prop ] ) ) {\n\t\t\t\tjQuery.style( tween.elem, tween.prop, tween.now + tween.unit );\n\t\t\t} else {\n\t\t\t\ttween.elem[ tween.prop ] = tween.now;\n\t\t\t}\n\t\t}\n\t}\n};\n\n// Support: IE <=9 only\n// Panic based approach to setting things on disconnected nodes\nTween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n\tset: function( tween ) {\n\t\tif ( tween.elem.nodeType && tween.elem.parentNode ) {\n\t\t\ttween.elem[ tween.prop ] = tween.now;\n\t\t}\n\t}\n};\n\njQuery.easing = {\n\tlinear: function( p ) {\n\t\treturn p;\n\t},\n\tswing: function( p ) {\n\t\treturn 0.5 - Math.cos( p * Math.PI ) / 2;\n\t},\n\t_default: \"swing\"\n};\n\njQuery.fx = Tween.prototype.init;\n\n// Back compat <1.8 extension point\njQuery.fx.step = {};\n\n\n\n\nvar\n\tfxNow, inProgress,\n\trfxtypes = /^(?:toggle|show|hide)$/,\n\trrun = /queueHooks$/;\n\nfunction schedule() {\n\tif ( inProgress ) {\n\t\tif ( document.hidden === false && window.requestAnimationFrame ) {\n\t\t\twindow.requestAnimationFrame( schedule );\n\t\t} else {\n\t\t\twindow.setTimeout( schedule, jQuery.fx.interval );\n\t\t}\n\n\t\tjQuery.fx.tick();\n\t}\n}\n\n// Animations created synchronously will run synchronously\nfunction createFxNow() {\n\twindow.setTimeout( function() {\n\t\tfxNow = undefined;\n\t} );\n\treturn ( fxNow = jQuery.now() );\n}\n\n// Generate parameters to create a standard animation\nfunction genFx( type, includeWidth ) {\n\tvar which,\n\t\ti = 0,\n\t\tattrs = { height: type };\n\n\t// If we include width, step value is 1 to do all cssExpand values,\n\t// otherwise step value is 2 to skip over Left and Right\n\tincludeWidth = includeWidth ? 1 : 0;\n\tfor ( ; i < 4; i += 2 - includeWidth ) {\n\t\twhich = cssExpand[ i ];\n\t\tattrs[ \"margin\" + which ] = attrs[ \"padding\" + which ] = type;\n\t}\n\n\tif ( includeWidth ) {\n\t\tattrs.opacity = attrs.width = type;\n\t}\n\n\treturn attrs;\n}\n\nfunction createTween( value, prop, animation ) {\n\tvar tween,\n\t\tcollection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ \"*\" ] ),\n\t\tindex = 0,\n\t\tlength = collection.length;\n\tfor ( ; index < length; index++ ) {\n\t\tif ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {\n\n\t\t\t// We're done with this property\n\t\t\treturn tween;\n\t\t}\n\t}\n}\n\nfunction defaultPrefilter( elem, props, opts ) {\n\tvar prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,\n\t\tisBox = \"width\" in props || \"height\" in props,\n\t\tanim = this,\n\t\torig = {},\n\t\tstyle = elem.style,\n\t\thidden = elem.nodeType && isHiddenWithinTree( elem ),\n\t\tdataShow = dataPriv.get( elem, \"fxshow\" );\n\n\t// Queue-skipping animations hijack the fx hooks\n\tif ( !opts.queue ) {\n\t\thooks = jQuery._queueHooks( elem, \"fx\" );\n\t\tif ( hooks.unqueued == null ) {\n\t\t\thooks.unqueued = 0;\n\t\t\toldfire = hooks.empty.fire;\n\t\t\thooks.empty.fire = function() {\n\t\t\t\tif ( !hooks.unqueued ) {\n\t\t\t\t\toldfire();\n\t\t\t\t}\n\t\t\t};\n\t\t}\n\t\thooks.unqueued++;\n\n\t\tanim.always( function() {\n\n\t\t\t// Ensure the complete handler is called before this completes\n\t\t\tanim.always( function() {\n\t\t\t\thooks.unqueued--;\n\t\t\t\tif ( !jQuery.queue( elem, \"fx\" ).length ) {\n\t\t\t\t\thooks.empty.fire();\n\t\t\t\t}\n\t\t\t} );\n\t\t} );\n\t}\n\n\t// Detect show/hide animations\n\tfor ( prop in props ) {\n\t\tvalue = props[ prop ];\n\t\tif ( rfxtypes.test( value ) ) {\n\t\t\tdelete props[ prop ];\n\t\t\ttoggle = toggle || value === \"toggle\";\n\t\t\tif ( value === ( hidden ? \"hide\" : \"show\" ) ) {\n\n\t\t\t\t// Pretend to be hidden if this is a \"show\" and\n\t\t\t\t// there is still data from a stopped show/hide\n\t\t\t\tif ( value === \"show\" && dataShow && dataShow[ prop ] !== undefined ) {\n\t\t\t\t\thidden = true;\n\n\t\t\t\t// Ignore all other no-op show/hide data\n\t\t\t\t} else {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t}\n\t\t\torig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );\n\t\t}\n\t}\n\n\t// Bail out if this is a no-op like .hide().hide()\n\tpropTween = !jQuery.isEmptyObject( props );\n\tif ( !propTween && jQuery.isEmptyObject( orig ) ) {\n\t\treturn;\n\t}\n\n\t// Restrict \"overflow\" and \"display\" styles during box animations\n\tif ( isBox && elem.nodeType === 1 ) {\n\n\t\t// Support: IE <=9 - 11, Edge 12 - 13\n\t\t// Record all 3 overflow attributes because IE does not infer the shorthand\n\t\t// from identically-valued overflowX and overflowY\n\t\topts.overflow = [ style.overflow, style.overflowX, style.overflowY ];\n\n\t\t// Identify a display type, preferring old show/hide data over the CSS cascade\n\t\trestoreDisplay = dataShow && dataShow.display;\n\t\tif ( restoreDisplay == null ) {\n\t\t\trestoreDisplay = dataPriv.get( elem, \"display\" );\n\t\t}\n\t\tdisplay = jQuery.css( elem, \"display\" );\n\t\tif ( display === \"none\" ) {\n\t\t\tif ( restoreDisplay ) {\n\t\t\t\tdisplay = restoreDisplay;\n\t\t\t} else {\n\n\t\t\t\t// Get nonempty value(s) by temporarily forcing visibility\n\t\t\t\tshowHide( [ elem ], true );\n\t\t\t\trestoreDisplay = elem.style.display || restoreDisplay;\n\t\t\t\tdisplay = jQuery.css( elem, \"display\" );\n\t\t\t\tshowHide( [ elem ] );\n\t\t\t}\n\t\t}\n\n\t\t// Animate inline elements as inline-block\n\t\tif ( display === \"inline\" || display === \"inline-block\" && restoreDisplay != null ) {\n\t\t\tif ( jQuery.css( elem, \"float\" ) === \"none\" ) {\n\n\t\t\t\t// Restore the original display value at the end of pure show/hide animations\n\t\t\t\tif ( !propTween ) {\n\t\t\t\t\tanim.done( function() {\n\t\t\t\t\t\tstyle.display = restoreDisplay;\n\t\t\t\t\t} );\n\t\t\t\t\tif ( restoreDisplay == null ) {\n\t\t\t\t\t\tdisplay = style.display;\n\t\t\t\t\t\trestoreDisplay = display === \"none\" ? \"\" : display;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tstyle.display = \"inline-block\";\n\t\t\t}\n\t\t}\n\t}\n\n\tif ( opts.overflow ) {\n\t\tstyle.overflow = \"hidden\";\n\t\tanim.always( function() {\n\t\t\tstyle.overflow = opts.overflow[ 0 ];\n\t\t\tstyle.overflowX = opts.overflow[ 1 ];\n\t\t\tstyle.overflowY = opts.overflow[ 2 ];\n\t\t} );\n\t}\n\n\t// Implement show/hide animations\n\tpropTween = false;\n\tfor ( prop in orig ) {\n\n\t\t// General show/hide setup for this element animation\n\t\tif ( !propTween ) {\n\t\t\tif ( dataShow ) {\n\t\t\t\tif ( \"hidden\" in dataShow ) {\n\t\t\t\t\thidden = dataShow.hidden;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tdataShow = dataPriv.access( elem, \"fxshow\", { display: restoreDisplay } );\n\t\t\t}\n\n\t\t\t// Store hidden/visible for toggle so `.stop().toggle()` \"reverses\"\n\t\t\tif ( toggle ) {\n\t\t\t\tdataShow.hidden = !hidden;\n\t\t\t}\n\n\t\t\t// Show elements before animating them\n\t\t\tif ( hidden ) {\n\t\t\t\tshowHide( [ elem ], true );\n\t\t\t}\n\n\t\t\t/* eslint-disable no-loop-func */\n\n\t\t\tanim.done( function() {\n\n\t\t\t/* eslint-enable no-loop-func */\n\n\t\t\t\t// The final step of a \"hide\" animation is actually hiding the element\n\t\t\t\tif ( !hidden ) {\n\t\t\t\t\tshowHide( [ elem ] );\n\t\t\t\t}\n\t\t\t\tdataPriv.remove( elem, \"fxshow\" );\n\t\t\t\tfor ( prop in orig ) {\n\t\t\t\t\tjQuery.style( elem, prop, orig[ prop ] );\n\t\t\t\t}\n\t\t\t} );\n\t\t}\n\n\t\t// Per-property setup\n\t\tpropTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );\n\t\tif ( !( prop in dataShow ) ) {\n\t\t\tdataShow[ prop ] = propTween.start;\n\t\t\tif ( hidden ) {\n\t\t\t\tpropTween.end = propTween.start;\n\t\t\t\tpropTween.start = 0;\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction propFilter( props, specialEasing ) {\n\tvar index, name, easing, value, hooks;\n\n\t// camelCase, specialEasing and expand cssHook pass\n\tfor ( index in props ) {\n\t\tname = jQuery.camelCase( index );\n\t\teasing = specialEasing[ name ];\n\t\tvalue = props[ index ];\n\t\tif ( Array.isArray( value ) ) {\n\t\t\teasing = value[ 1 ];\n\t\t\tvalue = props[ index ] = value[ 0 ];\n\t\t}\n\n\t\tif ( index !== name ) {\n\t\t\tprops[ name ] = value;\n\t\t\tdelete props[ index ];\n\t\t}\n\n\t\thooks = jQuery.cssHooks[ name ];\n\t\tif ( hooks && \"expand\" in hooks ) {\n\t\t\tvalue = hooks.expand( value );\n\t\t\tdelete props[ name ];\n\n\t\t\t// Not quite $.extend, this won't overwrite existing keys.\n\t\t\t// Reusing 'index' because we have the correct \"name\"\n\t\t\tfor ( index in value ) {\n\t\t\t\tif ( !( index in props ) ) {\n\t\t\t\t\tprops[ index ] = value[ index ];\n\t\t\t\t\tspecialEasing[ index ] = easing;\n\t\t\t\t}\n\t\t\t}\n\t\t} else {\n\t\t\tspecialEasing[ name ] = easing;\n\t\t}\n\t}\n}\n\nfunction Animation( elem, properties, options ) {\n\tvar result,\n\t\tstopped,\n\t\tindex = 0,\n\t\tlength = Animation.prefilters.length,\n\t\tdeferred = jQuery.Deferred().always( function() {\n\n\t\t\t// Don't match elem in the :animated selector\n\t\t\tdelete tick.elem;\n\t\t} ),\n\t\ttick = function() {\n\t\t\tif ( stopped ) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t\tvar currentTime = fxNow || createFxNow(),\n\t\t\t\tremaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),\n\n\t\t\t\t// Support: Android 2.3 only\n\t\t\t\t// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)\n\t\t\t\ttemp = remaining / animation.duration || 0,\n\t\t\t\tpercent = 1 - temp,\n\t\t\t\tindex = 0,\n\t\t\t\tlength = animation.tweens.length;\n\n\t\t\tfor ( ; index < length; index++ ) {\n\t\t\t\tanimation.tweens[ index ].run( percent );\n\t\t\t}\n\n\t\t\tdeferred.notifyWith( elem, [ animation, percent, remaining ] );\n\n\t\t\t// If there's more to do, yield\n\t\t\tif ( percent < 1 && length ) {\n\t\t\t\treturn remaining;\n\t\t\t}\n\n\t\t\t// If this was an empty animation, synthesize a final progress notification\n\t\t\tif ( !length ) {\n\t\t\t\tdeferred.notifyWith( elem, [ animation, 1, 0 ] );\n\t\t\t}\n\n\t\t\t// Resolve the animation and report its conclusion\n\t\t\tdeferred.resolveWith( elem, [ animation ] );\n\t\t\treturn false;\n\t\t},\n\t\tanimation = deferred.promise( {\n\t\t\telem: elem,\n\t\t\tprops: jQuery.extend( {}, properties ),\n\t\t\topts: jQuery.extend( true, {\n\t\t\t\tspecialEasing: {},\n\t\t\t\teasing: jQuery.easing._default\n\t\t\t}, options ),\n\t\t\toriginalProperties: properties,\n\t\t\toriginalOptions: options,\n\t\t\tstartTime: fxNow || createFxNow(),\n\t\t\tduration: options.duration,\n\t\t\ttweens: [],\n\t\t\tcreateTween: function( prop, end ) {\n\t\t\t\tvar tween = jQuery.Tween( elem, animation.opts, prop, end,\n\t\t\t\t\t\tanimation.opts.specialEasing[ prop ] || animation.opts.easing );\n\t\t\t\tanimation.tweens.push( tween );\n\t\t\t\treturn tween;\n\t\t\t},\n\t\t\tstop: function( gotoEnd ) {\n\t\t\t\tvar index = 0,\n\n\t\t\t\t\t// If we are going to the end, we want to run all the tweens\n\t\t\t\t\t// otherwise we skip this part\n\t\t\t\t\tlength = gotoEnd ? animation.tweens.length : 0;\n\t\t\t\tif ( stopped ) {\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t\tstopped = true;\n\t\t\t\tfor ( ; index < length; index++ ) {\n\t\t\t\t\tanimation.tweens[ index ].run( 1 );\n\t\t\t\t}\n\n\t\t\t\t// Resolve when we played the last frame; otherwise, reject\n\t\t\t\tif ( gotoEnd ) {\n\t\t\t\t\tdeferred.notifyWith( elem, [ animation, 1, 0 ] );\n\t\t\t\t\tdeferred.resolveWith( elem, [ animation, gotoEnd ] );\n\t\t\t\t} else {\n\t\t\t\t\tdeferred.rejectWith( elem, [ animation, gotoEnd ] );\n\t\t\t\t}\n\t\t\t\treturn this;\n\t\t\t}\n\t\t} ),\n\t\tprops = animation.props;\n\n\tpropFilter( props, animation.opts.specialEasing );\n\n\tfor ( ; index < length; index++ ) {\n\t\tresult = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );\n\t\tif ( result ) {\n\t\t\tif ( jQuery.isFunction( result.stop ) ) {\n\t\t\t\tjQuery._queueHooks( animation.elem, animation.opts.queue ).stop =\n\t\t\t\t\tjQuery.proxy( result.stop, result );\n\t\t\t}\n\t\t\treturn result;\n\t\t}\n\t}\n\n\tjQuery.map( props, createTween, animation );\n\n\tif ( jQuery.isFunction( animation.opts.start ) ) {\n\t\tanimation.opts.start.call( elem, animation );\n\t}\n\n\t// Attach callbacks from options\n\tanimation\n\t\t.progress( animation.opts.progress )\n\t\t.done( animation.opts.done, animation.opts.complete )\n\t\t.fail( animation.opts.fail )\n\t\t.always( animation.opts.always );\n\n\tjQuery.fx.timer(\n\t\tjQuery.extend( tick, {\n\t\t\telem: elem,\n\t\t\tanim: animation,\n\t\t\tqueue: animation.opts.queue\n\t\t} )\n\t);\n\n\treturn animation;\n}\n\njQuery.Animation = jQuery.extend( Animation, {\n\n\ttweeners: {\n\t\t\"*\": [ function( prop, value ) {\n\t\t\tvar tween = this.createTween( prop, value );\n\t\t\tadjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );\n\t\t\treturn tween;\n\t\t} ]\n\t},\n\n\ttweener: function( props, callback ) {\n\t\tif ( jQuery.isFunction( props ) ) {\n\t\t\tcallback = props;\n\t\t\tprops = [ \"*\" ];\n\t\t} else {\n\t\t\tprops = props.match( rnothtmlwhite );\n\t\t}\n\n\t\tvar prop,\n\t\t\tindex = 0,\n\t\t\tlength = props.length;\n\n\t\tfor ( ; index < length; index++ ) {\n\t\t\tprop = props[ index ];\n\t\t\tAnimation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];\n\t\t\tAnimation.tweeners[ prop ].unshift( callback );\n\t\t}\n\t},\n\n\tprefilters: [ defaultPrefilter ],\n\n\tprefilter: function( callback, prepend ) {\n\t\tif ( prepend ) {\n\t\t\tAnimation.prefilters.unshift( callback );\n\t\t} else {\n\t\t\tAnimation.prefilters.push( callback );\n\t\t}\n\t}\n} );\n\njQuery.speed = function( speed, easing, fn ) {\n\tvar opt = speed && typeof speed === \"object\" ? jQuery.extend( {}, speed ) : {\n\t\tcomplete: fn || !fn && easing ||\n\t\t\tjQuery.isFunction( speed ) && speed,\n\t\tduration: speed,\n\t\teasing: fn && easing || easing && !jQuery.isFunction( easing ) && easing\n\t};\n\n\t// Go to the end state if fx are off\n\tif ( jQuery.fx.off ) {\n\t\topt.duration = 0;\n\n\t} else {\n\t\tif ( typeof opt.duration !== \"number\" ) {\n\t\t\tif ( opt.duration in jQuery.fx.speeds ) {\n\t\t\t\topt.duration = jQuery.fx.speeds[ opt.duration ];\n\n\t\t\t} else {\n\t\t\t\topt.duration = jQuery.fx.speeds._default;\n\t\t\t}\n\t\t}\n\t}\n\n\t// Normalize opt.queue - true/undefined/null -> \"fx\"\n\tif ( opt.queue == null || opt.queue === true ) {\n\t\topt.queue = \"fx\";\n\t}\n\n\t// Queueing\n\topt.old = opt.complete;\n\n\topt.complete = function() {\n\t\tif ( jQuery.isFunction( opt.old ) ) {\n\t\t\topt.old.call( this );\n\t\t}\n\n\t\tif ( opt.queue ) {\n\t\t\tjQuery.dequeue( this, opt.queue );\n\t\t}\n\t};\n\n\treturn opt;\n};\n\njQuery.fn.extend( {\n\tfadeTo: function( speed, to, easing, callback ) {\n\n\t\t// Show any hidden elements after setting opacity to 0\n\t\treturn this.filter( isHiddenWithinTree ).css( \"opacity\", 0 ).show()\n\n\t\t\t// Animate to the value specified\n\t\t\t.end().animate( { opacity: to }, speed, easing, callback );\n\t},\n\tanimate: function( prop, speed, easing, callback ) {\n\t\tvar empty = jQuery.isEmptyObject( prop ),\n\t\t\toptall = jQuery.speed( speed, easing, callback ),\n\t\t\tdoAnimation = function() {\n\n\t\t\t\t// Operate on a copy of prop so per-property easing won't be lost\n\t\t\t\tvar anim = Animation( this, jQuery.extend( {}, prop ), optall );\n\n\t\t\t\t// Empty animations, or finishing resolves immediately\n\t\t\t\tif ( empty || dataPriv.get( this, \"finish\" ) ) {\n\t\t\t\t\tanim.stop( true );\n\t\t\t\t}\n\t\t\t};\n\t\t\tdoAnimation.finish = doAnimation;\n\n\t\treturn empty || optall.queue === false ?\n\t\t\tthis.each( doAnimation ) :\n\t\t\tthis.queue( optall.queue, doAnimation );\n\t},\n\tstop: function( type, clearQueue, gotoEnd ) {\n\t\tvar stopQueue = function( hooks ) {\n\t\t\tvar stop = hooks.stop;\n\t\t\tdelete hooks.stop;\n\t\t\tstop( gotoEnd );\n\t\t};\n\n\t\tif ( typeof type !== \"string\" ) {\n\t\t\tgotoEnd = clearQueue;\n\t\t\tclearQueue = type;\n\t\t\ttype = undefined;\n\t\t}\n\t\tif ( clearQueue && type !== false ) {\n\t\t\tthis.queue( type || \"fx\", [] );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar dequeue = true,\n\t\t\t\tindex = type != null && type + \"queueHooks\",\n\t\t\t\ttimers = jQuery.timers,\n\t\t\t\tdata = dataPriv.get( this );\n\n\t\t\tif ( index ) {\n\t\t\t\tif ( data[ index ] && data[ index ].stop ) {\n\t\t\t\t\tstopQueue( data[ index ] );\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tfor ( index in data ) {\n\t\t\t\t\tif ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {\n\t\t\t\t\t\tstopQueue( data[ index ] );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tfor ( index = timers.length; index--; ) {\n\t\t\t\tif ( timers[ index ].elem === this &&\n\t\t\t\t\t( type == null || timers[ index ].queue === type ) ) {\n\n\t\t\t\t\ttimers[ index ].anim.stop( gotoEnd );\n\t\t\t\t\tdequeue = false;\n\t\t\t\t\ttimers.splice( index, 1 );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Start the next in the queue if the last step wasn't forced.\n\t\t\t// Timers currently will call their complete callbacks, which\n\t\t\t// will dequeue but only if they were gotoEnd.\n\t\t\tif ( dequeue || !gotoEnd ) {\n\t\t\t\tjQuery.dequeue( this, type );\n\t\t\t}\n\t\t} );\n\t},\n\tfinish: function( type ) {\n\t\tif ( type !== false ) {\n\t\t\ttype = type || \"fx\";\n\t\t}\n\t\treturn this.each( function() {\n\t\t\tvar index,\n\t\t\t\tdata = dataPriv.get( this ),\n\t\t\t\tqueue = data[ type + \"queue\" ],\n\t\t\t\thooks = data[ type + \"queueHooks\" ],\n\t\t\t\ttimers = jQuery.timers,\n\t\t\t\tlength = queue ? queue.length : 0;\n\n\t\t\t// Enable finishing flag on private data\n\t\t\tdata.finish = true;\n\n\t\t\t// Empty the queue first\n\t\t\tjQuery.queue( this, type, [] );\n\n\t\t\tif ( hooks && hooks.stop ) {\n\t\t\t\thooks.stop.call( this, true );\n\t\t\t}\n\n\t\t\t// Look for any active animations, and finish them\n\t\t\tfor ( index = timers.length; index--; ) {\n\t\t\t\tif ( timers[ index ].elem === this && timers[ index ].queue === type ) {\n\t\t\t\t\ttimers[ index ].anim.stop( true );\n\t\t\t\t\ttimers.splice( index, 1 );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Look for any animations in the old queue and finish them\n\t\t\tfor ( index = 0; index < length; index++ ) {\n\t\t\t\tif ( queue[ index ] && queue[ index ].finish ) {\n\t\t\t\t\tqueue[ index ].finish.call( this );\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Turn off finishing flag\n\t\t\tdelete data.finish;\n\t\t} );\n\t}\n} );\n\njQuery.each( [ \"toggle\", \"show\", \"hide\" ], function( i, name ) {\n\tvar cssFn = jQuery.fn[ name ];\n\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\t\treturn speed == null || typeof speed === \"boolean\" ?\n\t\t\tcssFn.apply( this, arguments ) :\n\t\t\tthis.animate( genFx( name, true ), speed, easing, callback );\n\t};\n} );\n\n// Generate shortcuts for custom animations\njQuery.each( {\n\tslideDown: genFx( \"show\" ),\n\tslideUp: genFx( \"hide\" ),\n\tslideToggle: genFx( \"toggle\" ),\n\tfadeIn: { opacity: \"show\" },\n\tfadeOut: { opacity: \"hide\" },\n\tfadeToggle: { opacity: \"toggle\" }\n}, function( name, props ) {\n\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\t\treturn this.animate( props, speed, easing, callback );\n\t};\n} );\n\njQuery.timers = [];\njQuery.fx.tick = function() {\n\tvar timer,\n\t\ti = 0,\n\t\ttimers = jQuery.timers;\n\n\tfxNow = jQuery.now();\n\n\tfor ( ; i < timers.length; i++ ) {\n\t\ttimer = timers[ i ];\n\n\t\t// Run the timer and safely remove it when done (allowing for external removal)\n\t\tif ( !timer() && timers[ i ] === timer ) {\n\t\t\ttimers.splice( i--, 1 );\n\t\t}\n\t}\n\n\tif ( !timers.length ) {\n\t\tjQuery.fx.stop();\n\t}\n\tfxNow = undefined;\n};\n\njQuery.fx.timer = function( timer ) {\n\tjQuery.timers.push( timer );\n\tjQuery.fx.start();\n};\n\njQuery.fx.interval = 13;\njQuery.fx.start = function() {\n\tif ( inProgress ) {\n\t\treturn;\n\t}\n\n\tinProgress = true;\n\tschedule();\n};\n\njQuery.fx.stop = function() {\n\tinProgress = null;\n};\n\njQuery.fx.speeds = {\n\tslow: 600,\n\tfast: 200,\n\n\t// Default speed\n\t_default: 400\n};\n\n\n// Based off of the plugin by Clint Helfers, with permission.\n// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/\njQuery.fn.delay = function( time, type ) {\n\ttime = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;\n\ttype = type || \"fx\";\n\n\treturn this.queue( type, function( next, hooks ) {\n\t\tvar timeout = window.setTimeout( next, time );\n\t\thooks.stop = function() {\n\t\t\twindow.clearTimeout( timeout );\n\t\t};\n\t} );\n};\n\n\n( function() {\n\tvar input = document.createElement( \"input\" ),\n\t\tselect = document.createElement( \"select\" ),\n\t\topt = select.appendChild( document.createElement( \"option\" ) );\n\n\tinput.type = \"checkbox\";\n\n\t// Support: Android <=4.3 only\n\t// Default value for a checkbox should be \"on\"\n\tsupport.checkOn = input.value !== \"\";\n\n\t// Support: IE <=11 only\n\t// Must access selectedIndex to make default options select\n\tsupport.optSelected = opt.selected;\n\n\t// Support: IE <=11 only\n\t// An input loses its value after becoming a radio\n\tinput = document.createElement( \"input\" );\n\tinput.value = \"t\";\n\tinput.type = \"radio\";\n\tsupport.radioValue = input.value === \"t\";\n} )();\n\n\nvar boolHook,\n\tattrHandle = jQuery.expr.attrHandle;\n\njQuery.fn.extend( {\n\tattr: function( name, value ) {\n\t\treturn access( this, jQuery.attr, name, value, arguments.length > 1 );\n\t},\n\n\tremoveAttr: function( name ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.removeAttr( this, name );\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tattr: function( elem, name, value ) {\n\t\tvar ret, hooks,\n\t\t\tnType = elem.nodeType;\n\n\t\t// Don't get/set attributes on text, comment and attribute nodes\n\t\tif ( nType === 3 || nType === 8 || nType === 2 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Fallback to prop when attributes are not supported\n\t\tif ( typeof elem.getAttribute === \"undefined\" ) {\n\t\t\treturn jQuery.prop( elem, name, value );\n\t\t}\n\n\t\t// Attribute hooks are determined by the lowercase version\n\t\t// Grab necessary hook if one is defined\n\t\tif ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n\t\t\thooks = jQuery.attrHooks[ name.toLowerCase() ] ||\n\t\t\t\t( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );\n\t\t}\n\n\t\tif ( value !== undefined ) {\n\t\t\tif ( value === null ) {\n\t\t\t\tjQuery.removeAttr( elem, name );\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif ( hooks && \"set\" in hooks &&\n\t\t\t\t( ret = hooks.set( elem, value, name ) ) !== undefined ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\telem.setAttribute( name, value + \"\" );\n\t\t\treturn value;\n\t\t}\n\n\t\tif ( hooks && \"get\" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {\n\t\t\treturn ret;\n\t\t}\n\n\t\tret = jQuery.find.attr( elem, name );\n\n\t\t// Non-existent attributes return null, we normalize to undefined\n\t\treturn ret == null ? undefined : ret;\n\t},\n\n\tattrHooks: {\n\t\ttype: {\n\t\t\tset: function( elem, value ) {\n\t\t\t\tif ( !support.radioValue && value === \"radio\" &&\n\t\t\t\t\tnodeName( elem, \"input\" ) ) {\n\t\t\t\t\tvar val = elem.value;\n\t\t\t\t\telem.setAttribute( \"type\", value );\n\t\t\t\t\tif ( val ) {\n\t\t\t\t\t\telem.value = val;\n\t\t\t\t\t}\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t},\n\n\tremoveAttr: function( elem, value ) {\n\t\tvar name,\n\t\t\ti = 0,\n\n\t\t\t// Attribute names can contain non-HTML whitespace characters\n\t\t\t// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2\n\t\t\tattrNames = value && value.match( rnothtmlwhite );\n\n\t\tif ( attrNames && elem.nodeType === 1 ) {\n\t\t\twhile ( ( name = attrNames[ i++ ] ) ) {\n\t\t\t\telem.removeAttribute( name );\n\t\t\t}\n\t\t}\n\t}\n} );\n\n// Hooks for boolean attributes\nboolHook = {\n\tset: function( elem, value, name ) {\n\t\tif ( value === false ) {\n\n\t\t\t// Remove boolean attributes when set to false\n\t\t\tjQuery.removeAttr( elem, name );\n\t\t} else {\n\t\t\telem.setAttribute( name, name );\n\t\t}\n\t\treturn name;\n\t}\n};\n\njQuery.each( jQuery.expr.match.bool.source.match( /\\w+/g ), function( i, name ) {\n\tvar getter = attrHandle[ name ] || jQuery.find.attr;\n\n\tattrHandle[ name ] = function( elem, name, isXML ) {\n\t\tvar ret, handle,\n\t\t\tlowercaseName = name.toLowerCase();\n\n\t\tif ( !isXML ) {\n\n\t\t\t// Avoid an infinite loop by temporarily removing this function from the getter\n\t\t\thandle = attrHandle[ lowercaseName ];\n\t\t\tattrHandle[ lowercaseName ] = ret;\n\t\t\tret = getter( elem, name, isXML ) != null ?\n\t\t\t\tlowercaseName :\n\t\t\t\tnull;\n\t\t\tattrHandle[ lowercaseName ] = handle;\n\t\t}\n\t\treturn ret;\n\t};\n} );\n\n\n\n\nvar rfocusable = /^(?:input|select|textarea|button)$/i,\n\trclickable = /^(?:a|area)$/i;\n\njQuery.fn.extend( {\n\tprop: function( name, value ) {\n\t\treturn access( this, jQuery.prop, name, value, arguments.length > 1 );\n\t},\n\n\tremoveProp: function( name ) {\n\t\treturn this.each( function() {\n\t\t\tdelete this[ jQuery.propFix[ name ] || name ];\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tprop: function( elem, name, value ) {\n\t\tvar ret, hooks,\n\t\t\tnType = elem.nodeType;\n\n\t\t// Don't get/set properties on text, comment and attribute nodes\n\t\tif ( nType === 3 || nType === 8 || nType === 2 ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n\n\t\t\t// Fix name and attach hooks\n\t\t\tname = jQuery.propFix[ name ] || name;\n\t\t\thooks = jQuery.propHooks[ name ];\n\t\t}\n\n\t\tif ( value !== undefined ) {\n\t\t\tif ( hooks && \"set\" in hooks &&\n\t\t\t\t( ret = hooks.set( elem, value, name ) ) !== undefined ) {\n\t\t\t\treturn ret;\n\t\t\t}\n\n\t\t\treturn ( elem[ name ] = value );\n\t\t}\n\n\t\tif ( hooks && \"get\" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {\n\t\t\treturn ret;\n\t\t}\n\n\t\treturn elem[ name ];\n\t},\n\n\tpropHooks: {\n\t\ttabIndex: {\n\t\t\tget: function( elem ) {\n\n\t\t\t\t// Support: IE <=9 - 11 only\n\t\t\t\t// elem.tabIndex doesn't always return the\n\t\t\t\t// correct value when it hasn't been explicitly set\n\t\t\t\t// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n\t\t\t\t// Use proper attribute retrieval(#12072)\n\t\t\t\tvar tabindex = jQuery.find.attr( elem, \"tabindex\" );\n\n\t\t\t\tif ( tabindex ) {\n\t\t\t\t\treturn parseInt( tabindex, 10 );\n\t\t\t\t}\n\n\t\t\t\tif (\n\t\t\t\t\trfocusable.test( elem.nodeName ) ||\n\t\t\t\t\trclickable.test( elem.nodeName ) &&\n\t\t\t\t\telem.href\n\t\t\t\t) {\n\t\t\t\t\treturn 0;\n\t\t\t\t}\n\n\t\t\t\treturn -1;\n\t\t\t}\n\t\t}\n\t},\n\n\tpropFix: {\n\t\t\"for\": \"htmlFor\",\n\t\t\"class\": \"className\"\n\t}\n} );\n\n// Support: IE <=11 only\n// Accessing the selectedIndex property\n// forces the browser to respect setting selected\n// on the option\n// The getter ensures a default option is selected\n// when in an optgroup\n// eslint rule \"no-unused-expressions\" is disabled for this code\n// since it considers such accessions noop\nif ( !support.optSelected ) {\n\tjQuery.propHooks.selected = {\n\t\tget: function( elem ) {\n\n\t\t\t/* eslint no-unused-expressions: \"off\" */\n\n\t\t\tvar parent = elem.parentNode;\n\t\t\tif ( parent && parent.parentNode ) {\n\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t}\n\t\t\treturn null;\n\t\t},\n\t\tset: function( elem ) {\n\n\t\t\t/* eslint no-unused-expressions: \"off\" */\n\n\t\t\tvar parent = elem.parentNode;\n\t\t\tif ( parent ) {\n\t\t\t\tparent.selectedIndex;\n\n\t\t\t\tif ( parent.parentNode ) {\n\t\t\t\t\tparent.parentNode.selectedIndex;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n}\n\njQuery.each( [\n\t\"tabIndex\",\n\t\"readOnly\",\n\t\"maxLength\",\n\t\"cellSpacing\",\n\t\"cellPadding\",\n\t\"rowSpan\",\n\t\"colSpan\",\n\t\"useMap\",\n\t\"frameBorder\",\n\t\"contentEditable\"\n], function() {\n\tjQuery.propFix[ this.toLowerCase() ] = this;\n} );\n\n\n\n\n\t// Strip and collapse whitespace according to HTML spec\n\t// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace\n\tfunction stripAndCollapse( value ) {\n\t\tvar tokens = value.match( rnothtmlwhite ) || [];\n\t\treturn tokens.join( \" \" );\n\t}\n\n\nfunction getClass( elem ) {\n\treturn elem.getAttribute && elem.getAttribute( \"class\" ) || \"\";\n}\n\njQuery.fn.extend( {\n\taddClass: function( value ) {\n\t\tvar classes, elem, cur, curValue, clazz, j, finalValue,\n\t\t\ti = 0;\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( j ) {\n\t\t\t\tjQuery( this ).addClass( value.call( this, j, getClass( this ) ) );\n\t\t\t} );\n\t\t}\n\n\t\tif ( typeof value === \"string\" && value ) {\n\t\t\tclasses = value.match( rnothtmlwhite ) || [];\n\n\t\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\t\tcurValue = getClass( elem );\n\t\t\t\tcur = elem.nodeType === 1 && ( \" \" + stripAndCollapse( curValue ) + \" \" );\n\n\t\t\t\tif ( cur ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\twhile ( ( clazz = classes[ j++ ] ) ) {\n\t\t\t\t\t\tif ( cur.indexOf( \" \" + clazz + \" \" ) < 0 ) {\n\t\t\t\t\t\t\tcur += clazz + \" \";\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\tfinalValue = stripAndCollapse( cur );\n\t\t\t\t\tif ( curValue !== finalValue ) {\n\t\t\t\t\t\telem.setAttribute( \"class\", finalValue );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\tremoveClass: function( value ) {\n\t\tvar classes, elem, cur, curValue, clazz, j, finalValue,\n\t\t\ti = 0;\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( j ) {\n\t\t\t\tjQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );\n\t\t\t} );\n\t\t}\n\n\t\tif ( !arguments.length ) {\n\t\t\treturn this.attr( \"class\", \"\" );\n\t\t}\n\n\t\tif ( typeof value === \"string\" && value ) {\n\t\t\tclasses = value.match( rnothtmlwhite ) || [];\n\n\t\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\t\tcurValue = getClass( elem );\n\n\t\t\t\t// This expression is here for better compressibility (see addClass)\n\t\t\t\tcur = elem.nodeType === 1 && ( \" \" + stripAndCollapse( curValue ) + \" \" );\n\n\t\t\t\tif ( cur ) {\n\t\t\t\t\tj = 0;\n\t\t\t\t\twhile ( ( clazz = classes[ j++ ] ) ) {\n\n\t\t\t\t\t\t// Remove *all* instances\n\t\t\t\t\t\twhile ( cur.indexOf( \" \" + clazz + \" \" ) > -1 ) {\n\t\t\t\t\t\t\tcur = cur.replace( \" \" + clazz + \" \", \" \" );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Only assign if different to avoid unneeded rendering.\n\t\t\t\t\tfinalValue = stripAndCollapse( cur );\n\t\t\t\t\tif ( curValue !== finalValue ) {\n\t\t\t\t\t\telem.setAttribute( \"class\", finalValue );\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn this;\n\t},\n\n\ttoggleClass: function( value, stateVal ) {\n\t\tvar type = typeof value;\n\n\t\tif ( typeof stateVal === \"boolean\" && type === \"string\" ) {\n\t\t\treturn stateVal ? this.addClass( value ) : this.removeClass( value );\n\t\t}\n\n\t\tif ( jQuery.isFunction( value ) ) {\n\t\t\treturn this.each( function( i ) {\n\t\t\t\tjQuery( this ).toggleClass(\n\t\t\t\t\tvalue.call( this, i, getClass( this ), stateVal ),\n\t\t\t\t\tstateVal\n\t\t\t\t);\n\t\t\t} );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar className, i, self, classNames;\n\n\t\t\tif ( type === \"string\" ) {\n\n\t\t\t\t// Toggle individual class names\n\t\t\t\ti = 0;\n\t\t\t\tself = jQuery( this );\n\t\t\t\tclassNames = value.match( rnothtmlwhite ) || [];\n\n\t\t\t\twhile ( ( className = classNames[ i++ ] ) ) {\n\n\t\t\t\t\t// Check each className given, space separated list\n\t\t\t\t\tif ( self.hasClass( className ) ) {\n\t\t\t\t\t\tself.removeClass( className );\n\t\t\t\t\t} else {\n\t\t\t\t\t\tself.addClass( className );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t// Toggle whole class name\n\t\t\t} else if ( value === undefined || type === \"boolean\" ) {\n\t\t\t\tclassName = getClass( this );\n\t\t\t\tif ( className ) {\n\n\t\t\t\t\t// Store className if set\n\t\t\t\t\tdataPriv.set( this, \"__className__\", className );\n\t\t\t\t}\n\n\t\t\t\t// If the element has a class name or if we're passed `false`,\n\t\t\t\t// then remove the whole classname (if there was one, the above saved it).\n\t\t\t\t// Otherwise bring back whatever was previously saved (if anything),\n\t\t\t\t// falling back to the empty string if nothing was stored.\n\t\t\t\tif ( this.setAttribute ) {\n\t\t\t\t\tthis.setAttribute( \"class\",\n\t\t\t\t\t\tclassName || value === false ?\n\t\t\t\t\t\t\"\" :\n\t\t\t\t\t\tdataPriv.get( this, \"__className__\" ) || \"\"\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t}\n\t\t} );\n\t},\n\n\thasClass: function( selector ) {\n\t\tvar className, elem,\n\t\t\ti = 0;\n\n\t\tclassName = \" \" + selector + \" \";\n\t\twhile ( ( elem = this[ i++ ] ) ) {\n\t\t\tif ( elem.nodeType === 1 &&\n\t\t\t\t( \" \" + stripAndCollapse( getClass( elem ) ) + \" \" ).indexOf( className ) > -1 ) {\n\t\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\n\t\treturn false;\n\t}\n} );\n\n\n\n\nvar rreturn = /\\r/g;\n\njQuery.fn.extend( {\n\tval: function( value ) {\n\t\tvar hooks, ret, isFunction,\n\t\t\telem = this[ 0 ];\n\n\t\tif ( !arguments.length ) {\n\t\t\tif ( elem ) {\n\t\t\t\thooks = jQuery.valHooks[ elem.type ] ||\n\t\t\t\t\tjQuery.valHooks[ elem.nodeName.toLowerCase() ];\n\n\t\t\t\tif ( hooks &&\n\t\t\t\t\t\"get\" in hooks &&\n\t\t\t\t\t( ret = hooks.get( elem, \"value\" ) ) !== undefined\n\t\t\t\t) {\n\t\t\t\t\treturn ret;\n\t\t\t\t}\n\n\t\t\t\tret = elem.value;\n\n\t\t\t\t// Handle most common string cases\n\t\t\t\tif ( typeof ret === \"string\" ) {\n\t\t\t\t\treturn ret.replace( rreturn, \"\" );\n\t\t\t\t}\n\n\t\t\t\t// Handle cases where value is null/undef or number\n\t\t\t\treturn ret == null ? \"\" : ret;\n\t\t\t}\n\n\t\t\treturn;\n\t\t}\n\n\t\tisFunction = jQuery.isFunction( value );\n\n\t\treturn this.each( function( i ) {\n\t\t\tvar val;\n\n\t\t\tif ( this.nodeType !== 1 ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tif ( isFunction ) {\n\t\t\t\tval = value.call( this, i, jQuery( this ).val() );\n\t\t\t} else {\n\t\t\t\tval = value;\n\t\t\t}\n\n\t\t\t// Treat null/undefined as \"\"; convert numbers to string\n\t\t\tif ( val == null ) {\n\t\t\t\tval = \"\";\n\n\t\t\t} else if ( typeof val === \"number\" ) {\n\t\t\t\tval += \"\";\n\n\t\t\t} else if ( Array.isArray( val ) ) {\n\t\t\t\tval = jQuery.map( val, function( value ) {\n\t\t\t\t\treturn value == null ? \"\" : value + \"\";\n\t\t\t\t} );\n\t\t\t}\n\n\t\t\thooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];\n\n\t\t\t// If set returns undefined, fall back to normal setting\n\t\t\tif ( !hooks || !( \"set\" in hooks ) || hooks.set( this, val, \"value\" ) === undefined ) {\n\t\t\t\tthis.value = val;\n\t\t\t}\n\t\t} );\n\t}\n} );\n\njQuery.extend( {\n\tvalHooks: {\n\t\toption: {\n\t\t\tget: function( elem ) {\n\n\t\t\t\tvar val = jQuery.find.attr( elem, \"value\" );\n\t\t\t\treturn val != null ?\n\t\t\t\t\tval :\n\n\t\t\t\t\t// Support: IE <=10 - 11 only\n\t\t\t\t\t// option.text throws exceptions (#14686, #14858)\n\t\t\t\t\t// Strip and collapse whitespace\n\t\t\t\t\t// https://html.spec.whatwg.org/#strip-and-collapse-whitespace\n\t\t\t\t\tstripAndCollapse( jQuery.text( elem ) );\n\t\t\t}\n\t\t},\n\t\tselect: {\n\t\t\tget: function( elem ) {\n\t\t\t\tvar value, option, i,\n\t\t\t\t\toptions = elem.options,\n\t\t\t\t\tindex = elem.selectedIndex,\n\t\t\t\t\tone = elem.type === \"select-one\",\n\t\t\t\t\tvalues = one ? null : [],\n\t\t\t\t\tmax = one ? index + 1 : options.length;\n\n\t\t\t\tif ( index < 0 ) {\n\t\t\t\t\ti = max;\n\n\t\t\t\t} else {\n\t\t\t\t\ti = one ? index : 0;\n\t\t\t\t}\n\n\t\t\t\t// Loop through all the selected options\n\t\t\t\tfor ( ; i < max; i++ ) {\n\t\t\t\t\toption = options[ i ];\n\n\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t// IE8-9 doesn't update selected after form reset (#2551)\n\t\t\t\t\tif ( ( option.selected || i === index ) &&\n\n\t\t\t\t\t\t\t// Don't return options that are disabled or in a disabled optgroup\n\t\t\t\t\t\t\t!option.disabled &&\n\t\t\t\t\t\t\t( !option.parentNode.disabled ||\n\t\t\t\t\t\t\t\t!nodeName( option.parentNode, \"optgroup\" ) ) ) {\n\n\t\t\t\t\t\t// Get the specific value for the option\n\t\t\t\t\t\tvalue = jQuery( option ).val();\n\n\t\t\t\t\t\t// We don't need an array for one selects\n\t\t\t\t\t\tif ( one ) {\n\t\t\t\t\t\t\treturn value;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Multi-Selects return an array\n\t\t\t\t\t\tvalues.push( value );\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\treturn values;\n\t\t\t},\n\n\t\t\tset: function( elem, value ) {\n\t\t\t\tvar optionSet, option,\n\t\t\t\t\toptions = elem.options,\n\t\t\t\t\tvalues = jQuery.makeArray( value ),\n\t\t\t\t\ti = options.length;\n\n\t\t\t\twhile ( i-- ) {\n\t\t\t\t\toption = options[ i ];\n\n\t\t\t\t\t/* eslint-disable no-cond-assign */\n\n\t\t\t\t\tif ( option.selected =\n\t\t\t\t\t\tjQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1\n\t\t\t\t\t) {\n\t\t\t\t\t\toptionSet = true;\n\t\t\t\t\t}\n\n\t\t\t\t\t/* eslint-enable no-cond-assign */\n\t\t\t\t}\n\n\t\t\t\t// Force browsers to behave consistently when non-matching value is set\n\t\t\t\tif ( !optionSet ) {\n\t\t\t\t\telem.selectedIndex = -1;\n\t\t\t\t}\n\t\t\t\treturn values;\n\t\t\t}\n\t\t}\n\t}\n} );\n\n// Radios and checkboxes getter/setter\njQuery.each( [ \"radio\", \"checkbox\" ], function() {\n\tjQuery.valHooks[ this ] = {\n\t\tset: function( elem, value ) {\n\t\t\tif ( Array.isArray( value ) ) {\n\t\t\t\treturn ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );\n\t\t\t}\n\t\t}\n\t};\n\tif ( !support.checkOn ) {\n\t\tjQuery.valHooks[ this ].get = function( elem ) {\n\t\t\treturn elem.getAttribute( \"value\" ) === null ? \"on\" : elem.value;\n\t\t};\n\t}\n} );\n\n\n\n\n// Return jQuery for attributes-only inclusion\n\n\nvar rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;\n\njQuery.extend( jQuery.event, {\n\n\ttrigger: function( event, data, elem, onlyHandlers ) {\n\n\t\tvar i, cur, tmp, bubbleType, ontype, handle, special,\n\t\t\teventPath = [ elem || document ],\n\t\t\ttype = hasOwn.call( event, \"type\" ) ? event.type : event,\n\t\t\tnamespaces = hasOwn.call( event, \"namespace\" ) ? event.namespace.split( \".\" ) : [];\n\n\t\tcur = tmp = elem = elem || document;\n\n\t\t// Don't do events on text and comment nodes\n\t\tif ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// focus/blur morphs to focusin/out; ensure we're not firing them right now\n\t\tif ( rfocusMorph.test( type + jQuery.event.triggered ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( type.indexOf( \".\" ) > -1 ) {\n\n\t\t\t// Namespaced trigger; create a regexp to match event type in handle()\n\t\t\tnamespaces = type.split( \".\" );\n\t\t\ttype = namespaces.shift();\n\t\t\tnamespaces.sort();\n\t\t}\n\t\tontype = type.indexOf( \":\" ) < 0 && \"on\" + type;\n\n\t\t// Caller can pass in a jQuery.Event object, Object, or just an event type string\n\t\tevent = event[ jQuery.expando ] ?\n\t\t\tevent :\n\t\t\tnew jQuery.Event( type, typeof event === \"object\" && event );\n\n\t\t// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n\t\tevent.isTrigger = onlyHandlers ? 2 : 3;\n\t\tevent.namespace = namespaces.join( \".\" );\n\t\tevent.rnamespace = event.namespace ?\n\t\t\tnew RegExp( \"(^|\\\\.)\" + namespaces.join( \"\\\\.(?:.*\\\\.|)\" ) + \"(\\\\.|$)\" ) :\n\t\t\tnull;\n\n\t\t// Clean up the event in case it is being reused\n\t\tevent.result = undefined;\n\t\tif ( !event.target ) {\n\t\t\tevent.target = elem;\n\t\t}\n\n\t\t// Clone any incoming data and prepend the event, creating the handler arg list\n\t\tdata = data == null ?\n\t\t\t[ event ] :\n\t\t\tjQuery.makeArray( data, [ event ] );\n\n\t\t// Allow special events to draw outside the lines\n\t\tspecial = jQuery.event.special[ type ] || {};\n\t\tif ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Determine event propagation path in advance, per W3C events spec (#9951)\n\t\t// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n\t\tif ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {\n\n\t\t\tbubbleType = special.delegateType || type;\n\t\t\tif ( !rfocusMorph.test( bubbleType + type ) ) {\n\t\t\t\tcur = cur.parentNode;\n\t\t\t}\n\t\t\tfor ( ; cur; cur = cur.parentNode ) {\n\t\t\t\teventPath.push( cur );\n\t\t\t\ttmp = cur;\n\t\t\t}\n\n\t\t\t// Only add window if we got to document (e.g., not plain obj or detached DOM)\n\t\t\tif ( tmp === ( elem.ownerDocument || document ) ) {\n\t\t\t\teventPath.push( tmp.defaultView || tmp.parentWindow || window );\n\t\t\t}\n\t\t}\n\n\t\t// Fire handlers on the event path\n\t\ti = 0;\n\t\twhile ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {\n\n\t\t\tevent.type = i > 1 ?\n\t\t\t\tbubbleType :\n\t\t\t\tspecial.bindType || type;\n\n\t\t\t// jQuery handler\n\t\t\thandle = ( dataPriv.get( cur, \"events\" ) || {} )[ event.type ] &&\n\t\t\t\tdataPriv.get( cur, \"handle\" );\n\t\t\tif ( handle ) {\n\t\t\t\thandle.apply( cur, data );\n\t\t\t}\n\n\t\t\t// Native handler\n\t\t\thandle = ontype && cur[ ontype ];\n\t\t\tif ( handle && handle.apply && acceptData( cur ) ) {\n\t\t\t\tevent.result = handle.apply( cur, data );\n\t\t\t\tif ( event.result === false ) {\n\t\t\t\t\tevent.preventDefault();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tevent.type = type;\n\n\t\t// If nobody prevented the default action, do it now\n\t\tif ( !onlyHandlers && !event.isDefaultPrevented() ) {\n\n\t\t\tif ( ( !special._default ||\n\t\t\t\tspecial._default.apply( eventPath.pop(), data ) === false ) &&\n\t\t\t\tacceptData( elem ) ) {\n\n\t\t\t\t// Call a native DOM method on the target with the same name as the event.\n\t\t\t\t// Don't do default actions on window, that's where global variables be (#6170)\n\t\t\t\tif ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {\n\n\t\t\t\t\t// Don't re-trigger an onFOO event when we call its FOO() method\n\t\t\t\t\ttmp = elem[ ontype ];\n\n\t\t\t\t\tif ( tmp ) {\n\t\t\t\t\t\telem[ ontype ] = null;\n\t\t\t\t\t}\n\n\t\t\t\t\t// Prevent re-triggering of the same event, since we already bubbled it above\n\t\t\t\t\tjQuery.event.triggered = type;\n\t\t\t\t\telem[ type ]();\n\t\t\t\t\tjQuery.event.triggered = undefined;\n\n\t\t\t\t\tif ( tmp ) {\n\t\t\t\t\t\telem[ ontype ] = tmp;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn event.result;\n\t},\n\n\t// Piggyback on a donor event to simulate a different one\n\t// Used only for `focus(in | out)` events\n\tsimulate: function( type, elem, event ) {\n\t\tvar e = jQuery.extend(\n\t\t\tnew jQuery.Event(),\n\t\t\tevent,\n\t\t\t{\n\t\t\t\ttype: type,\n\t\t\t\tisSimulated: true\n\t\t\t}\n\t\t);\n\n\t\tjQuery.event.trigger( e, null, elem );\n\t}\n\n} );\n\njQuery.fn.extend( {\n\n\ttrigger: function( type, data ) {\n\t\treturn this.each( function() {\n\t\t\tjQuery.event.trigger( type, data, this );\n\t\t} );\n\t},\n\ttriggerHandler: function( type, data ) {\n\t\tvar elem = this[ 0 ];\n\t\tif ( elem ) {\n\t\t\treturn jQuery.event.trigger( type, data, elem, true );\n\t\t}\n\t}\n} );\n\n\njQuery.each( ( \"blur focus focusin focusout resize scroll click dblclick \" +\n\t\"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +\n\t\"change select submit keydown keypress keyup contextmenu\" ).split( \" \" ),\n\tfunction( i, name ) {\n\n\t// Handle event binding\n\tjQuery.fn[ name ] = function( data, fn ) {\n\t\treturn arguments.length > 0 ?\n\t\t\tthis.on( name, null, data, fn ) :\n\t\t\tthis.trigger( name );\n\t};\n} );\n\njQuery.fn.extend( {\n\thover: function( fnOver, fnOut ) {\n\t\treturn this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n\t}\n} );\n\n\n\n\nsupport.focusin = \"onfocusin\" in window;\n\n\n// Support: Firefox <=44\n// Firefox doesn't have focus(in | out) events\n// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787\n//\n// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1\n// focus(in | out) events fire after focus & blur events,\n// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order\n// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857\nif ( !support.focusin ) {\n\tjQuery.each( { focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {\n\n\t\t// Attach a single capturing handler on the document while someone wants focusin/focusout\n\t\tvar handler = function( event ) {\n\t\t\tjQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );\n\t\t};\n\n\t\tjQuery.event.special[ fix ] = {\n\t\t\tsetup: function() {\n\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\tattaches = dataPriv.access( doc, fix );\n\n\t\t\t\tif ( !attaches ) {\n\t\t\t\t\tdoc.addEventListener( orig, handler, true );\n\t\t\t\t}\n\t\t\t\tdataPriv.access( doc, fix, ( attaches || 0 ) + 1 );\n\t\t\t},\n\t\t\tteardown: function() {\n\t\t\t\tvar doc = this.ownerDocument || this,\n\t\t\t\t\tattaches = dataPriv.access( doc, fix ) - 1;\n\n\t\t\t\tif ( !attaches ) {\n\t\t\t\t\tdoc.removeEventListener( orig, handler, true );\n\t\t\t\t\tdataPriv.remove( doc, fix );\n\n\t\t\t\t} else {\n\t\t\t\t\tdataPriv.access( doc, fix, attaches );\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t} );\n}\nvar location = window.location;\n\nvar nonce = jQuery.now();\n\nvar rquery = ( /\\?/ );\n\n\n\n// Cross-browser xml parsing\njQuery.parseXML = function( data ) {\n\tvar xml;\n\tif ( !data || typeof data !== \"string\" ) {\n\t\treturn null;\n\t}\n\n\t// Support: IE 9 - 11 only\n\t// IE throws on parseFromString with invalid input.\n\ttry {\n\t\txml = ( new window.DOMParser() ).parseFromString( data, \"text/xml\" );\n\t} catch ( e ) {\n\t\txml = undefined;\n\t}\n\n\tif ( !xml || xml.getElementsByTagName( \"parsererror\" ).length ) {\n\t\tjQuery.error( \"Invalid XML: \" + data );\n\t}\n\treturn xml;\n};\n\n\nvar\n\trbracket = /\\[\\]$/,\n\trCRLF = /\\r?\\n/g,\n\trsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n\trsubmittable = /^(?:input|select|textarea|keygen)/i;\n\nfunction buildParams( prefix, obj, traditional, add ) {\n\tvar name;\n\n\tif ( Array.isArray( obj ) ) {\n\n\t\t// Serialize array item.\n\t\tjQuery.each( obj, function( i, v ) {\n\t\t\tif ( traditional || rbracket.test( prefix ) ) {\n\n\t\t\t\t// Treat each array item as a scalar.\n\t\t\t\tadd( prefix, v );\n\n\t\t\t} else {\n\n\t\t\t\t// Item is non-scalar (array or object), encode its numeric index.\n\t\t\t\tbuildParams(\n\t\t\t\t\tprefix + \"[\" + ( typeof v === \"object\" && v != null ? i : \"\" ) + \"]\",\n\t\t\t\t\tv,\n\t\t\t\t\ttraditional,\n\t\t\t\t\tadd\n\t\t\t\t);\n\t\t\t}\n\t\t} );\n\n\t} else if ( !traditional && jQuery.type( obj ) === \"object\" ) {\n\n\t\t// Serialize object item.\n\t\tfor ( name in obj ) {\n\t\t\tbuildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );\n\t\t}\n\n\t} else {\n\n\t\t// Serialize scalar item.\n\t\tadd( prefix, obj );\n\t}\n}\n\n// Serialize an array of form elements or a set of\n// key/values into a query string\njQuery.param = function( a, traditional ) {\n\tvar prefix,\n\t\ts = [],\n\t\tadd = function( key, valueOrFunction ) {\n\n\t\t\t// If value is a function, invoke it and use its return value\n\t\t\tvar value = jQuery.isFunction( valueOrFunction ) ?\n\t\t\t\tvalueOrFunction() :\n\t\t\t\tvalueOrFunction;\n\n\t\t\ts[ s.length ] = encodeURIComponent( key ) + \"=\" +\n\t\t\t\tencodeURIComponent( value == null ? \"\" : value );\n\t\t};\n\n\t// If an array was passed in, assume that it is an array of form elements.\n\tif ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n\n\t\t// Serialize the form elements\n\t\tjQuery.each( a, function() {\n\t\t\tadd( this.name, this.value );\n\t\t} );\n\n\t} else {\n\n\t\t// If traditional, encode the \"old\" way (the way 1.3.2 or older\n\t\t// did it), otherwise encode params recursively.\n\t\tfor ( prefix in a ) {\n\t\t\tbuildParams( prefix, a[ prefix ], traditional, add );\n\t\t}\n\t}\n\n\t// Return the resulting serialization\n\treturn s.join( \"&\" );\n};\n\njQuery.fn.extend( {\n\tserialize: function() {\n\t\treturn jQuery.param( this.serializeArray() );\n\t},\n\tserializeArray: function() {\n\t\treturn this.map( function() {\n\n\t\t\t// Can add propHook for \"elements\" to filter or add form elements\n\t\t\tvar elements = jQuery.prop( this, \"elements\" );\n\t\t\treturn elements ? jQuery.makeArray( elements ) : this;\n\t\t} )\n\t\t.filter( function() {\n\t\t\tvar type = this.type;\n\n\t\t\t// Use .is( \":disabled\" ) so that fieldset[disabled] works\n\t\t\treturn this.name && !jQuery( this ).is( \":disabled\" ) &&\n\t\t\t\trsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&\n\t\t\t\t( this.checked || !rcheckableType.test( type ) );\n\t\t} )\n\t\t.map( function( i, elem ) {\n\t\t\tvar val = jQuery( this ).val();\n\n\t\t\tif ( val == null ) {\n\t\t\t\treturn null;\n\t\t\t}\n\n\t\t\tif ( Array.isArray( val ) ) {\n\t\t\t\treturn jQuery.map( val, function( val ) {\n\t\t\t\t\treturn { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n\t\t\t\t} );\n\t\t\t}\n\n\t\t\treturn { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n\t\t} ).get();\n\t}\n} );\n\n\nvar\n\tr20 = /%20/g,\n\trhash = /#.*$/,\n\trantiCache = /([?&])_=[^&]*/,\n\trheaders = /^(.*?):[ \\t]*([^\\r\\n]*)$/mg,\n\n\t// #7653, #8125, #8152: local protocol detection\n\trlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n\trnoContent = /^(?:GET|HEAD)$/,\n\trprotocol = /^\\/\\//,\n\n\t/* Prefilters\n\t * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n\t * 2) These are called:\n\t *    - BEFORE asking for a transport\n\t *    - AFTER param serialization (s.data is a string if s.processData is true)\n\t * 3) key is the dataType\n\t * 4) the catchall symbol \"*\" can be used\n\t * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n\t */\n\tprefilters = {},\n\n\t/* Transports bindings\n\t * 1) key is the dataType\n\t * 2) the catchall symbol \"*\" can be used\n\t * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n\t */\n\ttransports = {},\n\n\t// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n\tallTypes = \"*/\".concat( \"*\" ),\n\n\t// Anchor tag for parsing the document origin\n\toriginAnchor = document.createElement( \"a\" );\n\toriginAnchor.href = location.href;\n\n// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\nfunction addToPrefiltersOrTransports( structure ) {\n\n\t// dataTypeExpression is optional and defaults to \"*\"\n\treturn function( dataTypeExpression, func ) {\n\n\t\tif ( typeof dataTypeExpression !== \"string\" ) {\n\t\t\tfunc = dataTypeExpression;\n\t\t\tdataTypeExpression = \"*\";\n\t\t}\n\n\t\tvar dataType,\n\t\t\ti = 0,\n\t\t\tdataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];\n\n\t\tif ( jQuery.isFunction( func ) ) {\n\n\t\t\t// For each dataType in the dataTypeExpression\n\t\t\twhile ( ( dataType = dataTypes[ i++ ] ) ) {\n\n\t\t\t\t// Prepend if requested\n\t\t\t\tif ( dataType[ 0 ] === \"+\" ) {\n\t\t\t\t\tdataType = dataType.slice( 1 ) || \"*\";\n\t\t\t\t\t( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );\n\n\t\t\t\t// Otherwise append\n\t\t\t\t} else {\n\t\t\t\t\t( structure[ dataType ] = structure[ dataType ] || [] ).push( func );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t};\n}\n\n// Base inspection function for prefilters and transports\nfunction inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {\n\n\tvar inspected = {},\n\t\tseekingTransport = ( structure === transports );\n\n\tfunction inspect( dataType ) {\n\t\tvar selected;\n\t\tinspected[ dataType ] = true;\n\t\tjQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {\n\t\t\tvar dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );\n\t\t\tif ( typeof dataTypeOrTransport === \"string\" &&\n\t\t\t\t!seekingTransport && !inspected[ dataTypeOrTransport ] ) {\n\n\t\t\t\toptions.dataTypes.unshift( dataTypeOrTransport );\n\t\t\t\tinspect( dataTypeOrTransport );\n\t\t\t\treturn false;\n\t\t\t} else if ( seekingTransport ) {\n\t\t\t\treturn !( selected = dataTypeOrTransport );\n\t\t\t}\n\t\t} );\n\t\treturn selected;\n\t}\n\n\treturn inspect( options.dataTypes[ 0 ] ) || !inspected[ \"*\" ] && inspect( \"*\" );\n}\n\n// A special extend for ajax options\n// that takes \"flat\" options (not to be deep extended)\n// Fixes #9887\nfunction ajaxExtend( target, src ) {\n\tvar key, deep,\n\t\tflatOptions = jQuery.ajaxSettings.flatOptions || {};\n\n\tfor ( key in src ) {\n\t\tif ( src[ key ] !== undefined ) {\n\t\t\t( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];\n\t\t}\n\t}\n\tif ( deep ) {\n\t\tjQuery.extend( true, target, deep );\n\t}\n\n\treturn target;\n}\n\n/* Handles responses to an ajax request:\n * - finds the right dataType (mediates between content-type and expected dataType)\n * - returns the corresponding response\n */\nfunction ajaxHandleResponses( s, jqXHR, responses ) {\n\n\tvar ct, type, finalDataType, firstDataType,\n\t\tcontents = s.contents,\n\t\tdataTypes = s.dataTypes;\n\n\t// Remove auto dataType and get content-type in the process\n\twhile ( dataTypes[ 0 ] === \"*\" ) {\n\t\tdataTypes.shift();\n\t\tif ( ct === undefined ) {\n\t\t\tct = s.mimeType || jqXHR.getResponseHeader( \"Content-Type\" );\n\t\t}\n\t}\n\n\t// Check if we're dealing with a known content-type\n\tif ( ct ) {\n\t\tfor ( type in contents ) {\n\t\t\tif ( contents[ type ] && contents[ type ].test( ct ) ) {\n\t\t\t\tdataTypes.unshift( type );\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\n\t// Check to see if we have a response for the expected dataType\n\tif ( dataTypes[ 0 ] in responses ) {\n\t\tfinalDataType = dataTypes[ 0 ];\n\t} else {\n\n\t\t// Try convertible dataTypes\n\t\tfor ( type in responses ) {\n\t\t\tif ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[ 0 ] ] ) {\n\t\t\t\tfinalDataType = type;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tif ( !firstDataType ) {\n\t\t\t\tfirstDataType = type;\n\t\t\t}\n\t\t}\n\n\t\t// Or just use first one\n\t\tfinalDataType = finalDataType || firstDataType;\n\t}\n\n\t// If we found a dataType\n\t// We add the dataType to the list if needed\n\t// and return the corresponding response\n\tif ( finalDataType ) {\n\t\tif ( finalDataType !== dataTypes[ 0 ] ) {\n\t\t\tdataTypes.unshift( finalDataType );\n\t\t}\n\t\treturn responses[ finalDataType ];\n\t}\n}\n\n/* Chain conversions given the request and the original response\n * Also sets the responseXXX fields on the jqXHR instance\n */\nfunction ajaxConvert( s, response, jqXHR, isSuccess ) {\n\tvar conv2, current, conv, tmp, prev,\n\t\tconverters = {},\n\n\t\t// Work with a copy of dataTypes in case we need to modify it for conversion\n\t\tdataTypes = s.dataTypes.slice();\n\n\t// Create converters map with lowercased keys\n\tif ( dataTypes[ 1 ] ) {\n\t\tfor ( conv in s.converters ) {\n\t\t\tconverters[ conv.toLowerCase() ] = s.converters[ conv ];\n\t\t}\n\t}\n\n\tcurrent = dataTypes.shift();\n\n\t// Convert to each sequential dataType\n\twhile ( current ) {\n\n\t\tif ( s.responseFields[ current ] ) {\n\t\t\tjqXHR[ s.responseFields[ current ] ] = response;\n\t\t}\n\n\t\t// Apply the dataFilter if provided\n\t\tif ( !prev && isSuccess && s.dataFilter ) {\n\t\t\tresponse = s.dataFilter( response, s.dataType );\n\t\t}\n\n\t\tprev = current;\n\t\tcurrent = dataTypes.shift();\n\n\t\tif ( current ) {\n\n\t\t\t// There's only work to do if current dataType is non-auto\n\t\t\tif ( current === \"*\" ) {\n\n\t\t\t\tcurrent = prev;\n\n\t\t\t// Convert response if prev dataType is non-auto and differs from current\n\t\t\t} else if ( prev !== \"*\" && prev !== current ) {\n\n\t\t\t\t// Seek a direct converter\n\t\t\t\tconv = converters[ prev + \" \" + current ] || converters[ \"* \" + current ];\n\n\t\t\t\t// If none found, seek a pair\n\t\t\t\tif ( !conv ) {\n\t\t\t\t\tfor ( conv2 in converters ) {\n\n\t\t\t\t\t\t// If conv2 outputs current\n\t\t\t\t\t\ttmp = conv2.split( \" \" );\n\t\t\t\t\t\tif ( tmp[ 1 ] === current ) {\n\n\t\t\t\t\t\t\t// If prev can be converted to accepted input\n\t\t\t\t\t\t\tconv = converters[ prev + \" \" + tmp[ 0 ] ] ||\n\t\t\t\t\t\t\t\tconverters[ \"* \" + tmp[ 0 ] ];\n\t\t\t\t\t\t\tif ( conv ) {\n\n\t\t\t\t\t\t\t\t// Condense equivalence converters\n\t\t\t\t\t\t\t\tif ( conv === true ) {\n\t\t\t\t\t\t\t\t\tconv = converters[ conv2 ];\n\n\t\t\t\t\t\t\t\t// Otherwise, insert the intermediate dataType\n\t\t\t\t\t\t\t\t} else if ( converters[ conv2 ] !== true ) {\n\t\t\t\t\t\t\t\t\tcurrent = tmp[ 0 ];\n\t\t\t\t\t\t\t\t\tdataTypes.unshift( tmp[ 1 ] );\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Apply converter (if not an equivalence)\n\t\t\t\tif ( conv !== true ) {\n\n\t\t\t\t\t// Unless errors are allowed to bubble, catch and return them\n\t\t\t\t\tif ( conv && s.throws ) {\n\t\t\t\t\t\tresponse = conv( response );\n\t\t\t\t\t} else {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tresponse = conv( response );\n\t\t\t\t\t\t} catch ( e ) {\n\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\tstate: \"parsererror\",\n\t\t\t\t\t\t\t\terror: conv ? e : \"No conversion from \" + prev + \" to \" + current\n\t\t\t\t\t\t\t};\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn { state: \"success\", data: response };\n}\n\njQuery.extend( {\n\n\t// Counter for holding the number of active queries\n\tactive: 0,\n\n\t// Last-Modified header cache for next request\n\tlastModified: {},\n\tetag: {},\n\n\tajaxSettings: {\n\t\turl: location.href,\n\t\ttype: \"GET\",\n\t\tisLocal: rlocalProtocol.test( location.protocol ),\n\t\tglobal: true,\n\t\tprocessData: true,\n\t\tasync: true,\n\t\tcontentType: \"application/x-www-form-urlencoded; charset=UTF-8\",\n\n\t\t/*\n\t\ttimeout: 0,\n\t\tdata: null,\n\t\tdataType: null,\n\t\tusername: null,\n\t\tpassword: null,\n\t\tcache: null,\n\t\tthrows: false,\n\t\ttraditional: false,\n\t\theaders: {},\n\t\t*/\n\n\t\taccepts: {\n\t\t\t\"*\": allTypes,\n\t\t\ttext: \"text/plain\",\n\t\t\thtml: \"text/html\",\n\t\t\txml: \"application/xml, text/xml\",\n\t\t\tjson: \"application/json, text/javascript\"\n\t\t},\n\n\t\tcontents: {\n\t\t\txml: /\\bxml\\b/,\n\t\t\thtml: /\\bhtml/,\n\t\t\tjson: /\\bjson\\b/\n\t\t},\n\n\t\tresponseFields: {\n\t\t\txml: \"responseXML\",\n\t\t\ttext: \"responseText\",\n\t\t\tjson: \"responseJSON\"\n\t\t},\n\n\t\t// Data converters\n\t\t// Keys separate source (or catchall \"*\") and destination types with a single space\n\t\tconverters: {\n\n\t\t\t// Convert anything to text\n\t\t\t\"* text\": String,\n\n\t\t\t// Text to html (true = no transformation)\n\t\t\t\"text html\": true,\n\n\t\t\t// Evaluate text as a json expression\n\t\t\t\"text json\": JSON.parse,\n\n\t\t\t// Parse text as xml\n\t\t\t\"text xml\": jQuery.parseXML\n\t\t},\n\n\t\t// For options that shouldn't be deep extended:\n\t\t// you can add your own custom options here if\n\t\t// and when you create one that shouldn't be\n\t\t// deep extended (see ajaxExtend)\n\t\tflatOptions: {\n\t\t\turl: true,\n\t\t\tcontext: true\n\t\t}\n\t},\n\n\t// Creates a full fledged settings object into target\n\t// with both ajaxSettings and settings fields.\n\t// If target is omitted, writes into ajaxSettings.\n\tajaxSetup: function( target, settings ) {\n\t\treturn settings ?\n\n\t\t\t// Building a settings object\n\t\t\tajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :\n\n\t\t\t// Extending ajaxSettings\n\t\t\tajaxExtend( jQuery.ajaxSettings, target );\n\t},\n\n\tajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n\tajaxTransport: addToPrefiltersOrTransports( transports ),\n\n\t// Main method\n\tajax: function( url, options ) {\n\n\t\t// If url is an object, simulate pre-1.5 signature\n\t\tif ( typeof url === \"object\" ) {\n\t\t\toptions = url;\n\t\t\turl = undefined;\n\t\t}\n\n\t\t// Force options to be an object\n\t\toptions = options || {};\n\n\t\tvar transport,\n\n\t\t\t// URL without anti-cache param\n\t\t\tcacheURL,\n\n\t\t\t// Response headers\n\t\t\tresponseHeadersString,\n\t\t\tresponseHeaders,\n\n\t\t\t// timeout handle\n\t\t\ttimeoutTimer,\n\n\t\t\t// Url cleanup var\n\t\t\turlAnchor,\n\n\t\t\t// Request state (becomes false upon send and true upon completion)\n\t\t\tcompleted,\n\n\t\t\t// To know if global events are to be dispatched\n\t\t\tfireGlobals,\n\n\t\t\t// Loop variable\n\t\t\ti,\n\n\t\t\t// uncached part of the url\n\t\t\tuncached,\n\n\t\t\t// Create the final options object\n\t\t\ts = jQuery.ajaxSetup( {}, options ),\n\n\t\t\t// Callbacks context\n\t\t\tcallbackContext = s.context || s,\n\n\t\t\t// Context for global events is callbackContext if it is a DOM node or jQuery collection\n\t\t\tglobalEventContext = s.context &&\n\t\t\t\t( callbackContext.nodeType || callbackContext.jquery ) ?\n\t\t\t\t\tjQuery( callbackContext ) :\n\t\t\t\t\tjQuery.event,\n\n\t\t\t// Deferreds\n\t\t\tdeferred = jQuery.Deferred(),\n\t\t\tcompleteDeferred = jQuery.Callbacks( \"once memory\" ),\n\n\t\t\t// Status-dependent callbacks\n\t\t\tstatusCode = s.statusCode || {},\n\n\t\t\t// Headers (they are sent all at once)\n\t\t\trequestHeaders = {},\n\t\t\trequestHeadersNames = {},\n\n\t\t\t// Default abort message\n\t\t\tstrAbort = \"canceled\",\n\n\t\t\t// Fake xhr\n\t\t\tjqXHR = {\n\t\t\t\treadyState: 0,\n\n\t\t\t\t// Builds headers hashtable if needed\n\t\t\t\tgetResponseHeader: function( key ) {\n\t\t\t\t\tvar match;\n\t\t\t\t\tif ( completed ) {\n\t\t\t\t\t\tif ( !responseHeaders ) {\n\t\t\t\t\t\t\tresponseHeaders = {};\n\t\t\t\t\t\t\twhile ( ( match = rheaders.exec( responseHeadersString ) ) ) {\n\t\t\t\t\t\t\t\tresponseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmatch = responseHeaders[ key.toLowerCase() ];\n\t\t\t\t\t}\n\t\t\t\t\treturn match == null ? null : match;\n\t\t\t\t},\n\n\t\t\t\t// Raw string\n\t\t\t\tgetAllResponseHeaders: function() {\n\t\t\t\t\treturn completed ? responseHeadersString : null;\n\t\t\t\t},\n\n\t\t\t\t// Caches the header\n\t\t\t\tsetRequestHeader: function( name, value ) {\n\t\t\t\t\tif ( completed == null ) {\n\t\t\t\t\t\tname = requestHeadersNames[ name.toLowerCase() ] =\n\t\t\t\t\t\t\trequestHeadersNames[ name.toLowerCase() ] || name;\n\t\t\t\t\t\trequestHeaders[ name ] = value;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Overrides response content-type header\n\t\t\t\toverrideMimeType: function( type ) {\n\t\t\t\t\tif ( completed == null ) {\n\t\t\t\t\t\ts.mimeType = type;\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Status-dependent callbacks\n\t\t\t\tstatusCode: function( map ) {\n\t\t\t\t\tvar code;\n\t\t\t\t\tif ( map ) {\n\t\t\t\t\t\tif ( completed ) {\n\n\t\t\t\t\t\t\t// Execute the appropriate callbacks\n\t\t\t\t\t\t\tjqXHR.always( map[ jqXHR.status ] );\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\t// Lazy-add the new callbacks in a way that preserves old ones\n\t\t\t\t\t\t\tfor ( code in map ) {\n\t\t\t\t\t\t\t\tstatusCode[ code ] = [ statusCode[ code ], map[ code ] ];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\treturn this;\n\t\t\t\t},\n\n\t\t\t\t// Cancel the request\n\t\t\t\tabort: function( statusText ) {\n\t\t\t\t\tvar finalText = statusText || strAbort;\n\t\t\t\t\tif ( transport ) {\n\t\t\t\t\t\ttransport.abort( finalText );\n\t\t\t\t\t}\n\t\t\t\t\tdone( 0, finalText );\n\t\t\t\t\treturn this;\n\t\t\t\t}\n\t\t\t};\n\n\t\t// Attach deferreds\n\t\tdeferred.promise( jqXHR );\n\n\t\t// Add protocol if not provided (prefilters might expect it)\n\t\t// Handle falsy url in the settings object (#10093: consistency with old signature)\n\t\t// We also use the url parameter if available\n\t\ts.url = ( ( url || s.url || location.href ) + \"\" )\n\t\t\t.replace( rprotocol, location.protocol + \"//\" );\n\n\t\t// Alias method option to type as per ticket #12004\n\t\ts.type = options.method || options.type || s.method || s.type;\n\n\t\t// Extract dataTypes list\n\t\ts.dataTypes = ( s.dataType || \"*\" ).toLowerCase().match( rnothtmlwhite ) || [ \"\" ];\n\n\t\t// A cross-domain request is in order when the origin doesn't match the current origin.\n\t\tif ( s.crossDomain == null ) {\n\t\t\turlAnchor = document.createElement( \"a\" );\n\n\t\t\t// Support: IE <=8 - 11, Edge 12 - 13\n\t\t\t// IE throws exception on accessing the href property if url is malformed,\n\t\t\t// e.g. http://example.com:80x/\n\t\t\ttry {\n\t\t\t\turlAnchor.href = s.url;\n\n\t\t\t\t// Support: IE <=8 - 11 only\n\t\t\t\t// Anchor's host property isn't correctly set when s.url is relative\n\t\t\t\turlAnchor.href = urlAnchor.href;\n\t\t\t\ts.crossDomain = originAnchor.protocol + \"//\" + originAnchor.host !==\n\t\t\t\t\turlAnchor.protocol + \"//\" + urlAnchor.host;\n\t\t\t} catch ( e ) {\n\n\t\t\t\t// If there is an error parsing the URL, assume it is crossDomain,\n\t\t\t\t// it can be rejected by the transport if it is invalid\n\t\t\t\ts.crossDomain = true;\n\t\t\t}\n\t\t}\n\n\t\t// Convert data if not already a string\n\t\tif ( s.data && s.processData && typeof s.data !== \"string\" ) {\n\t\t\ts.data = jQuery.param( s.data, s.traditional );\n\t\t}\n\n\t\t// Apply prefilters\n\t\tinspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\n\t\t// If request was aborted inside a prefilter, stop there\n\t\tif ( completed ) {\n\t\t\treturn jqXHR;\n\t\t}\n\n\t\t// We can fire global events as of now if asked to\n\t\t// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)\n\t\tfireGlobals = jQuery.event && s.global;\n\n\t\t// Watch for a new set of requests\n\t\tif ( fireGlobals && jQuery.active++ === 0 ) {\n\t\t\tjQuery.event.trigger( \"ajaxStart\" );\n\t\t}\n\n\t\t// Uppercase the type\n\t\ts.type = s.type.toUpperCase();\n\n\t\t// Determine if request has content\n\t\ts.hasContent = !rnoContent.test( s.type );\n\n\t\t// Save the URL in case we're toying with the If-Modified-Since\n\t\t// and/or If-None-Match header later on\n\t\t// Remove hash to simplify url manipulation\n\t\tcacheURL = s.url.replace( rhash, \"\" );\n\n\t\t// More options handling for requests with no content\n\t\tif ( !s.hasContent ) {\n\n\t\t\t// Remember the hash so we can put it back\n\t\t\tuncached = s.url.slice( cacheURL.length );\n\n\t\t\t// If data is available, append data to url\n\t\t\tif ( s.data ) {\n\t\t\t\tcacheURL += ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + s.data;\n\n\t\t\t\t// #9682: remove data so that it's not used in an eventual retry\n\t\t\t\tdelete s.data;\n\t\t\t}\n\n\t\t\t// Add or update anti-cache param if needed\n\t\t\tif ( s.cache === false ) {\n\t\t\t\tcacheURL = cacheURL.replace( rantiCache, \"$1\" );\n\t\t\t\tuncached = ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + \"_=\" + ( nonce++ ) + uncached;\n\t\t\t}\n\n\t\t\t// Put hash and anti-cache on the URL that will be requested (gh-1732)\n\t\t\ts.url = cacheURL + uncached;\n\n\t\t// Change '%20' to '+' if this is encoded form body content (gh-2658)\n\t\t} else if ( s.data && s.processData &&\n\t\t\t( s.contentType || \"\" ).indexOf( \"application/x-www-form-urlencoded\" ) === 0 ) {\n\t\t\ts.data = s.data.replace( r20, \"+\" );\n\t\t}\n\n\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\tif ( s.ifModified ) {\n\t\t\tif ( jQuery.lastModified[ cacheURL ] ) {\n\t\t\t\tjqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ cacheURL ] );\n\t\t\t}\n\t\t\tif ( jQuery.etag[ cacheURL ] ) {\n\t\t\t\tjqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ cacheURL ] );\n\t\t\t}\n\t\t}\n\n\t\t// Set the correct header, if data is being sent\n\t\tif ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n\t\t\tjqXHR.setRequestHeader( \"Content-Type\", s.contentType );\n\t\t}\n\n\t\t// Set the Accepts header for the server, depending on the dataType\n\t\tjqXHR.setRequestHeader(\n\t\t\t\"Accept\",\n\t\t\ts.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?\n\t\t\t\ts.accepts[ s.dataTypes[ 0 ] ] +\n\t\t\t\t\t( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :\n\t\t\t\ts.accepts[ \"*\" ]\n\t\t);\n\n\t\t// Check for headers option\n\t\tfor ( i in s.headers ) {\n\t\t\tjqXHR.setRequestHeader( i, s.headers[ i ] );\n\t\t}\n\n\t\t// Allow custom headers/mimetypes and early abort\n\t\tif ( s.beforeSend &&\n\t\t\t( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {\n\n\t\t\t// Abort if not done already and return\n\t\t\treturn jqXHR.abort();\n\t\t}\n\n\t\t// Aborting is no longer a cancellation\n\t\tstrAbort = \"abort\";\n\n\t\t// Install callbacks on deferreds\n\t\tcompleteDeferred.add( s.complete );\n\t\tjqXHR.done( s.success );\n\t\tjqXHR.fail( s.error );\n\n\t\t// Get transport\n\t\ttransport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\n\t\t// If no transport, we auto-abort\n\t\tif ( !transport ) {\n\t\t\tdone( -1, \"No Transport\" );\n\t\t} else {\n\t\t\tjqXHR.readyState = 1;\n\n\t\t\t// Send global event\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );\n\t\t\t}\n\n\t\t\t// If request was aborted inside ajaxSend, stop there\n\t\t\tif ( completed ) {\n\t\t\t\treturn jqXHR;\n\t\t\t}\n\n\t\t\t// Timeout\n\t\t\tif ( s.async && s.timeout > 0 ) {\n\t\t\t\ttimeoutTimer = window.setTimeout( function() {\n\t\t\t\t\tjqXHR.abort( \"timeout\" );\n\t\t\t\t}, s.timeout );\n\t\t\t}\n\n\t\t\ttry {\n\t\t\t\tcompleted = false;\n\t\t\t\ttransport.send( requestHeaders, done );\n\t\t\t} catch ( e ) {\n\n\t\t\t\t// Rethrow post-completion exceptions\n\t\t\t\tif ( completed ) {\n\t\t\t\t\tthrow e;\n\t\t\t\t}\n\n\t\t\t\t// Propagate others as results\n\t\t\t\tdone( -1, e );\n\t\t\t}\n\t\t}\n\n\t\t// Callback for when everything is done\n\t\tfunction done( status, nativeStatusText, responses, headers ) {\n\t\t\tvar isSuccess, success, error, response, modified,\n\t\t\t\tstatusText = nativeStatusText;\n\n\t\t\t// Ignore repeat invocations\n\t\t\tif ( completed ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tcompleted = true;\n\n\t\t\t// Clear timeout if it exists\n\t\t\tif ( timeoutTimer ) {\n\t\t\t\twindow.clearTimeout( timeoutTimer );\n\t\t\t}\n\n\t\t\t// Dereference transport for early garbage collection\n\t\t\t// (no matter how long the jqXHR object will be used)\n\t\t\ttransport = undefined;\n\n\t\t\t// Cache response headers\n\t\t\tresponseHeadersString = headers || \"\";\n\n\t\t\t// Set readyState\n\t\t\tjqXHR.readyState = status > 0 ? 4 : 0;\n\n\t\t\t// Determine if successful\n\t\t\tisSuccess = status >= 200 && status < 300 || status === 304;\n\n\t\t\t// Get response data\n\t\t\tif ( responses ) {\n\t\t\t\tresponse = ajaxHandleResponses( s, jqXHR, responses );\n\t\t\t}\n\n\t\t\t// Convert no matter what (that way responseXXX fields are always set)\n\t\t\tresponse = ajaxConvert( s, response, jqXHR, isSuccess );\n\n\t\t\t// If successful, handle type chaining\n\t\t\tif ( isSuccess ) {\n\n\t\t\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\t\t\t\tif ( s.ifModified ) {\n\t\t\t\t\tmodified = jqXHR.getResponseHeader( \"Last-Modified\" );\n\t\t\t\t\tif ( modified ) {\n\t\t\t\t\t\tjQuery.lastModified[ cacheURL ] = modified;\n\t\t\t\t\t}\n\t\t\t\t\tmodified = jqXHR.getResponseHeader( \"etag\" );\n\t\t\t\t\tif ( modified ) {\n\t\t\t\t\t\tjQuery.etag[ cacheURL ] = modified;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// if no content\n\t\t\t\tif ( status === 204 || s.type === \"HEAD\" ) {\n\t\t\t\t\tstatusText = \"nocontent\";\n\n\t\t\t\t// if not modified\n\t\t\t\t} else if ( status === 304 ) {\n\t\t\t\t\tstatusText = \"notmodified\";\n\n\t\t\t\t// If we have data, let's convert it\n\t\t\t\t} else {\n\t\t\t\t\tstatusText = response.state;\n\t\t\t\t\tsuccess = response.data;\n\t\t\t\t\terror = response.error;\n\t\t\t\t\tisSuccess = !error;\n\t\t\t\t}\n\t\t\t} else {\n\n\t\t\t\t// Extract error from statusText and normalize for non-aborts\n\t\t\t\terror = statusText;\n\t\t\t\tif ( status || !statusText ) {\n\t\t\t\t\tstatusText = \"error\";\n\t\t\t\t\tif ( status < 0 ) {\n\t\t\t\t\t\tstatus = 0;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Set data for the fake xhr object\n\t\t\tjqXHR.status = status;\n\t\t\tjqXHR.statusText = ( nativeStatusText || statusText ) + \"\";\n\n\t\t\t// Success/Error\n\t\t\tif ( isSuccess ) {\n\t\t\t\tdeferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n\t\t\t} else {\n\t\t\t\tdeferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n\t\t\t}\n\n\t\t\t// Status-dependent callbacks\n\t\t\tjqXHR.statusCode( statusCode );\n\t\t\tstatusCode = undefined;\n\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( isSuccess ? \"ajaxSuccess\" : \"ajaxError\",\n\t\t\t\t\t[ jqXHR, s, isSuccess ? success : error ] );\n\t\t\t}\n\n\t\t\t// Complete\n\t\t\tcompleteDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );\n\n\t\t\tif ( fireGlobals ) {\n\t\t\t\tglobalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );\n\n\t\t\t\t// Handle the global AJAX counter\n\t\t\t\tif ( !( --jQuery.active ) ) {\n\t\t\t\t\tjQuery.event.trigger( \"ajaxStop\" );\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn jqXHR;\n\t},\n\n\tgetJSON: function( url, data, callback ) {\n\t\treturn jQuery.get( url, data, callback, \"json\" );\n\t},\n\n\tgetScript: function( url, callback ) {\n\t\treturn jQuery.get( url, undefined, callback, \"script\" );\n\t}\n} );\n\njQuery.each( [ \"get\", \"post\" ], function( i, method ) {\n\tjQuery[ method ] = function( url, data, callback, type ) {\n\n\t\t// Shift arguments if data argument was omitted\n\t\tif ( jQuery.isFunction( data ) ) {\n\t\t\ttype = type || callback;\n\t\t\tcallback = data;\n\t\t\tdata = undefined;\n\t\t}\n\n\t\t// The url can be an options object (which then must have .url)\n\t\treturn jQuery.ajax( jQuery.extend( {\n\t\t\turl: url,\n\t\t\ttype: method,\n\t\t\tdataType: type,\n\t\t\tdata: data,\n\t\t\tsuccess: callback\n\t\t}, jQuery.isPlainObject( url ) && url ) );\n\t};\n} );\n\n\njQuery._evalUrl = function( url ) {\n\treturn jQuery.ajax( {\n\t\turl: url,\n\n\t\t// Make this explicit, since user can override this through ajaxSetup (#11264)\n\t\ttype: \"GET\",\n\t\tdataType: \"script\",\n\t\tcache: true,\n\t\tasync: false,\n\t\tglobal: false,\n\t\t\"throws\": true\n\t} );\n};\n\n\njQuery.fn.extend( {\n\twrapAll: function( html ) {\n\t\tvar wrap;\n\n\t\tif ( this[ 0 ] ) {\n\t\t\tif ( jQuery.isFunction( html ) ) {\n\t\t\t\thtml = html.call( this[ 0 ] );\n\t\t\t}\n\n\t\t\t// The elements to wrap the target around\n\t\t\twrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );\n\n\t\t\tif ( this[ 0 ].parentNode ) {\n\t\t\t\twrap.insertBefore( this[ 0 ] );\n\t\t\t}\n\n\t\t\twrap.map( function() {\n\t\t\t\tvar elem = this;\n\n\t\t\t\twhile ( elem.firstElementChild ) {\n\t\t\t\t\telem = elem.firstElementChild;\n\t\t\t\t}\n\n\t\t\t\treturn elem;\n\t\t\t} ).append( this );\n\t\t}\n\n\t\treturn this;\n\t},\n\n\twrapInner: function( html ) {\n\t\tif ( jQuery.isFunction( html ) ) {\n\t\t\treturn this.each( function( i ) {\n\t\t\t\tjQuery( this ).wrapInner( html.call( this, i ) );\n\t\t\t} );\n\t\t}\n\n\t\treturn this.each( function() {\n\t\t\tvar self = jQuery( this ),\n\t\t\t\tcontents = self.contents();\n\n\t\t\tif ( contents.length ) {\n\t\t\t\tcontents.wrapAll( html );\n\n\t\t\t} else {\n\t\t\t\tself.append( html );\n\t\t\t}\n\t\t} );\n\t},\n\n\twrap: function( html ) {\n\t\tvar isFunction = jQuery.isFunction( html );\n\n\t\treturn this.each( function( i ) {\n\t\t\tjQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );\n\t\t} );\n\t},\n\n\tunwrap: function( selector ) {\n\t\tthis.parent( selector ).not( \"body\" ).each( function() {\n\t\t\tjQuery( this ).replaceWith( this.childNodes );\n\t\t} );\n\t\treturn this;\n\t}\n} );\n\n\njQuery.expr.pseudos.hidden = function( elem ) {\n\treturn !jQuery.expr.pseudos.visible( elem );\n};\njQuery.expr.pseudos.visible = function( elem ) {\n\treturn !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );\n};\n\n\n\n\njQuery.ajaxSettings.xhr = function() {\n\ttry {\n\t\treturn new window.XMLHttpRequest();\n\t} catch ( e ) {}\n};\n\nvar xhrSuccessStatus = {\n\n\t\t// File protocol always yields status code 0, assume 200\n\t\t0: 200,\n\n\t\t// Support: IE <=9 only\n\t\t// #1450: sometimes IE returns 1223 when it should be 204\n\t\t1223: 204\n\t},\n\txhrSupported = jQuery.ajaxSettings.xhr();\n\nsupport.cors = !!xhrSupported && ( \"withCredentials\" in xhrSupported );\nsupport.ajax = xhrSupported = !!xhrSupported;\n\njQuery.ajaxTransport( function( options ) {\n\tvar callback, errorCallback;\n\n\t// Cross domain only allowed if supported through XMLHttpRequest\n\tif ( support.cors || xhrSupported && !options.crossDomain ) {\n\t\treturn {\n\t\t\tsend: function( headers, complete ) {\n\t\t\t\tvar i,\n\t\t\t\t\txhr = options.xhr();\n\n\t\t\t\txhr.open(\n\t\t\t\t\toptions.type,\n\t\t\t\t\toptions.url,\n\t\t\t\t\toptions.async,\n\t\t\t\t\toptions.username,\n\t\t\t\t\toptions.password\n\t\t\t\t);\n\n\t\t\t\t// Apply custom fields if provided\n\t\t\t\tif ( options.xhrFields ) {\n\t\t\t\t\tfor ( i in options.xhrFields ) {\n\t\t\t\t\t\txhr[ i ] = options.xhrFields[ i ];\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// Override mime type if needed\n\t\t\t\tif ( options.mimeType && xhr.overrideMimeType ) {\n\t\t\t\t\txhr.overrideMimeType( options.mimeType );\n\t\t\t\t}\n\n\t\t\t\t// X-Requested-With header\n\t\t\t\t// For cross-domain requests, seeing as conditions for a preflight are\n\t\t\t\t// akin to a jigsaw puzzle, we simply never set it to be sure.\n\t\t\t\t// (it can always be set on a per-request basis or even using ajaxSetup)\n\t\t\t\t// For same-domain requests, won't change header if already provided.\n\t\t\t\tif ( !options.crossDomain && !headers[ \"X-Requested-With\" ] ) {\n\t\t\t\t\theaders[ \"X-Requested-With\" ] = \"XMLHttpRequest\";\n\t\t\t\t}\n\n\t\t\t\t// Set headers\n\t\t\t\tfor ( i in headers ) {\n\t\t\t\t\txhr.setRequestHeader( i, headers[ i ] );\n\t\t\t\t}\n\n\t\t\t\t// Callback\n\t\t\t\tcallback = function( type ) {\n\t\t\t\t\treturn function() {\n\t\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\t\tcallback = errorCallback = xhr.onload =\n\t\t\t\t\t\t\t\txhr.onerror = xhr.onabort = xhr.onreadystatechange = null;\n\n\t\t\t\t\t\t\tif ( type === \"abort\" ) {\n\t\t\t\t\t\t\t\txhr.abort();\n\t\t\t\t\t\t\t} else if ( type === \"error\" ) {\n\n\t\t\t\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t\t\t\t// On a manual native abort, IE9 throws\n\t\t\t\t\t\t\t\t// errors on any property access that is not readyState\n\t\t\t\t\t\t\t\tif ( typeof xhr.status !== \"number\" ) {\n\t\t\t\t\t\t\t\t\tcomplete( 0, \"error\" );\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\tcomplete(\n\n\t\t\t\t\t\t\t\t\t\t// File: protocol always yields status 0; see #8605, #14207\n\t\t\t\t\t\t\t\t\t\txhr.status,\n\t\t\t\t\t\t\t\t\t\txhr.statusText\n\t\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tcomplete(\n\t\t\t\t\t\t\t\t\txhrSuccessStatus[ xhr.status ] || xhr.status,\n\t\t\t\t\t\t\t\t\txhr.statusText,\n\n\t\t\t\t\t\t\t\t\t// Support: IE <=9 only\n\t\t\t\t\t\t\t\t\t// IE9 has no XHR2 but throws on binary (trac-11426)\n\t\t\t\t\t\t\t\t\t// For XHR2 non-text, let the caller handle it (gh-2498)\n\t\t\t\t\t\t\t\t\t( xhr.responseType || \"text\" ) !== \"text\"  ||\n\t\t\t\t\t\t\t\t\ttypeof xhr.responseText !== \"string\" ?\n\t\t\t\t\t\t\t\t\t\t{ binary: xhr.response } :\n\t\t\t\t\t\t\t\t\t\t{ text: xhr.responseText },\n\t\t\t\t\t\t\t\t\txhr.getAllResponseHeaders()\n\t\t\t\t\t\t\t\t);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t};\n\n\t\t\t\t// Listen to events\n\t\t\t\txhr.onload = callback();\n\t\t\t\terrorCallback = xhr.onerror = callback( \"error\" );\n\n\t\t\t\t// Support: IE 9 only\n\t\t\t\t// Use onreadystatechange to replace onabort\n\t\t\t\t// to handle uncaught aborts\n\t\t\t\tif ( xhr.onabort !== undefined ) {\n\t\t\t\t\txhr.onabort = errorCallback;\n\t\t\t\t} else {\n\t\t\t\t\txhr.onreadystatechange = function() {\n\n\t\t\t\t\t\t// Check readyState before timeout as it changes\n\t\t\t\t\t\tif ( xhr.readyState === 4 ) {\n\n\t\t\t\t\t\t\t// Allow onerror to be called first,\n\t\t\t\t\t\t\t// but that will not handle a native abort\n\t\t\t\t\t\t\t// Also, save errorCallback to a variable\n\t\t\t\t\t\t\t// as xhr.onerror cannot be accessed\n\t\t\t\t\t\t\twindow.setTimeout( function() {\n\t\t\t\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\t\t\t\terrorCallback();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} );\n\t\t\t\t\t\t}\n\t\t\t\t\t};\n\t\t\t\t}\n\n\t\t\t\t// Create the abort callback\n\t\t\t\tcallback = callback( \"abort\" );\n\n\t\t\t\ttry {\n\n\t\t\t\t\t// Do send the request (this may raise an exception)\n\t\t\t\t\txhr.send( options.hasContent && options.data || null );\n\t\t\t\t} catch ( e ) {\n\n\t\t\t\t\t// #14683: Only rethrow if this hasn't been notified as an error yet\n\t\t\t\t\tif ( callback ) {\n\t\t\t\t\t\tthrow e;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t},\n\n\t\t\tabort: function() {\n\t\t\t\tif ( callback ) {\n\t\t\t\t\tcallback();\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n} );\n\n\n\n\n// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)\njQuery.ajaxPrefilter( function( s ) {\n\tif ( s.crossDomain ) {\n\t\ts.contents.script = false;\n\t}\n} );\n\n// Install script dataType\njQuery.ajaxSetup( {\n\taccepts: {\n\t\tscript: \"text/javascript, application/javascript, \" +\n\t\t\t\"application/ecmascript, application/x-ecmascript\"\n\t},\n\tcontents: {\n\t\tscript: /\\b(?:java|ecma)script\\b/\n\t},\n\tconverters: {\n\t\t\"text script\": function( text ) {\n\t\t\tjQuery.globalEval( text );\n\t\t\treturn text;\n\t\t}\n\t}\n} );\n\n// Handle cache's special case and crossDomain\njQuery.ajaxPrefilter( \"script\", function( s ) {\n\tif ( s.cache === undefined ) {\n\t\ts.cache = false;\n\t}\n\tif ( s.crossDomain ) {\n\t\ts.type = \"GET\";\n\t}\n} );\n\n// Bind script tag hack transport\njQuery.ajaxTransport( \"script\", function( s ) {\n\n\t// This transport only deals with cross domain requests\n\tif ( s.crossDomain ) {\n\t\tvar script, callback;\n\t\treturn {\n\t\t\tsend: function( _, complete ) {\n\t\t\t\tscript = jQuery( \"<script>\" ).prop( {\n\t\t\t\t\tcharset: s.scriptCharset,\n\t\t\t\t\tsrc: s.url\n\t\t\t\t} ).on(\n\t\t\t\t\t\"load error\",\n\t\t\t\t\tcallback = function( evt ) {\n\t\t\t\t\t\tscript.remove();\n\t\t\t\t\t\tcallback = null;\n\t\t\t\t\t\tif ( evt ) {\n\t\t\t\t\t\t\tcomplete( evt.type === \"error\" ? 404 : 200, evt.type );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t);\n\n\t\t\t\t// Use native DOM manipulation to avoid our domManip AJAX trickery\n\t\t\t\tdocument.head.appendChild( script[ 0 ] );\n\t\t\t},\n\t\t\tabort: function() {\n\t\t\t\tif ( callback ) {\n\t\t\t\t\tcallback();\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\t}\n} );\n\n\n\n\nvar oldCallbacks = [],\n\trjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\n// Default jsonp settings\njQuery.ajaxSetup( {\n\tjsonp: \"callback\",\n\tjsonpCallback: function() {\n\t\tvar callback = oldCallbacks.pop() || ( jQuery.expando + \"_\" + ( nonce++ ) );\n\t\tthis[ callback ] = true;\n\t\treturn callback;\n\t}\n} );\n\n// Detect, normalize options and install callbacks for jsonp requests\njQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {\n\n\tvar callbackName, overwritten, responseContainer,\n\t\tjsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?\n\t\t\t\"url\" :\n\t\t\ttypeof s.data === \"string\" &&\n\t\t\t\t( s.contentType || \"\" )\n\t\t\t\t\t.indexOf( \"application/x-www-form-urlencoded\" ) === 0 &&\n\t\t\t\trjsonp.test( s.data ) && \"data\"\n\t\t);\n\n\t// Handle iff the expected data type is \"jsonp\" or we have a parameter to set\n\tif ( jsonProp || s.dataTypes[ 0 ] === \"jsonp\" ) {\n\n\t\t// Get callback name, remembering preexisting value associated with it\n\t\tcallbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?\n\t\t\ts.jsonpCallback() :\n\t\t\ts.jsonpCallback;\n\n\t\t// Insert callback into url or form data\n\t\tif ( jsonProp ) {\n\t\t\ts[ jsonProp ] = s[ jsonProp ].replace( rjsonp, \"$1\" + callbackName );\n\t\t} else if ( s.jsonp !== false ) {\n\t\t\ts.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.jsonp + \"=\" + callbackName;\n\t\t}\n\n\t\t// Use data converter to retrieve json after script execution\n\t\ts.converters[ \"script json\" ] = function() {\n\t\t\tif ( !responseContainer ) {\n\t\t\t\tjQuery.error( callbackName + \" was not called\" );\n\t\t\t}\n\t\t\treturn responseContainer[ 0 ];\n\t\t};\n\n\t\t// Force json dataType\n\t\ts.dataTypes[ 0 ] = \"json\";\n\n\t\t// Install callback\n\t\toverwritten = window[ callbackName ];\n\t\twindow[ callbackName ] = function() {\n\t\t\tresponseContainer = arguments;\n\t\t};\n\n\t\t// Clean-up function (fires after converters)\n\t\tjqXHR.always( function() {\n\n\t\t\t// If previous value didn't exist - remove it\n\t\t\tif ( overwritten === undefined ) {\n\t\t\t\tjQuery( window ).removeProp( callbackName );\n\n\t\t\t// Otherwise restore preexisting value\n\t\t\t} else {\n\t\t\t\twindow[ callbackName ] = overwritten;\n\t\t\t}\n\n\t\t\t// Save back as free\n\t\t\tif ( s[ callbackName ] ) {\n\n\t\t\t\t// Make sure that re-using the options doesn't screw things around\n\t\t\t\ts.jsonpCallback = originalSettings.jsonpCallback;\n\n\t\t\t\t// Save the callback name for future use\n\t\t\t\toldCallbacks.push( callbackName );\n\t\t\t}\n\n\t\t\t// Call if it was a function and we have a response\n\t\t\tif ( responseContainer && jQuery.isFunction( overwritten ) ) {\n\t\t\t\toverwritten( responseContainer[ 0 ] );\n\t\t\t}\n\n\t\t\tresponseContainer = overwritten = undefined;\n\t\t} );\n\n\t\t// Delegate to script\n\t\treturn \"script\";\n\t}\n} );\n\n\n\n\n// Support: Safari 8 only\n// In Safari 8 documents created via document.implementation.createHTMLDocument\n// collapse sibling forms: the second one becomes a child of the first one.\n// Because of that, this security measure has to be disabled in Safari 8.\n// https://bugs.webkit.org/show_bug.cgi?id=137337\nsupport.createHTMLDocument = ( function() {\n\tvar body = document.implementation.createHTMLDocument( \"\" ).body;\n\tbody.innerHTML = \"<form></form><form></form>\";\n\treturn body.childNodes.length === 2;\n} )();\n\n\n// Argument \"data\" should be string of html\n// context (optional): If specified, the fragment will be created in this context,\n// defaults to document\n// keepScripts (optional): If true, will include scripts passed in the html string\njQuery.parseHTML = function( data, context, keepScripts ) {\n\tif ( typeof data !== \"string\" ) {\n\t\treturn [];\n\t}\n\tif ( typeof context === \"boolean\" ) {\n\t\tkeepScripts = context;\n\t\tcontext = false;\n\t}\n\n\tvar base, parsed, scripts;\n\n\tif ( !context ) {\n\n\t\t// Stop scripts or inline event handlers from being executed immediately\n\t\t// by using document.implementation\n\t\tif ( support.createHTMLDocument ) {\n\t\t\tcontext = document.implementation.createHTMLDocument( \"\" );\n\n\t\t\t// Set the base href for the created document\n\t\t\t// so any parsed elements with URLs\n\t\t\t// are based on the document's URL (gh-2965)\n\t\t\tbase = context.createElement( \"base\" );\n\t\t\tbase.href = document.location.href;\n\t\t\tcontext.head.appendChild( base );\n\t\t} else {\n\t\t\tcontext = document;\n\t\t}\n\t}\n\n\tparsed = rsingleTag.exec( data );\n\tscripts = !keepScripts && [];\n\n\t// Single tag\n\tif ( parsed ) {\n\t\treturn [ context.createElement( parsed[ 1 ] ) ];\n\t}\n\n\tparsed = buildFragment( [ data ], context, scripts );\n\n\tif ( scripts && scripts.length ) {\n\t\tjQuery( scripts ).remove();\n\t}\n\n\treturn jQuery.merge( [], parsed.childNodes );\n};\n\n\n/**\n * Load a url into a page\n */\njQuery.fn.load = function( url, params, callback ) {\n\tvar selector, type, response,\n\t\tself = this,\n\t\toff = url.indexOf( \" \" );\n\n\tif ( off > -1 ) {\n\t\tselector = stripAndCollapse( url.slice( off ) );\n\t\turl = url.slice( 0, off );\n\t}\n\n\t// If it's a function\n\tif ( jQuery.isFunction( params ) ) {\n\n\t\t// We assume that it's the callback\n\t\tcallback = params;\n\t\tparams = undefined;\n\n\t// Otherwise, build a param string\n\t} else if ( params && typeof params === \"object\" ) {\n\t\ttype = \"POST\";\n\t}\n\n\t// If we have elements to modify, make the request\n\tif ( self.length > 0 ) {\n\t\tjQuery.ajax( {\n\t\t\turl: url,\n\n\t\t\t// If \"type\" variable is undefined, then \"GET\" method will be used.\n\t\t\t// Make value of this field explicit since\n\t\t\t// user can override it through ajaxSetup method\n\t\t\ttype: type || \"GET\",\n\t\t\tdataType: \"html\",\n\t\t\tdata: params\n\t\t} ).done( function( responseText ) {\n\n\t\t\t// Save response for use in complete callback\n\t\t\tresponse = arguments;\n\n\t\t\tself.html( selector ?\n\n\t\t\t\t// If a selector was specified, locate the right elements in a dummy div\n\t\t\t\t// Exclude scripts to avoid IE 'Permission Denied' errors\n\t\t\t\tjQuery( \"<div>\" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :\n\n\t\t\t\t// Otherwise use the full result\n\t\t\t\tresponseText );\n\n\t\t// If the request succeeds, this function gets \"data\", \"status\", \"jqXHR\"\n\t\t// but they are ignored because response was set above.\n\t\t// If it fails, this function gets \"jqXHR\", \"status\", \"error\"\n\t\t} ).always( callback && function( jqXHR, status ) {\n\t\t\tself.each( function() {\n\t\t\t\tcallback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );\n\t\t\t} );\n\t\t} );\n\t}\n\n\treturn this;\n};\n\n\n\n\n// Attach a bunch of functions for handling common AJAX events\njQuery.each( [\n\t\"ajaxStart\",\n\t\"ajaxStop\",\n\t\"ajaxComplete\",\n\t\"ajaxError\",\n\t\"ajaxSuccess\",\n\t\"ajaxSend\"\n], function( i, type ) {\n\tjQuery.fn[ type ] = function( fn ) {\n\t\treturn this.on( type, fn );\n\t};\n} );\n\n\n\n\njQuery.expr.pseudos.animated = function( elem ) {\n\treturn jQuery.grep( jQuery.timers, function( fn ) {\n\t\treturn elem === fn.elem;\n\t} ).length;\n};\n\n\n\n\njQuery.offset = {\n\tsetOffset: function( elem, options, i ) {\n\t\tvar curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,\n\t\t\tposition = jQuery.css( elem, \"position\" ),\n\t\t\tcurElem = jQuery( elem ),\n\t\t\tprops = {};\n\n\t\t// Set position first, in-case top/left are set even on static elem\n\t\tif ( position === \"static\" ) {\n\t\t\telem.style.position = \"relative\";\n\t\t}\n\n\t\tcurOffset = curElem.offset();\n\t\tcurCSSTop = jQuery.css( elem, \"top\" );\n\t\tcurCSSLeft = jQuery.css( elem, \"left\" );\n\t\tcalculatePosition = ( position === \"absolute\" || position === \"fixed\" ) &&\n\t\t\t( curCSSTop + curCSSLeft ).indexOf( \"auto\" ) > -1;\n\n\t\t// Need to be able to calculate position if either\n\t\t// top or left is auto and position is either absolute or fixed\n\t\tif ( calculatePosition ) {\n\t\t\tcurPosition = curElem.position();\n\t\t\tcurTop = curPosition.top;\n\t\t\tcurLeft = curPosition.left;\n\n\t\t} else {\n\t\t\tcurTop = parseFloat( curCSSTop ) || 0;\n\t\t\tcurLeft = parseFloat( curCSSLeft ) || 0;\n\t\t}\n\n\t\tif ( jQuery.isFunction( options ) ) {\n\n\t\t\t// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)\n\t\t\toptions = options.call( elem, i, jQuery.extend( {}, curOffset ) );\n\t\t}\n\n\t\tif ( options.top != null ) {\n\t\t\tprops.top = ( options.top - curOffset.top ) + curTop;\n\t\t}\n\t\tif ( options.left != null ) {\n\t\t\tprops.left = ( options.left - curOffset.left ) + curLeft;\n\t\t}\n\n\t\tif ( \"using\" in options ) {\n\t\t\toptions.using.call( elem, props );\n\n\t\t} else {\n\t\t\tcurElem.css( props );\n\t\t}\n\t}\n};\n\njQuery.fn.extend( {\n\toffset: function( options ) {\n\n\t\t// Preserve chaining for setter\n\t\tif ( arguments.length ) {\n\t\t\treturn options === undefined ?\n\t\t\t\tthis :\n\t\t\t\tthis.each( function( i ) {\n\t\t\t\t\tjQuery.offset.setOffset( this, options, i );\n\t\t\t\t} );\n\t\t}\n\n\t\tvar doc, docElem, rect, win,\n\t\t\telem = this[ 0 ];\n\n\t\tif ( !elem ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Return zeros for disconnected and hidden (display: none) elements (gh-2310)\n\t\t// Support: IE <=11 only\n\t\t// Running getBoundingClientRect on a\n\t\t// disconnected node in IE throws an error\n\t\tif ( !elem.getClientRects().length ) {\n\t\t\treturn { top: 0, left: 0 };\n\t\t}\n\n\t\trect = elem.getBoundingClientRect();\n\n\t\tdoc = elem.ownerDocument;\n\t\tdocElem = doc.documentElement;\n\t\twin = doc.defaultView;\n\n\t\treturn {\n\t\t\ttop: rect.top + win.pageYOffset - docElem.clientTop,\n\t\t\tleft: rect.left + win.pageXOffset - docElem.clientLeft\n\t\t};\n\t},\n\n\tposition: function() {\n\t\tif ( !this[ 0 ] ) {\n\t\t\treturn;\n\t\t}\n\n\t\tvar offsetParent, offset,\n\t\t\telem = this[ 0 ],\n\t\t\tparentOffset = { top: 0, left: 0 };\n\n\t\t// Fixed elements are offset from window (parentOffset = {top:0, left: 0},\n\t\t// because it is its only offset parent\n\t\tif ( jQuery.css( elem, \"position\" ) === \"fixed\" ) {\n\n\t\t\t// Assume getBoundingClientRect is there when computed position is fixed\n\t\t\toffset = elem.getBoundingClientRect();\n\n\t\t} else {\n\n\t\t\t// Get *real* offsetParent\n\t\t\toffsetParent = this.offsetParent();\n\n\t\t\t// Get correct offsets\n\t\t\toffset = this.offset();\n\t\t\tif ( !nodeName( offsetParent[ 0 ], \"html\" ) ) {\n\t\t\t\tparentOffset = offsetParent.offset();\n\t\t\t}\n\n\t\t\t// Add offsetParent borders\n\t\t\tparentOffset = {\n\t\t\t\ttop: parentOffset.top + jQuery.css( offsetParent[ 0 ], \"borderTopWidth\", true ),\n\t\t\t\tleft: parentOffset.left + jQuery.css( offsetParent[ 0 ], \"borderLeftWidth\", true )\n\t\t\t};\n\t\t}\n\n\t\t// Subtract parent offsets and element margins\n\t\treturn {\n\t\t\ttop: offset.top - parentOffset.top - jQuery.css( elem, \"marginTop\", true ),\n\t\t\tleft: offset.left - parentOffset.left - jQuery.css( elem, \"marginLeft\", true )\n\t\t};\n\t},\n\n\t// This method will return documentElement in the following cases:\n\t// 1) For the element inside the iframe without offsetParent, this method will return\n\t//    documentElement of the parent window\n\t// 2) For the hidden or detached element\n\t// 3) For body or html element, i.e. in case of the html node - it will return itself\n\t//\n\t// but those exceptions were never presented as a real life use-cases\n\t// and might be considered as more preferable results.\n\t//\n\t// This logic, however, is not guaranteed and can change at any point in the future\n\toffsetParent: function() {\n\t\treturn this.map( function() {\n\t\t\tvar offsetParent = this.offsetParent;\n\n\t\t\twhile ( offsetParent && jQuery.css( offsetParent, \"position\" ) === \"static\" ) {\n\t\t\t\toffsetParent = offsetParent.offsetParent;\n\t\t\t}\n\n\t\t\treturn offsetParent || documentElement;\n\t\t} );\n\t}\n} );\n\n// Create scrollLeft and scrollTop methods\njQuery.each( { scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function( method, prop ) {\n\tvar top = \"pageYOffset\" === prop;\n\n\tjQuery.fn[ method ] = function( val ) {\n\t\treturn access( this, function( elem, method, val ) {\n\n\t\t\t// Coalesce documents and windows\n\t\t\tvar win;\n\t\t\tif ( jQuery.isWindow( elem ) ) {\n\t\t\t\twin = elem;\n\t\t\t} else if ( elem.nodeType === 9 ) {\n\t\t\t\twin = elem.defaultView;\n\t\t\t}\n\n\t\t\tif ( val === undefined ) {\n\t\t\t\treturn win ? win[ prop ] : elem[ method ];\n\t\t\t}\n\n\t\t\tif ( win ) {\n\t\t\t\twin.scrollTo(\n\t\t\t\t\t!top ? val : win.pageXOffset,\n\t\t\t\t\ttop ? val : win.pageYOffset\n\t\t\t\t);\n\n\t\t\t} else {\n\t\t\t\telem[ method ] = val;\n\t\t\t}\n\t\t}, method, val, arguments.length );\n\t};\n} );\n\n// Support: Safari <=7 - 9.1, Chrome <=37 - 49\n// Add the top/left cssHooks using jQuery.fn.position\n// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347\n// getComputedStyle returns percent when specified for top/left/bottom/right;\n// rather than make the css module depend on the offset module, just check for it here\njQuery.each( [ \"top\", \"left\" ], function( i, prop ) {\n\tjQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,\n\t\tfunction( elem, computed ) {\n\t\t\tif ( computed ) {\n\t\t\t\tcomputed = curCSS( elem, prop );\n\n\t\t\t\t// If curCSS returns percentage, fallback to offset\n\t\t\t\treturn rnumnonpx.test( computed ) ?\n\t\t\t\t\tjQuery( elem ).position()[ prop ] + \"px\" :\n\t\t\t\t\tcomputed;\n\t\t\t}\n\t\t}\n\t);\n} );\n\n\n// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\njQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {\n\tjQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name },\n\t\tfunction( defaultExtra, funcName ) {\n\n\t\t// Margin is only for outerHeight, outerWidth\n\t\tjQuery.fn[ funcName ] = function( margin, value ) {\n\t\t\tvar chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),\n\t\t\t\textra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );\n\n\t\t\treturn access( this, function( elem, type, value ) {\n\t\t\t\tvar doc;\n\n\t\t\t\tif ( jQuery.isWindow( elem ) ) {\n\n\t\t\t\t\t// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)\n\t\t\t\t\treturn funcName.indexOf( \"outer\" ) === 0 ?\n\t\t\t\t\t\telem[ \"inner\" + name ] :\n\t\t\t\t\t\telem.document.documentElement[ \"client\" + name ];\n\t\t\t\t}\n\n\t\t\t\t// Get document width or height\n\t\t\t\tif ( elem.nodeType === 9 ) {\n\t\t\t\t\tdoc = elem.documentElement;\n\n\t\t\t\t\t// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],\n\t\t\t\t\t// whichever is greatest\n\t\t\t\t\treturn Math.max(\n\t\t\t\t\t\telem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],\n\t\t\t\t\t\telem.body[ \"offset\" + name ], doc[ \"offset\" + name ],\n\t\t\t\t\t\tdoc[ \"client\" + name ]\n\t\t\t\t\t);\n\t\t\t\t}\n\n\t\t\t\treturn value === undefined ?\n\n\t\t\t\t\t// Get width or height on the element, requesting but not forcing parseFloat\n\t\t\t\t\tjQuery.css( elem, type, extra ) :\n\n\t\t\t\t\t// Set width or height on the element\n\t\t\t\t\tjQuery.style( elem, type, value, extra );\n\t\t\t}, type, chainable ? margin : undefined, chainable );\n\t\t};\n\t} );\n} );\n\n\njQuery.fn.extend( {\n\n\tbind: function( types, data, fn ) {\n\t\treturn this.on( types, null, data, fn );\n\t},\n\tunbind: function( types, fn ) {\n\t\treturn this.off( types, null, fn );\n\t},\n\n\tdelegate: function( selector, types, data, fn ) {\n\t\treturn this.on( types, selector, data, fn );\n\t},\n\tundelegate: function( selector, types, fn ) {\n\n\t\t// ( namespace ) or ( selector, types [, fn] )\n\t\treturn arguments.length === 1 ?\n\t\t\tthis.off( selector, \"**\" ) :\n\t\t\tthis.off( types, selector || \"**\", fn );\n\t}\n} );\n\njQuery.holdReady = function( hold ) {\n\tif ( hold ) {\n\t\tjQuery.readyWait++;\n\t} else {\n\t\tjQuery.ready( true );\n\t}\n};\njQuery.isArray = Array.isArray;\njQuery.parseJSON = JSON.parse;\njQuery.nodeName = nodeName;\n\n\n\n\n// Register as a named AMD module, since jQuery can be concatenated with other\n// files that may use define, but not via a proper concatenation script that\n// understands anonymous AMD modules. A named AMD is safest and most robust\n// way to register. Lowercase jquery is used because AMD module names are\n// derived from file names, and jQuery is normally delivered in a lowercase\n// file name. Do this after creating the global so that if an AMD module wants\n// to call noConflict to hide this version of jQuery, it will work.\n\n// Note that for maximum portability, libraries that are not jQuery should\n// declare themselves as anonymous modules, and avoid setting a global if an\n// AMD loader is present. jQuery is a special case. For more information, see\n// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\nif ( typeof define === \"function\" && define.amd ) {\n\tdefine( \"jquery\", [], function() {\n\t\treturn jQuery;\n\t} );\n}\n\n\n\n\nvar\n\n\t// Map over jQuery in case of overwrite\n\t_jQuery = window.jQuery,\n\n\t// Map over the $ in case of overwrite\n\t_$ = window.$;\n\njQuery.noConflict = function( deep ) {\n\tif ( window.$ === jQuery ) {\n\t\twindow.$ = _$;\n\t}\n\n\tif ( deep && window.jQuery === jQuery ) {\n\t\twindow.jQuery = _jQuery;\n\t}\n\n\treturn jQuery;\n};\n\n// Expose jQuery and $ identifiers, even in AMD\n// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n// and CommonJS for browser emulators (#13566)\nif ( !noGlobal ) {\n\twindow.jQuery = window.$ = jQuery;\n}\n\n\n\n\nreturn jQuery;\n} );\n"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42)(__webpack_require__(41))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    var opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    var target = document.getElementById('foo')
    var spinner = new Spinner(opts).spin(target)
 */
;(function (root, factory) {

  /* CommonJS */
  if (typeof module == 'object' && module.exports) module.exports = factory()

  /* AMD module */
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

  /* Browser global */
  else root.Spinner = factory()
}(this, function () {
  "use strict"

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */
    , sheet /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl (tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for (n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins (parent /* child1, child2, ...*/) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i])
    }

    return parent
  }

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation (alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor (el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    if (s[prop] !== undefined) return prop
    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i]+prop
      if (s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css (el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n]
    }

    return el
  }

  /**
   * Fills in default values.
   */
  function merge (obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n]
      }
    }
    return obj
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor (color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12             // The number of lines to draw
  , length: 7             // The length of each line
  , width: 5              // The line thickness
  , radius: 10            // The radius of the inner circle
  , scale: 1.0            // Scales overall size of the spinner
  , corners: 1            // Roundness (0..1)
  , color: '#000'         // #rgb or #rrggbb
  , opacity: 1/4          // Opacity of the lines
  , rotate: 0             // Rotation offset
  , direction: 1          // 1: clockwise, -1: counterclockwise
  , speed: 1              // Rounds per second
  , trail: 100            // Afterglow percentage
  , fps: 20               // Frames per second when using setTimeout()
  , zIndex: 2e9           // Use a high z-index by default
  , className: 'spinner'  // CSS class to assign to the element
  , top: '50%'            // center vertically
  , left: '50%'           // center horizontally
  , shadow: false         // Whether to render a shadow
  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
  , position: 'absolute'  // Element positioning
  }

  /** The constructor */
  function Spinner (o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function (target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = createEl(null, {className: o.className})

      css(el, {
        position: o.position
      , width: 0
      , zIndex: o.zIndex
      , left: o.left
      , top: o.top
      })

      if (target) {
        target.insertBefore(el, target.firstChild || null)
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps / o.speed
          , ostep = (1 - o.opacity) / (f * o.trail / 100)
          , astep = f / o.lines

        ;(function anim () {
          i++
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps))
        })()
      }
      return self
    }

    /**
     * Stops and removes the Spinner.
     */
  , stop: function () {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    }

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
  , lines: function (el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill (color, shadow) {
        return css(createEl(), {
          position: 'absolute'
        , width: o.scale * (o.length + o.width) + 'px'
        , height: o.scale * o.width + 'px'
        , background: color
        , boxShadow: shadow
        , transformOrigin: 'left'
        , transform: 'rotate(' + ~~(360/o.lines*i + o.rotate) + 'deg) translate(' + o.scale*o.radius + 'px' + ',0)'
        , borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute'
        , top: 1 + ~(o.scale * o.width / 2) + 'px'
        , transform: o.hwaccel ? 'translate3d(0,0,0)' : ''
        , opacity: o.opacity
        , animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {top: '2px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    }

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
  , opacity: function (el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML () {

    /* Utility function to create a VML tag */
    function vml (tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width)
        , s = o.scale * 2 * r

      function grp () {
        return css(
          vml('group', {
            coordsize: s + ' ' + s
          , coordorigin: -r + ' ' + -r
          })
        , { width: s, height: s }
        )
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg (i, dx, filter) {
        ins(
          g
        , ins(
            css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx})
          , ins(
              css(
                vml('roundrect', {arcsize: o.corners})
              , { width: r
                , height: o.scale * o.width
                , left: o.scale * o.radius
                , top: -o.scale * o.width >> 1
                , filter: filter
                }
              )
            , vml('fill', {color: getColor(o.color, i), opacity: o.opacity})
            , vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++) {
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')
        }

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i + o < c.childNodes.length) {
        c = c.childNodes[i + o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  if (typeof document !== 'undefined') {
    sheet = (function () {
      var el = createEl('style', {type : 'text/css'})
      ins(document.getElementsByTagName('head')[0], el)
      return el.sheet || el.styleSheet
    }())

    var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

    if (!vendor(probe, 'transform') && probe.adj) initVML()
    else useCssAnimations = vendor(probe, 'animation')
  }

  return Spinner

}));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v4.3.1
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("whatInput", [], factory);
	else if(typeof exports === 'object')
		exports["whatInput"] = factory();
	else
		root["whatInput"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  /*
	   * variables
	   */

	  // last used input type
	  var currentInput = 'initial';

	  // last used input intent
	  var currentIntent = null;

	  // cache document.documentElement
	  var doc = document.documentElement;

	  // form input types
	  var formInputs = ['input', 'select', 'textarea'];

	  var functionList = [];

	  // list of modifier keys commonly used with the mouse and
	  // can be safely ignored to prevent false keyboard detection
	  var ignoreMap = [16, // shift
	  17, // control
	  18, // alt
	  91, // Windows key / left Apple cmd
	  93 // Windows menu / right Apple cmd
	  ];

	  // list of keys for which we change intent even for form inputs
	  var changeIntentMap = [9 // tab
	  ];

	  // mapping of events to input types
	  var inputMap = {
	    keydown: 'keyboard',
	    keyup: 'keyboard',
	    mousedown: 'mouse',
	    mousemove: 'mouse',
	    MSPointerDown: 'pointer',
	    MSPointerMove: 'pointer',
	    pointerdown: 'pointer',
	    pointermove: 'pointer',
	    touchstart: 'touch'
	  };

	  // array of all used input types
	  var inputTypes = [];

	  // boolean: true if touch buffer is active
	  var isBuffering = false;

	  // boolean: true if the page is being scrolled
	  var isScrolling = false;

	  // store current mouse position
	  var mousePos = {
	    x: null,
	    y: null
	  };

	  // map of IE 10 pointer events
	  var pointerMap = {
	    2: 'touch',
	    3: 'touch', // treat pen like touch
	    4: 'mouse'
	  };

	  var supportsPassive = false;

	  try {
	    var opts = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        supportsPassive = true;
	      }
	    });

	    window.addEventListener('test', null, opts);
	  } catch (e) {}

	  /*
	   * set up
	   */

	  var setUp = function setUp() {
	    // add correct mouse wheel event mapping to `inputMap`
	    inputMap[detectWheel()] = 'mouse';

	    addListeners();
	    setInput();
	  };

	  /*
	   * events
	   */

	  var addListeners = function addListeners() {
	    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
	    // can only demonstrate potential, but not actual, interaction
	    // and are treated separately
	    var options = supportsPassive ? { passive: true } : false;

	    // pointer events (mouse, pen, touch)
	    if (window.PointerEvent) {
	      doc.addEventListener('pointerdown', updateInput);
	      doc.addEventListener('pointermove', setIntent);
	    } else if (window.MSPointerEvent) {
	      doc.addEventListener('MSPointerDown', updateInput);
	      doc.addEventListener('MSPointerMove', setIntent);
	    } else {
	      // mouse events
	      doc.addEventListener('mousedown', updateInput);
	      doc.addEventListener('mousemove', setIntent);

	      // touch events
	      if ('ontouchstart' in window) {
	        doc.addEventListener('touchstart', touchBuffer, options);
	        doc.addEventListener('touchend', touchBuffer);
	      }
	    }

	    // mouse wheel
	    doc.addEventListener(detectWheel(), setIntent, options);

	    // keyboard events
	    doc.addEventListener('keydown', updateInput);
	    doc.addEventListener('keyup', updateInput);
	  };

	  // checks conditions before updating new input
	  var updateInput = function updateInput(event) {
	    // only execute if the touch buffer timer isn't running
	    if (!isBuffering) {
	      var eventKey = event.which;
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentInput !== value || currentIntent !== value) {
	        var activeElem = document.activeElement;
	        var activeInput = false;
	        var notFormInput = activeElem && activeElem.nodeName && formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

	        if (notFormInput || changeIntentMap.indexOf(eventKey) !== -1) {
	          activeInput = true;
	        }

	        if (value === 'touch' ||
	        // ignore mouse modifier keys
	        value === 'mouse' ||
	        // don't switch if the current element is a form input
	        value === 'keyboard' && eventKey && activeInput && ignoreMap.indexOf(eventKey) === -1) {
	          // set the current and catch-all variable
	          currentInput = currentIntent = value;

	          setInput();
	        }
	      }
	    }
	  };

	  // updates the doc and `inputTypes` array with new input
	  var setInput = function setInput() {
	    doc.setAttribute('data-whatinput', currentInput);
	    doc.setAttribute('data-whatintent', currentInput);

	    if (inputTypes.indexOf(currentInput) === -1) {
	      inputTypes.push(currentInput);
	      doc.className += ' whatinput-types-' + currentInput;
	    }

	    fireFunctions('input');
	  };

	  // updates input intent for `mousemove` and `pointermove`
	  var setIntent = function setIntent(event) {
	    // test to see if `mousemove` happened relative to the screen
	    // to detect scrolling versus mousemove
	    if (mousePos['x'] !== event.screenX || mousePos['y'] !== event.screenY) {
	      isScrolling = false;

	      mousePos['x'] = event.screenX;
	      mousePos['y'] = event.screenY;
	    } else {
	      isScrolling = true;
	    }

	    // only execute if the touch buffer timer isn't running
	    // or scrolling isn't happening
	    if (!isBuffering && !isScrolling) {
	      var value = inputMap[event.type];
	      if (value === 'pointer') value = pointerType(event);

	      if (currentIntent !== value) {
	        currentIntent = value;

	        doc.setAttribute('data-whatintent', currentIntent);

	        fireFunctions('intent');
	      }
	    }
	  };

	  // buffers touch events because they frequently also fire mouse events
	  var touchBuffer = function touchBuffer(event) {
	    if (event.type === 'touchstart') {
	      isBuffering = false;

	      // set the current input
	      updateInput(event);
	    } else {
	      isBuffering = true;
	    }
	  };

	  var fireFunctions = function fireFunctions(type) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].type === type) {
	        functionList[i].fn.call(undefined, currentIntent);
	      }
	    }
	  };

	  /*
	   * utilities
	   */

	  var pointerType = function pointerType(event) {
	    if (typeof event.pointerType === 'number') {
	      return pointerMap[event.pointerType];
	    } else {
	      // treat pen like touch
	      return event.pointerType === 'pen' ? 'touch' : event.pointerType;
	    }
	  };

	  // detect version of mouse wheel event to use
	  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
	  var detectWheel = function detectWheel() {
	    var wheelType = void 0;

	    // Modern browsers support "wheel"
	    if ('onwheel' in document.createElement('div')) {
	      wheelType = 'wheel';
	    } else {
	      // Webkit and IE support at least "mousewheel"
	      // or assume that remaining browsers are older Firefox
	      wheelType = document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
	    }

	    return wheelType;
	  };

	  var objPos = function objPos(match) {
	    for (var i = 0, len = functionList.length; i < len; i++) {
	      if (functionList[i].fn === match) {
	        return i;
	      }
	    }
	  };

	  /*
	   * init
	   */

	  // don't start script unless browser cuts the mustard
	  // (also passes if polyfills are used)
	  if ('addEventListener' in window && Array.prototype.indexOf) {
	    setUp();
	  }

	  /*
	   * api
	   */

	  return {
	    // returns string: the current input type
	    // opt: 'loose'|'strict'
	    // 'strict' (default): returns the same value as the `data-whatinput` attribute
	    // 'loose': includes `data-whatintent` value if it's more current than `data-whatinput`
	    ask: function ask(opt) {
	      return opt === 'loose' ? currentIntent : currentInput;
	    },

	    // returns array: all the detected input types
	    types: function types() {
	      return inputTypes;
	    },

	    // overwrites ignored keys with provided array
	    ignoreKeys: function ignoreKeys(arr) {
	      ignoreMap = arr;
	    },

	    // attach functions to input and intent "events"
	    // funct: function to fire on change
	    // eventType: 'input'|'intent'
	    registerOnChange: function registerOnChange(fn, eventType) {
	      functionList.push({
	        fn: fn,
	        type: eventType || 'input'
	      });
	    },

	    unRegisterOnChange: function unRegisterOnChange(fn) {
	      var position = objPos(fn);

	      if (position) {
	        functionList.splice(position, 1);
	      }
	    }
	  };
	}();

/***/ }
/******/ ])
});
;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ })
/******/ ]);