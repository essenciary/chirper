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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:44444/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);

var WEBSOCKETS_SERVER = false;

if (WEBSOCKETS_SERVER) {
  __webpack_require__(1);
  Channels.load_channels();

  Channels.messageHandlers.push(function (event) {
    console.log(event.data);
  });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

window.Channels = {};
window.Channels.load_channels = function () {
  var socket = new WebSocket('ws://localhost:8000');
  var channels = window.Channels;

  channels.channel = socket;
  channels.sendMessageTo = sendMessageTo;

  channels.messageHandlers = [];
  channels.errorHandlers = [];
  channels.openHandlers = [];
  channels.closeHandlers = [];

  socket.addEventListener('open', function (event) {
    for (var i = 0; i < channels.openHandlers.length; i++) {
      var f = channels.openHandlers[i];
      if (typeof f === "function") {
        f(event);
      }
    }
  });

  socket.addEventListener('message', function (event) {
    for (var i = 0; i < channels.messageHandlers.length; i++) {
      var f = channels.messageHandlers[i];
      if (typeof f === "function") {
        f(event);
      }
    }
  });

  socket.addEventListener('error', function (event) {
    for (var i = 0; i < channels.errorHandlers.length; i++) {
      var f = channels.errorHandlers[i];
      if (typeof f === "function") {
        f(event);
      }
    }
  });

  socket.addEventListener('close', function (event) {
    for (var i = 0; i < channels.closeHandlers.length; i++) {
      var f = channels.closeHandlers[i];
      if (typeof f === "function") {
        f(event);
      }
    }
  });

  // A message maps to a channel route so that channel + message = /action/controller
  // The payload is the data made exposed in the Channel Controller
  function sendMessageTo() {
    var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (socket.readyState === 1) {

      socket.send(JSON.stringify({
        "channel": channel,
        "message": message,
        "payload": payload
      }));
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);