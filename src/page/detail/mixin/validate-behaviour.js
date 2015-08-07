var {isFunction, isEmpty} = require('lodash/lang');
var assign = require('object-assign');
module.exports = {
  validate: function validateDetail(){
    var validationMap = {};
    for (var blockKey in this.refs) {
      //validate only the reference elements which have valide function
      // todo: @pierr see if it is sufficient
      if(isFunction(this.refs[blockKey].validate)){
        var validationRes = this.refs[blockKey].validate();
        if(validationRes !== undefined){
          assign(validationMap, {
            [blockKey]: validationRes
          });
        }
      }

    }
    if(isEmpty(validationMap)){
      return true;
    }
  }
};
