var isFunction = require('lodash/lang/isFunction');
var assign = require('object-assign');
module.exports = {
  _getDetail: function getDetail(){
    var detailJSON = {};
    for (var blockKey in this.refs) {
      if(isFunction(this.refs[blockKey]._getEntity)){
        var blockJSON = this.refs[blockKey]._getEntity();
          assign(detailJSON, {
            [blockKey]: blockJSON
          });
      }
    }
      return detailJSON;
  }
};
