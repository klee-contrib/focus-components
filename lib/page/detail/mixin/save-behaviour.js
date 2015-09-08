'use strict';

var isFunction = require('lodash/lang/isFunction');
var assign = require('object-assign');
module.exports = {
  _getDetail: function getDetail() {
    var detailJSON = {};
    for (var blockKey in this.refs) {
      if (isFunction(this.refs[blockKey]._getEntity)) {
        var _assign;

        var blockJSON = this.refs[blockKey]._getEntity();
        assign(detailJSON, (_assign = {}, _assign[blockKey] = blockJSON, _assign));
      }
    }
    return detailJSON;
  }
};