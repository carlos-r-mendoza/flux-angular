(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Cursor", {
  enumerable: true,
  get: function get() {
    return _cursor["default"];
  }
});
Object.defineProperty(exports, "MonkeyDefinition", {
  enumerable: true,
  get: function get() {
    return _monkey.MonkeyDefinition;
  }
});
Object.defineProperty(exports, "Monkey", {
  enumerable: true,
  get: function get() {
    return _monkey.Monkey;
  }
});
Object.defineProperty(exports, "type", {
  enumerable: true,
  get: function get() {
    return _type["default"];
  }
});
exports.helpers = exports["default"] = exports.VERSION = exports.dynamic = exports.monkey = void 0;

var _emmett = _interopRequireDefault(require("emmett"));

var _cursor = _interopRequireDefault(require("./cursor"));

var _monkey = require("./monkey");

var _watcher = _interopRequireDefault(require("./watcher"));

var _type = _interopRequireDefault(require("./type"));

var _update2 = _interopRequireDefault(require("./update"));

var helpers = _interopRequireWildcard(require("./helpers"));

exports.helpers = helpers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var arrayFrom = helpers.arrayFrom,
    coercePath = helpers.coercePath,
    deepFreeze = helpers.deepFreeze,
    getIn = helpers.getIn,
    makeError = helpers.makeError,
    deepClone = helpers.deepClone,
    deepMerge = helpers.deepMerge,
    shallowClone = helpers.shallowClone,
    shallowMerge = helpers.shallowMerge,
    hashPath = helpers.hashPath;
/**
 * Baobab defaults
 */

var DEFAULTS = {
  // Should the tree handle its transactions on its own?
  autoCommit: true,
  // Should the transactions be handled asynchronously?
  asynchronous: true,
  // Should the tree's data be immutable?
  immutable: true,
  // Should the monkeys be lazy?
  lazyMonkeys: true,
  // Should we evaluate monkeys?
  monkeyBusiness: true,
  // Should the tree be persistent?
  persistent: true,
  // Should the tree's update be pure?
  pure: true,
  // Validation specifications
  validate: null,
  // Validation behavior 'rollback' or 'notify'
  validationBehavior: 'rollback'
};
/**
 * Baobab class
 *
 * @constructor
 * @param {object|array} [initialData={}]    - Initial data passed to the tree.
 * @param {object}       [opts]              - Optional options.
 * @param {boolean}      [opts.autoCommit]   - Should the tree auto-commit?
 * @param {boolean}      [opts.asynchronous] - Should the tree's transactions
 *                                             handled asynchronously?
 * @param {boolean}      [opts.immutable]    - Should the tree be immutable?
 * @param {boolean}      [opts.persistent]   - Should the tree be persistent?
 * @param {boolean}      [opts.pure]         - Should the tree be pure?
 * @param {function}     [opts.validate]     - Validation function.
 * @param {string}       [opts.validationBehaviour] - "rollback" or "notify".
 */

var Baobab =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Baobab, _Emitter);

  function Baobab(initialData, opts) {
    var _this;

    _classCallCheck(this, Baobab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Baobab).call(this)); // Setting initialData to an empty object if no data is provided by use

    if (arguments.length < 1) initialData = {}; // Checking whether given initial data is valid

    if (!_type["default"].object(initialData) && !_type["default"].array(initialData)) throw makeError('Baobab: invalid data.', {
      data: initialData
    }); // Merging given options with defaults

    _this.options = shallowMerge({}, DEFAULTS, opts); // Disabling immutability & persistence if persistence if disabled

    if (!_this.options.persistent) {
      _this.options.immutable = false;
      _this.options.pure = false;
    } // Privates


    _this._identity = '[object Baobab]';
    _this._cursors = {};
    _this._future = null;
    _this._transaction = [];
    _this._affectedPathsIndex = {};
    _this._monkeys = {};
    _this._previousData = null;
    _this._data = initialData; // Properties

    _this.root = new _cursor["default"](_assertThisInitialized(_this), [], 'λ');
    delete _this.root.release; // Does the user want an immutable tree?

    if (_this.options.immutable) deepFreeze(_this._data); // Bootstrapping root cursor's getters and setters

    var bootstrap = function bootstrap(name) {
      _this[name] = function () {
        var r = this.root[name].apply(this.root, arguments);
        return r instanceof _cursor["default"] ? this : r;
      };
    };

    ['apply', 'clone', 'concat', 'deepClone', 'deepMerge', 'exists', 'get', 'push', 'merge', 'pop', 'project', 'serialize', 'set', 'shift', 'splice', 'unset', 'unshift'].forEach(bootstrap); // Registering the initial monkeys

    if (_this.options.monkeyBusiness) {
      _this._refreshMonkeys();
    } // Initial validation


    var validationError = _this.validate();

    if (validationError) throw Error('Baobab: invalid data.', {
      error: validationError
    });
    return _this;
  }
  /**
   * Internal method used to refresh the tree's monkey register on every
   * update.
   * Note 1) For the time being, placing monkeys beneath array nodes is not
   * allowed for performance reasons.
   *
   * @param  {mixed}   node      - The starting node.
   * @param  {array}   path      - The starting node's path.
   * @param  {string}  operation - The operation that lead to a refreshment.
   * @return {Baobab}            - The tree instance for chaining purposes.
   */


  _createClass(Baobab, [{
    key: "_refreshMonkeys",
    value: function _refreshMonkeys(node, path, operation) {
      var _this2 = this;

      var clean = function clean(data) {
        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (data instanceof _monkey.Monkey) {
          data.release();
          (0, _update2["default"])(_this2._monkeys, p, {
            type: 'unset'
          }, {
            immutable: false,
            persistent: false,
            pure: false
          });
          return;
        }

        if (_type["default"].object(data)) {
          for (var k in data) {
            clean(data[k], p.concat(k));
          }
        }
      };

      var walk = function walk(data) {
        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        // Should we sit a monkey in the tree?
        if (data instanceof _monkey.MonkeyDefinition || data instanceof _monkey.Monkey) {
          var monkeyInstance = new _monkey.Monkey(_this2, p, data instanceof _monkey.Monkey ? data.definition : data);
          (0, _update2["default"])(_this2._monkeys, p, {
            type: 'set',
            value: monkeyInstance
          }, {
            immutable: false,
            persistent: false,
            pure: false
          });
          return;
        } // Object iteration


        if (_type["default"].object(data)) {
          for (var k in data) {
            walk(data[k], p.concat(k));
          }
        }
      }; // Walking the whole tree


      if (!arguments.length) {
        walk(this._data);
      } else {
        var monkeysNode = getIn(this._monkeys, path).data; // Is this required that we clean some already existing monkeys?

        if (monkeysNode) clean(monkeysNode, path); // Let's walk the tree only from the updated point

        if (operation !== 'unset') {
          walk(node, path);
        }
      }

      return this;
    }
    /**
     * Method used to validate the tree's data.
     *
     * @return {boolean} - Is the tree valid?
     */

  }, {
    key: "validate",
    value: function validate(affectedPaths) {
      var _this$options = this.options,
          validate = _this$options.validate,
          behavior = _this$options.validationBehavior;
      if (typeof validate !== 'function') return null;
      var error = validate.call(this, this._previousData, this._data, affectedPaths || [[]]);

      if (error instanceof Error) {
        if (behavior === 'rollback') {
          this._data = this._previousData;
          this._affectedPathsIndex = {};
          this._transaction = [];
          this._previousData = this._data;
        }

        this.emit('invalid', {
          error: error
        });
        return error;
      }

      return null;
    }
    /**
     * Method used to select data within the tree by creating a cursor. Cursors
     * are kept as singletons by the tree for performance and hygiene reasons.
     *
     * Arity (1):
     * @param {path}    path - Path to select in the tree.
     *
     * Arity (*):
     * @param {...step} path - Path to select in the tree.
     *
     * @return {Cursor}      - The resultant cursor.
     */

  }, {
    key: "select",
    value: function select(path) {
      // If no path is given, we simply return the root
      path = path || []; // Variadic

      if (arguments.length > 1) path = arrayFrom(arguments); // Checking that given path is valid

      if (!_type["default"].path(path)) throw makeError('Baobab.select: invalid path.', {
        path: path
      }); // Casting to array

      path = [].concat(path); // Computing hash (done here because it would be too late to do it in the
      // cursor's constructor since we need to hit the cursors' index first).

      var hash = hashPath(path); // Creating a new cursor or returning the already existing one for the
      // requested path.

      var cursor = this._cursors[hash];

      if (!cursor) {
        cursor = new _cursor["default"](this, path, hash);
        this._cursors[hash] = cursor;
      } // Emitting an event to notify that a part of the tree was selected


      this.emit('select', {
        path: path,
        cursor: cursor
      });
      return cursor;
    }
    /**
     * Method used to update the tree. Updates are simply expressed by a path,
     * dynamic or not, and an operation.
     *
     * This is where path solving should happen and not in the cursor.
     *
     * @param  {path}   path      - The path where we'll apply the operation.
     * @param  {object} operation - The operation to apply.
     * @return {mixed} - Return the result of the update.
     */

  }, {
    key: "update",
    value: function update(path, operation) {
      var _this3 = this;

      // Coercing path
      path = coercePath(path);
      if (!_type["default"].operationType(operation.type)) throw makeError("Baobab.update: unknown operation type \"".concat(operation.type, "\"."), {
        operation: operation
      }); // Solving the given path

      var _getIn = getIn(this._data, path),
          solvedPath = _getIn.solvedPath,
          exists = _getIn.exists; // If we couldn't solve the path, we throw


      if (!solvedPath) throw makeError('Baobab.update: could not solve the given path.', {
        path: solvedPath
      }); // Read-only path?

      var monkeyPath = _type["default"].monkeyPath(this._monkeys, solvedPath);

      if (monkeyPath && solvedPath.length > monkeyPath.length) throw makeError('Baobab.update: attempting to update a read-only path.', {
        path: solvedPath
      }); // We don't unset irrelevant paths

      if (operation.type === 'unset' && !exists) return; // If we merge data, we need to acknowledge monkeys

      var realOperation = operation;

      if (/merge/i.test(operation.type)) {
        var monkeysNode = getIn(this._monkeys, solvedPath).data;

        if (_type["default"].object(monkeysNode)) {
          // Cloning the operation not to create weird behavior for the user
          realOperation = shallowClone(realOperation); // Fetching the existing node in the current data

          var currentNode = getIn(this._data, solvedPath).data;
          if (/deep/i.test(realOperation.type)) realOperation.value = deepMerge({}, deepMerge({}, currentNode, deepClone(monkeysNode)), realOperation.value);else realOperation.value = shallowMerge({}, deepMerge({}, currentNode, deepClone(monkeysNode)), realOperation.value);
        }
      } // Stashing previous data if this is the frame's first update


      if (!this._transaction.length) this._previousData = this._data; // Applying the operation

      var result = (0, _update2["default"])(this._data, solvedPath, realOperation, this.options);
      var data = result.data,
          node = result.node; // If because of purity, the update was moot, we stop here

      if (!('data' in result)) return node; // If the operation is push, the affected path is slightly different

      var affectedPath = solvedPath.concat(operation.type === 'push' ? node.length - 1 : []);
      var hash = hashPath(affectedPath); // Updating data and transaction

      this._data = data;
      this._affectedPathsIndex[hash] = true;

      this._transaction.push(shallowMerge({}, operation, {
        path: affectedPath
      })); // Updating the monkeys


      if (this.options.monkeyBusiness) {
        this._refreshMonkeys(node, solvedPath, operation.type);
      } // Emitting a `write` event


      this.emit('write', {
        path: affectedPath
      }); // Should we let the user commit?

      if (!this.options.autoCommit) return node; // Should we update asynchronously?

      if (!this.options.asynchronous) {
        this.commit();
        return node;
      } // Updating asynchronously


      if (!this._future) this._future = setTimeout(function () {
        return _this3.commit();
      }, 0); // Finally returning the affected node

      return node;
    }
    /**
     * Method committing the updates of the tree and firing the tree's events.
     *
     * @return {Baobab} - The tree instance for chaining purposes.
     */

  }, {
    key: "commit",
    value: function commit() {
      // Do not fire update if the transaction is empty
      if (!this._transaction.length) return this; // Clearing timeout if one was defined

      if (this._future) this._future = clearTimeout(this._future);
      var affectedPaths = Object.keys(this._affectedPathsIndex).map(function (h) {
        return h !== 'λ' ? h.split('λ').slice(1) : [];
      }); // Is the tree still valid?

      var validationError = this.validate(affectedPaths);
      if (validationError) return this; // Caching to keep original references before we change them

      var transaction = this._transaction,
          previousData = this._previousData;
      this._affectedPathsIndex = {};
      this._transaction = [];
      this._previousData = this._data; // Emitting update event

      this.emit('update', {
        paths: affectedPaths,
        currentData: this._data,
        transaction: transaction,
        previousData: previousData
      });
      return this;
    }
    /**
     * Method returning a monkey at the given path or else `null`.
     *
     * @param  {path}        path - Path of the monkey to retrieve.
     * @return {Monkey|null}      - The Monkey instance of `null`.
     */

  }, {
    key: "getMonkey",
    value: function getMonkey(path) {
      path = coercePath(path);
      var monkey = getIn(this._monkeys, [].concat(path)).data;
      if (monkey instanceof _monkey.Monkey) return monkey;
      return null;
    }
    /**
     * Method used to watch a collection of paths within the tree. Very useful
     * to bind UI components and such to the tree.
     *
     * @param  {object} mapping - Mapping of paths to listen.
     * @return {Cursor}         - The created watcher.
     */

  }, {
    key: "watch",
    value: function watch(mapping) {
      return new _watcher["default"](this, mapping);
    }
    /**
     * Method releasing the tree and its attached data from memory.
     */

  }, {
    key: "release",
    value: function release() {
      var k;
      this.emit('release');
      delete this.root;
      delete this._data;
      delete this._previousData;
      delete this._transaction;
      delete this._affectedPathsIndex;
      delete this._monkeys; // Releasing cursors

      for (k in this._cursors) {
        this._cursors[k].release();
      }

      delete this._cursors; // Killing event emitter

      this.kill();
    }
    /**
     * Overriding the `toJSON` method for convenient use with JSON.stringify.
     *
     * @return {mixed} - Data at cursor.
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.serialize();
    }
    /**
     * Overriding the `toString` method for debugging purposes.
     *
     * @return {string} - The baobab's identity.
     */

  }, {
    key: "toString",
    value: function toString() {
      return this._identity;
    }
  }]);

  return Baobab;
}(_emmett["default"]);
/**
 * Monkey helper.
 */


Baobab.monkey = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (!args.length) throw new Error('Baobab.monkey: missing definition.');
  if (args.length === 1 && typeof args[0] !== 'function') return new _monkey.MonkeyDefinition(args[0]);
  return new _monkey.MonkeyDefinition(args);
};

Baobab.dynamicNode = Baobab.monkey;
var monkey = Baobab.monkey;
exports.monkey = monkey;
var dynamic = Baobab.dynamic;
/**
 * Exposing some internals for convenience
 */

exports.dynamic = dynamic;

/**
 * Version.
 */
Baobab.VERSION = '2.6.0';
var VERSION = Baobab.VERSION;
/**
 * Exporting.
 */

exports.VERSION = VERSION;
var _default = Baobab;
exports["default"] = _default;
for (var exportedName in exports)
  Baobab[exportedName] = exports[exportedName];

module.exports = Baobab;

},{"./cursor":2,"./helpers":3,"./monkey":4,"./type":5,"./update":6,"./watcher":7,"emmett":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emmett = _interopRequireDefault(require("emmett"));

var _monkey = require("./monkey");

var _type = _interopRequireDefault(require("./type"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Traversal helper function for dynamic cursors. Will throw a legible error
 * if traversal is not possible.
 *
 * @param {string} method     - The method name, to create a correct error msg.
 * @param {array}  solvedPath - The cursor's solved path.
 */
function checkPossibilityOfDynamicTraversal(method, solvedPath) {
  if (!solvedPath) throw (0, _helpers.makeError)("Baobab.Cursor.".concat(method, ": ") + "cannot use ".concat(method, " on an unresolved dynamic path."), {
    path: solvedPath
  });
}
/**
 * Cursor class
 *
 * @constructor
 * @param {Baobab} tree   - The cursor's root.
 * @param {array}  path   - The cursor's path in the tree.
 * @param {string} hash   - The path's hash computed ahead by the tree.
 */


var Cursor =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Cursor, _Emitter);

  function Cursor(tree, path, hash) {
    var _this;

    _classCallCheck(this, Cursor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cursor).call(this)); // If no path were to be provided, we fallback to an empty path (root)

    path = path || []; // Privates

    _this._identity = '[object Cursor]';
    _this._archive = null; // Properties

    _this.tree = tree;
    _this.path = path;
    _this.hash = hash; // State

    _this.state = {
      killed: false,
      recording: false,
      undoing: false
    }; // Checking whether the given path is dynamic or not

    _this._dynamicPath = _type["default"].dynamicPath(_this.path); // Checking whether the given path will meet a monkey

    _this._monkeyPath = _type["default"].monkeyPath(_this.tree._monkeys, _this.path);
    if (!_this._dynamicPath) _this.solvedPath = _this.path;else _this.solvedPath = (0, _helpers.getIn)(_this.tree._data, _this.path).solvedPath;
    /**
     * Listener bound to the tree's writes so that cursors with dynamic paths
     * may update their solved path correctly.
     *
     * @param {object} event - The event fired by the tree.
     */

    _this._writeHandler = function (_ref) {
      var data = _ref.data;
      if (_this.state.killed || !(0, _helpers.solveUpdate)([data.path], _this._getComparedPaths())) return;
      _this.solvedPath = (0, _helpers.getIn)(_this.tree._data, _this.path).solvedPath;
    };
    /**
     * Function in charge of actually trigger the cursor's updates and
     * deal with the archived records.
     *
     * @note: probably should wrap the current solvedPath in closure to avoid
     * for tricky cases where it would fail.
     *
     * @param {mixed} previousData - the tree's previous data.
     */


    var fireUpdate = function fireUpdate(previousData) {
      var self = _assertThisInitialized(_this);

      var eventData = {
        get previousData() {
          return (0, _helpers.getIn)(previousData, self.solvedPath).data;
        },

        get currentData() {
          return self.get();
        }

      };
      if (_this.state.recording && !_this.state.undoing) _this.archive.add(eventData.previousData);
      _this.state.undoing = false;
      return _this.emit('update', eventData);
    };
    /**
     * Listener bound to the tree's updates and determining whether the
     * cursor is affected and should react accordingly.
     *
     * Note that this listener is lazily bound to the tree to be sure
     * one wouldn't leak listeners when only creating cursors for convenience
     * and not to listen to updates specifically.
     *
     * @param {object} event - The event fired by the tree.
     */


    _this._updateHandler = function (event) {
      if (_this.state.killed) return;

      var _event$data = event.data,
          paths = _event$data.paths,
          previousData = _event$data.previousData,
          update = fireUpdate.bind(_assertThisInitialized(_this), previousData),
          comparedPaths = _this._getComparedPaths();

      if ((0, _helpers.solveUpdate)(paths, comparedPaths)) return update();
    }; // Lazy binding


    var bound = false;

    _this._lazyBind = function () {
      if (bound) return;
      bound = true;
      if (_this._dynamicPath) _this.tree.on('write', _this._writeHandler);
      return _this.tree.on('update', _this._updateHandler);
    }; // If the path is dynamic, we actually need to listen to the tree


    if (_this._dynamicPath) {
      _this._lazyBind();
    } else {
      // Overriding the emitter `on` and `once` methods
      _this.on = (0, _helpers.before)(_this._lazyBind, _this.on.bind(_assertThisInitialized(_this)));
      _this.once = (0, _helpers.before)(_this._lazyBind, _this.once.bind(_assertThisInitialized(_this)));
    }

    return _this;
  }
  /**
   * Internal helpers
   * -----------------
   */

  /**
   * Method returning the paths of the tree watched over by the cursor and that
   * should be taken into account when solving a potential update.
   *
   * @return {array} - Array of paths to compare with a given update.
   */


  _createClass(Cursor, [{
    key: "_getComparedPaths",
    value: function _getComparedPaths() {
      // Checking whether we should keep track of some dependencies
      var additionalPaths = this._monkeyPath ? (0, _helpers.getIn)(this.tree._monkeys, this._monkeyPath).data.relatedPaths() : [];
      return [this.solvedPath].concat(additionalPaths);
    }
    /**
     * Predicates
     * -----------
     */

    /**
     * Method returning whether the cursor is at root level.
     *
     * @return {boolean} - Is the cursor the root?
     */

  }, {
    key: "isRoot",
    value: function isRoot() {
      return !this.path.length;
    }
    /**
     * Method returning whether the cursor is at leaf level.
     *
     * @return {boolean} - Is the cursor a leaf?
     */

  }, {
    key: "isLeaf",
    value: function isLeaf() {
      return _type["default"].primitive(this._get().data);
    }
    /**
     * Method returning whether the cursor is at branch level.
     *
     * @return {boolean} - Is the cursor a branch?
     */

  }, {
    key: "isBranch",
    value: function isBranch() {
      return !this.isRoot() && !this.isLeaf();
    }
    /**
     * Traversal Methods
     * ------------------
     */

    /**
     * Method returning the root cursor.
     *
     * @return {Baobab} - The root cursor.
     */

  }, {
    key: "root",
    value: function root() {
      return this.tree.select();
    }
    /**
     * Method selecting a subpath as a new cursor.
     *
     * Arity (1):
     * @param  {path} path    - The path to select.
     *
     * Arity (*):
     * @param  {...step} path - The path to select.
     *
     * @return {Cursor}       - The created cursor.
     */

  }, {
    key: "select",
    value: function select(path) {
      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);
      return this.tree.select(this.path.concat(path));
    }
    /**
     * Method returning the parent node of the cursor or else `null` if the
     * cursor is already at root level.
     *
     * @return {Baobab} - The parent cursor.
     */

  }, {
    key: "up",
    value: function up() {
      if (!this.isRoot()) return this.tree.select(this.path.slice(0, -1));
      return null;
    }
    /**
     * Method returning the child node of the cursor.
     *
     * @return {Baobab} - The child cursor.
     */

  }, {
    key: "down",
    value: function down() {
      checkPossibilityOfDynamicTraversal('down', this.solvedPath);
      if (!(this._get().data instanceof Array)) throw Error('Baobab.Cursor.down: cannot go down on a non-list type.');
      return this.tree.select(this.solvedPath.concat(0));
    }
    /**
     * Method returning the left sibling node of the cursor if this one is
     * pointing at a list. Returns `null` if this cursor is already leftmost.
     *
     * @return {Baobab} - The left sibling cursor.
     */

  }, {
    key: "left",
    value: function left() {
      checkPossibilityOfDynamicTraversal('left', this.solvedPath);
      var last = +this.solvedPath[this.solvedPath.length - 1];
      if (isNaN(last)) throw Error('Baobab.Cursor.left: cannot go left on a non-list type.');
      return last ? this.tree.select(this.solvedPath.slice(0, -1).concat(last - 1)) : null;
    }
    /**
     * Method returning the right sibling node of the cursor if this one is
     * pointing at a list. Returns `null` if this cursor is already rightmost.
     *
     * @return {Baobab} - The right sibling cursor.
     */

  }, {
    key: "right",
    value: function right() {
      checkPossibilityOfDynamicTraversal('right', this.solvedPath);
      var last = +this.solvedPath[this.solvedPath.length - 1];
      if (isNaN(last)) throw Error('Baobab.Cursor.right: cannot go right on a non-list type.');
      if (last + 1 === this.up()._get().data.length) return null;
      return this.tree.select(this.solvedPath.slice(0, -1).concat(last + 1));
    }
    /**
     * Method returning the leftmost sibling node of the cursor if this one is
     * pointing at a list.
     *
     * @return {Baobab} - The leftmost sibling cursor.
     */

  }, {
    key: "leftmost",
    value: function leftmost() {
      checkPossibilityOfDynamicTraversal('leftmost', this.solvedPath);
      var last = +this.solvedPath[this.solvedPath.length - 1];
      if (isNaN(last)) throw Error('Baobab.Cursor.leftmost: cannot go left on a non-list type.');
      return this.tree.select(this.solvedPath.slice(0, -1).concat(0));
    }
    /**
     * Method returning the rightmost sibling node of the cursor if this one is
     * pointing at a list.
     *
     * @return {Baobab} - The rightmost sibling cursor.
     */

  }, {
    key: "rightmost",
    value: function rightmost() {
      checkPossibilityOfDynamicTraversal('rightmost', this.solvedPath);
      var last = +this.solvedPath[this.solvedPath.length - 1];
      if (isNaN(last)) throw Error('Baobab.Cursor.rightmost: cannot go right on a non-list type.');

      var list = this.up()._get().data;

      return this.tree.select(this.solvedPath.slice(0, -1).concat(list.length - 1));
    }
    /**
     * Method mapping the children nodes of the cursor.
     *
     * @param  {function} fn      - The function to map.
     * @param  {object}   [scope] - An optional scope.
     * @return {array}            - The resultant array.
     */

  }, {
    key: "map",
    value: function map(fn, scope) {
      checkPossibilityOfDynamicTraversal('map', this.solvedPath);

      var array = this._get().data,
          l = arguments.length;

      if (!_type["default"].array(array)) throw Error('baobab.Cursor.map: cannot map a non-list type.');
      return array.map(function (item, i) {
        return fn.call(l > 1 ? scope : this, this.select(i), i, array);
      }, this);
    }
    /**
     * Getter Methods
     * ---------------
     */

    /**
     * Internal get method. Basically contains the main body of the `get` method
     * without the event emitting. This is sometimes needed not to fire useless
     * events.
     *
     * @param  {path}   [path=[]]       - Path to get in the tree.
     * @return {object} info            - The resultant information.
     * @return {mixed}  info.data       - Data at path.
     * @return {array}  info.solvedPath - The path solved when getting.
     */

  }, {
    key: "_get",
    value: function _get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!_type["default"].path(path)) throw (0, _helpers.makeError)('Baobab.Cursor.getters: invalid path.', {
        path: path
      });
      if (!this.solvedPath) return {
        data: undefined,
        solvedPath: null,
        exists: false
      };
      return (0, _helpers.getIn)(this.tree._data, this.solvedPath.concat(path));
    }
    /**
     * Method used to check whether a certain path exists in the tree starting
     * from the current cursor.
     *
     * Arity (1):
     * @param  {path}   path           - Path to check in the tree.
     *
     * Arity (2):
     * @param {..step}  path           - Path to check in the tree.
     *
     * @return {boolean}               - Does the given path exists?
     */

  }, {
    key: "exists",
    value: function exists(path) {
      path = (0, _helpers.coercePath)(path);
      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);
      return this._get(path).exists;
    }
    /**
     * Method used to get data from the tree. Will fire a `get` event from the
     * tree so that the user may sometimes react upon it to fetch data, for
     * instance.
     *
     * Arity (1):
     * @param  {path}   path           - Path to get in the tree.
     *
     * Arity (2):
     * @param  {..step} path           - Path to get in the tree.
     *
     * @return {mixed}                 - Data at path.
     */

  }, {
    key: "get",
    value: function get(path) {
      path = (0, _helpers.coercePath)(path);
      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);

      var _this$_get = this._get(path),
          data = _this$_get.data,
          solvedPath = _this$_get.solvedPath; // Emitting the event


      this.tree.emit('get', {
        data: data,
        solvedPath: solvedPath,
        path: this.path.concat(path)
      });
      return data;
    }
    /**
     * Method used to shallow clone data from the tree.
     *
     * Arity (1):
     * @param  {path}   path           - Path to get in the tree.
     *
     * Arity (2):
     * @param  {..step} path           - Path to get in the tree.
     *
     * @return {mixed}                 - Cloned data at path.
     */

  }, {
    key: "clone",
    value: function clone() {
      var data = this.get.apply(this, arguments);
      return (0, _helpers.shallowClone)(data);
    }
    /**
     * Method used to deep clone data from the tree.
     *
     * Arity (1):
     * @param  {path}   path           - Path to get in the tree.
     *
     * Arity (2):
     * @param  {..step} path           - Path to get in the tree.
     *
     * @return {mixed}                 - Cloned data at path.
     */

  }, {
    key: "deepClone",
    value: function deepClone() {
      var data = this.get.apply(this, arguments);
      return (0, _helpers.deepClone)(data);
    }
    /**
     * Method used to return raw data from the tree, by carefully avoiding
     * computed one.
     *
     * @todo: should be more performant as the cloning should happen as well as
     * when dropping computed data.
     *
     * Arity (1):
     * @param  {path}   path           - Path to serialize in the tree.
     *
     * Arity (2):
     * @param  {..step} path           - Path to serialize in the tree.
     *
     * @return {mixed}                 - The retrieved raw data.
     */

  }, {
    key: "serialize",
    value: function serialize(path) {
      path = (0, _helpers.coercePath)(path);
      if (arguments.length > 1) path = (0, _helpers.arrayFrom)(arguments);
      if (!_type["default"].path(path)) throw (0, _helpers.makeError)('Baobab.Cursor.getters: invalid path.', {
        path: path
      });
      if (!this.solvedPath) return undefined;
      var fullPath = this.solvedPath.concat(path);
      var data = (0, _helpers.deepClone)((0, _helpers.getIn)(this.tree._data, fullPath).data),
          monkeys = (0, _helpers.getIn)(this.tree._monkeys, fullPath).data;

      var dropComputedData = function dropComputedData(d, m) {
        if (!_type["default"].object(m) || !_type["default"].object(d)) return;

        for (var k in m) {
          if (m[k] instanceof _monkey.Monkey) delete d[k];else dropComputedData(d[k], m[k]);
        }
      };

      dropComputedData(data, monkeys);
      return data;
    }
    /**
     * Method used to project some of the data at cursor onto a map or a list.
     *
     * @param  {object|array} projection - The projection's formal definition.
     * @return {object|array}            - The resultant map/list.
     */

  }, {
    key: "project",
    value: function project(projection) {
      if (_type["default"].object(projection)) {
        var data = {};

        for (var k in projection) {
          data[k] = this.get(projection[k]);
        }

        return data;
      } else if (_type["default"].array(projection)) {
        var _data = [];

        for (var i = 0, l = projection.length; i < l; i++) {
          _data.push(this.get(projection[i]));
        }

        return _data;
      }

      throw (0, _helpers.makeError)('Baobab.Cursor.project: wrong projection.', {
        projection: projection
      });
    }
    /**
     * History Methods
     * ----------------
     */

    /**
     * Methods starting to record the cursor's successive states.
     *
     * @param  {integer} [maxRecords] - Maximum records to keep in memory. Note
     *                                  that if no number is provided, the cursor
     *                                  will keep everything.
     * @return {Cursor}               - The cursor instance for chaining purposes.
     */

  }, {
    key: "startRecording",
    value: function startRecording(maxRecords) {
      maxRecords = maxRecords || Infinity;
      if (maxRecords < 1) throw (0, _helpers.makeError)('Baobab.Cursor.startRecording: invalid max records.', {
        value: maxRecords
      });
      this.state.recording = true;
      if (this.archive) return this; // Lazy binding

      this._lazyBind();

      this.archive = new _helpers.Archive(maxRecords);
      return this;
    }
    /**
     * Methods stopping to record the cursor's successive states.
     *
     * @return {Cursor} - The cursor instance for chaining purposes.
     */

  }, {
    key: "stopRecording",
    value: function stopRecording() {
      this.state.recording = false;
      return this;
    }
    /**
     * Methods undoing n steps of the cursor's recorded states.
     *
     * @param  {integer} [steps=1] - The number of steps to rollback.
     * @return {Cursor}            - The cursor instance for chaining purposes.
     */

  }, {
    key: "undo",
    value: function undo() {
      var steps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (!this.state.recording) throw new Error('Baobab.Cursor.undo: cursor is not recording.');
      var record = this.archive.back(steps);
      if (!record) throw Error('Baobab.Cursor.undo: cannot find a relevant record.');
      this.state.undoing = true;
      this.set(record);
      return this;
    }
    /**
     * Methods returning whether the cursor has a recorded history.
     *
     * @return {boolean} - `true` if the cursor has a recorded history?
     */

  }, {
    key: "hasHistory",
    value: function hasHistory() {
      return !!(this.archive && this.archive.get().length);
    }
    /**
     * Methods returning the cursor's history.
     *
     * @return {array} - The cursor's history.
     */

  }, {
    key: "getHistory",
    value: function getHistory() {
      return this.archive ? this.archive.get() : [];
    }
    /**
     * Methods clearing the cursor's history.
     *
     * @return {Cursor} - The cursor instance for chaining purposes.
     */

  }, {
    key: "clearHistory",
    value: function clearHistory() {
      if (this.archive) this.archive.clear();
      return this;
    }
    /**
     * Releasing
     * ----------
     */

    /**
     * Methods releasing the cursor from memory.
     */

  }, {
    key: "release",
    value: function release() {
      // Removing listeners on parent
      if (this._dynamicPath) this.tree.off('write', this._writeHandler);
      this.tree.off('update', this._updateHandler); // Unsubscribe from the parent

      if (this.hash) delete this.tree._cursors[this.hash]; // Dereferencing

      delete this.tree;
      delete this.path;
      delete this.solvedPath;
      delete this.archive; // Killing emitter

      this.kill();
      this.state.killed = true;
    }
    /**
     * Output
     * -------
     */

    /**
     * Overriding the `toJSON` method for convenient use with JSON.stringify.
     *
     * @return {mixed} - Data at cursor.
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.serialize();
    }
    /**
     * Overriding the `toString` method for debugging purposes.
     *
     * @return {string} - The cursor's identity.
     */

  }, {
    key: "toString",
    value: function toString() {
      return this._identity;
    }
  }]);

  return Cursor;
}(_emmett["default"]);
/**
 * Method used to allow iterating over cursors containing list-type data.
 *
 * e.g. for(let i of cursor) { ... }
 *
 * @returns {object} -  Each item sequentially.
 */


exports["default"] = Cursor;

if (typeof Symbol === 'function' && typeof Symbol.iterator !== 'undefined') {
  Cursor.prototype[Symbol.iterator] = function () {
    var array = this._get().data;

    if (!_type["default"].array(array)) throw Error('baobab.Cursor.@@iterate: cannot iterate a non-list type.');
    var i = 0;
    var cursor = this,
        length = array.length;
    return {
      next: function next() {
        if (i < length) {
          return {
            value: cursor.select(i++)
          };
        }

        return {
          done: true
        };
      }
    };
  };
}
/**
 * Setter Methods
 * ---------------
 *
 * Those methods are dynamically assigned to the class for DRY reasons.
 */
// Not using a Set so that ES5 consumers don't pay a bundle size price


var INTRANSITIVE_SETTERS = {
  unset: true,
  pop: true,
  shift: true
};
/**
 * Function creating a setter method for the Cursor class.
 *
 * @param {string}   name          - the method's name.
 * @param {function} [typeChecker] - a function checking that the given value is
 *                                   valid for the given operation.
 */

function makeSetter(name, typeChecker) {
  /**
   * Binding a setter method to the Cursor class and having the following
   * definition.
   *
   * Note: this is not really possible to make those setters variadic because
   * it would create an impossible polymorphism with path.
   *
   * @todo: perform value validation elsewhere so that tree.update can
   * beneficiate from it.
   *
   * Arity (1):
   * @param  {mixed} value - New value to set at cursor's path.
   *
   * Arity (2):
   * @param  {path}  path  - Subpath to update starting from cursor's.
   * @param  {mixed} value - New value to set.
   *
   * @return {mixed}       - Data at path.
   */
  Cursor.prototype[name] = function (path, value) {
    // We should warn the user if he applies to many arguments to the function
    if (arguments.length > 2) throw (0, _helpers.makeError)("Baobab.Cursor.".concat(name, ": too many arguments.")); // Handling arities

    if (arguments.length === 1 && !INTRANSITIVE_SETTERS[name]) {
      value = path;
      path = [];
    } // Coerce path


    path = (0, _helpers.coercePath)(path); // Checking the path's validity

    if (!_type["default"].path(path)) throw (0, _helpers.makeError)("Baobab.Cursor.".concat(name, ": invalid path."), {
      path: path
    }); // Checking the value's validity

    if (typeChecker && !typeChecker(value)) throw (0, _helpers.makeError)("Baobab.Cursor.".concat(name, ": invalid value."), {
      path: path,
      value: value
    }); // Checking the solvability of the cursor's dynamic path

    if (!this.solvedPath) throw (0, _helpers.makeError)("Baobab.Cursor.".concat(name, ": the dynamic path of the cursor cannot be solved."), {
      path: this.path
    });
    var fullPath = this.solvedPath.concat(path); // Filing the update to the tree

    return this.tree.update(fullPath, {
      type: name,
      value: value
    });
  };
}
/**
 * Making the necessary setters.
 */


makeSetter('set');
makeSetter('unset');
makeSetter('apply', _type["default"]["function"]);
makeSetter('push');
makeSetter('concat', _type["default"].array);
makeSetter('unshift');
makeSetter('pop');
makeSetter('shift');
makeSetter('splice', _type["default"].splicer);
makeSetter('merge', _type["default"].object);
makeSetter('deepMerge', _type["default"].object);
},{"./helpers":3,"./monkey":4,"./type":5,"emmett":14}],3:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayFrom = arrayFrom;
exports.before = before;
exports.coercePath = coercePath;
exports.getIn = getIn;
exports.makeError = makeError;
exports.hashPath = hashPath;
exports.solveRelativePath = solveRelativePath;
exports.solveUpdate = solveUpdate;
exports.splice = splice;
exports.uniqid = exports.deepMerge = exports.shallowMerge = exports.deepFreeze = exports.freeze = exports.deepClone = exports.shallowClone = exports.Archive = void 0;

var _monkey = require("./monkey");

var _type = _interopRequireDefault(require("./type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var hasOwnProp = {}.hasOwnProperty;
/**
 * Function returning the index of the first element of a list matching the
 * given predicate.
 *
 * @param  {array}     a  - The target array.
 * @param  {function}  fn - The predicate function.
 * @return {mixed}        - The index of the first matching item or -1.
 */

function index(a, fn) {
  var i, l;

  for (i = 0, l = a.length; i < l; i++) {
    if (fn(a[i])) return i;
  }

  return -1;
}
/**
 * Efficient slice function used to clone arrays or parts of them.
 *
 * @param  {array} array - The array to slice.
 * @return {array}       - The sliced array.
 */


function slice(array) {
  var newArray = new Array(array.length);
  var i, l;

  for (i = 0, l = array.length; i < l; i++) {
    newArray[i] = array[i];
  }

  return newArray;
}
/**
 * Archive abstraction
 *
 * @constructor
 * @param {integer} size - Maximum number of records to store.
 */


var Archive =
/*#__PURE__*/
function () {
  function Archive(size) {
    _classCallCheck(this, Archive);

    this.size = size;
    this.records = [];
  }
  /**
   * Method retrieving the records.
   *
   * @return {array} - The records.
   */


  _createClass(Archive, [{
    key: "get",
    value: function get() {
      return this.records;
    }
    /**
     * Method adding a record to the archive
     *
     * @param {object}  record - The record to store.
     * @return {Archive}       - The archive itself for chaining purposes.
     */

  }, {
    key: "add",
    value: function add(record) {
      this.records.unshift(record); // If the number of records is exceeded, we truncate the records

      if (this.records.length > this.size) this.records.length = this.size;
      return this;
    }
    /**
     * Method clearing the records.
     *
     * @return {Archive} - The archive itself for chaining purposes.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.records = [];
      return this;
    }
    /**
     * Method to go back in time.
     *
     * @param {integer} steps - Number of steps we should go back by.
     * @return {number}       - The last record.
     */

  }, {
    key: "back",
    value: function back(steps) {
      var record = this.records[steps - 1];
      if (record) this.records = this.records.slice(steps);
      return record;
    }
  }]);

  return Archive;
}();
/**
 * Function creating a real array from what should be an array but is not.
 * I'm looking at you nasty `arguments`...
 *
 * @param  {mixed} culprit - The culprit to convert.
 * @return {array}         - The real array.
 */


exports.Archive = Archive;

function arrayFrom(culprit) {
  return slice(culprit);
}
/**
 * Function decorating one function with another that will be called before the
 * decorated one.
 *
 * @param  {function} decorator - The decorating function.
 * @param  {function} fn        - The function to decorate.
 * @return {function}           - The decorated function.
 */


function before(decorator, fn) {
  return function () {
    decorator.apply(null, arguments);
    fn.apply(null, arguments);
  };
}
/**
 * Function cloning the given regular expression. Supports `y` and `u` flags
 * already.
 *
 * @param  {RegExp} re - The target regular expression.
 * @return {RegExp}    - The cloned regular expression.
 */


function cloneRegexp(re) {
  var pattern = re.source;
  var flags = '';
  if (re.global) flags += 'g';
  if (re.multiline) flags += 'm';
  if (re.ignoreCase) flags += 'i';
  if (re.sticky) flags += 'y';
  if (re.unicode) flags += 'u';
  return new RegExp(pattern, flags);
}
/**
 * Function cloning the given variable.
 *
 * @todo: implement a faster way to clone an array.
 *
 * @param  {boolean} deep - Should we deep clone the variable.
 * @param  {mixed}   item - The variable to clone
 * @return {mixed}        - The cloned variable.
 */


function cloner(deep, item) {
  if (!item || _typeof(item) !== 'object' || item instanceof Error || item instanceof _monkey.MonkeyDefinition || item instanceof _monkey.Monkey || 'ArrayBuffer' in global && item instanceof ArrayBuffer) return item; // Array

  if (_type["default"].array(item)) {
    if (deep) {
      var a = new Array(item.length);

      for (var i = 0, l = item.length; i < l; i++) {
        a[i] = cloner(true, item[i]);
      }

      return a;
    }

    return slice(item);
  } // Date


  if (item instanceof Date) return new Date(item.getTime()); // RegExp

  if (item instanceof RegExp) return cloneRegexp(item); // Object

  if (_type["default"].object(item)) {
    var o = {}; // NOTE: could be possible to erase computed properties through `null`.

    var props = Object.getOwnPropertyNames(item);

    for (var _i = 0, _l = props.length; _i < _l; _i++) {
      var name = props[_i];
      var k = Object.getOwnPropertyDescriptor(item, name);

      if (k.enumerable === true) {
        if (k.get && k.get.isLazyGetter) {
          Object.defineProperty(o, name, {
            get: k.get,
            enumerable: true,
            configurable: true
          });
        } else {
          o[name] = deep ? cloner(true, item[name]) : item[name];
        }
      } else if (k.enumerable === false) {
        Object.defineProperty(o, name, {
          value: deep ? cloner(true, k.value) : k.value,
          enumerable: false,
          writable: true,
          configurable: true
        });
      }
    }

    return o;
  }

  return item;
}
/**
 * Exporting shallow and deep cloning functions.
 */


var shallowClone = cloner.bind(null, false),
    deepClone = cloner.bind(null, true);
exports.deepClone = deepClone;
exports.shallowClone = shallowClone;

/**
 * Coerce the given variable into a full-fledged path.
 *
 * @param  {mixed} target - The variable to coerce.
 * @return {array}        - The array path.
 */
function coercePath(target) {
  if (target || target === 0 || target === '') return target;
  return [];
}
/**
 * Function comparing an object's properties to a given descriptive
 * object.
 *
 * @param  {object} object      - The object to compare.
 * @param  {object} description - The description's mapping.
 * @return {boolean}            - Whether the object matches the description.
 */


function compare(object, description) {
  var ok = true,
      k; // If we reached here via a recursive call, object may be undefined because
  // not all items in a collection will have the same deep nesting structure.

  if (!object) return false;

  for (k in description) {
    if (_type["default"].object(description[k])) {
      ok = ok && compare(object[k], description[k]);
    } else if (_type["default"].array(description[k])) {
      ok = ok && !!~description[k].indexOf(object[k]);
    } else {
      if (object[k] !== description[k]) return false;
    }
  }

  return ok;
}
/**
 * Function freezing the given variable if possible.
 *
 * @param  {boolean} deep - Should we recursively freeze the given objects?
 * @param  {object}  o    - The variable to freeze.
 * @return {object}    - The merged object.
 */


function freezer(deep, o) {
  if (_typeof(o) !== 'object' || o === null || o instanceof _monkey.Monkey) return;
  Object.freeze(o);
  if (!deep) return;

  if (Array.isArray(o)) {
    // Iterating through the elements
    var i, l;

    for (i = 0, l = o.length; i < l; i++) {
      deepFreeze(o[i]);
    }
  } else {
    var p, k;

    for (k in o) {
      if (_type["default"].lazyGetter(o, k)) continue;
      p = o[k];
      if (!p || !hasOwnProp.call(o, k) || _typeof(p) !== 'object' || Object.isFrozen(p)) continue;
      deepFreeze(p);
    }
  }
}

var freeze = freezer.bind(null, false),
    deepFreeze = freezer.bind(null, true);
exports.deepFreeze = deepFreeze;
exports.freeze = freeze;

/**
 * Function retrieving nested data within the given object and according to
 * the given path.
 *
 * @todo: work if dynamic path hit objects also.
 * @todo: memoized perfgetters.
 *
 * @param  {object}  object - The object we need to get data from.
 * @param  {array}   path   - The path to follow.
 * @return {object}  result            - The result.
 * @return {mixed}   result.data       - The data at path, or `undefined`.
 * @return {array}   result.solvedPath - The solved path or `null`.
 * @return {boolean} result.exists     - Does the path exists in the tree?
 */
var NOT_FOUND_OBJECT = {
  data: undefined,
  solvedPath: null,
  exists: false
};

function getIn(object, path) {
  if (!path) return NOT_FOUND_OBJECT;
  var solvedPath = [];
  var exists = true,
      c = object,
      idx,
      i,
      l;

  for (i = 0, l = path.length; i < l; i++) {
    if (!c) return {
      data: undefined,
      solvedPath: solvedPath.concat(path.slice(i)),
      exists: false
    };

    if (typeof path[i] === 'function') {
      if (!_type["default"].array(c)) return NOT_FOUND_OBJECT;
      idx = index(c, path[i]);
      if (!~idx) return NOT_FOUND_OBJECT;
      solvedPath.push(idx);
      c = c[idx];
    } else if (_typeof(path[i]) === 'object') {
      if (!_type["default"].array(c)) return NOT_FOUND_OBJECT;
      idx = index(c, function (e) {
        return compare(e, path[i]);
      });
      if (!~idx) return NOT_FOUND_OBJECT;
      solvedPath.push(idx);
      c = c[idx];
    } else {
      solvedPath.push(path[i]);
      exists = _typeof(c) === 'object' && path[i] in c;
      c = c[path[i]];
    }
  }

  return {
    data: c,
    solvedPath: solvedPath,
    exists: exists
  };
}
/**
 * Little helper returning a JavaScript error carrying some data with it.
 *
 * @param  {string} message - The error message.
 * @param  {object} [data]  - Optional data to assign to the error.
 * @return {Error}          - The created error.
 */


function makeError(message, data) {
  var err = new Error(message);

  for (var k in data) {
    err[k] = data[k];
  }

  return err;
}
/**
 * Function taking n objects to merge them together.
 * Note 1): the latter object will take precedence over the first one.
 * Note 2): the first object will be mutated to allow for perf scenarios.
 * Note 3): this function will consider monkeys as leaves.
 *
 * @param  {boolean}   deep    - Whether the merge should be deep or not.
 * @param  {...object} objects - Objects to merge.
 * @return {object}            - The merged object.
 */


function merger(deep) {
  for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
  }

  var o = objects[0];
  var t, i, l, k;

  for (i = 1, l = objects.length; i < l; i++) {
    t = objects[i];

    for (k in t) {
      if (deep && _type["default"].object(t[k]) && !(t[k] instanceof _monkey.Monkey)) {
        o[k] = merger(true, o[k] || {}, t[k]);
      } else {
        o[k] = t[k];
      }
    }
  }

  return o;
}
/**
 * Exporting both `shallowMerge` and `deepMerge` functions.
 */


var shallowMerge = merger.bind(null, false),
    deepMerge = merger.bind(null, true);
exports.deepMerge = deepMerge;
exports.shallowMerge = shallowMerge;

/**
 * Function returning a string hash from a non-dynamic path expressed as an
 * array.
 *
 * @param  {array}  path - The path to hash.
 * @return {string} string - The resultant hash.
 */
function hashPath(path) {
  return 'λ' + path.map(function (step) {
    if (_type["default"]["function"](step) || _type["default"].object(step)) return "#".concat(uniqid(), "#");
    return step;
  }).join('λ');
}
/**
 * Solving a potentially relative path.
 *
 * @param  {array} base - The base path from which to solve the path.
 * @param  {array} to   - The subpath to reach.
 * @param  {array}      - The solved absolute path.
 */


function solveRelativePath(base, to) {
  var solvedPath = []; // Coercing to array

  to = [].concat(to);

  for (var i = 0, l = to.length; i < l; i++) {
    var step = to[i];

    if (step === '.') {
      if (!i) solvedPath = base.slice(0);
    } else if (step === '..') {
      solvedPath = (!i ? base : solvedPath).slice(0, -1);
    } else {
      solvedPath.push(step);
    }
  }

  return solvedPath;
}
/**
 * Function determining whether some paths in the tree were affected by some
 * updates that occurred at the given paths. This helper is mainly used at
 * cursor level to determine whether the cursor is concerned by the updates
 * fired at tree level.
 *
 * NOTES: 1) If performance become an issue, the following threefold loop
 *           can be simplified to a complex twofold one.
 *        2) A regex version could also work but I am not confident it would
 *           be faster.
 *        3) Another solution would be to keep a register of cursors like with
 *           the monkeys and update along this tree.
 *
 * @param  {array} affectedPaths - The paths that were updated.
 * @param  {array} comparedPaths - The paths that we are actually interested in.
 * @return {boolean}             - Is the update relevant to the compared
 *                                 paths?
 */


function solveUpdate(affectedPaths, comparedPaths) {
  var i, j, k, l, m, n, p, c, s; // Looping through possible paths

  for (i = 0, l = affectedPaths.length; i < l; i++) {
    p = affectedPaths[i];
    if (!p.length) return true; // Looping through logged paths

    for (j = 0, m = comparedPaths.length; j < m; j++) {
      c = comparedPaths[j];
      if (!c || !c.length) return true; // Looping through steps

      for (k = 0, n = c.length; k < n; k++) {
        s = c[k]; // If path is not relevant, we break
        // NOTE: the '!=' instead of '!==' is required here!

        if (s != p[k]) break; // If we reached last item and we are relevant

        if (k + 1 === n || k + 1 === p.length) return true;
      }
    }
  }

  return false;
}
/**
 * Non-mutative version of the splice array method.
 *
 * @param  {array}    array        - The array to splice.
 * @param  {integer}  startIndex   - The start index.
 * @param  {integer}  nb           - Number of elements to remove.
 * @param  {...mixed} elements     - Elements to append after splicing.
 * @return {array}                 - The spliced array.
 */


function splice(array, startIndex, nb) {
  for (var _len2 = arguments.length, elements = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    elements[_key2 - 3] = arguments[_key2];
  }

  if (nb === undefined && arguments.length === 2) nb = array.length - startIndex;else if (nb === null || nb === undefined) nb = 0;else if (isNaN(+nb)) throw new Error("argument nb ".concat(nb, " can not be parsed into a number!"));
  nb = Math.max(0, nb); // Solving startIndex

  if (_type["default"]["function"](startIndex)) startIndex = index(array, startIndex);
  if (_type["default"].object(startIndex)) startIndex = index(array, function (e) {
    return compare(e, startIndex);
  }); // Positive index

  if (startIndex >= 0) return array.slice(0, startIndex).concat(elements).concat(array.slice(startIndex + nb)); // Negative index

  return array.slice(0, array.length + startIndex).concat(elements).concat(array.slice(array.length + startIndex + nb));
}
/**
 * Function returning a unique incremental id each time it is called.
 *
 * @return {integer} - The latest unique id.
 */


var uniqid = function () {
  var i = 0;
  return function () {
    return i++;
  };
}();

exports.uniqid = uniqid;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./monkey":4,"./type":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monkey = exports.MonkeyDefinition = void 0;

var _type = _interopRequireDefault(require("./type"));

var _update2 = _interopRequireDefault(require("./update"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Monkey Definition class
 * Note: The only reason why this is a class is to be able to spot it within
 * otherwise ordinary data.
 *
 * @constructor
 * @param {array|object} definition - The formal definition of the monkey.
 */
var MonkeyDefinition = function MonkeyDefinition(definition) {
  var _this = this;

  _classCallCheck(this, MonkeyDefinition);

  var monkeyType = _type["default"].monkeyDefinition(definition);

  if (!monkeyType) throw (0, _helpers.makeError)('Baobab.monkey: invalid definition.', {
    definition: definition
  });
  this.type = monkeyType;

  if (this.type === 'object') {
    this.getter = definition.get;
    this.projection = definition.cursors || {};
    this.paths = Object.keys(this.projection).map(function (k) {
      return _this.projection[k];
    });
    this.options = definition.options || {};
  } else {
    var offset = 1,
        options = {};

    if (_type["default"].object(definition[definition.length - 1])) {
      offset++;
      options = definition[definition.length - 1];
    }

    this.getter = definition[definition.length - offset];
    this.projection = definition.slice(0, -offset);
    this.paths = this.projection;
    this.options = options;
  } // Coercing paths for convenience


  this.paths = this.paths.map(function (p) {
    return [].concat(p);
  }); // Does the definition contain dynamic paths

  this.hasDynamicPaths = this.paths.some(_type["default"].dynamicPath);
};
/**
 * Monkey core class
 *
 * @constructor
 * @param {Baobab}           tree       - The bound tree.
 * @param {MonkeyDefinition} definition - A definition instance.
 */


exports.MonkeyDefinition = MonkeyDefinition;

var Monkey =
/*#__PURE__*/
function () {
  function Monkey(tree, pathInTree, definition) {
    var _this2 = this;

    _classCallCheck(this, Monkey);

    // Properties
    this.tree = tree;
    this.path = pathInTree;
    this.definition = definition; // Adapting the definition's paths & projection to this monkey's case

    var projection = definition.projection,
        relative = _helpers.solveRelativePath.bind(null, pathInTree.slice(0, -1));

    if (definition.type === 'object') {
      this.projection = Object.keys(projection).reduce(function (acc, k) {
        acc[k] = relative(projection[k]);
        return acc;
      }, {});
      this.depPaths = Object.keys(this.projection).map(function (k) {
        return _this2.projection[k];
      });
    } else {
      this.projection = projection.map(relative);
      this.depPaths = this.projection;
    } // Internal state


    this.state = {
      killed: false
    };
    /**
     * Listener on the tree's `write` event.
     *
     * When the tree writes, this listener will check whether the updated paths
     * are of any use to the monkey and, if so, will update the tree's node
     * where the monkey sits.
     */

    this.writeListener = function (_ref) {
      var path = _ref.data.path;
      if (_this2.state.killed) return; // Is the monkey affected by the current write event?

      var concerned = (0, _helpers.solveUpdate)([path], _this2.relatedPaths());
      if (concerned) _this2.update();
    };
    /**
     * Listener on the tree's `monkey` event.
     *
     * When another monkey updates, this listener will check whether the
     * updated paths are of any use to the monkey and, if so, will update the
     * tree's node where the monkey sits.
     */


    this.recursiveListener = function (_ref2) {
      var _ref2$data = _ref2.data,
          monkey = _ref2$data.monkey,
          path = _ref2$data.path;
      if (_this2.state.killed) return; // Breaking if this is the same monkey

      if (_this2 === monkey) return; // Is the monkey affected by the current monkey event?

      var concerned = (0, _helpers.solveUpdate)([path], _this2.relatedPaths(false));
      if (concerned) _this2.update();
    }; // Binding listeners


    this.tree.on('write', this.writeListener);
    this.tree.on('_monkey', this.recursiveListener); // Updating relevant node

    this.update();
  }
  /**
   * Method returning solved paths related to the monkey.
   *
   * @param  {boolean} recursive - Should we compute recursive paths?
   * @return {array}             - An array of related paths.
   */


  _createClass(Monkey, [{
    key: "relatedPaths",
    value: function relatedPaths() {
      var _this3 = this;

      var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var paths;
      if (this.definition.hasDynamicPaths) paths = this.depPaths.map(function (p) {
        return (0, _helpers.getIn)(_this3.tree._data, p).solvedPath;
      });else paths = this.depPaths;
      var isRecursive = recursive && this.depPaths.some(function (p) {
        return !!_type["default"].monkeyPath(_this3.tree._monkeys, p);
      });
      if (!isRecursive) return paths;
      return paths.reduce(function (accumulatedPaths, path) {
        var monkeyPath = _type["default"].monkeyPath(_this3.tree._monkeys, path);

        if (!monkeyPath) return accumulatedPaths.concat([path]); // Solving recursive path

        var relatedMonkey = (0, _helpers.getIn)(_this3.tree._monkeys, monkeyPath).data;
        return accumulatedPaths.concat(relatedMonkey.relatedPaths());
      }, []);
    }
    /**
     * Method used to update the tree's internal data with a lazy getter holding
     * the computed data.
     *
     * @return {Monkey} - Returns itself for chaining purposes.
     */

  }, {
    key: "update",
    value: function update() {
      var _this4 = this;

      var deps = this.tree.project(this.projection);

      var lazyGetter = function (tree, def, data) {
        var cache = null,
            alreadyComputed = false;
        return function () {
          if (!alreadyComputed) {
            cache = def.getter.apply(tree, def.type === 'object' ? [data] : data);
            if (tree.options.immutable && def.options.immutable !== false) (0, _helpers.deepFreeze)(cache); // update tree affected paths

            var hash = (0, _helpers.hashPath)(_this4.path);
            tree._affectedPathsIndex[hash] = true;
            alreadyComputed = true;
          }

          return cache;
        };
      }(this.tree, this.definition, deps);

      lazyGetter.isLazyGetter = true; // Should we write the lazy getter in the tree or solve it right now?

      if (this.tree.options.lazyMonkeys) {
        this.tree._data = (0, _update2["default"])(this.tree._data, this.path, {
          type: 'monkey',
          value: lazyGetter
        }, this.tree.options).data;
      } else {
        var result = (0, _update2["default"])(this.tree._data, this.path, {
          type: 'set',
          value: lazyGetter(),
          options: {
            mutableLeaf: !this.definition.options.immutable
          }
        }, this.tree.options);
        if ('data' in result) this.tree._data = result.data;
      } // Notifying the monkey's update so we can handle recursivity


      this.tree.emit('_monkey', {
        monkey: this,
        path: this.path
      });
      return this;
    }
    /**
     * Method releasing the monkey from memory.
     */

  }, {
    key: "release",
    value: function release() {
      // Unbinding events
      this.tree.off('write', this.writeListener);
      this.tree.off('_monkey', this.recursiveListener);
      this.state.killed = true; // Deleting properties
      // NOTE: not deleting this.definition because some strange things happen
      // in the _refreshMonkeys method. See #372.

      delete this.projection;
      delete this.depPaths;
      delete this.tree;
    }
  }]);

  return Monkey;
}();

exports.Monkey = Monkey;
},{"./helpers":3,"./type":5,"./update":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _monkey = require("./monkey");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var type = {};
/**
 * Helpers
 * --------
 */

/**
 * Checking whether the given variable is of any of the given types.
 *
 * @todo   Optimize this function by dropping `some`.
 *
 * @param  {mixed} target  - Variable to test.
 * @param  {array} allowed - Array of allowed types.
 * @return {boolean}
 */

function anyOf(target, allowed) {
  return allowed.some(function (t) {
    return type[t](target);
  });
}
/**
 * Simple types
 * -------------
 */

/**
 * Checking whether the given variable is an array.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type.array = function (target) {
  return Array.isArray(target);
};
/**
 * Checking whether the given variable is an object.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type.object = function (target) {
  return target && _typeof(target) === 'object' && !Array.isArray(target) && !(target instanceof Date) && !(target instanceof RegExp) && !(typeof Map === 'function' && target instanceof Map) && !(typeof Set === 'function' && target instanceof Set);
};
/**
 * Checking whether the given variable is a string.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type.string = function (target) {
  return typeof target === 'string';
};
/**
 * Checking whether the given variable is a number.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type.number = function (target) {
  return typeof target === 'number';
};
/**
 * Checking whether the given variable is a function.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type["function"] = function (target) {
  return typeof target === 'function';
};
/**
 * Checking whether the given variable is a JavaScript primitive.
 *
 * @param  {mixed} target - Variable to test.
 * @return {boolean}
 */


type.primitive = function (target) {
  return target !== Object(target);
};
/**
 * Complex types
 * --------------
 */

/**
 * Checking whether the given variable is a valid splicer.
 *
 * @param  {mixed} target    - Variable to test.
 * @param  {array} [allowed] - Optional valid types in path.
 * @return {boolean}
 */


type.splicer = function (target) {
  if (!type.array(target) || target.length < 1) return false;
  if (target.length > 1 && isNaN(+target[1])) return false;
  return anyOf(target[0], ['number', 'function', 'object']);
};
/**
 * Checking whether the given variable is a valid cursor path.
 *
 * @param  {mixed} target    - Variable to test.
 * @param  {array} [allowed] - Optional valid types in path.
 * @return {boolean}
 */
// Order is important for performance reasons


var ALLOWED_FOR_PATH = ['string', 'number', 'function', 'object'];

type.path = function (target) {
  if (!target && target !== 0 && target !== '') return false;
  return [].concat(target).every(function (step) {
    return anyOf(step, ALLOWED_FOR_PATH);
  });
};
/**
 * Checking whether the given path is a dynamic one.
 *
 * @param  {mixed} path - The path to test.
 * @return {boolean}
 */


type.dynamicPath = function (path) {
  return path.some(function (step) {
    return type["function"](step) || type.object(step);
  });
};
/**
 * Retrieve any monkey subpath in the given path or null if the path never comes
 * across computed data.
 *
 * @param  {mixed} data - The data to test.
 * @param  {array} path - The path to test.
 * @return {boolean}
 */


type.monkeyPath = function (data, path) {
  var subpath = [];
  var c = data,
      i,
      l;

  for (i = 0, l = path.length; i < l; i++) {
    subpath.push(path[i]);
    if (_typeof(c) !== 'object') return null;
    c = c[path[i]];
    if (c instanceof _monkey.Monkey) return subpath;
  }

  return null;
};
/**
 * Check if the given object property is a lazy getter used by a monkey.
 *
 * @param  {mixed}   o           - The target object.
 * @param  {string}  propertyKey - The property to test.
 * @return {boolean}
 */


type.lazyGetter = function (o, propertyKey) {
  var descriptor = Object.getOwnPropertyDescriptor(o, propertyKey);
  return descriptor && descriptor.get && descriptor.get.isLazyGetter === true;
};
/**
 * Returns the type of the given monkey definition or `null` if invalid.
 *
 * @param  {mixed} definition - The definition to check.
 * @return {string|null}
 */


type.monkeyDefinition = function (definition) {
  if (type.object(definition)) {
    if (!type["function"](definition.get) || definition.cursors && (!type.object(definition.cursors) || !Object.keys(definition.cursors).every(function (k) {
      return type.path(definition.cursors[k]);
    }))) return null;
    return 'object';
  } else if (type.array(definition)) {
    var offset = 1;
    if (type.object(definition[definition.length - 1])) offset++;
    if (!type["function"](definition[definition.length - offset]) || !definition.slice(0, -offset).every(function (p) {
      return type.path(p);
    })) return null;
    return 'array';
  }

  return null;
};
/**
 * Checking whether the given watcher definition is valid.
 *
 * @param  {mixed}   definition - The definition to check.
 * @return {boolean}
 */


type.watcherMapping = function (definition) {
  return type.object(definition) && Object.keys(definition).every(function (k) {
    return type.path(definition[k]);
  });
};
/**
 * Checking whether the given string is a valid operation type.
 *
 * @param  {mixed} string - The string to test.
 * @return {boolean}
 */
// Ordered by likeliness


var VALID_OPERATIONS = ['set', 'apply', 'push', 'unshift', 'concat', 'pop', 'shift', 'deepMerge', 'merge', 'splice', 'unset'];

type.operationType = function (string) {
  return typeof string === 'string' && !!~VALID_OPERATIONS.indexOf(string);
};

var _default = type;
exports["default"] = _default;
},{"./monkey":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = update;

var _type = _interopRequireDefault(require("./type"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function err(operation, expectedTarget, path) {
  return (0, _helpers.makeError)("Baobab.update: cannot apply the \"".concat(operation, "\" on ") + "a non ".concat(expectedTarget, " (path: /").concat(path.join('/'), ")."), {
    path: path
  });
}
/**
 * Function aiming at applying a single update operation on the given tree's
 * data.
 *
 * @param  {mixed}  data      - The tree's data.
 * @param  {path}   path      - Path of the update.
 * @param  {object} operation - The operation to apply.
 * @param  {object} [opts]    - Optional options.
 * @return {mixed}            - Both the new tree's data and the updated node.
 */


function update(data, path, operation) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var operationType = operation.type,
      value = operation.value,
      _operation$options = operation.options,
      operationOptions = _operation$options === void 0 ? {} : _operation$options; // Dummy root, so we can shift and alter the root

  var dummy = {
    root: data
  },
      dummyPath = ['root'].concat(_toConsumableArray(path)),
      currentPath = []; // Walking the path

  var p = dummy,
      i,
      l,
      s;

  for (i = 0, l = dummyPath.length; i < l; i++) {
    // Current item's reference is therefore p[s]
    // The reason why we don't create a variable here for convenience
    // is because we actually need to mutate the reference.
    s = dummyPath[i]; // Updating the path

    if (i > 0) currentPath.push(s); // If we reached the end of the path, we apply the operation

    if (i === l - 1) {
      /**
       * Set
       */
      if (operationType === 'set') {
        // Purity check
        if (opts.pure && p[s] === value) return {
          node: p[s]
        };

        if (_type["default"].lazyGetter(p, s)) {
          Object.defineProperty(p, s, {
            value: value,
            enumerable: true,
            configurable: true
          });
        } else if (opts.persistent && !operationOptions.mutableLeaf) {
          p[s] = (0, _helpers.shallowClone)(value);
        } else {
          p[s] = value;
        }
      }
      /**
       * Monkey
       */
      else if (operationType === 'monkey') {
          Object.defineProperty(p, s, {
            get: value,
            enumerable: true,
            configurable: true
          });
        }
        /**
         * Apply
         */
        else if (operationType === 'apply') {
            var result = value(p[s]); // Purity check

            if (opts.pure && p[s] === result) return {
              node: p[s]
            };

            if (_type["default"].lazyGetter(p, s)) {
              Object.defineProperty(p, s, {
                value: result,
                enumerable: true,
                configurable: true
              });
            } else if (opts.persistent) {
              p[s] = (0, _helpers.shallowClone)(result);
            } else {
              p[s] = result;
            }
          }
          /**
           * Push
           */
          else if (operationType === 'push') {
              if (!_type["default"].array(p[s])) throw err('push', 'array', currentPath);
              if (opts.persistent) p[s] = p[s].concat([value]);else p[s].push(value);
            }
            /**
             * Unshift
             */
            else if (operationType === 'unshift') {
                if (!_type["default"].array(p[s])) throw err('unshift', 'array', currentPath);
                if (opts.persistent) p[s] = [value].concat(p[s]);else p[s].unshift(value);
              }
              /**
               * Concat
               */
              else if (operationType === 'concat') {
                  if (!_type["default"].array(p[s])) throw err('concat', 'array', currentPath);
                  if (opts.persistent) p[s] = p[s].concat(value);else p[s].push.apply(p[s], value);
                }
                /**
                 * Splice
                 */
                else if (operationType === 'splice') {
                    if (!_type["default"].array(p[s])) throw err('splice', 'array', currentPath);
                    if (opts.persistent) p[s] = _helpers.splice.apply(null, [p[s]].concat(value));else p[s].splice.apply(p[s], value);
                  }
                  /**
                   * Pop
                   */
                  else if (operationType === 'pop') {
                      if (!_type["default"].array(p[s])) throw err('pop', 'array', currentPath);
                      if (opts.persistent) p[s] = (0, _helpers.splice)(p[s], -1, 1);else p[s].pop();
                    }
                    /**
                     * Shift
                     */
                    else if (operationType === 'shift') {
                        if (!_type["default"].array(p[s])) throw err('shift', 'array', currentPath);
                        if (opts.persistent) p[s] = (0, _helpers.splice)(p[s], 0, 1);else p[s].shift();
                      }
                      /**
                       * Unset
                       */
                      else if (operationType === 'unset') {
                          if (_type["default"].object(p)) delete p[s];else if (_type["default"].array(p)) p.splice(s, 1);
                        }
                        /**
                         * Merge
                         */
                        else if (operationType === 'merge') {
                            if (!_type["default"].object(p[s])) throw err('merge', 'object', currentPath);
                            if (opts.persistent) p[s] = (0, _helpers.shallowMerge)({}, p[s], value);else p[s] = (0, _helpers.shallowMerge)(p[s], value);
                          }
                          /**
                           * Deep merge
                           */
                          else if (operationType === 'deepMerge') {
                              if (!_type["default"].object(p[s])) throw err('deepMerge', 'object', currentPath);
                              if (opts.persistent) p[s] = (0, _helpers.deepMerge)({}, p[s], value);else p[s] = (0, _helpers.deepMerge)(p[s], value);
                            } // Deep freezing the resulting value


      if (opts.immutable && !operationOptions.mutableLeaf) (0, _helpers.deepFreeze)(p);
      break;
    } // If we reached a leaf, we override by setting an empty object
    else if (_type["default"].primitive(p[s])) {
        p[s] = {};
      } // Else, we shift the reference and continue the path
      else if (opts.persistent) {
          p[s] = (0, _helpers.shallowClone)(p[s]);
        } // Should we freeze the current step before continuing?


    if (opts.immutable && l > 0) (0, _helpers.freeze)(p);
    p = p[s];
  } // If we are updating a dynamic node, we need not return the affected node


  if (_type["default"].lazyGetter(p, s)) return {
    data: dummy.root
  }; // Returning new data object

  return {
    data: dummy.root,
    node: p[s]
  };
}
},{"./helpers":3,"./type":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _emmett = _interopRequireDefault(require("emmett"));

var _cursor = _interopRequireDefault(require("./cursor"));

var _type = _interopRequireDefault(require("./type"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Watcher class.
 *
 * @constructor
 * @param {Baobab} tree     - The watched tree.
 * @param {object} mapping  - A mapping of the paths to watch in the tree.
 */
var Watcher =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Watcher, _Emitter);

  function Watcher(tree, mapping) {
    var _this;

    _classCallCheck(this, Watcher);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Watcher).call(this)); // Properties

    _this.tree = tree;
    _this.mapping = null;
    _this.state = {
      killed: false
    }; // Initializing

    _this.refresh(mapping); // Listening


    _this.handler = function (e) {
      if (_this.state.killed) return;

      var watchedPaths = _this.getWatchedPaths();

      if ((0, _helpers.solveUpdate)(e.data.paths, watchedPaths)) return _this.emit('update');
    };

    _this.tree.on('update', _this.handler);

    return _this;
  }
  /**
   * Method used to get the current watched paths.
   *
   * @return {array} - The array of watched paths.
   */


  _createClass(Watcher, [{
    key: "getWatchedPaths",
    value: function getWatchedPaths() {
      var _this2 = this;

      var rawPaths = Object.keys(this.mapping).map(function (k) {
        var v = _this2.mapping[k]; // Watcher mappings can accept a cursor

        if (v instanceof _cursor["default"]) return v.solvedPath;
        return _this2.mapping[k];
      });
      return rawPaths.reduce(function (cp, p) {
        // Handling path polymorphisms
        p = [].concat(p); // Dynamic path?

        if (_type["default"].dynamicPath(p)) p = (0, _helpers.getIn)(_this2.tree._data, p).solvedPath;
        if (!p) return cp; // Facet path?

        var monkeyPath = _type["default"].monkeyPath(_this2.tree._monkeys, p);

        if (monkeyPath) return cp.concat((0, _helpers.getIn)(_this2.tree._monkeys, monkeyPath).data.relatedPaths());
        return cp.concat([p]);
      }, []);
    }
    /**
     * Method used to return a map of the watcher's cursors.
     *
     * @return {object} - TMap of relevant cursors.
     */

  }, {
    key: "getCursors",
    value: function getCursors() {
      var _this3 = this;

      var cursors = {};
      Object.keys(this.mapping).forEach(function (k) {
        var path = _this3.mapping[k];
        if (path instanceof _cursor["default"]) cursors[k] = path;else cursors[k] = _this3.tree.select(path);
      });
      return cursors;
    }
    /**
     * Method used to refresh the watcher's mapping.
     *
     * @param  {object}  mapping  - The new mapping to apply.
     * @return {Watcher}          - Itself for chaining purposes.
     */

  }, {
    key: "refresh",
    value: function refresh(mapping) {
      if (!_type["default"].watcherMapping(mapping)) throw (0, _helpers.makeError)('Baobab.watch: invalid mapping.', {
        mapping: mapping
      });
      this.mapping = mapping; // Creating the get method

      var projection = {};

      for (var k in mapping) {
        projection[k] = mapping[k] instanceof _cursor["default"] ? mapping[k].path : mapping[k];
      }

      this.get = this.tree.project.bind(this.tree, projection);
    }
    /**
     * Methods releasing the watcher from memory.
     */

  }, {
    key: "release",
    value: function release() {
      this.tree.off('update', this.handler);
      this.state.killed = true;
      this.kill();
    }
  }]);

  return Watcher;
}(_emmett["default"]);

exports["default"] = Watcher;
},{"./cursor":2,"./helpers":3,"./type":5,"emmett":14}],8:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":9,"_process":16}],9:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":15}],10:[function(require,module,exports){
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = require('./lib/Dispatcher');

},{"./lib/Dispatcher":12}],11:[function(require,module,exports){
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var debug = require('debug')('Dispatchr:Action');

function Action(name, payload) {
    this.name = name;
    this.payload = payload;
    this._handlers = null;
    this._isExecuting = false;
    this._isCompleted = null;
}

/**
 * Gets a name from a store
 * @method getStoreName
 * @param {String|Object} store The store name or class from which to extract
 *      the name
 * @returns {String}
 */
Action.prototype.getStoreName = function getStoreName(store) {
    if ('string' === typeof store) {
        return store;
    }
    return store.storeName;
};

/**
 * Executes all handlers for the action
 * @method execute
 * @param {Function[]} handlers A mapping of store names to handler function
 * @throws {Error} if action has already been executed
 */
Action.prototype.execute = function execute(handlers) {
    if (this._isExecuting) {
        throw new Error('Action is already dispatched');
    }
    var self = this;
    this._handlers = handlers;
    this._isExecuting = true;
    this._isCompleted = {};
    Object.keys(handlers).forEach(function handlersEach(storeName) {
        self._callHandler(storeName);
    });
};

/**
 * Calls an individual store's handler function
 * @method _callHandler
 * @param {String} storeName
 * @private
 * @throws {Error} if handler does not exist for storeName
 */
Action.prototype._callHandler = function callHandler(storeName) {
    var self = this,
        handlerFn = self._handlers[storeName];
    if (!handlerFn) {
        throw new Error(storeName + ' does not have a handler for action ' + self.name);
    }
    if (self._isCompleted[storeName]) {
        return;
    }
    self._isCompleted[storeName] = false;
    debug('executing handler for ' + storeName);
    handlerFn(self.payload, self.name);
    self._isCompleted[storeName] = true;
};

/**
 * Waits until all stores have finished handling an action and then calls
 * the callback
 * @method waitFor
 * @param {String|String[]|Constructor|Constructor[]} stores An array of stores as strings or constructors to wait for
 * @param {Function} callback Called after all stores have completed handling their actions
 * @throws {Error} if the action is not being executed
 */
Action.prototype.waitFor = function waitFor(stores, callback) {
    var self = this;
    if (!self._isExecuting) {
        throw new Error('waitFor called even though there is no action being executed!');
    }
    if (!Array.isArray(stores)) {
        stores = [stores];
    }

    debug('waiting on ' + stores.join(', '));
    stores.forEach(function storesEach(storeName) {
        storeName = self.getStoreName(storeName);
        if (self._handlers[storeName]) {
            self._callHandler(storeName);
        }
    });

    callback();
};

module.exports = Action;

},{"debug":8}],12:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var Action = require('./Action');
var DEFAULT = 'default';
var DispatcherContext = require('./DispatcherContext');

/**
 * @class Dispatcher
 * @param {Object} options Dispatcher options
 * @param {Array} options.stores Array of stores to register
 * @constructor
 */
function Dispatcher (options) {
    options = options || {};
    options.stores = options.stores || [];
    this.stores = {};
    this.handlers = {};
    this.handlers[DEFAULT] = [];
    this.hasWarnedAboutNameProperty = false;
    options.stores.forEach(function (store) {
        this.registerStore(store);
    }, this);

}

Dispatcher.prototype.createContext = function createContext(context) {
    return new DispatcherContext(this, context);
};

/**
 * Registers a store so that it can handle actions.
 * @method registerStore
 * @static
 * @param {Object} store A store class to be registered. The store should have a static
 *      `name` property so that it can be loaded later.
 * @throws {Error} if store is invalid
 * @throws {Error} if store is already registered
 */
Dispatcher.prototype.registerStore = function registerStore(store) {
    if ('function' !== typeof store) {
        throw new Error('registerStore requires a constructor as first parameter');
    }
    var storeName = this.getStoreName(store);
    if (!storeName) {
        throw new Error('Store is required to have a `storeName` property.');
    }
    if (this.stores[storeName]) {
        if (this.stores[storeName] === store) {
            // Store is already registered, nothing to do
            return;
        }
        throw new Error('Store with name `' + storeName + '` has already been registered.');
    }
    this.stores[storeName] = store;
    if (store.handlers) {
        Object.keys(store.handlers).forEach(function storeHandlersEach(action) {
            var handler = store.handlers[action];
            this._registerHandler(action, storeName, handler);
        }, this);
    }
};

/**
 * Method to discover if a storeName has been registered
 * @method isRegistered
 * @static
 * @param {Object|String} store The store to check
 * @returns {boolean}
 */
Dispatcher.prototype.isRegistered = function isRegistered(store) {
    var storeName = this.getStoreName(store),
        storeInstance = this.stores[storeName];

    if (!storeInstance) {
        return false;
    }

    if ('function' === typeof store) {
        if (store !== storeInstance) {
            return false;
        }
    }
    return true;
};

/**
 * Gets a name from a store
 * @method getStoreName
 * @static
 * @param {String|Object} store The store name or class from which to extract
 *      the name
 * @returns {String}
 */
Dispatcher.prototype.getStoreName = function getStoreName(store) {
    if ('string' === typeof store) {
        return store;
    }
    if (store.storeName) {
        return store.storeName;
    }

    if (process.env.NODE_ENV !== 'production') {
        if (store.name && !this.hasWarnedAboutNameProperty) {
            console.warn('A store has been registered that relies on the ' +
                'constructor\'s name property. This name may change when you ' +
                'minify your stores during build time and could break string ' +
                'references to your store. It is advised that you add a ' +
                'static `storeName` property to your store to ensure the ' +
                'store name does not change during your build.');
            this.hasWarnedAboutNameProperty = true;
        }
    }
    return store.name;
};

/**
 * Adds a handler function to be called for the given action
 * @method registerHandler
 * @private
 * @static
 * @param {String} action Name of the action
 * @param {String} name Name of the store that handles the action
 * @param {String|Function} handler The function or name of the method that handles the action
 * @returns {number}
 */
Dispatcher.prototype._registerHandler = function registerHandler(action, name, handler) {
    this.handlers[action] = this.handlers[action] || [];
    this.handlers[action].push({
        name: this.getStoreName(name),
        handler: handler
    });
    return this.handlers.length - 1;
};

module.exports = {
    createDispatcher: function (options) {
        return new Dispatcher(options);
    }
};

}).call(this,require('_process'))
},{"./Action":11,"./DispatcherContext":13,"_process":16}],13:[function(require,module,exports){
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var Action = require('./Action');
var DEFAULT = 'default';
var debug = require('debug')('Dispatchr:DispatcherContext');

/**
 * @class Dispatcher
 * @param {Object} context The context to be used for store instances
 * @constructor
 */
function DispatcherContext (dispatcher, context) {
    this.dispatcher = dispatcher;
    this.storeInstances = {};
    this.currentAction = null;
    this.dispatcherInterface = {
        getContext: function getContext() { return context; },
        getStore: this.getStore.bind(this),
        waitFor: this.waitFor.bind(this)
    };
}

/**
 * Returns a single store instance and creates one if it doesn't already exist
 * @method getStore
 * @param {String} name The name of the instance
 * @returns {Object} The store instance
 * @throws {Error} if store is not registered
 */
DispatcherContext.prototype.getStore = function getStore(name) {
    var storeName = this.dispatcher.getStoreName(name);
    if (!this.storeInstances[storeName]) {
        var Store = this.dispatcher.stores[storeName];
        if (!Store) {
            throw new Error('Store ' + storeName + ' was not registered.');
        }
        this.storeInstances[storeName] = new (this.dispatcher.stores[storeName])(this.dispatcherInterface);
    }
    return this.storeInstances[storeName];
};

/**
 * Dispatches a new action or queues it up if one is already in progress
 * @method dispatch
 * @param {String} actionName Name of the action to be dispatched
 * @param {Object} payload Parameters to describe the action
 * @throws {Error} if store has handler registered that does not exist
 */
DispatcherContext.prototype.dispatch = function dispatch(actionName, payload) {
    if (!actionName) {
        throw new Error('actionName parameter `' + actionName + '` is invalid.');
    }
    if (this.currentAction) {
        throw new Error('Cannot call dispatch while another dispatch is executing. Attempted to execute \'' + actionName + '\' but \'' + this.currentAction.name + '\' is already executing.');
    }
    var actionHandlers = this.dispatcher.handlers[actionName] || [],
        defaultHandlers = this.dispatcher.handlers[DEFAULT] || [];
    if (!actionHandlers.length && !defaultHandlers.length) {
        debug(actionName + ' does not have any registered handlers');
        return;
    }
    debug('dispatching ' + actionName, payload);
    this.currentAction = new Action(actionName, payload);
    var self = this,
        allHandlers = actionHandlers.concat(defaultHandlers),
        handlerFns = {};

    try {
        allHandlers.forEach(function actionHandlersEach(store) {
            if (handlerFns[store.name]) {
                // Don't call the default if the store has an explicit action handler
                return;
            }
            var storeInstance = self.getStore(store.name);
            if ('function' === typeof store.handler) {
                handlerFns[store.name] = store.handler.bind(storeInstance);
            } else {
                if (!storeInstance[store.handler]) {
                    throw new Error(store.name + ' does not have a method called ' + store.handler);
                }
                handlerFns[store.name] = storeInstance[store.handler].bind(storeInstance);
            }
        });
        this.currentAction.execute(handlerFns);
    } catch (e) {
        throw e;
    } finally {
        debug('finished ' + actionName);
        this.currentAction = null;
    }
};

/**
 * Returns a raw data object representation of the current state of the
 * dispatcher and all store instances. If the store implements a shouldDehdyrate
 * function, then it will be called and only dehydrate if the method returns `true`
 * @method dehydrate
 * @returns {Object} dehydrated dispatcher data
 */
DispatcherContext.prototype.dehydrate = function dehydrate() {
    var self = this,
        stores = {};
    Object.keys(self.storeInstances).forEach(function storeInstancesEach(storeName) {
        var store = self.storeInstances[storeName];
        if (!store.dehydrate || (store.shouldDehydrate && !store.shouldDehydrate())) {
            return;
        }
        stores[storeName] = store.dehydrate();
    });
    return {
        stores: stores
    };
};

/**
 * Takes a raw data object and rehydrates the dispatcher and store instances
 * @method rehydrate
 * @param {Object} dispatcherState raw state typically retrieved from `dehydrate`
 *      method
 */
DispatcherContext.prototype.rehydrate = function rehydrate(dispatcherState) {
    var self = this;
    if (dispatcherState.stores) {
        Object.keys(dispatcherState.stores).forEach(function storeStateEach(storeName) {
            var state = dispatcherState.stores[storeName],
                store = self.getStore(storeName);
            if (store.rehydrate) {
                store.rehydrate(state);
            }
        });
    }
};

/**
 * Waits until all stores have finished handling an action and then calls
 * the callback
 * @method waitFor
 * @param {String|String[]} stores An array of stores as strings to wait for
 * @param {Function} callback Called after all stores have completed handling their actions
 * @throws {Error} if there is no action dispatching
 */
DispatcherContext.prototype.waitFor = function waitFor(stores, callback) {
    if (!this.currentAction) {
        throw new Error('waitFor called even though there is no action dispatching');
    }
    this.currentAction.waitFor(stores, callback);
};

module.exports = DispatcherContext;

},{"./Action":11,"debug":8}],14:[function(require,module,exports){
/**
 * Here is the list of every allowed parameter when using Emitter#on:
 * @type {Object}
 */
var __allowedOptions = {
  once: 'boolean',
  scope: 'object'
};

/**
 * Incremental id used to order event handlers.
 */
var __order = 0;

/**
 * A simple helper to shallowly merge two objects. The second one will "win"
 * over the first one.
 *
 * @param  {object}  o1 First target object.
 * @param  {object}  o2 Second target object.
 * @return {object}     Returns the merged object.
 */
function shallowMerge(o1, o2) {
  var o = {},
      k;

  for (k in o1) o[k] = o1[k];
  for (k in o2) o[k] = o2[k];

  return o;
}

/**
 * Is the given variable a plain JavaScript object?
 *
 * @param  {mixed}  v   Target.
 * @return {boolean}    The boolean result.
 */
function isPlainObject(v) {
  return v &&
          typeof v === 'object' &&
          !Array.isArray(v) &&
          !(v instanceof Function) &&
          !(v instanceof RegExp);
}

/**
 * Iterate over an object that may have ES6 Symbols.
 *
 * @param  {object}   object  Object on which to iterate.
 * @param  {function} fn      Iterator function.
 * @param  {object}   [scope] Optional scope.
 */
function forIn(object, fn, scope) {
  var symbols,
      k,
      i,
      l;

  for (k in object)
    fn.call(scope || null, k, object[k]);

  if (Object.getOwnPropertySymbols) {
    symbols = Object.getOwnPropertySymbols(object);

    for (i = 0, l = symbols.length; i < l; i++)
      fn.call(scope || null, symbols[i], object[symbols[i]]);
  }
}

/**
 * The emitter's constructor. It initializes the handlers-per-events store and
 * the global handlers store.
 *
 * Emitters are useful for non-DOM events communication. Read its methods
 * documentation for more information about how it works.
 *
 * @return {Emitter}         The fresh new instance.
 */
var Emitter = function() {
  this._enabled = true;

  // Dirty trick that will set the necessary properties to the emitter
  this.unbindAll();
};

/**
 * This method unbinds every handlers attached to every or any events. So, these
 * functions will no more be executed when the related events are emitted. If
 * the functions were not bound to the events, nothing will happen, and no error
 * will be thrown.
 *
 * Usage:
 * ******
 * > myEmitter.unbindAll();
 *
 * @return {Emitter}      Returns this.
 */
Emitter.prototype.unbindAll = function() {

  this._handlers = {};
  this._handlersAll = [];
  this._handlersComplex = [];

  return this;
};


/**
 * This method binds one or more functions to the emitter, handled to one or a
 * suite of events. So, these functions will be executed anytime one related
 * event is emitted.
 *
 * It is also possible to bind a function to any emitted event by not specifying
 * any event to bind the function to.
 *
 * Recognized options:
 * *******************
 *  - {?boolean} once   If true, the handlers will be unbound after the first
 *                      execution. Default value: false.
 *  - {?object}  scope  If a scope is given, then the listeners will be called
 *                      with this scope as "this".
 *
 * Variant 1:
 * **********
 * > myEmitter.on('myEvent', function(e) { console.log(e); });
 * > // Or:
 * > myEmitter.on('myEvent', function(e) { console.log(e); }, { once: true });
 *
 * @param  {EventName} event   The event to listen to.
 * @param  {Handler}   handler The function to bind.
 * @param  {?object}   options Some options.
 * @return {Emitter}           Returns this.
 *
 * Variant 2:
 * **********
 * > myEmitter.on(
 * >   ['myEvent1', 'myEvent2'],
 * >   function(e) { console.log(e); }
 * > );
 * > // Or:
 * > myEmitter.on(
 * >   ['myEvent1', 'myEvent2'],
 * >   function(e) { console.log(e); }
 * >   { once: true }}
 * > );
 *
 * @param  {EventName[]} events  The events to listen to.
 * @param  {Handler}     handler The function to bind.
 * @param  {?object}     options Some options.
 * @return {Emitter}             Returns this.
 *
 * Variant 3:
 * **********
 * > myEmitter.on({
 * >   myEvent1: function(e) { console.log(e); },
 * >   myEvent2: function(e) { console.log(e); }
 * > });
 * > // Or:
 * > myEmitter.on({
 * >   myEvent1: function(e) { console.log(e); },
 * >   myEvent2: function(e) { console.log(e); }
 * > }, { once: true });
 *
 * @param  {Object<EventName, Handler>} bindings An object containing
 *                                               pairs event / function.
 * @param  {?object}                    options  Some options.
 * @return {Emitter}                             Returns this.
 *
 * Variant 4:
 * **********
 * > myEmitter.on(function(e) { console.log(e); });
 * > // Or:
 * > myEmitter.on(function(e) { console.log(e); }, { once: true });
 *
 * @param  {Handler} handler The function to bind to every events.
 * @param  {?object} options Some options.
 * @return {Emitter}         Returns this.
 */
Emitter.prototype.on = function(a, b, c) {
  var i,
      l,
      k,
      event,
      eArray,
      handlersList,
      bindingObject;

  // Variant 3
  if (isPlainObject(a)) {
    forIn(a, function(name, fn) {
      this.on(name, fn, b);
    }, this);

    return this;
  }

  // Variant 4
  if (typeof a === 'function') {
    c = b;
    b = a;
    a = null;
  }

  eArray = [].concat(a);

  for (i = 0, l = eArray.length; i < l; i++) {
    event = eArray[i];

    bindingObject = {
      order: __order++,
      fn: b
    };

    // Defining the list in which the handler should be inserted
    if (typeof event === 'string' || typeof event === 'symbol') {
      if (!this._handlers[event])
        this._handlers[event] = [];
      handlersList = this._handlers[event];
      bindingObject.type = event;
    }
    else if (event instanceof RegExp) {
      handlersList = this._handlersComplex;
      bindingObject.pattern = event;
    }
    else if (event === null) {
      handlersList = this._handlersAll;
    }
    else {
      throw Error('Emitter.on: invalid event.');
    }

    // Appending needed properties
    for (k in c || {})
      if (__allowedOptions[k])
        bindingObject[k] = c[k];

    handlersList.push(bindingObject);
  }

  return this;
};


/**
 * This method works exactly as the previous #on, but will add an options object
 * if none is given, and set the option "once" to true.
 *
 * The polymorphism works exactly as with the #on method.
 */
Emitter.prototype.once = function() {
  var args = Array.prototype.slice.call(arguments),
      li = args.length - 1;

  if (isPlainObject(args[li]) && args.length > 1)
    args[li] = shallowMerge(args[li], {once: true});
  else
    args.push({once: true});

  return this.on.apply(this, args);
};


/**
 * This method unbinds one or more functions from events of the emitter. So,
 * these functions will no more be executed when the related events are emitter.
 * If the functions were not bound to the events, nothing will happen, and no
 * error will be thrown.
 *
 * Variant 1:
 * **********
 * > myEmitter.off('myEvent', myHandler);
 *
 * @param  {EventName} event   The event to unbind the handler from.
 * @param  {Handler}   handler The function to unbind.
 * @return {Emitter}           Returns this.
 *
 * Variant 2:
 * **********
 * > myEmitter.off(['myEvent1', 'myEvent2'], myHandler);
 *
 * @param  {EventName[]} events  The events to unbind the handler from.
 * @param  {Handler}     handler The function to unbind.
 * @return {Emitter}             Returns this.
 *
 * Variant 3:
 * **********
 * > myEmitter.off({
 * >   myEvent1: myHandler1,
 * >   myEvent2: myHandler2
 * > });
 *
 * @param  {Object<EventName, Handler>} bindings An object containing pairs
 *                                               event / function.
 * @return {Emitter}                             Returns this.
 *
 * Variant 4:
 * **********
 * > myEmitter.off(myHandler);
 *
 * @param  {Handler} handler The function to unbind from every events.
 * @return {Emitter}         Returns this.
 *
 * Variant 5:
 * **********
 * > myEmitter.off(event);
 *
 * @param  {EventName} event The event we should unbind.
 * @return {Emitter}         Returns this.
 */
function filter(target, fn) {
  target = target || [];

  var a = [],
      l,
      i;

  for (i = 0, l = target.length; i < l; i++)
    if (target[i].fn !== fn)
      a.push(target[i]);

  return a;
}

Emitter.prototype.off = function(events, fn) {
  var i,
      n,
      k,
      event;

  // Variant 4:
  if (arguments.length === 1 && typeof events === 'function') {
    fn = arguments[0];

    var keys = Object.keys(this._handlers)
      .concat(Object.getOwnPropertySymbols(this._handlers));

    // Handlers bound to events:
    for (i = 0; i < keys.length; i++) {
      k = keys[i];

      this._handlers[k] = filter(this._handlers[k], fn);

      if (this._handlers[k].length === 0)
        delete this._handlers[k];
    }

    // Generic Handlers
    this._handlersAll = filter(this._handlersAll, fn);

    // Complex handlers
    this._handlersComplex = filter(this._handlersComplex, fn);
  }

  // Variant 5
  else if (arguments.length === 1 &&
            (typeof events === 'string' || typeof events === 'symbol')) {
    delete this._handlers[events];
  }

  // Variant 1 and 2:
  else if (arguments.length === 2) {
    var eArray = [].concat(events);

    for (i = 0, n = eArray.length; i < n; i++) {
      event = eArray[i];

      this._handlers[event] = filter(this._handlers[event], fn);

      if ((this._handlers[event] || []).length === 0)
        delete this._handlers[event];
    }
  }

  // Variant 3
  else if (isPlainObject(events)) {
    forIn(events, this.off, this);
  }

  return this;
};

/**
 * This method retrieve the listeners attached to a particular event.
 *
 * @param  {?EventName} event Name of the event.
 * @return {array}            Array of handler functions.
 */
Emitter.prototype.listeners = function(event) {
  var handlers = this._handlersAll || [],
      complex = false,
      h,
      i,
      l;

  if (!event)
    throw Error('Emitter.listeners: no event provided.');

  handlers = handlers.concat(this._handlers[event] || []);

  for (i = 0, l = this._handlersComplex.length; i < l; i++) {
    h = this._handlersComplex[i];

    if (typeof event === 'string' && ~event.search(h.pattern)) {
      complex = true;
      handlers.push(h);
    }
  }

  // If we have any complex handlers, we need to sort
  if (this._handlersAll.length || complex)
    return handlers.sort(function(a, b) {
      return a.order - b.order;
    });
  else
    return handlers.slice(0);
};

/**
 * This method emits the specified event(s), and executes every handlers bound
 * to the event(s).
 *
 * Variant 1:
 * **********
 * > myEmitter.emit('myEvent');
 * > myEmitter.emit('myEvent', myData);
 *
 * @param  {EventName} event The event to emit.
 * @param  {object?}   data  Some data.
 * @return {Emitter}         Returns this.
 *
 * Variant 2:
 * **********
 * > myEmitter.emit(['myEvent1', 'myEvent2']);
 * > myEmitter.emit(['myEvent1', 'myEvent2'], myData);
 *
 * @param  {EventName[]} events The events to emit.
 * @param  {object?}     data   Some data.
 * @return {Emitter}            Returns this.
 *
 * Variant 3:
 * **********
 * > myEmitter.emit({myEvent1: myData1, myEvent2: myData2});
 *
 * @param  {Object<EventName, any>} events The events to emit.
 * @return {Emitter}                       Returns this.
 */
Emitter.prototype.emit = function(events, data) {

  // Short exit if the emitter is disabled
  if (!this._enabled)
    return this;

  // Object variant
  if (isPlainObject(events)) {
    forIn(events, this.emit, this);
    return this;
  }

  var eArray = [].concat(events),
      onces = [],
      event,
      parent,
      handlers,
      handler,
      i,
      j,
      l,
      m;

  for (i = 0, l = eArray.length; i < l; i++) {
    handlers = this.listeners(eArray[i]);

    for (j = 0, m = handlers.length; j < m; j++) {
      handler = handlers[j];
      event = {
        type: eArray[i],
        target: this
      };

      if (arguments.length > 1)
        event.data = data;

      handler.fn.call('scope' in handler ? handler.scope : this, event);

      if (handler.once)
        onces.push(handler);
    }

    // Cleaning onces
    for (j = onces.length - 1; j >= 0; j--) {
      if (onces[j].type)
        parent = this._handlers[onces[j].type];
      else if (onces[j].pattern)
        parent = this._handlersComplex;
      else
        parent = this._handlersAll;

      var onceIndex = parent.indexOf(onces[j]);
      if (onceIndex !== -1) {
        parent.splice(onceIndex, 1);
      }
    }
  }

  return this;
};


/**
 * This method will unbind all listeners and make it impossible to ever rebind
 * any listener to any event.
 */
Emitter.prototype.kill = function() {

  this.unbindAll();
  this._handlers = null;
  this._handlersAll = null;
  this._handlersComplex = null;
  this._enabled = false;

  // Nooping methods
  this.unbindAll =
  this.on =
  this.once =
  this.off =
  this.emit =
  this.listeners = Function.prototype;
};


/**
 * This method disabled the emitter, which means its emit method will do
 * nothing.
 *
 * @return {Emitter} Returns this.
 */
Emitter.prototype.disable = function() {
  this._enabled = false;

  return this;
};


/**
 * This method enables the emitter.
 *
 * @return {Emitter} Returns this.
 */
Emitter.prototype.enable = function() {
  this._enabled = true;

  return this;
};


/**
 * Version:
 */
Emitter.version = '3.2.0';


/**
 * Export:
 */
module.exports = Emitter;

},{}],15:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],16:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],17:[function(require,module,exports){
(function (global){
'use strict';

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _dispatchr = require('dispatchr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When requiring Angular it is added to global for some reason
var angular = global.angular || require('angular') && global.angular;

// Dependencies


var angularModule = angular.module;
var registeredStores = [];
var autoInjectStores = false;
var useEvalAsync = true;

// A function that creates stores
function createStore(name) {
  var spec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var immutableDefaults = arguments[2];
  var flux = arguments[3];

  // Constructor of a yahoo dispatchr store
  var Store = function Store(dispatcher) {
    this.dispatcher = dispatcher;

    // Check if store exists when waiting for it
    this.waitFor = function (stores, cb) {
      stores = Array.isArray(stores) ? stores : [stores];
      if (!flux.areStoresRegistered(stores)) {
        throw new Error('Waiting for stores that are not injected into Angular yet, ' + stores.join(', ') + '. Be sure to inject stores before waiting for them');
      }
      this.dispatcher.waitFor(stores, cb.bind(this));
    };

    if (!this.initialize) {
      throw new Error('Store ' + name + ' does not have an initialize method which is is necessary to set the initial state');
    }

    this.initialize();
  };

  // Add constructor properties, as required by Yahoo Dispatchr
  Store.handlers = spec.handlers;
  Store.storeName = name;

  // Instantiates immutable state and saves it to private variable that can be used for setting listeners
  Store.prototype.immutable = function (initialState) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.__tree) {
      this.__tree.set(initialState);
    } else {
      this.__tree = new _baobab2.default(initialState, angular.extend({}, immutableDefaults, options));
    }
    return this.__tree;
  };

  Store.prototype.monkey = _baobab2.default.monkey;

  // Attach store definition to the prototype
  Object.keys(spec).forEach(function (key) {
    Store.prototype[key] = spec[key];
  });

  return Store;
}

// Flux Service is a wrapper for the Yahoo Dispatchr
var FluxService = function FluxService(immutableDefaults) {
  this.stores = [];
  this.dispatcherInstance = (0, _dispatchr.createDispatcher)();
  this.dispatcher = this.dispatcherInstance.createContext();

  this.dispatch = function () {
    if (registeredStores.length) {
      console.warn('There are still stores not injected: ' + registeredStores.join(',') + '. Make sure to manually inject all stores before running any dispatches or set autoInjectStores to true.'); // eslint-disable-line no-console
    }
    this.dispatcher.dispatch.apply(this.dispatcher, arguments);
  };

  this.createStore = function (name, spec) {
    var store = createStore(name, spec, immutableDefaults, this);
    var storeInstance = void 0;

    // Create the exports object
    store.exports = {};

    this.dispatcherInstance.registerStore(store);
    this.stores.push(store);

    // Add cloning to exports

    if (!spec.exports) {
      throw new Error('You have to add an exports object to your store: ' + name);
    }

    storeInstance = this.dispatcher.getStore(store);
    Object.keys(spec.exports).forEach(function (key) {
      // Create a getter
      var descriptor = Object.getOwnPropertyDescriptor(spec.exports, key);
      if (descriptor.get) {
        Object.defineProperty(store.exports, key, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          get: function get() {
            return descriptor.get.apply(storeInstance);
          }
        });
      } else {
        store.exports[key] = function () {
          return spec.exports[key].apply(storeInstance, arguments);
        };
        spec.exports[key] = spec.exports[key].bind(storeInstance);
      }
    });

    return store.exports;
  };

  this.getStore = function (storeExport) {
    var store = this.stores.filter(function (s) {
      return s.exports === storeExport;
    })[0];
    return this.dispatcher.getStore(store);
  };

  this.areStoresRegistered = function (stores) {
    var storeNames = this.stores.map(function (store) {
      return store.storeName;
    });
    return stores.every(function (storeName) {
      return storeNames.indexOf(storeName) > -1;
    });
  };

  this.reset = function () {
    this.dispatcherInstance.stores = {};
    this.dispatcherInstance.handlers = {};
    this.stores = [];
    registeredStores = [];
  };

  // Expose Baobab in case user wants access to it for use outside a store
  this.Baobab = _baobab2.default;
};

// Wrap "angular.module" to attach store method to module instance
angular.module = function () {
  // Call the module as normaly and grab the instance
  var moduleInstance = angularModule.apply(angular, arguments);

  // Attach store method to instance
  moduleInstance.store = function (storeName, storeDefinition) {

    // Add to stores array
    registeredStores.push(storeName);

    // Create a new store
    this.factory(storeName, ['$injector', 'flux', function ($injector, flux) {
      var storeConfig = $injector.invoke(storeDefinition);
      registeredStores.splice(registeredStores.indexOf(storeName), 1);
      return flux.createStore(storeName, storeConfig);
    }]);

    return this;
  };

  return moduleInstance;
};

angular.module('flux', []).provider('flux', function FluxProvider() {
  var immutableDefaults = {};

  // Defaults that are passed on to Baobab: https://github.com/Yomguithereal/baobab#options
  this.setImmutableDefaults = function (defaults) {
    immutableDefaults = defaults;
  };

  this.autoInjectStores = function (val) {
    autoInjectStores = val;
  };

  this.useEvalAsync = function (val) {
    useEvalAsync = val;
  };

  this.$get = [function fluxFactory() {
    return new FluxService(immutableDefaults);
  }];
}).run(['$rootScope', '$injector', 'flux', function ($rootScope, $injector, flux) {
  if (angular.mock) {
    flux.reset();
  }

  if (!angular.mock && autoInjectStores) {
    $injector.invoke(registeredStores.concat(angular.noop));
  }

  // Extend scopes with $listenTo
  $rootScope.constructor.prototype.$listenTo = function (storeExport, mapping, callback) {
    var _this = this;

    var cursor = void 0;
    var store = flux.getStore(storeExport);

    if (!store.__tree) {
      throw new Error('Store ' + storeExport.storeName + ' has not defined state with this.immutable() which is required in order to use $listenTo');
    }

    if (!callback) {
      callback = mapping;
      cursor = store.__tree;
    } else {
      cursor = store.__tree.select(mapping);
    }

    if (useEvalAsync) {
      var originalCallback = callback;
      callback = function callback(e) {
        _this.$evalAsync(function () {
          return originalCallback(e);
        });
      };
    }

    cursor.on('update', callback);

    // Call the callback so that state gets the initial sync with the view-model variables
    callback({});

    // Remove the listeners on the store when scope is destroyed (GC)
    this.$on('$destroy', function () {
      return cursor.off('update', callback);
    });
  };
}]);

module.exports = 'flux';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsdXgtYW5ndWxhci5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwiZ2xvYmFsIiwicmVxdWlyZSIsImFuZ3VsYXJNb2R1bGUiLCJtb2R1bGUiLCJyZWdpc3RlcmVkU3RvcmVzIiwiYXV0b0luamVjdFN0b3JlcyIsInVzZUV2YWxBc3luYyIsImNyZWF0ZVN0b3JlIiwibmFtZSIsInNwZWMiLCJpbW11dGFibGVEZWZhdWx0cyIsImZsdXgiLCJTdG9yZSIsImRpc3BhdGNoZXIiLCJ3YWl0Rm9yIiwic3RvcmVzIiwiY2IiLCJBcnJheSIsImlzQXJyYXkiLCJhcmVTdG9yZXNSZWdpc3RlcmVkIiwiRXJyb3IiLCJqb2luIiwiYmluZCIsImluaXRpYWxpemUiLCJoYW5kbGVycyIsInN0b3JlTmFtZSIsInByb3RvdHlwZSIsImltbXV0YWJsZSIsImluaXRpYWxTdGF0ZSIsIm9wdGlvbnMiLCJfX3RyZWUiLCJzZXQiLCJCYW9iYWIiLCJleHRlbmQiLCJtb25rZXkiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsIkZsdXhTZXJ2aWNlIiwiZGlzcGF0Y2hlckluc3RhbmNlIiwiY3JlYXRlQ29udGV4dCIsImRpc3BhdGNoIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJhcHBseSIsImFyZ3VtZW50cyIsInN0b3JlIiwic3RvcmVJbnN0YW5jZSIsImV4cG9ydHMiLCJyZWdpc3RlclN0b3JlIiwicHVzaCIsImdldFN0b3JlIiwiZGVzY3JpcHRvciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsInN0b3JlRXhwb3J0IiwiZmlsdGVyIiwicyIsInN0b3JlTmFtZXMiLCJtYXAiLCJldmVyeSIsImluZGV4T2YiLCJyZXNldCIsIm1vZHVsZUluc3RhbmNlIiwic3RvcmVEZWZpbml0aW9uIiwiZmFjdG9yeSIsIiRpbmplY3RvciIsInN0b3JlQ29uZmlnIiwiaW52b2tlIiwic3BsaWNlIiwicHJvdmlkZXIiLCJGbHV4UHJvdmlkZXIiLCJzZXRJbW11dGFibGVEZWZhdWx0cyIsImRlZmF1bHRzIiwidmFsIiwiJGdldCIsImZsdXhGYWN0b3J5IiwicnVuIiwiJHJvb3RTY29wZSIsIm1vY2siLCJjb25jYXQiLCJub29wIiwiY29uc3RydWN0b3IiLCIkbGlzdGVuVG8iLCJtYXBwaW5nIiwiY2FsbGJhY2siLCJjdXJzb3IiLCJzZWxlY3QiLCJvcmlnaW5hbENhbGxiYWNrIiwiZSIsIiRldmFsQXN5bmMiLCJvbiIsIiRvbiIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7QUFJQTs7OztBQUNBOzs7O0FBTEE7QUFDQSxJQUFNQSxVQUFVQyxPQUFPRCxPQUFQLElBQWtCRSxRQUFRLFNBQVIsS0FBc0JELE9BQU9ELE9BQS9EOztBQUVBOzs7QUFJQSxJQUFNRyxnQkFBZ0JILFFBQVFJLE1BQTlCO0FBQ0EsSUFBSUMsbUJBQW1CLEVBQXZCO0FBQ0EsSUFBSUMsbUJBQW1CLEtBQXZCO0FBQ0EsSUFBSUMsZUFBZSxJQUFuQjs7QUFFQTtBQUNBLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQStEO0FBQUEsTUFBcENDLElBQW9DLHVFQUE3QixFQUE2QjtBQUFBLE1BQXpCQyxpQkFBeUI7QUFBQSxNQUFOQyxJQUFNOztBQUM3RDtBQUNBLE1BQU1DLFFBQVEsU0FBUkEsS0FBUSxDQUFVQyxVQUFWLEVBQXNCO0FBQ2xDLFNBQUtBLFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLFVBQVVDLE1BQVYsRUFBa0JDLEVBQWxCLEVBQXNCO0FBQ25DRCxlQUFTRSxNQUFNQyxPQUFOLENBQWNILE1BQWQsSUFBd0JBLE1BQXhCLEdBQWlDLENBQUNBLE1BQUQsQ0FBMUM7QUFDQSxVQUFJLENBQUNKLEtBQUtRLG1CQUFMLENBQXlCSixNQUF6QixDQUFMLEVBQXVDO0FBQ3JDLGNBQU0sSUFBSUssS0FBSixDQUFVLGdFQUFnRUwsT0FBT00sSUFBUCxDQUFZLElBQVosQ0FBaEUsR0FBb0Ysb0RBQTlGLENBQU47QUFDRDtBQUNELFdBQUtSLFVBQUwsQ0FBZ0JDLE9BQWhCLENBQXdCQyxNQUF4QixFQUFnQ0MsR0FBR00sSUFBSCxDQUFRLElBQVIsQ0FBaEM7QUFDRCxLQU5EOztBQVFBLFFBQUksQ0FBQyxLQUFLQyxVQUFWLEVBQXNCO0FBQ3BCLFlBQU0sSUFBSUgsS0FBSixDQUFVLFdBQVdaLElBQVgsR0FBa0Isb0ZBQTVCLENBQU47QUFDRDs7QUFFRCxTQUFLZSxVQUFMO0FBQ0QsR0FqQkQ7O0FBbUJBO0FBQ0FYLFFBQU1ZLFFBQU4sR0FBaUJmLEtBQUtlLFFBQXRCO0FBQ0FaLFFBQU1hLFNBQU4sR0FBa0JqQixJQUFsQjs7QUFFQTtBQUNBSSxRQUFNYyxTQUFOLENBQWdCQyxTQUFoQixHQUE0QixVQUFVQyxZQUFWLEVBQXNDO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUNoRSxRQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDZixXQUFLQSxNQUFMLENBQVlDLEdBQVosQ0FBZ0JILFlBQWhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0UsTUFBTCxHQUFjLElBQUlFLGdCQUFKLENBQVdKLFlBQVgsRUFBeUI3QixRQUFRa0MsTUFBUixDQUFlLEVBQWYsRUFBbUJ2QixpQkFBbkIsRUFBc0NtQixPQUF0QyxDQUF6QixDQUFkO0FBQ0Q7QUFDRCxXQUFPLEtBQUtDLE1BQVo7QUFDRCxHQVBEOztBQVNBbEIsUUFBTWMsU0FBTixDQUFnQlEsTUFBaEIsR0FBeUJGLGlCQUFPRSxNQUFoQzs7QUFFQTtBQUNBQyxTQUFPQyxJQUFQLENBQVkzQixJQUFaLEVBQWtCNEIsT0FBbEIsQ0FBMEIsVUFBVUMsR0FBVixFQUFlO0FBQ3ZDMUIsVUFBTWMsU0FBTixDQUFnQlksR0FBaEIsSUFBdUI3QixLQUFLNkIsR0FBTCxDQUF2QjtBQUNELEdBRkQ7O0FBSUEsU0FBTzFCLEtBQVA7QUFDRDs7QUFFRDtBQUNBLElBQU0yQixjQUFjLFNBQWRBLFdBQWMsQ0FBVTdCLGlCQUFWLEVBQTZCO0FBQy9DLE9BQUtLLE1BQUwsR0FBYyxFQUFkO0FBQ0EsT0FBS3lCLGtCQUFMLEdBQTBCLGtDQUExQjtBQUNBLE9BQUszQixVQUFMLEdBQWtCLEtBQUsyQixrQkFBTCxDQUF3QkMsYUFBeEIsRUFBbEI7O0FBRUEsT0FBS0MsUUFBTCxHQUFnQixZQUFZO0FBQzFCLFFBQUl0QyxpQkFBaUJ1QyxNQUFyQixFQUE2QjtBQUMzQkMsY0FBUUMsSUFBUixDQUFhLDBDQUEwQ3pDLGlCQUFpQmlCLElBQWpCLENBQXNCLEdBQXRCLENBQTFDLEdBQXVFLDBHQUFwRixFQUQyQixDQUNzSztBQUNsTTtBQUNELFNBQUtSLFVBQUwsQ0FBZ0I2QixRQUFoQixDQUF5QkksS0FBekIsQ0FBK0IsS0FBS2pDLFVBQXBDLEVBQWdEa0MsU0FBaEQ7QUFDRCxHQUxEOztBQU9BLE9BQUt4QyxXQUFMLEdBQW1CLFVBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3ZDLFFBQU11QyxRQUFRekMsWUFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0JDLGlCQUF4QixFQUEyQyxJQUEzQyxDQUFkO0FBQ0EsUUFBSXVDLHNCQUFKOztBQUVBO0FBQ0FELFVBQU1FLE9BQU4sR0FBZ0IsRUFBaEI7O0FBRUEsU0FBS1Ysa0JBQUwsQ0FBd0JXLGFBQXhCLENBQXNDSCxLQUF0QztBQUNBLFNBQUtqQyxNQUFMLENBQVlxQyxJQUFaLENBQWlCSixLQUFqQjs7QUFFQTs7QUFFQSxRQUFJLENBQUN2QyxLQUFLeUMsT0FBVixFQUFtQjtBQUNqQixZQUFNLElBQUk5QixLQUFKLENBQVUsc0RBQXNEWixJQUFoRSxDQUFOO0FBQ0Q7O0FBRUR5QyxvQkFBZ0IsS0FBS3BDLFVBQUwsQ0FBZ0J3QyxRQUFoQixDQUF5QkwsS0FBekIsQ0FBaEI7QUFDQWIsV0FBT0MsSUFBUCxDQUFZM0IsS0FBS3lDLE9BQWpCLEVBQTBCYixPQUExQixDQUFrQyxVQUFVQyxHQUFWLEVBQWU7QUFDL0M7QUFDQSxVQUFNZ0IsYUFBYW5CLE9BQU9vQix3QkFBUCxDQUFnQzlDLEtBQUt5QyxPQUFyQyxFQUE4Q1osR0FBOUMsQ0FBbkI7QUFDQSxVQUFJZ0IsV0FBV0UsR0FBZixFQUFvQjtBQUNsQnJCLGVBQU9zQixjQUFQLENBQXNCVCxNQUFNRSxPQUE1QixFQUFxQ1osR0FBckMsRUFBMEM7QUFDeENvQixzQkFBWUosV0FBV0ksVUFEaUI7QUFFeENDLHdCQUFjTCxXQUFXSyxZQUZlO0FBR3hDSCxlQUFLO0FBQUEsbUJBQU1GLFdBQVdFLEdBQVgsQ0FBZVYsS0FBZixDQUFxQkcsYUFBckIsQ0FBTjtBQUFBO0FBSG1DLFNBQTFDO0FBS0QsT0FORCxNQU1PO0FBQ0xELGNBQU1FLE9BQU4sQ0FBY1osR0FBZCxJQUFxQixZQUFZO0FBQy9CLGlCQUFPN0IsS0FBS3lDLE9BQUwsQ0FBYVosR0FBYixFQUFrQlEsS0FBbEIsQ0FBd0JHLGFBQXhCLEVBQXVDRixTQUF2QyxDQUFQO0FBQ0QsU0FGRDtBQUdBdEMsYUFBS3lDLE9BQUwsQ0FBYVosR0FBYixJQUFvQjdCLEtBQUt5QyxPQUFMLENBQWFaLEdBQWIsRUFBa0JoQixJQUFsQixDQUF1QjJCLGFBQXZCLENBQXBCO0FBQ0Q7QUFFRixLQWhCRDs7QUFrQkEsV0FBT0QsTUFBTUUsT0FBYjtBQUVELEdBckNEOztBQXVDQSxPQUFLRyxRQUFMLEdBQWdCLFVBQVVPLFdBQVYsRUFBdUI7QUFDckMsUUFBTVosUUFBUSxLQUFLakMsTUFBTCxDQUFZOEMsTUFBWixDQUFtQjtBQUFBLGFBQUtDLEVBQUVaLE9BQUYsS0FBY1UsV0FBbkI7QUFBQSxLQUFuQixFQUFtRCxDQUFuRCxDQUFkO0FBQ0EsV0FBTyxLQUFLL0MsVUFBTCxDQUFnQndDLFFBQWhCLENBQXlCTCxLQUF6QixDQUFQO0FBQ0QsR0FIRDs7QUFLQSxPQUFLN0IsbUJBQUwsR0FBMkIsVUFBVUosTUFBVixFQUFrQjtBQUMzQyxRQUFNZ0QsYUFBYSxLQUFLaEQsTUFBTCxDQUFZaUQsR0FBWixDQUFnQjtBQUFBLGFBQVNoQixNQUFNdkIsU0FBZjtBQUFBLEtBQWhCLENBQW5CO0FBQ0EsV0FBT1YsT0FBT2tELEtBQVAsQ0FBYTtBQUFBLGFBQWFGLFdBQVdHLE9BQVgsQ0FBbUJ6QyxTQUFuQixJQUFnQyxDQUFDLENBQTlDO0FBQUEsS0FBYixDQUFQO0FBQ0QsR0FIRDs7QUFLQSxPQUFLMEMsS0FBTCxHQUFhLFlBQVk7QUFDdkIsU0FBSzNCLGtCQUFMLENBQXdCekIsTUFBeEIsR0FBaUMsRUFBakM7QUFDQSxTQUFLeUIsa0JBQUwsQ0FBd0JoQixRQUF4QixHQUFtQyxFQUFuQztBQUNBLFNBQUtULE1BQUwsR0FBYyxFQUFkO0FBQ0FYLHVCQUFtQixFQUFuQjtBQUNELEdBTEQ7O0FBT0E7QUFDQSxPQUFLNEIsTUFBTCxHQUFjQSxnQkFBZDtBQUNELENBdEVEOztBQXdFQTtBQUNBakMsUUFBUUksTUFBUixHQUFpQixZQUFZO0FBQzNCO0FBQ0EsTUFBTWlFLGlCQUFpQmxFLGNBQWM0QyxLQUFkLENBQW9CL0MsT0FBcEIsRUFBNkJnRCxTQUE3QixDQUF2Qjs7QUFFQTtBQUNBcUIsaUJBQWVwQixLQUFmLEdBQXVCLFVBQVV2QixTQUFWLEVBQXFCNEMsZUFBckIsRUFBc0M7O0FBRTNEO0FBQ0FqRSxxQkFBaUJnRCxJQUFqQixDQUFzQjNCLFNBQXRCOztBQUVBO0FBQ0EsU0FBSzZDLE9BQUwsQ0FBYTdDLFNBQWIsRUFBd0IsQ0FBQyxXQUFELEVBQWMsTUFBZCxFQUFzQixVQUFVOEMsU0FBVixFQUFxQjVELElBQXJCLEVBQTJCO0FBQ3ZFLFVBQU02RCxjQUFjRCxVQUFVRSxNQUFWLENBQWlCSixlQUFqQixDQUFwQjtBQUNBakUsdUJBQWlCc0UsTUFBakIsQ0FBd0J0RSxpQkFBaUI4RCxPQUFqQixDQUF5QnpDLFNBQXpCLENBQXhCLEVBQTZELENBQTdEO0FBQ0EsYUFBT2QsS0FBS0osV0FBTCxDQUFpQmtCLFNBQWpCLEVBQTRCK0MsV0FBNUIsQ0FBUDtBQUNELEtBSnVCLENBQXhCOztBQU1BLFdBQU8sSUFBUDtBQUNELEdBYkQ7O0FBZUEsU0FBT0osY0FBUDtBQUNELENBckJEOztBQXVCQXJFLFFBQVFJLE1BQVIsQ0FBZSxNQUFmLEVBQXVCLEVBQXZCLEVBQ0d3RSxRQURILENBQ1ksTUFEWixFQUNvQixTQUFTQyxZQUFULEdBQXlCO0FBQ3pDLE1BQUlsRSxvQkFBb0IsRUFBeEI7O0FBRUE7QUFDQSxPQUFLbUUsb0JBQUwsR0FBNEIsVUFBVUMsUUFBVixFQUFvQjtBQUM5Q3BFLHdCQUFvQm9FLFFBQXBCO0FBQ0QsR0FGRDs7QUFJQSxPQUFLekUsZ0JBQUwsR0FBd0IsVUFBUzBFLEdBQVQsRUFBYztBQUNwQzFFLHVCQUFtQjBFLEdBQW5CO0FBQ0QsR0FGRDs7QUFJQSxPQUFLekUsWUFBTCxHQUFvQixVQUFTeUUsR0FBVCxFQUFjO0FBQ2hDekUsbUJBQWV5RSxHQUFmO0FBQ0QsR0FGRDs7QUFJQSxPQUFLQyxJQUFMLEdBQVksQ0FBQyxTQUFTQyxXQUFULEdBQXdCO0FBQ25DLFdBQU8sSUFBSTFDLFdBQUosQ0FBZ0I3QixpQkFBaEIsQ0FBUDtBQUNELEdBRlcsQ0FBWjtBQUdELENBcEJILEVBcUJHd0UsR0FyQkgsQ0FxQk8sQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixNQUE1QixFQUFvQyxVQUFVQyxVQUFWLEVBQXNCWixTQUF0QixFQUFpQzVELElBQWpDLEVBQXVDO0FBQzlFLE1BQUlaLFFBQVFxRixJQUFaLEVBQWtCO0FBQ2hCekUsU0FBS3dELEtBQUw7QUFDRDs7QUFFRCxNQUFJLENBQUNwRSxRQUFRcUYsSUFBVCxJQUFpQi9FLGdCQUFyQixFQUF1QztBQUNyQ2tFLGNBQVVFLE1BQVYsQ0FBaUJyRSxpQkFBaUJpRixNQUFqQixDQUF3QnRGLFFBQVF1RixJQUFoQyxDQUFqQjtBQUNEOztBQUVEO0FBQ0FILGFBQVdJLFdBQVgsQ0FBdUI3RCxTQUF2QixDQUFpQzhELFNBQWpDLEdBQTZDLFVBQVU1QixXQUFWLEVBQXVCNkIsT0FBdkIsRUFBZ0NDLFFBQWhDLEVBQTBDO0FBQUE7O0FBQ3JGLFFBQUlDLGVBQUo7QUFDQSxRQUFNM0MsUUFBUXJDLEtBQUswQyxRQUFMLENBQWNPLFdBQWQsQ0FBZDs7QUFFQSxRQUFJLENBQUNaLE1BQU1sQixNQUFYLEVBQW1CO0FBQ2pCLFlBQU0sSUFBSVYsS0FBSixDQUFVLFdBQVd3QyxZQUFZbkMsU0FBdkIsR0FBbUMsMEZBQTdDLENBQU47QUFDRDs7QUFFRCxRQUFJLENBQUNpRSxRQUFMLEVBQWU7QUFDYkEsaUJBQVdELE9BQVg7QUFDQUUsZUFBUzNDLE1BQU1sQixNQUFmO0FBQ0QsS0FIRCxNQUdPO0FBQ0w2RCxlQUFTM0MsTUFBTWxCLE1BQU4sQ0FBYThELE1BQWIsQ0FBb0JILE9BQXBCLENBQVQ7QUFDRDs7QUFFRCxRQUFJbkYsWUFBSixFQUFrQjtBQUNoQixVQUFNdUYsbUJBQW1CSCxRQUF6QjtBQUNBQSxpQkFBVyxrQkFBQ0ksQ0FBRCxFQUFPO0FBQ2hCLGNBQUtDLFVBQUwsQ0FBZ0I7QUFBQSxpQkFBTUYsaUJBQWlCQyxDQUFqQixDQUFOO0FBQUEsU0FBaEI7QUFDRCxPQUZEO0FBR0Q7O0FBRURILFdBQU9LLEVBQVAsQ0FBVSxRQUFWLEVBQW9CTixRQUFwQjs7QUFFQTtBQUNBQSxhQUFTLEVBQVQ7O0FBRUE7QUFDQSxTQUFLTyxHQUFMLENBQVMsVUFBVCxFQUFxQjtBQUFBLGFBQU1OLE9BQU9PLEdBQVAsQ0FBVyxRQUFYLEVBQXFCUixRQUFyQixDQUFOO0FBQUEsS0FBckI7QUFDRCxHQTdCRDtBQThCRCxDQXhDSSxDQXJCUDs7QUErREF2RixPQUFPK0MsT0FBUCxHQUFpQixNQUFqQiIsImZpbGUiOiJmbHV4LWFuZ3VsYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBXaGVuIHJlcXVpcmluZyBBbmd1bGFyIGl0IGlzIGFkZGVkIHRvIGdsb2JhbCBmb3Igc29tZSByZWFzb25cbmNvbnN0IGFuZ3VsYXIgPSBnbG9iYWwuYW5ndWxhciB8fCByZXF1aXJlKCdhbmd1bGFyJykgJiYgZ2xvYmFsLmFuZ3VsYXI7XG5cbi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IEJhb2JhYiBmcm9tICdiYW9iYWInO1xuaW1wb3J0IHsgY3JlYXRlRGlzcGF0Y2hlciB9IGZyb20gJ2Rpc3BhdGNocic7XG5cbmNvbnN0IGFuZ3VsYXJNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZTtcbmxldCByZWdpc3RlcmVkU3RvcmVzID0gW107XG5sZXQgYXV0b0luamVjdFN0b3JlcyA9IGZhbHNlO1xubGV0IHVzZUV2YWxBc3luYyA9IHRydWU7XG5cbi8vIEEgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIHN0b3Jlc1xuZnVuY3Rpb24gY3JlYXRlU3RvcmUobmFtZSwgc3BlYyA9IHt9LCBpbW11dGFibGVEZWZhdWx0cywgZmx1eCkge1xuICAvLyBDb25zdHJ1Y3RvciBvZiBhIHlhaG9vIGRpc3BhdGNociBzdG9yZVxuICBjb25zdCBTdG9yZSA9IGZ1bmN0aW9uIChkaXNwYXRjaGVyKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgIC8vIENoZWNrIGlmIHN0b3JlIGV4aXN0cyB3aGVuIHdhaXRpbmcgZm9yIGl0XG4gICAgdGhpcy53YWl0Rm9yID0gZnVuY3Rpb24gKHN0b3JlcywgY2IpIHtcbiAgICAgIHN0b3JlcyA9IEFycmF5LmlzQXJyYXkoc3RvcmVzKSA/IHN0b3JlcyA6IFtzdG9yZXNdO1xuICAgICAgaWYgKCFmbHV4LmFyZVN0b3Jlc1JlZ2lzdGVyZWQoc3RvcmVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dhaXRpbmcgZm9yIHN0b3JlcyB0aGF0IGFyZSBub3QgaW5qZWN0ZWQgaW50byBBbmd1bGFyIHlldCwgJyArIHN0b3Jlcy5qb2luKCcsICcpICsgJy4gQmUgc3VyZSB0byBpbmplY3Qgc3RvcmVzIGJlZm9yZSB3YWl0aW5nIGZvciB0aGVtJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BhdGNoZXIud2FpdEZvcihzdG9yZXMsIGNiLmJpbmQodGhpcykpO1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZSAnICsgbmFtZSArICcgZG9lcyBub3QgaGF2ZSBhbiBpbml0aWFsaXplIG1ldGhvZCB3aGljaCBpcyBpcyBuZWNlc3NhcnkgdG8gc2V0IHRoZSBpbml0aWFsIHN0YXRlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH07XG5cbiAgLy8gQWRkIGNvbnN0cnVjdG9yIHByb3BlcnRpZXMsIGFzIHJlcXVpcmVkIGJ5IFlhaG9vIERpc3BhdGNoclxuICBTdG9yZS5oYW5kbGVycyA9IHNwZWMuaGFuZGxlcnM7XG4gIFN0b3JlLnN0b3JlTmFtZSA9IG5hbWU7XG5cbiAgLy8gSW5zdGFudGlhdGVzIGltbXV0YWJsZSBzdGF0ZSBhbmQgc2F2ZXMgaXQgdG8gcHJpdmF0ZSB2YXJpYWJsZSB0aGF0IGNhbiBiZSB1c2VkIGZvciBzZXR0aW5nIGxpc3RlbmVyc1xuICBTdG9yZS5wcm90b3R5cGUuaW1tdXRhYmxlID0gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKHRoaXMuX190cmVlKSB7XG4gICAgICB0aGlzLl9fdHJlZS5zZXQoaW5pdGlhbFN0YXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX3RyZWUgPSBuZXcgQmFvYmFiKGluaXRpYWxTdGF0ZSwgYW5ndWxhci5leHRlbmQoe30sIGltbXV0YWJsZURlZmF1bHRzLCBvcHRpb25zKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fdHJlZTtcbiAgfTtcblxuICBTdG9yZS5wcm90b3R5cGUubW9ua2V5ID0gQmFvYmFiLm1vbmtleTtcblxuICAvLyBBdHRhY2ggc3RvcmUgZGVmaW5pdGlvbiB0byB0aGUgcHJvdG90eXBlXG4gIE9iamVjdC5rZXlzKHNwZWMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIFN0b3JlLnByb3RvdHlwZVtrZXldID0gc3BlY1trZXldO1xuICB9KTtcblxuICByZXR1cm4gU3RvcmU7XG59XG5cbi8vIEZsdXggU2VydmljZSBpcyBhIHdyYXBwZXIgZm9yIHRoZSBZYWhvbyBEaXNwYXRjaHJcbmNvbnN0IEZsdXhTZXJ2aWNlID0gZnVuY3Rpb24gKGltbXV0YWJsZURlZmF1bHRzKSB7XG4gIHRoaXMuc3RvcmVzID0gW107XG4gIHRoaXMuZGlzcGF0Y2hlckluc3RhbmNlID0gY3JlYXRlRGlzcGF0Y2hlcigpO1xuICB0aGlzLmRpc3BhdGNoZXIgPSB0aGlzLmRpc3BhdGNoZXJJbnN0YW5jZS5jcmVhdGVDb250ZXh0KCk7XG5cbiAgdGhpcy5kaXNwYXRjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocmVnaXN0ZXJlZFN0b3Jlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhlcmUgYXJlIHN0aWxsIHN0b3JlcyBub3QgaW5qZWN0ZWQ6ICcgKyByZWdpc3RlcmVkU3RvcmVzLmpvaW4oJywnKSArICcuIE1ha2Ugc3VyZSB0byBtYW51YWxseSBpbmplY3QgYWxsIHN0b3JlcyBiZWZvcmUgcnVubmluZyBhbnkgZGlzcGF0Y2hlcyBvciBzZXQgYXV0b0luamVjdFN0b3JlcyB0byB0cnVlLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoLmFwcGx5KHRoaXMuZGlzcGF0Y2hlciwgYXJndW1lbnRzKTtcbiAgfTtcblxuICB0aGlzLmNyZWF0ZVN0b3JlID0gZnVuY3Rpb24gKG5hbWUsIHNwZWMpIHtcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKG5hbWUsIHNwZWMsIGltbXV0YWJsZURlZmF1bHRzLCB0aGlzKTtcbiAgICBsZXQgc3RvcmVJbnN0YW5jZTtcblxuICAgIC8vIENyZWF0ZSB0aGUgZXhwb3J0cyBvYmplY3RcbiAgICBzdG9yZS5leHBvcnRzID0ge307XG5cbiAgICB0aGlzLmRpc3BhdGNoZXJJbnN0YW5jZS5yZWdpc3RlclN0b3JlKHN0b3JlKTtcbiAgICB0aGlzLnN0b3Jlcy5wdXNoKHN0b3JlKTtcblxuICAgIC8vIEFkZCBjbG9uaW5nIHRvIGV4cG9ydHNcblxuICAgIGlmICghc3BlYy5leHBvcnRzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBoYXZlIHRvIGFkZCBhbiBleHBvcnRzIG9iamVjdCB0byB5b3VyIHN0b3JlOiAnICsgbmFtZSk7XG4gICAgfVxuXG4gICAgc3RvcmVJbnN0YW5jZSA9IHRoaXMuZGlzcGF0Y2hlci5nZXRTdG9yZShzdG9yZSk7XG4gICAgT2JqZWN0LmtleXMoc3BlYy5leHBvcnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIC8vIENyZWF0ZSBhIGdldHRlclxuICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc3BlYy5leHBvcnRzLCBrZXkpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdG9yZS5leHBvcnRzLCBrZXksIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICBnZXQ6ICgpID0+IGRlc2NyaXB0b3IuZ2V0LmFwcGx5KHN0b3JlSW5zdGFuY2UpXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RvcmUuZXhwb3J0c1trZXldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBzcGVjLmV4cG9ydHNba2V5XS5hcHBseShzdG9yZUluc3RhbmNlLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBzcGVjLmV4cG9ydHNba2V5XSA9IHNwZWMuZXhwb3J0c1trZXldLmJpbmQoc3RvcmVJbnN0YW5jZSk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBzdG9yZS5leHBvcnRzO1xuXG4gIH07XG5cbiAgdGhpcy5nZXRTdG9yZSA9IGZ1bmN0aW9uIChzdG9yZUV4cG9ydCkge1xuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5zdG9yZXMuZmlsdGVyKHMgPT4gcy5leHBvcnRzID09PSBzdG9yZUV4cG9ydClbMF07XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5nZXRTdG9yZShzdG9yZSk7XG4gIH07XG5cbiAgdGhpcy5hcmVTdG9yZXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKHN0b3Jlcykge1xuICAgIGNvbnN0IHN0b3JlTmFtZXMgPSB0aGlzLnN0b3Jlcy5tYXAoc3RvcmUgPT4gc3RvcmUuc3RvcmVOYW1lKTtcbiAgICByZXR1cm4gc3RvcmVzLmV2ZXJ5KHN0b3JlTmFtZSA9PiBzdG9yZU5hbWVzLmluZGV4T2Yoc3RvcmVOYW1lKSA+IC0xKTtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hlckluc3RhbmNlLnN0b3JlcyA9IHt9O1xuICAgIHRoaXMuZGlzcGF0Y2hlckluc3RhbmNlLmhhbmRsZXJzID0ge307XG4gICAgdGhpcy5zdG9yZXMgPSBbXTtcbiAgICByZWdpc3RlcmVkU3RvcmVzID0gW107XG4gIH07XG5cbiAgLy8gRXhwb3NlIEJhb2JhYiBpbiBjYXNlIHVzZXIgd2FudHMgYWNjZXNzIHRvIGl0IGZvciB1c2Ugb3V0c2lkZSBhIHN0b3JlXG4gIHRoaXMuQmFvYmFiID0gQmFvYmFiO1xufTtcblxuLy8gV3JhcCBcImFuZ3VsYXIubW9kdWxlXCIgdG8gYXR0YWNoIHN0b3JlIG1ldGhvZCB0byBtb2R1bGUgaW5zdGFuY2VcbmFuZ3VsYXIubW9kdWxlID0gZnVuY3Rpb24gKCkge1xuICAvLyBDYWxsIHRoZSBtb2R1bGUgYXMgbm9ybWFseSBhbmQgZ3JhYiB0aGUgaW5zdGFuY2VcbiAgY29uc3QgbW9kdWxlSW5zdGFuY2UgPSBhbmd1bGFyTW9kdWxlLmFwcGx5KGFuZ3VsYXIsIGFyZ3VtZW50cyk7XG5cbiAgLy8gQXR0YWNoIHN0b3JlIG1ldGhvZCB0byBpbnN0YW5jZVxuICBtb2R1bGVJbnN0YW5jZS5zdG9yZSA9IGZ1bmN0aW9uIChzdG9yZU5hbWUsIHN0b3JlRGVmaW5pdGlvbikge1xuXG4gICAgLy8gQWRkIHRvIHN0b3JlcyBhcnJheVxuICAgIHJlZ2lzdGVyZWRTdG9yZXMucHVzaChzdG9yZU5hbWUpO1xuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHN0b3JlXG4gICAgdGhpcy5mYWN0b3J5KHN0b3JlTmFtZSwgWyckaW5qZWN0b3InLCAnZmx1eCcsIGZ1bmN0aW9uICgkaW5qZWN0b3IsIGZsdXgpIHtcbiAgICAgIGNvbnN0IHN0b3JlQ29uZmlnID0gJGluamVjdG9yLmludm9rZShzdG9yZURlZmluaXRpb24pO1xuICAgICAgcmVnaXN0ZXJlZFN0b3Jlcy5zcGxpY2UocmVnaXN0ZXJlZFN0b3Jlcy5pbmRleE9mKHN0b3JlTmFtZSksIDEpO1xuICAgICAgcmV0dXJuIGZsdXguY3JlYXRlU3RvcmUoc3RvcmVOYW1lLCBzdG9yZUNvbmZpZyk7XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcmV0dXJuIG1vZHVsZUluc3RhbmNlO1xufTtcblxuYW5ndWxhci5tb2R1bGUoJ2ZsdXgnLCBbXSlcbiAgLnByb3ZpZGVyKCdmbHV4JywgZnVuY3Rpb24gRmx1eFByb3ZpZGVyICgpIHtcbiAgICBsZXQgaW1tdXRhYmxlRGVmYXVsdHMgPSB7fTtcblxuICAgIC8vIERlZmF1bHRzIHRoYXQgYXJlIHBhc3NlZCBvbiB0byBCYW9iYWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9Zb21ndWl0aGVyZWFsL2Jhb2JhYiNvcHRpb25zXG4gICAgdGhpcy5zZXRJbW11dGFibGVEZWZhdWx0cyA9IGZ1bmN0aW9uIChkZWZhdWx0cykge1xuICAgICAgaW1tdXRhYmxlRGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvSW5qZWN0U3RvcmVzID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBhdXRvSW5qZWN0U3RvcmVzID0gdmFsO1xuICAgIH07XG5cbiAgICB0aGlzLnVzZUV2YWxBc3luYyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgdXNlRXZhbEFzeW5jID0gdmFsO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXQgPSBbZnVuY3Rpb24gZmx1eEZhY3RvcnkgKCkge1xuICAgICAgcmV0dXJuIG5ldyBGbHV4U2VydmljZShpbW11dGFibGVEZWZhdWx0cyk7XG4gICAgfV07XG4gIH0pXG4gIC5ydW4oWyckcm9vdFNjb3BlJywgJyRpbmplY3RvcicsICdmbHV4JywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRpbmplY3RvciwgZmx1eCkge1xuICAgIGlmIChhbmd1bGFyLm1vY2spIHtcbiAgICAgIGZsdXgucmVzZXQoKTtcbiAgICB9XG5cbiAgICBpZiAoIWFuZ3VsYXIubW9jayAmJiBhdXRvSW5qZWN0U3RvcmVzKSB7XG4gICAgICAkaW5qZWN0b3IuaW52b2tlKHJlZ2lzdGVyZWRTdG9yZXMuY29uY2F0KGFuZ3VsYXIubm9vcCkpO1xuICAgIH1cblxuICAgIC8vIEV4dGVuZCBzY29wZXMgd2l0aCAkbGlzdGVuVG9cbiAgICAkcm9vdFNjb3BlLmNvbnN0cnVjdG9yLnByb3RvdHlwZS4kbGlzdGVuVG8gPSBmdW5jdGlvbiAoc3RvcmVFeHBvcnQsIG1hcHBpbmcsIGNhbGxiYWNrKSB7XG4gICAgICBsZXQgY3Vyc29yO1xuICAgICAgY29uc3Qgc3RvcmUgPSBmbHV4LmdldFN0b3JlKHN0b3JlRXhwb3J0KTtcblxuICAgICAgaWYgKCFzdG9yZS5fX3RyZWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdG9yZSAnICsgc3RvcmVFeHBvcnQuc3RvcmVOYW1lICsgJyBoYXMgbm90IGRlZmluZWQgc3RhdGUgd2l0aCB0aGlzLmltbXV0YWJsZSgpIHdoaWNoIGlzIHJlcXVpcmVkIGluIG9yZGVyIHRvIHVzZSAkbGlzdGVuVG8nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayA9IG1hcHBpbmc7XG4gICAgICAgIGN1cnNvciA9IHN0b3JlLl9fdHJlZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnNvciA9IHN0b3JlLl9fdHJlZS5zZWxlY3QobWFwcGluZyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1c2VFdmFsQXN5bmMpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICBjYWxsYmFjayA9IChlKSA9PiB7XG4gICAgICAgICAgdGhpcy4kZXZhbEFzeW5jKCgpID0+IG9yaWdpbmFsQ2FsbGJhY2soZSkpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBjdXJzb3Iub24oJ3VwZGF0ZScsIGNhbGxiYWNrKTtcblxuICAgICAgLy8gQ2FsbCB0aGUgY2FsbGJhY2sgc28gdGhhdCBzdGF0ZSBnZXRzIHRoZSBpbml0aWFsIHN5bmMgd2l0aCB0aGUgdmlldy1tb2RlbCB2YXJpYWJsZXNcbiAgICAgIGNhbGxiYWNrKHt9KTtcblxuICAgICAgLy8gUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb24gdGhlIHN0b3JlIHdoZW4gc2NvcGUgaXMgZGVzdHJveWVkIChHQylcbiAgICAgIHRoaXMuJG9uKCckZGVzdHJveScsICgpID0+IGN1cnNvci5vZmYoJ3VwZGF0ZScsIGNhbGxiYWNrKSk7XG4gICAgfTtcbiAgfV0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICdmbHV4JztcbiJdfQ==
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"angular":"angular","baobab":1,"dispatchr":10}]},{},[17]);
