'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mysql = require('mysql2/promise');

var mysqlPool = function mysqlPool(conn) {
  var pool = mysql.createPool(conn);
  return {
    client: pool,
    pool: pool
  };
};

var execute = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(query, args, db, options) {
    var _ref2, _ref3, rows, fields;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.client.execute(query, args);

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            rows = _ref3[0];
            fields = _ref3[1];

            if (!(options && options.fields)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', [rows, fields]);

          case 9:
            return _context.abrupt('return', rows);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function execute(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var executeAsync = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(db) {
    var _len,
        arr,
        _key,
        query,
        _ref5,
        _ref6,
        rows,
        ret,
        i,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            for (_len = _args2.length, arr = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              arr[_key - 1] = _args2[_key];
            }

            query = arr.map(function (q) {
              return db.client.execute(q[0], q[1]);
            });
            _context2.next = 5;
            return Promise.all(query);

          case 5:
            _ref5 = _context2.sent;
            _ref6 = _toArray(_ref5);
            rows = _ref6.slice(0);
            ret = [];

            for (i = 0; i < rows.length; i++) {
              ret.push(rows[i][0]);
            }
            return _context2.abrupt('return', ret);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', _context2.t0);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 13]]);
  }));

  return function executeAsync(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = function (conn, options) {
  return function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx, next) {
      var db;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              db = mysqlPool(conn);

              ctx[options ? options.method || 'myPool' : 'myPool'] = function () {
                return {
                  query: function query(_query, args, options) {
                    return execute(_query, args, db, options);
                  },
                  async: function async() {
                    for (var _len2 = arguments.length, arr = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                      arr[_key2] = arguments[_key2];
                    }

                    return executeAsync.apply(undefined, [db].concat(arr));
                  }
                };
              };
              _context3.next = 4;
              return next();

            case 4:
              db.pool.end();

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x6, _x7) {
      return _ref7.apply(this, arguments);
    };
  }();
};