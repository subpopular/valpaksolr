// Generated by CoffeeScript 1.6.2
(function() {
  var module;

  module = angular.module('app.filters', []);

  module.filter('titleCase', function() {
    return function(input) {
      var n, word, _i, _len, _ref;

      n = [];
      _ref = input.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        n.push(word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase());
      }
      return n.join(' ');
    };
  });

}).call(this);

/*
//@ sourceMappingURL=filters.map
*/
