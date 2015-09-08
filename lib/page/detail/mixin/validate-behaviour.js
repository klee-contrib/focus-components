'use strict';

var _require = require('lodash/lang');

var isFunction = _require.isFunction;
var isEmpty = _require.isEmpty;

var assign = require('object-assign');
module.exports = {
  validate: function validateDetail() {
    var validationMap = {};
    for (var blockKey in this.refs) {
      //validate only the reference elements which have valide function
      // todo: @pierr see if it is sufficient
      if (isFunction(this.refs[blockKey].validate)) {
        var validationRes = this.refs[blockKey].validate();
        if (validationRes !== undefined) {
          var _assign;

          assign(validationMap, (_assign = {}, _assign[blockKey] = validationRes, _assign));
        }
      }
    }
    if (isEmpty(validationMap)) {
      return true;
    }
  }
};