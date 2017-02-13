'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function optimize(query, args) {
  if (typeof query !== 'string') throw new Error('query must be string');

  if (!args || args.length === 0) return { newQuery: query, newArgs: args };

  var argL = args.length;
  var prefixL = ((query || '').match(/\?/g) || []).length;
  if (argL != prefixL) return { newQuery: query, newArgs: args };

  var prefix = [];
  args.map(function (q, i) {
    if ((typeof q === 'undefined' ? 'undefined' : _typeof(q)) === 'object' && q.length > 0) {
      (function () {
        var p = [];
        q.map(function () {
          p.push('?');
        });
        prefix.push(p.join(','));
      })();
    } else {
      prefix.push('?');
    }
  });
  var split = query.split('?');
  var newQuery = '';
  split.map(function (q, i) {
    newQuery += q + (prefix[i] || '');
  });
  var newArgs = args.reduce(function (a, b) {
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') a = [a];
    if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) !== 'object') b = [b];

    return a.concat(b);
  });
  return { newQuery: newQuery, newArgs: newArgs };
};